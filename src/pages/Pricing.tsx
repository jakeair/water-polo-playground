import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navigation />
      
      <div className="container px-4 py-24 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-white/70">Choose the plan that works best for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Free Trial */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="absolute -top-4 right-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Free Trial
              </span>
            </div>

            <div className="text-white mb-8">
              <h3 className="text-2xl font-semibold mb-2">14-Day Trial</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-white/70">/14 days</span>
              </div>
              <p className="text-white/70 mt-2">No credit card required</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Limited access to features",
                "Create up to 5 plays",
                "Basic formations",
                "Export to PDF",
                "Community support"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="#"
              className="block w-full py-3 px-6 text-center rounded-lg bg-white text-slate-900 hover:bg-white/90 transition-colors font-medium"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Quarterly Plan */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-white mb-8">
              <h3 className="text-2xl font-semibold mb-2">Quarterly Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-white/70">/month</span>
              </div>
              <p className="text-white/70 mt-2">Billed quarterly ($87)</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Access to all features",
                "Unlimited plays and formations",
                "Team collaboration",
                "Export to PDF",
                "Priority support"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="#"
              className="block w-full py-3 px-6 text-center rounded-lg bg-white text-slate-900 hover:bg-white/90 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Annual Plan */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="absolute -top-4 right-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Save 20%
              </span>
            </div>

            <div className="text-white mb-8">
              <h3 className="text-2xl font-semibold mb-2">Annual Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$23</span>
                <span className="text-white/70">/month</span>
              </div>
              <p className="text-white/70 mt-2">Billed annually ($276)</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "All features from Quarterly",
                "Unlimited plays and formations",
                "Team collaboration",
                "Export to PDF",
                "Priority support",
                "Early access to new features"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="#"
              className="block w-full py-3 px-6 text-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;