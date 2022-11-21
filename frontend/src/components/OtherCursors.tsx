import React from "react";
import './styles.css';

type CursorProps = {
    key:  string;
    clientX: number;
    clientY: number;
}
const OtherCursors : React.FC<CursorProps> = ({key, clientX, clientY} : CursorProps) => {
  
  return (
      <svg
        key={key}
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
  );
};

export default OtherCursors;