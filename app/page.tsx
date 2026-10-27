import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import AboutSection from "@/components/AboutSection";
import FlagshipProject from "@/components/FlagshipProject";
import ProjectsGallery from "@/components/ProjectsGallery";
import InteractiveDevStudio from "@/components/InteractiveDevStudio";
import PlaygroundSection from "@/components/PlaygroundSection";
import SkillsMatrix from "@/components/SkillsMatrix";
import WorkProcess from "@/components/WorkProcess";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SecretTerminal from "@/components/SecretTerminal";
import AchievementSystem from "@/components/AchievementSystem";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07070A] text-[#F5F5F7] relative selection:bg-[#FF2A4D] selection:text-white">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <TechMarquee />
      <AboutSection />
      <FlagshipProject />
      <ProjectsGallery />
      <InteractiveDevStudio />
      <PlaygroundSection />
      <SkillsMatrix />
      <WorkProcess />
      <ContactSection />
      <Footer />
      <SecretTerminal />
      <AchievementSystem />
    </main>
  );
}
