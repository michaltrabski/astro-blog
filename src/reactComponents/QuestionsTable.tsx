import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { _questions, _currentCategory, changeCategory, _allCategories } from "../store/store";
import { createQuestionUrl, getFullUrl } from "../utils/utils";
import CategoriesButtons from "./CategoriesButtons";

export default function QuestionsTable() {
  const questions = useStore(_questions);
  const currentCategory = useStore(_currentCategory);

  const [limit, setLimit] = useState(10);

  const questionsFilteredByCurrentCategory = questions.filter((question) =>
    question.categories.includes(currentCategory)
  );

  const questionKeys = Object.keys(
    questionsFilteredByCurrentCategory.length > 0 ? questionsFilteredByCurrentCategory[0] : []
  );

  return (
    <div className="row mb-2">
      <div className="col">
        <h1>QuestionsTable:</h1>

        <CategoriesButtons />

        {/* <pre>{JSON.stringify(questionKeys, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify($questions[0], null, 2)}</pre> */}

        <form className="form-floating">
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                {questionKeys.map((questionKey) => (
                  <th key={questionKey} scope="col">
                    {questionKey}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questionsFilteredByCurrentCategory.slice(0, limit).map((question, rowIndex) => {
                const questionValues = Object.values(question);

                return (
                  <tr key={JSON.stringify(question)}>
                    {questionValues.map((questionValue, index) => {
                      const questionKey = questionKeys[index];

                      if (typeof questionValue === "string") {
                        if (questionKey === "id") {
                          return (
                            <td>
                              <strong>{rowIndex + 1})</strong>. {questionValue}{" "}
                            </td>
                          );
                        }

                        if (questionKey === "text") {
                          return (
                            <td>
                              <a href={getFullUrl(createQuestionUrl(question, currentCategory))}>{questionValue}</a>
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

        <div className="d-grid gap-2">
          <button
            onClick={() => setLimit((prevLimit) => prevLimit + 50)}
            className="btn btn-primary btn-lg"
            type="button"
          >
            <span>Pokaż więcej pytań </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-circle"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
