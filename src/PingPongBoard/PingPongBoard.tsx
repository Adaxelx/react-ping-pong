import * as React from "react";
import { canvasHeight, canvasWidth, hPallet } from "./constants";

import { useCanvas, usePalletsMove } from "./hooks";

import { CanvasProps } from "./types";

const PingPongBoard = ({
  setScore,
  isPaused,
  setPendingReset,
}: CanvasProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const startPos = canvasHeight / 2 - hPallet / 2;

  const [yPlayer1, setYPlayer1] = React.useState(startPos);
  const [yPlayer2, setYPlayer2] = React.useState(startPos);

  useCanvas({
    canvasRef,
    yPlayer1,
    yPlayer2,
    setScore,
    isPaused,
  });

  React.useEffect(() => () => setPendingReset(false), [setPendingReset]);

  usePalletsMove({ hPallet, setYPlayer1, setYPlayer2, isPaused });

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default PingPongBoard;
