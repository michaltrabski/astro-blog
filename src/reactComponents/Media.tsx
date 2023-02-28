import React, { useEffect, useState } from "react";

import {
  MEDIA_HOST,
  MEDIA_SIZE_LARGE,
  MEDIA_SIZE_MEDIUM,
  MEDIA_SIZE_SMALL,
} from "../settings/settings";

interface MediaProps {
  media: string;
  text?: string;
  showControls?: boolean;
  stopAutoPlay?: boolean;
  size?: "small" | "medium" | "large";
}

export default function Media(props: MediaProps) {
  const {
    text,
    media,
    showControls = true,
    stopAutoPlay,
    size = "small",
  } = props;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);

  const mediaSize =
    size === "small"
      ? MEDIA_SIZE_SMALL
      : size === "medium"
      ? MEDIA_SIZE_MEDIUM
      : size === "large"
      ? MEDIA_SIZE_LARGE
      : MEDIA_SIZE_SMALL;

  const mediaUrl =
    media === "placeholder.png"
      ? "/placeholder.png"
      : MEDIA_HOST + mediaSize + media;
  const isVideo = media.endsWith(".mp4");

  useEffect(() => {
    if (videoRef.current) {
      setWidth(+videoRef.current.getBoundingClientRect().width.toFixed(2));
      setHeight(+videoRef.current.getBoundingClientRect().height.toFixed(2));
    }

    if (imageRef.current) {
      setWidth(+imageRef.current.getBoundingClientRect().width.toFixed(2));
      setHeight(+imageRef.current.getBoundingClientRect().height.toFixed(2));
    }
  }, [videoRef]);

  return (
    <div className="MEDIA row">
      <div className="col">
        {/* <p className="small position-absolute text-light">
          {width}x{height}
        </p> */}
        {isVideo ? (
          <video
            className="w-100 shadow border border-dark"
            style={{ minWidth: "102px" }}
            ref={videoRef}
            src={mediaUrl}
            autoPlay={
              import.meta.env.MODE === "development"
                ? false
                : stopAutoPlay
                ? false
                : true
            }
            controls={showControls}
          >
            <p>{text || media}</p>
          </video>
        ) : (
          <img
            className="w-100 shadow border border-dark img-fluid"
            style={{ minWidth: "102px" }}
            ref={imageRef}
            src={mediaUrl}
            alt={text || media}
          />
        )}
      </div>
    </div>
  );
}
