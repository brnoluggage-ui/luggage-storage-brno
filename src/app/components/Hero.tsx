import { MapPin, Clock, Shield, CreditCard } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import stripeLogo from 'figma:asset/54301fab5742a8d2c01ee1aac6d2456f1520d719.png';

interface HeroProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
  availability: {
    small: number;
    medium: number;
    large: number;
  } | null;
}

const translations = {
  cs: {
    title: 'Bezpečné úschování zavazadel',
    subtitle: 'Brno Hlavní Nádraží',
    description: 'Samoobslužné úschování zavazadel přímo na hlavním nádraží v Brně. Dostupné ceny, snadné používání.',
    cta: 'Rezervovat nyní',
    location: 'Brno Hlavní nádraží',
    available: 'Otevřeno 7:30-18:00',
    secure: 'Bezpečné a pojištěné',
    centralLocation: 'Centrální poloha',
    alwaysAccessible: 'Vždy přístupné',
    protectedStorage: 'Chráněné úložiště',
    securePayment: 'Bezpečná platba přes',
    lockersAvailable: 'Skříňky dostupné',
    lockersNotAvailable: 'Některé skříňky nedostupné',
    promoTitle: 'Speciální nabídka!',
    promoText: 'Použijte kód',
    promoSave: 'a ušetřete 15%',
  },
  en: {
    title: 'Secure Luggage Storage',
    subtitle: 'Brno Main Train Station',
    description: 'Self-service luggage storage right at Brno Main Train Station. Affordable prices, easy to use.',
    cta: 'Book Now',
    location: 'Brno Main Station',
    available: 'Open 7:30-18:00',
    secure: 'Secure & Insured',
    centralLocation: 'Central Location',
    alwaysAccessible: 'Always Accessible',
    protectedStorage: 'Protected Storage',
    securePayment: 'Secure payment via',
    lockersAvailable: 'Lockers Available',
    lockersNotAvailable: 'Some Lockers Unavailable',
    promoTitle: 'Special Offer!',
    promoText: 'Use code',
    promoSave: 'and save 15%',
  },
  de: {
    title: 'Sichere Gepäckaufbewahrung',
    subtitle: 'Brno Hauptbahnhof',
    description: 'Selbstbedienungs-Gepäckaufbewahrung direkt am Hauptbahnhof Brno. Günstige Preise, einfach zu bedienen.',
    cta: 'Jetzt buchen',
    location: 'Brno Hauptbahnhof',
    available: 'Geöffnet 7:30-18:00',
    secure: 'Sicher & Versichert',
    centralLocation: 'Zentrale Lage',
    alwaysAccessible: 'Immer zugänglich',
    protectedStorage: 'Geschützter Speicher',
    securePayment: 'Sichere Zahlung über',
    lockersAvailable: 'Schließfächer verfügbar',
    lockersNotAvailable: 'Einige Schließfächer nicht verfügbar',
    promoTitle: 'Sonderangebot!',
    promoText: 'Code verwenden',
    promoSave: 'und 15% sparen',
  },
  pl: {
    title: 'Bezpieczna przechowalnia bagażu',
    subtitle: 'Brno Dworzec Główny',
    description: 'Samoobsługowa przechowalnia bagażu bezpośrednio na dworcu głównym w Brnie. Przystępne ceny, łatwe w użyciu.',
    cta: 'Zarezerwuj teraz',
    location: 'Brno Dworzec Główny',
    available: 'Otwarte 7:30-18:00',
    secure: 'Bezpieczne i ubezpieczone',
    centralLocation: 'Centralna lokalizacja',
    alwaysAccessible: 'Zawsze dostępne',
    protectedStorage: 'Chroniony magazyn',
    securePayment: 'Bezpieczna płatność przez',
    lockersAvailable: 'Szafki dostępne',
    lockersNotAvailable: 'Niektóre szafki niedostępne',
    promoTitle: 'Specjalna oferta!',
    promoText: 'Użyj kodu',
    promoSave: 'i oszczędź 15%',
  },
  uk: {
    title: 'Безпечне зберігання багажу',
    subtitle: 'Брно Головний вокзал',
    description: 'Самообслуговування зберігання багажу прямо на головному вокзалі рно. Доступні ціни, легко використовувати.',
    cta: 'Забронювати зараз',
    location: 'Брно Головний вокзал',
    available: 'Відкрито 7:30-18:00',
    secure: 'Безпечно та застраховано',
    centralLocation: 'Центральне розташування',
    alwaysAccessible: 'Завжди доступно',
    protectedStorage: 'Захищене сховище',
    securePayment: 'Безпечна оплата через',
    lockersAvailable: 'Камери доступні',
    lockersNotAvailable: 'Деякі камери недоступні',
    promoTitle: 'Спеціальна пропозиція!',
    promoText: 'Використовуйте код',
    promoSave: 'і збережіть 15%',
  },
  fr: {
    title: 'Consigne à bagages sécurisée',
    subtitle: 'Gare principale de Brno',
    description: 'Consigne à bagages en libre-service directement à la gare principale de Brno. Prix abordables, facile à utiliser.',
    cta: 'Réserver maintenant',
    location: 'Gare principale de Brno',
    available: 'Ouvert 7:30-18:00',
    secure: 'Sécurisé et assuré',
    centralLocation: 'Emplacement central',
    alwaysAccessible: 'Toujours accessible',
    protectedStorage: 'Stockage protégé',
    securePayment: 'Paiement sécurisé via',
    lockersAvailable: 'Casiers disponibles',
    lockersNotAvailable: 'Certains casiers indisponibles',
    promoTitle: 'Offre spéciale!',
    promoText: 'Utilisez le code',
    promoSave: 'et économisez 15%',
  },
  es: {
    title: 'Consigna de equipaje segura',
    subtitle: 'Estación principal de Brno',
    description: 'Consigna de equipaje de autoservicio directamente en la estación principal de Brno. Precios asequibles, fácil de usar.',
    cta: 'Reservar ahora',
    location: 'Estaci��n principal de Brno',
    available: 'Abierto 7:30-18:00',
    secure: 'Seguro y asegurado',
    centralLocation: 'Ubicación central',
    alwaysAccessible: 'Siempre accesible',
    protectedStorage: 'Almacenamiento protegido',
    securePayment: 'Pago seguro a través de',
    lockersAvailable: 'Casilleros disponibles',
    lockersNotAvailable: 'Algunos casilleros no disponibles',
    promoTitle: 'Oferta especial!',
    promoText: 'Use el código',
    promoSave: 'y ahorrar 15%',
  },
  it: {
    title: 'Deposito bagagli sicuro',
    subtitle: 'Stazione principale di Brno',
    description: 'Deposito bagagli self-service direttamente alla stazione principale di Brno. Prezzi convenienti, facile da usare.',
    cta: 'Prenota ora',
    location: 'Stazione principale di Brno',
    available: 'Aperto 7:30-18:00',
    secure: 'Sicuro e assicurato',
    centralLocation: 'Posizione centrale',
    alwaysAccessible: 'Sempre accessibile',
    protectedStorage: 'Deposito protetto',
    securePayment: 'Pagamento sicuro tramite',
    lockersAvailable: 'Armadietti disponibili',
    lockersNotAvailable: 'Alcuni armadietti non disponibili',
    promoTitle: 'Offerta speciale!',
    promoText: 'Usa il codice',
    promoSave: 'e risparmia 15%',
  },
};

export function Hero({ language, availability }: HeroProps) {
  const t = translations[language];

  const scrollToReservation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lockerSelection = document.getElementById('locker-selection');
    if (lockerSelection) {
      lockerSelection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Check if any lockers are unavailable
  const hasUnavailableLockers = availability && (
    availability.small <= 0 || availability.medium <= 0 || availability.large <= 0
  );

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1656434330136-70828d944b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm5vJTIwdHJhaW4lMjBzdGF0aW9ufGVufDF8fHx8MTc2ODA4NjM5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Brno Train Station"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-2xl text-blue-100 mb-6">
            {t.subtitle}
          </p>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            {t.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a
              href="#reservation"
              className="inline-block px-12 py-5 bg-white text-blue-600 font-bold text-xl rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 transform"
              onClick={scrollToReservation}
            >
              {t.cta} →
            </a>


            {/* Promo Code Badge next to Availability */}
            <div className="inline-flex items-center gap-2 px-6 py-4 bg-yellow-400/95 text-gray-900 rounded-xl font-bold text-lg shadow-xl backdrop-blur-sm">
              <span className="text-2xl">🎉</span>
              <div>
                <div className="text-sm font-semibold">{t.promoTitle}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{t.promoText}</span>
                  <span className="bg-white px-3 py-1 rounded-md font-mono text-base tracking-wider">SAVE15</span>
                  <span className="text-xs">{t.promoSave}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">{t.location}</div>
                <div className="text-sm text-white/80">{t.centralLocation}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">{t.available}</div>
                <div className="text-sm text-white/80">{t.alwaysAccessible}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">{t.secure}</div>
                <div className="text-sm text-white/80">{t.protectedStorage}</div>
              </div>
            </div>
          </div>

          {/* Stripe Payment Badge */}
          <div className="mt-10 inline-block bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl px-6 py-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <span className="text-gray-800 font-semibold text-base">
                {t.securePayment}
              </span>
              <img src={stripeLogo} alt="Stripe" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}