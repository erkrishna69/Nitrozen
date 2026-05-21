import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          <div className="prose prose-invert prose-blue max-w-none space-y-6 text-gray-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl text-white font-semibold mt-8">1. Information We Collect</h2>
            <p>We only collect the minimal amount of data necessary to provide our music bot services. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Guild (Server) IDs and Voice Channel IDs to route audio playback.</li>
              <li>Discord User IDs for command execution, voting, and premium status tracking.</li>
              <li>Song playback history strictly for generating AI-based music recommendations.</li>
            </ul>

            <h2 className="text-2xl text-white font-semibold mt-8">2. How We Use Your Data</h2>
            <p>Your data is used exclusively for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing seamless music playback across your servers.</li>
              <li>Curating personalized auto-play queues (Smart Playmix).</li>
              <li>Displaying global statistics on our dashboard (anonymized aggregates).</li>
            </ul>

            <h2 className="text-2xl text-white font-semibold mt-8">3. Data Security and Retention</h2>
            <p>We do not sell, rent, or share your data with any third parties. All database connections are securely encrypted. We automatically purge user-specific playback logs when they are no longer required for recommendation models.</p>

            <h2 className="text-2xl text-white font-semibold mt-8">4. Contact Us</h2>
            <p>If you have any questions or wish to have your data completely wiped from our systems, please join our Support Server and open a ticket.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
