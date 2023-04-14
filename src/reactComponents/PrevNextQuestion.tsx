import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { _questions, _currentCategory, _givenAnswers, _nextQuestionUrl, _prevQuestionUrl } from "../store/store";
import {  randomPrevNextQuestion } from "../utils/utils";
import type { Question, QuestionPageData } from "../store/types";

interface PrevNextQuestionProps {
  question: QuestionPageData;
}

export default function PrevNextQuestion(props: PrevNextQuestionProps) {
  const { prevSlug: prevSlugFromProps, nextSlug: nextSlugFromProps } = props.question;

  const questions = useStore(_questions);
  const prevQuestionUrl = useStore(_prevQuestionUrl);
  const nextQuestionUrl = useStore(_nextQuestionUrl);

  const currentCategory = useStore(_currentCategory);
  const givenAnswers = useStore(_givenAnswers);

  const prevSlug = prevQuestionUrl || prevSlugFromProps;
  const nextSlug = nextQuestionUrl || nextSlugFromProps;

  useEffect(() => {
    (async () => {
      randomPrevNextQuestion(questions, givenAnswers, currentCategory);
    })();
  }, [questions]);

  return (
    <div className="row mb-3">
      <div className="col-6 mb-2">
        {prevSlug && (
          <a href={prevSlug} style={{ whiteSpace: "nowrap" }} className="btn btn-primary btn-lg btn-block w-100">
            <i className="bi bi-arrow-left-short"></i>

            <span> Poprzednie</span>
          </a>
        )}
      </div>

      <div className="col-6 mb-2 text-end">
        {nextSlug && (
          <a href={nextSlug} style={{ whiteSpace: "nowrap" }} className="btn btn-primary btn-lg btn-block w-100">
            <span>Następne </span>

            <i className="bi bi-arrow-right-short"></i>
          </a>
        )}
      </div>
    </div>
  );
}
