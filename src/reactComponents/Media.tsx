import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import type { QuestionPageData } from "../store/store";
import { MEDIA_HOST, MEDIA_SIZE_MEDIUM } from "../settings/settings";

interface MediaProps {
  text: string;
  media: string;
  showControls?: boolean;
}

export default function Media(props: MediaProps) {
  const { text, media , showControls = true} = props;

  const isVideo = media.endsWith(".mp4");

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);

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

  const mediaUrl = MEDIA_HOST + MEDIA_SIZE_MEDIUM + media;

  return (
    <div className="MEDIA row">
      <div className="col">
        <p className="small position-absolute text-light bg-dark ">
          {width}x{height}
        </p>
        {isVideo ? (
          <video
            ref={videoRef}
            src={mediaUrl}
            autoPlay={import.meta.env.MODE === "development" ? false : true}
            controls={showControls}
            className="w-100 shadow border border-dark"
            style={{ minWidth: "102px" }}
          >
            <p>{text}</p>
          </video>
        ) : (
          <img
            ref={imageRef}
            className="w-100 shadow border border-dark img-fluid"
            style={{ minWidth: "102px" }}
            src={mediaUrl}
            alt={text}
          />
        )}
      </div>
    </div>
  );
}
