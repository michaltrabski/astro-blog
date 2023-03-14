import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { QuestionPageData, _playMp3Item } from "../store/store";
import { _addMp3Item } from "../store/store";
import slugify from "slugify";
import Mp3 from "./Mp3";

interface QuestionTextProps {
  question: QuestionPageData;
}

export default function QuestionText(props: QuestionTextProps) {
  const { text } = props.question;
 
    const slugText = slugify(text, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: /[*+~,.()/'"!:@?;]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });

  // michal 
  useEffect(() => {
    _addMp3Item({ id: slugText,  action: "", state:"",  });
  }, []);

  return (
    <div className="row mb-3">
      <div className="col">
        <h1 className="display-6 text-start shadow-bottom">
          {text}
          <button className="btn btn-light" onClick={() => _playMp3Item(slugText)}>
            <span className="bi bi-play-circle"></span>
          </button>
        </h1>
      </div>
    </div>
  );
}
