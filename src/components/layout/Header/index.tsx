"use client";

import { useNavItems } from "@/hooks/useNavItems";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const navItems = useNavItems();
  const { openModal } = useBookingModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#1A0F0F] text-white sticky top-0 z-50 border-b border-[#D4A755]">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        {/* Logo + Site Name */}
        <div className="flex items-center gap-3">
          {/* Round Golden Logo Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4A755]">
            <svg
              className="h-6 w-6 text-[#D4A755]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Wine/Grapes Icon Design */}
              <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5 0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.88 7 9c0-2.76 2.24-5 5-5z" />
              <circle cx="9" cy="8" r="1.5" />
              <circle cx="15" cy="8" r="1.5" />
              <circle cx="12" cy="10" r="1.5" />
            </svg>
          </div>
          {/* Site Name */}
          <span
            className="font-playfair text-xl text-white"
            style={{ letterSpacing: "0.5px", fontWeight: 600 }}
          >
            WineRoad
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-[2.2rem]">
            {navItems.map((item) => {
              const isTours = item === "Tours";
              const isContact = item === "Contact";
              let href = `#${item.toLowerCase()}`;
              let Component: typeof Link | "a" = "a";
              
              if (isTours) {
                href = "/tours";
                Component = Link;
              } else if (item === "Gallery") {
                href = "/gallery";
                Component = Link;
              } else if (isContact) {
                href = "/contact";
                Component = Link;
              } else if (item === "Home") {
                href = "/";
                Component = Link;
              }
              
              return (
                <Component
                  key={item}
                  href={href}
                  className="font-playfair text-sm font-medium text-white/70 transition-colors hover:text-[#D4A755] lg:text-base"
                >
                  {item}
                </Component>
              );
            })}
          </div>
        </nav>

        {/* BOOK NOW Button - Desktop */}
        <button 
          onClick={openModal}
          className="hidden border border-[#D4A755] bg-transparent font-playfair text-sm font-semibold text-[#D4A755] transition-all hover:bg-[#D4A755] hover:text-[#1A0F0F] md:block"
          style={{ padding: "8px 20px", borderRadius: "4px" }}
        >
          BOOK YOUR TOUR
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/70 hover:text-[#D4A755] transition-colors"
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
        <div className="border-t border-[#D4A755]/30 bg-[#1A0F0F] md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isTours = item === "Tours";
                const isContact = item === "Contact";
                let href = `#${item.toLowerCase()}`;
                let Component: typeof Link | "a" = "a";
                
                if (isTours) {
                  href = "/tours";
                  Component = Link;
                } else if (item === "Gallery") {
                  href = "/gallery";
                  Component = Link;
                } else if (isContact) {
                  href = "/contact";
                  Component = Link;
                } else if (item === "Home") {
                  href = "/";
                  Component = Link;
                }
                
                return (
                  <Component
                    key={item}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-playfair text-base font-medium text-white/70 transition-colors hover:text-[#D4A755]"
                  >
                    {item}
                  </Component>
                );
              })}
              <button 
                onClick={openModal}
                className="mt-2 w-full rounded-full border border-[#D4A755] bg-transparent px-4 py-2 font-playfair text-sm font-semibold text-[#D4A755] transition-all hover:bg-[#D4A755] hover:text-[#1A0F0F]"
              >
                BOOK YOUR TOUR
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
