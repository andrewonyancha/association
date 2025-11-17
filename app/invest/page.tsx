'use client';

import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MoveRight, ExternalLink } from 'lucide-react';
import { FaHandshake } from "react-icons/fa";

// ---------------------------------------------------
// 1. ARRAY OF INVESTMENT OPPORTUNITIES
// ---------------------------------------------------
const investments = [
  {
    id: 1,
    title: "TMX Global Freight Network Association",
    description:
      "Invest in a powerful global logistics network connecting freight forwarders across 120+ countries. Be part of the future of seamless international trade and supply chain innovation.",
    image: "/images/hero.jpg",   // <-- replace with real image
    link: "/join",
    external: false,
  },
  {
    id: 2,
    title: "TMX Gold Coin",
    description:
      "A tokenized gold-backed digital asset offering stability, liquidity, and real-world utility within the TMX ecosystem. Secure your wealth with the power of gold on the blockchain.",
    image: "/images/hero.jpg",  // <-- replace with real image
    link: "https://tmxgoldcoin.co/",
    external: true,
  },
  // ---- ADD NEW ITEMS HERE ----
  // {
  //   id: 3,
  //   title: "New Opportunity",
  //   description: "Description …",
  //   image: "/images/new.jpg",
  //   link: "/new",
  //   external: false,
  // },
];

export default function AboutUs() {
  return (
    <section className="overflow-hidden -mt-2">

      {/* ====================== HERO ====================== */}
      <section className="relative -top-6 min-h-[60vh] flex items-center justify-start overflow-hidden">
        {/* … (hero unchanged) … */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="About TMX Global Freight Network"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OnPfQAJAgGBjA5h9gAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        </div>

        {/* LEFT VERTICAL TEXT */}
        <div className="absolute md:left-2 left-4 top-[43%] md:top-[46%] h-full flex items-center pl-1 md:pl-4">
          <div className="transform -rotate-90 origin-left whitespace-nowrap">
            <p className="text-white text-xs md:text-sm font-medium border-b border-l border-r pb-2 px-2 md:tracking-[0.1em] tracking-[0.4em]">
              TMX GLOBAL FREIGHT NETWORK
            </p>
          </div>
        </div>

        {/* RIGHT SOCIAL BAR */}
        <div className="absolute right-0 top-3 h-full flex items-center pr-2 md:pr-6">
          <div className="flex flex-col items-center gap-8">
            <div className="w-px h-20 bg-white/70" />
            <div className="flex flex-col gap-6">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Instagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-white hover:text-orange-400 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="w-px h-20 bg-white/70" />
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 container mx-auto px-12 md:px-12 max-w-5xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            TMX Global Investment<br />
            <span className="flex">
              Options. <FaHandshake className="md:mt-2 mt-1 md:ml-2 ml-2" />
            </span>
          </h1>
          <p className="text-base md:text-xl mb-8 md:mb-10 max-w-2xl">
            Pioneering the future of global freight with innovation, trust, and unparalleled network connectivity across 120+ countries.
          </p>
        </div>
      </section>

      {/* ====================== INVESTMENT CARDS ====================== */}
      <section className="bg-purple-50 -mt-6 md:pt-12 pt-6">
        <div className="container mx-auto">
          

          {/* 1-col mobile, 2-col md+ */}
          <div className="grid grid-cols-1 px-3 md:px-0 md:grid-cols-2 gap-4 mx-auto">
            {investments.map((inv) => (
              <div
                key={inv.id}
                className="bg-white rounded-lg p-4 overflow-hidden border border-gray-300 flex flex-col md:flex-row"
              >
                {/* MOBILE: Title first */}
                <h3 className="font-semibold text-gray-900 mb-3 md:hidden">
                  {inv.title}
                </h3>

                {/* LEFT – IMAGE - Small on mobile, normal on desktop */}
                <div className="relative overflow-hidden md:w-1/2 h-32 md:h-auto">
                  <Image
                    src={inv.image}
                    alt={inv.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* RIGHT – CONTENT */}
                <div className="flex flex-col justify-between pt-4 md:pt-0 md:pl-4 md:w-2/3">
                  <div>
                    {/* DESKTOP: Title inside content */}
                    <h3 className="font-semibold text-gray-900 mb-1 hidden md:block">
                      {inv.title}
                    </h3>
                    <p className="text-sm text-gray-600">{inv.description}</p>
                  </div>

                  {/* SINGLE BUTTON */}
                  <div className="mt-2">
                    <a
                      href={inv.link}
                      {...(inv.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center justify-center gap-3 bg-orange-600 text-white px-6 py-2 
                                 font-semibold text-sm md:text-base hover:bg-orange-700 
                                 transition-all duration-300 group w-full md:w-auto"
                    >
                      Invest Now
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== ORIGINAL CTA (AFTER CARDS) ====================== */}
      <section className="pt-12 pb-4 md:py-12 bg-purple-50">
        <div className="container mx-auto px-3 md:px-0">
          {/* DESKTOP LAYOUT */}
          <div className="hidden md:grid md:grid-cols-2 gap-0 items-stretch max-w-6xl mx-auto aspect-auto md:aspect-[3/1] bg-white rounded-2xl overflow-hidden border border-gray-300">
            <div className="relative overflow-hidden">
              <Image
                src="/images/contact1.png"
                alt="TMX Global Network Community"
                fill
                className="object-cover"
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col justify-between p-6 md:p-8 lg:p-12">
              <div>
                <h2 className="text-lg md:text-3xl font-semibold text-gray-900 mb-2">
                  Ready to Invest with us?
                </h2>
                <p className="md:text-base text-sm text-gray-600 mb-4">
                  Become part of the world's most connected freight forwarding community and transform your business.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-auto">
                <a
                  href="/join"
                  className="bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 font-semibold text-sm md:text-base 
                             hover:bg-orange-700 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  Join the Network
                  <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/contact"
                  className="bg-purple-900 text-white px-6 md:px-8 py-3 md:py-4 font-semibold text-sm md:text-base 
                             hover:bg-purple-800 transition-all duration-300 flex items-center justify-center gap-2 group border border-purple-900"
                >
                  Contact Us
                  <Mail className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="md:hidden bg-white rounded-2xl overflow-hidden border border-gray-300 p-5">
            <div className="flex gap-3 items-start mb-5">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src="/images/contact1.png"
                  alt="TMX Global Network"
                  fill
                  className="object-cover rounded-full"
                  quality={90}
                  sizes="80px"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                  Ready to Join Our Global Network?
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Become part of the world's most connected freight forwarding community and transform your business.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="/join"
                className="bg-orange-600 text-white px-6 py-3 font-semibold text-sm 
                           hover:bg-orange-700 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Join the Network
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/contact"
                className="bg-purple-900 text-white px-6 py-3 font-semibold text-sm 
                           hover:bg-purple-800 transition-all duration-300 flex items-center justify-center gap-2 group border border-purple-900"
              >
                Contact Us
                <Mail className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </section>
  );
}