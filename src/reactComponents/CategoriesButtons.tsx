import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { changeCategory, _currentCategory, _allCategories } from "../store/store";

export default function CategoriesButtons() {
  const categories = useStore(_allCategories);
  const curentCategory = useStore(_currentCategory);

  return (
    <div className="row mb-3">
      <div className="col">
        {categories.map((category) => (
          <button
            key={category}
            className={clsx(
              "btn me-2",
              `btn-${category === curentCategory ? "primary" : "secondary"}`
            )}
            onClick={() => changeCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
