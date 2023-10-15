import { useRef, useEffect } from "react";

// Import the logos from your assets folder
import githubLogo from "../assets/github.png";
import linkedinLogo from "../assets/linkedin.png";

interface ThankYouProps {
  isActive: boolean;
  onShow: () => void;
  onHome: () => void;
}

const Home: React.FC<ThankYouProps> = (props: ThankYouProps) => {
  const { isActive, onHome } = props;
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
            <h1 className="text-5xl font-bold text-center">THANK YOU</h1>
            <p className="overflow-wrap pt-10">
              Thank you for playing. Check out my LinkedIn to learn more about
              me, and my GitHub to see more projects.
            </p>
          </div>
          <div
            className="bg-white w-96 h-96 rounded-full pointer-events-none absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            ref={ballRef}
          ></div>
          <a
            href="https://github.com/peterbcarlson41/"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-10 left-10 mt-4 p-2 text-black bg-white rounded cursor-none bg-transparent hover:text-black hover:bg-neutral-200"
          >
            <img src={githubLogo} alt="GitHub Logo" width="32" height="32" />
          </a>

          <a
            href="https://www.linkedin.com/in/peterbcarlson41/"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-10 left-40 mt-4 p-2 text-black bg-white rounded cursor-none bg-transparent hover:text-black hover:bg-neutral-200"
          >
            <img
              src={linkedinLogo}
              alt="LinkedIn Logo"
              width="37"
              height="32"
            />
          </a>
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

export default Home;
