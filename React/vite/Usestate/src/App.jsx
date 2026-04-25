import React, { useState } from "react";

import { players } from "./array";
// import Player from "./Components/Player";
import Player from "./Components/Player";
import Demo from "./Components/Demo";
import PlayerComp from "./Components/PlayerComp";

function App() {
  const [team, setTeam] = useState("ALL");

  const filteredPlayers =
    team === "ALL" ? players : players.filter((p) => p.team === team);

  return (
    <>
      <h1 className="text-center">IPL Players</h1>

      <div style={{ textAlign: "center", margin: 20 }}>
        <button onClick={() => setTeam("ALL")}>All</button>
        <button onClick={() => setTeam("RCB")}>RCB</button>
        <button onClick={() => setTeam("MI")}>MI</button>
        <button onClick={() => setTeam("CSK")}>CSK</button>
      </div>

      {filteredPlayers.map((p, index) => (
        <PlayerComp
          key={index}
          name={p.name}
          age={p.age}
          team={p.team}
          img={p.img}
        />
      ))}
    </>
  );
}

export default App;
