import { useRef, useEffect } from "react";

interface OrderProps {
  isActive: boolean;
  onShow: () => void;
  onHome: () => void;
}

const Order: React.FC<OrderProps> = (props: OrderProps) => {
  const { isActive, onShow, onHome } = props;
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

    isActive && animate();

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {isActive ? (
        <section className="bg-black text-white h-screen flex flex-col justify-center items-center relative cursor-none">
          <div className="absolute">
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
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Order;
