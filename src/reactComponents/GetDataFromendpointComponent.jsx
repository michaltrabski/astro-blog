import { useEffect } from "react";
import { getDataFromEndpoint } from "../store/store";

export default function GetDataFromendpointComponent() {
  useEffect(() => {
    console.log(1, "GetDataFromendpointComponent mounted");
    getDataFromEndpoint();
  }, []);

  return null;
}
