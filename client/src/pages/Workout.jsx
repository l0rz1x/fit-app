import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/api";

// --- SABİTLER VE YARDIMCI FONKSİYONLAR ---
const days = [
  { short: "Pazartesi", full: "Monday", tr: "Pazartesi" },
  { short: "Salı", full: "Tuesday", tr: "Salı" },
  { short: "Çarşamba", full: "Wednesday", tr: "Çarşamba" },
  { short: "Perşembe", full: "Thursday", tr: "Perşembe" },
  { short: "Cuma", full: "Friday", tr: "Cuma" },
  { short: "Cumartesi", full: "Saturday", tr: "Cumartesi" },
  { short: "Pazar", full: "Sunday", tr: "Pazar" },
];

const parseSetRep = (str) => {
  if (!str) return { set: "-", rep: "-" };
  const parts = str.split("x");
  const set = parts[0] ? parts[0].replace(/[^0-9]/g, "") : "-";
  const rep = parts[1] ? parts[1].replace(/[^0-9]/g, "") : "-";
  return { set, rep };
};

// --- ANİMASYON VARYANTLARI ---
const footerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const WorkoutScreen = () => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState("Monday");
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // LocalStorage
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem("myWorkoutProgress");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("myWorkoutProgress", JSON.stringify(completed));
  }, [completed]);

  // Veri Çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        let planData = [];
        if (data.workoutPlan && Array.isArray(data.workoutPlan)) {
          planData = data.workoutPlan;
        } else if (
          data.workoutPlan?.planData &&
          Array.isArray(data.workoutPlan.planData)
        ) {
          planData = data.workoutPlan.planData;
        }
        setWorkoutPlan(planData);
      } catch (err) {
        console.error("Veri hatası:", err);
        setError("Antrenman programı yüklenirken bir sorun oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- HESAPLAMALAR ---
  const currentWorkout = useMemo(() => {
    if (!workoutPlan || workoutPlan.length === 0) return null;

    const selectedDayObj = days.find((d) => d.full === activeDay);
    const targetDayTR = selectedDayObj ? selectedDayObj.tr : "";

    return (
      workoutPlan.find((item) => {
        if (!item.day) return false;

        // --- DÜZELTME BURADA ---
        // Eğer aradığımız gün "Pazar" ise, ama gelen veri "Pazartesi" ise bunu eşleştirme!
        if (targetDayTR === "Pazar") {
          return item.day.includes("Pazar") && !item.day.includes("Pazartesi");
        }

        return item.day.includes(targetDayTR);
      }) || null
    );
  }, [workoutPlan, activeDay]);

  const stats = useMemo(() => {
    if (!currentWorkout?.exercises) return { time: 0, cal: 0, count: 0 };
    let totalTime = 0;
    let totalCal = 0;
    currentWorkout.exercises.forEach((ex) => {
      totalTime += parseInt(ex.duration || 0);
      totalCal += parseInt(ex.kcal || 0);
    });
    return {
      time: totalTime,
      cal: totalCal,
      count: currentWorkout.exercises.length,
    };
  }, [currentWorkout]);

  // Aksiyonlar
  const toggleComplete = (exerciseName) => {
    const uniqueId = `${activeDay}-${exerciseName}`;
    setCompleted((prev) =>
      prev.includes(uniqueId)
        ? prev.filter((item) => item !== uniqueId)
        : [...prev, uniqueId]
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 font-sans transition-colors duration-300">
      {/* ÜST BAŞLIK */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
              Haftalık Plan
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Hedeflerine ulaşmak için bugünü kaçırma.
            </p>
          </div>
          {workoutPlan.length === 0 && !loading && (
            <button
              onClick={() => navigate("/userprofile")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/30 text-sm"
            >
              Plan Oluştur
            </button>
          )}
        </div>
        {/* GÜN SEÇİCİ */}
        <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto py-4 px-2 hide-scrollbar w-full">
          {days.map((day) => {
            const isActive = activeDay === day.full;
            return (
              <button
                key={day.full}
                onClick={() => setActiveDay(day.full)}
                className={`relative flex flex-col cursor-pointer items-center justify-center rounded-2xl transition-all duration-300 border ease-out shrink-0 ${
                  isActive
                    ? "w-30 h-14 bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/30 -translate-y-1"
                    : "w-26 h-12 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {day.short}
                </span>
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-2 transition-colors duration-300 ${
                    isActive ? "bg-white" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* İÇERİK ALANI */}
      <div className="max-w-4xl mx-auto px-4 mt-4">
        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center border border-red-100 dark:border-red-800">
            {error}
          </div>
        ) : !currentWorkout ? (
          // REST DAY
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 shadow-sm"
          >
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-emerald-600 dark:text-emerald-400">
                spa
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Dinlenme Günü
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs mt-2 text-sm">
              Kaslarının iyileşmesi için bugün dinlen. Bol su içmeyi unutma!
            </p>
          </motion.div>
        ) : (
          // ANTRENMAN LİSTESİ
          <>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                {
                  icon: "timer",
                  val: `${stats.time} dk`,
                  label: "Süre",
                  color: "text-emerald-500",
                },
                {
                  icon: "local_fire_department",
                  val: stats.cal,
                  label: "Kalori",
                  color: "text-orange-500",
                },
                {
                  icon: "fitness_center",
                  val: stats.count,
                  label: "Hareket",
                  color: "text-blue-500",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center"
                >
                  <span
                    className={`material-symbols-outlined text-2xl mb-1 ${stat.color}`}
                  >
                    {stat.icon}
                  </span>
                  <span className="font-bold text-lg text-gray-800 dark:text-white">
                    {stat.val}
                  </span>
                  <span className="text-xs text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
                {currentWorkout.focus_area || "Tüm Vücut"}
              </h2>
              <div className="h-px w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {currentWorkout.exercises.map((ex, index) => {
                  const { set, rep } = parseSetRep(ex.sets_reps);
                  const uniqueId = `${activeDay}-${ex.exercise_name}`;
                  const isChecked = completed.includes(uniqueId);

                  return (
                    <motion.div
                      key={uniqueId}
                      layout // Layout animasyonu ekler
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                        layout: { duration: 0.3 },
                      }}
                      onClick={() => toggleComplete(ex.exercise_name)}
                      // DİNAMİK STİLLER BURADA DEĞİŞİYOR
                      className={`group cursor-pointer relative rounded-2xl p-4 border shadow-sm transition-all duration-500 overflow-hidden
                        ${
                          isChecked
                            ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/30 scale-[1.02]" // Tamamlanmış Stil
                            : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800" // Normal Stil
                        }`}
                    >
                      <div className="flex gap-4 relative z-10">
                        {/* Görsel */}
                        <div
                          className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden relative transition-colors duration-500
                           ${
                             isChecked
                               ? "bg-emerald-600/50"
                               : "bg-gray-100 dark:bg-gray-700"
                           }`}
                        >
                          {ex.gif_url ? (
                            // Tamamlandığında görselin biraz soluklaşması ama kaybolmaması için opacity ayarı
                            <img
                              src={ex.gif_url}
                              alt={ex.exercise_name}
                              className={`w-full h-full object-cover transition-all duration-500 ${
                                isChecked
                                  ? "mix-blend-overlay opacity-70"
                                  : "mix-blend-multiply dark:mix-blend-normal"
                              }`}
                            />
                          ) : (
                            <div
                              className={`flex w-full h-full items-center justify-center transition-colors duration-500 ${
                                isChecked ? "text-emerald-200" : "text-gray-400"
                              }`}
                            >
                              <span className="material-symbols-outlined text-3xl">
                                image_not_supported
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Bilgiler */}
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              {/* Başlık rengi dinamik */}
                              <h3
                                className={`font-bold text-lg leading-tight transition-colors duration-500 ${
                                  isChecked
                                    ? "text-white"
                                    : "text-gray-800 dark:text-white"
                                }`}
                              >
                                {ex.exercise_name}
                              </h3>

                              {/* Checkbox SADECE tamamlanmamışsa görünür */}
                              <AnimatePresence>
                                {!isChecked && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors group-hover:border-emerald-400"
                                  />
                                )}
                              </AnimatePresence>
                            </div>
                            {/* Hedef kas rengi dinamik */}
                            <p
                              className={`text-sm font-medium mt-1 transition-colors duration-500 ${
                                isChecked
                                  ? "text-emerald-100"
                                  : "text-emerald-600 dark:text-emerald-400"
                              }`}
                            >
                              {ex.target_muscle}
                            </p>
                          </div>

                          {/* Set/Rep ve Tamamlandı Banner'ı arasında geçiş */}
                          <div className="mt-3 h-8 relative">
                            <AnimatePresence mode="wait">
                              {isChecked ? (
                                // TAMAMLANDI BANNER'I
                                <motion.div
                                  key="completed"
                                  variants={footerVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  className="absolute inset-0 flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined text-white text-xl">
                                    check_circle
                                  </span>
                                  <span className="text-white font-black tracking-wider text-sm uppercase">
                                    TAMAMLANDI
                                  </span>
                                </motion.div>
                              ) : (
                                // SET/TEKRAR BİLGİSİ
                                <motion.div
                                  key="info"
                                  variants={footerVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  className="absolute inset-0 flex items-center gap-3"
                                >
                                  <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-lg transition-colors duration-500">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                                      Set
                                    </span>
                                    <span className="text-sm font-bold text-gray-800 dark:text-white">
                                      {set}
                                    </span>
                                  </div>
                                  <span className="text-gray-300 dark:text-gray-600 text-xs">
                                    X
                                  </span>
                                  <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-lg transition-colors duration-500">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                                      Tekrar
                                    </span>
                                    <span className="text-sm font-bold text-gray-800 dark:text-white">
                                      {rep}
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                      {/* Arkaplan Efekti (Tamamlandığında parama) */}
                      {isChecked && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent pointer-events-none"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutScreen;
