import React, { useEffect, useState } from 'react';

const possibleAnswers = [
  { value: 'a', label: 'lorem ipsum a' },
  { value: 'b', label: 'lorem ipsum b' },
  { value: 'c', label: 'lorem ipsum c' },
];

const correctAnswerValue = 'c';

export default function AbcAnswer(props) {
  const [clickedAnswerValue, setClickedAnswerValue] = useState(null);
  const [questions, setQuestions] = useState(props.questions);

  useEffect(async () => {
    const data = await fetch('../data.json').then((r) => r.json());

    console.log(111111111, data.questions);
    setQuestions(data.questions);
  }, []);

  return (
    <div>
      {possibleAnswers.map((answer) => {
        let btnColor = 'danger';

        if (answer.value === correctAnswerValue) {
          btnColor = 'success';
        }

        if (!clickedAnswerValue) {
          btnColor = 'secondary';
        }

        return (
          <div>
            <div>
              <button
                key={possibleAnswers.value}
                onClick={() => setClickedAnswerValue(answer.value)}
                type="button"
                className={`btn btn-${btnColor} mb-2`}
              >
                {answer.label}
              </button>
            </div>
          </div>
        );
      })}
      <div>
        {questions.map((q, index) => (
          <p>
            <a href={`/pytanie-${index + 1}`}>{q.text}</a>
          </p>
        ))}
      </div>
    </div>
  );
}
