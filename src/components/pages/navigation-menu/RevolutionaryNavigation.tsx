'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, BarChart3, Menu, X } from 'lucide-react';
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import Logo from "../landing-page/Logo";
import Button from "../landing-page/Button";

interface NavigationProps {
  currentPage?: string;
}

export default function RevolutionaryNavigation({ currentPage }: NavigationProps) {
  const { user } = useAuth();
  const isSignedIn = !!user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-black/20 via-[#1A1A3A]/30 to-black/20 border-b border-[#E0B58F]/20"
    >
      {/* 🌟 STUNNING NAVIGATION GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E0B58F]/5 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E0B58F]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4C68C0]/40 to-transparent" />

      <div className="container mx-auto px-6 py-4 relative z-20">
        <div className="flex items-center justify-between">
          {/* 🚀 STUNNING LOGO */}
          <motion.div
            whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative"
          >
            <Link href="/" className="flex items-center space-x-3 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#E0B58F]/20 to-[#4C68C0]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Logo size="sm" showText={true} />
            </Link>
          </motion.div>

          {/* 🚀 CUTTING-EDGE NAVIGATION */}
          <nav className="hidden md:flex items-center space-x-1 relative">
            {/* 🌟 STUNNING UNIFIED BORDER FOR NAVIGATION */}
            <div className="absolute inset-0 border-2 border-[#E0B58F]/60 rounded-2xl shadow-lg shadow-[#E0B58F]/20 pointer-events-none">
              {/* 💫 CORNER ACCENTS */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-[#E0B58F] rounded-tl-xl"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-[#4C68C0] rounded-tr-xl"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-[#E0B58F] rounded-bl-xl"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-[#4C68C0] rounded-br-xl"></div>
              
              {/* 💫 SIDE ACCENTS */}
              <div className="absolute top-1/2 -left-1 w-4 h-8 border-l-2 border-[#E0B58F]/80 rounded-l-lg transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-1 w-4 h-8 border-r-2 border-[#4C68C0]/80 rounded-r-lg transform -translate-y-1/2"></div>
              
              {/* 🌟 ANIMATED PARTICLES */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  className={`absolute w-1.5 h-1.5 rounded-full ${
                    i % 2 === 0 ? 'bg-[#E0B58F]/70' : 'bg-[#4C68C0]/70'
                  }`}
                  style={{
                    left: i < 3 ? `${10 + i * 25}%` : `${10 + (i - 3) * 25}%`,
                    top: i < 3 ? '-2px' : 'calc(100% + 2px)'
                  }}
                />
              ))}
            </div>
            
            <div className="flex items-center space-x-1 px-4 py-2 relative z-10">
            {[
              { href: "/", label: "WHO.we.ARE" },
              { href: "/pages/features", label: "OuR.Features" },
              { href: "/pages/consultation", label: "Get a Free Consultation" }
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={`relative px-6 py-3 transition-all duration-300 rounded-xl group overflow-hidden ${
                      currentPage === item.href 
                        ? 'text-[#E0B58F] font-semibold' 
                        : 'text-[#D9CBC2] hover:text-white'
                    }`}
                  >
                    {/* 🌟 STUNNING HOVER EFFECT */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#E0B58F]/10 to-[#4C68C0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#E0B58F]/5 to-[#4C68C0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur" />

                    {/* 💫 CUTTING-EDGE UNDERLINE */}
                    <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#E0B58F] to-[#4C68C0] group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300 rounded-full" />

                    <span className="relative z-10 font-medium">{item.label}</span>
                  </Link>
                </motion.div>
                
                {/* 💫 ELEGANT DIVIDER LINE */}
                {index < 2 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    className="relative mx-2"
                  >
                    <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#E0B58F]/60 to-transparent"></div>
                    <motion.div
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scaleY: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 left-1/2 w-1 h-2 bg-[#4C68C0]/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
            </div>
          </nav>

          {/* 📱 MOBILE MENU BUTTON - Mobile Only */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative p-2.5 rounded-xl bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 border border-[#E0B58F]/30 backdrop-blur-sm hover:bg-[#E0B58F]/30 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#E0B58F]" />
              ) : (
                <Menu className="w-5 h-5 text-[#E0B58F]" />
              )}
            </motion.div>
          </motion.button>

          {/* 🚀 STUNNING AUTH SECTION - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="hidden md:flex relative items-center space-x-4"
          >
            {isSignedIn ? (
              <>
                <Link href="/dashboard" prefetch={true}>
                  <motion.div
                    whileHover={{ scale: 1.08, rotateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative perspective-1000"
                  >
                    {/* 🚀 REVOLUTIONARY HOLOGRAPHIC DASHBOARD PORTAL */}
                    <div className="relative group">
                      {/* 💫 QUANTUM ENERGY FIELD */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#4C68C0]/20 via-[#E0B58F]/30 to-[#4C68C0]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <Button
                        size="sm"
                        className="relative bg-gradient-to-br from-[#4C68C0] via-[#5C78D0] to-[#4C68C0] text-white font-bold px-8 py-4 rounded-xl transition-all duration-500 overflow-hidden group cursor-pointer"
                      >
                        <div className="relative z-10 flex items-center justify-center space-x-3">
                          <motion.div
                            animate={{
                              rotate: [0, -360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="relative"
                          >
                            <BarChart3 className="w-5 h-5" />
                          </motion.div>
                          
                          <span className="text-lg font-black tracking-wide">DASHBOARD</span>
                        </div>
                      </Button>
                    </div>
                  </motion.div>
                </Link>

                {/* Admin Dashboard Link */}
                <Link href="/admin-dashboard" prefetch={true}>
                  <motion.div
                    whileHover={{ scale: 1.08, rotateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative perspective-1000"
                  >
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#E0B58F]/20 via-[#F5F0E9]/30 to-[#E0B58F]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <Button
                        size="sm"
                        className="relative bg-gradient-to-br from-[#E0B58F] via-[#F0C59F] to-[#E0B58F] text-[#112250] font-bold px-8 py-4 rounded-xl transition-all duration-500 overflow-hidden group cursor-pointer"
                      >
                        <div className="relative z-10 flex items-center justify-center space-x-3">
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="relative"
                          >
                            <UserCheck className="w-5 h-5" />
                          </motion.div>

                          <span className="text-lg font-black tracking-wide">ADMIN</span>
                        </div>
                      </Button>
                    </div>
                  </motion.div>
                </Link>
              </>
            ) : (
              <Link href="/pages/login" prefetch={true}>
                <motion.div
                  whileHover={{ scale: 1.08, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative perspective-1000"
                >
                  {/* 🚀 REVOLUTIONARY HOLOGRAPHIC SIGN IN PORTAL */}
                  <div className="relative group">
                    {/* 💫 QUANTUM ENERGY FIELD */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#E0B58F]/20 via-[#4C68C0]/30 to-[#E0B58F]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <Button
                      size="sm"
                      className="relative bg-gradient-to-br from-[#E0B58F] via-[#F0C59F] to-[#E0B58F] text-[#112250] font-bold px-8 py-4 rounded-xl transition-all duration-500 overflow-hidden group cursor-pointer"
                    >
                      <div className="relative z-10 flex items-center justify-center space-x-3">
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                          className="relative"
                        >
                          <UserCheck className="w-5 h-5" />
                        </motion.div>
                        
                        <span className="text-lg font-black tracking-wide">SIGN IN</span>
                      </div>
                    </Button>
                  </div>
                </motion.div>
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* 📱 REVOLUTIONARY MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden fixed top-[80px] left-0 right-0 z-50 bg-gradient-to-br from-[#0F0F23]/98 via-[#1A1A3A]/98 to-[#0F0F23]/98 backdrop-blur-2xl border-b border-[#E0B58F]/30 shadow-2xl"
          >
            {/* Quantum Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E0B58F]/5 via-transparent to-[#4C68C0]/5"></div>

            <div className="container mx-auto px-6 py-8 relative z-10">
              {/* Mobile Navigation Links */}
              <div className="space-y-3 mb-8">
                {[
                  { href: "/", label: "WHO.we.ARE" },
                  { href: "/pages/features", label: "OuR.Features" },
                  { href: "/pages/consultation", label: "Get a Free Consultation" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-5 py-4 rounded-2xl transition-all duration-300 border ${
                        currentPage === item.href
                          ? 'bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/10 text-[#E0B58F] font-bold border-[#E0B58F]/40 shadow-lg'
                          : 'text-[#D9CBC2] hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 border-white/10 hover:border-[#E0B58F]/30'
                      }`}
                    >
                      <span className="font-semibold text-lg">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="border-t border-[#E0B58F]/30 pt-6"
              >
                {isSignedIn ? (
                  <div className="flex flex-col space-y-4">
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#4C68C0] to-[#2A2E70] hover:from-[#5A76D0] hover:to-[#3A3E80] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <BarChart3 className="w-5 h-5 mr-3" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/admin-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#F0C59F] hover:to-[#E4B584] text-[#112250] font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <UserCheck className="w-5 h-5 mr-3" />
                        Admin Dashboard
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/pages/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#F0C59F] hover:to-[#E4B584] text-[#112250] font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <UserCheck className="w-5 h-5 mr-3" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
