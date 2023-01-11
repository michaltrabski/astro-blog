import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { loadQuestions, questions } from '../store/questions';

export default function AllQuestionsData() {
  const $questions = useStore(questions);

  useEffect(() => {
    // loadQuestions();

    console.log($questions);
  });

  return (
    <div>
      <h1>AllQuestionsData aaaaaaaaaaa</h1>
      <div>
        {$questions.map((q) => (
          <p key={q.id}>{q.text}</p>
        ))}
      </div>
    </div>
  );
}
