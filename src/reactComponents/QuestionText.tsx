import React, { Fragment, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { QuestionPageData, _mp3Items, _playMp3Item } from "../store/store";
import { _addMp3Item } from "../store/store";
import slugify from "slugify";
import Mp3 from "./Mp3";
import { getSlug } from "../utils/utils";
import { adverticements } from "../settings/settings";

interface QuestionTextProps {
  question: QuestionPageData;
}

export default function QuestionText(props: QuestionTextProps) {
  const { text } = props.question;

  useStore(_mp3Items); // calling this hook is needed to update the component when the store changes

  const slugText = getSlug(text);

  const canplay = _mp3Items.get()[slugText]?.canplay;

  const adverticementRef = useRef(adverticements[Math.floor(Math.random() * adverticements.length)]);

  useEffect(() => {
    _addMp3Item({ id: slugText });
    _addMp3Item({ id: getSlug(adverticementRef.current) });
  }, []);

  return (
    <div className="row mb-3">
      <div className="col">
        <h1 className="display-6 text-start shadow-bottom">
          {canplay && (
            <button className="btn btn-light pr-2" onClick={() => _playMp3Item(slugText)}>
              <span className="bi bi-play-circle"></span>
            </button>
          )}

          {text}

          <button className="btn btn-light" onClick={() => _playMp3Item(getSlug(adverticementRef.current))}>
            {/* blinking class is available = .blinking  */}
            <span className="bi bi-play-circle"></span>
          </button>
        </h1>
      </div>
    </div>
  );
}
