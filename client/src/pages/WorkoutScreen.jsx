import React, { useState } from 'react';

const WorkoutScreen = () => {
  const [activeDay, setActiveDay] = useState('Monday');
  
  // Günlerin Listesi
  const days = [
    { short: 'Mon', full: 'Monday' },
    { short: 'Tue', full: 'Tuesday' },
    { short: 'Wed', full: 'Wednesday' },
    { short: 'Thu', full: 'Thursday' },
    { short: 'Fri', full: 'Friday' },
    { short: 'Sat', full: 'Saturday' },
    { short: 'Sun', full: 'Sunday' },
  ];

  // Mock Veri
  const workoutSchedule = {
    Monday: {
      title: "Leg Day",
      stats: { time: "45 Mins", calories: "350 kcal", count: 4 },
      exercises: [
        { id: 1, name: "Barbell Squat", muscle: "Quadriceps", sets: 3, reps: 12, image: "https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=1000&auto=format&fit=crop" },
        { id: 2, name: "Leg Press", muscle: "Hamstrings", sets: 3, reps: 15, image: "https://images.unsplash.com/photo-1434608519344-49d77a699ded?q=80&w=1000&auto=format&fit=crop" },
        { id: 3, name: "Walking Lunges", muscle: "Glutes", sets: 3, reps: 20, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
        { id: 4, name: "Calf Raises", muscle: "Calves", sets: 4, reps: 25, image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop" },
      ]
    },
    Tuesday: {
      title: "Push Day (Chest & Triceps)",
      stats: { time: "50 Mins", calories: "400 kcal", count: 3 },
      exercises: [
        { id: 5, name: "Bench Press", muscle: "Chest", sets: 4, reps: 10, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop" },
        { id: 6, name: "Overhead Press", muscle: "Shoulders", sets: 3, reps: 12, image: "https://images.unsplash.com/photo-1532029837206-abbe2b7a4bdd?q=80&w=1000&auto=format&fit=crop" },
        { id: 7, name: "Tricep Dips", muscle: "Triceps", sets: 3, reps: 15, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop" },
      ]
    },
    default: {
      title: "Rest & Recovery",
      stats: { time: "0 Mins", calories: "0 kcal", count: 0 },
      exercises: []
    }
  };

  const currentWorkout = workoutSchedule[activeDay] || workoutSchedule.default;

  return (
    // Ana kapsayıcı arka planı index.css'ten çeker
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display text-text-light dark:text-text-dark transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 sm:px-6 lg:px-8">
          <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1">
            
            {/* TopNavBar - Renkler surface-light/dark olarak güncellendi */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-4 md:px-10 py-4 mb-6 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-8 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_6_543)">
                      <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                    </g>
                    <defs><clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
                  </svg>
                </div>
                <h2 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight">Akıllı Asistan</h2>
              </div>
              <div className="hidden lg:flex flex-1 justify-center gap-8">
                <div className="flex items-center gap-9">
                  <a className="text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors text-sm font-medium" href="#">Dashboard</a>
                  <a className="text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors text-sm font-medium" href="#">Meal Plan</a>
                  <a className="text-primary font-bold text-sm" href="#">Workout Program</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-border-light dark:border-border-dark" 
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop")' }}
                ></div>
              </div>
            </header>

            {/* PageHeading */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 px-4">
              <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                Your Weekly Workout
              </p>
              <button className="flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-primary text-white font-bold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95">
                <span className="material-symbols-outlined">play_arrow</span>
                <span>Start Workout</span>
              </button>
            </div>

            {/* Day Selector - Renkler surface-light/dark */}
            <div className="flex w-full px-4 mb-6">
              <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-surface-light dark:bg-surface-dark p-1.5 border border-border-light dark:border-border-dark shadow-sm overflow-x-auto">
                {days.map((day) => (
                  <label 
                    key={day.full}
                    onClick={() => setActiveDay(day.full)}
                    className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-all duration-300 ${
                      activeDay === day.full 
                        ? 'bg-primary text-white shadow-md shadow-primary/40' 
                        : 'text-subtle-light dark:text-subtle-dark hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{day.short}</span>
                    <input className="invisible w-0 absolute" name="day-selector" type="radio" value={day.full} readOnly checked={activeDay === day.full} />
                  </label>
                ))}
              </div>
            </div>

            {/* Stats - Renkler surface-light/dark */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-8">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm">
                <p className="text-subtle-light dark:text-subtle-dark text-base font-medium">Total Time</p>
                <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold">{currentWorkout.stats.time}</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm">
                <p className="text-subtle-light dark:text-subtle-dark text-base font-medium">Calories Burned</p>
                <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold">{currentWorkout.stats.calories}</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm">
                <p className="text-subtle-light dark:text-subtle-dark text-base font-medium">Total Exercises</p>
                <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold">{currentWorkout.stats.count}</p>
              </div>
            </div>

            <h2 className="text-text-light dark:text-text-dark text-2xl font-bold leading-tight mb-4 px-4">
              Today's Workout: <span className="text-primary">{currentWorkout.title}</span>
            </h2>

            {/* Exercise List - Kart renkleri surface-light/dark */}
            <div className="flex flex-col gap-4 px-4 pb-10">
              {currentWorkout.exercises.length > 0 ? (
                currentWorkout.exercises.map((ex) => (
                  <div key={ex.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark transition-all hover:shadow-lg hover:border-primary/50 group">
                    <div 
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-cover bg-center shrink-0 bg-primary/10" 
                      style={{ backgroundImage: `url("${ex.image}")` }}
                    ></div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                      <div className="col-span-2 sm:col-span-1">
                        <p className="font-bold text-lg text-text-light dark:text-text-dark">{ex.name}</p>
                        <p className="text-sm text-subtle-light dark:text-subtle-dark">{ex.muscle}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-subtle-light dark:text-subtle-dark">Sets</p>
                        <p className="font-bold text-lg text-text-light dark:text-text-dark">{ex.sets}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-subtle-light dark:text-subtle-dark">Reps</p>
                        <p className="font-bold text-lg text-text-light dark:text-text-dark">{ex.reps}</p>
                      </div>
                      <div className="flex justify-end gap-2 items-center col-span-2 sm:col-span-1">
                        <input className="h-6 w-6 rounded-full text-primary focus:ring-primary/50 border-2 border-border-light dark:border-border-dark bg-transparent cursor-pointer transition-colors" type="checkbox" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-surface-light dark:bg-surface-dark rounded-xl border border-dashed border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-4xl text-subtle-light dark:text-subtle-dark mb-2">spa</span>
                  <p className="text-lg font-medium text-text-light dark:text-text-dark">Rest Day</p>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark">Take a break and recover!</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutScreen;