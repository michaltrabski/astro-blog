import React, { Fragment, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { _mp3Items, _playMp3Item } from "../store/store";
import { _addMp3Item } from "../store/store";
import slugify from "slugify";
import Mp3 from "./Mp3";
import { getSlug } from "../utils/utils";
import { adverticements } from "../settings/settings";
import { useSwipeable } from "react-swipeable";
import type { QuestionPageData } from "../store/types";

import SwipeableViews from "react-swipeable-views";

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: "#fff",
  },
  slide1: {
    backgroundColor: "#FEA900",
  },
  slide2: {
    backgroundColor: "#B3DC4A",
  },
  slide3: {
    backgroundColor: "#6AC0FF",
  },
};

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
    // _addMp3Item({ id: getSlug(adverticementRef.current) });
  }, []);

  return (
    <div className="row mb-3">
      <div className="col">
        
        <SwipeableViews
          
          enableMouseEvents
          index={1}
          // onSwitching={(index: any, type: any) => console.log("onSwitching", index, type)}
          onTransitionEnd={() => console.log("onTransitionEnd")}
          onChangeIndex={(index: number, indexLatest: number, meta: any) => {
            if (index === 2 && indexLatest === 1) {
              console.log("go to next question", index, indexLatest, meta);
            }

            if (index === 0 && indexLatest === 1) {
              console.log("go to previous question", index, indexLatest, meta);
            }
          }}
        >
          <div>
            <p>poprzednie pytanie</p>
          </div>

          <h1 className="display-6 text-start shadow-bottom">
            {text}

            {canplay && (
              <button className="btn btn-light pr-2" onClick={() => _playMp3Item(slugText)}>
                <span className="bi bi-play-circle"></span>
              </button>
            )}
          </h1>

          <div>
            <p>Kolejne pytanie</p>
          </div>
        </SwipeableViews>
      </div>
    </div>
  );
}
