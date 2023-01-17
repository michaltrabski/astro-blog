import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { questions, currentCategory } from "../store/questions";

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

      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              {["#", "id", "text", "cat"].map((headerEl) => (
                <th scope="col">{headerEl}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {$questions.map((q, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{q.id}</td>
                <td>
                  <a href={`/${q.id}`}>{q.text}</a>
                </td>
                <td>{q.question_belongs_to_categories.join(",")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre>{JSON.stringify($questions[0], null, 2)}</pre>
    </div>
  );
}
