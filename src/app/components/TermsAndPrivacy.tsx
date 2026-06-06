import { FileText, Shield, Cookie } from 'lucide-react';

interface TermsAndPrivacyProps {
  language: 'cs' | 'en';
  onClose: () => void;
}

export function TermsAndPrivacy({ language, onClose }: TermsAndPrivacyProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'cs' ? 'Obchodní podmínky a GDPR' : 'Terms & Conditions and GDPR'}
            </h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-8">
            {language === 'cs' ? (
              <>
                {/* Czech Version */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Zásady ochrany osobních údajů</h2>
                  </div>
                  
                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p><strong>(1) Pronajímatel:</strong> Albert Krajčovič, se sídlem Výletní 356/22, 150 00 Praha, IČ 21147167 (dále jen „LSBMTS"), a <strong>(2) Klient:</strong> Vy, tedy osoba, která je objednatelem služeb prostřednictvím internetové stránky luggagestoragebrno.cz nebo v obchodním místě LSBMTS.</p>

                    <p>Webová stránka <a href="https://luggagestoragebrno.cz/" className="text-blue-600 hover:underline">https://luggagestoragebrno.cz/</a> a stránka <a href="https://luggagestoragebrno-booking.cz/" className="text-blue-600 hover:underline">https://luggagestoragebrno-booking.cz/</a> (dále jen „Stránka") je provozována především za účelem zprostředkování online rezervace pronájmu samoobslužné úschovny zavazadel (dále jen „služby"). To se sebou jako svou nutnou součást nese i práci s osobními údaji. Protože chceme, abyste byli co nejlépe informováni o tom, co s takto shromážděnými osobními údajůmy děláme, sepsali jsme pro vás tyto Zásady ochrany osobních údajů, a to v souladu s nařízením Evropského parlamentu a Rady (EU) č. 2016/679, o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (dále jen „GDPR").</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">V Zásadách ochrany osobních údajů se dozvíte zejména:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Jaké informace shromažďujeme a z jakého důvodu.</li>
                      <li>Jakým způsobem tyto informace využíváme.</li>
                      <li>Jaká jsou vaše práva ohledně námi využívaných osobních údajů a jak je u nás uplatnit.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-3">Informace, které o vás shromažďujeme</h3>
                    <p>V souvislosti s poskytováním služeb o vás shromažďujeme vaše jméno, e-mailovou adresu, telefonní číslo a IP adresu. Zároveň k zajištění bezpečnosti vás a vašich věcí umístěných v úschovně zavazadel uchováváme záznamy z kamer, a to po dobu 1 dne. Bez shromažďování těchto osobních údajů bychom vám nebyli schopni poskytnout veškeré poskytované služby na nejlepší úrovni, jak poskytujeme dnes.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">Jakým způsobem informace využíváme</h3>
                    <p>Osobní údaje, které shromažďujeme, využíváme především za účelem zajištění služeb vyplývajících z vaší rezervace, tedy k zasílání automaticky vygenerovaných e-mailů a SMS zpráv obsahujících detaily pronájmu včetně přístupových kódů k otevření úschovny zavazadel a dále k zajištění veškeré smluvní dokumentace v souvislosti s poskytováním služeb. Na základě vašeho souhlasu rovněž budeme osobní údaje využívat k přímému marketingu našich služeb.</p>

                    <p>Shromážděné údaje archivujeme po dobu nezbytně nutnou dle právních předpisů a v souvislosti se smluvním vztahem a případným sporem z něj vzniklým. S ohledem na to, že soudní spor může vzniknout v době 3 let od ukončení smluvního vztahu, archivujeme nashromážděné údaje po dobu 4 let. Déle smluvní údaje shromažďujeme pouze v souvislosti s plněním zákonných povinností. K dřívějšímu výmazu shromážděných údajů může dojít na základě žádosti subjektu údajů, tak jak je uvedeno níže.</p>

                    <p>Nashromážděné osobní údaje nejsou žádným způsobem bez řádného právního důvodu zpřístupňovány třetím osobám.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">Jaká máte práva a jak jich využít</h3>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Právo na zpřístupnění informací a právo na jejich opravu</h4>
                    <p>Kdykoli v budoucnu nás můžete zasláním zprávy na e-mailovou adresu brnoluggagestorage@gmail.com požádat o zaslání potvrzení, zda jsou či nejsou vaše osobní údaje zpracovávány. V případě, že vaše údaje námi budou zpracovány, můžeme vás na vaši žádost nad rámec informací poskytnutých v těchto Zásadách ochrany osobních údajů informovat i o případných třetích osobách, kterým byly nebo budou vaše osobní údaje zpřístupněny, a pokud nezískáme osobní údaje od vás, máte právo na veškeré nám dostupné informace o tom, odkud jsme vaše osobní údaje získali.</p>

                    <p>Pokud o vás budeme zpracovávat vaše osobní údaje nepřesně, můžete nás na tuto skutečnost zasláním zprávy na e-mailovou adresu brnoluggagestorage@gmail.com upozornit, my pak bez zbytečného odkladu nepřesné osobní údaje opravíme.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Právo vznést námitky proti zpracování osobních údajů</h4>
                    <p>V případě, že budeme vaše osobní údaje zpracovávat na základě našeho oprávněného zájmu, máte právo proti takovému zpracování vznést námitky, a to zasláním zprávy na e-mailovou adresu brnoluggagestorage@gmail.com. Pokud takovou námitku podáte, nebudeme moci vaše osobní údaje zpracovávat, dokud neprokážeme, jaký závažný oprávněný důvod pro zpracování máme, a že tento náš důvod převáží nad vašimi zájmy, vašimi právy a svobodami či nad výkonem nebo obhajobou právních nároků.</p>

                    <p>Pokud bychom zpracovávali vaše osobní údaje pro účely přímého marketingu (např. z důvodů zasílání obchodních sdělení), můžete vznést na výše uvedenou e-mailovou adresu námitky proti takovému zpracování, přičemž po vznesení takové námitky již nebudeme tyto údaje pro účely přímého marketingu zpracovávat.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Právo na omezení práce s osobními údaji</h4>
                    <p>Máte právo, abychom omezili jakékoli zpracování vašich osobních údajů včetně jejich vymazání:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Pokud nám dáte vědět, že jsou námi shromážděné osobní údaje nepřesné, a to až do ověření jejich správnosti.</li>
                      <li>Pokud bude zpracování vašich osobních údajů protiprávní a vy požádáte zasláním zprávy na e-mailovou adresu brnoluggagestorage@gmail.com namísto o vymazání o omezení jejich použití.</li>
                      <li>Pokud vaše osobní údaje již sice nebudeme potřebovat pro zajištění našich služeb, ale vy je budete požadovat pro určení, výkon nebo obhajobu vašich právních nároků.</li>
                      <li>Pokud vznesete námitku proti zpracování dle odstavce výše, a to do doby, než ověříme, zda naše důvody zpracování převažují nad vašimi zájmy.</li>
                    </ul>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Právo být zapomenut (právo na vymazání osobních údajů)</h4>
                    <p>V případě, že zjistíte, že zpracováváme vaše osobní údaje:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Přestože již není jejich zpracování potřebné pro účely, kvůli kterým jsme je získali.</li>
                      <li>Odvoláte souhlas s jejich zpracováním a zároveň nebude existovat žádný další důvod pro jejich zpracování (samozřejmě jen v případech, kdy zpracováváme vaše osobní údaje na základě vašeho souhlasu).</li>
                      <li>Pokud vznesete námitku podle odstavce uvedeného výše a my vám nebudeme schopni prokázat oprávněné důvody pro jejich zpracování, které převáží nad vašimi zájmy, vašimi právy a svobodami či nad výkonem nebo obhajobou právních nároků.</li>
                      <li>Neoprávněně.</li>
                    </ul>

                    <p>Máte právo na to, abychom bez zbytečného odkladu od oznámení takovýchto skutečností zasláním zprávy na e-mailovou adresu brnoluggagestorage@gmail.com takto zpracovávané osobní údaje vymazali. Údaje pak nemůžeme ani na vaši žádost vymazat, pokud bude jejich zpracování nezbytné pro výkon práva na svobodu projevu a informace, pro splnění některé naší právní povinnosti nebo pro splnění úkolu prováděného ve veřejném zájmu, či pro určení, výkon nebo obhajobu našich právních nároků.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Právo na poskytnutí údajů ve strojově čitelné formě</h4>
                    <p>Pokud nás zasláním zprávy na e-mailovou adresu brnoluggagestorage@gmail.com požádáte, abychom vám poskytli námi zpracovávané osobní údaje, zašleme vám je ve strukturovaném, běžně používaném a strojově čitelném formátu (např. formát *.pdf, nebo některý z tabulkových formátů), pokud takto údaje zpracováváme. Pokud nás požádáte, abychom vaše osobní údaje zaslali jinému správci osobních údajů, máme povinnost tak učinit, ovšem opět jen v případě, že je takto již zpracováváme.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Právo kdykoli odvolat souhlas se zasíláním obchodních sdělení</h4>
                    <p>V případě, že od nás již nebudete chtít dostávat obchodní sdělení, můžete odvolat souhlas s jejich zasíláním kdykoli i bez udání důvodů buď kliknutím na označený odkaz, který bude součástí každého obchodního sdělení, popřípadě zasláním zprávy na e-mailovou adresu brnoluggagestorage@gmail.com.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Právo podat stížnost u Úřadu na ochranu osobních údajů</h4>
                    <p>V případě, že podle vašeho názoru nenaplníme všechny naše právní povinnosti vzniklé v souvislosti se zpracováním vašich osobních údajů, můžete se obrátit na Úřad pro ochranu osobních údajů, a to buď na adrese jeho sídla Pplk. Sochora 27, Praha 7, PSČ 170 00, na e-mailu posta@uoou.cz, či jakoukoli jinou cestou, kterou bude Úřad na ochranu osobních údajů akceptovat. Bližší informace o úřadu najdete na webových stránkách www.uoou.cz.</p>
                  </div>
                </section>

                {/* Cookies Section */}
                <section className="border-t pt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Cookie className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Zásady užívání tzv. cookies</h2>
                  </div>

                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p>Na internetové stránce <a href="https://luggagestoragebrno.cz/" className="text-blue-600 hover:underline">https://luggagestoragebrno.cz/</a> (dále jen „Stránka") užíváme tzv. soubory cookies. Tímto a Zásadami ochrany osobních údajů o tom plníme naši informační povinnost v souladu s nařízením Evropského parlamentu a Rady (EU) č. 2016/679, o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (dále jen „GDPR").</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">Co je to cookies?</h3>
                    <p>Cookies jsou malé textové soubory, které mohou být používány webovými stránkami, aby učinily uživatelský zážitek více efektivní. Cookies neznamenají žádné nebezpečí pro počítač jako takový. Přesto mají cookies význam pro ochranu soukromí. Navštívený web si totiž může ukládat do cookies informace, které o návštěvníkovi zjistí a může tak postupně zjišťovat zájmy konkrétního návštěvníka.</p>

                    <p>Právní normy uvádí, že můžeme ukládat cookies na vašem zařízení, pokud jsou nezbytně nutné pro provoz této stránky. Pro všechny ostatní typy cookies potřebujeme váš souhlas. Stránky používají různé typy cookies. Některé cookies jsou umístěny službami třetích stran, které se na nich objevují.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">Jak cookies používáme?</h3>
                    
                    <h4 className="text-lg font-semibold mt-4 mb-2">Nutné</h4>
                    <p>Nutné cookies pomáhají, aby byla webová stránka použitelná tak, že umožní fungování jejich základních vlastností jako navigace stránky a přístup k zabezpečeným sekcím webové stránky. Webová stránka nemůže bez těchto cookies správně fungovat.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Statistické aj.</h4>
                    <p>Statistické cookies pomáhají majitelům webových stránek, aby porozuměli, jak návštěvníci používají webové stránky. Anonymně sbírají a sdělují informace. Jiné cookies pak mohou pomoci, aby si webová stránka zapamatovala informace, které mění, jak se webová stránka chová nebo jak vypadá či zobrazit sdělení, které je relevantní a zajímavé pro jednotlivého uživatele.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Souhlas s ukládáním cookies</h4>
                    <p>Většina prohlížečů cookies automaticky akceptuje, pokud není prohlížeč nastaven jinak. Svým nastavením prohlížeče a používáním Stránek výslovně souhlasíte s ukládáním nejen nutných souborů cookies.</p>

                    <p>Použití takových cookies můžete kdykoli omezit nebo zablokovat v nastavení svého webového prohlížeče dle vaší libosti. Informace o nastavení konkrétního prohlížeče naleznete na těchto uvedených adresách:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Chrome: support.google.com</li>
                      <li>Opera: help.opera.com</li>
                      <li>Firefox: support.mozilla.org</li>
                      <li>MSIE: windows.microsoft.com</li>
                      <li>Safari: support.apple.com</li>
                    </ul>

                    <p>Cookies budeme ze Stránek automaticky mazat nejpozději do 13 měsíců od jejich posledního využití.</p>
                  </div>
                </section>

                {/* Terms and Conditions */}
                <section className="border-t pt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Obchodní podmínky upravující pronájem skříněk k uložení věcí</h2>
                  </div>

                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p><strong>(1) Pronajímatel:</strong> Albert Krajčovič, se sídlem Výletní 356/22, 150 00 Praha, IČ 21147167 (dále jen „LSBMTS"), a <strong>(2) Klient:</strong> Vy, tedy osoba, která je objednatelem služeb prostřednictvím internetové stránky luggagestoragebrno.cz nebo v obchodním místě LSBMTS.</p>

                    <p>Tyto obchodní podmínky se především řídí zákonem č. 89/2012 Sb., občanský zákoník, v účinném znění (dále jen „občanský zákoník").</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">Úvodní ustanovení</h3>
                    <p>"Luggage Storage Brno Main Train Station", dále jen "LSBMTS" je název značky vlastněné a spravované Albertem Krajčovičem. LSBMTS prostřednictvím obchodního místa LSBMTS a speciálně vyvinutých internetových stránek "luggagestoragebrno.cz" poskytuje službu pronájmu skříněk. Následující „Všeobecné obchodní podmínky" regulují vztah mezi LSBMTS a Klientem.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">1. Definice</h3>
                    <p>Následující definice se aplikují na obchodní podmínky stanovené níže a regulují pronájem skříněk poskytovaný LSBMTS.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>"luggagestoragebrno.cz"</strong> je název speciálně vyvinutých internetových stránek, vlastněných a spravovaných LSBMTS.</li>
                      <li><strong>"Platba"</strong> je částka zaplacená Klientem ve prospěch LSBMTS, stanovená na základě délky pronájmu a rozměru skříňky.</li>
                      <li><strong>"Zakázané předměty"</strong> jsou všechny věci a materiály, jejichž přeprava je zakázána jakýmkoli zákonem, pravidlem či regulací.</li>
                      <li><strong>"Služba"</strong> je služba pronájmu skříněk poskytovaná LSBMTS Klientovi prostřednictvím internetových stránek luggagestoragebrno.cz nebo v obchodním místě LSBMTS.</li>
                      <li><strong>"Klient"</strong> je osoba používající Službu pronájmu skříněk prostřednictvím internetových stránek luggagestoragebrno.cz nebo v obchodním místě LSBMTS. Používáním Služby Klient s obchodními podmínkami souhlasí a tyto akceptuje.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-3">2. Obchodování prostřednictvím internetových stránek</h3>
                    <p>2.1. LSBMTS poskytuje Službu on-line rezervace pronájmu skříněk Klientovi prostřednictvím speciálně vyvinutých internetových stránek luggagestoragebrno.cz.</p>
                    <p>2.2. LSBMTS poskytuje Službu pronájmu skříněk v obchodním místě LSBMTS.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">3. Použití Služby</h3>
                    <p>3.1. Obchodní místo LSBMTS je otevřeno od 07:30 hod. do 18:00 hod., 7 dní v týdnu, 365 dnů v roce. Nelze uložit nebo vyzvednout předměty v čase mezi 18:01 hodinou večerní a 07:29 hodinou ranní. Obchodní místo LSBMTS je přísně nekuřácké a každý návštěvník je povinen se řídit řádem čekárny, který je zveřejněn ve fyzické podobě v místě čekárny, potažmo je pak povinen vyhledat tento řád na stránkách provozovatele čekárny.</p>

                    <p>3.2. Obchodní místo LSBMTS je vybaveno 24 hodinovým video-kamerovým systémem napojeným na centrální kontrolní systém a soukromý dohled. Zákazník LSBMTS je povinen se řídit případnými pokyny pracovníky ostrahy M2C, která má na starosti bezpečnost prostoru.</p>

                    <p>3.3. Prostřednictvím internetových stránek luggagestoragebrno.cz lze skříňku zarezervovat 24 hodin denně, 7 dní v týdnu, 365 dnů v roce. Objednávky provedené prostřednictvím internetových stránek luggagestoragebrno.cz v čase mimo otevírací dobu obchodního místa LSBMTS mohou být použity pouze během otevíracích hodin následující den po provedení rezervace.</p>

                    <p>3.4. Klient bere na vědomí, že internetové stránky luggagestoragebrno.cz mohou mít čas od času výpadek připojení k síti z důvodu správy a aktualizace systému. V tomto případě je povinen neprodleně kontaktovat odpovědnou osobu a o tomto stavu věci jej informovat, poté odpovědná osoba bude postupovat podle interních předpisů a pokusí se pragmatickými prostředky, kromě vyloženě rozbití skříňky, zákazníkovi umožní přistup do skříňky.</p>

                    <p>3.5. Klient potvrzuje, že je právně způsobilý používat Službu poskytovanou LSBMTS.</p>

                    <p>3.6. Klient odpovídá za poskytnuté údaje a zavazuje se zkontrolovat správnost jím poskytnutých údajů, zejména e-mailové adresy a čísla mobilního telefonu (kód státu a číslo). E-mailová zpráva a sms zpráva potvrzující rezervaci a obsahující přístupový kód nezbytný pro otevření skříňky Klientem, jsou zaslány Klientovi ihned po provedení Platby. Nejsou akceptovány žádné stížnosti na neobdržení e-mailové zprávy a sms zprávy potvrzující rezervaci ani není vrácena Klientem provedena Platba v případech, kdy Klient poskytl chybné údaje. V případě chyby na straně provozovatele služby je zákazník oprávněn požadovat tzv. refund podle aktuálních interních předpisů, které jsou dostupné po vyžádání na emailové adrese, která je kontaktní.</p>

                    <p>3.7. LSBMTS v žádném případě neodpovídá za informace poskytnuté Klientem, které mohou být falešné a smyšlené, dále LSBMTS nemá možnost kontrolovat správnost informací.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">3.8. Objednávky prostřednictvím internetových stránek a v obchodním místě LSBMTS:</h4>
                    <p>3.8.1. Klient prostřednictvím internetových stránek luggagestoragebrno.cz a v obchodním místě LSBMTS vybírá časové období pronájmu skříňky, a proto je osobně odpovědný za to, že si je vědom otevíracích hodin obchodního místa LSBMTS.</p>

                    <p>3.8.2. V případě, že Klient nedorazí k pronajaté skříňce včas, ale dostaví se až po uplynutí sjednané doby pronájmu, je Klient povinen doplatit, kromě dlužné částky, doplatek ve výši 50 % za každou opožděnou hodinu. Po uskutečnění Platby Klient může otevřít skříňku a vyzvednout své věci.</p>

                    <p>3.8.3. Jakýkoliv předmět zanechaný ve skříňce a nevyzvednutý po uplynutí 12 hodin po skončení doby pronájmu, bude uložen na bezpečném místě na maximální dobu 5 kalendářních dnů. Klient je povinen doplatit poplatek ve výši 1500 Kč za administrativní a manipulační výdaje a poplatek za úschovu ve výši 600 Kč za každý den úschovy. LSBMTS stanoví čas pro vyzvednutí takových věcí.</p>

                    <p>3.8.4. Každá věc, která byla Klientem ve skříňce zapomenuta, a nebylo Klientem nárokováno její vrácení, bude z bezpečnostních důvodů zničena po uplynutí 5 kalendářních dnů po skončení doby pronájmu.</p>

                    <p>3.8.5. Pokud je Klientem požadována expediční služba, Klient je povinen předem uhradit veškeré náklady s ní spojené. Klient je povinen doplatit pokutu ve výši 1500Kč plus expediční výdaje v závislosti na váze, rozměrech, vzdálenosti a expediční metodě.</p>

                    <p>3.9. Platba za Služby musí být provedena přímo LSBMTS. Uskutečnění Platby je možné pouze platební kartou. Platby v hotovosti nejsou akceptovány.</p>

                    <p>3.10. Použitím platební karty Klient souhlasí s těmito obchodními podmínkami. Klient dostává účtenku za každou uskutečněnou transakci v obchodním místě LSBMTS. V případě on-line Platby se zasílá faktura na e-mailovou adresu Klienta. Provozovatel žádným způsobem neodpovídá za nakládání s účtenkou, na které je otisknuto číslo skříňky a PIN k ní. V případě ztráty a následného zneužití těchto informací má zákazník plnou odpovědnost za ztrátu účtenky a škody z toho vyplývající, i v případech tomu podobných. Zákazník je povinen účtenku uschovat pro své osobní účely a s nikým ji nesdílet.</p>

                    <p>3.11. Jakákoliv újma, zneužití nebo nesprávné zacházení učiněné ze strany Klienta ve vztahu ke skříňkám a zařízení umístěnému v obchodním místě LSBMTS jsou považovány za trestný čin a jsou řešeny právní cestou.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">4. Typy velikosti skříněk</h3>
                    <p>4.1. LSBMTS nabízí pronájem tří druhů skříněk: „malá skříňka" s šířkou 30 cm, výškou 20 cm, hloubkou 50 cm, „střední skříňka" s šířkou 50 cm, výškou 60 cm, hloubkou 60 cm, „velká skříňka" s šířkou 50 cm, výškou 60 cm, hloubkou 85 cm. Maximální váha povolená pro jednu skříňku je 20 kg.</p>

                    <p>4.2. Klient se zavazuje zkontrolovat rozměry skříňky před uskutečněním pronájmu, ujistit se, že dveře skříňky jsou bezpečně zavřeny během pronájmu, a to i po ukončení pronájmu. Klient je rovněž odpovědný za neponechání žádné věci uvnitř skříňky po ukončení pronájmu skříňky.</p>

                    <p>4.3. Za porušení povinnosti zavřít skříňku se Klient zavazuje zaplatit pokutu ve výši 600 Kč.</p>

                    <p>4.4. Klient bere na vědomí, že není dovoleno do skříněk ukládat níže uvedené předměty, a dále předměty zakázané zákonem a/nebo považované za rizikové či nebezpečné v souladu s místní legislativou a předměty, které svou podstatou nebo balením mohou způsobit újmu lidem, prostředí nebo jiným ve skříňkách uložených předmětům:</p>

                    <ul className="list-disc pl-6 space-y-2">
                      <li>4.4.1. Drahé šperky, kovy (zlato a stříbro v jakékoliv formě) a drahé kameny;</li>
                      <li>4.4.2. Cenné papíry a obchodovatelné certifikáty (směnky, papírové peníze, mince, platební karty, šeky, atd.) a jiné neobchodovatelné certifikáty;</li>
                      <li>4.4.3. Umělecká díla a starožitnosti;</li>
                      <li>4.4.4. Architektonické modely;</li>
                      <li>4.4.5. Hodinky;</li>
                      <li>4.4.6. Cenné dokumenty, veřejné nebo soukromé investiční nabídky, kolky, potravinové ceniny, palivové poukazy a palivové kupony, obligace, atd.;</li>
                      <li>4.4.7. Materiály, které mohou být považovány za pornografické nebo nemravné;</li>
                      <li>4.4.8. Zbraně (střelné zbraně, sečné a bodné zbraně);</li>
                      <li>4.4.9. Výbušné předměty a látky;</li>
                      <li>4.4.10. Hořlavé tekutiny;</li>
                      <li>4.4.11. Léky zachraňující život;</li>
                      <li>4.4.12. Květiny a zvířata, živá a mrtvá;</li>
                      <li>4.4.13. Kazící se zboží včetně jídla a odpadu;</li>
                      <li>4.4.14. Narkotické látky, drogy nebo halucinogenní látky;</li>
                      <li>4.4.15. Politicky zaměřené materiály;</li>
                      <li>4.4.16. Rizikové a nebezpečné předměty;</li>
                      <li>4.4.17. Křehké předměty, které nejsou vhodné pro úschovu spolu s ostatními zavazadly;</li>
                      <li>4.4.18. Předměty mající významnou citovou hodnotu;</li>
                      <li>4.4.19. Masivní předměty a zavazadla, která svou podstatou mohou způsobit újmu lidem a prostředí;</li>
                      <li>4.4.20. Předměty vlastněné v rozporu se zákony.</li>
                    </ul>

                    <p>4.5. LSBMTS považuje za nepřípustné ukládat do skříněk předměty, které jsou dle výhradního uvážení LSBMTS považovány za nebezpečné.</p>

                    <p>4.6. Klient zodpovídá za svoje věci a zavazadla a za jejich obsah.</p>

                    <p>4.7. Klient uznává a souhlasí, že LSBMTS a jakékoliv orgány veřejné moci mohou požádat Klienta, aby otevřel svá zavazadla a předložil své věci ke kontrole za účelem ujištění se, že skříňky neobsahují Zakázané předměty.</p>

                    <p>4.8. LSBMTS nenese žádnou odpovědnost za poškození nebo ztrátu předmětů dle čl. 4.2 nebo v souladu s čl. 4.3, které jsou ve výhradní zodpovědnosti Klienta.</p>

                    <p>4.9. LSBMTS v žádném případě nenese odpovědnost za jakoukoli nedbalost ze strany Klienta.</p>

                    <p>4.10. Pokud LSBMTS zjistí, že jakákoliv skříňka obsahuje předměty uvedené v čl. 4.4, v závislosti na povaze předmětu LSBMTS má právo zničit nebo odstranit ze skříňky takový předmět, předat ho Policii nebo jinému příslušnému orgánu, zajistit vhodnou úschovu na náklady Klienta anebo v každém případě uskutečnit nezbytné zásahy.</p>

                    <p>4.11. LSBMTS neodpovídá za činy dle čl. 4.6 a Klient je povinen uhradit vzniklé náklady způsobené LSBMTS.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">5. Ohraničení právní odpovědnosti</h3>
                    <p>5.1. LSBMTS je zproštěna od jakýchkoli nároků ve vztahu k cenným předmětům obsaženým ve věcech Klienta. Nadto LSBMTS v žádném případě nenese odpovědnost za expediční výdaje.</p>

                    <p>5.2. Každá jedna skříňka je pojištěná do maximální výše 5.000 Kč vč. DPH a vč. ceny samotného zavazadla.</p>

                    <p>5.3. LSBMTS nevzniká žádná odpovědnost v případě zmeškání otevírací doby obchodního místa LSBMTS a z toho vyplývajícího opoždění a/nebo nevyzkednutí věcí/zavazadel ze skříněk. LSBMTS v žádném případě neodpovídá za řádně a úplně prokázanou újmu, která může být považována za přímý a předvídatelný nebo nepřímý důsledek opoždění a/nebo neúspěch vyzkednout věc uloženou ve skříňce.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">6. Odstoupení nebo storno</h3>
                    <p>6.1. Klient bere na vědomí, že nemá možnost odstoupit od nájemní smlouvy dle § 1837 písm. j) zákona č. 89/2012 Sb., občanský zákoník ve znění pozdějších předpisů, jejíž součástí jsou tyto obchodní podmínky.</p>

                    <p>6.2. V případě storna ze strany Klienta se neposkytuje žádná náhrada.</p>

                    <p>6.3. Nákupy prostřednictvím internetových stránek luggagestoragebrno.cz a v obchodním místě LSBMTS se řídí Spotřebitelským právem České republiky.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">11. Aplikovatelné právo a příslušný soud</h3>
                    <p>11.1. Nákup Služby prostřednictvím internetových stránek luggagestoragebrno.cz nebo v obchodním místě LSBMTS se řídí českým právem.</p>

                    <p>11.2. Jakýkoliv spor, který nemůže být vyřešen mezi LSBMTS a Klientem, se řeší českými soudy.</p>

                    <p>11.3. K mimosoudnímu řešení spotřebitelských sporů z uzav��ené smlouvy je příslušná Česká obchodní inspekce, se sídlem Štěpánská 567/15, 120 00 Praha 2, IČ: 000 20 869, internetová adresa: <a href="http://www.coi.cz" className="text-blue-600 hover:underline">http://www.coi.cz</a>.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">12. Závěrečná ustanovení</h3>
                    <p>12.1. Pokud vztah založený touto smlouvou obsahuje mezinárodní (zahraniční) prvek, pak strany sjednávají, že vztah se řídí českým právem. Tímto nejsou dotčena práva spotřebitele vyplývající z obecně závazných právních předpisů.</p>

                    <p>12.2. Je-li některé ustanovení obchodních podmínek neplatné nebo neúčinné, nebo se takovým stane, namísto neplatných ustanovení nastoupí ustanovení, jehož smysl se neplatnému ustanovení co nejvíce přibližuje. Neplatností nebo neúčinností jednoho ustanovení není dotknutá platnost ostatních ustanovení.</p>

                    <p>12.3. Kontaktní údaje LSBMTS: adresa pro doručování Výletní 356/22, 150 00 Praha, adresa elektronické pošty <a href="mailto:brnoluggage@gmail.com" className="text-blue-600 hover:underline">brnoluggage@gmail.com</a>, telefon <a href="tel:+420608313122" className="text-blue-600 hover:underline">+420 608 313 122</a>.</p>

                    <p>12.4. Tyto obchodní podmínky nabývají účinnosti dne 1.11.2025.</p>
                  </div>
                </section>
              </>
            ) : (
              <>
                {/* English Version */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
                  </div>
                  
                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p><strong>(1) Lessor:</strong> Albert Krajčovič, with registered office at Výletní 356/22, 150 00 Prague, ID No. 21147167 (hereinafter referred to as "LSBMTS"), and <strong>(2) Client:</strong> You, i.e., the person ordering services through the website luggagestoragebrno.cz or at the LSBMTS business premises.</p>

                    <p>The website <a href="https://luggagestoragebrno.cz/" className="text-blue-600 hover:underline">https://luggagestoragebrno.cz/</a> and the website <a href="https://luggagestoragebrno-booking.cz/" className="text-blue-600 hover:underline">https://luggagestoragebrno-booking.cz/</a> (hereinafter referred to as the "Website") is operated primarily for the purpose of facilitating online reservations for the rental of self-service luggage storage (hereinafter referred to as "services"). This inherently involves handling personal data. To ensure you are as informed as possible about what we do with the personal data collected, we have drafted this Privacy Policy in accordance with Regulation (EU) No. 2016/679 of the European Parliament and of the Council on the protection of natural persons with regard to the processing of personal data (hereinafter referred to as "GDPR").</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">In this Privacy Policy, you will learn in particular:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>What information we collect and why.</li>
                      <li>How we use this information.</li>
                      <li>What your rights are regarding the personal data we use and how to exercise them with us.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-3">Information we collect about you</h3>
                    <p>In connection with providing services, we collect your name, email address, phone number, and IP address. Additionally, to ensure the security of you and your items placed in the luggage storage, we retain camera recordings for a period of 1 day. Without collecting this personal data, we would not be able to provide all the services at the high level we offer today.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">How we use the information</h3>
                    <p>The personal data we collect is primarily used to ensure the services arising from your reservation, i.e., sending automatically generated emails and SMS messages containing rental details, including access codes to open the luggage storage, and to ensure all contractual documentation related to the provision of services. With your consent, we will also use personal data for direct marketing of our services.</p>

                    <p>The collected data is archived for the period necessary under legal regulations and in connection with the contractual relationship and any disputes arising from it. Considering that a legal dispute may arise within 3 years of the termination of the contractual relationship, we archive the collected data for a period of 4 years. Contractual data is retained longer only in connection with fulfilling legal obligations. Earlier deletion of collected data may occur based on a request from the data subject, as outlined below.</p>

                    <p>The collected personal data is not disclosed to third parties in any way without a proper legal basis.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">What rights you have and how to exercise them</h3>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Right to access information and right to correction</h4>
                    <p>At any time in the future, you can request confirmation by sending a message to the email address <a href="mailto:brnoluggagestorage@gmail.com" className="text-blue-600 hover:underline">brnoluggagestorage@gmail.com</a> as to whether or not your personal data is being processed. If your data is being processed by us, upon your request, we can provide information beyond what is stated in this Privacy Policy about any third parties to whom your personal data has been or will be disclosed, and if we did not obtain the personal data from you, you have the right to all available information about where we obtained your personal data.</p>

                    <p>If we process your personal data inaccurately, you can notify us of this fact by sending a message to the email address <a href="mailto:brnoluggagestorage@gmail.com" className="text-blue-600 hover:underline">brnoluggagestorage@gmail.com</a>, and we will promptly correct the inaccurate personal data.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Right to object to the processing of personal data</h4>
                    <p>If we process your personal data based on our legitimate interest, you have the right to object to such processing by sending a message to the email address <a href="mailto:brnoluggagestorage@gmail.com" className="text-blue-600 hover:underline">brnoluggagestorage@gmail.com</a>. If you file such an objection, we will not be able to process your personal data until we demonstrate a compelling legitimate reason for processing that outweighs your interests, rights, and freedoms or the exercise or defense of legal claims.</p>

                    <p>If we process your personal data for direct marketing purposes (e.g., for sending commercial communications), you can object to such processing by sending a message to the above email address, and upon filing such an objection, we will no longer process this data for direct marketing purposes.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Right to restrict the processing of personal data</h4>
                    <p>You have the right to request that we restrict any processing of your personal data, including its deletion:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>If you inform us that the collected personal data is inaccurate, until its accuracy is verified.</li>
                      <li>If the processing of your personal data is unlawful, and you request restriction of its use instead of deletion by sending a message to the email address <a href="mailto:brnoluggagestorage@gmail.com" className="text-blue-600 hover:underline">brnoluggagestorage@gmail.com</a>.</li>
                      <li>If we no longer need your personal data for the provision of our services, but you require it for the establishment, exercise, or defense of your legal claims.</li>
                      <li>If you object to the processing as per the paragraph above, until we verify whether our reasons for processing outweigh your interests.</li>
                    </ul>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Right to be forgotten (right to erasure of personal data)</h4>
                    <p>If you find that we are processing your personal data even though their processing is no longer necessary for the purposes for which we obtained them, you withdraw your consent to their processing (naturally, only in cases where we process your personal data based on your consent), if you object to the processing and we are unable to demonstrate legitimate reasons, or if processing is unlawful, you have the right to have such processed personal data erased without undue delay upon notification by sending a message to the email address <a href="mailto:brnoluggagestorage@gmail.com" className="text-blue-600 hover:underline">brnoluggagestorage@gmail.com</a>.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Right to receive data in a machine-readable format</h4>
                    <p>If you request by sending a message to the email address <a href="mailto:brnoluggagestorage@gmail.com" className="text-blue-600 hover:underline">brnoluggagestorage@gmail.com</a> that we provide you with the personal data we process, we will send it to you in a structured, commonly used, and machine-readable format (e.g., *.pdf format or another tabular format), if we process the data in such a way.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Right to withdraw consent to receiving commercial communications at any time</h4>
                    <p>If you no longer wish to receive commercial communications from us, you can withdraw your consent to their receipt at any time, without stating reasons, either by clicking on the designated link included in each commercial communication or by sending a message to the email address <a href="mailto:brnoluggagestorage@gmail.com" className="text-blue-600 hover:underline">brnoluggagestorage@gmail.com</a>.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Right to lodge a complaint with the Data Protection Authority</h4>
                    <p>If, in your opinion, we fail to fulfill all our legal obligations related to the processing of your personal data, you can contact the Office for Personal Data Protection, either at its registered office at Pplk. Sochora 27, Prague 7, 170 00, via email at <a href="mailto:posta@uoou.cz" className="text-blue-600 hover:underline">posta@uoou.cz</a>, or by any other means accepted by the Office for Personal Data Protection. More information about the office can be found on the website <a href="http://www.uoou.cz" className="text-blue-600 hover:underline">www.uoou.cz</a>.</p>
                  </div>
                </section>

                {/* Cookie Policy */}
                <section className="border-t pt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Cookie className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Cookie Policy</h2>
                  </div>

                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p>The website <a href="https://luggagestoragebrno.cz/" className="text-blue-600 hover:underline">https://luggagestoragebrno.cz/</a> (hereinafter referred to as the "Website") uses so-called cookies. Through this and the Privacy Policy, we fulfill our information obligation in accordance with Regulation (EU) No. 2016/679 of the European Parliament and of the Council on the protection of natural persons with regard to the processing of personal data (hereinafter referred to as "GDPR").</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">What are cookies?</h3>
                    <p>Cookies are small text files that can be used by websites to make the user experience more efficient. Cookies pose no danger to the computer itself. However, cookies are significant for privacy protection, as the visited website can store information about the visitor in cookies and can gradually learn about the specific visitor's interests.</p>

                    <p>Legal regulations state that we may store cookies on your device if they are strictly necessary for the operation of this Website. For all other types of cookies, we need your consent. The Website uses different types of cookies. Some cookies are placed by third-party services that appear on the Website.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">How we use cookies</h3>
                    
                    <h4 className="text-lg font-semibold mt-4 mb-2">Necessary</h4>
                    <p>Necessary cookies help make the Website usable by enabling its basic functions, such as page navigation and access to secure sections of the Website. The Website cannot function properly without these cookies.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Statistical and others</h4>
                    <p>Statistical cookies help website owners understand how visitors use the Website. They anonymously collect and share information. Other cookies may help the Website remember information that changes how the Website behaves or looks or display messages that are relevant and interesting to the individual user.</p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Consent to storing cookies</h4>
                    <p>Most browsers automatically accept cookies unless the browser is set otherwise. By setting your browser and using the Website, you expressly consent to the storage of not only necessary cookies.</p>

                    <p>You can restrict or block the use of such cookies at any time in your web browser settings at your discretion. Information about the settings of a specific browser can be found at the following addresses:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Chrome: support.google.com</li>
                      <li>Opera: help.opera.com</li>
                      <li>Firefox: support.mozilla.org</li>
                      <li>MSIE: windows.microsoft.com</li>
                      <li>Safari: support.apple.com</li>
                    </ul>

                    <p>Cookies will be automatically deleted from the Website no later than 13 months from their last use.</p>
                  </div>
                </section>

                {/* Terms and Conditions */}
                <section className="border-t pt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Terms and Conditions Governing the Rental of Lockers</h2>
                  </div>

                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p><strong>(1) Lessor:</strong> Albert Krajčovič, with registered office at Výletní 356/22, 150 00 Prague, ID No. 21147167 (hereinafter referred to as "LSBMTS"), and <strong>(2) Client:</strong> You, i.e., the person ordering services through the website luggagestoragebrno.cz or at the LSBMTS business premises.</p>

                    <p>These Terms and Conditions are primarily governed by Act No. 89/2012 Coll., the Civil Code, as amended (hereinafter referred to as the "Civil Code").</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">Introductory Provisions</h3>
                    <p>"Luggage Storage Brno Main Train Station" (LSBMTS) is the brand name owned and managed by Albert Krajčovič. LSBMTS provides locker rental services through the LSBMTS business premises and the specially developed website "luggagestoragebrno.cz". The following "General Terms and Conditions" regulate the relationship between LSBMTS and the Client.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">1. Definitions</h3>
                    <p>The following definitions apply to the Terms and Conditions set out below and govern the locker rental service provided by LSBMTS.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>"luggagestoragebrno.cz"</strong> is the name of the specially developed website owned and managed by LSBMTS.</li>
                      <li><strong>"Payment"</strong> is the amount paid by the Client to LSBMTS, determined based on the rental duration and locker size.</li>
                      <li><strong>"Prohibited Items"</strong> are all items and materials whose transport is prohibited by any law, rule, or regulation.</li>
                      <li><strong>"Service"</strong> is the locker rental service provided by LSBMTS to the Client through the website luggagestoragebrno.cz or at the LSBMTS business premises.</li>
                      <li><strong>"Client"</strong> is the person using the locker rental Service through the website luggagestoragebrno.cz or at the LSBMTS business premises. By using the Service, the Client agrees to and accepts these Terms and Conditions.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-3">2. Transactions via the website</h3>
                    <p>2.1. LSBMTS provides the Service of online locker rental reservations to the Client through the specially developed website luggagestoragebrno.cz.</p>
                    <p>2.2. LSBMTS provides the locker rental Service at the LSBMTS business premises.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">3. Use of the Service</h3>
                    <p>3.1. The LSBMTS business premises are open from 07:30 to 18:00, 7 days a week, 365 days a year. Items cannot be stored or retrieved between 18:01 and 07:29. The LSBMTS business premises are strictly non-smoking.</p>

                    <p>3.2. The LSBMTS business premises are equipped with a 24-hour video surveillance system connected to a central control system and private monitoring.</p>

                    <p>3.3. Lockers can be reserved through the website luggagestoragebrno.cz 24 hours a day, 7 days a week, 365 days a year. Orders made through the website outside the opening hours can only be used during the opening hours on the following day after the reservation is made.</p>

                    <p className="font-semibold">Important details about payments, prohibited items, locker sizes, liability limitations, and other terms are detailed in the Czech version of these Terms and Conditions.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">4. Types of Locker Sizes</h3>
                    <p>4.1. LSBMTS offers the rental of three types of lockers: "small locker" (30cm×20cm×50cm), "medium locker" (50cm×60cm×60cm), "large locker" (50cm×60cm×85cm). Maximum permitted weight per locker is 20 kg.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">5. Limitation of Legal Liability</h3>
                    <p>5.2. Each locker is insured up to a maximum of CZK 5,000, including VAT and the value of the luggage itself.</p>

                    <h3 className="text-xl font-bold mt-6 mb-3">Contact Information</h3>
                    <p>LSBMTS contact details: Delivery address Výletní 356/22, 150 00 Prague, email address <a href="mailto:brnoluggage@gmail.com" className="text-blue-600 hover:underline">brnoluggage@gmail.com</a>, phone <a href="tel:+420608313122" className="text-blue-600 hover:underline">+420 608 313 122</a>.</p>

                    <p className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <strong>Note:</strong> In case of any dispute or discrepancy, the Czech version of these Terms and Conditions (VOP) shall prevail and govern the interpretation of the terms, not the English version, to avoid any misinterpretation.
                    </p>
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-8 py-6 bg-gray-50 rounded-b-2xl">
            <p className="text-center text-sm text-gray-600">
              {language === 'cs' 
                ? 'Tyto podmínky nabývají účinnosti dne 1.11.2025' 
                : 'These Terms and Conditions take effect on November 1, 2025'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
