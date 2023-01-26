import { atom } from "nanostores";
import { SESSION_STORAGE_KEY } from "../settings/settings";

import {
  getApiDataFromSessionStorage,
  getCurrentCategoryInitialValue,
  mapApiData,
  sessionStorageSetArrayItem,
  sessionStorageSetStringItem,
} from "../utils/utils";

export interface ApiDataItem {
  id: string;
  t: string;
  m: string;
  a?: string;
  b?: string;
  c?: string;
  right: string;
  cats: string[];
  s: number;
}

export interface Question {
  id: string;
  text: string;
  media: string;
  a: string;
  b: string;
  c: string;
  correctAnswer: string;
  categories: string[];
  score: number;
  isVideo: boolean;
}

export interface QuestionPageData extends Question {
  slug: string;
  category: string;
  prevSlug: string | null;
  nextSlug: string | null;
}


// CATEGORIES
export const _categories = atom<string[]>([]);
export const changeCategories = (newCategories: string[]) => {
  _categories.set(newCategories);
  sessionStorageSetArrayItem(SESSION_STORAGE_KEY.CATEGORIES, newCategories);
};

// CURRENT CATEGORY
export const currentCategory = atom(getCurrentCategoryInitialValue());

export const changeCategory = (newCategory: string) => {
  currentCategory.set(newCategory);
  sessionStorageSetStringItem(
    SESSION_STORAGE_KEY.CURRENT_CATEGORY,
    newCategory
  );
};

// QUESTIONS
export const questions = atom<Question[]>([]);

export const loadQuestions = async () => {
  try {
    const apiDataFromSessionStorage = getApiDataFromSessionStorage();

    if (apiDataFromSessionStorage) {
      questions.set(mapApiData(apiDataFromSessionStorage));
      changeCategories(["a", "a1", "a2", "am", "b", "b1", "c", "d", "t"])
      return;
    }

    const fetchResponse = await fetch("../api-data.json");
    const apiData: ApiDataItem[] = await fetchResponse.json();
    console.log(2, "apiData loaded from fetch request", apiData);
    questions.set(mapApiData(apiData));
    changeCategories(["a", "a1", "a2", "am", "b", "b1", "c", "d", "t"])
    sessionStorageSetArrayItem(SESSION_STORAGE_KEY.API_DATA, apiData);
  } catch (err) {
    console.log("err michal check if you see it on netlify", err);
    questions.set([]);
  }
};

export const addQuestions = (newQuestions: Question[]) => {
  questions.set([...questions.get(), ...newQuestions]);
};
