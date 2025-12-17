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
    </div>
  );
}
