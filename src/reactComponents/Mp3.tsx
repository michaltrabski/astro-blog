import React, { useRef, useEffect, useState } from "react";

interface Mp3Props {
  src: string;
}

export default function Mp3(props: Mp3Props) {
  const { src } = props;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", () => {
        console.log("ended");
      });
    }
  }, []);

  const play = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
    }
  };

  return (
    <span>
      <audio className="d-none" controls src={src} ref={audioRef} />
      <button className="btn btn-light" onClick={play}><i className="bi bi-play-circle"></i></button>
    </span>
  );
}
