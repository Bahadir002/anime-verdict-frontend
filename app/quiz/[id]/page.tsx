"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function QuizPage() {
  const params = useParams();
  const quizId = params?.id;

  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quizData, setQuizData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document.documentElement.classList.contains("dark")) setDarkMode(true);

    const fetchSingleQuiz = async () => {
      try {
        const response = await fetch(`https://lightgrey-otter-854797.hostingersite.com/wp-json/wp/v2/quizzes/${quizId}`);
        const data = await response.json();
        const acf = data.acf || {};
        const parsedQuestions = [];

        for (let i = 1; i <= 10; i++) {
          const qKey = `soru_${i}`;
          if (acf[qKey] && acf[qKey].soru_metni) {
            const qData = acf[qKey];
            const rawOptions = qData.secenekler ? qData.secenekler.split(",") : [];
            const formattedOptions = rawOptions.map((opt: string, index: number) => ({
              id: String.fromCharCode(65 + index),
              text: opt.includes(":") ? opt.split(":")[1].trim() : opt.trim(),
              isCorrect: index === 0
            }));

            parsedQuestions.push({
              id: i,
              question: qData.soru_metni,
              image: qData.gorsel_url || "",
              options: formattedOptions
            });
          }
        }

        const formattedData = {
          id: data.id,
          title: data.title?.rendered || "Anime Quiz",
          description: "Are you ready to test your knowledge?",
          coverGif: acf.kapak_gorsel_url || "https://media.giphy.com/media/LHy9iUZDBxjEwNexJm/giphy.gif",
          questions: parsedQuestions,
          // Dinamik sonuç verileri
          resultData: {
            text: acf.sonuc_yazisi || "Special Grade!|Grade 1!|Potential Man...",
            gif: acf.sonuc_gif_url || "https://media.giphy.com/media/CkzBceXz8H68dDtvD1/giphy.gif"
          }
        };

        setQuizData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Hata:", error);
        setIsLoading(false);
      }
    };

    if (quizId) fetchSingleQuiz();
  }, [quizId]);

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    if (isAnswerChecked) return;
    setSelectedOption(optionId);
    setIsAnswerChecked(true);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
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

  if (!mounted || isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!quizData) return <div className="min-h-screen flex items-center justify-center">Quiz not found!</div>;

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progressPercentage = (currentQuestionIndex / quizData.questions.length) * 100;
  
  // Sonuç metinlerini ayır (WordPress'e girerken aralarına | koy)
  const sonuclar = quizData.resultData.text.split("|");
  const finalMesaj = score === quizData.questions.length ? sonuclar[0] : score >= quizData.questions.length / 2 ? sonuclar[1] : sonuclar[2];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen">
        <Navbar darkMode={darkMode} setDarkMode={() => setDarkMode(!darkMode)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="max-w-3xl mx-auto p-6 mt-10">
          {!isStarted ? (
            <div className="text-center bg-white dark:bg-[#151515] p-8 rounded-3xl shadow-lg">
              <h1 className="text-4xl font-black mb-6 text-blue-600">{quizData.title}</h1>
              <img src={quizData.coverGif} alt="Cover" className="w-full h-64 object-cover rounded-2xl mb-8" />
              <button onClick={() => setIsStarted(true)} className="px-12 py-5 bg-blue-600 text-white rounded-xl font-bold text-xl">Start Quiz</button>
            </div>
          ) : showResult ? (
            <div className="text-center bg-white dark:bg-[#151515] p-8 rounded-3xl shadow-2xl">
              <h2 className="text-4xl font-black mb-6">Quiz Completed!</h2>
              <img src={quizData.resultData.gif} className="w-full h-64 object-cover rounded-2xl mb-6" />
              <p className="text-2xl font-bold mb-4">Score: {score} / {quizData.questions.length}</p>
              <p className="text-lg italic mb-10">"{finalMesaj}"</p>
              <button onClick={restartQuiz} className="px-8 py-4 bg-gray-200 rounded-xl font-bold">Retake</button>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#151515] p-6 rounded-3xl shadow-lg">
              <div className="mb-4">Question {currentQuestionIndex + 1} / {quizData.questions.length}</div>
              <img src={currentQuestion.image} className="w-full h-64 object-cover rounded-2xl mb-6" />
              <h2 className="text-2xl font-bold mb-8">{currentQuestion.question}</h2>
              <div className="space-y-4">
                {currentQuestion.options.map((option: any) => (
                  <button key={option.id} onClick={() => handleOptionClick(option.id, option.isCorrect)} disabled={isAnswerChecked} className="w-full p-5 text-left rounded-xl border-2 hover:border-blue-500">
                    {option.text}
                  </button>
                ))}
              </div>
              {isAnswerChecked && (
                <button onClick={handleNextQuestion} className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold">
                  {currentQuestionIndex + 1 === quizData.questions.length ? "See Results" : "Next Question"}
                </button>
              )}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}