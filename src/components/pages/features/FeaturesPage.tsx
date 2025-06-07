import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  GraduationCap, 
  BookOpen, 
  Users, 
  DollarSign, 
  Megaphone,
  BarChart3,
  Zap,
  Lightbulb,
  CheckCircle,
  Star
} from 'lucide-react';
import Logo from '../landing-page/Logo';
import Button from '../landing-page/Button';
import FeatureCard from '../landing-page/FeatureCard';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      title: "Admin Portal",
      description: "Comprehensive administrative dashboard for school management with advanced analytics and reporting capabilities.",
      icon: Shield,
      image: "/assets/admin-portal.jpg",
      gradient: "from-blue-500 to-purple-600",
      href: "/admin-dashboard"
    },
    {
      title: "Teacher Hub",
      description: "Powerful tools for educators to manage classes, track student progress, and create engaging content.",
      icon: GraduationCap,
      image: "/assets/teacher-hub.jpg",
      gradient: "from-green-500 to-teal-600",
      href: "/teacher-portal"
    },
    {
      title: "Student Portal",
      description: "Interactive learning environment with personalized dashboards and progress tracking.",
      icon: BookOpen,
      image: "/assets/student-portal.jpg",
      gradient: "from-orange-500 to-red-600",
      href: "/student-dashboard"
    },
    {
      title: "Parent Access",
      description: "Stay connected with your child's educational journey through real-time updates and communication tools.",
      icon: Users,
      image: "/assets/parent-access.jpg",
      gradient: "from-pink-500 to-rose-600",
      href: "/parent-portal"
    },
    {
      title: "Finance Management",
      description: "Complete financial oversight with automated billing, payment tracking, and detailed reporting.",
      icon: DollarSign,
      image: "/assets/finance.jpg",
      gradient: "from-yellow-500 to-orange-600",
      href: "/finance-dashboard"
    },
    {
      title: "Marketing Hub",
      description: "Promote your institution with powerful marketing tools, campaign management, and analytics.",
      icon: Megaphone,
      image: "/assets/marketing.jpg",
      gradient: "from-indigo-500 to-blue-600",
      href: "/marketing-hub"
    }
  ];

  const benefits = [
    {
      icon: Lightbulb,
      title: "AI-Powered Innovation",
      description: "Cutting-edge artificial intelligence to enhance learning experiences and administrative efficiency.",
      features: ["Smart Analytics", "Predictive Insights", "Automated Workflows"]
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "Optimized for speed with cloud-native architecture ensuring instant response times.",
      features: ["Sub-second Loading", "Real-time Updates", "Global CDN"]
    },
    {
      icon: CheckCircle,
      title: "Proven Success Rate",
      description: "98% customer satisfaction with measurable improvements in educational outcomes.",
      features: ["Verified Results", "Case Studies", "ROI Tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1f42] via-[#112250] to-[#1a2b5c] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#E0B58F]/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-[#4C68C0]/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-black/20 via-[#1A1A3A]/30 to-black/20 border-b border-[#E0B58F]/20"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Logo size="sm" showText={true} />
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-[#E0B58F]/60 text-[#E0B58F] hover:bg-[#E0B58F]/20 hover:border-[#E0B58F] font-bold px-6 py-3 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-xl border border-[#E0B58F]/30 rounded-full px-6 py-3 mb-8">
              <Star className="w-5 h-5 text-[#E0B58F]" />
              <span className="text-[#E0B58F] font-semibold">Platform Features</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-[#F5F0E9] mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
                Powerful Features
              </span>
              <br />
              <span className="text-[#F5F0E9]">For Every Role</span>
            </h1>
            
            <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive tools designed for administrators, teachers, students, parents, and staff members. 
              Each portal is tailored to provide the perfect experience for every user.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="glass-skeuomorphism p-8 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F0E9] mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto">
                Experience the difference with our comprehensive platform designed specifically for modern educational institutions.
              </p>
            </div>

            <div className="glass-skeuomorphism p-8 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                      className="card-glass-skeuomorphism p-8 text-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#4C68C0] rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#F5F0E9] mb-4">{benefit.title}</h3>
                      <p className="text-[#D9CBC2] mb-6 leading-relaxed">{benefit.description}</p>
                      <ul className="space-y-2">
                        {benefit.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center justify-center space-x-2 text-sm text-[#D9CBC2]">
                            <CheckCircle className="w-4 h-4 text-[#E0B58F] flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-20"
          >
            <div className="glass-skeuomorphism p-12 rounded-3xl">
              <h3 className="text-3xl font-bold text-[#F5F0E9] mb-6">
                Ready to Transform Your Institution?
              </h3>
              <p className="text-xl text-[#D9CBC2] mb-8 max-w-2xl mx-auto">
                Join thousands of educational institutions worldwide who trust GROW YouR NEED to enhance their learning environments.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/pages/login">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#F0C59F] hover:to-[#E4B584] text-[#112250] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/pages/consultation">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-[#E0B58F]/60 text-[#E0B58F] hover:bg-[#E0B58F]/20 hover:border-[#E0B58F] font-bold px-8 py-4 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
                  >
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default FeaturesPage;
