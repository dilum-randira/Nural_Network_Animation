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

  // Backend technologies for right edge
  const backendTech = [
    "Node.js", "Express", "Django", 
    "Spring Boot", "Flask", "Laravel", 
    "FastAPI", ".NET Core", "GraphQL"
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
    </>
  );
};