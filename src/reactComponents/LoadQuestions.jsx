import React, { useEffect } from 'react';
import { loadQuestions } from '../store/questions';

export default function LoadQuestions() {
  useEffect(() => {
    loadQuestions();

    console.log(1111111);
  });

  return 'ładuję pytania => LoadQuestions()';
}
