import { useStore } from "@nanostores/react";

import { _wrongGivenAnswersCount, _correctGivenAnswersCount } from "../store/store";


export const GIVEN_ANSWER_CORRECT = "GIVEN_ANSWER_CORRECT";
export const GIVEN_ANSWER_WRONG = "GIVEN_ANSWER_WRONG";

interface GivenAnswersProps {
  which: typeof GIVEN_ANSWER_CORRECT | typeof GIVEN_ANSWER_WRONG;
}

export default function GivenAnswers(props: GivenAnswersProps) {
  const { which } = props;

  const correctGivenAnswersCount = useStore(_correctGivenAnswersCount);
  const wrongGivenAnswersCount = useStore(_wrongGivenAnswersCount);

  return (
    <>
      {which === GIVEN_ANSWER_CORRECT && correctGivenAnswersCount}
      {which === GIVEN_ANSWER_WRONG && wrongGivenAnswersCount}
    </>
  );
}
