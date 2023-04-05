import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { _addMp3Item, _addAnswer, _playMp3Item } from "../store/store";
import type { AnswerN, AnswerT, QuestionPageData } from "../store/types";

const possibleAnswers: { letterIndex: AnswerT | AnswerN; label: string }[] = [
  { letterIndex: "t", label: "Tak" },
  { letterIndex: "n", label: "Nie" },
];

interface AnswerYesNoProps {
  question: QuestionPageData;
}

export default function AnswerYesNo(props: AnswerYesNoProps) {
  const [clickedAnswerValue, setClickedAnswerValue] = useState<string | null>(null);

  const { a, b, c, correctAnswer } = props.question;

  if (a !== "" || b !== "" || c !== "") {
    return null;
  }

  const alertType = clickedAnswerValue === correctAnswer ? "alert-success" : "alert-danger";

  // michal
  useEffect(() => {
    _addMp3Item({ id: "tak", action: "", state: "" });
    _addMp3Item({ id: "nie", action: "", state: "" });
    _addMp3Item({ id: "t", action: "", state: "" });
    _addMp3Item({ id: "n", action: "", state: "" });
  }, []);

  return (
    <>
      <div className="row mb-3 text-center">
        <div className="col">
          <div className="mb-3">
            {possibleAnswers.map((answer) => {
              let btnColor = "btn-secondary";

              if (clickedAnswerValue && answer.letterIndex === correctAnswer) {
                btnColor = "btn-success";
              }

              if (clickedAnswerValue !== correctAnswer && answer.letterIndex === clickedAnswerValue) {
                btnColor = "btn-danger";
              }

              return (
                <button
                  key={answer.letterIndex}
                  onClick={() => {
                    setClickedAnswerValue(answer.letterIndex);

                    const questionId = props.question.id;
                    const clickedAnswer = answer.letterIndex;
                    const correctAnswerIs = correctAnswer;

                    _addAnswer(questionId, { questionId, clickedAnswer, correctAnswerIs });
                  }}
                  type="button"
                  className={clsx("btn me-3 btn-lg", btnColor)}
                >
                  {answer.label}
                </button>
              );
            })}
          </div>
          {clickedAnswerValue && (
            <div className={clsx("alert", alertType)} role="alert">
              {clickedAnswerValue === correctAnswer &&
                `Gratulacje! Odpowiedź ${clickedAnswerValue === "t" ? "TAK" : "NIE"} jest poprawna.`}
              {clickedAnswerValue !== correctAnswer &&
                `Niestety, odpowiedź ${clickedAnswerValue === "t" ? "TAK" : "NIE"} jest niepoprawna.`}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
