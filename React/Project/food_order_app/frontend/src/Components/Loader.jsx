import React from "react";
import { useLoader } from "../context/LoaderContext";

function Loader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        className="spinner-border text-success"
        style={{
          width: "4rem",
          height: "4rem",
        }}
      ></div>
    </div>
  );
}

export default Loader;
