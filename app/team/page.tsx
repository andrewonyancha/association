'use client';

import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MoveRight,  } from 'lucide-react';
import {  FaHandshake,   } from "react-icons/fa";

export default function AboutUs() {
  
  return (
    <section className='overflow-hidden -mt-2'>
      {/* HERO SECTION - Consistent with Landing Page */}
      <section className="relative -top-6 min-h-[60vh] flex items-center justify-start overflow-hidden">
        {/* Background Image */}
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

        {/* LEFT VERTICAL TEXT - Consistent with Landing Page */}
        <div className="absolute md:left-2 left-4 top-[43%] md:top-[46%] h-full flex items-center pl-1 md:pl-4">
          <div className="transform -rotate-90 origin-left whitespace-nowrap">
            <p className="text-white text-xs md:text-sm font-medium border-b border-l border-r pb-2 px-2 md:tracking-[0.1em] tracking-[0.4em]">
              TMX GLOBAL FREIGHT NETWORK
            </p>
          </div>
        </div>

        {/* Right Vertical Social Bar - Consistent with Landing Page */}
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
            About TMX Global<br /> <span className='flex'>Excellence. <FaHandshake className='md:mt-2 mt-1 md:ml-2 ml-2'/></span>
          </h1>
          <p className="text-base md:text-xl mb-8 md:mb-10 max-w-2xl">
            Pioneering the future of global freight with innovation, trust, and unparalleled network connectivity across 120+ countries.
          </p>
        </div>
      </section>

            {/* CTA SECTION - Mobile: Image left of text, both above buttons | Desktop: UNCHANGED */}
                 <section className="py-5 md:py-12 bg-purple-50 md:bg-purple-50">
                   <div className="container mx-auto px-3 md:px-0">
                     
                     {/* === DESKTOP LAYOUT (UNCHANGED - EXACTLY AS ORIGINAL) === */}
                     <div className="hidden md:grid md:grid-cols-2 gap-0 items-stretch max-w-6xl mx-auto aspect-auto md:aspect-[3/1] bg-white rounded-2xl overflow-hidden border border-gray-300">
                       {/* Left: Image – full height */}
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
                 
                       {/* Right: Content */}
                       <div className="flex flex-col justify-between p-6 md:p-8 lg:p-12">
                         <div>
                           <h2 className="text-lg md:text-3xl font-semibold text-gray-900 mb-2">
                             Ready to Join Our Global Network?
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
                 
                     {/* === MOBILE LAYOUT ONLY (NEW) === */}
                     <div className="md:hidden bg-white rounded-2xl overflow-hidden border border-gray-300 p-5">
                       {/* Row: Small Image + Text */}
                       <div className="flex gap-3 items-start mb-5">
                         {/* Small Image (80x80) */}
                         <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ">
                           <Image
                             src="/images/contact1.png"
                             alt="TMX Global Network"
                             fill
                             className="object-cover rounded-full"
                             quality={90}
                             sizes="80px"
                           />
                         </div>
                 
                         {/* Text */}
                         <div className="flex-1">
                           <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                             Ready to Join Our Global Network?
                           </h2>
                           <p className="text-sm text-gray-600 mt-1">
                             Become part of the world's most connected freight forwarding community and transform your business.
                           </p>
                         </div>
                       </div>
                 
                       {/* Buttons - Stacked, full width */}
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