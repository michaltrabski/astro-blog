import { atom } from "nanostores";
import { mapApiData } from "../utils/utils";

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
  prevSlug: string;
  nextSlug: string;
}

export const currentCategory = atom("a");

export const questions = atom<Question[]>([]);

export const loadQuestions = async () => {
  try {
    const fetchResponse = await fetch("../api.json");
    const apiData: ApiDataItem[] = await fetchResponse.json();

    questions.set(mapApiData(apiData));
  } catch (err) {
    console.log("err", err);
    questions.set([]);
  }
};

export const addQuestions = (newQuestions: Question[]) => {
  questions.set([...questions.get(), ...newQuestions]);
};
