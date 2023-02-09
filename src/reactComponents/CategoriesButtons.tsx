import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { changeCategory, currentCategory, _categories } from "../store/store";

export default function CategoriesButtons() {
  const categories = useStore(_categories);
  const curntCategory = useStore(currentCategory);

  return (
    <div className="row">
      <div className="col">
        {categories.map((category) => (
          <button
            key={category}
            className={clsx("btn me-2", {
              "btn-primary": category === curntCategory,
              "btn-secondary": category !== curntCategory,
            })}
            onClick={() => changeCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
