/* Shared renderer for Bitshala lesson pages.
   Reads #lesson-data (JSON) and window.LESSON_ASSETS (figures.js) from the page. */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const L = JSON.parse($("#lesson-data").textContent);
  const inline = (s) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.+?)\*/g, "<i>$1</i>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(
        /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      .replace(/\[([^\]]+)\]\((\.\.\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
  const md = (s) =>
    s
      .split("\n\n")
      .map((p) => `<p>${inline(p)}</p>`)
      .join("");
  const wrap = (h, c = "") => {
    const d = document.createElement("div");
    d.className = "blk " + c;
    d.innerHTML = h;
    return d;
  };

  const ASSETS = window.LESSON_ASSETS || {};

  const ACT = ["widget", "reflect"];
  let P = {};
  const KEY = "bitshala-learn:" + L.id;
  try {
    P = JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {}
  const total = () =>
    L.sections.flatMap((s) => s.blocks).filter((b) => ACT.includes(b.type))
      .length;
  function prog() {
    const n = Object.keys(P).length,
      t = total();
    $("#prog").textContent = `${n} of ${t} activities`;
    $("#bar").style.width = (n / t) * 100 + "%";
  }
  function done(id) {
    if (P[id]) return;
    P[id] = 1;
    try {
      localStorage.setItem(KEY, JSON.stringify(P));
    } catch {}
    prog();
  }

  const ICON = {
    target:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/></svg>',
    coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 10h6M9 14h6"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h14M13 6l6 6-6 6"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    layers:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    cross:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg>',
  };
  const ico = (n) => `<span class="ico" aria-hidden="true">${ICON[n]}</span>`;
  const pct = (x) => x.toFixed(1);
  function nowView(n) {
    const share = n.share;
    return `<div class="dash">
          <div class="stat"><b>${n.subsidy} BTC</b><span>subsidy per block</span></div>
          <div class="stat"><b>${share}%</b><span>of rewards from fees</span></div>
          <div class="stat"><b>${(100 - share).toFixed(2)}%</b><span>of rewards from the subsidy</span></div>
        </div>
        <div class="split" aria-label="Reward split: subsidy and fees">
          <span class="sub" style="width:${100 - share}%">subsidy</span><span class="fee" style="width:${share}%"></span>
        </div>
        <p class="small">${n.note} <a href="${n.source}" target="_blank" rel="noopener noreferrer">Source</a></p>`;
  }
  function trendView(t) {
    const W = 620,
      H = 270,
      x0 = 60,
      y0 = 210,
      top = 24,
      maxV = 2;
    const k = (y0 - top) / maxV;
    const n = t.points.length,
      sx = (W - x0 - 130) / (n - 1);
    const pts = t.points.map((q, i) => [x0 + 50 + i * sx, y0 - q.value * k]);
    const ticks = [0, 0.5, 1, 1.5, 2]
      .map(
        (v) =>
          `<line x1="${x0}" x2="${W - 20}" y1="${y0 - v * k}" y2="${y0 - v * k}" stroke="var(--line)" /><text x="${x0 - 8}" y="${y0 - v * k + 5}" text-anchor="end">${v}%</text>`,
      )
      .join("");
    const dots = pts
      .map(([x, y], i) => {
        const q = t.points[i];
        return (
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="var(--acc)"><title>${q.label}: ${q.value}% (${q.method})</title></circle>` +
          `<text x="${x.toFixed(1)}" y="${(y - 14).toFixed(1)}" text-anchor="middle" font-weight="700" paint-order="stroke" stroke="var(--soft)" stroke-width="5" stroke-linejoin="round">${q.value}%</text>` +
          `<text x="${x.toFixed(1)}" y="${y0 + 20}" text-anchor="middle">${q.label}</text>`
        );
      })
      .join("");
    const list = t.points
      .map(
        (q) =>
          `<li><b>${q.label}:</b> ${q.value}% (${q.method}). <a href="${q.source}" target="_blank" rel="noopener noreferrer">Source</a></li>`,
      )
      .join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Dot chart of the fee share of block rewards in 2025, one dot per report">${ticks}${dots}</svg>
        <p class="small">Each dot is one report, not a continuous series. The reports use different methods, so compare the values loosely.</p>
        <ul class="small sources">${list}</ul>`;
  }
  function dagView(d) {
    return `<div class="ctl" role="group" aria-label="Choose what to rate">
          <button type="button" class="ghost" data-dag="parent" aria-pressed="true">Parent alone</button>
          <button type="button" class="ghost" data-dag="package" aria-pressed="false">Parent + child (CPFP)</button>
        </div>
        <svg viewBox="0 0 580 150" role="img" aria-label="Parent transaction P spends into child transaction C">
          <rect x="30" y="35" width="190" height="80" rx="6" fill="var(--bg)" stroke="var(--line)" />
          <text x="125" y="67" text-anchor="middle">Parent P</text>
          <text x="125" y="93" text-anchor="middle">${d.parent.fee} sat · ${d.parent.vsize} vB</text>
          <rect x="360" y="35" width="190" height="80" rx="6" fill="var(--bg)" stroke="var(--acc)" stroke-width="2" />
          <text x="455" y="67" text-anchor="middle">Child C</text>
          <text x="455" y="93" text-anchor="middle">${d.child.fee} sat · ${d.child.vsize} vB</text>
          <path d="M220 75H350" fill="none" stroke="var(--ink)" stroke-width="2" />
          <polygon points="350,69 360,75 350,81" fill="var(--ink)" />
          <text x="290" y="64" text-anchor="middle">spends P’s output</text>
        </svg>
        <div class="dag-out" data-out></div>`;
  }
  function bindDag(panel, d) {
    const out = $("[data-out]", panel);
    const pr = d.parent.fee / d.parent.vsize;
    const pk = (d.parent.fee + d.child.fee) / (d.parent.vsize + d.child.vsize);
    const show = (mode) => {
      panel
        .querySelectorAll("[data-dag]")
        .forEach((b) =>
          b.setAttribute("aria-pressed", String(b.dataset.dag === mode)),
        );
      out.innerHTML =
        mode === "parent"
          ? `<p>Miners rank P alone at <b>${pr.toFixed(1)} sat/vB</b> (${d.parent.fee} ÷ ${d.parent.vsize}). In a busy mempool, it waits.</p>`
          : `<p>Together P and C pay <b>${d.parent.fee + d.child.fee} sat</b> for <b>${d.parent.vsize + d.child.vsize} vB</b>, a package rate of <b>${pk.toFixed(1)} sat/vB</b>. Miners see the child’s high fee, so they take the package, and P confirms with it.</p>`;
    };
    panel
      .querySelectorAll("[data-dag]")
      .forEach((b) => (b.onclick = () => show(b.dataset.dag)));
    show("parent");
  }
  const WIDGETS = {
    // Each round, every node that has the transaction passes it to its neighbours.
    SpreadSim(el, fin, p) {
      el.classList.add("try", "explorer");
      const names = Object.keys(p.nodes);
      const pos = p.nodes;
      let have = new Set([p.start]);
      let round = 0;
      const picture = () =>
        `<svg viewBox="0 0 580 260" role="img" aria-label="Spread of a transaction through the network">` +
        p.edges
          .map(
            ([a, b]) =>
              `<line x1="${pos[a][0]}" y1="${pos[a][1]}" x2="${pos[b][0]}" y2="${pos[b][1]}" stroke="var(--line)" stroke-width="2" />`,
          )
          .join("") +
        names
          .map((n) => {
            const has = have.has(n);
            return (
              `<circle cx="${pos[n][0]}" cy="${pos[n][1]}" r="22" fill="${has ? "var(--acc)" : "var(--bg)"}" stroke="var(--ink)" stroke-width="2" />` +
              `<text x="${pos[n][0]}" y="${pos[n][1] + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="${has ? "#fff" : "var(--ink)"}">${n}</text>`
            );
          })
          .join("") +
        `</svg>`;
      el.innerHTML =
        `<span class="label">${ico("layers")}${p.label}</span>` +
        `<p>${p.intro}</p>` +
        `<div data-svg>${picture()}</div>` +
        `<div class="ctl"><button type="button" data-next>${ico("arrow")}Next round</button></div>` +
        `<p class="activity-status" data-status role="status" aria-live="polite"></p>`;
      const render = () => {
        el.querySelector("[data-svg]").innerHTML = picture();
        const status = $("[data-status]", el);
        if (have.size === names.length) {
          status.dataset.result = "good";
          status.innerHTML =
            ico("check") +
            `Every node has it after ${round} round${round === 1 ? "" : "s"}.`;
          $("[data-next]", el).disabled = true;
          fin();
        } else {
          status.dataset.result = "";
          status.innerHTML =
            ico("target") +
            `Round ${round}: ${have.size} of ${names.length} nodes have it.`;
        }
      };
      $("[data-next]", el).onclick = () => {
        const next = new Set(have);
        p.edges.forEach(([a, b]) => {
          if (have.has(a)) next.add(b);
          if (have.has(b)) next.add(a);
        });
        have = next;
        round++;
        render();
      };
      render();
    },
    // Tap the steps in the order they happen. A wrong tap is explained, not counted.
    SequenceTap(el, fin, p) {
      el.classList.add("try", "explorer");
      const placed = [];
      el.innerHTML =
        `<span class="label">${ico(p.icon || "layers")}${p.label}</span>` +
        `<p>${p.intro}</p>` +
        `<div class="bids" role="group" aria-label="Steps">` +
        p.shown
          .map(
            (s, i) =>
              `<button type="button" class="bid" data-step="${i}"><span class="stamp">?</span><span>${s}</span></button>`,
          )
          .join("") +
        `</div>` +
        `<div class="queue" data-queue><span class="small">In order:</span></div>` +
        `<p class="activity-status" data-status role="status" aria-live="polite">${ico("target")}Tap the step that happens first.</p>`;
      const status = $("[data-status]", el);
      el.querySelectorAll("[data-step]").forEach((card) => {
        card.onclick = () => {
          const text = p.shown[Number(card.dataset.step)];
          if (placed.includes(text)) return;
          if (text !== p.correct[placed.length]) {
            status.dataset.result = "bad";
            status.innerHTML =
              ico("cross") +
              "Not yet. Think about what has to happen before this.";
            return;
          }
          placed.push(text);
          card.classList.add("placed");
          card.disabled = true;
          card.querySelector(".stamp").textContent = placed.length;
          $("[data-queue]", el).insertAdjacentHTML(
            "beforeend",
            `<span class="tile in">${ico("check")}${placed.length}</span>`,
          );
          status.dataset.result = "good";
          if (placed.length === p.correct.length) {
            status.innerHTML = ico("check") + p.done;
            fin();
          } else {
            status.innerHTML = ico("check") + "Correct. What comes next?";
          }
        };
      });
    },
    // Two sliders set the two kinds of bytes. Weight, vbytes and fee update live.
    WeightCalc(el, fin, p) {
      el.classList.add("try", "explorer");
      const fmt = (n) => n.toLocaleString("en-US");
      el.innerHTML =
        `<span class="label">${ico("layers")}${p.label}</span>` +
        `<p>${p.intro}</p>` +
        `<label class="slider"><span>${ico("box")}Non-witness bytes: <b data-nwv></b></span><input type="range" min="0" max="400" step="1" value="${p.start.nw}" data-s="nw" aria-label="Non-witness bytes" /></label>` +
        `<label class="slider"><span>${ico("layers")}Witness bytes: <b data-wv></b></span><input type="range" min="0" max="300" step="1" value="${p.start.w}" data-s="w" aria-label="Witness bytes" /></label>` +
        `<div class="dash"><div class="stat"><b data-weight></b><span>weight (WU)</span></div><div class="stat"><b data-vb></b><span>vbytes</span></div><div class="stat"><b data-fee></b><span>fee at ${p.rate} sat/vB</span></div></div>` +
        `<p class="activity-status" data-status role="status" aria-live="polite"></p>`;
      const update = () => {
        const nw = Number(el.querySelector('[data-s="nw"]').value);
        const w = Number(el.querySelector('[data-s="w"]').value);
        const weight = nw * 4 + w;
        const vb = Math.ceil(weight / 4);
        $("[data-nwv]", el).textContent = fmt(nw) + " bytes";
        $("[data-wv]", el).textContent = fmt(w) + " bytes";
        $("[data-weight]", el).textContent = fmt(weight);
        $("[data-vb]", el).textContent = fmt(vb);
        $("[data-fee]", el).textContent = fmt(vb * p.rate) + " sat";
        const status = $("[data-status]", el);
        if (vb === p.target) {
          status.dataset.result = "good";
          status.innerHTML = ico("check") + p.done;
          fin();
        } else {
          status.dataset.result = "";
          status.innerHTML =
            ico("target") + `Now ${fmt(vb)} vB. Goal: ${fmt(p.target)} vB.`;
        }
      };
      el.querySelectorAll("[data-s]").forEach((r) => (r.oninput = update));
      update();
    },
    // Numbered steps. Each answer gets a tick or cross; hints appear one at a time on request.
    Checks(el, fin, p) {
      el.classList.add("try", "lab");
      const steps = p.steps,
        id = p.key || "ck" + Math.random().toString(36).slice(2, 8);
      let wrong = [];
      const shown = new Set();
      el.innerHTML =
        `<span class="label">${ico(p.icon || "target")}${p.label}</span>` +
        (p.intro ? `<p>${p.intro}</p>` : "") +
        (p.grid ? `<div class="hexgrid" data-grid></div>` : "") +
        `<ol class="mission-steps">` +
        steps
          .map(
            (st, i) =>
              `<li class="match-item${st.wide ? " wide" : ""}"><label for="${id}-${i}">${st.label}</label><span class="field">` +
              (st.options
                ? `<select id="${id}-${i}">${st.options.map(([v, t]) => `<option value="${v}">${t}</option>`).join("")}</select>`
                : `<input id="${id}-${i}" ${st.type === "number" ? 'type="number" min="1"' : ""} inputmode="${st.type === "number" ? "numeric" : "text"}" autocomplete="off" />`) +
              `<span class="mark" data-mark="${i}"></span></span></li>`,
          )
          .join("") +
        `</ol>` +
        `<div class="ctl"><button type="button" data-check>${p.button}</button><button type="button" class="ghost" data-hint hidden>${ico("bulb")}Hint</button></div>` +
        `<p class="activity-status" data-status role="status" aria-live="polite"></p>` +
        `<ul class="hints" data-hints></ul>` +
        `<div data-reveal class="note" hidden>${p.reveal}</div>`;
      const grid = $("[data-grid]", el);
      if (p.grid) {
        const per = p.grid.perRow;
        p.grid.hex.match(/../g).forEach((byte, i) => {
          if (i % per === 0) {
            const label = document.createElement("span");
            label.className = "row-label";
            label.textContent = `${i + 1}–${i + per}`;
            grid.append(label);
          }
          const cell = document.createElement("span");
          cell.className = `byte ${i < p.grid.split ? "r" : "s"}`;
          cell.textContent = byte;
          cell.title = `byte ${i + 1}`;
          grid.append(cell);
        });
      }
      $("[data-hint]", el).onclick = () => {
        const next = wrong.find((i) => !shown.has(i));
        if (next === undefined) return;
        shown.add(next);
        const li = document.createElement("li");
        li.textContent = steps[next].hint;
        $("[data-hints]", el).append(li);
        $("[data-hint]", el).hidden = wrong.every((i) => shown.has(i));
      };
      $("[data-check]", el).onclick = () => {
        wrong = [];
        steps.forEach((st, i) => {
          const field = $(`#${id}-${i}`, el);
          const ok =
            field.value
              .trim()
              .toLowerCase()
              .replace(/[\s,]+/g, "") === String(st.answer);
          field.setAttribute("aria-invalid", String(!ok));
          const mark = $(`[data-mark="${i}"]`, el);
          mark.innerHTML = ico(ok ? "check" : "cross");
          mark.className = "mark " + (ok ? "ok" : "no");
          if (!ok) wrong.push(i);
        });
        const solved = wrong.length === 0;
        const status = $("[data-status]", el);
        status.dataset.result = solved ? "good" : "bad";
        status.textContent = solved
          ? p.done
          : `${steps.length - wrong.length} of ${steps.length} correct`;
        $("[data-hint]", el).hidden =
          solved || wrong.every((i) => shown.has(i));
        $("[data-reveal]", el).hidden = !solved;
        if (p.grid) grid.classList.toggle("revealed", solved);
        if (solved) fin();
      };
    },

    // Tap a choice. Only the right one completes the question.
    PathToggle(el, fin, p) {
      el.classList.add("try", "explorer");
      const paths = Object.entries(p.paths);
      el.innerHTML =
        `<span class="label">${ico(p.icon || "clock")}${p.label}</span><p>${p.question}</p>` +
        `<div class="choices" role="group">` +
        paths
          .map(
            ([k, c]) =>
              `<button type="button" class="choice" data-path="${k}" aria-pressed="false">${ico(c.icon || "layers")}<span>${c.button}</span></button>`,
          )
          .join("") +
        `</div><p class="activity-status" data-status role="status" aria-live="polite"></p>`;
      el.querySelectorAll("[data-path]").forEach((button) => {
        button.onclick = () => {
          const c = p.paths[button.dataset.path];
          el.querySelectorAll("[data-path]").forEach((o) =>
            o.setAttribute("aria-pressed", String(o === button)),
          );
          const status = $("[data-status]", el);
          if (!c.correct) {
            status.innerHTML =
              ico("cross") +
              "Not quite. Think it through and try another option.";
            status.dataset.result = "bad";
            return;
          }
          // Right answer: show the reasoning for every option, so the learner sees why the others fail.
          const others = Object.entries(p.paths)
            .filter(([k]) => k !== button.dataset.path)
            .map(([, o]) => `<li>${o.feedback}</li>`)
            .join("");
          status.innerHTML =
            ico("check") +
            c.feedback +
            (others ? `<ul class="small">${others}</ul>` : "");
          status.dataset.result = "good";
          fin();
        };
      });
      // If preselect is set, automatically click the correct option
      if (p.preselect) {
        const preButton = el.querySelector(`[data-path="${p.preselect}"]`);
        if (preButton) {
          preButton.click();
        }
      }
    },

    // Set two outputs; the fee is whatever they leave behind.
    FeeBuilder(el, fin, p) {
      el.classList.add("try", "explorer");
      const fmt = (n) => n.toLocaleString("en-US");
      el.innerHTML =
        `<span class="label">${ico("target")}${p.label}</span>` +
        (p.intro ? `<p>${p.intro}</p>` : "") +
        `<div class="goal">${ico("coin")}${fmt(p.inputs)} sat in · ${ico("target")}${fmt(p.target)} sat fee</div>` +
        p.outputs
          .map(
            (o, i) =>
              `<label class="slider"><span>${ico(o.icon)}<b data-val="${i}"></b> sat</span><input type="range" min="0" max="${p.inputs}" step="100" value="${o.start}" data-out="${i}" aria-label="${o.label}" /></label>`,
          )
          .join("") +
        `<div class="split"><span class="sub" data-outbar></span><span class="fee" data-feebar></span></div>` +
        `<div class="dash"><div class="stat"><b data-total></b><span>outputs</span></div><div class="stat"><b data-fee></b><span>fee</span></div></div>` +
        `<p class="activity-status" data-status role="status" aria-live="polite"></p>`;
      const update = () => {
        const vals = [...el.querySelectorAll("[data-out]")].map((r) =>
          Number(r.value),
        );
        const total = vals.reduce((a, b) => a + b, 0);
        const fee = p.inputs - total;
        vals.forEach(
          (v, i) => ($(`[data-val="${i}"]`, el).textContent = fmt(v)),
        );
        $("[data-total]", el).textContent = fmt(total);
        $("[data-fee]", el).textContent = fmt(fee);
        const share = Math.max(0, Math.min(100, (total / p.inputs) * 100));
        $("[data-outbar]", el).style.width = share + "%";
        $("[data-feebar]", el).style.width = 100 - share + "%";
        const status = $("[data-status]", el);
        if (fee < 0) {
          status.dataset.result = "bad";
          status.innerHTML = ico("warn") + "Outputs exceed inputs";
        } else if (fee > p.target) {
          status.dataset.result = "bad";
          status.innerHTML = ico("arrow") + "Fee too high: raise an output";
        } else if (fee < p.target) {
          status.dataset.result = "bad";
          status.innerHTML = ico("arrow") + "Fee too low: lower an output";
        } else {
          status.dataset.result = "good";
          status.innerHTML = ico("check") + p.done;
          fin();
        }
      };
      el.querySelectorAll("[data-out]").forEach((r) => (r.oninput = update));
      update();
    },

    // Add or remove transactions to fill the block.
    BlockFill(el, fin, p) {
      el.classList.add("try", "explorer");
      const fmt = (n) => n.toLocaleString("en-US");
      const chosen = new Set();
      el.innerHTML =
        `<span class="label">${ico("layers")}${p.label}</span>` +
        (p.intro ? `<p>${p.intro}</p>` : "") +
        `<div class="goal">${ico("target")}${fmt(p.goal)} sat · ${ico("layers")}${fmt(p.capacity)} vB</div>` +
        `<ul class="txlist">` +
        p.txs
          .map(
            (t, i) =>
              `<li><button type="button" class="ghost" data-tx="${i}" aria-pressed="false">${ico("box")}<b>${t.id}</b><span>${fmt(t.fee)} sat</span><span>${t.vsize} vB</span><span class="rate">${t.fee / t.vsize}/vB</span></button></li>`,
          )
          .join("") +
        `</ul>` +
        `<div class="split"><span class="fee" data-used></span></div>` +
        `<div class="dash"><div class="stat"><b data-space></b><span>space</span></div><div class="stat"><b data-earn></b><span>fees</span></div></div>` +
        `<p class="activity-status" data-status role="status" aria-live="polite"></p>`;
      const used = () => [...chosen].reduce((a, i) => a + p.txs[i].vsize, 0);
      const earned = () => [...chosen].reduce((a, i) => a + p.txs[i].fee, 0);
      const update = () => {
        el.querySelectorAll("[data-tx]").forEach((b) =>
          b.setAttribute(
            "aria-pressed",
            String(chosen.has(Number(b.dataset.tx))),
          ),
        );
        $("[data-used]", el).style.width =
          Math.min(100, (used() / p.capacity) * 100) + "%";
        $("[data-space]", el).textContent = `${used()} vB`;
        $("[data-earn]", el).textContent = fmt(earned()) + " sat";
        const status = $("[data-status]", el);
        if (earned() >= p.goal) {
          status.dataset.result = "good";
          status.innerHTML = ico("check") + p.done;
          fin();
        } else {
          status.dataset.result = "";
          status.innerHTML =
            ico("target") + `${fmt(p.goal - earned())} sat to go`;
        }
      };
      el.querySelectorAll("[data-tx]").forEach((b) => {
        b.onclick = () => {
          const i = Number(b.dataset.tx);
          const status = $("[data-status]", el);
          if (chosen.has(i)) {
            chosen.delete(i);
          } else if (used() + p.txs[i].vsize > p.capacity) {
            status.dataset.result = "bad";
            status.innerHTML = ico("warn") + `No room for ${p.txs[i].id}`;
            return;
          } else {
            chosen.add(i);
          }
          update();
        };
      });
      update();
    },

    // Pick a fee rate: at least the clearing rate, no more than twice it.
    TargetRate(el, fin, p) {
      el.classList.add("try", "explorer");
      const fmt = (n) => n.toLocaleString("en-US");
      el.innerHTML =
        `<span class="label">${ico("clock")}${p.label}</span>` +
        (p.intro ? `<p>${p.intro}</p>` : "") +
        `<div class="goal">${ico("clock")}${p.clearing} sat/vB clears · ${ico("box")}${p.vsize} vB</div>` +
        `<label class="slider"><span><b data-rate></b> sat/vB</span><input type="range" min="1" max="40" step="1" value="${p.start}" data-r aria-label="Fee rate" /></label>` +
        `<div class="dash"><div class="stat"><b data-cost></b><span>fee</span></div></div>` +
        `<p class="activity-status" data-status role="status" aria-live="polite"></p>`;
      const r = el.querySelector("[data-r]");
      const update = () => {
        const rate = Number(r.value);
        $("[data-rate]", el).textContent = rate;
        $("[data-cost]", el).textContent = fmt(rate * p.vsize) + " sat";
        const status = $("[data-status]", el);
        if (rate < p.clearing) {
          status.dataset.result = "bad";
          status.innerHTML = ico("cross") + "Too low: misses the next block";
        } else if (rate > 2 * p.clearing) {
          status.dataset.result = "bad";
          status.innerHTML = ico("warn") + "Overpaying: lower the rate";
        } else {
          status.dataset.result = "good";
          status.innerHTML = ico("check") + p.done;
          fin();
        }
      };
      r.oninput = update;
      update();
    },
    // Greedy block builder: highest fee rate first, skip what does not fit.
    BlockRace(el, fin, p) {
      el.classList.add("try", "explorer");
      const fmt = (n) => n.toLocaleString("en-US");
      const run = (rate) => {
        const items = p.others
          .map((o) => ({
            name: o.name,
            rate: o.rate,
            vsize: o.vsize,
            you: false,
          }))
          .concat([{ name: "Aarav", rate, vsize: p.size, you: true }]);
        items.sort((a, b) => b.rate - a.rate || Number(a.you) - Number(b.you));
        let used = 0;
        const inside = [],
          outside = [];
        items.forEach((it) => {
          if (used + it.vsize <= p.capacity) {
            used += it.vsize;
            inside.push(it);
          } else {
            outside.push(it);
          }
        });
        return {
          inside,
          outside,
          used,
          you: inside.some((i) => i.you),
          minerFees: inside.reduce((a, i) => a + i.rate * i.vsize, 0),
        };
      };
      let threshold = null;
      for (let r = 1; r <= 40; r++) {
        if (run(r).you) {
          threshold = r;
          break;
        }
      }
      const seen = new Set();
      el.innerHTML =
        `<span class="label">${ico(p.icon)}${p.label}</span>` +
        `<p>${p.lead}</p>` +
        `<div class="howto">` +
        (p.howto || [])
          .map(
            (h, i) =>
              `<div class="step">${ico(h.icon)}<b>${i + 1}. ${h.title}</b><span>${h.text}</span></div>`,
          )
          .join("") +
        `</div>` +
        `<div class="choices" role="group" aria-label="Aarav’s fee rate">` +
        p.choices
          .map(
            (r) =>
              `<button type="button" class="choice" data-r="${r}" aria-pressed="false">${ico("clock")}<span>${r} sat/vB</span></button>`,
          )
          .join("") +
        `</div><div data-block></div><div data-result class="result" role="status" aria-live="polite"></div>`;
      const show = (rate) => {
        el.querySelectorAll("[data-r]").forEach((b) =>
          b.setAttribute("aria-pressed", String(Number(b.dataset.r) === rate)),
        );
        const res = run(rate);
        const tiles = [
          ...res.inside.map((i) => ({ ...i, got: true })),
          ...res.outside.map((i) => ({ ...i, got: false })),
        ]
          .map(
            (i) =>
              `<span class="tile ${i.you ? "you" : ""} ${i.got ? "in" : "out"}">${ico(i.got ? "check" : "cross")}${i.name} · ${i.rate}/vB</span>`,
          )
          .join("");
        const bar = res.inside
          .map(
            (i) =>
              `<span class="${i.you ? "you" : ""}" style="width:${(i.vsize / p.capacity) * 100}%" title="${i.name}"></span>`,
          )
          .join("");
        el.querySelector("[data-block]").innerHTML =
          `<p class="small">Next block: ${fmt(res.used)} of ${fmt(p.capacity)} vB used</p>` +
          `<div class="blockbar">${bar}</div>` +
          `<p class="small">Grey: other people’s payments waiting to be mined. Orange: Aarav.</p>` +
          `<div class="tiles">${tiles}</div>`;
        const aarav = rate * p.size;
        const result = el.querySelector("[data-result]");
        if (res.you) {
          seen.add("in");
          const extra = (rate - threshold) * p.size;
          result.dataset.result = "good";
          result.innerHTML =
            ico("check") +
            `Aarav is in the next block and pays ${fmt(aarav)} sat.` +
            (extra > 0
              ? `<br>${ico("warn")}Only ${fmt(threshold * p.size)} sat was needed. The extra ${fmt(extra)} sat goes to the miner, and it does not bring the next block sooner.`
              : `<br>This is the cheapest rate that gets in now.`) +
            `<br>The miner collects ${fmt(res.minerFees)} sat from this block.`;
        } else {
          seen.add("out");
          result.dataset.result = "bad";
          result.innerHTML =
            ico("cross") +
            `Aarav misses the next block and waits in the mempool.` +
            `<br>The cheapest rate that gets in now is ${threshold} sat/vB.`;
        }
        if (seen.size === 2) fin();
      };
      el.querySelectorAll("[data-r]").forEach(
        (b) => (b.onclick = () => show(Number(b.dataset.r))),
      );
      show(p.choices[0]);
    },
    // Projected blocks, like a mempool block view: highest rate first, skip what does not fit.
    Mempool(el, fin, p) {
      el.classList.add("try", "explorer");
      const fmt = (n) => n.toLocaleString("en-US");
      const project = (pool) => {
        const rest = [...pool].sort(
          (a, b) => b.rate - a.rate || Number(a.you) - Number(b.you),
        );
        const blocks = [];
        let left = rest;
        while (left.length) {
          let used = 0;
          const inBlock = [],
            skipped = [];
          left.forEach((t) => {
            if (used + t.vsize <= p.capacity) {
              used += t.vsize;
              inBlock.push(t);
            } else {
              skipped.push(t);
            }
          });
          blocks.push({ txs: inBlock, used });
          left = skipped;
        }
        return blocks;
      };
      const base = project(p.queue.map((t) => ({ ...t, you: false })));
      const seen = new Set();
      let yourRate = null;
      el.innerHTML =
        `<span class="label">${ico("layers")}${p.label}</span>` +
        `<p>${p.intro}</p>` +
        `<div class="choices" role="group" aria-label="Your fee rate">` +
        p.choices
          .map(
            (r) =>
              `<button type="button" class="choice" data-r="${r}" aria-pressed="false">${ico("clock")}<span>${r} sat/vB</span></button>`,
          )
          .join("") +
        `</div><div class="blocks" data-blocks></div>` +
        `<div class="result" data-result role="status" aria-live="polite">${ico("target")}Tap a block to see what is in it.</div>`;
      const render = () => {
        const pool = p.queue.map((t) => ({ ...t, you: false }));
        if (yourRate !== null)
          pool.push({ name: "You", rate: yourRate, vsize: p.size, you: true });
        const blocks = project(pool);
        el.querySelectorAll("[data-r]").forEach((b) =>
          b.setAttribute(
            "aria-pressed",
            String(Number(b.dataset.r) === yourRate),
          ),
        );
        el.querySelector("[data-blocks]").innerHTML = blocks
          .map((b, i) => {
            const lo = Math.min(...b.txs.map((t) => t.rate));
            const hasYou = b.txs.some((t) => t.you);
            return (
              `<button type="button" class="blk-card${hasYou ? " you" : ""}" data-blk="${i}" aria-pressed="${seen.has(i)}">` +
              `${ico("layers")}<b>Block ${i + 1}${i === 0 ? " · next" : ""}</b>` +
              `<span class="small">${fmt(b.used)} of ${fmt(p.capacity)} vB</span>` +
              `<span class="small">${b.txs.length} payments</span>` +
              `<span class="small">lowest rate ${lo} sat/vB</span></button>`
            );
          })
          .join("");
        el.querySelectorAll("[data-blk]").forEach((card) => {
          card.onclick = () => {
            const i = Number(card.dataset.blk);
            const b = blocks[i];
            seen.add(i);
            const hi = Math.max(...b.txs.map((t) => t.rate));
            const lo = Math.min(...b.txs.map((t) => t.rate));
            const names = b.txs.map((t) => (t.you ? "You" : t.name)).join(", ");
            $("[data-result]", el).innerHTML =
              ico("box") +
              `Block ${i + 1} holds ${b.txs.length} payments, rates ${hi} down to ${lo} sat/vB.<br><span class="small">${names}</span>`;
            card.setAttribute("aria-pressed", "true");
            if (seen.size >= base.length) fin();
          };
        });
        if (yourRate !== null) {
          const idx = blocks.findIndex((b) => b.txs.some((t) => t.you));
          $("[data-result]", el).innerHTML =
            ico("target") +
            `Your ${p.size} vB payment at ${yourRate} sat/vB lands in <b>block ${idx + 1}</b>.`;
        }
      };
      el.querySelectorAll("[data-r]").forEach((b) => {
        b.onclick = () => {
          yourRate = Number(b.dataset.r);
          render();
        };
      });
      render();
    },

    // Be the miner: tap the payments in the order a miner should take them, best fee per vbyte first.
    SortBids(el, fin, p) {
      el.classList.add("try", "explorer");
      const fmt = (n) => n.toLocaleString("en-US");
      const rate = (b) => b.fee / b.vsize;
      const order = [...p.bids]
        .sort((a, b) => rate(b) - rate(a))
        .map((b) => b.id);
      const placed = [];
      el.innerHTML =
        `<span class="label">${ico("layers")}${p.label}</span>` +
        `<p>${p.intro}</p>` +
        `<div class="bids" role="group" aria-label="Payments">` +
        p.bids
          .map(
            (b) =>
              `<button type="button" class="bid" data-id="${b.id}"><span class="stamp">${b.id}</span><b>${fmt(b.fee)} sat</b><span>${b.vsize} vB</span></button>`,
          )
          .join("") +
        `</div>` +
        `<div class="queue" data-queue><span class="small">Miner’s queue:</span></div>` +
        `<p class="activity-status" data-status role="status" aria-live="polite">${ico("target")}Tap the best deal per vbyte first.</p>`;
      const status = $("[data-status]", el);
      el.querySelectorAll("[data-id]").forEach((card) => {
        card.onclick = () => {
          const id = card.dataset.id;
          if (placed.includes(id)) return;
          if (id !== order[placed.length]) {
            status.dataset.result = "bad";
            status.innerHTML =
              ico("cross") +
              "Not that one yet. Compare fee per vbyte, not the total.";
            return;
          }
          const bid = p.bids.find((b) => b.id === id);
          placed.push(id);
          card.classList.add("placed");
          card.disabled = true;
          card.insertAdjacentHTML(
            "beforeend",
            `<span class="rate">${rate(bid)} sat/vB</span>`,
          );
          $("[data-queue]", el).insertAdjacentHTML(
            "beforeend",
            `<span class="tile in">${ico("check")}${placed.length}. ${id}</span>`,
          );
          status.dataset.result = "good";
          if (placed.length === order.length) {
            status.innerHTML = ico("check") + p.done;
            fin();
          } else {
            status.innerHTML = ico("check") + "Correct. Who is next?";
          }
        };
      });
    },

    Explorer(el, fin, p) {
      el.classList.add("try", "explorer");
      const tabs = [
        ["now", "Now"],
        ["trends", "Trends"],
        ["dag", "DAG"],
      ];
      el.innerHTML =
        `<span class="label">${p.label}</span><p>${p.intro}</p>` +
        `<div class="ctl" role="tablist">` +
        tabs
          .map(
            ([k, l]) =>
              `<button type="button" class="ghost" role="tab" data-tab="${k}" aria-pressed="false">${l}</button>`,
          )
          .join("") +
        `</div><div data-panel role="tabpanel"></div>`;
      const panel = $("[data-panel]", el);
      const seen = new Set();
      const show = (k) => {
        el.querySelectorAll("[data-tab]").forEach((b) =>
          b.setAttribute("aria-pressed", String(b.dataset.tab === k)),
        );
        seen.add(k);
        if (k === "now") panel.innerHTML = nowView(p.now);
        if (k === "trends") panel.innerHTML = trendView(p.trend);
        if (k === "dag") {
          panel.innerHTML = dagView(p.dag);
          bindDag(panel, p.dag);
        }
        if (seen.size === tabs.length) fin();
      };
      el.querySelectorAll("[data-tab]").forEach(
        (b) => (b.onclick = () => show(b.dataset.tab)),
      );
      show("now");
    },
    // One dropdown per term; all must match.
    Match(el, fin, p) {
      el.classList.add("try");
      el.innerHTML =
        `<span class="label">${p.label}</span>` +
        p.terms
          .map(
            (t) =>
              `<div class="match-item"><label for="m-${t.key}">${t.label}</label><select id="m-${t.key}">${p.roles.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></div>`,
          )
          .join("") +
        `<div class="ctl"><button type="button" data-check>Check my matches</button></div>` +
        `<p class="activity-status" data-status role="status" aria-live="polite"></p>`;
      $("[data-check]", el).onclick = () => {
        let correct = 0;
        const entries = Object.entries(p.answers);
        entries.forEach(([key, answer]) => {
          const field = $(`#m-${key}`, el);
          const valid = field.value === answer;
          field.setAttribute("aria-invalid", String(!valid));
          if (valid) correct++;
        });
        const status = $("[data-status]", el);
        const all = correct === entries.length;
        status.dataset.result = all ? "good" : "bad";
        status.textContent = all
          ? p.done
          : `${correct} of ${entries.length} correct. Review the roles above, then try again.`;
        if (all) fin();
      };
    },
    CodeExercise(el, fin, p) {
      el.classList.add("try");
      el.innerHTML = `<span class="label">${escapeHTML(p.label)}</span>
            <p>${inline(p.task)}</p>
            <textarea class="codebox" spellcheck="false" aria-label="Your ${escapeHTML(p.fn)} function"></textarea>
            <button data-run>Run the tests</button>
            <div data-res></div>`;
      const ta = $("textarea", el);
      ta.value = p.starter;
      $("[data-run]", el).onclick = () => {
        let all = true;
        const rows = p.cases.map((c) => {
          let got = null,
            err = null;
          try {
            got = runUserFn(ta.value, p.fn, c.args);
          } catch (e) {
            err = e.message;
          }
          const pass =
            err === null && JSON.stringify(got) === JSON.stringify(c.expect);
          all = all && pass;
          const shown = err !== null ? "error: " + err : JSON.stringify(got);
          return `<tr><td>${escapeHTML(c.label)}</td><td><code>${escapeHTML(JSON.stringify(c.args))}</code></td><td>${escapeHTML(JSON.stringify(c.expect))}</td><td>${escapeHTML(shown)}</td><td>${pass ? "pass" : "fail"}</td></tr>`;
        });
        $("[data-res]", el).innerHTML =
          `<table class="vtable exercise-table"><thead><tr><th>case</th><th>input</th><th>expected</th><th>got</th><th></th></tr></thead><tbody>${rows.join("")}</tbody></table>` +
          (all
            ? `<p class="msg">${escapeHTML(p.done)}</p>`
            : '<p class="small">Not every case passes yet. The table shows what your function returned for each one.</p>');
        if (all) fin();
      };
    },

    Storybook(el, fin, p) {
      el.classList.add("try", "book");
      const n = p.pages.length;
      el.innerHTML = `<div class="book-scene" data-scene></div>
            <div class="book-page book-text" data-page aria-live="polite"></div>
            <div class="book-nav">
              <button class="ghost" data-prev>Back</button>
              <div class="dots">${p.pages.map((_, i) => `<button aria-label="Page ${i + 1}" data-dot="${i}"></button>`).join("")}</div>
              <button data-next>Turn the page</button>
            </div>`;
      const prev = $("[data-prev]", el),
        next = $("[data-next]", el),
        page = $("[data-page]", el),
        dots = [...el.querySelectorAll("[data-dot]")],
        seen = new Set();
      let i = 0;
      const show = (j) => {
        i = j;
        seen.add(j);
        const pg = p.pages[j];
        $("[data-scene]", el).innerHTML = SCENES[pg.scene];
        page.innerHTML = `<div class="book-year">${pg.year} · page ${j + 1} of ${n}</div><h3>${pg.title}</h3>${md(pg.text)}<p class="moral">${inline(pg.moral)}</p>`;
        restart(page, "turn");
        prev.disabled = j === 0;
        next.disabled = j === n - 1;
        next.textContent = j === n - 1 ? "The end" : "Turn the page";
        dots.forEach((d, k) => d.setAttribute("aria-current", String(k === j)));
        if (seen.size === n) fin();
      };
      prev.onclick = () => show(i - 1);
      next.onclick = () => show(i + 1);
      dots.forEach((d, k) => (d.onclick = () => show(k)));
      show(0);
    },

    SignMachine(el, fin) {
      el.classList.add("try", "lab");
      const names = [
        "Message",
        "Fingerprint",
        "Inside the wallet",
        "Published",
      ];
      const kOpts = Array.from(
        { length: 10 },
        (_, i) =>
          `<option value="${i + 1}"${i === 2 ? " selected" : ""}>${i + 1}</option>`,
      ).join("");
      el.innerHTML = `<span class="label">Try it · The signing machine</span>
            <div class="ctl">
              <label class="f">Message<input type="text" data-msg maxlength="40" value="Pay Aarav 0.5 BTC" /></label>
              <label class="f">Nonce k<select data-k>${kOpts}</select></label>
              <button data-go>Sign it</button>
            </div>
            <div class="stations">${names.map((t, i) => `<div class="st"><b>${i + 1} · ${t}</b><code></code></div>`).join("")}</div>
            <div class="steplog" data-log aria-live="polite"></div>`;
      const st = [...el.querySelectorAll(".st")],
        log = $("[data-log]", el);
      let tok = 0;
      const light = (i, text) => {
        st.forEach((s, j) => {
          s.classList.toggle("on", j === i);
          if (j < i) s.classList.add("done");
        });
        const c = $("code", st[i]);
        c.textContent = text;
        restart(c, "flip");
      };
      const say = (h) => {
        const q = document.createElement("p");
        q.innerHTML = h;
        log.appendChild(q);
      };
      $("[data-go]", el).onclick = async () => {
        const my = ++tok;
        st.forEach((s) => {
          s.classList.remove("on", "done");
          $("code", s).textContent = "";
        });
        log.innerHTML = "";
        const msg = $("[data-msg]", el).value.trim() || "(empty message)",
          k = +$("[data-k]", el).value,
          z = toyHash(msg),
          sg = toySign(z, TX, k);
        light(0, msg);
        say(`Meera’s wallet receives the message <b>${escapeHTML(msg)}</b>.`);
        await sleep(900);
        if (my !== tok) return;
        light(1, "z = " + z);
        say(
          `It boils the message down to a short fingerprint, <b>z = ${z}</b>. In real Bitcoin, changing a single letter gives a completely different z. (This toy fingerprint has only 11 possible values. A real one has 2<sup>256</sup>.)`,
        );
        await sleep(1200);
        if (my !== tok) return;
        if (!sg) {
          light(2, "unlucky nonce");
          say(
            `With k = ${k} this message makes <b>s = 0</b>, which is not allowed. Pick another nonce and sign again.`,
          );
          return;
        }
        light(2, `x secret, k = ${k}`);
        say(
          `Inside the wallet, using the private key x = ${TX} (never published):<br>r = (4<sup>${k}</sup> mod 23) mod 11 = ${sg.R} mod 11 = <b>${sg.r}</b><br>s = k⁻¹·(z + x·r) mod 11 = ${sg.ki}·(${z} + ${TX}·${sg.r}) mod 11 = <b>${sg.s}</b>`,
        );
        await sleep(1400);
        if (my !== tok) return;
        light(3, `(r, s) = (${sg.r}, ${sg.s})`);
        st[3].classList.add("done");
        const chk = toyVerify(z, sg.r, sg.s, TY);
        say(
          `Published: the signature <b>(${sg.r}, ${sg.s})</b>. The private key is not in it. A checker who knows only the public key y = ${TY} and z = ${z} gets: <b>${chk.ok ? "valid" : "invalid"}</b>.`,
        );
        say(
          `Change the nonce and sign again. The pair (r, s) changes completely, yet every one of them verifies.`,
        );
        fin();
      };
    },

    VerifyLab(el, fin) {
      el.classList.add("try", "lab");
      const M0 = "Pay Aarav 0.5 BTC",
        M1 = "Pay Mallory 5 BTC",
        sig = toySign(toyHash(M0), TX, 3),
        eveY = tpow(TG, 3),
        on = { msg: false, key: false, sig: false };
      let sawOk = false,
        sawNo = false;
      const toggles = [
        ["msg", "Tamper with the message"],
        ["key", "Check against Eve’s public key"],
        ["sig", "Alter the signature"],
      ];
      el.innerHTML = `<span class="label">Try it · Break the signature</span>
            <div class="vpaper">
              <div class="vp-msg" data-m></div>
              <div class="vp-row"><span>Signature</span><b data-sg></b></div>
              <div class="vp-row"><span>Public key</span><b data-pk></b></div>
            </div>
            <div class="ctl">${toggles.map(([k, t]) => `<button class="ghost" aria-pressed="false" data-t="${k}">${t}</button>`).join("")}<button class="ghost" data-reset>Reset</button></div>
            <ol class="steplog" data-steps aria-live="polite"></ol>
            <div class="verdict" data-verdict></div>`;
      const render = () => {
        const m = on.msg ? M1 : M0,
          z = toyHash(m),
          s = on.sig ? tmod(sig.s + 1) : sig.s,
          y = on.key ? eveY : TY,
          v = toyVerify(z, sig.r, s, y);
        $("[data-m]", el).textContent = m;
        $("[data-m]", el).classList.toggle("bad", on.msg);
        const sgEl = $("[data-sg]", el);
        sgEl.textContent = `(r, s) = (${sig.r}, ${s})`;
        sgEl.classList.toggle("bad", on.sig);
        const pkEl = $("[data-pk]", el);
        pkEl.textContent = on.key
          ? `y = ${y} (Eve’s key)`
          : `y = ${y} (Meera’s key)`;
        pkEl.classList.toggle("bad", on.key);
        const lines = [
          `Fingerprint of the message: <b>z = ${z}</b>`,
          `w = s⁻¹ mod 11 = <b>${v.w}</b>`,
          `u1 = z·w mod 11 = <b>${v.u1}</b>, u2 = r·w mod 11 = <b>${v.u2}</b>`,
          `v = (4<sup>${v.u1}</sup>·${y}<sup>${v.u2}</sup> mod 23) mod 11 = ${v.V} mod 11 = <b>${v.v}</b>`,
          `Compare: v = ${v.v}, r = ${sig.r}.`,
        ];
        $("[data-steps]", el).innerHTML = lines
          .map((l, i) => `<li style="animation-delay:${i * 0.35}s">${l}</li>`)
          .join("");
        const why = [
          on.msg && "the message changed after signing, so z no longer matches",
          on.key && "this public key does not belong to the signer",
          on.sig && "the signature was altered",
        ].filter(Boolean);
        $("[data-verdict]", el).innerHTML =
          `<span class="stamp ${v.ok ? "ok" : "no"}" style="animation-delay:${lines.length * 0.35}s">${v.ok ? "VALID" : "REJECTED"}</span>` +
          `<p class="small" style="animation:fade .5s ${lines.length * 0.35 + 0.3}s both">${v.ok ? "Everything matches, so v equals r. Nobody needed the private key to see that." : "v is not equal to r because " + why.join(" and ") + "."}</p>`;
        el.querySelectorAll("[data-t]").forEach((b) =>
          b.setAttribute("aria-pressed", String(on[b.dataset.t])),
        );
        if (v.ok) sawOk = true;
        else sawNo = true;
        if (sawOk && sawNo) fin();
      };
      el.querySelectorAll("[data-t]").forEach(
        (b) =>
          (b.onclick = () => {
            on[b.dataset.t] = !on[b.dataset.t];
            render();
          }),
      );
      $("[data-reset]", el).onclick = () => {
        on.msg = on.key = on.sig = false;
        render();
      };
      render();
    },

    WhereUsed(el, fin, p) {
      el.classList.add("try", "lab");
      const seen = new Set();
      el.innerHTML = `<span class="label">Explore · Signatures around you</span>
            <div class="chips" data-tabs>${p.items.map((it, i) => `<button class="chip" aria-pressed="false" data-i="${i}">${it.name}</button>`).join("")}</div>
            <div class="use" data-panel aria-live="polite"><p class="small">Pick a tile to see how it works.</p></div>
            <p class="small" data-count>0 of ${p.items.length} explored</p>`;
      const tabs = [...el.querySelectorAll("[data-i]")];
      tabs.forEach((t) => {
        t.onclick = () => {
          const i = +t.dataset.i,
            it = p.items[i];
          seen.add(i);
          tabs.forEach((x) => {
            x.classList.toggle("right", x === t);
            x.setAttribute("aria-pressed", String(x === t));
          });
          $("[data-panel]", el).innerHTML = `<h3>${it.name}</h3>
                <div class="use-flow">
                  <div class="node"><small>Signs</small>${it.signer}</div><div class="wire"><i></i></div>
                  <div class="node"><small>What is signed</small>${it.signs}</div><div class="wire"><i></i></div>
                  <div class="node"><small>Checks</small>${it.checker}</div>
                </div>
                <p>${it.line}</p><p class="small"><b>Try it:</b> ${inline(it.tryit)}</p>`;
          $("[data-count]", el).textContent =
            `${seen.size} of ${p.items.length} explored`;
          if (seen.size === p.items.length) fin();
        };
      });
    },

    LoginDemo(el, fin) {
      el.classList.add("try", "lab");
      let chal = null,
        last = null,
        prevZ = -1,
        busy = false,
        replayed = false,
        tries = 0,
        lucky = 0;
      el.innerHTML = `<span class="label">Try it · Log in with a signature</span>
            <div class="login-grid">
              <div class="peer"><b>shop.example</b><small>knows only y = ${TY}</small></div>
              <div class="lane"><span class="fly" data-fly></span></div>
              <div class="peer"><b>Meera’s phone</b><small>holds x, never sends it</small></div>
            </div>
            <div class="ctl"><button data-ask>1 · Ask to log in</button><button data-ok disabled>2 · Approve on the phone</button></div>
            <div class="ctl"><span class="small">Eve is listening on the wire:</span><button class="ghost" data-replay disabled>Replay Meera’s old signature</button><button class="ghost" data-guess disabled>Guess a signature</button></div>
            <ol class="feed" data-feed aria-live="polite"></ol>`;
      const ask = $("[data-ask]", el),
        ok = $("[data-ok]", el),
        replay = $("[data-replay]", el),
        guess = $("[data-guess]", el),
        feed = $("[data-feed]", el),
        fly = $("[data-fly]", el);
      const add = (cls, h) => {
        const li = document.createElement("li");
        li.className = cls;
        li.innerHTML = h;
        feed.appendChild(li);
      };
      const send = async (label, dir) => {
        fly.textContent = label;
        fly.className = "fly go-" + dir;
        await sleep(950);
        fly.className = "fly";
      };
      const freshZ = (...avoid) => {
        let z;
        do z = Math.floor(Math.random() * TQ);
        while (avoid.includes(z));
        prevZ = z;
        return z;
      };
      const verdict = (z, r, s) => {
        const v = toyVerify(z, r, s, TY);
        return { ok: v.ok, text: `v = ${v.v}, r = ${r}` };
      };
      ask.onclick = async () => {
        if (busy) return;
        busy = true;
        feed.innerHTML = "";
        chal = freshZ(prevZ);
        add(
          "",
          `<b>shop.example</b> sends a fresh random challenge: <b>z = ${chal}</b>.`,
        );
        await send("z = " + chal, "r");
        ok.disabled = false;
        busy = false;
      };
      ok.onclick = async () => {
        if (busy || chal === null) return;
        busy = true;
        ok.disabled = true;
        let sg, k;
        // r of 1 or 2 can collide in the tiny toy group, so skip those nonces.
        do {
          k = pick(10);
          sg = toySign(chal, TX, k);
        } while (!sg || sg.r < 3);
        add(
          "",
          `Meera’s phone signs z = ${chal} with a fresh nonce k = ${k}: <b>(r, s) = (${sg.r}, ${sg.s})</b>.`,
        );
        await send(`(${sg.r}, ${sg.s})`, "l");
        const v = verdict(chal, sg.r, sg.s);
        add(
          v.ok ? "ok" : "no",
          `shop.example checks with y = ${TY}: ${v.text}. <b>${v.ok ? "Welcome back, Meera." : "Rejected."}</b>`,
        );
        last = { z: chal, r: sg.r, s: sg.s };
        chal = null;
        replay.disabled = guess.disabled = false;
        busy = false;
      };
      replay.onclick = async () => {
        if (busy || !last) return;
        busy = true;
        ok.disabled = true;
        feed.innerHTML = "";
        chal = null;
        const z2 = freshZ(prevZ, last.z);
        add(
          "",
          `A new login starts. <b>shop.example</b> sends challenge <b>z = ${z2}</b>.`,
        );
        await send("z = " + z2, "r");
        add(
          "",
          `Eve answers with the old signature <b>(${last.r}, ${last.s})</b> that she copied from the wire.`,
        );
        await send(`(${last.r}, ${last.s})`, "l");
        const v = verdict(z2, last.r, last.s);
        add(
          v.ok ? "ok" : "no",
          `shop.example checks: ${v.text}. <b>${v.ok ? "Accepted." : "Rejected."}</b> A signature only fits the challenge it was made for, so a copy is useless.`,
        );
        replayed = true;
        if (replayed) fin();
        busy = false;
      };
      guess.onclick = async () => {
        if (busy || !last) return;
        busy = true;
        ok.disabled = true;
        feed.innerHTML = "";
        chal = null;
        const z2 = freshZ(prevZ),
          r = pick(10),
          s = pick(10);
        add(
          "",
          `A new login starts. <b>shop.example</b> sends challenge <b>z = ${z2}</b>.`,
        );
        await send("z = " + z2, "r");
        add("", `Eve has no private key, so she guesses <b>(${r}, ${s})</b>.`);
        await send(`(${r}, ${s})`, "l");
        const v = verdict(z2, r, s);
        tries++;
        if (v.ok) lucky++;
        add(
          v.ok ? "ok" : "no",
          v.ok
            ? `${v.text}. <b>Accepted: a lucky guess.</b> This toy group has only 100 possible signatures, so about 1 guess in 10 passes. In Bitcoin the odds are about 1 in 2<sup>256</sup>.`
            : `${v.text}. <b>Rejected.</b> (Guesses so far: ${tries}, accepted: ${lucky}.)`,
        );
        busy = false;
      };
    },

    NonceTrap(el, fin) {
      el.classList.add("try", "lab");
      const MA = "Pay Aarav 0.5 BTC",
        MB = "Pay Aarav 0.2 BTC",
        zA = toyHash(MA),
        zB = toyHash(MB);
      let reuse = true,
        step = 0;
      el.innerHTML = `<span class="label">Try it · Play Eve</span>
            <div class="ctl">
              <button class="ghost" aria-pressed="true" data-mode="reuse">Wallet reuses k (the bug)</button>
              <button class="ghost" aria-pressed="false" data-mode="fresh">Wallet uses a fresh k each time</button>
            </div>
            <div data-stage></div>
            <div class="ctl"><button data-next></button><button class="ghost" data-again>Start over</button></div>`;
      const stage = $("[data-stage]", el),
        nextBtn = $("[data-next]", el);
      const build = () => {
        const A = toySign(zA, TX, 3),
          B = toySign(zB, TX, reuse ? 3 : 7),
          hl = (v, on) => (on ? `<mark class="hl">${v}</mark>` : v),
          table = (on) =>
            `<table class="nt-table"><thead><tr><th></th><th>message</th><th>z</th><th>signature (r, s)</th></tr></thead><tbody>
                  <tr><td>Tx A</td><td>${MA}</td><td>${zA}</td><td>(${hl(A.r, on)}, ${A.s})</td></tr>
                  <tr><td>Tx B</td><td>${MB}</td><td>${zB}</td><td>(${hl(B.r, on)}, ${B.s})</td></tr></tbody></table>`;
        if (!reuse)
          return [
            `Two signatures from Meera’s wallet are public. Eve can read them, but she has no private key.${table(false)}`,
            `The r values are different (${A.r} and ${B.r}), so nothing links the two nonces. Eve has two equations but three unknowns: x, k<sub>1</sub> and k<sub>2</sub>. She cannot solve them.`,
            `Eve is stuck. A fresh nonce for every signature keeps x safe. Bitcoin Core derives k from the private key and the message (RFC 6979), so two different messages never share a nonce.`,
          ];
        const k = tmod(tmod(zA - zB) * tinv(tmod(A.s - B.s))),
          x = tmod(tmod(A.s * k - zA) * tinv(A.r));
        return [
          `Two signatures from Meera’s wallet are public. Eve can read them, but she has no private key.${table(false)}`,
          `Look at r: it is <mark class="hl">${A.r}</mark> in both. The same r means the wallet used the same nonce k twice.${table(true)}`,
          `Subtract the two signing equations. The secret x cancels: s<sub>1</sub> − s<sub>2</sub> = k⁻¹·(z<sub>1</sub> − z<sub>2</sub>), so<br>k = (z<sub>1</sub> − z<sub>2</sub>) / (s<sub>1</sub> − s<sub>2</sub>) = (${zA} − ${zB}) / (${A.s} − ${B.s}) = <b>${k}</b> (mod 11).`,
          `Rearrange s = k⁻¹·(z + x·r) for x:<br>x = (s·k − z) / r = (${A.s}·${k} − ${zA}) / ${A.r} = <b>${x}</b> (mod 11).`,
          `Check: 4<sup>${x}</sup> mod 23 = ${tpow(TG, x)}, which is Meera’s public key. Eve now holds the private key and can sign anything as Meera.<div class="nt-reveal"><span class="nt-key">private key x = ${x}</span></div>`,
        ];
      };
      const render = () => {
        const steps = build();
        stage.innerHTML =
          `<ol class="steplog">` +
          steps
            .slice(0, step + 1)
            .map((s) => `<li>${s}</li>`)
            .join("") +
          `</ol>`;
        const lastStep = step >= steps.length - 1;
        nextBtn.disabled = lastStep;
        nextBtn.textContent = lastStep ? "Done" : "Next step";
        el.querySelectorAll("[data-mode]").forEach((b) =>
          b.setAttribute(
            "aria-pressed",
            String((b.dataset.mode === "reuse") === reuse),
          ),
        );
        if (lastStep && reuse) fin();
      };
      nextBtn.onclick = () => {
        step++;
        render();
      };
      $("[data-again]", el).onclick = () => {
        step = 0;
        render();
      };
      el.querySelectorAll("[data-mode]").forEach(
        (b) =>
          (b.onclick = () => {
            reuse = b.dataset.mode === "reuse";
            step = 0;
            render();
          }),
      );
      render();
    },
  };

  const BLOCKS = {
    text: (b) => wrap(md(b.md)),
    aside: (b) => wrap(inline(b.md), "aside"),
    heading: (b) => {
      const h = document.createElement("h3");
      h.textContent = b.text;
      return h;
    },
    table: (b) =>
      wrap(
        `<table><thead><tr>${b.headers.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>` +
          b.rows
            .map(
              (r) =>
                `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`,
            )
            .join("") +
          `</tbody></table>`,
      ),
    figure: (b) => {
      const el = document.createElement("figure");
      el.innerHTML =
        ASSETS[b.asset] + `<figcaption>${inline(b.caption)}</figcaption>`;
      return el;
    },
    widget: (b) => {
      const el = wrap("");
      WIDGETS[b.name](el, () => done(b.id), b.props || {});
      return el;
    },
    reflect: (b) => {
      const el = wrap(
        `<div class="try"><span class="label">Write your note</span><p>${b.prompt}</p><textarea placeholder="${b.placeholder}"></textarea><button data-go>Compare with an example</button><div class="out"></div></div>`,
      );
      $("[data-go]", el).onclick = () => {
        $(".out", el).innerHTML =
          `<p>${b.model}</p><p class="small">Use this as a comparison, not something you need to copy word for word.</p>`;
        done(b.id);
      };
      return el;
    },
    next: () => {
      const n = L.next;
      if (!n)
        return wrap(
          `<div class="label">End of ${L.module}</div><h3>${L.title} is complete</h3><p>Return to the course overview to review the module.</p>`,
          "next",
        );
      return wrap(
        `<div class="label">Next lesson</div><h3>${n.id} ${n.title}</h3><p>${n.teaser}</p>`,
        "next",
      );
    },
  };

  $("#head").innerHTML =
    `<div class="kicker">${L.phase} · ${L.module}</div><h1>${L.title}</h1><p class="sub">${L.subtitle}</p><div class="meta">Lesson ${L.id} · about ${L.minutes} minutes · ${L.level}</div>`;
  const main = $("#lesson");
  L.sections.forEach((s) => {
    const sec = document.createElement("section");
    sec.id = s.id;
    sec.innerHTML = `<div class="label">${s.label}</div><h2>${s.title}</h2>`;
    s.blocks.forEach((b) => {
      if (BLOCKS[b.type]) sec.appendChild(BLOCKS[b.type](b));
    });
    main.appendChild(sec);
  });
  prog();
})();
