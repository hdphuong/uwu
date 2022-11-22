import React from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

type CursorProps = {
    key:  string;
    clientX: number;
    clientY: number;
}
const OtherCursors : React.FC<CursorProps> = ({key, clientX, clientY} : CursorProps) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/chat');
  }

  return (
      <svg
        key={key}
        width={300}
        height={300}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          left: clientX,
          top: clientY,
          transform: "translate(-50%, -50%)",
          zIndex: 3,
        }}
        onClick={() => clickHandler()}
      >
        <circle className="otherCursors"
          cx="20"
          cy="20"
          r="8"
        />
      </svg>
  );
};

export default OtherCursors;