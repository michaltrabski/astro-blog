import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { isCartOpen } from "../cartStore";

export default function AbcAnswer(props) {
  const $isCartOpen = useStore(isCartOpen);

  const { question } = props;
  const { a, b, c, correct_answer, prevId, nextId } = question;

  const [clickedAnswerValue, setClickedAnswerValue] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);

  const possibleAnswers = [
    { value: "a", label: a },
    { value: "b", label: b },
    { value: "c", label: c },
  ];

  const correctAnswerValue = correct_answer;

  useEffect(() => {
    (async () => {
      const data = await fetch("../data.json").then((r) => r.json());

      console.log(111111111, data.allQuestions);

      if (data.allQuestions) {
        setAllQuestions(data.allQuestions);
      }
    })();
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => isCartOpen.set(!$isCartOpen)}>
          Cart {JSON.stringify($isCartOpen)}
        </button>
      </div>

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

      <div>
        {allQuestions.map((q, index) => (
          <p>
            <a href={`/${q.id}`}>
              {q.id}. {q.text}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
}
