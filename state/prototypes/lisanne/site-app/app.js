/* Gericht verder. Schets van Astra agency voor De Jong - Vanhommerig advocatuur.
   Alles draait in de browser. In de echte versie leest Claude (Amazon Bedrock, EU) de berichten
   en zet n8n de concepten in Outlook. Hier doen vaste regels hetzelfde werk, zodat de schets
   veilig te proberen is. Juridische bronnen staan in research/legal/LEGAL.md.
   Twee talen, Nederlands (standaard, wat zij ziet) en Engels (voor de demo). T(nl, en) kiest de tekst,
   LANG volgt de knop NL | EN bovenaan, ?lang=en in de link werkt ook. */
(function () {
  "use strict";

  /* ---------- kleine hulpjes ---------- */
  const $ = (s, el) => (el || document).querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  /* ---------- taal ---------- */
  const LKEY = "gericht-verder-lang";
  let LANG = "nl";
  try {
    const q = new URLSearchParams(location.search).get("lang"), sv = localStorage.getItem(LKEY);
    LANG = q === "en" || q === "nl" ? q : sv === "en" ? "en" : "nl";
    if (q === "en" || q === "nl") localStorage.setItem(LKEY, LANG);
  } catch (e) { /* geen opslag, dan Nederlands */ }
  const T = (nl, en) => (LANG === "en" ? en : nl);
  const withLang = (l, fn) => { const o = LANG; LANG = l; try { return fn(); } finally { LANG = o; } };
  const MNS = { nl: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"], en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] };
  const DNS = { nl: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"], en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] };
  const mn = () => MNS[LANG], dn = () => DNS[LANG];
  /* de engine leest berichten in beide talen */
  const MONTHS = { januari: 0, jan: 0, februari: 1, feb: 1, maart: 2, mrt: 2, april: 3, apr: 3, mei: 4, juni: 5, jun: 5, juli: 6, jul: 6, augustus: 7, aug: 7, september: 8, sept: 8, sep: 8, oktober: 9, okt: 9, november: 10, nov: 10, december: 11, dec: 11,
    january: 0, february: 1, march: 2, mar: 2, may: 4, june: 5, july: 6, august: 7, october: 9, oct: 9 };
  const D = (y, m, d) => new Date(y, m, d, 12);
  const today = () => { const n = new Date(); return D(n.getFullYear(), n.getMonth(), n.getDate()); };
  const addDays = (d, n) => D(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const addMonths = (d, n) => { const y = d.getFullYear(), m = d.getMonth() + n, day = d.getDate(); const last = new Date(y, m + 1, 0, 12).getDate(); return D(y, m, Math.min(day, last)); };
  const days = (a, b) => Math.round((b - a) / 864e5);
  const fmt = d => d.getDate() + " " + mn()[d.getMonth()] + " " + d.getFullYear();
  const fmtNY = d => d.getDate() + " " + mn()[d.getMonth()];
  const fmtS = d => d.getDate() + " " + mn()[d.getMonth()].slice(0, 3);
  const fmtL = d => dn()[d.getDay()] + " " + fmt(d);
  const fmtNum = d => String(d.getDate()).padStart(2, "0") + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + d.getFullYear();
  const hhmm = t => { const d = new Date(t); return String(d.getHours()).padStart(2, "0") + "." + String(d.getMinutes()).padStart(2, "0"); };
  const whenTxt = t => { const d = new Date(t), t0 = today(); const dd = days(D(d.getFullYear(), d.getMonth(), d.getDate()), t0); return dd === 0 ? T("vandaag ", "today ") + hhmm(t) : dd === 1 ? T("gisteren ", "yesterday ") + hhmm(t) : fmtS(d) + " " + hhmm(t); };
  const toISO = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const fromISO = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); return m ? D(+m[1], +m[2] - 1, +m[3]) : null; };
  const revive = d => (d instanceof Date ? d : fromISO(d));
  const leftChip = d => { const n = days(today(), d); if (n < 0) return `<span class="left gone">${-n} ${T("dagen geleden", "days ago")}</span>`; if (n === 0) return `<span class="left soon">${T("vandaag", "today")}</span>`; if (n <= 14) return `<span class="left soon">${T("nog " + n + " dagen", n + " days left")}</span>`; return `<span class="left ok">${T("nog " + n + " dagen", n + " days left")}</span>`; };
  const icon = {
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13h5l2 3h4l2-3h5"/><path d="M5 5h14l2 8v6H3v-6z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1c.6.5 1.3.9 2 1.2L10 21h4l.5-2.6c.7-.3 1.4-.7 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/></svg>',
    door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M14 4h5v16h-5M10 8l-4 4 4 4M6 12h10"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>'
  };

  /* ---------- opslag, alleen op dit apparaat ---------- */
  const KEY = "gericht-verder-v1";
  const store = {
    load() { try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; } },
    save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* privé venster, dan alleen in geheugen */ } }
  };

  /* ---------- het stappenplan van UWV, research/legal/LEGAL.md ---------- */
  const POORT = [
    { week: 1, off: 0, nl: { title: "Ziekmelding", text: "Je meldt je zo snel mogelijk ziek bij je werkgever.", ask: "" }, en: { title: "Reporting sick", text: "You report sick to your employer as soon as possible.", ask: "" } },
    { week: 6, off: 41, nl: { title: "Probleemanalyse", text: "Je hebt een gesprek met de bedrijfsarts of arbodienst. Die stelt vast wat je nog wel kunt en wat niet.", ask: "Vraag om een kopie van de probleemanalyse en vraag wat het advies betekent voor je werk." }, en: { title: "Problem analysis", text: "You meet the company doctor or the occupational health service. They work out what you can still do and what you can't.", ask: "Ask for a copy of the problem analysis and ask what the advice means for your work." } },
    { week: 8, off: 55, nl: { title: "Plan van aanpak", text: "Uiterlijk in week 8 maken jij en je werkgever samen het plan van aanpak. Daarin staat wat jullie gaan doen aan je re-integratie.", ask: "Lees het plan rustig voor je tekent, en vraag wanneer jullie het samen weer bekijken." }, en: { title: "Plan of action", text: "By week 8 at the latest, you and your employer draw up the plan of action together. It sets out what you will both do for your reintegration.", ask: "Read the plan calmly before you sign, and ask when you will review it together." } },
    { week: 42, off: 294, nl: { title: "42e-weeksmelding", text: "Je werkgever meldt bij UWV dat je langdurig ziek bent, uiterlijk op de eerste werkdag na week 42.", ask: "Vraag je werkgever of de melding bij UWV is gedaan." }, en: { title: "UWV notification", text: "Your employer tells UWV that you are ill long term, on the first working day after week 42 at the latest.", ask: "Ask your employer whether UWV has been notified." } },
    { week: 52, off: 363, nl: { title: "Eerstejaarsevaluatie", text: "Jij en je werkgever kijken samen terug op het eerste jaar van je re-integratie.", ask: "Zorg dat jouw kijk op het afgelopen jaar er ook in staat." }, en: { title: "First year evaluation", text: "You and your employer look back together on the first year of your reintegration.", ask: "Make sure your view of the past year is in it too." } },
    { week: 88, off: 609, nl: { title: "Brief van UWV over de WIA", short: "Brief UWV over WIA", text: "Je krijgt een brief van UWV. Daarin staat wat je moet doen om straks een WIA-uitkering te krijgen.", ask: "" }, en: { title: "Letter from UWV about the WIA", short: "UWV letter on WIA", text: "You get a letter from UWV. It says what you need to do to receive a WIA benefit later.", ask: "" } },
    { week: 91, off: 630, nl: { title: "Eindevaluatie", text: "Jij en je werkgever geven aan hoe de re-integratie is gegaan.", ask: "" }, en: { title: "Final evaluation", text: "You and your employer say how the reintegration went.", ask: "" } },
    { week: 93, off: 650, nl: { title: "WIA-aanvraag", text: "Uiterlijk in week 93 vraag je de WIA-uitkering aan.", ask: "" }, en: { title: "WIA application", text: "By week 93 at the latest you apply for the WIA benefit.", ask: "" } },
    { week: 104, off: 727, nl: { title: "Einde loondoorbetaling", text: "Je werkgever betaalt maximaal 104 weken je loon door.", ask: "" }, en: { title: "End of continued pay", text: "Your employer pays your salary for 104 weeks at most.", ask: "" } }
  ];
  const ps = s => s[LANG];
  const nextWorkday = d => { const w = d.getDay(); return w === 6 ? addDays(d, 2) : w === 0 ? addDays(d, 1) : d; };
  const poortDate = (d0, s) => (s.week === 42 ? nextWorkday(addDays(d0, s.off)) : addDays(d0, s.off));
  const weekOf = d0 => Math.floor(days(d0, today()) / 7) + 1;

  /* ---------- het lezen van een bericht ---------- */
  const RE_NUM = /\b(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4}|\d{2})\b/g;
  const RE_TXT = new RegExp("\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?(" + Object.keys(MONTHS).sort((a, b) => b.length - a.length).join("|") + ")\\.?(?:,?\\s+(\\d{4}))?\\b", "gi");
  function inferYear(m, d) { const t = today(); let c = D(t.getFullYear(), m, d); if (days(t, c) > 150) c = D(t.getFullYear() - 1, m, d); return c; }
  function sentences(text) {
    const out = []; const re = /[.!?](?=\s+[A-Z(]|\s*$)|\n+/g; let start = 0, m;
    while ((m = re.exec(text))) { const end = m.index + m[0].length; if (text.slice(start, end).trim()) out.push([start, end]); start = end; }
    if (text.slice(start).trim()) out.push([start, text.length]);
    return out;
  }
  const KINDS = [
    ["uitspraak", /\b(uitspraak|beschikking|vonnis|kantonrechter)\b|subdistrict court|\b(court ruling|ruling|judgm?ent|court order)\b/],
    ["uwv", /\buwv\b[^.]*\b(geweigerd|afgewezen|weigert|refused|rejected|denied)\b|ontslagvergunning[^.]*geweigerd|dismissal permit[^.]*(refused|rejected|denied)/],
    ["vso", /vaststellingsovereenkomst|\bvso\b|beëindigingsovereenkomst|beeindigingsovereenkomst|settlement agreement|termination agreement/],
    ["einde", /opgezegd|opzegging|ontslagen|ontslag per|laatste werkdag|uit dienst|eindigt|beëindigd|beeindigd|einde van (mijn|het) (contract|dienstverband)|op staande voet|terminat|dismiss|fired|laid off|last (working )?day|employment ends|end of (my|the) (contract|employment)|on the spot/],
    ["ziek", /\bziek|ziekgemeld|ziekmelding|uitgevallen|\bsick|off sick|\bill\b|unfit for work/]
  ];
  const KIND_TXT = () => ({ uitspraak: T("Uitspraak kantonrechter", "Ruling of the subdistrict court"), werkdag: T("Laatste werkdag", "Last working day"), uwv: T("Weigering UWV", "UWV refusal"), vso_getekend: T("Vaststellingsovereenkomst getekend", "Settlement agreement signed"), vso_aangeboden: T("Vaststellingsovereenkomst aangeboden", "Settlement agreement offered"), einde: T("Einde dienstverband", "End of employment"), ziek: T("Eerste ziektedag", "First sick day"), datum: T("Datum in het bericht", "Date in the message") });

  function findFacts(text) {
    const S = sentences(text), facts = [], seen = {};
    const push = (idx, len, date) => {
      const s = S.find(r => idx >= r[0] && idx < r[1]) || [0, text.length];
      const sent = text.slice(s[0], s[1]).trim(), low = sent.toLowerCase().replace(/[’‘]/g, "'");
      let kind = "datum";
      for (const [k, re] of KINDS) if (re.test(low)) { kind = k; break; }
      if (kind === "vso") kind = /getekend|ondertekend|gesloten|akkoord gegaan|tekende|\bsigned|concluded|agreed to|entered into/.test(low) ? "vso_getekend" : "vso_aangeboden";
      if (kind === "einde" && /laatste werkdag|last (working )?day/.test(low) && !/opgezegd|opzegging|ontslag|terminat|dismiss|fired/.test(low)) kind = "werkdag";
      const key = kind + toISO(date); if (seen[key]) return; seen[key] = 1;
      facts.push({ kind, date, quote: sent, hit: text.substr(idx, len), start: idx });
    };
    let m;
    RE_NUM.lastIndex = 0;
    while ((m = RE_NUM.exec(text))) { let y = +m[3]; if (y < 100) y += 2000; const mo = +m[2] - 1, d = +m[1]; if (mo < 0 || mo > 11 || d < 1 || d > 31) continue; push(m.index, m[0].length, D(y, mo, d)); }
    RE_TXT.lastIndex = 0;
    while ((m = RE_TXT.exec(text))) { const mo = MONTHS[m[2].toLowerCase()], d = +m[1]; if (d < 1 || d > 31) continue; push(m.index, m[0].length, m[3] ? D(+m[3], mo, d) : inferYear(mo, d)); }
    return facts.sort((a, b) => a.start - b.start);
  }

  /* Algemene termijnenwet art. 1 en 3, geldt voor wettelijke termijnen tot en met drie maanden (art. 4). */
  function easter(y) { const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1; return D(y, mo - 1, da); }
  function holiday(d) {
    const y = d.getFullYear(), e = easter(y), k = D(y, 3, 27), kd = k.getDay() === 0 ? D(y, 3, 26) : k;
    const list = [D(y, 0, 1), addDays(e, -2), addDays(e, 1), addDays(e, 39), addDays(e, 50), kd, D(y, 4, 5), D(y, 11, 25), D(y, 11, 26)];
    return list.some(x => toISO(x) === toISO(d));
  }
  function atw(d) { let x = d, n = 0; while ((x.getDay() === 6 || x.getDay() === 0 || holiday(x)) && n < 7) { x = addDays(x, 1); n++; } return x; }
  function withAtw(o) { const x = atw(o.date); if (toISO(x) !== toISO(o.date)) { o.orig = o.date; o.date = x; o.basis += T(". Eindigt op " + dn()[o.orig.getDay()] + " " + fmtNY(o.orig) + ", verlengd tot de eerstvolgende werkdag, art. 1 Algemene termijnenwet", ". Ends on " + dn()[o.orig.getDay()] + " " + fmtNY(o.orig) + ", extended to the next working day, art. 1 General Time Limits Act (Algemene termijnenwet)"); } return o; }

  function deadlinesFor(facts, text) {
    const out = []; const low = text.toLowerCase().replace(/[’‘]/g, "'");
    /* Bij een vaststellingsovereenkomst is er geen opzegging om aan te vechten, dus geen termijnen uit 7:686a lid 4. */
    const vso = facts.some(f => /^vso/.test(f.kind)) || /vaststellingsovereenkomst|beëindigingsovereenkomst|settlement agreement|termination agreement/.test(low);
    for (const f of facts) {
      if (f.kind === "vso_getekend") {
        const geen = /(niets|niet|geen)[^.]{0,50}bedenktermijn|bedenktermijn[^.]{0,30}(ontbreekt|staat er niet)|(nothing|no|not)[^.]{0,50}cooling[- ]off|cooling[- ]off[^.]{0,30}(missing|isn't|is not|not in|absent)/.test(low);
        const l = T("Bedenktermijn vaststellingsovereenkomst", "Cooling off period settlement agreement");
        out.push({ code: "vso", label: l, short: T(l, "Cooling off period"), date: addDays(f.date, geen ? 21 : 14), three: geen, basis: geen ? T("art. 7:670b lid 3 BW, drie weken omdat de bedenktermijn niet in de overeenkomst staat", "art. 7:670b(3) Civil Code (BW), three weeks because the agreement doesn't state a cooling off period") : T("art. 7:670b lid 2 BW, veertien dagen", "art. 7:670b(2) Civil Code (BW), fourteen days"), fatal: true });
      }
      if (f.kind === "einde" && !vso) {
        out.push({ code: "annul", label: T("Verzoek vernietiging opzegging, billijke vergoeding of herstel", "Request to annul the termination, for fair compensation or reinstatement"), short: T("Vernietiging opzegging", "Annul termination"), date: addMonths(f.date, 2), basis: T("art. 7:686a lid 4 sub a BW, twee maanden na het einde", "art. 7:686a(4)(a) Civil Code (BW), two months after the end"), fatal: true });
        const l = T("Verzoek transitievergoeding", "Request for transition payment");
        out.push({ code: "trans", label: l, short: T(l, "Transition payment"), date: addMonths(f.date, 3), basis: T("art. 7:686a lid 4 sub b BW, drie maanden na het einde", "art. 7:686a(4)(b) Civil Code (BW), three months after the end"), fatal: true });
      }
      if (f.kind === "uitspraak") { const l = T("Hoger beroep instellen", "File an appeal"); out.push({ code: "appeal", label: l, short: l, date: addMonths(f.date, 3), basis: T("art. 358 lid 2 Rv, drie maanden na de uitspraak", "art. 358(2) Code of Civil Procedure (Rv), three months after the ruling"), fatal: true }); }
      if (f.kind === "uwv") { const l = T("Werkgever kan ontbinding vragen na weigering UWV", "Employer may ask for dissolution after UWV refusal"); out.push({ code: "uwvd", label: l, short: l, date: addMonths(f.date, 2), basis: T("art. 7:686a lid 4 sub d BW, twee maanden na de weigering, een termijn voor de werkgever", "art. 7:686a(4)(d) Civil Code (BW), two months after the refusal, a deadline for the employer"), fatal: false }); }
      if (f.kind === "ziek") for (const s of POORT.slice(1)) { const p = ps(s); out.push({ code: "step", label: p.title + ", " + T("week ", "week ") + s.week, short: p.short || p.title, date: poortDate(f.date, s), basis: T("Stappenplan bij ziekte van UWV", "UWV step plan for illness"), fatal: false }); }
    }
    return out.map(o => (o.fatal ? withAtw(o) : o)).sort((a, b) => a.date - b.date);
  }

  const LANES = {
    reint: { re: /ziek|re-?integratie|bedrijfsarts|plan van aanpak|probleemanalyse|arbodienst|\bwia\b|loonstop|loon stop|deskundigenoordeel|\bsick|re-?integration|company doctor|occupational|plan of action|problem analysis|expert opinion/g },
    ontslag: { re: /ontslag|opzeg|vaststellingsovereenkomst|\bvso\b|transitievergoeding|beëindig|beeindig|\bww\b|staande voet|dismiss|terminat|settlement agreement|transition payment|severance|unemployment benefit|on the spot/g },
    complex: { re: /hoger beroep|beschikking|uitspraak|kantonrechter|procedure|processtuk|appeal|ruling|judgm?ent|subdistrict court|proceedings/g },
    verwijzer: { re: /verwijz|rechtsbijstand|verzekerde|dossiernummer|onze cliënt|namens|\brefer|legal aid|insured|file number|our client|on behalf of/g }
  };
  const laneName = l => ({ reint: T("Ziekte & re-integratie", "Illness & reintegration"), ontslag: T("Wijziging & beëindiging", "Change & termination"), complex: T("Complexe zaak & hoger beroep", "Complex case & appeal"), verwijzer: T("Verwijzing", "Referral") }[l]);
  const SRC = { "E-mail": ["E-mail", "Email"], Website: ["Website", "Website"], WhatsApp: ["WhatsApp", "WhatsApp"], Verwijzer: ["Verwijzer", "Referrer"], Wegwijzer: ["Wegwijzer", "Guide"] };
  const srcTxt = k => (SRC[k] ? T(SRC[k][0], SRC[k][1]) : k);
  function laneOf(text, source) {
    const low = text.toLowerCase(), sc = {};
    for (const k in LANES) sc[k] = (low.match(LANES[k].re) || []).length;
    if (source === "Verwijzer") sc.verwijzer += 3;
    let best = "ontslag", top = -1; for (const k in sc) if (sc[k] > top) { top = sc[k]; best = k; }
    const second = sc.complex > 0 && best === "verwijzer" ? "complex" : null;
    return { lane: best, second, scores: sc };
  }

  const NAME = "[A-Z][a-zà-ÿ]+(?:\\s+(?:van|de|der|den|el|ter|ten|op|da|di)?\\s*[A-Z][a-zà-ÿ'-]+){0,3}";
  function people(text) {
    const r = {}; let m;
    m = new RegExp("(?:[Gg]roet(?:en|jes)?|[Mm]vg|[Kk]ind regards|[Bb]est regards|[Bb]est wishes|[Rr]egards|[Ss]incerely|[Cc]heers|[Tt]hanks),?\\s*\\n?\\s*((?:[A-Z]\\.\\s*)*" + NAME + "|[A-Z]\\.\\s*[A-Z][a-zà-ÿ'-]+)").exec(text); if (m) r.sender = m[1].trim();
    const reC = new RegExp("(de heer|mevrouw|dhr\\.|mw\\.|\\bMr\\.?|\\bMrs\\.?|\\bMs\\.?)\\s+(" + NAME + ")", "g");
    while ((m = reC.exec(text))) { const nm = m[2].trim(); if (/jong|vanhommerig|lisanne/i.test(nm)) continue; r.client = nm; r.clientTitle = /mevrouw|mw|^ms|^mrs/i.test(m[1]) ? "f" : "m"; break; }
    if (r.sender && /jong|vanhommerig|lisanne/i.test(r.sender)) delete r.sender;
    const orgs = new Set(); const re1 = /\b([A-Z][\w&'-]+(?:\s+[A-Z][\w&'-]+){0,3})\s+(B\.V\.|BV|N\.V\.|NV|VOF|Holding|Zorggroep|Groep)\b/g;
    while ((m = re1.exec(text))) orgs.add((m[1] + " " + m[2]).replace(/\s+/g, " "));
    const re2 = /\b((?:Rechtshulp|Rechtsbijstand|Advocaten|Advocatuur)\s+[A-Z][\w-]+)/g; while ((m = re2.exec(text))) orgs.add(m[1]);
    r.orgs = [...orgs];
    return r;
  }
  const norm = s => s.toLowerCase().replace(/\b(b\.?v\.?|n\.?v\.?|vof|holding)\b/g, "").replace(/[^a-zà-ÿ0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  function conflicts(names, list) {
    list = conflictText(list);
    const rows = String(list || "").split("\n").map(l => l.split(";").map(x => x.trim())).filter(r => r[0]);
    const hits = [];
    for (const n of names) { const a = norm(n); if (a.length < 4) continue; for (const r of rows) { const b = norm(r[0]); if (b.length >= 4 && (a.includes(b) || b.includes(a))) hits.push({ name: n, as: r[1] || "", note: r[2] || "", client: /cli[eë]nt/i.test(r[1] || "") }); } }
    return { rows: rows.length, hits };
  }

  const DOCS = {
    nl: {
      reint: ["Probleemanalyse van de bedrijfsarts", "Plan van aanpak, als het er is", "Verslagen en adviezen van de bedrijfsarts", "Mail en brieven van je werkgever over je ziekte", "Je arbeidsovereenkomst en de cao", "Je laatste drie loonstroken"],
      ontslag: ["Je arbeidsovereenkomst en de cao", "{own}", "Mail en brieven van je werkgever hierover", "Je laatste drie loonstroken"],
      complex: ["De beschikking van de kantonrechter", "Het verzoekschrift en het verweerschrift", "Het proces-verbaal van de zitting", "De producties uit de eerste aanleg"],
      verwijzer: ["De beschikking van de kantonrechter", "Het verzoekschrift en het verweerschrift", "Het proces-verbaal van de zitting", "De dekkingsbevestiging"]
    },
    en: {
      reint: ["The company doctor's problem analysis", "The plan of action, if there is one", "Reports and advice from the company doctor", "Emails and letters from your employer about your illness", "Your employment contract and the collective agreement", "Your last three payslips"],
      ontslag: ["Your employment contract and the collective agreement", "{own}", "Emails and letters from your employer about this", "Your last three payslips"],
      complex: ["The decision of the subdistrict court", "The petition and the statement of defence", "The minutes of the hearing", "The productions from the first instance"],
      verwijzer: ["The decision of the subdistrict court", "The petition and the statement of defence", "The minutes of the hearing", "The coverage confirmation"]
    }
  };

  /* ---------- teksten van een aanvraag, per taal ---------- */
  /* Voorbeelden hebben twee teksten. Wat de wegwijzer maakt wordt bij het tonen opgebouwd, zodat het meeverandert. */
  function wwText(it) {
    const d0 = fromISO(it.ww.d0), w = weekOf(d0), picked = WFLAGS.filter(f => it.ww.flags.indexOf(f[0]) >= 0).map(f => T(f[1], f[2]));
    let t = T("Ingevuld in de wegwijzer re-integratie.\nEerste ziektedag ", "Filled in the reintegration guide.\nFirst sick day ") + fmt(d0) + T(", nu week ", ", now week ") + w + ".\n" + (picked.length ? T("Wat speelt er. ", "What is going on. ") + picked.join(". ") + ".\n" : "") + (it.ww.msg ? "\n" + it.ww.msg : "");
    if (it.ww.flags.indexOf("conflict") >= 0) t += T("\nEr is een conflict met mijn leidinggevende.", "\nThere is a conflict with my manager.");
    if (it.ww.flags.indexOf("pva") >= 0) t += T("\nIk heb nog geen plan van aanpak gezien.", "\nI haven't seen a plan of action yet.");
    if (it.ww.flags.indexOf("loon") >= 0) t += T("\nMijn werkgever dreigt mijn loon te stoppen.", "\nMy employer is threatening to stop my salary.");
    return t;
  }
  const txt = it => (it.ww ? wwText(it) : it.sample && LANG === "en" && it.textEn ? it.textEn : it.text || "");
  function wwFacts(it) {
    const d0 = fromISO(it.ww.d0);
    return [{ kind: "ziek", date: d0, quote: T("Eerste ziektedag ingevuld in de wegwijzer, ", "First sick day entered in the guide, ") + fmt(d0) + ".", hit: fmt(d0) }];
  }

  function analyze(item, settings) {
    const text = txt(item);
    const facts = item.ww ? wwFacts(item) : item.structured ? item.structured.facts.map(f => Object.assign({}, f, { date: revive(f.date) })) : findFacts(text);
    const dl = deadlinesFor(facts, text);
    const ln = item.ww || item.structured ? { lane: "reint", second: null } : laneOf(text, item.source);
    const ppl = people(text);
    const anon = !(item.name || ppl.sender);
    const sender = item.name || ppl.sender || T("Afzender onbekend", "Sender unknown");
    const names = [sender].concat(ppl.client ? [ppl.client] : [], ppl.orgs);
    const cf = conflicts(anon ? names.slice(1) : names, settings.conflicts);
    const low = text.toLowerCase().replace(/[’‘]/g, "'");
    const flags = [];
    const ziek = facts.find(f => f.kind === "ziek");
    if (/conflict|ruzie|leidinggevende|onenigheid|dispute|disagreement|my manager|supervisor/.test(low)) flags.push("conflict");
    if (/geen plan van aanpak|nog geen plan|plan van aanpak[^.]{0,30}(niet|nooit)|(no|haven't seen a|have not seen a|not seen a|never seen a|never received a)\s+plan of action|plan of action[^.]{0,30}(not|never)/.test(low)) flags.push("pva");
    if (/loon[^.]{0,25}(stopt|stop|stopzet|stopgezet|ingehouden|inhouden)|loonstop|(pay|salary|wages?)[^.]{0,25}(stop|stops|stopped|withheld|withhold|suspend)|(stop|withhold|suspend)[^.]{0,20}(pay|salary|wages?)/.test(low)) flags.push("loon");
    if (/(oneens|niet eens)[^.]{0,40}bedrijfsarts|bedrijfsarts[^.]{0,40}(oneens|niet eens)|(disagree|don't agree|do not agree)[^.]{0,40}(company doctor|occupational physician)|(company doctor|occupational physician)[^.]{0,40}(disagree|wrong)/.test(low)) flags.push("arts");
    if (ziek && weekOf(ziek.date) > 8 && flags.indexOf("pva") >= 0) flags.push("week8");
    const fatal = dl.filter(d => d.fatal);
    const next = fatal.filter(d => days(today(), d.date) >= 0)[0];
    const urgent = !!(next && days(today(), next.date) <= 14);
    return { facts, deadlines: dl, fatal, next, urgent, lane: ln.lane, second: ln.second, sender, anon, client: ppl.client, clientTitle: ppl.clientTitle, orgs: ppl.orgs, conflict: cf, flags, ziek };
  }
  const FLAG_TXT = () => ({ conflict: T("Ziekte en conflict lopen door elkaar", "Illness and conflict are mixed up"), pva: T("Nog geen plan van aanpak gezien", "No plan of action seen yet"), loon: T("Werkgever dreigt het loon te stoppen", "Employer threatens to stop pay"), arts: T("Twijfel over het advies van de bedrijfsarts", "Doubt about the company doctor's advice"), week8: T("Week 8 is voorbij, het plan van aanpak had er moeten zijn", "Week 8 has passed, the plan of action should exist") });

  /* ---------- concepten, door Lisanne te controleren ---------- */
  /* Bij een mogelijke treffer reageert ze nog niet inhoudelijk, maar noemt ze wel de lopende termijn, zodat iemand op tijd verder kan. */
  const purpose = c => c === "appeal" ? T("om in hoger beroep te gaan", "the deadline to appeal") : c === "vso" ? T("om de vaststellingsovereenkomst te ontbinden", "the deadline to dissolve the settlement agreement") : T("voor een verzoek bij de kantonrechter", "the deadline for a request to the subdistrict court");
  function holdLine(it, a) {
    const vz = it.source === "Verwijzer", nx = a.next;
    let t = vz ? T("Voor ik inhoudelijk reageer, controleer ik of ik deze zaak kan aannemen.", "Before I reply on the merits, I will check whether I can take on this case.") : T("Voor ik inhoudelijk reageer, controleer ik of ik je zaak kan aannemen.", "Before I reply on the merits, I will check whether I can take on your case.");
    if (nx) t += T(" Let op, er loopt een termijn " + purpose(nx.code) + " tot en met " + fmtL(nx.date) + ". ", " Please note, " + purpose(nx.code) + " runs until and including " + fmtL(nx.date) + ". ") + (vz ? T("U hoort daarom zo snel mogelijk van mij.", "You will therefore hear from me as soon as possible.") : T("Je hoort daarom zo snel mogelijk van mij, zodat je op tijd verder kunt.", "You will therefore hear from me as soon as possible, so you can act in time."));
    else t += vz ? T(" U hoort zo snel mogelijk van mij.", " You will hear from me as soon as possible.") : T(" Je hoort zo snel mogelijk van mij.", " You will hear from me as soon as possible.");
    return t;
  }
  /* Wat ze opvraagt. Bij een verwijzing niet het dossiernummer als dat al in het bericht staat. */
  function docsFor(it, a) {
    const own = a.facts.some(f => /^vso/.test(f.kind)) ? T("De vaststellingsovereenkomst", "The settlement agreement") : a.facts.some(f => f.kind === "uwv") ? T("De beslissing van UWV", "The decision of UWV") : T("De ontslagbrief", "The dismissal letter");
    const base = (DOCS[LANG][a.lane] || DOCS[LANG].ontslag).map(d => (d === "{own}" ? own : d));
    if (it.source === "Verwijzer") { if (!/dossiernummer|file number/i.test(txt(it))) base.push(T("Uw dossiernummer", "Your file number")); return base; }
    return base.concat([T("Polis van je rechtsbijstandsverzekering, als je die hebt", "The policy of your legal expenses insurance, if you have one")]);
  }
  function firstName(n) { const p = String(n || "").replace(/^(mr\.|dhr\.|mw\.|mr|mrs|ms)\s+/i, "").split(/\s+/); return /^[A-Z]\.$/.test(p[0]) ? n : p[0]; }
  function replyDraft(it, a, s) {
    const fn = firstName(a.sender), anon = a.anon, vz = it.source === "Verwijzer", wa = it.source === "WhatsApp";
    const hi = anon ? (wa ? T("Hoi,", "Hi,") : T("Goedendag,", "Hello,")) : wa ? T("Hoi ", "Hi ") + fn + "," : vz ? T("Geachte ", "Dear ") + a.sender + "," : T("Beste ", "Dear ") + fn + ",";
    const bye = T("Met vriendelijke groet,", "Kind regards,");
    const P = [hi, ""];
    if (a.conflict.hits.some(h => h.client)) {
      P.push((vz ? T("Dank u voor uw bericht. ", "Thank you for your message. ") : T("Dank je voor je bericht. ", "Thank you for your message. ")) + holdLine(it, a));
      P.push(""); P.push(bye); P.push(s.signName);
      return P.join("\n");
    }
    const org = a.orgs.find(o => !/rechtshulp|rechtsbijstand|advocat/i.test(o));
    const docs = docsFor(it, a).map(d => "• " + (LANG === "nl" ? d.charAt(0).toLowerCase() + d.slice(1) : d));
    const thanks = T("Dank je voor je bericht.", "Thank you for your message.");
    if (a.lane === "reint" && a.ziek) {
      P.push(thanks + (a.flags.indexOf("conflict") >= 0 ? T(" Vervelend dat je ziekte en het conflict nu door elkaar lopen, dat zie ik vaker.", " I'm sorry that your illness and the conflict are now mixed up, I see that often.") : ""));
      P.push("");
      let t = T("Je bent sinds " + fmtNY(a.ziek.date) + " ziek, dus nu in week " + weekOf(a.ziek.date) + ".", "You've been ill since " + fmtNY(a.ziek.date) + ", so you are now in week " + weekOf(a.ziek.date) + ".");
      if (weekOf(a.ziek.date) > 8) t += T(" Volgens het stappenplan van UWV maken jij en je werkgever uiterlijk in week 8 samen een plan van aanpak. Dat wil ik graag als eerste bekijken.", " Under the UWV step plan, you and your employer draw up a plan of action together by week 8 at the latest. I'd like to look at that first.");
      P.push(t);
      if (a.flags.indexOf("loon") >= 0) { P.push(""); P.push(T("Je schrijft dat je werkgever dreigt je loon te stoppen. Dat wil ik snel met je bespreken.", "You write that your employer is threatening to stop your pay. I'd like to discuss that with you quickly.")); }
    } else if (a.lane === "ontslag") {
      P.push(thanks);
      P.push("");
      const v = a.facts.find(f => f.kind === "vso_getekend"), e = a.facts.find(f => f.kind === "einde");
      const bt = a.deadlines.find(d => d.code === "vso");
      if (v && bt) {
        P.push(T("Je hebt de vaststellingsovereenkomst" + (org ? " met " + org : "") + " op " + fmtNY(v.date) + " getekend. " + (bt.three ? "Er staat geen bedenktermijn in, dus volgens de wet heb je drie weken om de overeenkomst schriftelijk en zonder opgaaf van redenen te ontbinden, tot en met " : "Je kunt de overeenkomst binnen veertien dagen schriftelijk en zonder opgaaf van redenen ontbinden, tot en met ") + fmtL(bt.date) + ". Laten we hem daarom snel samen doornemen.",
          "You signed the settlement agreement" + (org ? " with " + org : "") + " on " + fmtNY(v.date) + ". " + (bt.three ? "It doesn't state a cooling off period, so by law you have three weeks to dissolve the agreement in writing and without giving reasons, up to and including " : "You can dissolve the agreement within fourteen days, in writing and without giving reasons, up to and including ") + fmtL(bt.date) + ". So let's go through it together quickly."));
      } else if (e) {
        const t2 = a.deadlines.find(d => d.code === "annul"), t3 = a.deadlines.find(d => d.code === "trans");
        P.push(T("Je dienstverband" + (org ? " bij " + org : "") + " eindigde op " + fmtNY(e.date) + ". Wil je de opzegging aanvechten of een billijke vergoeding vragen, dan moet het verzoek uiterlijk " + fmtNY(t2.date) + " bij de kantonrechter liggen. Voor de transitievergoeding is dat uiterlijk " + fmtNY(t3.date) + ".",
          "Your employment" + (org ? " with " + org : "") + " ended on " + fmtNY(e.date) + ". If you want to contest the termination or ask for fair compensation, the request must reach the subdistrict court by " + fmtNY(t2.date) + " at the latest. For the transition payment that is " + fmtNY(t3.date) + "."));
      } else P.push(T("Ik kijk graag met je mee.", "I'm happy to look into this with you."));
    } else if (a.lane === "verwijzer" || a.lane === "complex") {
      const ttl = a.clientTitle === "f" ? T("mevrouw", "Ms") : T("de heer", "Mr");
      P.push(vz ? (a.client ? T("Dank u dat u " + ttl + " " + a.client + " naar mij verwijst.", "Thank you for referring " + ttl + " " + a.client + " to me.") : T("Dank u voor de verwijzing.", "Thank you for the referral.")) : thanks);
      const u = a.facts.find(f => f.kind === "uitspraak"), hb = a.deadlines.find(d => d.code === "appeal");
      if (u && hb) { P.push(""); P.push(T("De beschikking van de kantonrechter is van " + fmtNY(u.date) + ". De termijn voor hoger beroep loopt tot en met " + fmtNY(hb.date) + ".", "The decision of the subdistrict court is dated " + fmtNY(u.date) + ". The deadline to appeal runs until and including " + fmtNY(hb.date) + ".")); }
    } else { P.push(T("Dank je voor je bericht. Ik kijk graag met je mee.", "Thank you for your message. I'm happy to look into this with you.")); }
    P.push("");
    P.push(vz ? T("Ik controleer of er geen tegenstrijdig belang is en stuur u daarna een kostenbegroting. Kunt u mij intussen deze stukken sturen?", "I will check that there is no conflict of interest and then send you a cost estimate. Could you send me these documents in the meantime?") : T("Wil je me deze stukken sturen?", "Could you send me these documents?"));
    P.push(docs.join("\n"));
    P.push("");
    if (!vz) P.push(T("Daarna bel ik je om te bespreken wat je nu het beste kunt doen. Je kunt mij ook bellen op " + s.phone + ".", "After that I'll call you to discuss what you can best do now. You can also call me on " + s.phone + "."));
    if (P[P.length - 1] !== "") P.push("");
    P.push(bye);
    P.push(s.signName);
    return P.join("\n");
  }
  function letterHTML(it, a, s) {
    const who = it.source === "Verwijzer" ? (a.client || T("[naam cliënt]", "[client name]")) : (!a.anon ? a.sender : T("[naam]", "[name]"));
    const fn = firstName(who);
    const org = a.orgs.find(o => !/rechtshulp|rechtsbijstand|advocat/i.test(o));
    const u = a.facts.find(f => f.kind === "uitspraak");
    const opdr = a.lane === "reint" ? T("Bijstand bij je ziekte, je re-integratie en het conflict met je werkgever" + (org ? ", " + org : "") + ".", "Support with your illness, your reintegration and the conflict with your employer" + (org ? ", " + org : "") + ".")
      : (a.lane === "complex" || a.lane === "verwijzer") ? T("Bijstand in hoger beroep tegen de beschikking van de kantonrechter" + (u ? " van " + fmt(u.date) : "") + ".", "Support in the appeal against the decision of the subdistrict court" + (u ? " of " + fmt(u.date) : "") + ".")
      : T("Advies over en bijstand bij het einde van je arbeidsovereenkomst" + (org ? " met " + org : "") + ".", "Advice on and support with the end of your employment contract" + (org ? " with " + org : "") + ".");
    const rate = s.rate ? "€ " + esc(s.rate) : `<mark title="${T("Vul je uurtarief in bij Instellingen", "Fill in your hourly rate under Settings")}">${T("[uurtarief]", "[hourly rate]")}</mark>`;
    const vz = it.source === "Verwijzer";
    return LANG === "en" ? `<h4>Draft, not yet sent</h4>
      <p>${esc(s.place)}, ${fmt(today())}</p>
      <p>To ${esc(who)}, by email</p>
      <p>Dear ${esc(fn)},</p>
      <p>Thank you for your trust. I'm confirming the engagement you give me.</p>
      <p><span class="rl">The engagement.</span> ${esc(opdr)}</p>
      <p><span class="rl">Rate.</span> I charge an hourly rate of ${rate} excluding VAT and other costs, such as court fees. For urgent cases a surcharge of 50% applies.${vz ? " I will agree the costs with your legal expenses insurer." : ""}</p>
      <p><span class="rl">Invoices.</span> You pay invoices within 14 days.</p>
      <p><span class="rl">Terms.</span> My general terms and my firm's complaints procedure apply to this engagement. My liability is limited to the amount my professional liability insurance pays out, plus the own risk under that insurance.</p>
      <p><span class="rl">Tools.</span> To organise incoming documents, I would like to use a secure AI tool that runs inside the EU and keeps none of your data. I read and check everything myself. I only use it if you agree.</p>
      <p>Could you let me know whether you agree to this engagement confirmation, and whether I may use the AI tool? A reply to this email is enough.</p>
      <p>Kind regards,<br>${esc(s.signName)}</p>`
    : `<h4>Concept, nog niet verstuurd</h4>
      <p>${esc(s.place)}, ${fmt(today())}</p>
      <p>Aan ${esc(who)}, per e-mail</p>
      <p>Beste ${esc(fn)},</p>
      <p>Dank je voor je vertrouwen. Hierbij bevestig ik de opdracht die je mij geeft.</p>
      <p><span class="rl">De opdracht.</span> ${esc(opdr)}</p>
      <p><span class="rl">Tarief.</span> Ik reken op basis van een uurtarief van ${rate} exclusief btw en andere kosten, zoals griffierecht. Voor spoedzaken geldt een toeslag van 50%.${vz ? " Over de kosten maak ik afspraken met je rechtsbijstandsverzekeraar." : ""}</p>
      <p><span class="rl">Facturen.</span> Facturen betaal je binnen 14 dagen.</p>
      <p><span class="rl">Voorwaarden.</span> Op deze opdracht zijn mijn algemene voorwaarden en mijn kantoorklachtenregeling van toepassing. Mijn aansprakelijkheid is beperkt tot het bedrag dat mijn beroepsaansprakelijkheidsverzekering uitkeert, vermeerderd met het eigen risico onder die verzekering.</p>
      <p><span class="rl">Hulpmiddelen.</span> Om binnenkomende stukken te ordenen wil ik een beveiligde AI-toepassing gebruiken die binnen de EU draait en niets van jouw gegevens bewaart. Ik lees en controleer alles zelf. Ik gebruik die alleen als jij daarmee akkoord gaat.</p>
      <p>Laat je me weten of je akkoord bent met deze opdrachtbevestiging, en of ik de AI-toepassing mag gebruiken? Een reactie op deze mail is genoeg.</p>
      <p>Met vriendelijke groet,<br>${esc(s.signName)}</p>`;
  }

  /* ---------- voorbeelden, verzonnen, met data rond vandaag. Elk voorbeeld heeft een Nederlandse en een Engelse tekst. ---------- */
  function samples() {
    const T0 = today(), now = Date.now(), H = 36e5;
    const y = new Date(); y.setDate(y.getDate() - 1);
    const at = (h, m) => { const d = new Date(y); d.setHours(h, m, 0, 0); return d.getTime(); };
    const both = f => ({ text: withLang("nl", f), textEn: withLang("en", f) });
    return [
      Object.assign({ id: "s1", source: "WhatsApp", name: "Mila Janssen", received: now - 2.2 * H, sample: true },
        both(() => T("Hoi Lisanne, ik ben sinds " + fmtNY(addDays(T0, -61)) + " ziek thuis. Het begon na een conflict met mijn leidinggevende bij Brunsveld Zorggroep. Ik heb nog geen plan van aanpak gezien en de bedrijfsarts zegt dat ik over twee weken weer halve dagen moet beginnen. Mijn werkgever zegt nu dat mijn loon stopt als ik niet meewerk. Kun je me helpen?\nGroet, Mila",
          "Hi Lisanne, I've been off sick at home since " + fmtNY(addDays(T0, -61)) + ". It began after a conflict with my manager at Brunsveld Zorggroep. I haven't seen a plan of action yet and the company doctor says I should start half days again in two weeks. My employer now says my pay stops if I don't cooperate. Can you help me?\nRegards, Mila"))),
      Object.assign({ id: "s2", source: "Verwijzer", name: "", received: now - 0.7 * H, sample: true },
        both(() => T("Geachte mevrouw De Jong - Vanhommerig,\n\nGraag verwijzen wij onze verzekerde, de heer Youssef El Amrani, naar u voor hoger beroep. De kantonrechter in Maastricht heeft op " + fmt(addDays(T0, -47)) + " de arbeidsovereenkomst met Terwinsel Bouw BV ontbonden zonder billijke vergoeding. Verzekerde wil in hoger beroep. Ons dossiernummer is RM 2026 0418. Wij ontvangen graag uw kostenbegroting.\n\nMet vriendelijke groet,\nJ. Lemmens\njuridisch adviseur arbeidsrecht\nRechtshulp Mergelland",
          "Dear Ms De Jong - Vanhommerig,\n\nWe would like to refer our insured, Mr Youssef El Amrani, to you for an appeal. On " + fmt(addDays(T0, -47)) + " the subdistrict court in Maastricht dissolved the employment contract with Terwinsel Bouw BV without fair compensation. Our insured wants to appeal. Our file number is RM 2026 0418. We would welcome your cost estimate.\n\nKind regards,\nJ. Lemmens\nlegal adviser employment law\nRechtshulp Mergelland"))),
      Object.assign({ id: "s3", source: "E-mail", name: "Dennis Hermans", received: at(21, 47), sample: true },
        both(() => T("Beste mevrouw De Jong,\n\nOp " + fmtNY(addDays(T0, -5)) + " heb ik een vaststellingsovereenkomst getekend met Vellmer Logistiek BV. Mijn laatste werkdag is " + fmtNum(addDays(T0, 40)) + ". Ik twijfel nu of de vergoeding klopt en of ik wel recht heb op WW. In de overeenkomst staat niets over een bedenktermijn.\n\nMet vriendelijke groet,\nDennis Hermans",
          "Dear Ms De Jong,\n\nOn " + fmtNY(addDays(T0, -5)) + " I signed a settlement agreement with Vellmer Logistiek BV. My last working day is " + fmtNum(addDays(T0, 40)) + ". I now doubt whether the compensation is right and whether I'm entitled to unemployment benefit. The agreement says nothing about a cooling off period.\n\nKind regards,\nDennis Hermans"))),
      Object.assign({ id: "s4", source: "Website", name: "Laura Smeets", received: at(16, 5), sample: true },
        both(() => T("Mijn werkgever Heuvelland Metaal BV heeft mijn contract opgezegd per " + fmtNY(addDays(T0, -48)) + ". De opzegging kwam kort nadat ik onveilig werk had gemeld. Ik heb nog geen transitievergoeding gekregen. Wat kan ik doen?",
          "My employer Heuvelland Metaal BV terminated my contract effective " + fmtNY(addDays(T0, -48)) + ". The termination came shortly after I reported unsafe work. I haven't received a transition payment yet. What can I do?")))
    ];
  }
  const PASTE_EXAMPLE = () => T("Goedemiddag,\n\nIk ben op " + fmtNY(addDays(today(), -9)) + " op staande voet ontslagen door Geleenbeek Techniek BV. Volgens mijn werkgever zou ik gereedschap hebben meegenomen, maar dat klopt niet. Ik heb inmiddels een brief gekregen waarin het ontslag wordt bevestigd. Kunt u mij helpen?\n\nMet vriendelijke groet,\nRoy Kurvers",
    "Good afternoon,\n\nOn " + fmtNY(addDays(today(), -9)) + " I was dismissed on the spot by Geleenbeek Techniek BV. My employer claims I took tools with me, but that isn't true. I have now received a letter confirming the dismissal. Can you help me?\n\nKind regards,\nRoy Kurvers");
  const CONF_NL = "Heuvelland Metaal BV ; eerdere cliënt ; arbeidsrechtelijk advies 2025\nGeleenbeek Techniek BV ; wederpartij ; dossier 2026-014\nP. Coenen ; cliënt ; dossier 2026-014";
  const CONF_EN = "Heuvelland Metaal BV ; former client ; employment law advice 2025\nGeleenbeek Techniek BV ; opposing party ; file 2026-014\nP. Coenen ; client ; file 2026-014";
  /* de voorbeeldlijst volgt de taal, een lijst die Lisanne zelf aanpast blijft zoals ze is */
  const conflictText = l => (l === CONF_NL || l === CONF_EN ? T(CONF_NL, CONF_EN) : l);
  const DEFAULT_SETTINGS = { conflicts: CONF_NL, rate: "", place: "Hoensbroek", signName: "mr. L.S.F. de Jong - Vanhommerig", phone: "045 208 08 59" };

  /* ---------- toestand ---------- */
  const fresh = () => ({ v: 1, items: samples(), settings: Object.assign({}, DEFAULT_SETTINGS), log: [], coach: true });
  let state = store.load();
  if (!state || !state.v) state = fresh();
  else {
    /* oudere opslag: concepten per taal, en de Engelse tekst van de voorbeelden erbij */
    const sm = samples();
    state.items.forEach(it => {
      if (it.draft != null) { it.drafts = it.drafts || {}; it.drafts.nl = it.draft; delete it.draft; }
      if (it.sample && !it.textEn) { const f = sm.find(x => x.id === it.id); if (f) { it.text = f.text; it.textEn = f.textEn; } }
    });
  }
  const save = () => store.save(state);
  const byId = id => state.items.find(i => i.id === id);
  const A = it => analyze(it, state.settings);

  /* ---------- toast ---------- */
  let tt; function toast(msg) { const el = $("#toast"); el.innerHTML = msg; el.classList.remove("hidden"); clearTimeout(tt); tt = setTimeout(() => el.classList.add("hidden"), 6200); }

  /* ---------- taalknop en de vaste randen ---------- */
  function applyChrome() {
    document.documentElement.lang = LANG;
    document.title = T("Gericht verder, intakebureau voor De Jong - Vanhommerig advocatuur", "Gericht verder, intake desk for De Jong - Vanhommerig advocatuur");
    const md = $('meta[name="description"]'); if (md) md.setAttribute("content", T("Schets van een intakebureau en een wegwijzer re-integratie voor De Jong - Vanhommerig advocatuur, gemaakt door Astra agency.", "Sketch of an intake desk and a reintegration guide for De Jong - Vanhommerig advocatuur, made by Astra agency."));
    const r = $("#ribbon");
    if (r) {
      r.setAttribute("aria-label", T("Over deze schets", "About this sketch"));
      r.innerHTML = `<span class="msg">${T("<b>Schets van Astra agency.</b> Alles draait in deze browser, er wordt niets verstuurd. De voorbeeldzaken zijn verzonnen.", "<b>Sketch by Astra agency.</b> Everything runs in this browser, nothing is sent. The example cases are made up.")}</span>
        <span class="lang" role="group" aria-label="Taal, language"><button type="button" data-lang="nl" aria-pressed="${LANG === "nl"}" lang="nl">NL</button><button type="button" data-lang="en" aria-pressed="${LANG === "en"}" lang="en">EN</button></span>`;
    }
  }
  function formKeep() {
    const keep = {}; ["d0", "wn", "we", "wm", "wc", "cl", "rate", "place"].forEach(id => { const el = document.getElementById(id); if (el) keep[id] = el.type === "checkbox" ? el.checked : el.value; });
    return keep;
  }
  function formBack(keep) { Object.keys(keep).forEach(id => { const el = document.getElementById(id); if (el) { if (el.type === "checkbox") el.checked = keep[id]; else el.value = keep[id]; } }); }
  function setLang(l) {
    if (l === LANG) return;
    const keep = formKeep(), y = window.scrollY;
    LANG = l; try { localStorage.setItem(LKEY, l); } catch (e) { /* dan alleen voor nu */ }
    document.querySelectorAll(".modal").forEach(m => m.remove());
    applyChrome(); route(); formBack(keep); window.scrollTo(0, y);
  }

  /* ---------- start ---------- */
  function hatchSVG(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += `<i style="left:${(i * 100 / n).toFixed(2)}%;width:${(100 / n + 0.6).toFixed(2)}%"></i>`;
    return s;
  }
  function renderStart() {
    const open = state.items.filter(i => i.status !== "klaar" && i.status !== "afgewezen").length;
    $("#app").innerHTML = `<section class="start"><div class="start-in">
      <div class="start-top"><img class="logo" src="logo.svg" alt="De Jong - Vanhommerig advocatuur"><span class="tag">Gericht verder</span></div>
      <div class="start-hero">
        <div class="kicker">${T("Intakebureau", "Intake desk")}</div>
        <h1>${T("Elke nieuwe zaak <em>helder</em>, voordat je hem opent", "Every new case <em>clear</em>, before you open it")} <span class="lineword" aria-hidden="true">${hatchSVG(9)}</span></h1>
        <p class="lead">${T("Een werknemer vult de wegwijzer in, of er komt een mail, een WhatsApp of een verwijzing binnen. Jij vindt een kaart met de feiten, de termijnen, de conflictcheck en een conceptantwoord. Er gaat niets weg zonder jouw akkoord.", "An employee fills in the guide, or an email, a WhatsApp or a referral comes in. You find a card with the facts, the deadlines, the conflict check and a draft reply. Nothing goes out without your approval.")}</p>
      </div>
      <div class="doors">
        <a class="door" href="#/bureau"><span class="who">${T("Voor Lisanne", "For Lisanne")}</span><h2>${T("Intakebureau", "Intake desk")}</h2><p>${T(open + " nieuwe aanvragen staan klaar, met de termijnen berekend en een conceptantwoord.", open + " new enquiries are ready, with the deadlines worked out and a draft reply.")}</p><span class="go">${T("Open het bureau", "Open the desk")}</span><img class="peek" src="icon.svg" alt=""></a>
        <a class="door" href="#/wegwijzer"><span class="who">${T("Voor werknemers", "For employees")}</span><h2>${T('Wegwijzer <span class="nw">re-integratie</span>', 'Guide to <span class="nw">reintegration</span>')}</h2><p>${T("Zie waar je staat in je ziekte, wat er van je wordt verwacht en wanneer je hulp vraagt.", "See where you stand in your illness, what is expected of you and when to ask for help.")}</p><span class="go">${T("Open de wegwijzer", "Open the guide")}</span><img class="peek" src="icon.svg" alt=""></a>
      </div>
      <div class="steps3">
        <div><b>01</b><strong>${T("Er komt een aanvraag binnen", "An enquiry comes in")}</strong>${T("Via je site, je mail, WhatsApp of een verwijzer.", "Through your site, your email, WhatsApp or a referrer.")}</div>
        <div><b>02</b><strong>${T("Het bureau maakt er een kaart van", "The desk turns it into a card")}</strong>${T("Feiten met de zin waar ze uit komen, termijnen en de conflictcheck.", "Facts with the sentence they come from, deadlines and the conflict check.")}</div>
        <div><b>03</b><strong>${T("Jij keurt goed", "You approve")}</strong>${T("Antwoord en opdrachtbevestiging staan als concept in Outlook.", "The reply and the engagement letter wait as drafts in Outlook.")}</div>
      </div>
    </div></section>`;
    animateHatch();
  }
  function animateHatch() {
    const lines = document.querySelectorAll(".lineword i");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    lines.forEach((l, i) => { const r = 48 + (i * 37) % 22, dx = ((i * 53) % 30) - 15, dy = -((i * 29) % 26) - 8; l.style.transition = "none"; l.style.transform = `translate(${dx}px,${dy}px) rotate(${-r}deg)`; l.style.opacity = ".6"; });
    requestAnimationFrame(() => requestAnimationFrame(() => lines.forEach((l, i) => { l.style.transition = ""; l.style.transitionDelay = (0.35 + i * 0.08) + "s"; l.style.transform = "none"; l.style.opacity = "1"; })));
  }

  /* ---------- wegwijzer ---------- */
  const WW = { step: 1, d0: "", flags: {}, sent: null };
  const WFLAGS = [
    ["conflict", "Er is een conflict met mijn werkgever of leidinggevende", "There is a conflict with my employer or manager"],
    ["arts", "Ik ben het niet eens met de bedrijfsarts", "I disagree with the company doctor"],
    ["loon", "Mijn werkgever dreigt mijn loon te stoppen, of heeft dat gedaan", "My employer is threatening to stop my pay, or has done so"],
    ["pva", "Ik heb nog geen plan van aanpak gezien", "I haven't seen a plan of action yet"],
    ["werk", "Mijn werkgever wil dat ik ander werk ga doen", "My employer wants me to do different work"],
    ["vso", "Ik heb een vaststellingsovereenkomst aangeboden gekregen", "I have been offered a settlement agreement"]
  ];
  function wwShell(inner) {
    return `<section class="ww"><header class="ww-head"><div class="ww-head-in"><img class="logo" src="logo.svg" alt="De Jong - Vanhommerig advocatuur"><a class="back" href="#/">${T("Terug naar het begin", "Back to the start")}</a></div></header>
      <div class="ww-main"><div class="kicker" style="color:var(--orange-t)">${T("Wegwijzer re-integratie", "Reintegration guide")}</div>${inner}
      <p class="sources">${T('Algemene informatie, geen advies. Deze wegwijzer werkt met vaste regels op basis van het <a href="https://www.uwv.nl/particulieren/ziek/ziek-met-werkgever/re-integreren-tijdens-ziekte/detail/stappenplan-bij-ziekte" rel="noopener" target="_blank">stappenplan bij ziekte van UWV</a>, <a href="https://www.rijksoverheid.nl/onderwerpen/ziekteverzuim-van-het-werk/regels-en-verplichtingen-bij-ziekte" rel="noopener" target="_blank">Rijksoverheid</a> en <a href="https://wetten.overheid.nl/BWBR0005290/2026-07-01" rel="noopener" target="_blank">het Burgerlijk Wetboek</a>. Wat je invult blijft op dit apparaat tot je het zelf naar Lisanne stuurt.',
        'General information, not advice. This guide works with fixed rules based on the <a href="https://www.uwv.nl/particulieren/ziek/ziek-met-werkgever/re-integreren-tijdens-ziekte/detail/stappenplan-bij-ziekte" rel="noopener" target="_blank">UWV step plan for illness</a>, <a href="https://www.rijksoverheid.nl/onderwerpen/ziekteverzuim-van-het-werk/regels-en-verplichtingen-bij-ziekte" rel="noopener" target="_blank">Rijksoverheid (the Dutch government)</a> and <a href="https://wetten.overheid.nl/BWBR0005290/2026-07-01" rel="noopener" target="_blank">the Civil Code</a>. These sources are in Dutch. What you fill in stays on this device until you send it to Lisanne yourself.')}</p></div></section>`;
  }
  function renderWW() {
    const p = n => `<div class="prog" aria-hidden="true">${[1, 2, 3].map(i => `<span class="${i <= n ? "on" : ""}"></span>`).join("")}</div>`;
    let inner = "";
    if (WW.sent) {
      inner = `<h1>${T("Dank je, ", "Thank you, ")}${esc(WW.sent.first)}.</h1>${p(3)}<div class="q done-box"><p class="big">${T("Lisanne heeft je overzicht ontvangen.", "Lisanne has received your overview.")}</p><p>${T("Ze neemt contact met je op. Bewaar je stukken alvast bij elkaar, zoals de probleemanalyse en het plan van aanpak.", "She will contact you. Keep your documents together in the meantime, such as the problem analysis and the plan of action.")}</p><div class="q-actions"><a class="btn btn-t" href="#/bureau/${esc(WW.sent.id)}">${T("Bekijk hoe het bij Lisanne binnenkomt", "See how it arrives at Lisanne's")}</a><button class="btn btn-g" data-act="ww-reset">${T("Opnieuw beginnen", "Start again")}</button></div></div>`;
    } else if (WW.step === 1) {
      inner = `<h1>${T("Waar sta je in je ziekte?", "Where are you in your illness?")}</h1><p class="sub">${T("Drie korte vragen. Daarna zie je waar je nu staat, wat er van je wordt verwacht en wanneer het slim is om hulp te vragen.", "Three short questions. Then you see where you stand now, what is expected of you and when it is smart to ask for help.")}</p>${p(1)}
        <div class="q"><h2>${T("Wat was je eerste ziektedag?", "What was your first sick day?")}</h2><p class="hint">${T("De dag waarop je je ziek meldde bij je werkgever.", "The day you reported sick to your employer.")}</p>
        <label class="sr" for="d0">${T("Eerste ziektedag", "First sick day")}</label><input type="date" id="d0" value="${esc(WW.d0)}" max="${toISO(today())}">
        <div class="err hidden" id="d0err">${T("Vul een datum in die niet in de toekomst ligt.", "Enter a date that isn't in the future.")}</div>
        <div class="q-actions"><button class="btn btn-o" data-act="ww-1">${T("Volgende", "Next")}</button></div></div>`;
    } else if (WW.step === 2) {
      inner = `<h1>${T("Wat speelt er?", "What is going on?")}</h1><p class="sub">${T("Kies wat voor jou geldt. Niets is ook goed.", "Choose what applies to you. None is fine too.")}</p>${p(2)}
        <div class="q"><h2>${T("Herken je iets hiervan?", "Do you recognise any of this?")}</h2><p class="hint">${T("Je antwoorden blijven op dit apparaat.", "Your answers stay on this device.")}</p><div class="checks">
        ${WFLAGS.map(([k, nl, en]) => `<label class="check ${WW.flags[k] ? "on" : ""}"><input type="checkbox" data-flag="${k}" ${WW.flags[k] ? "checked" : ""}><span>${esc(T(nl, en))}</span></label>`).join("")}
        </div><div class="q-actions"><button class="btn btn-g" data-act="ww-back">${T("Terug", "Back")}</button><button class="btn btn-o" data-act="ww-2">${T("Laat mijn overzicht zien", "Show my overview")}</button></div></div>`;
    } else {
      const d0 = fromISO(WW.d0), w = weekOf(d0);
      const nowIdx = POORT.reduce((acc, s, i) => (w >= s.week ? i : acc), 0);
      const tl = POORT.map((s, i) => { const dt = poortDate(d0, s); const cls = i < nowIdx ? "done" : i === nowIdx ? "now" : ""; const q = ps(s); return `<li class="${cls}"><span class="dot"></span><div class="when">week ${s.week}, ${i === 0 ? fmt(d0) : T("rond ", "around ") + fmt(dt)}</div><h3>${esc(q.title)}${i === nowIdx ? T(", hier ben je nu", ", you are here") : ""}</h3><p>${esc(q.text)}</p>${q.ask && i >= nowIdx - 1 ? `<div class="ask">${esc(q.ask)}</div>` : ""}</li>`; }).join("");
      const fl = [];
      if (WW.flags.conflict) fl.push(T(["Ziekte en conflict lopen vaak door elkaar", "‘Ziekte en conflict lopen in de praktijk vaak door elkaar heen.’ Zet de feiten daarom vroeg op een rij, wie zei wat en wanneer, en bespreek ze met een arbeidsrechtadvocaat.", "Lisanne de Jong, ziekte en re-integratie op haar site"], ["Illness and conflict often get mixed up", "‘In practice, illness and conflict often run together.’ So put the facts in order early, who said what and when, and talk them through with an employment lawyer.", "Lisanne de Jong, illness and reintegration on her site, translated from Dutch"]));
      if (WW.flags.arts) fl.push(T(["Je kunt een second opinion vragen", "Ben je het niet eens met de bedrijfsarts, dan kun je een second opinion bij een andere bedrijfsarts vragen. Je kunt ook bij UWV een deskundigenoordeel aanvragen. Dat kost € 100 en het is een advies.", "UWV, deskundigenoordeel"], ["You can ask for a second opinion", "If you disagree with the company doctor, you can ask another company doctor for a second opinion. You can also ask UWV for an expert opinion. That costs € 100 and it is advice.", "UWV, expert opinion (deskundigenoordeel)"]));
      if (WW.flags.loon) fl.push(T(["Loon stoppen mag niet zomaar", "Je werkgever mag je loon inhouden als je niet meewerkt aan je re-integratie. Dreigt dat, laat het dan snel bekijken.", "Rijksoverheid, regels bij ziekte"], ["Your pay can't just be stopped", "Your employer may withhold your pay if you don't cooperate with your reintegration. If that is threatened, have it looked at quickly.", "Rijksoverheid, rules during illness"]));
      if (WW.flags.pva && w >= 8) fl.push(T(["Het plan van aanpak had er al moeten zijn", "Uiterlijk in week 8 maken jij en je werkgever samen het plan van aanpak. Jij bent nu in week " + w + ".", "UWV, stappenplan bij ziekte"], ["The plan of action should already exist", "By week 8 at the latest, you and your employer draw up the plan of action together. You are now in week " + w + ".", "UWV, step plan for illness"]));
      if (WW.flags.werk) fl.push(T(["Is het werk passend?", "Of werk passend is, kun je laten beoordelen met een deskundigenoordeel van UWV.", "UWV, deskundigenoordeel, situatie 2"], ["Is the work suitable?", "You can have UWV assess whether work is suitable, with an expert opinion.", "UWV, expert opinion, situation 2"]));
      if (WW.flags.vso) fl.push(T(["Teken niet zonder het te laten lezen", "Teken je een vaststellingsovereenkomst, dan mag je die binnen veertien dagen schriftelijk en zonder opgaaf van redenen ontbinden. Staat die bedenktermijn er niet in, dan zijn het drie weken. Laat hem bekijken voor je tekent.", "art. 7:670b BW"], ["Don't sign without having it read", "If you sign a settlement agreement, you can dissolve it within fourteen days, in writing and without giving reasons. If the agreement doesn't state that cooling off period, it is three weeks. Have it checked before you sign.", "art. 7:670b Civil Code (BW)"]));
      inner = `<h1>${T("Jouw overzicht", "Your overview")}</h1>${p(3)}<div class="two"><div>
        <div class="q"><div class="week"><span class="n">${w}</span><span class="t"><b>${T("Je bent in week " + w + " van je ziekte", "You are in week " + w + " of your illness")}</b>${T("Eerste ziektedag ", "First sick day ")}${fmt(d0)}</span></div>
        <ol class="tl">${tl}</ol><p class="small">${T("Data zijn een hulpmiddel. Je werkgever en UWV houden de officiële data bij.", "Dates are a guide. Your employer and UWV keep the official dates.")}</p></div></div>
        <div>${fl.length ? `<div class="sec-h">${T("Let op", "Watch out")}</div><div class="flags">${fl.map(f => `<div class="flag"><h3>${esc(f[0])}</h3><p>${esc(f[1])}</p>${f[2] ? `<span class="src">${T("Bron, ", "Source, ")}${esc(f[2])}</span>` : ""}</div>`).join("")}</div>` : `<div class="sec-h">${T("Goed om te weten", "Good to know")}</div><div class="flags"><div class="flag"><h3>${T("Loopt het vast?", "Is it stuck?")}</h3><p>${T("Zijn jij en je werkgever het oneens over je ziekte of je re-integratie, dan kun je een deskundigenoordeel bij UWV aanvragen, of een second opinion bij een andere bedrijfsarts.", "If you and your employer disagree about your illness or your reintegration, you can ask UWV for an expert opinion, or another company doctor for a second opinion.")}</p><span class="src">${T("Bron, Rijksoverheid", "Source, Rijksoverheid")}</span></div></div>`}
        <div class="cta-box"><h2>${T("Leg het voor aan Lisanne", "Put it to Lisanne")}</h2><p>${T("Ze krijgt dit overzicht meteen, zodat je je verhaal niet opnieuw hoeft te vertellen.", "She gets this overview straight away, so you don't have to tell your story again.")}</p>
          <div class="field"><label for="wn">${T("Je naam", "Your name")}</label><input id="wn" autocomplete="name"></div>
          <div class="field"><label for="we">${T("Je e-mail", "Your email")}</label><input id="we" type="email" autocomplete="email"></div>
          <div class="field"><label for="wm">${T("Wat wil je haar vertellen?", "What would you like to tell her?")}</label><textarea id="wm" placeholder="${T("Bijvoorbeeld wat er met je werkgever speelt.", "For example what is going on with your employer.")}"></textarea></div>
          <label class="consent"><input type="checkbox" id="wc"><span>${T("Ik ga akkoord dat Lisanne mijn gegevens gebruikt om contact met mij op te nemen.", "I agree that Lisanne uses my details to contact me.")}</span></label>
          <div class="err hidden" id="werr" style="color:#FFD2C2">${T("Vul je naam en e-mail in en zet het vinkje.", "Enter your name and email and tick the box.")}</div>
          <button class="btn btn-o" data-act="ww-send">${T("Stuur naar Lisanne", "Send to Lisanne")}</button></div>
        </div></div>`;
    }
    $("#app").innerHTML = wwShell(inner);
  }
  function wwSend() {
    const n = $("#wn").value.trim(), e = $("#we").value.trim(), m = $("#wm").value.trim(), c = $("#wc").checked;
    if (!n || !/.+@.+\..+/.test(e) || !c) { $("#werr").classList.remove("hidden"); return; }
    const it = { id: "w" + Date.now(), source: "Wegwijzer", name: n, email: e, received: Date.now(), ww: { d0: WW.d0, flags: WFLAGS.filter(f => WW.flags[f[0]]).map(f => f[0]), msg: m } };
    state.items.unshift(it); save();
    WW.sent = { id: it.id, first: firstName(n) }; renderWW(); window.scrollTo(0, 0);
  }

  /* ---------- bureau ---------- */
  function greet() { const h = new Date().getHours(); return h < 12 ? T("Goedemorgen", "Good morning") : h < 18 ? T("Goedemiddag", "Good afternoon") : T("Goedenavond", "Good evening"); }
  function kpis() {
    const all = state.items, done = all.filter(i => i.status === "klaar");
    const times = done.filter(i => i.openedAt && i.doneAt).map(i => (i.doneAt - i.openedAt) / 1000).sort((a, b) => a - b);
    const med = times.length ? times[Math.floor(times.length / 2)] : null;
    let watched = 0, hits = 0; all.forEach(i => { const a = A(i); watched += a.fatal.length; if (a.conflict.hits.some(h => h.client)) hits++; });
    const fmtT = s => s == null ? T("nog niet gemeten", "not measured yet") : s < 60 ? Math.round(s) + " s" : Math.floor(s / 60) + " min " + Math.round(s % 60) + " s";
    return { open: all.filter(i => !i.status).length, total: all.length, done: done.length, med: fmtT(med), medNone: med == null, watched, hits };
  }
  function rail(on) {
    const open = state.items.filter(i => !i.status).length;
    return `<nav class="rail" aria-label="${T("Bureau", "Desk")}"><img class="mark" src="icon.svg" alt="">
      <a href="#/bureau" class="${on === "bureau" ? "on" : ""}">${icon.inbox}<span>${T("Aanvragen", "Enquiries")}</span>${open ? `<i class="bad">${open}</i>` : ""}</a>
      <a href="#/termijnen" class="${on === "termijnen" ? "on" : ""}">${icon.clock}<span>${T("Termijnen", "Deadlines")}</span></a>
      <a href="#/resultaten" class="${on === "resultaten" ? "on" : ""}">${icon.chart}<span>${T("Resultaten", "Results")}</span></a>
      <a href="#/instellingen" class="${on === "instellingen" ? "on" : ""}">${icon.gear}<span>${T("Instellingen", "Settings")}</span></a>
      <span class="sp"></span><a href="#/">${icon.door}<span>${T("Begin", "Start")}</span></a></nav>`;
  }
  function topbar() {
    const k = kpis();
    return `<div class="topbar"><h1>${greet()}, Lisanne</h1><div class="kpis">
      <div class="kpi"><b>${k.open}</b><span>${T("open aanvragen", "open enquiries")}</span></div>
      <div class="kpi"><b>${k.watched}</b><span>${T("termijnen bewaakt", "deadlines watched")}</span></div>
      <div class="kpi"><b class="${k.medNone ? "kv-t" : ""}">${k.med}</b><span>${T("van openen tot antwoord klaar", "from opening to reply ready")}</span></div>
      <div class="kpi"><b>${k.done}</b><span>${T("antwoorden klaar", "replies ready")}</span></div></div>
      <button class="btn btn-o btn-s" data-act="paste">${icon.plus}${T("Plak een aanvraag", "Paste an enquiry")}</button></div>`;
  }
  function listHTML(sel) {
    const items = state.items.slice().sort((a, b) => (a.status ? 1 : 0) - (b.status ? 1 : 0) || b.received - a.received);
    return `<div class="list">${state.coach ? `<div class="coach"><span>${T("Begin met een aanvraag. Of plak zelf een mail en kijk wat het bureau ervan maakt.", "Start with an enquiry. Or paste an email yourself and see what the desk makes of it.")}</span><button data-act="coach-x" aria-label="${T("Sluit de tip", "Close the tip")}">${T("Sluit", "Close")}</button></div>` : ""}
      <div class="list-h"><h2>${T("Aanvragen", "Enquiries")}</h2><span class="small">${items.length} ${T("totaal", "total")}</span></div>
      ${items.map(it => { const a = A(it); const nxt = a.next; return `<button class="item ${it.id === sel ? "on" : ""}" data-open="${esc(it.id)}">
        <div class="r1"><span class="nm">${esc(it.source === "Verwijzer" ? (a.orgs.find(o => /rechtshulp|rechtsbijstand|advocat/i.test(o)) || a.sender) : a.sender)}</span><span class="tm">${whenTxt(it.received)}</span></div>
        <div class="pv">${esc(txt(it).replace(/\s+/g, " ").slice(0, 150))}</div>
        <div class="r3"><span class="chip src">${esc(srcTxt(it.source))}</span><span class="chip lane">${esc(laneName(a.lane))}</span>
        ${it.status === "klaar" ? `<span class="chip ok">${icon.check.replace("<svg", '<svg width="12" height="12"')}${T("klaar", "done")}</span>` : it.status === "afgewezen" ? `<span class="chip">${T("niet aangenomen", "not taken on")}</span>` : ""}
        ${!it.status && a.conflict.hits.some(h => h.client) ? `<span class="chip late">${T("conflictcheck", "conflict check")}</span>` : ""}
        ${!it.status && nxt ? `<span class="chip ${days(today(), nxt.date) <= 14 ? "hot" : ""}"><i class="dotx"></i>${T("termijn ", "deadline ")}${fmtS(nxt.date)}</span>` : ""}
        ${it.sample ? `<span class="chip src">${T("voorbeeld", "example")}</span>` : ""}</div></button>`; }).join("")}</div>`;
  }
  function lijn(a) {
    const T0 = today(), KT = Object.assign(KIND_TXT(), LANG === "en" ? { uitspraak: "Court ruling", vso_getekend: "Agreement signed", vso_aangeboden: "Agreement offered" } : {});
    let pts = a.facts.map(f => ({ d: f.date, t: KT[f.kind] || T("Datum", "Date"), c: "fact" }));
    pts = pts.concat(a.deadlines.map(d => ({ d: d.date, t: d.short, c: d.fatal ? "fatal" : "step" })));
    if (!pts.length) return "";
    const ds = pts.map(p => p.d).concat([T0]);
    let min = new Date(Math.min.apply(null, ds)), max = new Date(Math.max.apply(null, ds));
    const span = Math.max(days(min, max), 10); min = addDays(min, -Math.round(span * 0.04)); max = addDays(max, Math.round(span * 0.06));
    const W = 860, P = 34, y = 96, X = d => P + (days(min, d) / days(min, max)) * (W - 2 * P);
    pts.sort((p, q) => p.d - q.d);
    const tx = X(T0);
    let svg = `<line x1="${P}" y1="${y}" x2="${tx}" y2="${y}" stroke="#E1CBB2" stroke-width="3"/><line x1="${tx}" y1="${y}" x2="${W - P}" y2="${y}" stroke="#164C55" stroke-width="3"/><line x1="${W - P}" y1="${y}" x2="${W - 4}" y2="${y}" stroke="#FF5C00" stroke-width="3"/>`;
    svg += `<g class="today"><line x1="${tx}" y1="${y - 14}" x2="${tx}" y2="${y + 66}" stroke="#164C55" stroke-width="1.5" stroke-dasharray="3 3"/><text x="${tx}" y="${y + 80}" text-anchor="middle">${T("vandaag", "today")}</text></g>`;
    const rows = [[], []]; /* per rij de bezette stukken [links, rechts] */
    const fits = (r, l, rr) => rows[r].every(([a1, b1]) => rr + 10 < a1 || l - 10 > b1);
    pts.forEach((p, i) => {
      const x = X(p.d);
      if (p.c === "fatal") svg += `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" transform="rotate(45 ${x} ${y})" fill="#FF5C00"/>`;
      else if (p.c === "fact") svg += `<circle cx="${x}" cy="${y}" r="6.5" fill="#FFFDF9" stroke="#164C55" stroke-width="2.5"/>`;
      else svg += `<circle cx="${x}" cy="${y}" r="4" fill="#164C55"/>`;
      const label = p.t.length > 26 ? p.t.slice(0, 25) + "…" : p.t, date = fmtS(p.d) + (p.d.getFullYear() !== T0.getFullYear() ? " " + p.d.getFullYear() : "");
      const w = Math.max(label.length * 6.3, date.length * 5.8);
      const anchor = x - w / 2 < 4 ? "start" : x + w / 2 > W - 4 ? "end" : "middle";
      const l = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2, rr = l + w;
      const pref = p.c === "fatal" || p.c === "fact" ? [0, 1] : [1, 0];
      const r = fits(pref[0], l, rr) ? pref[0] : fits(pref[1], l, rr) ? pref[1] : -1;
      if (r < 0) return;
      rows[r].push([l, rr]);
      if (r === 0) svg += `<line x1="${x}" y1="${y - 9}" x2="${x}" y2="${y - 26}" stroke="#C9B49B" stroke-width="1"/><text x="${x}" y="${y - 44}" text-anchor="${anchor}" class="lab">${esc(label)}</text><text x="${x}" y="${y - 30}" text-anchor="${anchor}">${esc(date)}</text>`;
      else svg += `<line x1="${x}" y1="${y + 9}" x2="${x}" y2="${y + 24}" stroke="#C9B49B" stroke-width="1"/><text x="${x}" y="${y + 38}" text-anchor="${anchor}" class="lab">${esc(label)}</text><text x="${x}" y="${y + 52}" text-anchor="${anchor}">${esc(date)}</text>`;
    });
    return `<svg class="lijn" viewBox="0 0 ${W} 190" role="img" aria-label="${T("Tijdlijn van de zaak, met vandaag en de termijnen. Alle data staan ook in de lijst hieronder.", "Timeline of the case, with today and the deadlines. All dates are also in the list below.")}">${svg}</svg><p class="small" style="margin:4px 0 0"><span style="color:#FF5C00">◆</span> ${T("fatale termijn", "fatal deadline")} &nbsp; <span style="color:#164C55">●</span> ${T("stap of datum uit het bericht. Niet elk label past, de volledige lijst staat hieronder.", "step or date from the message. Not every label fits, the full list is below.")}</p>`;
  }
  function highlight(q, hit) { const e = esc(q), h = esc(hit); const i = e.indexOf(h); return i < 0 ? e : e.slice(0, i) + "<mark>" + h + "</mark>" + e.slice(i + h.length); }
  const draftOf = (it, a, s) => (it.drafts && it.drafts[LANG] != null ? it.drafts[LANG] : replyDraft(it, a, s));
  function cardHTML(it) {
    if (!it) return `<div class="card"><div class="empty"><h2>${T("Kies een aanvraag", "Choose an enquiry")}</h2><p>${T("Links staan de nieuwe aanvragen. Open er een, of plak zelf een mail.", "The new enquiries are on the left. Open one, or paste an email yourself.")}</p></div></div>`;
    const a = A(it), s = state.settings, KT = KIND_TXT(), FT = FLAG_TXT();
    if (!it.openedAt) { it.openedAt = Date.now(); save(); }
    const title = it.source === "Verwijzer" ? (a.client ? a.client : T("Verwijzing", "Referral")) : a.sender;
    const refOrg = a.orgs.find(o => /rechtshulp|rechtsbijstand|advocat/i.test(o)) || a.sender;
    const sum = [];
    if (it.source === "Verwijzer") sum.push(T("Verwijzing door " + refOrg + (a.client ? " voor " + a.client : "") + ".", "Referral by " + refOrg + (a.client ? " for " + a.client : "") + "."));
    if (a.ziek) sum.push(T("Ziek sinds " + fmt(a.ziek.date) + ", nu week " + weekOf(a.ziek.date) + ".", "Ill since " + fmt(a.ziek.date) + ", now week " + weekOf(a.ziek.date) + "."));
    a.facts.filter(f => f.kind !== "ziek").forEach(f => sum.push(KT[f.kind] + T(" op ", " on ") + fmt(f.date) + "."));
    a.flags.forEach(f => sum.push(FT[f] + "."));
    if (a.next) sum.push(T("Eerstvolgende fatale termijn ", "Next fatal deadline ") + fmtL(a.next.date) + ".");
    const cf = a.conflict;
    const cfHTML = cf.hits.length ? cf.hits.map(h => h.client ? `<div class="conflict hit"><span>!</span><div><b>${T("Mogelijke treffer. ", "Possible match. ")}${esc(h.name)} ${T("staat in je lijst als ", "is on your list as ")}${esc(h.as)}${h.note ? " (" + esc(h.note) + ")" : ""}.</b>${T("Kijk of je deze zaak mag aannemen voor je inhoudelijk reageert. Het conceptantwoord houdt daar rekening mee.", "Check whether you may take on this case before you reply on the merits. The draft reply takes this into account.")}</div></div>` : `<div class="conflict clear"><span>i</span><div><b>${esc(h.name)} ${T("staat in je lijst als ", "is on your list as ")}${esc(h.as)}${h.note ? " (" + esc(h.note) + ")" : ""}.</b>${T("Geen tegenstrijdig belang zolang je niet voor deze partij optreedt.", "No conflict of interest as long as you don't act for this party.")}</div></div>`).join("")
      : `<div class="conflict clear"><span>${icon.check.replace("<svg", '<svg width="18" height="18"')}</span><div><b>${T("Geen treffer in je lijst van " + cf.rows + " namen.", "No match in your list of " + cf.rows + " names.")}</b>${T("Gecontroleerd op ", "Checked for ")}${esc((a.anon ? [] : [a.sender]).concat(a.client ? [a.client] : [], a.orgs).join(", "))}.</div></div>`;
    const draft = draftOf(it, a, s), hit = a.conflict.hits.some(h => h.client);
    const lt = T("Opdrachtbevestiging, concept", "Engagement letter, draft");
    return `<div class="card"><div class="card-in">
      <button class="btn btn-g btn-s back-m" data-go="#/bureau">${icon.left}${T("Alle aanvragen", "All enquiries")}</button>
      <div class="card-head"><div><div class="meta"><span class="chip src">${esc(srcTxt(it.source))}</span><span>${whenTxt(it.received)}</span>${it.sample ? `<span class="chip src">${T("voorbeeld, verzonnen", "example, made up")}</span>` : ""}</div>
        <h2>${esc(title)}</h2><div class="meta"><span class="chip lane">${esc(laneName(a.lane))}</span>${a.second ? `<span class="chip lane">${esc(laneName(a.second))}</span>` : ""}${a.urgent ? `<span class="chip hot"><i class="dotx"></i>${T("spoed, termijn binnen 14 dagen", "urgent, deadline within 14 days")}</span>` : ""}</div></div></div>
      <div class="note-ai">${icon.info}<span>${T("In de echte versie leest Claude dit bericht, binnen de EU, en zet n8n de concepten in je Outlook. In deze schets doen vaste regels hetzelfde in je browser. Bij elk feit staat de zin waar het uit komt.", "In the real version Claude reads this message, inside the EU, and n8n puts the drafts in your Outlook. In this sketch fixed rules do the same in your browser. Every fact shows the sentence it comes from.")}</span></div>
      <div class="block"><h3>${T("Samenvatting", "Summary")}</h3><ul class="summary">${sum.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      ${a.facts.length ? `<div class="block blk-lijn"><h3>${T("De lijn", "The line")}</h3>${lijn(a)}</div>` : ""}
      <div class="block"><h3>${T("Uit het bericht", "From the message")}</h3>${a.facts.length ? `<div class="facts">${a.facts.map(f => `<div class="fact"><div class="k">${esc(KT[f.kind])}<b>${fmt(f.date)}</b></div><q>${highlight(f.quote, f.hit)}</q></div>`).join("")}</div>` : `<p class="small">${T("Geen datum gevonden. Vraag de belangrijkste data na in je antwoord.", "No date found. Ask for the key dates in your reply.")}</p>`}</div>
      ${a.deadlines.length ? `<div class="block"><h3>${T("Termijnen", "Deadlines")}</h3><div class="terms">${a.deadlines.map(d => `<div class="term ${d.fatal ? "fatal" : "step"}"><span class="d">${fmtL(d.date)}</span><span class="l"><b>${esc(d.label)}</b><span>${esc(d.basis)}${d.fatal ? T(", fatale termijn", ", fatal deadline") : ""}</span></span>${days(today(), d.date) < 0 && !d.fatal ? `<span class="left past">${T("voorbij", "passed")}</span>` : leftChip(d.date)}</div>`).join("")}</div><p class="small" style="margin-top:10px">${T("Berekend als hulpmiddel. Controleer elke termijn zelf.", "Calculated as a help. Check every deadline yourself.")}</p></div>` : ""}
      <div class="block"><h3>${T("Conflictcheck", "Conflict check")}</h3>${cfHTML}</div>
      <div class="block"><h3>${T("Op te vragen", "To request")}</h3><ul class="docs">${docsFor(it, a).concat(it.source === "Verwijzer" ? [] : [T("Kopie van je identiteitsbewijs, bsn en pasfoto mag je afschermen", "Copy of your ID, you may hide the BSN and passport photo")]).map(d => `<li>${esc(d)}</li>`).join("")}</ul></div>
      <div class="block"><h3>${T("Conceptantwoord", "Draft reply")}</h3><label class="sr" for="draft">${T("Conceptantwoord", "Draft reply")}</label><textarea class="draft" id="draft">${esc(draft)}</textarea></div>
      <div class="block"><h3>${T("Opdrachtbevestiging", "Engagement letter")}</h3>${hit ? `<p class="small hold">${T("Deze gaat pas mee als je de zaak aanneemt. Eerst de conflictcheck.", "This only goes out if you take on the case. Conflict check first.")}</p><details class="peek-letter"><summary>${T("Bekijk het concept alvast", "View the draft anyway")}</summary><div class="letter" tabindex="0" role="region" aria-label="${lt}">${letterHTML(it, a, s)}</div></details>` : `<div class="letter" tabindex="0" role="region" aria-label="${lt}">${letterHTML(it, a, s)}</div>`}</div>
      <div class="actions">${it.status === "klaar" ? `<div class="status">${icon.check.replace("<svg", '<svg width="18" height="18"')}${hit ? T("Klaar. Het antwoord staat als concept in je Outlook.", "Done. The reply is waiting as a draft in your Outlook.") : T("Klaar. Antwoord en opdrachtbevestiging staan als concept in je Outlook.", "Done. The reply and the engagement letter are waiting as drafts in your Outlook.")}</div><button class="btn btn-g btn-s" data-act="reopen">${T("Terugzetten", "Put back")}</button>`
        : it.status === "afgewezen" ? `<div class="status" style="background:#EEE;color:#444">${T("Niet aangenomen.", "Not taken on.")}</div><button class="btn btn-g btn-s" data-act="reopen">${T("Terugzetten", "Put back")}</button>`
        : `<button class="btn btn-o" data-act="approve">${icon.check}${hit ? T("Zet het antwoord klaar in Outlook", "Put the reply ready in Outlook") : T("Goedkeuren en klaarzetten in Outlook", "Approve and put ready in Outlook")}</button><button class="btn btn-g" data-act="decline">${T("Niet aannemen", "Don't take on")}</button>`}</div>
    </div></div>`;
  }
  /* de kaart die nu open staat, ook als het adres geen id heeft (het bureau opent de eerste kaart zelf) */
  let CUR = null;
  function renderDesk(sel) {
    const it = sel ? byId(sel) : null;
    CUR = it ? it.id : null;
    $("#app").innerHTML = `<div class="desk">${rail("bureau")}<div class="main ${it ? "card-open" : ""}">${topbar()}<div class="panes ${it ? "has-card" : ""}">${listHTML(sel)}${cardHTML(it)}</div></div></div>`;
    fitDraft();
  }
  /* het concept is zo hoog als de tekst, geen scrollvak in een scrollvak */
  function fitDraft() { const d = $("#draft"); if (d) { d.style.height = "auto"; d.style.height = (d.scrollHeight + 6) + "px"; } }
  function renderTerms() {
    const rows = [];
    state.items.filter(i => !i.status).forEach(i => { const a = A(i); a.fatal.forEach(d => rows.push({ i, a, d })); });
    rows.sort((x, y) => x.d.date - y.d.date);
    $("#app").innerHTML = `<div class="desk">${rail("termijnen")}<div class="main">${topbar()}<div class="page"><div class="page-in">
      <h2>${T("Termijnen", "Deadlines")}</h2><p class="small">${T("Alle fatale termijnen uit open aanvragen, de eerstvolgende bovenaan. In de echte versie staan ze ook in je agenda in Outlook.", "All fatal deadlines from open enquiries, the next one on top. In the real version they are also in your calendar in Outlook.")}</p>
      <div class="terms" style="margin-top:18px">${rows.length ? rows.map(r => `<a class="term fatal" style="text-decoration:none;color:inherit" href="#/bureau/${esc(r.i.id)}"><span class="d">${fmtL(r.d.date)}</span><span class="l"><b>${esc(r.d.label)}</b><span>${esc(r.i.source === "Verwijzer" ? (r.a.client || T("Verwijzing", "Referral")) : r.a.sender)}, ${esc(r.d.basis)}</span></span>${leftChip(r.d.date)}</a>`).join("") : `<p>${T("Geen open termijnen.", "No open deadlines.")}</p>`}</div>
      </div></div></div></div>`;
  }
  function renderResults() {
    const k = kpis(); const lanes = {};
    state.items.forEach(i => { const l = A(i).lane; lanes[l] = (lanes[l] || 0) + 1; });
    const max = Math.max.apply(null, Object.values(lanes).concat([1]));
    $("#app").innerHTML = `<div class="desk">${rail("resultaten")}<div class="main">${topbar()}<div class="page"><div class="page-in">
      <h2>${T("Resultaten", "Results")}</h2><p class="small">${T("Wat het bureau voor je doet, gemeten vanaf de eerste dag. In de schets tellen we wat je hier doet. In de echte versie komen de cijfers uit je Outlook.", "What the desk does for you, measured from day one. In the sketch we count what you do here. In the real version the figures come from your Outlook.")}</p>
      <div class="bigs"><div><b>${k.total}</b><span>${T("aanvragen binnen", "enquiries received")}</span></div><div><b>${k.done}</b><span>${T("antwoorden klaar", "replies ready")}</span></div><div><b>${k.watched}</b><span>${T("fatale termijnen bewaakt", "fatal deadlines watched")}</span></div><div><b class="${k.medNone ? "kv-t" : ""}" style="font-size:30px;line-height:1.5">${k.med}</b><span>${T("van openen tot antwoord klaar, mediaan", "from opening to reply ready, median")}</span></div></div>
      <div class="sec-h">${T("Per spoor", "Per lane")}</div><div class="bars">${Object.keys(LANES).map(l => `<div class="bar"><span>${esc(laneName(l)).replace("re-integratie", '<span class="nw">re-integratie</span>')}</span><span class="t"><i style="width:${((lanes[l] || 0) / max) * 100}%"></i></span><b class="mono">${lanes[l] || 0}</b></div>`).join("")}</div>
      <div class="sec-h">${T("Wat je na dertig dagen ziet", "What you see after thirty days")}</div><p style="max-width:680px">${T("Hoeveel aanvragen er binnenkwamen en via welk kanaal. Hoe snel elk eerste antwoord klaarstond. Hoeveel termijnen het bureau bewaakte. Hoeveel opdrachtbevestigingen dezelfde dag de deur uit gingen. En hoeveel aanvragen een zaak werden. Dat zijn jouw cijfers, uit je eigen mailbox.", "How many enquiries came in and through which channel. How fast each first reply was ready. How many deadlines the desk watched. How many engagement letters went out the same day. And how many enquiries became a case. Those are your figures, from your own mailbox.")}</p>
      </div></div></div></div>`;
  }
  function renderSettings() {
    const s = state.settings;
    $("#app").innerHTML = `<div class="desk">${rail("instellingen")}<div class="main">${topbar()}<div class="page"><div class="page-in settings">
      <h2>${T("Instellingen", "Settings")}</h2><p class="small">${T("Alles blijft in deze browser.", "Everything stays in this browser.")}</p>
      <div class="sec-h">${T("Conflictlijst", "Conflict list")}</div><p class="small">${T("Eén regel per naam. Naam, rol en dossier, gescheiden door een puntkomma. De voorbeelden zijn verzonnen.", "One line per name. Name, role and file, separated by a semicolon. The examples are made up.")}</p>
      <label class="sr" for="cl">${T("Conflictlijst", "Conflict list")}</label><textarea id="cl">${esc(conflictText(s.conflicts))}</textarea>
      <div class="sec-h">${T("Opdrachtbevestiging", "Engagement letter")}</div>
      <div class="row"><label class="field"><span>${T("Uurtarief in euro", "Hourly rate in euros")}</span><input id="rate" inputmode="decimal" value="${esc(s.rate)}" placeholder="${T("bijvoorbeeld 195", "for example 195")}"></label><label class="field"><span>${T("Plaats", "Place")}</span><input id="place" value="${esc(s.place)}"></label></div>
      <div class="row" style="margin-top:8px"><button class="btn btn-t" data-act="save-set">${T("Opslaan", "Save")}</button><button class="btn btn-g" data-act="reset">${T("Schets terugzetten naar het begin", "Reset the sketch to the start")}</button></div>
      </div></div></div></div>`;
  }

  /* ---------- plakken ---------- */
  function openPaste() {
    const m = document.createElement("div"); m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-labelledby", "pt");
    m.innerHTML = `<div class="modal-box"><h2 id="pt">${T("Plak een aanvraag", "Paste an enquiry")}</h2><p class="small">${T("Een mail, een WhatsApp of een bericht via je site. Het bureau zoekt de data, berekent de termijnen en schrijft een concept. Alles blijft in je browser.", "An email, a WhatsApp or a message through your site. The desk finds the dates, works out the deadlines and writes a draft. Everything stays in your browser.")}</p>
      <label class="sr" for="pv">${T("Tekst van de aanvraag", "Text of the enquiry")}</label><textarea id="pv" placeholder="${T("Plak hier de tekst van het bericht", "Paste the text of the message here")}"></textarea>
      <div class="row" style="justify-content:space-between"><div class="row"><label class="small" for="ps">${T("Binnengekomen via", "Came in through")}</label><select id="ps">${["E-mail", "Website", "WhatsApp", "Verwijzer"].map(v => `<option value="${v}">${srcTxt(v)}</option>`).join("")}</select></div>
      <div class="row"><button class="btn btn-g btn-s" data-m="ex">${T("Vul een voorbeeld in", "Fill in an example")}</button><button class="btn btn-g btn-s" data-m="x">${T("Annuleer", "Cancel")}</button><button class="btn btn-o btn-s" data-m="go">${T("Lees het bericht", "Read the message")}</button></div></div></div>`;
    document.body.appendChild(m); $("#pv", m).focus();
    const close = () => m.remove();
    m.addEventListener("click", e => {
      const b = e.target.closest("[data-m]"); if (e.target === m) close(); if (!b) return;
      if (b.dataset.m === "x") close();
      if (b.dataset.m === "ex") { $("#pv", m).value = PASTE_EXAMPLE(); $("#ps", m).value = "E-mail"; }
      if (b.dataset.m === "go") { const t = $("#pv", m).value.trim(); if (t.length < 20) { $("#pv", m).focus(); return; } const it = { id: "p" + Date.now(), source: $("#ps", m).value, name: "", received: Date.now(), text: t }; state.items.unshift(it); state.coach = false; save(); close(); location.hash = "#/bureau/" + it.id; }
    });
    m.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  /* ---------- router en klikken ---------- */
  function route() {
    const h = location.hash || "#/";
    const m = /^#\/bureau\/(.+)$/.exec(h);
    if (h === "#/" || h === "#") renderStart();
    else if (h === "#/wegwijzer") renderWW();
    else if (m) renderDesk(decodeURIComponent(m[1]));
    else if (h === "#/bureau") renderDesk(window.innerWidth > 900 ? (state.items.find(i => !i.status) || {}).id : null);
    else if (h === "#/termijnen") renderTerms();
    else if (h === "#/resultaten") renderResults();
    else if (h === "#/instellingen") renderSettings();
    else renderStart();
  }
  document.addEventListener("click", e => {
    const lg = e.target.closest("[data-lang]"); if (lg) { setLang(lg.dataset.lang); return; }
    const o = e.target.closest("[data-open]"); if (o) { location.hash = "#/bureau/" + o.dataset.open; return; }
    const g = e.target.closest("[data-go]"); if (g) { location.hash = g.dataset.go; return; }
    const b = e.target.closest("[data-act]"); if (!b) return;
    const act = b.dataset.act, it = CUR && /^#\/bureau/.test(location.hash) ? byId(CUR) : null;
    if (act === "paste") openPaste();
    if (act === "coach-x") { state.coach = false; save(); route(); }
    if (act === "approve" && it) { const d = $("#draft"); if (d) { it.drafts = it.drafts || {}; it.drafts[LANG] = d.value; } it.status = "klaar"; it.doneAt = Date.now(); state.coach = false; save(); route(); toast(A(it).conflict.hits.some(h => h.client) ? T("<b>Klaar.</b> Het antwoord staat als concept in je Outlook. De opdrachtbevestiging wacht op de conflictcheck. In deze schets blijft alles in je browser.", "<b>Done.</b> The reply is waiting as a draft in your Outlook. The engagement letter waits for the conflict check. In this sketch everything stays in your browser.") : T("<b>Klaar.</b> Het antwoord en de opdrachtbevestiging staan als concept in je Outlook. In deze schets blijft alles in je browser.", "<b>Done.</b> The reply and the engagement letter are waiting as drafts in your Outlook. In this sketch everything stays in your browser.")); }
    if (act === "decline" && it) { it.status = "afgewezen"; it.doneAt = Date.now(); save(); route(); toast(T("Niet aangenomen. In de echte versie staat er een vriendelijk afwijzend concept klaar, met een doorverwijzing.", "Not taken on. In the real version a friendly decline draft is ready, with a referral.")); }
    if (act === "reopen" && it) { delete it.status; delete it.doneAt; save(); route(); }
    if (act === "save-set") { state.settings.conflicts = $("#cl").value; state.settings.rate = $("#rate").value.trim(); state.settings.place = $("#place").value.trim() || "Hoensbroek"; save(); toast(T("Opgeslagen.", "Saved.")); }
    if (act === "reset") { state = fresh(); save(); WW.step = 1; WW.d0 = ""; WW.flags = {}; WW.sent = null; toast(T("De schets staat weer op het begin.", "The sketch is back at the start.")); location.hash = "#/bureau"; route(); }
    if (act === "ww-1") { const v = $("#d0").value; const d = fromISO(v); if (!d || d > today()) { $("#d0err").classList.remove("hidden"); return; } WW.d0 = v; WW.step = 2; renderWW(); window.scrollTo(0, 0); }
    if (act === "ww-back") { WW.step = 1; renderWW(); }
    if (act === "ww-2") { WW.step = 3; renderWW(); window.scrollTo(0, 0); }
    if (act === "ww-send") wwSend();
    if (act === "ww-reset") { WW.step = 1; WW.d0 = ""; WW.flags = {}; WW.sent = null; renderWW(); }
  });
  document.addEventListener("change", e => {
    const f = e.target.closest("[data-flag]"); if (f) { WW.flags[f.dataset.flag] = f.checked; f.closest(".check").classList.toggle("on", f.checked); }
  });
  document.addEventListener("keydown", e => { if (e.key === "Enter" && e.target && e.target.id === "d0") { e.preventDefault(); const btn = $('[data-act="ww-1"]'); if (btn) btn.click(); } });
  document.addEventListener("input", e => { if (e.target.id === "draft") { fitDraft(); const it = CUR && /^#\/bureau/.test(location.hash) ? byId(CUR) : null; if (it) { it.drafts = it.drafts || {}; it.drafts[LANG] = e.target.value; save(); } } });
  /* een nieuw scherm begint bovenaan, ook op een telefoon waar de hele pagina scrolt */
  window.addEventListener("hashchange", () => { route(); const c = $(".card"); if (c) c.scrollTop = 0; window.scrollTo(0, 0); });
  window.GV = { analyze: (t, src) => analyze({ text: t, source: src || "E-mail" }, state.settings), findFacts, today, setLang, lang: () => LANG };
  applyChrome();
  route();
})();
