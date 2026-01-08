import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Servis dosyanın yolu doğruysa burası kalabilir
import { getUserProfile } from "../services/api";

const WorkoutScreen = () => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState("Monday");
  const [workoutPlan, setWorkoutPlan] = useState([]); // Başlangıçta boş array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Günlerin Eşleşmesi (UI: İngilizce -> API: Türkçe)
  const days = [
    { short: "Mon", full: "Monday", tr: "Pazartesi" },
    { short: "Tue", full: "Tuesday", tr: "Salı" },
    { short: "Wed", full: "Wednesday", tr: "Çarşamba" },
    { short: "Thu", full: "Thursday", tr: "Perşembe" },
    { short: "Fri", full: "Friday", tr: "Cuma" },
    { short: "Sat", full: "Saturday", tr: "Cumartesi" },
    { short: "Sun", full: "Sunday", tr: "Pazar" },
  ];

  // --- YARDIMCI: String'den Sayı Ayıklama ("4 Set x 12 Tekrar" -> "4", "12") ---
  const parseSetRep = (str) => {
    if (!str) return { set: "-", rep: "-" };
    // "x" işaretine göre böl
    const parts = str.split("x");
    // Sadece rakamları al
    const set = parts[0] ? parts[0].replace(/[^0-9]/g, "") : "-";
    const rep = parts[1] ? parts[1].replace(/[^0-9]/g, "") : "-";
    return { set, rep };
  };

  // --- VERİ ÇEKME ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();

        // API yapına göre veriyi doğru yerden alıyoruz
        // Konsol çıktına göre veri: data.workoutPlan (Array) veya data.workoutPlan.planData
        let planData = [];
        if (data.workoutPlan && Array.isArray(data.workoutPlan)) {
          planData = data.workoutPlan;
        } else if (
          data.workoutPlan?.planData &&
          Array.isArray(data.workoutPlan.planData)
        ) {
          planData = data.workoutPlan.planData;
        }

        console.log("✅ İşlenmiş Plan Verisi:", planData);
        setWorkoutPlan(planData);
      } catch (err) {
        console.error("Hata:", err);
        setError("Antrenman programı yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- AKTİF GÜNÜN VERİSİNİ BULMA ---
  const getCurrentWorkout = () => {
    if (!workoutPlan || workoutPlan.length === 0) return null;

    // Seçili günün Türkçe karşılığını bul (örn: Monday -> Pazartesi)
    const selectedDayObj = days.find((d) => d.full === activeDay);
    const targetDayTR = selectedDayObj ? selectedDayObj.tr : "";

    // API'den gelen "Pazartesi (Göğüs & Triseps)" stringi içinde "Pazartesi" geçiyor mu?
    const foundData = workoutPlan.find(
      (item) => item.day && item.day.includes(targetDayTR)
    );

    return foundData || null;
  };

  const currentWorkout = getCurrentWorkout();

  // --- DİNAMİK İSTATİSTİK HESAPLAMA ---
  // API genel toplamı vermiyorsa, egzersizleri toplayarak buluruz.
  const calculateStats = (exercises) => {
    if (!exercises) return { time: 0, cal: 0, count: 0 };

    let totalTime = 0;
    let totalCal = 0;

    exercises.forEach((ex) => {
      totalTime += parseInt(ex.duration || 0);
      totalCal += parseInt(ex.kcal || 0);
    });

    return { time: totalTime, cal: totalCal, count: exercises.length };
  };

  const stats = currentWorkout
    ? calculateStats(currentWorkout.exercises)
    : { time: 0, cal: 0, count: 0 };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 font-sans transition-colors duration-300">
      {/* Üst Başlık */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
              Haftalık Plan
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Hedeflerine ulaşmak için bugünü kaçırma.
            </p>
          </div>
          {!workoutPlan.length && (
            <button
              onClick={() => navigate("/userprofile")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/30"
            >
              Plan Oluştur
            </button>
          )}
        </div>

        {/* Gün Seçici (Scrollable) */}
        <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto py-4 px-2 hide-scrollbar w-full">
          {days.map((day) => {
            const isActive = activeDay === day.full;
            return (
              <button
                key={day.full}
                onClick={() => setActiveDay(day.full)}
                // transition-all ve transform özellikleri ile animasyonu yumuşattık
                className={`relative flex flex-col items-center justify-center rounded-2xl transition-all duration-300 border ease-out ${
                  isActive
                    ? "w-55 h-14 bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/30 -translate-y-1"
                    : "w-50 h-12 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-200"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {day.short}
                </span>

                {/* Nokta işareti sadece aktifken değil, her zaman orada olup rengi değişirse hiza bozulmaz */}
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
      <div className="max-w-4xl mx-auto px-4 mt-2">
        {error ? (
          <div className="bg-red-100 text-red-600 p-4 rounded-xl text-center">
            {error}
          </div>
        ) : !currentWorkout ? (
          // REST DAY TASARIMI
          <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 shadow-sm">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-emerald-600 dark:text-emerald-400">
                spa
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Dinlenme Günü
            </h3>
            <p className="text-gray-500 text-center max-w-xs mt-2">
              Kaslarının iyileşmesi için bugün dinlen. Bol su içmeyi unutma!
            </p>
          </div>
        ) : (
          // ANTRENMAN GÜNÜ TASARIMI
          <>
            {/* Özet Kartları */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
                <span className="text-emerald-500 material-symbols-outlined text-2xl mb-1">
                  timer
                </span>
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  {stats.time} dk
                </span>
                <span className="text-xs text-gray-400">Süre</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
                <span className="text-orange-500 material-symbols-outlined text-2xl mb-1">
                  local_fire_department
                </span>
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  {stats.cal}
                </span>
                <span className="text-xs text-gray-400">Kalori</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
                <span className="text-blue-500 material-symbols-outlined text-2xl mb-1">
                  fitness_center
                </span>
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  {stats.count}
                </span>
                <span className="text-xs text-gray-400">Hareket</span>
              </div>
            </div>

            {/* Bölge Başlığı */}
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {currentWorkout.focus_area || "Tüm Vücut"}
              </h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Egzersiz Listesi */}
            <div className="space-y-4">
              {currentWorkout.exercises.map((ex, index) => {
                // "4 Set x 12 Tekrar" verisini parçala
                const { set, rep } = parseSetRep(ex.sets_reps);

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex gap-4"
                  >
                    {/* Görsel / GIF */}
                    <div className="w-24 h-24 shrink-0 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                      {ex.gif_url ? (
                        <img
                          src={ex.gif_url}
                          alt={ex.exercise_name}
                          className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                        />
                      ) : (
                        <div className="flex w-full h-full items-center justify-center text-gray-400">
                          <span className="material-symbols-outlined text-3xl">
                            image_not_supported
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bilgiler */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-800 dark:text-white text-lg leading-tight">
                            {ex.exercise_name}
                          </h3>
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            className="w-6 h-6 rounded-full border-2 border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                          />
                        </div>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                          {ex.target_muscle}
                        </p>
                      </div>

                      {/* Set / Tekrar Grid */}
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                            Set
                          </span>
                          <span className="text-sm font-bold text-gray-800 dark:text-white">
                            {set}
                          </span>
                        </div>
                        <span className="text-gray-300">x</span>
                        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                            Tekrar
                          </span>
                          <span className="text-sm font-bold text-gray-800 dark:text-white">
                            {rep}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutScreen;
