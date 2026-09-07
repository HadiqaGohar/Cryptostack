"use client";

import { useState } from "react";
import { searchBook, BookPage } from "@/lib/bookContent";

interface BookSearchProps {
  onNavigate: (page: BookPage) => void;
}

export default function BookSearch({ onNavigate }: BookSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookPage[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      const found = searchBook(value).slice(0, 5);
      setResults(found);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-dark-700 rounded-lg px-3 py-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search docs..."
          className="bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none flex-1"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.map((page, i) => (
            <button
              key={i}
              onClick={() => {
                onNavigate(page);
                setIsOpen(false);
                setQuery("");
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
            >
              <p className="font-medium text-gray-900 dark:text-white">{page.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{page.content.substring(0, 80)}...</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
