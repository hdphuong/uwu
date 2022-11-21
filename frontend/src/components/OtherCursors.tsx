import { color } from "@mui/system";
import React from "react";
import useMousePosition from "./useMousePosition";
type CursorProps = {
    clientX: number;
    clientY: number;
}
const OtherCursors : React.FC<CursorProps> = ({clientX, clientY} : CursorProps) => {
  
  return (
    <div 
      style={{ 
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none",
        color: "purple",
      }}
    >
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
        />
      </svg>
    </div>
  );
};

export default OtherCursors;