import React, { useState } from 'react'

const quiz = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Paris", "Madrid", "Berlin", "Rome"],
        answer: "Paris",
    },
    {
        id: 2,
        question: "Which language runs in a web browser?",
        options: ["Python", "Java", "C", "JavaScript"],
        answer: "JavaScript",
    },
    {
        id: 3,
        question: "What is the square root of 64?",
        options: ["6", "8", "10", "7"],
        answer: "8",
    },
];

const QuizApp = () => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState({});
    const [showScore, setShowScore] = useState(false);

    const handleOptionClick = (option) => {
        setSelected({ ...selected, [quiz[current].id]: option });
    };

    const handleNext = () => {
        if (current === quiz.length - 1) {
            setShowScore(true);
        } else {
            setCurrent(current + 1);
        }
    };

    const score = quiz.reduce((acc, q) => {
        return selected[q.id] === q.answer ? acc + 1 : acc;
    }, 0);

    if (showScore) {
        return (
            <div>
                <h2>Your Score</h2>
                <p>{score} / {quiz.length}</p>
            </div>
        );
    }

    const currentQ = quiz[current];
    //const currentAnswer = selected[currentQ.id];  // accessibility purpose

    return (
        <>
            <div>
                <h2>
                    Question {current + 1} of {quiz.length}
                </h2>
                <p>{currentQ.question}</p>
                <div>
                    {currentQ.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleNext}
                >
                    {current === quiz.length - 1 ? "Finish Quiz" : "Next"}
                </button>
            </div>
        </>
    )
}

export default QuizApp