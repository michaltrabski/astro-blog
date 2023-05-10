import { Fragment, useState } from "react";
import clsx from "clsx";

interface PossibleAnswer {
  letterIndex: string;
  label: string;
}

interface AnswerAbcProps {
  id: string;
  a: string;
  b: string;
  c: string;
  r: string; // correctAnswer;
}

export default function AnswerAbc(props: AnswerAbcProps) {
  const { id, a, b, c, r } = props;

  const [clickedAnswerValue, setClickedAnswerValue] = useState<string | null>(
    null
  );

  const possibleAnswers: PossibleAnswer[] = [
    { letterIndex: "a", label: a },
    { letterIndex: "b", label: b },
    { letterIndex: "c", label: c },
  ];

  return (
    <div className="row mb-3">
      <div className="col">
        <div className="d-grid gap-2 d-block">
          {possibleAnswers.map((answer) => {
            let btnColor = "btn-secondary";

            if (clickedAnswerValue && answer.letterIndex === r) {
              btnColor = "btn-success";
            }

            if (
              clickedAnswerValue !== r &&
              answer.letterIndex === clickedAnswerValue
            ) {
              btnColor = "btn-danger";
            }

            return (
              <Fragment key={answer.letterIndex}>
                <button
                  key={answer.letterIndex}
                  onClick={() => {
                    setClickedAnswerValue(answer.letterIndex);

                    const clickedAnswer = answer.letterIndex;

                    // _addAnswer(id, {
                    //   id,
                    //   clickedAnswer,
                    //   correctAnswerIs: r,
                    // });
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

        {clickedAnswerValue && (
          <div>
            <p>
              {clickedAnswerValue === r && (
                <strong className="text-success">Dobrze</strong>
              )}
              {clickedAnswerValue !== r && (
                <strong className="text-danger">Źle</strong>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
