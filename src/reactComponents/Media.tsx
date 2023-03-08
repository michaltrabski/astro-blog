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

 

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
 

  const mediaSize =
    size === "small"
      ? MEDIA_SIZE_SMALL
      : size === "medium"
      ? MEDIA_SIZE_MEDIUM
      : size === "large"
      ? MEDIA_SIZE_LARGE
      : MEDIA_SIZE_SMALL;

  const mediaUrl = media === "placeholder.png" ? "/placeholder.png" : MEDIA_HOST + mediaSize + media;
  const isVideo = media.endsWith(".mp4");

 

  const playVideo = () => {
    if (videoRef.current) {
      // play video from the biginning
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="MEDIA row">
      <div className="col">
        {/* <p className="small position-absolute text-light">
          {width}x{height}
        </p> */}
        {isVideo ? (<>
          <video
            className="w-100 shadow border border-dark"
            ref={videoRef}
            src={mediaUrl}
            // autoPlay={import.meta.env.MODE === "development" ? false : stopAutoPlay ? false : true}
            autoPlay={startVideoAutomaticaly}
            controls={showControls}
            onClick={() => {
              console.log("click");
              playVideo();
            }}
          >
            <p>{text || media}</p>
          </video>
          <br />
          <video
            style={{ width: "300px" }}
            src={mediaUrl}
                controls 
             
          >
         
          </video>
          </>
        ) : (
          <img
            className="w-100 shadow border border-dark img-fluid"
            src={mediaUrl}
            alt={text || media}
          />
        )}

        <p>{isVideo ? "video": "image"}</p>
      </div>
    </div>
  );
}
