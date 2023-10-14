import { useRef, useEffect } from "react";

interface HomeProps {
  isActive: boolean;
  onShow: () => void;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  const { isActive, onShow } = props;
  const ballRef = useRef<HTMLDivElement | null>(null);

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

    animate();

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    onShow();
  };

  return (
    <>
      {isActive ? (
        <section className="bg-black text-white h-screen flex flex-col justify-center items-center relative cursor-none">
          <div className="absolute">
            <h1 className="text-5xl font-bold">SEARCHING FOR LIGHT</h1>
          </div>
          <div
            className="bg-white w-96 h-96 rounded-full pointer-events-none absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            ref={ballRef}
          ></div>
          <button
            onClick={handleClick}
            className="bg-transparent border-none px-10 py-4 rounded-md text-black hover:text-blue-600 hover:animate-pulse text-lg transition-background duration-300 absolute bottom-0 left-0 cursor-none"
          >
            Enter Here
          </button>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
