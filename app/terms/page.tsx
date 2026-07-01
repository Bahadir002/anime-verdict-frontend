"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsPage() {
  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar darkMode={false} setDarkMode={() => {}} searchQuery="" setSearchQuery={() => {}} />
      
      <main className="flex-grow max-w-4xl mx-auto w-full p-6 mt-10 mb-20">
        <div className="bg-white dark:bg-[#151515] border dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl font-black mb-6 text-blue-600 dark:text-blue-500">Terms of Service</h1>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>Welcome to AnimeVerdict. By accessing this website, we assume you accept these terms and conditions. Do not continue to use AnimeVerdict if you do not agree to take all of the terms and conditions stated on this page.</p>
            <h2 className="text-xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">1. License</h2>
            <p>Unless otherwise stated, AnimeVerdict and/or its licensors own the intellectual property rights for all material on AnimeVerdict. All intellectual property rights are reserved.</p>
            <h2 className="text-xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">2. User Content</h2>
            <p>Our quizzes and content are for entertainment purposes only. We reserve the right to monitor all comments and to remove any comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
            <p className="mt-8 text-sm italic">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}