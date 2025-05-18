"use client";

import React from "react";
import { NeuralText } from "./NeuralText";

export const EdgeAnimations: React.FC = () => {
  // Programming languages for left edge
  const languages = [
    "JavaScript", "TypeScript", "Python", 
    "Java", "C#", "Go", "Rust", 
    "PHP", "Ruby", "Kotlin"
  ];

  // Frontend technologies for top edge
  const frontendTech = [
    "React", "Next.js", "Vue", 
    "Angular", "Svelte", "TailwindCSS", 
    "CSS", "HTML5", "Framer Motion"
  ];

  // Backend technologies for right edge
  const backendTech = [
    "Node.js", "Express", "Django", 
    "Spring Boot", "Flask", "Laravel", 
    "FastAPI", ".NET Core", "GraphQL"
  ];

  // Data and tools for bottom edge
  const dataAndTools = [
    "MongoDB", "PostgreSQL", "Redis", 
    "Docker", "Kubernetes", "AWS", 
    "Firebase", "Vercel", "Git"
  ];

  return (
    <>
      {/* Left edge - Programming Languages */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 transform z-10">
        <NeuralText 
          texts={languages}
          className="flex flex-col gap-6"
          particleCount={40}
          particleColor="rgba(74, 222, 128, 0.8)" 
          lineColor="rgba(74, 222, 128, 0.4)"
        />
      </div>

      {/* Top edge - Frontend Technologies */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 transform z-10">
        <NeuralText 
          texts={frontendTech}
          className="flex flex-wrap justify-center gap-4 max-w-3xl"
          particleCount={40}
          particleColor="rgba(59, 130, 246, 0.8)"
          lineColor="rgba(59, 130, 246, 0.4)"
        />
      </div>

      {/* Right edge - Backend Technologies */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 translate-x-1/4 transform z-10">
        <NeuralText 
          texts={backendTech}
          className="flex flex-col gap-6 items-end"
          particleCount={40}
          particleColor="rgba(168, 85, 247, 0.8)"
          lineColor="rgba(168, 85, 247, 0.4)"
        />
      </div>

      {/* Bottom edge - Data and Tools */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 transform z-10">
        <NeuralText 
          texts={dataAndTools}
          className="flex flex-wrap justify-center gap-4 max-w-3xl"
          particleCount={40}
          particleColor="rgba(251, 113, 133, 0.8)"
          lineColor="rgba(251, 113, 133, 0.4)"
        />
      </div>
    </>
  );
};