import React, { useState } from "react";

function Demo() {
  const [name, changeName] = useState(true);

  return (
    <>
      <h3 className="text-center">{name === true ? "Pavan" : "Rutuja"}</h3>

      <button
        onClick={() => {
          changeName(!name);
        }}
      >
        Change Name
      </button>
    </>
  );
}

export default Demo;
