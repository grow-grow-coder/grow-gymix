import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Mail, Lock, Eye, EyeOff, ArrowRight, Star, Fingerprint, Scan, Shield, Smartphone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Import components
import Logo from '@/components/pages/landing-page/Logo';
import Button from '@/components/pages/landing-page/Button';
import { Badge } from '@/components/pages/landing-page/Badge';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'traditional' | 'biometric'>('traditional');
  const [biometricType, setBiometricType] = useState<'face' | 'fingerprint' | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const isSignedIn = !!user;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          loginMethod: 'traditional'
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to home page (original behavior)
        navigate('/');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async (type: 'face' | 'fingerprint') => {
    setBiometricType(type);
    setIsScanning(true);
    setError(null);

    try {
      // Simulate biometric data capture
      // In a real implementation, this would interface with device biometric sensors
      const biometricData = await simulateBiometricCapture(type);

      if (!biometricData) {
        setError('Failed to capture biometric data');
        setIsScanning(false);
        return;
      }

      // Authenticate with biometric data
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email || 'user@example.com', // In real app, get from stored data
          biometricData,
          biometricType: type,
          loginMethod: 'biometric'
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to home page (original behavior)
        navigate('/');
      } else {
        setError(result.error || 'Biometric authentication failed');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      setError('Biometric authentication failed');
    } finally {
      setIsScanning(false);
    }
  };

  // Simulate biometric data capture (replace with real biometric API)
  const simulateBiometricCapture = async (type: 'face' | 'fingerprint'): Promise<string | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful capture with dummy data
        const dummyData = type === 'fingerprint'
          ? 'fingerprint_template_' + Date.now()
          : 'face_template_' + Date.now();
        resolve(dummyData);
      }, 3000);
    });
  };

  // Use useEffect to handle redirect if already signed in
  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  // Show loading if redirecting
  if (isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 🚀 REVOLUTIONARY CUTTING-EDGE BACKGROUND SYSTEM */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 🌌 STUNNING COSMIC MESH GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F23] via-[#1A1A3A] to-[#0F0F23]" />

        {/* 💫 CUTTING-EDGE ANIMATED MESH */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E0B58F]/10 via-transparent to-[#4C68C0]/10 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-[#2A2E70]/15 via-transparent to-[#E0B58F]/8" style={{ animationDelay: '1s' }} />
        </div>

        {/* 🌟 STUNNING FLOATING ORBS */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-radial from-[#E0B58F]/20 via-[#E0B58F]/5 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-radial from-[#4C68C0]/25 via-[#4C68C0]/8 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-[#2A2E70]/15 via-[#2A2E70]/3 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: '5s' }} />
        </div>

        {/* ✨ CUTTING-EDGE GRID OVERLAY */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(224, 181, 143, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(224, 181, 143, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>
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

            {/* 🚀 STUNNING BACK BUTTON */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="relative"
            >
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="relative border-2 border-[#E0B58F]/60 text-[#E0B58F] hover:bg-[#E0B58F]/20 hover:border-[#E0B58F] font-bold px-6 py-3 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#E0B58F]/20 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E0B58F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">← Back to Home</span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* 🚀 REVOLUTIONARY LOGIN SECTION */}
      <section className="relative h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[80vh]">

            {/* 🌟 LEFT SIDE - MOTIVATIONAL CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex flex-col justify-center space-y-8"
            >
              {/* Welcome Message */}
              <div className="text-center lg:text-left">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-4xl xl:text-5xl font-black text-[#F5F0E9] mb-4"
                >
                  <span className="bg-gradient-to-r from-[#E0B58F] via-[#F5F0E9] to-[#4C68C0] bg-clip-text text-transparent">
                    Transform
                  </span>
                  <br />
                  <span className="text-[#F5F0E9]">Your Future</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-lg text-[#D9CBC2] leading-relaxed mb-8"
                >
                  Join thousands of learners who are growing their skills and achieving their dreams with our cutting-edge educational platform.
                </motion.p>
              </div>

              {/* Motivational Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-[#E0B58F]/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[#E0B58F] mb-1">10K+</div>
                  <div className="text-sm text-[#D9CBC2]">Active Students</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-[#4C68C0]/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[#4C68C0] mb-1">500+</div>
                  <div className="text-sm text-[#D9CBC2]">Expert Teachers</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-[#E0B58F]/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[#E0B58F] mb-1">95%</div>
                  <div className="text-sm text-[#D9CBC2]">Success Rate</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-[#4C68C0]/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[#4C68C0] mb-1">24/7</div>
                  <div className="text-sm text-[#D9CBC2]">Support</div>
                </div>
              </motion.div>

              {/* Inspirational Quote */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-[#E0B58F]/10 to-[#4C68C0]/10 border border-white/10 backdrop-blur-sm"
              >
                <div className="absolute top-4 left-4 text-4xl text-[#E0B58F]/30">&ldquo;</div>
                <p className="text-[#F5F0E9] italic text-center mt-4 mb-2">
                  Education is the most powerful weapon which you can use to change the world.
                </p>
                <p className="text-[#D9CBC2] text-sm text-center">- Nelson Mandela</p>
              </motion.div>
            </motion.div>

            {/* 🎯 CENTER - LOGIN FORM (UNTOUCHED) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative p-6 lg:p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 shadow-2xl"
            >
            {/* 🌟 STUNNING GLOW EFFECTS */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E0B58F]/10 to-[#4C68C0]/10 rounded-3xl blur opacity-50"></div>

            {/* 🌟 STUNNING HEADER */}
            <div className="text-center mb-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Badge className="bg-gradient-to-r from-[#E0B58F]/20 to-[#4C68C0]/20 text-[#E0B58F] border border-[#E0B58F]/30 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
                    <Shield className="w-3 h-3 mr-1" />
                    <span className="text-xs">Secure Authentication</span>
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-2xl lg:text-3xl font-black text-[#F5F0E9] mb-3"
                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                >
                  <span className="bg-gradient-to-r from-[#F5F0E9] via-[#E0B58F] to-[#4C68C0] bg-clip-text text-transparent">
                    Welcome Back
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-sm text-[#D9CBC2] leading-relaxed"
                >
                  Sign in to access your <span className="text-[#E0B58F] font-semibold">GROW YouR NEED</span> dashboard
                </motion.p>
            </div>

            {/* 🚀 REVOLUTIONARY LOGIN METHOD SELECTOR */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mb-6 relative z-10"
              >
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-gradient-to-r from-white/5 to-white/10 p-2 backdrop-blur-sm border border-white/10">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('traditional')}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      loginMethod === 'traditional'
                        ? 'bg-gradient-to-r from-[#E0B58F] to-[#D4A574] text-[#112250] shadow-lg'
                        : 'text-[#D9CBC2] hover:text-[#F5F0E9] hover:bg-white/5'
                    }`}
                  >
                    <Mail className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs">Email/Password</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('biometric')}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      loginMethod === 'biometric'
                        ? 'bg-gradient-to-r from-[#E0B58F] to-[#D4A574] text-[#112250] shadow-lg'
                        : 'text-[#D9CBC2] hover:text-[#F5F0E9] hover:bg-white/5'
                    }`}
                  >
                    <Scan className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs">Face/Fingerprint</span>
                  </button>
                </div>
            </motion.div>

            {/* 🚨 ERROR MESSAGE */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 backdrop-blur-sm"
              >
                <p className="text-red-400 text-sm font-medium text-center">{error}</p>
              </motion.div>
            )}

            {loginMethod === 'traditional' ? (
                /* 🌟 TRADITIONAL LOGIN FORM */
                <motion.form
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 relative z-10"
                >
                  <div>
                    <label className="block text-sm font-bold text-[#F5F0E9] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#E0B58F]" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-white/10 to-white/5 border border-[#E0B58F]/30 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-[#E0B58F] transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#F5F0E9] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#E0B58F]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-12 py-3 bg-gradient-to-r from-white/10 to-white/5 border border-[#E0B58F]/30 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-[#E0B58F] transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#E0B58F] hover:text-[#F5F0E9] transition-colors p-1 rounded-lg hover:bg-white/10"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#E0B58F] bg-white/10 border-[#E0B58F]/30 rounded focus:ring-[#E0B58F] focus:ring-2 transition-all"
                      />
                      <span className="text-[#D9CBC2] group-hover:text-[#F5F0E9] transition-colors font-medium">Remember me</span>
                    </label>

                    <Link to="#" className="text-[#E0B58F] hover:text-[#F5F0E9] transition-colors font-semibold hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#F0C59F] hover:to-[#E4B584] text-[#112250] font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#E0B58F]/25 border border-[#E0B58F]/30 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-center justify-center space-x-2 relative z-10">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#112250]/30 border-t-[#112250] rounded-full animate-spin" />
                          <span className="text-base">Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-base">Sign In</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </div>
                  </Button>
                </motion.form>
              ) : (
                /* 🚀 REVOLUTIONARY BIOMETRIC LOGIN */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 relative z-10"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-[#F5F0E9] mb-2">Choose Biometric Method</h3>
                    <p className="text-[#D9CBC2] text-sm mb-4">Select your preferred biometric authentication method</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 🌟 FACE RECOGNITION */}
                    <motion.button
                      type="button"
                      onClick={() => handleBiometricAuth('face')}
                      disabled={isScanning}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 overflow-hidden group ${
                        biometricType === 'face' && isScanning
                          ? 'border-[#4C68C0] bg-gradient-to-br from-[#4C68C0]/20 to-[#4C68C0]/10'
                          : 'border-[#E0B58F]/30 bg-gradient-to-br from-white/10 to-white/5 hover:border-[#4C68C0]/50 hover:bg-gradient-to-br hover:from-[#4C68C0]/15 hover:to-[#4C68C0]/5'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4C68C0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 text-center">
                        <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[#4C68C0] to-[#2A2E70] flex items-center justify-center ${
                          biometricType === 'face' && isScanning ? 'animate-pulse' : ''
                        }`}>
                          <Scan className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-sm font-bold text-[#F5F0E9] mb-1">Face Recognition</h4>
                        <p className="text-xs text-[#D9CBC2]">
                          {biometricType === 'face' && isScanning ? 'Scanning...' : 'Quick & secure facial authentication'}
                        </p>
                      </div>
                    </motion.button>

                    {/* 🌟 FINGERPRINT */}
                    <motion.button
                      type="button"
                      onClick={() => handleBiometricAuth('fingerprint')}
                      disabled={isScanning}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 overflow-hidden group ${
                        biometricType === 'fingerprint' && isScanning
                          ? 'border-[#E0B58F] bg-gradient-to-br from-[#E0B58F]/20 to-[#E0B58F]/10'
                          : 'border-[#E0B58F]/30 bg-gradient-to-br from-white/10 to-white/5 hover:border-[#E0B58F]/50 hover:bg-gradient-to-br hover:from-[#E0B58F]/15 hover:to-[#E0B58F]/5'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E0B58F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 text-center">
                        <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[#E0B58F] to-[#D4A574] flex items-center justify-center ${
                          biometricType === 'fingerprint' && isScanning ? 'animate-pulse' : ''
                        }`}>
                          <Fingerprint className="w-6 h-6 text-[#112250]" />
                        </div>
                        <h4 className="text-sm font-bold text-[#F5F0E9] mb-1">Fingerprint</h4>
                        <p className="text-xs text-[#D9CBC2]">
                          {biometricType === 'fingerprint' && isScanning ? 'Scanning...' : 'Touch sensor for instant access'}
                        </p>
                      </div>
                    </motion.button>
                  </div>

                  {isScanning && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm"
                    >
                      {biometricType === 'fingerprint' ? (
                        /* 👆 FINGERPRINT SCANNING INTERFACE */
                        <div className="space-y-4">
                          {/* Fingerprint Scanner Visual */}
                          <div className="relative mx-auto w-32 h-32">
                            {/* Scanner Base */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E0B58F]/20 to-[#D4A574]/20 border-4 border-[#E0B58F]/30">
                              {/* Scanning Animation Rings */}
                              <motion.div
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.8, 0.2, 0.8]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                className="absolute inset-2 rounded-full border-2 border-[#E0B58F]/50"
                              />
                              <motion.div
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.6, 0.1, 0.6]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.3
                                }}
                                className="absolute inset-4 rounded-full border-2 border-[#E0B58F]/40"
                              />

                              {/* Center Fingerprint Icon */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                  animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E0B58F] to-[#D4A574] flex items-center justify-center shadow-lg"
                                >
                                  <Fingerprint className="w-8 h-8 text-[#112250]" />
                                </motion.div>
                              </div>

                              {/* Scanning Line */}
                              <motion.div
                                animate={{
                                  y: [-40, 40, -40]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                className="absolute left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-[#E0B58F] to-transparent opacity-80"
                              />
                            </div>
                          </div>

                          {/* Instructions */}
                          <div className="space-y-2">
                            <motion.p
                              animate={{ opacity: [1, 0.7, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="text-[#F5F0E9] font-bold text-lg"
                            >
                              👆 Place Your Finger
                            </motion.p>
                            <p className="text-[#E0B58F] font-semibold">
                              Position your finger on the scanner
                            </p>
                            <p className="text-xs text-[#D9CBC2]">
                              Keep your finger steady during scanning...
                            </p>
                          </div>

                          {/* Progress Indicator */}
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              animate={{ width: ["0%", "100%", "0%"] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              className="h-full bg-gradient-to-r from-[#E0B58F] to-[#D4A574] rounded-full"
                            />
                          </div>
                        </div>
                      ) : (
                        /* 📷 FACE SCANNING INTERFACE */
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4C68C0] to-[#2A2E70] flex items-center justify-center animate-pulse">
                            <Scan className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-[#F5F0E9] font-semibold text-lg">
                            📷 Position Your Face
                          </p>
                          <p className="text-[#4C68C0] font-semibold">
                            Look directly at the camera
                          </p>
                          <p className="text-xs text-[#D9CBC2]">
                            Facial recognition in progress...
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
            )}

            {/* 🌟 STUNNING FOOTER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-6 text-center relative z-10"
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm">
                  <p className="text-[#D9CBC2] text-sm">
                    Don&apos;t have an account?{' '}
                    <Link to="/pages/consultation" className="text-[#E0B58F] hover:text-[#F5F0E9] transition-colors font-bold hover:underline">
                      Get a free consultation
                    </Link>
                  </p>
                  <div className="mt-2 flex items-center justify-center space-x-3 text-xs text-[#D9CBC2]">
                    <Link to="#" className="hover:text-[#E0B58F] transition-colors">Privacy</Link>
                    <span>•</span>
                    <Link to="#" className="hover:text-[#E0B58F] transition-colors">Terms</Link>
                    <span>•</span>
                    <Link to="#" className="hover:text-[#E0B58F] transition-colors">Support</Link>
                  </div>
                </div>
            </motion.div>
            </motion.div>

            {/* 🎨 RIGHT SIDE - CREATIVE FLOWING BORDERS */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex flex-col justify-center items-center space-y-8"
            >
              {/* Decorative Pattern */}
              <div className="relative w-full max-w-sm">
                {/* Flowing Border Design */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-[#E0B58F]/30"
                />

                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1.1, 1, 1.1]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-4 rounded-full border-2 border-dotted border-[#4C68C0]/40"
                />

                {/* Center Content */}
                <div className="relative z-10 p-12 text-center">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#E0B58F] to-[#4C68C0] flex items-center justify-center"
                  >
                    <Star className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-[#F5F0E9] mb-2">Excellence</h3>
                  <p className="text-sm text-[#D9CBC2]">Awaits You</p>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-4 w-full max-w-sm">
                {[
                  { icon: Shield, title: "Secure", desc: "Bank-level security" },
                  { icon: Smartphone, title: "Modern", desc: "Latest technology" },
                  { icon: UserCheck, title: "Trusted", desc: "By thousands" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E0B58F]/20 to-[#4C68C0]/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#E0B58F]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#F5F0E9]">{item.title}</h4>
                      <p className="text-xs text-[#D9CBC2]">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="relative w-full max-w-sm h-32">
                {/* Floating Geometric Shapes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                    className={`absolute w-3 h-3 rounded-full bg-gradient-to-br from-[#E0B58F] to-[#4C68C0]`}
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${10 + (i % 3) * 30}%`
                    }}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}