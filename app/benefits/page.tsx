'use client';

import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MoveRight, Award,  Binoculars, Eye, Clock } from 'lucide-react';
import { IoIosPeople } from "react-icons/io";
import { FaGlobe, FaHandshake,  FaShippingFast, FaShieldAlt } from "react-icons/fa";
import { PiAirplaneTaxiingThin } from "react-icons/pi";
import { GiFireShield } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { FaConnectdevelop } from "react-icons/fa";
import { BiTargetLock } from 'react-icons/bi';

export default function Benefits() {
  // Mission & Vision Cards Data
  const missionVisionData = [
    {
      Icon: BiTargetLock,
      title: "Our Mission",
      description: "To revolutionize global freight forwarding by creating the world's most connected and trusted network, enabling seamless cargo movement across 120+ countries with unmatched reliability and efficiency.",
      color: "bg-white",
      textColor: "text-black"
    },
    {
      Icon: Clock,
      title: "Our Vision",
      description: "To be the leading global freight network that transforms international trade through innovation, collaboration, and exceptional service, making world-class logistics accessible to businesses of all sizes.",
      color: "bg-white",
      textColor: "text-black"
    },
    {
      Icon: Award,
      title: "Our Values",
      description: "Trust, Innovation, Collaboration, and Excellence guide every decision we make and every partnership we build. We're committed to setting new standards in global logistics.",
      color: "bg-white",
      textColor: "text-black"
    }
  ];

  

  // Stats Data
  const statsData = [
    {
      number: "120+",
      label: "Countries Covered",
      Icon: FaGlobe,
      color: "text-purple-900"
    },
    {
      number: "500+",
      label: "Network Members",
      Icon: IoIosPeople,
      color: "text-purple-900"
    },
    {
      number: "10M+",
      label: "Shipments Handled",
      Icon: FaShippingFast,
      color: "text-purple-900"
    },
    {
      number: "99.7%",
      label: "On-Time Delivery",
      Icon: FaShieldAlt,
      color: "text-purple-900"
    }
  ];

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
                  Benefits of being a <br /> <span className='flex'>Member. <FaHandshake className='md:mt-2 mt-1 md:ml-2 ml-2'/></span>
                </h1>
                <p className="text-base md:text-xl mb-8 md:mb-10 max-w-2xl">
                  Pioneering the future of global freight with innovation, trust, and unparalleled network connectivity across 120+ countries.
                </p>
              </div>
            </section>

       {/* BENEFITS OF BEING A MEMBER SECTION */}
            <section className="py-16 -mt-12 bg-gray-50">
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
                        Inquire
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

      {/* CTA SECTION - Consistent with Landing Page */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-3 md:px-0 text-center">
          <h2 className="text-lg md:text-3xl font-semibold text-gray-900 mb-4">Ready to Join Our Global Network?</h2>
          <p className="md:text-base text-sm  text-gray-600 mb-8 max-w-xl px-12  text-left mx-auto">
            Become part of the world's most connected freight forwarding community and transform your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
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
      </section>
    </section>
  );
}