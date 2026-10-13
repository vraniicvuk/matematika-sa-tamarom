/* Matematika sa Tamarom — interakcije i motion */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const hasGSAP = typeof window.gsap !== 'undefined';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- matematička tipografija ---------- */
  const F = (n, d) => `<span class="fr"><span>${n}</span><span>${d}</span></span>`;
  const R = x => `<span class="rt">√<span>${x}</span></span>`;
  const neg = n => (n < 0 ? '−' + (-n) : String(n));
  const fmt = n => String(n).replace('.', ',').replace('-', '−');

  /* ================= HERO TABLA ================= */
  const GX = x => 230 + x * 40, GY = y => 330 - y * 40;
  const f = x => x * x - 2 * x - 3;

  function scene(mode) {
    const bp = mode === 'bp';
    const o = [];
    const T = (x, y, s, cls = 'txt it', extra = '') => o.push(`<text class="${cls}" x="${x}" y="${y}" ${extra}>${s}</text>`);
    const P = (d, cls = 's', extra = '') => o.push(`<path class="${cls}" d="${d}" ${extra}/>`);
    o.push(`<svg viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`);
    o.push(`<defs>
      <pattern id="h-${mode}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" stroke-width="1" opacity=".45"/></pattern>
      <pattern id="g-${mode}" width="20" height="20" patternUnits="userSpaceOnUse" x="10" y="10"><path d="M20 0 H0 V20" fill="none" stroke="rgba(255,255,255,.13)" stroke-width="1"/></pattern>
    </defs>`);
    if (bp) {
      o.push(`<rect width="1200" height="620" fill="url(#g-${mode})"/>`);
      T(1140, 36, 'TABLA 01 — FUNKCIJE · JEDNAČINE · GEOMETRIJA · MERE', 'txt', 'text-anchor="end" style="font-size:11px"');
    }

    /* --- koordinatni sistem + funkcije --- */
    if (bp) for (let x = -3; x <= 5; x++) for (let y = -5; y <= 5; y++) o.push(`<circle cx="${GX(x)}" cy="${GY(y)}" r="1.2" class="f" opacity=".5"/>`);
    P(`M${GX(-3.2)} 330 H${GX(5.3)} M${GX(5.3) - 8} 325 L${GX(5.3)} 330 L${GX(5.3) - 8} 335`, 's t');
    P(`M230 ${GY(-5.3)} V${GY(5.6)} M225 ${GY(5.6) + 8} L230 ${GY(5.6)} L235 ${GY(5.6) + 8}`, 's t');
    for (let x = -3; x <= 5; x++) if (x) { P(`M${GX(x)} 326 V334`, 's t'); T(GX(x), 348, neg(x), 'txt', 'text-anchor="middle" style="font-size:10px"'); }
    for (let y = -5; y <= 5; y++) if (y) { P(`M226 ${GY(y)} H234`, 's t'); T(220, GY(y) + 4, neg(y), 'txt', 'text-anchor="end" style="font-size:10px"'); }
    T(GX(5.3) + 6, 350, 'x'); T(240, GY(5.6) + 6, 'y'); T(214, 348, '0', 'txt', 'text-anchor="end" style="font-size:10px"');
    let d = '';
    for (let x = -1.7; x <= 3.71; x += 0.05) d += (d ? ' L' : 'M') + GX(x).toFixed(1) + ' ' + GY(f(x)).toFixed(1);
    P(d, 's', 'style="stroke-width:1.8"');
    P(`M${GX(-0.9)} ${GY(-4.8)} L${GX(4.2)} ${GY(5.4)}`);
    T(36, 410, 'f(x) = x² − 2x − 3', 'txt it', 'style="font-size:18px"');
    T(382, 128, 'g(x) = 2x − 3', 'txt it', 'text-anchor="end" style="font-size:18px"');
    [[-1, 0], [3, 0], [1, -4], [0, -3], [4, 5]].forEach(([x, y]) => o.push(`<circle class="f" cx="${GX(x)}" cy="${GY(y)}" r="3.2"/>`));

    /* --- izvođenje kvadratne jednačine --- */
    T(470, 140, 'x² − 2x − 3 = 0', 'txt it', 'style="font-size:25px"');
    T(470, 188, 'D = b² − 4ac', 'txt it', 'style="font-size:22px"');
    T(470, 232, 'D = (−2)² − 4 · 1 · (−3) = 16', 'txt it', 'style="font-size:22px"');
    T(470, 310, 'x₁,₂ =', 'txt it', 'style="font-size:22px"');
    T(612, 292, '2 ± √16', 'txt it', 'text-anchor="middle" style="font-size:22px"');
    P('M560 301 H664');
    T(612, 328, '2', 'txt it', 'text-anchor="middle" style="font-size:22px"');
    T(478, 392, 'x₁ = 3,   x₂ = −1', 'txt it', 'style="font-size:24px"');
    P('M462 362 H688 V406 H462 Z'); P('M458 358 H692 V410 H458 Z', 's t');

    /* --- krug sa upisanim trouglom --- */
    const cx = 905, cy = 210, r = 85;
    const A = [cx, cy - r], B = [cx + 73.6, cy + 42.5], C = [cx - 73.6, cy + 42.5];
    o.push(`<circle class="s" cx="${cx}" cy="${cy}" r="${r}"/>`);
    P(`M${A} L${B} L${C} Z`);
    P(`M${cx} ${cy} L${cx + r} ${cy}`, 's t d'); P(`M${A} L${cx} ${cy + 42.5}`, 's t d');
    o.push(`<circle class="f" cx="${cx}" cy="${cy}" r="2.5"/>`);
    [A, B, C].forEach(p => { o.push(`<circle class="f" cx="${p[0]}" cy="${p[1]}" r="2.5"/>`); P(`M${p[0] - 12} ${p[1] - 7} Q ${p[0]} ${p[1] - 15} ${p[0] + 12} ${p[1] - 7}`, 's t'); });

    /* --- kocka --- */
    P('M1025 150 H1105 V230 H1025 Z M1025 150 L1055 125 H1135 V205 L1105 230 M1105 150 L1135 125');
    P('M1055 125 V205 H1135 M1055 205 L1025 230', 's t d');

    /* --- uglomer --- */
    const pc = [985, 540], pr = 125, rad = a => a * Math.PI / 180;
    P(`M${pc[0] - pr} 540 A${pr} ${pr} 0 0 1 ${pc[0] + pr} 540 Z`);
    P(`M${pc[0] - 90} 540 A90 90 0 0 1 ${pc[0] + 90} 540`, 's t');
    for (let a = 0; a <= 180; a += 5) {
      const L = a % 10 === 0 ? (a % 30 === 0 ? 16 : 10) : 5;
      P(`M${(pc[0] + pr * Math.cos(rad(a))).toFixed(1)} ${(540 - pr * Math.sin(rad(a))).toFixed(1)} L${(pc[0] + (pr - L) * Math.cos(rad(a))).toFixed(1)} ${(540 - (pr - L) * Math.sin(rad(a))).toFixed(1)}`, 's t');
      if (a % 30 === 0) T((pc[0] + 100 * Math.cos(rad(a))).toFixed(1), (540 - 100 * Math.sin(rad(a)) + 4).toFixed(1), a, 'txt', 'text-anchor="middle" style="font-size:9px"');
    }
    P(`M985 540 L${(985 + 155 * Math.cos(rad(50))).toFixed(1)} ${(540 - 155 * Math.sin(rad(50))).toFixed(1)}`);
    P('M985 540 L1140 540');
    P(`M1025 540 A40 40 0 0 0 ${(985 + 40 * Math.cos(rad(50))).toFixed(1)} ${(540 - 40 * Math.sin(rad(50))).toFixed(1)}`, 's t');
    o.push('<circle class="f" cx="985" cy="540" r="3"/>');

    /* --- lenjir --- */
    o.push(`<rect class="s" x="60" y="560" width="1080" height="34" rx="2"/>`);
    for (let x = 60, i = 0; x <= 1140; x += 15, i++) {
      P(`M${x} 560 V${560 + (i % 2 === 0 ? 14 : 7)}`, 's t');
      if (i % 4 === 0 && x < 1120) T(x, 588, i / 2, 'txt', 'text-anchor="middle" style="font-size:10px"');
    }
    T(1132, 588, 'cm', 'txt', 'text-anchor="end" style="font-size:10px"');

    if (!bp) {
      T(A[0] - 6, A[1] - 20, 'C', 'txt it', 'style="font-size:20px"'); T(B[0] + 8, B[1] + 18, 'B', 'txt it', 'style="font-size:20px"'); T(C[0] - 22, C[1] + 18, 'A', 'txt it', 'style="font-size:20px"');
      T(cx + 6, cy - 6, 'O', 'txt it', 'style="font-size:18px"');
      T(1060, 200, 'V', 'txt it', 'style="font-size:20px"');
      T(1030, 528, 'α', 'txt it', 'style="font-size:20px"');
      T(780, 330, 'π', 'txt it', 'style="font-size:52px"');
    } else {
      [[-1, 0], [3, 0], [1, -4], [0, -3], [4, 5]].forEach(([x, y]) => o.push(`<circle class="s" cx="${GX(x)}" cy="${GY(y)}" r="7"/>`));
      P(`M${GX(1)} 330 V${GY(-4)} M230 ${GY(-4)} H${GX(1)}`, 's t d');
      T(GX(1) + 10, GY(-4) + 18, 'T(1, −4)', 'txt'); T(GX(-1) - 6, 318, 'x₁ = −1', 'txt', 'text-anchor="end"');
      T(GX(3) + 8, 318, 'x₂ = 3', 'txt'); T(238, GY(-3) + 5, 'A(0, −3)', 'txt'); T(GX(4) + 10, GY(5) + 4, 'B(4, 5)', 'txt');
      T(36, 432, 'nule: f(x) = 0', 'txt');
      T(470, 110, 'a = 1   b = −2   c = −3', 'txt');
      T(470, 262, 'D > 0 ⇒ dva realna rešenja', 'txt');
      T(676, 316, '= 1 ± 2', 'txt it', 'style="font-size:20px"');
      T(470, 436, 'provera: 3² − 2·3 − 3 = 0 ✓', 'txt');
      T(470, 456, 'Vijet: x₁ + x₂ = 2, x₁ · x₂ = −3', 'txt');
      T(cx + 10, cy - 8, 'r = 5 cm', 'txt');
      T(cx, cy + 66, 'a = r√3 ≈ 8,66 cm', 'txt', 'text-anchor="middle"');
      T(820, 324, 'O = 2rπ ≈ 31,4 cm', 'txt'); T(820, 344, 'P = r²π ≈ 78,5 cm²', 'txt');
      P('M1025 244 H1105 M1025 238 V250 M1105 238 V250', 's t'); T(1065, 262, 'a = 4 cm', 'txt', 'text-anchor="middle"');
      T(1025, 284, 'V = a³ = 64 cm³', 'txt'); T(1025, 302, 'P = 6a² = 96 cm²', 'txt');
      T(1032, 525, 'α = 50°', 'txt');
      T(770, 360, 'π ≈ 3,14159', 'txt', 'style="font-size:10px"');
    }
    o.push('</svg>');
    return o.join('');
  }

  const drawing = $('#drawing');
  $('#inkL').innerHTML = scene('ink');
  $('#bpL').innerHTML = scene('bp');
  const bpL = $('#bpL');
  const st = { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 };
  const rx = $('#rx'), ry = $('#ry'), rf = $('#rf');
  function setTarget(e, rad) {
    const b = drawing.getBoundingClientRect();
    st.tx = e.clientX - b.left; st.ty = e.clientY - b.top; st.tr = rad;
    if (st.r < 1) { st.x = st.tx; st.y = st.ty; }
    const sx = st.tx / b.width * 1200, sy = st.ty / b.height * 620;
    const x = (sx - 230) / 40, y = (330 - sy) / 40;
    rx.textContent = fmt(x.toFixed(2)); ry.textContent = fmt(y.toFixed(2)); rf.textContent = fmt(f(x).toFixed(2));
  }
  drawing.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') setTarget(e, Math.min(200, drawing.offsetWidth * .17)); });
  drawing.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') st.tr = 0; });
  drawing.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') setTarget(e, Math.max(90, drawing.offsetWidth * .22)); });
  if (!fine) $('#hint').textContent = 'Dodirni tablu da vidiš rešenje';
  (function loop() {
    st.x += (st.tx - st.x) * .16; st.y += (st.ty - st.y) * .16; st.r += (st.tr - st.r) * .12;
    bpL.style.clipPath = `circle(${st.r.toFixed(1)}px at ${st.x.toFixed(1)}px ${st.y.toFixed(1)}px)`;
    requestAnimationFrame(loop);
  })();

  /* ================= MARQUEE ================= */
  const row1 = ['a² + b² = c²', 'O = 2rπ', 'x₁,₂ = (−b ± √D) / 2a', 'α + β + γ = 180°', '(a + b)² = a² + 2ab + b²', 'V = a³', 'y = kx + n', 'P = a · h / 2', 'aᵐ · aⁿ = aᵐ⁺ⁿ', 'P = r²π', '½ + ⅓ = ⅚', 'V = B · H', 'sin²α + cos²α = 1', 'a² − b² = (a − b)(a + b)'];
  const row2 = ['π = 3,14159 26535 89793', '√2 = 1,41421 35623', 'e = 2,71828 18284', 'φ = 1,61803 39887', '1 + 2 + … + 100 = 5050', '0,999… = 1', '2¹⁰ = 1024', '12² = 144', '0! = 1', '111 111 111² = 12345678987654321'];
  const mq = $('#mq'), mq2 = $('#mq2');
  const r1 = row1.map(t => `<span>${t}</span>`).join(''), r2 = row2.map(t => `<span>${t}</span>`).join('');
  mq.innerHTML = r1 + r1; mq2.innerHTML = r2 + r2;

  /* ================= GRADIVO / HORIZONT ================= */
  const topics = [
    { k: 'razlomci', n: 'Razlomci', g: 5, area: 'Aritmetika', top: 210, f: `${F('a', 'b')} + ${F('c', 'd')} = ${F('ad + bc', 'bd')}`, d: 'Deo celine koji se može nacrtati, preseći i sabrati. Proširivanje, skraćivanje, sabiranje i množenje — razlomak prvo vidimo, pa tek onda računamo.', ex: [`${F(1, 2)} + ${F(1, 3)}`, `${F(3, 6)} + ${F(2, 6)}`, `${F(5, 6)}`] },
    { k: 'ugao', n: 'Ugao', g: 5, area: 'Geometrija', top: 165, f: 'α + β = 180°', d: 'Merenje uglova uglomerom, vrste uglova i odnos susednih, uporednih i unakrsnih uglova. Prvi susret sa pravom geometrijom.', ex: ['α = 65°', 'β = 180° − 65°', 'β = 115°'] },
    { k: 'simetrija', n: 'Osna simetrija', g: 5, area: 'Geometrija', top: 115, f: 's ⟂ AA′, &nbsp;d(A, s) = d(A′, s)', d: 'Preslikavanje kao u ogledalu: konstrukcija simetrale duži i ugla, prepoznavanje simetričnih figura oko nas.', ex: ['A(2, 3), osa y', 'A′(−2, 3)', 'AA′ = 4'] },
    { k: 'celi', n: 'Celi brojevi', g: 6, area: 'Aritmetika', top: 125, f: '(−a) · (−b) = a · b', d: 'Brojevna prava levo od nule: suprotni brojevi, apsolutna vrednost i pravila znaka koja se razumeju, a ne napamet uče.', ex: ['(−3) · (−4) = 12', '−3 − (−4) = −3 + 4', '= 1'] },
    { k: 'trougao', n: 'Trougao', g: 6, area: 'Geometrija', top: 140, f: 'α + β + γ = 180°', d: 'Vrste trouglova, zbir uglova, visine i konstrukcije šestarom i lenjirom — figura od koje sve počinje.', ex: ['α = 50°, β = 60°', 'γ = 180° − 110°', 'γ = 70°'] },
    { k: 'procenti', n: 'Procenti i proporcije', g: 6, area: 'Aritmetika', top: 180, f: `p% od a = a · ${F('p', '100')}`, d: 'Popusti, kamate, razmere na mapi i recepti. Proporcija je „unakrsno množenje” koje ima smisla.', ex: [`20% od 350 = 350 · ${F(20, 100)}`, '= 70', '3 : x = 6 : 8 ⇒ x = 4'] },
    { k: 'stepeni', n: 'Stepeni i koren', g: 7, area: 'Algebra', top: 230, f: `a<sup>m</sup> · a<sup>n</sup> = a<sup>m + n</sup>, &nbsp;${R('ab')} = ${R('a')}${R('b')}`, d: 'Množenje ponovljeno n puta i obrnuta operacija — koren. Pravila za stepene, delimično korenovanje i iracionalni brojevi poput √2.', ex: ['2³ · 2² = 2⁵ = 32', `${R(50)} = ${R('25 · 2')}`, `= 5${R(2)} ≈ 7,07`] },
    { k: 'pitagora', n: 'Pitagorina teorema', g: 7, area: 'Geometrija', top: 237, f: 'a² + b² = c²', d: 'Most između algebre i geometrije: od pravouglog trougla do rastojanja dve tačke u koordinatnom sistemu.', ex: ['a = 3, b = 4', 'c² = 9 + 16 = 25', 'c = 5'] },
    { k: 'polinomi', n: 'Polinomi', g: 7, area: 'Algebra', top: 220, f: '(a + b)² = a² + 2ab + b²', d: 'Sabiranje i množenje polinoma, kvadrat binoma i razlika kvadrata — formule koje se mogu i nacrtati kao kvadrat.', ex: ['(x + 3)²', '= x² + 6x + 9', '49 − 9 = 4 · 10 = 40'] },
    { k: 'krug', n: 'Krug', g: 7, area: 'Geometrija', top: 206, f: 'O = 2rπ, &nbsp;P = r²π', d: 'Obim i površina kruga, centralni i periferijski ugao, tangenta — i broj π koji se nikad ne završava.', ex: ['r = 5 cm', 'O = 10π ≈ 31,4 cm', 'P = 25π ≈ 78,5 cm²'] },
    { k: 'jednacine', n: 'Linearne jednačine', g: 8, area: 'Algebra', top: 190, f: `ax + b = 0 ⇒ x = −${F('b', 'a')}`, d: 'Jednačina je vaga: šta uradiš levo, uradi i desno. Jednačine, nejednačine, sistemi i tekstualni zadaci.', ex: ['3x − 12 = 0', '3x = 12', 'x = 4'] },
    { k: 'funkcija', n: 'Linearna funkcija', g: 8, area: 'Funkcije', top: 160, f: 'y = kx + n', d: 'Prava u koordinatnom sistemu: koeficijent pravca k, odsečak n, nula funkcije i crtanje grafika iz dve tačke.', ex: [`k = ${F('y₂ − y₁', 'x₂ − x₁')}`, 'A(1, 3), B(3, 7) ⇒ k = 2', 'y = 2x + 1'] },
    { k: 'tela', n: 'Prizma, valjak i kupa', g: 8, area: 'Stereometrija', top: 100, f: `V = B · H, &nbsp;V<sub>kupe</sub> = ${F('r²πH', '3')}`, d: 'Mreža, površina i zapremina tela. Geometrija koja se može iseći od papira, složiti na stolu i držati u rukama.', ex: ['kocka, a = 4 cm', 'V = a³ = 64 cm³', 'P = 6a² = 96 cm²'] },
    { k: 'kvadratna', n: 'Kvadratna funkcija', g: 9, area: 'Funkcije', top: 140, f: `x<sub>1,2</sub> = ${F(`−b ± ${R('b² − 4ac')}`, '2a')}`, d: 'Parabola, diskriminanta, teme i Vijetove formule — gradivo koje se najčešće javlja na prijemnom ispitu.', ex: ['x² − 5x + 6 = 0', 'D = 25 − 24 = 1', 'x₁ = 3, x₂ = 2'] }
  ];
  const gLabel = g => (g === 9 ? 'Prijemni' : g + '. razred');
  const SH = {
    razlomci: c => `<circle class="s" cx="${c}" cy="250" r="40"/><path class="s" d="M${c} 250 V210 M${c} 250 L${c + 34.64} 270 M${c} 250 L${c - 34.64} 270"/><path class="s hatch" d="M${c} 250 L${c} 210 A40 40 0 0 1 ${c + 34.64} 270 Z" style="fill:url(#hatchInk)"/>`,
    ugao: c => `<path class="s" d="M${c - 45} 300 H${c + 48} M${c - 45} 300 L${c + 20} 165"/><path class="s t" d="M${c - 12} 300 A33 33 0 0 0 ${c - 30.7} 270.3"/><circle class="f" cx="${c - 45}" cy="300" r="3"/><text class="txt it" x="${c - 18}" y="292" style="font-size:16px">α</text>`,
    simetrija: c => `<path class="s" d="M${c} 140 L${c + 40} 215 L${c} 296 L${c - 40} 215 Z"/><path class="s t d" d="M${c} 115 V300"/><path class="s t" d="M${c + 17} 172 l6 -4 M${c - 17} 172 l-6 -4 M${c + 17} 258 l6 4 M${c - 17} 258 l-6 4"/>`,
    celi: c => { let s = `<path class="s" d="M${c} 300 V125 M${c - 5} 134 L${c} 125 L${c + 5} 134"/>`; for (let k = 0; k < 10; k++) s += `<path class="s t" d="M${c - (k === 5 ? 12 : 6)} ${290 - k * 17} H${c + (k === 5 ? 12 : 6)}"/>`; return s + `<text class="txt" x="${c + 18}" y="209" style="font-size:11px">0</text><text class="txt" x="${c + 16}" y="146" style="font-size:12px">+</text><text class="txt" x="${c + 16}" y="292" style="font-size:12px">−</text>`; },
    trougao: c => `<path class="s" d="M${c - 45} 300 L${c + 45} 300 L${c + 14} 140 Z"/><path class="s t d" d="M${c + 14} 140 V300"/><path class="s t" d="M${c + 14} 290 H${c + 24} V300"/>`,
    procenti: c => `<circle class="s" cx="${c - 16}" cy="198" r="11"/><circle class="s" cx="${c + 16}" cy="252" r="11"/><path class="s" d="M${c + 24} 180 L${c - 24} 270"/><rect class="s" x="${c - 40}" y="282" width="80" height="14"/><rect class="s hatch" x="${c - 40}" y="282" width="48" height="14" style="fill:url(#hatchInk)"/>`,
    stepeni: c => `<rect class="s" x="${c - 40}" y="290" width="10" height="10"/><rect class="s" x="${c - 27}" y="280" width="20" height="20"/><rect class="s hatch" x="${c - 4}" y="260" width="40" height="40" style="fill:url(#hatchInk)"/><text class="txt it" x="${c - 30}" y="250" style="font-size:20px">2ⁿ, √x</text>`,
    pitagora: c => `<path class="s" d="M${c - 15} 300 L${c + 21} 300 L${c - 15} 273 Z"/><path class="s" d="M${c - 15} 273 L${c - 42} 273 L${c - 42} 300 L${c - 15} 300"/><path class="s hatch" d="M${c - 15} 273 L${c + 12} 237 L${c + 48} 264 L${c + 21} 300 Z" style="fill:url(#hatchInk)"/><path class="s t" d="M${c - 15} 292 H${c - 7} V300"/>`,
    polinomi: c => `<path class="s" d="M${c - 40} 220 H${c + 40} V300 H${c - 40} Z M${c + 10} 220 V300 M${c - 40} 270 H${c + 40}"/><path class="s hatch" d="M${c - 40} 220 H${c + 10} V270 H${c - 40} Z" style="fill:url(#hatchInk)"/>`,
    krug: c => `<circle class="s" cx="${c}" cy="250" r="44"/><circle class="f" cx="${c}" cy="250" r="3"/><path class="s" d="M${c - 50} 206 H${c + 50}"/><path class="s t" d="M${c} 250 V206 M${c - 38.1} 272 L${c + 31.1} 281.1"/>`,
    jednacine: c => `<path class="s" d="M${c} 300 V190 M${c - 42} 200 H${c + 42} M${c - 18} 300 L${c} 288 L${c + 18} 300"/><path class="s t" d="M${c - 36} 200 L${c - 46} 238 M${c - 36} 200 L${c - 26} 238 M${c + 36} 200 L${c + 26} 238 M${c + 36} 200 L${c + 46} 238"/><path class="s" d="M${c - 48} 238 Q${c - 36} 252 ${c - 24} 238 Z M${c + 24} 238 Q${c + 36} 252 ${c + 48} 238 Z"/><text class="txt it" x="${c - 36}" y="232" text-anchor="middle" style="font-size:18px">x</text><text class="txt it" x="${c + 36}" y="232" text-anchor="middle" style="font-size:16px">4</text><circle class="f" cx="${c}" cy="200" r="3"/>`,
    funkcija: c => `<path class="s t" d="M${c - 44} 280 H${c + 44} M${c - 25} 300 V160"/><path class="s" d="M${c - 40} 290 L${c + 40} 170"/><circle class="f" cx="${c - 25}" cy="267.5" r="3"/><circle class="f" cx="${c - 6.7}" cy="280" r="3"/>`,
    tela: c => `<path class="s hatch" d="M${c + 20} 120 L${c + 44} 100 V280 L${c + 20} 300 Z" style="fill:url(#hatchInk)"/><path class="s" d="M${c - 40} 120 H${c + 20} V300 H${c - 40} Z M${c - 40} 120 L${c - 16} 100 H${c + 44} V280 L${c + 20} 300 M${c + 20} 120 L${c + 44} 100"/><path class="s t d" d="M${c - 16} 100 V280 H${c + 44} M${c - 16} 280 L${c - 40} 300"/><path class="s t" d="M${c - 40} 160 H${c + 20} M${c - 40} 200 H${c + 20} M${c - 40} 240 H${c + 20}"/>`,
    kvadratna: c => `<path class="s t" d="M${c - 44} 255 H${c + 44} M${c} 300 V136"/><path class="s" d="M${c - 38} 140 Q${c} 420 ${c + 38} 140" style="stroke-width:1.8"/><circle class="f" cx="${c - 25.6}" cy="255" r="3"/><circle class="f" cx="${c + 25.6}" cy="255" r="3"/>`
  };
  const shape = (i, c) => SH[topics[i].k](c);
  const defs = `<defs>
    <pattern id="hatchInk" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#1a1a18" stroke-width="1" opacity=".5"/></pattern>
    <pattern id="hatchBp" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#1d46c9" stroke-width="1" opacity=".6"/></pattern>
  </defs>`;
  const SKW = 1400;
  const slot = i => 50 + i * 100;
  const sky = $('#sky');
  sky.setAttribute('viewBox', `0 0 ${SKW} 330`);
  let skyHtml = defs + `<path class="s" d="M0 300 H${SKW}"/>`;
  for (let x = 0; x <= SKW; x += 20) skyHtml += `<path class="s t" d="M${x} 300 V${x % 100 === 0 ? 312 : 305}"/>`;
  topics.forEach((t, i) => {
    const c = slot(i);
    skyHtml += `<g class="obj" data-i="${i}" tabindex="0" role="button" aria-label="${t.n}, ${gLabel(t.g)}"><rect class="hit" x="${c - 50}" y="80" width="100" height="225"/><g class="shp">${shape(i, c)}</g><text class="num" x="${c}" y="${t.top - 16}" text-anchor="middle">${String(i + 1).padStart(2, '0')}</text></g>`;
  });
  sky.innerHTML = skyHtml;

  // footer horizont
  const fSky = $('#fSky');
  fSky.setAttribute('viewBox', `0 0 ${SKW} 220`);
  let fh = `<defs><pattern id="hatchF" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" stroke-width="1" opacity=".5"/></pattern></defs><g transform="translate(0 -90)">`;
  topics.forEach((t, i) => fh += shape(i, slot(i)).replace(/hatchInk/g, 'hatchF'));
  fh += `<path class="s" d="M0 300 H${SKW}"/></g>`;
  fSky.innerHTML = fh;

  // filteri
  const filters = $('#filters');
  const groups = [['Sve', 0], ['5. razred', 5], ['6. razred', 6], ['7. razred', 7], ['8. razred', 8], ['Prijemni', 9]];
  filters.innerHTML = groups.map(([l, g], k) => `<button data-g="${g}" class="${k === 0 ? 'on' : ''}">${l}<sup>${g ? topics.filter(t => t.g === g).length : topics.length}</sup></button>`).join('');
  let grade = 0, cur = 0;
  const objs = $$('.obj', sky);
  const visible = () => topics.map((t, i) => i).filter(i => !grade || topics[i].g === grade);

  function select(i, anim = true) {
    cur = i;
    objs.forEach(o => o.classList.toggle('on', +o.dataset.i === i));
    const t = topics[i];
    $('#dNo').textContent = `Br. ${String(i + 1).padStart(2, '0')} / ${topics.length}`;
    $('#dTag').textContent = gLabel(t.g);
    $('#dTitle').textContent = t.n;
    $('#dF').innerHTML = t.f;
    $('#dDesc').textContent = t.d;
    $('#dArea').textContent = t.area;
    $('#dGrade').textContent = gLabel(t.g);
    $('#dEx').innerHTML = t.ex.map(s => `<li>${s}</li>`).join('');
    $('#dCorner').textContent = `SL. ${String(i + 1).padStart(2, '0')}`;
    $('#dViz').setAttribute('viewBox', `${slot(i) - 80} 92 160 218`);
    $('#dViz').innerHTML = defs.replace(/#1a1a18/g, '#1d46c9').replace(/hatchInk/g, 'hatchV').replace(/hatchBp/g, 'hatchV2') + shape(i, slot(i)).replace(/hatchInk/g, 'hatchV') + `<path class="s t" d="M${slot(i) - 75} 300 H${slot(i) + 75}"/>`;
    if (anim) {
      const b = $('#dBody'), v = $('#dViz');
      b.classList.remove('swap-out'); v.classList.remove('swap-out');
      void b.offsetWidth; b.classList.add('swap-out'); v.classList.add('swap-out');
      if (hasGSAP && !reduce) {
        $$('.s', v).forEach(p => {
          try { const L = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.1, ease: 'power3.out', clearProps: 'strokeDasharray,strokeDashoffset' }); } catch (e) { }
        });
        gsap.from($$('#dEx li'), { opacity: 0, x: -12, duration: .6, stagger: .12, delay: .2, ease: 'power3.out' });
      }
    }
  }
  objs.forEach(o => {
    const i = +o.dataset.i;
    if (fine) o.addEventListener('mouseenter', () => { if (cur !== i) select(i); });
    o.addEventListener('click', () => select(i));
    o.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); } });
  });
  filters.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    grade = +b.dataset.g;
    $$('button', filters).forEach(x => x.classList.toggle('on', x === b));
    const vis = visible();
    objs.forEach(o => o.classList.toggle('off', !vis.includes(+o.dataset.i)));
    if (hasGSAP && !reduce) gsap.fromTo(vis.map(i => objs[i].querySelector('.shp')), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .9, ease: 'expo.out', stagger: .07 });
    if (!vis.includes(cur)) select(vis[0]);
  });
  const step = d => { const v = visible(); const k = v.indexOf(cur); select(v[(k + d + v.length) % v.length]); };
  $('#dPrev').addEventListener('click', () => step(-1));
  $('#dNext').addEventListener('click', () => step(1));
  select(0, false);

  /* ================= TABLICA FORMULA ================= */
  const sheet = {
    5: [
      ['Sabiranje razlomaka', `${F('a', 'b')} + ${F('c', 'd')} = ${F('ad + bc', 'bd')}`, `${F(1, 2)} + ${F(1, 3)} = ${F(3, 6)} + ${F(2, 6)} = ${F(5, 6)}`],
      ['Množenje razlomaka', `${F('a', 'b')} · ${F('c', 'd')} = ${F('a · c', 'b · d')}`, `${F(2, 3)} · ${F(3, 4)} = ${F(6, 12)} = ${F(1, 2)}`],
      ['Deljenje razlomaka', `${F('a', 'b')} : ${F('c', 'd')} = ${F('a', 'b')} · ${F('d', 'c')}`, `${F(3, 4)} : ${F(1, 2)} = ${F(3, 4)} · ${F(2, 1)} = ${F(3, 2)}`],
      ['NZD i NZS', 'NZD(a, b) · NZS(a, b) = a · b', 'NZD(12, 18) = 6, NZS(12, 18) = 36 → 6 · 36 = 12 · 18'],
      ['Razlomak u decimalni broj', `${F('a', 'b')} = a : b`, `${F(3, 4)} = 3 : 4 = 0,75 = 75%`],
      ['Deljivost sa 3 i sa 9', 'zbir cifara je deljiv sa 3 (9)', '477 → 4 + 7 + 7 = 18 → deljiv sa 9']
    ],
    6: [
      ['Procenat', `p% od a = a · ${F('p', '100')}`, `20% od 350 = 350 · ${F(20, 100)} = 70`],
      ['Proporcija', 'a : b = c : d ⇔ a · d = b · c', '3 : x = 6 : 8 → 6x = 24 → x = 4'],
      ['Pravilo znaka', '(−a) · (−b) = a · b', '(−3) · (−4) = 12, &nbsp;(−3) · 4 = −12'],
      ['Apsolutna vrednost', '|a| = a za a ≥ 0, &nbsp;|a| = −a za a < 0', '|−7| = 7, &nbsp;|7| = 7'],
      ['Površina trougla', `P = ${F('a · h<sub>a</sub>', '2')}`, 'a = 6 cm, h = 4 cm → P = 12 cm²'],
      ['Zbir uglova trougla', 'α + β + γ = 180°', 'α = 50°, β = 60° → γ = 70°']
    ],
    7: [
      ['Množenje stepena', 'a<sup>m</sup> · a<sup>n</sup> = a<sup>m + n</sup>', '2³ · 2² = 2⁵ = 32'],
      ['Stepen stepena', '(a<sup>m</sup>)<sup>n</sup> = a<sup>m · n</sup>', '(3²)³ = 3⁶ = 729'],
      ['Kvadrat binoma', '(a ± b)² = a² ± 2ab + b²', '(x + 3)² = x² + 6x + 9'],
      ['Razlika kvadrata', 'a² − b² = (a − b)(a + b)', '7² − 3² = 4 · 10 = 40'],
      ['Kvadratni koren', `${R('a · b')} = ${R('a')} · ${R('b')}`, `${R(50)} = ${R('25 · 2')} = 5${R(2)}`],
      ['Pitagorina teorema', 'a² + b² = c²', '3² + 4² = 9 + 16 = 25 = 5²']
    ],
    8: [
      ['Linearna jednačina', `ax + b = 0 ⇒ x = −${F('b', 'a')}`, '3x − 12 = 0 → 3x = 12 → x = 4'],
      ['Linearna nejednačina', 'a < 0: &nbsp;ax > b ⇒ x < ' + F('b', 'a'), '−2x > 6 → x < −3 (znak se okreće!)'],
      ['Linearna funkcija', 'y = kx + n', 'k = 2, n = 1 → prolazi kroz (0, 1) i (1, 3)'],
      ['Koeficijent pravca', `k = ${F('y₂ − y₁', 'x₂ − x₁')}`, `A(1, 3), B(3, 7) → k = ${F(4, 2)} = 2`],
      ['Sistem x + y = a, x − y = b', `x = ${F('a + b', '2')}, &nbsp;y = ${F('a − b', '2')}`, 'x + y = 5, x − y = 1 → x = 3, y = 2'],
      ['Zapremina prizme i valjka', 'V = B · H, &nbsp;V = r²πH', 'r = 2, H = 5 → V = 20π ≈ 62,8']
    ],
    9: [
      ['Kvadratna jednačina', `x<sub>1,2</sub> = ${F(`−b ± ${R('b² − 4ac')}`, '2a')}`, 'x² − 5x + 6 = 0 → D = 1 → x₁ = 3, x₂ = 2'],
      ['Vijetove formule', `x₁ + x₂ = −${F('b', 'a')}, &nbsp;x₁ · x₂ = ${F('c', 'a')}`, 'x² − 5x + 6: &nbsp;3 + 2 = 5, &nbsp;3 · 2 = 6'],
      ['Teme parabole', `T(−${F('b', '2a')}, −${F('D', '4a')})`, 'y = x² − 2x − 3 → T(1, −4)'],
      ['Osnovni identitet', 'sin²α + cos²α = 1', `sin 30° = ${F(1, 2)}, &nbsp;cos 30° = ${F(R(3), 2)}`],
      ['Logaritam proizvoda', 'log<sub>a</sub>(x · y) = log<sub>a</sub>x + log<sub>a</sub>y', 'log₂32 = log₂4 + log₂8 = 2 + 3 = 5'],
      ['Zbir aritmetičkog niza', `S<sub>n</sub> = ${F('n(a₁ + a<sub>n</sub>)', '2')}`, `1 + 2 + … + 100 = ${F('100 · 101', '2')} = 5050`]
    ]
  };
  sheet.geo = [
    ['Pravougaonik', 'O = 2(a + b), &nbsp;P = a · b', 'a = 5 cm, b = 3 cm → O = 16 cm, P = 15 cm²'],
    ['Kvadrat i dijagonala', `P = a², &nbsp;d = a${R(2)}`, `a = 4 → P = 16, &nbsp;d = 4${R(2)} ≈ 5,66`],
    ['Trapez', `P = ${F('(a + b) · h', '2')}`, 'a = 8, b = 4, h = 3 → P = 18'],
    ['Krug', 'O = 2rπ, &nbsp;P = r²π', 'r = 5 cm → O ≈ 31,4 cm, &nbsp;P ≈ 78,5 cm²'],
    ['Kocka i kvadar', 'V = a³, &nbsp;V = a · b · c', 'a = 4 → V = 64, &nbsp;P = 6a² = 96'],
    ['Kupa', `V = ${F('r²πH', '3')}`, 'r = 3, H = 4 → V = 12π ≈ 37,7']
  ];
  const sLabel = g => (g === 'geo' ? 'Geometrija' : gLabel(+g));
  const fTabs = $('#fTabs'), fGrid = $('#fGrid');
  const fTotal = Object.values(sheet).reduce((s, a) => s + a.length, 0);
  $$('[data-fcount]').forEach(el => el.dataset.to = fTotal);
  fTabs.innerHTML = ['5', '6', '7', '8', 'geo', '9'].map((g, k) => `<button data-g="${g}" class="${k === 0 ? 'on' : ''}">${sLabel(g)}<sup>${sheet[g].length}</sup></button>`).join('');
  function renderSheet(g, anim) {
    fGrid.innerHTML = sheet[g].map(([n, fx, ex], k) => `<article class="fc"><div class="top"><span>${n}</span><span>${String(k + 1).padStart(2, '0')}</span></div><div class="fx">${fx}</div><div class="ex"><b>Primer</b>${ex}</div></article>`).join('');
    if (anim && hasGSAP && !reduce) gsap.from($$('.fc', fGrid), { opacity: 0, y: 20, duration: .7, stagger: .06, ease: 'expo.out' });
  }
  fTabs.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', fTabs).forEach(x => x.classList.toggle('on', x === b));
    renderSheet(b.dataset.g, true);
  });
  renderSheet('5', false);

  /* ================= TRENER ================= */
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const gens = {
    jed() {
      const a = rnd(2, 9); let x = 0; while (!x) x = rnd(-9, 12);
      let b = 0; while (!b) b = rnd(-20, 20);
      const c = a * x + b;
      return {
        q: `${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${neg(c)}`, lab: 'x =', ans: x,
        steps: [`${a}x = ${neg(c)} ${b < 0 ? '+' : '−'} ${Math.abs(b)}`, `${a}x = ${neg(c - b)}`, `x = ${neg(c - b)} : ${a}`, `x = ${neg(x)}`]
      };
    },
    pro() {
      const p = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]), a = 20 * rnd(2, 30), ans = a * p / 100;
      return { q: `${p}% od ${a} = ?`, lab: '=', ans, steps: [`${a} · ${F(p, 100)}`, `= ${a * p} : 100`, `= ${ans}`] };
    },
    ste() {
      const b = pick([2, 3, 5, 7, 10]), m = rnd(2, 7), n = rnd(2, 7);
      return { q: `${b}<sup>${m}</sup> · ${b}<sup>${n}</sup> = ${b}<sup>?</sup>`, lab: '? =', ans: m + n, steps: ['a<sup>m</sup> · a<sup>n</sup> = a<sup>m + n</sup>', `${m} + ${n} = ${m + n}`, `${b}<sup>${m}</sup> · ${b}<sup>${n}</sup> = ${b}<sup>${m + n}</sup>`] };
    },
    ugao() {
      const a = rnd(25, 95), b = rnd(20, 160 - a), c = 180 - a - b;
      return { q: `α = ${a}°, &nbsp;β = ${b}°, &nbsp;γ = ?`, lab: 'γ =', ans: c, steps: ['α + β + γ = 180°', `γ = 180° − ${a}° − ${b}°`, `γ = ${c}°`] };
    },
    krug() {
      const r = rnd(2, 15);
      return { q: `r = ${r} cm, &nbsp;O = ?·π`, lab: '? =', ans: 2 * r, steps: ['O = 2rπ', `O = 2 · ${r} · π`, `O = ${2 * r}π ≈ ${fmt((2 * r * Math.PI).toFixed(2))} cm`] };
    },
    pit() {
      const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]]);
      return { q: `a = ${a}, b = ${b}, c = ?`, lab: 'c =', ans: c, steps: [`c² = ${a}² + ${b}²`, `c² = ${a * a} + ${b * b} = ${c * c}`, `c = ${R(c * c)} = ${c}`] };
    }
  };
  let tType = 'jed', task = null, tOk = 0, tAll = 0, answered = false;
  const tQ = $('#tQ'), tIn = $('#tIn'), tSteps = $('#tSteps'), tFb = $('#tFb');
  function newTask() {
    task = gens[tType](); answered = false;
    tQ.innerHTML = task.q; $('#tLab').textContent = task.lab;
    tIn.value = ''; tSteps.innerHTML = ''; tFb.textContent = ''; tFb.className = 'tfb';
    if (hasGSAP && !reduce) gsap.from(tQ, { opacity: 0, y: 14, duration: .6, ease: 'expo.out' });
  }
  function check() {
    const v = parseFloat(tIn.value.trim().replace('−', '-').replace(',', '.'));
    if (isNaN(v)) { tFb.textContent = 'Upiši broj pa proveri.'; tFb.className = 'tfb no'; return; }
    const ok = Math.abs(v - task.ans) < 1e-9;
    if (!answered) { tAll++; if (ok) tOk++; answered = true; }
    $('#tOk').textContent = tOk; $('#tAll').textContent = tAll;
    tFb.textContent = ok ? 'Tačno! ✓ Ovako izgleda postupak:' : `Nije baš — tačan odgovor je ${neg(task.ans)}. Pogledaj postupak:`;
    tFb.className = 'tfb ' + (ok ? 'ok' : 'no');
    tSteps.innerHTML = task.steps.map((s, k) => `<li style="animation-delay:${k * .12}s"><span>${String(k + 1).padStart(2, '0')}</span><div>${s}</div></li>`).join('');
  }
  $('#tTabs').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    tType = b.dataset.t; $$('#tTabs button').forEach(x => x.classList.toggle('on', x === b)); newTask();
  });
  $('#tChk').addEventListener('click', check);
  $('#tNew').addEventListener('click', newTask);
  tIn.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
  newTask();

  /* ================= NAČIN RADA — JEDNAČINA ================= */
  $('#kTabs').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#kTabs button').forEach(x => x.classList.toggle('on', x === b));
    $('#kon').classList.toggle('off', b.dataset.k !== 'eq'); $('#kon2').classList.toggle('off', b.dataset.k !== 'geo'); $('#kRight').textContent = b.dataset.k === 'geo' ? 'Δ ABC, c = 6 cm' : 'x = 9';
  });
  const kTicks = $$('#kTicks i'), lis = $$('#steps li');
  const names = lis.map(li => li.querySelector('h3').textContent);
  function stage(n) {
    $$('svg.k').forEach(k => { k.classList.remove('st1', 'st2', 'st3', 'st4'); k.classList.add('st' + n); });
    kTicks.forEach((t, k) => t.classList.toggle('on', k < n));
    lis.forEach(li => li.classList.toggle('on', +li.dataset.s === n));
    $$('.kStage').forEach(e => e.textContent = `KORAK 0${n} / 04`);
    $('#kName').textContent = names[n - 1];
  }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) stage(+e.target.dataset.s); }), { rootMargin: '-45% 0px -45% 0px' });
  lis.forEach(li => io.observe(li));
  stage(1);

  /* ================= MATERIJALI MODAL ================= */
  const modal = $('#modal');
  $$('.mat a').forEach(a => a.addEventListener('click', e => { e.preventDefault(); $('#mT').textContent = a.dataset.g + '. razred'; modal.classList.add('open'); }));
  const closeM = () => modal.classList.remove('open');
  $('#mX').addEventListener('click', closeM);
  modal.addEventListener('click', e => { if (e.target === modal) closeM(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeM(); });

  /* ================= FORMA ================= */
  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const fm = e.target, ime = fm.ime.value.trim(), k = fm.kontakt.value.trim(), m = fm.poruka.value.trim();
    const sent = $('#sent');
    if (!ime || !k || !m) { sent.textContent = 'Molim popunite sva polja.'; return; }
    const body = `${m}\n\n— ${ime}\nKontakt: ${k}`;
    window.location.href = `mailto:kontakt@tamarabrankovic.com?subject=${encodeURIComponent('Poruka sa sajta — ' + ime)}&body=${encodeURIComponent(body)}`;
    sent.textContent = 'Otvaramo Vaš email program… Hvala na poruci!';
  });

  /* ================= MENI / NAV ================= */
  $('#burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  $$('#mmenu a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
  const nav = $('#nav'); let lastY = 0;
  function onScroll(y) {
    nav.classList.toggle('scrolled', y > 20);
    nav.classList.toggle('hide', y > lastY && y > 300 && !document.body.classList.contains('menu-open'));
    lastY = y;
  }
  window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });

  /* ================= KURSOR ================= */
  if (fine) {
    const cu = $('#cursor'), ct = $('#cursorT');
    let mx = innerWidth / 2, my = innerHeight / 2, x = mx, y = my;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; ct.textContent = `(${Math.round(mx)}, ${Math.round(my)})`; });
    (function cl() { x += (mx - x) * .25; y += (my - y) * .25; cu.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(cl); })();
    document.addEventListener('mouseover', e => cu.classList.toggle('hover', !!e.target.closest('a,button,.obj,input,textarea,.fc')));
  }

  /* ================= SPLIT NASLOVA ================= */
  function split(el) {
    const out = [];
    el.childNodes.forEach(n => {
      const wrapTag = n.nodeType === 1 ? n : null;
      n.textContent.split(/(\s+)/).forEach(w => {
        if (!w) return;
        if (/^\s+$/.test(w)) { out.push(' '); return; }
        const inner = wrapTag ? `<${wrapTag.tagName.toLowerCase()} class="${wrapTag.className}">${w}</${wrapTag.tagName.toLowerCase()}>` : w;
        out.push(`<span class="wm" style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.1em;margin-bottom:-.1em"><span class="wi" style="display:inline-block">${inner}</span></span>`);
      });
    });
    el.innerHTML = out.join('');
  }
  $$('.split').forEach(split);

  /* ================= MOTION (GSAP) ================= */
  const loader = $('#loader');
  function revealAllPlain() {
    $$('.rv').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
    $$('.cnt').forEach(c => c.textContent = c.dataset.to);
  }
  function hideLoader() { loader.style.transition = 'opacity .6s'; loader.style.opacity = 0; setTimeout(() => loader.remove(), 700); }

  if (!hasGSAP || reduce) {
    revealAllPlain(); hideLoader();
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = a.getAttribute('href'); const el = t.length > 1 && $(t); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); } }));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: .1, smoothWheel: true });
    lenis.on('scroll', ({ scroll }) => { ScrollTrigger.update(); onScroll(scroll); });
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = a.getAttribute('href'); const el = t === '#top' ? document.body : (t.length > 1 && $(t));
    if (!el) return; e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: t === '#top' ? 0 : -60, duration: 1.4 }); else el.scrollIntoView({ behavior: 'smooth' });
  }));

  gsap.set('.wi', { yPercent: 110 });
  gsap.set('.rv', { opacity: 0, y: 24 });

  // preloader
  const pi = '1415926535897932384626433832795028841971693993751058209749445923';
  const ld = { v: 0 };
  const tl = gsap.timeline();
  tl.to('.loader .c', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0)
    .to('.loader .arm', { rotate: 360, duration: 1.6, ease: 'power2.inOut' }, 0)
    .to(ld, {
      v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => {
        $('#ldN').textContent = Math.round(ld.v);
        $('#piTxt').textContent = 'π = 3,' + pi.slice(0, Math.round(ld.v / 100 * pi.length));
      }
    }, 0)
    .to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=.15')
    .add(() => { loader.remove(); if (lenis) lenis.start(); })
    .to('.hero h1 .wi', { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: .05 }, '-=.45')
    .to('.hero .rv', { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .12 }, '-=.9')
    .add(() => {
      $$('#inkL .s').forEach((p, k) => {
        try { const L = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: `${L} ${L}`, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.6, delay: Math.min(k * .006, 1), ease: 'power2.out', onComplete: () => gsap.set(p, { clearProps: 'strokeDasharray,strokeDashoffset' }) }); } catch (e) { }
      });
      gsap.from('#inkL .txt', { opacity: 0, duration: .8, delay: .6, stagger: .015 });
    }, '-=1');
  setTimeout(() => { if (document.body.contains(loader)) tl.progress(1); }, 6000);

  $$('.split').forEach(el => {
    if (el.closest('.hero')) return;
    gsap.to($$('.wi', el), { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .04, scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  $$('.rv').forEach(el => {
    if (el.closest('.hero')) return;
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  // marquee — dva reda u suprotnim smerovima, ubrzavaju se sa skrolom
  const mqT = gsap.to(mq, { xPercent: -50, duration: 50, ease: 'none', repeat: -1 });
  const mqT2 = gsap.fromTo(mq2, { xPercent: -50 }, { xPercent: 0, duration: 60, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    onUpdate: s => {
      const v = 1 + Math.min(Math.abs(s.getVelocity() / 300), 6);
      [mqT, mqT2].forEach(t => { gsap.to(t, { timeScale: v, duration: .3, overwrite: true }); gsap.to(t, { timeScale: 1, duration: 1.2, delay: .3 }); });
    }
  });

  ScrollTrigger.create({
    trigger: sky, start: 'top 80%', once: true, onEnter: () => {
      gsap.from($$('.shp', sky), { scaleY: 0, transformOrigin: '50% 100%', duration: 1.1, ease: 'expo.out', stagger: .06 });
      gsap.from($$('.num', sky), { opacity: 0, y: 10, duration: .8, stagger: .06, delay: .4 });
    }
  });
  ScrollTrigger.create({ trigger: fGrid, start: 'top 85%', once: true, onEnter: () => gsap.from($$('.fc', fGrid), { opacity: 0, y: 30, duration: .9, stagger: .07, ease: 'expo.out' }) });
  gsap.from($$('.s', fSky), { opacity: 0, y: 30, duration: 1, stagger: .01, ease: 'power3.out', scrollTrigger: { trigger: fSky, start: 'top 95%' } });

  $$('[data-par]').forEach(img => gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, scrub: true } }));
  gsap.fromTo('.quote .bg', { y: 80 }, { y: -80, ease: 'none', scrollTrigger: { trigger: '.quote', scrub: true } });

  $$('.cnt').forEach(c => {
    const to = +c.dataset.to, o = { v: to === 0 ? 9 : 0 };
    ScrollTrigger.create({ trigger: c, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => c.textContent = Math.round(o.v) }) });
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
