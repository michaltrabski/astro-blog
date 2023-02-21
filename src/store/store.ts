import { atom, map } from "nanostores";
import {  KEY } from "../settings/settings";

import {
  getDataFromSessionStorage,
  getCurrentCategoryInitialValue,
  getInitialValue,
  mapApiData,
  sessionStorageSetArrayItem,
  storageSetStringItem,
  sessionStorageSetObj,
} from "../utils/utils";

export interface QuestionReceivedFromEndpoint {
  id: string;
  t: string;
  m?: string;
  a?: string;
  b?: string;
  c?: string;
  r: string;
  cats: string[];
  s: number;
}

export interface DataReceivedFromEndpoint {
  allQuestions: QuestionReceivedFromEndpoint[];
  allQuestionsCount: number;
  allCategories: string[];
}

export interface DataReceivedFromSessionStorage {
  allQuestions: Question[];
  allQuestionsCount: number;
  allCategories: string[];
}

export interface ApiDataItem {
  id: string;
  t: string;
  m?: string;
  a?: string;
  b?: string;
  c?: string;
  r: string;
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
};

export const cartItems = map<Record<string, CartItem | any>>({
  id99: {
    clickedCorrectAnswer: false,
    clickedAnswer: "n",
    vote: "good",
  },
});

type ItemDisplayInfo = Pick<CartItem, "id" | "name" | "imageSrc">;
export function addCartItem({ id, name, imageSrc }: ItemDisplayInfo) {
  const existingEntry = cartItems.get()[id];
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(id, { id, name, imageSrc, quantity: 1 });
  }
}
// USER
// export const user = atom()

export const _questions = atom<Question[]>([]);
export const _allCategories = atom<string[]>([]);
export const _currentCategory = atom(getCurrentCategoryInitialValue());

// const _addCategories = (newCategories: string[]) => {
//   _categories.set([..._categories.get(), ...newCategories]);
// };

export const changeCategory = (newCategory: string) => {
  _currentCategory.set(newCategory);
  storageSetStringItem(KEY.CURRENT_CATEGORY, newCategory);
};

export const getDataFromEndpoint = async () => {
  try {
    const dataReceivedFromSessionStorage = getDataFromSessionStorage();
    console.log(2, "dataReceivedFromSessionStorage===", dataReceivedFromSessionStorage);

    if (dataReceivedFromSessionStorage) {
      _questions.set(dataReceivedFromSessionStorage.allQuestions);
      _allCategories.set(dataReceivedFromSessionStorage.allCategories);
      return;
    }

    const fetchResponse = await fetch("../api-data.json");
    const dataReceivedFromEndpoint: DataReceivedFromEndpoint = await fetchResponse.json();
    console.log(3, "dataReceivedFromEndpoint===", dataReceivedFromEndpoint);

    const dataToStoreSessionStorage: DataReceivedFromSessionStorage = {
      allQuestions: mapApiData(dataReceivedFromEndpoint.allQuestions.sort((a, b) => 0.5 - Math.random())),
      allQuestionsCount: dataReceivedFromEndpoint.allQuestionsCount,
      allCategories: dataReceivedFromEndpoint.allCategories,
    };

    _questions.set(dataToStoreSessionStorage.allQuestions);
    _allCategories.set(dataToStoreSessionStorage.allCategories);

    sessionStorageSetObj(KEY.READY_TO_USE_DATA, dataToStoreSessionStorage);
  } catch (err) {
    console.log("err michal check if you see it on netlify", err);
    _questions.set([]);
  }
};
