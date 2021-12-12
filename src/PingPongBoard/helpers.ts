import {
  canvasHeight,
  canvasWidth,
  hPallet,
  radius,
  wPallet,
} from "./constants";
import {
  DrawMoverProps,
  DrawProps,
  goalSpace,
  KeyBindings,
  Ball,
  Player,
  CollisionType,
} from "./types";

export const drawPallet = ({ ctx, pos: { x, y } }: DrawMoverProps) => {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, wPallet, hPallet);
};

export const drawBall = ({ ctx, pos: { x, y } }: DrawMoverProps) => {
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
};

export const drawCanvas = ({ ctx, frameCount }: DrawProps) => {
  const { yStart, yEnd } = goalSpace;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(canvasWidth, 0);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(0, canvasHeight);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, yStart);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(canvasWidth, 0);
  ctx.lineTo(canvasWidth, yStart);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, yStart);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(canvasWidth, canvasHeight);
  ctx.lineTo(canvasWidth, yEnd);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(0, canvasHeight);
  ctx.lineTo(0, yEnd);
  ctx.stroke();

  ctx.setLineDash([5, 3]);
  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.stroke();
};

export const handleKeyBind = (
  clicked: string,
  { top, bottom }: KeyBindings
) => {
  if (clicked === top) {
    return -5;
  } else if (clicked === bottom) {
    return 5;
  }
  return 0;
};

export const handleChangePosPallet = (
  prevY: number,
  step: number,
  maxY: number
) => {
  const afterChange = prevY + step;
  return afterChange < 0 || afterChange > maxY ? prevY : afterChange;
};

export const checkIfBallIsInCanvas = (originalBall: Ball) => {
  const { yStart, yEnd } = goalSpace;
  let ball = { ...originalBall };
  const { velocityX, velocityY } = ball;
  ball.x += velocityX;
  ball.y += velocityY;
  let pointFor: Player | null = null;
  if (ball.y + ball.radius > canvasHeight || ball.y - ball.radius < 0) {
    ball.velocityY = -velocityY;
  }
  if (
    (ball.x + ball.radius > canvasWidth && ball.y - ball.radius > yEnd) ||
    (ball.x + ball.radius > canvasWidth && ball.y - ball.radius < yStart) ||
    (ball.x - ball.radius < 0 && ball.y - ball.radius > yEnd) ||
    (ball.x - ball.radius < 0 && ball.y - ball.radius < yStart)
  ) {
    ball.velocityX = -velocityX;
  }
  if (
    ball.x + ball.radius > canvasWidth &&
    ball.y - ball.radius < yEnd &&
    ball.y - ball.radius > yStart
  ) {
    pointFor = Player.LEFT;
  }
  if (
    ball.x - ball.radius < 0 &&
    ball.y - ball.radius < yEnd &&
    ball.y - ball.radius > yStart
  ) {
    pointFor = Player.RIGHT;
  }

  return { ball, pointFor };
};

export const isCollision = ({ palletY, palletX, ball }: CollisionType) => {
  const palletTop = palletY;
  const palletBottom = palletY + hPallet;
  const palletRight = palletX + wPallet;
  const palletLeft = palletX;

  const ballTop = ball.y - ball.radius;
  const ballLeft = ball.x - ball.radius;
  const ballRight = ball.x + ball.radius;
  const ballBottom = ball.y + ball.radius;

  return (
    ballRight > palletLeft &&
    ballLeft < palletRight &&
    ballTop < palletBottom &&
    ballBottom > palletTop
  );
};

export const checkBallCollision = (props: CollisionType & { sign: 1 | -1 }) => {
  const { palletY, ball: ballOriginal, sign } = props;
  let ball = { ...ballOriginal };

  if (isCollision(props)) {
    const pointOfColission = (ball.y - (palletY + hPallet / 2)) / (hPallet / 2);
    const angle = (pointOfColission * Math.PI) / 4;
    ball.velocityX = sign * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);
    ball.speed += 0.1;
  }
  return ball;
};
