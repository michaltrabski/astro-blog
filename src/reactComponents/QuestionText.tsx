import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import SwipeableViews from "react-swipeable-views";

import { _isStoreReady, _mp3Items, _playMp3Item } from "../store/store";
import { _addMp3Item } from "../store/store";
import { getSlug } from "../utils/utils";
import type { QuestionPageData } from "../store/types";

interface QuestionTextProps {
  question: QuestionPageData;
}

export default function QuestionText(props: QuestionTextProps) {
  const { text, prevSlug, nextSlug } = props.question;

  useStore(_mp3Items); // calling this hook is needed to update the component when the store changes

  const [showSlider, setShowSlider] = useState(false);

  const questionTextAsSlug = getSlug(text);

  const canplay = _mp3Items.get()[questionTextAsSlug]?.canplay;

  // const adverticementRef = useRef(adverticements[Math.floor(Math.random() * adverticements.length)]);

  useEffect(() => {
    setShowSlider(true);
    _addMp3Item({ id: questionTextAsSlug });
    // _addMp3Item({ id: getSlug(adverticementRef.current) });
  }, []);

  return (
    <div className="row mb-3">
      <div className="col">
        {/* <pre>
          {JSON.stringify(props, null, 2)}
        </pre> */}

        {showSlider ? (
          <SwipeableViews
            enableMouseEvents
            index={1}
            onChangeIndex={(index: number, indexLatest: number, meta: any) => {
              if (index === 0 && indexLatest === 1) {
                console.log("go to previous question", index, indexLatest, meta);
                window.location.href = prevSlug;
              }

              if (index === 2 && indexLatest === 1) {
                console.log("go to next question", index, indexLatest, meta);
                window.location.href = nextSlug;
              }
            }}
          >
            <div className="h-100 d-flex justify-content-between align-items-center">
              <p className="h-100 d-flex align-items-center align-sefl-center small">
                Nastąpi automatyczne przekierowanie do poprzedniego pytania.
              </p>
              <a href={prevSlug} className="h-100 d-flex align-items-center btn btn-primary btn-lg align-sefl-center">
                <i className="bi bi-arrow-left-short"></i>
              </a>
            </div>

            <h1 className="display-6 text-start shadow-bottom">
              {text}

              {canplay && (
                <button className="btn btn-light pr-2" onClick={() => _playMp3Item(questionTextAsSlug)}>
                  <span className="bi bi-play-circle"></span>
                </button>
              )}
            </h1>

            <div className="h-100 d-flex justify-content-between align-items-center">
              <a href={nextSlug} className="h-100 d-flex align-items-center btn btn-primary btn-lg align-sefl-center">
                <i className="bi bi-arrow-right-short"></i>
              </a>
              <p className="h-100 d-flex align-items-center align-sefl-center small">
                Nastąpi automatyczne przekierowanie do następnego pytania.
              </p>
            </div>
          </SwipeableViews>
        ) : (
          <h1 className="display-6 text-start shadow-bottom">{text}</h1>
        )}
      </div>
    </div>
  );
}
