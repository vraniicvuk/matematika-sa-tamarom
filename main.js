/* Matematika sa Tamarom — interakcije i motion */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const hasGSAP = typeof window.gsap !== 'undefined';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ================= HERO CRTEŽ ================= */
  function scene(mode) {
    const bp = mode === 'bp';
    const o = [];
    o.push(`<svg viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`);
    o.push(`<defs>
      <pattern id="h-${mode}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" stroke-width="1" opacity=".45"/></pattern>
      <pattern id="g-${mode}" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0 H0 V30" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1"/></pattern>
      <pattern id="G-${mode}" width="150" height="150" patternUnits="userSpaceOnUse" x="60" y="-40"><path d="M150 0 H0 V150" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1"/></pattern>
    </defs>`);
    if (bp) {
      o.push(`<rect width="1200" height="620" style="fill:url(#g-${mode})"/><rect width="1200" height="620" style="fill:url(#G-${mode})"/>`);
      for (let x = 60; x <= 1140; x += 150) o.push(`<text class="txt" x="${x + 4}" y="54" style="font-size:10px;opacity:.7">${((x - 60) / 30).toFixed(0)}</text>`);
      o.push(`<text class="txt" x="1140" y="36" text-anchor="end" style="font-size:11px">LIST 01 — GEOMETRIJA U RAVNI I PROSTORU · MERA 1:1 · 30px = 1 cm</text>`);
    }
    // --- lenjir
    o.push(`<rect class="s" x="60" y="560" width="1080" height="34" rx="2"/>`);
    for (let x = 60, i = 0; x <= 1140; x += 15, i++) {
      const L = i % 2 === 0 ? 14 : 7;
      o.push(`<path class="s t" d="M${x} 560 V${560 + L}"/>`);
      if (i % 4 === 0) o.push(`<text class="txt" x="${x}" y="588" text-anchor="middle" style="font-size:10px">${i / 2}</text>`);
    }
    o.push(`<text class="txt" x="1132" y="588" text-anchor="end" style="font-size:10px">cm</text>`);

    // --- krug sa upisanim trouglom
    const cx = 250, cy = 330, r = 150;
    const A = [cx, cy - r], B = [cx + 129.9, cy + 75], C = [cx - 129.9, cy + 75];
    o.push(`<circle class="s" cx="${cx}" cy="${cy}" r="${r}"/>`);
    o.push(`<path class="s" d="M${A} L${B} L${C} Z"/>`);
    o.push(`<path class="s t d" d="M${cx} ${cy} L${cx + r} ${cy}"/>`);
    o.push(`<path class="s t d" d="M${A} L${cx} ${cy + 75}"/>`);
    o.push(`<circle class="f" cx="${cx}" cy="${cy}" r="3"/>`);
    // konstrukcioni lukovi na temenima
    [A, B, C].forEach(p => {
      o.push(`<circle class="f" cx="${p[0]}" cy="${p[1]}" r="3"/>`);
      o.push(`<path class="s t" d="M${p[0] - 18} ${p[1] - 10} Q ${p[0]} ${p[1] - 22} ${p[0] + 18} ${p[1] - 10}"/>`);
    });
    o.push(`<path class="s t" d="M${cx - 6} ${cy + 75} h12 M${cx} ${cy + 69} v12"/>`);
    // --- Pitagora
    const P = [560, 420], Q = [680, 420], R = [560, 330];
    o.push(`<path class="s" d="M${P} L${Q} L${R} Z"/>`);
    o.push(`<path class="s" d="M560 420 L680 420 L680 540 L560 540 Z"/>`);
    o.push(`<path class="s" d="M560 420 L560 330 L470 330 L470 420 Z"/>`);
    o.push(`<path class="s" d="M680 420 L560 330 L650 210 L770 300 Z" style="fill:url(#h-${mode})"/>`);
    o.push(`<path class="s t" d="M560 404 H576 V420"/>`);
    // --- uglomer
    const pc = [900, 540], pr = 140;
    o.push(`<path class="s" d="M760 540 A140 140 0 0 1 1040 540 Z"/>`);
    o.push(`<path class="s t" d="M800 540 A100 100 0 0 1 1000 540"/>`);
    for (let a = 0; a <= 180; a += 5) {
      const rad = a * Math.PI / 180, L = a % 10 === 0 ? (a % 30 === 0 ? 18 : 11) : 6;
      const x1 = pc[0] + pr * Math.cos(rad), y1 = pc[1] - pr * Math.sin(rad);
      const x2 = pc[0] + (pr - L) * Math.cos(rad), y2 = pc[1] - (pr - L) * Math.sin(rad);
      o.push(`<path class="s t" d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`);
      if (a % 30 === 0) {
        const xt = pc[0] + 110 * Math.cos(rad), yt = pc[1] - 110 * Math.sin(rad) + 4;
        o.push(`<text class="txt" x="${xt.toFixed(1)}" y="${yt.toFixed(1)}" text-anchor="middle" style="font-size:9px">${a}</text>`);
      }
    }
    o.push(`<path class="s" d="M900 540 L${(900 + 175 * Math.cos(50 * Math.PI / 180)).toFixed(1)} ${(540 - 175 * Math.sin(50 * Math.PI / 180)).toFixed(1)}"/>`);
    o.push(`<path class="s" d="M900 540 L1075 540"/>`);
    o.push(`<path class="s t" d="M945 540 A45 45 0 0 0 ${(900 + 45 * Math.cos(50 * Math.PI / 180)).toFixed(1)} ${(540 - 45 * Math.sin(50 * Math.PI / 180)).toFixed(1)}"/>`);
    o.push(`<circle class="f" cx="900" cy="540" r="3"/>`);
    // --- kocka
    o.push(`<path class="s" d="M960 150 H1080 V270 H960 Z M960 150 L1005 112 H1125 V232 L1080 270 M1080 150 L1125 112"/>`);
    o.push(`<path class="s t d" d="M1005 112 V232 H1125 M1005 232 L960 270"/>`);
    // --- tačke i sitnice
    o.push(`<path class="s t" d="M420 120 l10 10 m0 -10 l-10 10"/><path class="s t" d="M860 260 l10 10 m0 -10 l-10 10"/>`);

    if (!bp) {
      o.push(`<text class="txt it" x="${A[0] - 8}" y="${A[1] - 26}">C</text><text class="txt it" x="${B[0] + 10}" y="${B[1] + 20}">B</text><text class="txt it" x="${C[0] - 24}" y="${C[1] + 20}">A</text>`);
      o.push(`<text class="txt it" x="${cx + 8}" y="${cy - 8}">O</text>`);
      o.push(`<text class="txt it" x="606" y="488">a²</text><text class="txt it" x="502" y="382">b²</text><text class="txt it" x="652" y="322">c²</text>`);
      o.push(`<text class="txt it" x="950" y="528">α</text>`);
      o.push(`<text class="txt it" x="1000" y="215">V</text>`);
    } else {
      o.push(`<text class="txt" x="${cx + 40}" y="${cy - 8}">r = 5 cm</text>`);
      o.push(`<text class="txt" x="80" y="160">O = 2rπ ≈ 31,4 cm</text><text class="txt" x="80" y="180">P = r²π ≈ 78,5 cm²</text>`);
      o.push(`<text class="txt" x="${cx - 10}" y="${cy + 100}" text-anchor="middle">a = r√3 ≈ 8,66 cm</text>`);
      o.push(`<text class="txt" x="620" y="440" text-anchor="middle">a = 4 cm</text><text class="txt" x="580" y="484" text-anchor="middle">a² = 16 cm²</text>`);
      o.push(`<text class="txt" x="515" y="378" text-anchor="middle">b² = 9</text><text class="txt" x="458" y="380" text-anchor="end">b = 3 cm</text>`);
      o.push(`<text class="txt" x="665" y="320" text-anchor="middle">c² = 25</text><text class="txt" x="600" y="364" transform="rotate(37 600 364)">c = 5 cm</text>`);
      o.push(`<text class="txt" x="640" y="190">a² + b² = c²</text>`);
      o.push(`<text class="txt" x="955" y="525">α = 50°</text>`);
      o.push(`<path class="s t" d="M960 292 H1080 M960 286 V298 M1080 286 V298"/><text class="txt" x="1020" y="312" text-anchor="middle">a = 4 cm</text>`);
      o.push(`<text class="txt" x="960" y="336">V = a³ = 64 cm³</text><text class="txt" x="960" y="354">P = 6a² = 96 cm²</text>`);
      o.push(`<path class="s t" d="M245 330 h10 M250 325 v10"/>`);
    }
    o.push('</svg>');
    return o.join('');
  }

  const drawing = $('#drawing');
  $('#inkL').innerHTML = scene('ink');
  $('#bpL').innerHTML = scene('bp');
  const bpL = $('#bpL');
  const st = { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 };
  const rx = $('#rx'), ry = $('#ry');
  function setTarget(e, rad) {
    const b = drawing.getBoundingClientRect();
    st.tx = e.clientX - b.left; st.ty = e.clientY - b.top; st.tr = rad;
    if (st.r < 1) { st.x = st.tx; st.y = st.ty; }
    const sx = st.tx / b.width * 1200, sy = st.ty / b.height * 620;
    rx.textContent = ((sx - 60) / 30).toFixed(1);
    ry.textContent = ((560 - sy) / 30).toFixed(1);
  }
  drawing.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') setTarget(e, Math.min(190, drawing.offsetWidth * .16)); });
  drawing.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') st.tr = 0; });
  drawing.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') setTarget(e, Math.max(90, drawing.offsetWidth * .22)); });
  if (!fine) $('#hint').textContent = 'Dodirni crtež da vidiš mere';
  (function loop() {
    st.x += (st.tx - st.x) * .16; st.y += (st.ty - st.y) * .16; st.r += (st.tr - st.r) * .12;
    bpL.style.clipPath = `circle(${st.r.toFixed(1)}px at ${st.x.toFixed(1)}px ${st.y.toFixed(1)}px)`;
    requestAnimationFrame(loop);
  })();

  /* ================= MARQUEE ================= */
  const formulas = ['a² + b² = c²', 'O = 2rπ', 'P = r²π', 'α + β + γ = 180°', 'V = a³', 'P = a · h / 2', 'π ≈ 3,14159', 'x = −b ± √(b² − 4ac) / 2a', 'V = B · H', '1/2 + 1/4 = 3/4'];
  const mq = $('#mq');
  const one = formulas.map(f => `<span>${f}</span>`).join('');
  mq.innerHTML = one + one;

  /* ================= GRADIVO / SKYLINE ================= */
  const topics = [
    { n: 'Razlomci', g: 5, area: 'Aritmetika', f: '¹⁄₂ + ¹⁄₄ = ³⁄₄', d: 'Deo celine koji se može nacrtati, preseći i sabrati. Učimo da razlomak vidimo, a ne samo da ga izračunamo — od pice do brojevne prave.' },
    { n: 'Ugao', g: 5, area: 'Geometrija', f: 'α + β = 180°', d: 'Merenje uglova uglomerom, vrste uglova i odnos susednih, uporednih i unakrsnih uglova. Prvi susret sa pravom geometrijom.' },
    { n: 'Osna simetrija', g: 5, area: 'Geometrija', f: 's ⟂ AB', d: 'Preslikavanje kao u ogledalu: konstrukcija simetrale duži i ugla, prepoznavanje simetričnih figura oko nas.' },
    { n: 'Trougao', g: 6, area: 'Geometrija', f: 'α + β + γ = 180°', d: 'Vrste trouglova, zbir uglova, visine i konstrukcije šestarom i lenjirom — figura od koje sve počinje.' },
    { n: 'Četvorougao', g: 6, area: 'Geometrija', f: 'O = 2(a + b)', d: 'Paralelogram, trapez i deltoid — njihove osobine, dijagonale, obim i površina.' },
    { n: 'Pitagorina teorema', g: 7, area: 'Geometrija', f: 'a² + b² = c²', d: 'Od pravouglog trougla do rastojanja dve tačke. Teorema koja se crta kvadratima i pamti zauvek.' },
    { n: 'Krug', g: 7, area: 'Geometrija', f: 'P = r²π', d: 'Obim i površina kruga, centralni i periferijski ugao, tangenta — i broj π koji se nikad ne završava.' },
    { n: 'Prizma', g: 8, area: 'Stereometrija', f: 'V = B · H', d: 'Mreža, površina i zapremina prizme. Geometrija koja se može iseći od papira i složiti na stolu.' },
    { n: 'Valjak i kupa', g: 8, area: 'Stereometrija', f: 'V = r²πH / 3', d: 'Obrtna tela: površina i zapremina valjka, kupe i lopte — matematika koju držimo u rukama svaki dan.' }
  ];
  const tops = [190, 150, 115, 140, 205, 216, 177, 100, 165];
  function shape(i, c) {
    switch (i) {
      case 0: return `<circle class="s" cx="${c}" cy="245" r="55"/><path class="s" d="M${c} 190 V300 M${c - 55} 245 H${c + 55}"/><path class="s hatch" d="M${c} 245 L${c} 190 A55 55 0 0 1 ${c + 55} 245 Z" style="fill:url(#hatchInk)"/>`;
      case 1: return `<path class="s" d="M${c - 55} 300 H${c + 62} M${c - 55} 300 L${c + 25} 150"/><path class="s t" d="M${c - 15} 300 A40 40 0 0 0 ${c - 36.2} 264.7"/><circle class="f" cx="${c - 55}" cy="300" r="3"/><text class="txt it" x="${c - 18}" y="290" style="font-size:16px">α</text>`;
      case 2: return `<path class="s" d="M${c} 140 L${c + 42} 215 L${c} 296 L${c - 42} 215 Z"/><path class="s t d" d="M${c} 115 V300"/><path class="s t" d="M${c + 18} 172 l6 -4 M${c - 18} 172 l-6 -4 M${c + 18} 258 l6 4 M${c - 18} 258 l-6 4"/>`;
      case 3: return `<path class="s" d="M${c - 58} 300 L${c + 58} 300 L${c + 18} 140 Z"/><path class="s t d" d="M${c + 18} 140 V300"/><path class="s t" d="M${c + 18} 290 H${c + 28} V300"/>`;
      case 4: return `<path class="s" d="M${c - 60} 300 L${c + 35} 300 L${c + 60} 205 L${c - 35} 205 Z"/><path class="s t d" d="M${c - 60} 300 L${c + 60} 205 M${c + 35} 300 L${c - 35} 205"/>`;
      case 5: return `<path class="s" d="M${c - 20} 300 L${c + 28} 300 L${c - 20} 264 Z"/><path class="s" d="M${c - 20} 264 L${c - 56} 264 L${c - 56} 300 L${c - 20} 300"/><path class="s hatch" d="M${c - 20} 264 L${c + 16} 216 L${c + 64} 252 L${c + 28} 300 Z" style="fill:url(#hatchInk)"/><path class="s t" d="M${c - 20} 291 H${c - 11} V300"/>`;
      case 6: return `<circle class="s" cx="${c}" cy="235" r="58"/><circle class="f" cx="${c}" cy="235" r="3"/><path class="s" d="M${c - 66} 177 H${c + 66}"/><path class="s t" d="M${c} 235 V177 M${c - 50.2} 264 L${c + 41} 276"/>`;
      case 7: return `<path class="s hatch" d="M${c + 20} 120 L${c + 44} 100 V280 L${c + 20} 300 Z" style="fill:url(#hatchInk)"/><path class="s" d="M${c - 40} 120 H${c + 20} V300 H${c - 40} Z M${c - 40} 120 L${c - 16} 100 H${c + 44} V280 L${c + 20} 300 M${c + 20} 120 L${c + 44} 100"/><path class="s t d" d="M${c - 16} 100 V280 H${c + 44} M${c - 16} 280 L${c - 40} 300"/><path class="s t" d="M${c - 40} 160 H${c + 20} M${c - 40} 200 H${c + 20} M${c - 40} 240 H${c + 20}"/>`;
      case 8: return `<ellipse class="s" cx="${c - 28}" cy="200" rx="24" ry="7"/><path class="s" d="M${c - 52} 200 V293 M${c - 4} 200 V293 M${c - 52} 293 A24 7 0 0 0 ${c - 4} 293"/><path class="s t d" d="M${c - 52} 293 A24 7 0 0 1 ${c - 4} 293"/><path class="s" d="M${c + 6} 293 L${c + 32} 165 L${c + 58} 293 M${c + 6} 293 A26 7 0 0 0 ${c + 58} 293"/><path class="s t d" d="M${c + 6} 293 A26 7 0 0 1 ${c + 58} 293 M${c + 32} 165 V293"/>`;
    }
  }
  const defs = `<defs>
    <pattern id="hatchInk" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#1a1a18" stroke-width="1" opacity=".5"/></pattern>
    <pattern id="hatchBp" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#1d46c9" stroke-width="1" opacity=".6"/></pattern>
  </defs>`;
  const slot = i => 70 + i * 132.5;
  const sky = $('#sky');
  let skyHtml = defs + `<path class="s" d="M0 300 H1200"/>`;
  for (let x = 0; x <= 1200; x += 20) skyHtml += `<path class="s t" d="M${x} 300 V${x % 100 === 0 ? 312 : 305}"/>`;
  topics.forEach((t, i) => {
    const c = slot(i);
    skyHtml += `<g class="obj" data-i="${i}" tabindex="0" role="button" aria-label="${t.n}, ${t.g}. razred"><rect class="hit" x="${c - 66}" y="80" width="132" height="225"/><g class="shp">${shape(i, c)}</g><text class="num" x="${c}" y="${tops[i] - 16}" text-anchor="middle">${String(i + 1).padStart(2, '0')}</text></g>`;
  });
  sky.innerHTML = skyHtml;

  // footer skyline (svetla verzija)
  const fSky = $('#fSky');
  let fh = `<defs><pattern id="hatchF" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" stroke-width="1" opacity=".5"/></pattern></defs><g transform="translate(0 -90)">`;
  topics.forEach((t, i) => fh += shape(i, slot(i)).replace(/hatchInk/g, 'hatchF'));
  fh += `<path class="s" d="M0 300 H1200"/></g>`;
  fSky.setAttribute('viewBox', '0 0 1200 220');
  fSky.innerHTML = fh;

  // filteri
  const filters = $('#filters');
  const groups = [['Sve', 0], ['5. razred', 5], ['6. razred', 6], ['7. razred', 7], ['8. razred', 8]];
  filters.innerHTML = groups.map(([l, g], k) => `<button data-g="${g}" class="${k === 0 ? 'on' : ''}">${l}<sup>${g ? topics.filter(t => t.g === g).length : topics.length}</sup></button>`).join('');
  let grade = 0, cur = 0;
  const objs = $$('.obj', sky);
  const visible = () => topics.map((t, i) => i).filter(i => !grade || topics[i].g === grade);

  function select(i, anim = true) {
    cur = i;
    objs.forEach(o => o.classList.toggle('on', +o.dataset.i === i));
    const t = topics[i];
    $('#dNo').textContent = `Br. ${String(i + 1).padStart(2, '0')} / 09`;
    $('#dTag').textContent = `${t.g}. razred`;
    $('#dTitle').textContent = t.n;
    $('#dF').textContent = t.f;
    $('#dDesc').textContent = t.d;
    $('#dArea').textContent = t.area;
    $('#dCorner').textContent = `SL. ${String(i + 1).padStart(2, '0')}`;
    $('#dViz').setAttribute('viewBox', `${slot(i) - 100} 95 200 215`);
    $('#dViz').innerHTML = defs.replace(/#1a1a18/g, '#1d46c9').replace(/hatchInk/g, 'hatchV').replace(/hatchBp/g, 'hatchV2') + shape(i, slot(i)).replace(/hatchInk/g, 'hatchV') + `<path class="s t" d="M${slot(i) - 100} 300 H${slot(i) + 100}"/>`;
    if (anim) {
      const b = $('#dBody'), v = $('#dViz');
      b.classList.remove('swap-out'); v.classList.remove('swap-out');
      void b.offsetWidth; b.classList.add('swap-out'); v.classList.add('swap-out');
      if (hasGSAP && !reduce) {
        $$('.s', v).forEach(p => {
          try { const L = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.1, ease: 'power3.out', clearProps: 'strokeDasharray,strokeDashoffset' }); } catch (e) { }
        });
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

  /* ================= KONSTRUKCIJA (način rada) ================= */
  const kon = $('#kon'), kTicks = $$('#kTicks i'), lis = $$('#steps li');
  const names = lis.map(li => li.querySelector('h3').textContent);
  function stage(n) {
    kon.classList.remove('st1', 'st2', 'st3', 'st4'); kon.classList.add('st' + n);
    kTicks.forEach((t, k) => t.classList.toggle('on', k < n));
    lis.forEach(li => li.classList.toggle('on', +li.dataset.s === n));
    $('#kStage').textContent = `KORAK 0${n} / 04`;
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
    const f = e.target, ime = f.ime.value.trim(), k = f.kontakt.value.trim(), m = f.poruka.value.trim();
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
    document.addEventListener('mouseover', e => cu.classList.toggle('hover', !!e.target.closest('a,button,.obj,input,textarea')));
  }

  /* ================= SPLIT NASLOVA ================= */
  function split(el) {
    const out = [];
    el.childNodes.forEach(n => {
      const wrapTag = n.nodeType === 1 ? n : null;
      const text = n.textContent;
      text.split(/(\s+)/).forEach(w => {
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

  // početna stanja
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
        $('#piTxt').textContent = 'π = 3.' + pi.slice(0, Math.round(ld.v / 100 * pi.length));
      }
    }, 0)
    .to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=.15')
    .add(() => { loader.remove(); if (lenis) lenis.start(); })
    .to('.hero h1 .wi', { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: .05 }, '-=.45')
    .to('.hero .rv', { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .12 }, '-=.9')
    .add(() => {
      // crtanje hero linija
      $$('#inkL .s').forEach((p, k) => {
        try { const L = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: `${L} ${L}`, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.6, delay: Math.min(k * .006, 1), ease: 'power2.out', onComplete: () => gsap.set(p, { clearProps: 'strokeDasharray,strokeDashoffset' }) }); } catch (e) { }
      });
      gsap.from('#inkL .txt', { opacity: 0, duration: 1, delay: 1, stagger: .01 });
    }, '-=1');
  // failsafe
  setTimeout(() => { if (document.body.contains(loader)) { tl.progress(1); } }, 6000);

  // reveal naslova i blokova
  $$('.split').forEach(el => {
    if (el.closest('.hero')) return;
    gsap.to($$('.wi', el), { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .04, scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  $$('.rv').forEach(el => {
    if (el.closest('.hero')) return;
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  // marquee sa brzinom skrola
  const mqT = gsap.to(mq, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
  ScrollTrigger.create({ onUpdate: s => { const v = s.getVelocity() / 300; gsap.to(mqT, { timeScale: 1 + Math.min(Math.abs(v), 6), duration: .3, overwrite: true }); gsap.to(mqT, { timeScale: 1, duration: 1.2, delay: .3 }); } });

  // skyline crtanje pri ulasku
  ScrollTrigger.create({
    trigger: sky, start: 'top 80%', once: true, onEnter: () => {
      gsap.from($$('.shp', sky), { scaleY: 0, transformOrigin: '50% 100%', duration: 1.1, ease: 'expo.out', stagger: .08 });
      gsap.from($$('.num', sky), { opacity: 0, y: 10, duration: .8, stagger: .08, delay: .4 });
    }
  });
  // footer skyline
  gsap.from($$('.s', fSky), { opacity: 0, y: 30, duration: 1, stagger: .01, ease: 'power3.out', scrollTrigger: { trigger: fSky, start: 'top 95%' } });

  // parallax slike
  $$('[data-par]').forEach(img => gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, scrub: true } }));
  gsap.to('.quote .bg', { rotate: 90, ease: 'none', scrollTrigger: { trigger: '.quote', scrub: true } });

  // brojači
  $$('.cnt').forEach(c => {
    const to = +c.dataset.to, o = { v: to === 0 ? 9 : 0 };
    ScrollTrigger.create({ trigger: c, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => c.textContent = Math.round(o.v) }) });
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
