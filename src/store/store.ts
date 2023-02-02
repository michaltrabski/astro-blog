import { atom, map } from 'nanostores';
import { ALL_CATEGORIES, KEY } from "../settings/settings";

import {
  getApiDataFromSessionStorage,
  getCurrentCategoryInitialValue,
  mapApiData,
  sessionStorageSetArrayItem,
  storageSetStringItem,
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



 
export type CartItem = {
  id: string;
  name: string;
  imageSrc: string;
  quantity: number;
}

export const cartItems = map<Record<string, CartItem | any>>({"id99": {
  "clickedCorrectAnswer": false,
  "clickedAnswer": "n",
  "vote": "good"
}});

type ItemDisplayInfo = Pick<CartItem, 'id' | 'name' | 'imageSrc'>;
export function addCartItem({ id, name, imageSrc }: ItemDisplayInfo) {
  const existingEntry = cartItems.get()[id];
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(
      id,
      { id, name, imageSrc, quantity: 1 }
    );
  }
}
// USER
// export const user = atom()




// CATEGORIES
export const _categories = atom<string[]>(ALL_CATEGORIES);

// CURRENT CATEGORY
export const currentCategory = atom(getCurrentCategoryInitialValue());

export const changeCategory = (newCategory: string) => {
  currentCategory.set(newCategory);
  storageSetStringItem(KEY.CURRENT_CATEGORY, newCategory);
};

// QUESTIONS
export const questions = atom<Question[]>([]);

export const loadQuestions = async () => {
  try {
    const apiDataFromSessionStorage = getApiDataFromSessionStorage();

    if (apiDataFromSessionStorage) {
      questions.set(mapApiData(apiDataFromSessionStorage));
      return;
    }

    const fetchResponse = await fetch("../api-data.json");
    const apiData: ApiDataItem[] = await fetchResponse.json();
    console.log(2, "apiData loaded from fetch request", apiData);
    questions.set(mapApiData(apiData));
    sessionStorageSetArrayItem(KEY.API_DATA, apiData);
  } catch (err) {
    console.log("err michal check if you see it on netlify", err);
    questions.set([]);
  }
};

export const addQuestions = (newQuestions: Question[]) => {
  questions.set([...questions.get(), ...newQuestions]);
};
