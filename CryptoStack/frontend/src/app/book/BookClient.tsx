"use client";

import { useState, useEffect } from "react";
import { BOOK_CHAPTERS, getPageBySlug, BookPage } from "@/lib/bookContent";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import BookSidebar from "@/components/book/BookSidebar";
import BookSearch from "@/components/book/BookSearch";

export default function BookClient() {
  const [activeChapter, setActiveChapter] = useState("risk-management");
  const [activePage, setActivePage] = useState("why-stop-loss-matters");
  const [currentPage, setCurrentPage] = useState<BookPage | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const page = getPageBySlug(activeChapter, activePage);
    if (page) setCurrentPage(page);
  }, [activeChapter, activePage]);

  const handleNavigate = (chapterId: string, pageSlug: string) => {
    setActiveChapter(chapterId);
    setActivePage(pageSlug);
  };

  const handleSearchNavigate = (page: BookPage) => {
    for (const chapter of BOOK_CHAPTERS) {
      const found = chapter.pages.find((p) => p.slug === page.slug);
      if (found) {
        setActiveChapter(chapter.id);
        setActivePage(page.slug);
        break;
      }
    }
  };

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let tableHeaders: string[] = [];

    lines.forEach((line, i) => {
      if (line.startsWith("# ")) {
        elements.push(<h1 key={i} className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{line.slice(2)}</h1>);
      } else if (line.startsWith("## ")) {
        elements.push(<h2 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">{line.slice(3)}</h2>);
      } else if (line.startsWith("### ")) {
        elements.push(<h3 key={i} className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">{line.slice(4)}</h3>);
      }
      else if (line.includes("|") && line.trim().startsWith("|")) {
        const cells = line.split("|").filter(c => c.trim()).map(c => c.trim());
        if (cells.every(c => c.match(/^[-:]+$/))) {
          return;
        }
        if (!inTable) {
          inTable = true;
          tableHeaders = cells;
          tableRows = [];
        } else {
          tableRows.push(cells);
        }
      } else {
        if (inTable) {
          elements.push(
            <div key={`table-${i}`} className="overflow-x-auto my-4">
              <table className="w-full text-sm border border-gray-200 dark:border-dark-600 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 dark:bg-dark-700">
                    {tableHeaders.map((h, j) => (
                      <th key={j} className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-dark-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, j) => (
                    <tr key={j} className="border-b border-gray-100 dark:border-dark-700 last:border-0">
                      {row.map((cell, k) => (
                        <td key={k} className="px-4 py-2 text-gray-700 dark:text-gray-300">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          inTable = false;
          tableHeaders = [];
          tableRows = [];
        }

        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');

        const linkProcessed = processedLine.replace(
          /\[(.*?)\]\((.*?)\)/g,
          '<a href="$2" class="text-brand hover:text-brand-dark underline">$1</a>'
        );

        if (line.startsWith("- ")) {
          elements.push(
            <li key={i} className="ml-4 text-gray-700 dark:text-gray-300 mb-1 list-disc" dangerouslySetInnerHTML={{ __html: linkProcessed.slice(2) }} />
          );
        } else if (line.match(/^\d+\./)) {
          elements.push(
            <li key={i} className="ml-4 text-gray-700 dark:text-gray-300 mb-1 list-decimal" dangerouslySetInnerHTML={{ __html: linkProcessed }} />
          );
        } else if (line.trim() === "") {
          elements.push(<div key={i} className="h-2" />);
        } else {
          elements.push(
            <p key={i} className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: linkProcessed }} />
          );
        }
      }
    });

    if (inTable && tableHeaders.length > 0) {
      elements.push(
        <div key="table-end" className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 dark:border-dark-600 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700">
                {tableHeaders.map((h, j) => (
                  <th key={j} className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-dark-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, j) => (
                <tr key={j} className="border-b border-gray-100 dark:border-dark-700 last:border-0">
                  {row.map((cell, k) => (
                    <td key={k} className="px-4 py-2 text-gray-700 dark:text-gray-300">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return elements;
  };

  const allPages = BOOK_CHAPTERS.flatMap((c) => c.pages.map((p) => ({ ...p, chapterId: c.id })));
  const currentIndex = allPages.findIndex((p) => p.slug === activePage && p.chapterId === activeChapter);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      <div className="bg-brand/10 border-b border-brand/20">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center">
          <p className="text-sm text-brand font-medium">
            📚 The Book — Free trading education. Learn from zero, trade smarter.
          </p>
        </div>
      </div>

      <div className="flex">
        <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
          <BookSidebar
            activeChapter={activeChapter}
            activePage={activePage}
            onNavigate={handleNavigate}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="sticky top-16 z-10 bg-gray-50 dark:bg-dark-900 border-b border-gray-200 dark:border-dark-600 px-6 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex-1 max-w-md mx-4">
                <BookSearch onNavigate={handleSearchNavigate} />
              </div>
              <ThemeToggle />
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 py-8">
            {currentPage ? (
              <article>
                {renderContent(currentPage.content)}
              </article>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 dark:text-gray-500">Select a page from the sidebar.</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200 dark:border-dark-600">
              {prevPage ? (
                <button
                  onClick={() => handleNavigate(prevPage.chapterId, prevPage.slug)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors"
                >
                  ← {prevPage.title}
                </button>
              ) : (
                <div />
              )}
              {nextPage ? (
                <button
                  onClick={() => handleNavigate(nextPage.chapterId, nextPage.slug)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors"
                >
                  {nextPage.title} →
                </button>
              ) : (
                <div />
              )}
            </div>

            <div className="mt-12 p-4 bg-gray-100 dark:bg-dark-800 rounded-xl text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📚 <strong>The Book</strong> — {BOOK_CHAPTERS.length} chapters, {allPages.length} pages of free trading education.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Educational content only. Not financial advice. Always do your own research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}