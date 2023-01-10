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

export const loadQuestions = async () => {
  const data = await fetch('../all-questions-data.json').then((r) => r.json());

  console.log(111111111, data);

  console.log(111111111111, 'loadQuestions');

  const questionsFromSessionStorage = [
    { id: 'id1', text: 'question 1.' },
    { id: 'id2', text: 'question 2.' },
    { id: 'id3', text: 'question 3.' },
  ];
  questions.set(data);
};

export const addQuestions = (newQuestions: Question[]) => {
  questions.set([...questions.get(), ...newQuestions]);
};
