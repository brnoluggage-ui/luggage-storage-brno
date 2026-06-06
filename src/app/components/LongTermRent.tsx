import { MessageCircle, Calendar, Percent, Clock } from 'lucide-react';

interface LongTermRentProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'Dlouhodobý pronájem',
    subtitle: 'Potřebujete uložit zavazadla na delší dobu?',
    description: 'Nabízíme speciální ceny pro dlouhodobé pronájmy s možností slevy až 20%!',
    whatsappCta: 'Kontaktujte nás na WhatsApp',
    benefits: [
      'Slevy až 20% na dlouhodobé pronájmy',
      'Flexibilní platební podmínky',
      'Bezpečné uložení na týdny či měsíce',
      'Rychlá odpověď přes WhatsApp',
    ],
    phoneNumber: '+420 733 506 027',
  },
  en: {
    title: 'Long-Term Rental',
    subtitle: 'Need to store your luggage for a longer period?',
    description: 'We offer special prices for long-term rentals with discounts of up to 20%!',
    whatsappCta: 'Contact us on WhatsApp',
    benefits: [
      'Discounts up to 20% on long-term rentals',
      'Flexible payment terms',
      'Safe storage for weeks or months',
      'Quick response via WhatsApp',
    ],
    phoneNumber: '+420 733 506 027',
  },
  de: {
    title: 'Langzeitmiete',
    subtitle: 'Müssen Sie Ihr Gepäck für längere Zeit aufbewahren?',
    description: 'Wir bieten Sonderpreise für Langzeitmieten mit Rabatten von bis zu 20%!',
    whatsappCta: 'Kontaktieren Sie uns auf WhatsApp',
    benefits: [
      'Rabatte bis zu 20% auf Langzeitmieten',
      'Flexible Zahlungsbedingungen',
      'Sichere Aufbewahrung für Wochen oder Monate',
      'Schnelle Antwort über WhatsApp',
    ],
    phoneNumber: '+420 733 506 027',
  },
  pl: {
    title: 'Wynajem długoterminowy',
    subtitle: 'Potrzebujesz przechować bagaż na dłużej?',
    description: 'Oferujemy specjalne ceny na wynajem długoterminowy ze zniżkami do 20%!',
    whatsappCta: 'Skontaktuj się z nami przez WhatsApp',
    benefits: [
      'Zniżki do 20% na wynajem długoterminowy',
      'Elastyczne warunki płatności',
      'Bezpieczne przechowywanie na tygodnie lub miesiące',
      'Szybka odpowiedź przez WhatsApp',
    ],
    phoneNumber: '+420 733 506 027',
  },
  uk: {
    title: 'Довгострокова оренда',
    subtitle: 'Потрібно зберігати багаж довше?',
    description: 'Ми пропонуємо спеціальні ціни на довгострокову оренду зі знижками до 20%!',
    whatsappCta: 'Зв\'яжіться з нами через WhatsApp',
    benefits: [
      'Знижки до 20% на довгострокову оренду',
      'Гнучкі умови оплати',
      'Безпечне зберігання на тижні чи місяці',
      'Швидка відповідь через WhatsApp',
    ],
    phoneNumber: '+420 733 506 027',
  },
  fr: {
    title: 'Location longue durée',
    subtitle: 'Besoin de stocker vos bagages pour une plus longue période?',
    description: 'Nous proposons des tarifs spéciaux pour les locations longue durée avec des réductions allant jusqu\'à 20%!',
    whatsappCta: 'Contactez-nous sur WhatsApp',
    benefits: [
      'Réductions jusqu\'à 20% sur les locations longue durée',
      'Conditions de paiement flexibles',
      'Stockage sécurisé pour des semaines ou des mois',
      'Réponse rapide via WhatsApp',
    ],
    phoneNumber: '+420 733 506 027',
  },
  es: {
    title: 'Alquiler a largo plazo',
    subtitle: '¿Necesitas guardar tu equipaje por más tiempo?',
    description: '¡Ofrecemos precios especiales para alquileres a largo plazo con descuentos de hasta el 20%!',
    whatsappCta: 'Contáctanos por WhatsApp',
    benefits: [
      'Descuentos de hasta el 20% en alquileres a largo plazo',
      'Condiciones de pago flexibles',
      'Almacenamiento seguro por semanas o meses',
      'Respuesta rápida vía WhatsApp',
    ],
    phoneNumber: '+420 733 506 027',
  },
  it: {
    title: 'Affitto a lungo termine',
    subtitle: 'Hai bisogno di depositare i bagagli per un periodo più lungo?',
    description: 'Offriamo prezzi speciali per affitti a lungo termine con sconti fino al 20%!',
    whatsappCta: 'Contattaci su WhatsApp',
    benefits: [
      'Sconti fino al 20% sugli affitti a lungo termine',
      'Condizioni di pagamento flessibili',
      'Deposito sicuro per settimane o mesi',
      'Risposta rapida tramite WhatsApp',
    ],
    phoneNumber: '+420 733 506 027',
  },
};

export function LongTermRent({ language }: LongTermRentProps) {
  const t = translations[language];

  const handleWhatsAppClick = () => {
    const message = language === 'cs' ? 'Dobrý den, zajímá mě dlouhodobý pronájem.' :
                    language === 'en' ? 'Hello, I am interested in long-term rental.' :
                    language === 'de' ? 'Hallo, ich interessiere mich für eine Langzeitmiete.' :
                    language === 'pl' ? 'Dzień dobry, jestem zainteresowany wynajmem długoterminowym.' :
                    language === 'uk' ? 'Доброго дня, мене цікавить довгострокова оренда.' :
                    language === 'fr' ? 'Bonjour, je suis intéressé par la location longue durée.' :
                    language === 'es' ? 'Hola, estoy interesado en el alquiler a largo plazo.' :
                    'Buongiorno, sono interessato all\'affitto a lungo termine.';
    
    const phoneNumber = '420733506027'; // Remove spaces and + for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="long-term" className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Content */}
            <div className="p-8 md:p-12 lg:p-16">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Percent className="w-4 h-4" />
                {language === 'cs' ? 'Sleva až 20%' :
                 language === 'en' ? 'Up to 20% OFF' :
                 language === 'de' ? 'Bis zu 20% Rabatt' :
                 language === 'pl' ? 'Do 20% zniżki' :
                 language === 'uk' ? 'Знижка до 20%' :
                 language === 'fr' ? 'Jusqu\'à 20% de réduction' :
                 language === 'es' ? 'Hasta 20% de descuento' :
                 'Fino al 20% di sconto'}
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t.title}
              </h2>
              
              <p className="text-xl text-gray-700 mb-2 font-semibold">
                {t.subtitle}
              </p>
              
              <p className="text-lg text-gray-600 mb-8">
                {t.description}
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-10">
                {t.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA Button */}
              <button
                onClick={handleWhatsAppClick}
                className="group w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {t.whatsappCta}
              </button>

              <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {language === 'cs' ? 'Odpovíme do 24 hodin' :
                 language === 'en' ? 'We respond within 24 hours' :
                 language === 'de' ? 'Wir antworten innerhalb von 24 Stunden' :
                 language === 'pl' ? 'Odpowiadamy w ciągu 24 godzin' :
                 language === 'uk' ? 'Відповімо протягом 24 годин' :
                 language === 'fr' ? 'Nous répondons sous 24 heures' :
                 language === 'es' ? 'Respondemos en 24 horas' :
                 'Rispondiamo entro 24 ore'}
              </p>
            </div>

            {/* Right Side - Visual */}
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-8 md:p-12 lg:p-16 flex items-center justify-center">
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-white rounded-full"></div>
              </div>

              {/* Central Content */}
              <div className="relative z-10 w-full max-w-sm space-y-6">
                {/* Upper Box - 20% Discount Graphic */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="relative">
                    {/* Discount Badge */}
                    <div className="absolute -top-12 -right-4 bg-red-500 text-white rounded-full w-20 h-20 flex items-center justify-center transform rotate-12 shadow-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold leading-none">20%</div>
                        <div className="text-xs font-semibold">OFF</div>
                      </div>
                    </div>
                    
                    {/* Main Discount Visual */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">
                          20%
                        </div>
                        <Percent className="w-12 h-12 text-green-600" />
                      </div>
                      
                      <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-3"></div>
                      
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        {language === 'cs' ? 'Sleva na dlouhodobý pronájem' :
                         language === 'en' ? 'Long-Term Rental Discount' :
                         language === 'de' ? 'Langzeitmiete Rabatt' :
                         language === 'pl' ? 'Zniżka na długoterminowy' :
                         language === 'uk' ? 'Знижка на довгострокову оренду' :
                         language === 'fr' ? 'Réduction longue durée' :
                         language === 'es' ? 'Descuento largo plazo' :
                         'Sconto lungo termine'}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {language === 'cs' ? 'Týdny & Měsíce' :
                           language === 'en' ? 'Weeks & Months' :
                           language === 'de' ? 'Wochen & Monate' :
                           language === 'pl' ? 'Tygodnie i miesiące' :
                           language === 'uk' ? 'Тижні та місяці' :
                           language === 'fr' ? 'Semaines et mois' :
                           language === 'es' ? 'Semanas y meses' :
                           'Settimane e mesi'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lower Box - Long-Term Storage Graphic */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="text-center">
                    {/* Luggage Storage Illustration */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {/* Three suitcases */}
                      <div className="relative">
                        <div className="w-12 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg transform -rotate-6 shadow-lg"></div>
                        <div className="absolute top-0 left-0 w-8 h-2 bg-blue-800 rounded-t-lg"></div>
                      </div>
                      <div className="relative">
                        <div className="w-14 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-xl"></div>
                        <div className="absolute top-0 left-0 w-10 h-2 bg-green-800 rounded-t-lg"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-green-700"></div>
                      </div>
                      <div className="relative">
                        <div className="w-11 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg transform rotate-6 shadow-lg"></div>
                        <div className="absolute top-0 left-0 w-7 h-2 bg-orange-800 rounded-t-lg"></div>
                      </div>
                    </div>
                    
                    {/* Lock Icon - Security */}
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-sm font-bold text-gray-800 mb-2">
                      {language === 'cs' ? 'Bezpečné dlouhodobé uložení' :
                       language === 'en' ? 'Safe Long-Term Storage' :
                       language === 'de' ? 'Sichere Langzeitlagerung' :
                       language === 'pl' ? 'Bezpieczne długoterminowe' :
                       language === 'uk' ? 'Безпечне зберігання' :
                       language === 'fr' ? 'Stockage sécurisé' :
                       language === 'es' ? 'Almacenamiento seguro' :
                       'Deposito sicuro'}
                    </h3>
                    
                    {/* Contact CTA */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mt-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                        <span className="text-xs font-semibold text-gray-700">WhatsApp</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {t.phoneNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}