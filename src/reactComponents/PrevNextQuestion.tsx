import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import type { QuestionPageData } from "../store/store";

interface PrevNextQuestionProps {
  question: QuestionPageData;
}

export default function PrevNextQuestion(props: PrevNextQuestionProps) {
  const { prevSlug, nextSlug } = props.question;

  const [newPrevSlug, setPrevSlug] = useState(prevSlug);
  const [newNextSlug, setNextSlug] = useState(nextSlug);

  return (
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
    </div>
  );
}
