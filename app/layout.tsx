import type { Metadata } from "next";
import { Cal_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { GoogleAnalyticsScript } from "../components/GoogleAnalytics";

const calSans = Cal_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kennethkikoole.com"),
  title: "Kenneth Kikoole | Full Stack Developer",
  description: "Welcome to Kenneth Kikoole's portfolio!",
  icons: {
    icon: "/ken.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${calSans.variable} flex h-full bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white`}>
        <ThemeProvider>
          <div className="fixed inset-0 flex justify-center sm:px-8 pointer-events-none">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div
                className="absolute inset-0 z-0
		[background-size:30px_30px]
		[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]
		dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
              />

              <div
                className="pointer-events-none absolute inset-0 z-10
		flex items-center justify-center
		bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]
		dark:bg-black"
              />
            </div>
          </div>
          <div className="relative flex w-full flex-col">
            <Header />
            <main className="flex-auto">
              <div className="sm:px-8 mt-32">
                <div className="mx-auto w-full max-w-7xl lg:px-8">
                  <div className="relative px-4 sm:px-8 lg:px-12">
                    {children}
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <GoogleAnalyticsScript />
      </body>
    </html>
  );
}
