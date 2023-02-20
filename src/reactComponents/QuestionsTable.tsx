import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import {
  _questions,
  _currentCategory,
  changeCategory,
  _allCategories,
} from "../store/store";
import { createQuestionUrl, getFullUrl } from "../utils/utils";
import CategoriesButtons from "./CategoriesButtons";

export default function QuestionsTable() {
  const questions = useStore(_questions);
  const currentCategory = useStore(_currentCategory);

  const questionsFilteredByCurrentCategory = questions.filter((question) =>
    question.categories.includes(currentCategory)
  );

  const questionKeys = Object.keys(
    questionsFilteredByCurrentCategory.length > 0
      ? questionsFilteredByCurrentCategory[0]
      : []
  );

  return (
    <div className="row mb-2">
      <div className="col">
        <h1>QuestionsTable:</h1>

        <CategoriesButtons />

        {/* <pre>{JSON.stringify(questionKeys, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify($questions[0], null, 2)}</pre> */}

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
              {questionsFilteredByCurrentCategory.map((question, rowIndex) => {
                const questionValues = Object.values(question);

                return (
                  <tr key={JSON.stringify(question)}>
                    {questionValues.map((questionValue, index) => {
                      const questionKey = questionKeys[index];

                      if (typeof questionValue === "string") {
                        if (questionKey === "id") {
                          return (
                            <td>
                          <strong>{rowIndex+1})</strong>. {questionValue}                            </td>
                          );
                        }


                        if (questionKey === "text") {
                          return (
                            <td>
                              <a
                                href={getFullUrl(
                                  createQuestionUrl(question, currentCategory)
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
      </div>{" "}
    </div>
  );
}
