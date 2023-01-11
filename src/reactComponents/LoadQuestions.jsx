import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { loadQuestions, questions } from '../store/questions';

export default function LoadQuestions() {
  const $questions = useStore(questions);

  useEffect(() => {
    console.log('loadQuestions called');
    loadQuestions();
  }, []);

  return (
    <div>
      {/* {$questions.map((q, index) => (
        <p key={q.id}>
          {index + 1}. {q.text}
        </p>
      ))} */}
    </div>
  );
}
