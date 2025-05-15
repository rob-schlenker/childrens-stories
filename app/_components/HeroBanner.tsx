"use client";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[350px] py-12 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 px-8 py-10 rounded-3xl bg-white/20 dark:bg-white/10 backdrop-blur-md shadow-xl flex flex-col items-center max-w-xl"
      >
        {/* Animated Book & Moon */}
        <motion.div
          className="mb-4"
          animate={{
            y: [0, -12, 0], // float up and down
            rotate: [-3, 3, -3], // gentle tilt
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <ellipse cx="40" cy="60" rx="28" ry="8" fill="#b8c1ec" opacity="0.3"/>
            <rect x="18" y="20" width="44" height="32" rx="6" fill="#f4faff" stroke="#6c63ff" strokeWidth="2"/>
            <rect x="22" y="24" width="36" height="24" rx="3" fill="#b8c1ec" />
            <path d="M40 20v32" stroke="#6c63ff" strokeWidth="2"/>
            {/* Moon */}
            <circle cx="60" cy="18" r="10" fill="#ffd700" opacity="0.9"/>
            <path d="M66 18a6 6 0 1 1-12 0 6 6 0 0 0 12 0z" fill="#232946" opacity="0.7"/>
            {/* Stars */}
            <circle cx="15" cy="12" r="1.5" fill="#ffd700"/>
            <circle cx="70" cy="10" r="1" fill="#fff"/>
            <circle cx="65" cy="30" r="1.2" fill="#fff"/>
          </svg>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-2 text-center">
          Welcome to <span className="text-[#ffd700]">Starlit Library</span>
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-white/90 text-center mb-4">
          Discover magical stories under a sky full of stars.<br />
          Pick a tale, and let your imagination soar!
        </h2>
        <a
          href="#stories"
          className="mt-4 px-6 py-2 rounded-full bg-[#ffd700] text-[#232946] font-bold shadow-lg hover:bg-[#ffe066] transition"
        >
          Start Reading
        </a>
      </motion.div>
    </section>
  );
}
