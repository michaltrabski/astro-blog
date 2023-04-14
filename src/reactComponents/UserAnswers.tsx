import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { MEDIA_HOST, MEDIA_SIZE_LARGE } from "../settings/settings";
import { _questions, _currentCategory, _allCategories, _givenAnswers } from "../store/store";
import type { Question } from "../store/types";
import { createQuestionUrl, getFullUrl } from "../utils/utils";

dayjs.extend(relativeTime);

interface UserAnswersProps {
  whatQuestionsToShow: "show-answers-that-user-clicked-wrong-answer" | "show-answers-that-user-clicked-correct-answer";
}

export default function UserAnswers(props: UserAnswersProps) {
  const { whatQuestionsToShow } = props;

  const questions = useStore(_questions);
  const givenAnswers = useStore(_givenAnswers);
  const currentCategory = useStore(_currentCategory);

  const [limit, setLimit] = useState(10);

  const options = {
    "show-answers-that-user-clicked-wrong-answer": {
      getText: (count: number) => `Masz ${count} błędne odpowiedzi.`,
      css: "bg-danger",
    },
    "show-answers-that-user-clicked-correct-answer": {
      getText: (count: number) => `Masz ${count} poprawne odpowiedzi.`,
      css: "bg-success",
    },
  };

  const questionsToShow: Question[] = [];

  Object.values(givenAnswers)
    .filter((givenAnswer) => {
      if (whatQuestionsToShow === "show-answers-that-user-clicked-wrong-answer") {
        return givenAnswer.clickedAnswer !== givenAnswer.correctAnswerIs;
      }

      if (whatQuestionsToShow === "show-answers-that-user-clicked-correct-answer") {
        return givenAnswer.clickedAnswer === givenAnswer.correctAnswerIs;
      }

      // show all answers
      return true;
    })
    .forEach((givenAnswer) => {
      const question = questions.find((question) => question.id === givenAnswer.questionId);
      if (question) {
        questionsToShow.push(question);
      }
    });

  const count = questionsToShow.length;

  return (
    <>
      <div className={options[whatQuestionsToShow].css}>
        <p>{options[whatQuestionsToShow].getText(count)}</p>
      </div>

      <div className="text-start">
        {questionsToShow.slice(0, limit).map((question, index) => {
          const mediaUrl =
            question.media === "placeholder.png" ? "/placeholder.png" : MEDIA_HOST + MEDIA_SIZE_LARGE + question.media;
          const isVideo = question.media.endsWith(".mp4");

          const givenAnswerToThisQuestion = givenAnswers[question.id];
          const firstGivenAnswerTimestamp = givenAnswerToThisQuestion?.firstGivenAnswerTimestamp;

          const timeFromNow = firstGivenAnswerTimestamp ? dayjs(firstGivenAnswerTimestamp).fromNow(true) : null;

          return (
            <div key={question.id}>
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-12">
                    <div className="card-body">
                      <div>
                        {isVideo ? (
                          <video className="w-100" src={mediaUrl} controls></video>
                        ) : (
                          <img className="w-100 img-fluid" src={mediaUrl} alt={question.text} />
                        )}
                      </div>

                      <p className="card-text">
                        <strong>{index + 1}. </strong>
                        {question.text}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">Błędnej odpowiedzi udzieliłeś ({timeFromNow || "?"}) temu.</small>
                      </p>
                      <div>
                        <a
                          href={getFullUrl(createQuestionUrl(question, currentCategory))}
                          className="btn btn-primary btn-sm"
                        >
                          Idź do tego pytania
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="pb-3">
          {limit >= count ? (
            <p className="text-center">To już wszystkie {count} pytań.</p>
          ) : (
            <button className="btn btn-lg btn-primary w-100" onClick={() => setLimit((limit) => limit + 10)}>
              Pokaż więcej
            </button>
          )}
        </div>
      </div>

      {/* <pre>
        {JSON.stringify(givenAnswers, null, 2)}
      </pre>

      <pre>
        {JSON.stringify(questions.slice(0,3), null, 2)}
      </pre> */}
    </>
  );
}
