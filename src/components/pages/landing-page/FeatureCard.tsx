import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  image?: string;
  gradient: string;
  delay?: number;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  image,
  gradient,
  delay = 0,
  onClick
}) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
        whileHover={{
          scale: 1.02,
          y: -8,
          rotateX: 5,
          rotateY: 5
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={onClick}
      >
        {/* 🚀 QUANTUM HOLOGRAPHIC FRAME SYSTEM - Responsive */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {/* 💫 CORNER QUANTUM ELEMENTS - Responsive */}
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-l border-t sm:border-l-2 sm:border-t-2 border-[#E0B58F]/60 rounded-tl-lg"></div>
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-r border-t sm:border-r-2 sm:border-t-2 border-[#4C68C0]/60 rounded-tr-lg"></div>
          <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 md:bottom-3 md:left-3 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-l border-b sm:border-l-2 sm:border-b-2 border-[#E0B58F]/60 rounded-bl-lg"></div>
          <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 md:bottom-3 md:right-3 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-r border-b sm:border-r-2 sm:border-b-2 border-[#4C68C0]/60 rounded-br-lg"></div>

          {/* 💫 SIDE QUANTUM ACCENTS */}
          <motion.div
            animate={{ height: ["20%", "35%", "20%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay }}
            className="absolute top-1/3 left-0 w-2 border-l-2 border-[#E0B58F]/40"
          />
          <motion.div
            animate={{ height: ["25%", "40%", "25%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }}
            className="absolute top-1/4 right-0 w-2 border-r-2 border-[#4C68C0]/40"
          />

          {/* 🌟 FLOATING QUANTUM PARTICLES */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay * 0.5 + i * 0.5
              }}
              className={`absolute w-1.5 h-1.5 rounded-full ${
                i % 2 === 0 ? 'bg-[#E0B58F]/60' : 'bg-[#4C68C0]/60'
              }`}
              style={{
                left: `${20 + i * 20}%`,
                top: `${15 + (i % 2) * 70}%`
              }}
            />
          ))}
        </div>

        {/* Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Image/Visual Section - Responsive Height */}
        <div className="relative h-32 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
          {image ? (
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                src={image}
                alt={`${title} - Educational platform interface`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  console.log(`Failed to load image: ${image}`);
                  // Hide the image element on error
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Enhanced Image Overlay for Better Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Role Badge - Responsive */}
              <motion.div
                className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 bg-gradient-to-r from-[#E0B58F]/90 to-[#4C68C0]/90 backdrop-blur-sm border border-white/30 rounded-full px-1.5 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1.5 flex items-center space-x-1 sm:space-x-1.5 md:space-x-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.4, duration: 0.5 }}
              >
                <Icon size={10} className="text-white sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                <span className="text-[10px] sm:text-xs md:text-xs text-white font-semibold hidden sm:inline">{title}</span>
              </motion.div>
            </div>
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-20 relative`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-white/15 rounded-full blur-lg"
                  animate={{
                    x: [0, -20, 0],
                    y: [0, 15, 0],
                    scale: [1, 0.8, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon size={32} className="text-[#E0B58F]" />
                </motion.div>
              </div>
            </div>
          )}

          {/* Top Right Feature Badge - Responsive */}
          <motion.div
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 flex items-center space-x-1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
          >
            <Sparkles size={8} className="text-[#E0B58F] sm:w-3 sm:h-3 md:w-3 md:h-3" />
            <span className="text-[10px] sm:text-xs md:text-xs text-white font-medium hidden sm:inline">Portal</span>
          </motion.div>
        </div>

        {/* Content Section - Responsive */}
        <div className="relative p-2 sm:p-3 md:p-4 lg:p-6 space-y-2 sm:space-y-3 md:space-y-4">
          {/* Title */}
          <motion.h3
            className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[#F5F0E9] group-hover:text-[#E0B58F] transition-colors duration-300 leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {title}
          </motion.h3>

          {/* Description - Hidden on mobile, shown on larger screens */}
          <p className="text-[#D9CBC2] text-xs sm:text-sm md:text-sm leading-relaxed group-hover:text-[#F5F0E9] transition-colors duration-300 hidden sm:block">
            {description}
          </p>

          {/* Action Button - Responsive */}
          <motion.div
            className="flex items-center justify-between pt-1 sm:pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
          >
            <motion.button
              className="flex items-center space-x-1 sm:space-x-2 text-[#E0B58F] hover:text-[#F5F0E9] transition-colors group/btn"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Learn More</span>
              <span className="text-xs font-medium sm:hidden">More</span>
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform sm:w-4 sm:h-4" />
            </motion.button>

            {/* Progress Indicator - Smaller on mobile */}
            <div className="flex space-x-0.5 sm:space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#E0B58F]/30 rounded-full"
                  animate={{
                    backgroundColor: [
                      "rgba(224, 181, 143, 0.3)",
                      "rgba(224, 181, 143, 0.8)",
                      "rgba(224, 181, 143, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#E0B58F]/10 via-transparent to-[#3C507D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        />

        {/* Border Glow */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-[#E0B58F]/20 via-[#3C507D]/20 to-[#E0B58F]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"
        />
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
