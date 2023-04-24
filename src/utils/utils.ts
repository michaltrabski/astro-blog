import _apiData from "../data/api-data";

import _ from "lodash";
import slugify from "slugify";
import {
  allQuestionsLimit,
  DEFAUTL_INITIAL_CURRENT_CATEGORY_VALUE,
  DEPLOY_URL,
  KEY,
  limitedCategories,
  LOCALHOST,
  postsFromOldWordpressLimit,
  showLimitedCategories,
} from "../settings/settings";
import postsFromOldWordpress from "../data/postsFromOldWordpress.json";
import type { WordpressPost } from "../types/types";
import type { ApiDataItem, DataReceivedFromSessionStorage, GivenAnswer, Question } from "../store/types";
import { _changeNextQuestionUrl, _changePrevQuestionUrl } from "../store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

export async function addToFirebaseDocument(db: any , collectionName: string, documentName: string, data: any) {
 
  const cityRef = doc(db, collectionName, documentName);
  return  setDoc(cityRef, data, { merge: true });
}


export async function signIn(auth: any) {
  return signInWithEmailAndPassword(auth, "michal.trabski+4@gmail.com", "123123");
}

export function randomPrevNextQuestion(
  questions: Question[],
  givenAnswers: Record<string, GivenAnswer>,
  currentCategory: string
): Promise<{ nextQuestion: Question; prevQuestion: Question } | null> {
  return new Promise((resolve) => {
    if (questions.length === 0) {
      resolve(null);
      return null;
    }

    let randomIndex = 0;
    let randomQuestionSupportCurrentCategory = false;
    let isQuestionInGivenAnswers = false;
    let counter = 0;

    // let sss = 0;
    // do {
    //   sss++;
    // } while (sss < 3 * 1000 * 1000* 1000)

    // console.log(sss);

    do {
      counter++;
      randomIndex = Math.floor(Math.random() * questions.length);
      const randomQuestion = questions[randomIndex];

      randomQuestionSupportCurrentCategory = randomQuestion.categories.includes(currentCategory);
      isQuestionInGivenAnswers = !!givenAnswers[randomQuestion.id];

      console.log(
        counter,
        randomQuestionSupportCurrentCategory,
        isQuestionInGivenAnswers,
        givenAnswers,
        givenAnswers[randomQuestion.id]
      );
    } while (counter < 100 && !randomQuestionSupportCurrentCategory && !isQuestionInGivenAnswers);

    const nextQuestion = questions[randomIndex];
    const prevQuestion = nextQuestion;

    _changeNextQuestionUrl(getFullUrl(createQuestionUrl(nextQuestion, currentCategory)));
    _changePrevQuestionUrl(getFullUrl(createQuestionUrl(prevQuestion, currentCategory)));

    resolve({ nextQuestion, prevQuestion });
  });
}

export const createBigObjectDataFromApiDataForBuildTime = () => {
  const apiData = _apiData as ApiDataItem[];

  const _postsFromOldWordpress = postsFromOldWordpress as { postsFromOldWordpress: WordpressPost[] };
  const postsFromOldWordpresOrdered = _.orderBy(_postsFromOldWordpress.postsFromOldWordpress, ["date"], ["desc"]).slice(
    0,
    postsFromOldWordpressLimit
  );

  const _allCategories: string[] = [];

  apiData.forEach((item) => {
    _allCategories.push(...item.cats);
  });

  const allCategories = getAllCategoriesFromData(apiData);

  const allQuestions: Question[] = mapApiData(apiData).slice(0, allQuestionsLimit);

  return {
    allCategories: showLimitedCategories ? limitedCategories : allCategories,
    allQuestions,
    postsFromOldWordpresOrdered,
    postsFromOldWordpresOrdered50: postsFromOldWordpresOrdered.slice(0, 50),
  };
};

export const createQuestionUrl = (question: Question, category: string) => {
  const slug = `${getSlug(question.text.slice(0, 160))}-id-pytania-${question.id.replace("id", "")}`;

  if (category === "b") {
    return `${slug}`;
  }

  return `kat-${category}/${slug}`;
};

export const getFullUrl = (url: string) => {
  const domain = import.meta.env.MODE === "development" ? LOCALHOST : DEPLOY_URL;

  if (!url || url === "/") {
    return domain;
  }

  return domain + "/" + url;
};

export const getSlug = (text: string) => {
  return slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[*+~,.()/'"!:@?;]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "pl", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
};

export const getAllCategoriesFromData = (data: ApiDataItem[]) => {
  const _allCategories: string[] = [];

  data.forEach((item) => {
    _allCategories.push(...item.cats);
  });

  const allCategories = [...new Set(_allCategories)].sort();

  return allCategories;
};

export const mapApiData = (apiData: ApiDataItem[]): Question[] => {
  return apiData.map((q) => {
    const newQuestion: Question = {
      id: q.id,
      text: q.t,
      media: q.m || "placeholder.png",
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

export const getInitialValue = (key: KEY, initialValue: string | number | string[]) => {
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
    const currentCategory = sessionStorage.getItem(KEY.CURRENT_CATEGORY) || DEFAUTL_INITIAL_CURRENT_CATEGORY_VALUE;
    return currentCategory;
  } catch (err) {
    return DEFAUTL_INITIAL_CURRENT_CATEGORY_VALUE;
  }
};

export const getDataFromSessionStorage = () => {
  try {
    const dataReceivedFromSessionStorageAsString = sessionStorage.getItem(KEY.READY_TO_USE_DATA);

    if (!dataReceivedFromSessionStorageAsString) {
      return null;
    }

    const dataReceivedFromSessionStorage: DataReceivedFromSessionStorage = JSON.parse(
      dataReceivedFromSessionStorageAsString
    );

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

export const sessionStorageSetObj = (key: string, obj: { [key: string]: any }) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.log("err", err);
  }
};
