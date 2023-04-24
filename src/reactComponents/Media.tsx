import React, { useEffect, useState } from "react";

import { MEDIA_HOST, MEDIA_SIZE } from "../settings/settings";

interface MediaProps {
  media: string;
  text?: string;
  size?: "small" | "medium" | "large";
}

export default function Media(props: MediaProps) {
  const { text, media, size = "small" } = props;

  const [showPlayIcon, setShowPlayIcon] = useState(true);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const pngRef = React.useRef<HTMLImageElement | null>(null);

  const mediaUrl =
    media === "placeholder.png"
      ? "/placeholder.png"
      : MEDIA_HOST + MEDIA_SIZE[size] + media;
  const isVideo = media.endsWith(".mp4");

  function playCallback() {
    setShowPlayIcon(false);
  }

  function pauseCallback() {
    setShowPlayIcon(true);
  }

  function endedCallback() {
    setShowPlayIcon(true);
  }

  useEffect(() => {
    const video = videoRef.current;

    clickOnVideo();

    video?.addEventListener("play", playCallback);
    video?.addEventListener("pause", pauseCallback);
    video?.addEventListener("ended", endedCallback);

    return () => {
      video?.removeEventListener("play", playCallback);
      video?.removeEventListener("pause", pauseCallback);
      video?.removeEventListener("ended", endedCallback);
    };
  }, []);

  async function clickOnVideo() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  }

  return (
    <div className="MEDIA row">
      <div className="col p-0 p-lg-3">
        {/* <p className="small position-absolute text-light bg-dark">
          isPlaying: {isPlaying ? "true" : "false"} <br />
          isEnded: {isEnded ? "true" : "false"} <br />
        </p> */}

        <div style={{ overflow: "hidden" }}>
          <div style={{ scale: "1.0" }}>
            {isVideo ? (
              <div className="position-relative" onClick={clickOnVideo}>
                <video
                  className="w-100 shadow border border-dark"
                  ref={videoRef}
                  src={mediaUrl}
                >
                  <p>{text || media}</p>
                </video>
                <div
                  className={`position-absolute ${showPlayIcon || "d-none"}`}
                  style={{ top: "50%", left: "50%" }}
                >
                  <div style={{ transform: "translate(-50%,-50%)" }}>
                    <i
                      style={{ fontSize: "2rem", cursor: "pointer" }}
                      className="larger bi bi-play-circle"
                    ></i>
                  </div>
                </div>
              </div>
            ) : (
              <img
                className="w-100 shadow border border-dark img-fluid"
                ref={pngRef}
                src={mediaUrl}
                alt={text || media}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
