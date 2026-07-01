"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar darkMode={false} setDarkMode={() => {}} searchQuery="" setSearchQuery={() => {}} />
      
      <main className="flex-grow max-w-4xl mx-auto w-full p-6 mt-10 mb-20">
        <div className="bg-white dark:bg-[#151515] border dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl font-black mb-6 text-blue-600 dark:text-blue-500">Privacy Policy</h1>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>At AnimeVerdict, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by AnimeVerdict and how we use it.</p>
            <h2 className="text-xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">Log Files</h2>
            <p>AnimeVerdict follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
            <h2 className="text-xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">Google DoubleClick DART Cookie</h2>
            <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.</p>
            <p className="mt-8 text-sm italic">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}