import * as React from "react";
import {
  canvasHeight,
  canvasWidth,
  hPallet,
  startPalletPos,
} from "./constants";

import { useCanvas, usePalletsMove } from "./hooks";

import { CanvasProps } from "./types";

const PingPongBoard = ({
  setScore,
  isPaused,
  setPendingReset,
  score,
}: CanvasProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [yPlayer1, setYPlayer1] = React.useState(startPalletPos);
  const [yPlayer2, setYPlayer2] = React.useState(startPalletPos);

  React.useEffect(() => {
    setYPlayer1(startPalletPos);
    setYPlayer2(startPalletPos);
  }, [score]);

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
