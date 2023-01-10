import React, { useEffect, useState } from 'react';

export default function AllQuestionsData() {
  const [count, setCount] = useState(-1);

  useEffect(() => {
    (async () => {
      const data = await fetch('../all-questions-data.json').then((r) =>
        r.json()
      );

      // console.log(111111111, data);

      if (data.allQuestionsData) {
        setCount(data.allQuestionsData.length);
      }
    })();
  }, []);

  return <div>allqUESTIONSDATA count = {count}</div>;
}
