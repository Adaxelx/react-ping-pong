import * as React from "react";
import { canvasHeight } from "../constants";
import { handleKeyBind, handleChangePosPallet } from "../helpers";
import { PosChangeProps } from "../types";

type Dispatch = React.Dispatch<React.SetStateAction<number>>;

const usePalletsMove = ({
  hPallet,
  setYPlayer2,
  setYPlayer1,
}: {
  hPallet: number;
  setYPlayer2: Dispatch;
  setYPlayer1: Dispatch;
}) => {
  const [pressedKeys, setPressedKeys] = React.useState<string[]>([]);
  const maxY = canvasHeight - hPallet;

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
        setter: setYPlayer2,
        keyBind: {
          top: "ArrowUp",
          bottom: "ArrowDown",
        },
      });

      handlePlayerPosChange({
        actuallyClicked,
        setter: setYPlayer1,
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
  }, [maxY, pressedKeys, setYPlayer1, setYPlayer2]);

  React.useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prevKeys) => prevKeys.filter((key) => key !== e.key));
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);
};

export default usePalletsMove;
