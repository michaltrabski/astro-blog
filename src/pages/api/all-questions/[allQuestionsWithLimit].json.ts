import allQuestions from "../../../data/all-questions";
import type { APIRoute } from "astro";
import { LIMITS } from "../../../settings/settings";

export const get: APIRoute = ({ params, request }) => {
  const limit = +(params.allQuestionsWithLimit ?? "0");

  const allQuestionsShuffled = allQuestions.sort(() => Math.random() - 0.5);
  const allQuestionsLimited = allQuestionsShuffled.slice(0, limit);
  const allCategories = [
    ...new Set(allQuestionsLimited.flatMap((question: any) => question.cats)),
  ].sort();

  const questionsPerCategoryCount = {};

  allCategories.forEach((category) => {
    questionsPerCategoryCount[category] = allQuestionsLimited.filter(
      (question: any) => question.cats.includes(category)
    ).length;
  });

  return {
    body: JSON.stringify({
      allCategories,
      questionsPerCategoryCount,
      allQuestionsCoutn: allQuestionsLimited.length,
      allQuestion: allQuestionsLimited,
    }),
  };
};

export function getStaticPaths() {
  const limitsArray = Object.entries(LIMITS).map(
    ([limitKey, limitValue]) => limitValue
  );

  return limitsArray.map((limitValue) => {
    return {
      params: { allQuestionsWithLimit: limitValue.toString() },
    };
  });

  // return Array.from(
  //   { length: allQuestion.length + 1 },
  //   (_, index) => index
  // ).map((id) => ({ params: { allQuestionsWithLimit: id.toString() } }));
  // return [
  //   { params: { id: "0" } },
  //   { params: { id: "1" } },
  //   { params: { id: "2" } },
  // ];
}
