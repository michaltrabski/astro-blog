import { atom } from 'nanostores';

interface Question {
  id: string;
  text: string;
}

export const questions = atom<Question[]>([
  {
    id: 'id1',
    text: 'question 1.',
  },
]);

export const loadQuestions = () => {
  console.log(111111111111, 'loadQuestions');
  const questionsFromSessionStorage = [
    { id: 'id1', text: 'question 1.' },
    { id: 'id2', text: 'question 2.' },
    { id: 'id3', text: 'question 3.' },
  ];
  questions.set(questionsFromSessionStorage);
};

export const addQuestions = (newQuestions: Question[]) => {
  questions.set([...questions.get(), ...newQuestions]);
};
