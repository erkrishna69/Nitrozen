import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          <div className="prose prose-invert prose-blue max-w-none space-y-6 text-gray-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl text-white font-semibold mt-8">1. Acceptance of Terms</h2>
            <p>By inviting Nitrozen to your Discord server or using our website, you agree to comply with these Terms of Service. If you do not agree, please do not use our services.</p>

            <h2 className="text-2xl text-white font-semibold mt-8">2. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the bot to stream illegal, copyrighted material you do not have rights to (outside of fair use).</li>
              <li>Spam commands, attempt to crash the bot, or bypass our rate limits and abuse guards.</li>
              <li>Reverse engineer or attempt to breach the underlying infrastructure of the bot.</li>
            </ul>

            <h2 className="text-2xl text-white font-semibold mt-8">3. Premium Subscriptions</h2>
            <p>If you purchase a premium subscription, you agree to the recurring billing cycles specified at checkout. Premium perks are tied to your Discord User ID and can be transferred between servers under the guidelines of our Premium system.</p>

            <h2 className="text-2xl text-white font-semibold mt-8">4. Service Availability</h2>
            <p>While we strive for 99.99% uptime via our robust Lavalink nodes, we do not guarantee uninterrupted service. Nitrozen may occasionally go offline for maintenance or updates.</p>

            <h2 className="text-2xl text-white font-semibold mt-8">5. Termination</h2>
            <p>We reserve the right to blacklist any user or server from using Nitrozen without prior notice if they violate these Terms, Discord's ToS, or engage in malicious activity.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
