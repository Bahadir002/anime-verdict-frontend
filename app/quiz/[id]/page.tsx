"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

// Dummy Quiz Data (GIF linkleri eklendi)
const quizData = {
  id: 1,
  title: "ARE YOU A JJK EXPERT OR JUST ANOTHER POTENTIAL MAN? (THE ULTIMATE SHIBUYA TEST)",
  description: "Think you know Jujutsu Kaisen better than average twitter user? Prove it! From Sukuna's cooking skills to Potential man's 'megumi', answer these questions to see if you're a Special Grade reader or just a grade-4 larper destined to be collateral damage.",
  coverGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRteWJmY3h1aTJ5ZGZyZW0xdG4zbm83c2p4NW8yM3N6M2t0Z3YwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LHy9iUZDBxjEwNexJm/giphy.gif",
  questions: [
    {
      id: 1,
      question: "What is considered the “Pinnacle of Sorcery” in the Jujutsu world?",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWJqbTJqZTNyeHk4cDBtdTJxaXQzZzhxeGszZnhpZ3Btc29zeXR4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CkzBceXz8H68dDtvD1/giphy.gif",
      options: [
        { id: "A", text: "Domain Expansion", isCorrect: true },
        { id: "B", text: "Reverse Cursed Technique", isCorrect: false },
        { id: "C", text: "Surviving Gege Akutami's writing", isCorrect: false },
        { id: "D", text: "Heavenly Restriction", isCorrect: false },
      ]
    },
    {
      id: 2,
      question: "How does Nanami's ratio technique work?",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHYxcWZtdzY0czF2M2ZtZ2F1bnZ0YXo4czc5bGNsZGZtcXRycGN5eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/S1SnLg08CxnUGqyqha/giphy.gif",
      options: [
        { id: "A", text: "It reduces the target's defence by 70% allowing him to cut through the soul of the enemy.", isCorrect: false },
        { id: "B", text: "It draws a circle around the target.", isCorrect: false },
        { id: "C", text: "Nanami just hits them while yelling that his shift is over.", isCorrect: false },
        { id: "D", text: "It divides the target's length in a 7:3 ratio to find a weak point.", isCorrect: true },
      ]
    },
    {
      id: 3,
      question: "Why does Gojo Satoru wear a blindfold if he has the Six Eyes?",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNG11cTJtc3B4c20xaHAwZmJ5NmI4aGdzbTVxcDQ4bW5wMW81NjJqbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vzku9jyuef09G/giphy.gif",
      options: [
        { id: "A", text: "He is actually blind and uses sonar.", isCorrect: false },
        { id: "B", text: "Because he thinks it makes him look cooler.", isCorrect: false },
        { id: "C", text: "To prevent his brain from overheating due to constant information intake.", isCorrect: true },
      ]
    }
  ]
};

export default function QuizPage() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document.documentElement.classList.contains("dark")) setDarkMode(true);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    if (isAnswerChecked) return;
    setSelectedOption(optionId);
    setIsAnswerChecked(true);
    if (isCorrect) setScore(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setShowResult(false);
  };

  if (!mounted) return <div className="p-10 text-center">Loading...</div>;

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex) / quizData.questions.length) * 100;

  // Dinamik Sonuç Hesaplama Mantığı
  let resultTitle = "";
  let resultImage = "";
  let resultText = "";

  if (score === quizData.questions.length) {
    resultTitle = "SPECIAL GRADE SORCERER!";
    resultImage = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWJqbTJqZTNyeHk4cDBtdTJxaXQzZzhxeGszZnhpZ3Btc29zeXR4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CkzBceXz8H68dDtvD1/giphy.gif"; // Gojo
    resultText = "Flawless victory. You are definitely a Special Grade Sorcerer! Gojo would be proud.";
  } else if (score >= quizData.questions.length / 2) {
    resultTitle = "GRADE 1 SORCERER";
    resultImage = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHYxcWZtdzY0czF2M2ZtZ2F1bnZ0YXo4czc5bGNsZGZtcXRycGN5eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/S1SnLg08CxnUGqyqha/giphy.gif"; // Nanami
    resultText = "Not bad at all. You have a solid grasp of Jujutsu Sorcery. Keep training.";
  } else {
    resultTitle = "JUST ANOTHER POTENTIAL MAN";
    resultImage = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHU1dWN6dzVyaXRpOW1wYXhvaTNrMzZocGtsNzExOWY4dHF6eHpxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9QoetQet08y4A63q3L/giphy.gif"; // Toji looking down
    resultText = "Ouch. You are just another Potential Man. Sukuna is definitely laughing at you.";
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 pb-20">
        
        <Navbar darkMode={darkMode} setDarkMode={toggleTheme} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="max-w-3xl mx-auto p-6 mt-10">
          
          {/* 1. START SCREEN */}
          {!isStarted ? (
            <div className="bg-white dark:bg-[#151515] border dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-lg text-center animate-fade-in-up">
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase text-blue-600 dark:text-blue-500">
                {quizData.title}
              </h1>
              <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 border-4 border-gray-100 dark:border-gray-800 shadow-inner">
                <img src={quizData.coverGif} alt="Quiz Cover" className="w-full h-full object-cover" />
              </div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                {quizData.description}
              </p>
              <button 
                onClick={() => setIsStarted(true)}
                className="w-full md:w-auto px-12 py-5 bg-blue-600 text-white rounded-xl font-bold text-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/40 hover:-translate-y-1"
              >
                Start Quiz
              </button>
            </div>

          /* 2. RESULT SCREEN (YENİLENMİŞ VİRAL TASARIM) */
          ) : showResult ? (
            <div className="animate-fade-in-up">
              {/* Sonuç Kartı */}
              <div className="bg-white dark:bg-[#151515] border dark:border-gray-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                
                {/* Arka Plan Dekorasyonu (Opsiyonel) */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-600/20 to-transparent"></div>

                <div className="relative z-10">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Your Result</p>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 text-blue-600 dark:text-blue-400 uppercase tracking-tight">
                    {resultTitle}
                  </h2>
                  
                  {/* Dinamik Sonuç GIF'i */}
                  <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 border-4 border-gray-100 dark:border-gray-800 shadow-lg mx-auto max-w-xl">
                    <img src={resultImage} alt="Result Visual" className="w-full h-full object-cover" />
                  </div>

                  <p className="text-2xl mb-4">
                    Score: <span className="font-black text-blue-600 dark:text-blue-500">{score}</span> / {quizData.questions.length}
                  </p>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 italic">
                    "{resultText}"
                  </p>

                  {/* Paylaşım Butonları (Viral Etki İçin) */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 border-t dark:border-gray-800 pt-8 mt-8">
                    <button className="px-6 py-3 bg-[#1DA1F2] text-white rounded-xl font-bold hover:bg-[#1a8cd8] transition flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      Share on X
                    </button>
                    <button className="px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20b858] transition flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      Share on WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Alt Butonlar */}
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                <button onClick={restartQuiz} className="px-8 py-4 bg-white dark:bg-[#151515] border-2 border-gray-200 dark:border-gray-800 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition shadow-sm">
                  🔄 Retake Quiz
                </button>
                <Link href="/">
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
                    🏠 Explore More Quizzes
                  </button>
                </Link>
              </div>

            </div>

          /* 3. QUESTION SCREEN */
          ) : (
            <div className="bg-white dark:bg-[#151515] border dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-lg animate-fade-in-up">
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Question {currentQuestionIndex + 1} / {quizData.questions.length}</span>
                  <span className="text-sm font-bold text-blue-500">Score: {score}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                <div className="w-full h-56 md:h-80 rounded-2xl overflow-hidden mb-8 border-2 border-gray-100 dark:border-gray-800 shadow-sm">
                  <img src={currentQuestion.image} alt="Question Visual" className="w-full h-full object-cover" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option) => {
                  let buttonStyle = "border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-gray-50 dark:bg-gray-800/50";
                  
                  if (isAnswerChecked) {
                    if (option.isCorrect) {
                      buttonStyle = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                    } else if (selectedOption === option.id) {
                      buttonStyle = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                    } else {
                      buttonStyle = "border-gray-200 dark:border-gray-700 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option.id, option.isCorrect)}
                      disabled={isAnswerChecked}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 font-medium text-lg flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{option.text}</span>
                      {isAnswerChecked && option.isCorrect && <span>✅</span>}
                      {isAnswerChecked && !option.isCorrect && selectedOption === option.id && <span>❌</span>}
                    </button>
                  );
                })}
              </div>

              {isAnswerChecked && (
                <div className="mt-8 flex justify-end animate-fade-in-up">
                  <button 
                    onClick={handleNextQuestion}
                    className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                  >
                    {currentQuestionIndex + 1 === quizData.questions.length ? "See Results" : "Next Question"} 
                    <span>➔</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}