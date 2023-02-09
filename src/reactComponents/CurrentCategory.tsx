import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { currentCategory } from "../store/store";

interface CurrentCategoryProps {
  upperCase?: boolean;
}

export default function CurrentCategory(props: CurrentCategoryProps) {
  const _currentCategory = useStore(currentCategory);

  const _currentCategoryUpperCase = _currentCategory.toUpperCase();

  return (
    <span>
      {props.upperCase ? _currentCategoryUpperCase : _currentCategory}
    </span>
  );
}
