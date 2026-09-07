export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: string;
  tagline?: string;
  columns?: FooterColumn[];
  copyright?: string;
}

const defaultLogo = "🔥 CryptoStack";

const defaultColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Trading", href: "#trading" },
      { label: "Pools", href: "#features" },
      { label: "Rewards", href: "#payouts" },
      { label: "API", href: "#api" },
      { label: "AI Signals", href: "/signals" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "Twitter", href: "#twitter" },
      { label: "Discord", href: "#discord" },
      { label: "Telegram", href: "#telegram" },
      { label: "GitHub", href: "#github" },
    ],
  },
];

export default function Footer({
  logo = defaultLogo,
  tagline = "The future of crypto trading",
  columns = defaultColumns,
  copyright = "© 2024 CryptoStack. All Rights Reserved.",
}: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-dark-800/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <a href="#home" className="flex items-center gap-2 text-xl font-bold">
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                {logo}
              </span>
            </a>
            <p className="text-sm text-gray-500 max-w-xs">
              {tagline}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="font-semibold text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
