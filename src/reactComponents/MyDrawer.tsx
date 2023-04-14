import { Fragment, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";

import Customization from "./Customization";

type Anchor = "top" | "left" | "bottom" | "right";

export default function MyDrawer() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // this prevent button from showing before js is loaded and respond to click
  const [isButtoReady, setIsButtonReady] = useState(false);

  useEffect(() => {
    setIsButtonReady(true);
  }, []);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <button
        style={{
          top: "8rem",
          right: "0",
          opacity: isButtoReady ? "0.7": "0",
          transition: "opacity 0.5s ease-in-out",
        }}
        className="position-absolute btn btn-primary btn-lg"
        onClick={toggleDrawer("left", true)}
      >
        <i className={`bi bi-${state.right ? "x-lg" : "sliders2"}`}></i>
      </button>

      {(["left", "right", "top", "bottom"] as const).map((anchor) => (
        <Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <Customization />
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}
