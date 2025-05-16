import { Calculator } from "@/components/calculator/Calculator";
import { NeuralNetwork } from "@/components/animations/NeuralNetwork";
import { ShootingGame } from "@/components/games/ShootingGame";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background relative">
      {/* Neural Network as main showcase */}
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-xl bg-black/5 backdrop-blur-sm border border-gray-200 mb-8 aspect-video">
        <NeuralNetwork 
          neuronCount={80}
          connectionCount={200}
          neuronColor="rgba(66, 153, 225)"
          lineColor="rgba(66, 153, 225, 0.6)"
          cursorInfluenceRadius={500}
          cursorInfluenceStrength={8}
        />
      </div>
      
      <h2 className="text-xl font-semibold mb-2">Interactive Neural Network Animation</h2>
      <p className="text-center text-muted-foreground mb-8 max-w-md">
        Move your cursor across the animation to see the neural network react to your movements.
      </p>
      
      <h1 className="mb-8 text-3xl font-bold text-center">Next.js Calculator</h1>
      <Calculator />
      
      <div className="w-full my-16 border-t border-gray-200"></div>
      
      <h1 className="mb-8 text-3xl font-bold text-center">Shooting Ball Game</h1>
      <ShootingGame />
      
      <footer className="mt-10 text-center text-sm text-muted-foreground">
        <p>Built with Next.js and Shadcn UI</p>
      </footer>
    </div>
  );
}
