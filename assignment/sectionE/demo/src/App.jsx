import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Home from "./componets/Home";
import Welcome from "./componets/Welcome";
import Name from "./componets/Name";
import Number from "./componets/Number";
import Q40 from "./componets/Q40";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Name Name="pratik" /> */}
      {/* <Number /> */}
      <Q40 name="John" course="React" />
    </>
  );
}

export default App;
