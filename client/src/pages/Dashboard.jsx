import React from "react";

export default function Dashboard() {
  // Checkbox tick ikonu için SVG data URI (JSX stili içinde kullanım için)
  const checkboxTickSvg = `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23ffffff' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <main className="layout-container flex h-full grow flex-col">
          <div className="px-8 flex flex-1 justify-center py-10">
            <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1 gap-8">
              {/* PageHeading */}
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-4xl font-black leading-tight tracking-[-0.033em]">
                    Good Morning, Alex!
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                    Monday, October 28
                  </p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Plans */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                  {/* Today's Nutrition Plan */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
                      Today's Nutrition Plan
                    </h2>
                    <div
                      className="flex flex-col divide-y divide-border-light dark:divide-border-dark"
                      style={{ "--checkbox-tick-svg": checkboxTickSvg }}
                    >
                      {/* Breakfast */}
                      <label className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group">
                        <input
                          defaultChecked
                          className="h-6 w-6 rounded border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-border-light dark:focus:border-border-dark focus:outline-none transition-all duration-200"
                          type="checkbox"
                        />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center size-12 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">
                              breakfast_dining
                            </span>
                          </div>
                          <div>
                            <p className="text-base font-medium leading-normal group-hover:text-primary transition-colors">
                              Breakfast: Oatmeal with Berries
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              350 kcal
                            </p>
                          </div>
                        </div>
                      </label>
                      {/* Lunch */}
                      <label className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group">
                        <input
                          className="h-6 w-6 rounded border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-border-light dark:focus:border-border-dark focus:outline-none transition-all duration-200"
                          type="checkbox"
                        />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center size-12 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">
                              lunch_dining
                            </span>
                          </div>
                          <div>
                            <p className="text-base font-medium leading-normal group-hover:text-primary transition-colors">
                              Lunch: Grilled Chicken Salad
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              450 kcal
                            </p>
                          </div>
                        </div>
                      </label>
                      {/* Dinner */}
                      <label className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group">
                        <input
                          className="h-6 w-6 rounded border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-border-light dark:focus:border-border-dark focus:outline-none transition-all duration-200"
                          type="checkbox"
                        />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center size-12 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">
                              dinner_dining
                            </span>
                          </div>
                          <div>
                            <p className="text-base font-medium leading-normal group-hover:text-primary transition-colors">
                              Dinner: Salmon with Quinoa
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              500 kcal
                            </p>
                          </div>
                        </div>
                      </label>
                      {/* Snack */}
                      <label className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group">
                        <input
                          className="h-6 w-6 rounded border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-border-light dark:focus:border-border-dark focus:outline-none transition-all duration-200"
                          type="checkbox"
                        />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center size-12 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">
                              bakery_dining
                            </span>
                          </div>
                          <div>
                            <p className="text-base font-medium leading-normal group-hover:text-primary transition-colors">
                              Snack: Greek Yogurt
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              150 kcal
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Today's Workout */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
                      Today's Workout
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 dark:bg-black/20 p-4 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center size-16 bg-accent-orange/10 rounded-lg text-accent-orange">
                          <span className="material-symbols-outlined text-4xl">
                            fitness_center
                          </span>
                        </div>
                        <div>
                          <p className="text-lg font-bold">
                            Leg Day - Strength
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            45 Minutes • High Intensity
                          </p>
                        </div>
                      </div>
                      <button className="flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-lg h-10 bg-accent-orange text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-6 hover:bg-accent-orange/90 transition-colors">
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Progress */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h3 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-6">
                      Your Progress Today
                    </h3>
                    <div className="flex flex-col gap-8">
                      {/* Calories Progress */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg
                            className="size-full"
                            height="36"
                            viewBox="0 0 36 36"
                            width="36"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="stroke-current text-gray-100 dark:text-white/10"
                              cx="18"
                              cy="18"
                              fill="none"
                              r="16"
                              strokeWidth="3"
                            ></circle>
                            <g className="origin-center -rotate-90 transform">
                              <circle
                                className="stroke-current text-primary"
                                cx="18"
                                cy="18"
                                fill="none"
                                r="16"
                                strokeDasharray="100"
                                strokeDashoffset="40"
                                strokeWidth="3"
                              ></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-primary">
                              60%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Calories</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            1450 / 2500 kcal
                          </p>
                        </div>
                      </div>
                      {/* Water Progress */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg
                            className="size-full"
                            height="36"
                            viewBox="0 0 36 36"
                            width="36"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="stroke-current text-gray-100 dark:text-white/10"
                              cx="18"
                              cy="18"
                              fill="none"
                              r="16"
                              strokeWidth="3"
                            ></circle>
                            <g className="origin-center -rotate-90 transform">
                              <circle
                                className="stroke-current text-accent-orange"
                                cx="18"
                                cy="18"
                                fill="none"
                                r="16"
                                strokeDasharray="100"
                                strokeDashoffset="25"
                                strokeWidth="3"
                              ></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-accent-orange">
                              75%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Water Intake</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            6 / 8 glasses
                          </p>
                        </div>
                      </div>
                      {/* Steps Progress */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg
                            className="size-full"
                            height="36"
                            viewBox="0 0 36 36"
                            width="36"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="stroke-current text-gray-100 dark:text-white/10"
                              cx="18"
                              cy="18"
                              fill="none"
                              r="16"
                              strokeWidth="3"
                            ></circle>
                            <g className="origin-center -rotate-90 transform">
                              <circle
                                className="stroke-current text-accent-yellow"
                                cx="18"
                                cy="18"
                                fill="none"
                                r="16"
                                strokeDasharray="100"
                                strokeDashoffset="55"
                                strokeWidth="3"
                              ></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-accent-yellow">
                              45%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Steps</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            4,500 / 10,000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* FAB */}
        <button className="fixed bottom-8 right-8 z-40 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
}
