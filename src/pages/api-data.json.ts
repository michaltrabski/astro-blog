import apiData from "../data/api-data";
import { LIMIT_OF_QUESTIONS_IN_API_DATA } from "../settings/settings";
import type { DataReceivedFromEndpoint } from "../store/store";
import { getAllCategoriesFromData } from "../utils/utils";


const allQuestions = apiData.slice(0, LIMIT_OF_QUESTIONS_IN_API_DATA);
const allQuestionsCount = allQuestions.length;
const allCategories = getAllCategoriesFromData(apiData)

const dataReceivedFromEndpoint: DataReceivedFromEndpoint = {
  allQuestions,
  allQuestionsCount,
  allCategories
};

export async function get({ params, request }) {
  return {
    body: JSON.stringify(dataReceivedFromEndpoint) ,
  };
}
