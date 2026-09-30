export function validateLesson(lesson, quizBank, widgets) {
  const errors = [];

  const questions = Object.fromEntries(
    quizBank.map((question) => [question.id, question]),
  );

  lesson.sections.forEach((section) => {
    section.blocks.forEach((block) => {
      if (!block.type) {
        errors.push(`${section.id}: block is missing a type`);

        return;
      }

      const supportedBlocks = [
        "text",
        "aside",
        "figure",
        "timeline",
        "widget",
        "choice",
        "quiz",
        "reflect",
        "next",
      ];

      if (!supportedBlocks.includes(block.type)) {
        errors.push(`${section.id}: unknown block "${block.type}"`);
      }

      if (block.type === "widget" && !widgets[block.name]) {
        errors.push(`${section.id}: unknown widget "${block.name}"`);
      }

      if (block.type === "figure") {
        if (!block.asset) {
          errors.push(`${section.id}: figure is missing an asset`);
        }
      }

      if (block.type === "quiz") {
        (block.questionIds || []).forEach((questionId) => {
          if (!questions[questionId]) {
            errors.push(`${section.id}: missing question "${questionId}"`);
          }
        });
      }
    });
  });

  return errors;
}
