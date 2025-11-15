'use client';

import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, MoveRight, } from 'lucide-react';
import {  FaHandshake,   } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';
import React from 'react';


export default function AboutUs() {
  const CalendarImageWithOverlay = React.memo(function CalendarImageWithOverlay({ index }: { index: number }) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;
  
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { 
          threshold: 0.5,
          rootMargin: '0px 0px -10% 0px'
        }
      );
  
      observer.observe(element);
  
      return () => {
        observer.disconnect();
      };
    }, []);
  
    const isLeft = index === 1;
  
    return (
      <div
        ref={elementRef}
        className="relative aspect-[3/2] overflow-hidden bg-gray-200"
      >
        <Image
          src={`/images/calendr-${index}.jpg`}
          alt={`Calendar ${index}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OnPfQAJAgGBjA5h9gAAAABJRU5ErkJggg=="
        />
  
        {/* Overlay with symmetrical slide animation */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-r from-purple-950/80 to-purple-950/80
            flex flex-col items-center justify-center text-white text-center px-6
            transition-transform duration-700 ease-out
            ${isVisible ? 'translate-x-0' : (isLeft ? '-translate-x-full' : 'translate-x-full')}
          `}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            {isLeft ? 'Upcoming Events' : 'Association Calendar'}
          </h3>
          <p className="text-sm md:text-base mb-4 max-w-xs">
            {isLeft
              ? 'The first Physical event of TMX Global Freight Network is scheduled for 2026 in Nairobi, Kenya. Join us for networking, insights, and growth opportunities.'
              : 'Access the full TMX Global Freight Network member calendar and plan your year ahead.'}
          </p>
          <button className="bg-orange-600 text-white px-5 py-2 text-sm font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2">
            View {isLeft ? 'Event' : 'Calendar'}
            <MoveRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  });
  

  return (
    <section className='mb-12'>
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
       

    </section>
    <section className=" pt-6">
        <div className="container mx-auto px-3 md:px-0">
          <div className="relative max-w-5xl mx-auto">
            {/* PURPLE STRIP – Full screen width, behind images */}
            <div
              className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-48 bg-purple-950 flex items-center justify-center z-0"
              style={{
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
              }}
            />

            {/* 2 IMAGES WITH ANIMATED OVERLAYS */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 px-2 md:px-4">
              {[1, 2].map((i) => (
                <CalendarImageWithOverlay key={i} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
      </section>
  );
}