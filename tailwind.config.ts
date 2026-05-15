import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // backrooms palette
        backrooms: {
          yellow: "#cda434",
          yellowSick: "#d4b94f",
          wall: "#a88928",
          carpet: "#3a2410",
          dirt: "#1a1208",
        },
        // arcade / terminal
        terminal: {
          green: "#39ff14",
          dim: "#1f9c0c",
          phosphor: "#7cff5a",
          amber: "#ffb000",
        },
        // alert states
        alert: {
          red: "#ff1a1a",
          blood: "#7a0000",
          warn: "#ff7300",
        },
        // void
        void: {
          900: "#050402",
          800: "#0a0805",
          700: "#100c08",
        },
      },
      fontFamily: {
        mono: ["VT323", "Share Tech Mono", "ui-monospace", "monospace"],
        glitch: ["Major Mono Display", "VT323", "monospace"],
        body: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      animation: {
        flicker: "flicker 3.6s linear infinite",
        flickerFast: "flicker 0.8s linear infinite",
        scanline: "scanline 6s linear infinite",
        scanlineFast: "scanline 2.4s linear infinite",
        crtBoot: "crtBoot 1.8s ease-out forwards",
        glitchShift: "glitchShift 2.6s infinite steps(1)",
        hunger: "hunger 1.4s ease-in-out infinite",
        chomp: "chomp 0.45s steps(2) infinite",
        prey: "prey 2.2s ease-in-out infinite",
        dust: "dust 14s linear infinite",
        pulseAlert: "pulseAlert 1.1s ease-in-out infinite",
        noise: "noise 0.12s steps(2) infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.35" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        crtBoot: {
          "0%": { transform: "scaleY(0.005) scaleX(1)", opacity: "0" },
          "30%": { transform: "scaleY(0.01) scaleX(1)", opacity: "0.6" },
          "60%": { transform: "scaleY(1) scaleX(1.03)", opacity: "1" },
          "100%": { transform: "scaleY(1) scaleX(1)", opacity: "1" },
        },
        glitchShift: {
          "0%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2px,1px)" },
          "20%": { transform: "translate(2px,-1px)" },
          "30%": { transform: "translate(-1px,2px)" },
          "40%": { transform: "translate(1px,-2px)" },
          "50%, 100%": { transform: "translate(0,0)" },
        },
        hunger: {
          "0%, 100%": { transform: "scale(1)", filter: "hue-rotate(0deg)" },
          "50%": { transform: "scale(1.04)", filter: "hue-rotate(-12deg)" },
        },
        chomp: {
          "0%, 100%": { clipPath: "polygon(0 0, 100% 0, 100% 35%, 50% 50%, 100% 65%, 100% 100%, 0 100%)" },
          "50%": { clipPath: "polygon(0 0, 100% 0, 100% 50%, 50% 50%, 100% 50%, 100% 100%, 0 100%)" },
        },
        prey: {
          "0%, 100%": { opacity: "0.85", transform: "translate(0,0)" },
          "50%": { opacity: "0.3", transform: "translate(2px,-2px)" },
        },
        dust: {
          "0%": { transform: "translate(0,0)" },
          "100%": { transform: "translate(-200px,-120px)" },
        },
        pulseAlert: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 18px #ff1a1a" },
          "50%": { opacity: "0.55", boxShadow: "0 0 4px #ff1a1a" },
        },
        noise: {
          "0%": { transform: "translate(0,0)" },
          "100%": { transform: "translate(-3px,2px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        crt: "inset 0 0 120px rgba(0,0,0,0.85), inset 0 0 30px rgba(205,164,52,0.18)",
        terminal: "0 0 0 1px #39ff14 inset, 0 0 18px rgba(57,255,20,0.35)",
        alertGlow: "0 0 24px rgba(255,26,26,0.6)",
      },
      backgroundImage: {
        scanlines:
          "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.28) 3px, rgba(0,0,0,0) 4px)",
        crtNoise:
          "radial-gradient(ellipse at center, rgba(20,15,5,0) 55%, rgba(0,0,0,0.85) 100%)",
        backroomsWall:
          "repeating-linear-gradient(0deg, #a88928 0px, #a88928 24px, #8a6e1f 24px, #8a6e1f 25px), repeating-linear-gradient(90deg, transparent 0px, transparent 30px, rgba(0,0,0,0.06) 30px, rgba(0,0,0,0.06) 31px)",
      },
    },
  },
  plugins: [],
};

export default config;
