import React, { useRef, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import { _mp3Items, _addMp3Item, _playMp3Item } from "../store/store";
import { MEDIA_HOST, MP3_DIR, MP3_EXTENSION } from "../settings/settings";

interface File {
  name: string;
  slug: string;
  state: null | "playing" | "paused" | "stopped";
}

export default function Mp3Player() {
  const mp3Items = useStore(_mp3Items);

  return (
    <div>
      <p>MP3 FILES:</p>
      <div>
        {Object.entries(mp3Items).map((item) => {
          const id = item[0];
          const file = item[1];

          return (
            <div key={id}>
               <SingleMp3 id={file.id} slug={file.id} />
            </div>
          );
        })}
      </div>

      {/* <pre>{JSON.stringify(mp3Items, null, 2)}</pre> */}
    </div>
  );
}

interface SingleMp3Props {
  id: string;
  slug: string;
}

const SingleMp3 = (props: SingleMp3Props) => {
  const mp3Items = useStore(_mp3Items);

  const { id, slug } = props;

  const audioRef = useRef<HTMLAudioElement>(null);

  // play audio from beegining
  const play = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const pause = () => audioRef?.current?.pause();

  useEffect(() => {
    if (mp3Items[id].action === "pause") {
      console.log("item to pause is", mp3Items[id]);
      pause();
    }

    if (mp3Items[id].action === "play") {
      console.log("item to play is", mp3Items[id]);
      play();
    }
  }, [mp3Items]);

  // detect if file is playing
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("play", () => {
        console.log("play");
      });

      audio.addEventListener("pause", () => {
        console.log("pause");
      });

      audio.addEventListener("ended", () => {
        console.log("ended");
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener("play", () => {
          console.log("play");
        });

        audio.removeEventListener("pause", () => {
          console.log("pause");
        });

        audio.removeEventListener("ended", () => {
          console.log("ended");
        });
      }
    }
  }, []);

  return (
     <div>
      <p>{MEDIA_HOST + MP3_DIR + slug + MP3_EXTENSION}</p>
     
    <div style={{ maxWidth: "500px" }} className="d-flex justify-content-between align-items-center">
      <audio ref={audioRef} controls src={MEDIA_HOST + MP3_DIR + slug + MP3_EXTENSION} />
      <i className="bi bi-play-circle" onClick={() => _playMp3Item(id)}></i>
      <i className="bi bi-pause-circle"></i>
      <i className="bi bi-stop-circle"></i>
    </div></div>
  );
};
