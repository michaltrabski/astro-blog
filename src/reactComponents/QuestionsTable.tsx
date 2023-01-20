import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { questions, currentCategory } from "../store/questions";
import { createQuestionUrl } from "../utils/utils";

// interface Props {
//   x: string;
// }

export default function QuestionsTable() {
  const $questions = useStore(questions);
  const $currentCategory = useStore(currentCategory);

  return (
    <div>
      <h1>QuestionsTable:</h1>
      <p>currentCategory={$currentCategory}</p>

      {/* <pre>{JSON.stringify($questions[0], null, 3)}</pre> */}

      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              {["#", "id", "slug", "text", "cat"].map((headerEl) => (
                <th scope="col">{headerEl}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {$questions.map((q, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{q.id}</td>
                <td>{createQuestionUrl(q.id)}</td>
                <td>
                  <a href={createQuestionUrl(q.id)}>{q.text}</a>
                </td>
                <td>{q.categories.join(",")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre>{JSON.stringify($questions[0], null, 2)}</pre>
    </div>
  );
}
