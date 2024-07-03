import React, { useState, useEffect } from "react";
import fetchQuestions from "./service/ServiceGame";
import "./Game.css";

export const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
        const decodedQuestions = data.map((question) => ({
          ...question,
          question: decodeURIComponent(question.question),
          correct_answer: decodeURIComponent(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map((ans) =>
            decodeURIComponent(ans)
          ),
        }));
        setQuestions(decodedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    getQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswered(true);
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-t from-black to-violet-600 flex flex-col ">
        Loading...
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="game-main">
        <div className="content-game">
          <h2>Juego terminado</h2>
          <p>Tu puntuación es: {score}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="game-main">
      <div className="content-game">
        <h4 className="text-cyan-400 font-bold text-2xl">
          Pregunta {currentQuestionIndex + 1}
        </h4>
        <p className="border-solid border-2 border-cyan-500 p-2 w-[500px] text-center bg-gradient-to-r from-cyan-800 to-violet-600 ">
          {currentQuestion.question}
        </p>
        <ul className="flex flex-col gap-2">
          {currentQuestion.incorrect_answers.map((answer, index) => (
            <li key={index}>
              <button
                onClick={() => handleAnswer(false)}
                disabled={answered}
                className="button-game"
              >
                {answer}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleAnswer(true)}
              disabled={answered}
              className="button-game"
            >
              {currentQuestion.correct_answer}
            </button>
          </li>
        </ul>
        <p>Puntuación: {score}</p>
      </div>
    </div>
  );
};
