// app/search/page.tsx
"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import QuizCard from "../../components/QuizCard";

// Şimdilik test edebilmemiz için JJK verisi (İleride WordPress'ten buraya da çekilecek)
const dummyPosts = [
  { 
    id: 1, 
    title: "ARE YOU A JJK EXPERT OR JUST ANOTHER POTENTIAL MAN?", 
    excerpt: "Think you know Jujutsu Kaisen better than average twitter user? Prove it!", 
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRteWJmY3h1aTJ5ZGZyZW0xdG4zbm83c2p4NW8yM3N6M2t0Z3YwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LHy9iUZDBxjEwNexJm/giphy.gif" 
  }
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || ""; // URL'deki arama terimini al
  
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query); // Arama çubuğunda kelime kalsın

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

  if (!mounted) return <div className="p-10 text-center">Loading...</div>;

  // Başlıkta arama kelimesi geçen quizleri filtrele
  const filteredPosts = dummyPosts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 pb-20">
        
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={toggleTheme} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <main className="max-w-6xl mx-auto p-6 mt-10 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end border-b dark:border-gray-800 pb-6 gap-4">
            <div>
              <p className="text-gray-500 font-medium tracking-widest uppercase text-sm mb-2">Search Results</p>
              <h2 className="text-3xl font-black text-blue-600 dark:text-blue-400">"{query}"</h2>
            </div>
            <span className="text-lg font-bold text-gray-500 bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-xl">
              {filteredPosts.length} results found
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 px-6 border-4 dark:border-gray-800 rounded-3xl border-dashed">
              <span className="text-5xl mb-4 block">👻</span>
              <h3 className="text-2xl font-bold mb-2">Nothing found here</h3>
              <p className="text-gray-500">We couldn't find any quizzes matching your search. Try different keywords.</p>
              <Link href="/">
                <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                  Browse All Quizzes
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link href={`/quiz/${post.id}`} key={post.id} className="block group">
                  <QuizCard 
                    title={post.title} 
                    excerpt={post.excerpt} 
                    image={post.image} 
                  />
                </Link>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// Next.js'in "useSearchParams" kullanan sayfalar için istediği standart Suspense sarmalı
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading Search Engine...</div>}>
      <SearchResults />
    </Suspense>
  );
}