import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import type {   QuestionPageData } from "../store/store";

interface AnswerAbcProps {
  question: QuestionPageData;
}

export default function AnswerAbc(props: AnswerAbcProps) {
 
  const { a, b, c, correctAnswer } = props.question;

  const [clickedAnswerValue, setClickedAnswerValue] = useState<string | null>(
    null
  );

  if (a === "" || b === "" || c === "") {
    return null;
  }

  const possibleAnswers = [
    { letterIndex: "a", label: a },
    { letterIndex: "b", label: b },
    { letterIndex: "c", label: c },
  ];

  return (

      <div className="d-grid gap-2 d-block">
        {/* <pre>{JSON.stringify( clickedAnswerValue, null,2)}</pre> */}

        {possibleAnswers.map((answer) => {
          let btnColor = "btn-danger";

          if (answer.letterIndex === correctAnswer) {
            btnColor = "btn-success";
          }

          if (!clickedAnswerValue) {
            btnColor = "btn-secondary";
          }

          return (
            <Fragment key={answer.letterIndex}>
              <button
                key={answer.letterIndex}
                onClick={() => {
                  console.log(answer.letterIndex, answer);
                  setClickedAnswerValue(answer.letterIndex);
                }}
                type="button"
                className={clsx("btn text-start", btnColor)}
              >
                <strong>{answer.letterIndex.toUpperCase()}) </strong>{" "}
                {answer.label}
              </button>
            </Fragment>
          );
        })}
      </div> 
 
  );
}
