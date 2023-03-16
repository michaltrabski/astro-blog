import { useEffect } from "react";
import { getDataFromEndpoint } from "../store/store";

export default function GetDataFromEndpointComponent() {
  useEffect(() => {
    getDataFromEndpoint();
  }, []);

  return null;
}
