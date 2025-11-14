'use client';

import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MoveRight, Quote, Search } from 'lucide-react';
import { IoIosPeople } from "react-icons/io";
import { FaGlobe, FaHandshake, FaLinkedin } from "react-icons/fa";
import { PiAirplaneTaxiingThin } from "react-icons/pi";
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
          absolute inset-0 bg-gradient-to-r from-purple-900/50 to-purple-900/50
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
          relative flex flex-col items-center text-center p-4 transition-all duration-500 
          ${isCenter ? "bg-orange-600 text-white scale-105 z-10" : "bg-gray-50 shadow text-orange-300 scale-95"}
        `}
      >
        {/* Quote icon background */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none
            ${isCenter ? "text-white/20 " : "text-gray-500/5"}
          `}
        >
          <Quote className="w-16 h-16 md:w-60 md:h-60" />
        </div>

        <p className="relative z-10 text-sm leading-relaxed mb-2 px-8 flex-grow">
          {text}
        </p>

        <div className="relative z-10 overflow-hidden mb-2 border- border-white ">
          <Image
            src={img || "https://via.placeholder.com/64?text=Client"}
            alt={name}
            width={64}
            height={64}
            className="object-cover w-32 h-20 md:w-32 md:h-20"
          />
        </div>

        <h4 className="relative z-10 font-semibold text-sm md:text-base">{name}</h4>
        
      </div>
    );
  }

  const [centerIdx, setCenterIdx] = useState(0);
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
    <section className='overflow-hidden -mt-2'>
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

        {/* LEFT VERTICAL TEXT - TMX Global Freight Network */}
        <div className="absolute md:left-4 left-0 top-[32%] h-full flex items-center pl-4 md:pl-8">
          <div className="transform -rotate-90 origin-left whitespace-nowrap">
            <p className="text-white text-xs md:text-sm font-medium border-b border-l border-r pb-2 px-4 tracking-[0.4em]">
             TMX GLOBAL FREIGHT NETWORK 
            </p>
          </div>
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

        {/* HERO CONTENT + BUTTONS */}
        <div className="relative z-10 container mx-auto px-12 md:px-12 max-w-5xl text-white">
          <h1 className="text-4xl md:text-6xl  font-bold mb-4 md:mb-6 leading-tight">
            Global Freight,<br /> <span className='flex'>Connected. <FaHandshake  className='md:mt-2 mt-1 md:ml-2 ml-2'/></span>
          </h1>
          <p className="text-base md:text-xl mb-8 md:mb-10 max-w-2xl">
            Join a trusted network of freight forwarders spanning 120+ countries. Move cargo faster, safer, and smarter.
          </p>

          {/* TWO CALL-TO-ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a
              href="/find-agent"
              className="bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 font-semibold text-sm md:text-base 
                         hover:bg-orange-700 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              Find an Agent
              <Search className="w-4 h-4 animate-bounce transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/join"
              className="bg-white text-purple-900 px-6 md:px-8 py-3 md:py-4 font-semibold text-sm md:text-base 
                         hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group border border-white"
            >
              Join the Network
              <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
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
                  src="/images/view.png"
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

      {/* BENEFITS OF BEING A MEMBER SECTION */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-3 md:px-0">
          {/* Section titles */}
          <div className="text-center mb-4 md:mb-10">
            <h2 className="text-lg md:text-3xl font-semibold text-gray-900">[ Benefits of Being a Member ]</h2>
          </div>

          {/* LARGE SCREEN: 2x3 Grid */}
          <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2">
            {[
              {
                Icon: GiFireShield,
                title: "Cargo Insurance",
                desc: "Protect every shipment with comprehensive, network-backed insurance — giving your clients total peace of mind.",
              },
              {
                Icon: GiMoneyStack,
                title: "Financing for Cargo",
                desc: "Unlock working capital with flexible freight financing. Close bigger deals without cash flow delays.",
              },
              {
                Icon: FaConnectdevelop,
                title: "Global Partnerships",
                desc: "Connect with 500+ vetted agents in 120+ countries. Expand your reach without building from scratch.",
              },
              {
                Icon: IoIosPeople,
                title: "Business Leads",
                desc: "Receive qualified freight inquiries daily. Grow revenue through exclusive network opportunities.",
              },
              {
                Icon: FaGlobe,
                title: "Investment Opportunities",
                desc: "Access joint ventures, shared warehouses, and co-investment in high-growth trade lanes.",
              },
              {
                Icon: PiAirplaneTaxiingThin,
                title: "Priority Freight Routes",
                desc: "Secure preferred rates and capacity on high-demand air, sea, and land corridors — year-round.",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className={`
                  p-2 md:p-6 bg-white flex flex-col border-gray-200
                  ${idx % 3 !== 2 ? "border-r" : ""}
                  ${idx < 3 ? "border-b" : ""}
                `}
              >
                <benefit.Icon className="w-12 h-12 md:w-16 md:h-16 text-orange-600 mx-auto mb-3" />
                <h4 className="text-lg md:text-xl font-bold text-center mb-2 text-purple-900">
                  {benefit.title}
                </h4>
                <p className="text-sm md:text-base text-gray-700 text-center flex-grow">
                  {benefit.desc}
                </p>
                <a
                  href="/join"
                  className="mt-4 mx-auto flex items-center gap-2 text-orange-600 hover:text-purple-900 font-medium text-sm group"
                >
                  Learn More
                  <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>

          {/* MOBILE: Vertical Stack */}
          <div className="md:hidden space-y-6">
            {[
              {
                Icon: GiFireShield,
                title: "Cargo Insurance",
                desc: "Protect every shipment with comprehensive, network-backed insurance.",
              },
              {
                Icon: GiMoneyStack,
                title: "Financing for Cargo",
                desc: "Unlock working capital with flexible freight financing.",
              },
              {
                Icon: FaConnectdevelop,
                title: "Global Partnerships",
                desc: "Connect with 500+ vetted agents in 120+ countries.",
              },
              {
                Icon: IoIosPeople,
                title: "Business Leads",
                desc: "Receive qualified freight inquiries daily.",
              },
              {
                Icon: FaGlobe,
                title: "Investment Opportunities",
                desc: "Access joint ventures and co-investment in high-growth lanes.",
              },
              {
                Icon: PiAirplaneTaxiingThin,
                title: "Priority Freight Routes",
                desc: "Secure preferred rates and capacity on key trade corridors.",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="border border-gray-300 bg-white p-6 flex flex-col w-full mx-auto max-w-md rounded-lg shadow-sm"
              >
                <benefit.Icon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-purple-900 text-center mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-700 text-center flex-grow">
                  {benefit.desc}
                </p>
                <a
                  href="/join"
                  className="mt-4 mx-auto text-orange-600 hover:text-purple-900 font-medium text-sm flex items-center gap-1 group"
                >
                  Learn More
                  <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
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
                <div className="relative aspect-[3/4] w-[92vw] md:w-64 md:h-80 h-64 rounded md:rounded-none overflow-hidden">
                  <Image
                    src="/images/tony.webp"
                    alt="Founder"
                    fill
                    className="object-cover"
                  />
                  {/* Gradient overlay - transparent at top to purple at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-950/0" />
                  {/* Name floating at bottom */}
                  <div className="absolute bg-black/50 text-center w-32 rounded md:rounded jutify-center mx-auto bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm md:text-base">Antony Njenga</p>
                    <p className="text-orange-400 text-xs md:text-sm">Founder</p>
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
        <div className="bg-orange-600 px-2 md:px-8 py-4 md:py-12 md:p-12 md:w-1/2">
          <div className="grid grid-cols-1 md:gap-8 gap-5">
            {[
              { shade: "bg-white", benefit: "Africa Channel ", image: "/images/Africa.svg" },
              { shade: "bg-white", benefit: "Asia Channel", image: "/images/Asia.svg" },
              { shade: "bg-white", benefit: "North America Channel", image: "/images/North_America.svg" },
              { shade: "bg-white", benefit: "South America Channel", image: "/images/South_America.svg" },
              { shade: "bg-white", benefit: "Europe Channel", image: "/images/Europe.svg" },
            ].map((item, index) => (
              <div 
                key={index}
                className={`${item.shade} flex items-center justify-between overflow-hidden rounded-full shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="relative w-14 h-14 m-1 md:w-18 md:h-18 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.benefit}
                    fill
                    className="rounded-full grayscale shadow-2xl object-cover"
                  />
                </div>
                <span className="text-sm md:text-base font-semibold text-gray-700 mx-auto text-center flex-1">
                  {item.benefit}
                </span>
                <a
                  href="/join"
                  className="bg-purple-950 text-white px-4 py-5 text-xs md:text-sm rounded-r-full font-semibold hover:bg-orange-700 transition-colors flex items-center gap-1 mr-2"
                >
                  Join 
                  <MoveRight className="w-3 h-3 md:w-4 md:h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDAR SECTION – 2 Images with Scroll-Triggered Overlays */}
      <section className="md:pt-16 pt-6">
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

      {/* TESTIMONIAL SECTION – Mobile: 1 card, Desktop: 3-card carousel */}
      <section className="pt-12 pb-2">
        <div className="container mx-auto px-3 md:px-0">
          {/* Title */}
          <div className="text-center mb-10 md:mb-8">
            <h2 className="text-lg md:text-3xl font-semibold text-gray-900">[ Testimonial ]</h2>
          </div>

          {/* MOBILE: Show only 1 testimonial */}
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

            
          </div>

          {/* DESKTOP: 3-card carousel */}
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
            <div className="flex justify-center gap-4 mt-3">
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
  {/* Executive Leadership – 5 Members Balanced Layout */}
<section className="py-12 bg-gray-50">
  <div className="container mx-auto">
    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="text-lg md:text-left text-center md:text-3xl font-semibold text-gray-900">
        [ Executive Leadership ]
      </h2>
    </div>

    {/* Leadership Team - 5 Members Balanced Layout */}
    <div className="flex flex-col lg:flex-row items-stretch justify-center gap-2 max-w-7xl mx-auto">
      
      {/* LEFT: 2 stacked cards */}
      <div className="flex flex-col gap-4 lg:w-1/3">
        {[
          {
            name: "Madhu Sarkar",
            position: "Director Marketing",
            image: "/images/Madhu-Sarkar.jpeg",
            bgImage: "/images/Madhu-Sarkar.jpeg",
            linkedin: "#"
          },
          {
            name: "Andrew Onyancha",
            position: "Director of Technology",
            image: "/images/drew.jpeg",
            bgImage: "/images/drew.jpeg",
            linkedin: "#"
          }
        ].map((member) => (
          <div 
            key={member.name}
            className="relative flex items-center gap-2 p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden flex-1"
            style={{
              backgroundImage: `url(${member.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Black 50% Overlay */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Profile Image - SAME HEIGHT as center */}
            <div className="flex-shrink-0 relative z-10">
              <div className="w-32 h-32 md:w-24 md:h-24 overflow-hidden border-2 border-white shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                 <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow text-orange-600 px-3 py-1 text-xs font-semibold">
                {member.position}
              </div>
              </div>
              <a
                href={member.linkedin}
                className="absolute -bottom-1 -right-1 bg-purple-900 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FaLinkedin className="w-3 h-3" />
              </a>
            </div>

            {/* Name & Title ONLY */}
            <div className="flex-1 min-w-0 relative z-10 text-white">
              <h3 className="font-bold md:text-transparent text-lg">{member.name}</h3>
              
              {/* <p className="text-orange-400 text-sm font-bold">{member.position}</p> */}
            </div>
          </div>
        ))}
      </div>

      {/* CENTER: CEO */}
      <div className="lg:w-1/3 flex justify-center my-8 lg:my-0">
        <div 
          className="relative text-center bg-gradient-to-b from-purple-50 to-white p-8 max-w-xs overflow-hidden flex flex-col justify-center h-full"
          style={{
            backgroundImage: `url(/images/tony.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Black 50% Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative z-10">
            <div className="relative mb-6 mx-auto">
              {/* Center Image - Same size as side images */}
              <div className="w-32 h-32 md:w-32 md:h-32 overflow-hidden  shadow-2xl mx-auto">
                <Image
                  src="/images/tony.webp"
                  alt="Antony Njenga - Founder"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-3 py-1 text-xs font-semibold">
                Founder
              </div>
            </div>
            <h3 className="text-xl font-bold text-white md:text-transparent mb-2">Antony Njenga</h3>
            <p className="text-orange-400 font-semibold mb-3 text-transparent">Founder </p>
            <p className="md:text-transparent text-white text-sm leading-relaxed mb-4 px-6 ">
              Visionary leader with 25+ years transforming global logistics through innovation and strategic growth.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 md:text-transparent text-orange-200 hover:text-white transition-colors text-sm font-medium"
            >
              <FaLinkedin className=" w-4 h-4" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT: 2 stacked cards */}
      <div className="flex flex-col gap-4 lg:w-1/3">
        {[
          {
            name: "Christine Awuor",
            position: "Global Cordinator",
            image: "/images/christine.jpeg",
            bgImage: "/images/christine.jpeg",
            linkedin: "#"
          },
          {
            name: "Rose Gakuo",
            position: "Operations Manager",
            image: "/images/Rose.png",
            bgImage: "/images/Rose.png",
            linkedin: "#"
          }
        ].map((member) => (
          <div 
            key={member.name}
            className="relative flex items-center gap-4 p-6 bg-white  hover:shadow-lg transition-all duration-300 group overflow-hidden flex-1"
            style={{
              backgroundImage: `url(${member.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Black 50% Overlay */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Profile Image - SAME HEIGHT as center */}
            <div className="flex-shrink-0 relative z-10">
              <div className="w-32 h-32 md:w-24 md:h-24 overflow-hidden border-2 border-white shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-orange-600 shadow px-3 py-1 text-xs font-semibold">
                {member.position}
              </div>
              </div>
              <a
                href={member.linkedin}
                className="absolute -bottom-1 -right-1 bg-purple-900 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FaLinkedin className="w-3 h-3" />
              </a>
            </div>

            {/* Name & Title ONLY */}
            <div className="flex-1 min-w-0 relative z-10 text-white">
              <h3 className="md:text-transparent font-bold text-lg mb-1">{member.name}</h3>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* MARKETPLACE SECTION – full‑bleed on desktop, padded on mobile */}
      <section className="md:border-b border-white">
        {/* DESKTOP – 4 columns, no outer padding */}
        <div className="hidden md:block">
          <div className="flex">
            {/* 1 – Orange – Explore Marketplace */}
            <div className="bg-orange-600 text-white flex flex-col justify-between p-3 md:p-6 w-1/4 aspect-square">
              <div>
                <h3 className="text-lg md:text-3xl font-semibold text-white pb-2">[ Explore Marketplace ]</h3>
                <p className="text-sm md:text-base leading-relaxed mb-4">
                  Discover real-time freight opportunities, connect with verified partners,
                  and grow your business globally.
                </p>
              </div>
              <a
                href="/marketplace"
                className="bg-white text-purple-950 px-6 py-3 font-semibold hover:text-text-purple-950-950 hover:bg-gray-100 transition-colors inline-flex items-center gap-2 self-start text-sm"
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
                <h3 className="text-lg md:text-3xl font-semibold text-white mb-2">[ Join as Trader ]</h3>
                <p className="text-sm md:text-base leading-relaxed mb-4">
                  Join our network of trusted logistics professionals. List your services and get direct leads.
                </p>
              </div>
              <a
                href="/register-trader"
                className="text-purple-950 bg-white px-6 py-3 font-semibold hover:bg-gray-100 hover:text-purple-950 transition-colors inline-flex items-center gap-2 self-start text-sm"
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

        {/* MOBILE – vertical stack with padding */}
        <div className="md:hidden px-0">
          {/* Orange 1 */}
          <div className="bg-orange-600 text-white p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Explore Marketplace</h3>
            <p className="text-sm mb-4">
              Discover real-time freight opportunities, connect with verified partners.
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
              src="/images/marketplace.jpg"
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
              src="/images/trader.jpg"
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