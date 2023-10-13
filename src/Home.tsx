// Scene.tsx
import React, { useRef, useEffect } from "react";
import "./styles/Home.css"; // Assuming you save your styles in Scene.css

const Home: React.FC = () => {
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

  return (
    <section className="sceneSection">
      <div className="text-content">
        <h1>SEARCHING FOR LIGHT</h1>
      </div>
      <div className="ball" ref={ballRef}></div>
      <button className="button-container">
        <span className="button-text">Reveal Me</span>
      </button>
    </section>
  );
};

export default Home;
