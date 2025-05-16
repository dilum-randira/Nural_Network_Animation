'use client';

import { useEffect, useRef, useState } from 'react';

type Ball = {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityY: number;
};

type Bullet = {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityY: number;
};

export function ShootingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Game state using refs to avoid unnecessary re-renders
  const gameStateRef = useRef({
    balls: [] as Ball[],
    bullets: [] as Bullet[],
    cannonPosition: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    animationId: 0,
    ballId: 0,
    bulletId: 0,
    lastBallSpawn: 0,
    spawnRate: 1200, // ms between ball spawns (slower than before)
    isResizing: false,
    lastShootTime: 0, // To prevent too many bullets fired at once
  });
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (gameStateRef.current.isResizing) return;
      gameStateRef.current.isResizing = true;
      
      setTimeout(() => {
        resizeCanvas();
        gameStateRef.current.isResizing = false;
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Resize canvas to match container
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Get the container size
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Update game state
    gameStateRef.current.canvasWidth = canvas.width;
    gameStateRef.current.canvasHeight = canvas.height;
    gameStateRef.current.cannonPosition = canvas.width / 2;
    
    // Redraw the current screen
    if (!gameStarted || gameOver) {
      if (gameOver) {
        drawGameOverScreen();
      } else {
        drawStartScreen();
      }
    }
  };
  
  // Handle mouse/touch movement
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameStarted || gameOver) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    gameStateRef.current.cannonPosition = clientX - rect.left;
  };
  
  // Handle click/tap events
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    
    if (!gameStarted) {
      setGameStarted(true);
      startGameLoop();
      return;
    }
    
    if (gameOver) {
      resetGame();
      return;
    }
    
    // Rate limit shooting
    const now = Date.now();
    if (now - gameStateRef.current.lastShootTime > 200) { // Ensure minimum 200ms between shots
      shootBullet();
      gameStateRef.current.lastShootTime = now;
    }
  };
  
  // Initialize game
  useEffect(() => {
    // Initial resize
    setTimeout(resizeCanvas, 100);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Draw the initial screen
    drawStartScreen();
    
    return () => {
      cancelAnimationFrame(gameStateRef.current.animationId);
    };
  }, []);
  
  // Reset game after game over
  const resetGame = () => {
    gameStateRef.current.balls = [];
    gameStateRef.current.bullets = [];
    gameStateRef.current.ballId = 0;
    gameStateRef.current.bulletId = 0;
    gameStateRef.current.lastBallSpawn = 0;
    gameStateRef.current.cannonPosition = gameStateRef.current.canvasWidth / 2;
    gameStateRef.current.spawnRate = 1200;
    setScore(0);
    setGameOver(false);
    startGameLoop();
  };
  
  // Start the game animation loop
  const startGameLoop = () => {
    const gameLoop = (timestamp: number) => {
      if (gameOver) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Spawn new balls periodically
      if (timestamp - gameStateRef.current.lastBallSpawn > gameStateRef.current.spawnRate) {
        gameStateRef.current.lastBallSpawn = timestamp;
        spawnBall();
        
        // Gradually increase difficulty by decreasing spawn time
        gameStateRef.current.spawnRate = Math.max(500, gameStateRef.current.spawnRate - 10);
      }
      
      // Update and draw balls
      updateBalls();
      
      // Update and draw bullets
      updateBullets();
      
      // Draw cannon
      drawCannon(ctx);
      
      // Check collisions
      checkCollisions();
      
      // Check game over condition
      if (checkGameOver()) {
        drawGameOverScreen();
        setGameOver(true);
        return;
      }
      
      // Draw score
      drawScore(ctx);
      
      // Continue animation loop
      gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
    };
    
    gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
  };
  
  // Draw start screen
  const drawStartScreen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Title
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#e94560';
    ctx.textAlign = 'center';
    ctx.fillText('Shooting Ball Game', canvas.width / 2, canvas.height / 2 - 60);
    
    // Instructions
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Click or tap to start', canvas.width / 2, canvas.height / 2);
    ctx.font = '16px Arial';
    ctx.fillText('Move mouse/finger to aim', canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillText('Click/tap to shoot', canvas.width / 2, canvas.height / 2 + 70);
    
    // Draw sample cannon
    const cannonY = canvas.height / 2 + 120;
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, cannonY + 10, 15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(canvas.width / 2 - 5, cannonY - 20, 10, 30);
  };
  
  // Draw game over screen
  const drawGameOverScreen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#e94560';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 50);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
    
    ctx.font = '18px Arial';
    ctx.fillText('Click or tap to restart', canvas.width / 2, canvas.height / 2 + 50);
  };
  
  // Draw the score
  const drawScore = (ctx: CanvasRenderingContext2D) => {
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 15, 30);
  };
  
  // Draw the cannon
  const drawCannon = (ctx: CanvasRenderingContext2D) => {
    const { cannonPosition, canvasHeight } = gameStateRef.current;
    
    // Base of cannon
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc(cannonPosition, canvasHeight - 20, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Barrel of cannon
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(cannonPosition - 5, canvasHeight - 50, 10, 30);
  };
  
  // Spawn a new ball
  const spawnBall = () => {
    const { canvasWidth } = gameStateRef.current;
    
    // Size based on progress (smaller balls as score increases)
    const minSize = Math.max(10, 15 - Math.floor(score / 100));
    const maxSize = Math.max(15, 30 - Math.floor(score / 50));
    const radius = Math.random() * (maxSize - minSize) + minSize;
    
    const x = Math.random() * (canvasWidth - radius * 2) + radius;
    
    const newBall: Ball = {
      id: gameStateRef.current.ballId++,
      x,
      y: -radius,
      radius,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      velocityY: Math.random() * 2 + 1 + Math.min(2, Math.floor(score / 200)), // Speed increases with score
    };
    
    gameStateRef.current.balls.push(newBall);
  };
  
  // Shoot a bullet from the cannon
  const shootBullet = () => {
    const { cannonPosition, canvasHeight } = gameStateRef.current;
    
    const newBullet: Bullet = {
      id: gameStateRef.current.bulletId++,
      x: cannonPosition,
      y: canvasHeight - 50,
      radius: 6,
      color: '#e74c3c',
      velocityY: -8, // Faster bullets
    };
    
    gameStateRef.current.bullets.push(newBullet);
  };
  
  // Update and draw all balls
  const updateBalls = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { balls, canvasHeight } = gameStateRef.current;
    
    // Filter out balls that have gone off-screen
    gameStateRef.current.balls = balls.filter(ball => ball.y - ball.radius < canvasHeight);
    
    // Update and draw remaining balls
    balls.forEach(ball => {
      ball.y += ball.velocityY;
      
      // Ball with gradient
      const gradient = ctx.createRadialGradient(
        ball.x, ball.y, 0,
        ball.x, ball.y, ball.radius
      );
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, ball.color);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  // Update and draw all bullets
  const updateBullets = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { bullets } = gameStateRef.current;
    
    // Filter out bullets that have gone off-screen
    gameStateRef.current.bullets = bullets.filter(bullet => bullet.y + bullet.radius > 0);
    
    // Update and draw remaining bullets
    bullets.forEach(bullet => {
      bullet.y += bullet.velocityY;
      
      // Bullet with glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#e74c3c';
      
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset shadow for other elements
      ctx.shadowBlur = 0;
    });
  };
  
  // Check for collisions between bullets and balls
  const checkCollisions = () => {
    const { balls, bullets } = gameStateRef.current;
    let scoreIncrease = 0;
    
    // Track which balls and bullets have collided
    const collidedBalls = new Set<number>();
    const collidedBullets = new Set<number>();
    
    // Check each bullet against each ball
    bullets.forEach(bullet => {
      if (collidedBullets.has(bullet.id)) return;
      
      balls.forEach(ball => {
        if (collidedBalls.has(ball.id)) return;
        
        // Calculate distance between bullet and ball centers
        const dx = bullet.x - ball.x;
        const dy = bullet.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If distance is less than sum of radii, collision occurred
        if (distance < bullet.radius + ball.radius) {
          collidedBalls.add(ball.id);
          collidedBullets.add(bullet.id);
          scoreIncrease += Math.floor(ball.radius); // Score based on ball size
        }
      });
    });
    
    // Filter out collided balls and bullets
    gameStateRef.current.balls = balls.filter(ball => !collidedBalls.has(ball.id));
    gameStateRef.current.bullets = bullets.filter(bullet => !collidedBullets.has(bullet.id));
    
    // Update score
    if (scoreIncrease > 0) {
      setScore(prevScore => prevScore + scoreIncrease);
    }
  };
  
  // Check if any ball has reached the bottom (game over condition)
  const checkGameOver = () => {
    const { balls, canvasHeight } = gameStateRef.current;
    
    return balls.some(ball => ball.y + ball.radius >= canvasHeight - 20);
  };
  
  return (
    <div ref={containerRef} className="flex flex-col items-center w-full">
      <div className="w-full max-w-4xl relative">
        <canvas 
          ref={canvasRef} 
          className="w-full rounded-lg overflow-hidden shadow-xl border border-gray-200 aspect-video cursor-pointer"
          style={{ touchAction: 'none' }} // Prevent touch scrolling behaviors
          onClick={handlePointerDown}
          onMouseMove={handlePointerMove}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
        />
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        {!gameStarted ? 'Click to start' : gameOver ? 'Game Over! Click to restart' : 'Shoot the falling balls before they reach the bottom'}
      </div>
    </div>
  );
}