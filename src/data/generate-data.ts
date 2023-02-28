const fs = require("fs-extra");
const path = require("path");
const excelToJson = require("convert-excel-to-json");

const LIMIT = 100999999;

const EXCEL_FILE_NAME_WITH_QUESTIONS_DATA_FROM_GOV =
  "Baza_pytań_na_egzamin_na_prawo_jazdy_22_02_2022r.xlsx";
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

const allQuestions =
  excelContent[EXCEL_SHEET_NAME_WITH_QUESTIONS_DATA_FROM_GOV];

// {
//   "id": "id99",
//   "t": "Czy w tej sytuacji masz obowiązek zatrzymać pojazd?",
//   "m": "AK_D05_06_org.mp4",
//   "right": "t",
//   "cats": ["x"],
//   "s": 3
// },

const objToBePlacedInApiEndpoint = allQuestions.map((question) => {
  const newQuestion = {
    id: `id${question["Numer pytania"]}`,
    t: question["Pytanie"],
    r: question["Poprawna odp"].toLowerCase(),
    cats: question["Kategorie"].toLowerCase().split(","),
    s: question["Liczba punktów"],
  };

  const media = question["Media"];

  if (media) {
    newQuestion.m = media.replace(".wmv", ".mp4").replace(".jpg", ".png");
  }

  const a = question["Odpowiedź A"];

  if (a) {
    newQuestion.a = a;
    newQuestion.b = question["Odpowiedź B"];
    newQuestion.c = question["Odpowiedź C"];
  }

  return newQuestion;
});

fs.writeJsonSync(
  path.resolve(__dirname, "api-data.json"),
  objToBePlacedInApiEndpoint.slice(0, LIMIT)
);

console.log(
  "Generating data...",
  allQuestions[0],
  objToBePlacedInApiEndpoint.slice(0, 1)
);
