"use client";

import { useNavItems } from "@/hooks/useNavItems";
import { useState } from "react";

const Header = () => {
  const navItems = useNavItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#1A0F0F] text-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        {/* Logo on the left */}
        <div className="font-serif text-xl font-semibold text-gold md:text-2xl">
          Armenia Wine Tours
        </div>

        {/* Navigation links - Desktop */}
        <nav className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-serif text-sm font-medium text-white transition-colors hover:text-gold lg:text-base"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Book Now button - Desktop */}
        <button className="hidden rounded-md bg-gold px-6 py-2 font-serif text-sm font-semibold text-[#1A0F0F] transition-all hover:bg-gold-400 md:block">
          Book Now
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#1A0F0F] md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-base font-medium text-white transition-colors hover:text-gold"
                >
                  {item}
                </a>
              ))}
              <button className="mt-2 w-full rounded-md bg-gold px-6 py-2 font-serif text-sm font-semibold text-[#1A0F0F] transition-all hover:bg-gold-400">
                Book Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
