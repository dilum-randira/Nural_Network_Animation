"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [resetOnNextInput, setResetOnNextInput] = useState(false);

  const handleNumberClick = (num: number) => {
    if (resetOnNextInput) {
      setDisplay(num.toString());
      setResetOnNextInput(false);
    } else {
      setDisplay(display === "0" ? num.toString() : display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    setOperation(op);
    setPrevValue(parseFloat(display));
    setResetOnNextInput(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setOperation(null);
    setPrevValue(null);
    setResetOnNextInput(false);
  };

  const handleCalculate = () => {
    if (operation === null || prevValue === null) return;
    
    const currentValue = parseFloat(display);
    let result: number;
    
    switch (operation) {
      case "+":
        result = prevValue + currentValue;
        break;
      case "-":
        result = prevValue - currentValue;
        break;
      case "×":
        result = prevValue * currentValue;
        break;
      case "÷":
        result = prevValue / currentValue;
        break;
      default:
        return;
    }
    
    setDisplay(result.toString());
    setOperation(null);
    setPrevValue(null);
    setResetOnNextInput(true);
  };

  const handleDecimal = () => {
    if (resetOnNextInput) {
      setDisplay("0.");
      setResetOnNextInput(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 text-right bg-muted rounded-md text-3xl font-mono h-16 flex items-center justify-end overflow-hidden">
            {display}
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              onClick={handleClear}
              className="col-span-2"
            >
              Clear
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setDisplay(display.slice(0, -1) || "0")}
            >
              ←
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleOperationClick("÷")}
            >
              ÷
            </Button>
            
            {[7, 8, 9].map((num) => (
              <Button 
                key={num} 
                variant="outline" 
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </Button>
            ))}
            <Button 
              variant="secondary" 
              onClick={() => handleOperationClick("×")}
            >
              ×
            </Button>
            
            {[4, 5, 6].map((num) => (
              <Button 
                key={num} 
                variant="outline" 
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </Button>
            ))}
            <Button 
              variant="secondary" 
              onClick={() => handleOperationClick("-")}
            >
              -
            </Button>
            
            {[1, 2, 3].map((num) => (
              <Button 
                key={num} 
                variant="outline" 
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </Button>
            ))}
            <Button 
              variant="secondary" 
              onClick={() => handleOperationClick("+")}
            >
              +
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleNumberClick(0)}
              className="col-span-2"
            >
              0
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDecimal}
            >
              .
            </Button>
            <Button 
              onClick={handleCalculate}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              =
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}