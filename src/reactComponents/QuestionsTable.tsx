import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { questions, currentCategory } from "../store/questions";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

// interface Props {
//   x: string;
// }

export default function QuestionsTable() {
  const $questions = useStore(questions);
  const $currentCategory = useStore(currentCategory);

  const questionKeys = Object.keys(
    $questions.length > 0 ? $questions[0] : []
  );

  return (
    <div>
      <h1>QuestionsTable:</h1>
      <p>currentCategory={$currentCategory}</p>

      {/* <pre>{JSON.stringify(questionKeys, null, 2)}</pre>
      <pre>{JSON.stringify($questions[0], null, 2)}</pre> */}
 
{$questions.length > 0 && 

      <p><a href={getFullUrl(createQuestionUrl($questions[0].id))}>{$questions[0].id}</a></p>
}

      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              {questionKeys.map((questionKey) => (
                <th scope="col">{questionKey}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {$questions.map((question, index) => {
              const questionValues = Object.values(question);



              return <tr>
              {questionValues.map((questionValue) => {

                if (typeof questionValue === 'string') {
                  return <td>{questionValue}</td>
                } 
                
                if (Array.isArray(questionValue)) {
                  return <td>{questionValue.join(",")}</td>
                } 
                
                
                  return <td>{JSON.stringify(questionValue)}</td>
               
              })}
            </tr>



            //   return <tr>
            //   <th scope="row">
            //     <pre>{JSON.stringify(questionValues, null, 2)}</pre>
            //   </th>
            //   <td>{question.id}</td>
            //   <td>{getFullUrl(createQuestionUrl(question.id))}</td>
            //   <td>
            //     <a href={getFullUrl(createQuestionUrl(question.id))}>
            //       {question.text}
            //     </a>
            //   </td>
            //   <td>{question.categories.join(",")}</td>
            // </tr>
          
          
          
          
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
