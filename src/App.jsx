import React, { createContext, useContext } from "react";
import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";

function App() {
  const combinationLength = 8;
  const maxAttempts = 8;

  return (
    <div className="flex  items-center justify-center min-h-screen min-w-screen ">
      <Board combinationLength={combinationLength} maxAttempts={maxAttempts} />
    </div>
  );
}

export default App;
