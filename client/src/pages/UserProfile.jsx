import React, { useState } from 'react';

export default function UserProfile() {
  // Slider ve Input senkronizasyonu için state
  const [targetWeight, setTargetWeight] = useState(68);

  const handleWeightChange = (e) => {
    setTargetWeight(e.target.value);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
            
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-4 sm:px-6 md:px-10 py-3">
              <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                <div className="size-8 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_6_543)">
                      <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                      <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_6_543">
                        <rect fill="white" height="48" width="48"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Akıllı Beslenme</h2>
              </div>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-gray-900 dark:text-gray-900 text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Save &amp; Continue</span>
              </button>
            </header>

            <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8">
              <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between">
                  <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">Step 1 of 4: Personal Info</p>
                </div>
                <div className="rounded-full bg-primary/20 dark:bg-primary/30">
                  <div className="h-2 rounded-full bg-primary" style={{ width: '25%' }}></div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Let's get to know you</p>
              </div>

              <div className="flex flex-wrap justify-between gap-3">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Create Your Profile</p>
                  <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Tell us a bit about yourself to create your personalized plan.</p>
                </div>
              </div>

              {/* Section 1: Personal Information */}
              <section className="space-y-4">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Full Name</p>
                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" placeholder="Enter your name" defaultValue="" />
                  </label>
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Age</p>
                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" placeholder="Enter your age" type="number" defaultValue="" />
                  </label>
                  <div className="flex flex-col min-w-40 flex-1">
                    <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Gender</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors">
                        <input className="form-radio text-primary focus:ring-primary" name="gender" type="radio" value="male" />
                        <span className="text-gray-900 dark:text-white">Male</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors">
                        <input className="form-radio text-primary focus:ring-primary" name="gender" type="radio" value="female" />
                        <span className="text-gray-900 dark:text-white">Female</span>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <label className="flex flex-col min-w-20 flex-1">
                      <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Height (cm)</p>
                      <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" placeholder="175" type="number" defaultValue="" />
                    </label>
                    <label className="flex flex-col min-w-20 flex-1">
                      <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Weight (kg)</p>
                      <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" placeholder="70" type="number" defaultValue="" />
                    </label>
                  </div>
                </div>
              </section>

              {/* Section 2: Lifestyle & Activity */}
              <section className="space-y-4">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Lifestyle &amp; Activity</h2>
                <div className="flex flex-col">
                  <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Activity Level</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Activity Options */}
                    {[
                      { val: 'sedentary', icon: 'chair', label: 'Sedentary', sub: 'Little to no exercise' },
                      { val: 'light', icon: 'directions_walk', label: 'Lightly Active', sub: '1-3 days/week' },
                      { val: 'moderate', icon: 'fitness_center', label: 'Moderately Active', sub: '3-5 days/week' },
                      { val: 'very', icon: 'sprint', label: 'Very Active', sub: '6-7 days/week' }
                    ].map((item) => (
                      <label key={item.val} className="flex flex-col items-center justify-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors text-center">
                        <input className="sr-only" name="activity" type="radio" value={item.val} />
                        <span className="material-symbols-outlined text-4xl mb-2 text-gray-600 dark:text-gray-300">{item.icon}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{item.label}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 3: Primary Goal */}
              <section className="space-y-4">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Primary Goal</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-4 has-[:checked]:ring-primary/20 transition-all">
                    <input className="sr-only" name="goal" type="radio" value="lose_weight" />
                    <span className="material-symbols-outlined text-5xl mb-3 text-[#f56036]">trending_down</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">Lose Weight</span>
                  </label>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-4 has-[:checked]:ring-primary/20 transition-all">
                    <input defaultChecked className="sr-only" name="goal" type="radio" value="maintain_weight" />
                    <span className="material-symbols-outlined text-5xl mb-3 text-[#fbcf33]">sync_alt</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">Maintain Weight</span>
                  </label>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-4 has-[:checked]:ring-primary/20 transition-all">
                    <input className="sr-only" name="goal" type="radio" value="gain_muscle" />
                    <span className="material-symbols-outlined text-5xl mb-3 text-primary">trending_up</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">Gain Muscle</span>
                  </label>
                </div>

                <div className="flex flex-col min-w-40 flex-1 pt-4">
                  <label className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2 flex items-center gap-2" htmlFor="target-weight-slider">
                    Target Weight (kg)
                    <div className="relative group">
                      <span className="material-symbols-outlined text-base text-gray-400 cursor-help">info</span>
                      <div className="absolute bottom-full mb-2 w-60 bg-gray-800 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2">
                        Set your desired weight. We'll use this to calculate your daily calorie and macro goals.
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                      </div>
                    </div>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer dark:bg-primary/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                      id="target-weight-slider"
                      max="150"
                      min="40"
                      type="range"
                      value={targetWeight}
                      onChange={handleWeightChange}
                    />
                    <input
                      className="form-input w-24 text-center rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-12 p-2 text-base font-normal leading-normal"
                      type="number"
                      value={targetWeight}
                      onChange={handleWeightChange}
                    />
                  </div>
                </div>
              </section>

              {/* Section 4: Dietary Preferences */}
              <section className="space-y-4">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Dietary Preferences</h2>
                <div>
                  <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-3">Common Diets (Select one or more)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {['Vegan', 'Vegetarian', 'Keto', 'Paleo'].map((diet) => (
                      <label key={diet} className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors">
                        <input className="form-checkbox rounded text-primary focus:ring-primary" name="diet" type="checkbox" value={diet.toLowerCase()} />
                        <span className="text-gray-900 dark:text-white">{diet}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-3">Allergies &amp; Intolerances</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {['Nuts', 'Dairy', 'Gluten', 'Shellfish'].map((allergy) => (
                      <label key={allergy} className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer has-[:checked]:bg-[#f56036]/20 has-[:checked]:border-[#f56036] transition-colors">
                        <input className="form-checkbox rounded text-[#f56036] focus:ring-[#f56036]" name="allergy" type="checkbox" value={allergy.toLowerCase()} />
                        <span className="text-gray-900 dark:text-white">{allergy}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              <div className="flex justify-center pt-8">
                <button className="flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-14 px-6 bg-primary text-gray-900 text-lg font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                  <span>Generate My Plan</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
}