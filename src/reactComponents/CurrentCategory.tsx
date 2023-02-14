import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { _currentCategory } from "../store/store";

interface CurrentCategoryProps {
  upperCase?: boolean;
}

export default function CurrentCategory(props: CurrentCategoryProps) {
  const currentCategory = useStore(_currentCategory);

  const currentCategoryUpperCase = currentCategory.toUpperCase();

  return (
    <span>{props.upperCase ? currentCategoryUpperCase : currentCategory}</span>
  );
}
