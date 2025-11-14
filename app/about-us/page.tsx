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

export default function AboutUs() {
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
        <div className="absolute md:left-2 left-0 top-0 md:top-[46%] h-full flex items-center pl-1 md:pl-4">
          <div className="transform -rotate-90 origin-left whitespace-nowrap">
            <p className="text-white text-xs md:text-sm font-medium border-b border-l border-r pb-2 px-2 tracking-[0.1em]">
              TMX GLOBAL FREIGHT NETWORK
            </p>
          </div>
        </div>

        {/* Right Vertical Social Bar - Consistent with Landing Page */}
        <div className="absolute right-0 top-3 h-full flex items-center pr-1 md:pr-6">
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

      {/* OUR STORY SECTION */}
      <section className="md:py-12 py-4 bg-white">
        <div className="container mx-auto px-3 md:px-0">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image with Contact Bar - Consistent with Landing Page */}
            <div className="space-y-6">
              <div className="relative md:aspect-[3/4] aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/view.png"
                  alt="TMX Global Story"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Contact Bar - Consistent with Landing Page */}
              <div className="bg-gray-100 overflow-hidden flex items-center md:h-20 h-12">
                <div className="bg-purple-900 h-full w-20 flex items-center justify-center">
                  <Mail className="md:w-8 md:h-8 w-4 h-4 text-white" />
                </div>
                <div className="pl-6 pr-8">
                  <p className="font-semibold text-gray-800">Get in Touch</p>
                  <a href="mailto:info@tmxglobal.com" className="text-purple-900 hover:underline text-sm">
                    info@tmxglobal.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Story Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg md:text-3xl font-semibold text-gray-900">[ Our Story ]</h2>
              </div>

              <p className="leading-relaxed text-sm md:text-base text-gray-700">
                Founded in 2018, TMX Global Freight Network emerged from a simple yet powerful vision: to create a truly connected global freight ecosystem where trust, reliability, and innovation are paramount. What started as a network of dedicated logistics professionals has evolved into a comprehensive platform serving 500+ members across 120+ countries.
              </p>

              <p className="leading-relaxed text-sm md:text-base text-gray-700">
                Our journey has been marked by strategic growth, digital transformation, and an unwavering commitment to excellence. Today, we stand as a testament to what's possible when industry expertise meets cutting-edge technology and global collaboration.
              </p>

              {/* Stats Grid - Consistent with Landing Page Style */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {statsData.map((stat, index) => (
                  <div key={index} className="bg-gray-100 p-6 text-center hover:shadow transition-shadow">
                    <stat.Icon className={`w-8 h-8 md:w-12 md:h-12 ${stat.color} mx-auto mb-3`} />
                    <h4 className="text-2xl md:text-4xl font-bold text-gray-800">{stat.number}</h4>
                    <p className="text-xs md:text-sm text-gray-600 mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* MISSION, VISION & VALUES SECTION */}
<section className="py-12 md:py-20 bg-gray-50">
  <div className="container mx-auto px-3 md:px-0">
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-900">[ Our Guiding Principles ]</h2>
    </div>

    <div className="grid md:grid-cols-3 md:gap-0 gap-4 max-w-6xl mx-auto relative">
      {missionVisionData.map((item, index) => (
        <div
          key={index}
          className={`
            ${item.color} ${item.textColor} p-8 border border-gray-200 relative overflow-hidden 
            group  transition-all duration-300
          `}
        >
          {/* Full-height thin line between cards — edge to edge */}
          {index < 2 && (
            <div className="absolute right-0 top-0 bottom-0  hidden md:block" />
          )}

          {/* Content */}
          <div className="relative z-10">
            <item.Icon className="w-12 h-12 md:w-12 md:h-12 mb-4 text-purple-900" />
            <h3 className="text-xl md:text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    

      {/* WHY CHOOSE TMX SECTION */}
      <section className="py-12 md:py-20 bg-purple-950 text-white">
        <div className="container mx-auto px-3 md:px-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-lg md:text-3xl font-semibold text-white">[ Why Choose TMX Global Freight Network]</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                Icon: FaConnectdevelop,
                title: "Global Network",
                description: "Access 500+ verified partners across 120+ countries with local expertise"
              },
              {
                Icon: GiFireShield,
                title: "Risk Management",
                description: "Comprehensive cargo insurance and secure payment solutions"
              },
              {
                Icon: GiMoneyStack,
                title: "Financial Solutions",
                description: "Flexible financing options and competitive rates for all shipments"
              },
              {
                Icon: PiAirplaneTaxiingThin,
                title: "Multi-Modal Expertise",
                description: "Air, sea, and land freight solutions with end-to-end visibility"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-purple-800 p-6 md:p-8 text-center group hover:bg-purple-700 transition-all duration-300 hover:transform hover:scale-105"
              >
                <feature.Icon className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg text-orange-300 md:text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm md:text-base text-purple-100 leading-relaxed">
                  {feature.description}
                </p>
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