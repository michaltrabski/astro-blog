import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount((c) => c + 1)}>count = {count}</div>;
}

export const Year = () => {
  const [date, setDate] = useState(Date.now());
  return <span onClick={() => setDate((c) => c + 111111)}>{date}</span>;
};
