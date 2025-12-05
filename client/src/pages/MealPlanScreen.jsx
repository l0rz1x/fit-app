import React, { useState } from 'react';

const MealPlanScreen = () => {
  const [activeDay, setActiveDay] = useState('Monday');
  const [activeTab, setActiveTab] = useState('Ingredients');

  // Günler Listesi
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Örnek Yemek Verileri (Sol Liste İçin)
  const meals = [
    {
      id: 1,
      name: 'Avocado Toast',
      type: 'Breakfast',
      meta: '350 kcal, 10 min prep',
      image: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?q=80&w=1974&auto=format&fit=crop',
      isActive: false
    },
    {
      id: 2,
      name: 'Quinoa Salad with Chicken',
      type: 'Lunch',
      meta: '450 kcal, 20 min prep',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop',
      isActive: true // Şu an seçili olan yemek
    },
    {
      id: 3,
      name: 'Salmon with Asparagus',
      type: 'Dinner',
      meta: '550 kcal, 25 min prep',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1974&auto=format&fit=crop',
      isActive: false
    },
    {
      id: 4,
      name: 'Greek Yogurt with Berries',
      type: 'Snack',
      meta: '150 kcal, 5 min prep',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop',
      isActive: false
    }
  ];

  // Malzeme Listesi
  const ingredients = [
    '1 cup quinoa, cooked',
    '1 grilled chicken breast, sliced',
    '1/2 cup cherry tomatoes, halved',
    '1/2 cucumber, diced',
    '1/4 red onion, thinly sliced',
    '2 tbsp feta cheese, crumbled',
    '2 tbsp olive oil',
    '1 tbsp lemon juice',
    'Salt and pepper to taste'
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col">
        
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-border-light dark:border-border-dark px-6 md:px-10 py-3 bg-background-light dark:bg-background-dark sticky top-0 z-20">
          <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_543)">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                  <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">Akıllı Beslenme</h2>
          </div>
          <div className="flex flex-1 justify-end items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              <a className="text-text-light dark:text-text-dark/80 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Dashboard</a>
              <a className="text-primary text-sm font-medium leading-normal" href="#">Meal Plan</a>
              <a className="text-text-light dark:text-text-dark/80 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Workout</a>
              <a className="text-text-light dark:text-text-dark/80 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Profile</a>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-text-light text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
              <span className="truncate">Generate New Plan</span>
            </button>
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-border-light dark:border-border-dark" 
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop")' }}
            ></div>
          </div>
        </header>

        <main className="flex-1">
          <div className="flex flex-col md:flex-row h-full">
            
            {/* Sidebar (Days) */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-solid border-border-light dark:border-border-dark p-4 md:p-6 bg-background-light dark:bg-background-dark">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h1 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">Weekly Plan</h1>
                  <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">Select a day</p>
                </div>
                <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {days.map((day) => (
                    <div 
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer flex-shrink-0 transition-colors ${
                        activeDay === day 
                          ? 'bg-primary/20' 
                          : 'hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-xl ${activeDay === day ? 'text-text-light dark:text-text-dark' : 'text-subtle-light dark:text-subtle-dark'}`} style={activeDay === day ? { fontVariationSettings: "'FILL' 1" } : {}}>
                        calendar_today
                      </span>
                      <p className={`text-sm font-medium leading-normal ${activeDay === day ? 'text-text-light dark:text-text-dark' : 'text-subtle-light dark:text-subtle-dark'}`}>
                        {day}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 grid grid-cols-1 xl:grid-cols-3">
              
              {/* Left Column: Meal List */}
              <section className="xl:col-span-1 p-4 md:p-6 border-b xl:border-b-0 xl:border-r border-solid border-border-light dark:border-border-dark overflow-y-auto max-h-[calc(100vh-80px)]">
                <h2 className="text-text-light dark:text-text-dark text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                  {activeDay}'s Meals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                  {meals.map((meal) => (
                    <div 
                      key={meal.id}
                      className={`flex flex-col gap-3 pb-3 p-3 rounded-xl transition-all cursor-pointer ${
                        meal.isActive 
                          ? 'bg-primary/20 border-2 border-primary' 
                          : 'bg-white dark:bg-white/5 border border-transparent hover:border-primary/50'
                      }`}
                    >
                      <div 
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" 
                        style={{ backgroundImage: `url("${meal.image}")` }}
                      ></div>
                      <div>
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">{meal.name}</p>
                        <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">{meal.type}</p>
                        <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">{meal.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Right Column: Recipe Details */}
              <section className="xl:col-span-2 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                <div className="flex flex-col gap-6">
                  {/* Hero Image */}
                  <div 
                    className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-64 md:min-h-80 shadow-lg" 
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop")' }}
                  ></div>
                  
                  {/* Title & Stats */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <h2 className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                        Quinoa Salad with Chicken
                      </h2>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-primary/20 text-text-light dark:text-text-dark text-sm font-medium hover:bg-primary/30 transition-colors">
                          <span className="material-symbols-outlined text-base">shopping_cart</span>
                          <span className="hidden sm:inline">Add to Grocery List</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-black/5 dark:bg-white/10 text-text-light dark:text-text-dark text-sm font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                          <span className="material-symbols-outlined text-base">swap_horiz</span>
                          <span className="hidden sm:inline">Swap Meal</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-subtle-light dark:text-text-dark/70">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-lg">local_fire_department</span>
                        <span className="text-sm">450 kcal</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-lg">timer</span>
                        <span className="text-sm">20 min prep</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-lg">restaurant</span>
                        <span className="text-sm">Lunch</span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs & Content */}
                  <div className="flex flex-col gap-4">
                    <div className="flex border-b border-border-light dark:border-border-dark overflow-x-auto">
                      {['Ingredients', 'Instructions', 'Nutrition'].map((tab) => (
                        <button 
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                            activeTab === tab 
                              ? 'text-primary border-primary' 
                              : 'text-subtle-light dark:text-text-dark/60 border-transparent hover:text-text-light dark:hover:text-text-dark'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    
                    {/* Ingredients Tab Content */}
                    {activeTab === 'Ingredients' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm text-text-light dark:text-text-dark/90 animate-fade-in">
                        {ingredients.map((ing, idx) => (
                          <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                            <input 
                              type="checkbox" 
                              id={`ing-${idx}`}
                              className="h-4 w-4 rounded border-border-light text-primary focus:ring-primary/50 cursor-pointer" 
                            />
                            <label htmlFor={`ing-${idx}`} className="cursor-pointer group-hover:text-primary transition-colors">
                              {ing}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Placeholder for other tabs */}
                    {activeTab === 'Instructions' && (
                      <div className="text-subtle-light dark:text-subtle-dark text-sm animate-fade-in">
                        <p>1. Cook quinoa according to package instructions.</p>
                        <p className="mt-2">2. Grill the chicken breast until fully cooked, then slice.</p>
                        <p className="mt-2">3. Chop vegetables and mix all ingredients in a large bowl.</p>
                      </div>
                    )}
                    {activeTab === 'Nutrition' && (
                      <div className="text-subtle-light dark:text-subtle-dark text-sm animate-fade-in">
                        <p>Protein: 32g | Carbs: 45g | Fat: 12g</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default MealPlanScreen;