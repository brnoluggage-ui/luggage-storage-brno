import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

interface ContactProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'Kontaktujte nás',
    subtitle: 'Máte otázky? Napište nám na WhatsApp!',
    description: 'Pro nejrychlejší odpověď nás kontaktujte přes WhatsApp. Jsme tu, abychom vám pomohli.',
    whatsapp: 'WhatsApp Chat',
    whatsappCta: 'Otevřít WhatsApp konverzaci',
    whatsappDesc: 'Nejrychlejší způsob, jak se s námi spojit. Odpovídáme 24/7.',
    email: 'Email',
    emailValue: 'brnoluggage@gmail.com',
    phone: 'Telefon',
    phoneValue: '+420 608 313 122',
    location: 'Poloha',
    locationValue: 'Brno hlavní nádraží, přízemí, hala 1',
    hours: 'Provozní doba',
    hoursValue: '7:30 - 18:00',
    support: 'Podpora k dispozici během provozní doby',
  },
  en: {
    title: 'Contact Us',
    subtitle: 'Have questions? Message us on WhatsApp!',
    description: 'For the fastest response, contact us via WhatsApp. We\'re here to help you.',
    whatsapp: 'WhatsApp Chat',
    whatsappCta: 'Open WhatsApp Chat',
    whatsappDesc: 'The fastest way to reach us. We respond 24/7.',
    email: 'Email',
    emailValue: 'brnoluggage@gmail.com',
    phone: 'Phone',
    phoneValue: '+420 608 313 122',
    location: 'Location',
    locationValue: 'Brno Main Station, Ground Floor, Hall 1',
    hours: 'Operating Hours',
    hoursValue: '7:30 AM - 6:00 PM',
    support: 'Support available during operating hours',
  },
};

export function Contact({ language }: ContactProps) {
  // Fallback to English for languages without translations
  const supportedLanguage = language === 'cs' || language === 'en' ? language : 'en';
  const t = translations[supportedLanguage];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* WhatsApp CTA - Prominent */}
          <div className="mb-12">
            <a
              href="https://wa.me/420733506027"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 transform"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <MessageCircle className="w-12 h-12" />
                <h3 className="text-3xl font-bold">{t.whatsapp}</h3>
              </div>
              <p className="text-center text-lg mb-4 text-green-50">
                {t.whatsappDesc}
              </p>
              <div className="text-center">
                <span className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg">
                  {t.whatsappCta} →
                </span>
              </div>
            </a>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.email}</h3>
              <a href="mailto:brnoluggage@gmail.com" className="text-blue-600 hover:underline text-sm">
                {t.emailValue}
              </a>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.phone}</h3>
              <a href="tel:+420608313122" className="text-blue-600 hover:underline text-sm">
                {t.phoneValue}
              </a>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.location}</h3>
              <p className="text-gray-600 text-sm">{t.locationValue}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.hours}</h3>
              <p className="text-gray-600 text-sm">{t.hoursValue}</p>
            </div>
          </div>

          {/* Bigger Google Map */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg" style={{ height: '600px' }}>
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
      </div>
    </section>
  );
}