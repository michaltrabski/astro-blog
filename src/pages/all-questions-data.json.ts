import allQuestionsData from '../data/allQuestionsData';

console.log(2222222222222, allQuestionsData);

export async function get({ params, request }) {
  return {
    body: JSON.stringify({
      allQuestionsData,
    }),
  };
}
