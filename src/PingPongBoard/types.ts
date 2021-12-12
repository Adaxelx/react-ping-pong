import { Dispatch, SetStateAction } from "react";

export enum Player {
  LEFT = "left",
  RIGHT = "right",
}

export type Score = {
  [Player.LEFT]: number;
  [Player.RIGHT]: number;
};

export type KeyBindings = {
  top: string;
  bottom: string;
};
export interface CanvasProps {
  isPaused: boolean;
  setScore: Dispatch<SetStateAction<Score>>;
  setPendingReset: Dispatch<SetStateAction<boolean>>;
}

export type CollisionType = {
  palletY: number;
  palletX: number;
  ball: Ball;
};

export type DrawProps = {
  ctx: CanvasRenderingContext2D;
  frameCount?: number;
};

export type Position = { x: number; y: number };
export type DrawMoverProps = {
  pos: Position;
} & DrawProps;

export const goalSpace = {
  yStart: 100,
  yEnd: 300,
};

export type Ball = {
  velocityX: number;
  velocityY: number;
  radius: number;
  x: number;
  y: number;
  speed: number;
};

export interface PosChangeProps {
  actuallyClicked: string[];
  setter: Dispatch<SetStateAction<number>>;
  keyBind: KeyBindings;
}
