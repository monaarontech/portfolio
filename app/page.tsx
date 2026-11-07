import React from "react";
import CinematicBackground from "@/components/CinematicBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SecretTerminal from "@/components/SecretTerminal";
import AchievementSystem from "@/components/AchievementSystem";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07070A] text-[#F5F5F7] relative selection:bg-[#FF2A4D] selection:text-white overflow-x-hidden">
      {/* 1. Cinematic Background Layer: Fixed, pointer-events-none, z-0 */}
      <CinematicBackground />

      {/* 2. Content Layer: Relative, z-10 */}
      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />
        <Hero />
        <TechMarquee />
        <AboutSection />
        <PortfolioSection />
        <SocialMediaSection />
        <ContactSection />
        <Footer />
        <SecretTerminal />
        <AchievementSystem />
      </div>
    </main>
  );
}
