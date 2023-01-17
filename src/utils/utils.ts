import type { Question, QuestionSlim } from '../store/questions';

export const mapAllQuestionsData = (allQuestions: QuestionSlim[]): Question[] => {
  return allQuestions.map((q) => {
    const newQuestion: Question = {
      id: q.id,
      text: q.t,
      media: q.m || "empty.png",
      a: q.a || '',
      b: q.b || '',
      c: q.c || '',
      correct_answer: q.right,
      question_belongs_to_categories: q.cats,
      score: q.s,
      is_video: q.m ? q.m.endsWith('.mp4'): false,
      slug: `slug-${q.id}`,
    };

    return newQuestion;
  });
};
