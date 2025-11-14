"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiCargoShip } from "react-icons/gi";
import {
  X,
  Calendar,
  MoveRight,
  Briefcase,
  Users,
  ShoppingCart,
  Search,
  ChevronDown,
  UsersRound,
  TrendingUp,
} from "lucide-react";
import { CiMenuBurger } from "react-icons/ci";
import { BsCalendar2Date } from "react-icons/bs";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    "About Us": <GiCargoShip className="w-4 h-4 text-orange-600 group-hover:text-purple-800 transition-colors" />,
    Benefits: <Briefcase className="w-4 h-4 text-orange-600 group-hover:text-purple-800 transition-colors" />,
    Members: <Users className="w-4 h-4 text-orange-600 group-hover:text-purple-800 transition-colors" />,
    Marketplace: <ShoppingCart className="w-4 h-4 text-orange-600 group-hover:text-purple-800 transition-colors" />,
    "Find a Forwarder": <Search className="w-4 h-4 text-orange-600 group-hover:text-purple-800 transition-colors" />,
    More: <ChevronDown className="w-5 h-5 text-orange-600 group-hover:text-purple-800 transition-transform group-hover:rotate-180" />,
    Calendar: <BsCalendar2Date className="w-4 h-4 text-orange-600 group-hover:text-purple-800 transition-colors" />,
    Team: <UsersRound className="w-4 h-4 text-orange-600 group-hover:text-purple-800 transition-colors" />,
    Invest: <TrendingUp className="w-4 h-4 text-orange-600 group-hover:text-purple-800 transition-colors" />,
  };

  const mainMenuItems = [
    { label: "About Us", href: "/about-us" },
    { label: "Benefits", href: "/benefits" },
    { label: "Members", href: "/members" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Find a Forwarder", href: "/find-forwarder" },
  ];

  const moreSubmenu = [
    { label: "Calendar", href: "/calendar" },
    { label: "Team", href: "/team" },
    { label: "Invest", href: "/invest" },
  ];

  return (
    <>
      {/* TOP EVENT BAR */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: scrolled ? -32 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 h-8 bg-purple-950 flex items-center justify-center gap-2 md:gap-6 text-[10px] font-bold text-orange-100 tracking-widest overflow-hidden"
      >
        <Calendar className="w-3 h-3 animate-pulse" />
        <span className="hidden xs:inline">NAIROBI SUMMIT 2025</span>
        <span className="xs:hidden">1st SUMMIT 2026</span>
        <span className="hidden sm:inline">• NOV 28-30</span>
        <motion.a
          href="/events/nairobi-summit-2025"
          className="flex items-center gap-1 pl-0.5 border-b py-0.5 text-orange-100 hover:text-orange-400"
        >
          REGISTER
          <MoveRight className="w-2.5 h-2.5" />
        </motion.a>
      </motion.div>

      {/* MAIN HEADER */}
      <header
        className={`fixed left-0 right-0 z-40 flex items-center bg-gray-50 shadow transition-all duration-500 ${
          scrolled ? "top-0 h-12 lg:h-16" : "top-8 h-10 lg:h-20"
        }`}
      >
        {/* MOBILE LAYOUT */}
        <div className="flex lg:hidden w-full items-center justify-between h-full">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 text-orange-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <CiMenuBurger className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center h-full px-2">
            <Image
              src="/TMXLOGO.webp"
              alt="TMX Global Freight Network"
              width={100}
              height={40}
              priority
              className="h-full w-auto object-contain py-1"
            />
          </Link>

          <motion.a
            href="/join"
            className="bg-orange-600 py-1 h-full text-white font-bold text-sm tracking-wider hover:bg-orange-700 pl-2 flex items-center justify-center min-w-[80px]"
            whileTap={{ scale: 0.95 }}
          >
            Join <MoveRight className="h-3 ml-1" />
          </motion.a>
        </div>

        {/* DESKTOP LAYOUT */}
        <Link
          href="/"
          className="hidden lg:flex items-center h-full px-4 lg:px-6 border-r-4 border-orange-600"
        >
          <Image
            src="/TMXLOGO.webp"
            alt="TMX Global Freight Network"
            width={180}
            height={72}
            priority
            className="h-full w-auto object-contain py-2"
          />
        </Link>

        <nav className="hidden lg:flex items-center justify-center flex-1 gap-9">
          {mainMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-purple-950 font-semibold text-sm tracking-widest hover:text-orange-600 transition-colors relative group flex flex-col items-center"
            >
              <div className="mb-1 transform group-hover:scale-110 transition-transform duration-200">
                {iconMap[item.label]}
              </div>
              <span>{item.label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full duration-300" />
            </Link>
          ))}

          {/* MORE DROPDOWN */}
          <div className="relative">
            <button
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
              className="text-purple-950 font-semibold text-sm tracking-widest hover:text-orange-600 transition-colors relative group flex flex-col items-center"
            >
              <div className="mb-1 transform group-hover:scale-110 transition-transform duration-200">
                {iconMap.More}
              </div>
              <span>More</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full duration-300" />
            </button>

            {/* DROPDOWN MENU */}
            {moreOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/5 mt-0 w-32 bg-white shadow  py-2 z-50"
              >
                {moreSubmenu.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                  >
                    <span className="text-orange-600 group-hover:text-purple-800">
                      {iconMap[sub.label]}
                    </span>
                    <span className="font-medium">{sub.label}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </nav>

        <div className="hidden lg:block h-full">
          <motion.a
            href="/join"
            className="relative flex h-full items-center justify-center bg-orange-600 text-white font-bold text-sm px-10 tracking-widest overflow-hidden group"
            whileHover="hover"
            whileTap="tap"
          >
            <span className="relative z-10 flex items-center gap-3">
              Join Now
              <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1/2 bg-orange-700"
              variants={{ hover: { x: 0 }, tap: { x: "-100%" } }}
              initial={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-orange-700"
              variants={{ hover: { x: 0 }, tap: { x: "100%" } }}
              initial={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.a>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-30 bg-orange-50 backdrop-blur-lg pt-[12%] px-6 lg:hidden"
        >
          <nav className="flex flex-col items-start gap-5">
            {mainMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-purple-900 text-sm border-b border-purple-100 pb-2 w-full hover:text-orange-600 transition-colors group"
              >
                <span className="text-orange-600 group-hover:text-purple-600 transition-colors">
                  {iconMap[item.label]}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* MOBILE: MORE SUBMENU (EXPANDABLE) */}
            <div className="w-full">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-3 text-purple-900 text-sm border-b border-purple-100 pb-2 w-full hover:text-orange-600 transition-colors group"
              >
                <span className="text-orange-600 group-hover:text-purple-600 transition-colors">
                  {iconMap.More}
                </span>
                <span>More</span>
                <ChevronDown
                  className={`w-4 h-4 ml-auto transition-transform ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>

              {moreOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  {moreSubmenu.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 pl-8 py-2 text-sm text-gray-700 hover:text-orange-600 transition-colors group"
                    >
                      <span className="text-orange-600 group-hover:text-purple-800">
                        {iconMap[sub.label]}
                      </span>
                      <span>{sub.label}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.a
              href="/join"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm px-10 py-3 rounded-full shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Now
              <MoveRight className="w-5 h-5" />
            </motion.a>
          </nav>
        </motion.div>
      )}

      {/* SPACER */}
      <div className={scrolled ? "h-12 lg:h-16" : "h-20 lg:h-28"} />
    </>
  );
}