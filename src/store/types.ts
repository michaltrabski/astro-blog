export interface QuestionReceivedFromEndpoint {
  id: string;
  t: string;
  m?: string;
  a?: string;
  b?: string;
  c?: string;
  r: PossibleAnswers;
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

export type PossibleAnswers = AnswerA | AnswerB | AnswerC | AnswerT | AnswerN;

export interface ApiDataItem {
  id: string;
  t: string;
  m?: string;
  a?: string;
  b?: string;
  c?: string;
  r: PossibleAnswers;
  cats: string[];
  s: number;
}

export type QuestionId = string;

export type AnswerA = "a";
export type AnswerB = "b";
export type AnswerC = "c";
export type AnswerT = "t";
export type AnswerN = "n";

export interface Question {
  id: QuestionId;
  text: string;
  media: string;
  a: string;
  b: string;
  c: string;
  correctAnswer: PossibleAnswers;
  categories: string[];
  score: number;
  // isVideo: boolean;
}

export interface QuestionPageData extends Question {
  slug: string;
  category: string;
  prevSlug: string;
  nextSlug: string;
  expls: string[];
  lows: any[];
}

export type Mp3Item = {
  id: string;
  canplay?: boolean;
  action?: "" | "play" | "pause";
  state?: "" | "playing" | "paused" | "error" | "ended";
};

export interface GivenAnswer {
  questionId: QuestionId;
  clickedAnswer: PossibleAnswers;
  correctAnswerIs: PossibleAnswers;
  firstGivenAnswer?: PossibleAnswers;
  firstGivenAnswerTimestamp?: number;
  timestamp?: number;
}
