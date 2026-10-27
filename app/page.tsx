import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import AboutSection from "@/components/AboutSection";
import FlagshipProject from "@/components/FlagshipProject";
import ProjectsGallery from "@/components/ProjectsGallery";
import CreativeMediaLab from "@/components/CreativeMediaLab";
import SkillsMatrix from "@/components/SkillsMatrix";
import WorkProcess from "@/components/WorkProcess";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090A0F] text-[#F5F5F7] relative selection:bg-[#FF2A4D] selection:text-white">
      <Navbar />
      <Hero />
      <TechMarquee />
      <AboutSection />
      <FlagshipProject />
      <ProjectsGallery />
      <CreativeMediaLab />
      <SkillsMatrix />
      <WorkProcess />
      <ContactSection />
      <Footer />
    </main>
  );
}
