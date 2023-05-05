export async function get({ params, request }) {
  return {
    body: JSON.stringify([
      "strona1",
      "strona2",
      "strona3",
      "strona4",
      "strona5",
      "strona6",
    ]),
  };
}
