import { lessons } from "./course-data.js";

const lessonData = JSON.parse(
  document.querySelector("#lesson-data").textContent,
);
const index = lessons.findIndex((lesson) => lesson.id === lessonData.id);
if (index === -1) {
  throw new Error(`No navigation entry found for lesson ${lessonData.id}.`);
}

const siteRoot = new URL("../../../", window.location.href);

const mountNavigation = () => {
  const container = document.querySelector("#lesson .next");
  if (!container || container.querySelector(".lesson-navigation")) return false;

  container.querySelectorAll("a.next-link").forEach((link) => link.remove());

  const navigation = document.createElement("div");
  navigation.className = "lesson-navigation";
  navigation.setAttribute("role", "group");
  navigation.setAttribute("aria-label", "Lesson navigation");

  const createLink = (lesson, direction, isOverview = false) => {
    const link = document.createElement("a");
    link.className = "next-link";
    link.href = isOverview
      ? new URL("index.html", siteRoot)
      : new URL(lesson.path, siteRoot);
    link.textContent = isOverview
      ? direction === "previous"
        ? "← Course overview"
        : "Course overview →"
      : direction === "previous"
        ? `← Previous lesson ${lesson.id}`
        : `Start lesson ${lesson.id} →`;
    return link;
  };

  navigation.append(
    index > 0
      ? createLink(lessons[index - 1], "previous")
      : createLink(null, "previous", true),
    index < lessons.length - 1
      ? createLink(lessons[index + 1], "next")
      : createLink(null, "next", true),
  );
  container.append(navigation);
  return true;
};

if (!mountNavigation()) {
  const observer = new MutationObserver(() => {
    if (mountNavigation()) observer.disconnect();
  });
  observer.observe(document.querySelector("#lesson"), {
    childList: true,
    subtree: true,
  });
}
