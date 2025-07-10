import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";

function App() {
  const [combinationLength, setCombinationLength] = useState(5);
  const [maxAttempts, setMaxAttempts] = useState(5);

  return (
    <div className="flex  items-center justify-center min-h-screen min-w-screen ">
      <Board
        combinationLength={combinationLength}
        maxAttempts={maxAttempts}
        setCombinationLength={setCombinationLength}
        setMaxAttempts={setMaxAttempts}
      />
    </div>
  );
}

export default App;
