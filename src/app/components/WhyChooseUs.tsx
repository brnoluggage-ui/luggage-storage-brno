import { DollarSign, MessageCircle, ThumbsUp, Wrench, Heart, Shield } from 'lucide-react';

interface WhyChooseUsProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'Proč si vybrat nás?',
    subtitle: 'Naše závazky vůči vám',
    fairPrices: {
      title: 'Férové ceny',
      description: 'Žádné skryté poplatky. Platíte pouze za to, co potřebujete.',
    },
    refundPolicy: {
      title: 'Garance vrácení peněz',
      description: 'Nejste spokojeni? Vrátíme vám peníze. Řekněte nám proč, abychom se mohli zlepšit.',
    },
    support: {
      title: 'Podpora 24/7',
      description: 'Napište nám kdykoliv během dne. Odpovíme vám co nejdříve.',
    },
    problemSolving: {
      title: 'Vyřešíme problémy',
      description: 'Máte potíže? Vyřešíme je za vás rychle a efektivně.',
    },
    commitment: {
      title: 'Náš závazek',
      description: 'Snažíme se být nejlepší a poskytovat co nejlepší služby.',
    },
    trustSafety: {
      title: 'Důvěra & Bezpečnost',
      description: 'Moderní úschovné skříňky s video dohledem a pojištěním.',
    },
  },
  en: {
    title: 'Why Choose Us?',
    subtitle: 'Our Commitment to You',
    fairPrices: {
      title: 'Fair Prices',
      description: 'No hidden fees. Pay only for what you need.',
    },
    refundPolicy: {
      title: 'Money-Back Guarantee',
      description: 'Not happy? We\'ll refund you. Tell us why so we can improve.',
    },
    support: {
      title: '24/7 Support',
      description: 'Text us anytime. We will respond as soon as possible.',
    },
    problemSolving: {
      title: 'We Solve Problems',
      description: 'Having issues? We\'ll sort it out quickly and efficiently.',
    },
    commitment: {
      title: 'Our Commitment',
      description: 'We\'re trying to be the best and provide the best possible service.',
    },
    trustSafety: {
      title: 'Trust & Safety',
      description: 'Modern lockers with video surveillance and insurance coverage.',
    },
  },
  de: {
    title: 'Warum uns wählen?',
    subtitle: 'Unser Engagement für Sie',
    fairPrices: {
      title: 'Faire Preise',
      description: 'Keine versteckten Gebühren. Zahlen Sie nur für das, was Sie brauchen.',
    },
    refundPolicy: {
      title: 'Geld-zurück-Garantie',
      description: 'Nicht zufrieden? Wir erstatten Ihnen das Geld. Sagen Sie uns warum, damit wir uns verbessern können.',
    },
    support: {
      title: '24/7 Support',
      description: 'Schreiben Sie uns jederzeit. Wir antworten so schnell wie möglich.',
    },
    problemSolving: {
      title: 'Wir lösen Probleme',
      description: 'Probleme? Wir kümmern uns schnell und effizient darum.',
    },
    commitment: {
      title: 'Unser Engagement',
      description: 'Wir geben unser Bestes, um den bestmöglichen Service zu bieten.',
    },
    trustSafety: {
      title: 'Vertrauen & Sicherheit',
      description: 'Moderne Schließfächer mit Videoüberwachung und Versicherungsschutz.',
    },
  },
  pl: {
    title: 'Dlaczego my?',
    subtitle: 'Nasze zobowiązanie wobec Ciebie',
    fairPrices: {
      title: 'Uczciwe ceny',
      description: 'Bez ukrytych opłat. Płacisz tylko za to, czego potrzebujesz.',
    },
    refundPolicy: {
      title: 'Gwarancja zwrotu pieniędzy',
      description: 'Niezadowolony? Zwrócimy pieniądze. Powiedz nam dlaczego, abyśmy mogli się poprawić.',
    },
    support: {
      title: 'Wsparcie 24/7',
      description: 'Napisz do nas o każdej porze. Odpowiemy tak szybko, jak to możliwe.',
    },
    problemSolving: {
      title: 'Rozwiązujemy problemy',
      description: 'Masz problem? Rozwiążemy go szybko i skutecznie.',
    },
    commitment: {
      title: 'Nasze zobowiązanie',
      description: 'Staramy się być najlepsi i świadczyć jak najlepsze usługi.',
    },
    trustSafety: {
      title: 'Zaufanie i bezpieczeństwo',
      description: 'Nowoczesne szafki z monitoringiem wideo i ubezpieczeniem.',
    },
  },
  uk: {
    title: 'Чому обрати нас?',
    subtitle: 'Наші зобов\'язання перед вами',
    fairPrices: {
      title: 'Чесні ціни',
      description: 'Ніяких прихованих платежів. Платите лише за те, що потрібно.',
    },
    refundPolicy: {
      title: 'Гарантія повернення грошей',
      description: 'Незадоволені? Ми повернемо гроші. Розкажіть чому, щоб ми могли покращитися.',
    },
    support: {
      title: 'Підтримка 24/7',
      description: 'Пишіть нам у будь-який час. Ми відповімо якомога швидше.',
    },
    problemSolving: {
      title: 'Вирішуємо проблеми',
      description: 'Є проблеми? Ми швидко та ефективно їх вирішимо.',
    },
    commitment: {
      title: 'Наше зобов\'язання',
      description: 'Ми намагаємось бути найкращими і надавати найкращий сервіс.',
    },
    trustSafety: {
      title: 'Довіра та безпека',
      description: 'Сучасні шафи з відеоспостереженням та страховим покриттям.',
    },
  },
  fr: {
    title: 'Pourquoi nous choisir?',
    subtitle: 'Notre engagement envers vous',
    fairPrices: {
      title: 'Prix équitables',
      description: 'Pas de frais cachés. Payez uniquement ce dont vous avez besoin.',
    },
    refundPolicy: {
      title: 'Garantie de remboursement',
      description: 'Pas satisfait? Nous vous remboursons. Dites-nous pourquoi pour nous améliorer.',
    },
    support: {
      title: 'Support 24/7',
      description: 'Écrivez-nous à tout moment. Nous répondrons dès que possible.',
    },
    problemSolving: {
      title: 'Nous résolvons les problèmes',
      description: 'Des problèmes? Nous les résoudrons rapidement et efficacement.',
    },
    commitment: {
      title: 'Notre engagement',
      description: 'Nous essayons d\'être les meilleurs et de fournir le meilleur service possible.',
    },
    trustSafety: {
      title: 'Confiance et sécurité',
      description: 'Casiers modernes avec vidéosurveillance et couverture d\'assurance.',
    },
  },
  es: {
    title: '¿Por qué elegirnos?',
    subtitle: 'Nuestro compromiso contigo',
    fairPrices: {
      title: 'Precios justos',
      description: 'Sin tarifas ocultas. Paga solo por lo que necesitas.',
    },
    refundPolicy: {
      title: 'Garantía de devolución',
      description: '¿No estás contento? Te reembolsamos. Dinos por qué para mejorar.',
    },
    support: {
      title: 'Soporte 24/7',
      description: 'Escríbenos en cualquier momento. Responderemos lo antes posible.',
    },
    problemSolving: {
      title: 'Resolvemos problemas',
      description: '¿Tienes problemas? Los resolveremos rápida y eficientemente.',
    },
    commitment: {
      title: 'Nuestro compromiso',
      description: 'Intentamos ser los mejores y brindar el mejor servicio posible.',
    },
    trustSafety: {
      title: 'Confianza y seguridad',
      description: 'Casilleros modernos con videovigilancia y cobertura de seguro.',
    },
  },
  it: {
    title: 'Perché scegliere noi?',
    subtitle: 'Il nostro impegno verso di te',
    fairPrices: {
      title: 'Prezzi equi',
      description: 'Nessuna tariffa nascosta. Paghi solo per ciò di cui hai bisogno.',
    },
    refundPolicy: {
      title: 'Garanzia di rimborso',
      description: 'Non sei soddisfatto? Ti rimborsiamo. Dicci perché per migliorare.',
    },
    support: {
      title: 'Supporto 24/7',
      description: 'Scrivici in qualsiasi momento. Risponderemo il prima possibile.',
    },
    problemSolving: {
      title: 'Risolviamo i problemi',
      description: 'Hai problemi? Li risolveremo rapidamente ed efficientemente.',
    },
    commitment: {
      title: 'Il nostro impegno',
      description: 'Cerchiamo di essere i migliori e fornire il miglior servizio possibile.',
    },
    trustSafety: {
      title: 'Fiducia e sicurezza',
      description: 'Armadietti moderni con videosorveglianza e copertura assicurativa.',
    },
  },
};

export function WhyChooseUs({ language }: WhyChooseUsProps) {
  const t = translations[language];

  const features = [
    {
      icon: DollarSign,
      title: t.fairPrices.title,
      description: t.fairPrices.description,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: ThumbsUp,
      title: t.refundPolicy.title,
      description: t.refundPolicy.description,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: MessageCircle,
      title: t.support.title,
      description: t.support.description,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: Wrench,
      title: t.problemSolving.title,
      description: t.problemSolving.description,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      icon: Heart,
      title: t.commitment.title,
      description: t.commitment.description,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
    },
    {
      icon: Shield,
      title: t.trustSafety.title,
      description: t.trustSafety.description,
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Gradient Top Bar */}
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              
              <div className="p-8">
                {/* Icon */}
                <div className={`${feature.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-5 rounded-full`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {language === 'cs' ? '🌟 Jsme tu pro vás!' : 
             language === 'en' ? '🌟 We\'re Here for You!' :
             language === 'de' ? '🌟 Wir sind für Sie da!' :
             language === 'pl' ? '🌟 Jesteśmy tu dla Ciebie!' :
             language === 'uk' ? '🌟 Ми тут для вас!' :
             language === 'fr' ? '🌟 Nous sommes là pour vous!' :
             language === 'es' ? '🌟 ¡Estamos aquí para ti!' :
             '🌟 Siamo qui per te!'}
          </h3>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            {language === 'cs' ? 'Neustále se snažíme zlepšovat naše služby. Vaše zpětná vazba nám pomáhá růst a poskytovat vám ještě lepší zážitek.' :
             language === 'en' ? 'We continuously strive to improve our services. Your feedback helps us grow and provide you with an even better experience.' :
             language === 'de' ? 'Wir bemühen uns kontinuierlich, unsere Dienstleistungen zu verbessern. Ihr Feedback hilft uns zu wachsen und Ihnen ein noch besseres Erlebnis zu bieten.' :
             language === 'pl' ? 'Nieustannie staramy się poprawiać nasze usługi. Twoja opinia pomaga nam się rozwijać i zapewnić jeszcze lepsze doświadczenie.' :
             language === 'uk' ? 'Ми постійно прагнемо покращувати наші послуги. Ваші відгуки допомагають нам рости і надавати вам ще кращий досвід.' :
             language === 'fr' ? 'Nous nous efforçons continuellement d\'améliorer nos services. Vos commentaires nous aident à grandir et à vous offrir une expérience encore meilleure.' :
             language === 'es' ? 'Nos esforzamos continuamente por mejorar nuestros servicios. Tus comentarios nos ayudan a crecer y brindarte una experiencia aún mejor.' :
             'Ci impegniamo continuamente a migliorare i nostri servizi. Il tuo feedback ci aiuta a crescere e fornirti un\'esperienza ancora migliore.'}
          </p>
        </div>
      </div>
    </section>
  );
}
