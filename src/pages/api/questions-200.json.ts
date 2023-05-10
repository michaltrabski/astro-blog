import apiResponse200 from "../../data/questions-200.json";

export async function get({ params, request }) {
  return {
    body: JSON.stringify(apiResponse200),
  };
}
