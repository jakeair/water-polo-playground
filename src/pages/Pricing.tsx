import { Check, DollarSign, Award, Star, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navigation />
      
      <div className="container px-4 py-16 mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
            Transform Your Water Polo Strategy
          </h1>
          <p className="text-lg text-white/70 mb-8">
            Join coaches and teams worldwide using our platform to elevate their game planning and team performance
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
            <Zap className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Strategy</h3>
            <p className="text-white/70">
              Create and modify plays in real-time during matches and practice sessions
            </p>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
            <Shield className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
            <p className="text-white/70">
              Track team performance and analyze patterns to improve game strategy
            </p>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
            <Users className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Team Collaboration</h3>
            <p className="text-white/70">
              Share strategies with your coaching staff and players seamlessly
            </p>
          </Card>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Free Trial */}
          <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/[0.15] transition-all duration-300">
            <div className="absolute -top-4 right-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Free Trial
              </span>
            </div>

            <div className="text-white mb-8">
              <h3 className="text-2xl font-semibold mb-2">7-Day Trial</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-white/70">/7 days</span>
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
                  <Check className="h-5 w-5 text-green-400 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="block w-full py-3 px-6 text-center rounded-lg bg-white text-slate-900 hover:bg-white/90 transition-colors font-medium"
            >
              Start Free Trial
            </Link>
          </Card>

          {/* Quarterly Plan */}
          <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/[0.15] transition-all duration-300 transform md:scale-105 z-10">
            <div className="absolute -top-4 right-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>

            <div className="text-white mb-8">
              <h3 className="text-2xl font-semibold mb-2">Quarterly Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$28</span>
                <span className="text-white/70">/month</span>
              </div>
              <p className="text-white/70 mt-2">Billed quarterly ($84)</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Access to all features",
                "Unlimited plays and formations",
                "Team collaboration",
                "Export to PDF",
                "Priority support",
                "Advanced analytics"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <Check className="h-5 w-5 text-blue-400 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="block w-full py-3 px-6 text-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
            >
              Get Started
            </Link>
          </Card>

          {/* Annual Plan */}
          <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/[0.15] transition-all duration-300">
            <div className="absolute -top-4 right-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Save 50%
              </span>
            </div>

            <div className="text-white mb-8">
              <h3 className="text-2xl font-semibold mb-2">Annual Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$14</span>
                <span className="text-white/70">/month</span>
              </div>
              <p className="text-white/70 mt-2">Billed annually ($168)</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "All features from Quarterly",
                "Unlimited plays and formations",
                "Team collaboration",
                "Export to PDF",
                "Priority support",
                "Early access to new features",
                "Dedicated account manager"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <Check className="h-5 w-5 text-blue-400 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="block w-full py-3 px-6 text-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
            >
              Get Started
            </Link>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Trusted by Coaches Worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <Star className="h-6 w-6 text-yellow-400 mx-auto mb-4" />
              <p className="text-white/80 mb-4">
                "This tool has revolutionized how we plan and execute our strategies. It's become an essential part of our coaching toolkit."
              </p>
              <p className="text-white font-medium">- John D., Head Coach</p>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <Star className="h-6 w-6 text-yellow-400 mx-auto mb-4" />
              <p className="text-white/80 mb-4">
                "The ability to create and share plays in real-time has greatly improved our team's communication and performance."
              </p>
              <p className="text-white font-medium">- Sarah M., Assistant Coach</p>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <Star className="h-6 w-6 text-yellow-400 mx-auto mb-4" />
              <p className="text-white/80 mb-4">
                "Worth every penny. The analytics features alone have helped us identify and improve key aspects of our game."
              </p>
              <p className="text-white font-medium">- Mike R., Team Manager</p>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Can I switch plans later?</h3>
              <p className="text-white/70">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </Card>
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Is there a limit to team members?</h3>
              <p className="text-white/70">No, all paid plans include unlimited team members and collaboration features.</p>
            </Card>
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Do you offer refunds?</h3>
              <p className="text-white/70">Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;