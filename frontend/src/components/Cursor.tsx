import React from "react";
import useMousePosition from "./useMousePosition";
const Cursor = () => {
  const { clientX, clientY} = useMousePosition();
  
  return (
      <svg
        width={300}
        height={300}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          left: clientX,
          top: clientY,
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <circle className="myCursor"
          cx="25"
          cy="25"
          r="8"
        />
      </svg>
  );
};

export default Cursor;