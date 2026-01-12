import React from "react";

export default function Privacy() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-main-light dark:text-text-main-dark p-8 font-display transition-colors duration-200">
      <div className="max-w-4xl mx-auto bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-lg border border-border-light dark:border-border-dark">
        <h1 className="text-3xl font-bold mb-6 text-primary">Gizlilik Politikası</h1>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8">Son güncellenme: 04 Ocak 2026</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Toplanan Veriler</h2>
            <p>
              Hizmetimizi kullanırken, size daha iyi bir deneyim sunmak adına adınız, e-posta adresiniz ve beslenme tercihleriniz gibi kişisel verileri toplayabiliriz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Verilerin Kullanımı</h2>
            <p>
              Toplanan veriler, kişiselleştirilmiş beslenme planları oluşturmak, hesap güvenliğini sağlamak ve müşteri hizmetleri sunmak amacıyla kullanılır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Sağlık Verileri ve Gizlilik</h2>
            <p>
              Uygulama içerisine girdiğiniz boy, kilo, alerji ve beslenme düzeni gibi hassas sağlık verileri, yalnızca size özel planlar oluşturmak için algoritlamız tarafından işlenir ve asla reklam amaçlı üçüncü taraflarla paylaşılmaz.
            </p>
            </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. İletişim</h2>
            <p>
              Gizlilik politikamızla ilgili sorularınız için <a href="/contact" className="text-primary hover:underline">İletişim</a> sayfasından bize ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}