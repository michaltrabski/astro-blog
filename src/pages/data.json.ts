import data from "../data/data";
import { LIMIT_OF_QUESTIONS_IN_API_DATA } from "../settings/settings";
import type { DataReceivedFromEndpoint } from "../store/types";

import { getAllCategoriesFromData } from "../utils/utils";

const allQuestions = data.slice(0, LIMIT_OF_QUESTIONS_IN_API_DATA);
const allQuestionsCount = allQuestions.length;
const allCategories = getAllCategoriesFromData(data);

const allQuestionsShuffled = allQuestions.sort(() => Math.random() - 0.5);

const dataReceivedFromEndpoint: DataReceivedFromEndpoint = {
  allQuestions: allQuestionsShuffled,
  allQuestionsCount,
  allCategories,
};

export async function get({ params, request }) {
  return {
    body: JSON.stringify(dataReceivedFromEndpoint),
  };
}
