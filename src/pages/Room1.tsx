import React, { useState, useEffect, useRef } from "react";

interface Room1Props {
  isActive: boolean;
  onShow: () => void;
}

interface Point {
  x: number;
  y: number;
  color: string;
}

const Room1: React.FC<Room1Props> = (props: Room1Props) => {
  const { isActive, onShow } = props;
  const [points, setPoints] = useState<Point[]>([]);
  const growthIntervals = useRef<{ [key: number]: NodeJS.Timeout }>({});

  useEffect(() => {
    if (isActive) {
      setPoints(generateRandomPointsWithinViewport());
    }
  }, [isActive]);

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomColor(): string {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  function generateRandomPointsWithinViewport(): Point[] {
    const generatedPoints: Point[] = [];
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    for (let i = 0; i < 100; i++) {
      const randomX = getRandomInt(0, viewportWidth);
      const randomY = getRandomInt(0, viewportHeight);
      const color = getRandomColor();
      generatedPoints.push({ x: randomX, y: randomY, color: color });
    }

    return generatedPoints;
  }

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    const div = e.target as HTMLDivElement;
    div.style.opacity = "1";
    if (!growthIntervals.current[index]) {
      let scale = 1;
      growthIntervals.current[index] = setInterval(() => {
        scale += 0.05; // Reduced growth rate
        div.style.transform = `scale(${scale})`;
      }, 50); // Increased frequency to every 50 milliseconds
    }
  };

  const handleMouseLeave = (index: number) => {
    if (growthIntervals.current[index]) {
      clearInterval(growthIntervals.current[index]);
      delete growthIntervals.current[index];
    }
  };

  return (
    <>
      {isActive ? (
        <div className="bg-black h-screen cursor-none">
          Room1
          {points.map((point, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: point.y + "px",
                left: point.x + "px",
                width: "100px",
                height: "100px",
                backgroundColor: point.color,
                borderRadius: "50%",
                opacity: 0,
                transition: "opacity 0.05s, transform 0.005s", // Added transition for transform
                filter: "blur(2px)",
              }}
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            ></div>
          ))}
          <button
            className="absolute top-2 left-2 hover:animate-pulse bg-white text-black rounded px-2 cursor-none"
            onClick={onShow}
          >
            Go Home
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Room1;
