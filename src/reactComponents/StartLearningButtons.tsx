import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { changeCategory, _currentCategory, _categories } from "../store/store";
import CurrentYear from "./CurrentYear";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

interface StartLearningButtonsProps {
    categories: string[];
}

export default function StartLearningButtons( props: StartLearningButtonsProps) {
  const categoriesFromStore = useStore(_categories);
  const curentCategory = useStore(_currentCategory);

  const categories = categoriesFromStore.length > 0 ? categoriesFromStore : props.categories;

  return (
    <div className="row">
      <div className="col">
      <div className="d-grid gap-2 mb-2">
            {
              categories.map((cat) => {
                // const firstQuestionContainingCurrentCategory = mapApiData(
                //   apiData
                // ).find((q) => q.categories.includes(cat));

                // if (!firstQuestionContainingCurrentCategory) {
                //   return null;
                // }

                const btnColor = cat === curentCategory ? "btn-primary" : "btn-secondary";

                return (
                  <a
                    // href={getFullUrl(
                    //   createQuestionUrl(
                    //     firstQuestionContainingCurrentCategory,
                    //     cat
                    //   )
                    // )}
                    href="#"
                    key={cat}
                    className={clsx("btn btn-sm",btnColor)}
                    role="button"
                  >
                    Rozpocznij naukę testów na prawo jazdy{" "}
                    <CurrentYear  />, kategorii{" "}
                    {cat.toUpperCase()}
                  </a>
                );
              })
            }
          </div>
      </div>
    </div>
  );
}
