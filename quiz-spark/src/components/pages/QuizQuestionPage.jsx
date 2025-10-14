import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllQuizzes } from "../../utils/quizStorage";

export default function QuizQuestionPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ get quiz id correctly
  const quizzes = getAllQuizzes();
  const quiz =
    quizzes.find((q) => q.id === id) || { title: "React Quiz", questions: [] };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (index) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];

    if (!currentQuestion) return;

    // ✅ Check if correct
    const isCorrect = index === currentQuestion.answerIndex;
    const updatedScore = isCorrect ? score + 1 : score;
    setScore(updatedScore);

    // ✅ Move to next question or finish quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // ✅ Navigate to result page
      navigate("/result", {
        state: {
          quizTitle: quiz.title,
          correct: updatedScore,
          total: quiz.questions.length,
        },
      });
    }
  };

  // ✅ Handle no questions
  if (quiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        No questions available for this quiz. Please add some first.
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center pb-6 border-b mb-10">
        <div className="flex items-center space-x-3">
          <div className="bg-green-600 p-2 rounded-lg text-white text-3xl">{'</>'}</div>
          <div>
            <span className="text-2xl font-bold text-gray-800">{quiz.title}</span>
            <p className="text-gray-500 text-sm">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <span className="text-green-600 text-2xl mr-1">⏱️</span>
          <span className="font-semibold text-xl">00:00:27</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {currentQuestion.question}
          </h2>
          <span className="ml-auto text-gray-500">
            {currentQuestionIndex + 1}/{quiz.questions.length}
          </span>
        </div>

        {/* Choices */}
        <div>
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className="w-full text-left p-4 mb-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-gray-700 font-medium"
            >
              <span className="font-bold mr-2 text-green-600">
                {String.fromCharCode(65 + index)}.
              </span>
              {choice}
            </button>
          ))}
        </div>

        {/* (Optional) Submit button — not needed for auto-next */}
        <div className="flex justify-end mt-8">
          <button
            className="px-8 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:bg-green-800 transition"
            onClick={() => navigate("/result", {
              state: {
                quizTitle: quiz.title,
                correct: score,
                total: quiz.questions.length,
              },
            })}
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
