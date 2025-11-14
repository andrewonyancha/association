"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Users,
  DollarSign,
  ShoppingCart,
  Mail as MailIcon,
  ChevronRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "News & Media", href: "/news" },
      ],
    },
    {
      title: "Benefits",
      links: [
        { label: "Freight Forwarding", href: "/services/freight" },
        { label: "Logistics", href: "/services/logistics" },
        { label: "Supply Chain", href: "/services/supply-chain" },
        { label: "Consulting", href: "/services/consulting" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Whitepapers", href: "/whitepapers" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Compliance", href: "/compliance" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  const quickActions = [
    { label: "Become a Member", href: "/join", icon: Users },
    { label: "Invest with Us", href: "/invest", icon: DollarSign },
    { label: "View Marketplace", href: "/marketplace", icon: ShoppingCart },
    { label: "Contact Sales", href: "/contact", icon: MailIcon },
  ];

  return (
    <footer className="bg-purple-950 text-white">
      <div className="max-w-7xl mx-auto">
        {/* QUICK ACTIONS */}
        <div className="border-b border-gray-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <div key={action.label} className="flex">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center flex-1"
                >
                  <Link
                    href={action.href}
                    className="flex items-center gap-4 p-8 hover:bg-purple-900 transition-colors w-full group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-600   flex items-center justify-center group-hover:bg-orange-700 transition-colors">
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                        {action.label}
                      </p>
                      <p className="text-xs text-purple-200 mt-1">
                        Get started →
                      </p>
                    </div>
                  </Link>
                </motion.div>
                {index < quickActions.length - 1 && (
                  <div className="hidden lg:block w-px bg-gray-500 self-stretch" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT - TWO EQUAL HALVES */}
        <div className="border-b border-gray-500">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT HALF */}
            <div className="p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-gray-500">
              {/* Logo & Title */}
              <div className="flex items-center gap-3">
                <Image
                  src="/images/TMXLOGO.webp"
                  alt="TMX Global Freight Network"
                  width={50}
                  height={0}
                  className="h-20 w-auto object-contain"
                  priority
                />
                <span className="text-xl font-bold">TMX Global Freight Network</span>
              </div>

              {/* Description */}
              <p className="text-purple-200 leading-relaxed">
                Connecting global freight networks with innovative logistics
                solutions. Empowering businesses worldwide with reliable supply
                chain management.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-purple-200 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>View park Towers, Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>+254 722 359 463</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaWhatsapp className="w-4 h-4 text-orange-400" />
                  <span>+254 722 359 463</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <span>info@tmxglobal.com</span>
                </div>
              </div>

              

              {/* Follow Us */}
              <div>
                <span className="text-sm text-purple-300">Follow us:</span>
                <div className="flex items-center gap-3 mt-3">
                  {socialLinks.map((social, index) => (
                    <div key={social.label} className="flex items-center">
                      <Link
                        href={social.href}
                        className="w-8 h-8   bg-white/10 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors text-purple-300"
                        aria-label={social.label}
                      >
                        <social.icon className="w-4 h-4" />
                      </Link>
                      {index < socialLinks.length - 1 && (
                        <div className="w-px h-4 bg-gray-500 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT HALF */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-semibold text-white mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="flex items-center gap-2 text-purple-200 hover:text-orange-300 text-sm transition-colors group py-1"
                          >
                            <ChevronRight className="w-3 h-3 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          

          {/* MOBILE TMX DIVIDER */}
          <div className="lg:hidden flex justify-center py-6 border-t border-gray-500">
            <div className="bg-orange-600 text-white font-bold text-xl px-6 py-2  ">
              TMX Global Freight Network
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="py-6 px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-purple-300">
            <span>
              © {currentYear} TMX Global Freight Network. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-orange-300 transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3" />
                Privacy Policy
              </Link>
              <div className="w-px h-4 bg-gray-500" />
              <Link
                href="/terms"
                className="hover:text-orange-300 transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3" />
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}