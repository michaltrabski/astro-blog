import { useStore } from "@nanostores/react";

import { _themeName } from "../store/store";

const ThemeComponent = () => {
  const themeName = useStore(_themeName);

  console.log("themeName", themeName);

  if (themeName === "ciemny") {
    return <link rel="stylesheet" href={`https://bootswatch.com/5/darkly/bootstrap.css`} />;
  }

  return null
};

export default ThemeComponent;
