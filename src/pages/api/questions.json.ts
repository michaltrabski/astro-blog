import apiResponse from "../../data/questions.json";

export async function get({ params, request }) {
  return {
    body: JSON.stringify(apiResponse),
  };
}
