import { createWidgets } from "./widgets.js";

export function renderLesson(lesson, quizBank, progress) {
  const widgets = createWidgets(progress);

  const questions = Object.fromEntries(
    quizBank.map((question) => [question.id, question]),
  );

  renderHeader(lesson);

  const main = document.getElementById("lesson");

  main.innerHTML = "";

  lesson.sections.forEach((section) => {
    const sectionElement = document.createElement("section");

    sectionElement.id = section.id;

    sectionElement.innerHTML = `
            <div class="label">
                ${escapeHTML(section.label || "")}
            </div>

            <h2>
                ${escapeHTML(section.title || "")}
            </h2>
        `;

    section.blocks.forEach((block) => {
      const element = renderBlock(block, lesson, questions, widgets, progress);

      if (element) {
        sectionElement.appendChild(element);
      }
    });

    main.appendChild(sectionElement);
  });
}

function renderHeader(lesson) {
  document.title = `${lesson.title} — Bitshala Learn ${lesson.id}`;

  document.getElementById("lesson-nav-title").textContent =
    `Bitshala Learn · Lesson ${lesson.id}`;

  document.getElementById("head").innerHTML = `
        <div class="kicker">
            ${escapeHTML(lesson.phase)}
            ·
            ${escapeHTML(lesson.module)}
        </div>

        <h1>
            ${escapeHTML(lesson.title)}
        </h1>

        <p class="sub">
            ${escapeHTML(lesson.subtitle)}
        </p>

        <div class="meta">
            Lesson ${escapeHTML(lesson.id)}
            · about ${lesson.minutes} minutes
            · ${escapeHTML(lesson.level)}
        </div>
    `;
}

function renderBlock(block, lesson, questions, widgets, progress) {
  switch (block.type) {
    case "text":
      return renderText(block);

    case "aside":
      return renderAside(block);

    case "figure":
      return renderFigure(block, lesson);

    case "timeline":
      return renderTimeline(block);

    case "widget":
      return renderWidget(block, widgets);

    case "choice":
      return renderChoice(block, progress);

    case "quiz":
      return renderQuiz(block, questions, progress);

    case "reflect":
      return renderReflection(block, progress);

    case "next":
      return renderNext(lesson);

    default:
      return null;
  }
}

function renderText(block) {
  return wrap(markdown(block.md));
}

function renderAside(block) {
  return wrap(inlineMarkdown(block.md), "aside");
}

function renderFigure(block, lesson) {
  const figure = document.createElement("figure");

  const assetURL = `./lessons/${lessonFolder(lesson.id)}/assets/${block.asset}`;

  figure.innerHTML = `
        <img
            src="${assetURL}"
            alt="${escapeHTML(block.caption || "")}"
            style="max-width:100%;height:auto;display:block;margin:auto;"
        >
        <figcaption>
            ${escapeHTML(block.caption || "")}
        </figcaption>
    `;

  return figure;
}

function renderTimeline(block) {
  return wrap(
    (block.items || [])
      .map(
        (item) => `
                <div>
                    <b>${escapeHTML(item.when)}</b>
                    ${inlineMarkdown(item.text)}
                </div>
            `,
      )
      .join(""),
    "tl",
  );
}

function renderWidget(block, widgets) {
  const element = wrap("");

  const widget = widgets[block.name];

  if (!widget) {
    return element;
  }

  widget(element, block.props || {}, () => {
    if (block.id) {
      // Widget completion is handled
      // through the progress controller.
    }
  });

  return element;
}

function renderChoice(block, progress) {
  const element = wrap(`
            <div class="try">

                <span class="label">
                    Your turn
                </span>

                ${markdown(block.prompt)}

                <div class="choice-options">
                    ${block.options
                      .map(
                        (option) => `
                                <button
                                    class="opt"
                                    data-choice="${escapeHTML(option.key)}"
                                >
                                    <b>
                                        ${escapeHTML(option.title)}.
                                    </b>

                                    ${escapeHTML(option.desc)}
                                </button>
                            `,
                      )
                      .join("")}
                </div>

                <textarea
                    placeholder="${escapeHTML(block.ask || "")}"
                ></textarea>

                <button data-show-answer>
                    Show me
                </button>

                <div
                    class="out"
                    style="margin-top:14px"
                ></div>

            </div>
        `);

  let selected = null;

  element.querySelectorAll("[data-choice]").forEach((button) => {
    button.onclick = () => {
      selected = button.dataset.choice;

      element.querySelectorAll("[data-choice]").forEach((other) => {
        other.classList.toggle("right", other === button);
      });
    };
  });

  const showButton = element.querySelector("[data-show-answer]");

  showButton.onclick = () => {
    const option = block.options.find((item) => item.key === selected);

    const output = element.querySelector(".out");

    if (!option) {
      output.innerHTML = "<p><i>Choose a design first.</i></p>";

      return;
    }

    output.innerHTML = `
            <p>
                <b>
                    ${escapeHTML(option.feedback)}
                </b>
            </p>

            <p>
                ${inlineMarkdown(block.after)}
            </p>
        `;

    if (block.id) {
      progress.done(block.id);
    }
  };

  return element;
}

function renderQuiz(block, questions, progress) {
  const element = wrap(
    (block.questionIds || [])
      .map((questionId) => {
        const question = questions[questionId];

        if (!question) {
          return "";
        }

        return `
                        <div class="q">

                            <b>
                                ${escapeHTML(question.prompt)}
                            </b>

                            ${question.options
                              .map(
                                (option, index) => `
                                        <button
                                            class="opt"
                                            data-question="${question.id}"
                                            data-index="${index}"
                                        >
                                            ${escapeHTML(option)}
                                        </button>
                                    `,
                              )
                              .join("")}

                            <div
                                class="msg"
                                data-feedback="${question.id}"
                            ></div>

                        </div>
                    `;
      })
      .join(""),
  );

  element.querySelectorAll("[data-question]").forEach((button) => {
    button.onclick = () => {
      const question = questions[button.dataset.question];

      const selected = Number(button.dataset.index);

      const correct = selected === question.answer;

      button.classList.add(correct ? "right" : "wrong");

      const feedback = element.querySelector(
        `[data-feedback="${question.id}"]`,
      );

      feedback.textContent = correct ? question.right : question.wrong;

      if (correct) {
        progress.done(`q:${question.id}`);
      }
    };
  });

  return element;
}

function renderReflection(block, progress) {
  const element = wrap(`
            <div class="try">

                ${markdown(block.prompt)}

                <textarea
                    placeholder="${escapeHTML(block.placeholder || "")}"
                ></textarea>

                <button data-compare>
                    Compare with ours
                </button>

                <div
                    class="out"
                    style="margin-top:14px"
                ></div>

            </div>
        `);

  element.querySelector("[data-compare]").onclick = () => {
    element.querySelector(".out").innerHTML = `
                    <p>
                        ${inlineMarkdown(block.model)}
                    </p>
                `;

    progress.done(block.id);
  };

  return element;
}

function renderNext(lesson) {
  const next = lesson.next;

  if (!next) {
    return wrap(
      `
                <span class="label">
                    Complete
                </span>

                <h3>
                    Lesson complete
                </h3>
            `,
      "next",
    );
  }

  return wrap(
    `
            <span class="label">
                Next lesson
            </span>

            <h3>
                ${escapeHTML(next.id)}
                ${escapeHTML(next.title)}
            </h3>

            <p>
                ${escapeHTML(next.teaser || "")}
            </p>
        `,
    "next",
  );
}

function wrap(html, className = "") {
  const element = document.createElement("div");

  element.className = `blk ${className}`.trim();

  element.innerHTML = html;

  return element;
}

function markdown(text = "") {
  return text
    .split("\n\n")
    .map(
      (paragraph) => `
            <p>
                ${inlineMarkdown(paragraph)}
            </p>
        `,
    )
    .join("");
}

function inlineMarkdown(text = "") {
  return escapeHTML(text)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.+?)\*/g, "<i>$1</i>");
}

function escapeHTML(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function lessonFolder(id) {
  const folders = {
    1.1: "1.1-the-problem-before-bitcoin",
    1.2: "1.2-getting-started-with-bitcoin",
  };

  return folders[id] || id;
}
