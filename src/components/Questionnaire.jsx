// src/pages/Questionnaire.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BearMascot from './BearMascot';

const questions = [
    {
        question: "What are you interested in?",
        options: ["Tech", "Finance", "Electronics"],
    },
    {
        question: "What's your learning goal?",
        options: ["Learn a new skill", "Upskill", "Career change", "Hobby"],
    },
    {
        question: "What's your preferred learning style?",
        options: ["Videos", "Articles", "Quizzes", "Hands-on projects"],
    },
    {
        question: "How much time can you spend daily?",
        options: ["15 mins", "30 mins", "1 hour", "Flexible"],
    },
    {
        question: "What's your current skill level?",
        options: ["Beginner", "Intermediate", "Expert"],
    },
];

const Questionnaire = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    const handleOptionClick = (option) => {
        setAnswers((prev) => [...prev, option]);

        // Move to the next question
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            alert("Thank you for completing the survey!");
            console.log("User's Answers: ", answers);
            navigate("/"); // Redirect to homepage after completion
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100 p-6 text-center">
            {/* Question Section */}
            <BearMascot />
            <h1 className="text-4xl font-bold text-blue-700 mb-6 animate-fadeIn">
                {questions[currentQuestion].question}
            </h1>

            {/* Options Section */}
            <div className="grid grid-cols-1 gap-6 w-full max-w-md">
                {questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        className="w-full p-4 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mt-8 bg-gray-300 rounded-full h-2">
                <div
                    className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Questionnaire;
