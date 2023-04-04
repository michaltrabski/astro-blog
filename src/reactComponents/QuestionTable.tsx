import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { _questions, _currentCategory, changeCategory, _allCategories, QuestionPageData } from "../store/store";
import { createQuestionUrl, getFullUrl } from "../utils/utils";
import CategoriesButtons from "./CategoriesButtons";
import Media from "./Media";
import CurrentYear from "./CurrentYear";

interface QuestionTableProps {
  question: QuestionPageData;
}
export default function QuestionTable(props: QuestionTableProps) {
  const { question } = props;

  // const questions = useStore(_questions);
  // const currentCategory = useStore(_currentCategory);

  return (
    <div>
      <h2>Szczegóły dotyczące tego pytania testowego.</h2>

      <div className="table-responsive">
        <table className="table table-bordered">
          <caption>
            Powyższa taleba przedstawia szczegółowe informacje dotyczące pytania z testów na prawo jazdy.
          </caption>
          <thead>
            <tr>
              <th scope="col">Id w bazie danych ministerstwa transportu.</th>
              <th scope="col">{question.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Treść pytania</th>
              <td>{question.text}</td>
            </tr>

            {question.a && (
              <>
                <tr>
                  <th scope="row">Odpowiedź A</th>
                  <td>{question.a}</td>
                </tr>
                <tr>
                  <th scope="row">Odpowiedź B</th>
                  <td>{question.b}</td>
                </tr>
                <tr>
                  <th scope="row">Odpowiedź C</th>
                  <td>{question.c}</td>
                </tr>
              </>
            )}

            <tr>
              <th scope="row">Prawidłowa odpowiedź to:</th>
              <td>{question.correctAnswer}</td>
            </tr>
            <tr>
              <th scope="row">Kategorie prawa jazdy do jakich należy to pytanie:</th>
              <td>{question.categories.join(", ").toUpperCase()}</td>
            </tr>
            <tr>
              <th scope="row">Wartość punktowa:</th>
              <td>{question.score}</td>
            </tr>
            <tr>
              <th scope="row">Link do tego pytania:</th>
              <td><a href={getFullUrl(createQuestionUrl(question, question.category))}>{question.text}</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre>{JSON.stringify(question, null, 2)}</pre>
    </div>
  );
}
