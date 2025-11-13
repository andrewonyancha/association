'use client';

import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MoveRight, Quote } from 'lucide-react';
import { IoIosPeople } from "react-icons/io";
import { FaGlobe } from "react-icons/fa";
import { PiAirplaneTaxiingThin } from "react-icons/pi";
import { GiBattleship } from "react-icons/gi";
import { PiWarehouseThin } from "react-icons/pi";
import { GiFireShield } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { FaConnectdevelop } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react';

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
        src={`/images/calendar-${index}.jpg`}
        alt={`Calendar ${index}`}
        fill
        className="object-cover hover:scale-105 transition-transform duration-500"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OnPfQAJAgGBjA5h9gAAAABJRU5ErkJggg=="
      />

      {/* Overlay with symmetrical slide animation */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-900/70
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
            ? 'Stay updated with industry events, webinars, and networking opportunities.'
            : 'Access the full TMX Global member calendar and plan your year ahead.'}
        </p>
        <button className="bg-orange-600 text-white px-5 py-2 text-sm font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2">
          View {isLeft ? 'Events' : 'Calendar'}
          <MoveRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});
export default function Home() {
  // ---------- TESTIMONIAL STATE ----------
  const testimonials = [
    { text: "TMX Global transformed our supply chain. Their network and reliability are unmatched.", name: "Michael Chen", country: "Singapore", img: "/images/hero.jpg" },
    { text: "Fast, secure, and always on time. We've scaled globally thanks to their air freight expertise.", name: "Ana López", country: "Spain", img: "/images/hero.jpg" },
    { text: "The best logistics partner we've ever had. Professional, proactive, and cost-effective.", name: "David Kim", country: "South Korea", img: "/images/hero.jpg" },
    { text: "Their warehousing solutions saved us 30% on storage costs. Highly recommend!", name: "Emma Wilson", country: "United Kingdom", img: "/images/hero.jpg" },
    { text: "Seamless sea freight from China to Africa. TMX made it look easy.", name: "Kwame Osei", country: "Ghana", img: "/images/hero.jpg" },
    { text: "Cargo insurance gave us peace of mind. TMX truly cares about client success.", name: "Raj Patel", country: "India", img: "/images/hero.jpg" },
  ];

  function TestimonialCard({
    text,
    name,
    country,
    img,
    isCenter,
  }: {
    text: string;
    name: string;
    country: string;
    img: string;
    isCenter: boolean;
  }) {
    return (
      <div
        className={`
          relative flex flex-col items-center text-center p-6 transition-all duration-500 
          ${isCenter ? "bg-orange-600 text-white scale-105 z-10" : "bg-gray-50 text-gray-800 scale-95"}
        `}
      >
        {/* Quote icon background */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none
            ${isCenter ? "text-white/20" : "text-gray-600/10"}
          `}
        >
          <Quote className="w-16 h-16 md:w-48 md:h-48" />
        </div>

        <p className="relative z-10 text-sm md:text-base leading-relaxed mb-6 flex-grow">
          {text}
        </p>

        <div className="relative z-10 overflow-hidden mb-2 border- border-white aspect-[3/4]">
          <Image
            src={img || "https://via.placeholder.com/64?text=Client"}
            alt={name}
            width={64}
            height={64}
            className="object-cover aspect-[3/4] w-16 h-20 md:w-24 md:h-32"
          />
        </div>

        <h4 className="relative z-10 font-semibold text-sm md:text-base">{name}</h4>
        <p
          className={`
            relative z-10 text-xs md:text-sm
            ${isCenter ? "text-orange-300" : "text-gray-600"}
          `}
        >
          {country}
        </p>
      </div>
    );
  }

  const [centerIdx, setCenterIdx] = useState(0);   // index of the **center** card
  const total = testimonials.length;

  const prev = () => setCenterIdx((i) => (i + 1 + total) % total);
  const next = () => setCenterIdx((i) => (i + 1) % total);

  useEffect(() => {
    const id = setInterval(() => {
      setCenterIdx((i) => (i + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [total]);

  return (
    <section className='overflow-hidden -mt-2' >
      {/* HERO SECTION */}
      <section className="relative -top-6 min-h-screen flex items-center justify-start overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="TMX Global Freight Network"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OnPfQAJAgGBjA5h9gAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        </div>

        {/* Right Vertical Social Bar */}
        <div className="absolute right-0 top-0 h-full flex items-center pr-2 md:pr-12">
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 border border-white/40 flex justify-center">
            <div className="w-0.5 h-2 bg-white/60 mt-1.5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-0 md:py-12 bg-white">
        <div className="container mx-auto px-3 md:px-0">
          <div className="grid md:grid-cols-2 md:gap-12 gap-4 items-start">
            {/* Left: Image + Contact Bar */}
            <div className="space-y-6">
              {/* Image */}
              <div className="relative md:aspect-[4/3] aspect-[3/1] overflow-hidden">
                <Image
                  src="/images/hero.jpg"
                  alt="About TMX Global"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Contact Bar Below Image */}
              <div className="bg-gray-100 overflow-hidden flex items-center md:h-20 h-12">
                {/* Purple Bar */}
                <div className="bg-purple-900 h-full w-20 flex items-center justify-center">
                  <Mail className="md:w-8 md:h-8 w-4 h-4 text-white" />
                </div>
                {/* Email */}
                <div className="pl-6 pr-8">
                  <p className="font-semibold text-gray-800">Get in Touch</p>
                  <a href="mailto:info@tmxglobal.com" className="text-purple-900 hover:underline text-sm">
                    info@tmxglobal.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Text + Feature Boxes */}
            <div className="md:space-y-6 space-y-2">
              {/* Titles */}
              <div>
                <h2 className="text-lg md:text-3xl font-semibold text-gray-900">[ About Us ]</h2>
              </div>

              {/* Description */}
              <p className="leading-relaxed text-sm md:text-base ">
                At TMX Global, we deliver more than just freight — we deliver trust, speed, and global reach. 
                With decades of experience and a network spanning 120+ countries, we ensure your cargo arrives 
                on time, every time. Our commitment to innovation and customer success sets us apart.
              </p>

              {/* Feature Boxes */}
              <div className="grid md:grid-cols-2 md:gap-6 gap-2">
                {/* Box 1 */}
                <div className="bg-gray-100 p-8 text-center md:space-y-4 hover:shadow transition-shadow">
                  <FaGlobe className="md:w-16 md:h-16 h-10 w-10 text-purple-900 mx-auto" />
                  <h4 className="md:text-5xl text-lg font-bold text-gray-800">100 +</h4>
                  <p className="text-gray-600">
                    Countries covered
                  </p>
                </div>

                {/* Box 2 */}
                <div className="bg-gray-100 p-8 text-center md:space-y-4 hover:shadow transition-shadow">
                  <IoIosPeople className="md:w-16 md:h-16 h-10 w-10 text-purple-900 mx-auto" />
                  <h4 className="md:text-5xl text-lg font-bold text-gray-800">500 +</h4>
                  <p className="text-sm text-gray-600">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION – Grid (Large) / Vertical Stack (Mobile) */}
      <section className="py-12">
        <div className="container mx-auto px-3 md:px-0">
          {/* Section titles */}
          <div className="text-center mb-4 md:mb-10">
            <h2 className="text-lg md:text-3xl font-semibold text-gray-900">[ Our Services ]</h2>
          </div>

          {/* LARGE SCREEN: 2x3 Grid - No outer border, internal partitions only */}
          <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2">
            {[
              {
                Icon: GiMoneyStack,
                title: "Financing",
                desc: "Get Finacning for you clients to help complete the logistics process",
                btnText: "Learn More",
              },
              {
                Icon: PiAirplaneTaxiingThin,
                title: "Air Freight",
                desc: "Fastest global air cargo solutions for time-sensitive shipments worldwide.",
                btnText: "Learn More",
              },
              {
                Icon: GiBattleship,
                title: "Sea Freight",
                desc: "Cost-effective ocean shipping for bulk cargo with full container options.",
                btnText: "Learn More",
              },
              {
                Icon: PiWarehouseThin,
                title: "Warehousing",
                desc: "Secure storage, inventory management, and distribution from strategic hubs.",
                btnText: "Learn More",
              },
              {
                Icon: FaConnectdevelop,
                title: "Partnerships",
                desc: "End-to-end supply chain solutions tailored to your business needs.",
                btnText: "Learn More",
              },
              {
                Icon: GiFireShield,
                title: "Cargo Insurance",
                desc: "Comprehensive coverage to protect your goods at every step of the journey.",
                btnText: "Learn More",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className={`
                  p-2 md:p-6 bg-white flex flex-col
                  ${idx % 3 !== 2 ? "border-r border-gray-300" : ""}
                  ${idx < 3 ? "border-b border-gray-300" : ""}
                `}
              >
                <service.Icon className="w-12 h-12 md:w-16 md:h-16 text-orange-500 mx-auto mb-1" />
                <h4 className="text-lg md:text-xl font-bold text-center mb-2">
                  {service.title}
                </h4>
                <p className="text-sm md:text-base  text-center flex-grow">
                  {service.desc}
                </p>
                <button className="mt- mx-auto flex items-center gap-2 text-white border bg-orange-600 mt-4 border-orange-600 px-4 py-1.5 hover:text-purple-950 transition-colors group text-sm">
                  <span>{service.btnText}</span>
                  <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>

          {/* MOBILE: Vertical Column - One item per "card", full width, with border */}
          <div className="md:hidden space-y-6">
            {[
              {
                Icon: GiMoneyStack,
                title: "Financing",
                desc: "Get Finacning for you clients to help complete the logistics process.",
                btnText: "Learn More",
              },
              {
                Icon: PiAirplaneTaxiingThin,
                title: "Air Freight",
                desc: "Fastest global air cargo solutions for time-sensitive shipments worldwide.",
                btnText: "Learn More",
              },
              {
                Icon: GiBattleship,
                title: "Sea Freight",
                desc: "Cost-effective ocean shipping for bulk cargo with full container options.",
                btnText: "Learn More",
              },
              {
                Icon: PiWarehouseThin,
                title: "Warehousing",
                desc: "Secure storage, inventory management, and distribution from strategic hubs.",
                btnText: "Learn More",
              },
              {
                Icon: FaConnectdevelop,
                title: "Partnerships",
                desc: "End-to-end supply chain solutions tailored to your business needs.",
                btnText: "Learn More",
              },
              {
                Icon: GiFireShield,
                title: "Cargo Insurance",
                desc: "Comprehensive coverage to protect your goods at every step of the journey.",
                btnText: "Learn More",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="border border-gray-300 bg-white p-6 flex flex-col w-full mx-auto max-w-md"
              >
                <service.Icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-900 text-center mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-600 text-center flex-grow">
                  {service.desc}
                </p>
                <button className="mt-6 mx-auto flex items-center gap-2 text-black border-2 border-orange-600 px-4 py-1.5 hover:text-purple-950 transition-colors group text-sm">
                  <span>{service.btnText}</span>
                  <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section className="flex flex-col md:flex-row">
        {/* Left Side - Purple Background */}
        <div className="bg-purple-950 text-white p-3 md:p-12 md:w-1/2">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg md:text-3xl font-semibold text-orange-600">[ Our Membership ]</h2>
            <h3 className="text-xl md:text-4xl font-bold text-white md:mt-2 pb-12 mt-1">Join The Network</h3>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Founder Image with 3/4 aspect ratio and gradient overlay */}
              <div className="flex-shrink-0">
                <div className="relative aspect-[3/4] w-110 md:w-64 md:h-72 h-48 overflow-hidden">
                  <Image
                    src="/images/tony.webp"
                    alt="Founder"
                    fill
                    className="object-cover"
                  />
                  {/* Gradient overlay - transparent at top to purple at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-950/0" />
                  {/* Name floating at bottom */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm md:text-base">Sarah Johnson</p>
                    <p className="text-orange-300 text-xs md:text-sm">CEO & Founder</p>
                  </div>
                </div>
              </div>
              
              {/* CEO Message */}
              <div className="flex-1">
                <p className="text-sm pt-3 leading-relaxed mb-6">
                  "As the Founder of TMX Global Freight Network, I invite you to join our growing network of logistics professionals. 
                  Together, we're building the future of global freight with innovation, collaboration, and 
                  unparalleled service excellence. Join us in shaping the industry."
                </p>
                <button className="bg-orange-600 text-white px-6 py-3  hover:bg-orange-700 transition-colors font-semibold flex items-center gap-2">
                  Join Now
                  <MoveRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Orange Background with 5 Compelling Benefits */}
        <div className="bg-orange-600 p-3 md:p-12 md:w-1/2">
          <div className="grid grid-cols-1 gap-4">
            {[
              { 
                shade: "bg-orange-200", 
                benefit: "Africa",
                image: "/images/hero.jpg"
              },
              { 
                shade: "bg-orange-200", 
                benefit: "Asia",
                image: "/images/hero.jpg"
              },
              { 
                shade: "bg-orange-200", 
                benefit: "North America",
                image: "/images/hero.jpg"
              },
              { 
                shade: "bg-orange-200", 
                benefit: "South America",
                image: "/images/hero.jpg"
              },
              { 
                shade: "bg-orange-200", 
                benefit: " Europe",
                image: "/images/hero.jpg"
              },
            ].map((item, index) => (
              <div 
                key={index}
                className={`${item.shade}  flex items-center overflow-hidden hover:shadow-lg transition-shadow`}
              >
                {/* Benefit Image - Touching top, bottom, and left edges */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.benefit}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Benefit Name - Far right */}
                <span className="text-sm md:text-base font-semibold text-purple-900 ml-auto mr-4">
                  {item.benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDAR SECTION – 2 Images with Scroll-Triggered Overlays */}
      <section className="md:pt-16 pt-6">
        <div className="container mx-auto px-3 md:px-0">
          <div className="relative max-w-5xl mx-auto">
            {/* === PURPLE STRIP – Full screen width, behind images === */}
            <div
              className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-48 bg-purple-950 flex items-center justify-center z-0"
              style={{
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
              }}
            />

            {/* === 2 IMAGES WITH ANIMATED OVERLAYS === */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 px-2 md:px-4">
              {[1, 2].map((i) => (
                <CalendarImageWithOverlay key={i} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION – Mobile: 1 card, Desktop: 3-card carousel */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-3 md:px-0">
          {/* Title */}
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-lg md:text-3xl font-semibold text-gray-900">[ Testimonial ]</h2>
          </div>

          {/* === MOBILE: Show only 1 testimonial === */}
          <div className="md:hidden">
            <div className="max-w-sm mx-auto ">
              <TestimonialCard
                {...testimonials[centerIdx]}
                isCenter={true}
              />
            </div>

            {/* Navigation for mobile */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setCenterIdx((i) => (i - 1 + total) % total)}
                className="p-2 bg-orange-600 text-white hover:bg-purple-800 transition-colors rotate-180"
                aria-label="Previous"
              >
                <MoveRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCenterIdx((i) => (i + 1) % total)}
                className="p-2 bg-orange-600 text-white hover:bg-purple-800 transition-colors"
                aria-label="Next"
              >
                <MoveRight className="w-5 h-5" />
              </button>
            </div>

            {/* Optional: Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCenterIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === centerIdx ? "bg-orange-600 w-8" : "bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* === DESKTOP: 3-card carousel (unchanged logic) === */}
          <div className="hidden md:block">
            <div className="relative max-w-5xl mx-auto overflow-hidden">
              {/* Sliding track */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${centerIdx * 33.333}%)`,
                }}
              >
                {/* Render all testimonials in a loop (infinite feel) */}
                {[...testimonials, ...testimonials].map((t, i) => {
                  const pos = (i - centerIdx + total) % total; // 0 = left, 1 = center, 2 = right
                  const isCenter = pos === 1;

                  return (
                    <div
                      key={i}
                      className="flex-shrink-0 w-1/3 px-2 md:px-4"
                    >
                      <TestimonialCard
                        {...t}
                        isCenter={isCenter}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setCenterIdx((i) => (i - 1 + total) % total)}
                className="p-3 bg-orange-600 text-white hover:bg-purple-800 transition-colors rotate-180"
                aria-label="Previous"
              >
                <MoveRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCenterIdx((i) => (i + 1) % total)}
                className="p-3 bg-orange-600 text-white hover:bg-purple-800 transition-colors"
                aria-label="Next"
              >
                <MoveRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE SECTION – full‑bleed on desktop, padded on mobile */}
      <section className="md:border-4 border-orange-600">
        {/* ==== DESKTOP – 4 columns, no outer padding ==== */}
        <div className="hidden md:block">
          <div className="flex">
            {/* 1 – Orange – Explore Marketplace */}
            <div className="bg-orange-600 text-white flex flex-col justify-between p-3 md:p-6   w-1/4 aspect-square ">
              <div>
                <h3 className="text-lg md:text-3xl font-semibold text-white">[ Explore Marketplace ]</h3>
                <p className="text-sm md:text-base leading-relaxed mb-4">
                  Discover real‑time freight opportunities, connect with verified partners,
                  and grow your business globally.
                </p>
              </div>
              <a
                href="/marketplace"
                className="bg-purple-950 text-white px-6 py-3 font-semibold hover:text-purple-950 hover:bg-gray-100 transition-colors inline-flex items-center gap-2 self-start text-sm"
              >
                Go to Marketplace
                <MoveRight className="w-4 h-4" />
              </a>
            </div>

            {/* 2 – Image */}
            <div className="relative w-1/4 overflow-hidden">
              <Image
                src="/images/marketplace.jpg"
                alt="Freight Marketplace"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OnPfQAJAgGBjA5h9gAAAABJRU5ErkJggg=="
              />
            </div>

            {/* 3 – Orange – Register as Trader */}
            <div className="bg-orange-600 text-white flex flex-col justify-between p-3 md:p-6 w-1/4 aspect-square">
              <div>
                <h3 className="text-lg md:text-3xl font-semibold text-white">[ Join as Trader ]</h3>
                <p className="text-sm md:text-base leading-relaxed mb-4">
                  Join our network of trusted logistics professionals. List your services and get direct leads.
                </p>
              </div>
              <a
                href="/register-trader"
                className="bg-purple-950 text-white px-6 py-3 font-semibold hover:bg-gray-100 hover:text-purple-950 transition-colors inline-flex items-center gap-2 self-start text-sm"
              >
                Join Now
                <MoveRight className="w-4 h-4" />
              </a>
            </div>

            {/* 4 – Image */}
            <div className="relative w-1/4 overflow-hidden">
              <Image
                src="/images/trader.jpg"
                alt="Trader Registration"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OnPfQAJAgGBjA5h9gAAAABJRU5ErkJggg=="
              />
            </div>
          </div>
        </div>

        {/* ==== MOBILE – vertical stack with padding ==== */}
        <div className="md:hidden px-0">
          {/* Orange 1 */}
          <div className="bg-orange-600 text-white p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Explore Marketplace</h3>
            <p className="text-sm mb-4">
              Discover real‑time freight opportunities, connect with verified partners.
            </p>
            <a
              href="/marketplace"
              className="bg-white text-orange-600 px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 mx-auto"
            >
              Go to Marketplace
              <MoveRight className="w-4 h-4" />
            </a>
          </div>

          {/* Image 1 */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="Marketplace"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OnPfQAJAgGBjA5h9gAAAABJRU5ErkJggg=="
            />
          </div>

          {/* Orange 2 */}
          <div className="bg-orange-600 text-white p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Register as Trader</h3>
            <p className="text-sm mb-4">
              Join our network and get direct leads.
            </p>
            <a
              href="/register-trader"
              className="bg-white text-orange-600 px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 mx-auto"
            >
              Register Now
              <MoveRight className="w-4 h-4" />
            </a>
          </div>

          {/* Image 2 */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="Trader"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OnPfQAJAgGBjA5h9gAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
      </section>
    </section>
  );
}