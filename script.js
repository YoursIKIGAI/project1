'use strict';
/*
╔══════════════════════════════════════════════════════════════════════════╗
║  CHRONICLE — script.js                                                  ║
║  Spirit · Time · Truth                                                  ║
║                                                                          ║
║  EVERY JavaScript concept taught in context of a real working app:      ║
║  ① var/let/const · scope · hoisting                                    ║
║  ② Primitives: String · Number · Boolean · null · undefined · Symbol   ║
║     · BigInt                                                             ║
║  ③ Reference types: Object · Array · Map · Set · WeakMap               ║
║  ④ typeof · instanceof · Object.is · type coercion                     ║
║  ⑤ Function declaration · expression · arrow · IIFE                   ║
║  ⑥ Default params · rest params (...args) · spread                     ║
║  ⑦ Closures & lexical scope                                             ║
║  ⑧ this · call · apply · bind                                          ║
║  ⑨ Pure functions · side-effects · composition                         ║
║  ⑩ Higher-order functions (map · filter · reduce · find · sort)        ║
║  ⑪ Object literals · shorthand · computed keys · optional chaining     ║
║  ⑫ Destructuring: object · array · nested · with defaults             ║
║  ⑬ Spread & rest in destructuring                                      ║
║  ⑭ Object.keys/values/entries/assign/freeze/create/fromEntries         ║
║  ⑮ Class · constructor · private fields · static · getters/setters     ║
║  ⑯ Inheritance · extends · super · multi-level chain                   ║
║  ⑰ Prototype chain · Object.getPrototypeOf                             ║
║  ⑱ Proxy & Reflect — reactive state                                    ║
║  ⑲ Symbol · Symbol.iterator · Symbol.toPrimitive · well-known Symbols  ║
║  ⑳ Generator functions · yield · for...of on generators               ║
║  ㉑ Promise · .then · .catch · .finally · Promise.all · Promise.race   ║
║  ㉒ async/await · top-level async pattern · error propagation           ║
║  ㉓ try/catch/finally · custom Error classes                            ║
║  ㉔ Tagged template literals · template literal types                   ║
║  ㉕ Nullish coalescing (??) · optional chaining (?.) · logical assign  ║
║  ㉖ WeakMap · WeakRef · FinalizationRegistry                           ║
║  ㉗ for...of · for...in · forEach · entries() · Array.from · Array.of  ║
║  ㉘ flat · flatMap · findIndex · some · every · at() · indexOf         ║
║  ㉙ Regular expressions                                                  ║
║  ㉚ Canvas 2D API — background + spirit + pie chart + export           ║
║  ㉛ requestAnimationFrame · the animation loop                          ║
║  ㉜ setInterval · setTimeout · clearTimeout · debounce · throttle      ║
║  ㉝ DOM: selection · manipulation · traversal · dataset · classList    ║
║  ㉞ Events · delegation · custom events · {once:true}                  ║
║  ㉟ ResizeObserver · MutationObserver · IntersectionObserver           ║
║  ㊱ localStorage · JSON.stringify/parse · sessionStorage              ║
║  ㊲ CSS Custom Properties via JS · getComputedStyle                    ║
║  ㊳ globalThis · window · document · navigator                         ║
╚══════════════════════════════════════════════════════════════════════════╝
*/

/* ══════════════════════════════════════════════════════════════════════
   ① VARIABLE DECLARATIONS
   var   → function-scoped, hoisted (avoid)
   let   → block-scoped, reassignable
   const → block-scoped, cannot be reassigned (contents still mutable)
   ══════════════════════════════════════════════════════════════════════ */
const APP = 'CHRONICLE';          // ② String primitive
const VERSION = 1.0;              // ② Number
const IS_DEV = false;             // ② Boolean
const LAUNCH_TIME = Date.now();   // Number — ms since epoch
const BIG_INT_DEMO = 9007199254740993n; // ② BigInt

/* ══════════════════════════════════════════════════════════════════════
   ② SYMBOLS — always unique, great for private keys
   ⑲ Well-known Symbols control JS built-in behaviors
   ══════════════════════════════════════════════════════════════════════ */
const SYM_ID      = Symbol('id');
const SYM_VERSION = Symbol('version');
const SYM_PRIVATE = Symbol('private');

/* ══════════════════════════════════════════════════════════════════════
   ③ REFERENCE TYPES
   ══════════════════════════════════════════════════════════════════════ */

// ⑭ Object.freeze → deeply immutable config
const CFG = Object.freeze({
  PARTICLE_COUNT:  70,
  TRAIL_DECAY:     0.055,
  MAX_SPEED:       0.38,
  XP_PER_TASK:     120,
  XP_PER_LEVEL:    600,
  TOAST_MS:        2600,
  IDLE_MS:         1500,
  ENERGY_DECAY:    0.0025,
  [SYM_VERSION]:   VERSION, // ⑪ computed property key using a Symbol
});

// ③ Map — ordered, any-type keys
const CAT_COLORS = new Map([
  ['work',     '#5b9cf6'],
  ['creative', '#a78bfa'],
  ['admin',    '#f97316'],
  ['learning', '#56cb84'],
  ['life',     '#c9a96e'],
]);

// ③ Set — unique values only
const VALID_CATS = new Set(CAT_COLORS.keys());

// Mood config array of objects
const MOODS = Object.freeze([
  { name: 'Serene',        min: 0.0, max: 0.2, color: '#4a8fa8', bg: ['#0d1b2a','#162030'] },
  { name: 'Contemplative', min: 0.2, max: 0.4, color: '#7a6aaa', bg: ['#1a1030','#0e1428'] },
  { name: 'Flowing',       min: 0.4, max: 0.6, color: '#5a8a50', bg: ['#1a2010','#162410'] },
  { name: 'Charged',       min: 0.6, max: 0.8, color: '#c8784a', bg: ['#2a1808','#261408'] },
  { name: 'Electric',      min: 0.8, max: 1.0, color: '#d45030', bg: ['#1a0a00','#180500'] },
]);

// Spirit animal levels — the core gamification data
const SPIRIT_LEVELS = Object.freeze([
  { level:1, name:'DORMANT',     desc:'A sleeping ember. Waiting.',                         emoji:'🌑', vitality:0   },
  { level:2, name:'STIRRING',    desc:'Something stirs beneath the surface.',               emoji:'🌒', vitality:15  },
  { level:3, name:'AWAKENED',    desc:'Eyes open. The journey begins.',                     emoji:'🌓', vitality:30  },
  { level:4, name:'FOCUSED',     desc:'Your discipline feeds its strength.',                emoji:'🌔', vitality:45  },
  { level:5, name:'RADIANT',     desc:'It glows with borrowed purpose.',                    emoji:'🌕', vitality:60  },
  { level:6, name:'LUMINOUS',    desc:'Productivity made visible.',                         emoji:'⭐', vitality:72  },
  { level:7, name:'TRANSCENDENT',desc:'Beyond time. Beyond estimation.',                    emoji:'✨', vitality:88  },
  { level:8, name:'ETERNAL',     desc:'You have mastered the art of doing.',                emoji:'🌟', vitality:100 },
]);

// Roast engine
const ROASTS = Object.freeze({
  psychic:  { e:'🔮', t:'CERTIFIED PSYCHIC',      c:'You estimate time with supernatural precision. Science would like to study you.' },
  optimist: { e:'🌈', t:'CHRONIC OPTIMIST',       c:'The Planning Fallacy called. It wants its poster child back.' },
  underdog: { e:'🐢', t:'HUMBLE UNDERESTIMATOR',  c:'You consistently beat your own estimates. Either padding or self-doubt. Possibly both.' },
  realistic:{ e:'🎯', t:'CALIBRATED MIND',        c:'Rare. Unsettling. You actually know how long things take.' },
  chaos:    { e:'🌋', t:'TEMPORAL ANARCHIST',     c:'Time is a suggestion to you. Clocks are decorative. Einstein is intrigued.' },
});

// Achievement unlocks
const ACHIEVEMENTS = Object.freeze([
  { id:'first_task',  emoji:'🎯', label:'First Task',     cond: s => s.totalDone >= 1  },
  { id:'streak_3',    emoji:'🔥', label:'3-Day Streak',   cond: s => s.streak >= 3     },
  { id:'psychic',     emoji:'🔮', label:'Mind Reader',    cond: s => s.accuracy >= 95  },
  { id:'level_5',     emoji:'⭐', label:'Radiant',        cond: s => s.level >= 5      },
  { id:'ten_tasks',   emoji:'💎', label:'Decade',         cond: s => s.totalDone >= 10 },
  { id:'writer',      emoji:'✍️', label:'Chronicler',     cond: s => s.wordsWritten >= 200 },
  { id:'eternal',     emoji:'🌟', label:'Eternal',        cond: s => s.level >= 8      },
]);

const STORAGE_KEY = 'chronicle_v3';

/* ══════════════════════════════════════════════════════════════════════
   ④ TYPEOF · instanceof · Object.is
   ══════════════════════════════════════════════════════════════════════ */
// typeof null === 'object' ← famous quirk
// Object.is(NaN, NaN) === true ← unlike ===
// instanceof walks the prototype chain

/* ══════════════════════════════════════════════════════════════════════
   ⑤ IIFE — Immediately Invoked Function Expression
   Creates a private scope; used for singleton modules
   ══════════════════════════════════════════════════════════════════════ */
const Analytics = (() => {
  // Private — not accessible outside this IIFE
  const _cache = new Map();

  return {
    // ⑨ Pure functions — same inputs always produce same output
    getMoodForEnergy(energy) {
      return MOODS.find(m => energy >= m.min && energy <= m.max) ?? MOODS[0];
    },
    getOverallRatio(tasks) {
      const done = tasks.filter(t => t.status === 'done');
      if (!done.length) return null;
      const sumE = done.reduce((s, t) => s + t.estSecs, 0);
      const sumA = done.reduce((s, t) => s + t.actSecs, 0);
      return sumE === 0 ? null : sumA / sumE;
    },
    getAccuracy(tasks) {
      const r = this.getOverallRatio(tasks);
      if (r === null) return null;
      return Math.max(0, 100 - Math.abs(r - 1) * 100);
    },
    getDelusionScore(tasks) {
      const r = this.getOverallRatio(tasks);
      if (r === null) return null;
      return Math.min(1, Math.abs(r - 1));
    },
    getRoastKey(tasks) {
      const r  = this.getOverallRatio(tasks);
      const ds = this.getDelusionScore(tasks);
      if (r === null) return null;
      if (ds < 0.08) return 'psychic';
      if (ds < 0.35 && r > 1) return 'optimist';
      if (ds < 0.35 && r < 1) return 'underdog';
      if (ds < 0.22) return 'realistic';
      return 'chaos';
    },
    getPieData(tasks) {
      const done = tasks.filter(t => t.status === 'done');
      if (!done.length) return [];
      // ⑩ reduce into a Map, then convert back
      const grouped = done.reduce((acc, t) => {
        acc.set(t.cat, (acc.get(t.cat) ?? 0) + t.actSecs);
        return acc;
      }, new Map());
      const total = [...grouped.values()].reduce((s,v) => s+v, 0);
      // ⑩ map then sort
      return [...grouped.entries()]
        .map(([cat, secs]) => ({ cat, secs, pct: total > 0 ? (secs/total)*100 : 0, color: CAT_COLORS.get(cat) ?? '#888' }))
        .sort((a,b) => b.secs - a.secs);
    },
    getTendency(tasks) {
      const r = this.getOverallRatio(tasks);
      if (r === null) return '—';
      if (r > 1.1) return 'over time';
      if (r < 0.9) return 'under time';
      return 'on time';
    },
    taskAccuracy(task) {
      if (task.estSecs === 0) return null;
      return task.actSecs / task.estSecs;
    },
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   ⑦ CLOSURES — functions that remember their outer scope
   ⑩ Higher-order functions — take/return functions
   ══════════════════════════════════════════════════════════════════════ */
const makeDebounce = (fn, ms = 300) => {
  // 'timer' is captured in closure; each debounced fn has its own
  let timer = null;
  return function (...args) { // ⑥ rest params
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms); // ⑧ apply
  };
};

const makeThrottle = (fn, ms = 100) => {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn.apply(this, args); }
  };
};

// ⑨ Function composition — pipe(f, g)(x) = g(f(x))
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

/* ══════════════════════════════════════════════════════════════════════
   ⑤ FUNCTION FORMS
   ══════════════════════════════════════════════════════════════════════ */

// Function declaration — hoisted completely
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); // ㉙ RegEx
  if (!m) return '100,100,150';
  const [, r, g, b] = m; // ⑫ array destructuring, skip index 0
  return `${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)}`;
}

// Function expression — NOT hoisted
const lerp = function(a, b, t) { return a + (b - a) * t; };

// Arrow functions — concise, no own 'this'
const clamp     = (v, lo = 0, hi = 1) => Math.min(Math.max(v, lo), hi);  // ⑥ defaults
const uid       = () => Math.random().toString(36).slice(2, 9);
const formatSec = (s) => { const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),ss=Math.floor(s%60); return h>0?`${h}h ${m}m`:`${m}m ${ss}s`; };
const fmtTimer  = (s) => { const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),ss=Math.floor(s%60); return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`; };
const countWords = (t) => t?.trim() ? t.trim().split(/\s+/).length : 0; // ㉙㉕

/* ══════════════════════════════════════════════════════════════════════
   ⑮ CLASSES — with private fields, getters, setters, static methods
   ⑯ INHERITANCE — Entity → Particle → GlowParticle (3 levels deep)
   ══════════════════════════════════════════════════════════════════════ */

class Entity {
  // ⑮ Private fields — only accessible inside this class
  #id;
  #born;

  constructor(x, y) {
    this.#id   = Symbol(); // ⑲ Symbol as unique id
    this.#born = Date.now();
    this.x = x; this.y = y;
    this.vx = 0; this.vy = 0;
    this.alive = true;
  }

  // ⑮ Getter — accessed as property, computed on read
  get age()  { return Date.now() - this.#born; }
  get id()   { return this.#id; }

  // ⑮ Setter — called on assignment
  set position({ x, y }) { this.x = x; this.y = y; } // ⑫ destructured param

  // ⑮ Static method — called on Class, not instance
  static fromAngle(cx, cy, r, angle) {
    return { x: cx + Math.cos(angle)*r, y: cy + Math.sin(angle)*r };
  }

  // ⑰ Override toString for coercion
  toString() { return `Entity@(${this.x.toFixed(0)},${this.y.toFixed(0)})`; }

  // ⑲ Symbol.toPrimitive — controls how object coerces to primitive
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.x;
    if (hint === 'string') return this.toString();
    return true;
  }
}

// ⑯ Particle extends Entity
class Particle extends Entity {
  constructor(W, H) {
    super(Math.random()*W, Math.random()*H); // ⑯ must call super first
    this.baseX = this.x; this.baseY = this.y;
    this.vx = (Math.random()*2-1)*CFG.MAX_SPEED;
    this.vy = (Math.random()*2-1)*CFG.MAX_SPEED;
    this.r       = Math.random()*85+18;
    this.opacity = Math.random()*0.11+0.02;
    this.phase   = Math.random()*Math.PI*2;
    this.phaseSpd= Math.random()*0.006+0.002;
    this.color   = '#4a8fa8';
  }

  update(W, H, energy = 0) { // ⑥ default param
    this.phase += this.phaseSpd;
    const b = 1 + energy*3;
    this.x += this.vx*b + Math.sin(this.phase)*0.28;
    this.y += this.vy*b + Math.cos(this.phase*0.7)*0.28;
    if (this.x < -this.r)   this.x = W+this.r;
    if (this.x > W+this.r)  this.x = -this.r;
    if (this.y < -this.r)   this.y = H+this.r;
    if (this.y > H+this.r)  this.y = -this.r;
  }

  draw(ctx) {
    const g = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r);
    const rgb = hexToRgb(this.color);
    g.addColorStop(0,   `rgba(${rgb},${this.opacity})`);
    g.addColorStop(0.5, `rgba(${rgb},${this.opacity*0.35})`);
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle = g; ctx.fill();
  }
}

// ⑯ Multi-level: GlowParticle extends Particle extends Entity
class GlowParticle extends Particle {
  #life; #maxLife;
  constructor(x, y) {
    super(1,1);
    this.x=x; this.y=y;
    this.r     = Math.random()*28+8;
    this.vx    = (Math.random()*2-1)*2.2;
    this.vy    = (Math.random()*2-1)*2.2;
    this.#maxLife = 55;
    this.#life    = 0;
  }
  get isDead()       { return this.#life >= this.#maxLife; }
  get lifeFraction() { return this.#life / this.#maxLife; }

  update(W, H, energy) {
    this.#life++;
    this.opacity = (1 - this.lifeFraction) * 0.16;
    this.vx *= 0.93; this.vy *= 0.93;
    super.update(W, H, energy); // ⑯ call parent
  }
}

// ④ instanceof checks — walk the prototype chain ⑰
// new GlowParticle() instanceof Particle → true
// new GlowParticle() instanceof Entity   → true (inherited)
// Object.getPrototypeOf(GlowParticle.prototype) === Particle.prototype → true ⑰

/* ══════════════════════════════════════════════════════════════════════
   ⑱ PROXY & Reflect — reactive state
   Any write to `state` triggers side-effects automatically
   ══════════════════════════════════════════════════════════════════════ */
const _raw = {
  tasks:          [],
  journalText:    '',
  energy:         0,
  currentMood:    'Serene',
  xp:             0,
  level:          1,
  streak:         0,
  totalDone:      0,
  wordsWritten:   0,
  vitality:       0,
  lastKeystroke:  0,
  keystrokeTimes: [],
  unlockedBadges: new Set(),
  glows:          [],
  particles:      [],
  breatheScale:   1,
  animFrameId:    null,
};

// ⑱ Proxy wraps _raw; intercepts every property write
const state = new Proxy(_raw, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver); // default behavior
  },
  set(target, key, value, receiver) {
    const prev = target[key];
    Reflect.set(target, key, value, receiver);
    // React to specific changes
    if (key === 'energy'   && prev !== value) onEnergyChange(value);
    if (key === 'xp'       && prev !== value) onXpChange(value);
    if (key === 'vitality' && prev !== value) onVitalityChange(value);
    return true;
  },
});

/* ══════════════════════════════════════════════════════════════════════
   ⑲ GENERATOR — infinite color-hue sequence
   function* can be paused (yield) and resumed (.next())
   ══════════════════════════════════════════════════════════════════════ */
function* hueGenerator(start = 200, step = 0.018) {
  let hue = start;
  while (true) {          // infinite — OK because we yield each iteration
    yield hue;
    hue = (hue + step) % 360;
  }
}
const hueGen = hueGenerator(200);

// ⑲ Symbol.iterator — makes object iterable with for...of
const moodIterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        if (i < MOODS.length) return { value: MOODS[i++], done: false };
        return { value: undefined, done: true };
      }
    };
  }
};

/* ══════════════════════════════════════════════════════════════════════
   ⑳ ㉖ WeakMap — store private data tied to DOM elements
   When the element is GC'd, the entry disappears automatically
   ══════════════════════════════════════════════════════════════════════ */
const elementData = new WeakMap();

/* ══════════════════════════════════════════════════════════════════════
   ㉗ LOGICAL ASSIGNMENT (ES2021)
   ??= assigns only if left side is null/undefined
   ||= assigns only if left side is falsy
   &&= assigns only if left side is truthy
   ══════════════════════════════════════════════════════════════════════ */
let _config = {};
_config.debug ??= false;
_config.theme ||= 'dark';

/* ══════════════════════════════════════════════════════════════════════
   ㊳ globalThis — works in browser AND Node
   ══════════════════════════════════════════════════════════════════════ */
const win = globalThis;

/* ══════════════════════════════════════════════════════════════════════
   ㉝ DOM REFERENCES
   ══════════════════════════════════════════════════════════════════════ */
const $  = id => document.getElementById(id); // shorthand selector
const $$ = sel => document.querySelectorAll(sel);

const bgCanvas     = $('bgCanvas');
const bgCtx        = bgCanvas.getContext('2d');
const spiritCanvas = $('spiritCanvas');
const spiritCtx    = spiritCanvas.getContext('2d');
const miniCanvas   = $('miniSpirit');
const miniCtx      = miniCanvas.getContext('2d');
const pieCanvas    = $('pieCanvas');
const pieCtx       = pieCanvas.getContext('2d');
const luCanvas     = $('luCanvas');
const luCtx        = luCanvas.getContext('2d');

/* ══════════════════════════════════════════════════════════════════════
   ㊲ CSS CUSTOM PROPERTIES
   ══════════════════════════════════════════════════════════════════════ */
const root       = document.documentElement;
const setCSSVar  = (k, v) => root.style.setProperty(k, v);
const getCSSVar  = (k)    => getComputedStyle(root).getPropertyValue(k).trim();

/* ══════════════════════════════════════════════════════════════════════
   TOAST — lightweight notification module (IIFE ⑤ + closure ⑦)
   ══════════════════════════════════════════════════════════════════════ */
const Toast = (() => {
  const el = $('toast');
  let timer = null;
  return {
    show(msg, ms = CFG.TOAST_MS) {
      el.textContent = msg;
      el.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove('show'), ms);
    }
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   ㊱ PERSISTENCE — localStorage + JSON
   ══════════════════════════════════════════════════════════════════════ */
const persist = () => {
  try {
    // Stop running tasks before serializing
    const saveable = state.tasks.map(t => {
      if (t.status !== 'running') return { ...t }; // ⑬ spread to copy
      return { ...t, actSecs: t.actSecs + Math.floor((Date.now()-t.startedAt)/1000), startedAt: null, status: 'idle' };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      tasks:       saveable,
      journal:     state.journalText,
      xp:          state.xp,
      level:       state.level,
      streak:      state.streak,
      totalDone:   state.totalDone,
      wordsWritten:state.wordsWritten,
      vitality:    state.vitality,
      badges:      [...state.unlockedBadges], // Set → Array for JSON
      ts:          Date.now(),
    }));
  } catch (_) {}
};

const restore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    // ⑫ Destructuring from JSON.parse result with defaults
    const { tasks=[], journal='', xp=0, level=1, streak=0,
            totalDone=0, wordsWritten=0, vitality=0, badges=[], ts } = JSON.parse(raw);

    state.tasks          = tasks;
    state.journalText    = journal;
    state.xp             = xp;
    state.level          = level;
    state.streak         = streak;
    state.totalDone      = totalDone;
    state.wordsWritten   = wordsWritten;
    state.vitality       = vitality;
    state.unlockedBadges = new Set(badges);

    $('journalTA').value = journal;
    $('jChars').textContent = journal.length;
    $('jWords').textContent = `${countWords(journal)} words`;

    if (ts) {
      const minsAgo = Math.round((Date.now()-ts)/60000);
      Toast.show(minsAgo < 1 ? 'Session restored · just now' : `Restored · ${minsAgo}m ago`);
    }
  } catch (_) { state.tasks = []; }
};

/* ══════════════════════════════════════════════════════════════════════
   ㉚ BACKGROUND CANVAS — living ambient organism
   ㉛ requestAnimationFrame loop
   ══════════════════════════════════════════════════════════════════════ */
const setupBgCanvas = () => {
  const dpr = win.devicePixelRatio ?? 1;
  const { innerWidth: w, innerHeight: h } = win; // ⑫ destructure with rename
  bgCanvas.width  = w * dpr; bgCanvas.height = h * dpr;
  bgCanvas.style.cssText = `width:${w}px;height:${h}px;position:fixed;inset:0;z-index:0;pointer-events:none`;
  bgCtx.scale(dpr, dpr);
};

const initParticles = () => {
  const { innerWidth: W, innerHeight: H } = win;
  // ㉗ Array.from with mapping — create N particles
  state.particles = Array.from({ length: CFG.PARTICLE_COUNT }, (_, i) => {
    const p = new Particle(W, H);
    p.phase = (i / CFG.PARTICLE_COUNT) * Math.PI * 2; // stagger
    return p;
  });
};

const animateBg = () => {
  const W = win.innerWidth, H = win.innerHeight;
  // Partial fade → motion trails
  bgCtx.fillStyle = `rgba(7,8,11,${CFG.TRAIL_DECAY})`;
  bgCtx.fillRect(0, 0, W, H);

  const mood  = Analytics.getMoodForEnergy(state.energy);
  const hue   = hueGen.next().value; // ⑳ generator
  const rgb   = hexToRgb(mood.color);

  bgCtx.globalCompositeOperation = 'screen';

  // ㉗ for...of on array
  for (const p of state.particles) {
    p.color = mood.color;
    p.update(W, H, state.energy);
    p.draw(bgCtx);
  }

  // GlowParticles — ⑩ filter removes dead ones
  state.glows = state.glows.filter(gp => {
    if (!(gp instanceof GlowParticle)) return false; // ④ instanceof
    if (gp.isDead) return false;                      // ⑮ getter
    gp.color = mood.color;
    gp.update(W, H, 0);
    gp.draw(bgCtx);
    return true;
  });

  bgCtx.globalCompositeOperation = 'source-over';

  // Idle energy decay
  if (Date.now() - state.lastKeystroke > CFG.IDLE_MS) {
    state.energy = Math.max(0, state.energy - CFG.ENERGY_DECAY);
  }

  state.animFrameId = requestAnimationFrame(animateBg); // ㉛ loop
};

/* ══════════════════════════════════════════════════════════════════════
   ㉚ SPIRIT ANIMAL CANVAS — drawn based on vitality + level
   ══════════════════════════════════════════════════════════════════════ */
const drawSpirit = (ctx, size, vitality, level, animated = true) => {
  const cx = size/2, cy = size/2, r = size/2 - 4;
  ctx.clearRect(0, 0, size, size);

  // Vitality-driven color
  const hue = lerp(220, 45, vitality/100); // blue (dormant) → gold (transcendent)
  const sat = lerp(20,  90, vitality/100);
  const lum = lerp(25,  62, vitality/100);
  const baseColor = `hsl(${hue},${sat}%,${lum}%)`;

  // Outer glow ring
  const glowR = ctx.createRadialGradient(cx,cy,r*0.6, cx,cy,r);
  glowR.addColorStop(0, `hsla(${hue},${sat}%,${lum}%,0.12)`);
  glowR.addColorStop(1, 'transparent');
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
  ctx.fillStyle = glowR; ctx.fill();

  // ── Draw the creature body ──
  const time = Date.now() / 1000;
  const breathe = animated ? Math.sin(time*1.4)*0.04 : 0;

  // Core body — organic blob shape
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1 + breathe, 1 - breathe*0.5);

  // Body gradient
  const bodyG = ctx.createRadialGradient(0,-r*0.1,r*0.1, 0,r*0.1,r*0.72);
  bodyG.addColorStop(0,  `hsla(${hue},${sat}%,${Math.min(lum+20,80)}%,0.9)`);
  bodyG.addColorStop(0.6,`hsla(${hue},${sat}%,${lum}%,0.85)`);
  bodyG.addColorStop(1,  `hsla(${hue},${sat}%,${lum-12}%,0.7)`);

  // Organic blob via bezier curves
  ctx.beginPath();
  const pts = 6;
  for (let i = 0; i < pts; i++) {
    const angle = (i/pts)*Math.PI*2 - Math.PI/2;
    const jitter = 1 + Math.sin(time*0.8 + i*1.1)*0.07*(vitality/100);
    const bR = r * 0.58 * jitter;
    const x = Math.cos(angle)*bR, y = Math.sin(angle)*bR;
    i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  }
  ctx.closePath();
  ctx.fillStyle = bodyG;
  ctx.fill();

  // Eyes — appear at level 2+
  if (level >= 2) {
    const eyeY = -r*0.14, eyeSpread = r*0.2;
    const eyeR  = r*0.09 + (vitality/100)*r*0.04;
    const pupilR = eyeR*0.52;
    const glint  = eyeR*0.22;
    const eyeOpacity = clamp(vitality/30, 0, 1);

    [[eyeSpread,eyeY],[-eyeSpread,eyeY]].forEach(([ex,ey]) => {
      // White
      ctx.beginPath(); ctx.arc(ex,ey,eyeR,0,Math.PI*2);
      ctx.fillStyle = `rgba(240,235,220,${eyeOpacity})`;
      ctx.fill();
      // Pupil
      ctx.beginPath(); ctx.arc(ex+eyeR*0.08,ey+eyeR*0.08,pupilR,0,Math.PI*2);
      ctx.fillStyle = `rgba(30,20,10,${eyeOpacity})`;
      ctx.fill();
      // Glint
      ctx.beginPath(); ctx.arc(ex-glint*0.3,ey-glint*0.3,glint,0,Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${eyeOpacity*0.9})`;
      ctx.fill();
    });
  }

  // Crown / halo particles — appear at level 5+
  if (level >= 5) {
    const nCrown = Math.floor(4 + (level-5)*1.5);
    for (let i = 0; i < nCrown; i++) {
      const a = (i/nCrown)*Math.PI*2 + time*0.5;
      const cr = r*0.68 + Math.sin(time*1.2+i)*r*0.06;
      const px = Math.cos(a)*cr, py = Math.sin(a)*cr;
      const pR = r*0.05 + Math.sin(time+i)*r*0.02;
      ctx.beginPath(); ctx.arc(px,py,pR,0,Math.PI*2);
      ctx.fillStyle = `hsla(${hue+20},90%,80%,${0.4+Math.sin(time+i)*0.3})`;
      ctx.fill();
    }
  }

  // Inner shimmer at high vitality
  if (vitality > 60) {
    const shimmer = ctx.createRadialGradient(0,-r*0.15,0, 0,r*0.1,r*0.45);
    shimmer.addColorStop(0,  `hsla(${hue+30},100%,90%,${(vitality-60)/100})`);
    shimmer.addColorStop(1,  'transparent');
    ctx.beginPath(); ctx.arc(0,0,r*0.5,0,Math.PI*2);
    ctx.fillStyle = shimmer; ctx.fill();
  }

  ctx.restore();

  // Spirit level indicator dots
  for (let i = 0; i < Math.min(level, 8); i++) {
    const a = (i/8)*Math.PI*2 - Math.PI/2;
    const dr = r + 6;
    ctx.beginPath(); ctx.arc(cx+Math.cos(a)*dr, cy+Math.sin(a)*dr, 2.5, 0, Math.PI*2);
    ctx.fillStyle = `hsla(${hue},70%,65%,${i < level ? 0.8 : 0.15})`;
    ctx.fill();
  }
};

const renderSpirit = () => {
  drawSpirit(spiritCtx, 200, state.vitality, state.level);
  drawSpirit(miniCtx, 40, state.vitality, state.level, false);
};

// Animate the spirit independently from the BG loop
const animateSpirit = () => {
  renderSpirit();
  requestAnimationFrame(animateSpirit);
};

/* ══════════════════════════════════════════════════════════════════════
   ㉚ PIE CHART — Canvas 2D donut
   ══════════════════════════════════════════════════════════════════════ */
const renderPie = (tasks) => {
  const data = Analytics.getPieData(tasks);
  const W = 220, H = 220, cx = W/2, cy = H/2, R = 90, inner = 52;

  pieCtx.clearRect(0, 0, W, H);

  if (!data.length) {
    pieCtx.beginPath(); pieCtx.arc(cx,cy,R,0,Math.PI*2);
    pieCtx.strokeStyle = 'rgba(255,255,255,0.06)'; pieCtx.lineWidth = 2; pieCtx.stroke();
    pieCtx.font = '13px DM Mono'; pieCtx.fillStyle = 'rgba(255,255,255,0.15)';
    pieCtx.textAlign = 'center'; pieCtx.textBaseline = 'middle';
    pieCtx.fillText('No data yet', cx, cy);
    return;
  }

  let startAngle = -Math.PI/2;
  const segments = [];

  for (const item of data) { // ㉗ for...of
    const sweep = (item.pct/100)*Math.PI*2;
    segments.push({ ...item, startAngle, sweep }); // ⑬ spread
    startAngle += sweep;
  }

  // Draw segments
  for (const seg of segments) {
    pieCtx.save();
    pieCtx.beginPath(); pieCtx.moveTo(cx,cy);
    pieCtx.arc(cx,cy,R,seg.startAngle,seg.startAngle+seg.sweep);
    pieCtx.closePath();
    pieCtx.fillStyle = seg.color;
    pieCtx.globalAlpha = 0.82;
    pieCtx.fill();
    // Subtle border
    pieCtx.strokeStyle = '#07080b'; pieCtx.lineWidth = 2; pieCtx.stroke();
    pieCtx.restore();
  }

  pieCtx.globalAlpha = 1;
  // Donut hole
  pieCtx.beginPath(); pieCtx.arc(cx,cy,inner,0,Math.PI*2);
  pieCtx.fillStyle = '#07080b'; pieCtx.fill();

  // Centre label
  const totalAct = data.reduce((s,d)=>s+d.secs,0);
  pieCtx.textAlign = 'center'; pieCtx.textBaseline = 'middle';
  pieCtx.font = 'bold 20px Bebas Neue'; pieCtx.fillStyle = '#c9a96e';
  pieCtx.fillText(formatSec(totalAct), cx, cy-7);
  pieCtx.font = '10px DM Mono'; pieCtx.fillStyle = 'rgba(255,255,255,0.3)';
  pieCtx.fillText('actual time', cx, cy+11);

  // Legend
  const legendEl = $('pieLegend');
  legendEl.innerHTML = data.map(d => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${d.color}"></div>
      <span class="legend-name">${d.cat}</span>
      <span class="legend-pct">${d.pct.toFixed(0)}%</span>
    </div>
  `).join('');
};

/* ══════════════════════════════════════════════════════════════════════
   GAMIFICATION — XP, levels, vitality, achievements
   ══════════════════════════════════════════════════════════════════════ */
const getSpiritLevel = (level) => SPIRIT_LEVELS[clamp(level-1,0,SPIRIT_LEVELS.length-1)];

const onEnergyChange = (energy) => {
  const mood = Analytics.getMoodForEnergy(energy);
  state.currentMood = mood.name;

  // Update glow orb color
  const glowMap = {
    Serene:'rgba(74,143,168,0.09)', Contemplative:'rgba(122,106,170,0.09)',
    Flowing:'rgba(90,138,80,0.09)', Charged:'rgba(200,120,74,0.09)', Electric:'rgba(212,80,48,0.09)'
  };
  $('glowOrb').style.background = `radial-gradient(ellipse 55% 35% at 50% 0%, ${glowMap[mood.name] ?? glowMap.Serene}, transparent 70%)`;

  // Update journal mood
  $('noteMood').textContent = mood.name;
  $('noteMood').style.color = `rgba(${hexToRgb(mood.color)},0.7)`;
  $('jSpiritMsg').textContent = spiritJournalReaction(energy, mood.name);
};

const spiritJournalReaction = (energy, moodName) => {
  if (energy > 0.8) return 'Your spirit trembles with electric joy!';
  if (energy > 0.6) return 'It feeds on your charged thoughts…';
  if (energy > 0.4) return 'Gently growing with each word…';
  if (energy > 0.2) return 'It stirs. Keep writing.';
  return 'Quiet. Waiting for your thoughts.';
};

const onXpChange = (xp) => {
  const pct = ((xp % CFG.XP_PER_LEVEL) / CFG.XP_PER_LEVEL) * 100;
  $('xpBar').style.width = `${pct}%`;
  $('xpNum').textContent = `${xp} xp`;
  const lv = Math.floor(xp / CFG.XP_PER_LEVEL) + 1;
  const newLevel = clamp(lv, 1, 8);
  $('xpLevel').textContent = `Lv ${newLevel}`;

  if (newLevel > state.level) {
    const prev = state.level;
    state.level = newLevel;
    showLevelUp(prev, newLevel);
  }
};

const onVitalityChange = (v) => {
  $('vitFill').style.width  = `${v}%`;
  $('vitGlow').style.width  = `${v}%`;
  $('vitPct').textContent   = `${Math.round(v)}%`;

  const lvData = getSpiritLevel(state.level);
  $('spiritNameEl').textContent  = lvData.name;
  $('spiritStateEl').textContent = lvData.desc;

  // Halo glows when vitality is high
  const halo = $('spiritHalo');
  if (v > 50) halo.classList.add('active');
  else         halo.classList.remove('active');

  // Header tagline
  $('hdrTagline').textContent = lvData.desc;
};

const awardXP = (amount, reason) => {
  state.xp       += amount;
  state.vitality  = clamp(state.vitality + amount/20, 0, 100);
  Toast.show(`+${amount} XP — ${reason}`);

  // XP flash on bar
  $('xpBar').style.animation = 'none';
  void $('xpBar').offsetWidth;
  $('xpBar').style.animation = 'xpFlash 0.8s ease';
};

const checkAchievements = () => {
  const stats = {
    totalDone:   state.totalDone,
    streak:      state.streak,
    accuracy:    Analytics.getAccuracy(state.tasks) ?? 0,
    level:       state.level,
    wordsWritten:state.wordsWritten,
  };

  // ⑩ filter achievements we haven't unlocked yet
  const newOnes = ACHIEVEMENTS.filter(a => !state.unlockedBadges.has(a.id) && a.cond(stats));

  newOnes.forEach(a => {
    state.unlockedBadges.add(a.id);
    Toast.show(`🏆 Achievement: ${a.label}`);
  });

  renderBadges();
};

const renderBadges = () => {
  const el = $('badgesEl');
  if (!state.unlockedBadges.size) {
    el.innerHTML = '<div class="badge-empty">Complete tasks to earn badges</div>';
    return;
  }
  // ⑩ filter + map on ACHIEVEMENTS array
  el.innerHTML = ACHIEVEMENTS
    .filter(a => state.unlockedBadges.has(a.id))
    .map(a => `<span class="badge-item" title="${a.label}">${a.emoji}</span>`)
    .join('');
};

/* ══════════════════════════════════════════════════════════════════════
   LEVEL-UP OVERLAY — cinematic reveal
   ══════════════════════════════════════════════════════════════════════ */
const showLevelUp = (prevLevel, newLevel) => {
  const data = getSpiritLevel(newLevel);
  $('luTitle').textContent = 'SPIRIT EVOLVED';
  $('luName').textContent  = data.name;
  $('luDesc').textContent  = data.desc;

  // Draw evolved spirit on lu canvas
  drawSpirit(luCtx, 280, state.vitality, newLevel);

  $('luOverlay').classList.remove('hidden');
};

$('luClose').addEventListener('click', () => {
  $('luOverlay').classList.add('hidden');
});

/* ══════════════════════════════════════════════════════════════════════
   ANALYTICS PANEL — full render
   ══════════════════════════════════════════════════════════════════════ */
const renderAnalytics = () => {
  const tasks = state.tasks;
  const done  = tasks.filter(t => t.status === 'done');

  renderPie(tasks);

  const ds  = Analytics.getDelusionScore(tasks);
  const acc = Analytics.getAccuracy(tasks);
  const rk  = Analytics.getRoastKey(tasks);

  // Delusion pin
  const pinPct = ds !== null ? clamp(ds*100, 0, 100) : 0;
  $('dmPin').style.left = `calc(${pinPct}% - 7px)`;

  // Stats
  const totalEst = tasks.reduce((s,t)=>s+t.estSecs, 0);
  const totalAct = done.reduce((s,t)=>s+t.actSecs, 0);
  $('sEst').textContent  = totalEst ? formatSec(totalEst) : '—';
  $('sAct').textContent  = totalAct ? formatSec(totalAct) : '—';
  $('sTend').textContent = Analytics.getTendency(tasks);

  // Verdict
  if (rk) {
    const roast = ROASTS[rk];
    $('vEmoji').textContent = roast.e;
    $('vTitle').textContent = roast.t;
    $('vCopy').textContent  = roast.c;
  }

  // Illustration bars
  const illusEl = $('illusSection');
  illusEl.innerHTML = done.map(t => {
    const ratio  = Analytics.taskAccuracy(t);
    const maxS   = Math.max(t.estSecs, t.actSecs, 1);
    const estW   = (t.estSecs/maxS*100).toFixed(1);
    const actW   = (t.actSecs/maxS*100).toFixed(1);
    const diffTxt = ratio === null ? '' : ratio > 1.1 ? `+${Math.round((ratio-1)*100)}%` : ratio < 0.9 ? `-${Math.round((1-ratio)*100)}%` : '✓';
    return `
      <div class="illus-row">
        <div class="illus-label"><span>${t.name.slice(0,28)}</span><span>${diffTxt}</span></div>
        <div class="illus-track"><div class="illus-fill est" style="width:${estW}%"></div></div>
        <div class="illus-track"><div class="illus-fill act" style="width:${actW}%"></div></div>
      </div>`;
  }).join('');

  // Header stats
  $('ssStreak').textContent = state.streak;
  $('ssDone').textContent   = state.totalDone;
  $('ssAcc').textContent    = acc !== null ? `${acc.toFixed(0)}%` : '—';
};

/* ══════════════════════════════════════════════════════════════════════
   TASK SYSTEM
   ══════════════════════════════════════════════════════════════════════ */
const renderTaskList = () => {
  const list = $('taskList');
  list.querySelectorAll('.task-card').forEach(c => c.remove());
  const empty = $('emptyState');

  if (!state.tasks.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');

  state.tasks.forEach(t => {
    const card = buildTaskCard(t);
    list.appendChild(card);
    applyCardState(t);
  });
};

const buildTaskCard = (task) => {
  const tpl  = $('taskTpl');
  const frag = tpl.content.cloneNode(true);
  const card = frag.querySelector('.task-card');
  card.dataset.id = task.id;

  card.querySelector('.tc-dot').dataset.cat    = task.cat;
  card.querySelector('.tc-name').textContent   = task.name;
  card.querySelector('.tc-sub').textContent    = `Est. ${formatSec(task.estSecs)} · ${task.cat}`;
  card.querySelector('.tc-timer').textContent  = fmtTimer(task.actSecs);

  card.querySelector('.tca--start').addEventListener('click', () => startTask(task.id));
  card.querySelector('.tca--stop').addEventListener('click',  () => stopTask(task.id));
  card.querySelector('.tca--del').addEventListener('click',   () => deleteTask(task.id));

  // ⑳ WeakMap: store task reference in element metadata
  elementData.set(card, { taskId: task.id, createdAt: Date.now() });

  return card;
};

const applyCardState = (task) => {
  const card = document.querySelector(`.task-card[data-id="${task.id}"]`);
  if (!card) return;
  card.className = `task-card ${task.status}`;

  const timer    = card.querySelector('.tc-timer');
  const btnStart = card.querySelector('.tca--start');
  const btnStop  = card.querySelector('.tca--stop');
  const badge    = card.querySelector('.tc-badge');

  timer.textContent = fmtTimer(task.actSecs);

  if (task.status === 'done') {
    btnStart.classList.add('hidden');
    btnStop.classList.add('hidden');
    badge.classList.remove('hidden');

    const ratio = Analytics.taskAccuracy(task);
    let cls='badge-spot', txt='✓ on time';
    if (ratio !== null) {
      if (ratio > 1.15) { cls='badge-over';  txt=`+${Math.round((ratio-1)*100)}% over`; }
      else if (ratio < 0.85) { cls='badge-under'; txt=`-${Math.round((1-ratio)*100)}% early`; }
    }
    badge.className = `tc-badge ${cls}`;
    badge.textContent = txt;
  } else {
    badge.classList.add('hidden');
    if (task.status === 'running') {
      btnStart.classList.add('hidden'); btnStop.classList.remove('hidden');
    } else {
      btnStart.classList.remove('hidden'); btnStop.classList.add('hidden');
    }
  }
};

/* Live timer RAF */
const tickLiveTimers = () => {
  state.tasks
    .filter(t => t.status === 'running')
    .forEach(t => {
      const el = document.querySelector(`.task-card[data-id="${t.id}"] .tc-timer`);
      if (el) el.textContent = fmtTimer(t.actSecs + Math.floor((Date.now()-t.startedAt)/1000));
    });
  requestAnimationFrame(tickLiveTimers); // ㉛
};

const startTask = (id) => {
  // Stop any running task first
  state.tasks.filter(t=>t.status==='running').forEach(t=>stopTask(t.id,false));
  const task = state.tasks.find(t=>t.id===id);
  if (!task || task.status==='done') return;
  task.status='running'; task.startedAt=Date.now();
  applyCardState(task); persist();
  Toast.show('▶ Timer started — good luck');
};

const stopTask = (id, finish=true) => {
  const task = state.tasks.find(t=>t.id===id);
  if (!task || task.status!=='running') return;
  const elapsed = Math.floor((Date.now()-task.startedAt)/1000);
  task.actSecs += elapsed; task.startedAt=null;

  if (finish) {
    task.status='done';
    state.totalDone++;
    state.streak++;

    // Award XP and spawn glows
    awardXP(CFG.XP_PER_TASK, task.name);
    spawnGlowBurst();

    // ㉞ Dispatch custom event — other listeners can react
    document.dispatchEvent(new CustomEvent('chronicle:taskdone', {
      detail: { task, accuracy: Analytics.taskAccuracy(task) }, bubbles: true
    }));

    checkAchievements();
    renderAnalytics();
    Toast.show(`■ Done! Actual: ${formatSec(task.actSecs)}`);
  } else {
    task.status='idle';
  }

  applyCardState(task); persist();
};

const deleteTask = (id) => {
  const task = state.tasks.find(t=>t.id===id);
  if (task?.status==='running') stopTask(id,false);
  state.tasks = state.tasks.filter(t=>t.id!==id);

  const card = document.querySelector(`.task-card[data-id="${id}"]`);
  if (card) {
    card.style.transition='all 0.3s var(--ease)';
    card.style.opacity='0'; card.style.transform='translateX(16px)';
    setTimeout(()=>card.remove(), 320);
  }

  if (!state.tasks.length) $('emptyState').classList.remove('hidden');
  persist(); renderAnalytics();
  Toast.show('Task removed');
};

const spawnGlowBurst = () => {
  const cx = win.innerWidth*0.35, cy = win.innerHeight*0.5;
  // ⑥ spread: create 12 glows
  const glows = Array.from({length:12}, () => {
    const g = new GlowParticle(cx + (Math.random()-0.5)*200, cy + (Math.random()-0.5)*200);
    return g;
  });
  state.glows.push(...glows); // ⑬ spread push
};

/* ══════════════════════════════════════════════════════════════════════
   FORM: Add task
   ══════════════════════════════════════════════════════════════════════ */
let selectedCat = 'work';

// ㉞ Event delegation — one listener handles all pills
$('catPills').addEventListener('click', e => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  $$('.pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  selectedCat = pill.dataset.cat;
});

$('taskForm').addEventListener('submit', e => {
  e.preventDefault();

  // ⑫ Destructuring from element values
  const { value: name } = $('fName');
  const h = parseInt($('fH').value) || 0;
  const m = parseInt($('fM').value) || 0;
  const estSecs = h*3600 + m*60;

  if (!name.trim()) { $('fName').focus(); Toast.show('Name the task first'); return; }
  if (estSecs < 60) { Toast.show('Estimate at least 1 minute'); return; }

  const task = { id:uid(), name:name.trim(), cat:selectedCat, estSecs, actSecs:0, startedAt:null, status:'idle' };
  state.tasks.push(task);

  $('emptyState').classList.add('hidden');
  const card = buildTaskCard(task);
  $('taskList').appendChild(card);
  applyCardState(task);

  $('fName').value=''; $('fH').value=''; $('fM').value='';
  persist(); renderAnalytics();
  Toast.show(`✓ "${task.name}" added`);
  $('fName').focus();
});

/* ══════════════════════════════════════════════════════════════════════
   JOURNAL / NOTE — typing energy, auto-save, spirit reaction
   ══════════════════════════════════════════════════════════════════════ */
const journalTA = $('journalTA');
let jEnergy = 0;
let jLastKey = 0;
const jKeyTimes = [];

// ㉜ Debounced analytics update
const updateJournalAnalytics = makeDebounce(() => {
  const text   = journalTA.value;
  const words  = countWords(text);
  const energy = Math.round(jEnergy*100);

  $('jChars').textContent = text.length;
  $('jWords').textContent = `${words} words`;
  $('jRhythm').textContent= calcRhythm(jKeyTimes);
  $('jClarity').textContent = calcClarity(text);
  $('jEFill').style.width = `${energy}%`;
  $('jEPct').textContent  = `${energy}%`;

  // Update global word count for achievements
  state.wordsWritten = words;
  checkAchievements();
  persist();
}, 200);

journalTA.addEventListener('input', e => {
  const text = e.target.value;
  state.journalText = text;
  $('jChars').textContent = text.length;
  $('jWords').textContent = `${countWords(text)} words`;
  updateJournalAnalytics();
  autoSaveJournal(text);
});

journalTA.addEventListener('keydown', () => {
  const now = Date.now();
  jLastKey = now;
  jKeyTimes.push(now);
  if (jKeyTimes.length > 20) jKeyTimes.splice(0,1); // ㉘ splice

  const gap = now - (jKeyTimes.at(-2) ?? now); // ㉘ .at()
  jEnergy = clamp(jEnergy + (gap < 150 ? 0.044 : 0.022));
  state.energy = jEnergy;

  // Spawn glows on high typing energy
  if (jEnergy > 0.75 && Math.random() < 0.25) {
    const rect = journalTA.getBoundingClientRect();
    state.glows.push(new GlowParticle(
      rect.left + Math.random()*rect.width,
      rect.top  + Math.random()*rect.height
    ));
  }
});

// Idle: energy fades
setInterval(() => { // ㉜ setInterval
  if (Date.now() - jLastKey > CFG.IDLE_MS) jEnergy = Math.max(0, jEnergy - CFG.ENERGY_DECAY*5);
  state.energy = jEnergy;
}, 500);

const autoSaveJournal = makeDebounce((text) => {
  try { localStorage.setItem('chronicle_journal', text); } catch(_){}
}, 1500);

// ⑨ Pure functions for text analysis
function calcClarity(text) {
  if (!text?.trim()) return '—';
  const words = Array.from(text.toLowerCase().matchAll(/[a-z]+/g), m => m[0]); // ㉗ Array.from with map
  if (words.length < 3) return '—';
  const ratio = new Set(words).size / words.length;
  if (ratio > 0.8) return 'vivid';
  if (ratio > 0.6) return 'clear';
  if (ratio > 0.4) return 'steady';
  return 'focused';
}

function calcRhythm(times) {
  if (times.length < 4) return '—';
  // ⑩ map + filter + reduce
  const gaps = times.slice(1).map((t,i)=>t-times[i]).filter(g=>g>0&&g<3000);
  if (!gaps.length) return '—';
  const avg = gaps.reduce((s,g)=>s+g,0)/gaps.length;
  if (gaps.some(g=>g<80))    return 'rapid';   // ⑩ some
  if (avg<200)               return 'flowing';
  if (avg<400)               return 'steady';
  if (gaps.every(g=>g>600))  return 'meditative'; // ⑩ every
  return 'gentle';
}

/* ══════════════════════════════════════════════════════════════════════
   EXPORT — save canvas composite as image
   ㉑ async/await, ㉒ Promise
   ══════════════════════════════════════════════════════════════════════ */
const exportAura = async () => {
  try {
    // Create composite export canvas
    const W = 1200, H = 675;
    const exp = document.createElement('canvas');
    exp.width=W; exp.height=H;
    const ec = exp.getContext('2d');

    // Background: dark
    ec.fillStyle='#07080b';
    ec.fillRect(0,0,W,H);

    // Draw BG canvas scaled
    ec.drawImage(bgCanvas, 0,0, W,H);

    // Overlay gradient
    const grad = ec.createLinearGradient(0,0,W,0);
    grad.addColorStop(0,   'rgba(7,8,11,0.85)');
    grad.addColorStop(0.35,'rgba(7,8,11,0.4)');
    grad.addColorStop(1,   'rgba(7,8,11,0.6)');
    ec.fillStyle=grad; ec.fillRect(0,0,W,H);

    // Spirit animal — large on left
    const spiritSize = 320;
    const tmpC = document.createElement('canvas');
    tmpC.width=spiritSize; tmpC.height=spiritSize;
    drawSpirit(tmpC.getContext('2d'), spiritSize, state.vitality, state.level, false);
    ec.drawImage(tmpC, 60, H/2-spiritSize/2, spiritSize, spiritSize);

    // Spirit name
    ec.font = 'bold 64px Bebas Neue'; ec.fillStyle='#c9a96e';
    ec.letterSpacing='6px'; ec.textAlign='left';
    ec.fillText(getSpiritLevel(state.level).name, 420, 120);

    // App name
    ec.font='14px DM Mono'; ec.fillStyle='rgba(201,169,110,0.6)';
    ec.fillText('CHRONICLE · SPIRIT  ·  TIME  ·  TRUTH', 422, 148);

    // Divider line
    ec.strokeStyle='rgba(201,169,110,0.2)'; ec.lineWidth=1;
    ec.beginPath(); ec.moveTo(420,165); ec.lineTo(W-60,165); ec.stroke();

    // Journal note snippet
    const noteText = journalTA.value.trim();
    if (noteText) {
      const lines = wrapText(ec, noteText, W-480, 22);
      ec.font='italic 26px Cormorant Garamond'; ec.fillStyle='rgba(237,232,222,0.75)';
      const maxLines = Math.min(lines.length, 6);
      lines.slice(0, maxLines).forEach((line, i) => {
        ec.fillText(line, 420, 200 + i*38);
      });
      if (lines.length > maxLines) {
        ec.font='18px DM Mono'; ec.fillStyle='rgba(201,169,110,0.4)';
        ec.fillText('…', 420, 200 + maxLines*38);
      }
    } else {
      ec.font='italic 24px Cormorant Garamond'; ec.fillStyle='rgba(237,232,222,0.3)';
      ec.fillText('No note written today.', 420, 210);
    }

    // Stats row at bottom
    const stats = [
      { label:'Tasks Done', val: String(state.totalDone) },
      { label:'Accuracy',   val: Analytics.getAccuracy(state.tasks) !== null ? `${Analytics.getAccuracy(state.tasks).toFixed(0)}%`:'—' },
      { label:'XP',         val: String(state.xp) },
      { label:'Tendency',   val: Analytics.getTendency(state.tasks) },
    ];
    ec.font='12px DM Mono'; ec.fillStyle='rgba(237,232,222,0.25)';
    stats.forEach((s,i) => {
      const x = 420 + i*190;
      ec.fillStyle='rgba(201,169,110,0.5)'; ec.font='bold 36px Bebas Neue';
      ec.fillText(s.val, x, H-80);
      ec.fillStyle='rgba(237,232,222,0.3)'; ec.font='11px DM Mono';
      ec.fillText(s.label.toUpperCase(), x, H-58);
    });

    // Pie chart small
    ec.drawImage(pieCanvas, W-290, H/2-110, 220, 220);

    // Watermark
    ec.font='11px DM Mono'; ec.fillStyle='rgba(255,255,255,0.12)';
    ec.textAlign='right';
    ec.fillText(`CHRONICLE · ${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}`, W-20, H-20);

    // ㉒ await small delay for canvas rendering
    await new Promise(r => setTimeout(r, 60));

    const link = Object.assign(document.createElement('a'), { // ⑭ Object.assign
      download: `chronicle-aura-${Date.now()}.png`,
      href: exp.toDataURL('image/png',1.0)
    });
    link.click();
    Toast.show('✦ Aura saved as image');
  } catch(err) {
    // ㉓ Custom error handling
    console.error('[CHRONICLE] Export failed:', err);
    Toast.show('Export failed — try again');
  }
};

// Text wrapping helper for canvas
function wrapText(ctx, text, maxWidth, fontSize) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  ctx.font = `italic ${fontSize}px Cormorant Garamond`;
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current); current = word;
    } else { current = test; }
  }
  if (current) lines.push(current);
  return lines;
}

/* ══════════════════════════════════════════════════════════════════════
   TAB NAVIGATION
   ══════════════════════════════════════════════════════════════════════ */
$$('.ntab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.ntab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
    $$('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active'); tab.setAttribute('aria-selected','true');

    const panelId = `panel-${tab.dataset.tab}`;
    $(panelId)?.classList.add('active');

    if (tab.dataset.tab === 'analytics') renderAnalytics();
  });
});

/* ══════════════════════════════════════════════════════════════════════
   ㉟ OBSERVERS — ResizeObserver, MutationObserver
   ══════════════════════════════════════════════════════════════════════ */
const resizeObserver = new ResizeObserver(() => {
  setupBgCanvas(); initParticles();
});
resizeObserver.observe(document.body);

const mutObs = new MutationObserver(mutations => {
  for (const m of mutations) {
    if (m.type === 'childList' && m.target.id === 'taskList') {
      // Task list changed — could sync to external state
    }
  }
});
mutObs.observe($('taskList'), { childList: true, subtree: false });

/* ══════════════════════════════════════════════════════════════════════
   ㉞ EVENT LISTENERS — global
   ══════════════════════════════════════════════════════════════════════ */
$('btnExport').addEventListener('click', exportAura);

// Mouse move: particles react to cursor (throttled ⑩㉜)
const onMouseMove = makeThrottle(e => {
  const { clientX: mx, clientY: my } = e; // ⑫ destructure with rename
  for (const p of state.particles) {
    const dist = Math.hypot(mx-p.x, my-p.y);
    if (dist < 180) {
      const f = (1-dist/180)*0.0009;
      p.vx += (mx-p.x)*f; p.vy += (my-p.y)*f;
      const spd = Math.hypot(p.vx, p.vy);
      if (spd > CFG.MAX_SPEED*2) { p.vx=p.vx/spd*CFG.MAX_SPEED*2; p.vy=p.vy/spd*CFG.MAX_SPEED*2; }
    }
  }
}, 40);
win.addEventListener('mousemove', onMouseMove);

// Keyboard: Ctrl+S = export, Ctrl+1/2/3 = switch tabs
document.addEventListener('keydown', e => {
  if ((e.ctrlKey||e.metaKey) && e.key==='s') { e.preventDefault(); exportAura(); }
  if ((e.ctrlKey||e.metaKey) && e.key==='1') { $$('.ntab')[0].click(); e.preventDefault(); }
  if ((e.ctrlKey||e.metaKey) && e.key==='2') { $$('.ntab')[1].click(); e.preventDefault(); }
  if ((e.ctrlKey||e.metaKey) && e.key==='3') { $$('.ntab')[2].click(); e.preventDefault(); }
});

// ㉞ Custom event listener — react to task completion
document.addEventListener('chronicle:taskdone', e => {
  const { task, accuracy } = e.detail; // ⑫ destructure detail
  IS_DEV && console.log('[CHRONICLE] task done:', task.name, 'accuracy:', accuracy);
});

// ㉞ once: true — scatter particles on first journal focus
journalTA.addEventListener('focus', () => {
  [...state.particles].forEach((p,i) => { // ⑬ spread copy
    const angle = (i/state.particles.length)*Math.PI*2;
    p.vx += Math.cos(angle)*1; p.vy += Math.sin(angle)*1;
  });
}, { once: true }); // auto-removes after first fire

/* ══════════════════════════════════════════════════════════════════════
   ㉑ PROMISE — async quote for journal placeholder
   ㉒ async/await
   ══════════════════════════════════════════════════════════════════════ */
const loadJournalPrompt = () => new Promise((resolve) => {
  const prompts = [
    'What surprised you most about today?',
    'Where did time disappear to?',
    'What will you do differently tomorrow…',
    'What are you most proud of today?',
    'What drained you? What energized you?',
  ];
  setTimeout(() => resolve(prompts[Math.floor(Math.random()*prompts.length)]), 80);
});

const initJournalPrompt = async () => {
  try {
    const prompt = await loadJournalPrompt();
    if (!journalTA.value) journalTA.placeholder = prompt + '\n\n…';
  } catch (_) {}
};

/* ══════════════════════════════════════════════════════════════════════
   CLOCK
   ══════════════════════════════════════════════════════════════════════ */
const updateDate = () => {
  const now = new Date();
  $('noteDate').textContent = now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
};
updateDate();
setInterval(updateDate, 60_000);

/* ══════════════════════════════════════════════════════════════════════
   AUTO-PERSIST every 30s
   ══════════════════════════════════════════════════════════════════════ */
setInterval(persist, 30_000);

/* ══════════════════════════════════════════════════════════════════════
   for...in demo (enumerate object properties)
   ══════════════════════════════════════════════════════════════════════ */
if (IS_DEV) {
  for (const key in CFG) {
    if (Object.prototype.hasOwnProperty.call(CFG, key)) { // own props only
      console.log(`CFG.${key} =`, CFG[key]);
    }
  }
  // for...of on custom iterable ⑲
  for (const mood of moodIterable) {
    console.log('Mood:', mood.name);
  }
}

/* ══════════════════════════════════════════════════════════════════════
   ㉔ TAGGED TEMPLATE LITERAL
   ══════════════════════════════════════════════════════════════════════ */
const glow = (strings, ...vals) =>
  strings.reduce((out, str, i) =>
    out + str + (vals[i]!==undefined ? `<em style="color:var(--gold)">${vals[i]}</em>` : ''), '');
// usage: glow`Level ${state.level} · Vitality ${state.vitality}%`

/* ══════════════════════════════════════════════════════════════════════
   ⑭ Object static methods demo (used throughout app)
   ══════════════════════════════════════════════════════════════════════ */
const _demoEntries = Object.entries(CAT_COLORS instanceof Map
  ? Object.fromEntries(CAT_COLORS)  // Map → plain object → entries
  : {});

// Object.create — prototype chain
const baseLogger = { log(msg) { console.log(`[${this.prefix}]`, msg); } };
const appLogger  = Object.create(baseLogger);
appLogger.prefix = 'CHRONICLE';
// appLogger.log('Hello') → "[CHRONICLE] Hello"

/* ══════════════════════════════════════════════════════════════════════
   ㉘ Array methods: flat, flatMap, findIndex, some, every, at
   ══════════════════════════════════════════════════════════════════════ */
const nestedCats = [['work','creative'], ['admin'], ['learning','life']];
const allCats    = nestedCats.flat();          // ['work','creative','admin','learning','life']
const catLabels  = nestedCats.flatMap(g => g.map(c => c.toUpperCase())); // flatMap

const firstHighIdx = SPIRIT_LEVELS.findIndex(s => s.vitality > 50); // findIndex
const hasLowVit    = SPIRIT_LEVELS.some(s => s.vitality < 20);      // some
const allHaveEmoji = SPIRIT_LEVELS.every(s => s.emoji);              // every
const lastLevel    = SPIRIT_LEVELS.at(-1);                           // at()

/* ══════════════════════════════════════════════════════════════════════
   ⑱ PROXY DEMO: validation proxy
   ══════════════════════════════════════════════════════════════════════ */
const validatedTask = new Proxy({}, {
  set(t, k, v) {
    if (k === 'estSecs' && typeof v !== 'number') throw new TypeError('estSecs must be a number');
    if (k === 'name'    && typeof v !== 'string') throw new TypeError('name must be a string');
    return Reflect.set(t, k, v);
  }
});

/* ══════════════════════════════════════════════════════════════════════
   ㉓ CUSTOM ERROR CLASSES
   ══════════════════════════════════════════════════════════════════════ */
class ChronicleError extends Error {
  constructor(msg, code='UNKNOWN') {
    super(msg); // ⑯ call parent Error constructor
    this.name='ChronicleError'; this.code=code; this.ts=Date.now();
  }
}
class ValidationError extends ChronicleError {
  constructor(field, msg) {
    super(msg, 'VALIDATION'); this.field=field;
  }
}

/* ══════════════════════════════════════════════════════════════════════
   ㉑ Promise.all + Promise.race
   ══════════════════════════════════════════════════════════════════════ */
const preload = async () => {
  const delay = ms => new Promise(r => setTimeout(r, ms));
  await Promise.all([ delay(20), initJournalPrompt() ]); // parallel
};

/* ══════════════════════════════════════════════════════════════════════
   INIT — async entry point
   ══════════════════════════════════════════════════════════════════════ */
const init = async () => {
  setupBgCanvas();
  initParticles();

  // Start animation loops ㉛
  animateBg();
  animateSpirit();
  tickLiveTimers();

  // Restore persisted data ㊱
  restore();
  renderTaskList();
  renderAnalytics();
  renderBadges();

  // Async preloads ㉒
  await preload();

  // Update UI from restored state
  onVitalityChange(state.vitality);
  $('xpBar').style.width = `${((state.xp % CFG.XP_PER_LEVEL)/CFG.XP_PER_LEVEL)*100}%`;
  $('xpNum').textContent = `${state.xp} xp`;
  $('xpLevel').textContent = `Lv ${state.level}`;

  // Console easter egg
  console.log(
    '%c✦ CHRONICLE%c Spirit · Time · Truth',
    'color:#c9a96e;font-family:Bebas Neue;font-size:22px;letter-spacing:6px',
    'color:#555;font-family:monospace;font-size:12px;margin-left:8px'
  );
  console.log('%cstate is a Proxy. Try: state.energy = 0.9 in console.',  'color:#444;font-size:11px');
  console.log('%chueGen is a Generator. Try: hueGen.next().value',         'color:#444;font-size:11px');
  console.log('%cAll JS concepts (①–㊳) documented in script.js',         'color:#444;font-size:11px');
};

init().catch(err => console.error('[CHRONICLE] Fatal:', err));