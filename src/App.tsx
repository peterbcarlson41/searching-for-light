import { useState } from "react";
import "./App.css";
import Home from "./pages/Home.js";
import Room1 from "./pages/Patience.js";
import Order from "./pages/Order";

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      {activeIndex === 0 && (
        <Home isActive={activeIndex === 0} onShow={() => setActiveIndex(1)} />
      )}
      {activeIndex === 1 && (
        <Room1 isActive={activeIndex === 1} onShow={() => setActiveIndex(2)} />
      )}
      {activeIndex === 2 && (
        <Order isActive={activeIndex === 2} onShow={() => setActiveIndex(0)} />
      )}
    </div>
  );
};

export default App;
