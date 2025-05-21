"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import AuthNavigation from "@/components/auth/AuthNavigation";
import { Toaster } from "sonner";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";

// Create a separate component for language selection
function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div className="relative inline-block text-left">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'si')}
        className="appearance-none pl-3 pr-8 py-1.5 rounded-md text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={t('language')}
      >
        <option value="en">{t('language_english')}</option>
        <option value="si">{t('language_sinhala')}</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
}

// Wrapper component to consume the LanguageContext
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check user preference for dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      if (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }

      // Handle resize events for responsive behavior
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        // Auto-close mobile menu on larger screen sizes
        if (window.innerWidth >= 768) {
          setIsMobileMenuOpen(false);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col">
        <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl md:text-2xl">
                {t('app_title')}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <nav className="flex items-center mr-4 space-x-4">
                <Link
                  href="/courses"
                  className="hover:text-primary transition-colors"
                >
                  Courses
                </Link>
                <Link
                  href="/tutorials"
                  className="hover:text-primary transition-colors"
                >
                  Tutorials
                </Link>
                <Link
                  href="/pricing"
                  className="hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </nav>
              
              {/* Language selector */}
              <LanguageSelector />
              
              <AuthNavigation />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors touch-target"
                aria-label="Toggle dark mode"
              >
                {theme === "light" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              {/* Language selector for mobile */}
              <LanguageSelector />
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors mx-2 touch-target"
                aria-label="Toggle dark mode"
              >
                {theme === "light" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded touch-target"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="18" x2="20" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="md:hidden bg-background border-t animate-fadeIn"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-4 mb-4">
                  <Link
                    href="/courses"
                    className="px-4 py-2 hover:bg-primary/5 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Courses
                  </Link>
                  <Link
                    href="/tutorials"
                    className="px-4 py-2 hover:bg-primary/5 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Tutorials
                  </Link>
                  <Link
                    href="/pricing"
                    className="px-4 py-2 hover:bg-primary/5 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/about"
                    className="px-4 py-2 hover:bg-primary/5 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.about')}
                  </Link>
                </nav>
                <div className="pt-4 border-t">
                  <AuthNavigation />
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="flex-grow mt-16 container mx-auto px-4 py-6 content-container">
          {children}
        </main>

        {/* Responsive Footer */}
        <footer className="bg-gray-50 dark:bg-gray-900 border-t py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">{t('app_title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('footer_description')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 md:gap-4">                <div>
                  <h4 className="font-medium mb-3">{t('quick_links')}</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/courses" className="hover:underline">
                        {t('nav.courses')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/tutorials" className="hover:underline">
                        {t('nav.tutorials')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" className="hover:underline">
                        {t('nav.pricing')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="hover:underline">
                        {t('nav.about')}
                      </Link>
                    </li>
                  </ul>
                </div>                <div>
                  <h4 className="font-medium mb-3">{t('account')}</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/user/profile" className="hover:underline">
                        {t('my_profile')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/user/settings" className="hover:underline">
                        {t('nav.settings') || "Settings"}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-center">
              &copy; {new Date().getFullYear()} {t('app_title')}. All rights reserved.
              <p className="mt-2 text-gray-500 dark:text-gray-400">{t('made_in')}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Main ClientLayout component that provides the LanguageContext
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}