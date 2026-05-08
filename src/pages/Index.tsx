import React from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import InteractivePositioning from "@/components/sections/InteractivePositioning";
import ExpertiseList from "@/components/sections/ExpertiseList";
import ExperienceNarrative from "@/components/sections/ExperienceNarrative";
import TimelineSection from "@/components/sections/TimelineSection";
import ParallaxClients from "@/components/sections/ParallaxClients";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import Testimonials from "@/components/ui/testimonials";
import DesignPhilosophy from "@/components/sections/DesignPhilosophy";
import FooterContact from "@/components/sections/FooterContact";

import HeroSection from "@/components/sections/HeroSection";

const Index: React.FC = () => {
  useSmoothScroll();
  useCustomCursor();

  return (
    <main>
      <HeroSection />

      {/* Portfolio sections start here */}
      <InteractivePositioning />
      <ExpertiseList />
      <ExperienceNarrative />
      <TimelineSection />
      <ParallaxClients />
      <ProjectShowcase />
      <Testimonials />
      <DesignPhilosophy />
      <FooterContact />
    </main>
  );
};

export default Index;
