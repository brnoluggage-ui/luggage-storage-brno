import { Luggage, Globe, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/d886448be882473afb4ba2c37203792cfb616fb8.png';

interface NavigationProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
  setLanguage: (lang: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it') => void;
  availability: {
    small: number;
    medium: number;
    large: number;
  } | null;
}

const languageNames = {
  cs: '🇨🇿 Čeština',
  en: '🇬🇧 English',
  de: '🇩🇪 Deutsch',
  pl: '🇵🇱 Polski',
  uk: '🇺🇦 Українська',
  fr: '🇫🇷 Français',
  es: '🇪🇸 Español',
  it: '🇮🇹 Italiano',
};

const translations = {
  cs: {
    features: 'Výhody',
    about: 'O mně',
    howItWorks: 'Jak to funguje',
    pricing: 'Ceník',
    longTerm: 'Dlouhodobý pronájem',
    reservation: 'Rezervace',
    location: 'Kde nás najít',
    contact: 'Kontakt',
    available: 'Dostupné',
    notAvailable: 'Nedostupné',
  },
  en: {
    features: 'Features',
    about: 'About',
    howItWorks: 'How It Works',
    pricing: 'Pricing',
    longTerm: 'Long-Term',
    reservation: 'Book Now',
    location: 'Location',
    contact: 'Contact',
    available: 'Available',
    notAvailable: 'Not Available',
  },
  de: {
    features: 'Vorteile',
    about: 'Über mich',
    howItWorks: 'Wie es funktioniert',
    pricing: 'Preise',
    longTerm: 'Langzeitmiete',
    reservation: 'Jetzt buchen',
    location: 'Standort',
    contact: 'Kontakt',
    available: 'Verfügbar',
    notAvailable: 'Nicht verfügbar',
  },
  pl: {
    features: 'Zalety',
    about: 'O mnie',
    howItWorks: 'Jak to działa',
    pricing: 'Cennik',
    longTerm: 'Długoterminowy',
    reservation: 'Zarezerwuj',
    location: 'Lokalizacja',
    contact: 'Kontakt',
    available: 'Dostępne',
    notAvailable: 'Niedostępne',
  },
  uk: {
    features: 'Переваги',
    about: 'Про мене',
    howItWorks: 'Як це працює',
    pricing: 'Ціни',
    longTerm: 'Довгострокова оренда',
    reservation: 'Забронювати',
    location: 'Розташування',
    contact: 'Контакт',
    available: 'Доступно',
    notAvailable: 'Недоступно',
  },
  fr: {
    features: 'Avantages',
    about: 'À propos',
    howItWorks: 'Comment ça marche',
    pricing: 'Tarifs',
    longTerm: 'Longue durée',
    reservation: 'Réserver',
    location: 'Emplacement',
    contact: 'Contact',
    available: 'Disponible',
    notAvailable: 'Indisponible',
  },
  es: {
    features: 'Ventajas',
    about: 'Acerca de',
    howItWorks: 'Cómo funciona',
    pricing: 'Precios',
    longTerm: 'Largo plazo',
    reservation: 'Reservar',
    location: 'Ubicación',
    contact: 'Contacto',
    available: 'Disponible',
    notAvailable: 'No disponible',
  },
  it: {
    features: 'Vantaggi',
    about: 'Chi sono',
    howItWorks: 'Come funziona',
    pricing: 'Prezzi',
    longTerm: 'Lungo termine',
    reservation: 'Prenota',
    location: 'Posizione',
    contact: 'Contatto',
    available: 'Disponibile',
    notAvailable: 'Non disponibile',
  },
};

export function Navigation({ language, setLanguage, availability }: NavigationProps) {
  const t = translations[language];
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    // If clicking "reservation", scroll to locker selection instead
    const targetId = sectionId === 'reservation' ? 'locker-selection' : sectionId;
    const section = document.getElementById(targetId);
    if (section) {
      const block = targetId === 'locker-selection' ? 'center' : 'start';
      section.scrollIntoView({ behavior: 'smooth', block });
    }
  };

  const handleMobileMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    handleNavClick(e, sectionId);
    setShowMobileMenu(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src={logoImage}
              alt="Brno Luggage Storage"
              className="w-12 h-12 object-contain rounded-xl"
            />
            <div className="text-left">
              <div className="font-bold text-lg">Brno Luggage Storage</div>
              <div className="text-xs text-gray-600">{language === 'cs' ? 'Hlavní nádraží' : 'Main Station'}</div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.features}
            </a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.about}
            </a>
            <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.howItWorks}
            </a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.pricing}
            </a>
            <a href="#long-term" onClick={(e) => handleNavClick(e, 'long-term')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.longTerm}
            </a>
            <a href="#reservation" onClick={(e) => handleNavClick(e, 'reservation')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.reservation}
            </a>
            <a href="#location" onClick={(e) => handleNavClick(e, 'location')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.location}
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.contact}
            </a>
          </div>

          <div className="flex items-center gap-3">

            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium hidden sm:inline">{languageNames[language]}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    {(Object.keys(languageNames) as Array<keyof typeof languageNames>).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLanguageMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === lang
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden flex items-center px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <a 
              href="#features" 
              onClick={(e) => handleMobileMenuClick(e, 'features')}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              {t.features}
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleMobileMenuClick(e, 'about')}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              {t.about}
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleMobileMenuClick(e, 'how-it-works')}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              {t.howItWorks}
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleMobileMenuClick(e, 'pricing')}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              {t.pricing}
            </a>
            <a 
              href="#long-term" 
              onClick={(e) => handleMobileMenuClick(e, 'long-term')}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              {t.longTerm}
            </a>
            <a 
              href="#reservation" 
              onClick={(e) => handleMobileMenuClick(e, 'reservation')}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              {t.reservation}
            </a>
            <a 
              href="#location" 
              onClick={(e) => handleMobileMenuClick(e, 'location')}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              {t.location}
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleMobileMenuClick(e, 'contact')}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              {t.contact}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}