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

// export function addUser(user: Question) {
//   users.set([...users.get(), user]);
// }

export const addQuestions = (newQuestions: Question[]) => {
  questions.set([...questions.get(), ...newQuestions]);
};
