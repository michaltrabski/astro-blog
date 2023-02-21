import {
  DEFAUTL_INITIAL_CURRENT_CATEGORY_VALUE,
  KEY,
} from "../settings/settings";
import type {
  Question,
  ApiDataItem,
  DataReceivedFromSessionStorage,
} from "../store/store";

export const getAllCategoriesFromData = (data: ApiDataItem[]) => {
  const _allCategories: string[] = [];

  data.forEach((item) => {
    _allCategories.push(...item.cats);
  });

  const allCategories = [...new Set(_allCategories)].sort();

  return allCategories;
};

export const createBigObjectDataForInBuildTime = (apiData: ApiDataItem[]) => {
  const _allCategories: string[] = [];

  apiData.forEach((item) => {
    _allCategories.push(...item.cats);
  });

  const allCategories = getAllCategoriesFromData(apiData);

  const allQuestions: Question[] = mapApiData(apiData);

  // return mapApiData(apiData)

  return { allCategories, allQuestions };
};

export const mapApiData = (apiData: ApiDataItem[]): Question[] => {
  return apiData.map((q) => {
    const newQuestion: Question = {
      id: q.id,
      text: q.t,
      media: q.m || "empty.png",
      a: q.a || "",
      b: q.b || "",
      c: q.c || "",
      correctAnswer: q.r,
      categories: q.cats,
      score: q.s,
      isVideo: q.m ? q.m.endsWith(".mp4") : false,
    };

    return newQuestion;
  });
};

export const createQuestionUrl = (question: Question, category: string) => {
  if (category === "b") {
    return `${question.id}`;
  }

  return `${category}/${question.id}`;
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

export const getInitialValue = (
  key: KEY,
  initialValue: string | number | string[]
) => {
  try {
    const valueFromSessionStorage = sessionStorage.getItem(key);

    if (!valueFromSessionStorage) {
      return initialValue;
    }

    if (typeof initialValue === "string" || typeof initialValue === "number") {
      return valueFromSessionStorage;
    }

    if (initialValue instanceof Array) {
      return JSON.parse(valueFromSessionStorage);
    }

    return initialValue;
  } catch (err) {
    return initialValue;
  }
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

export const getDataFromSessionStorage = () => {
  try {
    const dataReceivedFromSessionStorageAsString = sessionStorage.getItem(
      KEY.READY_TO_USE_DATA
    );

    if (!dataReceivedFromSessionStorageAsString) {
      return null;
    }

    const dataReceivedFromSessionStorage: DataReceivedFromSessionStorage =
      JSON.parse(dataReceivedFromSessionStorageAsString);

    return dataReceivedFromSessionStorage;
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

export const sessionStorageSetObj = (
  key: string,
  obj: { [key: string]: any }
) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.log("err", err);
  }
};
