import React, { useState } from "react";

const MealPlan = () => {
  const [activeDay, setActiveDay] = useState("Monday");
  const [activeTab, setActiveTab] = useState("Ingredients");

  // Günler Listesi
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Örnek Yemek Verileri (Sol Liste İçin)
  const meals = [
    {
      id: 1,
      name: "Avocado Toast",
      type: "Breakfast",
      meta: "350 kcal, 10 min prep",
      image:
        "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?q=80&w=1974&auto=format&fit=crop",
      isActive: false,
    },
    {
      id: 2,
      name: "Quinoa Salad with Chicken",
      type: "Lunch",
      meta: "450 kcal, 20 min prep",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
      isActive: true, // Şu an seçili olan yemek
    },
    {
      id: 3,
      name: "Salmon with Asparagus",
      type: "Dinner",
      meta: "550 kcal, 25 min prep",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1974&auto=format&fit=crop",
      isActive: false,
    },
    {
      id: 4,
      name: "Greek Yogurt with Berries",
      type: "Snack",
      meta: "150 kcal, 5 min prep",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop",
      isActive: false,
    },
  ];

  // Malzeme Listesi
  const ingredients = [
    "1 cup quinoa, cooked",
    "1 grilled chicken breast, sliced",
    "1/2 cup cherry tomatoes, halved",
    "1/2 cucumber, diced",
    "1/4 red onion, thinly sliced",
    "2 tbsp feta cheese, crumbled",
    "2 tbsp olive oil",
    "1 tbsp lemon juice",
    "Salt and pepper to taste",
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1">
          <div className="flex flex-col md:flex-row h-full">
            {/* Sidebar (Days) */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-solid border-border-light dark:border-border-dark p-4 md:p-6 bg-background-light dark:bg-background-dark">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h1 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                    Weekly Plan
                  </h1>
                  <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                    Select a day
                  </p>
                </div>
                <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {days.map((day) => (
                    <div
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer flex-shrink-0 transition-colors ${
                        activeDay === day
                          ? "bg-primary/20"
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          activeDay === day
                            ? "text-text-light dark:text-text-dark"
                            : "text-subtle-light dark:text-subtle-dark"
                        }`}
                        style={
                          activeDay === day
                            ? { fontVariationSettings: "'FILL' 1" }
                            : {}
                        }
                      >
                        calendar_today
                      </span>
                      <p
                        className={`text-sm font-medium leading-normal ${
                          activeDay === day
                            ? "text-text-light dark:text-text-dark"
                            : "text-subtle-light dark:text-subtle-dark"
                        }`}
                      >
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
                          ? "bg-primary/20 border-2 border-primary"
                          : "bg-white dark:bg-white/5 border border-transparent hover:border-primary/50"
                      }`}
                    >
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                        style={{ backgroundImage: `url("${meal.image}")` }}
                      ></div>
                      <div>
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                          {meal.name}
                        </p>
                        <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                          {meal.type}
                        </p>
                        <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                          {meal.meta}
                        </p>
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
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop")',
                    }}
                  ></div>

                  {/* Title & Stats */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <h2 className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                        Quinoa Salad with Chicken
                      </h2>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-primary/20 text-text-light dark:text-text-dark text-sm font-medium hover:bg-primary/30 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            shopping_cart
                          </span>
                          <span className="hidden sm:inline">
                            Add to Grocery List
                          </span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-black/5 dark:bg-white/10 text-text-light dark:text-text-dark text-sm font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            swap_horiz
                          </span>
                          <span className="hidden sm:inline">Swap Meal</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-subtle-light dark:text-text-dark/70">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-lg">
                          local_fire_department
                        </span>
                        <span className="text-sm">450 kcal</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-lg">
                          timer
                        </span>
                        <span className="text-sm">20 min prep</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-lg">
                          restaurant
                        </span>
                        <span className="text-sm">Lunch</span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs & Content */}
                  <div className="flex flex-col gap-4">
                    <div className="flex border-b border-border-light dark:border-border-dark overflow-x-auto">
                      {["Ingredients", "Instructions", "Nutrition"].map(
                        (tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                              activeTab === tab
                                ? "text-primary border-primary"
                                : "text-subtle-light dark:text-text-dark/60 border-transparent hover:text-text-light dark:hover:text-text-dark"
                            }`}
                          >
                            {tab}
                          </button>
                        )
                      )}
                    </div>

                    {/* Ingredients Tab Content */}
                    {activeTab === "Ingredients" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm text-text-light dark:text-text-dark/90 animate-fade-in">
                        {ingredients.map((ing, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 group cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              id={`ing-${idx}`}
                              className="h-4 w-4 rounded border-border-light text-primary focus:ring-primary/50 cursor-pointer"
                            />
                            <label
                              htmlFor={`ing-${idx}`}
                              className="cursor-pointer group-hover:text-primary transition-colors"
                            >
                              {ing}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Placeholder for other tabs */}
                    {activeTab === "Instructions" && (
                      <div className="text-subtle-light dark:text-subtle-dark text-sm animate-fade-in">
                        <p>1. Cook quinoa according to package instructions.</p>
                        <p className="mt-2">
                          2. Grill the chicken breast until fully cooked, then
                          slice.
                        </p>
                        <p className="mt-2">
                          3. Chop vegetables and mix all ingredients in a large
                          bowl.
                        </p>
                      </div>
                    )}
                    {activeTab === "Nutrition" && (
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

export default MealPlan;
