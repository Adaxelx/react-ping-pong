import React from "react";

import { BottomBar, TimerWrapper, Wrapper, Button } from "./App.styled";
import PingPongBoard from "./PingPongBoard";

import { Player } from "./PingPongBoard/types";
import useTimer from "./useTimer";

const initialScore = {
  [Player.LEFT]: 0,
  [Player.RIGHT]: 0,
};

function App() {
  const [score, setScore] = React.useState(initialScore);

  const [isPaused, setIsPaused] = React.useState(false);

  const [time, setTime] = React.useState(0);
  const [minutes, seconds] = useTimer({ isPaused, time, setTime });

  const [pendingReset, setPendingReset] = React.useState(false);

  return (
    <Wrapper>
      <TimerWrapper>
        <p>{`Time: ${minutes}:${seconds}`}</p>
      </TimerWrapper>
      {!pendingReset && (
        <PingPongBoard
          score={score}
          setPendingReset={setPendingReset}
          isPaused={isPaused}
          setScore={setScore}
        />
      )}
      <BottomBar>
        <Button onClick={() => setIsPaused((prev) => !prev)}>
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <p>{`${score[Player.LEFT]}:${score[Player.RIGHT]}`}</p>
        <Button
          onClick={() => {
            setTime(0);
            setScore(initialScore);
            setPendingReset(true);
          }}
        >
          Reset
        </Button>
      </BottomBar>
    </Wrapper>
  );
}

export default App;
