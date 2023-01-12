import type { Question } from '../store/questions';

export const mapAllQuestionsData = (allQuestionsData: any): Question[] => {
  return allQuestionsData.map((q: any) => {
    const newQuestion: Question = {
      id: q.id,
      text: q.text,
      media: q.media,
      a: q.a,
      b: q.b,
      c: q.c,
      t: q.t,
      n: q.n,
      correct_answer: q.correct_answer,
      question_belongs_to_categories: q.question_belongs_to_categories,
      score: q.score,
      is_active: q.is_active,
      is_video: q.is_video,
      slug: `slug-${q.id}`,
    };

    return newQuestion;
  });
};
