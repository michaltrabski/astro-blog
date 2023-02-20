import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { changeCategory, _currentCategory, _allCategories } from "../store/store";
import CurrentYear from "./CurrentYear";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

interface StartLearningButtonsProps {
    allCategories: string[];
}

export default function StartLearningButtons( props: StartLearningButtonsProps) {
  const allCategoriesFromStore = useStore(_allCategories);
  const curentCategory = useStore(_currentCategory);

  const allCategories = allCategoriesFromStore.length > 0 ? allCategoriesFromStore : props.allCategories;

  return (
    <div className="row">
      <div className="col">
      <div className="d-grid gap-2 mb-2">
            {
              allCategories.map((category) => {
                // const firstQuestionContainingCurrentCategory = mapApiData(
                //   apiData
                // ).find((q) => q.categories.includes(cat));

                // if (!firstQuestionContainingCurrentCategory) {
                //   return null;
                // }

                const btnColor = category === curentCategory ? "btn-primary" : "btn-secondary";

                return (
                  <a
                    // href={getFullUrl(
                    //   createQuestionUrl(
                    //     firstQuestionContainingCurrentCategory,
                    //     cat
                    //   )
                    // )}
                    href="#"
                    key={category}
                    className={clsx("btn btn-sm",btnColor)}
                    role="button"
                  >
                    Rozpocznij naukę testów na prawo jazdy{" "}
                    <CurrentYear  />, kategorii{" "}
                    {category.toUpperCase()}
                  </a>
                );
              })
            }
          </div>
      </div>
    </div>
  );
}
