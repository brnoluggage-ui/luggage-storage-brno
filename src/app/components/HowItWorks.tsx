import { Search, Wallet, Lock, Package } from 'lucide-react';

interface HowItWorksProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'Jak to funguje',
    subtitle: 'Čtyři jednoduché kroky k uložení vašich zavazadel',
    steps: [
      {
        icon: 'search',
        title: 'Krok 1: Rezervujte online',
        description: 'Vyberte velikost skříňky a dobu pronájmu přes naši webovou stránku nebo aplikaci.',
      },
      {
        icon: 'wallet',
        title: 'Krok 2: Zaplaťte bezpečně',
        description: 'Platba kartou online nebo pohodlně na místě. Okamžitě obdržíte potvrzení a přístupový kód.',
      },
      {
        icon: 'lock',
        title: 'Krok 3: Uložte zavazadla',
        description: 'Přijďte na nádraží, najděte svou skříňku a použijte kód k otevření a uložení.',
      },
      {
        icon: 'package',
        title: 'Krok 4: Vyzvedněte kdykoli',
        description: 'Vraťte se kdykoli během doby pronájmu a vyzvedněte svá zavazadla.',
      },
    ],
  },
  en: {
    title: 'How It Works',
    subtitle: 'Four simple steps to store your luggage',
    steps: [
      {
        icon: 'search',
        title: 'Step 1: Book Online',
        description: 'Select locker size and rental period via our website or app.',
      },
      {
        icon: 'wallet',
        title: 'Step 2: Pay Securely',
        description: 'Pay by card online or conveniently on-site. Instantly receive confirmation and access code.',
      },
      {
        icon: 'lock',
        title: 'Step 3: Store Luggage',
        description: 'Come to the station, find your locker, and use the code to open and store.',
      },
      {
        icon: 'package',
        title: 'Step 4: Pick Up Anytime',
        description: 'Return anytime during your rental period and retrieve your luggage.',
      },
    ],
  },
  de: {
    title: 'Wie es funktioniert',
    subtitle: 'Vier einfache Schritte zur Aufbewahrung Ihres Gepäcks',
    steps: [
      {
        icon: 'search',
        title: 'Schritt 1: Online buchen',
        description: 'Wählen Sie Schließfachgröße und Mietdauer über unsere Website oder App.',
      },
      {
        icon: 'wallet',
        title: 'Schritt 2: Sicher bezahlen',
        description: 'Bezahlen Sie online mit Karte oder bequem vor Ort. Erhalten Sie sofort Bestätigung und Zugangscode.',
      },
      {
        icon: 'lock',
        title: 'Schritt 3: Gepäck aufbewahren',
        description: 'Kommen Sie zum Bahnhof, finden Sie Ihr Schließfach und verwenden Sie den Code zum Öffnen und Aufbewahren.',
      },
      {
        icon: 'package',
        title: 'Schritt 4: Jederzeit abholen',
        description: 'Kehren Sie jederzeit während der Mietdauer zurück und holen Sie Ihr Gepäck ab.',
      },
    ],
  },
  pl: {
    title: 'Jak to działa',
    subtitle: 'Cztery proste kroki do przechowania bagażu',
    steps: [
      {
        icon: 'search',
        title: 'Krok 1: Zarezerwuj online',
        description: 'Wybierz rozmiar szafki i okres wynajmu przez naszą stronę internetową lub aplikację.',
      },
      {
        icon: 'wallet',
        title: 'Krok 2: Zapłać bezpiecznie',
        description: 'Płać kartą online lub wygodnie na miejscu. Natychmiast otrzymasz potwierdzenie i kod dostępu.',
      },
      {
        icon: 'lock',
        title: 'Krok 3: Przechowaj bagaż',
        description: 'Przyjdź na dworzec, znajdź swoją szafkę i użyj kodu do otwarcia i przechowania.',
      },
      {
        icon: 'package',
        title: 'Krok 4: Odbierz w dowolnym momencie',
        description: 'Wróć w dowolnym momencie w okresie wynajmu i odbierz swój bagaż.',
      },
    ],
  },
  uk: {
    title: 'Як це працює',
    subtitle: 'Чотири прості кроки для зберігання вашого багажу',
    steps: [
      {
        icon: 'search',
        title: 'Крок 1: Забронюйте онлайн',
        description: 'Виберіть розмір камери та період оренди через наш веб-сайт або додаток.',
      },
      {
        icon: 'wallet',
        title: 'Крок 2: Оплатіть безпечно',
        description: 'Оплатіть карткою онлайн або зручно на місці. Миттєво отримаєте підтвердження та код доступу.',
      },
      {
        icon: 'lock',
        title: 'Крок 3: Збережіть багаж',
        description: 'Прийдіть на вокзал, знайдіть свою камеру та використайте код для відкриття та зберігання.',
      },
      {
        icon: 'package',
        title: 'Крок 4: Заберіть в будь-який час',
        description: 'Поверніться в будь-який час протягом періоду оренди та заберіть свій багаж.',
      },
    ],
  },
  fr: {
    title: 'Comment ça marche',
    subtitle: 'Quatre étapes simples pour stocker vos bagages',
    steps: [
      {
        icon: 'search',
        title: 'Étape 1 : Réservez en ligne',
        description: 'Sélectionnez la taille du casier et la période de location via notre site Web ou notre application.',
      },
      {
        icon: 'wallet',
        title: 'Étape 2 : Payez en toute sécurité',
        description: 'Payez par carte en ligne ou sur place. Recevez instantanément la confirmation et le code d\'accès.',
      },
      {
        icon: 'lock',
        title: 'Étape 3 : Stockez les bagages',
        description: 'Venez à la gare, trouvez votre casier et utilisez le code pour ouvrir et stocker.',
      },
      {
        icon: 'package',
        title: 'Étape 4 : Récupérez à tout moment',
        description: 'Revenez à tout moment pendant votre période de location et récupérez vos bagages.',
      },
    ],
  },
  es: {
    title: 'Cómo funciona',
    subtitle: 'Cuatro pasos sencillos para almacenar su equipaje',
    steps: [
      {
        icon: 'search',
        title: 'Paso 1: Reservar en línea',
        description: 'Seleccione el tamaño del casillero y el período de alquiler a través de nuestro sitio web o aplicación.',
      },
      {
        icon: 'wallet',
        title: 'Paso 2: Pagar de forma segura',
        description: 'Pague con tarjeta en línea o en el sitio. Reciba instantáneamente la confirmación y el código de acceso.',
      },
      {
        icon: 'lock',
        title: 'Paso 3: Almacenar equipaje',
        description: 'Venga a la estación, encuentre su casillero y use el código para abrir y almacenar.',
      },
      {
        icon: 'package',
        title: 'Paso 4: Recoger en cualquier momento',
        description: 'Regrese en cualquier momento durante su período de alquiler y recoja su equipaje.',
      },
    ],
  },
  it: {
    title: 'Come funziona',
    subtitle: 'Quattro semplici passaggi per depositare i tuoi bagagli',
    steps: [
      {
        icon: 'search',
        title: 'Passo 1: Prenota online',
        description: 'Seleziona la dimensione dell\'armadietto e il periodo di noleggio tramite il nostro sito web o l\'app.',
      },
      {
        icon: 'wallet',
        title: 'Passo 2: Paga in sicurezza',
        description: 'Paga con carta online o in loco. Ricevi istantaneamente la conferma e il codice di accesso.',
      },
      {
        icon: 'lock',
        title: 'Passo 3: Deposita i bagagli',
        description: 'Vieni alla stazione, trova il tuo armadietto e usa il codice per aprire e depositare.',
      },
      {
        icon: 'package',
        title: 'Passo 4: Ritira in qualsiasi momento',
        description: 'Torna in qualsiasi momento durante il periodo di noleggio e ritira i tuoi bagagli.',
      },
    ],
  },
};

const iconMap = {
  search: Search,
  wallet: Wallet,
  lock: Lock,
  package: Package,
};

export function HowItWorks({ language }: HowItWorksProps) {
  const t = translations[language];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.steps.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-300 -ml-4"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}