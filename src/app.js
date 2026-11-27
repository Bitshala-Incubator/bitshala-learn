import { lessons, modules } from "../lesson/course-data.js";

const $ = (selector, root = document) => root.querySelector(selector);
const siteRoot = new URL("../", import.meta.url);
const main = $("#lesson");

$("#lesson-nav-title").textContent = "Bitshala Learn · Course Overview";
$("#prog").textContent =
  `${lessons.length} lessons · ${Object.keys(modules).length} modules`;
$("#bar").hidden = true;
$("#head").innerHTML = `
  <div class="course-kicker">BITCOIN · COMPLETE COURSE</div>
  <h1>Explore the course</h1>
  <p class="course-subtitle">Browse the lessons in order, or search by lesson number or title. Open any lesson to read the explanations and try its activities.</p>
  
`;

const groups = new Map();
for (const lesson of lessons) {
  const moduleNumber = lesson.id.split(".")[0];
  if (!groups.has(moduleNumber)) groups.set(moduleNumber, []);
  groups.get(moduleNumber).push(lesson);
}

const search = document.createElement("label");
search.className = "course-search";
search.innerHTML = `<span>Find a lesson</span><input type="search" id="lesson-search" placeholder="Search by lesson number or title" autocomplete="off" />`;
main.append(search);

const moduleList = document.createElement("div");
moduleList.className = "module-list";
const records = [];

for (const [moduleNumber, moduleLessons] of groups) {
  const group = document.createElement("details");
  group.className = "module-group";
  group.open = true;

  const summary = document.createElement("summary");
  summary.className = "module-summary";
  const name = document.createElement("span");
  name.className = "module-name";
  name.textContent = `Module ${moduleNumber} · ${modules[moduleNumber] || "Bitcoin"}`;
  const count = document.createElement("span");

  summary.append(name, count);
  group.append(summary);

  const lessonList = document.createElement("div");
  lessonList.className = "module-lessons";
  for (const lesson of moduleLessons) {
    const card = document.createElement("article");
    card.className = "lesson-card";
    card.dataset.search =
      `${lesson.id} ${lesson.title} ${modules[moduleNumber] || ""}`.toLocaleLowerCase();

    const top = document.createElement("div");
    top.className = "lesson-card-top";
    const id = document.createElement("span");
    id.className = "lesson-id";
    id.textContent = lesson.id;
    const link = document.createElement("a");
    link.className = "start-lesson";
    link.href = new URL(lesson.path, siteRoot);
    link.textContent = "Open lesson →";
    top.append(id, link);

    const title = document.createElement("h3");
    title.textContent = lesson.title;
    card.append(top, title);
    lessonList.append(card);
    records.push({ card, group });
  }
  group.append(lessonList);
  moduleList.append(group);
}
main.append(moduleList);

$("#lesson-search").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLocaleLowerCase();
  for (const { card, group } of records) {
    card.hidden = query && !card.dataset.search.includes(query);
    group.hidden = !group.querySelector(".lesson-card:not([hidden])");
  }
});
