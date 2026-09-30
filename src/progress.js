const PREFIX = "bitshala-learn:";

export function getProgress(lessonId) {
  const key = PREFIX + lessonId;

  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

export function saveProgress(lessonId, progress) {
  const key = PREFIX + lessonId;

  try {
    localStorage.setItem(key, JSON.stringify(progress));
  } catch {
    // Ignore storage failures.
  }
}

export function createProgressController(lesson) {
  let progress = getProgress(lesson.id);

  const activityCount = lesson.sections
    .flatMap((section) => section.blocks)
    .reduce((count, block) => {
      if (block.type === "quiz") {
        return count + block.questionIds.length;
      }

      if (
        block.type === "widget" ||
        block.type === "choice" ||
        block.type === "reflect"
      ) {
        return count + 1;
      }

      return count;
    }, 0);

  function updateUI() {
    const completed = Object.keys(progress).length;

    const percent =
      activityCount === 0
        ? 0
        : Math.min(100, (completed / activityCount) * 100);

    const progressText = document.getElementById("prog");
    const progressBar = document.getElementById("bar");

    if (progressText) {
      progressText.textContent = `${completed} of ${activityCount} activities`;
    }

    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }
  }

  function done(id) {
    if (progress[id]) {
      return;
    }

    progress[id] = 1;

    saveProgress(lesson.id, progress);

    updateUI();
  }

  updateUI();

  return {
    done,
    updateUI,
    getProgress: () => progress,
  };
}
