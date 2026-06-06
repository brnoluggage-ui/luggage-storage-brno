import image1 from 'figma:asset/48097b6ecd4de9cd1ef7bf7d36499134c57f25f8.png';
import image2 from 'figma:asset/4b3e3a4aa352512788e57de051ee8b4d1240529d.png';

interface GalleryProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'Naše úschovny zavazadel',
    subtitle: 'Moderní a bezpečné samoobslužné skříňky na hlavním nádraží v Brně',
  },
  en: {
    title: 'Our Luggage Storage',
    subtitle: 'Modern and secure self-service lockers at Brno Main Station',
  },
  de: {
    title: 'Unsere Gepäckaufbewahrung',
    subtitle: 'Moderne und sichere Self-Service-Schließfächer am Hauptbahnhof Brünn',
  },
  pl: {
    title: 'Nasza przechowalnia bagażu',
    subtitle: 'Nowoczesne i bezpieczne samoobsługowe szafki na dworcu głównym w Brnie',
  },
  uk: {
    title: 'Наше сховище багажу',
    subtitle: 'Сучасні та безпечні камери самообслуговування на головному вокзалі Брно',
  },
  fr: {
    title: 'Notre consigne à bagages',
    subtitle: 'Casiers en libre-service modernes et sécurisés à la gare principale de Brno',
  },
  es: {
    title: 'Nuestra consigna de equipaje',
    subtitle: 'Casilleros de autoservicio modernos y seguros en la estación central de Brno',
  },
  it: {
    title: 'Il nostro deposito bagagli',
    subtitle: 'Armadietti self-service moderni e sicuri presso la stazione centrale di Brno',
  },
};

export function Gallery({ language }: GalleryProps) {
  const t = translations[language];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={image1}
              alt="Luggage storage lockers with payment terminal"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={image2}
              alt="Modern self-service luggage lockers"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
