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

const adverticements = [   "Napisz w komentarzu odpowiedź na to pytanie i wejdź na stronę poznaj-testy.pl.",
"Aby odpowiedzieć na to pytanie, wpisz swoją odpowiedź w komentarzu i odwiedź stronę poznaj-testy.pl.",
"Chętnie poznam Twoją odpowiedź na to pytanie, więc napisz ją w komentarzu i odwiedź stronę poznaj-testy.pl.",
"Zapraszam do napisania swojej odpowiedzi na to pytanie w komentarzu i odwiedzenia strony poznaj-testy.pl.",
"Jeśli chcesz podzielić się swoją odpowiedzią na to pytanie, napisz ją w komentarzu i odwiedź stronę poznaj-testy.pl.",
"Czekam na Twoją odpowiedź na to pytanie w komentarzu i polecam odwiedzenie strony poznaj-testy.pl.",
"Zachęcam do napisania swojej odpowiedzi na to pytanie w komentarzu oraz do odwiedzenia strony poznaj-testy.pl.",
"Proszę o napisanie swojej odpowiedzi na to pytanie w komentarzu i o wejście na stronę poznaj-testy.pl.",
"Być może Twoja odpowiedź na to pytanie będzie ciekawa, więc napisz ją w komentarzu i odwiedź stronę poznaj-testy.pl.",
"Będę wdzięczny za Twoją odpowiedź na to pytanie w komentarzu oraz za odwiedzenie strony poznaj-testy.pl.",
]

const getSlug = (text: string) => {
  return slugify(text, {
  replacement: "-", // replace spaces with replacement character, defaults to `-`
  remove: /[*+~,.()/'"!:@?;]/g, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: false, // strip special characters except replacement, defaults to `false`
  locale: "pl", // language code of the locale to use
  trim: true, // trim leading and trailing replacement chars, defaults to `true`
});
}


export default function QuestionText(props: QuestionTextProps) {
  const { text } = props.question;

  useStore(_mp3Items); // calling this hook is needed to update the component when the store changes

  const slugText = getSlug(text)

  const canplay = _mp3Items.get()[slugText]?.canplay;

  const adverticement = adverticements[Math.floor(Math.random() * adverticements.length)];
  
   useEffect(() => _addMp3Item({ id: slugText }), []);

   useEffect(() => _addMp3Item({ id: getSlug(adverticement) }), [adverticement]);



  return (
    <div className="row mb-3">
      <div className="col">
        <h1 className="display-6 text-start shadow-bottom">
          

          { canplay && (
            <button className="btn btn-light pr-2" onClick={() => _playMp3Item(slugText)}>
              <span className="bi bi-play-circle"></span>
            </button>
          )}

{text}


{}

<button className="btn btn-light" onClick={() => _playMp3Item(getSlug(adverticement))}>
              <span className="bi bi-play-circle"></span>
            </button>
         
        </h1>
      </div>
    </div>
  );
}
