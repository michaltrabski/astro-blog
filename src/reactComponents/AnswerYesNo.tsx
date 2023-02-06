import React, { useState } from "react";
import clsx from "clsx";

import type { QuestionPageData } from "../store/store";

const possibleAnswers = [
  { letterIndex: "t", label: "Tak" },
  { letterIndex: "n", label: "Nie" },
];

 

interface AnswerYesNoProps   {
  question: QuestionPageData;
}

  export default function AnswerYesNo(props:AnswerYesNoProps) {
    const [clickedAnswerValue, setClickedAnswerValue] = useState<string | null>(
      null
    );

    const { a, b, c, correctAnswer } = props.question;

    if (a !== "" || b !== "" || c !== "") {
      return null;
    }



  return (
    <div>
      {possibleAnswers.map((answer) => {
        let btnColor = "btn-danger";

        if (answer.letterIndex === correctAnswer) {
          btnColor = "btn-success";
        }

        if (!clickedAnswerValue) {
          btnColor = "btn-secondary";
        }

        return (
    
            <button
              key={answer.letterIndex}
              onClick={() => setClickedAnswerValue(answer.letterIndex)}
              type="button"
               className={clsx("btn me-3 btn-lg", btnColor)}
            >
              {answer.label}
            </button>
   
        );
      })}
    </div>
  );
}
