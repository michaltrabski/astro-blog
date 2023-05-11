import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import SwipeableViews from "react-swipeable-views-react-18-fix";

import {
  _mp3Items,
  _nextQuestionUrl,
  _playMp3Item,
  _prevQuestionUrl,
} from "../store/store";
import { _addMp3Item } from "../store/store";
import { getSlug } from "../utils/utils";
import type { QuestionPageData } from "../store/types";

interface TextReactProps {
  id: string;
  t: string;
  prevSlug: string | null;
  nextSlug: string | null;
  s: string;
}

export default function TextReact(props: TextReactProps) {
  const { id, t, prevSlug, nextSlug, s } = props;

  // useStore(_mp3Items); // calling this hook is needed to update the component when the store changes
  // const prevQuestionUrl = useStore(_prevQuestionUrl);
  // const nextQuestionUrl = useStore(_nextQuestionUrl);

  // const prevSlug = prevQuestionUrl || prevSlugFromProps;
  // const nextSlug = nextQuestionUrl || nextSlugFromProps;

  const [showSlider, setShowSlider] = useState(false);

  // const questionTextAsSlug = getSlug(text);

  // const canplay = _mp3Items.get()[questionTextAsSlug]?.canplay;

  // // const adverticementRef = useRef(adverticements[Math.floor(Math.random() * adverticements.length)]);

  useEffect(() => {
    setShowSlider(true);
    // _addMp3Item({ id: questionTextAsSlug });
    // _addMp3Item({ id: getSlug(adverticementRef.current) });
  }, []);

  const textContent = (
    <>
      <span style={{ fontWeight: "300" }} className="text-secondary">
        {id.replace("id", "")}.{" "}
      </span>
      {t}
      <span style={{ fontWeight: "300" }} className="text-secondary">
        {" "}
        ({s} pkt)
      </span>
    </>
  );

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
              if (index === 0 && indexLatest === 1 && prevSlug) {
                window.location.href = prevSlug; // take it from ReduxAstro
              }

              if (index === 2 && indexLatest === 1 && nextSlug) {
                window.location.href = nextSlug; // take it from ReduxAstro
              }
            }}
          >
            <div className="pe-3 h-100 d-flex justify-content-between align-items-center">
              <p className="h-100 d-flex align-items-center align-sefl-center small">
                {prevSlug ? (
                  <>
                    Nastąpi automatyczne przekierowanie do poprzedniego pytania.
                  </>
                ) : (
                  <>Nie ma wcześniejszych pytań! Idź do następnego.</>
                )}
              </p>
              <a
                href={prevSlug}
                className="h-100 d-flex align-items-center btn btn-primary btn-lg align-sefl-center"
              >
                <i className="bi bi-arrow-left-short"></i>
              </a>
            </div>

            <h1
              // style={{
              //   fontSize: "calc(1.3rem + 1.5vw)",
              //   fontWeight: "400",
              //   lineHeight: "1.2",
              // }}
              className="text-start shadow-bottom"
            >
              {textContent}
              {/* {canplay && (
                <span
                  style={{ cursor: "pointer" }}
                  className="bi ps-1 small bi-play-circle"
                  onClick={() => _playMp3Item(questionTextAsSlug)}
                ></span>

                // <button className="btn btn-light pr-2" onClick={() => _playMp3Item(questionTextAsSlug)}>
                //   <span className="bi bi-play-circle"></span>
                // </button>
              )} */}
            </h1>

            <div className="ps-3 h-100 d-flex justify-content-between align-items-center">
              <a
                href={nextSlug}
                className="h-100 d-flex align-items-center btn btn-primary btn-lg align-sefl-center"
              >
                <i className="bi bi-arrow-right-short"></i>
              </a>
              <p className="h-100 d-flex align-items-center align-sefl-center small">
                {nextSlug ? (
                  <>
                    Nastąpi automatyczne przekierowanie do następnego pytania.
                  </>
                ) : (
                  <>Nie ma następnych pytań! Idź do poprzedniego.</>
                )}
              </p>
            </div>
          </SwipeableViews>
        ) : (
          <h1
            // style={{
            //   fontSize: "calc(1.3rem + 1.5vw)",
            //   fontWeight: "400",
            //   lineHeight: "1.2",
            // }}
            className="text-start shadow-bottom"
          >
            {textContent}
          </h1>
        )}
      </div>
    </div>
  );
}
