import React, { useState } from "react";

const possibleAnswers = [
  { value: "YES", label: "TAK" },
  { value: "NO", label: "Nie" },
];

const correctAnswerValue = "YES";

export default function YesNoAnswer() {
  const [clickedAnswerValue, setClickedAnswerValue] = useState(null);

  return (
    <div>
      {possibleAnswers.map((answer) => {
        let btnColor = "danger";

        if (answer.value === correctAnswerValue) {
          btnColor = "success";
        }

        if (!clickedAnswerValue) {
          btnColor = "secondary";
        }

        return (
          <>
            <button
              key={possibleAnswers.value}
              onClick={() => setClickedAnswerValue(answer.value)}
              type="button"
              className={`btn btn-${btnColor} me-2`}
            >
              {answer.label}
            </button>
          </>
        );
      })}
    </div>
  );
}
