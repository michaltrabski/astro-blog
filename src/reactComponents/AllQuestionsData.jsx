import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { addQuestions, questions } from '../store/questions';

export default function AllQuestionsData() {
  const $questions = useStore(questions);

  const [count, setCount] = useState(-1);

  useEffect(() => {
    (async () => {
      const data = await fetch('../all-questions-data.json').then((r) =>
        r.json()
      );

      // console.log(111111111, data);

      if (data.allQuestionsData) {
        setCount(data.allQuestionsData.length);
      }

      // addQuestions([{ id: 'id2', text: 'question 2.' }]);
    })();
  }, []);

  return (
    <div>
      allqUESTIONSDATA count = {count} ,{JSON.stringify($questions)}
    </div>
  );
}
