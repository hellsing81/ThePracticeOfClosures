import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import './App.css';
import ClosureVisualizer from './components/ClosureVisualizer';


const App: React.FC = () => {
  const [code, setCode] = useState('');

  return (
    <div className='App p-4 flex'>
      <div className='editor-container'>
      <CodeEditor code={code} onChange={setCode} />
      </div>
      <div className='visualizer-container'>
      <ClosureVisualizer code={code}/>

      </div>
    </div>
  );
    
};
export default App;