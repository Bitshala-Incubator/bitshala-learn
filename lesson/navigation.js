const lessons = [
  {
    id: "1.1",
    title: "The Problem Before Bitcoin",
    path: "lesson/1.Lesson/1.1-the-problem-before-bitcoin/index.html",
  },
  {
    id: "1.2",
    title: "Getting Started with Bitcoin",
    path: "lesson/1.Lesson/1.2-getting-started-with-bitcoin/index.html",
  },
  {
    id: "2.1",
    title: "Bitcoin Overview",
    path: "lesson/2.Lesson/2.1-bitcoin-overview/index.html",
  },
  {
    id: "2.2",
    title: "Transaction at a High Level",
    path: "lesson/2.Lesson/2.2-transaction-at-high-level/index.html",
  },
  {
    id: "3.1",
    title: "Bitcoin Core",
    path: "lesson/3.Lesson/3.1-bitcoin-core/index.html",
  },
  {
    id: "3.2",
    title: "Bitcoin Core RPC",
    path: "lesson/3.Lesson/3.2-bitcoin-core-rpc/index.html",
  },
  {
    id: "4.1",
    title: "Keys",
    path: "lesson/4.Lesson/4.1-keys/index.html",
  },
  {
    id: "4.2",
    title: "Addresses",
    path: "lesson/4.Lesson/4.2-addresses/index.html",
  },
  {
    id: "5.1",
    title: "Deterministic Wallets",
    path: "lesson/5.Lesson/5.1-Deterministic Wallets/index.html",
  },
  {
    id: "5.2",
    title: "Seed Phrases and Wallet Recovery",
    path: "lesson/5.Lesson/5.2-Seed-Phrases/index.html",
  },
  {
    id: "6.1",
    title: "Transaction Structure",
    path: "lesson/6.Lesson/6.1/index.html",
  },
  {
    id: "6.2",
    title: "SegWit and Serialization",
    path: "lesson/6.Lesson/6.2/index.html",
  },
  {
    id: "7.1",
    title: "Bitcoin Script",
    path: "lesson/7.Lesson/7.1-bitcoin-script/index.html",
  },
  {
    id: "7.2",
    title: "Advanced Spending Conditions",
    path: "lesson/7.Lesson/7.2-advanced-spending-conditions/index.html",
  },
  {
    id: "8.1",
    title: "Signatures",
    path: "lesson/8.Lesson/8.1-signatures/index.html",
  },
];

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
