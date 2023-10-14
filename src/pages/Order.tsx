import { useState, useEffect, useRef } from "react";

interface OrderProps {
  isActive: boolean;
  onShow: () => void;
  onHome: () => void;
}

const Order: React.FC<OrderProps> = (props: OrderProps) => {
  const { isActive, onShow, onHome } = props;
  const ballRef = useRef<HTMLDivElement | null>(null);

  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [clickedNumbers, setClickedNumbers] = useState<number[]>([]);
  const [buttonPositions, setButtonPositions] = useState<React.CSSProperties[]>(
    []
  );
  const [winner, setWinner] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);

  // Generate button positions
  const generateButtonPositions = (): React.CSSProperties[] => {
    return Array.from({ length: 10 }).map(() => {
      const top = Math.floor(Math.random() * 80) + 10;
      const left = Math.floor(Math.random() * 80) + 10;
      return {
        position: "absolute",
        top: `${top}vh`,
        left: `${left}vw`,
      };
    });
  };

  const handleButtonClick = (num: number) => {
    // This will give us the updated version of clickedNumbers array after the push
    const updatedClickedNumbers = [...clickedNumbers, num];

    setClickedNumbers(updatedClickedNumbers);

    console.log(updatedClickedNumbers);

    // Check if the clicked numbers are in the correct order
    if (updatedClickedNumbers.length === randomNumbers.length) {
      console.log("Length is correct");
      const isCorrectOrder = randomNumbers.every(
        (n, index) => updatedClickedNumbers[index] === n
      );

      if (isCorrectOrder) {
        console.log("Correct order");
        setWinner(true);
      } else {
        console.log("Incorrect order");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
        setClickedNumbers([]);
      }
    }
  };

  // Effect for generating random numbers and their positions
  useEffect(() => {
    const numbers: number[] = [];
    while (numbers.length < 10) {
      const random = Math.floor(Math.random() * 20) + 1;
      if (numbers.indexOf(random) === -1) numbers.push(random);
    }

    numbers.sort((a, b) => a - b); // Sorting the numbers array in ascending order

    setRandomNumbers(numbers);
    setButtonPositions(generateButtonPositions());
  }, []);

  // Your existing mouse movement effect
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

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isActive]);

  return (
    <>
      {isActive ? (
        <section
          className={`${showError ? "bg-white" : "bg-black"} ${
            showError ? "text-black" : "text-white"
          } h-screen flex flex-col justify-center items-center relative cursor-none`}
        >
          <div
            className={`absolute ${showError ? "opacity-0" : "opacity-100"}`}
          >
            <h1 className="text-5xl font-bold">ORDER</h1>
          </div>
          <div
            className="bg-white w-96 h-96 rounded-full pointer-events-none absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            ref={ballRef}
          ></div>
          <button
            onClick={onHome}
            className="bg-transparent hover:bg-blue-600 border-none px-4 py-2 rounded-md text-black hover:text-white hover:animate-pulse text-lg duration-300 absolute top-5 left-5 cursor-none"
          >
            Go Home
          </button>
          {randomNumbers.map((num, index) => (
            <button
              style={{
                ...buttonPositions[index],
                width: "80px",
                height: "80px",
              }}
              className={`bg-transparent active:bg-violet-700 border-none rounded-full text-black hover:text-white ${
                !clickedNumbers.includes(num)
                  ? "hover:animate-pulse hover:bg-blue-600"
                  : "hover:bg-violet-700"
              } text-lg duration-300 cursor-none`}
              key={num}
              onClick={() => handleButtonClick(num)}
            >
              {num}
            </button>
          ))}
          {winner && (
            <button
              onClick={onShow}
              className="bg-transparent hover:bg-blue-600 border-none px-4 py-2 rounded-md text-black hover:text-white hover:animate-pulse text-lg transition-background duration-300 absolute bottom-5 left-5 cursor-none"
            >
              Onto the next
            </button>
          )}
          {showError && (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center">
              <h1 className="text-black text-5xl font-bold">ORDER</h1>
            </div>
          )}
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Order;
