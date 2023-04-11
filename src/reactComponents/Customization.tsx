import { useState } from "react";
import { useStore } from "@nanostores/react";
import { _changeThemeName, _themeName } from "../store/store";

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
        width: "90%",
        top: "1rem",
        left: showCustomizationPanel ? "0" : "-100%",
        transitionDuration: "0.2s",
      }}
    >
      <div
        onClick={() => setShowCustomizationPanel(!showCustomizationPanel)}
        className="position-fixed"
        style={{
          left: showCustomizationPanel ? "0.5rem" : "-0.8rem",
          opacity: showCustomizationPanel ? "1" : "0.8",
          bottom: "100px",
        }}
      >
        <button className="btn btn-primary btn-sm">
          <i className={`bi bi-${showCustomizationPanel ? "x-lg" : "sliders2"}`}></i>
        </button>
      </div>
      <div>
        <h2>Ustawienia strony:</h2>
        <p>
          <strong>1. Wybierz kolor</strong>
        </p>

        {["jasny", "ciemny"].map((newThemeName, index) => {
          let colorValue = "white";

          if (newThemeName === "ciemny") colorValue = "#222";

          return (
            <div key={newThemeName} className="d-flex">
              <button
                className="btn btn-lg m-3"
                style={{ backgroundColor: colorValue }}
                onClick={() => _changeThemeName(newThemeName)}
              >                
              </button>
              {newThemeName}
            </div>
          );
        })}

       
       
      </div>
    </div>
  );
}
