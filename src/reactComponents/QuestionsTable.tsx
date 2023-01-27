import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import {
  questions,
  currentCategory,
  changeCategory,
  _categories,
} from "../store/store";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

export default function QuestionsTable() {
  const $questions = useStore(questions);
  const categories = useStore(_categories);
  const $currentCategory = useStore(currentCategory);

  const questionsFilteredByCurrentCategory = $questions.filter((question) =>
    question.categories.includes($currentCategory)
  );

  const questionKeys = Object.keys(
    questionsFilteredByCurrentCategory.length > 0
      ? questionsFilteredByCurrentCategory[0]
      : []
  );

  return (
    <div>
      <h1>QuestionsTable:</h1>

      <div>
        {categories.map((category) => (
          <button key={category}
            className={`btn me-2 btn-${
              category === $currentCategory ? "primary" : "secondary"
            }`}
            onClick={() => changeCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* <pre>{JSON.stringify(questionKeys, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify($questions[0], null, 2)}</pre> */}

      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              {questionKeys.map((questionKey) => (
                <th key={questionKey} scope="col">{questionKey}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questionsFilteredByCurrentCategory.map((question, index) => {
              const questionValues = Object.values(question);

              return (
                <tr key={JSON.stringify(question)}>
                  {questionValues.map((questionValue, index) => {
                    const questionKey = questionKeys[index];

                    if (typeof questionValue === "string") {
                      if (questionKey === "text") {
                        return (
                          <td>
                            <a
                              href={getFullUrl(
                                createQuestionUrl(question.id, $currentCategory)
                              )}
                            >
                              {questionValue}
                            </a>
                          </td>
                        );
                      }

                      return <td>{questionValue}</td>;
                    }

                    if (Array.isArray(questionValue)) {
                      return <td>{questionValue.join(",")}</td>;
                    }

                    return <td>{JSON.stringify(questionValue)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
