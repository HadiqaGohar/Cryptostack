"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  links?: { label: string; href: string }[];
}

const defaultLinks = [
  { label: "Home", href: "/#home" },
  { label: "How It Works", href: "/#how-to-start" },
  { label: "🤖 AI Signals", href: "/signals" },
  { label: "📊 Practice Trading", href: "/trade" },
  { label: "📚 Learn Patterns", href: "/patterns" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar({ links = defaultLinks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-gray-200 dark:border-dark-600 shadow-sm"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/#home" className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="text-xl font-bold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              CryptoStack
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  ["/signals", "/trade", "/patterns"].includes(link.href)
                    ? "text-brand hover:text-brand-light"
                    : "text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-brand"
                }`}
              >
                {link.href === "/signals" ? "🤖 " : link.href === "/trade" ? "📊 " : link.href === "/patterns" ? "📚 " : ""}{link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="/signals"
              className="px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors duration-200"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-dark-600">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-brand hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg"
              >
                {link.href === "/signals" ? "🤖 " : link.href === "/trade" ? "📊 " : link.href === "/patterns" ? "📚 " : ""}{link.label}
              </a>
            ))}
            <a
              href="/signals"
              onClick={() => setMenuOpen(false)}
              className="block mx-4 mt-2 px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg text-center hover:bg-brand-dark"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
