import { useEffect } from "react";
import { getDataFromEndpoint } from "../store/store";

export default function GetDataFromEndpointComponent() {
  useEffect(() => {
    console.log(1, "GetDataFromEndpointComponent mounted");
    getDataFromEndpoint();
  }, []);

  return null;
}
