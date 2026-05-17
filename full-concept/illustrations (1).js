// SaaS illustrations — each is a flat SVG returned as a string.
// Style: viewBox 0 0 260 200, flat colors from the page palette, no gradients, simple shapes.

const C = {
  yel:'#F7C945', cream:'#FFE9A8', ink:'#1B1B1B', paper:'#FFFDF6',
  pink:'#FF8FA3', coral:'#FF7A59', blue:'#6FA8FF', teal:'#2BC4A8', violet:'#8B7CF6',
  soft:'#F1EEE3'
};

const ill = {};

// helper to wrap viewBox
const vb = (body) => `<svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

// --- DASHBOARDS & CHARTS ---

ill.revenue = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="10" y="14" width="240" height="32" rx="14" fill="${C.yel}"/>
  <circle cx="24" cy="30" r="5" fill="${C.ink}"/>
  <rect x="36" y="26" width="60" height="8" rx="3" fill="${C.ink}"/>
  <rect x="200" y="22" width="40" height="16" rx="8" fill="${C.ink}"/>
  <rect x="22" y="58" width="68" height="44" rx="8" fill="${C.cream}"/>
  <rect x="30" y="66" width="40" height="6" rx="2" fill="${C.ink}"/>
  <rect x="30" y="78" width="50" height="14" rx="2" fill="${C.ink}"/>
  <rect x="96" y="58" width="68" height="44" rx="8" fill="${C.pink}"/>
  <rect x="104" y="66" width="40" height="6" rx="2" fill="${C.ink}"/>
  <rect x="104" y="78" width="50" height="14" rx="2" fill="${C.ink}"/>
  <rect x="170" y="58" width="68" height="44" rx="8" fill="${C.blue}"/>
  <rect x="178" y="66" width="40" height="6" rx="2" fill="${C.ink}"/>
  <rect x="178" y="78" width="50" height="14" rx="2" fill="${C.ink}"/>
  <rect x="22" y="112" width="216" height="64" rx="8" fill="${C.soft}"/>
  <polyline points="32,162 56,142 80,150 104,118 128,128 152,98 176,114 200,86 220,98 234,72" fill="none" stroke="${C.coral}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="234" cy="72" r="4" fill="${C.coral}"/>
`);

ill.pie = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="28" width="120" height="10" rx="3" fill="${C.ink}"/>
  <rect x="22" y="44" width="80" height="6" rx="2" fill="${C.ink}" opacity=".35"/>
  <!-- pie -->
  <g transform="translate(80,130)">
    <circle r="50" fill="${C.cream}"/>
    <path d="M0 0 L0 -50 A50 50 0 0 1 47 -16 Z" fill="${C.coral}"/>
    <path d="M0 0 L47 -16 A50 50 0 0 1 30 40 Z" fill="${C.violet}"/>
    <path d="M0 0 L30 40 A50 50 0 0 1 -40 30 Z" fill="${C.teal}"/>
    <circle r="22" fill="${C.paper}"/>
  </g>
  <!-- legend -->
  <g transform="translate(160,80)">
    <rect width="10" height="10" rx="2" fill="${C.coral}"/><rect x="16" y="2" width="58" height="6" rx="2" fill="${C.ink}"/>
    <rect y="20" width="10" height="10" rx="2" fill="${C.violet}"/><rect x="16" y="22" width="58" height="6" rx="2" fill="${C.ink}"/>
    <rect y="40" width="10" height="10" rx="2" fill="${C.teal}"/><rect x="16" y="42" width="58" height="6" rx="2" fill="${C.ink}"/>
    <rect y="60" width="10" height="10" rx="2" fill="${C.cream}"/><rect x="16" y="62" width="58" height="6" rx="2" fill="${C.ink}" opacity=".4"/>
  </g>
`);

ill.bars = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="26" width="100" height="10" rx="3" fill="${C.ink}"/>
  <rect x="22" y="42" width="50" height="6" rx="2" fill="${C.ink}" opacity=".4"/>
  <rect x="200" y="26" width="38" height="14" rx="7" fill="${C.yel}"/>
  <g>
    <rect x="32" y="160" width="20" height="10" fill="${C.ink}" opacity=".15"/>
    <rect x="60" y="160" width="20" height="10" fill="${C.ink}" opacity=".15"/>
    <rect x="88" y="160" width="20" height="10" fill="${C.ink}" opacity=".15"/>
    <rect x="116" y="160" width="20" height="10" fill="${C.ink}" opacity=".15"/>
    <rect x="144" y="160" width="20" height="10" fill="${C.ink}" opacity=".15"/>
    <rect x="172" y="160" width="20" height="10" fill="${C.ink}" opacity=".15"/>
    <rect x="200" y="160" width="20" height="10" fill="${C.ink}" opacity=".15"/>
    <rect x="32" y="120" width="20" height="40" fill="${C.coral}"/>
    <rect x="60" y="100" width="20" height="60" fill="${C.yel}"/>
    <rect x="88" y="130" width="20" height="30" fill="${C.violet}"/>
    <rect x="116" y="80" width="20" height="80" fill="${C.teal}"/>
    <rect x="144" y="110" width="20" height="50" fill="${C.pink}"/>
    <rect x="172" y="90" width="20" height="70" fill="${C.blue}"/>
    <rect x="200" y="70" width="20" height="90" fill="${C.coral}"/>
  </g>
  <line x1="22" y1="170" x2="240" y2="170" stroke="${C.ink}" stroke-width="1.5"/>
`);

ill.line = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="28" width="60" height="8" rx="3" fill="${C.ink}"/>
  <rect x="22" y="42" width="100" height="22" rx="3" fill="${C.ink}"/>
  <rect x="200" y="34" width="38" height="14" rx="7" fill="${C.teal}"/>
  <polyline points="22,150 50,130 78,145 106,110 134,125 162,85 190,95 218,60 240,80" fill="none" stroke="${C.violet}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="22,170 50,160 78,165 106,155 134,160 162,140 190,150 218,135 240,142" fill="none" stroke="${C.coral}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>
  <circle cx="218" cy="60" r="5" fill="${C.violet}"/>
  <circle cx="218" cy="60" r="10" fill="${C.violet}" opacity=".2"/>
`);

ill.kpi = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g>
    <rect x="22" y="28" width="100" height="74" rx="10" fill="${C.yel}"/>
    <rect x="32" y="40" width="50" height="6" rx="2" fill="${C.ink}"/>
    <rect x="32" y="56" width="70" height="20" rx="3" fill="${C.ink}"/>
    <polyline points="32,90 44,82 56,86 68,72 80,78 92,66 106,72" fill="none" stroke="${C.ink}" stroke-width="2"/>

    <rect x="138" y="28" width="100" height="74" rx="10" fill="${C.pink}"/>
    <rect x="148" y="40" width="50" height="6" rx="2" fill="${C.ink}"/>
    <rect x="148" y="56" width="60" height="20" rx="3" fill="${C.ink}"/>
    <path d="M148 90 q14 -6 26 0 t26 0 t26 0" fill="none" stroke="${C.ink}" stroke-width="2"/>

    <rect x="22" y="112" width="100" height="64" rx="10" fill="${C.blue}"/>
    <circle cx="60" cy="144" r="22" fill="${C.paper}"/>
    <path d="M60 144 L60 122 A22 22 0 0 1 81 152 Z" fill="${C.ink}"/>
    <rect x="92" y="130" width="20" height="6" rx="2" fill="${C.ink}"/>
    <rect x="92" y="142" width="20" height="6" rx="2" fill="${C.ink}" opacity=".5"/>
    <rect x="92" y="154" width="20" height="6" rx="2" fill="${C.ink}" opacity=".5"/>

    <rect x="138" y="112" width="100" height="64" rx="10" fill="${C.teal}"/>
    <rect x="148" y="124" width="80" height="8" rx="3" fill="${C.ink}"/>
    <rect x="148" y="138" width="80" height="6" rx="3" fill="${C.ink}" opacity=".5"/>
    <rect x="148" y="156" width="50" height="14" rx="7" fill="${C.ink}"/>
  </g>
`);

ill.funnel = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="26" width="120" height="10" rx="3" fill="${C.ink}"/>
  <g transform="translate(60,46)">
    <polygon points="0,0 140,0 130,24 10,24" fill="${C.yel}"/>
    <rect x="18" y="6" width="40" height="6" rx="2" fill="${C.ink}"/>
    <rect x="100" y="6" width="22" height="12" rx="3" fill="${C.ink}"/>
    <polygon points="10,30 130,30 118,54 22,54" fill="${C.coral}"/>
    <rect x="28" y="36" width="40" height="6" rx="2" fill="${C.ink}"/>
    <rect x="92" y="36" width="22" height="12" rx="3" fill="${C.ink}"/>
    <polygon points="22,60 118,60 104,84 36,84" fill="${C.violet}"/>
    <rect x="42" y="66" width="36" height="6" rx="2" fill="${C.ink}"/>
    <rect x="82" y="66" width="20" height="12" rx="3" fill="${C.ink}"/>
    <polygon points="36,90 104,90 90,114 50,114" fill="${C.teal}"/>
    <rect x="54" y="96" width="32" height="6" rx="2" fill="${C.ink}"/>
    <rect x="72" y="96" width="18" height="12" rx="3" fill="${C.ink}"/>
  </g>
`);

ill.map = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="26" width="100" height="10" rx="3" fill="${C.ink}"/>
  <g transform="translate(22,46)">
    <rect width="216" height="124" rx="10" fill="${C.cream}"/>
    <!-- simple continents blobs -->
    <path d="M20 30 q20 -10 40 -4 q10 8 -2 18 q-20 6 -38 0 z" fill="${C.teal}" opacity=".7"/>
    <path d="M80 50 q30 -16 56 -6 q12 14 -4 26 q-30 6 -52 -8 z" fill="${C.teal}" opacity=".7"/>
    <path d="M150 30 q24 -8 40 4 q6 12 -8 18 q-22 4 -32 -10 z" fill="${C.teal}" opacity=".7"/>
    <path d="M40 90 q24 -10 48 4 q6 12 -10 20 q-26 4 -38 -10 z" fill="${C.teal}" opacity=".7"/>
    <path d="M130 90 q30 -10 56 4 q4 12 -12 18 q-32 4 -44 -10 z" fill="${C.teal}" opacity=".7"/>
    <!-- pins -->
    <circle cx="40" cy="40" r="10" fill="${C.coral}" opacity=".3"/>
    <circle cx="40" cy="40" r="5" fill="${C.coral}"/>
    <circle cx="110" cy="60" r="14" fill="${C.coral}" opacity=".3"/>
    <circle cx="110" cy="60" r="7" fill="${C.coral}"/>
    <circle cx="170" cy="42" r="8" fill="${C.coral}" opacity=".3"/>
    <circle cx="170" cy="42" r="4" fill="${C.coral}"/>
    <circle cx="70" cy="100" r="12" fill="${C.coral}" opacity=".3"/>
    <circle cx="70" cy="100" r="6" fill="${C.coral}"/>
    <circle cx="160" cy="98" r="10" fill="${C.coral}" opacity=".3"/>
    <circle cx="160" cy="98" r="5" fill="${C.coral}"/>
  </g>
`);

ill.activity = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="26" width="100" height="10" rx="3" fill="${C.ink}"/>
  <g transform="translate(22,50)">
    <line x1="14" y1="6" x2="14" y2="120" stroke="${C.ink}" stroke-width="2" opacity=".2"/>
    <circle cx="14" cy="14" r="8" fill="${C.coral}"/>
    <rect x="32" y="8" width="80" height="6" rx="2" fill="${C.ink}"/>
    <rect x="32" y="18" width="120" height="5" rx="2" fill="${C.ink}" opacity=".4"/>
    <circle cx="14" cy="50" r="8" fill="${C.yel}"/>
    <rect x="32" y="44" width="60" height="6" rx="2" fill="${C.ink}"/>
    <rect x="32" y="54" width="100" height="5" rx="2" fill="${C.ink}" opacity=".4"/>
    <circle cx="14" cy="86" r="8" fill="${C.teal}"/>
    <rect x="32" y="80" width="90" height="6" rx="2" fill="${C.ink}"/>
    <rect x="32" y="90" width="80" height="5" rx="2" fill="${C.ink}" opacity=".4"/>
    <circle cx="14" cy="122" r="8" fill="${C.violet}"/>
    <rect x="32" y="116" width="70" height="6" rx="2" fill="${C.ink}"/>
    <rect x="32" y="126" width="110" height="5" rx="2" fill="${C.ink}" opacity=".4"/>
  </g>
`);

ill.heatmap = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="26" width="120" height="10" rx="3" fill="${C.ink}"/>
  <g transform="translate(22,52)">
    ${Array.from({length:7},(_,r)=>Array.from({length:18},(_,c)=>{
      const v = Math.sin(r*0.7+c*0.4)+1;
      const op = (v/2);
      return `<rect x="${c*12}" y="${r*16}" width="10" height="12" rx="2" fill="${C.teal}" opacity="${(op*0.85+0.1).toFixed(2)}"/>`;
    }).join('')).join('')}
  </g>
`);

ill.cohort = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="26" width="80" height="10" rx="3" fill="${C.ink}"/>
  <g transform="translate(22,50)">
    <rect width="216" height="22" rx="6" fill="${C.ink}"/>
    <rect x="6" y="8" width="40" height="6" rx="2" fill="${C.yel}"/>
    <rect x="54" y="8" width="20" height="6" rx="2" fill="${C.paper}" opacity=".7"/>
    <rect x="82" y="8" width="20" height="6" rx="2" fill="${C.paper}" opacity=".7"/>
    <rect x="110" y="8" width="20" height="6" rx="2" fill="${C.paper}" opacity=".7"/>
    <rect x="138" y="8" width="20" height="6" rx="2" fill="${C.paper}" opacity=".7"/>
    <rect x="166" y="8" width="20" height="6" rx="2" fill="${C.paper}" opacity=".7"/>
    ${[0,1,2,3,4].map(r=>`
      <g transform="translate(0,${28+r*22})">
        <rect width="216" height="20" rx="5" fill="${C.soft}"/>
        <rect x="6" y="6" width="40" height="6" rx="2" fill="${C.ink}"/>
        ${[0,1,2,3,4].map(c=>{
          const v = Math.max(0.1, 1 - r*0.15 - c*0.1);
          return `<rect x="${54+c*28}" y="3" width="20" height="14" rx="3" fill="${C.coral}" opacity="${v.toFixed(2)}"/>`;
        }).join('')}
      </g>
    `).join('')}
  </g>
`);

// --- NEW SCREENS ---

ill.login = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="60" y="34" width="140" height="138" rx="12" fill="${C.yel}"/>
  <circle cx="130" cy="60" r="12" fill="${C.ink}"/>
  <rect x="76" y="80" width="108" height="10" rx="3" fill="${C.ink}"/>
  <rect x="76" y="98" width="108" height="16" rx="5" fill="${C.paper}"/>
  <rect x="82" y="103" width="60" height="6" rx="2" fill="${C.ink}" opacity=".4"/>
  <rect x="76" y="118" width="108" height="16" rx="5" fill="${C.paper}"/>
  <rect x="82" y="123" width="50" height="6" rx="2" fill="${C.ink}" opacity=".4"/>
  <rect x="76" y="142" width="108" height="20" rx="5" fill="${C.ink}"/>
  <rect x="118" y="150" width="24" height="4" rx="2" fill="${C.yel}"/>
`);

ill.signup = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="40" y="34" width="180" height="138" rx="12" fill="${C.cream}"/>
  <rect x="56" y="50" width="100" height="12" rx="3" fill="${C.ink}"/>
  <rect x="56" y="70" width="148" height="14" rx="5" fill="${C.paper}"/>
  <rect x="56" y="90" width="148" height="14" rx="5" fill="${C.paper}"/>
  <rect x="56" y="110" width="148" height="14" rx="5" fill="${C.paper}"/>
  <rect x="56" y="132" width="148" height="18" rx="5" fill="${C.coral}"/>
  <rect x="56" y="158" width="60" height="6" rx="2" fill="${C.ink}" opacity=".4"/>
  <rect x="124" y="158" width="80" height="6" rx="2" fill="${C.ink}"/>
`);

ill.inbox_empty = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <!-- envelope -->
  <g transform="translate(70,40)">
    <rect width="120" height="80" rx="10" fill="${C.coral}"/>
    <path d="M0 10 L60 50 L120 10" stroke="${C.paper}" stroke-width="4" fill="none" stroke-linejoin="round"/>
    <circle cx="120" cy="0" r="14" fill="${C.teal}"/>
    <path d="M114 0 L118 4 L126 -4" stroke="${C.paper}" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  <rect x="60" y="140" width="140" height="10" rx="3" fill="${C.ink}"/>
  <rect x="80" y="156" width="100" height="6" rx="3" fill="${C.ink}" opacity=".4"/>
`);

ill.no_notifications = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(108,50)">
    <path d="M22 0 q-22 0 -22 22 v18 l-8 10 h60 l-8 -10 v-18 q0 -22 -22 -22 z" fill="${C.yel}"/>
    <rect x="17" y="-6" width="10" height="6" rx="2" fill="${C.ink}"/>
    <circle cx="22" cy="58" r="6" fill="${C.ink}"/>
    <line x1="-4" y1="-4" x2="50" y2="60" stroke="${C.coral}" stroke-width="4" stroke-linecap="round"/>
  </g>
  <rect x="50" y="140" width="160" height="10" rx="3" fill="${C.ink}"/>
  <rect x="76" y="156" width="108" height="6" rx="3" fill="${C.ink}" opacity=".4"/>
`);

ill.pricing = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(22,30)">
    <rect width="64" height="140" rx="10" fill="${C.cream}"/>
    <rect x="10" y="14" width="34" height="8" rx="2" fill="${C.ink}"/>
    <rect x="10" y="30" width="44" height="14" rx="3" fill="${C.ink}"/>
    <rect x="10" y="56" width="44" height="4" rx="2" fill="${C.ink}" opacity=".3"/>
    <rect x="10" y="66" width="44" height="4" rx="2" fill="${C.ink}" opacity=".3"/>
    <rect x="10" y="76" width="44" height="4" rx="2" fill="${C.ink}" opacity=".3"/>
    <rect x="10" y="112" width="44" height="14" rx="4" fill="${C.ink}"/>
  </g>
  <g transform="translate(96,22)">
    <rect width="68" height="156" rx="10" fill="${C.yel}"/>
    <rect x="12" y="14" width="34" height="8" rx="2" fill="${C.ink}"/>
    <rect x="12" y="30" width="44" height="18" rx="3" fill="${C.ink}"/>
    <rect x="12" y="60" width="44" height="4" rx="2" fill="${C.ink}" opacity=".5"/>
    <rect x="12" y="70" width="44" height="4" rx="2" fill="${C.ink}" opacity=".5"/>
    <rect x="12" y="80" width="44" height="4" rx="2" fill="${C.ink}" opacity=".5"/>
    <rect x="12" y="90" width="44" height="4" rx="2" fill="${C.ink}" opacity=".5"/>
    <rect x="12" y="124" width="44" height="18" rx="4" fill="${C.ink}"/>
    <rect x="22" y="-8" width="24" height="14" rx="4" fill="${C.coral}"/>
  </g>
  <g transform="translate(174,30)">
    <rect width="64" height="140" rx="10" fill="${C.cream}"/>
    <rect x="10" y="14" width="34" height="8" rx="2" fill="${C.ink}"/>
    <rect x="10" y="30" width="44" height="14" rx="3" fill="${C.ink}"/>
    <rect x="10" y="56" width="44" height="4" rx="2" fill="${C.ink}" opacity=".3"/>
    <rect x="10" y="66" width="44" height="4" rx="2" fill="${C.ink}" opacity=".3"/>
    <rect x="10" y="76" width="44" height="4" rx="2" fill="${C.ink}" opacity=".3"/>
    <rect x="10" y="112" width="44" height="14" rx="4" fill="${C.ink}"/>
  </g>
`);

ill.settings = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="30" width="60" height="146" rx="8" fill="${C.ink}"/>
  <rect x="30" y="40" width="44" height="14" rx="4" fill="${C.yel}"/>
  <rect x="30" y="60" width="44" height="8" rx="2" fill="${C.paper}" opacity=".6"/>
  <rect x="30" y="76" width="44" height="8" rx="2" fill="${C.paper}" opacity=".3"/>
  <rect x="30" y="92" width="44" height="8" rx="2" fill="${C.paper}" opacity=".3"/>
  <rect x="30" y="108" width="44" height="8" rx="2" fill="${C.paper}" opacity=".3"/>
  <g transform="translate(94,40)">
    <rect width="140" height="20" rx="6" fill="${C.soft}"/>
    <rect x="8" y="6" width="50" height="8" rx="2" fill="${C.ink}"/>
    <rect x="116" y="4" width="20" height="12" rx="6" fill="${C.teal}"/>
    <circle cx="130" cy="10" r="4" fill="${C.paper}"/>

    <rect y="30" width="140" height="20" rx="6" fill="${C.soft}"/>
    <rect x="8" y="36" width="60" height="8" rx="2" fill="${C.ink}"/>
    <rect x="116" y="34" width="20" height="12" rx="6" fill="${C.soft}" stroke="${C.ink}" stroke-width="1.5"/>
    <circle cx="120" cy="40" r="4" fill="${C.ink}"/>

    <rect y="60" width="140" height="20" rx="6" fill="${C.soft}"/>
    <rect x="8" y="66" width="40" height="8" rx="2" fill="${C.ink}"/>
    <rect x="116" y="64" width="20" height="12" rx="6" fill="${C.teal}"/>
    <circle cx="130" cy="70" r="4" fill="${C.paper}"/>

    <rect y="90" width="140" height="42" rx="6" fill="${C.cream}"/>
    <rect x="8" y="100" width="80" height="22" rx="6" fill="${C.coral}"/>
  </g>
`);

ill.profile = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="30" width="216" height="50" rx="10" fill="${C.violet}"/>
  <circle cx="74" cy="100" r="28" fill="${C.cream}" stroke="${C.paper}" stroke-width="4"/>
  <rect x="50" y="86" width="48" height="28" rx="14" fill="${C.coral}"/>
  <circle cx="74" cy="92" r="10" fill="${C.cream}"/>
  <rect x="112" y="84" width="80" height="10" rx="3" fill="${C.ink}"/>
  <rect x="112" y="100" width="50" height="6" rx="2" fill="${C.ink}" opacity=".4"/>
  <rect x="112" y="114" width="60" height="14" rx="7" fill="${C.ink}"/>
  <rect x="180" y="114" width="50" height="14" rx="7" fill="${C.yel}"/>
  <rect x="22" y="144" width="216" height="32" rx="8" fill="${C.soft}"/>
  <rect x="32" y="154" width="60" height="6" rx="2" fill="${C.ink}"/>
  <rect x="32" y="164" width="100" height="6" rx="2" fill="${C.ink}" opacity=".4"/>
`);

ill.upload = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="32" y="40" width="196" height="120" rx="12" fill="${C.cream}" stroke="${C.ink}" stroke-width="2" stroke-dasharray="6 6"/>
  <g transform="translate(130,76)">
    <circle r="30" fill="${C.yel}"/>
    <path d="M0 -12 L0 14 M-10 -2 L0 -12 L10 -2" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
  <rect x="80" y="124" width="100" height="6" rx="3" fill="${C.ink}"/>
  <rect x="100" y="138" width="60" height="4" rx="2" fill="${C.ink}" opacity=".4"/>
`);

ill.search = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="30" width="216" height="22" rx="11" fill="${C.soft}"/>
  <circle cx="38" cy="41" r="5" fill="none" stroke="${C.ink}" stroke-width="2"/>
  <line x1="42" y1="45" x2="48" y2="51" stroke="${C.ink}" stroke-width="2"/>
  <rect x="54" y="38" width="80" height="6" rx="2" fill="${C.ink}"/>
  <rect x="208" y="35" width="22" height="12" rx="6" fill="${C.yel}"/>
  ${[0,1,2,3].map(i=>`
    <g transform="translate(22,${66+i*26})">
      <rect width="216" height="20" rx="6" fill="${C.soft}"/>
      <circle cx="14" cy="10" r="6" fill="${['#FF7A59','#6FA8FF','#2BC4A8','#8B7CF6'][i]}"/>
      <rect x="28" y="4" width="60" height="5" rx="2" fill="${C.ink}"/>
      <rect x="28" y="12" width="100" height="4" rx="2" fill="${C.ink}" opacity=".4"/>
      <rect x="180" y="6" width="26" height="8" rx="3" fill="${C.ink}"/>
    </g>
  `).join('')}
`);

ill.kanban = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  ${[0,1,2].map((i,_)=>{
    const x = 22+i*74;
    const c = [C.yel,C.pink,C.teal][i];
    return `
    <g transform="translate(${x},28)">
      <rect width="68" height="148" rx="10" fill="${C.soft}"/>
      <rect x="8" y="8" width="38" height="6" rx="2" fill="${C.ink}"/>
      <rect x="8" y="22" width="52" height="32" rx="6" fill="${C.paper}"/>
      <rect x="14" y="28" width="20" height="4" rx="2" fill="${c}"/>
      <rect x="14" y="36" width="40" height="4" rx="2" fill="${C.ink}"/>
      <rect x="14" y="44" width="30" height="4" rx="2" fill="${C.ink}" opacity=".4"/>
      <rect x="8" y="60" width="52" height="32" rx="6" fill="${C.paper}"/>
      <rect x="14" y="66" width="20" height="4" rx="2" fill="${c}"/>
      <rect x="14" y="74" width="36" height="4" rx="2" fill="${C.ink}"/>
      <rect x="14" y="82" width="26" height="4" rx="2" fill="${C.ink}" opacity=".4"/>
      <rect x="8" y="98" width="52" height="32" rx="6" fill="${C.paper}"/>
      <rect x="14" y="104" width="20" height="4" rx="2" fill="${c}"/>
      <rect x="14" y="112" width="34" height="4" rx="2" fill="${C.ink}"/>
    </g>`;
  }).join('')}
`);

ill.chat = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(22,30)">
    <rect x="0" y="0" width="120" height="32" rx="14" fill="${C.cream}"/>
    <rect x="10" y="8" width="60" height="6" rx="2" fill="${C.ink}"/>
    <rect x="10" y="18" width="90" height="6" rx="2" fill="${C.ink}" opacity=".5"/>
    <rect x="-6" y="24" width="14" height="14" fill="${C.cream}" transform="rotate(45,1,31)"/>

    <rect x="96" y="50" width="120" height="42" rx="14" fill="${C.yel}"/>
    <rect x="106" y="58" width="90" height="6" rx="2" fill="${C.ink}"/>
    <rect x="106" y="70" width="80" height="6" rx="2" fill="${C.ink}"/>
    <rect x="106" y="82" width="50" height="6" rx="2" fill="${C.ink}"/>

    <rect x="0" y="102" width="100" height="32" rx="14" fill="${C.cream}"/>
    <rect x="10" y="110" width="50" height="6" rx="2" fill="${C.ink}"/>
    <rect x="10" y="120" width="80" height="6" rx="2" fill="${C.ink}" opacity=".5"/>
  </g>
`);

ill.video = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  ${[0,1,2,3].map(i=>{
    const r = i<2?0:1; const c = i%2;
    return `<g transform="translate(${22+c*112},${30+r*78})">
      <rect width="100" height="68" rx="10" fill="${[C.coral,C.violet,C.blue,C.teal][i]}"/>
      <circle cx="50" cy="32" r="14" fill="${C.paper}"/>
      <rect x="40" y="46" width="20" height="14" rx="6" fill="${C.paper}"/>
      <rect x="8" y="56" width="30" height="8" rx="3" fill="${C.ink}" opacity=".6"/>
    </g>`;
  }).join('')}
  <g transform="translate(98,168)">
    <circle r="10" fill="${C.coral}"/>
    <rect x="20" y="-8" width="20" height="16" rx="6" fill="${C.ink}"/>
    <circle cx="60" cy="0" r="10" fill="${C.ink}"/>
  </g>
`);

ill.calendar = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="30" y="30" width="200" height="146" rx="10" fill="${C.cream}"/>
  <rect x="30" y="30" width="200" height="30" rx="10" fill="${C.coral}"/>
  <rect x="40" y="42" width="60" height="8" rx="2" fill="${C.paper}"/>
  <rect x="190" y="40" width="34" height="12" rx="6" fill="${C.paper}"/>
  ${[0,1,2,3].map(r=>[0,1,2,3,4,5,6].map(c=>{
    const has = (r+c)%4===0;
    return `<g transform="translate(${40+c*28},${70+r*22})">
      <rect width="24" height="18" rx="4" fill="${has?C.yel:'transparent'}"/>
      <rect x="6" y="6" width="12" height="6" rx="2" fill="${has?C.ink:C.ink}" opacity="${has?1:.4}"/>
    </g>`;
  }).join('')).join('')}
`);

ill.onboarding = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="40" y="40" width="180" height="120" rx="12" fill="${C.cream}"/>
  <g transform="translate(108,68)">
    <circle r="22" fill="${C.yel}"/>
    <path d="M-10 0 L-2 8 L12 -8" stroke="${C.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
  <rect x="80" y="110" width="100" height="8" rx="3" fill="${C.ink}"/>
  <rect x="92" y="124" width="76" height="6" rx="3" fill="${C.ink}" opacity=".4"/>
  <g transform="translate(110,144)">
    <circle r="3" fill="${C.ink}"/>
    <circle cx="14" r="3" fill="${C.coral}"/>
    <circle cx="28" r="3" fill="${C.ink}" opacity=".3"/>
    <circle cx="42" r="3" fill="${C.ink}" opacity=".3"/>
  </g>
`);

ill.billing = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="40" y="40" width="180" height="110" rx="12" fill="${C.ink}"/>
  <rect x="50" y="50" width="40" height="6" rx="2" fill="${C.yel}"/>
  <rect x="50" y="80" width="120" height="14" rx="3" fill="${C.paper}"/>
  <rect x="50" y="100" width="60" height="6" rx="2" fill="${C.paper}" opacity=".5"/>
  <rect x="150" y="100" width="50" height="6" rx="2" fill="${C.paper}" opacity=".5"/>
  <circle cx="200" cy="58" r="10" fill="${C.coral}"/>
  <circle cx="186" cy="58" r="10" fill="${C.yel}" opacity=".8"/>
  <rect x="64" y="160" width="132" height="14" rx="7" fill="${C.coral}"/>
`);

ill.team = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="36" width="216" height="120" rx="12" fill="${C.soft}"/>
  ${[
    [C.coral,'L'],[C.blue,'M'],[C.teal,'A'],[C.violet,'S'],[C.pink,'R'],[C.yel,'+']
  ].map((p,i)=>{
    const r = i<3?0:1, c = i%3;
    return `<g transform="translate(${40+c*68},${56+r*52})">
      <circle r="20" fill="${p[0]}"/>
      <text x="0" y="6" text-anchor="middle" font-family="DM Sans" font-weight="900" font-size="16" fill="${C.ink}">${p[1]}</text>
      <rect x="-22" y="26" width="44" height="6" rx="2" fill="${C.ink}"/>
    </g>`;
  }).join('')}
`);

// --- EXPLORE ALL ---

ill.empty404 = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <text x="130" y="120" text-anchor="middle" font-family="DM Sans" font-weight="900" font-size="86" fill="${C.yel}">404</text>
  <circle cx="100" cy="68" r="10" fill="${C.ink}"/>
  <circle cx="160" cy="68" r="10" fill="${C.ink}"/>
  <path d="M104 154 q26 -20 52 0" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>
`);

ill.rocket = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(130,100)">
    <path d="M0 -50 q-20 14 -20 40 v20 h40 v-20 q0 -26 -20 -40 z" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>
    <circle cx="0" cy="-12" r="8" fill="${C.blue}"/>
    <path d="M-20 24 q-14 0 -14 -14 l14 4 z" fill="${C.coral}"/>
    <path d="M20 24 q14 0 14 -14 l-14 4 z" fill="${C.coral}"/>
    <path d="M-10 30 q10 18 20 0" fill="${C.yel}"/>
    <path d="M-6 38 q6 22 12 0" fill="${C.coral}"/>
  </g>
  <circle cx="60" cy="50" r="3" fill="${C.ink}"/>
  <circle cx="200" cy="60" r="3" fill="${C.ink}"/>
  <circle cx="80" cy="160" r="3" fill="${C.ink}"/>
  <circle cx="220" cy="150" r="3" fill="${C.ink}"/>
`);

ill.support = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(130,100)">
    <circle r="44" fill="${C.yel}"/>
    <path d="M-30 -10 a30 30 0 0 1 60 0 v8 h-12 v-8 a18 18 0 1 0 -36 0 v8 h-12 z" fill="${C.ink}"/>
    <rect x="-36" y="-4" width="12" height="22" rx="4" fill="${C.ink}"/>
    <rect x="24" y="-4" width="12" height="22" rx="4" fill="${C.ink}"/>
    <path d="M30 18 q0 14 -14 16" stroke="${C.ink}" stroke-width="3" fill="none"/>
    <circle cx="16" cy="34" r="4" fill="${C.coral}"/>
  </g>
`);

ill.ai = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(130,100)">
    <rect x="-50" y="-44" width="100" height="78" rx="14" fill="${C.violet}"/>
    <circle cx="-22" cy="-12" r="8" fill="${C.paper}"/>
    <circle cx="22" cy="-12" r="8" fill="${C.paper}"/>
    <circle cx="-22" cy="-12" r="3" fill="${C.ink}"/>
    <circle cx="22" cy="-12" r="3" fill="${C.ink}"/>
    <path d="M-14 14 q14 8 28 0" stroke="${C.paper}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="-6" y="-58" width="12" height="14" rx="3" fill="${C.ink}"/>
    <circle cy="-62" r="5" fill="${C.coral}"/>
    <rect x="-58" y="-12" width="8" height="24" rx="4" fill="${C.violet}"/>
    <rect x="50" y="-12" width="8" height="24" rx="4" fill="${C.violet}"/>
  </g>
  <path d="M50 60 q12 -12 -2 -20" stroke="${C.yel}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M210 140 q-12 12 2 20" stroke="${C.coral}" stroke-width="3" fill="none" stroke-linecap="round"/>
`);

ill.password = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(130,108)">
    <rect x="-44" y="-10" width="88" height="60" rx="10" fill="${C.yel}"/>
    <circle r="6" cy="20" fill="${C.ink}"/>
    <rect x="-2" y="22" width="4" height="14" fill="${C.ink}"/>
    <path d="M-26 -10 v-14 a26 26 0 0 1 52 0 v14" stroke="${C.ink}" stroke-width="6" fill="none"/>
  </g>
  <rect x="60" y="170" width="140" height="6" rx="3" fill="${C.ink}" opacity=".3"/>
`);

ill.celebrate = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(130,110)">
    <polygon points="-50,50 -20,-40 50,40" fill="${C.coral}"/>
    <path d="M-50 50 L-40 30 L-20 36 L-12 14 L8 26 L20 4 L50 40 Z" fill="${C.yel}"/>
    <circle cx="-22" cy="-10" r="4" fill="${C.violet}"/>
    <circle cx="10" cy="-26" r="4" fill="${C.teal}"/>
  </g>
  <circle cx="40" cy="40" r="4" fill="${C.coral}"/>
  <circle cx="60" cy="70" r="3" fill="${C.violet}"/>
  <circle cx="220" cy="40" r="4" fill="${C.teal}"/>
  <circle cx="200" cy="70" r="3" fill="${C.yel}"/>
  <circle cx="50" cy="150" r="3" fill="${C.teal}"/>
  <circle cx="210" cy="160" r="4" fill="${C.coral}"/>
`);

ill.integration = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(60,100)">
    <rect x="-26" y="-26" width="52" height="52" rx="10" fill="${C.yel}"/>
    <rect x="-14" y="-14" width="28" height="28" rx="4" fill="${C.ink}"/>
  </g>
  <g transform="translate(200,100)">
    <rect x="-26" y="-26" width="52" height="52" rx="10" fill="${C.teal}"/>
    <path d="M-12 0 L-2 10 L14 -8" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <g transform="translate(130,100)">
    <circle r="28" fill="${C.coral}"/>
    <rect x="-14" y="-4" width="28" height="8" rx="2" fill="${C.paper}"/>
    <rect x="-4" y="-14" width="8" height="28" rx="2" fill="${C.paper}"/>
  </g>
  <line x1="92" y1="100" x2="102" y2="100" stroke="${C.ink}" stroke-width="3" stroke-dasharray="3 4"/>
  <line x1="158" y1="100" x2="168" y2="100" stroke="${C.ink}" stroke-width="3" stroke-dasharray="3 4"/>
`);

ill.coding = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <rect x="22" y="30" width="216" height="140" rx="10" fill="${C.ink}"/>
  <rect x="22" y="30" width="216" height="22" rx="10" fill="#2a2a2a"/>
  <circle cx="34" cy="41" r="3" fill="${C.coral}"/>
  <circle cx="46" cy="41" r="3" fill="${C.yel}"/>
  <circle cx="58" cy="41" r="3" fill="${C.teal}"/>
  ${[0,1,2,3,4,5].map(i=>{
    const w = [40,80,60,100,50,70][i];
    const col = [C.yel,C.pink,C.teal,C.violet,C.blue,C.coral][i];
    return `<g transform="translate(34,${66+i*14})">
      <rect width="14" height="6" rx="2" fill="${C.paper}" opacity=".4"/>
      <rect x="22" width="${w}" height="6" rx="2" fill="${col}"/>
    </g>`;
  }).join('')}
`);

ill.mobile_app = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(130,100)">
    <rect x="-44" y="-66" width="88" height="132" rx="14" fill="${C.ink}"/>
    <rect x="-40" y="-62" width="80" height="124" rx="10" fill="${C.paper}"/>
    <rect x="-6" y="-60" width="12" height="3" rx="1.5" fill="${C.ink}"/>
    <rect x="-32" y="-48" width="64" height="22" rx="6" fill="${C.yel}"/>
    <circle cx="-22" cy="-37" r="5" fill="${C.ink}"/>
    <rect x="-12" y="-40" width="36" height="6" rx="2" fill="${C.ink}"/>
    <rect x="-32" y="-18" width="64" height="14" rx="5" fill="${C.cream}"/>
    <rect x="-32" y="0" width="64" height="14" rx="5" fill="${C.cream}"/>
    <rect x="-32" y="18" width="64" height="14" rx="5" fill="${C.cream}"/>
    <rect x="-32" y="38" width="64" height="20" rx="5" fill="${C.coral}"/>
  </g>
`);

ill.report = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(80,40)">
    <rect width="100" height="128" rx="8" fill="${C.paper}" stroke="${C.ink}" stroke-width="2"/>
    <rect x="10" y="14" width="40" height="8" rx="2" fill="${C.ink}"/>
    <rect x="10" y="28" width="80" height="4" rx="2" fill="${C.ink}" opacity=".4"/>
    <rect x="10" y="42" width="80" height="36" rx="4" fill="${C.cream}"/>
    <polyline points="14,72 28,60 42,66 56,52 70,58 86,48" fill="none" stroke="${C.coral}" stroke-width="2"/>
    <rect x="10" y="86" width="80" height="4" rx="2" fill="${C.ink}" opacity=".4"/>
    <rect x="10" y="94" width="60" height="4" rx="2" fill="${C.ink}" opacity=".4"/>
    <rect x="10" y="102" width="70" height="4" rx="2" fill="${C.ink}" opacity=".4"/>
  </g>
  <g transform="translate(170,140) rotate(20)">
    <rect width="60" height="22" rx="6" fill="${C.yel}"/>
    <rect x="8" y="8" width="44" height="6" rx="2" fill="${C.ink}"/>
  </g>
`);

ill.api = vb(`
  <rect x="10" y="14" width="240" height="172" rx="14" fill="${C.paper}"/>
  <g transform="translate(130,100)">
    <rect x="-60" y="-44" width="120" height="88" rx="10" fill="${C.violet}"/>
    <rect x="-50" y="-32" width="100" height="6" rx="2" fill="${C.paper}"/>
    <rect x="-50" y="-20" width="60" height="4" rx="2" fill="${C.paper}" opacity=".6"/>
    <rect x="-50" y="-10" width="80" height="4" rx="2" fill="${C.paper}" opacity=".6"/>
    <rect x="-50" y="0" width="50" height="4" rx="2" fill="${C.paper}" opacity=".6"/>
    <rect x="-50" y="14" width="100" height="20" rx="4" fill="${C.ink}"/>
    <rect x="-44" y="22" width="14" height="4" rx="2" fill="${C.yel}"/>
    <rect x="-26" y="22" width="34" height="4" rx="2" fill="${C.teal}"/>
  </g>
  <text x="60" y="50" font-family="DM Sans" font-weight="900" font-size="20" fill="${C.coral}">&lt;/&gt;</text>
  <text x="180" y="170" font-family="DM Sans" font-weight="900" font-size="20" fill="${C.teal}">{ }</text>
`);

// ---------- index of items by section ----------
const SECTIONS = [
  {
    id:'dashboards',
    title:`<span class="accent">Dashboards</span> &amp; charts`,
    sub:'Slot these into your analytics pages, status cards and reports.',
    pack:'Download Dashboards Pack',
    items:[
      {n:'01', name:'Revenue Dashboard', svg:ill.revenue, isNew:false},
      {n:'02', name:'Pie Chart Card', svg:ill.pie},
      {n:'03', name:'Bar Chart', svg:ill.bars},
      {n:'04', name:'Line Chart', svg:ill.line},
      {n:'05', name:'KPI Cards', svg:ill.kpi},
      {n:'06', name:'Funnel Chart', svg:ill.funnel},
      {n:'07', name:'Map Analytics', svg:ill.map},
      {n:'08', name:'Activity Feed', svg:ill.activity},
      {n:'09', name:'Heatmap', svg:ill.heatmap},
      {n:'10', name:'Cohort Retention', svg:ill.cohort},
    ]
  },
  {
    id:'new',
    title:`<span class="accent">10 New</span> screens`,
    sub:'Fresh additions to the kit — empty states, auth screens, and team UI.',
    pack:'Download New Pack',
    items:[
      {n:'NEW 119', name:'Login Screen', svg:ill.login, isNew:true},
      {n:'NEW 118', name:'Sign-up Flow', svg:ill.signup, isNew:true},
      {n:'NEW 117', name:'Empty Inbox', svg:ill.inbox_empty, isNew:true},
      {n:'NEW 116', name:'No Notifications', svg:ill.no_notifications, isNew:true},
      {n:'NEW 115', name:'Pricing Table', svg:ill.pricing, isNew:true},
      {n:'NEW 114', name:'Settings', svg:ill.settings, isNew:true},
      {n:'NEW 113', name:'User Profile', svg:ill.profile, isNew:true},
      {n:'NEW 112', name:'File Upload', svg:ill.upload, isNew:true},
      {n:'NEW 111', name:'Search Results', svg:ill.search, isNew:true},
      {n:'NEW 110', name:'Invite Teammates', svg:ill.team, isNew:true},
    ]
  },
  {
    id:'all',
    title:`<span class="accent">Explore</span> all`,
    sub:'',
    pack:'',
    items:[
      {n:'Day 1', name:'Kanban Board', svg:ill.kanban},
      {n:'Day 2', name:'Live Chat', svg:ill.chat},
      {n:'Day 3', name:'Video Meeting', svg:ill.video},
      {n:'Day 4', name:'Scheduling Calendar', svg:ill.calendar},
      {n:'Day 5', name:'Onboarding Tour', svg:ill.onboarding},
      {n:'Day 6', name:'Billing &amp; Plans', svg:ill.billing},
      {n:'Day 7', name:'404 Page', svg:ill.empty404},
      {n:'Day 8', name:'Launch / Rocket', svg:ill.rocket},
      {n:'Day 9', name:'Support Bot', svg:ill.support},
      {n:'Day 10', name:'AI Assistant', svg:ill.ai},
      {n:'Day 11', name:'Forgot Password', svg:ill.password},
      {n:'Day 12', name:'Celebrate / Confetti', svg:ill.celebrate},
      {n:'Day 13', name:'Integrations', svg:ill.integration},
      {n:'Day 14', name:'Code Editor', svg:ill.coding},
      {n:'Day 15', name:'Mobile App', svg:ill.mobile_app},
      {n:'Day 16', name:'Export Report', svg:ill.report},
      {n:'Day 17', name:'API Reference', svg:ill.api},
      {n:'Day 18', name:'2FA / OTP', svg:null, soon:true},
    ]
  }
];

// ---------- render ----------
function cardHTML(item){
  const newCls = item.isNew ? ' new' : '';
  const soonCls = item.soon ? ' soon' : '';
  const inner = item.svg || `<svg viewBox="0 0 260 200"><rect x="40" y="40" width="180" height="120" rx="14" fill="${C.soft}" stroke="${C.ink}" stroke-width="2" stroke-dasharray="6 6"/><text x="130" y="108" text-anchor="middle" font-family="DM Sans" font-weight="900" font-size="16" fill="${C.ink}" opacity=".5">SOON</text></svg>`;
  return `
    <div class="card${newCls}${soonCls}">
      <div class="frame">${inner}</div>
      <div class="meta">
        <div class="name"><span class="num">${item.n}</span>${item.name}</div>
        <div class="dl"><a href="#">SVG</a><a href="#">PNG</a></div>
      </div>
    </div>`;
}

function sectionHTML(sec){
  const cards = sec.items.map(cardHTML).join('');
  const foot = sec.pack ? `
    <div class="section-foot"><a href="#">↓ ${sec.pack}</a></div>
    <div class="mini-dl">
      <h5>Download all</h5>
      <div class="dl-list">
        <a href="#"><span>All Files (Gumroad)</span><span class="arr">↗</span></a>
        <a href="#"><span>AI, SVG &amp; PNG</span><span class="arr">↗</span></a>
        <a href="#"><span>EPS</span><span class="arr">↗</span></a>
        <a href="#"><span>Get Figma</span><span class="arr">↗</span></a>
      </div>
    </div>` : '';
  return `
    <section class="kit" id="${sec.id}">
      <h2 class="section-title">${sec.title}</h2>
      ${sec.sub ? `<p style="margin:-14px 0 28px;color:#3a3a3a;max-width:520px">${sec.sub}</p>` : ''}
      <div class="grid">${cards}</div>
      ${foot}
    </section>`;
}

document.getElementById('kit-mount').innerHTML = SECTIONS.map(sectionHTML).join('');
