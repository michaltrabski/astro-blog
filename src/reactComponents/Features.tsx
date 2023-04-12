import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { features } from "../settings/settings";

export default function Features() {
  const [featuresIndex, setFeaturesIndex] = useState(0);

useEffect(() => {
  setFeaturesIndex(Math.floor(Math.random() * features.length));
}, []);

  const randomFeature = features[featuresIndex];

  return (
    <div>
      <h2>Funkcje przyspieszające naukę testów na prawo jazdy</h2>
      <div className="text-start">
        <p>
          <strong>Polecana funkcja:</strong>
        </p>

        <p>1. {randomFeature}</p>

        <p>
          <strong>Dodatkowe funkcje:</strong>
        </p>

        {features.map((feature, index) => (
          <p>
            {index + 2}. {feature}
          </p>
        ))}
      </div>
    </div>
  );
}
