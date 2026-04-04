"use client";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useNavItems } from "@/hooks/useNavItems";
import { defaultLocale, locales } from "@/i18n/config";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation("common");
  const navItems = useNavItems();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(segments[0] as (typeof locales)[number])
    ? segments[0]
    : defaultLocale;

  const withLocale = (href: string) => {
    if (href === "/") {
      return `/${currentLocale}`;
    }
    return `/${currentLocale}${href}`;
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#D4A755]/25 bg-[#1A0F0F]/95 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md supports-[backdrop-filter]:bg-[#1A0F0F]/88"
      suppressHydrationWarning
    >
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 md:h-[76px] md:px-8">
        {/* Brand — logo fills bar height; header stays compact */}
        <Link
          href={withLocale("/")}
          className="group relative flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-2xl outline-none ring-[#D4A755]/0 transition-[box-shadow,ring-color] focus-visible:ring-2 focus-visible:ring-[#D4A755]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F0F] md:h-[80px] md:w-[80px]"
          aria-label={`Wine Road — ${t("navbar.home")}`}
        >
          <Image
            src="/images/logo-Photoroom.png"
            alt=""
            width={200}
            height={200}
            className="h-full w-full object-contain object-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-transform duration-200 ease-out group-hover:scale-[1.03]"
            priority
            sizes="(max-width: 768px) 120px, 80px"
          />
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-[2.2rem]">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.key}
                  href={withLocale(item.href)}
                  className="font-playfair text-sm font-medium text-white/70 transition-colors hover:text-[#D4A755] lg:text-base"
                >
                  {t(`navbar.${item.key}`)}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* BOOK NOW Button - Desktop */}
        {/* <button
          onClick={openModal}
          className="hidden border border-[#D4A755] bg-transparent font-playfair text-sm font-semibold text-[#D4A755] transition-all hover:bg-[#D4A755] hover:text-[#1A0F0F] md:block"
          style={{ padding: "8px 20px", borderRadius: "4px" }}
        >
          {t("navbar.bookNow")}
        </button> */}

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
                return (
                  <Link
                    key={item.key}
                    href={withLocale(item.href)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-playfair text-base font-medium text-white/70 transition-colors hover:text-[#D4A755]"
                  >
                    {t(`navbar.${item.key}`)}
                  </Link>
                );
              })}
              <LanguageSwitcher />
              {/* Mobile / tablet (&lt; md): Book now hidden — restore if needed
              <button
                onClick={openModal}
                className="mt-2 w-full rounded-full border border-[#D4A755] bg-transparent px-4 py-2 font-playfair text-sm font-semibold text-[#D4A755] transition-all hover:bg-[#D4A755] hover:text-[#1A0F0F]"
              >
                {t("navbar.bookNow")}
              </button>
              */}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
