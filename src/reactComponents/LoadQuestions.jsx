import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { loadQuestions, questions } from '../store/questions';

export default function LoadQuestions() {
  const $questions = useStore(questions);

  useEffect(() => {
    loadQuestions();

    console.log(1111111);
  });

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
