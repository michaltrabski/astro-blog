import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import type { QuestionPageData } from "../store/store";
import  { _questions  } from "../store/store";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

interface PrevNextQuestionProps {
  question: QuestionPageData;
}

export default function PrevNextQuestion(props: PrevNextQuestionProps) {
  const { prevSlug, nextSlug } = props.question;

  const questions = useStore(_questions);

  const [newPrevSlug, setPrevSlug] = useState(prevSlug);
  const [newNextSlug, setNextSlug] = useState(nextSlug);
  // const [_newNextSlug, setNewNextSlug] = useState(nextSlug);

  useEffect(() => {

    
    // get random number beetwen 0 and questions.length
    const randomIndex = Math.floor(Math.random() * questions.length);
    console.log("questions", randomIndex, questions, questions[0],)
    
    if (questions.length > 0) {
      setNextSlug(getFullUrl(createQuestionUrl(questions[randomIndex], "b")) ) // chack if questions inclues category current
    }
    
  }, [questions]);


  return (<div>
    <p>newNextSlug ==={newNextSlug}</p>
   
    <div className="row mb-3">
 
      <div className="col-6 mb-2">
        {newPrevSlug && (
          <a
            href={newPrevSlug}
            className="btn btn-primary btn-lg btn-block w-100"
          >
            {newPrevSlug} <br />
            poprzednie
          </a>
        )}
      </div>

      <div className="col-6 mb-2 text-end">
        {newNextSlug && (
          <a
            href={newNextSlug}
            className="btn btn-primary btn-lg btn-block w-100"
          >
            {newNextSlug} <br />
            następne
          </a>
        )}
      </div>
    </div></div>
  );
}
