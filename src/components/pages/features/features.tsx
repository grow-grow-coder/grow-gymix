'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  DollarSign,
  GraduationCap,
  Heart,
  Megaphone,
  MessageSquare,
  Monitor,
  PieChart,
  Shield,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  Zap
} from 'lucide-react';
import Link from "next/link";
import { useState } from 'react';

// Import components
import RevolutionaryNavigation from "./../components/shared/RevolutionaryNavigation";
import Button from "./../components/landing-page/Button";
import { Badge } from "./../components/landing-page/Badge";

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const featureCategories = [
    { id: 'all', label: 'All Features', icon: Star },
    { id: 'admin', label: 'Admin Management', icon: Shield },
    { id: 'teacher', label: 'Teacher Portal', icon: GraduationCap },
    { id: 'student', label: 'Student Dashboard', icon: BookOpen },
    { id: 'parent', label: 'Parent Access', icon: UserCheck },
    { id: 'finance', label: 'Finance Management', icon: DollarSign },
    { id: 'marketing', label: 'Marketing Hub', icon: Megaphone }
  ];

  const features = [
    // Admin Features
    {
      category: 'admin',
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive insights with real-time data visualization, performance metrics, and predictive analytics.',
      icon: BarChart3,
      gradient: 'from-blue-500 to-cyan-500',
      image: '/assets/b48fc43d-55ed-4007-8f4c-c15a40723e4a.png',
      benefits: ['Real-time reporting', 'Custom dashboards', 'Data export', 'Predictive insights']
    },
    {
      category: 'admin',
      title: 'User Management System',
      description: 'Complete control over user roles, permissions, and access levels with advanced security features.',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      image: '/assets/b48fc43d-55ed-4007-8f4c-c15a40723e4a.png',
      benefits: ['Role-based access', 'Bulk operations', 'Security monitoring', 'Audit trails']
    },
    {
      category: 'admin',
      title: 'System Monitoring',
      description: 'Monitor system health, performance metrics, and receive alerts for critical issues.',
      icon: Monitor,
      gradient: 'from-green-500 to-emerald-500',
      image: '/assets/b48fc43d-55ed-4007-8f4c-c15a40723e4a.png',
      benefits: ['Performance tracking', 'Alert system', 'Resource monitoring', 'Uptime reports']
    },

    // Teacher Features
    {
      category: 'teacher',
      title: 'Interactive Course Builder',
      description: 'Create engaging courses with multimedia content, quizzes, and interactive elements.',
      icon: BookOpen,
      gradient: 'from-orange-500 to-red-500',
      image: '/assets/teacher.png',
      benefits: ['Drag-drop builder', 'Multimedia support', 'Quiz creation', 'Progress tracking']
    },
    {
      category: 'teacher',
      title: 'AI-Powered Grading',
      description: 'Automated grading system with AI assistance for faster and more accurate assessments.',
      icon: Brain,
      gradient: 'from-indigo-500 to-purple-500',
      image: '/assets/teacher.png',
      benefits: ['Auto-grading', 'AI feedback', 'Rubric creation', 'Grade analytics']
    },
    {
      category: 'teacher',
      title: 'Virtual Classroom',
      description: 'Conduct live classes with video conferencing, screen sharing, and interactive tools.',
      icon: Video,
      gradient: 'from-teal-500 to-blue-500',
      image: '/assets/teacher.png',
      benefits: ['HD video calls', 'Screen sharing', 'Interactive whiteboard', 'Recording']
    },

    // Student Features
    {
      category: 'student',
      title: 'Personalized Learning Path',
      description: 'AI-driven learning recommendations tailored to individual student needs and progress.',
      icon: Target,
      gradient: 'from-pink-500 to-rose-500',
      image: '/assets/60509ee4-ec80-4683-beb6-08232f5b9210.png',
      benefits: ['Adaptive learning', 'Personal recommendations', 'Skill assessment', 'Progress tracking']
    },
    {
      category: 'student',
      title: 'Interactive Study Tools',
      description: 'Comprehensive study materials with flashcards, practice tests, and collaborative features.',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500',
      image: '/assets/60509ee4-ec80-4683-beb6-08232f5b9210.png',
      benefits: ['Digital flashcards', 'Practice tests', 'Study groups', 'Note sharing']
    },
    {
      category: 'student',
      title: 'Progress Analytics',
      description: 'Detailed insights into learning progress with performance metrics and improvement suggestions.',
      icon: TrendingUp,
      gradient: 'from-cyan-500 to-blue-500',
      image: '/assets/60509ee4-ec80-4683-beb6-08232f5b9210.png',
      benefits: ['Performance metrics', 'Learning analytics', 'Goal tracking', 'Improvement tips']
    },

    // Parent Features
    {
      category: 'parent',
      title: 'Real-time Progress Monitoring',
      description: 'Stay updated with your child\'s academic progress through detailed reports and notifications.',
      icon: Heart,
      gradient: 'from-red-500 to-pink-500',
      image: '/assets/family.png',
      benefits: ['Progress reports', 'Grade notifications', 'Attendance tracking', 'Behavior updates']
    },
    {
      category: 'parent',
      title: 'Communication Hub',
      description: 'Direct communication with teachers and school administration through secure messaging.',
      icon: MessageSquare,
      gradient: 'from-green-500 to-teal-500',
      image: '/assets/family.png',
      benefits: ['Teacher messaging', 'School announcements', 'Event notifications', 'Meeting scheduling']
    },

    // Finance Features
    {
      category: 'finance',
      title: 'Automated Billing System',
      description: 'Streamlined billing and payment processing with automated invoicing and payment tracking.',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-green-500',
      image: '/assets/c9485927-27d8-4ae3-9a5e-0a89bee650df.png',
      benefits: ['Auto invoicing', 'Payment tracking', 'Financial reports', 'Tax management']
    },
    {
      category: 'finance',
      title: 'Financial Analytics',
      description: 'Comprehensive financial reporting with revenue tracking and budget management tools.',
      icon: PieChart,
      gradient: 'from-blue-500 to-indigo-500',
      image: '/assets/c9485927-27d8-4ae3-9a5e-0a89bee650df.png',
      benefits: ['Revenue analytics', 'Budget tracking', 'Expense management', 'Financial forecasting']
    },

    // Marketing Features
    {
      category: 'marketing',
      title: 'Campaign Management',
      description: 'Create and manage marketing campaigns with advanced targeting and analytics.',
      icon: Megaphone,
      gradient: 'from-purple-500 to-violet-500',
      image: '/assets/9b5edd94-b5e5-40ee-8bcb-d5795f0b084b.png',
      benefits: ['Campaign creation', 'Audience targeting', 'Performance tracking', 'A/B testing']
    },
    {
      category: 'marketing',
      title: 'Lead Management',
      description: 'Track and nurture leads through the enrollment process with automated workflows.',
      icon: Target,
      gradient: 'from-orange-500 to-red-500',
      image: '/assets/9b5edd94-b5e5-40ee-8bcb-d5795f0b084b.png',
      benefits: ['Lead tracking', 'Automated workflows', 'Conversion analytics', 'CRM integration']
    }
  ];

  const filteredFeatures = activeCategory === 'all'
    ? features
    : features.filter(feature => feature.category === activeCategory);

  return (
    <>
      {/* 🚀 ULTRA-ADVANCED UNIFIED CREATIVE BACKGROUND - GOD MODE ACTIVATED 🚀 */}
      {/* 🔥 MEGA STRONG VISUAL EFFECTS LAYER */}
      <div className="mega-strong-effects"></div>
      {/* 💥 STRONG CREATIVE OVERLAY FOR 3 SECTIONS */}
      <div className="strong-creative-overlay"></div>
      <div className="unified-creative-background">
        {/* 🌟 Neural Network Pattern Layer */}
        <div className="creative-bg-layer geometric-pattern"></div>

        {/* 🌊 Ultra-Dynamic Organic Morphing Shapes */}
        <div className="creative-bg-layer organic-shapes">
          <div className="organic-shape"></div>
          <div className="organic-shape"></div>
          <div className="organic-shape"></div>
        </div>

        {/* ⚡ Quantum Energy Grid Overlay */}
        <div className="creative-bg-layer grid-overlay"></div>

        {/* 🌟 Advanced Floating Energy Particles */}
        <div className="creative-bg-layer floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        {/* 💫 Additional Ultra-Advanced Effects */}
        <div className="creative-bg-layer" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle 350px at 15% 25%, rgba(224, 181, 143, 0.12) 0%, transparent 50%),
            radial-gradient(circle 450px at 85% 75%, rgba(245, 240, 233, 0.1) 0%, transparent 50%),
            radial-gradient(circle 250px at 60% 40%, rgba(224, 181, 143, 0.08) 0%, transparent 50%)
          `,
          animation: 'backgroundPulse 40s ease-in-out infinite'
        }}></div>
      </div>

      <main className="min-h-screen text-white relative z-10">
        {/* 🚀 REVOLUTIONARY NAVIGATION */}
        <RevolutionaryNavigation currentPage="/pages/features" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E0B58F' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="content-frame hero-content-frame text-center mb-12"
          >
            {/* Content Frame Particles */}
            <div className="content-frame-particles">
              <div className="content-frame-particle"></div>
              <div className="content-frame-particle"></div>
              <div className="content-frame-particle"></div>
            </div>
            <Badge className="bg-[#E0B58F]/20 text-[#E0B58F] border-[#E0B58F]/30 mb-4">
              <Star className="w-3 h-3 mr-1" />
              Comprehensive Feature Suite
            </Badge>

            <h1 className="text-3xl lg:text-5xl font-black leading-tight tracking-tight mb-4">
              <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
                Powerful Features for
              </span>
              <br />
              <span className="text-[#F5F0E9]">Modern Education</span>
            </h1>

            <p className="text-lg text-[#D9CBC2] leading-relaxed max-w-3xl mx-auto">
              Discover our comprehensive suite of features designed to transform educational management
              and enhance learning experiences for all stakeholders.
            </p>
          </motion.div>

          {/* Feature Categories - Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            {/* Desktop View - Horizontal Layout */}
            <div className="hidden md:block">
              <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                {featureCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 border text-sm ${
                        activeCategory === category.id
                          ? 'bg-[#E0B58F] text-[#112250] shadow-lg border-[#E0B58F]'
                          : 'bg-white/5 text-[#D9CBC2] hover:bg-white/10 hover:text-[#F5F0E9] border-white/10 hover:border-[#E0B58F]/30'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium whitespace-nowrap">{category.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile View - Grid Layout */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                {featureCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex flex-col items-center justify-center space-y-1 px-2 py-2.5 rounded-lg transition-all duration-300 border text-xs ${
                        activeCategory === category.id
                          ? 'bg-[#E0B58F] text-[#112250] shadow-lg border-[#E0B58F]'
                          : 'bg-white/5 text-[#D9CBC2] hover:bg-white/10 hover:text-[#F5F0E9] border-white/10'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="font-medium text-center leading-tight">{category.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-8 px-4 z-20">
        <div className="container mx-auto max-w-7xl">


          {/* Responsive Grid - Ensures 3 cards per row on desktop, proper mobile layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 relative z-30">
            {filteredFeatures.length > 0 ? filteredFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={`${feature.category}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-[#E0B58F]/30 rounded-2xl overflow-hidden hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 hover:border-[#E0B58F]/60 shadow-lg hover:shadow-2xl"
                >
                  {/* Feature Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Feature Icon Overlay */}
                    <div className={`absolute top-3 right-3 w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Feature Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#F5F0E9] mb-2 group-hover:text-[#E0B58F] transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-[#D9CBC2] leading-relaxed mb-3 text-sm">
                      {feature.description}
                    </p>

                    {/* Benefits List */}
                    <ul className="space-y-1">
                      {feature.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2 text-xs text-[#D9CBC2]">
                          <CheckCircle className="w-3 h-3 text-[#E0B58F] flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                      {feature.benefits.length > 2 && (
                        <li className="text-xs text-[#E0B58F] font-medium">
                          +{feature.benefits.length - 2} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E0B58F]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              );
            }) : (
              <div className="col-span-full text-center py-12">
                <p className="text-[#D9CBC2] text-lg">No features found for the selected category.</p>
              </div>
            )}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="content-frame cta-content-frame bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-2xl border border-[#E0B58F]/30 rounded-3xl p-8 text-center"
          >
            {/* Content Frame Particles */}
            <div className="content-frame-particles">
              <div className="content-frame-particle"></div>
              <div className="content-frame-particle"></div>
              <div className="content-frame-particle"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F0E9] mb-6">
              Ready to Transform Your Educational Institution?
            </h2>
            <p className="text-xl text-[#D9CBC2] mb-8 max-w-2xl mx-auto">
              Experience the power of our comprehensive feature suite. Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pages/consultation">
                <Button
                  size="lg"
                  className="bg-[#E0B58F] hover:bg-[#E0B58F]/90 text-[#112250] font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#E0B58F]/30 text-[#E0B58F] hover:bg-[#E0B58F]/10 px-12 py-4 rounded-xl transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    </>
  );
}
