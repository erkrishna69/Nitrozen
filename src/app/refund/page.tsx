import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">Refund Policy</h1>
          <div className="prose prose-invert prose-blue max-w-none space-y-6 text-gray-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl text-white font-semibold mt-8">1. Standard Refund Window</h2>
            <p>We want you to be completely satisfied with Nitrozen Premium. If you are not happy with your purchase, we offer a <strong>7-day money-back guarantee</strong> on all new subscriptions. Simply open a support ticket within 7 days of your initial purchase for a full refund.</p>

            <h2 className="text-2xl text-white font-semibold mt-8">2. Recurring Subscriptions</h2>
            <p>If you forgot to cancel a recurring subscription before the billing date, you must contact us within 48 hours of the renewal charge. Refunds requested after 48 hours of a renewal will be denied, but your premium status will remain active until the end of the billing cycle.</p>

            <h2 className="text-2xl text-white font-semibold mt-8">3. Exceptions</h2>
            <p>We do not grant refunds under the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You were permanently banned from using the bot for violating our Terms of Service or Discord's Terms of Service.</li>
              <li>You have already requested and received a refund in the past (to prevent abuse of the 7-day policy).</li>
              <li>The downtime experienced was due to Discord API outages and not our own infrastructure.</li>
            </ul>

            <h2 className="text-2xl text-white font-semibold mt-8">4. How to Request a Refund</h2>
            <p>To request a refund, please join our official Discord Support Server and open a billing ticket. Provide your transaction ID and Discord User ID for prompt processing.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
