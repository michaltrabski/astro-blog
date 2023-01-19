import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

export default function AbcAnswer(props) {
  const { question } = props;
  const { a, b, c, correct_answer, prevId, nextId } = question;

  const [clickedAnswerValue, setClickedAnswerValue] = useState(null);

  const possibleAnswers = [
    { value: "a", label: a },
    { value: "b", label: b },
    { value: "c", label: c },
  ];

  const correctAnswerValue = correct_answer;

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
          <div key={answer.value}>
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

      <div>
        <a href={`/${prevId}`}>poprzednie</a>{" "}
        <a href={`/${nextId}`}>następne</a>
      </div>

      <pre>{JSON.stringify(question, null, 2)}</pre>
    </div>
  );
}
