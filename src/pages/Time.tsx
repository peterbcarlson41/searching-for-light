import { useRef, useEffect, useState } from "react";

interface TimeProps {
  isActive: boolean;
  onShow: () => void;
  onHome: () => void;
}

const Time: React.FC<TimeProps> = (props: TimeProps) => {
  const { isActive, onShow, onHome } = props;
  const ballRef = useRef<HTMLDivElement | null>(null);

  // State for input value and current time
  const [inputValue, setInputValue] = useState("TIME");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  // Function to get the current time in HH:MM format
  const fetchCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent the default form submit behavior
    setCurrentTime(fetchCurrentTime());
    setIsSubmitted(true);

    if (inputValue !== currentTime) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
      setIsSubmitted(false);
      setInputValue("TIME");
    }
  };

  useEffect(() => {
    setCurrentTime(fetchCurrentTime());
    const interval = setInterval(() => {
      setCurrentTime(fetchCurrentTime());
    }, 60000); // Update every minute

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

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
  }, [isActive]);

  const isTimeCorrect = inputValue === currentTime;

  return (
    <>
      {isActive ? (
        <section className="bg-black text-white h-screen flex flex-col justify-center items-center relative cursor-none">
          <form onSubmit={handleSubmit} className="absolute">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-5xl font-bold bg-transparent border-none outline-none text-center cursor-none active:animate-none hover:animate-pulse"
              maxLength={5}
            />
            {/* Hidden submit button to trigger form submission when Enter key is pressed */}
            <input type="submit" style={{ display: "none" }} />
          </form>

          {/* Conditionally render button based on correct time and if form was submitted */}
          {isTimeCorrect && isSubmitted && (
            <button
              onClick={onShow}
              className="absolute top-10 mt-4 p-2 text-black bg-white rounded cursor-none bg-transparent hover:text-black hover:bg-yellow-600"
            >
              Proceed
            </button>
          )}
          {showError && (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center">
              <h1 className="text-black text-5xl font-bold">TIME</h1>
            </div>
          )}
          <div
            className="bg-white w-96 h-96 rounded-full pointer-events-none absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            ref={ballRef}
          ></div>
          <button
            onClick={onHome}
            className="bg-transparent hover:bg-blue-600 border-none px-4 py-2 rounded-md text-black hover:text-white hover:animate-pulse text-lg duration-300 absolute top-5 left-5 cursor-none"
          >
            Return Home
          </button>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Time;
