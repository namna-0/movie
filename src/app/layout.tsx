"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import { NavBar } from "./_components/navirgation/navBar";
import { GenreProvider } from "./_components/providers/genreProvider";
import { SearchProvider } from "./_components/providers/searchProvider";
import { Footer } from "./_components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "1") {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "1" : "0");
  }, [isDark]);
  return (
    <html lang="en">
      <body className={`${isDark ? "dark" : ""} dark:text-white dark:bg-black`}>
        <Suspense>
          <GenreProvider>
            <SearchProvider>
              <NavBar setIsDark={setIsDark} isDark={isDark}></NavBar>
              {children}
              <Footer />
            </SearchProvider>
          </GenreProvider>
        </Suspense>
      </body>
    </html>
  );
}
