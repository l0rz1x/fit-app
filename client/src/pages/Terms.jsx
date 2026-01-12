import React from "react";

export default function Terms() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-main-light dark:text-text-main-dark p-8 font-display transition-colors duration-200">
      <div className="max-w-4xl mx-auto bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-lg border border-border-light dark:border-border-dark">
        <h1 className="text-3xl font-bold mb-6 text-primary">Hizmet Şartları</h1>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8">Son güncellenme: 04 Ocak 2026</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Kabul Edilme</h2>
            <p>
              Bu uygulamayı kullanarak, aşağıda belirtilen şartları kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen hizmeti kullanmayınız.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Hesap Güvenliği</h2>
            <p>
              Hesap şifrenizin güvenliğinden siz sorumlusunuz. Hesabınızla yapılan tüm işlemlerden kullanıcı sorumludur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Hizmetin Kullanımı</h2>
            <p>
              Uygulamayı yasa dışı amaçlar için kullanamazsınız. Sistemimize zarar verecek girişimlerde bulunmak yasaktır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Değişiklikler</h2>
            <p>
              Yönetim, bu şartları dilediği zaman değiştirme hakkını saklı tutar.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}