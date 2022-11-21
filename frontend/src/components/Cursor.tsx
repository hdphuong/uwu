import React from "react";
import useMousePosition from "./useMousePosition";
const Cursor = () => {
  const { clientX, clientY} = useMousePosition();
  
  return (
      <svg
        width={50}
        height={50}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          left: clientX,
          top: clientY,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="8"
          fill="purple"
        />
      </svg>
  );
};

export default Cursor;