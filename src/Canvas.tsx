import * as React from "react";

interface CanvasProps {
  width: number;
  height: number;
}

type DrawProps = {
  ctx: CanvasRenderingContext2D;

  frameCount: number;
};

type DrawMoverProps = {
  pos: { x: number; y: number };
} & DrawProps;

const goalSpace = {
  yStart: 100,
  yEnd: 300,
};

const ballSize = 8;

const { wPallet, hPallet } = { wPallet: 15, hPallet: 100 };

const drawPallet = ({ ctx, frameCount, pos: { x, y } }: DrawMoverProps) => {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, wPallet, hPallet);
};

const drawBall = ({ ctx, frameCount, pos: { x, y } }: DrawMoverProps) => {
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x, y, ballSize, 0, Math.PI * 2);
  ctx.fill();
};

const drawCanvas = ({ ctx, frameCount }: DrawProps) => {
  const { yStart, yEnd } = goalSpace;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(600, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 400);
  ctx.lineTo(600, 400);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, yStart);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(600, 0);
  ctx.lineTo(600, yStart);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, yStart);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(600, 400);
  ctx.lineTo(600, yEnd);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 400);
  ctx.lineTo(0, yEnd);
  ctx.stroke();
};

type KeyBindings = {
  top: string;
  bottom: string;
};

const handleKeyBind = (clicked: string, { top, bottom }: KeyBindings) => {
  if (clicked === top) {
    return -5;
  } else if (clicked === bottom) {
    return 5;
  }
  return 0;
};

const handleChangePosPallet = (prevY: number, step: number, maxY: number) => {
  const afterChange = prevY + step;
  return afterChange < 0 || afterChange > maxY ? prevY : afterChange;
};

interface PosChangeProps {
  actuallyClicked: string[];
  setter: React.Dispatch<React.SetStateAction<number>>;
  keyBind: KeyBindings;
}

const Canvas = (props: CanvasProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { width, height } = props;

  const startPos = height / 2 - hPallet / 2;

  const maxY = height - hPallet;

  const [yPlayer1, setYPlayer1] = React.useState(startPos);
  const [yPlayer2, setYPlayer2] = React.useState(startPos);

  const [pressedKeys, setPressedKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error("Missing canvas ref");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Missing context ref");
    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCanvas({ ctx, frameCount });
      drawPallet({
        ctx,
        frameCount,
        pos: { x: 20, y: yPlayer1 },
      });
      drawBall({ ctx, frameCount, pos: { x: 100, y: 200 } });
      drawPallet({
        ctx,
        frameCount,
        pos: { x: width - wPallet - 20, y: yPlayer2 },
      });
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [width, yPlayer1, yPlayer2]);

  React.useEffect(() => {
    const handlePlayerPosChange = ({
      actuallyClicked,
      setter,
      keyBind,
    }: PosChangeProps) => {
      const playerChange =
        actuallyClicked
          .map((key) => handleKeyBind(key, keyBind))
          .find((key) => key !== 0) ?? 0;

      playerChange &&
        setter((prev) => handleChangePosPallet(prev, playerChange, maxY));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      let actuallyClicked = [...pressedKeys];
      if (!pressedKeys.includes(e.key)) {
        actuallyClicked = [...pressedKeys, e.key];
        setPressedKeys(actuallyClicked);
      }

      handlePlayerPosChange({
        actuallyClicked,
        setter: setYPlayer1,
        keyBind: {
          top: "ArrowUp",
          bottom: "ArrowDown",
        },
      });

      handlePlayerPosChange({
        actuallyClicked,
        setter: setYPlayer2,
        keyBind: {
          top: "w",
          bottom: "s",
        },
      });

      handlePlayerPosChange({
        actuallyClicked,
        setter: setYPlayer2,
        keyBind: {
          top: "W",
          bottom: "S",
        },
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [maxY, pressedKeys]);

  React.useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prevKeys) => prevKeys.filter((key) => key !== e.key));
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
