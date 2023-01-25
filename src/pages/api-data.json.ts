import apiData from "../data/api-data";

export async function get({ params, request }) {
  return {
    body: JSON.stringify(apiData),
  };
}
