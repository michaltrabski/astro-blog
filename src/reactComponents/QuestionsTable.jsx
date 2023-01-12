import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { questions } from '../store/questions';

// interface Props {
//   x: string;
// }

export default function QuestionsTable(props) {
  const $questions = useStore(questions);

  return (
    <div>
      <h1>QuestionsTable:</h1>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              {['#', 'text'].map((headerEl) => (
                <th scope="col">{headerEl}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {$questions.map((q, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`/${q.id}`}>{q.text}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre>{JSON.stringify($questions[0], null, 2)}</pre>
    </div>
  );
}
