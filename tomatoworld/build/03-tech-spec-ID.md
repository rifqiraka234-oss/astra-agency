# Tomatoworld — Spesifikasi Teknis & Permintaan Estimasi
**Kepada:** Tim engineering Amwisesa · **Dari:** Astra Agency · **v2, 18 September 2026**
**Yang kami butuhkan:** estimasi effort dalam developer-days per modul, asumsi, risiko, dan rekomendasi arsitektur

> **Dokumen ini sengaja tidak memuat angka komersial apa pun.** Estimasikan murni dari
> beban kerja engineering-nya. Penawaran ke klien akhir ditangani terpisah oleh Astra.

---

# BAGIAN 1 — SIAPA KLIENNYA

## 1.1 Organisasinya

**Tomatoworld** (tomatoworld.nl) berlokasi di Honselersdijk, kawasan **Westland**,
Belanda — konsentrasi rumah kaca (greenhouse) berteknologi tinggi terpadat di dunia.
Berdiri sejak 2007 dan sejak 2010 berbentuk **stichting**, yaitu yayasan nirlaba
Belanda.

Tomatoworld menjalankan dua peran sekaligus:

1. **Experience centre.** Pengunjung mengikuti tur berpemandu di dalam rumah kaca
   berteknologi tinggi yang benar-benar beroperasi, dan belajar bagaimana Belanda —
   negara kecil — bisa menjadi eksportir pertanian terbesar kedua di dunia. Ribuan
   pengunjung per tahun, dari berbagai negara.
2. **Field lab.** Perusahaan teknologi, startup, dan universitas menguji teknologi
   nyata pada tanaman tomat hidup: 5G, sensor IoT, sistem budidaya otonom, robot
   pemanen, dan kontrol iklim berbasis AI.

## 1.2 Kenapa Tomatoworld ada — bagian yang menjelaskan seluruh model bisnisnya

**Rumah kaca komersial di Belanda tidak bisa menerima pengunjung.** Virus tanaman
sangat mudah menyebar, dan satu pengunjung yang kemarin masuk ke kebun petani lain
bisa memusnahkan panen bernilai jutaan euro. Petani tidak mau ambil risiko itu.

**Tomatoworld bisa**, karena pemasukannya bukan dari menjual tomat, melainkan dari
menceritakan kisahnya. Pengunjung tetap melewati protokol higienis, tapi pintunya
terbuka.

Inilah keunggulan utama mereka. Tomatoworld praktis satu-satunya tempat di mana
delegasi internasional benar-benar bisa masuk ke rumah kaca Belanda yang beroperasi.
**Kalau bagian ini dipahami, sisa sistemnya jadi masuk akal** — sign-off biosecurity,
bahasa pemandu, logistik rombongan, dan visibilitas partner.

## 1.3 Dari mana uangnya

| Sumber | Cara kerjanya |
|---|---|
| **Iuran partner** | 30+ perusahaan (Koppert, Rijk Zwaan, dan sejenisnya) membayar tiap tahun. Logo dan peralatan mereka tampil di rumah kaca, mereka bisa menguji produk pada tanaman hidup, dan **mereka membawa pelanggan mereka sendiri ikut tur**. Ini sumber pemasukan terbesar. |
| **Tur berpemandu** | Dihitung per tur ditambah per orang. Produknya mencakup tur umum, jenjang pendidikan (SD / SMP-SMA / vokasi / universitas, masing-masing punya kelompok tarif sendiri), tur bertema, dan tur online. |
| **Sewa ruang** | Ruang ekspo dan field lab, dengan syarat dan ketentuan terpisah. *Di luar scope sekarang — tapi rancang agar bisa ditambahkan nanti tanpa rework.* |
| **Booking spesialis** | Produk ketiga yang bisa dipesan. Catatan yang sama. |

## 1.4 Bagaimana operasionalnya hari ini

- Satu formulir web panjang → masuk ke inbox email → **dikoordinasikan manual oleh
  satu orang**.
- Setiap pembatalan memicu rantai email manual.
- **Penutupan musiman (rotasi tanaman) ditulis hardcoded di halaman web.** Saat kami
  cek 15 September, halaman itu masih menulis "NO GUIDED TOURS AVAILABLE UNTIL
  1 SEPTEMBER 2026" — sudah lewat dua minggu, tapi tetap memberi tahu semua pengunjung
  bahwa mereka tutup.
- Tur dijalankan dalam **lima bahasa: Belanda, Inggris, Jerman, Jepang, Mandarin**.
- **Pemandu sebagian besar relawan**, banyak yang sudah pensiun. Ketersediaan mereka
  tidak teratur. **Cakupan bahasa adalah batasan paling keras** dalam menentukan
  rombongan mana yang bisa diterima.
- Tidak ada sistem booking, tidak ada CRM, tidak ada pembayaran online. Semuanya
  transfer bank dan invoice yang dibuat manual.
- Partner **tidak menerima laporan apa pun** tentang apa yang mereka dapat dari iuran
  tahunan. Perpanjangan kontrak murni bergantung pada hubungan baik.

## 1.5 Nama-nama yang mungkin disebut

| Nama | Peran |
|---|---|
| **Aart** | Memimpin organisasi dan memegang hubungan dengan partner. Fokusnya pemasukan dan perpanjangan kontrak. |
| **Joyce** | Operasional harian, termasuk booking. Orang yang beban kerjanya akan dikurangi proyek ini. |
| **Ank** | Profesional komunikasi yang sudah pensiun, pemandu relawan. Pendukung kami di dalam organisasi. Bukan orang teknis. |
| **Panorama Studios** | Agensi web eksisting di Naaldwijk. Membangun dan merawat website mereka. **Teman dekat klien. Mereka tidak sedang digantikan.** |

## 1.6 Pembagian kerja Astra dan Amwisesa

| Astra (Belanda) | Amwisesa (Indonesia) |
|---|---|
| Discovery, requirements, clickable prototype | **Seluruh tujuh modul di Bagian 5** |
| Hubungan klien, project management | Arsitektur, implementasi, testing |
| Branding, story, social media | Deployment, monitoring, support |
| Restrukturisasi dan redesign website | |

---

# BAGIAN 2 — LINGKUNGAN TEKNIS

## 2.1 Temuan yang sudah diverifikasi

Dikumpulkan dari HTTP response publik, 14–15 September 2026. Klien secara terpisah
mengonfirmasi: *"website is built in C# op het .NET-framework, met Umbraco als CMS."*

| Layer | Temuan | Bukti |
|---|---|---|
| CMS | **Umbraco 13 LTS** | `/umbraco` → `/umbraco/login`, backoffice Bellissima (Lit web components, `uui-css`); `/App_Plugins/uSync/usync.13.3.2.min.css` |
| Runtime | **ASP.NET Core, .NET 8** | Target framework Umbraco 13; lihat Q1 |
| Web tier | **Kestrel** di belakang **Phusion Passenger 6.1.2**, **Plesk di Linux** | Header `server:` dan `x-powered-by:` |
| Media | ImageSharp.Web | `/media/{guid}/file.jpg?width=&height=&rxy=&v=` |
| Package | uSync 13.3.2, SEO Toolkit, `PanoramaStudios.Custom` | Path aset `/App_Plugins/` |
| Frontend | bundle webpack, **vanilla JS**, GSAP 3.12.5 + ScrollTrigger + Observer, Swiper, lightGallery 2.7.2, font Nunito di-host sendiri. **Tanpa framework SPA, tanpa jQuery** | LICENSE manifest di bundle |
| Skala | 373 URL, NL/EN dengan `hreflang` | sitemap.xml |
| Analytics | GTM `GTM-NRDKKVZ`, **jalan tanpa consent gate** | source halaman |
| Security header | `Permissions-Policy`, `Referrer-Policy: no-referrer`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff` | response header |

> ⚠️ **`X-Frame-Options: SAMEORIGIN` aktif.** Kalau kalian mengusulkan embed berbasis
> iframe dari domain kami, **akan diblokir**. Entah mereka melonggarkannya lewat CSP
> `frame-ancestors` untuk origin kami, atau kita pakai embed script-mount.
> **Perhitungkan ini dalam pendekatan kalian.**

## 2.2 Q1 — tolong pastikan sebelum estimasi difinalkan

Klien menyebut ".NET-framework". Dalam percakapan sehari-hari orang Belanda, itu
biasanya cuma berarti ".NET". .NET Framework 4.x yang lama **tidak mungkin menjalankan
Umbraco 13 di Linux**, sementara header menunjukkan Linux + Kestrel. Kesimpulan kami:
**.NET 8**. **Tolong sebutkan asumsi mana yang kalian pakai.**

## 2.3 Batasan dari agensi eksisting

Panorama Studios tidak sedang digeser. Asumsikan:
- **Tidak ada akses repository, tidak ada hak deploy, tidak ada akses database.**
- Setiap perubahan template Razor adalah **permintaan ke pihak ketiga**, mengikuti
  jadwal mereka, bukan task di board kita.
- Design token/CSS kemungkinan harus kita replikasi sendiri, bukan di-import.
- Mereka memakai uSync, jadi mereka punya alur dev → staging → prod. Kita tidak ada
  di pipeline itu.

---

# BAGIAN 3 — ARSITEKTUR

## 3.1 Opsi A — Umbraco package (in-process)

Dibangun sebagai package Umbraco 13: document types, endpoint `SurfaceController` /
`UmbracoApiController`, section backoffice custom, migrasi EF Core ke database
mereka, dan `App_Plugins` untuk UI backoffice.

**Kelebihan:** satu deployment; otentikasi partner bisa pakai Umbraco Members; tanpa
CORS; staf memakai backoffice yang sudah mereka kenal; tanpa biaya hosting tambahan.
**Kekurangan:** siklus rilis kita jadi terikat pada Panorama; butuh akses repo +
pipeline + produksi yang mungkin tidak akan pernah kita dapat; **host Plesk/Passenger
mereka mungkin tidak punya kapasitas lebih**; risiko besar saat upgrade ke Umbraco 14+
(backoffice ditulis ulang, breaking); database mereka jadi dependency kita.

## 3.2 Opsi B — Service terpisah + embed ✅ *asumsi kerja kami saat ini*

Service independen di infrastruktur kita. Halaman Umbraco me-mount sebuah widget.
Konten dibaca dari **Umbraco Content Delivery API** (tersedia sejak v12) bila perlu.

**Kelebihan:** kita pegang penuh stack, ritme rilis, dan quality gate; satu-satunya
ketergantungan ke Panorama hanya pemasangan snippet sekali; tahan terhadap upgrade
Umbraco mereka; bisa dipakai ulang untuk klien lain.
**Kekurangan:** otentikasi terpisah; hosting terpisah; styling harus dicocokkan
manual; SEO halaman booking lebih lemah; perlu menangani CORS, CSP, dan cookie
`SameSite`.

### Mekanisme embed yang perlu kalian tentukan
- **Script-mount** (`<script src>` + `<div>` target) — lebih kami sukai. Tidak kena
  masalah `X-Frame-Options`. Butuh izin CSP `script-src` dari Panorama, isolasi style
  (Shadow DOM atau prefix ketat), dan tidak boleh bentrok dengan GSAP/Swiper yang
  sudah ada di halaman.
- **iframe** — isolasinya lebih sederhana, tapi diblokir `X-Frame-Options` mereka saat
  ini, dan merepotkan untuk tinggi dinamis, deep link, serta redirect pembayaran.
- **Cookie:** konteksnya third-party. Pakai `SameSite=None; Secure`, atau hindari
  cookie sama sekali dengan token di URL + session pendek di `sessionStorage`.

**Tolong berikan rekomendasi kalian beserta alasannya.** Kalau Amwisesa memang
terutama .NET shop, Opsi A bisa jadi jauh lebih murah bagi kalian daripada asumsi
kami — sampaikan saja. Opsi B yang ditulis dengan .NET juga sama diterimanya; kami
tidak punya preferensi stack, hanya preferensi soal kualitas dan maintainability.

**Default kami kalau kalian tidak punya pandangan kuat:** Opsi B, .NET 8 Web API +
PostgreSQL, embed berupa bundle Preact atau vanilla yang kecil.

---

# BAGIAN 4 — MODEL DOMAIN

```
TourProduct       id, code, name{i18n}, description{i18n}, durationMin,
                  minGroup, maxGroup, basePrice, pricePerPerson,
                  supportedLanguages[], audienceTypes[], leadTimeDays, active
TourVariant       id, tourProductId, name{i18n},
                  feeBand (PO|VO|MBO|HBO|WO|CORPORATE|PRIVATE|INTERNATIONAL),
                  priceOverride, pricePerPersonOverride
Addon             id, code, name{i18n}, price, appliesToProducts[]
ScheduleRule      id, tourProductId, weekday, startTimeLocal, capacity,
                  validFrom, validTo, active
ClosurePeriod     id, startDate, endDate, reasonCode, message{i18n}, blocksBooking
TimeSlot          id, tourProductId, startsAtUtc, localDate, localTime,
                  capacityTotal, capacityHeld, capacityConfirmed,
                  status (OPEN|FULL|CLOSED|CANCELLED)
Booking           id, reference, timeSlotId, tourVariantId, groupSize,
                  requestedLanguage, status, contactId, partnerId?,
                  subtotal, addonTotal, vatAmount, total, currency,
                  paymentStatus, source, createdAt, confirmedAt,
                  cancelledAt, cancellationReason, version
BookingAddon      id, bookingId, addonId, quantity, unitPrice
Contact           id, name, email, emailNormalised, phone, orgName, orgType,
                  locale, country, consentMarketing, consentAt, createdAt
Guide             id, name, email, phone, active
GuideLanguage     guideId, languageCode, proficiency (NATIVE|FLUENT|BASIC)
GuideAvailability id, guideId, date, startTimeLocal, endTimeLocal,
                  source (MANUAL|RECURRING|IMPORTED)
GuideAssignment   id, bookingId, guideId, assignedAt, assignedBy, status
Waitlist          id, timeSlotId, contactId, groupSize, position,
                  offeredAt, claimExpiresAt, status
ProtocolSignoff   id, bookingId, signedByName, signedAt, ipAddress,
                  userAgent, protocolVersion
Partner           id, name, tier (PARTNER|FRIEND|AMBASSADOR),
                  contractStart, contractEnd, allocationGroupsPerYear, active
PartnerUser       id, partnerId, email, role
PartnerAsset      id, partnerId, type, storageRef, mimeType, bytes,
                  status (PENDING|APPROVED|REJECTED), reviewedBy, reviewedAt
PartnerReport     id, partnerId, periodStart, periodEnd, metricsJson,
                  generatedAt, deliveredAt, pdfRef
Payment           id, bookingId, provider, providerRef, amount, currency,
                  status, idempotencyKey, rawPayloadRef, createdAt
Refund            id, paymentId, amount, reason, providerRef, status
NotificationLog   id, bookingId?, template, locale, toEmail, status,
                  providerMessageId, attempts, lastError, sentAt
AuditEvent        id, entityType, entityId, action, actorType, actorId,
                  at, diffJson, requestId
```

## 4.1 State machine booking

```
DRAFT ──► HELD ──────► CONFIRMED ──► COMPLETED
            │              │  │
            │              │  └────► NO_SHOW
            ▼              ▼
        EXPIRED        CANCELLED ──► REFUNDED
```
- `HELD` punya TTL (default 10 menit). Saat kedaluwarsa, `capacityHeld` dilepas.
- `CONFIRMED` mensyaratkan pembayaran lunas **atau** invoice-on-account yang disetujui.
- `CANCELLED` memicu evaluasi waitlist.
- **Setiap transisi menulis `AuditEvent`.**

## 4.2 Strategi `{i18n}` — tentukan sejak awal

Lima bahasa termasuk **Jepang dan Mandarin**. Opsinya: kolom JSONB per field yang
diterjemahkan; tabel translasi terpisah; atau resource file dengan override di
database. Yang jelas, harus bisa diedit **tanpa developer**. CJK memengaruhi font
stack, asumsi lebar string, dan line breaking. **Masuk scope sejak modul pertama,
bukan pekerjaan belakangan.**

---

# BAGIAN 5 — MODUL

## M1 — Formulir enquiry otomatis

**Kebutuhan fungsional**
1. Formulir publik: produk, dua tanggal preferensi, jumlah rombongan, **bahasa yang
   dibutuhkan**, tipe audiens, jenjang sekolah + jumlah murid (kondisional), kebutuhan
   diet, aksesibilitas, nama/organisasi/email/telepon, dan catatan bebas.
2. Logika field kondisional berdasarkan `audienceType`.
3. Validasi di sisi server, termasuk aturan lead-time yang bisa dikonfigurasi.
4. Email notifikasi terstruktur dengan urutan field yang konsisten.
5. **Balasan otomatis sesuai locale** berisi info praktis + protokol higienis.
   Template harus bisa diedit staf non-teknis.
6. Semua submission disimpan; export CSV/API. **Ini akan menjadi intake booking di M2
   — modelkan sebagai `Contact` + entitas `Enquiry` pra-booking, bukan sekadar log
   formulir sekali pakai.**
7. `ClosurePeriod` menutup submission dan menampilkan pesan yang benar, disertai
   penampungan "beri tahu saya kalau tur dibuka lagi".
8. Anti-spam: honeypot + rate limit per IP + opsional Turnstile. **Jangan pakai CAPTCHA.**

**Non-fungsional:** submission harus idempotent (double-click tidak boleh membuat dua
record — pakai request id yang digenerate di client). Trafik bot tidak boleh mengotori
dataset.

**Kriteria diterima:** submission → email benar + record tersimpan + balasan otomatis
sesuai locale dalam 60 detik. Penutupan yang ditambahkan lewat admin langsung
mengubah perilaku live dan otomatis berakhir sendiri.

---

## M2 — Sistem booking online

**Kebutuhan fungsional**
1. Generasi slot dari `ScheduleRule` ∖ `ClosurePeriod`. **Tolong sebutkan apakah
   kalian akan materialisasi baris `TimeSlot` (via job terjadwal — locking lebih
   mudah) atau menghitungnya saat dibaca (tidak ada drift, tapi concurrency lebih
   sulit). Kami cenderung ke materialisasi.**
2. Alur: produk → ketersediaan bulanan → slot → jumlah orang → bahasa → varian →
   kontak → konfirmasi.
3. **Hold-then-confirm**, TTL ±10 menit, dilepas oleh background job saat kedaluwarsa.
4. Kapasitas ditegakkan per slot dan per hari.
5. **Pencocokan bahasa pemandu — kebutuhan wajib.** Sebuah slot hanya ditawarkan
   kalau ada pemandu dengan bahasa yang diminta tersedia di slot itu. *Ini justru
   kebutuhan yang gagal dipenuhi produk booking jadi di pasaran, dan alasan utama kita
   membangun sendiri alih-alih membeli.*
6. Auto-assign pemandu saat konfirmasi; reassign manual lewat admin.
7. Nomor referensi booking; halaman konfirmasi; file `.ics`.
8. **Konsol admin:** tampilan minggu/bulan, detail booking, buat/ubah/batalkan atas
   nama pelanggan, override kapasitas, pencarian, export CSV, RBAC (admin / kantor /
   pemandu).
9. Bisa di-embed, dengan styling menyesuaikan desain Panorama.

**Non-fungsional — concurrency, ini jalur kritisnya**

> Dua request untuk kursi terakhir harus menghasilkan tepat satu booking.

Tolong sebutkan pendekatan kalian secara eksplisit:
- `SELECT … FOR UPDATE` pada baris `TimeSlot` di dalam transaksi, atau
- advisory lock Postgres dengan key berbasis slot id, atau
- optimistic concurrency lewat kolom `version` dengan retry terbatas, atau
- tabel hold transaksional dengan unique constraint.

**Kami ingin ada automated concurrency test dalam deliverable**, bukan pengecekan
manual. Masukkan ke estimasi kalian.

**Non-fungsional — waktu**
Simpan dalam UTC, operasikan di `Europe/Amsterdam`, tampilkan sesuai locale
pengunjung. **Peralihan DST tidak boleh menggandakan atau menghilangkan slot** —
sertakan test untuk perubahan bulan Maret dan Oktober.

**Non-fungsional — skala**
Ratusan booking per bulan. **Sengaja kami tekankan: jangan over-engineering.** Tidak
perlu Kubernetes, microservices, event sourcing, atau CQRS. Monolit modular yang
tertata rapi dengan batas modul yang jelas adalah jawaban yang benar di sini, dan kami
akan membaca proposal dengan skeptis kalau berargumen sebaliknya.

**Indexing:** `TimeSlot(tourProductId, startsAtUtc)`, `Booking(timeSlotId, status)`,
`Booking(reference)` unique, `GuideAvailability(guideId, date)`,
`Contact(emailNormalised)`.

**Kriteria diterima:** concurrency test terdokumentasi dan lulus; permintaan berbahasa
Jerman tidak pernah melihat slot yang tidak punya pemandu berbahasa Jerman.

---

## M3 — Notifikasi, rebooking mandiri & waitlist

**Kebutuhan fungsional**
1. Konfirmasi + `.ics`; pengingat pada offset yang bisa dikonfigurasi (default T−3h,
   T−1h sebelum kunjungan).
2. Notifikasi ke staf pada setiap pembuatan/perubahan/pembatalan.
3. Template dalam lima locale, bisa diedit staf; logging pengiriman; webhook
   bounce/complaint; retry dengan exponential backoff. **Kegagalan harus terlihat di
   admin, tidak boleh diam-diam.**
4. **Reschedule/pembatalan mandiri lewat signed link, tanpa login.** Tolong sebutkan
   skema kalian. Ekspektasi kami:
   - HMAC-SHA256 atas `{bookingId, action, exp, nonce}` dengan server secret yang bisa
     dirotasi
   - **TTL pendek, sekali pakai** (nonce dibakar di sisi server saat pertama dipakai)
   - terikat pada satu booking dan satu action
   - perbandingan constant-time; tidak ada PII di dalam URL
   > **Ini titik paling mungkin membocorkan data booking pelanggan lain. Perlakukan
   > desain token sebagai deliverable keamanan tersendiri, lengkap dengan test case.**
5. Jendela kebijakan pembatalan, bisa dikonfigurasi per produk.
6. **Waitlist:** bisa ikut antre di slot penuh; antrean FIFO; saat ada pembatalan,
   otomatis ditawarkan ke antrean berikutnya dengan jendela klaim (default 24 jam);
   kedaluwarsa otomatis lalu lanjut ke berikutnya; beri tahu kalau antrean habis;
   override admin. **Penawaran harus transaksional — dua pihak di waitlist tidak boleh
   sama-sama bisa mengklaim kursi kosong yang sama.**
7. **Sign-off protokol higienis digital**: link dikirim setelah konfirmasi, pengingat
   kalau belum ditandatangani 48 jam sebelum kunjungan, record yang immutable (nama,
   organisasi, timestamp, IP, user agent, versi protokol), dan tampilan admin untuk
   melihat siapa yang belum tanda tangan.

**Kriteria diterima:** pembatalan mengisi ulang slot tanpa campur tangan staf; token
tidak bisa di-replay, ditebak, atau dipakai setelah kedaluwarsa — dibuktikan lewat test.

---

## M4 — Pembayaran online & invoicing

**Kebutuhan fungsional**
1. **Mollie. iDEAL wajib** untuk pasar Belanda — mayoritas pembayaran konsumen dan
   sekolah di Belanda lewat iDEAL. Kartu jadi sekunder. **Jangan mengusulkan
   Stripe-only.**
2. Deposit atau pembayaran penuh, bisa dikonfigurasi per produk.
3. **Invoice-on-account** untuk sekolah dan korporat — mereka tidak akan membayar di muka.
4. **Idempotensi webhook.** Mollie bisa mengirim event duplikat dan tidak berurutan.
   Simpan raw payload, dedupe berdasarkan event id dari provider, dan buat transisi
   state idempotent. **Me-replay webhook 10× harus menghasilkan satu perubahan state.**
5. Refund mengikuti jendela pembatalan; refund parsial didukung.
6. Add-on dihitung di dalam alur booking.
7. Export ke software akuntansi mereka.
8. **Jangan pernah percaya nominal dari sisi client.** Hitung ulang di server
   berdasarkan produk, jumlah orang, varian, dan add-on sebelum membuat pembayaran.

**Masih terbuka — estimasikan dengan asumsi yang disebutkan:** software akuntansi
belum diketahui (kemungkinan Moneybird, e-Boekhouden, atau Exact) dan **perlakuan PPN
untuk sebuah stichting belum dikonfirmasi** (yayasan Belanda bisa punya pembebasan
atau tarif campuran). Modelkan PPN sebagai konfigurasi per produk, jangan di-hardcode.

**Kriteria diterima:** replay test lulus; tidak ada jalur di mana nominal dari client
bisa sampai ke provider.

---

## M5 — Portal partner & laporan tahunan

**Kebutuhan fungsional**
1. Otentikasi partner, sekitar 30–50 user. Pilih opsi paling hemat yang masuk akal;
   MFA opsional.
2. Partner mengelola sendiri profil, logo, dan materi; upload dengan MIME sniffing
   (jangan percaya ekstensi file), batas ukuran, dan re-encode gambar untuk membuang
   EXIF/payload berbahaya.
3. **Alur approval** — tidak ada yang tayang ke situs publik tanpa moderasi.
4. Entitlement sesuai tier (`PARTNER` / `FRIEND` / `AMBASSADOR`).
5. Publikasi aset yang disetujui ke situs Umbraco — **usulkan pendekatannya**: write-back
   lewat Content Delivery API, export terjadwal, atau webhook yang dikonsumsi Panorama.
   **Jaga coupling seminimal mungkin; ini butuh persetujuan mereka.**
6. **Laporan partner tahunan**: jumlah pengunjung yang melewati instalasi mereka,
   negara asal, segmen, dan rombongan yang mereka bawa sendiri. Versi web + PDF.
   Digenerate terjadwal menjelang tanggal perpanjangan kontrak.
7. Alur booking rombongan yang dibawa partner, dengan pelacakan alokasi per tier.

**Dependency:** metriknya berasal dari data M2. **Sediakan jalur import CSV** supaya
M5 tetap berguna kalau terjual sebelum M2 dibangun.

---

## M6 — Tur virtual berbayar & data field lab live

**Kebutuhan fungsional**
1. Tur virtual berbayar, bisa dipesan, dengan kontrol akses. Multibahasa. Tanpa batas
   kapasitas.
2. Akses dibatasi waktu dan tidak bisa dipindahtangankan. Pakai signed URL. DRM tidak
   diperlukan.
3. Pembayaran lewat M4.
4. Data rumah kaca/iklim/sensor live ditampilkan di tur dan di layar on-site.

> **Ketidaktahuan yang memblokir:** kami belum tahu apakah field lab mereka punya API,
> dan kalau ada pakai protokol apa (MQTT? Modbus? OPC-UA? cloud vendor? atau tidak ada
> sama sekali?).
> **Estimasikan tur virtualnya dengan asumsi tanpa data live. Harga integrasi data
> live dipisah sebagai alokasi time-and-materials.** Jangan memberi angka tetap untuk
> integrasi ke sistem yang belum diketahui — kami tidak akan menagih kalian atas itu.

---

## M7 — Support & maintenance

Hosting, monitoring, alerting, **backup dengan prosedur restore yang sudah diuji**,
patching dependency dan keamanan, perubahan kecil, serta **90 hari tuning pasca-rilis
sudah termasuk** setelah tiap modul live. Usulkan tingkatan SLA.

Janji kami ke klien adalah **balasan dalam 4 jam kerja**. Tolong beri tahu biayanya
dan apakah kalian sanggup menjaganya dengan selisih **CET ↔ WIB** (6 jam saat musim
dingin, 5 jam saat musim panas).

---

# BAGIAN 6 — LINTAS MODUL

## 6.1 Internasionalisasi
Lima bahasa termasuk **Jepang dan Mandarin** untuk UI, email, PDF, dan dokumen.
Format tanggal, angka, dan mata uang sesuai locale. Font stack dan line breaking CJK.
Alur penerjemahan tidak boleh membutuhkan developer.

## 6.2 GDPR / AVG — tidak bisa ditawar
- **Rombongan sekolah berarti data pribadi anak-anak.** Persetujuan eksplisit,
  retensi terdokumentasi, dan tidak boleh mengambil foto atau cerita tanpa izin yang
  tercatat.
- **Hosting dan backup harus di region Uni Eropa.**
- Minimalisasi data; jadwal retensi dan penghapusan terdokumentasi; mendukung subject
  access request dan penghapusan data.
- **DPA antara Astra dan Amwisesa wajib ada sebelum ada data pribadi produksi yang
  diproses.** Pemrosesan dari luar EEA butuh safeguard yang sesuai — **tolong beri tahu
  di mana tim dan infrastruktur kalian berada.**
- Logging consent untuk analytics; GTM mereka saat ini jalan tanpa gate.

## 6.3 Keamanan
- Baseline OWASP ASVS L2.
- Token bertanda tangan, kedaluwarsa, dan sekali pakai untuk semua alur tanpa login.
- Verifikasi signature webhook + idempotency key.
- Secret di managed store; jangan pernah di repo; bisa dirotasi.
- Rate limiting di semua endpoint publik.
- Audit trail penuh untuk mutasi booking dan pembayaran.
- Scanning dependency dan container di CI.
- Upload file: MIME sniffing, batas ukuran, re-encode, disajikan dari origin terpisah.

## 6.4 Kualitas & delivery
- Environment: dev, **staging** (klien mereview di sini), production.
- CI/CD dengan test sebagai gate sebelum deploy; migrasi otomatis dan reversible.
- Unit + integration test; **E2E untuk happy path booking, kasus concurrency, dan
  kasus token replay**.
- Structured logging dengan request id; error tracking; uptime monitoring dan alerting.
- Handover: dokumentasi arsitektur, runbook, dan ADR untuk keputusan penting.
- **Kode dan IP milik Astra.** Mohon konfirmasi kalian menerima ini.

## 6.5 Aksesibilitas & performa
- **WCAG 2.1 AA** untuk alur publik — kliennya yayasan yang melayani publik.
- Embed dimuat ke halaman yang sudah membawa GSAP, Swiper, dan lightGallery.
  **Jaga bundle tetap kecil; jangan menduplikasi framework ke halaman itu.**
- Alur booking harus nyaman di mobile; banyak pengunjung memesan dari ponsel di luar
  negeri.

---

# BAGIAN 7 — PERTANYAAN TERBUKA

Belum terjawab dari sisi klien. **Estimasikan dengan asumsi yang disebutkan, jangan
menunggu.**

| # | Belum diketahui | Memblokir |
|---|---|---|
| 1 | Jumlah tur per bulan per tipe; pola musiman | Apakah M2 layak dibangun sama sekali |
| 2 | Tingkat pembatalan dan no-show | Desain waitlist M3 |
| 3 | Software akuntansi dan perlakuan PPN stichting | M4 |
| 4 | API data field lab — ada? protokolnya apa? | M6 |
| 5 | Jumlah pemandu dan cakupan bahasa | M2 |
| 6 | Jumlah partner dan entitlement per tier | M5 |
| 7 | **Apakah Panorama mau memasang snippet embed dan melonggarkan CSP?** | **M1, M2 — semuanya** |
| 8 | Akses repo / staging / deploy | Kelayakan Opsi A |
| 9 | Konfirmasi .NET 8 vs .NET Framework | Kelayakan Opsi A |
| 10 | CRM atau kalender bersama yang sudah ada | Scope admin M2 |

---

# BAGIAN 8 — YANG KAMI TUNGGU DARI KALIAN

**Per modul:** effort dalam developer-days, dipecah BE / FE / QA / DevOps / PM; durasi
dengan ukuran tim yang kalian usulkan; asumsi; risiko beserta mitigasinya; dependency.

**Secara keseluruhan:** komposisi tim; rencana paralelisasi; critical path; dan
**rekomendasi Opsi A vs B beserta alasannya**.

**Dan tolong sampaikan terus terang:**
- Modul mana yang menurut kalian **paling berisiko**, dan kenapa.
- Bagian mana yang menurut kalian **over-specified** atau sebaiknya dipangkas.
- Apa yang akan kalian **kerjakan dengan cara berbeda**. Kami lebih suka didebat
  sekarang daripada menemukannya saat build berjalan.

**Rentang kasar dalam satu minggu jauh lebih berguna daripada angka presisi dalam tiga
minggu.** Klien belum menyetujui apa pun; kami sedang mengukur besarnya peluang.
