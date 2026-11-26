// @ts-nocheck
/*
 * Laptop-dive hero section for DeePortfolio (sits in the page flow, below the intro).
 *
 * Scrolling down: when the section reaches the top of the screen the page holds, the camera dives into
 * the laptop (5 s AI clip played in ~1.7 s), the laptop lands showing a small terminal, then scrolling continues.
 * Scrolling back up into it plays the reverse (blurred zoom-out back to the hero).
 */

const A = {
  plate: '/hero/plate.webp',
  casePlate: '/hero/caseplate.webp',
  cut: '/hero/cut.webp',
  badge: '/hero/badge.webp',
  trans: '/hero/trans.mp4',
};

const TERMINAL = [
  '<span class=d>deep@portfolio</span>:<span class=w>~</span>$ whoami',
  'deep shah · software engineer',
  '<span class=d>deep@portfolio</span>:<span class=w>~</span>$ ls ~/work',
  '<span class=ok>fixie</span>  <span class=ok>digi-biometric</span>  <span class=ok>election-ms</span>',
  '<span class=d>deep@portfolio</span>:<span class=w>~</span>$ cat stack.txt',
  'java · spring boot · microservices · aws',
  '<span class=d>deep@portfolio</span>:<span class=w>~</span>$ <span class=q>scroll ↓</span>',
];

const WM_GRAD = (id, bottom) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset=".5" stop-color="#f1f5f3" stop-opacity=".9"/><stop offset="1" stop-color="#d7e6de" stop-opacity="${bottom}"/>
</linearGradient></defs>`;

export const MARKUP = `
<div class="stage" data-r="stage">
  <div class="frame" data-r="frame">
    <img class="plate fx" data-r="plate" alt="" />
    <svg class="wm pre" data-r="wm" viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true">
      ${WM_GRAD('lh-wmg', .28)}
      <text x="14" y="214" textLength="1412" lengthAdjust="spacingAndGlyphs" fill="url(#lh-wmg)" font-family="Inter Tight, sans-serif" font-weight="900" font-size="268" letter-spacing="-6">DEEP SHAH</text>
    </svg>
    <img class="cut" data-r="cut" alt="Deep Shah holding a laptop and a retro phone" />
    <div class="badge pre" data-r="badge">
      <img data-r="badgeImg" alt="" />
      <div class="card">
        <h4>ENGINEER<br>CARD</h4>
        <span class="yr">2026</span>
        <div class="role">SOFTWARE ENGINEER // JAVA</div>
        <div class="ph"></div>
        <div class="row"><span>NAME</span><b>DEEP SHAH</b></div>
        <div class="row"><span>FOCUS</span><b>JAVA · SPRING BOOT</b></div>
        <div class="row"><span>GH</span><b>@SHAHDEEP1683</b></div>
        <div class="row"><span>EMAIL</span><b>SHAHDEEP.1683@GMAIL.COM</b></div>
      </div>
      <div class="hit"></div>
    </div>
    <div class="script pre" data-r="script">software-engineer</div>
    <div class="tagline pre" data-r="tagline">
      <p>I build backends that stay calm when the traffic doesn’t.</p>
      <small>JAVA · SPRING BOOT · MICROSERVICES · AWS</small>
    </div>
    <video class="trans fx" data-r="trans" muted playsinline preload="auto"></video>
    <img class="caseplate fx" data-r="caseplate" alt="" />
    <div class="screen" data-r="screen">
      <div class="pane">
        <div class="bar"><i></i><i></i><i></i><span>deep@portfolio — zsh</span></div>
        <div class="log" data-r="log"></div>
      </div>
      <div class="flash" data-r="flash"></div>
    </div>
  </div>
</div>
<div class="ui">
  <svg class="m-only m-wm pre" data-r="mwm" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
    ${WM_GRAD('lh-mwmg', .3)}
    <text x="10" y="210" textLength="1420" lengthAdjust="spacingAndGlyphs" fill="url(#lh-mwmg)" font-family="Inter Tight, sans-serif" font-weight="900" font-size="268" letter-spacing="-6">DEEP SHAH</text>
  </svg>
  <div class="m-only m-script pre" data-r="mscript">software-engineer</div>
  <div class="m-only m-tagline pre" data-r="mtagline">
    <p>I build backends that stay calm when the traffic doesn’t.</p>
    <small>JAVA · SPRING BOOT · AWS</small>
  </div>
  <div class="m-only m-badge" data-r="mbadgeBox"></div>
  <div class="hint pre" data-r="hint"><i></i>scroll into the work</div>
</div>`;

export function initLaptopHero(root) {
  const $ = k => root.querySelector(`[data-r="${k}"]`);
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D = RM ? 0 : 1;
  const E = 'cubic-bezier(.2,.8,.2,1)';
  const OUT = 'cubic-bezier(.5,0,.75,0)';
  let dead = false;
  const timers = new Set();
  const wait = ms => new Promise(r => { const t = setTimeout(() => { timers.delete(t); r(); }, ms); timers.add(t); });
  const later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); if (!dead) f(); }, ms); timers.add(t); };
  const raf2 = f => requestAnimationFrame(() => requestAnimationFrame(f));
  const offs = [];
  const on = (t, ev, f, o) => { t.addEventListener(ev, f, o); offs.push(() => t.removeEventListener(ev, f, o)); };

  function anim(el, kf, o = {}) {
    if (!el) return null;
    el.getAnimations().forEach(a => { try { a.commitStyles(); } catch (e) {} a.cancel(); });
    const a = el.animate(kf, Object.assign({ easing: E, fill: 'both' }, o));
    a.finished.then(() => {
      if (o.commit === false) { a.cancel(); return; }
      try { a.commitStyles(); a.cancel(); } catch (e) {}
    }).catch(() => {});
    return a;
  }
  const each = (list, f) => list.forEach((el, i) => el && f(el, i));

  /* ---------- DOM ---------- */
  const stage = $('stage'), frame = $('frame'), plate = $('plate'), cut = $('cut'), trans = $('trans'), caseplate = $('caseplate');
  const wm = $('wm'), script = $('script'), tagline = $('tagline'), badge = $('badge');
  const screen = $('screen'), flash = $('flash'), log = $('log'), hint = $('hint');

  plate.src = A.plate; cut.src = A.cut; caseplate.src = A.casePlate; $('badgeImg').src = A.badge;

  const mbadgeBox = $('mbadgeBox');
  mbadgeBox.innerHTML = '';
  const mbadge = badge.cloneNode(true); mbadge.removeAttribute('data-r'); mbadgeBox.appendChild(mbadge);

  const WMS = [wm, $('mwm')], SCRIPTS = [script, $('mscript')], TAGS = [tagline, $('mtagline')], BADGES = [badge, mbadge];

  /* ---------- layout (sized to the section, not the window) ---------- */
  let mode = 'hero', busy = false;   // mode: 'hero' | 'case' (laptop landed)
  const dims = () => ({ W: root.clientWidth, H: root.clientHeight });
  const mob = () => root.clientWidth <= 820;

  function pose(m) {
    const { W, H } = dims();
    if (!mob()) {
      const cover = Math.max(W / 1440, H / 810), u = Math.min(W / 1440, H / 900);
      let s, y;
      if (m === 'hero') { s = cover; y = 0; }
      else {
        const top = 40 * u, fit = (H - top - 28 * u) / (762 - 79);
        if (fit >= cover) { s = cover; y = Math.min(0, Math.max(H - 810 * s, top - 79 * s)); }
        else { s = fit; y = top - 79 * fit; }
      }
      return { s, x: (W - 1440 * s) / 2, y };
    }
    if (m === 'hero') {
      const s = Math.min(W / 650, 0.62 * H / 810);
      return { s, x: W / 2 - 805 * s, y: H - 790 * s };
    }
    const s = Math.min((W - 28) / 905, (H - 60) / (762 - 95));
    return { s, x: W / 2 - 720 * s, y: H / 2 - 428 * s };
  }

  function fitHero(p) {
    const { W, H } = dims();
    const vl = Math.max(0, -p.x / p.s), vr = Math.min(1440, (W - p.x) / p.s), pad = 18 / p.s;
    const bl = Math.min(986, vr - pad - 417);
    const vb = Math.min(810, (H - p.y) / p.s);
    const bt = Math.min(-165, vb - 56 / p.s - 935);
    badge.style.left = bl + 'px';
    badge.style.top = bt + 'px';
    // on shorter screens the ID card rises into the name: then end "DEEP SHAH" just left of the card so no letter is hidden
    const wl = vl + .6 * pad;
    let wr = vr - .6 * pad;
    if (bt + 536 < 250) wr = Math.min(wr, bl + 172 - 22);
    wm.style.left = wl + 'px';
    wm.style.width = (wr - wl) + 'px';
    script.style.left = (vl + pad + 70) + 'px';
    const tl = vl + pad + 42;
    tagline.style.left = tl + 'px';
    tagline.style.width = Math.max(220, Math.min(420, 520 - tl)) + 'px';
  }

  function place(m) {
    const { W, H } = dims(), isMob = mob();
    root.style.setProperty('--n', (isMob ? W / 430 : Math.min(W / 1440, H / 900)) + 'px');
    if (isMob) root.style.setProperty('--mbs', mbadgeBox.getBoundingClientRect().width / 582);
    const p = pose(m);
    frame.style.transform = `translate(${p.x}px,${p.y}px) scale(${p.s})`;
    frame.classList.toggle('m-case', m === 'case');
    stage.classList.toggle('m-case', m === 'case');
    frame.classList.toggle('d-fade', !isMob);
    frame.classList.toggle('m-fade', isMob);
    if (!isMob && m === 'hero') fitHero(p);
  }
  const setGlide = sec => { root.style.setProperty('--glide', sec + 's'); frame.classList.add('glide'); };

  // After a transition the section keeps holding the page until the current scroll gesture has ended
  // (no wheel/touch input for IDLE ms), so leftover momentum can't fling the page past the laptop.
  //
  // Chrome only lets a page cancel the FIRST wheel event of a scroll gesture; if a touchpad/wheel gesture began
  // up in the intro, the rest of it can't be preventDefault-ed. So instead of cancelling events we freeze the
  // page itself (overflow hidden on <html>) and pin scrollY, which no gesture can get past.
  const IDLE = 450;
  const html = document.documentElement;
  let holding = false, idleTimer = null, pinY = null, snapping = false, lastY = window.scrollY;
  let pinRaf = 0;
  function freeze(on) {
    html.classList.toggle('lh-lock', on);
    cancelAnimationFrame(pinRaf);
    if (!on) { pinY = null; return; }
    // every frame while frozen: if anything moved the page, put it back (and keep holding while it's still being pushed)
    const loop = () => {
      if (dead || !html.classList.contains('lh-lock')) return;
      if (pinY !== null && !snapping && Math.abs(window.scrollY - pinY) > 1) {
        window.scrollTo(0, pinY);
        if (holding) bumpIdle();
      }
      pinRaf = requestAnimationFrame(loop);
    };
    pinRaf = requestAnimationFrame(loop);
  }
  function lock() { busy = true; root.classList.add('busy'); freeze(true); }
  function unlock() { busy = false; root.classList.remove('busy'); holding = true; bumpIdle(); }
  function bumpIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { holding = false; if (!busy) freeze(false); }, IDLE);
  }

  /* ---------- where is the section? ---------- */
  const headerH = () => (document.querySelector('header')?.offsetHeight || 0);
  const offsetTop = () => root.getBoundingClientRect().top - headerH();   // 0 = section snapped under the sticky header
  // glide the page so the section sits right under the header, then pin it there
  const snap = () => glideTo(window.scrollY + offsetTop());

  // after the laptop has landed: carry on down to the next section (Tech Stack) by itself
  function nextSectionY() {
    const next = document.getElementById('skills') || root.nextElementSibling;
    const top = next ? next.getBoundingClientRect().top : root.getBoundingClientRect().bottom;
    return window.scrollY + top - headerH();
  }

  async function glideTo(to, maxDur = 600) {
    const from = window.scrollY;
    pinY = to;
    if (Math.abs(to - from) < 2) { window.scrollTo(0, to); return; }
    const dur = RM ? 0 : Math.min(maxDur, 220 + Math.abs(to - from) * .5);
    snapping = true;
    const t0 = performance.now();
    await new Promise(res => {
      const step = now => {
        if (dead) return res();
        const p = dur ? Math.min(1, (now - t0) / dur) : 1;
        const e = 1 - Math.pow(1 - p, 3);
        window.scrollTo(0, from + (to - from) * e);
        if (p < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    snapping = false;
    window.scrollTo(0, to);
  }

  /* ---------- entrance (first time the section is seen) ---------- */
  function sway(b) {
    if (RM) return;
    b.animate([{ transform: 'rotate(-1.1deg)' }, { transform: 'rotate(1.1deg)' }],
      { duration: 3200, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
  }
  let entered = false, entranceEnd = 0;
  function entrance() {
    if (entered || dead) return;
    entered = true;
    root.querySelectorAll('.pre').forEach(e => e.classList.remove('pre'));
    if (RM || mode !== 'hero') return;
    entranceEnd = performance.now() + 2100;   // name, handwriting, tagline and badge all settled by then
    each(WMS, w => anim(w, [{ opacity: 0, transform: 'translateY(60px)', clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0 0)' }],
      { duration: 1100, delay: 100, commit: false }));
    each(SCRIPTS, s => anim(s, [{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0 0 0)' }],
      { duration: 900, delay: 850, easing: 'cubic-bezier(.5,0,.3,1)', commit: false }));
    each(TAGS, t => anim(t, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
      { duration: 800, delay: 1250, commit: false }));
    each(BADGES, b => {
      const a = anim(b, [
        { opacity: 0, transform: 'translateY(-120%) rotate(8deg)' },
        { offset: .6, opacity: 1, transform: 'translateY(0) rotate(-3deg)' },
        { offset: .8, opacity: 1, transform: 'translateY(0) rotate(1.6deg)' },
        { opacity: 1, transform: 'translateY(0) rotate(0)' }], { duration: 1500, delay: 500, commit: false });
      a.finished.then(() => !dead && sway(b)).catch(() => {});
    });
    anim(hint, [{ opacity: 0 }, { opacity: .85 }], { duration: 600, delay: 1600, commit: false });
  }
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) entrance(); }, { threshold: .3 });
  io.observe(root);

  on(badge.querySelector('.hit'), 'pointerenter', () => {
    if (mode !== 'hero' || busy || RM) return;
    badge.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(4deg)' }, { transform: 'rotate(-2deg)' }, { transform: 'rotate(0)' }],
      { duration: 1400, easing: 'ease-out', composite: 'add' });
  });

  /* ---------- transition clip ---------- */
  let transReady = false, blobUrl = null;
  on(trans, 'loadeddata', () => { transReady = true; });
  fetch(A.trans).then(r => { if (!r.ok) throw 0; return r.blob(); })
    .then(b => { if (dead) return; blobUrl = URL.createObjectURL(b); trans.src = blobUrl; })
    .catch(() => { if (!dead) trans.src = A.trans; });

  function playClip() {
    return new Promise(res => {
      let done = false;
      const fin = () => { if (!done) { done = true; res(); } };
      trans.addEventListener('ended', fin, { once: true });
      later(fin, 6000);
      trans.playbackRate = 1.8;
      const pr = trans.play(); if (pr) pr.catch(fin);
      const tick = () => {
        if (done || dead) return fin();
        const d = trans.duration || 5.04, p = trans.currentTime / d;
        if (trans.ended || p >= .995) return fin();
        trans.playbackRate = Math.max(1.2, 1.8 + 2.4 * Math.sin(Math.PI * Math.min(p * 1.08, 1)));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ---------- laptop terminal ---------- */
  let typeTimer = null;
  function typeTerminal() {
    clearTimeout(typeTimer);
    log.innerHTML = '';
    let k = 0;
    return new Promise(res => {
      const step = () => {
        if (dead) return res();
        if (k >= TERMINAL.length) return res();
        const d = document.createElement('div'); d.innerHTML = TERMINAL[k++]; log.appendChild(d);
        typeTimer = setTimeout(step, RM ? 0 : (k % 2 ? 170 : 280));
      };
      typeTimer = setTimeout(step, RM ? 0 : 200);
    });
  }

  /* ---------- hero out / in ---------- */
  function heroOut(dur = 380) {
    const o = { duration: dur * D, easing: OUT };
    each(WMS, w => anim(w, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-40px)' }], o));
    each(SCRIPTS, s => anim(s, [{ opacity: 1 }, { opacity: 0 }], o));
    each(TAGS, t => anim(t, [{ opacity: 1 }, { opacity: 0 }], o));
    each(BADGES, b => anim(b, [{ opacity: 1 }, { opacity: 0, transform: 'translateY(-110%) rotate(-6deg)' }], o));
  }
  function heroIn() {
    each(WMS, w => anim(w, [{ opacity: 0, transform: 'translateY(40px)', clipPath: 'inset(0 0 0 0)' }, { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0 0)' }], { duration: 700 * D }));
    each(SCRIPTS, s => anim(s, [{ opacity: 1, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0 0 0)' }], { duration: 700 * D, delay: 250 * D }));
    each(TAGS, t => anim(t, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 700 * D, delay: 350 * D }));
    each(BADGES, b => {
      const a = anim(b, [
        { opacity: 0, transform: 'translateY(-110%) rotate(6deg)' },
        { offset: .7, opacity: 1, transform: 'translateY(0) rotate(-2deg)' },
        { opacity: 1, transform: 'translateY(0) rotate(0)' }], { duration: 1100 * D });
      a.finished.then(() => !dead && sway(b)).catch(() => {});
    });
  }

  function showLaptop() {
    mode = 'case';
    root.classList.add('is-case');
    plate.style.visibility = 'hidden';
    cut.getAnimations().forEach(a => a.cancel()); cut.style.opacity = 0;
    caseplate.getAnimations().forEach(a => a.cancel()); caseplate.style.opacity = 1;
    screen.getAnimations().forEach(a => a.cancel()); screen.style.opacity = 1;
  }

  /* ---------- scrolling down: step 1 = arrive on the hero, step 2 = dive ---------- */
  // `arrived` = the hero has been shown fully, parked under the header, during this visit to the section
  let arrived = false;
  function forward() {
    if (busy || mode !== 'hero') return;
    if (arrived && Math.abs(offsetTop()) < root.clientHeight * .25) dive();
    else arrive();
  }
  async function arrive() {
    lock();
    await snap();
    if (dead) return;
    entrance();
    // let the name / handwriting / badge finish (whatever is left of the entrance), but always show the hero a moment
    await wait(Math.max(RM ? 0 : 700, entranceEnd - performance.now()));
    if (dead) return;
    arrived = true;
    unlock();   // holds until the current scroll gesture ends; the next scroll dives
  }

  /* ---------- hero -> laptop ---------- */
  async function dive() {
    if (busy || mode !== 'hero') return;
    lock();
    await snap();
    if (dead) return;
    entrance();
    // first visit: give the dive clip a moment to finish downloading instead of skipping the effect
    if (!RM && !transReady) { const t0 = performance.now(); while (!transReady && !dead && performance.now() - t0 < 3000) await wait(50); }
    if (dead) return;
    arrived = false;
    heroOut();
    await wait(330 * D);
    if (dead) return;
    if (RM || !transReady) {
      place('case');
      plate.style.visibility = 'hidden';
      anim(cut, [{ opacity: 1 }, { opacity: 0 }], { duration: 300 * D });
      anim(caseplate, [{ opacity: 0 }, { opacity: 1 }], { duration: 500 * D });
      await wait(500 * D);
    } else {
      trans.currentTime = 0;
      trans.style.opacity = 1;
      raf2(() => { plate.style.visibility = 'hidden'; });
      anim(cut, [{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: 'ease-out' });
      setGlide(1.6);
      place('case');
      playClip();
      await clipReached(.62);            // laptop has left his hand and is turning...
      if (dead) return;
    }
    // ...and the page is already on its way to Tech Stack: the laptop never sits on screen
    await Promise.all([glideTo(nextSectionY(), 1000), RM || !transReady ? null : Promise.race([clipDoneP(), wait(2500)])]);
    if (dead) return;
    trans.pause();
    resetToHero();                       // off-screen now; scrolling back up shows the hero, not the laptop
    unlock();
  }
  function clipReached(p) {
    return new Promise(res => {
      const t0 = performance.now();
      const tick = () => {
        if (dead || trans.ended || performance.now() - t0 > 4000) return res();
        const d = trans.duration || 5.04;
        if (trans.currentTime / d >= p) return res();
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  const clipDoneP = () => new Promise(res => { if (trans.ended || trans.paused) res(); else { trans.addEventListener('ended', res, { once: true }); later(res, 2500); } });
  function resetToHero() {
    frame.classList.remove('glide');
    mode = 'hero';
    arrived = false;
    root.classList.remove('is-case');
    [plate, cut, caseplate, screen, trans].forEach(e => e.getAnimations().forEach(a => a.cancel()));
    trans.style.opacity = 0;
    place('hero');
    plate.style.visibility = 'visible'; plate.style.transform = ''; plate.style.filter = '';
    cut.style.opacity = 1; caseplate.style.opacity = 0; caseplate.style.filter = ''; screen.style.opacity = 0;
    [...WMS, ...SCRIPTS, ...TAGS, ...BADGES].forEach(el => {
      if (!el) return;
      el.getAnimations().forEach(a => a.cancel());
      el.style.opacity = ''; el.style.transform = ''; el.style.clipPath = '';
    });
    BADGES.forEach(b => b && sway(b));
  }
  let skippable = false, skipLaptop = null;
  const trySkip = () => { if (skippable && skipLaptop) { skippable = false; skipLaptop(); } };

  /* ---------- laptop -> hero ---------- */
  async function back() {
    if (busy || mode !== 'case') return;
    lock();
    await snap();
    if (dead) return;
    clearTimeout(typeTimer);
    anim(screen, [{ opacity: 1 }, { opacity: 0 }], { duration: 300 * D });
    mode = 'hero';
    root.classList.remove('is-case');
    setGlide(.9);
    place('hero');
    plate.style.visibility = 'visible';
    anim(cut, [{ opacity: 0 }, { opacity: 1 }], { duration: 700 * D, delay: 150 * D });
    anim(caseplate, [{ opacity: 1, filter: 'blur(0px)' }, { opacity: 0, filter: 'blur(12px)' }], { duration: 800 * D, easing: 'cubic-bezier(.65,0,.35,1)' });
    anim(plate, [{ transform: 'scale(1.12)', filter: 'blur(8px)' }, { transform: 'scale(1)', filter: 'blur(0px)' }], { duration: 900 * D });
    later(heroIn, 250 * D);
    // stay on the hero until the name and badge have dropped back in; the next scroll up goes on to the intro
    later(() => { arrived = true; unlock(); frame.classList.remove('glide'); }, 1300 * D);
  }

  /* jump straight to a state without animation (e.g. user clicked a nav link past the section) */
  function jumpTo(m) {
    if (busy || m === mode) return;
    frame.classList.remove('glide');
    if (m === 'case') {
      entered = true;
      root.querySelectorAll('.pre').forEach(e => e.classList.remove('pre'));
      heroOut(0);
      place('case');
      showLaptop();
      log.innerHTML = TERMINAL.map(l => `<div>${l}</div>`).join('');
    } else {
      mode = 'hero';
      arrived = false;
      root.classList.remove('is-case');
      place('hero');
      plate.style.visibility = 'visible';
      cut.style.opacity = 1; caseplate.style.opacity = 0; screen.style.opacity = 0;
      heroIn();
    }
  }

  /* ---------- input ---------- */
  // down: the hero is coming up into view (or parked)  |  up: the laptop is coming back down into view (or parked)
  const wantForward = () => { const t = offsetTop(), H = root.clientHeight; return mode === 'hero' && t < H * .6 && t > -H * .45; };
  const wantBack = () => { const t = offsetTop(), H = root.clientHeight; return mode === 'case' && t > -H * 1.02 && t < H * .5; };
  let wheelLock = 0;
  on(window, 'wheel', e => {
    if (busy || holding) { e.preventDefault(); if (e.deltaY > 0) trySkip(); if (holding) bumpIdle(); return; }
    if (Math.abs(e.deltaY) < 4) return;
    const now = performance.now();
    if (e.deltaY > 0 && wantForward()) {
      e.preventDefault();
      if (now < wheelLock) return;
      wheelLock = now + 900;
      forward();
    } else if (e.deltaY < 0 && wantBack()) {
      e.preventDefault();
      if (now < wheelLock) return;
      wheelLock = now + 900;
      back();
    }
  }, { passive: false });

  let tx = 0, ty = 0;
  on(window, 'touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  on(window, 'touchstart', () => { if (holding) { holding = false; clearTimeout(idleTimer); if (!busy) freeze(false); } }, { passive: true }); // a new finger = a new gesture
  on(window, 'touchmove', e => {
    const dy = e.touches[0].clientY - ty;
    if (busy || holding) { e.preventDefault(); if (dy < -14) trySkip(); return; }
    if (Math.abs(dy) < 14) return;
    if (dy < 0 && wantForward()) { e.preventDefault(); forward(); }
    else if (dy > 0 && wantBack()) { e.preventDefault(); back(); }
  }, { passive: false });

  on(window, 'keydown', e => {
    const k = e.key;
    if ((busy || holding) && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(k)) {
      e.preventDefault();
      if (['ArrowDown', 'PageDown', ' ', 'End'].includes(k)) trySkip();
      return;
    }
    if ((k === 'ArrowDown' || k === 'PageDown' || k === ' ') && wantForward()) { e.preventDefault(); forward(); }
    else if ((k === 'ArrowUp' || k === 'PageUp') && wantBack()) { e.preventDefault(); back(); }
  });

  // nav links / fast jumps that skip past the section: keep its state consistent with where it is
  on(window, 'scroll', () => {
    const dir = window.scrollY - lastY; lastY = window.scrollY;
    // safety net: while frozen, anything that still moves the page gets put straight back
    if ((busy || holding) && pinY !== null && !snapping && Math.abs(window.scrollY - pinY) > 1) {
      window.scrollTo(0, pinY);
      if (holding) bumpIdle();   // the gesture is still going: keep holding until it really stops
      return;
    }
    if (busy || holding) return;
    const t = offsetTop(), H = root.clientHeight;
    // backup trigger for scrolling that isn't a cancelable wheel event (touchpad momentum, scrollbar drag, touch fling)
    if (mode === 'hero' && (t > H * .7 || t < -H * .9)) arrived = false;   // left the section: next visit starts with step 1 again
    if (dir > 0 && wantForward() && t < H * .35) { forward(); return; }
    if (dir < 0 && wantBack()) { back(); return; }
    else if (mode === 'case' && t > H * .9) jumpTo('hero');   // jumped above the section (header link / Home key)
  }, { passive: true });

  on(window, 'resize', () => { if (!busy) { frame.classList.remove('glide'); place(mode); } });

  /* ---------- start ---------- */
  place('hero');

  return () => {
    dead = true;
    clearTimeout(idleTimer);
    freeze(false);
    cancelAnimationFrame(pinRaf);
    io.disconnect();
    clearTimeout(typeTimer);
    timers.forEach(clearTimeout); timers.clear();
    offs.forEach(f => f());
    trans.pause();
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    root.getAnimations({ subtree: true }).forEach(a => a.cancel());
  };
}
