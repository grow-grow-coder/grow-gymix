import { motion, LazyMotion, domAnimation } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle,
  DollarSign,
  Globe,
  GraduationCap,
  Lightbulb,
  LogIn,
  Megaphone,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  UserCheck,
  Users,
  Zap,
  Calendar,
  MessageCircle
} from 'lucide-react';

import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';


// Direct imports for maximum performance - no loading delays
import FeatureCard from "@/components/pages/landing-page/FeatureCard";
import HeroCards from "@/components/pages/landing-page/HeroCards";
import Logo from "@/components/pages/landing-page/Logo";
import UltraFastLoader from "@/components/pages/landing-page/UltraFastLoader";
import { Badge } from "@/components/pages/landing-page/Badge";
import Button from "@/components/pages/landing-page/Button";

// Define features data
const features = [
  {
    title: "Admin Portal",
    description: "Comprehensive administrative dashboard for school management",
    icon: Shield,
    image: "/assets/admin-portal.jpg",
    gradient: "from-blue-500 to-purple-600",
    href: "/admin-dashboard"
  },
  {
    title: "Teacher Hub",
    description: "Powerful tools for educators to manage classes and students",
    icon: GraduationCap,
    image: "/assets/teacher-hub.jpg",
    gradient: "from-green-500 to-teal-600",
    href: "/teacher-portal"
  },
  {
    title: "Student Portal",
    description: "Interactive learning environment for students",
    icon: BookOpen,
    image: "/assets/student-portal.jpg",
    gradient: "from-orange-500 to-red-600",
    href: "/student-dashboard"
  },
  {
    title: "Parent Access",
    description: "Stay connected with your child's educational journey",
    icon: Users,
    image: "/assets/parent-access.jpg",
    gradient: "from-pink-500 to-rose-600",
    href: "/parent-portal"
  },
  {
    title: "Finance Management",
    description: "Complete financial oversight and billing management",
    icon: DollarSign,
    image: "/assets/finance.jpg",
    gradient: "from-yellow-500 to-orange-600",
    href: "/finance-dashboard"
  },
  {
    title: "Marketing Hub",
    description: "Promote your institution with powerful marketing tools",
    icon: Megaphone,
    image: "/assets/marketing.jpg",
    gradient: "from-indigo-500 to-blue-600",
    href: "/marketing-hub"
  }
];

// Define testimonials data
const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Principal, Greenwood Academy",
    content: "GROW YouR NEED has revolutionized how we manage our school. The AI-powered insights have helped us improve student outcomes by 40%."
  },
  {
    name: "Michael Chen",
    role: "IT Director, Metro School District",
    content: "The platform's integration capabilities are outstanding. We've streamlined all our educational processes into one cohesive system."
  },
  {
    name: "Emily Rodriguez",
    role: "Teacher, Lincoln Elementary",
    content: "As an educator, I love how intuitive the teacher portal is. It saves me hours each week and helps me focus on what matters most - teaching."
  }
];

function App() {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auth state from Convex Auth
  const { isAuthenticated } = useAuth();
  const isSignedIn = isAuthenticated;

  // Handle testimonial changes
  const handleTestimonialChange = useCallback((index: number) => {
    setActiveTestimonial(index);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gradient-to-br from-[#0f1f42] via-[#112250] to-[#1a2b5c] text-white overflow-x-hidden">
        {/* 🚀 REVOLUTIONARY CUTTING-EDGE NAVIGATION */}
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
                <Link to="/" className="flex items-center space-x-3 relative group">
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
                  { to: "/", label: "WHO.we.ARE" },
                  { to: "/pages/features", label: "OuR.Features" },
                  { to: "/pages/consultation", label: "Get a Free Consultation" }
                ].map((item, index) => (
                  <React.Fragment key={item.label}>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.3 }}
                    >
                      <Link
                        to={item.to}
                        className="relative px-6 py-3 text-[#D9CBC2] hover:text-white transition-all duration-300 rounded-xl group overflow-hidden"
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

              {/* 🚀 STUNNING AUTH SECTION */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="relative flex items-center space-x-4"
              >
                {isSignedIn ? (
                  <Link to="/admin-dashboard">
                    {/* DASHBOARD BUTTON - Complex holographic design */}
                    <motion.div className="relative group">
                      <motion.div className="relative bg-gradient-to-br from-[#4C68C0] via-[#5C78D0] to-[#4C68C0] text-white font-bold px-8 py-4 rounded-xl">
                        <div className="relative z-10 flex items-center justify-center space-x-3">
                          <BarChart3 className="w-5 h-5" />
                          <span className="text-lg font-black tracking-wide">DASHBOARD</span>
                          <span>→</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </Link>
                ) : (
                  <Link to="/pages/login">
                    {/* SIGN IN BUTTON - Complex holographic design */}
                    <motion.div className="relative group">
                      <motion.div className="relative bg-gradient-to-br from-[#E0B58F] via-[#F0C59F] to-[#E0B58F] text-[#112250] font-bold px-8 py-4 rounded-xl">
                        <div className="relative z-10 flex items-center justify-center space-x-3">
                          <LogIn className="w-5 h-5" />
                          <span className="text-lg font-black tracking-wide">SIGN IN</span>
                          <span>→</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* 🚀 REVOLUTIONARY HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
          {/* 🌟 STUNNING HERO BACKGROUND EFFECTS */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#E0B58F]/15 to-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-[#4C68C0]/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="relative">
              {/* 💫 CUTTING-EDGE CONTENT GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-20">
                {/* 🌟 LEFT CONTENT - REVOLUTIONARY QUANTUM FRAME */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative p-6 lg:p-10 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/8 via-white/4 to-white/2 border border-white/15 shadow-2xl space-y-8 mt-4"
                >
                  <div className="space-y-6">
                    {/* 🌟 STUNNING BADGE */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="flex items-center space-x-2"
                    >
                      <Badge className="bg-gradient-to-r from-[#E0B58F]/20 to-[#4C68C0]/20 text-[#E0B58F] border border-[#E0B58F]/30 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Star className="w-4 h-4 mr-2" />
                        Educational SaaS Platform
                      </Badge>
                    </motion.div>

                    {/* 🚀 REVOLUTIONARY TITLE */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-5xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight"
                      style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                    >
                      <span className="bg-gradient-to-r from-[#F5F0E9] via-[#E0B58F] to-[#4C68C0] bg-clip-text text-transparent drop-shadow-2xl">
                        GROW
                      </span>
                      <motion.span
                        className="text-[#F5F0E9] italic font-light relative inline-block mx-3"
                        style={{
                          fontFamily: 'Georgia, "Times New Roman", serif',
                          textShadow: '0 0 30px rgba(245, 240, 233, 0.5), 0 0 60px rgba(224, 181, 143, 0.3)',
                          transform: 'skew(-8deg)'
                        }}
                        animate={{
                          textShadow: [
                            '0 0 30px rgba(245, 240, 233, 0.5), 0 0 60px rgba(224, 181, 143, 0.3)',
                            '0 0 40px rgba(245, 240, 233, 0.7), 0 0 80px rgba(224, 181, 143, 0.5)',
                            '0 0 30px rgba(245, 240, 233, 0.5), 0 0 60px rgba(224, 181, 143, 0.3)'
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                      >
                        YouR
                      </motion.span>
                      <span className="bg-gradient-to-r from-[#4C68C0] via-[#E0B58F] to-[#F5F0E9] bg-clip-text text-transparent drop-shadow-2xl">
                        NEED
                      </span>
                    </motion.h1>

                    {/* 🌟 STUNNING DESCRIPTION */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-xl lg:text-2xl text-[#D9CBC2] leading-relaxed max-w-2xl"
                    >
                      Comprehensive educational management system designed for schools, teachers, students, and parents.
                      <span className="text-[#E0B58F] font-semibold"> Experience the future of education technology</span> with AI-powered insights and seamless integration.
                    </motion.p>

                    {/* 🚀 STUNNING FEATURE HIGHLIGHTS */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="flex flex-row items-center justify-start gap-2 sm:gap-3 max-w-2xl overflow-x-auto scrollbar-hide"
                    >
                      {[
                        { icon: Zap, text: "Lightning Fast", color: "#E0B58F" },
                        { icon: Shield, text: "Secure & Reliable", color: "#4C68C0" },
                        { icon: Lightbulb, text: "AI-Powered", color: "#2A2E70" }
                      ].map((highlight, index) => {
                        const Icon = highlight.icon;
                        return (
                          <motion.div
                            key={highlight.text}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                            className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 hover:scale-105 transition-transform duration-300 group flex-shrink-0 min-w-fit"
                          >
                            <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-gradient-to-r from-white/10 to-white/5">
                              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: highlight.color }} />
                            </div>
                            <span className="text-[#F5F0E9] font-medium text-xs sm:text-sm whitespace-nowrap">{highlight.text}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>

                  {/* 🚀 REVOLUTIONARY CTA BUTTONS */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="flex flex-row gap-6 items-center justify-center flex-wrap"
                  >
                    <Link to="/pages/login">
                      <Button
                        size="default"
                        className="relative bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#F0C59F] hover:to-[#E4B584] text-[#112250] font-bold text-base px-6 py-3 rounded-xl shadow-2xl hover:shadow-[#E0B58F]/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-[#E0B58F]/30 overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center justify-center space-x-2 relative z-10">
                          <Rocket className="w-4 h-4" />
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </Button>
                    </Link>
                    <Link to="/pages/features">
                      <Button
                        variant="outline"
                        size="default"
                        className="relative border-2 border-[#E0B58F]/60 text-[#E0B58F] hover:bg-[#E0B58F]/20 hover:border-[#E0B58F] font-bold text-base px-6 py-3 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-[#E0B58F]/20 overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E0B58F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center justify-center space-x-2 relative z-10">
                          <Target className="w-4 h-4" />
                          <span>View Features</span>
                          <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

        {/* 🌟 RIGHT CONTENT - HERO CARDS */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mt-8 lg:mt-0 order-first lg:order-last"
        >
          <div className="flex flex-col items-center relative z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-[#E0B58F]/10 via-[#4C68C0]/5 to-transparent rounded-full blur-3xl scale-150" />
              <HeroCards className="w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto relative z-10" />
            </div>

            {/* 🌟 HERO CARDS DESCRIPTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center -mt-8 relative z-10"
            >
              <div className="relative p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20">
                <h3 className="text-lg sm:text-xl font-bold text-[#F5F0E9] leading-relaxed max-w-lg mx-auto">
                  <span className="font-extrabold tracking-wide">
                    AI-Powered Education - Experience the future
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#F5F0E9] via-[#E0B58F] to-[#4C68C0] bg-clip-text text-transparent font-bold italic block mt-4 text-xl">
                    Of Learning with INTELLIGENT SYSTEM
                  </span>
                </h3>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>
{/* Statistics Section */}
<section className="relative py-20 px-4">
  <div className="container mx-auto max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-xl border border-[#E0B58F]/30 rounded-full px-6 py-3 mb-8"
      >
        <Sparkles className="w-5 h-5 text-[#E0B58F]" />
        <span className="text-[#E0B58F] font-semibold">Trusted Worldwide</span>
        <Sparkles className="w-5 h-5 text-[#E0B58F]" />
      </motion.div>

      <h2 className="text-4xl lg:text-6xl font-black text-[#F5F0E9] mb-6 leading-tight">
        <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
          Empowering Education
        </span>
        <br />
        <span className="text-[#F5F0E9]">Across the Globe</span>
      </h2>
      <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto leading-relaxed">
        Join thousands of educational institutions worldwide who trust GROW YouR NEED
        to transform their learning environments with cutting-edge technology.
      </p>
    </motion.div>
    

    {/* Features Section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F0E9] mb-6">
        Powerful Portals for Every Role
      </h2>
      <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto">
        Tailored experiences for administrators, teachers, students, parents, and staff members
      </p>
    </motion.div>

    <div className="glass-skeuomorphism p-8 relative">
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 relative z-10">
        {features.map((feature, index) => (
          <Link key={feature.title} to={feature.href}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              image={feature.image}
              gradient={feature.gradient}
              delay={index * 0.1}
            />
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>
{/* 🚀 STUNNING IMAGE WITH CONTENT SECTION */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
  {/* 🌟 LEFT SIDE - CUTTING-EDGE IMAGE WITH FRAME */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="relative"
  >
    {/* 💫 REVOLUTIONARY FRAME BORDER */}
    <div className="relative p-2 rounded-3xl bg-gradient-to-br from-[#E0B58F]/30 via-[#4C68C0]/20 to-[#2A2E70]/30">
      <div className="relative p-3 rounded-2xl bg-gradient-to-br from-[#4C68C0]/20 via-[#E0B58F]/15 to-[#2A2E70]/25">
        <div className="relative overflow-hidden rounded-xl">
          {/* 🌟 STUNNING GLOW EFFECTS */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E0B58F]/20 to-[#4C68C0]/20 rounded-xl blur-xl"></div>
          <img
            src="/assets/logo/4ab7c16e-f638-453f-915c-948a26eeae70.png"
            alt="Educational Excellence"
            className="relative z-10 w-full h-auto rounded-xl shadow-2xl"
          />
          {/* 💫 CUTTING-EDGE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
        </div>
      </div>
    </div>
  </motion.div>

  {/* 🌟 RIGHT SIDE - CONTENT */}
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
    className="space-y-8"
  >
    <div>
      <h3 className="text-3xl lg:text-4xl font-bold text-[#F5F0E9] mb-4">
        <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
          Transforming Education
        </span>
        <br />
        <span className="text-[#F5F0E9]">Worldwide</span>
      </h3>
      <p className="text-lg text-[#D9CBC2] leading-relaxed">
        Join thousands of educational institutions worldwide who trust GROW YouR NEED
        to transform their learning environments with cutting-edge technology and innovative solutions.
      </p>
    </div>

    {/* 🚀 KEY HIGHLIGHTS */}
    <div className="space-y-4">
      {[
        { icon: Globe, text: "Global Educational Network", color: "#4C68C0" },
        { icon: Users, text: "Millions of Active Users", color: "#E0B58F" },
        { icon: GraduationCap, text: "Trusted by Institutions", color: "#2A2E70" }
      ].map((highlight, index) => {
        const Icon = highlight.icon;
        return (
          <motion.div
            key={highlight.text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <Icon className="w-6 h-6" style={{ color: highlight.color }} />
            </div>
            <span className="text-[#F5F0E9] font-semibold text-lg">{highlight.text}</span>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
</div>

{/* 🌟 QUANTUM SECTION SEPARATOR */}
<div className="relative py-8 overflow-hidden mb-16">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E0B58F]/10 to-transparent"></div>
  <div className="flex items-center justify-center space-x-4">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut"
        }}
        className={`w-2 h-2 rounded-full ${
          i === 2 ? 'bg-[#E0B58F]' : 'bg-[#4C68C0]/60'
        }`}
      />
    ))}
  </div>
</div>
{/*  Why Choose Us Section */}
<section className="relative py-20 px-4 z-10">
  <div className="container mx-auto max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-xl border border-[#E0B58F]/30 rounded-full px-6 py-3 mb-8"
      >
        <Target className="w-5 h-5 text-[#E0B58F]" />
        <span className="text-[#E0B58F] font-semibold">Why Choose GROW YouR NEED</span>
        <Target className="w-5 h-5 text-[#E0B58F]" />
      </motion.div>

      <h3 className="text-4xl lg:text-6xl font-black text-[#F5F0E9] mb-6 leading-tight">
        <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
          Trusted by Educational
        </span>
        <br />
        <span className="text-[#F5F0E9]">Leaders Worldwide</span>
      </h3>
      <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto leading-relaxed">
        Experience the difference with our comprehensive platform designed specifically
        for modern educational institutions and their unique challenges.
      </p>
    </motion.div>

    {/* Benefits Grid */}
    <div className="glass-skeuomorphism mb-16 p-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {[
          {
            icon: Lightbulb,
            title: "AI-Powered Innovation",
            description: "Cutting-edge artificial intelligence to enhance learning experiences and administrative efficiency.",
            gradient: "from-yellow-500 to-orange-500",
            features: ["Smart Analytics", "Predictive Insights", "Automated Workflows"]
          },
          {
            icon: Zap,
            title: "Lightning Fast Performance",
            description: "Optimized for speed with cloud-native architecture ensuring instant response times.",
            gradient: "from-blue-500 to-purple-500",
            features: ["Sub-second Loading", "Real-time Updates", "Global CDN"]
          },
          {
            icon: CheckCircle,
            title: "Proven Success Rate",
            description: "98% customer satisfaction with measurable improvements in educational outcomes.",
            gradient: "from-green-500 to-emerald-500",
            features: ["Verified Results", "Case Studies", "ROI Tracking"]
          }
        ].map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative card-glass-skeuomorphism p-8 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h4 className="text-2xl font-bold text-[#F5F0E9] mb-4 group-hover:text-[#E0B58F] transition-colors">
                {benefit.title}
              </h4>
              <p className="text-[#D9CBC2] mb-6 leading-relaxed">
                {benefit.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {benefit.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-[#D9CBC2]">
                    <div className="w-1.5 h-1.5 bg-[#E0B58F] rounded-full flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>

    {/* Trust Indicators */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="card-glass-skeuomorphism p-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-[#112250]" />
        </div>
        <h4 className="text-2xl font-bold text-[#F5F0E9] mb-4">Enterprise Security</h4>
        <p className="text-[#D9CBC2]">
          Bank-level encryption and security protocols to protect your educational data
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="card-glass-skeuomorphism p-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-8 h-8 text-[#112250]" />
        </div>
        <h4 className="text-2xl font-bold text-[#F5F0E9] mb-4">Real-time Analytics</h4>
        <p className="text-[#D9CBC2]">
          Advanced insights and reporting to drive educational excellence and growth
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="card-glass-skeuomorphism p-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8 text-[#112250]" />
        </div>
        <h4 className="text-2xl font-bold text-[#F5F0E9] mb-4">24/7 Support</h4>
        <p className="text-[#D9CBC2]">
          Dedicated support team ready to help your institution succeed
        </p>
      </motion.div>
    </div>

    {/* Call to Action */}
    <div className="glass-skeuomorphism p-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-2xl border border-[#E0B58F]/30 rounded-3xl p-12 text-center relative z-10"
      >
        <h4 className="text-3xl font-bold text-[#F5F0E9] mb-6">
          Ready to Transform Your Educational Institution?
        </h4>
        <p className="text-xl text-[#D9CBC2] mb-8 max-w-2xl mx-auto">
          Join the future of education management with our comprehensive platform designed for modern learning environments.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="./components/pages/login-page/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#F0C59F] hover:to-[#E4B584] text-[#112250] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#E0B58F]/25 border border-[#E0B58F]/30 overflow-hidden group relative"
            >
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <Rocket className="w-5 h-5" />
                <span className="text-lg">Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>
          </Link>
          <Link to="./components/pages/consultation/consultation">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#E0B58F]/60 text-[#E0B58F] hover:bg-[#E0B58F]/20 hover:border-[#E0B58F] font-bold px-8 py-4 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#E0B58F]/20 overflow-hidden group relative"
            >
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <MessageCircle className="w-5 h-5" />
                <span className="text-lg">Get Free Consultation</span>
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </div>
</section>

{/* Testimonials Section */}
<section id="testimonials" className="relative py-20 px-4">
  <div className="container mx-auto max-w-6xl">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h3 className="text-4xl lg:text-5xl font-bold text-[#F5F0E9] mb-6">
        What Our Users Say
      </h3>
      <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto">
        Real feedback from educators and administrators who trust GROW YouR NEED
      </p>
    </motion.div>

    {/* Testimonial Carousel */}
    <div className="glass-skeuomorphism p-8 relative">
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          key={activeTestimonial}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="card-glass-skeuomorphism p-8 md:p-12 text-center"
        >
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-[#F5F0E9] leading-relaxed mb-8">
              &ldquo;{testimonials[activeTestimonial].content}&rdquo;
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-full flex items-center justify-center">
                <span className="text-[#112250] font-bold text-lg">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <h4 className="text-[#F5F0E9] font-semibold text-lg">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-[#D9CBC2]">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTestimonialChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeTestimonial
                  ? 'bg-[#E0B58F] scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

{/*{/* Footer Section */}
<footer className="relative py-16 px-4 bg-gradient-to-br from-[#0f1f42] to-[#112250] border-t border-white/10">
  <div className="container mx-auto max-w-7xl">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {/* Company Info */}
      <div className="space-y-6">
        <Logo size="sm" showText={true} />
        <p className="text-[#D9CBC2] leading-relaxed">
          Transforming education through innovative technology solutions designed for the modern learning environment.
        </p>
        <div className="flex space-x-4">
          {[
            { icon: Globe, label: "Global Reach" },
            { icon: Shield, label: "Secure Platform" },
            { icon: Zap, label: "Fast Performance" }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="w-10 h-10 bg-[#E0B58F]/20 rounded-lg flex items-center justify-center group hover:bg-[#E0B58F]/30 transition-colors"
                title={item.label}
              >
                <Icon className="w-5 h-5 text-[#E0B58F] group-hover:scale-110 transition-transform" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-[#F5F0E9]">Quick Links</h4>
        <ul className="space-y-3">
          {[
            { href: "/", label: "Home" },
            { href: "/pages/features", label: "Features" },
            { href: "/pages/consultation", label: "Get Consultation" },
            { href: "/pages/login", label: "Sign In" }
          ].map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="text-[#D9CBC2] hover:text-[#E0B58F] transition-colors flex items-center space-x-2 group"
              >
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Features */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-[#F5F0E9]">Platform Features</h4>
        <ul className="space-y-3">
          {[
            "Admin Management",
            "Teacher Portal",
            "Student Dashboard",
            "Parent Access",
            "Finance Management",
            "Marketing Hub"
          ].map((feature) => (
            <li key={feature} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#E0B58F] flex-shrink-0" />
              <span className="text-[#D9CBC2]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact & CTA */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-[#F5F0E9]">Get Started Today</h4>
        <p className="text-[#D9CBC2]">
          Ready to transform your educational institution? Start your journey with GROW YouR NEED.
        </p>
        <Link to="./components/pages/consultation/consultation">
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#F0C59F] hover:to-[#E4B584] text-[#112250] font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#E0B58F]/25 border border-[#E0B58F]/30 overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center space-x-2 relative z-10">
              <MessageCircle className="w-4 h-4" />
              <span>Get Free Consultation</span>
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </Button>
        </Link>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <p className="text-[#D9CBC2] text-sm">
        © 2024 GROW YouR NEED. All rights reserved. Empowering education worldwide.
      </p>
      <div className="flex items-center space-x-6 text-sm text-[#D9CBC2]">
        <span className="flex items-center space-x-1">
          <Target className="w-4 h-4 text-[#E0B58F]" />
          <span>Built for Excellence</span>
        </span>
        <span className="flex items-center space-x-1">
          <Lightbulb className="w-4 h-4 text-[#E0B58F]" />
          <span>AI-Powered</span>
        </span>
      </div>
    </div>
  </div>
</footer>

{/* Floating Action Button */}
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 2, duration: 0.6 }}
  className="fixed bottom-8 right-8 z-40"
>
  <Link to="./components/pages/consultation/consultation">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#D4A574] rounded-full shadow-2xl flex items-center justify-center text-[#112250] hover:shadow-[#E0B58F]/25 transition-all duration-300 group"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Rocket className="w-8 h-8 group-hover:scale-110 transition-transform" />
      </motion.div>
    </motion.button>
  </Link>
</motion.div>

{/* Loading Overlay */}
{isLoading && (
  <div className="fixed inset-0 bg-[#112250] z-[9999] flex items-center justify-center">
    <div className="text-center">
      <Logo size="lg" showText={true} className="mb-8" />
      <UltraFastLoader
        size="lg"
        className="text-[#F5F0E9]"
      />
    </div>
  </div>
)}
      </div>
    </LazyMotion>
  );
}

export default App;