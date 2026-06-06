import { MapPin, Navigation, Train } from 'lucide-react';
import { InteractiveStationMap } from './InteractiveStationMap';

interface WhereToFindUsProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'Kde nás najdete',
    subtitle: 'Nástupiště 1 - Pravá strana budovy - V čekárně',
    exactLocation: 'Přesná poloha',
    platform: 'Nástupiště 1',
    location: 'Pravá strana budovy',
    inside: 'Uvnitř čekárny',
    mainHall: 'Hlavní hala',
    groundFloor: 'Přízemí',
    hall1: 'Hala 1',
    directions: 'Jak k nám',
    fromPlatform: 'Z nástupiště',
    fromPlatformDesc: 'Jsme na NÁSTUPIŠTI 1, na PRAVÉ STRANĚ budovy, uvnitř ČEKÁRNY. Naše skříňky jsou snadno viditelné hned jak vejdete do čekárny.',
    fromEntrance: 'Od hlavního vchodu',
    fromEntranceDesc: 'Vejděte hlavním vchodem nádraží a najděte nástupiště 1. Jděte na pravou stranu a vstupte do čekárny - zde najdete naše úložiště zavazadel.',
    fromCenter: 'Z centra města',
    fromCenterDesc: 'Tramvají nebo pěšky na hlavní nádraží. Po příchodu najděte nástupiště 1, pravou stranu budovy a vstupte do čekárny.',
    openingHours: 'Otevírací doba',
    hours: '7:30 - 18:00',
    everyday: 'Denně',
    address: 'Brno hlavní nádraží',
    addressDetail: 'nádražní 1, 602 00 Brno',
    stationMap: 'Mapa nádraží',
    viewInteractiveMap: '🗺️ Zobrazit interaktivní mapu',
  },
  en: {
    title: 'Where to Find Us',
    subtitle: 'Platform 1 - Right Side of Building - Inside Waiting Room',
    exactLocation: 'Exact Location',
    platform: 'Platform 1',
    location: 'Right side of building',
    inside: 'Inside waiting room',
    mainHall: 'Main Hall',
    groundFloor: 'Ground Floor',
    hall1: 'Hall 1',
    directions: 'How to Get Here',
    fromPlatform: 'From Platform',
    fromPlatformDesc: 'We are on PLATFORM 1, on the RIGHT SIDE of the building, inside the WAITING ROOM. Our lockers are easily visible as soon as you enter the waiting room.',
    fromEntrance: 'From Main Entrance',
    fromEntranceDesc: 'Enter through the main station entrance and find Platform 1. Go to the right side and enter the waiting room - you will find our luggage storage there.',
    fromCenter: 'From City Center',
    fromCenterDesc: 'Take tram or walk to main station. Upon arrival, find Platform 1, right side of building, and enter the waiting room.',
    openingHours: 'Opening Hours',
    hours: '7:30 AM - 6:00 PM',
    everyday: 'Every day',
    address: 'Brno Main Station',
    addressDetail: 'Nádražní 1, 602 00 Brno',
    stationMap: 'Station Map',
    viewInteractiveMap: '🗺️ View Interactive Map',
  },
  de: {
    title: 'Wo finden Sie uns',
    subtitle: 'Gleis 1 - Rechte Seite des Gebäudes - Im Warteraum',
    exactLocation: 'Genauer Standort',
    platform: 'Gleis 1',
    location: 'Rechte Seite des Gebäudes',
    inside: 'Im Warteraum',
    mainHall: 'Hauptbahnsteigebene',
    groundFloor: 'Erdgeschoss',
    hall1: 'Halle 1',
    directions: 'Wie kommen Sie zu uns',
    fromPlatform: 'Von der Bahnsteig-ebene',
    fromPlatformDesc: 'Wir befinden uns auf GLEIS 1, auf der RECHTEN SEITE des Gebäudes, im WARTERAUM. Unsere Schließfächer sind leicht sichtbar, sobald Sie den Warteraum betreten.',
    fromEntrance: 'Vom Haupteingang',
    fromEntranceDesc: 'Gehen Sie durch den Haupteingang der Bahnhofshalle und finden Sie Gleis 1. Gehen Sie auf die rechte Seite und betreten Sie den Warteraum - dort finden Sie unsere Gepäckablage.',
    fromCenter: 'Von der Stadtmitte',
    fromCenterDesc: 'Nehmen Sie die Straßenbahn oder gehen Sie zu Fuß zum Hauptbahnhof. Nach Ihrem Ankommen finden Sie Gleis 1, rechte Seite des Gebäudes, und betreten Sie den Warteraum.',
    openingHours: 'Öffnungszeiten',
    hours: '7:30 - 18:00',
    everyday: 'Jeden Tag',
    address: 'Brno Hauptbahnhof',
    addressDetail: 'Nádražní 1, 602 00 Brno',
    stationMap: 'Bahnhofsplan',
    viewInteractiveMap: '🗺️ Interaktiven Plan anzeigen',
  },
  pl: {
    title: 'Gdzie nas znaleźć',
    subtitle: 'Peron 1 - Prawa strona budynku - Wewnątrz poczekalni',
    exactLocation: 'Dokładna lokalizacja',
    platform: 'Peron 1',
    location: 'Prawa strona budynku',
    inside: 'Wewnątrz poczekalni',
    mainHall: 'Główny hall',
    groundFloor: 'Parter',
    hall1: 'Sala 1',
    directions: 'Jak do nas',
    fromPlatform: 'Z peronu',
    fromPlatformDesc: 'Jesteśmy na PERONIE 1, po PRAWEJ STRONIE budynku, wewnątrz POCZEKALNI. Nasze szafy są łatwo widoczne zaraz po wejściu do poczekalni.',
    fromEntrance: 'Z głównego wejścia',
    fromEntranceDesc: 'Wejdź przez główne wejście stacji i znajdź Peron 1. Idź na prawą stronę i wejdź do poczekalni - tam znajdziesz nasze przechowywanie bagażu.',
    fromCenter: 'Z centrum miasta',
    fromCenterDesc: 'Tramwaj lub pieszo do głównej stacji. Po przybyciu znajdź Peron 1, prawą stronę budynku i wejdź do poczekalni.',
    openingHours: 'Godziny otwarcia',
    hours: '7:30 - 18:00',
    everyday: 'Codziennie',
    address: 'Glówna stacja Brno',
    addressDetail: 'Nádražní 1, 602 00 Brno',
    stationMap: 'Mapa stacji',
    viewInteractiveMap: '🗺️ Pokaż interaktywną mapę',
  },
  uk: {
    title: 'Де нас знайти',
    subtitle: 'Платформа 1 - Права сторона будівлі - Всередині зали очікування',
    exactLocation: 'Точне місцезнаходження',
    platform: 'Платформа 1',
    location: 'Права сторона будівлі',
    inside: 'Всередині зали очікування',
    mainHall: 'Головний зал',
    groundFloor: 'Партер',
    hall1: 'Зал 1',
    directions: 'Як до нас',
    fromPlatform: 'З платформи',
    fromPlatformDesc: 'Ми на ПЛАТФОРМІ 1, з ПРАВОГО БОКУ будівлі, всередині ЗАЛИ ОЧІКУВАННЯ. Наші шафи легко помітити, як тільки ви увійдете в залу очікування.',
    fromEntrance: 'З головного входу',
    fromEntranceDesc: 'Увійдіть через головний вхід станції та знайдіть Платформу 1. Йдіть на праву сторону та увійдіть в залу очікування - там ви знайдете наше зберігання багажу.',
    fromCenter: 'З центру міста',
    fromCenterDesc: 'Трамвай або пішки до головної станції. При приїзді знайдіть Платформу 1, праву сторону будівлі та увійдіть в залу очікування.',
    openingHours: 'Графік роботи',
    hours: '7:30 - 18:00',
    everyday: 'Щодня',
    address: 'Головна станція Брно',
    addressDetail: 'Nádražní 1, 602 00 Brno',
    stationMap: 'Карта станції',
    viewInteractiveMap: '🗺️ Переглянути інтерактивну карту',
  },
  fr: {
    title: 'Où nous trouver',
    subtitle: 'Quai 1 - Côté droit du bâtiment - Dans la salle d\'attente',
    exactLocation: 'Emplacement exact',
    platform: 'Quai 1',
    location: 'Côté droit du bâtiment',
    inside: 'Dans la salle d\'attente',
    mainHall: 'Hall principal',
    groundFloor: 'Rez-de-chaussée',
    hall1: 'Hall 1',
    directions: 'Comment nous atteindre',
    fromPlatform: 'Depuis le quai',
    fromPlatformDesc: 'Nous sommes sur le QUAI 1, du CÔTÉ DROIT du bâtiment, dans la SALLE D\'ATTENTE. Nos casiers sont facilement visibles dès que vous entrez dans la salle d\'attente.',
    fromEntrance: 'Depuis l\'entrée principale',
    fromEntranceDesc: 'Entrez par l\'entrée principale de la gare et trouvez le Quai 1. Allez sur le côté droit et entrez dans la salle d\'attente - vous y trouverez notre entrepôt de bagages.',
    fromCenter: 'Depuis le centre-ville',
    fromCenterDesc: 'Prenez le tramway ou marchez jusqu\'à la gare principale. Une fois arrivé, trouvez le Quai 1, côté droit du bâtiment, et entrez dans la salle d\'attente.',
    openingHours: 'Horaires d\'ouverture',
    hours: '7:30 - 18:00',
    everyday: 'Tous les jours',
    address: 'Gare principale de Brno',
    addressDetail: 'Nádražní 1, 602 00 Brno',
    stationMap: 'Plan de la gare',
    viewInteractiveMap: '🗺️ Voir le plan interactif',
  },
  es: {
    title: 'Dónde encontrarnos',
    subtitle: 'Andén 1 - Lado derecho del edificio - Dentro de la sala de espera',
    exactLocation: 'Ubicación exacta',
    platform: 'Andén 1',
    location: 'Lado derecho del edificio',
    inside: 'Dentro de la sala de espera',
    mainHall: 'Hall principal',
    groundFloor: 'Planta baja',
    hall1: 'Hall 1',
    directions: 'Cómo llegar a nosotros',
    fromPlatform: 'Desde el andén',
    fromPlatformDesc: 'Estamos en el ANDÉN 1, en el LADO DERECHO del edificio, dentro de la SALA DE ESPERA. Nuestros casilleros son fácilmente visibles tan pronto como entras en la sala de espera.',
    fromEntrance: 'Desde la entrada principal',
    fromEntranceDesc: 'Entre por la entrada principal de la estación y encuentre el Andén 1. Vaya al lado derecho y entre en la sala de espera - allí encontrará nuestro almacén de equipaje.',
    fromCenter: 'Desde el centro de la ciudad',
    fromCenterDesc: 'Tome el tranvía o camine hasta la estación principal. Una vez llegado, encuentre el Andén 1, lado derecho del edificio, y entre en la sala de espera.',
    openingHours: 'Horarios de apertura',
    hours: '7:30 - 18:00',
    everyday: 'Todos los días',
    address: 'Estación principal de Brno',
    addressDetail: 'Nádražní 1, 602 00 Brno',
    stationMap: 'Mapa de la estación',
    viewInteractiveMap: '🗺️ Ver mapa interactivo',
  },
  it: {
    title: 'Dove trovarci',
    subtitle: 'Binario 1 - Lato destro dell\'edificio - All\'interno della sala d\'attesa',
    exactLocation: 'Posizione esatta',
    platform: 'Binario 1',
    location: 'Lato destro dell\'edificio',
    inside: 'All\'interno della sala d\'attesa',
    mainHall: 'Hall principale',
    groundFloor: 'Piano terra',
    hall1: 'Hall 1',
    directions: 'Come raggiungerci',
    fromPlatform: 'Dalla piattaforma',
    fromPlatformDesc: 'Siamo sul BINARIO 1, sul LATO DESTRO dell\'edificio, all\'interno della SALA D\'ATTESA. I nostri armadi sono facilmente visibili appena entri nella sala d\'attesa.',
    fromEntrance: 'Dalla porta d\'ingresso principale',
    fromEntranceDesc: 'Entra dalla porta principale della stazione e trova il Binario 1. Vai sul lato destro ed entra nella sala d\'attesa - troverai lì il nostro deposito bagagli.',
    fromCenter: 'Dalla città centrale',
    fromCenterDesc: 'Prendi il tram o cammina fino alla stazione principale. Una volta arrivato, trova il Binario 1, lato destro dell\'edificio, ed entra nella sala d\'attesa.',
    openingHours: 'Orari di apertura',
    hours: '7:30 - 18:00',
    everyday: 'Ogni giorno',
    address: 'Stazione principale di Brno',
    addressDetail: 'Nádražní 1, 602 00 Brno',
    stationMap: 'Mappa della stazione',
    viewInteractiveMap: '🗺️ Vedi mappa interattiva',
  },
};

export function WhereToFindUs({ language }: WhereToFindUsProps) {
  const t = translations[language];

  return (
    <section id="location" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl font-semibold text-blue-600 mb-2">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive 2D Map — anchor target */}
        <div id="interactive-map" className="mb-12 scroll-mt-8">
          <InteractiveStationMap language={language} />
        </div>

        {/* Exact Location Highlight */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">{t.exactLocation}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Train className="w-12 h-12 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-2">{t.platform}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-3" />
                <div className="text-2xl font-bold mb-2">{t.location}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Navigation className="w-12 h-12 mx-auto mb-3" />
                <div className="text-2xl font-bold mb-2">{t.inside}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Map Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-bold text-gray-900">{t.address}</h3>
                  <p className="text-sm text-gray-600">{t.addressDetail}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  {t.openingHours}
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {t.hours}
                </div>
                <div className="text-sm text-gray-600">{t.everyday}</div>
              </div>
            </div>
            {/* Google Maps Embed */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ height: '600px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.52970494782!2d16.60908851257727!3d49.19051017125977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471295fe7e529d03%3A0x18babfddd561f8f3!2sLuggage%20Storage%20Brno%20Main%20train%20station!5e0!3m2!1scs!2scz!4v1768087269743!5m2!1scs!2scz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Directions Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t.directions}
            </h3>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Train className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{t.fromPlatform}</h4>
                  <p className="text-gray-600">{t.fromPlatformDesc}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{t.fromEntrance}</h4>
                  <p className="text-gray-600">{t.fromEntranceDesc}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{t.fromCenter}</h4>
                  <p className="text-gray-600">{t.fromCenterDesc}</p>
                </div>
              </div>
            </div>
            {/* Visual Station Info */}
            <div className="bg-blue-600 text-white rounded-xl p-6">
              <div className="text-center">
                <div className="text-sm font-medium mb-2">
                  {language === 'cs' ? 'Naše poloha' : 'Our Location'}
                </div>
                <div className="text-3xl font-bold mb-1">{t.mainHall}</div>
                <div className="text-lg">{t.groundFloor}</div>
                <div className="text-2xl font-bold mt-2">{t.hall1}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}