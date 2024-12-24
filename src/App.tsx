import React, { useEffect, useState } from 'react';
import CodeEditor from './components/CodeEditor';
import './App.css';
import ClosureVisualizer from './components/ClosureVisualizer';


const App: React.FC = () => {
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');
  const [history, setHistory] = useState<{ code:string; output: string; }[]>([])
  const toggleTheme =  () => { 
      setTheme(theme === 'vs-dark' ? 'vs' : 'vs-dark')
  }

  const saveCode = () => {
    localStorage.setItem('savedCode', code)
  }

  const loadCode = () => {
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode) {
      setCode(savedCode);
    }
  };
  const executeCode = (code: string)=>{
    try {
      const result = eval(code);
      const output = JSON.stringify(result,null,2);
      setHistory([...history, {code, output}]);
      return output;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const output = `Error: ${error.message}`;
        setHistory([...history,{code, output}]);
        return output;
      } else {
        const output = `Error: ${String(error)}`;
        setHistory([...history, {code, output}]);
        return output;
      }
    }

  }

  useEffect(() => {
    loadCode();
  },[])

  return (
    <div className="App p-4 flex h-screen">
      <div className="editor-container flex-1 p-4 bg-neutral-800		 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <CodeEditor code={code} onChange={setCode} theme={theme} />
      </div>
      <div className="visualizer-container flex-1 p-4 bg-neutral-800		 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <div className="flex justify-between mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-110" onClick={toggleTheme}>
            Toggle Theme
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-110" onClick={saveCode}>
            Save Code
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-110" onClick={loadCode}>
            Load Code
          </button>
        </div>
        <ClosureVisualizer code={code} executeCode={executeCode} />
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">История выполнения:</h2>
          {history.map((entry, index) => (
            <div key={index} className="mb-2 p-2 bg-black-500 rounded">
              <pre className="text-sm">{entry.code}</pre>
              <pre className="text-sm font-bold">{entry.output}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
    
};
export default App;