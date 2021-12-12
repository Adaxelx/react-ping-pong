import * as React from "react";

interface UseTimerProps {
  isPaused: boolean;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const useTimer = ({ isPaused, time, setTime }: UseTimerProps) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const secondsParsed = seconds < 10 ? `0${seconds}` : seconds;

  React.useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null;
    if (isPaused) {
      interval && clearInterval(interval);
    } else {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) return clearInterval(interval);
    };
  }, [isPaused, setTime]);
  return [minutes, secondsParsed] as const;
};

export default useTimer;
