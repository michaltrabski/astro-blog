import type { Question, ApiDataItem } from "../store/questions";

export const mapApiData = (allQuestions: ApiDataItem[]): Question[] => {
  return allQuestions.map((q) => {
    const newQuestion: Question = {
      id: q.id,
      text: q.t,
      media: q.m || "empty.png",
      a: q.a || "",
      b: q.b || "",
      c: q.c || "",
      correctAnswer: q.right,
      categories: q.cats,
      score: q.s,
      isVideo: q.m ? q.m.endsWith(".mp4") : false,
    };

    return newQuestion;
  });
};

export const createQuestionUrl = (questionId: string) => {
  return `to-jest-url-${questionId}`;
}
