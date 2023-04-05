import { useStore } from "@nanostores/react";
import { useState } from "react";

import { _givenAnswers, _addAnswer } from "../store/store";

export default function GivenAnswers() {
  const givenAnswers = useStore(_givenAnswers);
  const [show, setShow] = useState(false);

  return (
    <div className="p-3">

      <button
        className="btn btn-primary w-100"
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "Ukryj" : "Pokaż"} Json odpowiedzi
      </button>
      {show &&
      <pre className="text-start">{JSON.stringify(givenAnswers, null, 2)}</pre>
      }
      </div>
  );
}
