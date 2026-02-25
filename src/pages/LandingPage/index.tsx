import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import HeroSection from "./components/HeroSection";
import StatsBanner from "./components/StatsBanner";
import ContextParsingSection from "./components/ContextParsingSection";
import FeaturesSection from "./components/FeaturesSection";
import AnalyticsSection from "./components/AnalyticsSection";
import CTASection from "./components/CTASection";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsBanner />
        <ContextParsingSection />
        <FeaturesSection />
        <AnalyticsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
