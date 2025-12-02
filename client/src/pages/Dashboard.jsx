import React from 'react';

export default function Dashboard() {
  // Checkbox tick ikonu için SVG data URI (JSX stili içinde kullanım için)
  const checkboxTickSvg = `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23ffffff' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        
        {/* TopNavBar */}
        <header className="sticky top-0 z-50 flex items-center justify-center whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
          <div className="flex items-center justify-between w-full max-w-7xl px-8 py-3">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-text-light dark:text-text-dark">
                <div className="size-8 text-primary">
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_6_543)">
                      <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"></path>
                      <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_6_543">
                        <rect fill="white" height="48" width="48"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Akıllı Beslenme</h2>
              </div>
              <div className="hidden md:flex items-center gap-9 text-sm font-medium">
                <a className="text-primary font-bold" href="#">Dashboard</a>
                <a className="hover:text-primary transition-colors" href="#">Plans</a>
                <a className="hover:text-primary transition-colors" href="#">Recipes</a>
                <a className="hover:text-primary transition-colors" href="#">Progress</a>
              </div>
            </div>
            <div className="flex flex-1 justify-end items-center gap-4">
              <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-gray-500 dark:text-gray-400 flex border-none bg-gray-100 dark:bg-white/10 items-center justify-center pl-3 rounded-l-lg border-r-0">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-white/10 dark:text-white h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search" defaultValue="" />
                </div>
              </label>
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-gray-100 dark:bg-white/10 text-text-light dark:text-text-dark gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </button>
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/ogw/AF2bZyiWv85l0T_h-pGkG-q0A7t0-oY2mX_h7zX_zX_z=s32-c-mo")' }}></div>
            </div>
          </div>
        </header>

        <main className="layout-container flex h-full grow flex-col">
          <div className="px-8 flex flex-1 justify-center py-10">
            <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1 gap-8">
              
              {/* PageHeading */}
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-4xl font-black leading-tight tracking-[-0.033em]">Good Morning, Alex!</p>
                  <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Monday, October 28</p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Plans */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                  
                  {/* Today's Nutrition Plan */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">Today's Nutrition Plan</h2>
                    <div className="flex flex-col divide-y divide-border-light dark:divide-border-dark" style={{ '--checkbox-tick-svg': checkboxTickSvg }}>
                      {/* Breakfast */}
                      <label className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group">
                        <input defaultChecked className="h-6 w-6 rounded border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-border-light dark:focus:border-border-dark focus:outline-none transition-all duration-200" type="checkbox" />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center size-12 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">breakfast_dining</span>
                          </div>
                          <div>
                            <p className="text-base font-medium leading-normal group-hover:text-primary transition-colors">Breakfast: Oatmeal with Berries</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">350 kcal</p>
                          </div>
                        </div>
                      </label>
                      {/* Lunch */}
                      <label className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group">
                        <input className="h-6 w-6 rounded border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-border-light dark:focus:border-border-dark focus:outline-none transition-all duration-200" type="checkbox" />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center size-12 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">lunch_dining</span>
                          </div>
                          <div>
                            <p className="text-base font-medium leading-normal group-hover:text-primary transition-colors">Lunch: Grilled Chicken Salad</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">450 kcal</p>
                          </div>
                        </div>
                      </label>
                      {/* Dinner */}
                      <label className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group">
                        <input className="h-6 w-6 rounded border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-border-light dark:focus:border-border-dark focus:outline-none transition-all duration-200" type="checkbox" />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center size-12 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">dinner_dining</span>
                          </div>
                          <div>
                            <p className="text-base font-medium leading-normal group-hover:text-primary transition-colors">Dinner: Salmon with Quinoa</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">500 kcal</p>
                          </div>
                        </div>
                      </label>
                      {/* Snack */}
                      <label className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group">
                        <input className="h-6 w-6 rounded border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-border-light dark:focus:border-border-dark focus:outline-none transition-all duration-200" type="checkbox" />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center size-12 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">bakery_dining</span>
                          </div>
                          <div>
                            <p className="text-base font-medium leading-normal group-hover:text-primary transition-colors">Snack: Greek Yogurt</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">150 kcal</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Today's Workout */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">Today's Workout</h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 dark:bg-black/20 p-4 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center size-16 bg-accent-orange/10 rounded-lg text-accent-orange">
                          <span className="material-symbols-outlined text-4xl">fitness_center</span>
                        </div>
                        <div>
                          <p className="text-lg font-bold">Leg Day - Strength</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">45 Minutes • High Intensity</p>
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
                    <h3 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-6">Your Progress Today</h3>
                    <div className="flex flex-col gap-8">
                      {/* Calories Progress */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg className="size-full" height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg">
                            <circle className="stroke-current text-gray-100 dark:text-white/10" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                            <g className="origin-center -rotate-90 transform">
                              <circle className="stroke-current text-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="40" strokeWidth="3"></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-primary">60%</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Calories</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">1450 / 2500 kcal</p>
                        </div>
                      </div>
                      {/* Water Progress */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg className="size-full" height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg">
                            <circle className="stroke-current text-gray-100 dark:text-white/10" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                            <g className="origin-center -rotate-90 transform">
                              <circle className="stroke-current text-accent-orange" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="25" strokeWidth="3"></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-accent-orange">75%</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Water Intake</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">6 / 8 glasses</p>
                        </div>
                      </div>
                      {/* Steps Progress */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg className="size-full" height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg">
                            <circle className="stroke-current text-gray-100 dark:text-white/10" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                            <g className="origin-center -rotate-90 transform">
                              <circle className="stroke-current text-accent-yellow" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="55" strokeWidth="3"></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-accent-yellow">45%</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Steps</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">4,500 / 10,000</p>
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