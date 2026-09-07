"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  links?: { label: string; href: string }[];
}

const defaultLinks = [
  { label: "Signals", href: "/signals" },
  { label: "Trade", href: "/trade" },
  { label: "Patterns", href: "/patterns" },
  { label: "Learn", href: "/book" },
];

export default function Navbar({ links = defaultLinks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-dark-600/50"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/#home" className="flex items-center flex-shrink-0">
            {theme === "dark" ? (
              <img src="/cryptostack-logo-white.svg" alt="CryptoStack" className="h-8 w-auto" />
            ) : (
              <img src="/cryptostack-logo-black.svg" alt="CryptoStack" className="h-8 w-auto" />
            )}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700/50 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/signals"
              className="px-5 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-all duration-200 shadow-sm shadow-brand/20 hover:shadow-brand/30"
            >
              Get Started
            </a>
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-1 bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-dark-600/50">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-700/50 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/signals"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2.5 mt-2 bg-brand text-white text-sm font-semibold rounded-lg text-center hover:bg-brand-dark transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
