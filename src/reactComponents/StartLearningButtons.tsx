import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import {
  changeCategory,
  _currentCategory,
  _allCategories,
  _questions,
  Question
} from "../store/store";
import CurrentYear from "./CurrentYear";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

interface StartLearningButtonsProps {
  allCategories: string[];
  allQuestions: Question[];
}

export default function StartLearningButtons(props: StartLearningButtonsProps) {
  const allCategoriesFromStore = useStore(_allCategories);
  const allQuestionsFromStore = useStore(_questions);

  const curentCategory = useStore(_currentCategory);

  const allCategories =
    allCategoriesFromStore.length > 0
      ? allCategoriesFromStore
      : props.allCategories;

  const allQuestions =  allQuestionsFromStore.length > 0
      ? allQuestionsFromStore
      : props.allQuestions;

     

  return (
    <div className="row mb-3">
      <div className="col">
        <div className="d-grid gap-3">
          {allCategories.map((category) => {
            
            let randomIndex = 0;
            let limit = 0;
            do {
              limit++;
              randomIndex = Math.floor(Math.random() * allQuestions.length);
            } while (!allQuestions[randomIndex].categories.includes(category) && limit < 100);

            const btnColor =
              category === curentCategory ? "btn-primary" : "d-none";

            return (
              <a
                href={getFullUrl(
                  createQuestionUrl(
                    allQuestions[randomIndex],
                    category
                  )
                )}
       
                key={category}
                className={clsx("btn btn-lg", btnColor)}
                role="button"
              >
           Rozpocznij naukę testów na prawo jazdy <CurrentYear />,
        {" "}  <strong>kategorii {category.toUpperCase()}</strong>                 
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
