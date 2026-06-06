import { Wallet } from 'lucide-react';
import stripeLogo from 'figma:asset/54301fab5742a8d2c01ee1aac6d2456f1520d719.png';

interface PaymentBannerProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: '💳 Platba dle vašeho výběru',
    description: 'Můžete platit online při rezervaci NEBO pohodlně na místě platební kartou',
    securePayment: 'Bezpečná platba přes',
  },
  en: {
    title: '💳 Payment your way',
    description: 'Pay online when booking OR conveniently on-site by credit card',
    securePayment: 'Secure payment via',
  },
  de: {
    title: '💳 Zahlung nach Ihrer Wahl',
    description: 'Online bei der Buchung zahlen ODER bequem vor Ort mit Kreditkarte',
    securePayment: 'Sichere Zahlung über',
  },
  pl: {
    title: '💳 Płatność według wyboru',
    description: 'Płać online przy rezerwacji LUB wygodnie na miejscu kartą kredytową',
    securePayment: 'Bezpieczna płatność przez',
  },
  uk: {
    title: '💳 Оплата на ваш вибір',
    description: 'Оплата онлайн при бронюванні АБО зручно на місці кредитною карткою',
    securePayment: 'Безпечна оплата через',
  },
  fr: {
    title: '💳 Paiement à votre choix',
    description: 'Payez en ligne lors de la réservation OU sur place par carte de crédit',
    securePayment: 'Paiement sécurisé via',
  },
  es: {
    title: '💳 Pago a tu elección',
    description: 'Paga online al reservar O cómodamente en el sitio con tarjeta de crédito',
    securePayment: 'Pago seguro a través de',
  },
  it: {
    title: '💳 Pagamento a tua scelta',
    description: 'Paga online durante la prenotazione O comodamente in loco con carta di credito',
    securePayment: 'Pagamento sicuro tramite',
  },
};

export function PaymentBanner({ language }: PaymentBannerProps) {
  const t = translations[language];

  return (
    <section className="py-12 bg-gradient-to-r from-green-500 to-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-4">
            <Wallet className="w-12 h-12 text-white flex-shrink-0" />
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {t.title}
              </h3>
              <p className="text-lg md:text-xl text-green-50">
                {t.description}
              </p>
            </div>
          </div>
          
          {/* Prominent Stripe Badge */}
          <div className="bg-white rounded-xl shadow-2xl px-8 py-4 flex items-center gap-3 transform hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span className="text-gray-800 font-semibold text-lg">
              {t.securePayment}
            </span>
            <img src={stripeLogo} alt="Stripe Logo" className="h-8" />
          </div>
        </div>
      </div>
    </section>
  );
}