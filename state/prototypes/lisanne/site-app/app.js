/* Gericht verder. Schets van Astra agency voor De Jong - Vanhommerig advocatuur.
   Alles draait in de browser. In de echte versie leest Claude (Amazon Bedrock, EU) de berichten
   en zet n8n de concepten in Outlook. Hier doen vaste regels hetzelfde werk, zodat de schets
   veilig te proberen is. Juridische bronnen staan in research/legal/LEGAL.md. */
(function () {
  "use strict";

  /* ---------- kleine hulpjes ---------- */
  const $ = (s, el) => (el || document).querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
  const DN = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
  const MONTHS = { januari: 0, jan: 0, februari: 1, feb: 1, maart: 2, mrt: 2, april: 3, apr: 3, mei: 4, juni: 5, jun: 5, juli: 6, jul: 6, augustus: 7, aug: 7, september: 8, sept: 8, sep: 8, oktober: 9, okt: 9, november: 10, nov: 10, december: 11, dec: 11 };
  const D = (y, m, d) => new Date(y, m, d, 12);
  const today = () => { const n = new Date(); return D(n.getFullYear(), n.getMonth(), n.getDate()); };
  const addDays = (d, n) => D(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const addMonths = (d, n) => { const y = d.getFullYear(), m = d.getMonth() + n, day = d.getDate(); const last = new Date(y, m + 1, 0, 12).getDate(); return D(y, m, Math.min(day, last)); };
  const days = (a, b) => Math.round((b - a) / 864e5);
  const fmt = d => d.getDate() + " " + MN[d.getMonth()] + " " + d.getFullYear();
  const fmtNY = d => d.getDate() + " " + MN[d.getMonth()];
  const fmtS = d => d.getDate() + " " + MN[d.getMonth()].slice(0, 3);
  const fmtL = d => DN[d.getDay()] + " " + fmt(d);
  const fmtNum = d => String(d.getDate()).padStart(2, "0") + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + d.getFullYear();
  const hhmm = t => { const d = new Date(t); return String(d.getHours()).padStart(2, "0") + "." + String(d.getMinutes()).padStart(2, "0"); };
  const whenTxt = t => { const d = new Date(t), T = today(); const dd = days(D(d.getFullYear(), d.getMonth(), d.getDate()), T); return dd === 0 ? "vandaag " + hhmm(t) : dd === 1 ? "gisteren " + hhmm(t) : fmtS(d) + " " + hhmm(t); };
  const toISO = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const fromISO = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); return m ? D(+m[1], +m[2] - 1, +m[3]) : null; };
  const revive = d => (d instanceof Date ? d : fromISO(d));
  const leftChip = d => { const n = days(today(), d); if (n < 0) return `<span class="left gone">${-n} dagen geleden</span>`; if (n === 0) return `<span class="left soon">vandaag</span>`; if (n <= 14) return `<span class="left soon">nog ${n} dagen</span>`; return `<span class="left ok">nog ${n} dagen</span>`; };
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
    { week: 1, off: 0, title: "Ziekmelding", text: "Je meldt je zo snel mogelijk ziek bij je werkgever.", ask: "" },
    { week: 6, off: 41, title: "Probleemanalyse", text: "Je hebt een gesprek met de bedrijfsarts of arbodienst. Die stelt vast wat je nog wel kunt en wat niet.", ask: "Vraag om een kopie van de probleemanalyse en vraag wat het advies betekent voor je werk." },
    { week: 8, off: 55, title: "Plan van aanpak", text: "Uiterlijk in week 8 maken jij en je werkgever samen het plan van aanpak. Daarin staat wat jullie gaan doen aan je re-integratie.", ask: "Lees het plan rustig voor je tekent, en vraag wanneer jullie het samen weer bekijken." },
    { week: 42, off: 294, title: "42e-weeksmelding", text: "Je werkgever meldt bij UWV dat je langdurig ziek bent, uiterlijk op de eerste werkdag na week 42.", ask: "Vraag je werkgever of de melding bij UWV is gedaan." },
    { week: 52, off: 363, title: "Eerstejaarsevaluatie", text: "Jij en je werkgever kijken samen terug op het eerste jaar van je re-integratie.", ask: "Zorg dat jouw kijk op het afgelopen jaar er ook in staat." },
    { week: 88, off: 609, title: "Brief van UWV over de WIA", text: "Je krijgt een brief van UWV. Daarin staat wat je moet doen om straks een WIA-uitkering te krijgen.", ask: "" },
    { week: 91, off: 630, title: "Eindevaluatie", text: "Jij en je werkgever geven aan hoe de re-integratie is gegaan.", ask: "" },
    { week: 93, off: 650, title: "WIA-aanvraag", text: "Uiterlijk in week 93 vraag je de WIA-uitkering aan.", ask: "" },
    { week: 104, off: 727, title: "Einde loondoorbetaling", text: "Je werkgever betaalt maximaal 104 weken je loon door.", ask: "" }
  ];
  const nextWorkday = d => { const w = d.getDay(); return w === 6 ? addDays(d, 2) : w === 0 ? addDays(d, 1) : d; };
  const poortDate = (d0, s) => (s.week === 42 ? nextWorkday(addDays(d0, s.off)) : addDays(d0, s.off));
  const weekOf = d0 => Math.floor(days(d0, today()) / 7) + 1;

  /* ---------- het lezen van een bericht ---------- */
  const RE_NUM = /\b(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4}|\d{2})\b/g;
  const RE_TXT = new RegExp("\\b(\\d{1,2})\\s+(" + Object.keys(MONTHS).sort((a, b) => b.length - a.length).join("|") + ")\\.?(?:\\s+(\\d{4}))?\\b", "gi");
  function inferYear(m, d) { const t = today(); let c = D(t.getFullYear(), m, d); if (days(t, c) > 150) c = D(t.getFullYear() - 1, m, d); return c; }
  function sentences(text) {
    const out = []; const re = /[.!?](?=\s+[A-Z(]|\s*$)|\n+/g; let start = 0, m;
    while ((m = re.exec(text))) { const end = m.index + m[0].length; if (text.slice(start, end).trim()) out.push([start, end]); start = end; }
    if (text.slice(start).trim()) out.push([start, text.length]);
    return out;
  }
  const KINDS = [
    ["uitspraak", /\b(uitspraak|beschikking|vonnis|kantonrechter)\b/],
    ["uwv", /\buwv\b[^.]*\b(geweigerd|afgewezen|weigert)\b|ontslagvergunning[^.]*geweigerd/],
    ["vso", /vaststellingsovereenkomst|\bvso\b|beëindigingsovereenkomst|beeindigingsovereenkomst/],
    ["einde", /opgezegd|opzegging|ontslagen|ontslag per|laatste werkdag|uit dienst|eindigt|beëindigd|beeindigd|einde van (mijn|het) (contract|dienstverband)|op staande voet/],
    ["ziek", /\bziek|ziekgemeld|ziekmelding|uitgevallen/]
  ];
  const KIND_TXT = { uitspraak: "Uitspraak kantonrechter", werkdag: "Laatste werkdag", uwv: "Weigering UWV", vso_getekend: "Vaststellingsovereenkomst getekend", vso_aangeboden: "Vaststellingsovereenkomst aangeboden", einde: "Einde dienstverband", ziek: "Eerste ziektedag", datum: "Datum in het bericht" };

  function findFacts(text) {
    const S = sentences(text), facts = [], seen = {};
    const push = (idx, len, date) => {
      const s = S.find(r => idx >= r[0] && idx < r[1]) || [0, text.length];
      const sent = text.slice(s[0], s[1]).trim(), low = sent.toLowerCase();
      let kind = "datum";
      for (const [k, re] of KINDS) if (re.test(low)) { kind = k; break; }
      if (kind === "vso") kind = /getekend|ondertekend|gesloten|akkoord gegaan|tekende/.test(low) ? "vso_getekend" : "vso_aangeboden";
      if (kind === "einde" && /laatste werkdag/.test(low) && !/opgezegd|opzegging|ontslag/.test(low)) kind = "werkdag";
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
  function withAtw(o) { const x = atw(o.date); if (toISO(x) !== toISO(o.date)) { o.orig = o.date; o.date = x; o.basis += ". Eindigt op " + DN[o.orig.getDay()] + " " + fmtNY(o.orig) + ", verlengd tot de eerstvolgende werkdag, art. 1 Algemene termijnenwet"; } return o; }

  function deadlinesFor(facts, text) {
    const out = []; const low = text.toLowerCase();
    /* Bij een vaststellingsovereenkomst is er geen opzegging om aan te vechten, dus geen termijnen uit 7:686a lid 4. */
    const vso = facts.some(f => /^vso/.test(f.kind)) || /vaststellingsovereenkomst|beëindigingsovereenkomst/.test(low);
    for (const f of facts) {
      if (f.kind === "vso_getekend") {
        const geen = /(niets|niet|geen)[^.]{0,50}bedenktermijn|bedenktermijn[^.]{0,30}(ontbreekt|staat er niet)/.test(low);
        out.push({ label: "Bedenktermijn vaststellingsovereenkomst", date: addDays(f.date, geen ? 21 : 14), basis: geen ? "art. 7:670b lid 3 BW, drie weken omdat de bedenktermijn niet in de overeenkomst staat" : "art. 7:670b lid 2 BW, veertien dagen", fatal: true });
      }
      if (f.kind === "einde" && !vso) {
        out.push({ label: "Verzoek vernietiging opzegging, billijke vergoeding of herstel", date: addMonths(f.date, 2), basis: "art. 7:686a lid 4 sub a BW, twee maanden na het einde", fatal: true });
        out.push({ label: "Verzoek transitievergoeding", date: addMonths(f.date, 3), basis: "art. 7:686a lid 4 sub b BW, drie maanden na het einde", fatal: true });
      }
      if (f.kind === "uitspraak") out.push({ label: "Hoger beroep instellen", date: addMonths(f.date, 3), basis: "art. 358 lid 2 Rv, drie maanden na de uitspraak", fatal: true });
      if (f.kind === "uwv") out.push({ label: "Verzoek kantonrechter na weigering UWV", date: addMonths(f.date, 2), basis: "art. 7:686a lid 4 sub d BW, twee maanden", fatal: true });
      if (f.kind === "ziek") for (const s of POORT.slice(1)) out.push({ label: s.title + ", week " + s.week, date: poortDate(f.date, s), basis: "Stappenplan bij ziekte van UWV", fatal: false });
    }
    return out.map(o => (o.fatal ? withAtw(o) : o)).sort((a, b) => a.date - b.date);
  }

  const LANES = {
    reint: { name: "Ziekte en re-integratie", re: /ziek|re-?integratie|bedrijfsarts|plan van aanpak|probleemanalyse|arbodienst|\bwia\b|loonstop|loon stop|deskundigenoordeel/g },
    ontslag: { name: "Ontslag en beëindiging", re: /ontslag|opzeg|vaststellingsovereenkomst|\bvso\b|transitievergoeding|beëindig|beeindig|\bww\b|staande voet/g },
    complex: { name: "Complexe zaak of hoger beroep", re: /hoger beroep|beschikking|uitspraak|kantonrechter|procedure|processtuk/g },
    verwijzer: { name: "Verwijzing", re: /verwijz|rechtsbijstand|verzekerde|dossiernummer|onze cliënt|namens/g }
  };
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
    m = new RegExp("(?:groet(?:en)?|groetjes|mvg),?\\s*\\n?\\s*((?:[A-Z]\\.\\s*)*" + NAME + "|[A-Z]\\.\\s*[A-Z][a-zà-ÿ'-]+)").exec(text); if (m) r.sender = m[1].trim();
    const reC = new RegExp("(de heer|mevrouw|dhr\\.|mw\\.)\\s+(" + NAME + ")", "g");
    while ((m = reC.exec(text))) { const nm = m[2].trim(); if (/jong|vanhommerig|lisanne/i.test(nm)) continue; r.client = nm; r.clientTitle = /mevrouw|mw/i.test(m[1]) ? "mevrouw" : "de heer"; break; }
    if (r.sender && /jong|vanhommerig|lisanne/i.test(r.sender)) delete r.sender;
    const orgs = new Set(); const re1 = /\b([A-Z][\w&'-]+(?:\s+[A-Z][\w&'-]+){0,3})\s+(B\.V\.|BV|N\.V\.|NV|VOF|Holding|Zorggroep|Groep)\b/g;
    while ((m = re1.exec(text))) orgs.add((m[1] + " " + m[2]).replace(/\s+/g, " "));
    const re2 = /\b((?:Rechtshulp|Rechtsbijstand|Advocaten|Advocatuur)\s+[A-Z][\w-]+)/g; while ((m = re2.exec(text))) orgs.add(m[1]);
    r.orgs = [...orgs];
    return r;
  }
  const norm = s => s.toLowerCase().replace(/\b(b\.?v\.?|n\.?v\.?|vof|holding)\b/g, "").replace(/[^a-zà-ÿ0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  function conflicts(names, list) {
    const rows = String(list || "").split("\n").map(l => l.split(";").map(x => x.trim())).filter(r => r[0]);
    const hits = [];
    for (const n of names) { const a = norm(n); if (a.length < 4) continue; for (const r of rows) { const b = norm(r[0]); if (b.length >= 4 && (a.includes(b) || b.includes(a))) hits.push({ name: n, as: r[1] || "", note: r[2] || "", client: /cli[eë]nt/i.test(r[1] || "") }); } }
    return { rows: rows.length, hits };
  }

  const DOCS = {
    reint: ["Probleemanalyse van de bedrijfsarts", "Plan van aanpak, als het er is", "Verslagen en adviezen van de bedrijfsarts", "Mail en brieven van je werkgever over je ziekte", "Je arbeidsovereenkomst en de cao", "Je laatste drie loonstroken"],
    ontslag: ["Je arbeidsovereenkomst en de cao", "De vaststellingsovereenkomst of de ontslagbrief", "Mail en brieven van je werkgever hierover", "Je laatste drie loonstroken"],
    complex: ["De beschikking van de kantonrechter", "Het verzoekschrift en het verweerschrift", "Het proces-verbaal van de zitting", "De producties uit de eerste aanleg"],
    verwijzer: ["De beschikking van de kantonrechter", "Het verzoekschrift en het verweerschrift", "Het proces-verbaal van de zitting", "De dekkingsbevestiging en uw dossiernummer"]
  };

  function analyze(item, settings) {
    const text = item.text || "";
    const facts = item.structured ? item.structured.facts.map(f => Object.assign({}, f, { date: revive(f.date) })) : findFacts(text);
    const dl = deadlinesFor(facts, text);
    const ln = item.structured ? { lane: "reint", second: null } : laneOf(text, item.source);
    const ppl = people(text);
    const sender = item.name || ppl.sender || "Afzender onbekend";
    const names = [sender].concat(ppl.client ? [ppl.client] : [], ppl.orgs);
    const cf = conflicts(names, settings.conflicts);
    const low = text.toLowerCase();
    const flags = [];
    const ziek = facts.find(f => f.kind === "ziek");
    if (/conflict|ruzie|leidinggevende|onenigheid/.test(low)) flags.push("Ziekte en conflict lopen door elkaar");
    if (/geen plan van aanpak|nog geen plan|plan van aanpak[^.]{0,30}(niet|nooit)/.test(low)) flags.push("Nog geen plan van aanpak gezien");
    if (/loon[^.]{0,25}(stopt|stop|stopzet|stopgezet|ingehouden|inhouden)|loonstop/.test(low)) flags.push("Werkgever dreigt het loon te stoppen");
    if (/(oneens|niet eens)[^.]{0,40}bedrijfsarts|bedrijfsarts[^.]{0,40}(oneens|niet eens)/.test(low)) flags.push("Twijfel over het advies van de bedrijfsarts");
    if (ziek && weekOf(ziek.date) > 8 && flags.indexOf("Nog geen plan van aanpak gezien") >= 0) flags.push("Week 8 is voorbij, het plan van aanpak had er moeten zijn");
    const fatal = dl.filter(d => d.fatal);
    const next = fatal.filter(d => days(today(), d.date) >= 0)[0];
    const urgent = !!(next && days(today(), next.date) <= 14);
    return { facts, deadlines: dl, fatal, next, urgent, lane: ln.lane, second: ln.second, sender, client: ppl.client, clientTitle: ppl.clientTitle, orgs: ppl.orgs, conflict: cf, flags, ziek };
  }

  /* ---------- concepten, door Lisanne te controleren ---------- */
  function firstName(n) { const p = String(n || "").replace(/^(mr\.|dhr\.|mw\.)\s*/i, "").split(/\s+/); return /^[A-Z]\.$/.test(p[0]) ? n : p[0]; }
  function replyDraft(it, a, s) {
    const fn = firstName(a.sender);
    const hi = it.source === "WhatsApp" ? "Hoi " + fn + "," : it.source === "Verwijzer" ? "Geachte " + a.sender + "," : "Beste " + fn + ",";
    const P = [hi, ""];
    if (a.conflict.hits.some(h => h.client)) {
      P.push(it.source === "Verwijzer" ? "Dank u voor uw bericht. Voor ik inhoudelijk reageer, controleer ik of ik deze zaak kan aannemen. U hoort vandaag van mij." : "Dank je voor je bericht. Voor ik inhoudelijk reageer, controleer ik of ik je zaak kan aannemen. Je hoort vandaag van mij.");
      P.push(""); P.push("Met vriendelijke groet,"); P.push(s.signName);
      return P.join("\n");
    }
    const org = a.orgs.find(o => !/rechtshulp|rechtsbijstand|advocat/i.test(o));
    const docs = (DOCS[a.lane] || DOCS.ontslag).map(d => "• " + d.charAt(0).toLowerCase() + d.slice(1));
    if (a.lane === "reint" && a.ziek) {
      P.push("Dank je voor je bericht." + (a.flags.indexOf("Ziekte en conflict lopen door elkaar") >= 0 ? " Vervelend dat je ziekte en het conflict nu door elkaar lopen, dat zie ik vaker." : ""));
      P.push("");
      let t = "Je bent sinds " + fmtNY(a.ziek.date) + " ziek, dus nu in week " + weekOf(a.ziek.date) + ".";
      if (weekOf(a.ziek.date) > 8) t += " Volgens het stappenplan van UWV maken jij en je werkgever uiterlijk in week 8 samen een plan van aanpak. Dat wil ik graag als eerste bekijken.";
      P.push(t);
      if (a.flags.indexOf("Werkgever dreigt het loon te stoppen") >= 0) { P.push(""); P.push("Je schrijft dat je werkgever dreigt je loon te stoppen. Dat wil ik snel met je bespreken."); }
    } else if (a.lane === "ontslag") {
      P.push("Dank je voor je bericht.");
      P.push("");
      const v = a.facts.find(f => f.kind === "vso_getekend"), e = a.facts.find(f => f.kind === "einde");
      const bt = a.deadlines.find(d => /Bedenktermijn/.test(d.label));
      if (v && bt) {
        P.push("Je hebt de vaststellingsovereenkomst" + (org ? " met " + org : "") + " op " + fmtNY(v.date) + " getekend. " + (/drie weken/.test(bt.basis) ? "Er staat geen bedenktermijn in, dus volgens de wet heb je drie weken om de overeenkomst zonder reden te ontbinden, tot en met " : "Je kunt de overeenkomst binnen veertien dagen zonder reden ontbinden, tot en met ") + fmtL(bt.date) + ". Laten we hem daarom snel samen doornemen.");
      } else if (e) {
        const t2 = a.deadlines.find(d => /vernietiging/.test(d.label)), t3 = a.deadlines.find(d => /transitie/.test(d.label));
        P.push("Je dienstverband" + (org ? " bij " + org : "") + " eindigde op " + fmtNY(e.date) + ". Wil je de opzegging aanvechten of een billijke vergoeding vragen, dan moet het verzoek uiterlijk " + fmtNY(t2.date) + " bij de kantonrechter liggen. Voor de transitievergoeding is dat uiterlijk " + fmtNY(t3.date) + ".");
      } else P.push("Ik kijk graag met je mee.");
    } else if (a.lane === "verwijzer" || a.lane === "complex") {
      P.push(it.source === "Verwijzer" ? "Dank u voor de verwijzing" + (a.client ? " van " + (a.clientTitle || "de heer") + " " + a.client : "") + "." : "Dank je voor je bericht.");
      const u = a.facts.find(f => f.kind === "uitspraak"), hb = a.deadlines.find(d => /Hoger beroep/.test(d.label));
      if (u && hb) { P.push(""); P.push("De beschikking van de kantonrechter is van " + fmtNY(u.date) + ". De termijn voor hoger beroep loopt tot en met " + fmtNY(hb.date) + "."); }
    } else { P.push("Dank je voor je bericht. Ik kijk graag met je mee."); }
    P.push("");
    if (a.conflict.hits.some(h => h.client)) P.push(it.source === "Verwijzer" ? "Voor ik inhoudelijk reageer, controleer ik of ik deze zaak kan aannemen. U hoort vandaag van mij." : "Voor ik inhoudelijk reageer, controleer ik of ik je zaak kan aannemen. Je hoort vandaag van mij.");
    else {
      P.push(it.source === "Verwijzer" ? "Ik controleer of er geen tegenstrijdig belang is en stuur u daarna een kostenbegroting. Kunt u mij intussen deze stukken sturen?" : "Wil je me deze stukken sturen?");
      P.push(docs.join("\n"));
      P.push("");
      P.push(it.source === "Verwijzer" ? "Met vriendelijke groet," : "Daarna bel ik je om te bespreken wat je nu het beste kunt doen. Je kunt mij ook bellen op " + s.phone + ".");
    }
    if (P[P.length - 1] !== "Met vriendelijke groet,") { P.push(""); P.push("Met vriendelijke groet,"); }
    P.push(s.signName);
    return P.join("\n");
  }
  function letterHTML(it, a, s) {
    const who = it.source === "Verwijzer" ? (a.client || "[naam cliënt]") : (a.sender || "[naam]");
    const fn = firstName(who);
    const org = a.orgs.find(o => !/rechtshulp|rechtsbijstand|advocat/i.test(o));
    const u = a.facts.find(f => f.kind === "uitspraak");
    const opdr = a.lane === "reint" ? "Bijstand bij je ziekte, je re-integratie en het conflict met je werkgever" + (org ? ", " + org : "") + "."
      : (a.lane === "complex" || a.lane === "verwijzer") ? "Bijstand in hoger beroep tegen de beschikking van de kantonrechter" + (u ? " van " + fmt(u.date) : "") + "."
      : "Advies over en bijstand bij het einde van je arbeidsovereenkomst" + (org ? " met " + org : "") + ".";
    const rate = s.rate ? "€ " + esc(s.rate) : '<mark title="Vul je uurtarief in bij Instellingen">[uurtarief]</mark>';
    return `<h4>Concept opdrachtbevestiging</h4>
      <p>${esc(s.place)}, ${fmt(today())}</p>
      <p>Aan ${esc(who)}, per e-mail</p>
      <p>Beste ${esc(fn)},</p>
      <p>Dank je voor je vertrouwen. Hierbij bevestig ik de opdracht die je mij geeft.</p>
      <p><span class="rl">De opdracht.</span> ${esc(opdr)}</p>
      <p><span class="rl">Tarief.</span> Ik reken op basis van een uurtarief van ${rate} exclusief btw en andere kosten, zoals griffierecht. Voor spoedzaken geldt een toeslag van 50%.${it.source === "Verwijzer" ? " Over de kosten maak ik afspraken met je rechtsbijstandsverzekeraar." : ""}</p>
      <p><span class="rl">Facturen.</span> Facturen betaal je binnen 14 dagen.</p>
      <p><span class="rl">Voorwaarden.</span> Op deze opdracht zijn mijn algemene voorwaarden en mijn kantoorklachtenregeling van toepassing. Mijn aansprakelijkheid is beperkt tot het bedrag dat mijn beroepsaansprakelijkheidsverzekering uitkeert.</p>
      <p><span class="rl">Hulpmiddelen.</span> Om binnenkomende stukken te ordenen gebruik ik een beveiligde AI-toepassing die binnen de EU draait en niets van jouw gegevens bewaart. Ik lees en controleer alles zelf. Wil je dat niet, laat het me weten, dan werk ik zonder.</p>
      <p>Graag ontvang ik deze bevestiging ondertekend retour.</p>
      <p>Met vriendelijke groet,<br>${esc(s.signName)}</p>`;
  }

  /* ---------- voorbeelden, verzonnen, met data rond vandaag ---------- */
  function samples() {
    const T = today(), now = Date.now(), H = 36e5;
    const y = new Date(); y.setDate(y.getDate() - 1);
    const at = (h, m) => { const d = new Date(y); d.setHours(h, m, 0, 0); return d.getTime(); };
    return [
      { id: "s1", source: "WhatsApp", name: "Mila Janssen", received: now - 2.2 * H, sample: true,
        text: "Hoi Lisanne, ik ben sinds " + fmtNY(addDays(T, -61)) + " ziek thuis. Het begon na een conflict met mijn leidinggevende bij Brunsveld Zorggroep. Ik heb nog geen plan van aanpak gezien en de bedrijfsarts zegt dat ik over twee weken weer halve dagen moet beginnen. Mijn werkgever zegt nu dat mijn loon stopt als ik niet meewerk. Kun je me helpen?\nGroet, Mila" },
      { id: "s2", source: "Verwijzer", name: "", received: now - 0.7 * H, sample: true,
        text: "Geachte mevrouw De Jong - Vanhommerig,\n\nGraag verwijzen wij onze verzekerde, de heer Youssef El Amrani, naar u voor hoger beroep. De kantonrechter in Maastricht heeft op " + fmt(addDays(T, -47)) + " de arbeidsovereenkomst met Terwinsel Bouw BV ontbonden zonder billijke vergoeding. Verzekerde wil in hoger beroep. Ons dossiernummer is RM 2026 0418. Wij ontvangen graag uw kostenbegroting.\n\nMet vriendelijke groet,\nJ. Lemmens\njuridisch adviseur arbeidsrecht\nRechtshulp Mergelland" },
      { id: "s3", source: "E-mail", name: "Dennis Hermans", received: at(21, 47), sample: true,
        text: "Beste mevrouw De Jong,\n\nOp " + fmtNY(addDays(T, -5)) + " heb ik een vaststellingsovereenkomst getekend met Vellmer Logistiek BV. Mijn laatste werkdag is " + fmtNum(addDays(T, 40)) + ". Ik twijfel nu of de vergoeding klopt en of ik wel recht heb op WW. In de overeenkomst staat niets over een bedenktermijn.\n\nMet vriendelijke groet,\nDennis Hermans" },
      { id: "s4", source: "Website", name: "Laura Smeets", received: at(16, 5), sample: true,
        text: "Mijn werkgever Heuvelland Metaal BV heeft mijn contract opgezegd per " + fmtNY(addDays(T, -48)) + ". De opzegging kwam kort nadat ik onveilig werk had gemeld. Ik heb nog geen transitievergoeding gekregen. Wat kan ik doen?" }
    ];
  }
  const PASTE_EXAMPLE = () => "Goedemiddag,\n\nIk ben op " + fmtNY(addDays(today(), -9)) + " op staande voet ontslagen door Geleenbeek Techniek BV. Volgens mijn werkgever zou ik gereedschap hebben meegenomen, maar dat klopt niet. Ik heb inmiddels een brief gekregen waarin het ontslag wordt bevestigd. Kunt u mij helpen?\n\nMet vriendelijke groet,\nRoy Kurvers";
  const DEFAULT_SETTINGS = { conflicts: "Heuvelland Metaal BV ; eerdere cliënt ; arbeidsrechtelijk advies 2025\nGeleenbeek Techniek BV ; wederpartij ; dossier 2026-014\nP. Coenen ; cliënt ; dossier 2026-014", rate: "", place: "Hoensbroek", signName: "mr. L.S.F. de Jong - Vanhommerig", phone: "045 208 08 59" };

  /* ---------- toestand ---------- */
  let state = store.load();
  if (!state || !state.v) state = { v: 1, items: samples(), settings: Object.assign({}, DEFAULT_SETTINGS), log: [], coach: true };
  const save = () => store.save(state);
  const byId = id => state.items.find(i => i.id === id);
  const A = it => analyze(it, state.settings);

  /* ---------- toast ---------- */
  let tt; function toast(msg) { const el = $("#toast"); el.innerHTML = msg; el.classList.remove("hidden"); clearTimeout(tt); tt = setTimeout(() => el.classList.add("hidden"), 6200); }

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
        <div class="kicker">Intakebureau</div>
        <h1>Elke nieuwe zaak <em>helder</em>, voordat je hem opent <span class="lineword" aria-hidden="true">${hatchSVG(9)}</span></h1>
        <p class="lead">Een werknemer vult de wegwijzer in, of er komt een mail, een WhatsApp of een verwijzing binnen. Jij vindt een kaart met de feiten, de termijnen, de conflictcheck en een concept antwoord. Er gaat niets weg zonder jouw akkoord.</p>
      </div>
      <div class="doors">
        <a class="door" href="#/bureau"><span class="who">Voor Lisanne</span><h2>Intakebureau</h2><p>${open} nieuwe aanvragen staan klaar, met de termijnen berekend en een concept antwoord.</p><span class="go">Open het bureau</span><img class="peek" src="icon.svg" alt=""></a>
        <a class="door" href="#/wegwijzer"><span class="who">Voor werknemers</span><h2>Re-integratie wegwijzer</h2><p>Zie waar je staat in je ziekte, wat er van je wordt verwacht en wanneer je hulp vraagt.</p><span class="go">Open de wegwijzer</span><img class="peek" src="icon.svg" alt=""></a>
      </div>
      <div class="steps3">
        <div><b>01</b><strong>Er komt een aanvraag binnen</strong>Via je site, je mail, WhatsApp of een verwijzer.</div>
        <div><b>02</b><strong>Het bureau maakt er een kaart van</strong>Feiten met de zin waar ze uit komen, termijnen en de conflictcheck.</div>
        <div><b>03</b><strong>Jij keurt goed</strong>Antwoord en opdrachtbevestiging staan als concept in Outlook.</div>
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
    ["conflict", "Er is een conflict met mijn werkgever of leidinggevende"],
    ["arts", "Ik ben het niet eens met de bedrijfsarts"],
    ["loon", "Mijn werkgever dreigt mijn loon te stoppen, of heeft dat gedaan"],
    ["pva", "Ik heb nog geen plan van aanpak gezien"],
    ["werk", "Mijn werkgever wil dat ik ander werk ga doen"],
    ["vso", "Ik heb een vaststellingsovereenkomst aangeboden gekregen"]
  ];
  function wwShell(inner) {
    return `<section class="ww"><header class="ww-head"><div class="ww-head-in"><img class="logo" src="logo.svg" alt="De Jong - Vanhommerig advocatuur"><a class="back" href="#/">Terug naar het begin</a></div></header>
      <div class="ww-main"><div class="kicker" style="color:var(--orange-t)">Re-integratie wegwijzer</div>${inner}
      <p class="sources">Algemene informatie, geen advies. Deze wegwijzer werkt met vaste regels op basis van het <a href="https://www.uwv.nl/particulieren/ziek/ziek-met-werkgever/re-integreren-tijdens-ziekte/detail/stappenplan-bij-ziekte" rel="noopener" target="_blank">stappenplan bij ziekte van UWV</a>, <a href="https://www.rijksoverheid.nl/onderwerpen/ziekteverzuim-van-het-werk/regels-en-verplichtingen-bij-ziekte" rel="noopener" target="_blank">Rijksoverheid</a> en <a href="https://wetten.overheid.nl/BWBR0005290/2026-07-01" rel="noopener" target="_blank">het Burgerlijk Wetboek</a>. Wat je invult blijft op dit apparaat tot je het zelf naar Lisanne stuurt.</p></div></section>`;
  }
  function renderWW() {
    const p = n => `<div class="prog" aria-hidden="true">${[1, 2, 3].map(i => `<span class="${i <= n ? "on" : ""}"></span>`).join("")}</div>`;
    let inner = "";
    if (WW.sent) {
      inner = `<h1>Dank je, ${esc(WW.sent.first)}.</h1>${p(3)}<div class="q done-box"><p class="big">Lisanne heeft je overzicht ontvangen.</p><p>Ze neemt contact met je op. Bewaar je stukken alvast bij elkaar, zoals de probleemanalyse en het plan van aanpak.</p><div class="q-actions"><a class="btn btn-t" href="#/bureau/${esc(WW.sent.id)}">Bekijk hoe het bij Lisanne binnenkomt</a><button class="btn btn-g" data-act="ww-reset">Opnieuw beginnen</button></div></div>`;
    } else if (WW.step === 1) {
      inner = `<h1>Waar sta je in je ziekte?</h1><p class="sub">Drie korte vragen. Daarna zie je waar je nu staat, wat er van je wordt verwacht en wanneer het slim is om hulp te vragen.</p>${p(1)}
        <div class="q"><h2>Wat was je eerste ziektedag?</h2><p class="hint">De dag waarop je je ziek meldde bij je werkgever.</p>
        <label class="sr" for="d0">Eerste ziektedag</label><input type="date" id="d0" value="${esc(WW.d0)}" max="${toISO(today())}">
        <div class="err hidden" id="d0err">Vul een datum in die niet in de toekomst ligt.</div>
        <div class="q-actions"><button class="btn btn-o" data-act="ww-1">Volgende</button></div></div>`;
    } else if (WW.step === 2) {
      inner = `<h1>Wat speelt er?</h1><p class="sub">Kies wat voor jou geldt. Niets is ook goed.</p>${p(2)}
        <div class="q"><h2>Herken je iets hiervan?</h2><p class="hint">Je antwoorden blijven op dit apparaat.</p><div class="checks">
        ${WFLAGS.map(([k, t]) => `<label class="check ${WW.flags[k] ? "on" : ""}"><input type="checkbox" data-flag="${k}" ${WW.flags[k] ? "checked" : ""}><span>${esc(t)}</span></label>`).join("")}
        </div><div class="q-actions"><button class="btn btn-g" data-act="ww-back">Terug</button><button class="btn btn-o" data-act="ww-2">Laat mijn overzicht zien</button></div></div>`;
    } else {
      const d0 = fromISO(WW.d0), w = weekOf(d0);
      const nowIdx = POORT.reduce((acc, s, i) => (w >= s.week ? i : acc), 0);
      const tl = POORT.map((s, i) => { const dt = poortDate(d0, s); const cls = i < nowIdx ? "done" : i === nowIdx ? "now" : ""; return `<li class="${cls}"><span class="dot"></span><div class="when">week ${s.week}, ${i === 0 ? fmt(d0) : (i < nowIdx ? "rond " : "rond ") + fmt(dt)}</div><h3>${esc(s.title)}${i === nowIdx ? ", hier ben je nu" : ""}</h3><p>${esc(s.text)}</p>${s.ask && i >= nowIdx - 1 ? `<div class="ask">${esc(s.ask)}</div>` : ""}</li>`; }).join("");
      const fl = [];
      if (WW.flags.conflict) fl.push(["Ziekte en conflict lopen vaak door elkaar", "Is er een conflict, dan helpt het om de feiten vroeg op een rij te zetten. Wie zei wat, en wanneer. Juist dan is een gesprek met een arbeidsrechtadvocaat zinvol.", "Lisanne, ziekte en re-integratie"]);
      if (WW.flags.arts) fl.push(["Je kunt een second opinion vragen", "Ben je het niet eens met de bedrijfsarts, dan kun je een second opinion bij een andere bedrijfsarts vragen. Je kunt ook bij UWV een deskundigenoordeel aanvragen. Dat kost € 100 en het is een advies.", "UWV, deskundigenoordeel"]);
      if (WW.flags.loon) fl.push(["Loon stoppen mag niet zomaar", "Je werkgever mag je loon inhouden als je niet meewerkt aan je re-integratie. Dreigt dat, laat het dan snel bekijken.", "Rijksoverheid, regels bij ziekte"]);
      if (WW.flags.pva && w >= 8) fl.push(["Het plan van aanpak had er al moeten zijn", "Uiterlijk in week 8 maken jij en je werkgever samen het plan van aanpak. Jij bent nu in week " + w + ".", "UWV, stappenplan bij ziekte"]);
      if (WW.flags.werk) fl.push(["Is het werk passend?", "Of werk passend is, kun je laten beoordelen met een deskundigenoordeel van UWV.", "UWV, deskundigenoordeel, situatie 2"]);
      if (WW.flags.vso) fl.push(["Teken niet zonder het te laten lezen", "Teken je een vaststellingsovereenkomst, dan mag je die binnen veertien dagen zonder reden ontbinden. Staat die bedenktermijn er niet in, dan zijn het drie weken. Laat hem bekijken voor je tekent.", "art. 7:670b BW"]);
      inner = `<h1>Jouw overzicht</h1>${p(3)}<div class="two"><div>
        <div class="q"><div class="week"><span class="n">${w}</span><span class="t"><b>Je bent in week ${w} van je ziekte</b>Eerste ziektedag ${fmt(d0)}</span></div>
        <ol class="tl">${tl}</ol><p class="small">Data zijn een hulpmiddel. Je werkgever en UWV houden de officiële data bij.</p></div></div>
        <div>${fl.length ? `<div class="sec-h">Let op</div><div class="flags">${fl.map(f => `<div class="flag"><h3>${esc(f[0])}</h3><p>${esc(f[1])}</p>${f[2] ? `<span class="src">Bron, ${esc(f[2])}</span>` : ""}</div>`).join("")}</div>` : `<div class="sec-h">Goed om te weten</div><div class="flags"><div class="flag"><h3>Loopt het vast?</h3><p>Zijn jij en je werkgever het oneens over je ziekte of je re-integratie, dan kun je een deskundigenoordeel bij UWV aanvragen, of een second opinion bij een andere bedrijfsarts.</p><span class="src">Bron, Rijksoverheid</span></div></div>`}
        <div class="cta-box"><h2>Leg het voor aan Lisanne</h2><p>Ze krijgt dit overzicht meteen, zodat je je verhaal niet opnieuw hoeft te vertellen.</p>
          <div class="field"><label for="wn">Je naam</label><input id="wn" autocomplete="name"></div>
          <div class="field"><label for="we">Je e-mail</label><input id="we" type="email" autocomplete="email"></div>
          <div class="field"><label for="wm">Wat wil je haar vertellen?</label><textarea id="wm" placeholder="Bijvoorbeeld wat er met je werkgever speelt."></textarea></div>
          <label class="consent"><input type="checkbox" id="wc"><span>Ik ga akkoord dat Lisanne mijn gegevens gebruikt om contact met mij op te nemen.</span></label>
          <div class="err hidden" id="werr" style="color:#FFD2C2">Vul je naam en e-mail in en zet het vinkje.</div>
          <button class="btn btn-o" data-act="ww-send">Stuur naar Lisanne</button></div>
        </div></div>`;
    }
    $("#app").innerHTML = wwShell(inner);
  }
  function wwSend() {
    const n = $("#wn").value.trim(), e = $("#we").value.trim(), m = $("#wm").value.trim(), c = $("#wc").checked;
    if (!n || !/.+@.+\..+/.test(e) || !c) { $("#werr").classList.remove("hidden"); return; }
    const d0 = fromISO(WW.d0), w = weekOf(d0);
    const picked = WFLAGS.filter(([k]) => WW.flags[k]).map(([, t]) => t);
    const text = "Ingevuld in de re-integratie wegwijzer.\nEerste ziektedag " + fmt(d0) + ", nu week " + w + ".\n" + (picked.length ? "Wat speelt er. " + picked.join(". ") + ".\n" : "") + (m ? "\n" + m : "");
    const it = { id: "w" + Date.now(), source: "Wegwijzer", name: n, email: e, received: Date.now(), text,
      structured: { facts: [{ kind: "ziek", date: toISO(d0), quote: "Eerste ziektedag ingevuld in de wegwijzer, " + fmt(d0) + ".", hit: fmt(d0) }] } };
    if (WW.flags.conflict) it.text += "\nEr is een conflict met mijn leidinggevende.";
    if (WW.flags.pva) it.text += "\nIk heb nog geen plan van aanpak gezien.";
    if (WW.flags.loon) it.text += "\nMijn werkgever dreigt mijn loon te stoppen.";
    state.items.unshift(it); save();
    WW.sent = { id: it.id, first: firstName(n) }; renderWW(); window.scrollTo(0, 0);
  }

  /* ---------- bureau ---------- */
  function greet() { const h = new Date().getHours(); return h < 12 ? "Goedemorgen" : h < 18 ? "Goedemiddag" : "Goedenavond"; }
  function kpis() {
    const all = state.items, done = all.filter(i => i.status === "klaar");
    const times = done.filter(i => i.openedAt && i.doneAt).map(i => (i.doneAt - i.openedAt) / 1000).sort((a, b) => a - b);
    const med = times.length ? times[Math.floor(times.length / 2)] : null;
    let watched = 0, hits = 0; all.forEach(i => { const a = A(i); watched += a.fatal.length; if (a.conflict.hits.some(h => h.client)) hits++; });
    const fmtT = s => s == null ? "nog geen" : s < 60 ? Math.round(s) + " s" : Math.floor(s / 60) + " min " + Math.round(s % 60) + " s";
    return { open: all.filter(i => !i.status).length, total: all.length, done: done.length, med: fmtT(med), watched, hits };
  }
  function rail(on) {
    const open = state.items.filter(i => !i.status).length;
    return `<nav class="rail" aria-label="Bureau"><img class="mark" src="icon.svg" alt="">
      <a href="#/bureau" class="${on === "bureau" ? "on" : ""}">${icon.inbox}<span>Aanvragen</span>${open ? `<i class="bad">${open}</i>` : ""}</a>
      <a href="#/termijnen" class="${on === "termijnen" ? "on" : ""}">${icon.clock}<span>Termijnen</span></a>
      <a href="#/resultaten" class="${on === "resultaten" ? "on" : ""}">${icon.chart}<span>Resultaten</span></a>
      <a href="#/instellingen" class="${on === "instellingen" ? "on" : ""}">${icon.gear}<span>Instellingen</span></a>
      <span class="sp"></span><a href="#/">${icon.door}<span>Begin</span></a></nav>`;
  }
  function topbar() {
    const k = kpis();
    return `<div class="topbar"><h1>${greet()}, Lisanne</h1><div class="kpis">
      <div class="kpi"><b>${k.open}</b><span>open aanvragen</span></div>
      <div class="kpi"><b>${k.watched}</b><span>termijnen bewaakt</span></div>
      <div class="kpi"><b class="${k.med === "nog geen" ? "kv-t" : ""}">${k.med === "nog geen" ? "nog niet gemeten" : k.med}</b><span>van openen tot antwoord klaar</span></div>
      <div class="kpi"><b>${k.done}</b><span>antwoorden klaar</span></div></div>
      <button class="btn btn-o btn-s" data-act="paste">${icon.plus}Plak een aanvraag</button></div>`;
  }
  function listHTML(sel) {
    const items = state.items.slice().sort((a, b) => (a.status ? 1 : 0) - (b.status ? 1 : 0) || b.received - a.received);
    return `<div class="list">${state.coach ? `<div class="coach"><span>Begin met een aanvraag. Of plak zelf een mail en kijk wat het bureau ervan maakt.</span><button data-act="coach-x" aria-label="Sluit de tip">Sluit</button></div>` : ""}
      <div class="list-h"><h2>Aanvragen</h2><span class="small">${items.length} totaal</span></div>
      ${items.map(it => { const a = A(it); const nxt = a.next; return `<button class="item ${it.id === sel ? "on" : ""}" data-open="${esc(it.id)}">
        <div class="r1"><span class="nm">${esc(it.source === "Verwijzer" ? (a.orgs.find(o => /rechtshulp|rechtsbijstand|advocat/i.test(o)) || a.sender) : a.sender)}</span><span class="tm">${whenTxt(it.received)}</span></div>
        <div class="pv">${esc(it.text.replace(/\s+/g, " ").slice(0, 150))}</div>
        <div class="r3"><span class="chip src">${esc(it.source)}</span><span class="chip lane">${esc(LANES[a.lane].name)}</span>
        ${it.status === "klaar" ? `<span class="chip ok">${icon.check.replace("<svg", '<svg width="12" height="12"')}klaar</span>` : it.status === "afgewezen" ? `<span class="chip">niet aangenomen</span>` : ""}
        ${!it.status && a.conflict.hits.some(h => h.client) ? `<span class="chip late">conflictcheck</span>` : ""}
        ${!it.status && nxt ? `<span class="chip ${days(today(), nxt.date) <= 14 ? "hot" : ""}"><i class="dotx"></i>termijn ${fmtS(nxt.date)}</span>` : ""}
        ${it.sample ? `<span class="chip src">voorbeeld</span>` : ""}</div></button>`; }).join("")}</div>`;
  }
  function lijn(a) {
    const T = today();
    let pts = a.facts.map(f => ({ d: f.date, t: KIND_TXT[f.kind] || "Datum", c: "fact" }));
    pts = pts.concat(a.deadlines.map(d => ({ d: d.date, t: d.label.replace(/,.*$/, "").replace("Verzoek vernietiging opzegging", "Vernietiging opzegging").replace("Brief van UWV over de WIA", "Brief UWV over WIA"), c: d.fatal ? "fatal" : "step" })));
    if (!pts.length) return "";
    const ds = pts.map(p => p.d).concat([T]);
    let min = new Date(Math.min.apply(null, ds)), max = new Date(Math.max.apply(null, ds));
    const span = Math.max(days(min, max), 10); min = addDays(min, -Math.round(span * 0.04)); max = addDays(max, Math.round(span * 0.06));
    const W = 860, P = 34, y = 96, X = d => P + (days(min, d) / days(min, max)) * (W - 2 * P);
    pts.sort((p, q) => p.d - q.d);
    const tx = X(T);
    let svg = `<line x1="${P}" y1="${y}" x2="${tx}" y2="${y}" stroke="#E1CBB2" stroke-width="3"/><line x1="${tx}" y1="${y}" x2="${W - P}" y2="${y}" stroke="#164C55" stroke-width="3"/><line x1="${W - P}" y1="${y}" x2="${W - 4}" y2="${y}" stroke="#FF5C00" stroke-width="3"/>`;
    svg += `<g class="today"><line x1="${tx}" y1="${y - 14}" x2="${tx}" y2="${y + 66}" stroke="#164C55" stroke-width="1.5" stroke-dasharray="3 3"/><text x="${tx}" y="${y + 80}" text-anchor="middle">vandaag</text></g>`;
    const rows = [[], []]; /* per rij de bezette stukken [links, rechts] */
    const fits = (r, l, rr) => rows[r].every(([a1, b1]) => rr + 10 < a1 || l - 10 > b1);
    pts.forEach((p, i) => {
      const x = X(p.d);
      if (p.c === "fatal") svg += `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" transform="rotate(45 ${x} ${y})" fill="#FF5C00"/>`;
      else if (p.c === "fact") svg += `<circle cx="${x}" cy="${y}" r="6.5" fill="#FFFDF9" stroke="#164C55" stroke-width="2.5"/>`;
      else svg += `<circle cx="${x}" cy="${y}" r="4" fill="#164C55"/>`;
      const label = p.t.length > 26 ? p.t.slice(0, 25) + "…" : p.t, date = fmtS(p.d) + (p.d.getFullYear() !== T.getFullYear() ? " " + p.d.getFullYear() : "");
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
    return `<svg class="lijn" viewBox="0 0 ${W} 190" role="img" aria-label="Tijdlijn van de zaak, met vandaag en de termijnen. Alle data staan ook in de lijst hieronder.">${svg}</svg><p class="small" style="margin:4px 0 0"><span style="color:#FF5C00">◆</span> fatale termijn &nbsp; <span style="color:#164C55">●</span> stap of datum uit het bericht. Niet elk label past, de volledige lijst staat hieronder.</p>`;
  }
  function highlight(q, hit) { const e = esc(q), h = esc(hit); const i = e.indexOf(h); return i < 0 ? e : e.slice(0, i) + "<mark>" + h + "</mark>" + e.slice(i + h.length); }
  function cardHTML(it) {
    if (!it) return `<div class="card"><div class="empty"><h2>Kies een aanvraag</h2><p>Links staan de nieuwe aanvragen. Open er een, of plak zelf een mail.</p></div></div>`;
    const a = A(it), s = state.settings;
    if (!it.openedAt) { it.openedAt = Date.now(); save(); }
    const title = it.source === "Verwijzer" ? (a.client ? a.client : "Verwijzing") : a.sender;
    const sum = [];
    if (it.source === "Verwijzer") sum.push("Verwijzing door " + (a.orgs.find(o => /rechtshulp|rechtsbijstand|advocat/i.test(o)) || a.sender) + (a.client ? " voor " + a.client : "") + ".");
    if (a.ziek) sum.push("Ziek sinds " + fmt(a.ziek.date) + ", nu week " + weekOf(a.ziek.date) + ".");
    a.facts.filter(f => f.kind !== "ziek").forEach(f => sum.push(KIND_TXT[f.kind] + " op " + fmt(f.date) + "."));
    a.flags.forEach(f => sum.push(f + "."));
    if (a.next) sum.push("Eerstvolgende fatale termijn " + fmtL(a.next.date) + ".");
    const cf = a.conflict;
    const cfHTML = cf.hits.length ? cf.hits.map(h => h.client ? `<div class="conflict hit"><span>!</span><div><b>Mogelijke treffer. ${esc(h.name)} staat in je lijst als ${esc(h.as)}${h.note ? " (" + esc(h.note) + ")" : ""}.</b>Kijk of je deze zaak mag aannemen voor je inhoudelijk reageert. Het concept antwoord houdt daar rekening mee.</div></div>` : `<div class="conflict clear"><span>i</span><div><b>${esc(h.name)} staat in je lijst als ${esc(h.as)}${h.note ? " (" + esc(h.note) + ")" : ""}.</b>Geen tegenstrijdig belang zolang je niet voor deze partij optreedt.</div></div>`).join("")
      : `<div class="conflict clear"><span>${icon.check.replace("<svg", '<svg width="18" height="18"')}</span><div><b>Geen treffer in je lijst van ${cf.rows} namen.</b>Gecontroleerd op ${esc([a.sender].concat(a.client ? [a.client] : [], a.orgs).join(", "))}.</div></div>`;
    const draft = it.draft != null ? it.draft : replyDraft(it, a, s);
    return `<div class="card"><div class="card-in">
      <button class="btn btn-g btn-s back-m" data-go="#/bureau">${icon.left}Alle aanvragen</button>
      <div class="card-head"><div><div class="meta"><span class="chip src">${esc(it.source)}</span><span>${whenTxt(it.received)}</span>${it.sample ? `<span class="chip src">voorbeeld, verzonnen</span>` : ""}</div>
        <h2>${esc(title)}</h2><div class="meta"><span class="chip lane">${esc(LANES[a.lane].name)}</span>${a.second ? `<span class="chip lane">${esc(LANES[a.second].name)}</span>` : ""}${a.urgent ? `<span class="chip hot"><i class="dotx"></i>spoed, termijn binnen 14 dagen</span>` : ""}</div></div></div>
      <div class="note-ai">${icon.info}<span>In de echte versie leest Claude dit bericht, binnen de EU, en zet n8n de concepten in je Outlook. In deze schets doen vaste regels hetzelfde in je browser. Bij elk feit staat de zin waar het uit komt.</span></div>
      <div class="block"><h3>Samenvatting</h3><ul class="summary">${sum.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      ${a.facts.length ? `<div class="block"><h3>De lijn</h3>${lijn(a)}</div>` : ""}
      <div class="block"><h3>Uit het bericht</h3>${a.facts.length ? `<div class="facts">${a.facts.map(f => `<div class="fact"><div class="k">${esc(KIND_TXT[f.kind])}<b>${fmt(f.date)}</b></div><q>${highlight(f.quote, f.hit)}</q></div>`).join("")}</div>` : `<p class="small">Geen datum gevonden. Vraag de belangrijkste data na in je antwoord.</p>`}</div>
      ${a.deadlines.length ? `<div class="block"><h3>Termijnen</h3><div class="terms">${a.deadlines.map(d => `<div class="term ${d.fatal ? "fatal" : "step"}"><span class="d">${fmtL(d.date)}</span><span class="l"><b>${esc(d.label)}</b><span>${esc(d.basis)}${d.fatal ? ", fatale termijn" : ""}</span></span>${days(today(), d.date) < 0 && !d.fatal ? '<span class="left past">voorbij</span>' : leftChip(d.date)}</div>`).join("")}</div><p class="small" style="margin-top:10px">Berekend als hulpmiddel. Controleer elke termijn zelf.</p></div>` : ""}
      <div class="block"><h3>Conflictcheck</h3>${cfHTML}</div>
      <div class="block"><h3>Op te vragen</h3><ul class="docs">${(DOCS[a.lane] || DOCS.ontslag).concat(it.source === "Verwijzer" ? [] : ["Kopie identiteitsbewijs, bsn en pasfoto afgeschermd"]).map(d => `<li>${esc(d)}</li>`).join("")}</ul></div>
      <div class="block"><h3>Concept antwoord</h3><label class="sr" for="draft">Concept antwoord</label><textarea class="draft" id="draft">${esc(draft)}</textarea></div>
      <div class="block"><h3>Concept opdrachtbevestiging</h3><div class="letter" tabindex="0" role="region" aria-label="Concept opdrachtbevestiging">${letterHTML(it, a, s)}</div></div>
      <div class="actions">${it.status === "klaar" ? `<div class="status">${icon.check.replace("<svg", '<svg width="18" height="18"')}Klaar. Antwoord en opdrachtbevestiging staan als concept in je Outlook.</div><button class="btn btn-g btn-s" data-act="reopen">Terugzetten</button>`
        : it.status === "afgewezen" ? `<div class="status" style="background:#EEE;color:#444">Niet aangenomen.</div><button class="btn btn-g btn-s" data-act="reopen">Terugzetten</button>`
        : `<button class="btn btn-o" data-act="approve">${icon.check}Goedkeuren, zet in Outlook concepten</button><button class="btn btn-g" data-act="decline">Niet aannemen</button>`}</div>
    </div></div>`;
  }
  function renderDesk(sel) {
    const it = sel ? byId(sel) : null;
    $("#app").innerHTML = `<div class="desk">${rail("bureau")}<div class="main">${topbar()}<div class="panes ${it ? "has-card" : ""}">${listHTML(sel)}${cardHTML(it)}</div></div></div>`;
  }
  function renderTerms() {
    const rows = [];
    state.items.filter(i => !i.status).forEach(i => { const a = A(i); a.fatal.forEach(d => rows.push({ i, a, d })); });
    rows.sort((x, y) => x.d.date - y.d.date);
    $("#app").innerHTML = `<div class="desk">${rail("termijnen")}<div class="main">${topbar()}<div class="page"><div class="page-in">
      <h2>Termijnen</h2><p class="small">Alle fatale termijnen uit open aanvragen, de eerstvolgende bovenaan. In de echte versie staan ze ook in je Outlook agenda.</p>
      <div class="terms" style="margin-top:18px">${rows.length ? rows.map(r => `<a class="term fatal" style="text-decoration:none;color:inherit" href="#/bureau/${esc(r.i.id)}"><span class="d">${fmtL(r.d.date)}</span><span class="l"><b>${esc(r.d.label)}</b><span>${esc(r.i.source === "Verwijzer" ? (r.a.client || "Verwijzing") : r.a.sender)}, ${esc(r.d.basis)}</span></span>${leftChip(r.d.date)}</a>`).join("") : `<p>Geen open termijnen.</p>`}</div>
      </div></div></div></div>`;
  }
  function renderResults() {
    const k = kpis(); const lanes = {};
    state.items.forEach(i => { const l = A(i).lane; lanes[l] = (lanes[l] || 0) + 1; });
    const max = Math.max.apply(null, Object.values(lanes).concat([1]));
    $("#app").innerHTML = `<div class="desk">${rail("resultaten")}<div class="main">${topbar()}<div class="page"><div class="page-in">
      <h2>Resultaten</h2><p class="small">Wat het bureau voor je doet, gemeten vanaf de eerste dag. In de schets tellen we wat je hier doet. In de echte versie komen de cijfers uit je Outlook.</p>
      <div class="bigs"><div><b>${k.total}</b><span>aanvragen binnen</span></div><div><b>${k.done}</b><span>antwoorden klaar</span></div><div><b>${k.watched}</b><span>fatale termijnen bewaakt</span></div><div><b style="font-size:30px;line-height:1.5">${k.med}</b><span>van openen tot antwoord klaar, mediaan</span></div></div>
      <div class="sec-h">Per spoor</div><div class="bars">${Object.keys(LANES).map(l => `<div class="bar"><span>${esc(LANES[l].name)}</span><span class="t"><i style="width:${((lanes[l] || 0) / max) * 100}%"></i></span><b class="mono">${lanes[l] || 0}</b></div>`).join("")}</div>
      <div class="sec-h">Wat je na dertig dagen ziet</div><p style="max-width:680px">Hoeveel aanvragen er binnenkwamen en via welk kanaal. Hoe snel elk eerste antwoord klaarstond. Hoeveel termijnen het bureau bewaakte. Hoeveel opdrachtbevestigingen dezelfde dag de deur uit gingen. En hoeveel aanvragen een zaak werden. Dat zijn jouw cijfers, uit je eigen mailbox.</p>
      </div></div></div></div>`;
  }
  function renderSettings() {
    const s = state.settings;
    $("#app").innerHTML = `<div class="desk">${rail("instellingen")}<div class="main">${topbar()}<div class="page"><div class="page-in settings">
      <h2>Instellingen</h2><p class="small">Alles blijft in deze browser.</p>
      <div class="sec-h">Conflictlijst</div><p class="small">Eén regel per naam. Naam, rol en dossier, gescheiden door een puntkomma. De voorbeelden zijn verzonnen.</p>
      <label class="sr" for="cl">Conflictlijst</label><textarea id="cl">${esc(s.conflicts)}</textarea>
      <div class="sec-h">Opdrachtbevestiging</div>
      <div class="row"><label class="field"><span>Uurtarief in euro</span><input id="rate" inputmode="decimal" value="${esc(s.rate)}" placeholder="bijvoorbeeld 195"></label><label class="field"><span>Plaats</span><input id="place" value="${esc(s.place)}"></label></div>
      <div class="row" style="margin-top:8px"><button class="btn btn-t" data-act="save-set">Opslaan</button><button class="btn btn-g" data-act="reset">Schets terugzetten naar het begin</button></div>
      </div></div></div></div>`;
  }

  /* ---------- plakken ---------- */
  function openPaste() {
    const m = document.createElement("div"); m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-labelledby", "pt");
    m.innerHTML = `<div class="modal-box"><h2 id="pt">Plak een aanvraag</h2><p class="small">Een mail, een WhatsApp of een bericht via je site. Het bureau zoekt de data, berekent de termijnen en schrijft een concept. Alles blijft in je browser.</p>
      <label class="sr" for="pv">Tekst van de aanvraag</label><textarea id="pv" placeholder="Plak hier de tekst van het bericht"></textarea>
      <div class="row" style="justify-content:space-between"><div class="row"><label class="small" for="ps">Binnengekomen via</label><select id="ps"><option>E-mail</option><option>Website</option><option>WhatsApp</option><option>Verwijzer</option></select></div>
      <div class="row"><button class="btn btn-g btn-s" data-m="ex">Vul een voorbeeld in</button><button class="btn btn-g btn-s" data-m="x">Annuleer</button><button class="btn btn-o btn-s" data-m="go">Lees het bericht</button></div></div></div>`;
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
    const o = e.target.closest("[data-open]"); if (o) { location.hash = "#/bureau/" + o.dataset.open; return; }
    const g = e.target.closest("[data-go]"); if (g) { location.hash = g.dataset.go; return; }
    const b = e.target.closest("[data-act]"); if (!b) return;
    const act = b.dataset.act, cur = (/^#\/bureau\/(.+)$/.exec(location.hash) || [])[1], it = cur ? byId(decodeURIComponent(cur)) : null;
    if (act === "paste") openPaste();
    if (act === "coach-x") { state.coach = false; save(); route(); }
    if (act === "approve" && it) { const d = $("#draft"); it.draft = d ? d.value : it.draft; it.status = "klaar"; it.doneAt = Date.now(); state.coach = false; save(); route(); toast("<b>Klaar.</b> Het antwoord en de opdrachtbevestiging staan als concept in je Outlook. In deze schets blijft alles in je browser."); }
    if (act === "decline" && it) { it.status = "afgewezen"; it.doneAt = Date.now(); save(); route(); toast("Niet aangenomen. In de echte versie staat er een vriendelijk afwijzend concept klaar, met een doorverwijzing."); }
    if (act === "reopen" && it) { delete it.status; delete it.doneAt; save(); route(); }
    if (act === "save-set") { state.settings.conflicts = $("#cl").value; state.settings.rate = $("#rate").value.trim(); state.settings.place = $("#place").value.trim() || "Hoensbroek"; save(); toast("Opgeslagen."); }
    if (act === "reset") { state = { v: 1, items: samples(), settings: Object.assign({}, DEFAULT_SETTINGS), log: [], coach: true }; save(); WW.step = 1; WW.d0 = ""; WW.flags = {}; WW.sent = null; toast("De schets staat weer op het begin."); location.hash = "#/bureau"; route(); }
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
  document.addEventListener("input", e => { if (e.target.id === "draft") { const cur = (/^#\/bureau\/(.+)$/.exec(location.hash) || [])[1]; const it = cur && byId(decodeURIComponent(cur)); if (it) { it.draft = e.target.value; save(); } } });
  window.addEventListener("hashchange", () => { route(); const c = $(".card"); if (c) c.scrollTop = 0; });
  window.GV = { analyze: (t, src) => analyze({ text: t, source: src || "E-mail" }, state.settings), findFacts, today };
  route();
})();
