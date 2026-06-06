import { Check } from 'lucide-react';
import { useState } from 'react';

interface PricingProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'Transparentní ceník',
    subtitle: 'Žádné skryté poplatky. Plaťte pouze za to, co potřebujete.',
    currency: 'Měna:',
    unavailable: 'Dočasně nedostupné',
    plans: [
      {
        name: 'Skříňka S',
        hourlyPrice: '29',
        hourlyPriceEur: '1,2',
        dailyPrice: '119',
        dailyPriceEur: '4,8',
        description: 'Pro malé zavazadlo',
        features: [
          'Malá skříňka (30×20×50 cm)',
          'Otevřeno 7:30-18:00',
          'Video dohled',
          'Pojištění zahrnuto',
          'Platba online nebo na místě',
        ],
      },
      {
        name: 'Skříňka M',
        hourlyPrice: '49',
        hourlyPriceEur: '2,0',
        dailyPrice: '199',
        dailyPriceEur: '7,6',
        description: 'Pro standardní kufry a zavazadla',
        features: [
          'Ideální pro 1-2 kufry',
          'Otevřeno 7:30-18:00',
          'Video dohled',
          'Pojištění zahrnuto',
          'Platba online nebo na místě',
        ],
        popular: true,
      },
      {
        name: 'Skříňka L',
        hourlyPrice: '59',
        hourlyPriceEur: '2,4',
        dailyPrice: '239',
        dailyPriceEur: '8,8',
        description: 'Pro velké kufry a více zavazadel',
        features: [
          'Ideální pro 3+ kufry',
          'Otevřeno 7:30-18:00',
          'Video dohled',
          'Pojištění zahrnuto',
          'Platba online nebo na místě',
        ],
      },
    ],
    note: 'Cena se vypočítá podle zvolené doby (hodiny × hodinová sazba + dny × denní sazba). Můžete platit online nebo pohodlně na místě kartou.',
    button: 'Vybrat',
    perHour: 'Kč / hodinu',
    perHourEur: '€ / hodinu',
    perDay: 'Kč / den',
    perDayEur: '€ / den',
    latesurance: {
      name: '🛡️ Pojištění pozdě & brzy',
      price: '49',
      priceEur: '2,0',
      description: 'Ochrana pozdního i předčasného vyzvednutí',
      features: [
        '90 minut navíc před i po rezervaci',
        'Přístup 90 minut před začátkem (v provozní době)',
        'Bez poplatku při vyzvednutí do 90 minut po konci (v provozní době)',
      ],
    },
    latesurancePerBooking: 'Kč / rezervace',
    latesurancePerBookingEur: '€ / rezervace',
  },
  en: {
    title: 'Transparent Pricing',
    subtitle: 'No hidden fees. Pay only for what you need.',
    currency: 'Currency:',
    unavailable: 'Temporarily unavailable',
    plans: [
      {
        name: 'Locker S',
        hourlyPrice: '29',
        hourlyPriceEur: '1.2',
        dailyPrice: '119',
        dailyPriceEur: '4.8',
        description: 'For small luggage',
        features: [
          'Small locker (12×8×20 in)',
          'Open 7:30-18:00',
          'Video surveillance',
          'Insurance included',
          'Pay online or on-site',
        ],
      },
      {
        name: 'Locker M',
        hourlyPrice: '49',
        hourlyPriceEur: '2.0',
        dailyPrice: '199',
        dailyPriceEur: '7.6',
        description: 'For standard suitcases and luggage',
        features: [
          'Perfect for 1-2 suitcases',
          'Open 7:30-18:00',
          'Video surveillance',
          'Insurance included',
          'Pay online or on-site',
        ],
        popular: true,
      },
      {
        name: 'Locker L',
        hourlyPrice: '59',
        hourlyPriceEur: '2.4',
        dailyPrice: '239',
        dailyPriceEur: '8.8',
        description: 'For large suitcases and multiple bags',
        features: [
          'Perfect for 3+ suitcases',
          'Open 7:30-18:00',
          'Video surveillance',
          'Insurance included',
          'Pay online or on-site',
        ],
      },
    ],
    note: 'Price calculated by chosen time (hours × hourly rate + days × daily rate). You can pay online or conveniently on-site by card.',
    button: 'Select',
    perHour: 'CZK / hour',
    perHourEur: '€ / hour',
    perDay: 'CZK / day',
    perDayEur: '€ / day',
    latesurance: {
      name: '🛡️ Late&Early Insurance',
      price: '49',
      priceEur: '2.0',
      description: 'Protection against delays',
      features: [
        '90 minutes extra before and after your booking',
        'Access 90 minutes before booking starts (during operating hours)',
        'No penalty for pickup up to 90 minutes late (during operating hours)',
      ],
    },
    latesurancePerBooking: 'CZK / booking',
    latesurancePerBookingEur: '€ / booking',
  },
  de: {
    title: 'Transparente Preise',
    subtitle: 'Keine versteckten Gebühren. Zahlen Sie nur für das, was Sie brauchen.',
    currency: 'Währung:',
    unavailable: 'Vorübergehend nicht verfügbar',
    plans: [
      {
        name: 'Schließfach S',
        hourlyPrice: '29',
        hourlyPriceEur: '1,2',
        dailyPrice: '119',
        dailyPriceEur: '4,8',
        description: 'Für kleines Gepäck',
        features: [
          'Kleines Schließfach (30×20×50 cm)',
          'Geöffnet 7:30-18:00',
          'Videoüberwachung',
          'Versicherung inklusive',
          'Online oder vor Ort bezahlen',
        ],
      },
      {
        name: 'Schließfach M',
        hourlyPrice: '49',
        hourlyPriceEur: '2,0',
        dailyPrice: '199',
        dailyPriceEur: '7,6',
        description: 'Für Standard-Koffer und Gepäck',
        features: [
          'Perfekt für 1-2 Koffer',
          'Geöffnet 7:30-18:00',
          'Videoüberwachung',
          'Versicherung inklusive',
          'Online oder vor Ort bezahlen',
        ],
        popular: true,
      },
      {
        name: 'Schließfach L',
        hourlyPrice: '59',
        hourlyPriceEur: '2,4',
        dailyPrice: '239',
        dailyPriceEur: '8,8',
        description: 'Für große Koffer und mehrere Taschen',
        features: [
          'Perfekt für 3+ Koffer',
          'Geöffnet 7:30-18:00',
          'Videoüberwachung',
          'Versicherung inklusive',
          'Online oder vor Ort bezahlen',
        ],
      },
    ],
    note: 'Preis wird nach gewählter Zeit berechnet (Stunden × Stundensatz + Tage × Tagessatz). Sie können online oder bequem vor Ort mit Karte bezahlen.',
    button: 'Wählen',
    perHour: 'Kč / Stunde',
    perHourEur: '€ / Stunde',
    perDay: 'Kč / Tag',
    perDayEur: '€ / Tag',
    latesurance: {
      name: '🛡️ Späte & Früh Versicherung',
      price: '49',
      priceEur: '2,0',
      description: 'Schutz vor Verspätungen',
      features: [
        '90 Minuten extra vor und nach Ihrer Buchung',
        'Zugang 90 Minuten vor Buchungsbeginn (während der Öffnungszeiten)',
        'Keine Strafe bei Abholung bis 90 Minuten verspätet (während der Öffnungszeiten)',
      ],
    },
    latesurancePerBooking: 'Kč / Buchung',
    latesurancePerBookingEur: '€ / Buchung',
  },
  pl: {
    title: 'Przejrzyste ceny',
    subtitle: 'Bez ukrytych opłat. Płać tylko za to, czego potrzebujesz.',
    currency: 'Waluta:',
    unavailable: 'Tymczasowo niedostępne',
    plans: [
      {
        name: 'Schowek S',
        hourlyPrice: '29',
        hourlyPriceEur: '1,2',
        dailyPrice: '119',
        dailyPriceEur: '4,8',
        description: 'Dla małego bagażu',
        features: [
          'Mały schowek (30×20×50 cm)',
          'Otwarte 7:30-18:00',
          'Monitoring wideo',
          'Ubezpieczenie wliczone',
          'Płatność online lub na miejscu',
        ],
      },
      {
        name: 'Schowek M',
        hourlyPrice: '49',
        hourlyPriceEur: '2,0',
        dailyPrice: '199',
        dailyPriceEur: '7,6',
        description: 'Dla standardowych walizek i bagażu',
        features: [
          'Idealny na 1-2 walizki',
          'Otwarte 7:30-18:00',
          'Monitoring wideo',
          'Ubezpieczenie wliczone',
          'Płatność online lub na miejscu',
        ],
        popular: true,
      },
      {
        name: 'Schowek L',
        hourlyPrice: '59',
        hourlyPriceEur: '2,4',
        dailyPrice: '239',
        dailyPriceEur: '8,8',
        description: 'Dla dużych walizek i wielu toreb',
        features: [
          'Idealny na 3+ walizki',
          'Otwarte 7:30-18:00',
          'Monitoring wideo',
          'Ubezpieczenie wliczone',
          'Płatność online lub na miejscu',
        ],
      },
    ],
    note: 'Cena obliczana według wybranego czasu (godziny × stawka godzinowa + dni × stawka dzienna). Możesz zapłacić online lub wygodnie na miejscu kartą.',
    button: 'Wybierz',
    perHour: 'Kč / godzina',
    perHourEur: '€ / godzina',
    perDay: 'Kč / dzień',
    perDayEur: '€ / dzień',
    latesurance: {
      name: '🛡️ Ubezpieczenie Późno & Wcześnie',
      price: '49',
      priceEur: '2,0',
      description: 'Ochrona przed opóźnieniami',
      features: [
        '90 minut dodatkowego czasu przed i po rezerwacji',
        'Dostęp 90 minut przed rozpoczęciem rezerwacji (w godzinach pracy)',
        'Brak opłaty za odbiór do 90 minut po terminie (w godzinach pracy)',
      ],
    },
    latesurancePerBooking: 'Kč / rezerwacja',
    latesurancePerBookingEur: '€ / rezerwacja',
  },
  uk: {
    title: 'Прозорі ціни',
    subtitle: 'Без прихованих платежів. Платіть лише за те, що потрібно.',
    currency: 'Валюта:',
    unavailable: 'Тимчасово недоступні',
    plans: [
      {
        name: 'Камера S',
        hourlyPrice: '29',
        hourlyPriceEur: '1,2',
        dailyPrice: '119',
        dailyPriceEur: '4,8',
        description: 'Для малого багажу',
        features: [
          'Мала камера (30×20×50 см)',
          'Відкрито 7:30-18:00',
          'Відеоспостереження',
          'Страхування включено',
          'Оплата олайн або на місці',
        ],
      },
      {
        name: 'Камера M',
        hourlyPrice: '49',
        hourlyPriceEur: '2,0',
        dailyPrice: '199',
        dailyPriceEur: '7,6',
        description: 'Для звичайних валіз і багажу',
        features: [
          'Ідеально для 1-2 валіз',
          'Відкрито 7:30-18:00',
          'Відеоспостереження',
          'Страхування включено',
          'Оплата онлайн або на місці',
        ],
        popular: true,
      },
      {
        name: 'Камера L',
        hourlyPrice: '59',
        hourlyPriceEur: '2,4',
        dailyPrice: '239',
        dailyPriceEur: '8,8',
        description: 'Для великих валіз і багатьох сумок',
        features: [
          'Ідеально для 3+ валіз',
          'Відкрито 7:30-18:00',
          'Відеоспостереження',
          'Страхування включено',
          'Оплата онлайн або на місці',
        ],
      },
    ],
    note: 'Ціна розраховується за обраний час (години × погодинна ставка + дні × денна ставка). Ви можете оплатити онлайн або зручно н місці карткою.',
    button: 'Вибрати',
    perHour: 'Kč / година',
    perHourEur: '€ / година',
    perDay: 'Kč / день',
    perDayEur: '€ / день',
    latesurance: {
      name: '🛡️ Пізня & Рання страховка',
      price: '49',
      priceEur: '2,0',
      description: 'Захист від опізнань',
      features: [
        '90 хвилин додатково до та після бронювання',
        'Доступ за 90 хвилин до початку бронювання (під час роботи)',
        'Без штрафу за забір до 90 хвилин з запізненням (під час роботи)',
      ],
    },
    latesurancePerBooking: 'Kč / бронювання',
    latesurancePerBookingEur: '€ / бронювання',
  },
  fr: {
    title: 'Tarifs transparents',
    subtitle: 'Pas de frais cachés. Payez uniquement ce dont vous avez besoin.',
    currency: 'Devise:',
    unavailable: 'Temporairement indisponible',
    plans: [
      {
        name: 'Casier S',
        hourlyPrice: '29',
        hourlyPriceEur: '1,2',
        dailyPrice: '119',
        dailyPriceEur: '4,8',
        description: 'Pour petits bagages',
        features: [
          'Petit casier (30×20×50 cm)',
          'Ouvert 7:30-18:00',
          'Vidéosurveillance',
          'Assurance incluse',
          'Paiement en ligne ou sur place',
        ],
      },
      {
        name: 'Casier M',
        hourlyPrice: '49',
        hourlyPriceEur: '2,0',
        dailyPrice: '199',
        dailyPriceEur: '7,6',
        description: 'Pour valises et bagages standards',
        features: [
          'Parfait pour 1-2 valises',
          'Ouvert 7:30-18:00',
          'Vidéosurveillance',
          'Assurance incluse',
          'Paiement en ligne ou sur place',
        ],
        popular: true,
      },
      {
        name: 'Casier L',
        hourlyPrice: '59',
        hourlyPriceEur: '2,4',
        dailyPrice: '239',
        dailyPriceEur: '8,8',
        description: 'Pour grandes valises et sacs multiples',
        features: [
          'Parfait pour 3+ valises',
          'Ouvert 7:30-18:00',
          'Vidéosurveillance',
          'Assurance incluse',
          'Paiement en ligne ou sur place',
        ],
      },
    ],
    note: 'Prix calculé selon le temps choisi (heures × tarif horaire + jours × tarif journalier). Vous pouvez payer en ligne ou sur place par carte.',
    button: 'Sélectionner',
    perHour: 'Kč / heure',
    perHourEur: '€ / heure',
    perDay: 'Kč / jour',
    perDayEur: '€ / jour',
    latesurance: {
      name: '🛡️ Assurance Retard & Avance',
      price: '49',
      priceEur: '2,0',
      description: 'Protection contre les retards',
      features: [
        '90 minutes supplémentaires avant et après votre réservation',
        'Accès 90 minutes avant le début de la réservation (pendant les heures d\'ouverture)',
        'Pas de frais pour un retrait jusqu\'à 90 minutes de retard (pendant les heures d\'ouverture)',
      ],
    },
    latesurancePerBooking: 'Kč / réservation',
    latesurancePerBookingEur: '€ / réservation',
  },
  es: {
    title: 'Precios transparentes',
    subtitle: 'Sin tarifas ocultas. Paga solo por lo que necesitas.',
    currency: 'Moneda:',
    unavailable: 'Temporalmente no disponible',
    plans: [
      {
        name: 'Taquilla S',
        hourlyPrice: '29',
        hourlyPriceEur: '1,2',
        dailyPrice: '119',
        dailyPriceEur: '4,8',
        description: 'Para equipaje pequeño',
        features: [
          'Taquilla pequeña (30×20×50 cm)',
          'Abierto 7:30-18:00',
          'Videovigilancia',
          'Seguro incluido',
          'Pago online o en el lugar',
        ],
      },
      {
        name: 'Taquilla M',
        hourlyPrice: '49',
        hourlyPriceEur: '2,0',
        dailyPrice: '199',
        dailyPriceEur: '7,6',
        description: 'Para maletas y equipaje estándar',
        features: [
          'Perfecto para 1-2 maletas',
          'Abierto 7:30-18:00',
          'Videovigilancia',
          'Seguro incluido',
          'Pago online o en el lugar',
        ],
        popular: true,
      },
      {
        name: 'Taquilla L',
        hourlyPrice: '59',
        hourlyPriceEur: '2,4',
        dailyPrice: '239',
        dailyPriceEur: '8,8',
        description: 'Para maletas grandes y múltiples bolsas',
        features: [
          'Perfecto para 3+ maletas',
          'Abierto 7:30-18:00',
          'Videovigilancia',
          'Seguro incluido',
          'Pago online o en el lugar',
        ],
      },
    ],
    note: 'Precio calculado según el tiempo elegido (horas × tarifa por hora + días × tarifa diaria). Puedes pagar online o cómodamente en el lugar con tarjeta.',
    button: 'Seleccionar',
    perHour: 'Kč / hora',
    perHourEur: '€ / hora',
    perDay: 'Kč / día',
    perDayEur: '€ / día',
    latesurance: {
      name: '🛡️ Seguro Retraso & Anticipo',
      price: '49',
      priceEur: '2,0',
      description: 'Protección contra retrasos',
      features: [
        '90 minutos extra antes y después de su reserva',
        'Acceso 90 minutos antes del inicio de la reserva (durante el horario de apertura)',
        'Sin cargo por recogida hasta 90 minutos tarde (durante el horario de apertura)',
      ],
    },
    latesurancePerBooking: 'Kč / reserva',
    latesurancePerBookingEur: '€ / reserva',
  },
  it: {
    title: 'Prezzi trasparenti',
    subtitle: 'Nessun costo nascosto. Paga solo per ciò di cui hai bisogno.',
    currency: 'Valuta:',
    unavailable: 'Temporaneamente non disponibile',
    plans: [
      {
        name: 'Armadietto S',
        hourlyPrice: '29',
        hourlyPriceEur: '1,2',
        dailyPrice: '119',
        dailyPriceEur: '4,8',
        description: 'Per bagagli piccoli',
        features: [
          'Armadietto piccolo (30×20×50 cm)',
          'Aperto 7:30-18:00',
          'Videosorveglianza',
          'Assicurazione inclusa',
          'Pagamento online o sul posto',
        ],
      },
      {
        name: 'Armadietto M',
        hourlyPrice: '49',
        hourlyPriceEur: '2,0',
        dailyPrice: '199',
        dailyPriceEur: '7,6',
        description: 'Per valigie e bagagli standard',
        features: [
          'Perfetto per 1-2 valigie',
          'Aperto 7:30-18:00',
          'Videosorveglianza',
          'Assicurazione inclusa',
          'Pagamento online o sul posto',
        ],
        popular: true,
      },
      {
        name: 'Armadietto L',
        hourlyPrice: '59',
        hourlyPriceEur: '2,4',
        dailyPrice: '239',
        dailyPriceEur: '8,8',
        description: 'Per valigie grandi e più borse',
        features: [
          'Perfetto per 3+ valigie',
          'Aperto 7:30-18:00',
          'Videosorveglianza',
          'Assicurazione inclusa',
          'Pagamento online o sul posto',
        ],
      },
    ],
    note: 'Prezzo calcolato in base al tempo scelto (ore × tariffa oraria + giorni × tariffa giornaliera). Puoi pagare online o comodamente sul posto con carta.',
    button: 'Seleziona',
    perHour: 'Kč / ora',
    perHourEur: '€ / ora',
    perDay: 'Kč / giorno',
    perDayEur: '€ / giorno',
    latesurance: {
      name: '🛡️ Assicurazione Ritardo & Anticipo',
      price: '49',
      priceEur: '2,0',
      description: 'Protezione contro ritardi',
      features: [
        '90 minuti extra prima e dopo la prenotazione',
        'Accesso 90 minuti prima dell\'inizio della prenotazione (durante l\'orario di apertura)',
        'Nessun costo per il ritiro fino a 90 minuti in ritardo (durante l\'orario di apertura)',
      ],
    },
    latesurancePerBooking: 'Kč / prenotazione',
    latesurancePerBookingEur: '€ / prenotazione',
  },
};

export function Pricing({ language }: PricingProps) {
  // Use appropriate translations for each language
  const t = translations[language] || translations.en;
  const [currency, setCurrency] = useState<'CZK' | 'EUR'>('CZK');

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          
          {/* Currency Switcher */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-gray-600 text-sm font-medium">
              {t.currency}
            </span>
            <div className="inline-flex rounded-lg bg-gray-200 p-1">
              <button
                onClick={() => setCurrency('CZK')}
                className={`px-6 py-2 rounded-md font-semibold text-sm transition-all ${
                  currency === 'CZK'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                CZK (Kč)
              </button>
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-6 py-2 rounded-md font-semibold text-sm transition-all ${
                  currency === 'EUR'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                EUR (€)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {t.plans.map((plan, index) => {
            const isUnavailable = false; // All lockers are now available
            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm overflow-hidden relative ${
                  plan.popular ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                {isUnavailable && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                    {t.unavailable}
                  </div>
                )}
                {plan.popular && (
                  <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                    {language === 'cs' ? 'Nejoblíbenější' : 
                     language === 'de' ? 'Am beliebtesten' :
                     language === 'pl' ? 'Najpopularniejszy' :
                     language === 'uk' ? 'Найпопулярніший' :
                     language === 'fr' ? 'Le plus populaire' :
                     language === 'es' ? 'Más popular' :
                     language === 'it' ? 'Più popolare' :
                     'Most Popular'}
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {currency === 'CZK' ? plan.hourlyPrice : plan.hourlyPriceEur}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {currency === 'CZK' ? t.perHour : t.perHourEur}
                    </span>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {currency === 'CZK' ? plan.dailyPrice : plan.dailyPriceEur}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {currency === 'CZK' ? t.perDay : t.perDayEur}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Day Storage Discounts */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              {language === 'cs' ? 'Slevy při dlouhodobém uložení' :
               language === 'de' ? 'Rabatte für mehrtägige Aufbewahrung' :
               language === 'pl' ? 'Zniżki przy wielodniowym przechowywaniu' :
               language === 'uk' ? 'Знижки при багатоденному зберіганні' :
               language === 'fr' ? 'Réductions pour stockage multi-jours' :
               language === 'es' ? 'Descuentos por almacenamiento de varios días' :
               language === 'it' ? 'Sconti per deposito multi-giorno' :
               'Multi-Day Storage Discounts'}
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'cs' ? 'Čím déle skladujete, tím méně platíte — sleva se automaticky uplatní při platbě.' :
               language === 'de' ? 'Je länger Sie lagern, desto weniger zahlen Sie — der Rabatt wird automatisch an der Kasse angewendet.' :
               language === 'pl' ? 'Im dłużej przechowujesz, tym mniej płacisz — zniżka jest automatycznie stosowana przy kasie.' :
               language === 'uk' ? 'Чим довше ви зберігаєте, тим менше платите — знижка застосовується автоматично при оплаті.' :
               language === 'fr' ? 'Plus vous stockez longtemps, moins vous payez — la réduction est appliquée automatiquement lors du paiement.' :
               language === 'es' ? 'Cuanto más tiempo almacenes, menos pagas — el descuento se aplica automáticamente al pagar.' :
               language === 'it' ? 'Più a lungo depositi, meno paghi — lo sconto viene applicato automaticamente al checkout.' :
               'The longer you stay, the less you pay — discount applied automatically at checkout.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* 2 Days - 5% off */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-900">
                  {language === 'cs' ? '2 dny' :
                   language === 'de' ? '2 Tage' :
                   language === 'pl' ? '2 dni' :
                   language === 'uk' ? '2 дні' :
                   language === 'fr' ? '2 jours' :
                   language === 'es' ? '2 días' :
                   language === 'it' ? '2 giorni' :
                   '2 Days'}
                </h4>
                <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  5% {language === 'cs' ? 'sleva' : language === 'de' ? 'Rabatt' : language === 'pl' ? 'zniżka' : language === 'uk' ? 'знижка' : language === 'fr' ? 'réduction' : language === 'es' ? 'desc.' : language === 'it' ? 'sconto' : 'off'}
                </div>
              </div>
              <div className="text-center py-4">
                <div className="text-sm text-gray-600 mb-1">
                  {language === 'cs' ? 'Příklad: Střední skříňka' :
                   language === 'de' ? 'Beispiel: Mittelgroßes Schließfach' :
                   language === 'pl' ? 'Przykład: Średni schowek' :
                   language === 'uk' ? 'Приклад: Середня камера' :
                   language === 'fr' ? 'Exemple: Casier moyen' :
                   language === 'es' ? 'Ejemplo: Taquilla mediana' :
                   language === 'it' ? 'Esempio: Armadietto medio' :
                   'Example: Medium Locker'}
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {currency === 'CZK' ? '359' : '14.4'} {currency === 'CZK' ? 'Kč' : '€'}
                </div>
                <div className="text-xs text-gray-500 mt-1 line-through">
                  {currency === 'CZK' ? '378 Kč' : '15.2 €'}
                </div>
              </div>
            </div>

            {/* 3-6 Days - 10% off */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-300 hover:border-green-500 transition-colors transform scale-105">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-900">
                  {language === 'cs' ? '3–6 dní' :
                   language === 'de' ? '3–6 Tage' :
                   language === 'pl' ? '3–6 dni' :
                   language === 'uk' ? '3–6 днів' :
                   language === 'fr' ? '3–6 jours' :
                   language === 'es' ? '3–6 días' :
                   language === 'it' ? '3–6 giorni' :
                   '3–6 Days'}
                </h4>
                <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  10% {language === 'cs' ? 'sleva' : language === 'de' ? 'Rabatt' : language === 'pl' ? 'zniżka' : language === 'uk' ? 'знижка' : language === 'fr' ? 'réduction' : language === 'es' ? 'desc.' : language === 'it' ? 'sconto' : 'off'}
                </div>
              </div>
              <div className="text-center py-4">
                <div className="text-sm text-gray-600 mb-1">
                  {language === 'cs' ? 'Příklad: Střední skříňka' :
                   language === 'de' ? 'Beispiel: Mittelgroßes Schließfach' :
                   language === 'pl' ? 'Przykład: Średni schowek' :
                   language === 'uk' ? 'Приклад: Середня камера' :
                   language === 'fr' ? 'Exemple: Casier moyen' :
                   language === 'es' ? 'Ejemplo: Taquilla mediana' :
                   language === 'it' ? 'Esempio: Armadietto medio' :
                   'Example: Medium Locker'}
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {currency === 'CZK' ? '510' : '20.5'} {currency === 'CZK' ? 'Kč' : '€'}
                </div>
                <div className="text-xs text-gray-500 mt-1 line-through">
                  {currency === 'CZK' ? '567 Kč' : '22.8 €'}
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {language === 'cs' ? 'Nejoblíbenější' : language === 'de' ? 'Beliebteste' : language === 'pl' ? 'Najpopularniejszy' : language === 'uk' ? 'Найпопулярніший' : language === 'fr' ? 'Plus populaire' : language === 'es' ? 'Más popular' : language === 'it' ? 'Più popolare' : 'Most Popular'}
                </span>
              </div>
            </div>

            {/* 7+ Days - 15% off */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-900">
                  {language === 'cs' ? '7+ dní' :
                   language === 'de' ? '7+ Tage' :
                   language === 'pl' ? '7+ dni' :
                   language === 'uk' ? '7+ днів' :
                   language === 'fr' ? '7+ jours' :
                   language === 'es' ? '7+ días' :
                   language === 'it' ? '7+ giorni' :
                   '7+ Days'}
                </h4>
                <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  15% {language === 'cs' ? 'sleva' : language === 'de' ? 'Rabatt' : language === 'pl' ? 'zniżka' : language === 'uk' ? 'знижка' : language === 'fr' ? 'réduction' : language === 'es' ? 'desc.' : language === 'it' ? 'sconto' : 'off'}
                </div>
              </div>
              <div className="text-center py-4">
                <div className="text-sm text-gray-600 mb-1">
                  {language === 'cs' ? 'Příklad: Střední skříňka' :
                   language === 'de' ? 'Beispiel: Mittelgroßes Schließfach' :
                   language === 'pl' ? 'Przykład: Średni schowek' :
                   language === 'uk' ? 'Приклад: Середня камера' :
                   language === 'fr' ? 'Exemple: Casier moyen' :
                   language === 'es' ? 'Ejemplo: Taquilla mediana' :
                   language === 'it' ? 'Esempio: Armadietto medio' :
                   'Example: Medium Locker'}
                </div>
                <div className="text-3xl font-bold text-purple-600">
                  {currency === 'CZK' ? '1,124' : '45.2'} {currency === 'CZK' ? 'Kč' : '€'}
                </div>
                <div className="text-xs text-gray-500 mt-1 line-through">
                  {currency === 'CZK' ? '1,323 Kč' : '53.2 €'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latesurance Add-on Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-md p-6 border-2 border-orange-200">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  🛡️ {language === 'cs' ? 'Latesurance — 49 Kč' :
                       language === 'de' ? 'Latesurance — 49 Kč' :
                       language === 'pl' ? 'Latesurance — 49 Kč' :
                       language === 'uk' ? 'Latesurance — 49 Kč' :
                       language === 'fr' ? 'Latesurance — 49 Kč' :
                       language === 'es' ? 'Latesurance — 49 Kč' :
                       language === 'it' ? 'Latesurance — 49 Kč' :
                       'Latesurance — 49 CZK'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'cs' ? 'Máte zpoždění? Přidejte si Latesurance při rezervaci jen za 49 Kč za skříňku a zrušíme poplatek za extra den, pokud vyzvedáváte po konci vaší rezervace. Dostupné u kiosku při rezervaci.' :
                   language === 'de' ? 'Verspätet? Fügen Sie Latesurance beim Checkout für nur 49 Kč pro Schließfach hinzu und wir erlassen die Gebühr für zusätzliche Tage, wenn Sie nach Ihrer gebuchten Endzeit abholen. Am Kiosk beim Checkout verfügbar.' :
                   language === 'pl' ? 'Spóźniasz się? Dodaj Latesurance przy kasie za tylko 49 Kč za szafkę, a zrezygnujemy z opłaty za dodatkowy dzień, jeśli odbierzesz bagaż po zarezerwowanym czasie zakończenia. Dostępne przy kasie podczas rezerwacji.' :
                   language === 'uk' ? 'Запізнюєтесь? Додайте Latesurance при оформленні замовлення всього за 49 крон за камеру, і ми скасуємо додаткову плату за день, якщо ви заберете речі після закінчення бронювання. Доступно в кіоску при оформленні.' :
                   language === 'fr' ? 'En retard ? Ajoutez Latesurance lors du paiement pour seulement 49 Kč par casier et nous annulerons les frais supplémentaires si vous récupérez après la fin de votre réservation. Disponible au kiosque lors du paiement.' :
                   language === 'es' ? '¿Llegas tarde? Agrega Latesurance al pagar por solo 49 Kč por taquilla y cancelaremos el cargo por día extra si recoges después de tu hora de finalización reservada. Disponible en el quiosco durante el pago.' :
                   language === 'it' ? 'In ritardo? Aggiungi Latesurance al checkout per soli 49 Kč per armadietto e annulleremo il costo del giorno extra se ritiri dopo l\'orario di fine prenotazione. Disponibile al chiosco durante il checkout.' :
                   'Running late? Add Latesurance at checkout for just 49 CZK per locker and we\'ll waive the extra-day charge if you pick up after your booked end time. Available at the kiosk during checkout.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          {t.note}
        </p>
      </div>
    </section>
  );
}