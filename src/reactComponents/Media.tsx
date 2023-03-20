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

  const [isLoaded, setIsLoaded] = useState(false);

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

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.addEventListener("error", () => {
  //       console.log("video error", mediaUrl);
  //     });
  //   }

  //   console.log("video", videoRef.current);

  //   if (pngRef.current) {
  //     pngRef.current.addEventListener("error", () => {
  //       console.log("png error", mediaUrl);
  //     });
  //   }

  //   console.log("png", pngRef.current);
  // }, [videoRef.current, pngRef.current]);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="MEDIA row">
      <div className="col">
        <div className={`${isLoaded ? "border border-success": ""}`}>
        {/* <p className="small position-absolute text-light">
          {width}x{height}
        </p> */}
        {isVideo ? (
          <>
            <video
              className="w-100 shadow border border-dark"
              ref={videoRef}
              src={mediaUrl}
              // autoPlay={import.meta.env.MODE === "development" ? false : stopAutoPlay ? false : true}
              autoPlay={startVideoAutomaticaly}
              controls={showControls}
              onClick={() => {
                console.log("click");
                // playVideo();
              }}
              onLoad={() => {
                console.log("Video loaded:", mediaUrl);
                setIsLoaded(true);
              }}
            >
              <p>{text || media}</p>
            </video>
          </>
        ) : (
          <img
            className="w-100 shadow border border-dark img-fluid"
            ref={pngRef}
            src={mediaUrl}
            alt={text || media}
            onLoad={() => {
              console.log("media loaded: ", mediaUrl);
              setIsLoaded(true);
            }}
          />
        )}
      </div>
      </div>
    </div>
  );
}
