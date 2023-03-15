import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { QuestionPageData, _mp3Items, _playMp3Item } from "../store/store";
import { _addMp3Item } from "../store/store";
import slugify from "slugify";
import Mp3 from "./Mp3";

interface QuestionTextProps {
  question: QuestionPageData;
}

export default function QuestionText(props: QuestionTextProps) {
  const { text } = props.question;

  useStore(_mp3Items); // calling this hook is needed to update the component when the store changes

  const slugText = slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[*+~,.()/'"!:@?;]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "pl", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

   useEffect(() => _addMp3Item({ id: slugText }), []);

   const canplay = _mp3Items.get()[slugText]?.canplay;

  return (
    <div className="row mb-3">
      <div className="col">
        <h1 className="display-6 text-start shadow-bottom">
          {text}

          { canplay && (
            <button className="btn btn-light" onClick={() => _playMp3Item(slugText)}>
              <span className="bi bi-play-circle"></span>
            </button>
          )}
         
        </h1>
      </div>
    </div>
  );
}
