import React from 'react';
import { motion } from 'framer-motion';

const HeroCards: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 🚀 REVOLUTIONARY QUANTUM HOLOGRAPHIC FRAME SYSTEM */}
      <div className="quantum-holographic-frame-system">
        {/* 💫 QUANTUM CORNER ANCHORS */}
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#E0B58F]/70 rounded-tl-lg z-10"
        />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#4C68C0]/70 rounded-tr-lg z-10"
        />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#E0B58F]/70 rounded-bl-lg z-10"
        />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#4C68C0]/70 rounded-br-lg z-10"
        />

        {/* 💫 DYNAMIC SIDE QUANTUM ACCENTS */}
        <motion.div
          animate={{ height: ["30%", "50%", "30%"], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-0 w-3 border-l-2 border-[#E0B58F]/50 z-10"
        />
        <motion.div
          animate={{ height: ["25%", "45%", "25%"], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-0 w-3 border-r-2 border-[#4C68C0]/50 z-10"
        />

        {/* 🌟 FLOATING QUANTUM PARTICLES */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.sin(i) * 5, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
            className={`absolute w-2 h-2 rounded-full z-10 ${
              i % 3 === 0 ? 'bg-[#E0B58F]/70' :
              i % 3 === 1 ? 'bg-[#4C68C0]/70' : 'bg-[#F5F0E9]/60'
            }`}
            style={{
              left: `${15 + Math.cos(i * 45 * Math.PI / 180) * 35}%`,
              top: `${15 + Math.sin(i * 45 * Math.PI / 180) * 35}%`
            }}
          />
        ))}

        {/* 💫 ORBITAL QUANTUM RINGS */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 border border-dashed border-[#E0B58F]/30 rounded-full z-10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-12 border border-dotted border-[#4C68C0]/25 rounded-full z-10"
        />
      </div>

      <div className="hero-cards-wrapper">
        {/* Card 1 - AI Education */}
        <div className="hero-card card-1">
          <img
            src="/assets/logo/logo2.png"
            alt="AI-powered learning platform interface"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'none !important',
              zIndex: 5,
              borderRadius: '14px'
            }}
          />
        </div>

        {/* Card 2 - Students */}
        <div className="hero-card card-2">
          <img
            src="/assets/logo/logo3.png"
            alt="Educational platform and course management"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'none !important',
              zIndex: 5,
              borderRadius: '14px'
            }}
          />
        </div>

        {/* Card 3 - Education */}
        <div className="hero-card card-3">
          <img
            src="/assets/logo/logo4.png"
            alt="Student growth and progress tracking"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'none !important',
              zIndex: 5,
              borderRadius: '14px'
            }}
          />
        </div>

        {/* Gradient definitions */}
        <svg style={{ visibility: 'hidden', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="gradient-full" x1="0%" y1="0%" x2="120%" y2="120%">
              <stop offset="0%" stopColor="#F5F0E9" />
              <stop offset="100%" stopColor="#F5F0E900" />
            </linearGradient>
            <linearGradient id="gradient-half" x1="-50%" y1="-50%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0B58F" />
              <stop offset="100%" stopColor="#E0B58F00" />
            </linearGradient>
          </defs>
        </svg>

        {/* Animated lines */}
        <div className="hero-lines">
          <div className="hero-line"></div>
          <div className="hero-line"></div>
        </div>
      </div>

      <style jsx>{`
        /* Enhanced Frame System - Clean & Performance Optimized */
        .enhanced-frame-system {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          z-index: 1;
          pointer-events: none;
        }

        /* Floating Particles */
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(224, 181, 143, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          animation: particleFloat 6s ease-in-out infinite;
          filter: drop-shadow(0 0 4px rgba(224, 181, 143, 0.6));
        }

        .particle-1 {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
          animation-duration: 7s;
        }

        .particle-2 {
          top: 30%;
          right: 20%;
          animation-delay: 2s;
          animation-duration: 8s;
          background: radial-gradient(circle, rgba(245, 240, 233, 0.8) 0%, transparent 70%);
        }

        .particle-3 {
          bottom: 25%;
          left: 25%;
          animation-delay: 4s;
          animation-duration: 6s;
        }

        .particle-4 {
          bottom: 35%;
          right: 15%;
          animation-delay: 6s;
          animation-duration: 9s;
          background: radial-gradient(circle, rgba(245, 240, 233, 0.8) 0%, transparent 70%);
        }

        /* Corner Accents */
        .corner-accents {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .corner-accent {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 1px solid rgba(224, 181, 143, 0.4);
          animation: cornerPulse 4s ease-in-out infinite;
        }

        .corner-tl {
          top: 10px;
          left: 10px;
          border-right: none;
          border-bottom: none;
          border-radius: 4px 0 0 0;
          animation-delay: 0s;
        }

        .corner-tr {
          top: 10px;
          right: 10px;
          border-left: none;
          border-bottom: none;
          border-radius: 0 4px 0 0;
          animation-delay: 1s;
        }

        .corner-bl {
          bottom: 10px;
          left: 10px;
          border-right: none;
          border-top: none;
          border-radius: 0 0 0 4px;
          animation-delay: 2s;
        }

        .corner-br {
          bottom: 10px;
          right: 10px;
          border-left: none;
          border-top: none;
          border-radius: 0 0 4px 0;
          animation-delay: 3s;
        }

        /* Animations */
        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-10px) translateX(5px) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: translateY(-15px) translateX(-3px) scale(0.8);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-8px) translateX(8px) scale(1.1);
            opacity: 0.9;
          }
        }

        @keyframes cornerPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        .frame-accent-bottom {
          position: absolute;
          bottom: 15px;
          left: 15px;
          width: 30px;
          height: 30px;
          border-radius: 20% 50% 20% 50%;
          box-shadow: 0 4px 12px rgba(245, 240, 233, 0.3);
          animation: accentPulse 4s ease-in-out infinite 2s;
        }

        /* NEURAL NETWORK CONNECTIONS */
        .neural-connections {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          border-radius: 80px 30px 80px 30px;
        }

        .neural-node {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(224, 181, 143, 1) 0%, rgba(224, 181, 143, 0.3) 70%, transparent 100%);
          border-radius: 50%;
          filter: drop-shadow(0 0 8px rgba(224, 181, 143, 0.8));
          animation: neuralNodePulse 3s ease-in-out infinite;
          box-shadow:
            0 0 12px rgba(224, 181, 143, 0.6),
            inset 0 0 4px rgba(255, 255, 255, 0.4);
        }

        .node-1 {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .node-2 {
          top: 25%;
          right: 20%;
          animation-delay: 0.8s;
        }

        .node-3 {
          bottom: 30%;
          left: 25%;
          animation-delay: 1.6s;
        }

        .node-4 {
          bottom: 20%;
          right: 15%;
          animation-delay: 2.4s;
        }

        .neural-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg,
            rgba(224, 181, 143, 0.8) 0%,
            rgba(245, 240, 233, 0.6) 50%,
            rgba(224, 181, 143, 0.8) 100%
          );
          filter: drop-shadow(0 0 4px rgba(224, 181, 143, 0.5));
          animation: neuralLineFlow 4s ease-in-out infinite;
          transform-origin: left center;
        }

        .line-1 {
          top: 22%;
          left: 18%;
          width: 60px;
          transform: rotate(15deg);
          animation-delay: 0.4s;
        }

        .line-2 {
          top: 45%;
          left: 20%;
          width: 80px;
          transform: rotate(-25deg);
          animation-delay: 1.2s;
        }

        .line-3 {
          bottom: 25%;
          left: 28%;
          width: 70px;
          transform: rotate(35deg);
          animation-delay: 2s;
        }

        /* QUANTUM ENERGY PARTICLES */
        .quantum-field {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 90px 40px 90px 40px;
          animation: quantumFieldPulse 8s ease-in-out infinite;
        }

        .energy-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          border-radius: 90px 40px 90px 40px;
        }

        .energy-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(224, 181, 143, 0.9) 0%, rgba(224, 181, 143, 0.2) 70%, transparent 100%);
          border-radius: 50%;
          filter: drop-shadow(0 0 6px rgba(224, 181, 143, 0.7));
          animation: energyParticleFloat 6s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(224, 181, 143, 0.5);
        }

        .particle-1 {
          top: 15%;
          left: 12%;
          animation-delay: 0s;
          animation-duration: 7s;
        }

        .particle-2 {
          top: 35%;
          right: 18%;
          animation-delay: 1.2s;
          animation-duration: 8s;
          background: radial-gradient(circle, rgba(245, 240, 233, 0.8) 0%, rgba(245, 240, 233, 0.2) 70%, transparent 100%);
          filter: drop-shadow(0 0 6px rgba(245, 240, 233, 0.6));
        }

        .particle-3 {
          bottom: 25%;
          left: 20%;
          animation-delay: 2.4s;
          animation-duration: 6s;
          width: 4px;
          height: 4px;
        }

        .particle-4 {
          top: 60%;
          right: 25%;
          animation-delay: 3.6s;
          animation-duration: 9s;
          width: 2px;
          height: 2px;
        }

        .particle-5 {
          bottom: 40%;
          left: 35%;
          animation-delay: 4.8s;
          animation-duration: 7s;
          background: radial-gradient(circle, rgba(245, 240, 233, 0.9) 0%, rgba(245, 240, 233, 0.3) 70%, transparent 100%);
          filter: drop-shadow(0 0 6px rgba(245, 240, 233, 0.7));
        }

        .particle-6 {
          top: 80%;
          right: 12%;
          animation-delay: 6s;
          animation-duration: 8s;
          width: 5px;
          height: 5px;
        }

        /* CRYSTALLINE STRUCTURE */
        .crystal-structure {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          border-radius: 100px 50px 100px 50px;
        }

        .crystal-facet {
          position: absolute;
          border: 1px solid rgba(245, 240, 233, 0.1);
          filter: drop-shadow(0 0 4px rgba(245, 240, 233, 0.3));
          animation: crystalFacetShimmer 12s ease-in-out infinite;
        }

        .facet-1 {
          top: 10%;
          left: 10%;
          width: 30px;
          height: 30px;
          border-radius: 50% 20% 50% 20%;
          transform: rotate(15deg);
          animation-delay: 0s;
        }

        .facet-2 {
          top: 20%;
          right: 15%;
          width: 25px;
          height: 40px;
          border-radius: 20% 50% 20% 50%;
          transform: rotate(-25deg);
          animation-delay: 3s;
        }

        .facet-3 {
          bottom: 30%;
          left: 20%;
          width: 35px;
          height: 25px;
          border-radius: 30% 70% 30% 70%;
          transform: rotate(45deg);
          animation-delay: 6s;
        }

        .facet-4 {
          bottom: 15%;
          right: 10%;
          width: 28px;
          height: 35px;
          border-radius: 40% 60% 40% 60%;
          transform: rotate(-35deg);
          animation-delay: 9s;
        }

        /* REVOLUTIONARY QUANTUM ANIMATIONS */

        /* Holographic Float */
        @keyframes holographicFloat {
          0%, 100% {
            transform: translateZ(-20px) rotateX(3deg) rotateY(-2deg) translateY(0px);
          }
          33% {
            transform: translateZ(-25px) rotateX(4deg) rotateY(-3deg) translateY(-12px);
          }
          66% {
            transform: translateZ(-18px) rotateX(2deg) rotateY(-1deg) translateY(-8px);
          }
        }

        /* Holographic Shimmer */
        @keyframes holographicShimmer {
          0% {
            background-position: -300% 0;
            filter: hue-rotate(0deg) brightness(1) saturate(1.3);
          }
          50% {
            filter: hue-rotate(20deg) brightness(1.2) saturate(1.5);
          }
          100% {
            background-position: 300% 0;
            filter: hue-rotate(0deg) brightness(1) saturate(1.3);
          }
        }

        /* Quantum Layer Float */
        @keyframes quantumLayerFloat {
          0%, 100% {
            transform: translateZ(-35px) rotateX(-2deg) rotateY(3deg) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateZ(-40px) rotateX(-3deg) rotateY(4deg) scale(1.02);
            opacity: 0.9;
          }
        }

        /* Quantum Rotation */
        @keyframes quantumRotation {
          0% {
            transform: translateZ(-35px) rotateX(-2deg) rotateY(3deg) rotateZ(0deg);
          }
          100% {
            transform: translateZ(-35px) rotateX(-2deg) rotateY(3deg) rotateZ(360deg);
          }
        }

        /* Crystalline Float */
        @keyframes crystallineFloat {
          0%, 100% {
            transform: translateZ(-50px) rotateX(1deg) rotateY(-3deg) translateY(0px);
            opacity: 0.5;
          }
          50% {
            transform: translateZ(-55px) rotateX(2deg) rotateY(-4deg) translateY(-15px);
            opacity: 0.7;
          }
        }

        /* Crystalline Shimmer */
        @keyframes crystallineShimmer {
          0% {
            background-position: -200% 0;
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(25deg) brightness(1.3);
          }
          100% {
            background-position: 200% 0;
            filter: hue-rotate(0deg) brightness(1);
          }
        }

        /* Neural Node Pulse */
        @keyframes neuralNodePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
            filter: drop-shadow(0 0 8px rgba(224, 181, 143, 0.8));
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
            filter: drop-shadow(0 0 16px rgba(224, 181, 143, 1));
          }
        }

        /* Neural Line Flow */
        @keyframes neuralLineFlow {
          0% {
            opacity: 0.3;
            transform: scaleX(0);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
          100% {
            opacity: 0.3;
            transform: scaleX(0);
          }
        }

        /* Quantum Field Pulse */
        @keyframes quantumFieldPulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        /* Energy Particle Float */
        @keyframes energyParticleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-15px) translateX(8px) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: translateY(-25px) translateX(-5px) scale(0.8);
            opacity: 0.9;
          }
          75% {
            transform: translateY(-12px) translateX(12px) scale(1.1);
            opacity: 0.95;
          }
        }

        /* Crystal Facet Shimmer */
        @keyframes crystalFacetShimmer {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1) rotate(var(--initial-rotation, 0deg));
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) rotate(calc(var(--initial-rotation, 0deg) + 10deg));
          }
        }

        /* RESPONSIVE QUANTUM FRAME ADJUSTMENTS */
        @media (min-width: 768px) {
          .quantum-holographic-frame {
            top: -50px;
            left: -50px;
            right: -50px;
            bottom: -50px;
          }

          .holographic-layer {
            border-radius: 100px 40px 100px 40px;
          }

          .primary-layer {
            border-radius: 100px 40px 100px 40px;
            transform: translateZ(-25px) rotateX(4deg) rotateY(-3deg);
          }

          .secondary-layer {
            border-radius: 110px 50px 110px 50px;
            transform: translateZ(-45px) rotateX(-3deg) rotateY(4deg);
          }

          .crystalline-layer {
            border-radius: 120px 60px 120px 60px;
            transform: translateZ(-65px) rotateX(2deg) rotateY(-4deg);
          }

          .neural-node {
            width: 10px;
            height: 10px;
          }

          .energy-particle {
            width: 4px;
            height: 4px;
          }

          .crystal-facet {
            filter: drop-shadow(0 0 6px rgba(245, 240, 233, 0.4));
          }
        }

        .hero-cards-wrapper {
          position: relative;
          overflow: visible;
          width: 100%;
          height: 240px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 8px;
          margin: 0 auto;
          padding: 0 40px 40px 40px;
          z-index: 10;
        }

        .hero-card {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: visible;
          animation: heroFloating 8s ease-in-out infinite 0s, stunningPulse 6s ease-in-out infinite;
          border-radius: 24px;
          width: 100px;
          height: 160px;
          padding: 0;
          transform-origin: center;
          flex-shrink: 0;
          border: 2px solid var(--neon-color, #fff);
          /* 🚀 REVOLUTIONARY GLOW EFFECTS */
          box-shadow:
            0 0 20px var(--neon-color, #fff),
            0 0 40px var(--neon-color, #fff),
            0 0 60px rgba(224, 181, 143, 0.3),
            0 20px 40px rgba(0, 0, 0, 0.4),
            inset 0 2px 0 rgba(255, 255, 255, 0.2),
            inset 0 -2px 0 rgba(0, 0, 0, 0.3);
          /* 🌈 STUNNING MULTI-DIMENSIONAL BACKGROUND */
          background:
            linear-gradient(135deg,
              rgba(15, 15, 35, 0.9) 0%,
              rgba(26, 26, 58, 0.8) 25%,
              rgba(42, 46, 112, 0.7) 50%,
              rgba(26, 26, 58, 0.8) 75%,
              rgba(15, 15, 35, 0.9) 100%),
            radial-gradient(circle at 30% 30%, rgba(224, 181, 143, 0.2) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(76, 104, 192, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 40%);
          backdrop-filter: blur(20px) saturate(1.4) brightness(1.2);
          z-index: 10;
          will-change: transform;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Desktop styles */
        @media (min-width: 768px) {
          .hero-cards-wrapper {
            gap: 20px;
            padding: 0 60px 60px 60px;
            overflow: visible;
            height: 300px;
            align-items: flex-end;
          }

          .hero-card {
            width: 140px;
            height: 200px;
          }
        }



        .card-1 {
          --delay: 4.3s;
          animation-delay: 0s;
          transform: translateY(-5px);
          --neon-color: #ff6b35;
          border-color: #ff6b35;
        }

        .card-2 {
          --delay: 7.3s;
          animation-delay: 3s;
          transform: translateY(0px);
          --neon-color: #00bcd4;
          border-color: #00bcd4;
        }

        .card-3 {
          --delay: 10.3s;
          animation-delay: 6s;
          transform: translateY(-5px);
          --neon-color: #e91e63;
          border-color: #e91e63;
        }

        /* Desktop card positioning */
        @media (min-width: 768px) {
          .card-1 {
            transform: translateY(-10px);
          }

          .card-3 {
            transform: translateY(-10px);
          }
        }

        @keyframes heroOpacity {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes heroFloating {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.02);
          }
        }

        @keyframes stunningPulse {
          0%, 100% {
            box-shadow:
              0 0 20px var(--neon-color, #fff),
              0 0 40px var(--neon-color, #fff),
              0 0 60px rgba(224, 181, 143, 0.3),
              0 20px 40px rgba(0, 0, 0, 0.4),
              inset 0 2px 0 rgba(255, 255, 255, 0.2),
              inset 0 -2px 0 rgba(0, 0, 0, 0.3);
            filter: brightness(1) saturate(1);
          }
          50% {
            box-shadow:
              0 0 30px var(--neon-color, #fff),
              0 0 60px var(--neon-color, #fff),
              0 0 90px rgba(224, 181, 143, 0.4),
              0 25px 50px rgba(0, 0, 0, 0.5),
              inset 0 3px 0 rgba(255, 255, 255, 0.3),
              inset 0 -3px 0 rgba(0, 0, 0, 0.4);
            filter: brightness(1.2) saturate(1.3);
          }
        }



        .hero-lines {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
        }

        .hero-lines::after {
          content: "";
          width: 100%;
          height: 0px;
          position: absolute;
          z-index: 2;
          background: rgba(17, 34, 80, 0.1);
          mask-image: radial-gradient(50% 200px at top, transparent 20%, rgba(17, 34, 80, 0.1));
        }

        .hero-line {
          position: absolute;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-line::before,
        .hero-line::after {
          content: "";
          position: absolute;
          background: linear-gradient(to right, transparent, #E0B58F, transparent);
          height: 2px;
        }

        .hero-line:nth-child(1)::before {
          filter: blur(4px);
          width: 100%;
          height: 5px;
        }

        .hero-line:nth-child(1)::after {
          width: 100%;
          height: 1px;
        }

        .hero-line:nth-child(2)::before {
          filter: blur(4px);
          width: 50%;
          height: 5px;
        }

        .hero-line:nth-child(2)::after {
          width: 50%;
          height: 1px;
        }
      `}</style>
    </motion.div>
  );
};

export default HeroCards;
