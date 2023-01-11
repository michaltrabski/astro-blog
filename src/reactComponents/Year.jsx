import React from "react";
import { useStore } from "@nanostores/react";
import { year } from "../store/info";

export const Year = () => {
  const $year = useStore(year);

  return <span>{$year}</span>;
};
