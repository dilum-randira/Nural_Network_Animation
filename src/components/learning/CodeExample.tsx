"use client";

import React, { useState } from 'react';

interface CodeExampleProps {
  code: string;
  language: string;
  title?: string;
  runnable?: boolean;
  explanation?: string;
}

export function CodeExample({ code, language, title, runnable = false, explanation }: CodeExampleProps) {
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput("Running...");

    setTimeout(() => {
      // This is a simplified mock implementation
      // In a real app, you would use a sandbox or Web Workers to execute code safely
      try {
        if (language === 'javascript') {
          // Very simplified mock execution for demo purposes
          // DO NOT use eval in production - this is just for demo
          const mockOutput = "Output: Example neural network trained with accuracy: 87.5%";
          setOutput(mockOutput);
        } else {
          setOutput(`Running ${language} code is supported in the full version.`);
        }
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
      {title && (
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
          <div className="font-medium text-gray-700 dark:text-gray-200">{title}</div>
          <div className="flex space-x-2">
            {explanation && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700"
              >
                {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
              </button>
            )}
            {runnable && (
              <button
                onClick={runCode}
                disabled={isRunning}
                className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700 disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900">
          <code>{code}</code>
        </pre>
      </div>
      
      {explanation && showExplanation && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Explanation:</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">{explanation}</p>
        </div>
      )}
      
      {output && (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output:</h4>
          <pre className="text-sm font-mono bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}