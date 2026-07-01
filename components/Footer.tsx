import Social from "./Social";

export default function Footer() {
  const currentYear = new Date().getFullYear();
                
  return (
    <footer className="max-w-2xl mx-auto pb-20 mt-10 pt-20 border-t border-zinc-300 dark:border-zinc-800 px-4 md:px-30 text-center">
      <div>
        © {currentYear}{" "}
        <span className="text-primary-600 hover:text-primary-500 cursor-pointer transition-colors">
          Kenneth Kikoole.
        </span>{" "}
        All rights reserved.
      </div>
      <div className="flex justify-center space-x-6 mt-8">
        <Social />
      </div>
    </footer>
  );
}

