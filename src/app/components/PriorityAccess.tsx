import { Crown, Clock, Calendar, Phone, Percent } from 'lucide-react';

interface PriorityAccessProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'Priority Access',
    subtitle: 'Prémiová služba pro bezstarostný komfort',
    price: 'Pouze +50 Kč',
    benefits: 'Získejte VIP přístup k našim službám',
    benefit1Title: '1 hodina tolerance',
    benefit1Desc: 'Brzký check-in nebo pozdní vyzvednutí - kontaktujte nás předem',
    benefit2Title: 'Okamžitá dostupnost',
    benefit2Desc: 'Po kontaktu a uvedení statusu premium zákazníka jsme k dispozici na telefonu',
    benefit3Title: '40% sleva na prodloužení',
    benefit3Desc: 'Ušetřete při prodloužení pronájmu',
    benefit4Title: 'Flexibilní časování',
    benefit4Desc: 'Žádné pevné časové sloty',
    cta: 'Přidat Priority Access',
  },
  en: {
    title: 'Priority Access',
    subtitle: 'Premium convenience service for worry-free experience',
    price: 'Only +50 CZK',
    benefits: 'Get VIP access to our services',
    benefit1Title: '1-hour grace period',
    benefit1Desc: 'Early check-in or late pickup - contact us beforehand',
    benefit2Title: 'Immediate availability',
    benefit2Desc: 'After contacting us and stating premium status, we are available on call',
    benefit3Title: '40% off extensions',
    benefit3Desc: 'Save when extending your rental',
    benefit4Title: 'Flexible scheduling',
    benefit4Desc: 'No rigid time slots',
    cta: 'Add Priority Access',
  },
  de: {
    title: 'Priority Access',
    subtitle: 'Premium-Komfortservice für sorgenfreies Erlebnis',
    price: 'Nur +50 CZK',
    benefits: 'Erhalten Sie VIP-Zugang zu unseren Diensten',
    benefit1Title: '1 Stunde Kulanz',
    benefit1Desc: 'Früher Check-in oder späte Abholung - kontaktieren Sie uns vorher',
    benefit2Title: 'Sofortige Verfügbarkeit',
    benefit2Desc: 'Nach Kontakt und Angabe des Premium-Status sind wir telefonisch erreichbar',
    benefit3Title: '40% Rabatt auf Verlängerungen',
    benefit3Desc: 'Sparen Sie bei Mietverlängerung',
    benefit4Title: 'Flexible Zeitplanung',
    benefit4Desc: 'Keine festen Zeitfenster',
    cta: 'Priority Access hinzufügen',
  },
  pl: {
    title: 'Priority Access',
    subtitle: 'Usługa premium dla bezproblemowego doświadczenia',
    price: 'Tylko +50 CZK',
    benefits: 'Uzyskaj dostęp VIP do naszych usług',
    benefit1Title: '1 godzina tolerancji',
    benefit1Desc: 'Wczesny check-in lub późny odbiór - skontaktuj się wcześniej',
    benefit2Title: 'Natychmiastowa dostępność',
    benefit2Desc: 'Po kontakcie i podaniu statusu premium jesteśmy dostępni telefonicznie',
    benefit3Title: '40% zniżki na przedłużenie',
    benefit3Desc: 'Oszczędzaj przy przedłużaniu wynajmu',
    benefit4Title: 'Elastyczne planowanie',
    benefit4Desc: 'Brak sztywnych przedziałów czasowych',
    cta: 'Dodaj Priority Access',
  },
  uk: {
    title: 'Priority Access',
    subtitle: 'Преміум сервіс для безтурботного комфорту',
    price: 'Лише +50 CZK',
    benefits: 'Отримайте VIP-доступ до наших послуг',
    benefit1Title: '1 година пільгового періоду',
    benefit1Desc: 'Рання реєстрація або пізнє отримання - зверніться заздалегідь',
    benefit2Title: 'Негайна доступність',
    benefit2Desc: 'Після контакту та вказівки преміум статусу ми доступні по телефону',
    benefit3Title: '40% знижка на подовження',
    benefit3Desc: 'Заощаджуйте при подовженні оренди',
    benefit4Title: 'Гнучке планування',
    benefit4Desc: 'Без жорстких часових слотів',
    cta: 'Додати Priority Access',
  },
  fr: {
    title: 'Priority Access',
    subtitle: 'Service premium de commodité pour une expérience sans souci',
    price: 'Seulement +50 CZK',
    benefits: 'Accédez VIP à nos services',
    benefit1Title: '1 heure de tolérance',
    benefit1Desc: 'Enregistrement anticipé ou récupération tardive - contactez-nous à l\'avance',
    benefit2Title: 'Disponibilité immédiate',
    benefit2Desc: 'Après contact et mention du statut premium, nous sommes disponibles par téléphone',
    benefit3Title: '40% de réduction sur prolongations',
    benefit3Desc: 'Économisez en prolongeant votre location',
    benefit4Title: 'Planification flexible',
    benefit4Desc: 'Pas de créneaux horaires rigides',
    cta: 'Ajouter Priority Access',
  },
  es: {
    title: 'Priority Access',
    subtitle: 'Servicio premium de conveniencia para experiencia sin preocupaciones',
    price: 'Solo +50 CZK',
    benefits: 'Obtenga acceso VIP a nuestros servicios',
    benefit1Title: '1 hora de tolerancia',
    benefit1Desc: 'Check-in temprano o recogida tardía - contáctenos con anticipación',
    benefit2Title: 'Disponibilidad inmediata',
    benefit2Desc: 'Después de contactar y mencionar el estado premium, estamos disponibles por teléfono',
    benefit3Title: '40% descuento en extensiones',
    benefit3Desc: 'Ahorre al extender su alquiler',
    benefit4Title: 'Programación flexible',
    benefit4Desc: 'Sin franjas horarias rígidas',
    cta: 'Añadir Priority Access',
  },
  it: {
    title: 'Priority Access',
    subtitle: 'Servizio premium di convenienza per esperienza senza preoccupazioni',
    price: 'Solo +50 CZK',
    benefits: 'Ottieni accesso VIP ai nostri servizi',
    benefit1Title: '1 ora di tolleranza',
    benefit1Desc: 'Check-in anticipato o ritiro tardivo - contattaci in anticipo',
    benefit2Title: 'Disponibilità immediata',
    benefit2Desc: 'Dopo averci contattato e menzionato lo stato premium, siamo disponibili al telefono',
    benefit3Title: '40% sconto su estensioni',
    benefit3Desc: 'Risparmia estendendo il noleggio',
    benefit4Title: 'Pianificazione flessibile',
    benefit4Desc: 'Nessuna fascia oraria rigida',
    cta: 'Aggiungi Priority Access',
  },
};

export function PriorityAccess({ language }: PriorityAccessProps) {
  const t = translations[language];

  const benefits = [
    { icon: Clock, title: t.benefit1Title, desc: t.benefit1Desc },
    { icon: Phone, title: t.benefit2Title, desc: t.benefit2Desc },
    { icon: Percent, title: t.benefit3Title, desc: t.benefit3Desc },
    { icon: Calendar, title: t.benefit4Title, desc: t.benefit4Desc },
  ];

  return (
    <section id="priority-access" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full mb-4">
              <Crown className="w-5 h-5" />
              <span className="font-semibold">{t.price}</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-amber-100 hover:border-amber-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-center text-white shadow-2xl">
            <Crown className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">{t.benefits}</h3>
            <p className="text-amber-50 mb-6 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
            <a
              href="#reservation"
              className="inline-block bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg hover:shadow-xl"
            >
              {t.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}