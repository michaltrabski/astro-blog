import { useState } from "react";
import { useStore } from "@nanostores/react";
import { _changeThemeName, _themeName } from "../store/store";
import Features from "./Features";

export default function Customization() {
  const themeName = useStore(_themeName);

  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);

  // const allCategories =
  //   allCategoriesFromStore.length > 0
  //     ? allCategoriesFromStore
  //     : props.allCategories;

  // const allQuestions =  allQuestionsFromStore.length > 0
  //     ? allQuestionsFromStore
  //     : props.allQuestions;

  return (
    <div
      className="position-absolute bg-light border border-warning border-5 rounded-3 p-3 shadow-lg"
      style={{
        minHeight: "100vh",
        width: "80%",
        top: "3rem",
        left: showCustomizationPanel ? "0" : "-80%",
        transitionDuration: "0.2s",
      }}
    >
      <div
        onClick={() => setShowCustomizationPanel(!showCustomizationPanel)}
        className="position-absolute"
        style={{
          top: "5rem",
          right: showCustomizationPanel ? "0.5rem" : "-2.7rem",
          opacity: showCustomizationPanel ? "1" : "0.8",
        }}
      >
        <button className="btn btn-primary btn-lg">
          <i className={`bi bi-${showCustomizationPanel ? "x-lg" : "sliders2"}`}></i>
        </button>
      </div>

      <div>
        <h2>Ustawienia strony:</h2>
        <p>
          <strong>1. Wybierz kolor</strong>
        </p>

        {["jasny", "ciemny", "niebieski"].map((newThemeName, index) => {
          let colorValue = "white";

          if (newThemeName === "ciemny") colorValue = "#222";
          if (newThemeName === "niebieski") colorValue = "#137ea7";

          return (
           
              <button
              key={newThemeName}
                className="btn btn-lg m-3 shadow"
                style={{ backgroundColor: colorValue }}
                onClick={() => _changeThemeName(newThemeName)}
              >
                <span className="text-light">{newThemeName}</span></button>
                  
          );
        })}
      </div>

      <Features />
    </div>
  );
}
