/* eslint-disable no-inner-declarations */
import { useState, useEffect, useRef } from "react";

interface PatienceProps {
  isActive: boolean;
  onShow: () => void;
  onHome: () => void;
}

const Patience: React.FC<PatienceProps> = (props: PatienceProps) => {
  const { isActive, onShow, onHome } = props;
  const ballRef = useRef<HTMLDivElement | null>(null);
  const [showPatienceMsg, setShowPatienceMsg] = useState(false);

  const handleButtonClick = () => {
    if (!isClickable) {
      setShowPatienceMsg(true);
      setTimeout(() => setShowPatienceMsg(false), 2000); // hide message after 2 seconds
    } else {
      onShow();
    }
  };

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ballX = 0;
    let ballY = 0;
    const speed = 0.02;

    function animate() {
      if (ballRef.current) {
        const distX = mouseX - ballX;
        const distY = mouseY - ballY;

        ballX = ballX + distX * speed;
        ballY = ballY + distY * speed;

        ballRef.current.style.left = ballX + "px";
        ballRef.current.style.top = ballY + "px";
      }

      requestAnimationFrame(animate);
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    isActive && animate();

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [isClickable, setIsClickable] = useState(false); // to manage "Click Me" button clickability
  const hoverTimer = useRef<number | null>(null); // to manage hover timer for "Click Me" button

  const handleMouseEnter = () => {
    console.log("hover timer started");
    hoverTimer.current = setTimeout(() => {
      console.log("hover timer finished");
      setIsClickable(true);
    }, 5000); // 5 seconds
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current as number);
      setIsClickable(false); // reset the button to non-clickable
    }
  };

  return (
    <>
      {isActive ? (
        <section className="bg-black text-white h-screen flex flex-col justify-center items-center relative cursor-none">
          {showPatienceMsg && (
            <div className="absolute w-full h-screen bg-white flex items-center justify-center z-50">
              <h2 className="text-black text-5xl font-bold">PATIENCE</h2>
            </div>
          )}
          <div className="absolute">
            <h1 className="text-5xl font-bold">PATIENCE</h1>
          </div>
          <div
            className="bg-white w-96 h-96 rounded-full pointer-events-none absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            ref={ballRef}
          ></div>
          <button
            onClick={onHome}
            className="bg-transparent hover:bg-blue-600 border-none px-4 py-2 rounded-md text-black hover:text-white hover:animate-pulse text-lg transition-background duration-300 absolute top-5 left-5 cursor-none"
          >
            Go Home
          </button>
          <button
            className={`absolute bg-transparent bottom-5 right-5 text-black cursor-none px-4 py-2 rounded hover:bg-blue-600 hover:text-white ${
              isClickable ? "animate-pulse" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleButtonClick}
          >
            <span>Click Me</span>
          </button>
        </section>
      ) : null}
    </>
  );
};

export default Patience;
