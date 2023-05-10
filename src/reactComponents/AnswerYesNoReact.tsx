import { useState } from "react";
import clsx from "clsx";

interface PossibleAnswer {
  letterIndex: string;
  label: string;
}

const possibleAnswers: PossibleAnswer[] = [
  { letterIndex: "t", label: "Tak" },
  { letterIndex: "n", label: "Nie" },
];

interface AnswerYesNoProps {
  id: string;
  r: string; // correctAnswer;
}

export default function AnswerYesNo(props: AnswerYesNoProps) {
  const { id, r } = props;

  const [clickedAnswerValue, setClickedAnswerValue] = useState<string | null>(
    null
  );

  // useEffect(() => {
  //   _addMp3Item({ id: "tak", action: "", state: "" });
  //   _addMp3Item({ id: "nie", action: "", state: "" });
  //   _addMp3Item({ id: "t", action: "", state: "" });
  //   _addMp3Item({ id: "n", action: "", state: "" });
  // }, []);

  return (
    <>
      <div className="row mb-3 text-center">
        <div className="col">
          <div className="mb-0">
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
                  className={clsx("btn mx-1 btn-lg", btnColor)}
                >
                  {answer.label}
                </button>
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
    </>
  );
}
