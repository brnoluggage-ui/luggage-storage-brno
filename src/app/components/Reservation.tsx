import { Calendar, Clock, AlertCircle, User, Mail, Phone, CreditCard, Loader2, ChevronRight, ChevronLeft, Check, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface ReservationProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
  availability: {
    small: number;
    medium: number;
    large: number;
  } | null;
}

const translations = {
  cs: {
    title: 'Rezervace',
    subtitle: 'Zarezervujte si skříňku v 3 jednoduchých krocích',
    step1: 'Krok 1: Vyberte skříňku',
    numberOfLockers: 'Počet skříněk',
    lockersHelp: 'Každá skříňka = 1 zámek a 1 PIN kód',
    step2: 'Krok 2: Datum a čas',
    step3: 'Krok 3: Kontaktní údaje',
    lockerSize: 'Velikost skříňky',
    lockerS: 'Malá (S)',
    lockerM: 'Střední (M)',
    lockerL: 'Velká (L)',
    lockerSDim: '30 × 20 × 50 cm',
    lockerMDim: '50 × 60 × 60 cm',
    lockerLDim: '50 × 60 × 85 cm',
    unavailable: 'Nedostupné',
    dropOff: 'Uložení zavazadel',
    pickUp: 'Vyzvednutí zavazadel',
    date: 'Datum',
    time: 'Čas',
    duration: 'Doba úschovy',
    days: 'dní',
    hours: 'hodin',
    totalPrice: 'Celková cena',
    hourlyRate: 'Hodinová sazba',
    dailyRate: 'Denní sazba',
    priceBreakdown: 'Rozpis ceny',
    operatingHours: 'Otevírací doba: 7:30 - 18:00',
    savingsAlert: '💡 Tip na úsporu!',
    savingsMessage: 'Ušetříte {amount} {currency}, pokud zvolíte {days} celých dní místo kombinace dnů a hodin.',
    applyBetterPrice: '✨ Použít levnější variantu',
    newPrice: 'Nová cena',
    currentTimeBrno: 'Aktuální čas (Brno)',
    afterHoursNotice: '⏰ Mimo otevírací dobu',
    afterHoursMessage: 'Aktuálně je mimo otevírací dobu (18:00-7:30). Můžete rezervovat pro zítřek nebo další dny.',
    customerInfo: 'Kontaktní údaje',
    fullName: 'Celé jméno',
    email: 'E-mail',
    phone: 'Telefon',
    proceedToPayment: '💳 Pokračovat k platbě',
    emailConfirmInfo: '📧 Potvrzení e-mailem',
    emailConfirmText: 'Potvrzení bude odesláno na váš e-mail.',
    accessCodesInfo: '🔑 Přístupové kódy jsou odeslány v samostatném e-mailu spolu s potvrzením platby.',
    emailRequired: 'Vyplňte všechny povinné údaje',
    processing: 'Zpracování...',
    bookingRestriction: 'Rezervace pro tento časový úsek nejsou možné',
    next: 'Další',
    back: 'Zpět',
    selectLocker: 'Vyberte velikost skříňky',
    selectDateTime: 'Vyberte datum a čas',
    reviewAndPay: 'Zkontrolujte a zaplaťte',
    bookingSummary: 'Souhrn rezervace',
    latesurance: 'Pojištění pozdě & brzy',
    latesurancePrice: '49 Kč',
    latesuranceTitle: '🛡️ Přidat pojištění pozdě & brzy',
    latesuranceDesc: '90 minut navíc před i po rezervaci - žádné poplatky za zpoždění',
    latesuranceBenefit1: '✅ Access 90 minutes before booking starts (during operating hours)',
    latesuranceBenefit2: '✅ No penalty for pickup up to 90 minutes late (during operating hours)',
    invalidDuration: '⚠️ Invalid pick-up time',
    invalidDurationMessage: 'Pick-up must be after drop-off.',
    promoCode: 'Promo Code',
    promoCodePlaceholder: 'Enter code (e.g. BAGS15)',
    applyPromo: 'Apply',
    promoValidating: 'Validating...',
    promoApplied: '✅ Discount applied',
    promoInvalid: '❌ Invalid code',
    originalPrice: 'Original Price',
    discount: 'Discount',
    youSave: 'You Save',
  },
  en: {
    title: 'Reservation',
    subtitle: 'Book your locker in 3 simple steps',
    step1: 'Step 1: Select Locker',
    numberOfLockers: 'Number of Lockers',
    lockersHelp: 'Each locker = 1 lock & 1 PIN code',
    step2: 'Step 2: Date & Time',
    step3: 'Step 3: Contact Info',
    lockerSize: 'Locker Size',
    lockerS: 'Small (S)',
    lockerM: 'Medium (M)',
    lockerL: 'Large (L)',
    lockerSDim: '12 × 8 × 20 in',
    lockerMDim: '20 × 24 × 24 in',
    lockerLDim: '20 × 24 × 33 in',
    unavailable: 'Unavailable',
    dropOff: 'Drop-off',
    pickUp: 'Pick-up',
    date: 'Date',
    time: 'Time',
    duration: 'Duration',
    days: 'days',
    hours: 'hours',
    totalPrice: 'Total Price',
    hourlyRate: 'Hourly Rate',
    dailyRate: 'Daily Rate',
    priceBreakdown: 'Price Breakdown',
    operatingHours: 'Operating Hours: 7:30 - 18:00',
    savingsAlert: '💡 Savings Tip!',
    savingsMessage: 'You will save {amount} {currency} by choosing {days} full days instead of a mix of days and hours.',
    applyBetterPrice: '✨ Apply Better Price',
    newPrice: 'New Price',
    currentTimeBrno: 'Current Time (Brno)',
    afterHoursNotice: '⏰ After Hours',
    afterHoursMessage: 'Currently outside operating hours (18:00-7:30). You can book for tomorrow or later days.',
    customerInfo: 'Contact Information',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    proceedToPayment: '💳 Proceed to Payment',
    emailConfirmInfo: '📧 Email Confirmation',
    emailConfirmText: 'Confirmation will be sent to your email.',
    accessCodesInfo: '🔑 Access codes are sent in a separate email with the payment confirmation.',
    emailRequired: 'Please fill in all required fields',
    processing: 'Processing...',
    bookingRestriction: 'Booking for this time slot is not available',
    next: 'Next',
    back: 'Back',
    selectLocker: 'Select locker size',
    selectDateTime: 'Select date and time',
    reviewAndPay: 'Review and pay',
    bookingSummary: 'Booking Summary',
    latesurance: 'Late&Early Insurance',
    latesurancePrice: '49 Kč',
    latesuranceTitle: '️ Add Late&Early Insurance',
    latesuranceDesc: '90 minutes extra before and after your booking - no late fees',
    latesuranceBenefit1: '✅ Access 90 minutes before booking starts (during operating hours)',
    latesuranceBenefit2: '✅ No penalty for pickup up to 90 minutes late (during operating hours)',
    invalidDuration: '⚠️ Invalid pick-up time',
    invalidDurationMessage: 'Pick-up must be after drop-off.',
    promoCode: 'Promo Code',
    promoCodePlaceholder: 'Enter code (e.g. BAGS15)',
    applyPromo: 'Apply',
    promoValidating: 'Validating...',
    promoApplied: '✅ Discount applied',
    promoInvalid: '❌ Invalid code',
    originalPrice: 'Original Price',
    discount: 'Discount',
    youSave: 'You Save',
  },
  de: {
    title: 'Reservierung',
    subtitle: 'Buchen Sie Ihr Schließfach in 3 einfachen Schritten',
    step1: 'Schritt 1: Schließfach wählen',
    numberOfLockers: 'Anzahl der Schließfächer',
    lockersHelp: 'Jedes Schließfach = 1 Schloss & 1 PIN-Code',
    step2: 'Schritt 2: Datum & Uhrzeit',
    step3: 'Schritt 3: Kontaktdaten',
    lockerSize: 'Schrankgröße',
    lockerS: 'Klein (S)',
    lockerM: 'Mittel (M)',
    lockerL: 'Groß (L)',
    lockerSDim: '30 × 20 × 50 cm',
    lockerMDim: '50 × 60 × 60 cm',
    lockerLDim: '50 × 60 × 85 cm',
    unavailable: 'Nicht verfügbar',
    dropOff: 'Abgabe',
    pickUp: 'Abholung',
    date: 'Datum',
    time: 'Zeit',
    duration: 'Dauer',
    days: 'Tage',
    hours: 'Stunden',
    totalPrice: 'Gesamtpreis',
    hourlyRate: 'Stundensatz',
    dailyRate: 'Tagessatz',
    priceBreakdown: 'Preisaufschlüsselung',
    operatingHours: 'Öffnungszeiten: 7:30 - 18:00',
    savingsAlert: '💡 Sparvorschlag!',
    savingsMessage: 'Sie sparen {amount} {currency}, wenn Sie {days} volle Tage wählen.',
    applyBetterPrice: '✨ Besseren Preis anwenden',
    newPrice: 'Neuer Preis',
    currentTimeBrno: 'Aktuelle Zeit (Brünn)',
    afterHoursNotice: '⏰ Außerhalb der Öffnungszeiten',
    afterHoursMessage: 'Derzeit außerhalb der Öffnungszeiten (18:00-7:30). Sie können für morgen buchen.',
    customerInfo: 'Kontaktinformationen',
    fullName: 'Vollständiger Name',
    email: 'E-Mail',
    phone: 'Telefon',
    proceedToPayment: '💳 Zur Zahlung',
    emailConfirmInfo: '📧 E-Mail-Bestätigung',
    emailConfirmText: 'Bestätigung wird an Ihre E-Mail gesendet.',
    accessCodesInfo: '🔑 Zugangscodes werden in einer separaten E-Mail mit der Zahlungsbestätigung gesendet.',
    emailRequired: 'Bitte alle Pflichtfelder ausfüllen',
    processing: 'Verarbeitung...',
    bookingRestriction: 'Buchung nicht verfügbar',
    next: 'Weiter',
    back: 'Zurück',
    selectLocker: 'Schließfach wählen',
    selectDateTime: 'Datum und Uhrzeit wählen',
    reviewAndPay: 'Überprüfen und bezahlen',
    bookingSummary: 'Buchungsübersicht',
    latesurance: 'Späte & Früh Versicherung',
    latesurancePrice: '49 Kč',
    latesuranceTitle: '🛡️ Späte & Früh Versicherung hinzufügen',
    latesuranceDesc: '90 Minuten extra vor und nach Ihrer Buchung - keine Verspätungsgebühren',
    latesuranceBenefit1: '✅ Zugang 90 Minuten vor Buchungsbeginn (während der Öffnungszeiten)',
    latesuranceBenefit2: '✅ Keine Strafe bei Abholung bis 90 Minuten verspätet (während der Öffnungszeiten)',
    invalidDuration: '⚠️ Ungültige Abholzeit',
    invalidDurationMessage: 'Abholung muss nach Abgabe sein.',
    promoCode: 'Aktionscode',
    promoCodePlaceholder: 'Code eingeben (z.B. BAGS15)',
    applyPromo: 'Anwenden',
    promoValidating: 'Wird geprüft...',
    promoApplied: '✅ Rabatt angewendet',
    promoInvalid: '❌ Ungültiger Code',
    originalPrice: 'Originalpreis',
    discount: 'Rabatt',
    youSave: 'Sie sparen',
  },
  pl: {
    title: 'Rezerwacja',
    subtitle: 'Zarezerwuj szafkę w 3 prostych krokach',
    step1: 'Krok 1: Wybierz szafkę',
    numberOfLockers: 'Liczba szafek',
    lockersHelp: 'Każda szafka = 1 zamek & 1 kod PIN',
    step2: 'Krok 2: Data i czas',
    step3: 'Krok 3: Dane kontaktowe',
    lockerSize: 'Rozmiar szafki',
    lockerS: 'Mała (S)',
    lockerM: 'Średnia (M)',
    lockerL: 'Duża (L)',
    lockerSDim: '30 × 20 × 50 cm',
    lockerMDim: '50 × 60 × 60 cm',
    lockerLDim: '50 × 60 × 85 cm',
    unavailable: 'Niedostępne',
    dropOff: 'Oddanie',
    pickUp: 'Odbiór',
    date: 'Data',
    time: 'Czas',
    duration: 'Czas trwania',
    days: 'dni',
    hours: 'godzin',
    totalPrice: 'Cena całkowita',
    hourlyRate: 'Stawka godzinowa',
    dailyRate: 'Stawka dzienna',
    priceBreakdown: 'Rozliczenie',
    operatingHours: 'Godziny pracy: 7:30 - 18:00',
    savingsAlert: '💡 Wskazówka!',
    savingsMessage: 'Zaoszczędzisz {amount} {currency} wybierając {days} pełnych dni.',
    applyBetterPrice: '✨ Zastosuj lepszą cenę',
    newPrice: 'Nowa cena',
    currentTimeBrno: 'Aktualny czas (Brno)',
    afterHoursNotice: '⏰ Poza godzinami pracy',
    afterHoursMessage: 'Poza godzinami pracy (18:00-7:30). Rezerwuj na jutro.',
    customerInfo: 'Dane kontaktowe',
    fullName: 'Imię i nazwisko',
    email: 'E-mail',
    phone: 'Telefon',
    proceedToPayment: '💳 Do płatności',
    emailConfirmInfo: '📧 Potwierdzenie',
    emailConfirmText: 'Potwierdzenie zostanie wysłane.',
    accessCodesInfo: '🔑 Kody dostępu są wysyłane w osobnej wiadomości e-mailowej razem z potwierdzeniem płatności.',
    emailRequired: 'Wypełnij wszystkie pola',
    processing: 'Przetwarzanie...',
    bookingRestriction: 'Rezerwacja niedostępna',
    next: 'Dalej',
    back: 'Wstecz',
    selectLocker: 'Wybierz szafkę',
    selectDateTime: 'Wybierz datę i czas',
    reviewAndPay: 'Sprawdź i zapłać',
    bookingSummary: 'Podsumowanie',
    latesurance: 'Ubezpieczenie Późno & Wcześnie',
    latesurancePrice: '49 Kč',
    latesuranceTitle: '🛡️ Dodaj ubezpieczenie Późno & Wcześnie',
    latesuranceDesc: '90 minut dodatkowego czasu przed i po rezerwacji - bez opłat za spóźnienie',
    latesuranceBenefit1: '✅ Dostęp 90 minut przed rozpoczęciem rezerwacji (w godzinach pracy)',
    latesuranceBenefit2: '✅ Brak opłaty za odbiór do 90 minut po terminie (w godzinach pracy)',
    invalidDuration: '⚠️ Nieprawidłowy czas odbioru',
    invalidDurationMessage: 'Odbiór musi być po oddaniu.',
    promoCode: 'Kod promocyjny',
    promoCodePlaceholder: 'Wpisz kod (np. BAGS15)',
    applyPromo: 'Zastosuj',
    promoValidating: 'Sprawdzanie...',
    promoApplied: '✅ Rabat zastosowany',
    promoInvalid: '❌ Nieprawidłowy kod',
    originalPrice: 'Cena oryginalna',
    discount: 'Rabat',
    youSave: 'Oszczędzasz',
  },
  uk: {
    title: 'Резервація',
    subtitle: 'Забронюйте камеру за 3 простих кроки',
    step1: 'Крок 1: Оберіть камеру',
    numberOfLockers: 'Кількість камер',
    lockersHelp: 'Кожна камера = 1 замок і 1 PIN-код',
    step2: 'Крок 2: Дата та час',
    step3: 'Крок 3: Контакти',
    lockerSize: 'Розмір',
    lockerS: 'Мала (S)',
    lockerM: 'Середня (M)',
    lockerL: 'Велика (L)',
    lockerSDim: '30 × 20 × 50 см',
    lockerMDim: '50 × 60 × 60 см',
    lockerLDim: '50 × 60 × 85 см',
    unavailable: 'Недоступно',
    dropOff: 'Здача',
    pickUp: 'Забір',
    date: 'Дата',
    time: 'Час',
    duration: 'Тривалість',
    days: 'днів',
    hours: 'годин',
    totalPrice: 'Загальна ціна',
    hourlyRate: 'Погодинна',
    dailyRate: 'Денна',
    priceBreakdown: 'Деталізація',
    operatingHours: 'Години роботи: 7:30 - 18:00',
    savingsAlert: '💡 Порада!',
    savingsMessage: 'Заощадите {amount} {currency} вибравши {days} днів.',
    applyBetterPrice: '✨ Застосувати',
    newPrice: 'Нова ціна',
    currentTimeBrno: 'Поточний час (Брно)',
    afterHoursNotice: '⏰ Поза роботою',
    afterHoursMessage: 'Поза роботою (18:00-7:30). Бронюйте на завтра.',
    customerInfo: 'Контакти',
    fullName: "Повне ім'я",
    email: 'Email',
    phone: 'Телефон',
    proceedToPayment: '💳 До оплати',
    emailConfirmInfo: '📧 Підтвердження',
    emailConfirmText: 'Підтвердження буде надіслано.',
    accessCodesInfo: '🔑 Коди доступу надсилаються окремю електронною поштою разом з підтвердженням оплати.',
    emailRequired: 'Заповніть всі поля',
    processing: 'Обробка...',
    bookingRestriction: 'Бронювання недоступне',
    next: 'Далі',
    back: 'Назад',
    selectLocker: 'Оберіть камеру',
    selectDateTime: 'Оберіть дату та час',
    reviewAndPay: 'Перевірте та оплатіть',
    bookingSummary: 'Підсумок',
    latesurance: 'Пізня & Рання страховка',
    latesurancePrice: '49 Kč',
    latesuranceTitle: '🛡️ Додати Пізню & Ранню страховку',
    latesuranceDesc: '90 хвилин додатково до та після бронювання - без штрафів за запізненя',
    latesuranceBenefit1: '✅ Доступ за 90 хвилин до початку бронювання (під час роботи)',
    latesuranceBenefit2: '✅ Без штрафу за забір до 90 хвилин з запізненням (під час роботи)',
    invalidDuration: '⚠️ Недійсний час забору',
    invalidDurationMessage: 'Забір має бути після здачі.',
    promoCode: 'Промокод',
    promoCodePlaceholder: 'Введіть код (напр. BAGS15)',
    applyPromo: 'Застосувати',
    promoValidating: 'Перевірка...',
    promoApplied: '✅ Знижку застосовано',
    promoInvalid: '❌ Невірний код',
    originalPrice: 'Початкова ціна',
    discount: 'Знижка',
    youSave: 'Ви економите',
  },
  fr: {
    title: 'Réservation',
    subtitle: 'Réservez votre casier en 3 étapes simples',
    step1: 'Étape 1: Choisir le casier',
    numberOfLockers: 'Nombre de casiers',
    lockersHelp: 'Chaque casier = 1 serrure & 1 code PIN',
    step2: 'Étape 2: Date et heure',
    step3: 'Étape 3: Coordonnées',
    lockerSize: 'Taille',
    lockerS: 'Petit (S)',
    lockerM: 'Moyen (M)',
    lockerL: 'Grand (L)',
    lockerSDim: '30 × 20 × 50 cm',
    lockerMDim: '50 × 60 × 60 cm',
    lockerLDim: '50 × 60 × 85 cm',
    unavailable: 'Indisponible',
    dropOff: 'Dépôt',
    pickUp: 'Retrait',
    date: 'Date',
    time: 'Heure',
    duration: 'Durée',
    days: 'jours',
    hours: 'heures',
    totalPrice: 'Prix total',
    hourlyRate: 'Tarif horaire',
    dailyRate: 'Tarif journalier',
    priceBreakdown: 'Détail',
    operatingHours: 'Heures: 7:30 - 18:00',
    savingsAlert: '💡 Conseil!',
    savingsMessage: 'Économisez {amount} {currency} en choisissant {days} jours.',
    applyBetterPrice: '✨ Appliquer',
    newPrice: 'Nouveau prix',
    currentTimeBrno: 'Heure actuelle (Brno)',
    afterHoursNotice: '⏰ Fermé',
    afterHoursMessage: 'Fermé (18:00-7:30). Réservez pour demain.',
    customerInfo: 'Coordonnées',
    fullName: 'Nom complet',
    email: 'E-mail',
    phone: 'Téléphone',
    proceedToPayment: '💳 Payer',
    emailConfirmInfo: '📧 Confirmation',
    emailConfirmText: 'Confirmation sera envoyée.',
    accessCodesInfo: '🔑 Les codes d\'accès sont envoyés par e-mail séparément avec la confirmation de paiement.',
    emailRequired: 'Remplissez tous les champs',
    processing: 'Traitement...',
    bookingRestriction: 'Réservation indisponible',
    next: 'Suivant',
    back: 'Retour',
    selectLocker: 'Choisir le casier',
    selectDateTime: 'Choisir date et heure',
    reviewAndPay: 'Vérifier et payer',
    bookingSummary: 'Résumé',
    latesurance: 'Assurance Retard & Avance',
    latesurancePrice: '49 Kč',
    latesuranceTitle: '🛡️ Ajouter une assurance Retard & Avance',
    latesuranceDesc: '90 minutes supplémentaires avant et après votre réservation - sans frais de retard',
    latesuranceBenefit1: '✅ Accès 90 minutes avant le début de la réservation (pendant les heures d\'ouverture)',
    latesuranceBenefit2: '✅ Pas de frais pour un retrait jusqu\'à 90 minutes de retard (pendant les heures d\'ouverture)',
    invalidDuration: '⚠️ Heure de retrait invalide',
    invalidDurationMessage: 'Le retrait doit être après le dépôt.',
    promoCode: 'Code promo',
    promoCodePlaceholder: 'Entrez le code (ex. BAGS15)',
    applyPromo: 'Appliquer',
    promoValidating: 'Vérification...',
    promoApplied: '✅ Réduction appliquée',
    promoInvalid: '❌ Code invalide',
    originalPrice: 'Prix original',
    discount: 'Réduction',
    youSave: 'Vous économisez',
  },
  es: {
    title: 'Reserva',
    subtitle: 'Reserve su casillero en 3 pasos simples',
    step1: 'Paso 1: Seleccionar casillero',
    numberOfLockers: 'Número de casilleros',
    lockersHelp: 'Cada casillero = 1 cerradura & 1 código PIN',
    step2: 'Paso 2: Fecha y hora',
    step3: 'Paso 3: Datos de contacto',
    lockerSize: 'Tamaño',
    lockerS: 'Pequeño (S)',
    lockerM: 'Mediano (M)',
    lockerL: 'Grande (L)',
    lockerSDim: '30 × 20 × 50 cm',
    lockerMDim: '50 × 60 × 60 cm',
    lockerLDim: '50 × 60 × 85 cm',
    unavailable: 'No disponible',
    dropOff: 'Entrega',
    pickUp: 'Recogida',
    date: 'Fecha',
    time: 'Hora',
    duration: 'Duración',
    days: 'días',
    hours: 'horas',
    totalPrice: 'Precio total',
    hourlyRate: 'Tarifa por hora',
    dailyRate: 'Tarifa diaria',
    priceBreakdown: 'Desglose',
    operatingHours: 'Horario: 7:30 - 18:00',
    savingsAlert: '💡 Consejo!',
    savingsMessage: 'Ahorrará {amount} {currency} eligiendo {days} días.',
    applyBetterPrice: '✨ Aplicar',
    newPrice: 'Nuevo precio',
    currentTimeBrno: 'Hora actual (Brno)',
    afterHoursNotice: '⏰ Cerrado',
    afterHoursMessage: 'Cerrado (18:00-7:30). Reserve para mañana.',
    customerInfo: 'Datos de contacto',
    fullName: 'Nombre completo',
    email: 'Correo',
    phone: 'Teléfono',
    proceedToPayment: '💳 Pagar',
    emailConfirmInfo: '📧 Confirmación',
    emailConfirmText: 'Se enviará confirmación.',
    accessCodesInfo: '🔑 Los códigos de acceso se envían en un correo electrónico separado con la confirmación de pago.',
    emailRequired: 'Complete todos los campos',
    processing: 'Procesando...',
    bookingRestriction: 'Reserva no disponible',
    next: 'Siguiente',
    back: 'Atrás',
    selectLocker: 'Seleccionar casillero',
    selectDateTime: 'Seleccionar fecha y hora',
    reviewAndPay: 'Revisar y pagar',
    bookingSummary: 'Resumen',
    latesurance: 'Seguro Retraso & Anticipo',
    latesurancePrice: '49 Kč',
    latesuranceTitle: '🛡️ Agregar seguro Retraso & Anticipo',
    latesuranceDesc: '90 minutos extra antes y después de su reserva - sin cargos por retraso',
    latesuranceBenefit1: '✅ Acceso 90 minutos antes del inicio de la reserva (durante el horario de apertura)',
    latesuranceBenefit2: '✅ Sin cargo por recogida hasta 90 minutos tarde (durante el horario de apertura)',
    invalidDuration: '⚠️ Hora de recogida inválida',
    invalidDurationMessage: 'La recogida debe ser después de la entrega.',
    promoCode: 'Código promocional',
    promoCodePlaceholder: 'Ingrese código (ej. BAGS15)',
    applyPromo: 'Aplicar',
    promoValidating: 'Validando...',
    promoApplied: '✅ Descuento aplicado',
    promoInvalid: '❌ Código inválido',
    originalPrice: 'Precio original',
    discount: 'Descuento',
    youSave: 'Usted ahorra',
  },
  it: {
    title: 'Prenotazione',
    subtitle: 'Prenota il tuo armadietto in 3 semplici passaggi',
    step1: 'Passo 1: Scegli armadietto',
    numberOfLockers: 'Numero di armadietti',
    lockersHelp: 'Ogni armadietto = 1 lucchetto & 1 codice PIN',
    step2: 'Passo 2: Data e ora',
    step3: 'Passo 3: Contatti',
    lockerSize: 'Dimensione',
    lockerS: 'Piccolo (S)',
    lockerM: 'Medio (M)',
    lockerL: 'Grande (L)',
    lockerSDim: '30 × 20 × 50 cm',
    lockerMDim: '50 × 60 × 60 cm',
    lockerLDim: '50 × 60 × 85 cm',
    unavailable: 'Non disponibile',
    dropOff: 'Consegna',
    pickUp: 'Ritiro',
    date: 'Data',
    time: 'Ora',
    duration: 'Durata',
    days: 'giorni',
    hours: 'ore',
    totalPrice: 'Prezzo totale',
    hourlyRate: 'Tariffa oraria',
    dailyRate: 'Tariffa giornaliera',
    priceBreakdown: 'Dettaglio',
    operatingHours: 'Orari: 7:30 - 18:00',
    savingsAlert: '💡 Suggerimento!',
    savingsMessage: 'Risparmierai {amount} {currency} scegliendo {days} giorni.',
    applyBetterPrice: '✨ Applica',
    newPrice: 'Nuovo prezzo',
    currentTimeBrno: 'Ora attuale (Brno)',
    afterHoursNotice: '⏰ Chiuso',
    afterHoursMessage: 'Chiuso (18:00-7:30). Prenota per domani.',
    customerInfo: 'Contatti',
    fullName: 'Nome completo',
    email: 'E-mail',
    phone: 'Telefono',
    proceedToPayment: '💳 Paga',
    emailConfirmInfo: '📧 Conferma',
    emailConfirmText: 'Conferma verrà inviata.',
    accessCodesInfo: '🔑 I codici di accesso vengono inviati in una email separata con la conferma del pagamento.',
    emailRequired: 'Compila tutti i campi',
    processing: 'Elaborazione...',
    bookingRestriction: 'Prenotazione non disponibile',
    next: 'Avanti',
    back: 'Indietro',
    selectLocker: 'Scegli armadietto',
    selectDateTime: 'Scegli data e ora',
    reviewAndPay: 'Controlla e paga',
    bookingSummary: 'Riepilogo',
    latesurance: 'Assicurazione Ritardo & Anticipo',
    latesurancePrice: '49 Kč',
    latesuranceTitle: '🛡️ Aggiungi assicurazione Ritardo & Anticipo',
    latesuranceDesc: '90 minuti extra prima e dopo la prenotazione - senza costi per il ritardo',
    latesuranceBenefit1: '✅ Accesso 90 minuti prima dell\'inizio della prenotazione (durante l\'orario di apertura)',
    latesuranceBenefit2: '✅ Nessun costo per il ritiro fino a 90 minuti in ritardo (durante l\'orario di apertura)',
    invalidDuration: '⚠️ Orario di ritiro non valido',
    invalidDurationMessage: 'Il ritiro deve essere dopo la consegna.',
    promoCode: 'Codice promozionale',
    promoCodePlaceholder: 'Inserisci codice (es. BAGS15)',
    applyPromo: 'Applica',
    promoValidating: 'Verifica...',
    promoApplied: '✅ Sconto applicato',
    promoInvalid: '❌ Codice non valido',
    originalPrice: 'Prezzo originale',
    discount: 'Sconto',
    youSave: 'Risparmi',
  },
};

const PRICING = {
  S: { hourly: 29, daily: 119, hourlyEur: 1.2, dailyEur: 4.8 },
  M: { hourly: 38, daily: 189, hourlyEur: 1.5, dailyEur: 7.6 },
  L: { hourly: 44, daily: 219, hourlyEur: 1.8, dailyEur: 8.8 },
};

export function Reservation({ language, availability }: ReservationProps) {
  const t = translations[language];
  const [currentStep, setCurrentStep] = useState(1);
  const [currency, setCurrency] = useState<'CZK' | 'EUR'>('CZK');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    lockerSize: 'M' as 'S' | 'M' | 'L',
    lockerCount: 1,
    dropOffDate: '',
    dropOffTime: '09:00',
    pickUpDate: '',
    pickUpTime: '17:00',
  });

  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phonePrefix: '+420',
    phone: '',
  });

  const [latesurance, setLatesurance] = useState(false);

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoValidating, setPromoValidating] = useState(false);
  const [promoValid, setPromoValid] = useState(false);

  // Pick-up calendar month state
  const [pickUpMonth, setPickUpMonth] = useState<Date | undefined>(undefined);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to current step heading when step changes
  useEffect(() => {
    const stepElement = document.getElementById(`step-${currentStep}-heading`);
    if (stepElement) {
      stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  const getBrnoTime = (date: Date = new Date()) => {
    return new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Prague' }));
  };

  const isWithinOperatingHours = () => {
    const brnoTime = getBrnoTime(currentTime);
    const hours = brnoTime.getHours();
    const minutes = brnoTime.getMinutes();
    const timeInMinutes = hours * 60 + minutes;
    
    const startTime = 7 * 60 + 30;
    const endTime = 18 * 60;
    
    return timeInMinutes >= startTime && timeInMinutes <= endTime;
  };

  const getMinBookingDate = () => {
    const brnoTime = getBrnoTime(currentTime);

    // Allow bookings starting from today
    const today = new Date(brnoTime);
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const getMaxBookingDate = () => {
    const today = new Date();
    // Allow bookings up to 2 years in advance
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() + 2);
    return maxDate;
  };

  const minDate = getMinBookingDate();
  const maxDate = getMaxBookingDate();

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 7; hour <= 18; hour++) {
      if (hour === 7) {
        options.push('07:30');
      } else if (hour === 18) {
        options.push('18:00');
      } else {
        options.push(`${String(hour).padStart(2, '0')}:00`);
        if (hour < 18) options.push(`${String(hour).padStart(2, '0')}:30`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const calculateDuration = () => {
    if (!formData.dropOffDate || !formData.pickUpDate) {
      return { days: 0, hours: 0 };
    }

    const dropOff = new Date(`${formData.dropOffDate}T${formData.dropOffTime}`);
    const pickUp = new Date(`${formData.pickUpDate}T${formData.pickUpTime}`);
    
    const diffMs = pickUp.getTime() - dropOff.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    const days = Math.floor(diffHours / 24);
    const hours = Math.round(diffHours % 24);
    
    return { days, hours };
  };

  const calculatePrice = () => {
    const { days, hours } = calculateDuration();
    const pricing = PRICING[formData.lockerSize];
    const count = formData.lockerCount;

    if (currency === 'CZK') {
      const mixedPrice = days * pricing.daily + hours * pricing.hourly;
      const fullDaysPrice = (days + (hours > 0 ? 1 : 0)) * pricing.daily;
      return Math.min(mixedPrice, fullDaysPrice) * count;
    } else {
      const mixedPrice = days * pricing.dailyEur + hours * pricing.hourlyEur;
      const fullDaysPrice = (days + (hours > 0 ? 1 : 0)) * pricing.dailyEur;
      return Number((Math.min(mixedPrice, fullDaysPrice) * count).toFixed(2));
    }
  };

  // Promo code validation
  const applyPromoCode = async () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    setPromoValidating(true);
    setPromoMessage('');

    try {
      const amount = calculatePrice() + (latesurance ? 49 : 0);
      const email = customerData.email.trim();

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-91daaa27/validate-promo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          code,
          amount,
          email
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.ok) {
        setPromoCode(data.code);
        setPromoDiscount(data.discount_czk);
        setOriginalPrice(amount);
        setPromoValid(true);
        setPromoMessage(data.message);
      } else {
        setPromoValid(false);
        setPromoCode('');
        setPromoDiscount(0);
        setPromoMessage(data.message || t.promoInvalid);
      }
    } catch (error) {
      console.error('Promo code validation error:', error);
      setPromoValid(false);
      setPromoMessage('Connection error. Please try again.');
    } finally {
      setPromoValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerData.name || !customerData.email || !customerData.phone) {
      alert(t.emailRequired);
      return;
    }

    if (customerData.email !== customerData.confirmEmail) {
      alert('Emails do not match. Please check and try again.');
      return;
    }

    if (!formData.dropOffDate || !formData.pickUpDate) {
      alert(t.bookingRestriction);
      return;
    }

    setIsProcessing(true);

    try {
      const { days, hours } = calculateDuration();
      const basePrice = calculatePrice();
      const totalPriceWithExtras = basePrice + (latesurance ? 49 : 0);
      
      // Apply promo discount if valid
      // The discount was calculated on totalPriceWithExtras, so we subtract it from that
      const finalPrice = promoDiscount > 0 ? totalPriceWithExtras - promoDiscount : totalPriceWithExtras;
      
      console.log('Payment submission:', {
        basePrice,
        latesurance,
        totalPriceWithExtras,
        promoDiscount,
        finalPrice,
        promoCode
      });
      
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`;

      console.log('🔍 [FRONTEND] Submitting order with locker size:', {
        lockerSize: formData.lockerSize,
        lockerSizeType: typeof formData.lockerSize,
        orderId,
        finalPrice
      });

      const orderData = {
        orderId,
        lockerSize: formData.lockerSize,
        lockerCount: formData.lockerCount,
        dropOffDate: formData.dropOffDate,
        dropOffTime: formData.dropOffTime,
        pickUpDate: formData.pickUpDate,
        pickUpTime: formData.pickUpTime,
        durationDays: days,
        durationHours: hours,
        totalPrice: finalPrice,
        currency,
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: `${customerData.phonePrefix} ${customerData.phone}`,
        latesurance: latesurance,
        promoCode: promoCode || undefined,
        promoDiscount: promoDiscount || 0,
        originalPrice: promoDiscount > 0 ? totalPriceWithExtras : undefined,
      };

      // Check if this is a free booking (0 CZK)
      if (finalPrice === 0) {
        console.log('🆓 [FRONTEND] Free booking detected, bypassing Stripe');

        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-91daaa27/create-free-booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (data.success) {
          // Redirect to success page
          window.location.href = `${window.location.origin}?free_booking=true&order_id=${orderId}`;
        } else {
          throw new Error(data.error || 'Failed to create free booking');
        }
      } else {
        // Normal Stripe payment flow
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-91daaa27/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error(data.error || 'Failed to create checkout session');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <section id="reservation" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Live Clock */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-8 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">{t.currentTimeBrno}</p>
                <p className="text-3xl font-bold">
                  {getBrnoTime(currentTime).toLocaleTimeString('cs-CZ', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit' 
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">{t.operatingHours}</p>
              <div className={`inline-block px-4 py-2 rounded-lg font-semibold mt-2 ${
                isWithinOperatingHours() 
                  ? 'bg-green-500 text-white' 
                  : 'bg-orange-500 text-white'
              }`}>
                {isWithinOperatingHours() ? '✅ Open' : '⏰ Closed'}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all ${
                  currentStep >= step
                    ? 'bg-blue-600 text-white shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mx-auto mt-4 text-sm font-medium">
            <span className={currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}>{t.selectLocker}</span>
            <span className={currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}>{t.selectDateTime}</span>
            <span className={currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'}>{t.reviewAndPay}</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Step 1: Select Locker */}
          {currentStep === 1 && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" id="step-1-heading">{t.step1}</h3>
              
              {/* Currency Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Currency / Měna
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrency('CZK')}
                    className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                      currency === 'CZK'
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    CZK (Kč)
                  </button>
                  <button
                    onClick={() => setCurrency('EUR')}
                    className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                      currency === 'EUR'
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    EUR (€)
                  </button>
                </div>
              </div>

              {/* Locker Selection */}
              <div id="locker-selection" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['S', 'M', 'L'] as const).map((size) => {
                  const availabilityKey = size === 'S' ? 'small' : size === 'M' ? 'medium' : 'large';
                  const availableCount = availability ? availability[availabilityKey] : null;
                  const isUnavailable = availableCount !== null && availableCount <= 0;
                  
                  return (
                    <button
                      key={size}
                      onClick={() => !isUnavailable && setFormData({ ...formData, lockerSize: size })}
                      disabled={isUnavailable}
                      className={`p-6 rounded-xl border-3 transition-all relative ${
                        isUnavailable
                          ? 'opacity-50 cursor-not-allowed border-gray-300 bg-gray-100'
                          : formData.lockerSize === size
                          ? 'border-blue-600 bg-blue-50 shadow-xl scale-105'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                      }`}
                    >
                      {/* Show availability status always */}
                      {isUnavailable ? (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                          {t.unavailable}
                        </div>
                      ) : (
                        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                          ✓ Available
                        </div>
                      )}
                      
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {t[`locker${size}` as keyof typeof t]}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        {t[`locker${size}Dim` as keyof typeof t]}
                      </div>
                      
                      {!isUnavailable && (
                        <div className="bg-blue-100 rounded-lg p-3 text-sm font-semibold text-blue-700">
                          {currency === 'CZK'
                            ? `${PRICING[size].hourly} Kč/h • ${PRICING[size].daily} Kč/den`
                            : `€${PRICING[size].hourlyEur}/h • €${PRICING[size].dailyEur}/den`}
                        </div>
                      )}
                      {formData.lockerSize === size && !isUnavailable && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Locker Count */}
              <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  🧳 {t.numberOfLockers}
                </label>
                <p className="text-xs text-gray-500 mb-4">{t.lockersHelp}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setFormData(f => ({ ...f, lockerCount: Math.max(1, f.lockerCount - 1) }))}
                    disabled={formData.lockerCount <= 1}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-orange-300 text-xl font-bold text-orange-600 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    −
                  </button>
                  <span className="text-4xl font-bold text-gray-900 w-12 text-center">{formData.lockerCount}</span>
                  <button
                    onClick={() => setFormData(f => ({ ...f, lockerCount: Math.min(10, f.lockerCount + 1) }))}
                    disabled={formData.lockerCount >= 10}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-orange-300 text-xl font-bold text-orange-600 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    +
                  </button>
                  {formData.lockerCount > 1 && (
                    <div className="ml-4 bg-orange-100 rounded-lg px-4 py-2 text-sm font-semibold text-orange-700">
                      × {formData.lockerCount} lockers
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  {t.next} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" id="step-2-heading">{t.step2}</h3>
              
              {/* Drop-off */}
              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">{t.dropOff}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-5 h-5 inline mr-2 text-blue-600" />
                      {t.date}
                    </label>
                    <div className="bg-white border-2 border-gray-300 rounded-xl p-3">
                      <DayPicker
                        mode="single"
                        selected={formData.dropOffDate ? new Date(formData.dropOffDate) : undefined}
                        onSelect={(day) => {
                          if (day) {
                            const year = day.getFullYear();
                            const month = String(day.getMonth() + 1).padStart(2, '0');
                            const dayOfMonth = String(day.getDate()).padStart(2, '0');
                            setFormData({ ...formData, dropOffDate: `${year}-${month}-${dayOfMonth}` });
                            // Automatically set pick-up calendar to same month
                            setPickUpMonth(day);
                          }
                        }}
                        disabled={{ before: minDate, after: maxDate }}
                        captionLayout="dropdown"
                        fromYear={new Date().getFullYear()}
                        toYear={new Date().getFullYear() + 2}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-5 h-5 inline mr-2 text-blue-600" />
                      {t.time}
                    </label>
                    <select
                      value={formData.dropOffTime}
                      onChange={(e) => setFormData({ ...formData, dropOffTime: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-lg"
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pick-up */}
              <div className="bg-green-50 p-6 rounded-xl mb-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">{t.pickUp}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-5 h-5 inline mr-2 text-green-600" />
                      {t.date}
                    </label>
                    <div className="bg-white border-2 border-gray-300 rounded-xl p-3">
                      <DayPicker
                        mode="single"
                        selected={formData.pickUpDate ? new Date(formData.pickUpDate) : undefined}
                        month={pickUpMonth}
                        onMonthChange={setPickUpMonth}
                        onSelect={(day) => {
                          if (day) {
                            const year = day.getFullYear();
                            const month = String(day.getMonth() + 1).padStart(2, '0');
                            const dayOfMonth = String(day.getDate()).padStart(2, '0');
                            setFormData({ ...formData, pickUpDate: `${year}-${month}-${dayOfMonth}` });
                          }
                        }}
                        disabled={{ before: formData.dropOffDate ? new Date(formData.dropOffDate) : new Date(), after: maxDate }}
                        captionLayout="dropdown"
                        fromYear={new Date().getFullYear()}
                        toYear={new Date().getFullYear() + 2}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-5 h-5 inline mr-2 text-green-600" />
                      {t.time}
                    </label>
                    <select
                      value={formData.pickUpTime}
                      onChange={(e) => setFormData({ ...formData, pickUpTime: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none text-lg"
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Preview */}
              {formData.dropOffDate && formData.pickUpDate && (
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-2">{t.totalPrice}</p>
                    <p className="text-5xl font-bold">
                      {calculatePrice()} {currency === 'CZK' ? 'Kč' : '€'}
                    </p>
                    <p className="text-sm opacity-75 mt-2">
                      {calculateDuration().days} {t.days}, {calculateDuration().hours} {t.hours}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" /> {t.back}
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!formData.dropOffDate || !formData.pickUpDate}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {t.next} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact & Payment */}
          {currentStep === 3 && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" id="step-3-heading">{t.step3}</h3>
              
              {/* Booking Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">{t.bookingSummary}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">{t.lockerSize}</p>
                    <p className="font-bold text-lg">{formData.lockerSize} × {formData.lockerCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t.totalPrice}</p>
                    <p className="font-bold text-lg text-blue-600">
                      {calculatePrice() + (latesurance ? 49 : 0)} {currency === 'CZK' ? 'Kč' : '€'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t.dropOff}</p>
                    <p className="font-semibold">{formData.dropOffDate} {formData.dropOffTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t.pickUp}</p>
                    <p className="font-semibold">{formData.pickUpDate} {formData.pickUpTime}</p>
                  </div>
                </div>
              </div>

              {/* Late&Early Insurance Option */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-300">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={latesurance}
                    onChange={(e) => setLatesurance(e.target.checked)}
                    className="w-6 h-6 mt-1 rounded border-2 border-green-400 text-green-600 focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{t.latesuranceTitle}</h4>
                      <span className="text-2xl font-bold text-green-600">{t.latesurancePrice}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{t.latesuranceDesc}</p>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-700">{t.latesuranceBenefit1}</li>
                      <li className="text-sm text-gray-700">{t.latesuranceBenefit2}</li>
                    </ul>
                  </div>
                </label>
              </div>

              {/* Customer Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    {t.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    placeholder="Jan Novák"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    {t.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    placeholder="jan.novak@email.cz"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Confirm Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={customerData.confirmEmail}
                    onChange={(e) => setCustomerData({ ...customerData, confirmEmail: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none ${
                      customerData.confirmEmail
                        ? customerData.email === customerData.confirmEmail
                          ? 'border-green-400 bg-green-50'
                          : 'border-red-400 bg-red-50'
                        : 'border-gray-300'
                    }`}
                    placeholder="Retype your email"
                    required
                  />
                  {customerData.confirmEmail && customerData.email !== customerData.confirmEmail && (
                    <p className="mt-1 text-sm text-red-600 font-medium">⚠️ Emails do not match</p>
                  )}
                  {customerData.confirmEmail && customerData.email === customerData.confirmEmail && (
                    <p className="mt-1 text-sm text-green-600 font-medium">✅ Emails match</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    {t.phone} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={customerData.phonePrefix}
                      onChange={(e) => setCustomerData({ ...customerData, phonePrefix: e.target.value })}
                      className="w-32 px-3 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      required
                    >
                      <option value="+420">🇨🇿 +420</option>
                      <option value="+421">🇸🇰 +421</option>
                      <option value="+48">🇵🇱 +48</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+43">🇦🇹 +43</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+380">🇺🇦 +380</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+7">🇷🇺 +7</option>
                      <option value="+86">🇨🇳 +86</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+82">🇰🇷 +82</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+55">🇧🇷 +55</option>
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+64">🇳🇿 +64</option>
                      <option value="+27">🇿🇦 +27</option>
                    </select>
                    <input
                      type="tel"
                      value={customerData.phone}
                      onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      placeholder="123 456 789"
                      required
                    />
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-2" />
                    {t.promoCode}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none uppercase"
                      placeholder={t.promoCodePlaceholder}
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoValidating || !promoCodeInput.trim() || !customerData.email}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
                    >
                      {promoValidating ? t.promoValidating : t.applyPromo}
                    </button>
                  </div>
                  
                  {/* Promo Message */}
                  {promoMessage && (
                    <div className={`mt-3 p-3 rounded-lg ${promoValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <p className="text-sm font-semibold">{promoMessage}</p>
                      {promoValid && promoDiscount > 0 && (
                        <div className="mt-2 text-sm">
                          <p>{t.originalPrice}: {originalPrice} {currency === 'CZK' ? 'Kč' : '€'}</p>
                          <p>{t.discount}: -{promoDiscount} {currency === 'CZK' ? 'Kč' : '€'}</p>
                          <p className="font-bold text-green-900">
                            {t.totalPrice}: {originalPrice - promoDiscount} {currency === 'CZK' ? 'Kč' : '€'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Info */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
                <h5 className="font-bold text-yellow-900 mb-2">{t.emailConfirmInfo}</h5>
                <p className="text-sm text-yellow-800 mb-2">{t.emailConfirmText}</p>
                <p className="text-sm text-yellow-800 font-semibold">{t.accessCodesInfo}</p>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" /> {t.back}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing || !customerData.name || !customerData.email || !customerData.phone || customerData.email !== customerData.confirmEmail}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      {t.processing}
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-6 h-6" />
                      {t.proceedToPayment}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}