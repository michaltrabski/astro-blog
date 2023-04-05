import { useStore } from "@nanostores/react";

import { _givenAnswers, _addAnswer, _wrongGivenAnswersCount, _correctGivenAnswersCount } from "../store/store";

export default function GivenAnswers() {
  const givenAnswers = useStore(_givenAnswers);
  const correctGivenAnswersCount = useStore(_correctGivenAnswersCount);
  const wrongGivenAnswersCount = useStore(_wrongGivenAnswersCount);

  return (
    <div style={{ overflow: "auto", width: "300px" }}>
      <p>_correctGivenAnswersCount= {correctGivenAnswersCount}</p>
      <p>_wrongGivenAnswersCount= {wrongGivenAnswersCount}</p>

      <pre className="text-start">givenAnswers={JSON.stringify(givenAnswers, null, 2)}</pre>
    </div>
  );
}
