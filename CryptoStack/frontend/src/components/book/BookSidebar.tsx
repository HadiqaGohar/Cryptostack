"use client";

import { useState } from "react";
import { BOOK_CHAPTERS, BookChapter } from "@/lib/bookContent";

interface BookSidebarProps {
  activeChapter: string;
  activePage: string;
  onNavigate: (chapterId: string, pageSlug: string) => void;
}

export default function BookSidebar({ activeChapter, activePage, onNavigate }: BookSidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<string[]>(
    BOOK_CHAPTERS.map((c) => c.id)
  );

  const toggleChapter = (id: string) => {
    setExpandedChapters((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <nav className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-600 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📚 The Book
        </h2>

        {BOOK_CHAPTERS.map((chapter) => (
          <div key={chapter.id} className="mb-2">
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
            >
              <span>{chapter.icon}</span>
              <span className="flex-1 text-left">{chapter.title}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedChapters.includes(chapter.id) ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {expandedChapters.includes(chapter.id) && (
              <div className="ml-4 mt-1 space-y-0.5">
                {chapter.pages.map((page) => (
                  <button
                    key={page.slug}
                    onClick={() => onNavigate(chapter.id, page.slug)}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      activeChapter === chapter.id && activePage === page.slug
                        ? "bg-brand/10 text-brand font-medium"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-700"
                    }`}
                  >
                    {page.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
