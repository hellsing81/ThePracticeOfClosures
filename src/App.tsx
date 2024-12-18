import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import './App.css';


const App: React.FC = () => {
  const [code, setCode] = useState('');

  const handleExecuteCode = () => {
    try {
        eval(code);
    } catch (error) {
      console.log('Error executing code:', error);
    }
  };

  return (
    <div className='App p-4'>
      <h1 className='text-2xl font-bold mb-4'>Интерактивная практика замыканий</h1>
      <CodeEditor code={code} onChange={setCode} />
      <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded' onClick={handleExecuteCode}>
        Выполнение кода
      </button>
    </div>
  );

};
export default App;