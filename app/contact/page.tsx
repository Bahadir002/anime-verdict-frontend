"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar darkMode={false} setDarkMode={() => {}} searchQuery="" setSearchQuery={() => {}} />
      
      <main className="flex-grow max-w-4xl mx-auto w-full p-6 mt-10 mb-20">
        <div className="bg-white dark:bg-[#151515] border dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm text-center">
          <h1 className="text-3xl font-black mb-6 text-blue-600 dark:text-blue-500">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg">
            Got a question, a quiz suggestion, or just want to talk about your favorite anime? We'd love to hear from you!
          </p>

          {/* Senin Formspree Linkin Buraya Eklendi */}
          <form action="https://formspree.io/f/xaqgdgav" method="POST" className="max-w-xl mx-auto space-y-6 text-left">
            <div>
              <label className="block text-sm font-bold mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                required
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a] focus:outline-none focus:border-blue-500 transition-colors" 
                placeholder="Eren Yeager" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                required
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a] focus:outline-none focus:border-blue-500 transition-colors" 
                placeholder="eren@scouts.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Message</label>
              <textarea 
                name="message"
                required
                rows={5} 
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a] focus:outline-none focus:border-blue-500 transition-colors" 
                placeholder="Tatakae..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-12 pt-8 border-t dark:border-gray-800">
            <p className="text-gray-500 text-sm">
              Or email us directly at: <a href="mailto:bahadirilgun0203@gmail.com" className="text-blue-500 hover:underline font-bold">bahadirilgun0203@gmail.com</a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}