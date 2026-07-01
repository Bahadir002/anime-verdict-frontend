// app/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import QuizCard from "../components/QuizCard";
import Footer from "../components/Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Quizleri tutacağımız State
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // WordPress API'sine bağlanıp tüm quizleri çeken fonksiyon
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('https://lightgrey-otter-854797.hostingersite.com/wp-json/wp/v2/quizzes');
        const data = await response.json();
        
        // WordPress'ten gelen JSON verisini QuizCard'ın anlayacağı formata sokuyoruz
        const formattedQuizzes = data.map((item: any) => ({
          id: item.id,
          title: item.title.rendered,
          excerpt: item.acf?.soru_1?.soru_metni || "Are you ready for this quiz?", 
          // BURASI GÜNCELLENDİ: Önce kapak_gorseli_url alanına bakar, bulamazsa soru_1'in görselini alır, o da yoksa default resmi basar.
          image: item.acf?.kapak_gorseli_url || item.acf?.soru_1?.gorsel_url || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRteWJmY3h1aTJ5ZGZyZW0xdG4zbm83c2p4NW8yM3N6M2t0Z3YwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LHy9iUZDBxjEwNexJm/giphy.gif"
        }));

        setQuizzes(formattedQuizzes);
      } catch (error) {
        console.error("Quizler çekilirken hata oluştu:", error);
      }
    };

    fetchQuizzes();
  }, []);

  // Otomatik kaydırma
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollSlider("right");
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 320;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const filteredPosts = quizzes.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 pb-20">
        
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="max-w-6xl mx-auto p-6 mt-6 space-y-16">
          
          {/* Sadece aktif quizler varsa Slider'ı göster */}
          {quizzes.length > 0 && (
            <section className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Featured Quizzes</h2>
              <div className="relative group/slider">
                <button onClick={() => scrollSlider("left")} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/60 text-white rounded-full opacity-0 group-hover/slider:opacity-100 hover:bg-black/80 transition-all shadow-lg backdrop-blur-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                </button>

                <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {quizzes.map((post) => (
                    <Link href={`/quiz/${post.id}`} key={post.id} className="min-w-[300px] md:min-w-[400px] snap-center cursor-pointer group/card relative overflow-hidden rounded-2xl shadow-md block">
                      <img src={post.image} alt={post.title} className="w-full h-56 object-cover group-hover/card:scale-105 transition duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
                        <h3 className="text-lg font-bold leading-tight mb-1">{post.title}</h3>
                        <p className="text-sm text-gray-300 line-clamp-1">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <button onClick={() => scrollSlider("right")} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/60 text-white rounded-full opacity-0 group-hover/slider:opacity-100 hover:bg-black/80 transition-all shadow-lg backdrop-blur-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </section>
          )}

          {/* Tüm Testler (Sadece Var Olanlar) */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">All Quizzes</h2>
              {searchQuery && <span className="text-sm text-gray-500">{filteredPosts.length} results found</span>}
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-10 text-gray-500 border dark:border-gray-800 rounded-2xl border-dashed">
                No quizzes found matching your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link href={`/quiz/${post.id}`} key={post.id}>
                    <QuizCard 
                      title={post.title} 
                      excerpt={post.excerpt} 
                      image={post.image} 
                    />
                  </Link>
                ))}
              </div>
            )}
          </section>

        </main>
        <Footer />
      </div>
    </div>
  );
}