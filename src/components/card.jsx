import { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web'; // For smooth physics

const Card = ({ children }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // Spring physics for smooth movement
  const { transform } = useSpring({
    transform: isHovered 
      ? `perspective(1000px)
         rotateX(${rotate.x}deg)
         rotateY(${rotate.y}deg)
         scale(1.05)`
      : `perspective(1000px)
         rotateX(0deg)
         rotateY(0deg)
         scale(1)`,
    config: { mass: 1, tension: 200, friction: 20 }
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = (rect.left + rect.right) / 2;
    const centerY = (rect.top + rect.bottom) / 2;
    
    // Calculate rotation angles based on mouse position
    const rotateX = -(e.clientY - centerY) * 0.02;
    const rotateY = (e.clientX - centerX) * 0.02;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <animated.div
      ref={cardRef}
      style={{ transform }}
      className="relative bg-white rounded-lg shadow-xl cursor-pointer transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Card content */}
      <div className="p-6">
        {children}
      </div>

      {/* Fake 3D depth effect layers */}
      <div className="absolute inset-0 rounded-lg border-2 border-white/20 pointer-events-none" />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    </animated.div>
  );
};

export default Card;