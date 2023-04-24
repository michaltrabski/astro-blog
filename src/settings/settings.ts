// export const LOCALHOST = "http://127.0.0.1:3000";
export const LOCALHOST = "http://localhost:3000";
// export const DEPLOY_URL = "https://poznaj-testy.pl";
export const DEPLOY_URL = "https://poznaj-testy-astro.netlify.app";

// LIMITS FOR DEVELOPMENT
export const limitedCategories = ["b"]; // ["a", "b", "c"];
export const showLimitedCategories = true;
export const postsFromOldWordpressLimit = 20; // 123456;
export const allQuestionsLimit = 123456;

export const MEDIA_HOST =
  "https://dacmwwxjyw.cfolks.pl/files/testy-na-prawo-jazdy/";

export const MEDIA_SIZE = {
  small: "size-100/",
  medium: "size-320/",
  large: "size-720/",
} as const;

export const MP3_DIR = "mp3/";
export const MP3_EXTENSION = ".mp3";

export const DEFAUTL_INITIAL_CURRENT_CATEGORY_VALUE = "b";

export enum KEY {
  CURRENT_CATEGORY = "CURRENT_CATEGORY",
  API_DATA = "API_DATA",
  CATEGORIES = "CATEGORIES",
  READY_TO_USE_DATA = "READY_TO_USE_DATA",
}

export const LIMIT_OF_QUESTIONS_IN_API_DATA = 10099999;

export const adverticements = [
  "Napisz w komentarzu odpowiedź na to pytanie i wejdź na stronę poznaj-testy.pl.",
  "Aby odpowiedzieć na to pytanie, wpisz swoją odpowiedź w komentarzu i odwiedź stronę poznaj-testy.pl.",
  "Chętnie poznam Twoją odpowiedź na to pytanie, więc napisz ją w komentarzu i odwiedź stronę poznaj-testy.pl.",
  "Zapraszam do napisania swojej odpowiedzi na to pytanie w komentarzu i odwiedzenia strony poznaj-testy.pl.",
  "Jeśli chcesz podzielić się swoją odpowiedzią na to pytanie, napisz ją w komentarzu i odwiedź stronę poznaj-testy.pl.",
  "Czekam na Twoją odpowiedź na to pytanie w komentarzu i polecam odwiedzenie strony poznaj-testy.pl.",
  "Zachęcam do napisania swojej odpowiedzi na to pytanie w komentarzu oraz do odwiedzenia strony poznaj-testy.pl.",
  "Proszę o napisanie swojej odpowiedzi na to pytanie w komentarzu i o wejście na stronę poznaj-testy.pl.",
  "Być może Twoja odpowiedź na to pytanie będzie ciekawa, więc napisz ją w komentarzu i odwiedź stronę poznaj-testy.pl.",
  "Będę wdzięczny za Twoją odpowiedź na to pytanie w komentarzu oraz za odwiedzenie strony poznaj-testy.pl.",
];

export const features = [
  "Ustaw ciemne lub jasne kolory by wygodniej czytać w nocy.",
  "Oceń czy znasz pytanie dobrze, średnio czy słabo - potem możesz je przeglądać.",
  "Zapisuj swoje ulubione pytania i sprawdź je później.",

  "Przeglądaj pytania, na które udzieliłeś błędnej odpowiedzi.",
  "Ucz się pytań, których jeszcze nigdy nie widziałeś.",
];
