"use client";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: string;
  tagline?: string;
  columns?: FooterColumn[];
  copyright?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/#" },
      { label: "About Us", href: "/#home" },
      { label: "AI Signals", href: "/signals" },
      { label: "Contact", href: "mailto:support@cryptostack.com" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "AI Signals", href: "/signals" },
      { label: "Practice Trading", href: "/trade" },
      { label: "Learn Patterns", href: "/patterns" },
      { label: "The Book", href: "/book" },
      { label: "How It Works", href: "/#how-to-start" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "Twitter", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];

export default function Footer({
  tagline = "AI signals that keep you safe. For real trading, use any live platform.",
  columns = defaultColumns,
  copyright = "© 2025 CryptoStack. All Rights Reserved.",
}: FooterProps) {
  return (
    <footer className="bg-gray-50 dark:bg-dark-800/50 border-t border-gray-200 dark:border-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + Tagline */}
          <div>
            <img src="/cryptostack-logo.webp" alt="CryptoStack" className="h-12 w-auto mb-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Link Columns */}
          {columns.map((column, i) => (
            <div key={i}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-dark-600 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
