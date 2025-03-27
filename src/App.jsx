import React, { useState, useEffect, useRef, useMemo } from "react";
import "./styles.css";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const lastSpawnTimeRef = useRef(0); // Added missing ref
  
  const colors = useMemo(() => ['#ff66ab', '#66ccff', '#ff6666', '#88b300'], []);
  const spawnInterval = 2000;
  const maxCircles = 3;

  const createCircle = useMemo(() => () => {
    if (!canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const size = Math.random() * 20 + 40;
    
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (canvas.width - size) + size/2,
      y: Math.random() * (canvas.height - size) + size/2,
      size: size,
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: Date.now(),
      lifespan: 3000,
      clicked: false,
      clickedAt: null
    };
  }, [colors]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    setTimeout(() => {
      if (nameRef.current && titleRef.current) {
        nameRef.current.classList.add('revealed');
        setTimeout(() => {
          titleRef.current.classList.add('revealed');
          
          const startGame = () => {
            const now = Date.now();
            if (circles.length < maxCircles && now - lastSpawnTimeRef.current > spawnInterval) {
              lastSpawnTimeRef.current = now;
              setCircles(prev => [...prev, createCircle()]);
            }
          };
          
          gameIntervalRef.current = setInterval(startGame, 1000);
        }, 600);
      }
    }, 300);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(gameIntervalRef.current);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [colors, circles.length, createCircle]);

  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = Date.now();
    
    setCircles(prev => {
      let hitCircle = false;
      const newCircles = prev.map(circle => {
        if (circle.clicked || (now - circle.createdAt) > circle.lifespan) {
          return circle;
        }
        
        const distance = Math.sqrt(
          Math.pow(x - circle.x, 2) + 
          Math.pow(y - circle.y, 2)
        );
        
        if (distance <= circle.size / 2) {
          hitCircle = true;
          setScore(prevScore => prevScore + 10);
          return { 
            ...circle, 
            clicked: true,
            clickedAt: now
          };
        }
        
        return circle;
      });
      
      return hitCircle ? newCircles : prev;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      
      circles.forEach(circle => {
        const elapsed = now - circle.createdAt;
        const progress = Math.min(1, elapsed / circle.lifespan);
        
        if (!circle.clicked) {
          const approachSize = circle.size * (2.5 - progress * 1.5);
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, approachSize / 2, 0, Math.PI * 2);
          ctx.strokeStyle = `${circle.color}80`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        ctx.save();
        if (circle.clicked) {
          const clickProgress = Math.min(1, (now - circle.clickedAt) / 500);
          ctx.globalAlpha = 1 - clickProgress;
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.size * (1 + clickProgress) / 2, 0, Math.PI * 2);
          ctx.fillStyle = circle.color;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(20, 20, 20, 0.7)';
          ctx.fill();
          ctx.strokeStyle = circle.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.restore();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [circles]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setCircles(prev => 
        prev.filter(circle => {
          if (circle.clicked) {
            return now - circle.clickedAt < 500;
          }
          return now - circle.createdAt < circle.lifespan;
        })
      );
    }, 500);
    
    return () => clearInterval(cleanupInterval);
  }, []);

  const backgroundStyle = useMemo(() => ({
    background: `radial-gradient(
      circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
      #1a1f2c,
      #121620 70%
    )`
  }), [mousePosition]);

  return (
    <div className="app" ref={containerRef} style={backgroundStyle}>
      <div className="score-display">{score}</div>
      <div className="background-dots" />
      <canvas
        ref={canvasRef}
        className="game-canvas"
        onClick={handleCanvasClick}
      />
      <div className="center-content">
        <h1 className="name" ref={nameRef}>
          <span className="first-name">Ville</span> <span className="last-name">Pitkänen</span>
        </h1>
        <p className="title" ref={titleRef}>Information Technology Student & Developer</p>
      </div>
      <div className="contact-links">
        <a href="mailto:pitkanenville@proton.me" className="contact-link">
          <span className="link-icon">✉</span>
          <span className="link-text">Email</span>
        </a>
        <a href="https://www.linkedin.com/in/ville-pitk%C3%A4nen-10456719b/" className="contact-link" target="_blank" rel="noopener noreferrer">
          <span className="link-icon">in</span>
          <span className="link-text">LinkedIn</span>
        </a>
        <a href="https://github.com/villepp" className="contact-link" target="_blank" rel="noopener noreferrer">
          <span className="link-icon">⌨</span>
          <span className="link-text">GitHub</span>
        </a>
      </div>
      <div className="cursor" ref={cursorRef}></div>
    </div>
  );
}

export default App;