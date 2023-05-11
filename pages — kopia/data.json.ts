import type { DataReceivedFromEndpoint } from "../store/types";
import { dataForBuild } from "../utils/utils";

const { randomNr, allQuestionsFromEndpoint, allQuestionsCount, allCategories } =
  dataForBuild;

const dataReceivedFromEndpoint: DataReceivedFromEndpoint = {
  randomNr,
  allQuestionsFromEndpoint,
  allQuestionsCount,
  allCategories,
};

export async function get({ params, request }) {
  return {
    body: JSON.stringify(dataReceivedFromEndpoint),
  };
}
