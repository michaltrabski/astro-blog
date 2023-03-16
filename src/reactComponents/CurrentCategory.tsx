import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { _currentCategory } from "../store/store";

interface CurrentCategoryProps {
  upperCase?: boolean;
  bold?: boolean;
}

export default function CurrentCategory(props: CurrentCategoryProps) {
  const { upperCase = false, bold= false } = props;
  const currentCategory = useStore(_currentCategory);

  const currentCategoryUpperCase = currentCategory.toUpperCase();

  const boldText = <strong>{upperCase ? currentCategoryUpperCase : currentCategory}</strong>

  const normalText = <span>{upperCase ? currentCategoryUpperCase : currentCategory}</span>

  return ( <>{bold ? boldText : normalText}</>)
}
