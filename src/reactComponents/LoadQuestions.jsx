import React, { useEffect } from 'react';
import { loadQuestions } from '../store/questions';

export default function LoadQuestions() {
  useEffect(() => {
    loadQestions();
  }, []);

  return <div>LoadQuestions</div>;
}
