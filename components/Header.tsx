"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LightDarkToggle from "./LightDarkToggle";

const navItems = [
  { href: "/", text: "Home" },
  { href: "/blog", text: "Blog" },
  { href: "/about", text: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;
    const scrollThreshold = 50;

    function onScroll() {
      const currentScroll = window.scrollY;
      if (currentScroll <= 0) {
        body.classList.remove(scrollUp);
        return;
      }

      if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
        if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
          body.classList.remove(scrollUp);
          body.classList.add(scrollDown);
        } else if (
          currentScroll < lastScroll &&
          body.classList.contains(scrollDown)
        ) {
          body.classList.remove(scrollDown);
          body.classList.add(scrollUp);
        }
        lastScroll = currentScroll;
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="mb-10 sm:mb-0">
      <div
        id="main-header"
        className="fixed w-full z-50 transition duration-500 mb-8 sm:mb-0 px-4 sm:px-10"
      >
        <div
          className="bg-white/80 backdrop-blur-md w-full md:w-2xl mx-auto flex h-12 items-center justify-between
						ring-1 ring-slate-300/50 mt-20 sm:mt-10 mb-8 sm:mb-0 px-4 rounded-lg shadow dark:bg-zinc-900/80 dark:ring-white/10 dark:text-slate-200"
        >
          <Link href="/" className="font-striper-article text-3xl">
            kik<span className="text-primary-500">oo</span>lz
          </Link>

          <div className="flex items-center h-full">
            <nav className="hidden md:block h-full">
              <ul className="flex space-x-6 h-full">
                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`relative flex items-center h-full hover:text-primary-500 transition ${active ? "text-primary-500" : ""
                          }`}
                      >
                        {item.text}
                        {active && (
                          <span className="absolute inset-x-0 -bottom-px h-px bg-primary-500" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="ml-8 flex items-center gap-2">
              <LightDarkToggle />
              <button
                type="button"
                className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1"
                aria-label="Open main navigation"
                onClick={() => setMobileOpen(true)}
              >
                <span className="block w-5 h-0.5 bg-zinc-700 dark:bg-zinc-200" />
                <span className="block w-5 h-0.5 bg-zinc-700 dark:bg-zinc-200" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-60">
          <div
            className="bg-black/50 fixed inset-0 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-x-4 top-8 p-8 bg-white dark:bg-zinc-900 dark:ring-white/10 dark:text-slate-200 shadow-md rounded-2xl">
            <div className="flex justify-end">
              <button
                type="button"
                className="flex flex-col items-center justify-center w-10 h-10 gap-1"
                aria-label="Close main navigation"
                onClick={() => setMobileOpen(false)}
              >
                <span className="block w-5 h-0.5 bg-zinc-700 dark:bg-zinc-200 rotate-45 translate-y-1" />
                <span className="block w-5 h-0.5 bg-zinc-700 dark:bg-zinc-200 -rotate-45 -translate-y-1" />
              </button>
            </div>
            <nav>
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        className={`block py-5 text-3xl text-center ${active ? "text-primary-500" : ""
                          }`}
                        href={item.href}
                      >
                        {item.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
