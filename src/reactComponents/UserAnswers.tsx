import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { _questions, _currentCategory, _allCategories, _givenAnswers } from "../store/store";
import type { Question } from "../store/types";

 

interface UserAnswersProps {
  whatQuestionsToShow: "show-answers-that-user-clicked-wrong-answer" | "show-answers-that-user-clicked-correct-answer";
}

export default function UserAnswers(props: UserAnswersProps) {
  const { whatQuestionsToShow } = props;

  const questions = useStore(_questions)
  const givenAnswers = useStore(_givenAnswers);

  const questionsToShow: Question[] = [];
  Object.values(givenAnswers)
  .filter((givenAnswer) => {
    if (whatQuestionsToShow === "show-answers-that-user-clicked-wrong-answer") {
      return givenAnswer.clickedAnswer !== givenAnswer.correctAnswerIs;
    }

    if (whatQuestionsToShow === "show-answers-that-user-clicked-correct-answer") {
      return givenAnswer.clickedAnswer === givenAnswer.correctAnswerIs;
    }
    // show all answers
    return true;
  } )
  .forEach((givenAnswer) => {

    const question = questions.find((question) => question.id === givenAnswer.questionId);
    if (question) {
      questionsToShow.push(question);
    }
  });




  return (
    <>

      <div className="text-start">
        {questionsToShow.map((question,index) => {
          return (
            <div key={question.id}>
              <p>{index+1}. {question.text}</p>
              
            </div>
          );
        })
        }
      </div>


      {/* <pre>
        {JSON.stringify(givenAnswers, null, 2)}
      </pre>

      <pre>
        {JSON.stringify(questions.slice(0,3), null, 2)}
      </pre> */}
    </>
  );
}
