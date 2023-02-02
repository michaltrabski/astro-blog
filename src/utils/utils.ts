import {
  DEFAUTL_INITIAL_CURRENT_CATEGORY_VALUE,
  KEY,
} from "../settings/settings";
import type { Question, ApiDataItem } from "../store/store";

export const mapApiData = (allQuestions: ApiDataItem[]): Question[] => {
  return allQuestions.map((q) => {
    const newQuestion: Question = {
      id: q.id,
      text: q.t,
      media: q.m || "empty.png",
      a: q.a || "",
      b: q.b || "",
      c: q.c || "",
      correctAnswer: q.right,
      categories: q.cats,
      score: q.s,
      isVideo: q.m ? q.m.endsWith(".mp4") : false,
    };

    return newQuestion;
  });
};

export const createQuestionUrl = (questionId: string, category: string) => {
  if (category === "b") {
    return `${questionId}`;
  }

  return `${category}/${questionId}`;
};

export const getFullUrl = (url: string) => {
  // import.meta.env.MODE
  // import.meta.env.PROD
  // import.meta.env.DEV

  const domain =
    import.meta.env.MODE === "development"
      ? "http://127.0.0.1:3000"
      : "https://poznaj-testy-astro.netlify.app";

  return domain + "/" + url;
};

export const getCurrentCategoryInitialValue = () => {
  try {
    const currentCategory =
      sessionStorage.getItem(KEY.CURRENT_CATEGORY) ||
      DEFAUTL_INITIAL_CURRENT_CATEGORY_VALUE;
    return currentCategory;
  } catch (err) {
    return DEFAUTL_INITIAL_CURRENT_CATEGORY_VALUE;
  }
};

export const getApiDataFromSessionStorage = () => {
  try {
    const apiData = sessionStorage.getItem(KEY.API_DATA);

    if (apiData) {
      return JSON.parse(apiData) as ApiDataItem[];
    }

    return null;
  } catch (err) {
    return null;
  }
};

export const storageSetStringItem = (key: string, stringValue: string) => {
  try {
    if (typeof stringValue === "string") {
      sessionStorage.setItem(key, stringValue);
    }
  } catch (err) {
    console.log("err", err);
  }
};

export const sessionStorageSetArrayItem = (key: string, arr: any[]) => {
  try {
    if (arr instanceof Array) {
      sessionStorage.setItem(key, JSON.stringify(arr));
    }
  } catch (err) {
    console.log("err", err);
  }
};
