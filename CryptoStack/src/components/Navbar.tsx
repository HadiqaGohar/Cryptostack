"use client";

import { useState, useEffect } from "react";

interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  links?: NavbarLink[];
}

const defaultLinks: NavbarLink[] = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-to-start" },
  { label: "Payouts", href: "#payouts" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ links = defaultLinks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-900/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl" aria-hidden="true">
              🔥
            </span>
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              CryptoStack
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#get-started"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-dark-900 transition-all hover:bg-brand-light hover:shadow-lg hover:shadow-brand/20"
            >
              Get Started
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-dark-800 border-t border-white/5 px-4 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-4 py-2.5 text-sm text-gray-400 transition-colors hover:bg-dark-700 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#get-started"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-dark-900 transition-all hover:bg-brand-light"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
