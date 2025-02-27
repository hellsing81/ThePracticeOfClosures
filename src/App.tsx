import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CodeEditor from './components/CodeEditor';
import ClosureVisualizer from './components/ClosureVisualizer';
import Documentation from './components/Documentation';
import Tests from './components/Tests';
import './App.css';


const App: React.FC = () => {
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');
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
      let result;
      if(language === 'javascript') {
        result = eval(code);
      }
      else if (language === 'python') {
        result = 'Python code execution is not supported yet.';
      }
      else if (language === 'typescript') {
        result = 'TypeScript code execution is not supported yet.';
      }
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
    <div className="App p-4 flex flex-col h-screen bg-neutral">
      <Tabs>
        <TabList>
          <Tab>Редактор кода</Tab>
          <Tab>Документация и тесты</Tab>
        </TabList>

        <TabPanel>
          <div className="flex h-full">
            <div className="editor-container flex-1 p-4 bg-neutral-800 text-white rounded-lg shadow-lg transition-transform transform hover:scale-101">
              <CodeEditor code={code} onChange={setCode} theme={theme} language={language} />
            </div>
            <div className="visualizer-container flex-1 p-4 bg-neutral-800  text-white rounded-lg shadow-lg transition-transform transform hover:scale-101">
              <div className="flex justify-between mb-4 ">
                <button className="bg-black-500 text-white px-4 mx-1 py-2 rounded-full transition-transform transform hover:scale-101" onClick={toggleTheme}>
                  Сменить тему
                </button>
                <button className="bg-green-500 text-white px-4 mx-1 py-2 rounded-full transition-transform transform hover:scale-101" onClick={saveCode}>
                  Сохранить код
                </button>
                <button className="bg-black-100 text-white px-4 mx-1 py-2 rounded-full transition-transform transform hover:scale-101" onClick={loadCode}>
                  Загрузить код
                </button>
                <select className="bg-gray-500 text-white px-4 mx-1 py-2 rounded-full transition-transform transform hover:scale-101" onChange={(e) => setLanguage(e.target.value)} value={language}>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="typescript">TypeScript</option>
                </select>
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
        </TabPanel>

<TabPanel>
  <div className="flex h-full">
    <div className="documentation-container flex-1 p-4 bg-gray-700 text-black rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <Documentation />
    </div>
    <div className="tests-container flex-1 p-4 bg-gray-700 text-black rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <Tests />
    </div>
  </div>
</TabPanel>
</Tabs>
</div>
);
};

export default App;