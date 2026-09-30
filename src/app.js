import { renderLesson } from "./renderer.js";
import { createProgressController } from "./progress.js";
import { validateLesson } from "./validation.js";
import { createWidgets } from "./widgets.js";

const LESSONS = {
  1.1: "1.1-the-problem-before-bitcoin",
  1.2: "1.2-getting-started-with-bitcoin",
};

function getLessonId() {
  const params = new URLSearchParams(window.location.search);

  return params.get("lesson") || "1.1";
}

async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json();
}

async function start() {
  const lessonId = getLessonId();

  const folder = LESSONS[lessonId];

  if (!folder) {
    showFatalError(`Lesson ${lessonId} was not found.`);

    return;
  }

  try {
    const lesson = await loadJSON(`./lessons/${folder}/lesson.json`);

    const quizData = await loadJSON(`./lessons/${folder}/quiz.json`);

    const quizBank = quizData.questions || quizData;

    const widgets = createWidgets({
      done: () => {},
    });

    const errors = validateLesson(lesson, quizBank, widgets);

    if (errors.length) {
      showWarnings(errors);
    }

    const progress = createProgressController(lesson);

    renderLesson(lesson, quizBank, progress);
  } catch (error) {
    console.error(error);

    showFatalError(error.message);
  }
}

function showWarnings(errors) {
  const warning = document.getElementById("warn");

  warning.style.display = "block";

  warning.innerHTML = errors.map((error) => escapeHTML(error)).join("<br>");
}

function showFatalError(message) {
  const warning = document.getElementById("warn");

  warning.style.display = "block";

  warning.innerHTML = `<b>Unable to load lesson.</b><br>
         ${escapeHTML(message)}`;
}

function escapeHTML(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

start();
