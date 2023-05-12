const fs = require("fs-extra");
const path = require("path");
const excelToJson = require("convert-excel-to-json");
const slugify = require("slugify");

const EXCEL_FILE_NAME_WITH_QUESTIONS_DATA_FROM_GOV =
  "Baza_pytań_na_egzamin_na_prawo_jazdy_22_02_2022r.xlsx";

console.log(
  "generating allQuestions from excel===",
  EXCEL_FILE_NAME_WITH_QUESTIONS_DATA_FROM_GOV
);

const EXCEL_SHEET_NAME_WITH_QUESTIONS_DATA_FROM_GOV = "Treść pytania";

const excelContent = excelToJson({
  sourceFile: path.resolve(
    __dirname,
    EXCEL_FILE_NAME_WITH_QUESTIONS_DATA_FROM_GOV
  ),
  columnToKey: { "*": "{{columnHeader}}" },
  header: {
    // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
    rows: 1, // 2, 3, 4, etc.
  },
});

const allQuestionsFromExcel =
  excelContent[EXCEL_SHEET_NAME_WITH_QUESTIONS_DATA_FROM_GOV];

// interface SingleQuestion {
//   id: string;
//   slug: string;
//   t: string;
//   r: string;
//   categories: string[];
//   s: number;
//   m?: string;
//   a?: string;
//   b?: string;
//   c?: string;
// }

// const allQuestions: SingleQuestion[]

const sliceQuestonsByArr = [10, 200, 100200];

sliceQuestonsByArr.forEach((sliceBy) => {
  const allQuestions = allQuestionsFromExcel
    .sort(() => Math.random() - 0.5)
    .slice(0, sliceBy)
    .map((question) => {
      const id = `id${question["Numer pytania"]}`;
      const t = question["Pytanie"];

      const slug = slugify(t, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: /[*+~,.()/'"!:@?;]/g, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "pl", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });

      const newQuestion = {
        id,
        slug: `/${slug}-id-pytania-${id.replace("id", "")}`,
        t,
        r: question["Poprawna odp"].toLowerCase(),
        categories: question["Kategorie"].toLowerCase().split(","),
        s: question["Liczba punktów"],
      };

      const media = question["Media"];

      if (media) {
        newQuestion.m = media
          .replace(".wmv", ".mp4")
          .replace(".jpg", ".png")
          .replace(".JPG", ".png");
      }

      const a = question["Odpowiedź A"];

      if (a) {
        newQuestion.a = a;
        newQuestion.b = question["Odpowiedź B"];
        newQuestion.c = question["Odpowiedź C"];
      }

      return newQuestion;
    });

  const allCategories = [
    ...new Set(allQuestions.flatMap((question) => question.categories)),
  ].sort();

  const questionsPerCategoryCountObj = {};
  const firstQuestionUrlsObj = {};

  allCategories.forEach((category) => {
    questionsPerCategoryCountObj[category] = allQuestions.filter((question) =>
      question.categories.includes(category)
    ).length;

    const firstQuestionPerCategory = allQuestions.find((question) =>
      question.categories.includes(category)
    );

    if (firstQuestionPerCategory) {
      firstQuestionUrlsObj[category] = firstQuestionPerCategory.slug;
    }
  });

  // apiResponse
  const apiResponse = {
    allCategories,
    allQuestions,
    questionsPerCategoryCountObj,
    firstQuestionUrlsObj,
  };

  fs.writeJsonSync(
    path.resolve(
      __dirname,
      `questions${sliceBy === 100200 ? "" : "-" + sliceBy}.json`
    ),
    apiResponse
  );

  console.log("allQuestions.length: ", allQuestions.length);
});
