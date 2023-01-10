import React, { useEffect } from 'react';
import { loadQuestions } from '../store/questions';

export default function LoadQuestions() {
  useEffect(() => {
    loadQuestions();
  }, []);

  return <div>LoadQuestions</div>;
}
