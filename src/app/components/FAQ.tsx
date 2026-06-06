import { useState } from 'react';
import { ChevronDown, ShieldCheck, Clock, Lock, Package, CreditCard, HelpCircle } from 'lucide-react';
interface FAQProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}
const translations = {
  cs: {
    title: 'Často kladené otázky',
    subtitle: 'Vše, co potřebujete vědět o našem úložišti zavazadel',
    faqs: [
      {
        icon: 'lock',
        question: 'Jak funguje přístup ke skříňce?',
        answer: 'Po dokončení rezervace a platby obdržíte e-mail s čísllem skříňky a PIN kódem. Jednoduše přijďte ve vámi zvoleném čase, najděte svou skříňku a pomocí PIN kódu ji otevřete. Žádné klíče, žádné čekání na personál - vše je plně automatizované a dostupné pouze vám.'
      },
      {
        icon: 'package',
        question: 'Jakou velikost skříňky potřebuji?',
        answer: 'MALÁ (30×42×50 cm) - ideální pro dokumenty, klíče od auta a předměty o maximální výšce 20 cm. STŘEDNÍ (50×60×60 cm) - vejde se kabinový kufr nebo větší batoh. VELKÁ (50×60×85 cm) - pro velké kufry nebo více kusů zavazadel. Pokud si nejste jisti, doporučujeme vybrat o stupeň větší velikost.'
      },
      {
        icon: 'shield',
        question: 'Co je Latesurance (Pozdní & Brzy pojištění)?',
        answer: 'Za pouhých 49 Kč získáte ochranu proti poplatkům za pozdní vyzvednutí PLUS možnost uložit zavazadla až 90 minut před začátkem rezervace (pokud je kapacita). Ideální, pokud váš vlak přijíždí brzy nebo odjíždí pozdě. Platí pouze během provozní doby 7:30-18:00.'
      },
      {
        icon: 'clock',
        question: 'Co když potřebuji skříňku mimo provozní dobu?',
        answer: 'Naše provozní doba je 7:30-18:00 denně. Latesurance vám umožňuje uložit zavazadla až 90 minut PŘED začátkem rezervace a vyzvednut je BEZ POPLATKŮ za pozdní vracení (v rámci provozní doby). Bohužel nelze přistupovat ke skříňkám mimo 7:30-18:00.'
      },
      {
        icon: 'credit',
        question: 'Jaké platební metody přijímáte?',
        answer: 'Akceptujeme všechny hlavní kreditní a debetní karty (Visa, Mastercard, American Express) prostřednictvím našeho zabezpečeného platebního systému Stripe. Platba probíhá online při rezervaci. Můžete také zaplatit přímo na místě.'
      },
      {
        icon: 'help',
        question: 'Co když mám problém nebo potřebuji prodloužit dobu úschovy?',
        answer: 'Během provozní doby (7:30-18:00) nás můžete kdykoliv kontaktovat na +420 608 313 122. Můžeme vám pomoci s prodloužením rezervace, technickými problémy nebo jakýmikoliv dotazy. Jsme zde, abychom vám pomohli!'
      },
      {
        icon: 'lock',
        question: 'Je moje zavazadlo v bezpečí?',
        answer: 'Ano! Každá skříňka má jedinečný PIN kód, který znáte pouze vy. Skříňky jsou umístěny v monitorované čekárně na nádraží. Náš systém je plně automatizovaný a bezpečný. Po uložení zavazadel nikdo jiný nemůže otevřít vaši skříňku bez vašeho PIN kódu.'
      },
      {
        icon: 'help',
        question: 'Mohu změnit nebo zrušit rezervaci?',
        answer: 'Pro změnu nebo zrušení rezervace nás prosím kontaktujte na +420 608 313 122 nebo e-mailem na brnoluggage@gmail.com. Provedeme vše pro to, abychom vám pomohli upravit vaši rezervaci podle vašich potřeb.'
      }
    ]
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about our luggage storage',
    faqs: [
      {
        icon: 'lock',
        question: 'How does locker access work?',
        answer: 'After completing your reservation and payment, you\'ll receive an email with your locker number and PIN code. Simply arrive at your chosen time, find your locker, and use the PIN code to open it. No keys, no waiting for staff - everything is fully automated and accessible only to you.'
      },
      {
        icon: 'package',
        question: 'What size locker do I need?',
        answer: 'SMALL (30×42×50 cm) - ideal for documents, car keys, and items up to 20 cm in height. MEDIUM (50×60×60 cm) - fits a cabin suitcase or larger backpack. LARGE (50×60×85 cm) - for large suitcases or multiple pieces of luggage. If unsure, we recommend choosing one size larger.'
      },
      {
        icon: 'shield',
        question: 'What is Late&Early Insurance?',
        answer: 'For just 49 CZK, you get protection against late pick-up fees PLUS the ability to store luggage up to 90 minutes before your booking starts (if capacity available). Perfect if your train arrives early or departs late. Valid only during operating hours 7:30-18:00.'
      },
      {
        icon: 'clock',
        question: 'What if I need a locker outside operating hours?',
        answer: 'Our operating hours are 7:30-18:00 daily. Late&Early Insurance allows you to store luggage up to 90 minutes BEFORE your booking starts and pick up WITHOUT LATE FEES (within operating hours). Unfortunately, lockers cannot be accessed outside 7:30-18:00.'
      },
      {
        icon: 'credit',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe payment system. Payment is made online when booking. You can also pay on-site directly.'
      },
      {
        icon: 'help',
        question: 'What if I have a problem or need to extend my storage?',
        answer: 'During operating hours (7:30-18:00), you can contact us anytime at +420 608 313 122. We can help with extending reservations, technical issues, or any questions. We\'re here to help!'
      },
      {
        icon: 'lock',
        question: 'Is my luggage safe?',
        answer: 'Yes! Each locker has a unique PIN code known only to you. Lockers are located in a monitored waiting room at the train station. Our system is fully automated and secure. Once you store your luggage, no one else can open your locker without your PIN code.'
      },
      {
        icon: 'help',
        question: 'Can I modify or cancel my reservation?',
        answer: 'To change or cancel your reservation, please contact us at +420 608 313 122 or email brnoluggage@gmail.com. We\'ll do our best to help you adjust your booking to meet your needs.'
      }
    ]
  },
  de: {
    title: 'Häufig gestellte Fragen',
    subtitle: 'Alles, was Sie über unsere Gepäckaufbewahrung wissen müssen',
    faqs: [
      {
        icon: 'lock',
        question: 'Wie funktioniert der Zugang zum Schließfach?',
        answer: 'Nach Abschluss Ihrer Reservierung und Zahlung erhalten Sie eine E-Mail mit Ihrer Schließfachnummer und PIN-Code. Kommen Sie einfach zu Ihrer gewählten Zeit, finden Sie Ihr Schließfach und öffnen Sie es mit dem PIN-Code. Keine Schlüssel, kein Warten auf Personal - alles ist vollautomatisch und nur für Sie zugänglich.'
      },
      {
        icon: 'package',
        question: 'Welche Schließfachgröße brauche ich?',
        answer: 'KLEIN (30×42×50 cm) - ideal für Dokumente, Autoschlüssel und Gegenstände bis zu einer Höhe von 20 cm. MITTEL (50×60×60 cm) - passt ein Kabinenkoffer oder größerer Rucksack. GROSS (50×60×85 cm) - für große Koffer oder mehrere Gepäckstücke. Bei Unsicherheit empfehlen wir, eine Größe größer zu wählen.'
      },
      {
        icon: 'shield',
        question: 'Was ist die Spät&Früh-Versicherung?',
        answer: 'Für nur 49 CZK erhalten Sie Schutz vor Gebühren bei verspäteter Abholung PLUS die Möglichkeit, Gepäck bis zu 90 Minuten vor Buchungsbeginn aufzubewahren (wenn Kapazität verfügbar). Perfekt, wenn Ihr Zug früh ankommt oder spät abfährt. Gültig nur während der Öffnungszeiten 7:30-18:00.'
      },
      {
        icon: 'clock',
        question: 'Was wenn ich ein Schließfach außerhalb der Öffnungszeiten brauche?',
        answer: 'Unsere Öffnungszeiten sind täglich 7:30-18:00. Die Spät&Früh-Versicherung ermöglicht es Ihnen, Gepäck bis zu 90 Minuten VOR Buchungsbeginn aufzubewahren und OHNE VERSPÄTUNGSGEBÜHREN abzuholen (innerhalb der Öffnungszeiten). Leider können Schließfächer außerhalb von 7:30-18:00 nicht benutzt werden.'
      },
      {
        icon: 'credit',
        question: 'Welche Zahlungsmethoden akzeptieren Sie?',
        answer: 'Wir akzeptieren alle gängigen Kredit- und Debitkarten (Visa, Mastercard, American Express) über unser sicheres Stripe-Zahlungssystem. Die Zahlung erfolgt online bei der Buchung. Sie können auch vor Ort direkt bezahlen.'
      },
      {
        icon: 'help',
        question: 'Was wenn ich ein Problem habe oder meine Aufbewahrung verlängern muss?',
        answer: 'Während der Öffnungszeiten (7:30-18:00) können Sie uns jederzeit unter +420 608 313 122 kontaktieren. Wir helfen bei der Verlängerung von Reservierungen, technischen Problemen oder bei Fragen. Wir sind für Sie da!'
      },
      {
        icon: 'lock',
        question: 'Ist mein Gepäck sicher?',
        answer: 'Ja! Jedes Schließfach hat einen eindeutigen PIN-Code, den nur Sie kennen. Die Schließfächer befinden sich in einem überwachten Warteraum am Bahnhof. Unser System ist vollautomatisch und sicher. Sobald Sie Ihr Gepäck aufbewahrt haben, kann niemand anderes Ihr Schließfach ohne Ihren PIN-Code öffnen.'
      },
      {
        icon: 'help',
        question: 'Kann ich meine Reservierung ändern oder stornieren?',
        answer: 'Um Ihre Reservierung zu ändern oder zu stornieren, kontaktieren Sie uns bitte unter +420 608 313 122 oder per E-Mail an brnoluggage@gmail.com. Wir tun unser Bestes, um Ihre Buchung an Ihre Bedürfnisse anzupassen.'
      }
    ]
  },
  pl: {
    title: 'Najczęściej zadawane pytania',
    subtitle: 'Wszystko, co musisz wiedzieć o naszym przechowalni bagażu',
    faqs: [
      {
        icon: 'lock',
        question: 'Jak działa dostęp do szafki?',
        answer: 'Po zakończeniu rezerwacji i płatności otrzymasz e-mail z numerem szafki i kodem PIN. Wystarczy przyjść o wybranej godzinie, znaleźć swoją szafkę i otworzyć ją kodem PIN. Bez kluczy, bez czekania na personel - wszystko jest w pełni zautomatyzowane i dostępne tylko dla Ciebie.'
      },
      {
        icon: 'package',
        question: 'Jakiej wielkości szafki potrzebuję?',
        answer: 'MAŁA (30×42×50 cm) - idealna na dokumenty, kluczyki do samochodu i przedmioty o maksymalnej wysokości 20 cm. ŚREDNIA (50×60×60 cm) - mieści walizkę kabinową lub większy plecak. DUŻA (50×60×85 cm) - na duże walizki lub kilka sztuk bagażu. W razie wątpliwości zalecamy wybrać o jeden rozmiar większy.'
      },
      {
        icon: 'shield',
        question: 'Co to jest ubezpieczenie Późno&Wcześnie?',
        answer: 'Za jedyne 49 CZK otrzymujesz ochronę przed opłatami za późny odbiór PLUS możliwość przechowania bagażu do 90 minut przed rozpoczęciem rezerwacji (jeśli dostępna pojemność). Idealne, jeśli pociąg przyjeżdża wcześnie lub odjeżdża późno. Ważne tylko w godzinach otwarcia 7:30-18:00.'
      },
      {
        icon: 'clock',
        question: 'Co jeśli potrzebuję szafki poza godzinami otwarcia?',
        answer: 'Nasze godziny otwarcia to 7:30-18:00 codziennie. Ubezpieczenie Późno&Wcześnie pozwala przechować bagaż do 90 minut PRZED rozpoczęciem rezerwacji i odebrać BEZ OPŁAT za spóźnienie (w godzinach otwarcia). Niestety, dostęp do szafek poza 7:30-18:00 nie jest możliwy.'
      },
      {
        icon: 'credit',
        question: 'Jakie metody płatności akceptujecie?',
        answer: 'Akceptujemy wszystkie główne karty kredytowe i debetowe (Visa, Mastercard, American Express) przez nasz bezpieczny system płatności Stripe. Płatność odbywa się online przy rezerwacji. Możesz też zapłacić bezpośrednio na miejscu.'
      },
      {
        icon: 'help',
        question: 'Co jeśli mam problem lub muszę przedłużyć przechowanie?',
        answer: 'W godzinach otwarcia (7:30-18:00) możesz skontaktować się z nami pod numerem +420 608 313 122. Pomożemy w przedłużeniu rezerwacji, problemach technicznych lub jakichkolwiek pytaniach. Jesteśmy tu, aby pomóc!'
      },
      {
        icon: 'lock',
        question: 'Czy mój bagaż jest bezpieczny?',
        answer: 'Tak! Każda szafka ma unikalny kod PIN znany tylko Tobie. Szafki znajdują się w monitorowanej poczekalni na stacji kolejowej. Nasz system jest w pełni zautomatyzowany i bezpieczny. Po złożeniu bagażu nikt inny nie może otworzyć Twojej szafki bez Twojego kodu PIN.'
      },
      {
        icon: 'help',
        question: 'Czy mogę zmienić lub anulować rezerwację?',
        answer: 'Aby zmienić lub anulować rezerwację, skontaktuj się z nami pod numerem +420 608 313 122 lub e-mail brnoluggage@gmail.com. Zrobimy wszystko, aby pomóc Ci dostosować rezerwację do Twoich potrzeb.'
      }
    ]
  },
  uk: {
    title: 'Часті запитання',
    subtitle: 'Все, що вам потрібно знати про наше сховище багажу',
    faqs: [
      {
        icon: 'lock',
        question: 'Як працює доступ до камери зберігання?',
        answer: 'Після завершення бронювання та оплати ви отримаєте електронний лист з номером камери та PIN-кодом. Просто прийдіть у вибраний час, знайдіть свою камеру та відкрийте її за допомогою PIN-коду. Без ключів, без очікування персоналу - все повністю автоматизовано і доступно тільки вам.'
      },
      {
        icon: 'package',
        question: 'Який розмір камери мені потрібен?',
        answer: 'МАЛЕНЬКА (30×42×50 см) - ідеальна для документів, ключів від автомобіля та предметів заввишки до 20 см. СЕРЕДНЯ (50×60×60 см) - підходить для каютної валізи або більшого рюкзака. ВЕЛИКА (50×60×85 см) - для великих валіз або декількох речей. Якщо сумніваєтеся, рекомендуємо вибрати на розмір більше.'
      },
      {
        icon: 'shield',
        question: 'Що таке страхування Пізно&Рано?',
        answer: 'Всього за 49 крон ви отримуєте захист від штрафів за пізнє отримання ПЛЮС можливість зберігати багаж до 90 хвилин до початку бронювання (якщо є місця). Ідеально, якщо ваш поїзд прибуває рано або відправляється пізно. Діє тільки в робочий час 7:30-18:00.'
      },
      {
        icon: 'clock',
        question: 'Що робити, якщо мені потрібна камера поза робочим часом?',
        answer: 'Наш робочий час 7:30-18:00 щодня. Страхування Пізно&Рано дозволяє зберігати багаж до 90 хвилин ДО початку бронювання та забрати БЕЗ ШТРАФІВ за запізнення (в робочий час). На жаль, доступ до камер поза 7:30-18:00 неможливий.'
      },
      {
        icon: 'credit',
        question: 'Які способи оплати ви приймаєте?',
        answer: 'Ми приймаємо всі основні кредитні та дебетові картки (Visa, Mastercard, American Express) через нашу захищену платіжну систему Stripe. Оплата здійснюється онлайн при бронюванні. Ви також можете оплатити безпосередньо на місці.'
      },
      {
        icon: 'help',
        question: 'Що робити, якщо у мене проблема або потрібно продовжити зберігання?',
        answer: 'В робочий час (7:30-18:00) ви можете зв\'язатися з нами за номером +420 608 313 122. Ми допоможемо з продовженням бронювання, технічними проблемами або будь-якими запитаннями. Ми тут, щоб допомогти!'
      },
      {
        icon: 'lock',
        question: 'Чи безпечний мій багаж?',
        answer: 'Так! Кожна камера має унікальний PIN-код, відомий тільки вам. Камери розташовані в залі очікування вокзалу під наглядом. Наша система повністю автоматизована та безпечна. Після зберігання багажу ніхто інший не може відкрити вашу камеру без вашого PIN-коду.'
      },
      {
        icon: 'help',
        question: 'Чи можу я змінити або скасувати бронювання?',
        answer: 'Щоб змінити або скасувати бронювання, зв\'яжіться з нами за номером +420 608 313 122 або електронною поштою brnoluggage@gmail.com. Ми зробимо все можливе, щоб допомогти вам налаштувати бронювання відповідно до ваших потреб.'
      }
    ]
  },
  fr: {
    title: 'Questions fréquemment posées',
    subtitle: 'Tout ce que vous devez savoir sur notre consigne à bagages',
    faqs: [
      {
        icon: 'lock',
        question: 'Comment fonctionne l\'accès au casier ?',
        answer: 'Après avoir terminé votre réservation et votre paiement, vous recevrez un e-mail avec votre numéro de casier et code PIN. Arrivez simplement à l\'heure choisie, trouvez votre casier et ouvrez-le avec le code PIN. Pas de clés, pas d\'attente du personnel - tout est entièrement automatisé et accessible uniquement à vous.'
      },
      {
        icon: 'package',
        question: 'Quelle taille de casier ai-je besoin ?',
        answer: 'PETIT (30×42×50 cm) - idéal pour les documents, les clés de voiture et les objets d\'une hauteur maximale de 20 cm. MOYEN (50×60×60 cm) - convient à une valise cabine ou un grand sac à dos. GRAND (50×60×85 cm) - pour de grandes valises ou plusieurs bagages. En cas de doute, nous recommandons de choisir une taille supérieure.'
      },
      {
        icon: 'shield',
        question: 'Qu\'est-ce que l\'assurance Tard&Tôt ?',
        answer: 'Pour seulement 49 CZK, vous obtenez une protection contre les frais de retard PLUS la possibilité de stocker vos bagages jusqu\'à 90 minutes avant le début de votre réservation (si capacité disponible). Parfait si votre train arrive tôt ou part tard. Valable uniquement pendant les heures d\'ouverture 7:30-18:00.'
      },
      {
        icon: 'clock',
        question: 'Et si j\'ai besoin d\'un casier en dehors des heures d\'ouverture ?',
        answer: 'Nos heures d\'ouverture sont 7:30-18:00 quotidiennement. L\'assurance Tard&Tôt vous permet de stocker vos bagages jusqu\'à 90 minutes AVANT le début de votre réservation et de récupérer SANS FRAIS DE RETARD (pendant les heures d\'ouverture). Malheureusement, l\'accès aux casiers en dehors de 7:30-18:00 n\'est pas possible.'
      },
      {
        icon: 'credit',
        question: 'Quels modes de paiement acceptez-vous ?',
        answer: 'Nous acceptons toutes les principales cartes de crédit et de débit (Visa, Mastercard, American Express) via notre système de paiement sécurisé Stripe. Le paiement se fait en ligne lors de la réservation. Vous pouvez également payer directement sur place.'
      },
      {
        icon: 'help',
        question: 'Et si j\'ai un problème ou besoin de prolonger mon stockage ?',
        answer: 'Pendant les heures d\'ouverture (7:30-18:00), vous pouvez nous contacter à tout moment au +420 608 313 122. Nous pouvons vous aider à prolonger les réservations, résoudre des problèmes techniques ou répondre à toute question. Nous sommes là pour vous aider !'
      },
      {
        icon: 'lock',
        question: 'Mes bagages sont-ils en sécurité ?',
        answer: 'Oui ! Chaque casier a un code PIN unique connu seulement de vous. Les casiers sont situés dans une salle d\'attente surveillée à la gare. Notre système est entièrement automatisé et sécurisé. Une fois vos bagages stockés, personne d\'autre ne peut ouvrir votre casier sans votre code PIN.'
      },
      {
        icon: 'help',
        question: 'Puis-je modifier ou annuler ma réservation ?',
        answer: 'Pour modifier ou annuler votre réservation, veuillez nous contacter au +420 608 313 122 ou par e-mail à brnoluggage@gmail.com. Nous ferons de notre mieux pour vous aider à ajuster votre réservation selon vos besoins.'
      }
    ]
  },
  es: {
    title: 'Preguntas frecuentes',
    subtitle: 'Todo lo que necesitas saber sobre nuestro almacenamiento de equipaje',
    faqs: [
      {
        icon: 'lock',
        question: '¿Cómo funciona el acceso al casillero?',
        answer: 'Después de completar tu reserva y pago, recibirás un correo electrónico con tu número de casillero y código PIN. Simplemente llega a tu hora elegida, encuentra tu casillero y ábrelo con el código PIN. Sin llaves, sin esperar al personal - todo está completamente automatizado y accesible solo para ti.'
      },
      {
        icon: 'package',
        question: '¿Qué tamaño de casillero necesito?',
        answer: 'PEQUEÑO (30×42×50 cm) - ideal para documentos, llaves del coche y objetos de hasta 20 cm de altura. MEDIANO (50×60×60 cm) - cabe una maleta de cabina o mochila grande. GRANDE (50×60×85 cm) - para maletas grandes o varias piezas de equipaje. En caso de duda, recomendamos elegir un tamaño más grande.'
      },
      {
        icon: 'shield',
        question: '¿Qué es el seguro Tarde&Temprano?',
        answer: 'Por solo 49 CZK, obtienes protección contra cargos por recogida tardía MÁS la capacidad de almacenar equipaje hasta 90 minutos antes del inicio de tu reserva (si hay capacidad). Perfecto si tu tren llega temprano o sale tarde. Válido solo durante el horario de operación 7:30-18:00.'
      },
      {
        icon: 'clock',
        question: '¿Qué pasa si necesito un casillero fuera del horario de operación?',
        answer: 'Nuestro horario de operación es 7:30-18:00 diariamente. El seguro Tarde&Temprano te permite almacenar equipaje hasta 90 minutos ANTES del inicio de tu reserva y recoger SIN CARGOS POR RETRASO (dentro del horario de operación). Desafortunadamente, no se puede acceder a los casilleros fuera de 7:30-18:00.'
      },
      {
        icon: 'credit',
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos todas las principales tarjetas de crédito y débito (Visa, Mastercard, American Express) a través de nuestro sistema de pago seguro Stripe. El pago se realiza en línea al reservar. También puedes pagar directamente en el lugar.'
      },
      {
        icon: 'help',
        question: '¿Qué pasa si tengo un problema o necesito extender mi almacenamiento?',
        answer: 'Durante el horario de operación (7:30-18:00), puedes contactarnos en cualquier momento al +420 608 313 122. Podemos ayudar con la extensión de reservas, problemas técnicos o cualquier pregunta. ¡Estamos aquí para ayudar!'
      },
      {
        icon: 'lock',
        question: '¿Está seguro mi equipaje?',
        answer: 'Sí! Cada casillero tiene un código PIN único conocido solo por ti. Los casilleros están ubicados en una sala de espera monitoreada en la estación de tren. Nuestro sistema está completamente automatizado y es seguro. Una vez que almacenes tu equipaje, nadie más puede abrir tu casillero sin tu código PIN.'
      },
      {
        icon: 'help',
        question: '¿Puedo modificar o cancelar mi reserva?',
        answer: 'Para cambiar o cancelar tu reserva, contáctanos al +420 608 313 122 o por correo electrónico a brnoluggage@gmail.com. Haremos todo lo posible para ayudarte a ajustar tu reserva según tus necesidades.'
      }
    ]
  },
  it: {
    title: 'Domande frequenti',
    subtitle: 'Tutto quello che devi sapere sul nostro deposito bagagli',
    faqs: [
      {
        icon: 'lock',
        question: 'Come funziona l\'accesso all\'armadietto?',
        answer: 'Dopo aver completato la prenotazione e il pagamento, riceverai un\'email con il numero dell\'armadietto e il codice PIN. Arriva semplicemente all\'ora scelta, trova il tuo armadietto e aprilo con il codice PIN. Nessuna chiave, nessuna attesa del personale - tutto è completamente automatizzato e accessibile solo a te.'
      },
      {
        icon: 'package',
        question: 'Quale dimensione di armadietto mi serve?',
        answer: 'PICCOLO (30×42×50 cm) - ideale per documenti, chiavi dell\'auto e oggetti con altezza massima di 20 cm. MEDIO (50×60×60 cm) - adatto per una valigia da cabina o zaino grande. GRANDE (50×60×85 cm) - per valigie grandi o più pezzi di bagaglio. In caso di dubbio, consigliamo di scegliere una taglia più grande.'
      },
      {
        icon: 'shield',
        question: 'Cos\'è l\'assicurazione Tardi&Presto?',
        answer: 'Per soli 49 CZK, ottieni protezione contro le tariffe di ritiro tardivo PIÙ la possibilità di conservare i bagagli fino a 90 minuti prima dell\'inizio della prenotazione (se c\'è capacità). Perfetto se il tuo treno arriva presto o parte tardi. Valido solo durante l\'orario di apertura 7:30-18:00.'
      },
      {
        icon: 'clock',
        question: 'E se ho bisogno di un armadietto fuori dall\'orario di apertura?',
        answer: 'Il nostro orario di apertura è 7:30-18:00 tutti i giorni. L\'assicurazione Tardi&Presto ti permette di conservare i bagagli fino a 90 minuti PRIMA dell\'inizio della prenotazione e ritirare SENZA TARIFFE DI RITARDO (entro l\'orario di apertura). Sfortunatamente, non è possibile accedere agli armadietti fuori 7:30-18:00.'
      },
      {
        icon: 'credit',
        question: 'Quali metodi di pagamento accettate?',
        answer: 'Accettiamo tutte le principali carte di credito e debito (Visa, Mastercard, American Express) tramite il nostro sistema di pagamento sicuro Stripe. Il pagamento viene effettuato online al momento della prenotazione. Puoi anche pagare direttamente sul posto.'
      },
      {
        icon: 'help',
        question: 'Cosa succede se ho un problema o devo prolungare il deposito?',
        answer: 'Durante l\'orario di apertura (7:30-18:00), puoi contattarci in qualsiasi momento al +420 608 313 122. Possiamo aiutare con il prolungamento delle prenotazioni, problemi tecnici o qualsiasi domanda. Siamo qui per aiutarti!'
      },
      {
        icon: 'lock',
        question: 'I miei bagagli sono al sicuro?',
        answer: 'Sì! Ogni armadietto ha un codice PIN unico conosciuto solo da te. Gli armadietti si trovano in una sala d\'attesa monitorata alla stazione ferroviaria. Il nostro sistema è completamente automatizzato e sicuro. Una volta che hai riposto i bagagli, nessun altro può aprire il tuo armadietto senza il tuo codice PIN.'
      },
      {
        icon: 'help',
        question: 'Posso modificare o cancellare la mia prenotazione?',
        answer: 'Per modificare o cancellare la tua prenotazione, contattaci al +420 608 313 122 o via email a brnoluggage@gmail.com. Faremo del nostro meglio per aiutarti ad adattare la tua prenotazione alle tue esigenze.'
      }
    ]
  }
};
const iconMap = {
  lock: Lock,
  package: Package,
  shield: ShieldCheck,
  clock: Clock,
  credit: CreditCard,
  help: HelpCircle
};
export function FAQ({ language }: FAQProps) {
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>
        <div className="space-y-4">
          {t.faqs.map((faq, index) => {
            const Icon = iconMap[faq.icon as keyof typeof iconMap];
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-gray-100"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pl-20">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-3">
            {language === 'cs' ? 'Máte další otázky?' :
             language === 'de' ? 'Haben Sie weitere Fragen?' :
             language === 'pl' ? 'Masz więcej pytań?' :
             language === 'uk' ? 'Маєте додаткові запитання?' :
             language === 'fr' ? 'Vous avez d\'autres questions ?' :
             language === 'es' ? '¿Tienes más preguntas?' :
             language === 'it' ? 'Hai altre domande?' :
             'Have more questions?'}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {language === 'cs' ? 'Rádi vám pomůžeme!' :
             language === 'de' ? 'Wir helfen Ihnen gerne!' :
             language === 'pl' ? 'Chętnie pomożemy!' :
             language === 'uk' ? 'Раді допомогти!' :
             language === 'fr' ? 'Nous sommes là pour vous aider !' :
             language === 'es' ? '¡Estamos aquí para ayudarte!' :
             language === 'it' ? 'Siamo qui per aiutarti!' :
             'We\'re here to help!'}
          </p>
          <a
            href="tel:+420608313122"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +420 608 313 122
          </a>
        </div>
      </div>
    </section>
  );
}