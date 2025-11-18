'use client';

import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MoveRight } from 'lucide-react';
import { FaHandshake, FaUser, FaUserSlash,  } from "react-icons/fa";

export default function AboutUs() {
  
  // Team data with pyramid structure
  const teamStructure = [
    // Level 1 - CEO
    [
      { name: "Antony Njenga", position: "Founder", image: "/images/tony.webp", continent: "Global", occupied: true }
    ],
    // Level 2 - Executive Leadership
    [
      { name: "Madhu Sarkar", position: "Director Marketing", image: "/images/Madhu-Sarkar.jpeg", continent: "Asia", occupied: true },
      { name: "Andrew Onyancha", position: "Director of Technology", image: "/images/drew.jpeg", continent: "Europe", occupied: true }
    ],
    // Level 3 - Senior VPs
    [
      { name: "Christine Awuor", position: "Global Cordinator", image: "/images/christine.jpeg", continent: "North America", occupied: true },
      { name: "Rose Gakuo", position: "Operations Manager", image: "/images/Rose.png", continent: "Asia", occupied: true },
      { name: "Unoccupied", position: "", image: null, continent: "Europe", occupied: false }
    ],
    // Level 4 - Regional Directors
    
    // Level 5 - Continental Representatives (some unoccupied)
    [
      { name: "Unoccupied", position: "", image: null, continent: "North America", occupied: false },
      { name: "Unoccupied", position: "Regions  Cordinator", image: null, continent: "South America", occupied: false },
      { name: "Unoccupied", position: "", image: null, continent: "Africa", occupied: false }
    ],
    
   
  ];

  // Continental representatives data with images
  const continentalReps = [
    { 
      continent: "North America", 
      representative: "Vacant", 
      occupied: false,  
      image: "/images/North_America.svg" // Replace with actual image path
    },
    { 
      continent: "South America", 
      representative: "Vacant", 
      occupied: false, 
      image: "/images/South_America.svg" // Replace with actual image path
    },
    { 
      continent: "Europe", 
      representative: "Vacant", 
      occupied: false,  
      image: "/images/Europe.svg" // Replace with actual image path
    },
    { 
      continent: "Asia", 
      representative: "Vacant", 
      occupied: false,  
      image: "/images/Asia.svg" // Replace with actual image path
    },
    { 
      continent: "Africa", 
      representative: "Christine Awuor", 
      occupied: true, 
      image: "/images/Africa.svg" // Replace with actual image path
    },
    { 
      continent: "Oceania", 
      representative: "Vacant", 
      occupied: false, 
      image: "/images/Africa.svg" // Replace with actual image path
    }
  ];

  // WhatsApp application function
  const handleWhatsAppApply = () => {
    const phoneNumber = "0790407508";
    const message = "Hello! I'm interested in applying for a position at TMX Global Freight Network.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
             TMX Global Network<br /> <span className='flex'>Team. <FaHandshake className='md:mt-2 mt-1 md:ml-2 ml-2'/></span>
          </h1>
          <p className="text-base md:text-xl mb-8 md:mb-10 max-w-2xl">
            Pioneering the future of global freight with innovation, trust, and unparalleled network connectivity across 120+ countries.
          </p>
        </div>
      </section>

      {/* TEAM PYRAMID SECTION */}
      <section className="md:py-4 py-2 bg-purple-50 -mt-6">
        <div className="container mx-auto ">
         

          {/* Pyramid Structure */}
          <div className="flex flex-col items-center space-y-0">
            {teamStructure.map((level, levelIndex) => (
              <div
                key={levelIndex}
                className={`flex flex-wrap justify-center gap-2 ${
                  levelIndex === 0 ? 'mb-2' : 
                  levelIndex === 1 ? 'mb-2' : 
                  levelIndex === 2 ? 'mb-2' : 'mb-2'
                }`}
              >
                {level.map((member, memberIndex) => (
                  <div
                    key={memberIndex}
                    className={`bg-white rounded-lg md:rounded-none  border border-gray-200 p-4 text-center transform transition-transform duration-300 ${
                      levelIndex === 0 ? 'md:w-120 w-112' : 
                      levelIndex === 1 ? 'md:w-110 w-112' : 
                      levelIndex === 2 ? 'md:w-80 w-112' : 
                      levelIndex === 3 ? 'md:w-80 w-112' : 
                      levelIndex === 4 ? 'md:w-80 w-112' : 
                      levelIndex === 5 ? 'md:w-110 w-112' : 'md:w-110 w-112'
                    } ${!member.occupied && member.name === 'Unoccupied' ? 'opacity-60 border-dashed' : ''}`}
                  >
                    <div className="relative mx-auto mb-3">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="rounded-full h-32 w-32 object-cover mx-auto"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                          {member.occupied === false ? (
                            <FaUserSlash className="w-8 h-8 text-gray-400" />
                          ) : (
                            <FaUser className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                      )}
                     
                    </div>
                    <h3 className={`font-semibold text-gray-900 ${
                      levelIndex === 0 ? 'text-xl' : 
                      levelIndex === 1 ? 'text-lg' : 'text-base'
                    }`}>
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{member.position}</p>
                    {member.occupied === false && (
                      <div className="mt-2">
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Position Available
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTINENTAL REPRESENTATIVES SECTION */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-lg md:text-3xl font-semibold text-gray-900">
              [ Continental Representation ]
            </h2>
           
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  max-w-4xl mx-auto">
            {continentalReps.map((rep, index) => (
              <div
                key={index}
                className={`bg-purple-50 border border-white p-6  ${
                  rep.occupied ? '' : ''
                } ${!rep.occupied ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {rep.image ? (
                      <div className="w-8 h-6 relative">
                        <Image
                          src={rep.image}
                          alt={`${rep.continent} flag`}
                          fill
                          className="object-cover rounded grayscale"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-6 bg-gray-200 rounded" />
                    )}
                    {rep.continent}
                  </h3>
                  {rep.occupied ? (
                    <div className="flex items-center gap-1 text-purple-900">
                      <FaUser className="w-4 h-4" />
                      <span className="text-sm font-medium">Occupied</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-orange-600">
                      <FaUserSlash className="w-4 h-4" />
                      <span className="text-sm font-medium">Vacant</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Representative:</strong> {rep.representative}
                  </p>
                  {!rep.occupied && (
                    <div className="mt-3 flex flex-col gap-2">
                     
                      <button
                        onClick={handleWhatsAppApply}
                        className="bg-purple-900 hover:bg-gray-50 text-white hover:text-black  px-4 py-2  flex items-center justify-center gap-2 transition-colors duration-300"
                      >
                      
                        Apply
                        <MoveRight className="w-5 h-5 text-orange-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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