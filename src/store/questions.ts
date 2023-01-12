import { atom } from 'nanostores';
import { mapAllQuestionsData } from '../utils/utils';

export interface Question {
  id: string;
  text: string;
  media: string;
  a: string;
  b: string;
  c: string;
  t: string;
  n: string;
  correct_answer: string;
  question_belongs_to_categories: string[];
  score: number;
  is_active: boolean;
  is_video: boolean;
  slug: string;
}

export const currentCategory = atom('a');

export const questions = atom<Question[]>([]);

export const loadQuestions = async () => {
  console.log('loadQuestions execute');
  try {
    const { allQuestionsData } = await fetch('../all-questions-data.json').then(
      (r) => r.json()
    );
    questions.set(mapAllQuestionsData(allQuestionsData));
  } catch (err) {
    console.log('err', err);
    questions.set([]);
  }

  const questionsFromSessionStorage = [
    { id: 'id1', text: 'question 1.' },
    { id: 'id2', text: 'question 2.' },
    { id: 'id3', text: 'question 3.' },
  ];

  // questions.set([]);
};

export const addQuestions = (newQuestions: Question[]) => {
  questions.set([...questions.get(), ...newQuestions]);
};
