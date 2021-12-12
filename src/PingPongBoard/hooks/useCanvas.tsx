import React from "react";
import {
  canvasWidth,
  canvasHeight,
  firstPalletX,
  secondPalletX,
  initialBall,
} from "../constants";
import {
  drawCanvas,
  drawPallet,
  checkBallCollision,
  checkIfBallIsInCanvas,
  drawBall,
} from "../helpers";
import { Ball, Score } from "../types";

interface UseCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  yPlayer1: number;
  yPlayer2: number;
  isPaused: boolean;
  setScore: React.Dispatch<React.SetStateAction<Score>>;
}
const useCanvas = ({
  canvasRef,
  yPlayer1,
  yPlayer2,
  setScore,
  isPaused,
}: UseCanvasProps) => {
  const ball = React.useRef<Ball>(initialBall);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error("Missing canvas ref");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Missing context ref");
    let frameCount = 0;
    let animationFrameId: number | null = null;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawCanvas({ ctx, frameCount });
      drawPallet({
        ctx,
        frameCount,
        pos: { x: firstPalletX, y: yPlayer1 },
      });

      const isFirstPlayer = ball.current.x < canvasWidth / 2;

      ball.current = checkBallCollision({
        palletY: isFirstPlayer ? yPlayer1 : yPlayer2,
        palletX: isFirstPlayer ? firstPalletX : secondPalletX,
        ball: ball.current,
        sign: isFirstPlayer ? 1 : -1,
      });

      const { ball: ballUpdated, pointFor } = checkIfBallIsInCanvas(
        ball.current
      );

      ball.current = ballUpdated;
      if (pointFor) {
        setScore((prevScore) => ({
          ...prevScore,
          [pointFor]: prevScore[pointFor] + 1,
        }));
        ball.current = initialBall;
      }
      drawBall({
        ctx,
        frameCount,
        pos: { x: ball.current.x, y: ball.current.y },
      });
      drawPallet({
        ctx,
        frameCount,
        pos: { x: secondPalletX, y: yPlayer2 },
      });
      if (!isPaused) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [ball, canvasRef, isPaused, setScore, yPlayer1, yPlayer2]);
};

export default useCanvas;
