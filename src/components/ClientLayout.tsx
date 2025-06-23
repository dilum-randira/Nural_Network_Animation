"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <Toaster position="top-center" />
      {children}
    </LanguageProvider>
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
                  {t('nav.courses')}
                </Link>                <Link
                  href="/tutorials"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.tutorials')}
                </Link>
                <Link
                  href="/visualizations"
                  className="hover:text-primary transition-colors"
                >
                  Visualizations
                </Link>
                <Link
                  href="/pricing"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.pricing')}
                </Link>
                <div className="relative group">
                  <button className="flex items-center hover:text-primary transition-colors">
                    {t('nav.resources')}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="ml-1"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link 
                        href="/blog" 
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {t('nav.blog')}
                      </Link>
                      <Link 
                        href="/faq" 
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {t('nav.faq')}
                      </Link>
                      <Link 
                        href="/contact"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {t('nav.contact')}
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </nav>
              
              <div className="flex items-center space-x-3">
                <LanguageSelector />
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  )}
                </button>
                <AuthNavigation />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-3">
              <LanguageSelector />
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="fixed top-14 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 z-30 overflow-y-auto md:hidden"
          >
            <div className="p-4">
              <nav className="space-y-3">
                <Link
                  href="/courses"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.courses')}
                </Link>                <Link
                  href="/tutorials"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.tutorials')}
                </Link>
                <Link
                  href="/visualizations"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Visualizations
                </Link>
                <Link
                  href="/pricing"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.pricing')}
                </Link>
                <div className="py-2 px-4">
                  <p className="font-medium mb-2">{t('nav.resources')}</p>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/blog"
                      className="block py-1 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.blog')}
                    </Link>
                    <Link
                      href="/faq"
                      className="block py-1 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.faq')}
                    </Link>
                    <Link
                      href="/contact"
                      className="block py-1 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.contact')}
                    </Link>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.about')}
                </Link>
              </nav>              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <AuthNavigation />
              </div>
            </div>
          </div>
        )}

        <main className="flex-grow pt-16">
          {children}
        </main>

        <footer className="bg-gray-100 dark:bg-gray-900 border-t mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  &copy; {new Date().getFullYear()} Neural Network Explorer. {t('about.copyright')}
                </p>
              </div>
              <div className="flex space-x-4">
                <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  {t('nav.about')}
                </Link>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  {t('nav.contact')}
                </Link>
                <Link href="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  {t('nav.faq')}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Export the layout component wrapped with LanguageProvider
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}
