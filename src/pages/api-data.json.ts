import apiData from "../data/api-data";
import { LIMIT_OF_QUESTIONS_IN_API_DATA } from "../settings/settings";

export async function get({ params, request }) {
  return {
    body: JSON.stringify(apiData.slice(0, LIMIT_OF_QUESTIONS_IN_API_DATA)),
  };
}
