import React, { useEffect, useState } from "react";

import { MEDIA_HOST, MEDIA_SIZE_LARGE, MEDIA_SIZE_MEDIUM, MEDIA_SIZE_SMALL } from "../settings/settings";

interface MediaProps {
  media: string;
  text?: string;
  showControls?: boolean;
  startVideoAutomaticaly?: boolean;
  size?: "small" | "medium" | "large";
}

export default function Media(props: MediaProps) {
  const { text, media, showControls = false, startVideoAutomaticaly = true, size = "small" } = props;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [hideControlsOnceWhenItStartsPlaying, setHideControlsOnceWhenItStartsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const pngRef = React.useRef<HTMLImageElement | null>(null);

  const mediaSize =
    size === "small"
      ? MEDIA_SIZE_SMALL
      : size === "medium"
      ? MEDIA_SIZE_MEDIUM
      : size === "large"
      ? MEDIA_SIZE_LARGE
      : MEDIA_SIZE_SMALL;

  const mediaUrl = media === "placeholder.png" ? "/placeholder.png" : MEDIA_HOST + mediaSize + "" + media;
  const isVideo = media.endsWith(".mp4");

  function playCallback() {
    console.log("video is playing", mediaUrl);
    setIsPlaying(true);
    setIsEnded(false);
    setHideControlsOnceWhenItStartsPlaying(true);
    setShowPlayIcon(false);
  }

  function pauseCallback() {
    console.log("video is paused", mediaUrl);
    setIsPlaying(false);
    setShowPlayIcon(true);
  }

  function endedCallback() {
    console.log("video ended", mediaUrl);
    setIsPlaying(false);
    setIsEnded(true);
    setHideControlsOnceWhenItStartsPlaying(true);
    setShowPlayIcon(true);
  }

  useEffect(() => {
    const video = videoRef.current;

    video?.addEventListener("play", playCallback);
    video?.addEventListener("pause", pauseCallback);
    video?.addEventListener("ended", endedCallback);

    return () => {
      video?.removeEventListener("play", playCallback);
      video?.removeEventListener("pause", pauseCallback);
      video?.removeEventListener("ended", endedCallback);
    };
  }, []);

  const playVideo = () => {
    const video = videoRef.current;

    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  return (
    <div className="MEDIA row">
      <div className="col p-0">
        {/* <p className="small position-absolute text-light bg-dark">
          isPlaying: {isPlaying ? "true" : "false"} <br />
          isEnded: {isEnded ? "true" : "false"} <br />
        </p> */}
        {/* style={{ width: "calc(100% + 4rem)", transform: "translateX(-1rem)" }} */}
        <div >
          <p className="small"><a href={mediaUrl}>{mediaUrl}</a></p>
        <div  style={{ overflow: "hidden",border: "0px solid red",scale: "1" }}>
        <div  style={{ border: "0px solid green", scale: "1" }}>
          {isVideo ? (
            <div className="position-relative" onClick={() => playVideo()}>
              <video
                className="w-100 shadow border-dark"
                ref={videoRef}
                src={mediaUrl}
                autoPlay={startVideoAutomaticaly}
                controls={showControls && !hideControlsOnceWhenItStartsPlaying}
              >
                <p>{text || media}</p>
              </video>
              <div className={`position-absolute ${showPlayIcon || "d-none"}`} style={{ top: "50%", left: "50%" }}>
                <div style={{ transform: "translate(-50%,-50%)" }}>
                  <i style={{ fontSize: "2rem", cursor: "pointer" }} className="larger bi bi-play-circle"></i>
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
    </div>  </div></div>
  );
}
