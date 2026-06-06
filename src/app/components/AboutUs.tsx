import albertImage from "figma:asset/a2ce21335a376485cf9fa4626ebf24ab575c92a2.png";
import { Heart, MessageCircle, RefreshCw, Shield } from 'lucide-react';

interface AboutUsProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    title: 'O mně',
    subtitle: 'Proč jsem založil tuto úschovnu',
    ownerName: 'Albert Krajčovič',
    ownerTitle: 'Zakladatel',
    story1: 'Ahoj! Celý můj život jsem pracoval ve službách a věřte mi – zažil jsem, jak špatně můžou věci fungovat. Fronty, nepříjemný personál, nulová flexibilita. A úschovny zavazadel? Tam to bylo často úplně nejhorší.',
    story2: 'Tak jsem si řekl – musí to jít líp! Otevřel jsem moderní úschovnu na Hlavním nádraží v Brně, kde VY máte kontrolu. Žádné čekání u přepážky, žádný stres. Prostě vezmeš skříňku, uložíš si věci a jdeš.',
    story3: 'A tady je to nejdůležitější: CHCI slyšet, co si myslíte. Nelíbí se vám barva skříněk? Napište mi. Náš e-mail je moc formální? Změníme to. Udělám vše proto, aby vaše zkušenost byla co nejhladší a nejpohodlnější.',
    story4: 'Chci, aby vaše cesta do Brna byla pohodlná a bezstarostná. Těším se, že vám s tím pomůžu!',
    story5: 'Díky, že jste tady, a těším se na vás!',
    signature: '– Albert',
    values: 'Co je pro mě důležité',
    value1Title: 'Vaše slovo rozhoduje',
    value1Desc: 'Opravdu poslouchám. Každý nápad nebo stížnost vede ke změně k lepšímu.',
    value2Title: 'Bez keců',
    value2Desc: 'Udělám vše pro to, aby vaše zkušenost byla bezproblémová.',
    value3Title: 'Pořád se zlepšuji',
    value3Desc: 'Každý den chci být o kus lepší. Pro vás.',
    value4Title: 'Vaše svoboda',
    value4Desc: 'Self-service znamená, že si to řídíte vy. Přijďte, kdy chcete, žádné fronty.',
    thankYou: '💙 Děkuju za důvěru',
  },
  en: {
    title: 'About Me',
    subtitle: 'Why I started this luggage storage',
    ownerName: 'Albert Krajčovič',
    ownerTitle: 'Founder',
    story1: 'Hey! I\'ve worked in services my whole life and trust me – I\'ve seen how badly things can go. Long queues, unfriendly staff, zero flexibility. And luggage storage? That was often the worst.',
    story2: 'So I thought – there has to be a better way! I opened a modern storage at Brno Main Station where YOU are in control. No waiting at counters, no stress. Just grab a locker, store your stuff, and go.',
    story3: 'And here\'s the most important part: I WANT to hear what you think. Don\'t like the locker color? Text me. Our emails too formal? We\'ll change it. I will do my best to make your experience seamless and hassle-free.',
    story4: 'I want your trip to Brno to be comfortable and worry-free. Looking forward to helping you with that!',
    story5: 'Thanks for being here, and I look forward to seeing you!',
    signature: '– Albert',
    values: 'What matters to me',
    value1Title: 'Your voice matters',
    value1Desc: 'I really listen. Every idea or complaint leads to real change.',
    value2Title: 'No BS',
    value2Desc: 'I will do everything to make your experience seamless.',
    value3Title: 'Always improving',
    value3Desc: 'Every day I want to be a bit better. For you.',
    value4Title: 'Your freedom',
    value4Desc: 'Self-service means you\'re in control. Come when you want, no queues.',
    thankYou: '💙 Thanks for trusting me',
  },
  de: {
    title: 'Über mich',
    subtitle: 'Warum ich diese Gepäckaufbewahrung gegründet habe',
    ownerName: 'Albert Krajčovič',
    ownerTitle: 'Gründer',
    story1: 'Hallo! Ich habe mein ganzes Leben im Dienstleistungsbereich gearbeitet und glauben Sie mir – ich habe gesehen, wie schlecht Dinge laufen können. Lange Warteschlangen, unfreundliches Personal, null Flexibilität. Und Gepäckaufbewahrung? Da war es oft am schlimmsten.',
    story2: 'Also dachte ich – das muss besser gehen! Ich habe eine moderne Aufbewahrung am Brünner Hauptbahnhof eröffnet, wo SIE die Kontrolle haben. Kein Warten am Schalter, kein Stress. Einfach Schließfach nehmen, Sachen einlagern und los.',
    story3: 'Und hier ist das Wichtigste: Ich WILL hören, was Sie denken. Gefällt Ihnen die Farbe nicht? Schreiben Sie mir. Unsere E-Mails zu formell? Ändern wir. Ich werde mein Bestes tun, um Ihre Erfahrung reibungslos und problemlos zu gestalten.',
    story4: 'Ich möchte, dass Ihre Reise nach Brünn komfortabel und sorgenfrei ist. Ich freue mich darauf, Ihnen dabei zu helfen!',
    story5: 'Danke, dass Sie hier sind, und ich freue mich auf Sie!',
    signature: '– Albert',
    values: 'Was mir wichtig ist',
    value1Title: 'Ihre Stimme zählt',
    value1Desc: 'Ich höre wirklich zu. Jede Idee oder Beschwerde führt zu echter Veränderung.',
    value2Title: 'Kein Blabla',
    value2Desc: 'Ich werde alles tun, damit Ihre Erfahrung reibungslos ist.',
    value3Title: 'Immer besser',
    value3Desc: 'Jeden Tag möchte ich etwas besser sein. Für Sie.',
    value4Title: 'Ihre Freiheit',
    value4Desc: 'Selbstbedienung bedeutet, Sie haben die Kontrolle. Kommen Sie, wann Sie wollen.',
    thankYou: '💙 Danke für Ihr Vertrauen',
  },
  pl: {
    title: 'O mnie',
    subtitle: 'Dlaczego założyłem tę przechowalnie',
    ownerName: 'Albert Krajčovič',
    ownerTitle: 'Założyciel',
    story1: 'Cześć! Całe życie pracowałem w usługach i uwierz mi – widziałem, jak źle mogą potoczyć się sprawy. Długie kolejki, nieprzyjazny personel, zero elastyczności. A przechowanie bagażu? Tam było często najgorzej.',
    story2: 'Więc pomyślałem – musi być lepszy sposób! Otworzyłem nowoczesną przechowalnie na Dworcu Głównym w Brnie, gdzie TY masz kontrolę. Żadnego czekania przy ladzie, żadnego stresu. Po prostu weź szafkę, zostaw rzeczy i idź.',
    story3: 'A tu jest najważniejsza część: CHCĘ usłyszeć, co myślisz. Nie podoba Ci się kolor szafek? Napisz do mnie. Nasze maile zbyt formalne? Zmienimy to. Zrobię wszystko, aby Twoje doświadczenie było bezproblemowe i przyjemne.',
    story4: 'Chcę, żeby Twoja podróż do Brna była wygodna i bezstresowa. Nie mogę się doczekać, żeby Ci w tym pomóc!',
    story5: 'Dzięki, że tu jesteś, i do zobaczenia!',
    signature: '– Albert',
    values: 'Co jest dla mnie ważne',
    value1Title: 'Twój głos ma znaczenie',
    value1Desc: 'Naprawdę słucham. Każdy pomysł czy skarga prowadzi do prawdziwej zmiany.',
    value2Title: 'Bez bzdur',
    value2Desc: 'Zrobię wszystko, aby Twoje doświadczenie było bezproblemowe.',
    value3Title: 'Ciągłe doskonalenie',
    value3Desc: 'Każdego dnia chcę być trochę lepszy. Dla Ciebie.',
    value4Title: 'Twoja wolność',
    value4Desc: 'Samoobsługa oznacza, że Ty kontrolujesz. Przyjdź, kiedy chcesz.',
    thankYou: '💙 Dzięki za zaufanie',
  },
  uk: {
    title: 'Про мене',
    subtitle: 'Чому я створив цю камеру схову',
    ownerName: 'Альберт Крайчович',
    ownerTitle: 'Засновник',
    story1: 'Привіт! Я все життя працював у сфері послуг і повірте мені – я бачив, наскільки погано все може бути. Довгі черги, недружній персонал, нуль гнучкості. А камери схову? Там часто було найгірше.',
    story2: 'Тож я подумав – має бути кращий спосіб! Я відкрив сучасне сховище на головному вокзалі Брно, де ВИ маєте контроль. Ніякого очікування біля стійки, ніякого стресу. Просто візьми шафку, залиш речі і йди.',
    story3: 'І ось найважливіше: я ХОЧУ почути, що ви думаєте. Не подобається колір шафок? Напишіть мені. Наші листи занадто офіційні? Змінимо. Я зроблю все можливе, щоб ваш досвід був бездоганним і зручним.',
    story4: 'Я хочу, щоб ваша подорож до Брно була комфортною та безтурботною. Чекаю на можливість вам допомогти!',
    story5: 'Дякую, що ви тут, і чекаю на вас!',
    signature: '– Альберт',
    values: 'Що для мене важливо',
    value1Title: 'Ваша думка важлива',
    value1Desc: 'Я справді слухаю. Кожна ідея чи скарга призводить до реальних змін.',
    value2Title: 'Без балачок',
    value2Desc: 'Я зроблю все, щоб ваш досвід був бездоганним.',
    value3Title: 'Завжди краще',
    value3Desc: 'Кожен день я хочу бути трохи кращим. Для вас.',
    value4Title: 'Ваша свобода',
    value4Desc: 'Самообслуговування означає, що ви контролюєте. Приходьте, коли хочете.',
    thankYou: '💙 Дякую за довіру',
  },
  fr: {
    title: 'À propos de moi',
    subtitle: 'Pourquoi j\'ai créé cette consigne',
    ownerName: 'Albert Krajčovič',
    ownerTitle: 'Fondateur',
    story1: 'Salut ! J\'ai travaillé dans les services toute ma vie et croyez-moi – j\'ai vu à quel point les choses peuvent mal tourner. Longues files d\'attente, personnel peu aimable, zéro flexibilité. Et les consignes à bagages ? C\'était souvent le pire.',
    story2: 'Alors j\'ai pensé – il doit y avoir une meilleure façon ! J\'ai ouvert une consigne moderne à la gare principale de Brno où VOUS avez le contrôle. Pas d\'attente au comptoir, pas de stress. Prenez juste un casier, rangez vos affaires et partez.',
    story3: 'Et voici la partie la plus importante : je VEUX entendre ce que vous pensez. Vous n\'aimez pas la couleur ? Écrivez-moi. Nos e-mails trop formels ? On change. Je ferai de mon mieux pour rendre votre expérience fluide et sans tracas.',
    story4: 'Je veux que votre voyage à Brno soit confortable et sans souci. Hâte de vous aider avec ça !',
    story5: 'Merci d\'être là, et au plaisir de vous voir !',
    signature: '– Albert',
    values: 'Ce qui compte pour moi',
    value1Title: 'Votre avis compte',
    value1Desc: 'J\'écoute vraiment. Chaque idée ou plainte mène à un vrai changement.',
    value2Title: 'Sans blabla',
    value2Desc: 'Je ferai tout pour rendre votre expérience fluide.',
    value3Title: 'Toujours mieux',
    value3Desc: 'Chaque jour je veux être un peu meilleur. Pour vous.',
    value4Title: 'Votre liberté',
    value4Desc: 'Libre-service signifie que vous contrôlez. Venez quand vous voulez.',
    thankYou: '💙 Merci de me faire confiance',
  },
  es: {
    title: 'Sobre mí',
    subtitle: 'Por qué empecé esta consigna',
    ownerName: 'Albert Krajčovič',
    ownerTitle: 'Fundador',
    story1: '¡Hola! He trabajado en servicios toda mi vida y créeme – he visto lo mal que pueden ir las cosas. Largas colas, personal poco amable, cero flexibilidad. ¿Y consignas de equipaje? Ahí era a menudo lo peor.',
    story2: 'Así que pensé – ¡tiene que haber una manera mejor! Abrí una consigna moderna en la estación principal de Brno donde TÚ tienes el control. Sin esperar en mostrador, sin estrés. Solo toma un casillero, guarda tus cosas y vete.',
    story3: 'Y aquí está la parte más importante: QUIERO escuchar lo que piensas. ¿No te gusta el color? Escríbeme. ¿Nuestros correos demasiado formales? Lo cambiamos. Haré todo lo posible para que tu experiencia sea fluida y sin complicaciones.',
    story4: '¡Quiero que tu viaje a Brno sea cómodo y sin preocupaciones. Espero poder ayudarte con eso!',
    story5: '¡Gracias por estar aquí, y espero verte!',
    signature: '– Albert',
    values: 'Lo que me importa',
    value1Title: 'Tu voz importa',
    value1Desc: 'Realmente escucho. Cada idea o queja lleva a un cambio real.',
    value2Title: 'Sin rollos',
    value2Desc: 'Haré todo lo posible para que tu experiencia sea fluida.',
    value3Title: 'Siempre mejorando',
    value3Desc: 'Cada día quiero ser un poco mejor. Para ti.',
    value4Title: 'Tu libertad',
    value4Desc: 'Autoservicio significa que tú controlas. Ven cuando quieras.',
    thankYou: '💙 Gracias por confiar en mí',
  },
  it: {
    title: 'Su di me',
    subtitle: 'Perché ho iniziato questo deposito bagagli',
    ownerName: 'Albert Krajčovič',
    ownerTitle: 'Fondatore',
    story1: 'Ciao! Ho lavorato nei servizi tutta la vita e credimi – ho visto quanto male possano andare le cose. Lunghe code, personale poco amichevole, zero flessibilità. E i depositi bagagli? Lì era spesso il peggio.',
    story2: 'Quindi ho pensato – ci deve essere un modo migliore! Ho aperto un deposito moderno alla stazione principale di Brno dove TU hai il controllo. Niente attesa al bancone, niente stress. Prendi un armadietto, metti le tue cose e vai.',
    story3: 'Ed ecco la parte più importante: VOGLIO sentire cosa pensi. Non ti piace il colore? Scrivimi. Le nostre email troppo formali? Lo cambiamo. Farò del mio meglio per rendere la tua esperienza fluida e senza problemi.',
    story4: 'Voglio che il tuo viaggio a Brno sia comodo e senza preoccupazioni. Non vedo l\'ora di aiutarti!',
    story5: 'Grazie per essere qui, e non vedo l\'ora di vederti!',
    signature: '– Albert',
    values: 'Cosa conta per me',
    value1Title: 'La tua voce conta',
    value1Desc: 'Ascolto davvero. Ogni idea o lamentela porta a un vero cambiamento.',
    value2Title: 'Senza chiacchiere',
    value2Desc: 'Farò tutto il possibile per rendere la tua esperienza fluida.',
    value3Title: 'Sempre migliore',
    value3Desc: 'Ogni giorno voglio essere un po\' migliore. Per te.',
    value4Title: 'La tua libertà',
    value4Desc: 'Self-service significa che tu controlli. Vieni quando vuoi.',
    thankYou: '💙 Grazie per la fiducia',
  },
};

export function AboutUs({ language }: AboutUsProps) {
  const t = translations[language];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image & Info */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-96 overflow-hidden">
                <img
                  src={albertImage}
                  alt="Albert Krajčovič"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white">{t.ownerName}</h3>
                  <p className="text-blue-200 font-medium">{t.ownerTitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t.story1}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t.story2}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t.story3}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t.story4}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t.story5}
              </p>
              <p className="text-2xl font-bold text-blue-600 italic">
                {t.signature}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}