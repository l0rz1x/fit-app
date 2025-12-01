import React, { useState } from 'react';
import './Login.css'; // CSS dosyasını çağırıyoruz
import { 
  ChevronRight, Activity, Dumbbell, Armchair, Footprints, 
  TrendingDown, TrendingUp, Equal, WheatOff, Nut, Milk, Fish 
} from 'lucide-react';

function Login() {
  // Form verilerini tutan state
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '', 
    height: 175,
    weight: 70,
    activityLevel: 'sedentary',
    primaryGoal: 'maintain',
    targetWeight: 68,
    diets: [],
    allergies: []
  });

  // Input değişimlerini yönetir
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Çoklu seçimleri yönetir (Diyet/Alerji gibi)
  const toggleSelection = (category, item) => {
    setFormData(prev => {
      const list = prev[category];
      if (list.includes(item)) {
        return { ...prev, [category]: list.filter(i => i !== item) };
      } else {
        return { ...prev, [category]: [...list, item] };
      }
    });
  };

  return (
    <div className="register-container">
      
      

      <main className="content-wrapper">
        
    

        {/* TITLE */}
        <div className="page-title">
          <h1>Profilinizi Oluşturun</h1>
          <p>Size özel kişiselleştirilmiş planınızı oluşturmak için biraz kendinizden bahsedin.</p>
        </div>

        {/* SECTION: PERSONAL INFO */}
        <section className="form-section">
          <h2>Kişisel Bilgiler</h2>
          
          <div className="form-row-2">
            <div className="input-group">
              <label>Ad Soyad</label>
              <input type="text" name="fullName" placeholder="Adınız Soyadınız" className="form-input" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Yaş</label>
              <input type="number" name="age" placeholder="Yaşınız" className="form-input" onChange={handleChange} />
            </div>
          </div>

          <div className="form-row-3">
            <div className="input-group">
               <label>Cinsiyet</label>
               <div className="radio-group">
                 <label className={`radio-card ${formData.gender === 'male' ? 'selected' : ''}`}>
                   <input type="radio" name="gender" value="male" onChange={handleChange}/>
                   <span>Erkek</span>
                 </label>
                 <label className={`radio-card ${formData.gender === 'female' ? 'selected' : ''}`}>
                   <input type="radio" name="gender" value="female" onChange={handleChange}/>
                   <span>Kadın</span>
                 </label>
               </div>
            </div>

            <div className="input-group">
              <label>Boy (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} className="form-input" />
            </div>

             <div className="input-group">
              <label>Kilo (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="form-input" />
            </div>
          </div>
        </section>

        {/* SECTION: LIFESTYLE */}
        <section className="form-section">
          <h2>Yaşam Tarzı & Aktivite</h2>
          <label className="sub-label">Aktivite Seviyesi</label>
          
          <div className="cards-grid-4">
            {[
              { id: 'sedentary', label: 'Hareketsiz', desc: 'Az veya hiç egzersiz', icon: Armchair },
              { id: 'light', label: 'Az Hareketli', desc: '1-3 gün/hafta', icon: Footprints },
              { id: 'moderate', label: 'Orta', desc: '3-5 gün/hafta', icon: Dumbbell },
              { id: 'active', label: 'Çok Hareketli', desc: '6-7 gün/hafta', icon: Activity },
            ].map((item) => (
              <div 
                key={item.id}
                onClick={() => setFormData({...formData, activityLevel: item.id})}
                className={`selection-card ${formData.activityLevel === item.id ? 'selected' : ''}`}
              >
                <item.icon className="card-icon" />
                <span className="card-title">{item.label}</span>
                <span className="card-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: PRIMARY GOAL */}
        <section className="form-section">
          <h2>Ana Hedef</h2>
          
          <div className="cards-grid-3">
            {[
              { id: 'lose', label: 'Kilo Ver', icon: TrendingDown, colorClass: 'icon-red' },
              { id: 'maintain', label: 'Kilomu Koru', icon: Equal, colorClass: 'icon-yellow' },
              { id: 'gain', label: 'Kas Yap', icon: TrendingUp, colorClass: 'icon-green' },
            ].map((goal) => (
              <div 
                key={goal.id}
                onClick={() => setFormData({...formData, primaryGoal: goal.id})}
                className={`goal-card ${formData.primaryGoal === goal.id ? 'selected' : ''}`}
              >
                <goal.icon className={`goal-icon ${goal.colorClass}`} />
                <span className="goal-title">{goal.label}</span>
              </div>
            ))}
          </div>

          <div className="slider-container">
            <span className="slider-label">Hedef Kilo (kg)</span>
            <input 
              type="range" min="40" max="150" 
              value={formData.targetWeight}
              onChange={(e) => setFormData({...formData, targetWeight: e.target.value})}
              className="range-slider"
            />
            <div className="slider-value">{formData.targetWeight}</div>
          </div>
        </section>

        {/* SECTION: DIETARY PREFERENCES */}
        <section className="form-section">
          <h2>Diyet Tercihleri</h2>
          
          <div className="preferences-group">
            <label className="sub-label">Yaygın Diyetler (Bir veya daha fazla seçin)</label>
            <div className="cards-grid-4 small-cards">
              {['Vegan', 'Vejetaryen', 'Keto', 'Paleo'].map((diet) => (
                <label 
                  key={diet}
                  className={`checkbox-card ${formData.diets.includes(diet) ? 'selected' : ''}`}
                >
                  <input 
                    type="checkbox" 
                    checked={formData.diets.includes(diet)}
                    onChange={() => toggleSelection('diets', diet)}
                  />
                  <span>{diet}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="preferences-group">
            <label className="sub-label">Alerjiler & İntoleranslar</label>
            <div className="cards-grid-4 small-cards">
              {[
                { label: 'Kuruyemiş', icon: Nut }, 
                { label: 'Süt Ürünleri', icon: Milk }, 
                { label: 'Gluten', icon: WheatOff }, 
                { label: 'Kabuklu Deniz', icon: Fish }
              ].map((item) => (
                <label 
                  key={item.label}
                  className={`checkbox-card ${formData.allergies.includes(item.label) ? 'selected' : ''}`}
                >
                  <input 
                    type="checkbox" 
                    checked={formData.allergies.includes(item.label)}
                    onChange={() => toggleSelection('allergies', item.label)}
                  />
                  <div className="flex-center-gap">
                    {/* İkon opsiyonel */}
                    <span>{item.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER BUTTON */}
        <div className="footer-action">
          <button className="btn-primary">
            Planımı Oluştur
            <ChevronRight size={20} />
          </button>
        </div>

      </main>
    </div>
  );
}

export default Login;