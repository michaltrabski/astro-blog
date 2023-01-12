export const mapAllQuestionsData = (allQuestionsData: any) => {
  return allQuestionsData.map((q: any) => ({
    ...q,
    slug: `slug-${q.id}`,
    dziala: true,
  }));
};
