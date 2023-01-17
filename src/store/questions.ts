import { atom } from 'nanostores';
import { mapAllQuestionsData } from '../utils/utils';

 

export interface QuestionSlim {
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
  correct_answer: string;
  question_belongs_to_categories: string[];
  score: number;
  is_video: boolean;
  slug: string;
}

export const currentCategory = atom('a');

export const questions = atom<Question[]>([]);

export const loadQuestions = async () => {
  
  try {
    const  allQuestionsDataSlim: QuestionSlim[]  = await fetch('../all-questions-data-slim.json').then(
      (r) => r.json()
    );

    console.log('loadQuestions execute allQuestionsDataSlim',allQuestionsDataSlim);


    questions.set(mapAllQuestionsData(allQuestionsDataSlim));
  } catch (err) {
    console.log('err', err);
    questions.set([]);
  }

  // const questionsFromSessionStorage = [
  //   { id: 'id1', text: 'question 1.' },
  //   { id: 'id2', text: 'question 2.' },
  //   { id: 'id3', text: 'question 3.' },
  // ];

  // questions.set([]);
};

export const addQuestions = (newQuestions: Question[]) => {
  questions.set([...questions.get(), ...newQuestions]);
};
