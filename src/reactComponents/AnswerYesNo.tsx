import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import type { QuestionPageData } from "../store/store";

const possibleAnswers = [
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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // const audio = audioRefObj.current;
    // if (audio) {
    //   audio.addEventListener("ended", () => {
    //     console.log("ended");
    //   });
    // }

    console.log(1, audioRef);
  }, []);

  const play = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
    }
  };

  return (
    <>
      <audio className="d-none" controls src={`/${correctAnswer}.mp3`} ref={audioRef} />
      <div className="row mb-3">
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
                    play();
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
              {clickedAnswerValue === correctAnswer && `Gratulacje! Odpowiedź ${clickedAnswerValue} jest poprawna.`}
              {clickedAnswerValue !== correctAnswer && `Niestety, odpowiedź ${clickedAnswerValue} jest niepoprawna.`}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
