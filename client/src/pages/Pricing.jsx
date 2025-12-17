import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();
  // Faturalandırma durumu: 'monthly' veya 'yearly'
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Fiyat Hesaplama Mantığı
  // Yıllık seçilirse %20 indirimli fiyatı gösteriyoruz
  const prices = {
    smart: billingCycle === "monthly" ? 49.99 : 39.99,
    elite: billingCycle === "monthly" ? 89.99 : 71.99,
  };

  const toggleBilling = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-100 antialiased min-h-screen flex flex-col transition-colors duration-200">
      {/* --- HERO SECTION --- */}
      <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
          Invest in yourself
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Choose Your Path to Health
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Personalized meal plans, smart ingredient tracking, and adaptive
          workouts. Start your journey today with a plan that fits your life.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center space-x-4">
          <span
            className={`text-sm font-medium ${
              billingCycle === "monthly"
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Monthly
          </span>

          {/* Custom Toggle Switch using Tailwind */}
          <div
            onClick={toggleBilling}
            className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
              billingCycle === "yearly"
                ? "bg-primary"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <div
              className={`absolute top-0 left-0 w-7 h-7 bg-white rounded-full border-4 border-gray-200 shadow-sm transition-transform duration-300 ease-in-out ${
                billingCycle === "yearly"
                  ? "translate-x-7 border-primary"
                  : "translate-x-0"
              }`}
            ></div>
          </div>

          <span
            className={`text-sm font-medium flex items-center gap-2 ${
              billingCycle === "yearly"
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Yearly
            <span className="text-xs font-bold text-accent-orange bg-accent-orange/10 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* --- PRICING CARDS --- */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Basic Plan */}
          <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Starter
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Essential tools for mindful eating.
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                Free
              </span>
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                / forever
              </span>
            </div>
            <button
              onClick={() => navigate("/register")}
              className="w-full block text-center py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:border-primary hover:text-primary transition-colors mb-8"
            >
              Get Started
            </button>
            <ul className="space-y-4 flex-1">
              {[
                "Basic Calorie Tracking",
                "Water Intake Log",
                "Standard Recipe Library",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="material-symbols-outlined text-primary text-xl mr-3">
                    check_circle
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
              {["Ingredient Scanner", "Macro Analysis"].map((item, i) => (
                <li key={i} className="flex items-start opacity-50">
                  <span className="material-symbols-outlined text-gray-400 text-xl mr-3">
                    cancel
                  </span>
                  <span className="text-sm text-gray-500">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Plan (Hero) */}
          <div className="bg-surface-light dark:bg-surface-dark border-2 border-primary rounded-2xl p-8 flex flex-col h-full relative shadow-xl shadow-primary/10 transform md:-translate-y-4 z-10 transition-all duration-300 hover:-translate-y-6">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
              MOST POPULAR
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary">
                Smart Planner
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                AI-powered plans for serious results.
              </p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ₺{prices.smart.toFixed(2)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 font-medium ml-1">
                  / mo
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {billingCycle === "yearly"
                  ? "Billed ₺" + (prices.smart * 12).toFixed(2) + " yearly"
                  : "Billed monthly"}
              </p>
            </div>
            <button
              onClick={() => navigate("/register")}
              className="w-full block text-center py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold shadow-lg shadow-primary/30 transition-all mb-8"
            >
              Start 7-Day Free Trial
            </button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary text-xl mr-3">
                  check_circle
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Everything in Starter
                </span>
              </li>
              {[
                "AI Meal Generation",
                "Photo Ingredient Scanner",
                "Macro & Micronutrients",
                "Shopping List Export",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="material-symbols-outlined text-primary text-xl mr-3">
                    check_circle
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Elite Plan */}
          <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Elite Coach
                </h3>
                <span className="bg-accent-yellow/20 text-accent-yellow text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Full coaching & workout integration.
              </p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ₺{prices.elite.toFixed(2)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 font-medium ml-1">
                  / mo
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {billingCycle === "yearly"
                  ? "Billed ₺" + (prices.elite * 12).toFixed(2) + " yearly"
                  : "Billed monthly"}
              </p>
            </div>
            <button
              onClick={() => navigate("/register")}
              className="w-full block text-center py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-colors mb-8"
            >
              Upgrade to Elite
            </button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary text-xl mr-3">
                  check_circle
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Everything in Smart Planner
                </span>
              </li>
              {[
                "Personalized Workout Plans",
                "1-on-1 Chat with Dietitian",
                "Advanced Health Report",
                "Apple Health Sync",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="material-symbols-outlined text-primary text-xl mr-3">
                    check_circle
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- TRUST SIGNALS --- */}
      <section className="py-12 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
            Trusted by over 50,000 healthy eaters
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logo Placeholders */}
            {[
              { icon: "fitness_center", name: "FitLife" },
              { icon: "restaurant_menu", name: "NutriPlan" },
              { icon: "monitor_heart", name: "CardioPulse" },
              { icon: "spa", name: "MindBody" },
            ].map((logo, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">
                  {logo.icon}
                </span>
                <span className="font-bold text-xl">{logo.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            {/* Testimonial 1 */}
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1 mb-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm">
                    star
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                "The ingredient scanner is a lifesaver. I just take a photo of
                my fridge contents and get a perfect meal plan in seconds. Lost
                5kg in my first month!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
                    alt="Elif Yılmaz"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    Elif Yılmaz
                  </p>
                  <p className="text-[10px] text-gray-500">Premium User</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1 mb-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm">
                    star
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                "Finally a fitness app that understands Turkish cuisine! The
                localized recipes make it so easy to stick to my macros without
                giving up flavor."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
                    alt="Can Demir"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    Can Demir
                  </p>
                  <p className="text-[10px] text-gray-500">Elite Coach User</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, absolutely. There are no long-term commitments. You can cancel your subscription at any time from your account settings.",
              },
              {
                q: "How does the ingredient scanner work?",
                a: "Our Smart Planner uses AI image recognition. Simply snap a photo of the ingredients on your table or in your fridge, and our app will identify them.",
              },
              {
                q: "Is there a student discount?",
                a: "Yes! Students with a valid .edu email address are eligible for a 50% discount on the Smart Planner annual plan.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-medium text-gray-900 dark:text-white list-none">
                  <span>{item.q}</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Akıllı Beslenme. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* Sosyal Medya ikonları... */}
              <span className="text-gray-400 cursor-pointer hover:text-primary">
                Instagram
              </span>
              <span className="text-gray-400 cursor-pointer hover:text-primary">
                Twitter
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
