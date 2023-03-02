import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import type { QuestionPageData } from "../store/store";
import { _questions, _currentCategory } from "../store/store";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

interface PrevNextQuestionProps {
  question: QuestionPageData;
}

export default function PrevNextQuestion(props: PrevNextQuestionProps) {
  const { prevSlug, nextSlug } = props.question;

  const questions = useStore(_questions);
  const currentCategory = useStore(_currentCategory);

  const [newPrevSlug, setPrevSlug] = useState(prevSlug);
  const [newNextSlug, setNextSlug] = useState(nextSlug);
 

  useEffect(() => {
    if (questions.length > 0) {
      let randomIndex = 0;
      let limit = 0;
      do {
        limit++;
        randomIndex = Math.floor(Math.random() * questions.length);
      } while (!questions[randomIndex].categories.includes(currentCategory) && limit < 100);

      setNextSlug(getFullUrl(createQuestionUrl(questions[randomIndex], currentCategory)));
    }
  }, [questions]);

  return (
    <div>
      {/* <p>newNextSlug ==={newNextSlug}</p> */}

      <div className="row mb-3">
        <div className="col-6 mb-2">
          {newPrevSlug && (
            <a href={newPrevSlug} className="btn btn-primary btn-lg btn-block w-100">
              {/* {newPrevSlug} <br /> */}
              poprzednie
            </a>
          )}
        </div>

        <div className="col-6 mb-2 text-end">
          {newNextSlug && (
            <a href={newNextSlug} className="btn btn-primary btn-lg btn-block w-100">
              {/* {newNextSlug} <br /> */}
              następne
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
