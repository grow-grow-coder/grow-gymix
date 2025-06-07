import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MessageCircle, 
  Phone, 
  Mail, 
  User, 
  Building, 
  Users,
  CheckCircle,
  Star,
  Clock
} from 'lucide-react';
import Logo from '../landing-page/Logo';
import Button from '../landing-page/Button';

const ConsultationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    role: '',
    studentCount: '',
    message: '',
    preferredTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1f42] via-[#112250] to-[#1a2b5c] text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="glass-skeuomorphism p-8 rounded-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#4C68C0] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#F5F0E9] mb-4">Thank You!</h2>
            <p className="text-[#D9CBC2] mb-6">
              Your consultation request has been submitted successfully. Our team will contact you within 24 hours.
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#F0C59F] hover:to-[#E4B584] text-[#112250] font-bold px-6 py-3 rounded-xl">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-xl border border-[#E0B58F]/30 rounded-full px-6 py-3 mb-8">
              <Calendar className="w-5 h-5 text-[#E0B58F]" />
              <span className="text-[#E0B58F] font-semibold">Free Consultation</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-[#F5F0E9] mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
                Get Your Free
              </span>
              <br />
              <span className="text-[#F5F0E9]">Consultation</span>
            </h1>
            
            <p className="text-xl text-[#D9CBC2] max-w-2xl mx-auto leading-relaxed">
              Discover how GROW YouR NEED can transform your educational institution. 
              Schedule a personalized consultation with our experts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Consultation Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-skeuomorphism p-8 rounded-3xl"
            >
              <h2 className="text-2xl font-bold text-[#F5F0E9] mb-6">Schedule Your Consultation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[#F5F0E9] font-semibold mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E0B58F]" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[#F5F0E9] font-semibold mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E0B58F]" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-[#F5F0E9] font-semibold mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E0B58F]" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="institution" className="block text-[#F5F0E9] font-semibold mb-2">
                      Institution Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E0B58F]" />
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                        placeholder="Your school/institution"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-[#F5F0E9] font-semibold mb-2">
                      Your Role *
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F0E9] focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                    >
                      <option value="">Select your role</option>
                      <option value="principal">Principal/Director</option>
                      <option value="admin">Administrator</option>
                      <option value="teacher">Teacher</option>
                      <option value="it">IT Manager</option>
                      <option value="finance">Finance Manager</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="studentCount" className="block text-[#F5F0E9] font-semibold mb-2">
                      Number of Students
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E0B58F]" />
                      <select
                        id="studentCount"
                        name="studentCount"
                        value={formData.studentCount}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F0E9] focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                      >
                        <option value="">Select range</option>
                        <option value="1-50">1-50 students</option>
                        <option value="51-200">51-200 students</option>
                        <option value="201-500">201-500 students</option>
                        <option value="501-1000">501-1000 students</option>
                        <option value="1000+">1000+ students</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#F5F0E9] font-semibold mb-2">
                    Tell us about your needs
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all resize-none"
                    placeholder="Describe your current challenges and what you hope to achieve with our platform..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#F0C59F] hover:to-[#E4B584] text-[#112250] font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#112250]/30 border-t-[#112250] rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        <span>Schedule Free Consultation</span>
                      </>
                    )}
                  </div>
                </Button>
              </form>
            </motion.div>

            {/* Benefits & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* What to Expect */}
              <div className="glass-skeuomorphism p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-[#F5F0E9] mb-4">What to Expect</h3>
                <div className="space-y-4">
                  {[
                    { icon: Clock, text: "30-minute personalized consultation" },
                    { icon: MessageCircle, text: "Discussion of your specific needs" },
                    { icon: Star, text: "Custom solution recommendations" },
                    { icon: CheckCircle, text: "No obligation or pressure" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#E0B58F]/20 to-[#4C68C0]/20 rounded-lg flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-[#E0B58F]" />
                      </div>
                      <span className="text-[#D9CBC2]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="glass-skeuomorphism p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-[#F5F0E9] mb-4">Need Immediate Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#E0B58F]" />
                    <span className="text-[#D9CBC2]">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#E0B58F]" />
                    <span className="text-[#D9CBC2]">support@growyourneed.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsultationPage;
