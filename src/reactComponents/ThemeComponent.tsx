import { useStore } from "@nanostores/react";
import { _themeColor } from "../store/store";

const ThemeComponent = () => {
  const themeColor = useStore(_themeColor);




  if (themeColor) {
    return <link rel="stylesheet" href={`https://bootswatch.com/5/${themeColor}/bootstrap.css`} />;
  }

 
 

  return (
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
      crossOrigin="anonymous"
    />
  );
};

export default ThemeComponent;
