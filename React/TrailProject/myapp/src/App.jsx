import React from "react";
import Players from "./Components/Players";
import players from "./array";

function App() {
  return (
    <>
      <h1>Trial Project</h1>

      <div className="container">
        <div className="row">
          {players.map((val) => {
            return (
              <div className="col-3">
                <Players
                  name={val.name}
                  age={val.age}
                  team={val.team}
                  img={val.img}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
