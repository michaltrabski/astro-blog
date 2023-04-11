import { useStore } from "@nanostores/react";

import { _themeName } from "../store/store";

const ThemeComponent = () => {
  const themeName = useStore(_themeName);

  console.log(2, "themeName", themeName, themeName === "ciemny");

  if (themeName === "ciemny") {
    return <link rel="stylesheet" href="https://bootswatch.com/5/darkly/bootstrap.css" />;
  }

  return (
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" />
  );
};

export default ThemeComponent;
