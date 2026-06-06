import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface UrgentBannerProps {
  language: 'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it';
}

const translations = {
  cs: {
    urgentBanner: '⚠️ DOČASNÉ UZAVŘENÍ',
    urgentMessage: 'Skříňky nefungují dnes (29.1.) a zítra (30.1.) kvůli technické údržbě. Od 31.1. budou plně funkční!',
  },
  en: {
    urgentBanner: '⚠️ TEMPORARY CLOSURE',
    urgentMessage: 'Lockers are not working today (Jan 29) and tomorrow (Jan 30) due to technical maintenance. From January 31 they will be fully operational!',
  },
  de: {
    urgentBanner: '⚠️ VORÜBERGEHENDE SCHLIESSUNG',
    urgentMessage: 'Schließfächer funktionieren heute (29.1.) und morgen (30.1.) wegen technischer Wartung nicht. Ab 31.1. werden sie voll funktionsfähig sein!',
  },
  pl: {
    urgentBanner: '⚠️ TYMCZASOWE ZAMKNIĘCIE',
    urgentMessage: 'Szafki nie działają dzisiaj (29.1.) i jutro (30.1.) z powodu konserwacji technicznej. Od 31.1. będą w pełni sprawne!',
  },
  uk: {
    urgentBanner: '⚠️ ТИМЧАСОВЕ ЗАКРИТТЯ',
    urgentMessage: 'Камери схову не працюють сьогодні (29.1.) і завтра (30.1.) через технічне обслуговування. З 31.1. вони будуть повністю функціонувати!',
  },
  fr: {
    urgentBanner: '⚠️ FERMETURE TEMPORAIRE',
    urgentMessage: 'Les casiers ne fonctionnent pas aujourd\'hui (29.1.) et demain (30.1.) en raison de la maintenance technique. Dès le 31.1., ils seront pleinement opérationnels!',
  },
  es: {
    urgentBanner: '⚠️ CIERRE TEMPORAL',
    urgentMessage: '¡Los casilleros no funcionan hoy (29.1.) y mañana (30.1.) debido a mantenimiento técnico. Desde el 31.1. estarán completamente operativos!',
  },
  it: {
    urgentBanner: '⚠️ CHIUSURA TEMPORANEA',
    urgentMessage: 'Gli armadietti non funzionano oggi (29.1.) e domani (30.1.) a causa di manutenzione tecnica. Dal 31.1. saranno completamente operativi!',
  },
};

export function UrgentBanner({ language }: UrgentBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const t = translations[language];

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-white rounded-full p-2 flex-shrink-0 animate-pulse">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-black mb-1">{t.urgentBanner}</h3>
              <p className="text-sm sm:text-base font-semibold">{t.urgentMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors flex-shrink-0"
            aria-label="Close banner"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}