import { atom } from 'nanostores';

interface Question {
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
}

export const questions = atom<Question[]>([
  {
    id: 'id99',
    text: 'Czy w tej sytuacji masz obowiązek zatrzymać pojazd?',
    media: 'AK_D05_06_org',
    a: '',
    b: '',
    c: '',
    t: 'tak',
    n: 'nie',
    correct_answer: 't',
    question_belongs_to_categories: [
      'a',
      'b',
      'c',
      'd',
      't',
      'am',
      'a1',
      'a2',
      'b1',
      'c1',
      'd1',
    ],
    score: 3,
    is_active: true,
    is_video: true,
  },
]);

export const loadQuestions = async () => {
  console.log('loadQuestions execute');
  try {
    const { allQuestionsData } = await fetch('../all-questions-data.json').then(
      (r) => r.json()
    );
    questions.set(allQuestionsData);
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
