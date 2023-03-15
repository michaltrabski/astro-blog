import React, { useRef, useEffect, useState, useMemo } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import {
  _mp3Items,
  _addMp3Item,
  _playMp3Item,
  Mp3Item,
  _updateMp3ItemState,
  _updateMp3ItemCanPlay,
} from "../store/store";
import { MEDIA_HOST, MP3_DIR, MP3_EXTENSION } from "../settings/settings";

export default function Mp3Player() {
  const mp3Items = useStore(_mp3Items);
  const mp3ItemsArray = Object.entries(mp3Items);

  return (
    <div className="border border-3 border-danger rounded shadow p-1">
      <p>MP3 FILES:</p>
      <div>
        {mp3ItemsArray.map((item) => {
          const id = item[0];
          const mp3Item = item[1];

          return (
            <div key={id}>
              <SingleMp3 mp3Item={mp3Item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SingleMp3Props {
  mp3Item: Mp3Item;
}

const SingleMp3 = (props: SingleMp3Props) => {
  const { id, canplay, state, action } = props.mp3Item;

  const mp3ItemsMap = useStore(_mp3Items);

  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const pause = () => audioRef?.current?.pause();

  useEffect(() => {
    if (mp3ItemsMap[id].action === "pause") pause();
    if (mp3ItemsMap[id].action === "play") play();
  }, [mp3ItemsMap]);

  const errorCallback = () => {} // console.log("error");
  const canplayCallback = () => {
    if (_mp3Items.get()[id].canplay === false) {
      _updateMp3ItemCanPlay(id, true);
    }
  };
  const playCallback = () => console.log("play");
  const pauseCallback = () => console.log("pause");
  const endedCallback = () => console.log("ended");

  // detect if file is playing
  useEffect(() => {
    const audio = audioRef.current;
    // console.log("id === ", id)

    if (audio) {
      audio.addEventListener("error", errorCallback);
      audio.addEventListener("canplay", canplayCallback);
      audio.addEventListener("play", playCallback);
      audio.addEventListener("pause", pauseCallback);
      audio.addEventListener("ended", endedCallback);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("error", errorCallback);
        audio.removeEventListener("canplay", canplayCallback);
        audio.removeEventListener("play", playCallback);
        audio.removeEventListener("pause", pauseCallback);
        audio.removeEventListener("ended", endedCallback);
      }
    };
  }, []);

  return (
    <div>
      <p>{MEDIA_HOST + MP3_DIR + id + MP3_EXTENSION}</p>

      {/* <pre>{JSON.stringify(mp3ItemsArray,null,2)}</pre> */}

      <div>
        <audio ref={audioRef} controls src={MEDIA_HOST + MP3_DIR + id + MP3_EXTENSION} />
        <div className="d-flex justify-content-between align-items-center">
          <i className="bi bi-play-circle" onClick={() => _playMp3Item(id)}></i>
          <i className="bi bi-pause-circle"></i>
          <i className="bi bi-stop-circle"></i>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>canplay = {JSON.stringify(canplay)}</span>
          <span>state = {state}</span>
          <span>action = {action}</span>
        </div>
      </div>
    </div>
  );
};
