import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import type { QuestionPageData } from "../store/store";
import { MEDIA_HOST } from "../settings/settings";

interface MediaProps {
  text: string;
  media: string;
  isVideo: boolean;
}

export default function Media(props: MediaProps) {
  const { text, media, isVideo } = props;

  return (
    <div className="MEDIA row">
      <div className="col">
        {isVideo ? (
          <video
            src={MEDIA_HOST + media}
            autoPlay={import.meta.env.MODE === "development" ? false : true}
            controls
            className="w-100 shadow border border-dark"
          >
            <p>{text}</p>
          </video>
        ) : (
          <img className="w-100 shadow border border-dark img-fluid" src={MEDIA_HOST + media} alt={text} />
        )}
      </div>
    </div>
  );
}
