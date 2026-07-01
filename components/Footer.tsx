"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#111] border-t dark:border-gray-800 py-8 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        
        {/* Telif Hakkı Kısmı */}
        <div>
          © {new Date().getFullYear()} <span className="font-bold text-blue-600 dark:text-blue-400">AnimeVerdict</span>. All rights reserved.
        </div>

        {/* Kurumsal Linkler (Terms ve Privacy) */}
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-dotted">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-dotted">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-dotted">
            Contact Us
          </Link>
        </div>

      </div>
    </footer>
  );
}