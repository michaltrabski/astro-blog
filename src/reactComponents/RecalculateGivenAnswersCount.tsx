import { useEffect } from "react";

import { _recalculateGivenAnswersCount } from "../store/store";

export default function RecalculateGivenAnswersCount() {
  useEffect(() => {
    _recalculateGivenAnswersCount();
  }, []);

  return null;
}
