import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { changeCategory, _currentCategory } from "../store/store";
import { dataForBuild } from "../utils/utils";

export default function CategoriesButtons() {
  const curentCategory = useStore(_currentCategory);

  const { allCategories } = dataForBuild;

  return (
    <div className="pb-3">
      {allCategories.map((category) => (
        <button
          key={category}
          className={clsx(
            "btn me-2",
            `btn-${category === curentCategory ? "primary" : "secondary"}`
          )}
          onClick={() => changeCategory(category)}
        >
          {category.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
