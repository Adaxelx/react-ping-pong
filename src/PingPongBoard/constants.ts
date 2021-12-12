export const canvasHeight = 400;
export const canvasWidth = 600;

export const radius = 8;

export const { wPallet, hPallet } = { wPallet: 15, hPallet: 100 };
export const firstPalletX = 20;
export const secondPalletX = canvasWidth - 20 - wPallet;

export const initialBall = {
  radius: 8,
  x: canvasWidth / 2,
  y: 200,
  speed: 5,
  velocityY: 3,
  velocityX: 3,
};
