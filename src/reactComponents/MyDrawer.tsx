import { Fragment, KeyboardEvent, MouseEvent, useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Customization from "./Customization";

type Anchor = "top" | "left" | "bottom" | "right";

export default function MyDrawer() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
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
          opacity: "0.7",
        }}
        className="position-absolute btn btn-primary btn-lg"
        onClick={toggleDrawer("left", true)}
      >
        <i className={`bi bi-${state.right ? "x-lg" : "sliders2"}`}></i>
      </button>

      {(["left", "right", "top", "bottom"] as const).map((anchor) => (
        <Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onOpen={toggleDrawer(anchor, true)}
            onClose={toggleDrawer(anchor, false)}
          >
            <Customization />
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
}
