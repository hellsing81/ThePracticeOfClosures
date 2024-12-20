import React, { useState } from 'react';
import CallStackVisualizer from './CallStackVisualizer';

interface ClosureVisualizerProps {
  code: string;
}

const ClosureVisualizer: React.FC<ClosureVisualizerProps> = ({ code }) => {
  const [output, setOutput] = useState<string>('');
  const [callStack, setCallStack] = useState<string[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  const executeCode = () => {
    try {
        const originalConsoleLog = console.log;
        const logs: string[] = [];
        console.log = (message: string) => logs.push(message);


      const result = eval(code);
      setOutput(JSON.stringify(result, null, 2));
        setConsoleOutput(logs);
        console.log = originalConsoleLog;

      // Пример стека вызовов
      setCallStack(['global', 'outerFunction', 'innerFunction']);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput(`Error: ${String(error)}`);
      }
    }
  };

  return (
    <div className="p-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded content-center" onClick={executeCode}>
        Execute Code
      </button>
      <pre className="mt-4 bg-gray-800 text-white p-4 rounded">{output}</pre>
        <div className='mt-4 bg-gray-800 text-white p-4 rounded mb-4'>
            <h2 className='text-lg font-bold mb-2'>Консоль:</h2> 
            {consoleOutput.map((log,index) => (
                <p className='mb-4' key={index}>{log}</p>
            ))}
        </div>
      <CallStackVisualizer callStack={callStack} />
    </div>
  );
};

export default ClosureVisualizer;
