import { getFullUrl } from "../utils/utils";

export const URLS = {
  HOME: getFullUrl(),
  GOOD_ANSWERS:  getFullUrl("dobre-odpowiedzi"),
  BAD_ANSWERS:  getFullUrl("zle-odpowiedzi"),
  QUESTION_1:  getFullUrl("id99"),
  USER_ACCONT:  getFullUrl("twoje-konto"),
  QUESTION_TABLE: getFullUrl("pytania-z-testow-na-prawo-jazdy"),
  DRIVING_LICENSE_CATEGIRIES: getFullUrl("kategorie-prawo-jazdy"),
  PRICING:  getFullUrl("cennik"),
  BLOG:  getFullUrl("blog"),
  COURSES: getFullUrl("szkolenia"),
  CONTACT: getFullUrl("kontakt"),
  PRIVACY_POLICY: getFullUrl("polityka-prywatnosci"),
  TERMS_AND_CONDITIONS: getFullUrl("regulamin"),
} as const;
