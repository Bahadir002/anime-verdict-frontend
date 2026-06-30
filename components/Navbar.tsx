// components/Navbar.tsx
"use client";
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: any; // useState veya custom toggle fonksiyonu için
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export default function Navbar({ darkMode, setDarkMode, searchQuery, setSearchQuery }: NavbarProps) {
  const router = useRouter();

  const handleSearch = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    // Sadece Enter'a basıldığında VEYA fonksiyona direkt tıklandığında çalışır
    if ((!e || e.key === 'Enter') && searchQuery.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#111] border-b dark:border-gray-800 p-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logoya tıklandığında ana sayfaya döner */}
        <h1 
          onClick={() => router.push('/')} 
          className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400 cursor-pointer"
        >
          AnimeVerdict
        </h1>
        
        <div className="relative w-full md:w-96 flex items-center">
          <input 
            type="text" 
            placeholder="Search quizzes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch} // Enter tuşunu dinler
            className="w-full px-4 py-2 pl-10 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {/* Büyüteç ikonunu butona çevirdik ki tıklanabilsin */}
          <button 
            onClick={() => handleSearch()} 
            className="absolute left-3 top-2.5 text-gray-400 hover:text-blue-500 transition"
          >
            🔍
          </button>
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}