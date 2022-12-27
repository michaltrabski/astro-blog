import React, { useState } from 'react';

const possibleAnswers = [
  { value: 'a', label: 'lorem ipsum a' },
  { value: 'b', label: 'lorem ipsum b' },
  { value: 'c', label: 'lorem ipsum c' },
];

const correctAnswerValue = 'c';

export default function AbcAnswer() {
  const [clickedAnswerValue, setClickedAnswerValue] = useState(null);

  return (
    <div>
      clickedAnswerValue === {clickedAnswerValue} <br />
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
            <button
              key={possibleAnswers.value}
              onClick={() => setClickedAnswerValue(answer.value)}
              type="button"
              className={`btn btn-${btnColor} mb-2`}
            >
              {answer.label}
            </button>
          </div>
        );
      })}
    </div>
  );
}
