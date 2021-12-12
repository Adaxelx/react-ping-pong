import React from "react";
import PingPongBoard from "./PingPongBoard";
import { Player } from "./PingPongBoard/types";

function App() {
  const [score, setScore] = React.useState({
    [Player.LEFT]: 0,
    [Player.RIGHT]: 0,
  });

  return (
    <div style={{ padding: "16px" }}>
      <PingPongBoard setScore={setScore} />
    </div>
  );
}

export default App;
