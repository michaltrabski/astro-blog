import { allQuestions } from '../data/data';

export async function get({ params, request }) {
  return {
    body: JSON.stringify({
      allQuestions,
    }),
  };
}
