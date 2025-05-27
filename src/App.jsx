import React, { createContext, useContext } from "react";
import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";

function App() {
  const combinationLength = 10;
  const maxAttempts = 15;
  const [isWinner, setIsWinner] = useState(false);
  const handleWin = () => {
    setIsWinner(true);
  };
  return (
    <div className="flex  items-center justify-center min-h-screen min-w-screen ">
      <Board
        combinationLength={combinationLength}
        maxAttempts={maxAttempts}
        isWinner={isWinner}
      />
    </div>
  );
}

export default App;
