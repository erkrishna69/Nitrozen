import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import ActivityFeed from "@/components/sections/ActivityFeed";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import Voting from "@/components/sections/Voting";
import SupportedPlatforms from "@/components/sections/SupportedPlatforms";
import Community from "@/components/sections/Community";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ActivityFeed />
      <Stats />
      <SupportedPlatforms />
      <Features />
      <Voting />
      <Community />
      <FAQ />
      <Footer />
    </>
  );
}
