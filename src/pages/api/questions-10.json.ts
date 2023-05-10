import apiResponse10 from "../../data/questions-10.json";

export async function get({ params, request }) {
  return {
    body: JSON.stringify(apiResponse10),
  };
}
