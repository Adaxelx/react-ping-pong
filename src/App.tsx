import React from "react";

import { BottomBar, TimerWrapper, Wrapper } from "./App.styled";
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
          setPendingReset={setPendingReset}
          isPaused={isPaused}
          setScore={setScore}
        />
      )}
      <BottomBar>
        <button onClick={() => setIsPaused((prev) => !prev)}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        <p>{`${score[Player.LEFT]}:${score[Player.RIGHT]}`}</p>
        <button
          onClick={() => {
            setTime(0);
            setScore(initialScore);
            setPendingReset(true);
          }}
        >
          Reset
        </button>
      </BottomBar>
    </Wrapper>
  );
}

export default App;
