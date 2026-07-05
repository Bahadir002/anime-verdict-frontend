// app/about/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    if (document.documentElement.classList.contains("dark")) setDarkMode(true);
  }, []);

  if (!mounted) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 flex flex-col">
        
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={() => setDarkMode(!darkMode)} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <main className="flex-grow max-w-4xl mx-auto p-6 mt-10 mb-20 w-full">
          <div className="bg-white dark:bg-[#151515] p-8 md:p-12 rounded-3xl shadow-lg">
            
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-blue-600">About Us</h1>
            
            <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-white">Welcome to AnimeVerdict – The Ultimate Testing Ground for Anime Fans</strong>
              </p>
              
              <p>
                AnimeVerdict was born out of a simple idea: true anime fans deserve better, more challenging quizzes. Combining a background in software engineering with a deep, genuine passion for anime culture, this platform was built from the ground up to offer a modern, seamless, and deeply engaging trivia experience.
              </p>
              
              <p>
                Whether you are diving into the complex lore and cursed techniques of <em>Jujutsu Kaisen</em>, exploring the emotional depths of <em>Re:Zero</em>, or just enjoying the latest VTuber watch-along streams, anime is more than just entertainment for us—it's a rich world of storytelling that deserves to be celebrated.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">Our Mission</h2>
              <p>
                Most anime quizzes on the internet barely scratch the surface, asking basic questions that anyone could guess. At AnimeVerdict, our mission is to separate the casual watchers from the true otakus. We meticulously research the intricate lore, character backstories, and world-building mechanics of your favorite series to craft quizzes that will truly test your limits.
              </p>
              <p>
                We want to create a space where fans can not only challenge their knowledge but also learn hidden facts and obscure details about the shows they love.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">Why AnimeVerdict?</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Deep Lore Focus:</strong> We don't just ask "Who is the main character?" We dive into the specific mechanics of abilities, historical lore, and hidden manga details.</li>
                <li><strong>Modern & Fast Experience:</strong> Built with the latest web technologies, AnimeVerdict ensures a lightning-fast, ad-friendly, and mobile-responsive experience without annoying pop-ups or broken pages.</li>
                <li><strong>Community Driven:</strong> We are constantly watching, reading, and analyzing new series to bring you fresh and relevant content.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">Join the Verdict</h2>
              <p>
                Are you ready to prove your knowledge? Browse our featured quizzes, challenge your friends, and see if you have what it takes to achieve a "Special Grade" score. 
              </p>
              <p>
                If you have any questions, suggestions for new quizzes, or just want to talk about the latest episodes, feel free to reach out to us through our <strong>Contact Us</strong> page.
              </p>
              <p className="font-bold text-blue-600 mt-8 text-xl">
                Thank you for visiting AnimeVerdict. Let the trials begin!
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}