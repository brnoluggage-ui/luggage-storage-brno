import { Smartphone, DollarSign, Headphones, Lock, Zap, MapPin } from 'lucide-react';

interface FeaturesProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'Proč si vybrat naše úschování?',
    subtitle: 'Rychlé, bezpečné a dostupné řešení pro vaše zavazadla',
    features: [
      {
        icon: 'smartphone',
        title: 'Samoobslužné',
        description: 'Jednoduché použití prostřednictvím mobilní aplikace nebo webového rozhraní. Žádné čekání ve frontách.',
      },
      {
        icon: 'dollar',
        title: 'Dostupné ceny',
        description: 'Nejnižší ceny v Brně. Platba online nebo přímo na místě kartou. Hodinové nebo denní sazby.',
      },
      {
        icon: 'headphones',
        title: 'Podpora 24/7',
        description: 'Náš tým podpory je k dispozici kdykoliv, abyste vám pomohli s čímkoli. Email podpory je vždy aktivní.',
      },
      {
        icon: 'lock',
        title: 'Bezpečné',
        description: 'Moderní zabezpečení s video dohledem a pojištěním všech uložených zavazadel.',
      },
      {
        icon: 'zap',
        title: 'Okamžitý přístup',
        description: 'Rezervujte online a získejte okamžitý přístup. Otevřeno denně 7:30-18:00.',
      },
      {
        icon: 'map',
        title: 'Skvělá poloha',
        description: 'Přímo v budově hlavního nádraží v Brně, snadno dostupné z nástupiště i centra.',
      },
    ],
  },
  en: {
    title: 'Why Choose Our Storage?',
    subtitle: 'Fast, secure, and affordable solution for your luggage',
    features: [
      {
        icon: 'smartphone',
        title: 'Self-Service',
        description: 'Easy to use via mobile app or web interface. No waiting in lines.',
      },
      {
        icon: 'dollar',
        title: 'Affordable Prices',
        description: 'Lowest prices in Brno. Pay online or on-site by card. Hourly or daily rates available.',
      },
      {
        icon: 'headphones',
        title: '24/7 Support',
        description: 'Our support team is available anytime to help you with anything. Email support is always active.',
      },
      {
        icon: 'lock',
        title: 'Secure',
        description: 'Modern security with video surveillance and insurance for all stored luggage.',
      },
      {
        icon: 'zap',
        title: 'Instant Access',
        description: 'Book online and get instant access. Open daily 7:30 AM - 6:00 PM.',
      },
      {
        icon: 'map',
        title: 'Great Location',
        description: 'Right inside Brno Main Station building, easily accessible from platforms and city center.',
      },
    ],
  },
  de: {
    title: 'Warum unsere Aufbewahrung wählen?',
    subtitle: 'Schnelle, sichere und erschwingliche Lösung für Ihr Gepäck',
    features: [
      {
        icon: 'smartphone',
        title: 'Selbstbedienung',
        description: 'Einfach über Mobile App oder Web-Interface zu nutzen. Kein Anstehen.',
      },
      {
        icon: 'dollar',
        title: 'Günstige Preise',
        description: 'Niedrigste Preise in Brno. Online oder vor Ort mit Karte zahlen. Stunden- oder Tagestarife verfügbar.',
      },
      {
        icon: 'headphones',
        title: '24/7 Support',
        description: 'Unser Support-Team ist jederzeit für Sie da. E-Mail-Support ist immer aktiv.',
      },
      {
        icon: 'lock',
        title: 'Sicher',
        description: 'Moderne Sicherheit mit Videoüberwachung und Versicherung für alle gespeicherten Gepäckstücke.',
      },
      {
        icon: 'zap',
        title: 'Sofortiger Zugang',
        description: 'Online buchen und sofortigen Zugang erhalten. Täglich geöffnet 7:30-18:00 Uhr.',
      },
      {
        icon: 'map',
        title: 'Tolle Lage',
        description: 'Direkt im Gebäude des Brno Hauptbahnhofs, leicht erreichbar von Bahnsteigen und Stadtzentrum.',
      },
    ],
  },
  pl: {
    title: 'Dlaczego wybrać naszą przechowalnię?',
    subtitle: 'Szybkie, bezpieczne i przystępne rozwiązanie dla Twojego bagażu',
    features: [
      {
        icon: 'smartphone',
        title: 'Samoobsługa',
        description: 'Łatwe w użyciu przez aplikację mobilną lub interfejs internetowy. Bez czekania w kolejkach.',
      },
      {
        icon: 'dollar',
        title: 'Przystępne ceny',
        description: 'Najniższe ceny w Brnie. Płać online lub na miejscu kartą. Dostępne stawki godzinowe lub dzienne.',
      },
      {
        icon: 'headphones',
        title: 'Wsparcie 24/7',
        description: 'Nasz zespół wsparcia jest dostępny w każdej chwili. Wsparcie e-mailowe jest zawsze aktywne.',
      },
      {
        icon: 'lock',
        title: 'Bezpieczne',
        description: 'Nowoczesne zabezpieczenia z monitoringiem wideo i ubezpieczeniem wszystkich przechowywanych bagaży.',
      },
      {
        icon: 'zap',
        title: 'Natychmiastowy dostęp',
        description: 'Zarezerwuj online i uzyskaj natychmiastowy dostęp. Otwarte codziennie 7:30-18:00.',
      },
      {
        icon: 'map',
        title: 'Świetna lokalizacja',
        description: 'Bezpośrednio w budynku dworca głównego w Brnie, łatwo dostępne z peronów i centrum miasta.',
      },
    ],
  },
  uk: {
    title: 'Чому обрати наше сховище?',
    subtitle: 'Швидке, безпечне та доступне рішення для вашого багажу',
    features: [
      {
        icon: 'smartphone',
        title: 'Самообслуговування',
        description: 'Легко використовувати через мобільний додаток або веб-інтерфейс. Без черг.',
      },
      {
        icon: 'dollar',
        title: 'Доступні ціни',
        description: 'Найнижчі ціни в Брно. Оплата онлайн або на місці карткою. Доступні погодинні або денні тарифи.',
      },
      {
        icon: 'headphones',
        title: 'Підтримка 24/7',
        description: 'Наша служба підтримки доступна в будь-який час. Електронна підтримка завжди активна.',
      },
      {
        icon: 'lock',
        title: 'Безпечно',
        description: 'Сучасна безпека з відеоспостереженням та страхуванням всього збереженого багажу.',
      },
      {
        icon: 'zap',
        title: 'Миттєвий доступ',
        description: 'Бронюйте онлайн і отримуйте миттєвий доступ. Відкрито щодня 7:30-18:00.',
      },
      {
        icon: 'map',
        title: 'Чудове розташування',
        description: 'Прямо в будівлі головного вокзалу Брно, легко доступне з платформ і центру міста.',
      },
    ],
  },
  fr: {
    title: 'Pourquoi choisir notre consigne?',
    subtitle: 'Solution rapide, sécurisée et abordable pour vos bagages',
    features: [
      {
        icon: 'smartphone',
        title: 'Libre-service',
        description: 'Facile à utiliser via l\'application mobile ou l\'interface web. Pas de files d\'attente.',
      },
      {
        icon: 'dollar',
        title: 'Prix abordables',
        description: 'Prix les plus bas à Brno. Payez en ligne ou sur place par carte. Tarifs horaires ou journaliers disponibles.',
      },
      {
        icon: 'headphones',
        title: 'Support 24/7',
        description: 'Notre équipe de support est disponible à tout moment. Le support par e-mail est toujours actif.',
      },
      {
        icon: 'lock',
        title: 'Sécurisé',
        description: 'Sécurité moderne avec surveillance vidéo et assurance pour tous les bagages stockés.',
      },
      {
        icon: 'zap',
        title: 'Accès instantané',
        description: 'Réservez en ligne et obtenez un accès instantané. Ouvert tous les jours de 7h30 à 18h00.',
      },
      {
        icon: 'map',
        title: 'Excellent emplacement',
        description: 'Directement dans le bâtiment de la gare principale de Brno, facilement accessible depuis les quais et le centre-ville.',
      },
    ],
  },
  es: {
    title: '¿Por qué elegir nuestro almacenamiento?',
    subtitle: 'Solución rápida, segura y asequible para su equipaje',
    features: [
      {
        icon: 'smartphone',
        title: 'Autoservicio',
        description: 'Fácil de usar a través de la aplicación móvil o la interfaz web. Sin colas.',
      },
      {
        icon: 'dollar',
        title: 'Precios asequibles',
        description: 'Precios más bajos en Brno. Paga online o en el sitio con tarjeta. Tarifas por hora o diarias disponibles.',
      },
      {
        icon: 'headphones',
        title: 'Soporte 24/7',
        description: 'Nuestro equipo de soporte está disponible en cualquier momento. El soporte por correo electrónico siempre está activo.',
      },
      {
        icon: 'lock',
        title: 'Seguro',
        description: 'Seguridad moderna con videovigilancia y seguro para todo el equipaje almacenado.',
      },
      {
        icon: 'zap',
        title: 'Acceso instantáneo',
        description: 'Reserve en línea y obtenga acceso instantáneo. Abierto diariamente de 7:30 a 18:00.',
      },
      {
        icon: 'map',
        title: 'Excelente ubicación',
        description: 'Justo dentro del edificio de la Estación Principal de Brno, fácilmente accesible desde las plataformas y el centro de la ciudad.',
      },
    ],
  },
  it: {
    title: 'Perché scegliere il nostro deposito?',
    subtitle: 'Soluzione veloce, sicura e conveniente per i tuoi bagagli',
    features: [
      {
        icon: 'smartphone',
        title: 'Self-service',
        description: 'Facile da usare tramite app mobile o interfaccia web. Nessuna coda.',
      },
      {
        icon: 'dollar',
        title: 'Prezzi convenienti',
        description: 'Prezzi più bassi a Brno. Paga online o in loco con carta. Tariffe orarie o giornaliere disponibili.',
      },
      {
        icon: 'headphones',
        title: 'Supporto 24/7',
        description: 'Il nostro team di supporto è disponibile in qualsiasi momento. Il supporto via email è sempre attivo.',
      },
      {
        icon: 'lock',
        title: 'Sicuro',
        description: 'Sicurezza moderna con videosorveglianza e assicurazione per tutti i bagagli conservati.',
      },
      {
        icon: 'zap',
        title: 'Accesso istantaneo',
        description: 'Prenota online e ottieni accesso istantaneo. Aperto tutti i giorni dalle 7:30 alle 18:00.',
      },
      {
        icon: 'map',
        title: 'Ottima posizione',
        description: 'Proprio all\'interno dell\'edificio della Stazione Principale di Brno, facilmente accessibile dai binari e dal centro città.',
      },
    ],
  },
};

const iconMap = {
  smartphone: Smartphone,
  dollar: DollarSign,
  headphones: Headphones,
  lock: Lock,
  zap: Zap,
  map: MapPin,
};

export function Features({ language }: FeaturesProps) {
  const t = translations[language];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
