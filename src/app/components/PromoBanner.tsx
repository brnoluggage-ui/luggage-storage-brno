import { Tag, Sparkles } from 'lucide-react';

interface PromoBannerProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: '🎉 Speciální nabídka pro nové zákazníky!',
    subtitle: 'Získejte slevu 15% na první objednávku',
    code: 'BAGS15',
    cta: 'Použít kód při rezervaci',
    description: 'Zadejte tento kód při rezervaci a ušetřete 15%!',
  },
  en: {
    title: '🎉 Special Offer for New Customers!',
    subtitle: 'Get 15% off your first order',
    code: 'BAGS15',
    cta: 'Use code at checkout',
    description: 'Enter this code during reservation and save 15%!',
  },
  de: {
    title: '🎉 Sonderangebot für Neukunden!',
    subtitle: 'Erhalten Sie 15% Rabatt auf Ihre erste Bestellung',
    code: 'BAGS15',
    cta: 'Code bei der Buchung verwenden',
    description: 'Geben Sie diesen Code bei der Reservierung ein und sparen Sie 15%!',
  },
  pl: {
    title: '🎉 Specjalna oferta dla nowych klientów!',
    subtitle: 'Otrzymaj 15% zniżki na pierwsze zamówienie',
    code: 'BAGS15',
    cta: 'Użyj kodu przy rezerwacji',
    description: 'Wpisz ten kod podczas rezerwacji i zaoszczędź 15%!',
  },
  uk: {
    title: '🎉 Спеціальна пропозиція для нових клієнтів!',
    subtitle: 'Отримайте знижку 15% на перше замовлення',
    code: 'BAGS15',
    cta: 'Використати код при бронюванні',
    description: 'Введіть цей код під час резервування та заощадьте 15%!',
  },
  fr: {
    title: '🎉 Offre spéciale pour les nouveaux clients!',
    subtitle: 'Obtenez 15% de réduction sur votre première commande',
    code: 'BAGS15',
    cta: 'Utiliser le code lors de la réservation',
    description: 'Entrez ce code lors de la réservation et économisez 15%!',
  },
  es: {
    title: '🎉 ¡Oferta especial para nuevos clientes!',
    subtitle: 'Obtén un 15% de descuento en tu primer pedido',
    code: 'BAGS15',
    cta: 'Usar código al reservar',
    description: '¡Ingresa este código durante la reserva y ahorra un 15%!',
  },
  it: {
    title: '🎉 Offerta speciale per i nuovi clienti!',
    subtitle: 'Ottieni il 15% di sconto sul tuo primo ordine',
    code: 'BAGS15',
    cta: 'Usa il codice alla prenotazione',
    description: 'Inserisci questo codice durante la prenotazione e risparmia il 15%!',
  },
};

export function PromoBanner({ language }: PromoBannerProps) {
  const t = translations[language];

  return (
    <section className="py-12 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-400/20 to-green-500/20 rounded-full -ml-12 -mb-12" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t.title}</h2>
                <p className="text-xl text-gray-600">{t.subtitle}</p>
              </div>

              {/* Promo Code Display */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Tag className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Promo Code</span>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-white px-8 py-4 rounded-lg shadow-md border-2 border-dashed border-green-400">
                    <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 tracking-wider">
                      {t.code}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-center text-lg text-gray-700 mb-6">
                {t.description}
              </p>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href="#reservation"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Tag className="w-5 h-5" />
                  {t.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}