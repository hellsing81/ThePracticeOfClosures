import React, { useState } from 'react';

interface ClosureVisualizerProps {
  code: string;
}

const ClosureVisualizer: React.FC<ClosureVisualizerProps> = ({ code }) => {
  const [output, setOutput] = useState<string>('');

  const executeCode = () => {
    try {
      const result = eval(code);
      setOutput(JSON.stringify(result, null, 2));
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
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={executeCode}>
        Execute Code
      </button>
      <pre className="mt-4 bg-gray-800 text-white p-4 rounded">{output}</pre>
    </div>
  );
};

export default ClosureVisualizer;
