import { getFullUrl } from "../utils/utils";

const HOME = "/";
const DOBRE_ODPOWIEDZI = "twoje-poprawne-odpowiedzi";
const ZLE_ODPOWIEDZI = "twoje-bledne-odpowiedzi";
const ID99 = "id99";
const TWOJE_KONTO = "twoje-konto";
const PYTANIA_Z_TESTOW_NA_PRAWO_JAZDY = "pytania-z-testow-na-prawo-jazdy";
const KATEGORIE_PRAWA_JAZDY = "kategorie-prawa-jazdy";
const CENNIK = "cennik";
const BLOG = "blog";
const SZKOLENIA = "szkolenia";
const KONTAKT = "kontakt";
const POLITYKA_PRYWATNOSCI = "polityka-prywatnosci";
const REGULAMIN = "regulamin";

export const URLS = {
  HOME: getFullUrl(HOME),
  GOOD_ANSWERS: getFullUrl(DOBRE_ODPOWIEDZI),
  BAD_ANSWERS: getFullUrl(ZLE_ODPOWIEDZI),
  QUESTION_1: getFullUrl(ID99),
  USER_ACCONT: getFullUrl(TWOJE_KONTO),
  QUESTION_TABLE: getFullUrl(PYTANIA_Z_TESTOW_NA_PRAWO_JAZDY),
  DRIVING_LICENSE_CATEGIRIES: getFullUrl(KATEGORIE_PRAWA_JAZDY),
  PRICING: getFullUrl(CENNIK),
  BLOG: getFullUrl(BLOG),
  COURSES: getFullUrl(SZKOLENIA),
  CONTACT: getFullUrl(KONTAKT),
  PRIVACY_POLICY: getFullUrl(POLITYKA_PRYWATNOSCI),
  TERMS_AND_CONDITIONS: getFullUrl(REGULAMIN),
} as const;
