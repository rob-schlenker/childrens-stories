"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden min-h-[420px] flex items-center justify-center">
      {/* Decorative Stars */}
      <StarDecor />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl px-8 py-16">
        {/* Left: Text */}
        <div className="flex-1 text-left">
          <h1 className="font-extrabold text-4xl md:text-5xl mb-6 leading-tight font-[Quicksand,sans-serif]">
            Welcome to <br />
            <span className="text-[#ffd700]">Starlit Library</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-xl font-[Inter,sans-serif]">
            Discover magical stories under a sky full of stars.<br />
            Pick a tale, and let your imagination soar!
          </p>
        </div>
        {/* Right: Logo */}
        <motion.div
          className="flex-1 flex justify-center items-center mt-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/starlit-library-logo-removebg-preview.png" // <-- Replace with your logo path
            alt="Starlit Library Logo"
            width={320}
            height={320}
            className="w-[220px] h-[220px] md:w-[320px] md:h-[320px] object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

// Decorative Stars
function StarDecor() {
  // Array of star positions and sizes
  const stars = [
    { top: "10%", left: "8%", size: 4 },
    { top: "18%", left: "40%", size: 3 },
    { top: "6%", left: "60%", size: 5 },
    { top: "30%", left: "90%", size: 4 },
    { top: "60%", left: "95%", size: 3 },
    { top: "80%", left: "70%", size: 2 },
    { top: "85%", left: "20%", size: 3 },
    { top: "50%", left: "50%", size: 2 },
    { top: "15%", left: "80%", size: 4 },
    { top: "70%", left: "10%", size: 2 },
  ];
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#ffd700] opacity-90"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            filter: "drop-shadow(0 0 6px #ffd70088)",
          }}
        />
      ))}
    </div>
  );
}

