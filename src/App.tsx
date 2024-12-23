import React, { useEffect, useState } from 'react';
import CodeEditor from './components/CodeEditor';
import './App.css';
import ClosureVisualizer from './components/ClosureVisualizer';


const App: React.FC = () => {
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');

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
        <ClosureVisualizer code={code} />
      </div>
    </div>
  );
    
};
export default App;