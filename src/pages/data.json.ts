import type { DataReceivedFromEndpoint } from "../store/types";
import { dataForBuild } from "../utils/utils";

const { allQuestionsFromEndpoint, allQuestionsCount, allCategories } =
  dataForBuild;

const dataReceivedFromEndpoint: DataReceivedFromEndpoint = {
  allQuestionsFromEndpoint,
  allQuestionsCount,
  allCategories,
};

export async function get({ params, request }) {
  return {
    body: JSON.stringify(dataReceivedFromEndpoint),
  };
}
