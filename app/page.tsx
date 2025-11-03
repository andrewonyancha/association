import Image from "next/image";
import { AlertCircle, Wrench } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 font-sans dark:from-black dark:to-zinc-900 p-4">
      <main className="flex w-full max-w-md flex-col items-center justify-center text-center space-y-8">
        {/* Optional Logo */}
        <Image
          className="dark:invert opacity-80"
          src="/TMXLOGO.webp"
          alt="Logo"
          width={60}
          height={24}
          priority
        />

        {/* Maintenance Icon */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-yellow-400 opacity-20"></div>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500/10 backdrop-blur-sm">
            <Wrench className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Under Maintenance
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            We're working hard to improve your experience.
          </p>
        </div>

        {/* Message */}
        <div className="max-w-sm space-y-4">
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Our site is temporarily down for scheduled maintenance. We'll be back online shortly.
          </p>

         
        </div>

        {/* Optional CTA */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:info@tmxglobal.com"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Contact Support
          </a>
          <a
  href="https://wa.me/254703435553?text=Hello%21%20I%20noticed%20your%20website%20is%20under%20maintenance.%20Could%20you%20please%20update%20me%20on%20the%20current%20status%20and%20estimated%20time%20to%20be%20back%20online%3F%20Thank%20you%21"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
>

 check status
</a>
        </div>

        {/* Footer */}
        <footer className="text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} tmx global freight network. All rights reserved.
        </footer>
      </main>
    </div>
  );
}