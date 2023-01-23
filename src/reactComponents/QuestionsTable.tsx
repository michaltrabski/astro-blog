import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { questions, currentCategory,changeCategory } from "../store/questions";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

// interface Props {
//   x: string;
// }

export default function QuestionsTable() {
  const $questions = useStore(questions);
  const $currentCategory = useStore(currentCategory);

  const questionKeys = Object.keys($questions.length > 0 ? $questions[0] : []);

  return (
    <div>
      <h1>QuestionsTable:</h1>
      <p>currentCategory={$currentCategory}</p>
      <div>
        {[..."a,b,c,d,t,am,a1,a2,b1,c1,d1,z".split(",")].map(category => <button className={`btn me-2 btn-${category === $currentCategory ? "primary" : "secondary"}`} onClick={() => changeCategory(category)}>{category}</button>)}
      </div>

      {/* <pre>{JSON.stringify(questionKeys, null, 2)}</pre>
      <pre>{JSON.stringify($questions[0], null, 2)}</pre> */}



      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              {["url", ...questionKeys].map((questionKey) => (
                <th scope="col">{questionKey}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {$questions.map((question, index) => {
              const questionValues = Object.values(question);

              return (
                <tr>
                  {["url", ...questionValues].map((questionValue, index) => {
                    if (index === 0) {
                      return (
                        <td>
                          <a
                            href={getFullUrl(
                              createQuestionUrl(question.id, $currentCategory)
                            )}
                          >
                            {getFullUrl(
                              createQuestionUrl(question.id, $currentCategory)
                            )}
                          </a>
                        </td>
                      );
                    }

                    if (typeof questionValue === "string") {
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
