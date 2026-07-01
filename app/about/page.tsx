import type { Metadata } from "next";
import Image from "../../components/Image";
import NewsletterForm from "../../components/NewsletterForm";
import Social from "../../components/Social";
import Timeline from "../../components/Timeline";
import Contact from "../../components/Contact";

export const metadata: Metadata = {
  title: "About",
  description: "All about me",
};

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-[90rem] lg:max-w-4xl px-6 lg:px-8">
        <header className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            About
          </h1>
        </header>

        <section className="max-w-4xl">
          <div className="space-y-8 leading-8 tracking-[-0.02rem]">
            <Image
              imgUrl="/kenneth.jpeg"
              alt="Kenneth Kikoole portrait."
              className="block my-6 max-w-[300px] h-auto rounded-xl md:float-right md:my-0 md:ml-6 md:mb-6"
            />
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Hey there! I’m Kenneth Kikoole, a curious, driven software
              engineer who loves turning complex problems into clean, efficient
              code (and sometimes memes). Whether I’m building sleek frontend
              interfaces or wiring up powerful back-end logic, I’m all about
              creating digital experiences that feel just right.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              I’m big on collaboration, clean code, and learning something new
              every day whether that’s a new framework, a clever debugging
              trick, or just how to finally fix that one weird CSS bug.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              When I’m not coding, you’ll probably find me sketching out app
              ideas, nerding out over tech trends, or catching up on way too
              many tabs I swore I’d close yesterday.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Let’s build cool stuff together!
            </p>
          </div>

          <div className="sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0 my-10">
            <a
              href="mailto:kenlubs45@gmail.com"
              className="flex items-center space-x-1 hover:text-primary-500"
            >
              <span className="text-lg">kenlubs45@gmail.com</span>
            </a>
            <div className="flex items-center space-x-4">
              <Social />
            </div>
          </div>
        </section>
      </div>

      <section className="my-16 sm:my-30">
        <div className="mx-auto lg:max-w-4xl">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-10 sm:mb-20">
            Career
          </h2>
        </div>

        <div className="mx-auto lg:max-w-4xl">
          <Timeline />
        </div>
      </section>

      <div className="my-16 sm:my-30">
        <div className="mx-auto lg:max-w-4xl">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-10 sm:mb-20">
            Contact
          </h2>
        </div>

        <div className="mx-auto lg:max-w-4xl">
          <Contact />
        </div>
      </div>

      <div className="mx-auto lg:max-w-4xl my-16 sm:my-30">
        <NewsletterForm />
      </div>
    </div>
  );
}
