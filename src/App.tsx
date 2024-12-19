import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import './App.css';
import ClosureVisualizer from './components/ClosureVisualizer';


const App: React.FC = () => {
  const [code, setCode] = useState('');

  return (
    <div className='App p-4'>
      <h1 className='text-2xl font-bold mb-4'>Интерактивная практика замыканий</h1>
      <CodeEditor code={code} onChange={setCode} />
      <ClosureVisualizer code={code}/>
    </div>
  );
    
};
export default App;