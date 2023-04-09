import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { changeCategory, _currentCategory, _allCategories, _questions, Question } from "../store/store";
import CurrentYear from "./CurrentYear";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

export default function Customization() {
  const allCategoriesFromStore = useStore(_allCategories);
  const allQuestionsFromStore = useStore(_questions);

  const curentCategory = useStore(_currentCategory);

  // const allCategories =
  //   allCategoriesFromStore.length > 0
  //     ? allCategoriesFromStore
  //     : props.allCategories;

  // const allQuestions =  allQuestionsFromStore.length > 0
  //     ? allQuestionsFromStore
  //     : props.allQuestions;

  const [showCustomizationPanel, setShowCustomizationPanel] = useState(true);

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
      className="position-fixed" style={{ left: showCustomizationPanel ? "0.5rem" : "-1rem", top: "70%" }}>
        <button className="btn btn-primary btn-sm">
          <i className={`bi bi-${showCustomizationPanel ? "x-lg" : "sliders2"}`}></i>
        </button>
      </div>
      <div>
        <h2>Ustawienia strony:</h2>
        <p><strong>Kolor</strong></p>

        {[1,2,3].map((color, index) => <div className="d-inline">
          <i style={{color: "red"}} className={`bi bi-${index+1}-circle`}></i>
        </div>)}
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui animi nesciunt molestiae sequi deleniti, quasi
          totam at nam magni illo fugit harum obcaecati quisquam? Nisi nobis odit, pariatur officiis corrupti quae culpa
          dignissimos obcaecati iste, architecto accusamus accusantium quaerat voluptas molestiae aspernatur optio,
          asperiores tenetur voluptatem perferendis distinctio possimus ipsam ex. Sint, maiores quisquam labore rem
          soluta inventore, ipsum rerum quo molestias eligendi exercitationem dolore tenetur reprehenderit temporibus
          blanditiis assumenda. Sint modi ut exercitationem? Est modi, nulla necessitatibus atque ratione amet nisi.
          Corrupti ipsum provident, deserunt voluptatem vitae, quis consequuntur dolorum deleniti quisquam hic qui
          laudantium reiciendis ad voluptatibus quas!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui animi nesciunt molestiae sequi deleniti, quasi
          totam at nam magni illo fugit harum obcaecati quisquam? Nisi nobis odit, pariatur officiis corrupti quae culpa
          dignissimos obcaecati iste, architecto accusamus accusantium quaerat voluptas molestiae aspernatur optio,
          asperiores tenetur voluptatem perferendis distinctio possimus ipsam ex. Sint, maiores quisquam labore rem
          soluta inventore, ipsum rerum quo molestias eligendi exercitationem dolore tenetur reprehenderit temporibus
          blanditiis assumenda. Sint modi ut exercitationem? Est modi, nulla necessitatibus atque ratione amet nisi.
          Corrupti ipsum provident, deserunt voluptatem vitae, quis consequuntur dolorum deleniti quisquam hic qui
          laudantium reiciendis ad voluptatibus quas!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui animi nesciunt molestiae sequi deleniti, quasi
          totam at nam magni illo fugit harum obcaecati quisquam? Nisi nobis odit, pariatur officiis corrupti quae culpa
          dignissimos obcaecati iste, architecto accusamus accusantium quaerat voluptas molestiae aspernatur optio,
          asperiores tenetur voluptatem perferendis distinctio possimus ipsam ex. Sint, maiores quisquam labore rem
          soluta inventore, ipsum rerum quo molestias eligendi exercitationem dolore tenetur reprehenderit temporibus
          blanditiis assumenda. Sint modi ut exercitationem? Est modi, nulla necessitatibus atque ratione amet nisi.
          Corrupti ipsum provident, deserunt voluptatem vitae, quis consequuntur dolorum deleniti quisquam hic qui
          laudantium reiciendis ad voluptatibus quas!
        </p>
      </div>
    </div>
  );
}
