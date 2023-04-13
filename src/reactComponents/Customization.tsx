import { Fragment, useState } from "react";
import { useStore } from "@nanostores/react";
// import Drawer from "react-modern-drawer";

import Drawer from 'rc-drawer';

import { _changeThemeName, _themeName } from "../store/store";
import Features from "./Features";

export default function Customization() {
  const themeName = useStore(_themeName);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [isCustomizationPanelShown, setIsCustomizationPanelShown] = useState(false);

  // const allCategories =
  //   allCategoriesFromStore.length > 0
  //     ? allCategoriesFromStore
  //     : props.allCategories;

  // const allQuestions =  allQuestionsFromStore.length > 0
  //     ? allQuestionsFromStore
  //     : props.allQuestions;

  const panelWidth = 85;

 

  return <div>
  <button onClick={toggleDrawer}>Show</button>
    <Drawer open={isOpen} onClose={toggleDrawer}  className="bla bla bla">
      <div>Hello World</div>
    </Drawer>
  </div>


  return (
    <>
      
      <div
        className="position-absolute bg-light border border-warning border-5 rounded-3 p-3 shadow-lg"
        style={{
          minHeight: "100vh",
          width: panelWidth + "%",
          top: "3rem",
          right: isCustomizationPanelShown ? 0 : panelWidth * -1 + "%",
          transitionDuration: "0.2s",
        }}
      >
        <div
          onClick={() => setIsCustomizationPanelShown(!isCustomizationPanelShown)}
          className="position-absolute"
          style={{
            top: "5rem",
            left: isCustomizationPanelShown ? "calc(100% - 3rem - 5px)" : "-3rem",
            opacity: isCustomizationPanelShown ? "0.9" : "0.7",
          }}
        >
          <button className="btn btn-primary btn-lg">
            <i className={`bi bi-${isCustomizationPanelShown ? "x-lg" : "sliders2"}`}></i>
          </button>
        </div>

        <h2>Ustawienia strony:</h2>

        <div className="pb-3">
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
                className="btn btn-lg m-1 p-3 shadow"
                style={{ backgroundColor: colorValue }}
                onClick={() => _changeThemeName(newThemeName)}
              >
                {/* <span className="text-light">{newThemeName}</span> */}
              </button>
            );
          })}
        </div>

        <div className="pb-3">
          <Features />
        </div>
      </div>
    </>
  );
}
