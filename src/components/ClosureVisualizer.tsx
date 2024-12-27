import React, { useState } from 'react';
import CallStackVisualizer from './CallStackVisualizer';

interface ClosureVisualizerProps {
  code: string;
  executeCode: (code: string) => string;
}

const ClosureVisualizer: React.FC<ClosureVisualizerProps> = ({ code, executeCode }) => {
  const [output, setOutput] = useState<string>('');
  const [callStack, setCallStack] = useState<string[]>([]);

  const handleExecuteCode = () => {
    const result = executeCode(code);
    setOutput(result);
    // Пример стека вызовов
    setCallStack(['global', 'outerFunction', 'innerFunction']);
  };

  return (
    <div className="p-4">
      <button className="bg-black-500 text-white px-4 py-2 rounded-full transition-transform transform hover:scale-110" onClick={handleExecuteCode}>
        Выполнить
      </button>
      <pre className="mt-4 bg-black-500 text-white p-4 rounded">{output}</pre>
      <CallStackVisualizer callStack={callStack} />
    </div>
  );
};

export default ClosureVisualizer;
