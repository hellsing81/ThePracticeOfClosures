import React, { useState } from "react";

const Tests: React.FC = () => {
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState<string | null>(null);

    const checkAnswer = () => {
        if (userAnswer.trim() === 'correct answer') {
            setResult('Верно!');
        }
        else {
            setResult('Неверно, попробуй ещё раз');
        }
    };

    return (
        <div className="p-4 bg-gray-700 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Тесты и задания</h2>
            <p className="mb-4">
                Ответ на вопрос для твоего понимания практики замыканий JS.
            </p>
            <p className="mb-4">
                Результат работы этого кода?
            </p>
            <pre className="bg-gray-700 p-4 rounded mb-4">
                {`
function createCounter() {
let count = 0;
return function(){
count++;
return count;
};
}
const counter = createCounter();
console.log(counter()); //?
console.log(counter()); //?
`}
            </pre>
            <input
            type = 'text'
            className="border p-2 mb-4 w-full"
            value={userAnswer}
            onChange={(e)=> setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            />
            <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full transition-transform transform hover:scale-110"
            onClick={checkAnswer}
            >
                Проверить ответ
            </button>
            {result && <p className="mt-4 font-bold">{result}</p>}
        </div>
    );

};

export default Tests;


