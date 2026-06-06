import { useState } from "react";
import { MapPin, Train, Clock, ArrowRight } from "lucide-react";

const translations = {
  cs: {
    title: "Interaktivní mapa nádraží",
    steps: "Krok za krokem",
    step1: "Vstupte hlavním vchodem",
    step1desc: "Vejděte do hlavní haly nádraží",
    step2: "Najděte velký jízdní řád",
    step2desc: "V hlavní hale uvidíte velkou tabuli s jízdním řádem",
    step3: "Jděte k nástupišti 1",
    step3desc: "Vyjděte VENKU na úroveň ulice (ne do podzemí)",
    step4: "Otočte se doprava",
    step4desc: "Na nástupišti 1 jděte doprava směrem ke konci budovy",
    step5: "Najděte čekárnu",
    step5desc: "Na konci budovy je čekárna - naše skříňky vidíte skrz sklo",
    clickToHighlight: "Klikněte na kroky pro zvýraznění na mapě",
    yourLocation: "Hlavní vchod",
    lockers: "Naše skříňky",
    platform1: "Nástupiště 1",
    waitingRoom: "Čekárna",
    mainHall: "Hlavní hala",
    timetable: "Jízdní řád",
    street: "Ulice / Město",
    tracks: "Koleje",
  },
  en: {
    title: "Interactive Station Map",
    steps: "Step by Step",
    step1: "Enter main entrance",
    step1desc: "Enter the main hall of the station",
    step2: "Find the big timetable",
    step2desc: "In the main hall, you'll see a large timetable board",
    step3: "Go to Platform 1",
    step3desc: "Go OUTSIDE to street level (not underground)",
    step4: "Turn right",
    step4desc: "On Platform 1, go right towards the end of the building",
    step5: "Find the waiting room",
    step5desc:
      "At the end of the building is the waiting room - see our lockers through the glass",
    clickToHighlight: "Click steps to highlight on map",
    yourLocation: "Main Entrance",
    lockers: "Our Lockers",
    platform1: "Platform 1",
    waitingRoom: "Waiting Room",
    mainHall: "Main Hall",
    timetable: "Timetable",
    street: "City / Street",
    tracks: "Train Tracks",
  },
  de: {
    title: "Interaktiver Bahnhofsplan",
    steps: "Schritt für Schritt",
    step1: "Haupteingang betreten",
    step1desc: "Betreten Sie die Haupthalle des Bahnhofs",
    step2: "Finden Sie den großen Fahrplan",
    step2desc: "In der Haupthalle sehen Sie eine große Fahrplantafel",
    step3: "Gehen Sie zu Gleis 1",
    step3desc: "Gehen Sie DRAUSSEN auf Straßenniveau (nicht unterirdisch)",
    step4: "Nach rechts abbiegen",
    step4desc: "Auf Gleis 1 gehen Sie rechts zum Ende des Gebäudes",
    step5: "Finden Sie den Warteraum",
    step5desc:
      "Am Ende des Gebäudes ist der Warteraum - unsere Schließfächer sehen Sie durch das Glas",
    clickToHighlight:
      "Klicken Sie auf Schritte, um auf der Karte hervorzuheben",
    yourLocation: "Haupteingang",
    lockers: "Unsere Schließfächer",
    platform1: "Gleis 1",
    waitingRoom: "Warteraum",
    mainHall: "Haupthalle",
    timetable: "Fahrplan",
    street: "Stadt / Straße",
    tracks: "Bahngleise",
  },
  pl: {
    title: "Interaktywna mapa stacji",
    steps: "Krok po kroku",
    step1: "Wejdź głównym wejściem",
    step1desc: "Wejdź do głównej hali stacji",
    step2: "Znajdź duży rozkład jazdy",
    step2desc: "W głównej hali zobaczysz dużą tablicę z rozkładem jazdy",
    step3: "Idź na Peron 1",
    step3desc: "Wyjdź NA ZEWNĄTRZ na poziom ulicy (nie do podziemi)",
    step4: "Skręć w prawo",
    step4desc: "Na Peronie 1 idź w prawo w kierunku końca budynku",
    step5: "Znajdź poczekalnię",
    step5desc:
      "Na końcu budynku jest poczekalnia - nasze szafy zobaczysz przez szkło",
    clickToHighlight: "Kliknij kroki, aby podświetlić na mapie",
    yourLocation: "Wejście główne",
    lockers: "Nasze szafy",
    platform1: "Peron 1",
    waitingRoom: "Poczekalnia",
    mainHall: "Główna hala",
    timetable: "Rozkład jazdy",
    street: "Miasto / Ulica",
    tracks: "Tory kolejowe",
  },
  uk: {
    title: "Інтерактивна карта станції",
    steps: "Крок за кроком",
    step1: "Увійдіть головним входом",
    step1desc: "Увійдіть у головний зал станції",
    step2: "Знайдіть великий розклад",
    step2desc: "У головному залі ви побачите велику дошку з розкладом",
    step3: "Йдіть на Платформу 1",
    step3desc: "Вийдіть НАЗОВНІ на рівень вулиці (не в підземелля)",
    step4: "Поверніть праворуч",
    step4desc: "На Платформі 1 йдіть праворуч до кінця будівлі",
    step5: "Знайдіть залу очікування",
    step5desc:
      "У кінці будівлі є зала очікування - наші шафи видно крізь скло",
    clickToHighlight: "Натисніть кроки для підсвічування на карті",
    yourLocation: "Головний вхід",
    lockers: "Наші шафи",
    platform1: "Платформа 1",
    waitingRoom: "Зала очікування",
    mainHall: "Головний зал",
    timetable: "Розклад",
    street: "Місто / Вулиця",
    tracks: "Залізничні колії",
  },
  fr: {
    title: "Plan de gare interactif",
    steps: "Étape par étape",
    step1: "Entrez par l'entrée principale",
    step1desc: "Entrez dans le hall principal de la gare",
    step2: "Trouvez le grand horaire",
    step2desc: "Dans le hall principal, vous verrez un grand tableau d'horaires",
    step3: "Allez au Quai 1",
    step3desc: "Sortez DEHORS au niveau de la rue (pas souterrain)",
    step4: "Tournez à droite",
    step4desc: "Sur le Quai 1, allez à droite vers le bout du bâtiment",
    step5: "Trouvez la salle d'attente",
    step5desc:
      "Au bout du bâtiment se trouve la salle d'attente - voyez nos casiers à travers le verre",
    clickToHighlight:
      "Cliquez sur les étapes pour mettre en surbrillance sur la carte",
    yourLocation: "Entrée principale",
    lockers: "Nos casiers",
    platform1: "Quai 1",
    waitingRoom: "Salle d'attente",
    mainHall: "Hall principal",
    timetable: "Horaire",
    street: "Ville / Rue",
    tracks: "Voies ferrées",
  },
  es: {
    title: "Mapa de estación interactivo",
    steps: "Paso a paso",
    step1: "Entre por la entrada principal",
    step1desc: "Entre en el hall principal de la estación",
    step2: "Encuentre el gran horario",
    step2desc: "En el hall principal, verá un gran tablero de horarios",
    step3: "Vaya al Andén 1",
    step3desc: "Salga AFUERA al nivel de la calle (no subterráneo)",
    step4: "Gire a la derecha",
    step4desc: "En el Andén 1, vaya a la derecha hacia el final del edificio",
    step5: "Encuentre la sala de espera",
    step5desc:
      "Al final del edificio está la sala de espera - vea nuestros casilleros a través del vidrio",
    clickToHighlight: "Haga clic en los pasos para resaltar en el mapa",
    yourLocation: "Entrada principal",
    lockers: "Nuestros casilleros",
    platform1: "Andén 1",
    waitingRoom: "Sala de espera",
    mainHall: "Hall principal",
    timetable: "Horario",
    street: "Ciudad / Calle",
    tracks: "Vías del tren",
  },
  it: {
    title: "Mappa della stazione interattiva",
    steps: "Passo dopo passo",
    step1: "Entra dall'ingresso principale",
    step1desc: "Entra nella hall principale della stazione",
    step2: "Trova il grande orario",
    step2desc: "Nella hall principale, vedrai un grande tabellone degli orari",
    step3: "Vai al Binario 1",
    step3desc: "Esci FUORI al livello della strada (non sotterraneo)",
    step4: "Gira a destra",
    step4desc: "Sul Binario 1, vai a destra verso la fine dell'edificio",
    step5: "Trova la sala d'attesa",
    step5desc:
      "Alla fine dell'edificio c'è la sala d'attesa - vedi i nostri armadi attraverso il vetro",
    clickToHighlight: "Clicca sui passaggi per evidenziare sulla mappa",
    yourLocation: "Ingresso principale",
    lockers: "I nostri armadi",
    platform1: "Binario 1",
    waitingRoom: "Sala d'attesa",
    mainHall: "Hall principale",
    timetable: "Orario",
    street: "Città / Strada",
    tracks: "Binari",
  },
};

export function InteractiveStationMap({ language = "en" }) {
  const t = translations[language] || translations.en;
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    { title: t.step1, desc: t.step1desc, icon: MapPin },
    { title: t.step2, desc: t.step2desc, icon: Clock },
    { title: t.step3, desc: t.step3desc, icon: Train },
    { title: t.step4, desc: t.step4desc, icon: ArrowRight },
    { title: t.step5, desc: t.step5desc, icon: MapPin },
  ];

  // Highlight states
  const hlEntrance = activeStep === 0;
  const hlHall = activeStep === 0 || activeStep === 1;
  const hlPlatform = activeStep === 2 || activeStep === 3 || activeStep === 4;
  const hlLockers = activeStep === 4;
  const showArrowUp = activeStep === 1 || activeStep === 2;
  const showArrowRight = activeStep === 3 || activeStep === 4;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-1 text-center">
        {t.title}
      </h3>
      <p className="text-sm text-gray-500 mb-6 text-center">
        {t.clickToHighlight}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ── MAP ── */}
        <div>
          <svg
            viewBox="0 0 540 400"
            className="w-full h-auto border-2 border-gray-200 rounded-xl"
          >
            <defs>
              {/* Arrow markers */}
              <marker
                id="arrBlue"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="4"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M0,0 L0,8 L10,4 z" fill="#2563eb" />
              </marker>
              <marker
                id="arrGreen"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="4"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M0,0 L0,8 L10,4 z" fill="#16a34a" />
              </marker>
              <marker
                id="arrRed"
                markerWidth="14"
                markerHeight="14"
                refX="13"
                refY="6"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M0,0 L0,12 L14,6 z" fill="#dc2626" />
              </marker>
            </defs>

            {/* ── BACKGROUND ── */}
            <rect width="540" height="400" fill="#f1f5f9" />

            {/* ── TRAIN TRACKS (top strip) ── */}
            <rect x="0" y="0" width="540" height="44" fill="#cbd5e1" />
            {/* rail lines */}
            <line
              x1="0"
              y1="14"
              x2="540"
              y2="14"
              stroke="#94a3b8"
              strokeWidth="4"
            />
            <line
              x1="0"
              y1="30"
              x2="540"
              y2="30"
              stroke="#94a3b8"
              strokeWidth="4"
            />
            {/* sleepers */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={i}
                x1={12 + i * 26}
                y1="10"
                x2={12 + i * 26}
                y2="36"
                stroke="#6b7280"
                strokeWidth="3"
              />
            ))}
            <text
              x="470"
              y="38"
              fontSize="9"
              fill="#475569"
              textAnchor="middle"
            >
              🚆 {t.tracks}
            </text>

            {/* ── PLATFORM 1 — horizontal outdoor strip ── */}
            <rect
              x="70"
              y="44"
              width="400"
              height="56"
              fill={hlPlatform ? "#bbf7d0" : "#dcfce7"}
              stroke={hlPlatform ? "#16a34a" : "#86efac"}
              strokeWidth={hlPlatform ? "3" : "1.5"}
            />
            <text
              x="200"
              y="67"
              fontSize="12"
              fill="#166534"
              fontWeight="bold"
              textAnchor="middle"
            >
              {t.platform1}
            </text>
            <text
              x="200"
              y="83"
              fontSize="9"
              fill="#166534"
              textAnchor="middle"
            >
              ☀️ Outdoors / Street level
            </text>

            {/* ── MAIN STATION BUILDING ── */}
            <rect
              x="70"
              y="100"
              width="400"
              height="185"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="2"
              rx="4"
            />
            <text
              x="270"
              y="114"
              fontSize="8"
              fill="#94a3b8"
              textAnchor="middle"
              letterSpacing="2"
            >
              — STATION BUILDING —
            </text>

            {/* ══ TOP ROW: booths + exit along the platform wall ══ */}

            {/* -- RegioJet booth (left of exit, same size as exit) -- */}
            <rect x="80" y="108" width="72" height="58" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" rx="3" />
            <text x="116" y="131" fontSize="10" fill="#c2410c" fontWeight="bold" textAnchor="middle">RegioJet</text>
            <text x="116" y="147" fontSize="18" textAnchor="middle">🟠</text>
            <text x="116" y="161" fontSize="7" fill="#9a3412" textAnchor="middle">ticket office</text>

            {/* -- EXIT passage in building wall (gap marker) -- */}
            <rect x="157" y="100" width="72" height="8" fill="#6ee7b7" rx="2" opacity="0.9" />
            {/* -- EXIT passage box (same size as booths) -- */}
            <rect x="157" y="108" width="72" height="58" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" strokeDasharray="4,3" rx="3" />
            <text x="193" y="133" fontSize="10" fill="#065f46" fontWeight="bold" textAnchor="middle">EXIT</text>
            <text x="193" y="149" fontSize="9" fill="#047857" textAnchor="middle">↑ to platform</text>

            {/* -- Czech Railways / ČD booth (right of exit, same size) -- */}
            <rect x="234" y="108" width="72" height="58" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="1.5" rx="3" />
            <text x="270" y="128" fontSize="9" fill="#1e40af" fontWeight="bold" textAnchor="middle">Czech</text>
            <text x="270" y="141" fontSize="9" fill="#1e40af" fontWeight="bold" textAnchor="middle">Railways</text>
            <text x="270" y="156" fontSize="18" textAnchor="middle">🔵</text>

            {/* ── WAITING ROOM + LOCKERS — wider, less tall, right end ── */}
            {/* Door from platform into waiting room */}
            <rect x="325" y="100" width="130" height="8" fill="#f87171" rx="2" opacity="0.8" />
            <rect
              x="315"
              y="108"
              width="150"
              height="85"
              fill={hlLockers ? "#fca5a5" : "#fee2e2"}
              stroke={hlLockers ? "#dc2626" : "#f87171"}
              strokeWidth={hlLockers ? "3.5" : "1.5"}
              rx="4"
            />
            <text x="390" y="140" fontSize="9" fill="#991b1b" fontWeight="bold" textAnchor="middle">
              {t.waitingRoom}
            </text>
            <text x="390" y="158" fontSize="20" textAnchor="middle">🎒</text>
            <text x="390" y="178" fontSize="8" fill="#b91c1c" fontWeight="bold" textAnchor="middle">
              {t.lockers}
            </text>

            {/* Divider line between top-row booths and lower hall */}
            <line x1="78" y1="170" x2="310" y2="170" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,3" />

            {/* ── MAIN HALL (lower portion, left side) ── */}
            <rect
              x="80"
              y="174"
              width="225"
              height="104"
              fill={hlHall ? "#dbeafe" : "#f8fafc"}
              stroke={hlHall ? "#3b82f6" : "#cbd5e1"}
              strokeWidth={hlHall ? "2.5" : "1"}
              rx="3"
            />
            <text x="192" y="210" fontSize="11" fill="#1e40af" fontWeight="bold" textAnchor="middle">
              {t.mainHall}
            </text>
            <text x="192" y="232" fontSize="20" textAnchor="middle">📋</text>
            <text x="192" y="252" fontSize="9" fill="#64748b" textAnchor="middle">
              {t.timetable}
            </text>

            {/* ── ENTRANCE (bottom-left, below main hall) ── */}
            <rect
              x="100"
              y="285"
              width="120"
              height="62"
              fill={hlEntrance ? "#fde68a" : "#fef9c3"}
              stroke={hlEntrance ? "#d97706" : "#fcd34d"}
              strokeWidth={hlEntrance ? "3" : "2"}
              rx="5"
            />
            <text
              x="160"
              y="311"
              fontSize="10"
              fill="#92400e"
              fontWeight="bold"
              textAnchor="middle"
            >
              🚪 {t.yourLocation}
            </text>
            <text
              x="160"
              y="329"
              fontSize="9"
              fill="#b45309"
              textAnchor="middle"
            >
              ▼ START HERE
            </text>

            {/* Gap/door from entrance into building */}
            <rect x="130" y="278" width="60" height="10" fill="#fbbf24" rx="2" opacity="0.7" />

            {/* ── STREET (bottom) ── */}
            <rect x="0" y="347" width="540" height="53" fill="#e2e8f0" />
            <text
              x="270"
              y="376"
              fontSize="11"
              fill="#475569"
              fontWeight="bold"
              textAnchor="middle"
            >
              🏙️ {t.street}
            </text>

            {/* ══ NAVIGATION ARROWS ══ */}

            {/* Step 0: pulse ring on entrance */}
            {activeStep === 0 && (
              <circle
                cx="160"
                cy="306"
                r="44"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeDasharray="8,5"
                opacity="0.7"
              />
            )}

            {/* Steps 1-2: blue dashed arrow upward from main hall into EXIT passage */}
            {showArrowUp && (
              <path
                d="M 193 174 L 193 166"
                stroke="#2563eb"
                strokeWidth="3"
                markerEnd="url(#arrBlue)"
                strokeDasharray="5,3"
              />
            )}

            {/* Step 2 extra: green arrow from EXIT passage top → platform */}
            {activeStep === 2 && (
              <path
                d="M 193 108 L 193 88"
                stroke="#16a34a"
                strokeWidth="3"
                markerEnd="url(#arrGreen)"
                strokeDasharray="5,4"
              />
            )}

            {/* Steps 3-4: BIG red arrow pointing RIGHT along platform */}
            {showArrowRight && (
              <>
                <path
                  d="M 240 72 L 318 72"
                  stroke="#dc2626"
                  strokeWidth="6"
                  markerEnd="url(#arrRed)"
                  strokeLinecap="round"
                />
                <text
                  x="280"
                  y="62"
                  fontSize="10"
                  fill="#dc2626"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  → {activeStep === 3 ? t.step4 : t.step5}
                </text>
              </>
            )}

            {/* ── COMPASS ── */}
            <text x="515" y="360" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="bold">N</text>
            <line x1="515" y1="362" x2="515" y2="376" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="515,348 511,360 519,360" fill="#94a3b8" />
          </svg>
        </div>

        {/* ── STEPS ── */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-5">{t.steps}</h4>
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <button
                  key={index}
                  onClick={() =>
                    setActiveStep(activeStep === index ? null : index)
                  }
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                      : "bg-gray-50 text-gray-900 hover:bg-gray-100 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive ? "bg-white/20" : "bg-blue-100"
                      }`}
                    >
                      <span
                        className={`text-sm font-bold ${
                          isActive ? "text-white" : "text-blue-600"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-blue-600"
                          }`}
                        />
                        <h5 className="font-bold">{step.title}</h5>
                      </div>
                      <p
                        className={`text-sm ${
                          isActive ? "text-white/90" : "text-gray-600"
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}