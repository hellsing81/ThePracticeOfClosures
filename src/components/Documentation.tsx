import React from 'react';

const Documentation: React.FC = () => {
    return (
        <div className="p-4 bg-gray-700 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Documentation</h2>
        <p className="mb-4">
          Замыкания (closures) — это функции, которые запоминают и имеют доступ к переменным из своей области видимости, даже если эти функции выполняются вне этой области видимости.
        </p>
        <h3 className="text-xl font-bold mb-2">Примеры:</h3>

        <pre className='bg-black-200 p-4 rounded'>
            {`
function outerFunction() {
let outerVariable = 'I am outside!';

function innerFunction() {
let innerVariable = 'I am inside!';
console.log(outerVariable);
console.log(innerVariable);
}

innerFunction();
}

outerFunction();
            `}
        </pre>
    </div>
    );
};
export default Documentation;
