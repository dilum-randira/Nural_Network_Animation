"use client";

import { useState } from "react";
import { Calculator } from "@/components/calculator/Calculator";
import { EdgeAnimations } from "@/components/animations/EdgeAnimations";
import { NeuralNetwork } from "@/components/animations/NeuralNetwork";
import { ShootingGame } from "@/components/games/ShootingGame";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'neural' | 'calculator' | 'game'>('neural');
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      {/* Edge Animations - Technology Stack */}
      <EdgeAnimations />
      
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8 bg-background/80 backdrop-blur-md border-b z-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Neural Network Explorer
          </h1>
          
          {/* Navigation Tabs */}
          <nav className="flex gap-1 p-1 rounded-lg bg-muted">
            <button 
              onClick={() => setActiveTab('neural')} 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'neural' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Neural Network
            </button>
            <button 
              onClick={() => setActiveTab('calculator')} 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'calculator' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Calculator
            </button>
            <button 
              onClick={() => setActiveTab('game')} 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'game' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Shooting Game
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content - with higher z-index to appear above the edge animations */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 z-20 relative">
        {activeTab === 'neural' && (
          <div className="space-y-8 animate-fadeIn">
            <Card className="overflow-hidden shadow-lg border-primary/10 bg-background/70 backdrop-blur-md">
              <div className="aspect-video">
                <NeuralNetwork 
                  neuronCount={100}
                  connectionCount={220}
                  neuronColor="rgba(66, 153, 225, 0.8)"
                  lineColor="rgba(66, 153, 225, 0.4)"
                  cursorInfluenceRadius={500}
                  cursorInfluenceStrength={10}
                />
              </div>
            </Card>
            
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-2xl font-bold">Interactive Neural Network Animation</h2>
              <p className="text-muted-foreground">
                Move your cursor across the animation to observe how the neural network responds 
                to your movements. The network visualizes the basic concept of interconnected 
                neurons and dynamic information flow.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'calculator' && (
          <div className="flex flex-col items-center justify-center animate-fadeIn">
            <div className="max-w-md w-full">
              <h2 className="text-2xl font-bold text-center mb-6">Advanced Calculator</h2>
              <Card className="shadow-lg border-primary/10 overflow-hidden bg-background/70 backdrop-blur-md">
                <Calculator />
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'game' && (
          <div className="flex flex-col items-center justify-center animate-fadeIn">
            <h2 className="text-2xl font-bold text-center mb-6">Shooting Ball Game</h2>
            <Card className="shadow-lg border-primary/10 overflow-hidden bg-background/70 backdrop-blur-md">
              <ShootingGame />
            </Card>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t mt-auto bg-background/80 backdrop-blur-md z-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Built with Next.js and Shadcn UI
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Neural Network Explorer
          </p>
        </div>
      </footer>
    </div>
  );
}
