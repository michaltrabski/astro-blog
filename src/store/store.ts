import { atom, map, Store } from "nanostores";
import { KEY } from "../settings/settings";

import {
  getDataFromSessionStorage,
  getCurrentCategoryInitialValue,
  mapApiData,
  storageSetStringItem,
  sessionStorageSetObj,
} from "../utils/utils";
import type {
  DataReceivedFromEndpoint,
  DataReceivedFromSessionStorage,
  GivenAnswer,
  Mp3Item,
  Question,
  QuestionId,
} from "./types";

export const _nextQuestionUrl = atom<string | null>(null);
export const _prevQuestionUrl = atom<string | null>(null);
export const _themeName = atom(localStorage.getItem("_themeName") || "jasny");
export const _mp3Items = map<Record<string, Mp3Item>>({});
export const _questions = atom<Question[]>([]);
export const _allCategories = atom<string[]>([]);
export const _currentCategory = atom(getCurrentCategoryInitialValue());
export const _givenAnswers = map<Record<QuestionId, GivenAnswer>>(initialGivenAnswers());
export const _correctGivenAnswersCount = atom(0);
export const _wrongGivenAnswersCount = atom(0);

export const _changeNextQuestionUrl = (url: string) => {
  _nextQuestionUrl.set(url);
};

export const _changePrevQuestionUrl = (url: string) => {
  _prevQuestionUrl.set(url);
};

export function _changeThemeName(themeName: string) {
  _themeName.set(themeName);
  localStorage.setItem("_themeName", themeName);
  location.reload();
}

export function _recalculateGivenAnswersCount() {
  const givenAnswers = _givenAnswers.get();
  const givenAnswersArray = Object.values(givenAnswers);

  let correctGivenAnswersCount = 0;
  let wrongGivenAnswersCount = 0;

  givenAnswersArray.forEach((answer) => {
    if (answer.clickedAnswer === answer.correctAnswerIs) {
      correctGivenAnswersCount++;
    }
    if (answer.clickedAnswer !== answer.correctAnswerIs) {
      wrongGivenAnswersCount++;
    }
  });

  _correctGivenAnswersCount.set(correctGivenAnswersCount);
  _wrongGivenAnswersCount.set(wrongGivenAnswersCount);
}

function initialGivenAnswers() {
  try {
    const givenAnswersAsString = localStorage.getItem("_givenAnswers") || "{}";
    const givenAnswers = JSON.parse(givenAnswersAsString);
    return givenAnswers;
  } catch (err) {
    return {};
  }
}

export function _addAnswer(questionId: QuestionId, answer: GivenAnswer) {
  const existingEntry = _givenAnswers.get()[questionId];

  if (existingEntry) {
    _givenAnswers.setKey(questionId, answer);
  } else {
    _givenAnswers.setKey(questionId, answer);
  }

  _recalculateGivenAnswersCount();
  localStorage.setItem("_givenAnswers", JSON.stringify(_givenAnswers.get()));
}

export function _addMp3Item(cartItem: Mp3Item) {
  const { id, canplay = false, action = "", state = "" } = cartItem;

  const existingEntry = _mp3Items.get()[id];

  if (existingEntry) {
    _mp3Items.setKey(id, {
      ...existingEntry,
      // quantity: existingEntry.quantity + 1,
    });
  } else {
    _mp3Items.setKey(id, { id, canplay, action, state });
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

export function _updateMp3ItemState(id: Mp3Item["id"], state: Mp3Item["state"]) {
  const selectedItem = _mp3Items.get()[id];

  if (selectedItem) {
    _mp3Items.setKey(id, {
      ...selectedItem,
      state,
    });
  }
}

export function _updateMp3ItemCanPlay(id: Mp3Item["id"], canplay: Mp3Item["canplay"]) {
  const selectedItem = _mp3Items.get()[id];

  if (selectedItem) {
    _mp3Items.setKey(id, {
      ...selectedItem,
      canplay,
    });
  }
}

export const changeCategory = (newCategory: string) => {
  _currentCategory.set(newCategory);
  storageSetStringItem(KEY.CURRENT_CATEGORY, newCategory);
};

export const getDataFromEndpoint = async () => {
  try {
    const dataReceivedFromSessionStorage = getDataFromSessionStorage();

    if (dataReceivedFromSessionStorage) {
      _questions.set(dataReceivedFromSessionStorage.allQuestions);
      _allCategories.set(dataReceivedFromSessionStorage.allCategories);
      return;
    }

    const fetchResponse = await fetch("../api-data.json");
    const dataReceivedFromEndpoint: DataReceivedFromEndpoint = await fetchResponse.json();

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
