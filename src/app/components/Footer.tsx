import { Luggage, Facebook, Instagram, Twitter } from 'lucide-react';
import logoImage from 'figma:asset/d886448be882473afb4ba2c37203792cfb616fb8.png';

interface FooterProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
  onShowTerms: () => void;
  onShowPrivacy: () => void;
}

const translations = {
  cs: {
    description: 'Bezpečné a dostupné úschování zavazadel přímo na hlavním nádraží v Brně.',
    quickLinks: 'Rychlé odkazy',
    features: 'Výhody',
    howItWorks: 'Jak to funguje',
    pricing: 'Ceník',
    contact: 'Kontakt',
    legal: 'Právní informace',
    terms: 'Obchodní podmínky',
    privacy: 'Ochrana osobních údajů',
    cookies: 'Cookies',
    rights: 'Všechna práva vyhrazena.',
  },
  en: {
    description: 'Secure and affordable luggage storage right at Brno Main Train Station.',
    quickLinks: 'Quick Links',
    features: 'Features',
    howItWorks: 'How It Works',
    pricing: 'Pricing',
    contact: 'Contact',
    legal: 'Legal',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    cookies: 'Cookies',
    rights: 'All rights reserved.',
  },
  de: {
    description: 'Sichere und kostengünstige Gepäckaufbewahrung direkt am Hauptbahnhof Brno.',
    quickLinks: 'Schnellzugriffe',
    features: 'Merkmale',
    howItWorks: 'Wie es funktioniert',
    pricing: 'Preise',
    contact: 'Kontakt',
    legal: 'Rechtliche Informationen',
    terms: 'Nutzungsbedingungen',
    privacy: 'Datenschutzrichtlinie',
    cookies: 'Cookies',
    rights: 'Alle Rechte vorbehalten.',
  },
  pl: {
    description: 'Bezpieczne i dostępne przechowywanie bagażu bezpośrednio na głównym stacji kolejowej w Brnie.',
    quickLinks: 'Szybkie linki',
    features: 'Funkcje',
    howItWorks: 'Jak to działa',
    pricing: 'Cennik',
    contact: 'Kontakt',
    legal: 'Informacje prawne',
    terms: 'Warunki korzystania z usług',
    privacy: 'Polityka prywatności',
    cookies: 'Ciasteczka',
    rights: 'Wszelkie prawa zastrzeżone.',
  },
  uk: {
    description: 'Безпечне та доступне зберігання багажу прямо на головному залізничному вокзалі у Брні.',
    quickLinks: 'Швидкі посилання',
    features: 'Переваги',
    howItWorks: 'Як це працює',
    pricing: 'Ціни',
    contact: 'Контакт',
    legal: 'Юридична інформація',
    terms: 'Умови використання',
    privacy: 'Політика конфіденційності',
    cookies: 'Cookies',
    rights: 'Всі права захищені.',
  },
  fr: {
    description: 'Stockage sécurisé et abordable des bagages directement à la gare centrale de Brno.',
    quickLinks: 'Liens rapides',
    features: 'Fonctionnalités',
    howItWorks: 'Comment ça fonctionne',
    pricing: 'Tarification',
    contact: 'Contact',
    legal: 'Informations légales',
    terms: 'Conditions d\'utilisation',
    privacy: 'Politique de confidentialité',
    cookies: 'Cookies',
    rights: 'Tous droits réservés.',
  },
  es: {
    description: 'Almacenamiento seguro y asequible de equipaje directamente en la estación principal de Brno.',
    quickLinks: 'Enlaces rápidos',
    features: 'Características',
    howItWorks: 'Cómo funciona',
    pricing: 'Precios',
    contact: 'Contacto',
    legal: 'Información legal',
    terms: 'Términos de servicio',
    privacy: 'Política de privacidad',
    cookies: 'Cookies',
    rights: 'Todos los derechos reservados.',
  },
  it: {
    description: 'Archiviazione sicura e conveniente dei bagagli direttamente alla stazione centrale di Brno.',
    quickLinks: 'Collegamenti rapidi',
    features: 'Caratteristiche',
    howItWorks: 'Come funziona',
    pricing: 'Prezzi',
    contact: 'Contatto',
    legal: 'Informazioni legali',
    terms: 'Condizioni di servizio',
    privacy: 'Politica sulla privacy',
    cookies: 'Cookies',
    rights: 'Tutti i diritti riservati.',
  },
};

export function Footer({ language, onShowTerms, onShowPrivacy }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoImage}
                alt="Brno Luggage Storage" 
                className="w-10 h-10 object-contain rounded-lg"
              />
              <div>
                <div className="font-bold text-lg">Brno Luggage Storage</div>
                <div className="text-xs text-gray-400">{language === 'cs' ? 'Hlavní nádraží' : 'Main Station'}</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">{t.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  {t.features}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  {t.howItWorks}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                  {t.pricing}
                </a>
              </li>
              <li>
                <a href="#reservation" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'cs' ? 'Rezervace' : 'Book Now'}
                </a>
              </li>
              <li>
                <a href="#location" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'cs' ? 'Kde nás najít' : 'Location'}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.legal}</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={onShowTerms}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  {t.terms}
                </button>
              </li>
              <li>
                <button 
                  onClick={onShowPrivacy}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  {t.privacy}
                </button>
              </li>
              <li>
                <button 
                  onClick={onShowTerms}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  {t.cookies}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Brno Luggage Storage. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}