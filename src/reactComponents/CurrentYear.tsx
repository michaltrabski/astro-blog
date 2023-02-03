import React from "react";

const CurrentYear = () => {
  const date = new Date();
  const year = date.getFullYear();

  return <span>{year}</span>;
};

export default CurrentYear;
