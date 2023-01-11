import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { questions } from '../store/questions';

export default function AllQuestionsData() {
  const $questions = useStore(questions);

  return (
    <div>
      <h1>AllQuestionsData:</h1>
      <div>
        {$questions.map((q, index) => (
          <p key={q.id}>
            {index + 1}. {q.text}
          </p>
        ))}
      </div>
    </div>
  );
}
