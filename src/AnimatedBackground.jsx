import React, { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="animated-background"
      style={{
        background: `
          linear-gradient(135deg, rgba(75, 138, 220, 0.05) 0%, rgba(240, 240, 245, 0.05) 100%),
          radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(75, 138, 220, 0.15) 0%,
            rgba(75, 138, 220, 0.05) 25%,
            rgba(240, 240, 245, 0.05) 50%
          )`
      }}
    />
  );
};

export default AnimatedBackground;