import { AlertTriangle } from 'lucide-react';

interface OutOfServiceBannerProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

export function OutOfServiceBanner({ language }: OutOfServiceBannerProps) {
  const translations = {
    cs: {
      title: '⚠️ DNES MIMO PROVOZ',
      message: 'Naše služba je dnes nedostupná z důvodu implementace zcela nových funkcí. Budeme zpět v provozu zítra. Děkujeme za pochopení!',
    },
    en: {
      title: '⚠️ OUT OF SERVICE TODAY',
      message: 'Our service is unavailable today due to implementing completely new features. We will be back in operation tomorrow. Thank you for your understanding!',
    },
    de: {
      title: '⚠️ HEUTE AUSSER BETRIEB',
      message: 'Unser Service ist heute aufgrund der Implementierung völlig neuer Funktionen nicht verfügbar. Wir sind morgen wieder in Betrieb. Vielen Dank für Ihr Verständnis!',
    },
    pl: {
      title: '⚠️ DZISIAJ NIECZYNNE',
      message: 'Nasza usługa jest dziś niedostępna z powodu wdrażania całkowicie nowych funkcji. Wrócimy do pracy jutro. Dziękujemy za wyrozumiałość!',
    },
    uk: {
      title: '⚠️ СЬОГОДНІ НЕ ПРАЦЮЄМО',
      message: 'Наш сервіс сьогодні недоступний через впровадження абсолютно нових функцій. Ми повернемося до роботи завтра. Дякуємо за розуміння!',
    },
    fr: {
      title: '⚠️ HORS SERVICE AUJOURD\'HUI',
      message: 'Notre service est indisponible aujourd\'hui en raison de la mise en œuvre de fonctionnalités entièrement nouvelles. Nous serons de retour en service demain. Merci de votre compréhension !',
    },
    es: {
      title: '⚠️ FUERA DE SERVICIO HOY',
      message: 'Nuestro servicio no está disponible hoy debido a la implementación de funciones completamente nuevas. Volveremos a funcionar mañana. ¡Gracias por su comprensión!',
    },
    it: {
      title: '⚠️ FUORI SERVIZIO OGGI',
      message: 'Il nostro servizio non è disponibile oggi a causa dell\'implementazione di funzionalità completamente nuove. Saremo di nuovo operativi domani. Grazie per la comprensione!',
    },
  };

  const t = translations[language];

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white py-6 px-4 shadow-2xl border-b-4 border-red-900 animate-pulse z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 flex-col sm:flex-row text-center sm:text-left">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-1">
                {t.title}
              </h2>
              <p className="text-base sm:text-lg font-medium opacity-95">
                {t.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
