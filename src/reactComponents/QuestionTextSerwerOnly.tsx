import React, { Fragment, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { _isStoreReady, _mp3Items, _playMp3Item, _questions } from "../store/store";
import { _addMp3Item } from "../store/store";

import type { QuestionPageData } from "../store/types";

interface QuestionTextSerwerOnlyProps {
  question: QuestionPageData;
}

export default function QuestionTextSerwerOnly(props: QuestionTextSerwerOnlyProps) {
  const { text } = props.question;

  const isStoreReady = useStore(_isStoreReady);

  console.log("isStoreReady", isStoreReady);

  return (
    <>
      {!isStoreReady && (
        <div className="row mb-3">
          <div className="col">
            <h1 className="display-6 text-start shadow-bottom">
              {text} {isStoreReady ? "store ready" : "store not ready"}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
