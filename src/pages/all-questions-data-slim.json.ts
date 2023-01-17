import allQuestionsDataSlim from "../data/allQuestionsDataSlim";

console.log(2222222222222, allQuestionsDataSlim);

export async function get({ params, request }) {
  return {
    body: JSON.stringify(allQuestionsDataSlim),
  };
}
