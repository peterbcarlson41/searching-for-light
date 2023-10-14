import { useState } from "react";
import "./App.css";
import Home from "./pages/Home.js";
import Patience from "./pages/Patience.js";
import Order from "./pages/Order";

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  let CurrentPage;
  switch (activeIndex) {
    case 0:
      CurrentPage = <Home isActive onShow={() => setActiveIndex(1)} />;
      break;
    case 1:
      CurrentPage = (
        <Patience
          isActive
          onShow={() => setActiveIndex(2)}
          onHome={() => setActiveIndex(0)}
        />
      );
      break;
    case 2:
      CurrentPage = (
        <Order
          isActive
          onShow={() => setActiveIndex(0)}
          onHome={() => setActiveIndex(0)}
        />
      );
      break;
    default:
      CurrentPage = <Home isActive onShow={() => setActiveIndex(1)} />;
  }

  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      {CurrentPage}
    </div>
  );
};

export default App;
