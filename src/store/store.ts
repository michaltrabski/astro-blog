import { atom, map } from "nanostores";
import { KEY } from "../settings/settings";

import {
  getDataFromSessionStorage,
  getCurrentCategoryInitialValue,
  mapApiData,
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
  prevSlug: string;
  nextSlug: string;
  explanations: string[];
}

// export const _mp3Files = atom<string[]>([]);

// export const _addMp3File = (mp3File: string) => {
//   _mp3Files.set([..._mp3Files.get(), mp3File]);
// };

// type ItemDisplayInfo = Pick<Mp3Item, 'id' | 'slug' | 'state'>;

export type Mp3Item = {
  id: string;
  action: "" | "play" | "pause";
  state: "" | "playing" | "paused";
};

// michal
export const _mp3Items = map<Record<string, Mp3Item>>({});

export function _addMp3Item(cartItem: Mp3Item) {
  const { id, action, state } = cartItem;

  const existingEntry = _mp3Items.get()[id];

  if (existingEntry) {
    _mp3Items.setKey(id, {
      ...existingEntry,
      // quantity: existingEntry.quantity + 1,
    });
  } else {
    _mp3Items.setKey(id, { id, action, state });
  }
}

export function _playMp3Item(id: Mp3Item["id"]) {
  const selectedItem = _mp3Items.get()[id];

  // Pause all items
  Object.entries(_mp3Items.get()).forEach(([key, item]) => {
    if (key !== id) {
      _mp3Items.setKey(key, {
        ...item,
        action: "pause",
      });
    }
  });

  // Play selected item
  if (selectedItem) {
    _mp3Items.setKey(id, {
      ...selectedItem,
      action: "play",
    });
  }
}

export const _questions = atom<Question[]>([]);
export const _allCategories = atom<string[]>([]);
export const _currentCategory = atom(getCurrentCategoryInitialValue());

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
