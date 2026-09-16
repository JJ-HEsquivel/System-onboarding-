/* ============================================================
   Jalasoft · Plataforma de Inducción y Micro aprendizaje
   app.js — Lógica de la aplicación (SPA sin dependencias)
   ============================================================ */

/* ------------------------------------------------------------
   0. Utilidades
------------------------------------------------------------ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

const esc = (s) => String(s).replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
const ini = (n) => n.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const fechaLarga = (iso) => {
  if (!iso) return '—';
  const m = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''));
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
};
const diasDesde = (iso) => Math.round((new Date('2026-09-16T00:00:00') - new Date(iso + 'T00:00:00')) / 864e5);

const ICO = {
  home:'<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  route:'<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h5a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h5"/>',
  check:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  chart:'<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>',
  bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 7 2.6h.1A1.6 1.6 0 0 0 8.7 1V1a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 15 2.6h.1a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1h.1a2 2 0 1 1 0 4H21a1.6 1.6 0 0 0-1.6 1"/>',
  book:'<path d="M4 19.5V6a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v13"/><path d="M6 17h12"/>',
  chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="m8.2 13.4-1.4 7.6L12 18l5.2 3-1.4-7.6"/>',
  layers:'<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  down:'<path d="M12 5v14"/><path d="m5 12 7 7 7-7"/>',
  alert:'<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7"/><circle cx="12" cy="12" r="3"/>',
  send:'<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>'
};
const svg = (p, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

/* ------------------------------------------------------------
   1. Estado
------------------------------------------------------------ */
const S = {
  user: null,
  rolSel: 'admin',
  view: 'dashboard',
  misDocs: JSON.parse(JSON.stringify(DB.misDocumentos)),
  misEvals: JSON.parse(JSON.stringify(DB.misEvaluaciones)),
  pildoras: JSON.parse(JSON.stringify(DB.pildoras)),
  colaboradores: JSON.parse(JSON.stringify(DB.colaboradores)),
  evidencias: JSON.parse(JSON.stringify(DB.evidencias)),
  notifs: JSON.parse(JSON.stringify(DB.notificaciones)),
  campanas: JSON.parse(JSON.stringify(DB.campanas)),
  documentos: JSON.parse(JSON.stringify(DB.documentos)),
  noLeidas: 5,
  chat: [],
  quiz: null,
  filtro: { area: '', estado: '', q: '' }
};

const doc  = (id) => S.documentos.find(d => d.id === id);
const evalu = (id) => DB.evaluaciones.find(e => e.id === id);
const areaNom = (id) => (DB.areas.find(a => a.id === id) || {}).nombre || id;

/* ------------------------------------------------------------
   2. Navegación por rol
------------------------------------------------------------ */
const NAV = {
  admin: [
    { g: 'Operación' },
    { id:'dashboard',    t:'Panel general',        i:'home' },
    { id:'colaboradores',t:'Colaboradores',        i:'users', badge:() => S.colaboradores.filter(c => c.estado === 'atrasado').length, alert:true },
    { id:'documentos',   t:'Documentos',           i:'file' },
    { id:'rutas',        t:'Rutas de aprendizaje', i:'route' },
    { g: 'Conocimiento' },
    { id:'evaluaciones', t:'Evaluaciones',         i:'check' },
    { id:'micro',        t:'Micro aprendizaje',    i:'zap' },
    { id:'analitica',    t:'Analítica y brechas',  i:'chart' },
    { g: 'Control' },
    { id:'notificaciones',t:'Automatizaciones',    i:'bell' },
    { id:'evidencias',   t:'Evidencias',           i:'shield' },
    { id:'config',       t:'Configuración',        i:'gear' }
  ],
  manager: [
    { g: 'Mi equipo' },
    { id:'dashboard', t:'Panel del equipo', i:'home' },
    { id:'equipo',    t:'Colaboradores',    i:'users', badge:() => 2, alert:true },
    { id:'asignar',   t:'Asignar documentos', i:'file' },
    { id:'evaluaciones', t:'Resultados',    i:'check' },
    { g: 'Seguimiento' },
    { id:'notificaciones', t:'Escalamientos', i:'bell' },
    { id:'analitica', t:'Brechas del equipo', i:'chart' }
  ],
  colaborador: [
    { g: 'Mi inducción' },
    { id:'dashboard', t:'Mi progreso',       i:'home' },
    { id:'misdocs',   t:'Mis documentos',    i:'book', badge:() => S.misDocs.filter(d => d.estado === 'pendiente').length },
    { id:'misevals',  t:'Mis evaluaciones',  i:'check', badge:() => S.misEvals.filter(e => e.estado === 'pendiente').length, alert:true },
    { g: 'Continuo' },
    { id:'mimicro',   t:'Micro aprendizaje', i:'zap', badge:() => S.pildoras.filter(p => p.estado === 'pendiente').length },
    { id:'asistente', t:'Asistente documental', i:'chat' },
    { id:'certificados', t:'Mis constancias', i:'award' }
  ]
};

const TITULOS = {
  dashboard:['Panel general','Estado consolidado de la inducción, la comprensión y el refuerzo continuo.'],
  colaboradores:['Colaboradores','Seguimiento individual del avance, cumplimiento y riesgo de cada colaborador.'],
  documentos:['Documentos','Repositorio controlado con versiones, audiencia y desempeño en evaluaciones.'],
  rutas:['Rutas de aprendizaje','Fases, documentos obligatorios y plazos definidos por área y rol.'],
  evaluaciones:['Evaluaciones','Evaluaciones generadas por IA a partir de los documentos asignados.'],
  micro:['Micro aprendizaje','Campañas periódicas de refuerzo y concientización.'],
  analitica:['Analítica y brechas','Documentos con mayor índice de error y temas con baja comprensión.'],
  notificaciones:['Automatizaciones','Notificaciones, recordatorios y escalamientos ejecutados por el sistema.'],
  evidencias:['Evidencias de cumplimiento','Registro trazable para auditorías y requisitos normativos.'],
  config:['Configuración','Parámetros de plazos, escalamiento y generación de evaluaciones.'],
  equipo:['Mi equipo','Avance de cada colaborador a su cargo y casos que requieren atención.'],
  asignar:['Asignar documentos','Documentación específica adicional para los colaboradores de su equipo.'],
  misdocs:['Mis documentos','Lectura obligatoria asignada y su estado de confirmación.'],
  misevals:['Mis evaluaciones','Evaluaciones de comprensión pendientes y resultados obtenidos.'],
  mimicro:['Micro aprendizaje','Píldoras cortas para mantener vigente lo aprendido.'],
  asistente:['Asistente documental','Consulte las políticas y procedimientos en lenguaje natural.'],
  certificados:['Mis constancias','Evidencia de las lecturas y evaluaciones completadas.']
};

/* ------------------------------------------------------------
   3. Gráficos en SVG
------------------------------------------------------------ */
function lineChart(labels, series, { h = 230, max = 100 } = {}) {
  const W = 720, pl = 34, pr = 12, pt = 14, pb = 26;
  const iw = W - pl - pr, ih = h - pt - pb;
  const X = i => pl + (labels.length === 1 ? iw / 2 : i * iw / (labels.length - 1));
  const Y = v => pt + ih - (v / max) * ih;
  let g = '';
  for (let i = 0; i <= 4; i++) {
    const y = pt + ih * i / 4, v = Math.round(max - max * i / 4);
    g += `<line x1="${pl}" y1="${y}" x2="${W - pr}" y2="${y}" stroke="#EDF1F7" stroke-width="1"/>
          <text x="${pl - 8}" y="${y + 3.5}" text-anchor="end">${v}</text>`;
  }
  const paths = series.map((s, si) => {
    const pts = s.values.map((v, i) => `${X(i)},${Y(v)}`).join(' L');
    const area = `M${X(0)},${pt + ih} L${pts} L${X(s.values.length - 1)},${pt + ih} Z`;
    return `<path d="${area}" fill="${s.color}" opacity=".07"/>
            <path d="M${pts}" fill="none" stroke="${s.color}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
            ${s.values.map((v, i) => `<circle cx="${X(i)}" cy="${Y(v)}" r="${i === s.values.length - 1 ? 4 : 2.6}" fill="#fff" stroke="${s.color}" stroke-width="2"/>`).join('')}`;
  }).join('');
  const xl = labels.map((l, i) => `<text x="${X(i)}" y="${h - 6}" text-anchor="middle">${esc(l)}</text>`).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${h}" preserveAspectRatio="none" style="height:${h}px">${g}${paths}${xl}</svg>`;
}

function barChart(labels, values, color = '#1F53CE', { h = 200 } = {}) {
  const W = 520, pl = 30, pr = 10, pt = 12, pb = 24;
  const iw = W - pl - pr, ih = h - pt - pb, max = Math.max(...values) * 1.2 || 1;
  const bw = Math.min(42, iw / values.length * .55);
  let g = '';
  for (let i = 0; i <= 3; i++) {
    const y = pt + ih * i / 3;
    g += `<line x1="${pl}" y1="${y}" x2="${W - pr}" y2="${y}" stroke="#EDF1F7"/><text x="${pl - 7}" y="${y + 3.5}" text-anchor="end">${Math.round(max - max * i / 3)}</text>`;
  }
  const bars = values.map((v, i) => {
    const cx = pl + (i + .5) * iw / values.length, bh = (v / max) * ih;
    return `<rect x="${cx - bw / 2}" y="${pt + ih - bh}" width="${bw}" height="${bh}" rx="4" fill="${color}" opacity="${i === values.length - 1 ? 1 : .78}"/>
            <text x="${cx}" y="${pt + ih - bh - 6}" text-anchor="middle" style="fill:#41506A;font-weight:600">${v}</text>
            <text x="${cx}" y="${h - 5}" text-anchor="middle">${esc(labels[i])}</text>`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${h}" style="height:${h}px">${g}${bars}</svg>`;
}

const COLORES = { ok:'#0E7A56', info:'#1F53CE', warn:'#D99A12', muted:'#9AA8BF', accent:'#E8620F' };

function donut(items, size = 156) {
  const total = items.reduce((a, b) => a + b.valor, 0) || 1;
  const r = size / 2 - 14, c = 2 * Math.PI * r;
  let off = 0;
  const arcs = items.map(it => {
    const len = it.valor / total * c;
    const s = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${COLORES[it.color]}" stroke-width="15"
      stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-off}" transform="rotate(-90 ${size / 2} ${size / 2})" stroke-linecap="butt"/>`;
    off += len; return s;
  }).join('');
  return `<div class="donutwrap">
    <div style="position:relative;width:${size}px;height:${size}px;flex:none">
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${arcs}</svg>
      <div class="ring__c"><b class="num">${total}</b><small>colaboradores</small></div>
    </div>
    <div class="donut__list">${items.map(i => `<div class="donut__row"><i style="background:${COLORES[i.color]}"></i>${i.label}<b class="num">${i.valor}</b></div>`).join('')}</div>
  </div>`;
}

function ring(p, size = 96, label = 'completado', color = '#1F53CE') {
  const r = size / 2 - 7, c = 2 * Math.PI * r;
  return `<div class="ring" style="width:${size}px;height:${size}px">
    <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#EAEEF5" stroke-width="9"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"
        stroke-dasharray="${c * p / 100} ${c}"/>
    </svg>
    <div class="ring__c"><b class="num">${p}%</b><small>${label}</small></div></div>`;
}

function spark(values, color = '#1F53CE') {
  const W = 78, H = 28, max = Math.max(...values), min = Math.min(...values);
  const pts = values.map((v, i) => `${i * W / (values.length - 1)},${H - ((v - min) / (max - min || 1)) * (H - 4) - 2}`).join(' L');
  return `<svg class="kpi__spark" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><path d="M${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/></svg>`;
}

/* ------------------------------------------------------------
   4. Componentes reutilizables
------------------------------------------------------------ */
const kpi = (l, v, sub, trend, spk) => `
  <div class="kpi">
    ${spk || ''}
    <div class="kpi__l">${l}</div>
    <div class="kpi__v num">${v}</div>
    <div class="kpi__d">${trend || ''}<span>${sub}</span></div>
  </div>`;

const trend = (dir, txt) => `<span class="trend trend--${dir}">${dir === 'up' ? '▲' : dir === 'down' ? '▼' : '■'} ${txt}</span>`;

const bar = (p, cls = '') => `<div class="barline"><div class="bar"><i class="${cls}" style="width:${p}%"></i></div><span class="num">${p}%</span></div>`;

const ESTADOS = {
  completado:['ok','Completado'], en_curso:['info','En curso'],
  atrasado:['danger','Atrasado'], por_iniciar:['muted','Por iniciar']
};
const badgeEstado = (e) => `<span class="badge badge--${ESTADOS[e][0]}">${ESTADOS[e][1]}</span>`;
const persona = (nombre, sub) => `<div class="person"><span class="av">${ini(nombre)}</span><span style="min-width:0"><b>${esc(nombre)}</b><small>${esc(sub)}</small></span></div>`;

function toast(titulo, texto, tipo = '') {
  const t = document.createElement('div');
  t.className = 'toast' + (tipo ? ' toast--' + tipo : '');
  t.innerHTML = `<span class="toast__i">${svg(tipo === 'ia' ? ICO.spark : tipo === 'warn' ? ICO.alert : '<path d="M20 6 9 17l-5-5"/>')}</span>
    <div><b>${esc(titulo)}</b><p>${esc(texto)}</p></div>`;
  $('#toasts').appendChild(t);
  setTimeout(() => { t.style.transition = 'opacity .3s,transform .3s'; t.style.opacity = 0; t.style.transform = 'translateX(14px)'; setTimeout(() => t.remove(), 320); }, 4200);
}

function modal(html, cls = '') {
  const m = $('#modal');
  m.className = 'modal ' + cls;
  m.innerHTML = html;
  $('#ov').classList.add('is-on');
  document.body.style.overflow = 'hidden';
}
function closeModal() { $('#ov').classList.remove('is-on'); document.body.style.overflow = ''; }
function drawer(html) { $('#drawer').innerHTML = html; $('#drawer').classList.add('is-on'); }
function closeDrawer() { $('#drawer').classList.remove('is-on'); }

const modalHead = (t, s) => `<div class="modal__head"><div style="flex:1"><h3>${esc(t)}</h3><p>${esc(s)}</p></div>
  <button class="iconbtn" data-close>${svg(ICO.x)}</button></div>`;

/* ------------------------------------------------------------
   5. Login
------------------------------------------------------------ */
function pintarRoles() {
  const desc = {
    admin:'Configura el sistema, la documentación y las campañas.',
    manager:'Asigna documentación y monitorea el avance de su equipo.',
    colaborador:'Completa lecturas, evaluaciones y micro aprendizaje.'
  };
  $('#roleList').innerHTML = DB.usuarios.map(u => `
    <button class="rolecard" data-rol="${u.rol}" aria-pressed="${u.rol === S.rolSel}">
      <span class="rolecard__av">${ini(u.nombre)}</span>
      <span style="min-width:0">
        <span class="rolecard__t">${u.rol === 'admin' ? 'Administrador' : u.rol === 'manager' ? 'Manager' : 'Colaborador'} · ${esc(u.nombre)}</span>
        <span class="rolecard__s">${desc[u.rol]}</span>
      </span>
    </button>`).join('');
  $('#loginMail').value = DB.usuarios.find(u => u.rol === S.rolSel).correo;
  $$('.rolecard').forEach(b => b.onclick = () => { S.rolSel = b.dataset.rol; pintarRoles(); });
}

function entrar() {
  S.user = DB.usuarios.find(u => u.rol === S.rolSel);
  S.view = 'dashboard';
  $('#login').style.display = 'none';
  $('#app').classList.add('is-on');
  $('#userName').textContent = S.user.nombre;
  $('#userRole').textContent = S.user.cargo;
  $('#userAv').textContent = ini(S.user.nombre);
  S.chat = [{ me: false, t: `Hola ${S.user.nombre.split(' ')[0]}. Puedo responder sobre las políticas y procedimientos que tiene asignados, citando el documento y la sección de origen. ¿Qué necesita consultar?` }];
  render();
  toast('Sesión iniciada', `Bienvenido, ${S.user.nombre.split(' ')[0]}.`, 'info');
}

function salir() {
  $('#app').classList.remove('is-on');
  $('#login').style.display = '';
  closeModal(); closeDrawer(); $('#pop').classList.remove('is-on');
}

/* ------------------------------------------------------------
   6. Render general
------------------------------------------------------------ */
function render() {
  const rol = S.user.rol;
  const items = NAV[rol];
  if (!items.some(i => i.id === S.view)) S.view = 'dashboard';

  $('#nav').innerHTML = items.map(i => {
    if (i.g) return `<div class="rail__group">${i.g}</div>`;
    const b = i.badge ? i.badge() : 0;
    return `<button class="navitem ${i.id === S.view ? 'is-active' : ''}" data-view="${i.id}">
      ${svg(ICO[i.i])}<span>${i.t}</span>${b ? `<span class="pill ${i.alert ? 'is-alert' : ''} num">${b}</span>` : ''}</button>`;
  }).join('');
  $$('.navitem').forEach(b => b.onclick = () => { S.view = b.dataset.view; closeDrawer(); $('#rail').classList.remove('is-on'); render(); window.scrollTo(0, 0); });

  const rolTxt = rol === 'admin' ? 'Administración' : rol === 'manager' ? 'Manager' : 'Colaborador';
  const [tt] = TITULOS[S.view] || ['—'];
  $('#crumb').innerHTML = `${rolTxt} <span style="opacity:.5">/</span> <b>${tt}</b>`;

  const V = VISTAS[rol][S.view] || (() => '<div class="empty"><b>Módulo en construcción</b></div>');
  $('#view').innerHTML = V();
  bindVista();
  pintarPop();
}

const head = (v, acciones = '') => {
  const [t, d] = TITULOS[v];
  return `<div class="page__head"><div><h1>${t}</h1><p>${d}</p></div><div class="page__actions">${acciones}</div></div>`;
};

/* ------------------------------------------------------------
   7. Vistas · ADMINISTRADOR
------------------------------------------------------------ */
function vAdminDashboard() {
  const cols = S.colaboradores;
  const enCurso = cols.filter(c => c.estado === 'en_curso').length;
  const atrasados = cols.filter(c => c.estado === 'atrasado').length;
  const prom = Math.round(cols.filter(c => c.promedio).reduce((a, c) => a + c.promedio, 0) / cols.filter(c => c.promedio).length);
  const s = DB.series.cumplimientoSemanal;

  return head('dashboard', `
    <button class="btn" data-act="export">${svg(ICO.down)} Exportar reporte</button>
    <button class="btn btn--primary" data-act="nuevo-col">${svg(ICO.plus)} Registrar colaborador</button>`) + `

  <div class="grid g-4">
    ${kpi('Cumplimiento de lectura', '89%', 'Meta trimestral 85%', trend('up', '+5 pts'), spark(s.lectura))}
    ${kpi('Comprensión promedio', prom + '%', 'Mínimo de aprobación 80%', trend('up', '+3 pts'), spark(s.evaluacion, '#0E7A56'))}
    ${kpi('Inducciones en curso', enCurso, `${atrasados} requieren atención`, trend('flat', 'estable'), '')}
    ${kpi('Documentos controlados', S.documentos.length, '2 publicados esta semana', trend('up', '+2'), '')}
  </div>

  <div class="grid g-72 mt-16">
    <section class="card">
      <div class="card__head">
        <div><h3>Evolución del cumplimiento</h3><p>Últimas 12 semanas · lectura confirmada frente a evaluaciones aprobadas</p></div>
        <div class="right"><span class="tag">2026</span></div>
      </div>
      <div class="card__body">
        ${lineChart(s.labels, [
          { name:'Lectura confirmada', color:'#1F53CE', values:s.lectura },
          { name:'Evaluación aprobada', color:'#0E7A56', values:s.evaluacion }
        ])}
        <div class="legend"><span><i style="background:#1F53CE"></i>Lectura confirmada</span><span><i style="background:#0E7A56"></i>Evaluación aprobada</span></div>
      </div>
    </section>

    <section class="card">
      <div class="card__head"><div><h3>Estado de las inducciones</h3><p>Distribución actual</p></div></div>
      <div class="card__body">${donut(DB.series.distribucionEstados)}</div>
    </section>
  </div>

  <div class="grid g-64 mt-16">
    <section class="card">
      <div class="card__head">
        <div><h3>Colaboradores que requieren atención</h3><p>Ordenados por nivel de riesgo y días sin actividad</p></div>
        <div class="right"><button class="btn btn--sm" data-view-go="colaboradores">Ver todos</button></div>
      </div>
      <div class="card__body card__body--flush tablewrap">
        <table class="tbl"><thead><tr>
          <th>Colaborador</th><th>Área</th><th>Fase</th><th>Avance</th><th>Última actividad</th><th>Estado</th><th></th>
        </tr></thead><tbody>
        ${cols.filter(c => c.riesgo !== 'bajo').sort((a, b) => a.progreso - b.progreso).slice(0, 6).map(c => `
          <tr class="clickrow" data-col="${c.id}">
            <td>${persona(c.nombre, c.cargo)}</td>
            <td>${areaNom(c.area)}</td>
            <td class="num">${c.fase} de 5</td>
            <td style="min-width:130px">${bar(c.progreso, c.progreso < 40 ? 'danger' : c.progreso < 70 ? 'warn' : '')}</td>
            <td class="muted">${c.ultimaActividad}</td>
            <td>${badgeEstado(c.estado)}</td>
            <td class="r"><button class="btn btn--sm" data-recordar="${c.id}">Recordar</button></td>
          </tr>`).join('')}
        </tbody></table>
      </div>
    </section>

    <div class="stack">
      <section class="card ia">
        <div class="card__head">
          <div><h3>Sugerencias de la IA</h3><p>Generadas a partir de los resultados de las últimas 4 semanas</p></div>
          <div class="right"><span class="ia__badge">${svg(ICO.spark)} IA</span></div>
        </div>
        <div class="card__body">
          ${DB.sugerenciasIA.slice(0, 3).map(s2 => `
            <div class="sugg">
              <div class="sugg__b">
                <b>${esc(s2.t)}</b>
                <p>${esc(s2.d)}</p>
                <button class="btn btn--sm" data-act="ia-accion" data-txt="${esc(s2.accion)}">${esc(s2.accion)}</button>
                <span class="tag ${s2.impacto === 'alto' ? 'tag--ai' : ''}">Impacto ${s2.impacto}</span>
              </div>
            </div>`).join('')}
        </div>
      </section>

      <section class="card">
        <div class="card__head"><div><h3>Actividad de hoy</h3><p>16 de septiembre de 2026</p></div></div>
        <div class="card__body">
          <ul class="feed">
            ${DB.actividad.map(a => {
              const cls = a.tipo === 'ia' ? 'ia' : a.tipo === 'hito' || a.tipo === 'lectura' ? 'ok' : a.tipo === 'evaluacion' ? 'warn' : 'brand';
              const ic = a.tipo === 'ia' ? ICO.spark : a.tipo === 'documento' ? ICO.file : a.tipo === 'evaluacion' ? ICO.alert : a.tipo === 'sistema' ? ICO.bell : ICO.check;
              return `<li><span class="feed__i ${cls}">${svg(ic)}</span><span><b>${esc(a.t)}</b><small>${a.h}</small></span></li>`;
            }).join('')}
          </ul>
        </div>
      </section>
    </div>
  </div>

  <section class="card mt-16">
    <div class="card__head">
      <div><h3>Documentos con mayor índice de error</h3><p>Preguntas falladas sobre el total de intentos registrados</p></div>
      <div class="right"><button class="btn btn--sm" data-view-go="analitica">Abrir analítica</button></div>
    </div>
    <div class="card__body">
      ${DB.series.brechas.map(b => `
        <div class="gap">
          <div><b>${esc(b.tema)}</b><small>${esc(b.doc)} · ${b.afectados} colaboradores afectados</small></div>
          <div class="gap__bar"><i style="width:${b.error * 2}%;background:${b.error > 40 ? '#B4342A' : b.error > 30 ? '#D99A12' : '#1F53CE'}"></i></div>
          <div class="gap__v">${b.error}%</div>
        </div>`).join('')}
    </div>
  </section>`;
}

function vColaboradores() {
  const f = S.filtro;
  const lista = S.colaboradores.filter(c =>
    (!f.area || c.area === f.area) && (!f.estado || c.estado === f.estado));
  return head('colaboradores', `
    <button class="btn" data-act="asignar-masivo">${svg(ICO.file)} Asignación masiva</button>
    <button class="btn btn--primary" data-act="nuevo-col">${svg(ICO.plus)} Registrar colaborador</button>`) + `

  <div class="grid g-4">
    ${kpi('Total activos', S.colaboradores.length, 'En proceso o completados', '', '')}
    ${kpi('Completados', S.colaboradores.filter(c => c.estado === 'completado').length, 'Ruta de inducción cerrada', trend('up', '+3'), '')}
    ${kpi('Atrasados', S.colaboradores.filter(c => c.estado === 'atrasado').length, 'Con escalamiento activo', trend('down', '-1'), '')}
    ${kpi('Tiempo medio de cierre', '11 d', 'Meta: 14 días', trend('up', '-2 d'), '')}
  </div>

  <section class="card mt-16">
    <div class="filters">
      <input type="search" id="fq" placeholder="Buscar por nombre o cargo" value="${esc(f.q)}">
      <select id="fArea"><option value="">Todas las áreas</option>${DB.areas.map(a => `<option value="${a.id}" ${f.area === a.id ? 'selected' : ''}>${a.nombre}</option>`).join('')}</select>
      <select id="fEstado"><option value="">Todos los estados</option>${Object.entries(ESTADOS).map(([k, v]) => `<option value="${k}" ${f.estado === k ? 'selected' : ''}>${v[1]}</option>`).join('')}</select>
      <span class="spacer"></span>
      <span class="small muted num">${lista.length} resultados</span>
      <button class="btn btn--sm" data-act="export">${svg(ICO.down)} CSV</button>
    </div>
    <div class="tablewrap">
      <table class="tbl" id="tblCols"><thead><tr>
        <th>Colaborador</th><th>Área</th><th>Manager</th><th>Ingreso</th><th>Fase</th><th>Avance</th><th>Promedio</th><th>Pendientes</th><th>Estado</th><th></th>
      </tr></thead><tbody>
      ${lista.map(c => `
        <tr class="clickrow" data-col="${c.id}">
          <td>${persona(c.nombre, c.cargo)}</td>
          <td>${areaNom(c.area)}</td>
          <td>${esc(c.manager)}</td>
          <td class="num">${fechaLarga(c.ingreso)}</td>
          <td class="num">${c.fase}/5</td>
          <td style="min-width:130px">${bar(c.progreso, c.progreso < 40 ? 'danger' : c.progreso < 70 ? 'warn' : 'ok')}</td>
          <td class="num">${c.promedio ? c.promedio + '%' : '—'}</td>
          <td class="num">${c.pendientes}</td>
          <td>${badgeEstado(c.estado)}</td>
          <td class="r"><button class="btn btn--sm" data-col-open="${c.id}">Ver ficha</button></td>
        </tr>`).join('') || `<tr><td colspan="10" class="tbl__empty">Ningún colaborador coincide con los filtros aplicados.</td></tr>`}
      </tbody></table>
    </div>
  </section>`;
}

function vDocumentos() {
  return head('documentos', `
    <button class="btn" data-act="ia-lote">${svg(ICO.spark)} Generar evaluaciones en lote</button>
    <button class="btn btn--primary" data-act="nuevo-doc">${svg(ICO.plus)} Publicar documento</button>`) + `

  <div class="grid g-4">
    ${kpi('Documentos vigentes', S.documentos.length, '9 obligatorios para toda la organización', '', '')}
    ${kpi('Publicados este mes', '2', 'Política de IA v1.3 y Seguridad v4.2', trend('up', '+2'), '')}
    ${kpi('Lectura confirmada', '89%', '2 214 confirmaciones registradas', trend('up', '+5 pts'), '')}
    ${kpi('Índice de error medio', '26%', 'Sobre 3 128 preguntas respondidas', trend('down', '-4 pts'), '')}
  </div>

  <section class="card mt-16">
    <div class="filters">
      <input type="search" id="fq" placeholder="Buscar por título, código o propietario">
      <select id="fCat"><option value="">Todas las categorías</option>${DB.categorias.map(c => `<option>${c}</option>`).join('')}</select>
      <span class="spacer"></span>
      <span class="chip is-on">Todos</span><span class="chip">Críticos</span><span class="chip">Actualizados</span>
    </div>
    <div class="tablewrap">
      <table class="tbl" id="tblDocs"><thead><tr>
        <th>Documento</th><th>Categoría</th><th>Versión</th><th>Criticidad</th><th>Audiencia</th><th>Lectura</th><th>Índice de error</th><th>Actualizado</th><th></th>
      </tr></thead><tbody>
      ${S.documentos.map(d => `
        <tr class="clickrow" data-doc="${d.id}">
          <td><b style="font-weight:560">${esc(d.titulo)}</b><br><small class="muted">${d.codigo} · ${d.propietario}</small></td>
          <td>${esc(d.categoria)}</td>
          <td><span class="tag">v${d.version}</span> ${d.estado === 'actualizado' ? '<span class="badge badge--warn">Nuevo</span>' : d.estado === 'en revision' ? '<span class="badge badge--info">En revisión</span>' : ''}</td>
          <td><span class="badge badge--${d.criticidad === 'alta' ? 'danger' : d.criticidad === 'media' ? 'warn' : 'muted'}">${d.criticidad}</span></td>
          <td class="num">${d.asignados}</td>
          <td style="min-width:120px">${bar(pct(d.leidos, d.asignados), pct(d.leidos, d.asignados) > 85 ? 'ok' : 'warn')}</td>
          <td class="num" style="color:${d.indiceError > 40 ? 'var(--danger)' : d.indiceError > 30 ? 'var(--warn)' : 'inherit'};font-weight:600">${d.indiceError}%</td>
          <td class="num muted">${fechaLarga(d.actualizado)}</td>
          <td class="r"><button class="btn btn--sm" data-doc-open="${d.id}">Abrir</button></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </section>`;
}

function vRutas() {
  const rutas = [
    { n:'Ruta base corporativa', a:'Todas las áreas', docs:['DOC-010','DOC-002','DOC-003','DOC-001','DOC-007'], dias:10, activos:248 },
    { n:'Ruta Engineering', a:'Engineering', docs:['DOC-011','DOC-005','DOC-008','DOC-004'], dias:15, activos:132 },
    { n:'Ruta Quality Control', a:'Quality Control', docs:['DOC-004','DOC-009','DOC-011','DOC-005'], dias:15, activos:78 },
    { n:'Ruta IT & Infraestructura', a:'IT & Infrastructure', docs:['DOC-006','DOC-001','DOC-005'], dias:12, activos:42 },
    { n:'Ruta Finance', a:'Finance', docs:['DOC-012','DOC-008'], dias:8, activos:26 }
  ];
  return head('rutas', `<button class="btn btn--primary" data-act="nueva-ruta">${svg(ICO.plus)} Crear ruta</button>`) + `

  <section class="card">
    <div class="card__head"><div><h3>Fases de la ruta de inducción</h3><p>Secuencia estándar que recorre todo colaborador nuevo</p></div>
      <div class="right"><span class="tag tag--brand">Plazo total: 15 días hábiles</span></div></div>
    <div class="card__body">
      <ol class="phases">
        ${DB.fases.map((f, i) => `<li class="phase ${i < 2 ? 'done' : i === 2 ? 'current' : ''}">
          <div class="phase__bar"></div>
          <div class="phase__n">Fase ${f.n}</div>
          <div class="phase__t">${f.nombre}</div>
          <div class="phase__d">${f.detalle}</div>
        </li>`).join('')}
      </ol>
    </div>
  </section>

  <div class="grid g-2 mt-16">
    ${rutas.map(r => `
      <section class="card">
        <div class="card__head">
          <div><h3>${r.n}</h3><p>${r.a} · ${r.dias} días hábiles · ${r.activos} colaboradores</p></div>
          <div class="right"><button class="btn btn--sm" data-act="editar-ruta">Editar</button></div>
        </div>
        <div class="card__body">
          <div class="doclist">
            ${r.docs.map(id => { const d = doc(id); return `
              <div class="docitem" style="padding:10px 12px">
                <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}" style="width:30px;height:34px">${svg(ICO.file)}</span>
                <span class="docitem__b"><b style="font-size:13.2px">${esc(d.titulo)}</b>
                  <span class="docitem__m"><span>v${d.version}</span><span>${d.minutos} min</span><span>${d.obligatorio ? 'Obligatorio' : 'Opcional'}</span></span></span>
              </div>`; }).join('')}
          </div>
        </div>
      </section>`).join('')}
  </div>`;
}

function vEvaluaciones() {
  return head('evaluaciones', `<button class="btn btn--ai" data-act="ia-generar">${svg(ICO.spark)} Generar evaluación con IA</button>`) + `

  <div class="grid g-4">
    ${kpi('Evaluaciones publicadas', DB.evaluaciones.length, 'Generadas por IA desde los documentos', '', '')}
    ${kpi('Tasa de aprobación', '82%', 'Mínimo exigido: 80%', trend('up', '+6 pts'), '')}
    ${kpi('Intentos registrados', '1 268', 'Últimos 90 días', trend('up', '+184'), '')}
    ${kpi('Reprobadas con reintento', '47', '38 aprobaron en el segundo intento', trend('flat', 'estable'), '')}
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Catálogo de evaluaciones</h3><p>Cada evaluación se regenera automáticamente cuando su documento cambia de versión</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr>
        <th>Evaluación</th><th>Documento</th><th>Preguntas</th><th>Duración</th><th>Mínimo</th><th>Origen</th><th>Publicada</th><th></th>
      </tr></thead><tbody>
      ${DB.evaluaciones.map(e => { const d = doc(e.docId); return `
        <tr>
          <td><b style="font-weight:560">${esc(e.titulo)}</b><br><small class="muted">${e.id}</small></td>
          <td>${esc(d.titulo)} <span class="tag">v${d.version}</span></td>
          <td class="num">${e.preguntas.length}</td>
          <td class="num">${e.minutos} min</td>
          <td class="num">${e.minimo}%</td>
          <td><span class="tag tag--ai">${esc(e.generadaPor)}</span></td>
          <td class="num muted">${fechaLarga(e.fecha)}</td>
          <td class="r"><button class="btn btn--sm" data-ev-prev="${e.id}">Previsualizar</button></td>
        </tr>`; }).join('')}
      </tbody></table>
    </div>
  </section>

  <section class="card mt-16 ia">
    <div class="card__head"><div><h3>Cómo se generan las preguntas</h3><p>Flujo automático ejecutado por el motor de IA</p></div>
      <div class="right"><span class="ia__badge">${svg(ICO.spark)} IA</span></div></div>
    <div class="card__body">
      <div class="grid g-4" style="gap:14px">
        ${[
          ['Analiza el documento','Segmenta el contenido por secciones y detecta obligaciones, plazos y umbrales.'],
          ['Extrae conceptos clave','Identifica las afirmaciones evaluables y descarta el contenido meramente descriptivo.'],
          ['Redacta preguntas','Genera preguntas de opción múltiple con distractores plausibles y su explicación.'],
          ['Calibra y publica','Ajusta la dificultad con el histórico de aciertos y publica la evaluación en la ruta.']
        ].map(([t, d], i) => `
          <div style="padding:14px;border:1px solid var(--line);border-radius:10px;background:#fff">
            <div class="tag tag--ai">Paso ${i + 1}</div>
            <b style="display:block;margin:9px 0 5px;font-size:13.6px">${t}</b>
            <p class="small muted" style="margin:0">${d}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function vMicro() {
  return head('micro', `<button class="btn btn--primary" data-act="nueva-campana">${svg(ICO.plus)} Crear campaña</button>`) + `

  <div class="grid g-4">
    ${kpi('Campañas activas', S.campanas.filter(c => c.estado === 'activa').length, '1 pausada · 1 en borrador', '', '')}
    ${kpi('Tasa de respuesta', '74%', 'Promedio de las campañas activas', trend('up', '+9 pts'), '')}
    ${kpi('Acierto promedio', '70%', 'Meta interna: 80%', trend('up', '+4 pts'), '')}
    ${kpi('Píldoras enviadas', '3 942', 'Últimos 90 días', trend('up', '+612'), '')}
  </div>

  <div class="grid g-64 mt-16">
    <section class="card">
      <div class="card__head"><div><h3>Campañas</h3><p>Refuerzo periódico sobre documentos vigentes y actualizados</p></div></div>
      <div class="card__body card__body--flush tablewrap">
        <table class="tbl"><thead><tr>
          <th>Campaña</th><th>Enfoque</th><th>Periodicidad</th><th>Alcance</th><th>Respuesta</th><th>Acierto</th><th>Estado</th><th>Próximo envío</th><th></th>
        </tr></thead><tbody>
        ${S.campanas.map(c => `
          <tr>
            <td><b style="font-weight:560">${esc(c.nombre)}</b><br><small class="muted">${esc(c.audiencia)}</small></td>
            <td><span class="tag ${c.enfoque === 'Refuerzo de brecha' ? 'tag--ai' : ''}">${esc(c.enfoque)}</span></td>
            <td>${c.periodicidad}</td>
            <td class="num">${c.alcance}</td>
            <td style="min-width:110px">${bar(c.respuesta)}</td>
            <td style="min-width:110px">${bar(c.acierto, c.acierto < 70 ? 'warn' : 'ok')}</td>
            <td>${c.estado === 'activa' ? '<span class="badge badge--ok">Activa</span>' : c.estado === 'pausada' ? '<span class="badge badge--warn">Pausada</span>' : '<span class="badge badge--muted">Borrador</span>'}</td>
            <td class="num muted">${c.proxima === '—' ? '—' : fechaLarga(c.proxima)}</td>
            <td class="r"><button class="btn btn--sm" data-camp="${c.id}">${c.estado === 'activa' ? 'Pausar' : 'Activar'}</button></td>
          </tr>`).join('')}
        </tbody></table>
      </div>
    </section>

    <div class="stack">
      <section class="card">
        <div class="card__head"><div><h3>Respuesta por semana</h3><p>Píldoras respondidas dentro de las 48 horas</p></div></div>
        <div class="card__body">${barChart(['S29','S30','S31','S32','S33','S34'], [148, 167, 159, 188, 201, 214], '#1F53CE')}</div>
      </section>
      <section class="card ia">
        <div class="card__head"><div><h3>Campaña sugerida</h3><p>Basada en la brecha con mayor crecimiento</p></div>
          <div class="right"><span class="ia__badge">${svg(ICO.spark)} IA</span></div></div>
        <div class="card__body">
          <b style="font-size:14px">Información que no puede compartirse con IA</b>
          <p class="small muted mt-8">47% de error en la Política de Uso de IA v1.3, concentrado en Engineering y QA. Se propone una campaña semanal de 3 píldoras durante 4 semanas, dirigida a 186 colaboradores.</p>
          <button class="btn btn--primary btn--sm mt-8" data-act="nueva-campana">Crear campaña sugerida</button>
        </div>
      </section>
    </div>
  </div>`;
}

function vAnalitica() {
  const s = DB.series.cumplimientoSemanal;
  return head('analitica', `<button class="btn" data-act="export">${svg(ICO.down)} Exportar analítica</button>`) + `

  <div class="grid g-4">
    ${kpi('Brechas abiertas', '6', 'Temas con error superior al 25%', trend('down', '-2'), '')}
    ${kpi('Documento más fallado', '47%', 'Política de Uso de IA v1.3', trend('up', '+6 pts'), '')}
    ${kpi('Área con mayor brecha', 'Engineering', '132 colaboradores evaluados', '', '')}
    ${kpi('Refuerzos aplicados', '18', 'Campañas derivadas de brechas', trend('up', '+5'), '')}
  </div>

  <div class="grid g-64 mt-16">
    <section class="card">
      <div class="card__head"><div><h3>Brechas de conocimiento</h3><p>Ordenadas por índice de error en las evaluaciones</p></div></div>
      <div class="card__body card__body--flush tablewrap">
        <table class="tbl"><thead><tr><th>Tema</th><th>Documento</th><th>Afectados</th><th>Índice de error</th><th>Tendencia</th><th></th></tr></thead><tbody>
        ${DB.series.brechas.map(b => `
          <tr>
            <td><b style="font-weight:560">${esc(b.tema)}</b></td>
            <td class="muted">${esc(b.doc)}</td>
            <td class="num">${b.afectados}</td>
            <td style="min-width:150px">${bar(b.error, b.error > 40 ? 'danger' : b.error > 30 ? 'warn' : '')}</td>
            <td>${b.tendencia === 'sube' ? '<span class="trend trend--down">▲ sube</span>' : b.tendencia === 'baja' ? '<span class="trend trend--up">▼ baja</span>' : '<span class="trend trend--flat">■ estable</span>'}</td>
            <td class="r"><button class="btn btn--sm" data-act="nueva-campana">Reforzar</button></td>
          </tr>`).join('')}
        </tbody></table>
      </div>
    </section>

    <div class="stack">
      <section class="card">
        <div class="card__head"><div><h3>Ingresos por mes</h3><p>Colaboradores incorporados en 2026</p></div></div>
        <div class="card__body">${barChart(DB.series.ingresosMes.labels, DB.series.ingresosMes.valores, '#0E7A56')}</div>
      </section>
      <section class="card">
        <div class="card__head"><div><h3>Comprensión por área</h3><p>Promedio de las evaluaciones aprobadas</p></div></div>
        <div class="card__body">
          ${DB.areas.map((a, i) => { const v = [84, 88, 90, 86, 81, 83][i];
            return `<div class="gap" style="grid-template-columns:1fr 150px 48px">
              <div><b>${a.nombre}</b></div>
              <div class="gap__bar"><i style="width:${v}%;background:${v >= 86 ? '#0E7A56' : '#1F53CE'}"></i></div>
              <div class="gap__v">${v}%</div></div>`; }).join('')}
        </div>
      </section>
    </div>
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Comprensión frente a lectura</h3><p>La distancia entre ambas curvas es la brecha real de comprensión</p></div></div>
    <div class="card__body">
      ${lineChart(s.labels, [
        { name:'Lectura', color:'#1F53CE', values:s.lectura },
        { name:'Comprensión', color:'#E8620F', values:s.evaluacion }
      ])}
      <div class="legend"><span><i style="background:#1F53CE"></i>Lectura confirmada</span><span><i style="background:#E8620F"></i>Comprensión verificada</span></div>
    </div>
  </section>`;
}

function vNotificaciones() {
  const tipos = { escalamiento:['danger', ICO.alert], recordatorio:['info', ICO.bell], actualizacion:['warn', ICO.file], vencimiento:['warn', ICO.clock], resultado:['danger', ICO.check], bienvenida:['ok', ICO.mail], campana:['info', ICO.zap] };
  return head('notificaciones', `<button class="btn" data-act="reglas">${svg(ICO.gear)} Reglas de automatización</button>`) + `

  <div class="grid g-4">
    ${kpi('Enviadas hoy', '68', 'Recordatorios, escalamientos y campañas', '', '')}
    ${kpi('Escalamientos activos', '2', 'A Iván Suárez y Patricia Nogales', trend('down', '-1'), '')}
    ${kpi('Tasa de apertura', '91%', 'Correo corporativo', trend('up', '+3 pts'), '')}
    ${kpi('Reglas activas', '9', '3 de escalamiento · 6 de recordatorio', '', '')}
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Registro de automatizaciones</h3><p>Acciones ejecutadas por el sistema sin intervención manual</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr><th>Tipo</th><th>Evento</th><th>Destinatario</th><th>Fecha y hora</th><th>Estado</th></tr></thead><tbody>
      ${S.notifs.map(n => { const [c, ic] = tipos[n.tipo] || ['muted', ICO.bell]; return `
        <tr>
          <td><span class="feed__i ${c === 'danger' ? 'warn' : c === 'ok' ? 'ok' : 'brand'}" style="display:inline-grid">${svg(ic)}</span></td>
          <td><b style="font-weight:560">${esc(n.titulo)}</b><br><small class="muted">${esc(n.detalle)}</small></td>
          <td>${esc(n.destino)}</td>
          <td class="num muted">${n.fecha}</td>
          <td>${n.estado === 'enviada' ? '<span class="badge badge--ok">Enviada</span>' : '<span class="badge badge--info">Programada</span>'}</td>
        </tr>`; }).join('')}
      </tbody></table>
    </div>
  </section>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Reglas configuradas</h3><p>Condiciones que disparan una acción automática</p></div></div>
    <div class="card__body">
      <div class="grid g-3" style="gap:14px">
        ${[
          ['Sin actividad por 3 días','Recordatorio al colaborador','activa'],
          ['Sin actividad por 5 días','Escalamiento al Manager','activa'],
          ['Vencimiento en 48 horas','Recordatorio al colaborador y copia al Manager','activa'],
          ['Evaluación reprobada','Reintento habilitado y aviso al Manager','activa'],
          ['Documento actualizado (cambio mayor)','Micro evaluación automática a los afectados','activa'],
          ['Ruta completada','Registro de evidencia y constancia al colaborador','activa']
        ].map(([c, a, e]) => `
          <div style="padding:14px;border:1px solid var(--line);border-radius:10px">
            <div class="row" style="justify-content:space-between"><b style="font-size:13.4px">${c}</b><span class="badge badge--ok">${e}</span></div>
            <p class="small muted" style="margin:7px 0 0">${a}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function vEvidencias() {
  return head('evidencias', `<button class="btn" data-act="export">${svg(ICO.down)} Exportar para auditoría</button>`) + `

  <div class="grid g-4">
    ${kpi('Evidencias registradas', '2 431', 'Lecturas y evaluaciones con sello de tiempo', '', '')}
    ${kpi('Cobertura de auditoría', '100%', 'Documentos obligatorios trazados', '', '')}
    ${kpi('Retención', '36 meses', 'Conforme al procedimiento de calidad', '', '')}
    ${kpi('Última exportación', '12 sep', 'Auditoría interna ISO 9001', '', '')}
  </div>

  <section class="card mt-16">
    <div class="filters">
      <input type="search" id="fq" placeholder="Buscar por colaborador o documento">
      <select><option>Todos los tipos</option><option>Confirmación de lectura</option><option>Evaluación aprobada</option><option>Evaluación reprobada</option></select>
      <span class="spacer"></span><span class="small muted">Registro inmutable · sello de tiempo y hash por evento</span>
    </div>
    <div class="tablewrap">
      <table class="tbl" id="tblEvd"><thead><tr><th>ID</th><th>Colaborador</th><th>Documento</th><th>Tipo de evidencia</th><th>Resultado</th><th>Fecha y hora</th><th>Hash</th></tr></thead><tbody>
      ${S.evidencias.map(e => `
        <tr>
          <td class="num">${e.id}</td>
          <td>${persona(e.colaborador, '')}</td>
          <td>${esc(e.documento)}</td>
          <td>${e.tipo.includes('reprobada') ? '<span class="badge badge--danger">' + e.tipo + '</span>' : e.tipo.includes('aprobada') ? '<span class="badge badge--ok">' + e.tipo + '</span>' : '<span class="badge badge--info">' + e.tipo + '</span>'}</td>
          <td class="num"><b>${e.resultado}</b></td>
          <td class="num muted">${e.fecha}</td>
          <td class="num muted">${e.hash}</td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </section>`;
}

function vConfig() {
  const campo = (l, v, tipo = 'text') => `<div class="field"><span class="login__label">${l}</span><input type="${tipo}" value="${v}"></div>`;
  return head('config') + `
  <div class="grid g-2">
    <section class="card">
      <div class="card__head"><div><h3>Plazos de la inducción</h3><p>Días hábiles asignados a cada fase</p></div></div>
      <div class="card__body">
        ${campo('Lectura documental (fase 2)', '5')}
        ${campo('Evaluación de comprensión (fase 3)', '3')}
        ${campo('Documentación específica (fase 4)', '5')}
        ${campo('Cierre y evidencia (fase 5)', '2')}
        <button class="btn btn--primary mt-8" data-act="guardar">Guardar cambios</button>
      </div>
    </section>

    <section class="card">
      <div class="card__head"><div><h3>Escalamiento</h3><p>Cuándo interviene el Manager</p></div></div>
      <div class="card__body">
        ${campo('Recordatorio tras días sin actividad', '3')}
        ${campo('Escalamiento al Manager tras días sin actividad', '5')}
        ${campo('Intentos permitidos por evaluación', '3')}
        ${campo('Puntaje mínimo de aprobación (%)', '80')}
        <button class="btn btn--primary mt-8" data-act="guardar">Guardar cambios</button>
      </div>
    </section>

    <section class="card span2">
      <div class="card__head"><div><h3>Motor de inteligencia artificial</h3><p>Parámetros de generación de preguntas y análisis de brechas</p></div>
        <div class="right"><span class="ia__badge">${svg(ICO.spark)} IA</span></div></div>
      <div class="card__body">
        <div class="grid g-3">
          ${campo('Preguntas por evaluación', '5')}
          ${campo('Distractores por pregunta', '3')}
          ${campo('Umbral de brecha (% de error)', '25')}
        </div>
        <div class="divider"></div>
        <div class="row wrap" style="gap:18px">
          ${[
            ['Regenerar evaluación al publicar una versión mayor', true],
            ['Proponer campañas de refuerzo automáticamente', true],
            ['Sugerir ajustes de redacción a los propietarios', true],
            ['Enviar resumen semanal a los Managers', false]
          ].map(([t, on]) => `<label class="row" style="gap:8px;font-size:13.2px"><input type="checkbox" ${on ? 'checked' : ''}> ${t}</label>`).join('')}
        </div>
      </div>
    </section>
  </div>`;
}

/* ------------------------------------------------------------
   8. Vistas · MANAGER
------------------------------------------------------------ */
const equipoDe = () => S.colaboradores.filter(c => c.manager === 'Iván Suárez');

function vManagerDashboard() {
  const eq = equipoDe();
  const prom = Math.round(eq.filter(c => c.promedio).reduce((a, c) => a + c.promedio, 0) / eq.filter(c => c.promedio).length);
  return head('dashboard', `<button class="btn btn--primary" data-act="asignar-doc">${svg(ICO.plus)} Asignar documento</button>`) + `

  <div class="grid g-4">
    ${kpi('Colaboradores a cargo', eq.length, `${eq.filter(c => c.estado === 'completado').length} con inducción cerrada`, '', '')}
    ${kpi('Avance promedio', Math.round(eq.reduce((a, c) => a + c.progreso, 0) / eq.length) + '%', 'Del total de fases asignadas', trend('up', '+7 pts'), '')}
    ${kpi('Comprensión promedio', prom + '%', 'Mínimo exigido 80%', trend('up', '+2 pts'), '')}
    ${kpi('Casos escalados', '1', 'Rodrigo Ferrufino · 6 días sin actividad', trend('flat', 'sin cambio'), '')}
  </div>

  <div class="grid g-64 mt-16">
    <section class="card">
      <div class="card__head"><div><h3>Avance del equipo</h3><p>Seguimiento individual por fase</p></div>
        <div class="right"><button class="btn btn--sm" data-view-go="equipo">Ver detalle</button></div></div>
      <div class="card__body card__body--flush tablewrap">
        <table class="tbl"><thead><tr><th>Colaborador</th><th>Ingreso</th><th>Fase</th><th>Avance</th><th>Promedio</th><th>Estado</th><th></th></tr></thead><tbody>
        ${eq.map(c => `
          <tr class="clickrow" data-col="${c.id}">
            <td>${persona(c.nombre, c.cargo)}</td>
            <td class="num">${fechaLarga(c.ingreso)}</td>
            <td class="num">${c.fase}/5</td>
            <td style="min-width:130px">${bar(c.progreso, c.progreso < 40 ? 'danger' : c.progreso < 70 ? 'warn' : 'ok')}</td>
            <td class="num">${c.promedio ? c.promedio + '%' : '—'}</td>
            <td>${badgeEstado(c.estado)}</td>
            <td class="r"><button class="btn btn--sm" data-recordar="${c.id}">Recordar</button></td>
          </tr>`).join('')}
        </tbody></table>
      </div>
    </section>

    <div class="stack">
      <section class="card">
        <div class="card__head"><div><h3>Requiere su atención</h3><p>Casos escalados por el sistema</p></div></div>
        <div class="card__body">
          <ul class="feed">
            <li><span class="feed__i warn">${svg(ICO.alert)}</span><span><b>Rodrigo Ferrufino acumula 6 días sin actividad</b><small>Fase 2 · 7 documentos pendientes · escalado hoy 08:12</small></span></li>
            <li><span class="feed__i warn">${svg(ICO.clock)}</span><span><b>Diego Salazar: la fase 3 vence en 2 días</b><small>Evaluación de comprensión pendiente</small></span></li>
            <li><span class="feed__i brand">${svg(ICO.file)}</span><span><b>Política de Uso de IA v1.3 sin confirmar</b><small>4 colaboradores de su equipo</small></span></li>
          </ul>
        </div>
      </section>
      <section class="card">
        <div class="card__head"><div><h3>Comprensión del equipo</h3><p>Últimas 12 semanas</p></div></div>
        <div class="card__body">${lineChart(DB.series.cumplimientoSemanal.labels, [{ color:'#0E7A56', values:[58, 61, 60, 65, 68, 67, 71, 74, 76, 79, 80, 83] }], { h: 180 })}</div>
      </section>
    </div>
  </div>`;
}

function vEquipo() {
  const eq = equipoDe();
  return head('equipo', `<button class="btn btn--primary" data-act="asignar-doc">${svg(ICO.plus)} Asignar documento</button>`) + `
  <section class="card">
    <div class="filters">
      <input type="search" id="fq" placeholder="Buscar en mi equipo">
      <span class="spacer"></span><span class="small muted num">${eq.length} colaboradores</span>
    </div>
    <div class="tablewrap">
      <table class="tbl" id="tblEq"><thead><tr><th>Colaborador</th><th>Ingreso</th><th>Fase</th><th>Avance</th><th>Pendientes</th><th>Promedio</th><th>Última actividad</th><th>Estado</th><th></th></tr></thead><tbody>
      ${eq.map(c => `
        <tr class="clickrow" data-col="${c.id}">
          <td>${persona(c.nombre, c.cargo)}</td>
          <td class="num">${fechaLarga(c.ingreso)}</td>
          <td class="num">${c.fase}/5</td>
          <td style="min-width:130px">${bar(c.progreso, c.progreso < 40 ? 'danger' : c.progreso < 70 ? 'warn' : 'ok')}</td>
          <td class="num">${c.pendientes}</td>
          <td class="num">${c.promedio ? c.promedio + '%' : '—'}</td>
          <td class="muted">${c.ultimaActividad}</td>
          <td>${badgeEstado(c.estado)}</td>
          <td class="r"><button class="btn btn--sm" data-col-open="${c.id}">Ver ficha</button></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </section>`;
}

function vAsignar() {
  const eq = equipoDe();
  return head('asignar') + `
  <div class="grid g-64">
    <section class="card">
      <div class="card__head"><div><h3>Documentación disponible</h3><p>Seleccione los documentos y los colaboradores que deben revisarlos</p></div></div>
      <div class="card__body">
        <div class="doclist">
          ${S.documentos.filter(d => ['ENG', 'QA'].some(a => d.areas.includes(a))).map(d => `
            <label class="docitem" style="cursor:pointer">
              <input type="checkbox" data-asig="${d.id}" style="width:16px;height:16px">
              <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}">${svg(ICO.file)}</span>
              <span class="docitem__b"><b>${esc(d.titulo)}</b>
                <span class="docitem__m"><span>${d.codigo}</span><span>v${d.version}</span><span>${d.minutos} min de lectura</span><span>${esc(d.categoria)}</span></span></span>
              <span class="docitem__a"><span class="badge badge--${d.criticidad === 'alta' ? 'danger' : 'muted'}">${d.criticidad}</span></span>
            </label>`).join('')}
        </div>
      </div>
    </section>

    <section class="card" style="align-self:start">
      <div class="card__head"><div><h3>Destinatarios</h3><p>Colaboradores de su equipo</p></div></div>
      <div class="card__body">
        ${eq.map(c => `<label class="row" style="padding:8px 0;gap:10px;cursor:pointer">
          <input type="checkbox" data-dest="${c.id}" style="width:16px;height:16px">
          ${persona(c.nombre, c.cargo)}</label>`).join('')}
        <div class="divider"></div>
        <div class="field"><span class="login__label">Plazo de lectura (días hábiles)</span><input value="5"></div>
        <label class="row" style="gap:8px;font-size:13.2px;margin-bottom:14px"><input type="checkbox" checked> Generar evaluación con IA al asignar</label>
        <button class="btn btn--primary btn-block" data-act="confirmar-asignacion">Asignar documentación</button>
      </div>
    </section>
  </div>`;
}

function vResultadosEquipo() {
  const eq = equipoDe();
  return head('evaluaciones') + `
  <div class="grid g-4">
    ${kpi('Evaluaciones completadas', '23', 'De 31 asignadas al equipo', '', '')}
    ${kpi('Aprobación', '81%', 'Mínimo exigido 80%', trend('up', '+4 pts'), '')}
    ${kpi('Reintentos', '5', '4 aprobaron en el segundo intento', trend('flat', 'estable'), '')}
    ${kpi('Tema más fallado', '47%', 'Información que no puede compartirse con IA', trend('up', '+6 pts'), '')}
  </div>
  <section class="card mt-16">
    <div class="card__head"><div><h3>Resultados por colaborador</h3><p>Último intento registrado en cada evaluación</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr><th>Colaborador</th><th>Evaluación</th><th>Intento</th><th>Puntaje</th><th>Resultado</th><th>Fecha</th></tr></thead><tbody>
      ${eq.slice(0, 7).map((c, i) => {
        const e = DB.evaluaciones[i % DB.evaluaciones.length];
        const p = c.promedio || 0;
        return `<tr>
          <td>${persona(c.nombre, c.cargo)}</td>
          <td>${esc(e.titulo.replace('Evaluación · ', ''))}</td>
          <td class="num">${p && p < 80 ? 2 : 1}</td>
          <td class="num"><b>${p ? p + '%' : '—'}</b></td>
          <td>${!p ? '<span class="badge badge--muted">Pendiente</span>' : p >= 80 ? '<span class="badge badge--ok">Aprobada</span>' : '<span class="badge badge--danger">Reprobada</span>'}</td>
          <td class="num muted">${p ? fechaLarga('2026-09-1' + ((i % 5) + 1)) : '—'}</td>
        </tr>`;
      }).join('')}
      </tbody></table>
    </div>
  </section>`;
}

/* ------------------------------------------------------------
   9. Vistas · COLABORADOR
------------------------------------------------------------ */
function miProgreso() {
  const total = S.misDocs.length + S.misEvals.length;
  const hechos = S.misDocs.filter(d => d.estado === 'leido').length + S.misEvals.filter(e => e.estado === 'aprobada').length;
  return pct(hechos, total);
}

function vColabDashboard() {
  const p = miProgreso();
  const pend = S.misDocs.filter(d => d.estado === 'pendiente').length;
  const pendEv = S.misEvals.filter(e => e.estado === 'pendiente').length;
  const fase = p >= 80 ? 4 : p >= 55 ? 3 : 2;

  return `<div class="page__head">
    <div><h1>Hola, ${esc(S.user.nombre.split(' ')[0])}</h1>
      <p>Le quedan ${pend} lecturas y ${pendEv} evaluaciones para cerrar su inducción. El plazo vence el 22 de septiembre.</p></div>
    <div class="page__actions"><button class="btn" data-view-go="asistente">${svg(ICO.chat)} Consultar al asistente</button>
      <button class="btn btn--primary" data-view-go="misdocs">Continuar inducción</button></div></div>

  <div class="grid g-64">
    <section class="card">
      <div class="card__head"><div><h3>Su ruta de inducción</h3><p>Quality Control · ingreso el 7 de septiembre de 2026</p></div>
        <div class="right"><span class="tag tag--brand">Fase ${fase} de 5</span></div></div>
      <div class="card__body">
        <ol class="phases">
          ${DB.fases.map(f => `<li class="phase ${f.n < fase ? 'done' : f.n === fase ? 'current' : ''}">
            <div class="phase__bar"></div><div class="phase__n">Fase ${f.n}</div>
            <div class="phase__t">${f.nombre}</div><div class="phase__d">${f.detalle}</div></li>`).join('')}
        </ol>
        <div class="divider"></div>
        <div class="row wrap" style="gap:28px">
          ${ring(p, 104, 'de la ruta')}
          <div style="flex:1;min-width:220px">
            <div class="gap" style="grid-template-columns:1fr 130px 44px;border:0">
              <div><b>Lecturas confirmadas</b><small>${S.misDocs.filter(d => d.estado === 'leido').length} de ${S.misDocs.length} documentos</small></div>
              <div class="gap__bar"><i style="width:${pct(S.misDocs.filter(d => d.estado === 'leido').length, S.misDocs.length)}%;background:#1F53CE"></i></div>
              <div class="gap__v">${pct(S.misDocs.filter(d => d.estado === 'leido').length, S.misDocs.length)}%</div>
            </div>
            <div class="gap" style="grid-template-columns:1fr 130px 44px;border:0">
              <div><b>Evaluaciones aprobadas</b><small>${S.misEvals.filter(e => e.estado === 'aprobada').length} de ${S.misEvals.length} evaluaciones</small></div>
              <div class="gap__bar"><i style="width:${pct(S.misEvals.filter(e => e.estado === 'aprobada').length, S.misEvals.length)}%;background:#0E7A56"></i></div>
              <div class="gap__v">${pct(S.misEvals.filter(e => e.estado === 'aprobada').length, S.misEvals.length)}%</div>
            </div>
            <div class="gap" style="grid-template-columns:1fr 130px 44px;border:0">
              <div><b>Micro aprendizaje</b><small>${S.pildoras.filter(p2 => p2.estado === 'completada').length} de ${S.pildoras.length} píldoras respondidas</small></div>
              <div class="gap__bar"><i style="width:${pct(S.pildoras.filter(p2 => p2.estado === 'completada').length, S.pildoras.length)}%;background:#E8620F"></i></div>
              <div class="gap__v">${pct(S.pildoras.filter(p2 => p2.estado === 'completada').length, S.pildoras.length)}%</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="stack">
      <section class="card">
        <div class="card__head"><div><h3>Pendiente ahora</h3><p>Ordenado por fecha de vencimiento</p></div></div>
        <div class="card__body">
          <div class="doclist">
            ${S.misDocs.filter(d => d.estado === 'pendiente').slice(0, 3).map(md => { const d = doc(md.docId); return `
              <div class="docitem" style="padding:11px 12px">
                <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}" style="width:32px;height:36px">${svg(ICO.file)}</span>
                <span class="docitem__b"><b style="font-size:13.3px">${esc(d.titulo)}</b>
                  <span class="docitem__m"><span>${d.minutos} min</span><span>Vence ${fechaLarga(md.vence)}</span></span></span>
                <span class="docitem__a"><button class="btn btn--sm btn--primary" data-leer="${d.id}">Leer</button></span>
              </div>`; }).join('')}
            ${S.misEvals.filter(e => e.estado === 'pendiente').slice(0, 2).map(me => { const ev = evalu(me.evId); return `
              <div class="docitem" style="padding:11px 12px">
                <span class="docitem__ic" style="width:32px;height:36px;background:var(--brand-050);border-color:#D6E1FB;color:var(--brand)">${svg(ICO.check)}</span>
                <span class="docitem__b"><b style="font-size:13.3px">${esc(ev.titulo.replace('Evaluación · ', ''))}</b>
                  <span class="docitem__m"><span>${ev.preguntas.length} preguntas</span><span>${ev.minutos} min</span></span></span>
                <span class="docitem__a"><button class="btn btn--sm" data-quiz="${ev.id}">Rendir</button></span>
              </div>`; }).join('')}
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card__head"><div><h3>Avisos</h3><p>Novedades de los últimos días</p></div></div>
        <div class="card__body">
          <ul class="feed">
            ${DB.avisosColaborador.map(a => `<li>
              <span class="feed__i ${a.tipo === 'evaluacion' ? 'brand' : a.tipo === 'actualizacion' ? 'warn' : a.tipo === 'campana' ? 'ia' : 'warn'}">${svg(a.tipo === 'campana' ? ICO.zap : a.tipo === 'evaluacion' ? ICO.check : a.tipo === 'actualizacion' ? ICO.file : ICO.clock)}</span>
              <span><b>${esc(a.t)}</b><small>${esc(a.d)} · ${a.h}</small></span></li>`).join('')}
          </ul>
        </div>
      </section>
    </div>
  </div>`;
}

function vMisDocs() {
  const fila = (md) => { const d = doc(md.docId); const leido = md.estado === 'leido'; return `
    <div class="docitem">
      <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}">${svg(ICO.file)}</span>
      <span class="docitem__b">
        <b>${esc(d.titulo)}</b>
        <span class="docitem__m">
          <span>${d.codigo} · v${d.version}</span><span>${d.minutos} min de lectura</span>
          <span>${esc(md.origen)}</span>
          <span>${leido ? 'Confirmado el ' + md.confirmado : 'Vence ' + fechaLarga(md.vence)}</span>
        </span>
      </span>
      <span class="docitem__a">
        ${leido ? '<span class="badge badge--ok">Lectura confirmada</span>' : diasDesde(md.vence) > 0 ? '<span class="badge badge--danger">Vencido</span>' : '<span class="badge badge--warn">Pendiente</span>'}
        <button class="btn btn--sm ${leido ? '' : 'btn--primary'}" data-leer="${d.id}">${leido ? 'Releer' : 'Leer y confirmar'}</button>
      </span>
    </div>`; };

  const pendientes = S.misDocs.filter(d => d.estado === 'pendiente');
  const leidos = S.misDocs.filter(d => d.estado === 'leido');

  return head('misdocs') + `
  <section class="card">
    <div class="card__head"><div><h3>Pendientes de lectura</h3><p>${pendientes.length} documentos requieren su confirmación</p></div>
      <div class="right"><span class="tag">${pendientes.reduce((a, m) => a + doc(m.docId).minutos, 0)} min estimados</span></div></div>
    <div class="card__body">${pendientes.length ? `<div class="doclist">${pendientes.map(fila).join('')}</div>` :
      `<div class="empty">${svg(ICO.check)}<b>No tiene lecturas pendientes</b>Le avisaremos cuando se publique una nueva versión.</div>`}</div>
  </section>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Lectura confirmada</h3><p>Cada confirmación queda registrada como evidencia con sello de tiempo</p></div></div>
    <div class="card__body">${leidos.length ? `<div class="doclist">${leidos.map(fila).join('')}</div>` : '<div class="empty"><b>Aún no confirma ninguna lectura</b></div>'}</div>
  </section>`;
}

function vMisEvals() {
  const estadoBadge = { aprobada:'<span class="badge badge--ok">Aprobada</span>', pendiente:'<span class="badge badge--warn">Pendiente</span>', reprobada:'<span class="badge badge--danger">Reprobada</span>', bloqueada:'<span class="badge badge--muted">Bloqueada</span>' };
  return head('misevals') + `
  <div class="grid g-3">
    ${kpi('Evaluaciones asignadas', S.misEvals.length, 'Generadas desde sus documentos', '', '')}
    ${kpi('Puntaje promedio', (() => { const a = S.misEvals.filter(e => e.puntaje); return a.length ? Math.round(a.reduce((x, e) => x + e.puntaje, 0) / a.length) + '%' : '—'; })(), 'Mínimo de aprobación 80%', '', '')}
    ${kpi('Intentos disponibles', '3', 'Por cada evaluación', '', '')}
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Mis evaluaciones</h3><p>Las evaluaciones se habilitan al confirmar la lectura del documento correspondiente</p></div></div>
    <div class="card__body">
      <div class="doclist">
        ${S.misEvals.map(me => { const ev = evalu(me.evId); const d = doc(ev.docId); return `
          <div class="docitem">
            <span class="docitem__ic" style="background:${me.estado === 'aprobada' ? 'var(--ok-050)' : 'var(--brand-050)'};border-color:#DCE6F8;color:${me.estado === 'aprobada' ? 'var(--ok)' : 'var(--brand)'}">${svg(ICO.check)}</span>
            <span class="docitem__b"><b>${esc(ev.titulo.replace('Evaluación · ', ''))}</b>
              <span class="docitem__m"><span>${ev.preguntas.length} preguntas</span><span>${ev.minutos} minutos</span>
                <span>Mínimo ${ev.minimo}%</span><span class="tag tag--ai">${esc(ev.generadaPor)}</span>
                ${me.fecha ? `<span>Rendida el ${me.fecha}</span>` : ''}</span></span>
            <span class="docitem__a">
              ${me.puntaje ? `<b class="num" style="font-size:16px;color:${me.puntaje >= 80 ? 'var(--ok)' : 'var(--danger)'}">${me.puntaje}%</b>` : ''}
              ${estadoBadge[me.estado]}
              <button class="btn btn--sm ${me.estado === 'pendiente' ? 'btn--primary' : ''}" ${me.estado === 'bloqueada' ? 'disabled' : ''} data-quiz="${ev.id}">
                ${me.estado === 'aprobada' ? 'Ver resultado' : me.estado === 'bloqueada' ? 'Requiere lectura' : 'Rendir evaluación'}</button>
            </span>
          </div>`; }).join('')}
      </div>
    </div>
  </section>`;
}

function vMiMicro() {
  const pend = S.pildoras.filter(p => p.estado === 'pendiente');
  const hechas = S.pildoras.filter(p => p.estado === 'completada');
  return head('mimicro') + `
  <div class="grid g-3">
    ${kpi('Racha activa', '4 semanas', 'Respondiendo cada píldora a tiempo', trend('up', '+1'), '')}
    ${kpi('Aciertos', hechas.length ? Math.round(hechas.filter(p => p.acierto).length / hechas.length * 100) + '%' : '—', `${hechas.length} píldoras respondidas`, '', '')}
    ${kpi('Píldoras pendientes', pend.length, 'Menos de un minuto cada una', '', '')}
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Píldoras de esta semana</h3><p>Preguntas cortas sobre políticas y procedimientos que ya leyó</p></div>
      <div class="right"><span class="ia__badge">${svg(ICO.spark)} Generadas por IA</span></div></div>
    <div class="card__body">
      ${pend.length ? `<div class="doclist">${pend.map(p => { const d = doc(p.doc); const c = S.campanas.find(c2 => c2.id === p.campana); return `
        <div class="docitem">
          <span class="docitem__ic" style="background:var(--accent-050);border-color:#F3DFCE;color:var(--accent)">${svg(ICO.zap)}</span>
          <span class="docitem__b"><b>${esc(c.nombre)}</b>
            <span class="docitem__m"><span>1 pregunta</span><span>${d.codigo} v${d.version}</span><span>${c.periodicidad}</span></span></span>
          <span class="docitem__a"><button class="btn btn--sm btn--primary" data-pild="${p.id}">Responder</button></span>
        </div>`; }).join('')}</div>`
        : `<div class="empty">${svg(ICO.check)}<b>Está al día</b>La próxima píldora llega el viernes.</div>`}
    </div>
  </section>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Historial</h3><p>Sus respuestas quedan registradas para medir la retención en el tiempo</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr><th>Campaña</th><th>Documento</th><th>Pregunta</th><th>Resultado</th></tr></thead><tbody>
      ${hechas.length ? hechas.map(p => { const c = S.campanas.find(c2 => c2.id === p.campana); return `
        <tr><td>${esc(c.nombre)}</td><td class="muted">${esc(doc(p.doc).titulo)}</td>
        <td style="max-width:420px">${esc(p.q)}</td>
        <td>${p.acierto ? '<span class="badge badge--ok">Correcta</span>' : '<span class="badge badge--danger">Incorrecta</span>'}</td></tr>`; }).join('')
        : '<tr><td colspan="4" class="tbl__empty">Todavía no respondió ninguna píldora.</td></tr>'}
      </tbody></table>
    </div>
  </section>`;
}

function vAsistente() {
  return head('asistente') + `
  <section class="card">
    <div class="card__head">
      <div><h3>Asistente documental</h3><p>Responde únicamente con base en los documentos vigentes que tiene asignados</p></div>
      <div class="right"><span class="ia__badge">${svg(ICO.spark)} IA</span><button class="btn btn--sm" data-act="limpiar-chat">${svg(ICO.refresh)} Reiniciar</button></div>
    </div>
    <div class="chat">
      <div class="chat__log" id="chatLog">${S.chat.map(msgHTML).join('')}</div>
      <div class="chat__chips">
        ${['¿Cuál es la longitud mínima de contraseña?', '¿Puedo usar IA con código del cliente?', '¿Cómo solicito un permiso?', '¿Qué hago ante un incidente de seguridad?']
          .map(q => `<button class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join('')}
      </div>
      <form class="chat__form" id="chatForm">
        <input id="chatInput" placeholder="Escriba su consulta sobre políticas y procedimientos" autocomplete="off">
        <button class="btn btn--primary" type="submit">${svg(ICO.send)} Enviar</button>
      </form>
    </div>
  </section>`;
}

const msgHTML = (m) => `
  <div class="msg ${m.me ? 'msg--me' : ''}">
    <span class="msg__av">${m.me ? ini(S.user.nombre) : svg(ICO.spark)}</span>
    <div class="msg__b">${m.t}${m.fuente ? `<div class="msg__src">${svg(ICO.file)} Fuente: ${esc(doc(m.fuente).titulo)} · v${doc(m.fuente).version} <span class="tag">${doc(m.fuente).codigo}</span></div>` : ''}</div>
  </div>`;

function vCertificados() {
  const items = S.misDocs.filter(d => d.estado === 'leido').map(md => ({ t: doc(md.docId).titulo, v: doc(md.docId).version, f: md.confirmado, tipo: 'Confirmación de lectura' }))
    .concat(S.misEvals.filter(e => e.estado === 'aprobada').map(me => ({ t: evalu(me.evId).titulo.replace('Evaluación · ', ''), v: doc(evalu(me.evId).docId).version, f: me.fecha, tipo: `Evaluación aprobada · ${me.puntaje}%` })));
  return head('certificados', `<button class="btn" data-act="export">${svg(ICO.down)} Descargar constancia</button>`) + `
  <div class="grid g-3">
    ${kpi('Registros de cumplimiento', items.length, 'Con sello de tiempo verificable', '', '')}
    ${kpi('Documentos vigentes al día', S.misDocs.filter(d => d.estado === 'leido').length + ' de ' + S.misDocs.length, 'Lectura confirmada', '', '')}
    ${kpi('Evaluaciones aprobadas', S.misEvals.filter(e => e.estado === 'aprobada').length, 'Mínimo exigido 80%', '', '')}
  </div>
  <section class="card mt-16">
    <div class="card__head"><div><h3>Historial de cumplimiento</h3><p>Esta información alimenta la evidencia de auditoría de la organización</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr><th>Documento</th><th>Versión</th><th>Tipo de registro</th><th>Fecha y hora</th><th></th></tr></thead><tbody>
      ${items.map((i, n) => `<tr>
        <td><b style="font-weight:560">${esc(i.t)}</b></td><td><span class="tag">v${i.v}</span></td>
        <td>${i.tipo.includes('Evaluación') ? '<span class="badge badge--ok">' + esc(i.tipo) + '</span>' : '<span class="badge badge--info">' + esc(i.tipo) + '</span>'}</td>
        <td class="num muted">${i.f}</td>
        <td class="r"><button class="btn btn--sm" data-act="export">Constancia</button></td></tr>`).join('')}
      </tbody></table>
    </div>
  </section>`;
}

/* ------------------------------------------------------------
   10. Mapa de vistas
------------------------------------------------------------ */
const VISTAS = {
  admin: { dashboard:vAdminDashboard, colaboradores:vColaboradores, documentos:vDocumentos, rutas:vRutas,
           evaluaciones:vEvaluaciones, micro:vMicro, analitica:vAnalitica, notificaciones:vNotificaciones,
           evidencias:vEvidencias, config:vConfig },
  manager: { dashboard:vManagerDashboard, equipo:vEquipo, asignar:vAsignar, evaluaciones:vResultadosEquipo,
             notificaciones:vNotificaciones, analitica:vAnalitica },
  colaborador: { dashboard:vColabDashboard, misdocs:vMisDocs, misevals:vMisEvals, mimicro:vMiMicro,
                 asistente:vAsistente, certificados:vCertificados }
};

/* ------------------------------------------------------------
   11. Interacciones de cada vista
------------------------------------------------------------ */
function bindVista() {
  // Navegación interna
  $$('[data-view-go]').forEach(b => b.onclick = () => { S.view = b.dataset.viewGo; render(); window.scrollTo(0, 0); });

  // Filtros de colaboradores
  const fArea = $('#fArea'), fEstado = $('#fEstado');
  if (fArea) fArea.onchange = () => { S.filtro.area = fArea.value; render(); };
  if (fEstado) fEstado.onchange = () => { S.filtro.estado = fEstado.value; render(); };

  // Búsqueda dentro de la tabla visible
  const fq = $('#fq');
  if (fq) fq.oninput = () => filtrarTabla(fq.value);

  // Ficha del colaborador
  $$('[data-col],[data-col-open]').forEach(el => el.onclick = (e) => {
    if (e.target.closest('[data-recordar]')) return;
    const id = el.dataset.col || el.dataset.colOpen;
    e.stopPropagation(); fichaColaborador(id);
  });

  // Recordatorio manual
  $$('[data-recordar]').forEach(b => b.onclick = (e) => {
    e.stopPropagation();
    const c = S.colaboradores.find(x => x.id === b.dataset.recordar);
    b.textContent = 'Enviado'; b.disabled = true;
    S.notifs.unshift({ id:'N-' + Date.now(), tipo:'recordatorio', titulo:'Recordatorio manual',
      detalle:`${c.nombre} fue notificado sobre sus actividades pendientes.`, destino:c.nombre, fecha:'2026-09-16 · ahora', estado:'enviada' });
    toast('Recordatorio enviado', `${c.nombre} recibió el aviso en su correo corporativo.`, 'info');
  });

  // Documentos
  $$('[data-doc],[data-doc-open]').forEach(el => el.onclick = (e) => {
    const id = el.dataset.doc || el.dataset.docOpen;
    e.stopPropagation(); detalleDocumento(id);
  });

  // Lector del colaborador
  $$('[data-leer]').forEach(b => b.onclick = () => abrirLector(b.dataset.leer));

  // Evaluaciones
  $$('[data-quiz]').forEach(b => b.onclick = () => abrirQuiz(b.dataset.quiz));
  $$('[data-ev-prev]').forEach(b => b.onclick = () => previsualizarEvaluacion(b.dataset.evPrev));

  // Píldoras
  $$('[data-pild]').forEach(b => b.onclick = () => abrirPildora(b.dataset.pild));

  // Campañas: activar / pausar
  $$('[data-camp]').forEach(b => b.onclick = () => {
    const c = S.campanas.find(x => x.id === b.dataset.camp);
    c.estado = c.estado === 'activa' ? 'pausada' : 'activa';
    if (c.estado === 'activa' && c.proxima === '—') c.proxima = '2026-09-21';
    toast(c.estado === 'activa' ? 'Campaña activada' : 'Campaña pausada', `${c.nombre} · ${c.alcance} colaboradores.`, c.estado === 'activa' ? '' : 'warn');
    render();
  });

  // Acciones genéricas
  $$('[data-act]').forEach(b => b.onclick = () => accion(b.dataset.act, b));

  // Chat
  const form = $('#chatForm');
  if (form) {
    form.onsubmit = (e) => { e.preventDefault(); enviarChat($('#chatInput').value); };
    $$('[data-q]').forEach(c => c.onclick = () => enviarChat(c.dataset.q));
    const log = $('#chatLog'); log.scrollTop = log.scrollHeight;
  }

  // Filas de tabla clicables (evita doble binding con botones internos)
  $$('.tbl .clickrow').forEach(tr => tr.style.cursor = 'pointer');
}

function filtrarTabla(q) {
  const t = $('.tbl'); if (!t) return;
  const term = q.trim().toLowerCase();
  $$('tbody tr', t).forEach(tr => {
    tr.style.display = !term || tr.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
}

/* ------------------------------------------------------------
   12. Acciones generales
------------------------------------------------------------ */
function accion(a, btn) {
  switch (a) {
    case 'export':
      toast('Exportación generada', 'El archivo se descargó en formato CSV con sello de tiempo.', 'info'); break;
    case 'nuevo-col': modalNuevoColaborador(); break;
    case 'nuevo-doc': modalNuevoDocumento(); break;
    case 'ia-generar': modalGenerarIA(); break;
    case 'ia-lote': modalGenerarIA(true); break;
    case 'nueva-campana': modalNuevaCampana(); break;
    case 'asignar-doc':
    case 'asignar-masivo': S.view = S.user.rol === 'manager' ? 'asignar' : 'documentos'; render(); break;
    case 'confirmar-asignacion': confirmarAsignacion(); break;
    case 'ia-accion':
      toast('Acción registrada', btn.dataset.txt + ' · la sugerencia pasó a seguimiento.', 'ia'); break;
    case 'guardar': toast('Cambios guardados', 'La configuración se aplicará en el próximo ciclo automático.'); break;
    case 'limpiar-chat':
      S.chat = [{ me:false, t:'Conversación reiniciada. ¿Sobre qué documento necesita consultar?' }];
      render(); break;
    case 'nueva-ruta':
    case 'editar-ruta':
    case 'reglas':
      toast('Disponible en la demostración completa', 'Este módulo forma parte del alcance funcional del proyecto.', 'warn'); break;
  }
}

/* ------------------------------------------------------------
   13. Ficha del colaborador (drawer)
------------------------------------------------------------ */
function fichaColaborador(id) {
  const c = S.colaboradores.find(x => x.id === id); if (!c) return;
  const docs = S.documentos.filter(d => d.areas.includes(c.area)).slice(0, 6);
  drawer(`
    <div class="drawer__head">
      <span class="av av--lg">${ini(c.nombre)}</span>
      <div style="flex:1">
        <h3 style="font-size:18px">${esc(c.nombre)}</h3>
        <p class="muted small" style="margin:3px 0 8px">${esc(c.cargo)} · ${areaNom(c.area)}</p>
        ${badgeEstado(c.estado)} <span class="badge badge--${c.riesgo === 'alto' ? 'danger' : c.riesgo === 'medio' ? 'warn' : 'muted'}">Riesgo ${c.riesgo}</span>
      </div>
      <button class="iconbtn" data-close-drawer>${svg(ICO.x)}</button>
    </div>
    <div class="drawer__body">
      <div class="row" style="gap:22px;align-items:center">
        ${ring(c.progreso, 92, 'de la ruta', c.progreso < 40 ? '#B4342A' : c.progreso < 70 ? '#D99A12' : '#0E7A56')}
        <dl class="kv" style="flex:1">
          <dt>Identificador</dt><dd class="num">${c.id}</dd>
          <dt>Fecha de ingreso</dt><dd class="num">${fechaLarga(c.ingreso)} · hace ${diasDesde(c.ingreso)} días</dd>
          <dt>Manager</dt><dd>${esc(c.manager)}</dd>
          <dt>Fase actual</dt><dd>${c.fase} de 5 · ${DB.fases[c.fase - 1].nombre}</dd>
          <dt>Promedio</dt><dd class="num">${c.promedio ? c.promedio + '%' : 'Sin evaluaciones'}</dd>
          <dt>Última actividad</dt><dd>${c.ultimaActividad}</dd>
        </dl>
      </div>

      <div class="sec">
        <div class="sec__t">Avance por fase</div>
        <ol class="phases" style="flex-direction:column;gap:12px">
          ${DB.fases.map(f => `<li class="phase ${f.n < c.fase ? 'done' : f.n === c.fase ? 'current' : ''}" style="padding:0">
            <div class="phase__bar" style="margin-bottom:7px"></div>
            <div class="row" style="justify-content:space-between">
              <span><span class="phase__n">Fase ${f.n}</span> <span class="phase__t" style="display:inline">${f.nombre}</span></span>
              <span class="small muted">${f.n < c.fase ? 'Completada' : f.n === c.fase ? 'En curso' : 'Pendiente'}</span>
            </div></li>`).join('')}
        </ol>
      </div>

      <div class="sec">
        <div class="sec__t">Documentación asignada (${docs.length})</div>
        <div class="doclist">
          ${docs.map((d, i) => `<div class="docitem" style="padding:10px 12px">
            <span class="docitem__ic" style="width:30px;height:34px">${svg(ICO.file)}</span>
            <span class="docitem__b"><b style="font-size:13px">${esc(d.titulo)}</b>
              <span class="docitem__m"><span>v${d.version}</span><span>${d.minutos} min</span></span></span>
            <span class="docitem__a">${i < c.fase ? '<span class="badge badge--ok">Leído</span>' : '<span class="badge badge--warn">Pendiente</span>'}</span>
          </div>`).join('')}
        </div>
      </div>

      <div class="sec">
        <div class="sec__t">Historial reciente</div>
        <ul class="feed">
          <li><span class="feed__i ok">${svg(ICO.check)}</span><span><b>Confirmó la lectura de ${esc(docs[0].titulo)}</b><small>${c.ultimaActividad}</small></span></li>
          <li><span class="feed__i brand">${svg(ICO.bell)}</span><span><b>Recibió un recordatorio automático</b><small>Hace 2 días · correo corporativo</small></span></li>
          <li><span class="feed__i ia">${svg(ICO.spark)}</span><span><b>La IA generó su evaluación de fase ${c.fase}</b><small>5 preguntas · mínimo 80%</small></span></li>
        </ul>
      </div>
    </div>
    <div class="drawer__foot">
      <button class="btn btn--primary" data-drawer-act="recordar">${svg(ICO.mail)} Enviar recordatorio</button>
      <button class="btn" data-drawer-act="asignar">Asignar documento</button>
      <button class="btn btn--ghost" data-close-drawer style="margin-left:auto">Cerrar</button>
    </div>`);

  $$('[data-close-drawer]').forEach(b => b.onclick = closeDrawer);
  $$('[data-drawer-act]').forEach(b => b.onclick = () => {
    if (b.dataset.drawerAct === 'recordar') toast('Recordatorio enviado', `${c.nombre} fue notificado por correo.`, 'info');
    else { closeDrawer(); S.view = S.user.rol === 'manager' ? 'asignar' : 'documentos'; render(); }
  });
}

/* ------------------------------------------------------------
   14. Detalle de documento (modal admin)
------------------------------------------------------------ */
function detalleDocumento(id) {
  const d = doc(id);
  const ev = DB.evaluaciones.find(e => e.docId === id);
  modal(modalHead(d.titulo, `${d.codigo} · versión ${d.version} · propietario ${d.propietario}`) + `
    <div class="modal__body">
      <div class="row wrap" style="gap:8px;margin-bottom:16px">
        <span class="badge badge--${d.criticidad === 'alta' ? 'danger' : d.criticidad === 'media' ? 'warn' : 'muted'}">Criticidad ${d.criticidad}</span>
        <span class="tag">${esc(d.categoria)}</span>
        <span class="tag">${d.paginas} páginas</span>
        <span class="tag">${d.minutos} min de lectura</span>
        ${d.obligatorio ? '<span class="tag tag--brand">Obligatorio</span>' : ''}
      </div>
      <p class="muted" style="margin:0 0 18px">${esc(d.resumen)}</p>

      <div class="grid g-3" style="gap:12px">
        ${kpi('Audiencia', d.asignados, 'colaboradores asignados', '', '')}
        ${kpi('Lectura confirmada', pct(d.leidos, d.asignados) + '%', `${d.leidos} de ${d.asignados}`, '', '')}
        ${kpi('Índice de error', d.indiceError + '%', `${d.intentos} intentos registrados`, '', '')}
      </div>

      <div class="sec">
        <div class="sec__t">Historial de versiones</div>
        <ul class="feed">
          ${d.cambios.map(c => `<li><span class="feed__i ${c.nivel === 'mayor' ? 'warn' : 'brand'}">${svg(ICO.file)}</span>
            <span><b>Versión ${c.v} · cambio ${c.nivel}</b><small>${fechaLarga(c.fecha)} — ${esc(c.detalle)}</small></span></li>`).join('')}
        </ul>
      </div>

      <div class="sec">
        <div class="sec__t">Evaluación asociada</div>
        ${ev ? `<div class="docitem">
            <span class="docitem__ic" style="background:var(--accent-050);border-color:#F3DFCE;color:var(--accent)">${svg(ICO.spark)}</span>
            <span class="docitem__b"><b>${esc(ev.titulo)}</b>
              <span class="docitem__m"><span>${ev.preguntas.length} preguntas</span><span>${ev.minutos} min</span><span>Mínimo ${ev.minimo}%</span><span class="tag tag--ai">${esc(ev.generadaPor)}</span></span></span>
            <span class="docitem__a"><button class="btn btn--sm" data-ev-prev="${ev.id}">Previsualizar</button></span>
          </div>`
        : `<div class="empty" style="padding:26px">${svg(ICO.spark)}<b>Sin evaluación publicada</b>Genere una evaluación con IA a partir de este documento.</div>`}
      </div>
    </div>
    <div class="modal__foot">
      <button class="btn btn--ai" data-ia-doc="${d.id}">${svg(ICO.spark)} ${ev ? 'Regenerar' : 'Generar'} evaluación con IA</button>
      <button class="btn" data-leer="${d.id}">${svg(ICO.eye)} Ver documento</button>
      <span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cerrar</button>
    </div>`, 'modal--wide');

  bindModal();
  $$('[data-leer]').forEach(b => b.onclick = () => abrirLector(b.dataset.leer));
  $$('[data-ia-doc]').forEach(b => b.onclick = () => modalGenerarIA(false, b.dataset.iaDoc));
  $$('[data-ev-prev]').forEach(b => b.onclick = () => previsualizarEvaluacion(b.dataset.evPrev));
}

function bindModal() {
  $$('[data-close]').forEach(b => b.onclick = closeModal);
}

/* ------------------------------------------------------------
   15. Generación de evaluación con IA
------------------------------------------------------------ */
function modalGenerarIA(lote = false, docId = 'DOC-005') {
  const d = doc(docId);
  const pasos = [
    'Analizando el documento y segmentando por secciones',
    'Identificando obligaciones, plazos y umbrales evaluables',
    'Redactando preguntas con distractores plausibles',
    'Calibrando la dificultad con el histórico de aciertos'
  ];
  modal(modalHead(lote ? 'Generar evaluaciones en lote' : 'Generar evaluación con IA',
    lote ? '4 documentos seleccionados · se creará una evaluación por documento' : `${d.titulo} · versión ${d.version}`) + `
    <div class="modal__body">
      <ul class="gensteps" id="genSteps">
        ${pasos.map((p, i) => `<li data-i="${i}"><span class="dotmark"></span><span>${p}</span></li>`).join('')}
      </ul>
      <div id="genOut" class="hide mt-24"></div>
    </div>
    <div class="modal__foot">
      <span class="small muted" id="genNote">El proceso analiza ${d.paginas} páginas y toma unos segundos.</span>
      <span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary hide" id="genPub">Publicar evaluación</button>
    </div>`, 'modal--wide');
  bindModal();

  let i = 0;
  const lis = $$('#genSteps li');
  const avanzar = () => {
    if (i > 0) lis[i - 1].innerHTML = `<span class="tick">${svg('<path d="M20 6 9 17l-5-5"/>')}</span><span>${pasos[i - 1]}</span>`, lis[i - 1].classList.add('done');
    if (i < lis.length) {
      lis[i].innerHTML = `<span class="spin"></span><span>${pasos[i]}</span>`;
      lis[i].classList.add('on');
      i++; setTimeout(avanzar, 780 + Math.random() * 420);
    } else { mostrarPreguntas(docId); }
  };
  setTimeout(avanzar, 260);
}

function mostrarPreguntas(docId) {
  const ev = DB.evaluaciones.find(e => e.docId === docId) || DB.evaluaciones[1];
  const out = $('#genOut'); if (!out) return;
  out.classList.remove('hide');
  $('#genNote').innerHTML = `<span class="ia__badge">${svg(ICO.spark)} ${ev.preguntas.length} preguntas generadas en 3,4 s</span>`;
  $('#genPub').classList.remove('hide');
  out.innerHTML = `<div class="sec__t">Preguntas propuestas · revise antes de publicar</div>` +
    ev.preguntas.map((q, n) => `
      <div class="qgen">
        <div class="qgen__h">
          <span class="tag tag--ai">${n + 1}</span>
          <b>${esc(q.q)}</b>
          <span class="tag">confianza ${88 + (n % 4) * 3}%</span>
        </div>
        <ol type="A">${q.o.map((o, oi) => `<li class="${oi === q.r ? 'ok' : ''}">${esc(o)}${oi === q.r ? ' · correcta' : ''}</li>`).join('')}</ol>
        <p class="small muted" style="margin:9px 0 0"><b>Justificación:</b> ${esc(q.exp)}</p>
      </div>`).join('');

  $('#genPub').onclick = () => {
    closeModal();
    toast('Evaluación publicada', `${ev.preguntas.length} preguntas asignadas a ${doc(docId).asignados} colaboradores.`, 'ia');
    S.notifs.unshift({ id:'N-' + Date.now(), tipo:'actualizacion', titulo:'Evaluación publicada',
      detalle:`${ev.titulo} quedó disponible en la ruta de aprendizaje.`, destino:'Audiencia del documento', fecha:'2026-09-16 · ahora', estado:'enviada' });
    render();
  };
}

function previsualizarEvaluacion(id) {
  const ev = evalu(id);
  modal(modalHead(ev.titulo, `${ev.preguntas.length} preguntas · ${ev.minutos} minutos · mínimo ${ev.minimo}% · ${ev.generadaPor}`) + `
    <div class="modal__body">
      ${ev.preguntas.map((q, n) => `
        <div class="qgen">
          <div class="qgen__h"><span class="tag">${n + 1}</span><b>${esc(q.q)}</b></div>
          <ol type="A">${q.o.map((o, oi) => `<li class="${oi === q.r ? 'ok' : ''}">${esc(o)}${oi === q.r ? ' · correcta' : ''}</li>`).join('')}</ol>
          <p class="small muted" style="margin:9px 0 0"><b>Justificación:</b> ${esc(q.exp)}</p>
        </div>`).join('')}
    </div>
    <div class="modal__foot"><span class="small muted">Las respuestas correctas no son visibles para el colaborador.</span>
      <span class="spacer"></span><button class="btn btn--ghost" data-close>Cerrar</button></div>`, 'modal--wide');
  bindModal();
}

/* ------------------------------------------------------------
   16. Lector de documentos + confirmación de lectura
------------------------------------------------------------ */
function abrirLector(docId) {
  const d = doc(docId);
  const md = S.misDocs.find(m => m.docId === docId);
  const yaLeido = md && md.estado === 'leido';

  modal(modalHead(d.titulo, `${d.codigo} · versión ${d.version} · actualizado el ${fechaLarga(d.actualizado)}`) + `
    <div class="modal__body reader">
      <div class="reader__meta">
        <span>${d.minutos} min de lectura</span>
        <span>${d.paginas} páginas</span>
        <span>Propietario: ${esc(d.propietario)}</span>
        <span class="badge badge--${d.criticidad === 'alta' ? 'danger' : 'muted'}">Criticidad ${d.criticidad}</span>
        ${d.estado === 'actualizado' ? '<span class="badge badge--warn">Versión nueva</span>' : ''}
      </div>
      <div class="reader__doc" id="readerDoc">
        <p style="color:var(--muted);font-size:12.6px;margin-bottom:18px">Clasificación: Interna · Este documento es propiedad de Jalasoft. Prohibida su reproducción fuera de la organización.</p>
        ${d.secciones.map(s => `<h4>${esc(s.t)}</h4><p>${esc(s.p)}</p>`).join('')}
        <p style="margin-top:24px;color:var(--muted);font-size:12.6px">Fin del documento · ${d.codigo} v${d.version}</p>
      </div>
    </div>
    <div class="modal__foot">
      <div class="reader__progress"><div class="bar" style="flex:1;max-width:190px"><i id="readBar" style="width:0%"></i></div><span id="readTxt">0% leído</span></div>
      <button class="btn btn--ghost" data-close>Cerrar</button>
      ${md ? `<button class="btn btn--primary" id="confirmRead" ${yaLeido ? '' : 'disabled'}>
        ${yaLeido ? 'Lectura ya confirmada' : 'Confirmar lectura'}</button>` : ''}
    </div>`, 'modal--xl');
  bindModal();

  const box = $('#readerDoc'), btn = $('#confirmRead');
  const upd = () => {
    const p = Math.min(100, Math.round((box.scrollTop + box.clientHeight) / box.scrollHeight * 100));
    $('#readBar').style.width = p + '%';
    $('#readTxt').textContent = p + '% leído';
    if (btn && p >= 96 && !yaLeido) { btn.disabled = false; btn.textContent = 'Confirmar lectura'; }
  };
  box.onscroll = upd; upd();
  if (!btn) return;
  if (!yaLeido && btn.disabled) btn.textContent = 'Desplácese hasta el final';

  btn.onclick = () => {
    if (yaLeido) { closeModal(); return; }
    confirmarLectura(docId);
  };
}

function confirmarLectura(docId) {
  const md = S.misDocs.find(m => m.docId === docId);
  if (md) { md.estado = 'leido'; md.confirmado = '2026-09-16 · ahora'; }
  const d = doc(docId); d.leidos = Math.min(d.asignados, d.leidos + 1);

  // habilita la evaluación asociada
  const ev = DB.evaluaciones.find(e => e.docId === docId);
  if (ev) {
    const me = S.misEvals.find(x => x.evId === ev.id);
    if (me && me.estado === 'bloqueada') me.estado = 'pendiente';
  }

  S.evidencias.unshift({ id:'EVD-' + (9100 + S.evidencias.length), colaborador:S.user.nombre,
    documento:`${d.titulo} v${d.version}`, tipo:'Confirmación de lectura', resultado:'Confirmada',
    fecha:'2026-09-16 · ahora', hash:Math.random().toString(16).slice(2, 6) + '...' + Math.random().toString(16).slice(2, 6) });

  closeModal();
  toast('Lectura confirmada', `${d.titulo} quedó registrado como evidencia.${ev ? ' Su evaluación ya está disponible.' : ''}`);
  render();
}

/* ------------------------------------------------------------
   17. Evaluación interactiva
------------------------------------------------------------ */
function abrirQuiz(evId) {
  const ev = evalu(evId);
  const me = S.misEvals.find(e => e.evId === evId);
  if (me && me.estado === 'aprobada') { resultadoPrevio(ev, me); return; }

  S.quiz = { ev, i: 0, resp: Array(ev.preguntas.length).fill(null), seg: ev.minutos * 60, timer: null, revelada: false };
  pintarQuiz();

  S.quiz.timer = setInterval(() => {
    if (!S.quiz) return;
    S.quiz.seg--;
    const t = $('#qTimer');
    if (t) {
      const m = String(Math.floor(S.quiz.seg / 60)).padStart(2, '0'), s = String(S.quiz.seg % 60).padStart(2, '0');
      t.textContent = `${m}:${s}`;
      t.parentElement.classList.toggle('low', S.quiz.seg < 60);
    }
    if (S.quiz.seg <= 0) { clearInterval(S.quiz.timer); finalizarQuiz(true); }
  }, 1000);
}

function pintarQuiz() {
  const q = S.quiz, ev = q.ev, p = ev.preguntas[q.i];
  const m = String(Math.floor(q.seg / 60)).padStart(2, '0'), s = String(q.seg % 60).padStart(2, '0');

  modal(modalHead(ev.titulo.replace('Evaluación · ', ''), `Pregunta ${q.i + 1} de ${ev.preguntas.length} · mínimo ${ev.minimo}% para aprobar`) + `
    <div class="modal__body">
      <div class="quiz__bar">
        <div class="quiz__steps">
          ${ev.preguntas.map((_, i) => `<i class="${i < q.i ? 'done' : i === q.i ? 'now' : ''}"></i>`).join('')}
        </div>
        <span class="quiz__timer ${q.seg < 60 ? 'low' : ''}">${svg(ICO.clock)}<span id="qTimer">${m}:${s}</span></span>
      </div>
      <h3 class="quiz__q">${esc(p.q)}</h3>
      <div class="opts" id="opts">
        ${p.o.map((o, i) => `<button class="opt ${q.resp[q.i] === i ? 'sel' : ''}" data-opt="${i}">
          <span class="opt__k">${String.fromCharCode(65 + i)}</span><span>${esc(o)}</span></button>`).join('')}
      </div>
      <div id="qExp"></div>
    </div>
    <div class="modal__foot">
      <span class="small muted">Sus respuestas se registran como evidencia de cumplimiento.</span>
      <span class="spacer"></span>
      ${q.i > 0 ? '<button class="btn" id="qPrev">Anterior</button>' : ''}
      <button class="btn btn--primary" id="qNext" ${q.resp[q.i] === null ? 'disabled' : ''}>
        ${q.i === ev.preguntas.length - 1 ? 'Finalizar evaluación' : 'Siguiente'}</button>
    </div>`, 'modal--wide');

  $$('[data-opt]').forEach(b => b.onclick = () => {
    q.resp[q.i] = +b.dataset.opt;
    $$('.opt').forEach(o => o.classList.remove('sel'));
    b.classList.add('sel');
    $('#qNext').disabled = false;
  });
  const prev = $('#qPrev'); if (prev) prev.onclick = () => { q.i--; pintarQuiz(); };
  $('#qNext').onclick = () => {
    if (q.i === ev.preguntas.length - 1) { clearInterval(q.timer); finalizarQuiz(); }
    else { q.i++; pintarQuiz(); }
  };
}

function finalizarQuiz(porTiempo = false) {
  const q = S.quiz, ev = q.ev;
  const ok = q.resp.filter((r, i) => r === ev.preguntas[i].r).length;
  const score = Math.round(ok / ev.preguntas.length * 100);
  const aprobado = score >= ev.minimo;

  const me = S.misEvals.find(e => e.evId === ev.id);
  if (me) { me.estado = aprobado ? 'aprobada' : 'reprobada'; me.puntaje = score; me.fecha = '2026-09-16 · ahora'; me.intento++; }

  S.evidencias.unshift({ id:'EVD-' + (9100 + S.evidencias.length), colaborador:S.user.nombre,
    documento:`${doc(ev.docId).titulo} v${doc(ev.docId).version}`,
    tipo:aprobado ? 'Evaluación aprobada' : 'Evaluación reprobada', resultado:score + '%',
    fecha:'2026-09-16 · ahora', hash:Math.random().toString(16).slice(2, 6) + '...' + Math.random().toString(16).slice(2, 6) });

  modal(modalHead('Resultado de la evaluación', ev.titulo.replace('Evaluación · ', '')) + `
    <div class="modal__body">
      <div class="result">
        ${ring(score, 132, aprobado ? 'aprobado' : 'no aprobado', aprobado ? '#0E7A56' : '#B4342A')}
        <h3 class="mt-16">${aprobado ? 'Evaluación aprobada' : porTiempo ? 'Tiempo agotado' : 'No alcanzó el mínimo'}</h3>
        <p>${aprobado
          ? 'Su comprensión quedó verificada y registrada como evidencia. La siguiente fase de su ruta ya está habilitada.'
          : `Necesita ${ev.minimo}% para aprobar. Revise el documento y vuelva a intentarlo: le quedan ${3 - (me ? me.intento : 1)} intentos.`}</p>
        <div class="result__stats">
          <div><b class="num">${ok}/${ev.preguntas.length}</b><small>Respuestas correctas</small></div>
          <div><b class="num">${score}%</b><small>Puntaje obtenido</small></div>
          <div><b class="num">${ev.minimo}%</b><small>Mínimo exigido</small></div>
        </div>
      </div>

      <div class="sec__t">Revisión de sus respuestas</div>
      ${ev.preguntas.map((p, i) => {
        const r = q.resp[i], bien = r === p.r;
        return `<div class="qgen">
          <div class="qgen__h"><span class="tag ${bien ? '' : 'tag--ai'}">${i + 1}</span><b>${esc(p.q)}</b>
            ${bien ? '<span class="badge badge--ok">Correcta</span>' : '<span class="badge badge--danger">Incorrecta</span>'}</div>
          <ol type="A">${p.o.map((o, oi) => `<li class="${oi === p.r ? 'ok' : ''}">${esc(o)}${oi === p.r ? ' · correcta' : ''}${oi === r && !bien ? ' · su respuesta' : ''}</li>`).join('')}</ol>
          <p class="small muted" style="margin:9px 0 0"><b>Justificación:</b> ${esc(p.exp)}</p>
        </div>`;
      }).join('')}
    </div>
    <div class="modal__foot">
      ${!aprobado ? `<button class="btn" id="qRetry">${svg(ICO.refresh)} Reintentar</button>
                     <button class="btn" data-leer="${ev.docId}">Releer el documento</button>` : ''}
      <span class="spacer"></span>
      <button class="btn btn--primary" data-close>Entendido</button>
    </div>`, 'modal--wide');

  bindModal();
  const rt = $('#qRetry'); if (rt) rt.onclick = () => abrirQuiz(ev.id);
  $$('[data-leer]').forEach(b => b.onclick = () => abrirLector(b.dataset.leer));

  S.quiz = null;
  toast(aprobado ? 'Evaluación aprobada' : 'Evaluación no aprobada',
    `${score}% · la evidencia quedó registrada.`, aprobado ? '' : 'warn');
  setTimeout(render, 50);
}

function resultadoPrevio(ev, me) {
  modal(modalHead('Resultado registrado', ev.titulo.replace('Evaluación · ', '')) + `
    <div class="modal__body">
      <div class="result">
        ${ring(me.puntaje, 132, 'aprobado', '#0E7A56')}
        <h3 class="mt-16">Evaluación aprobada</h3>
        <p>Rendida el ${me.fecha} en el intento ${me.intento}. Este registro forma parte de la evidencia de cumplimiento de la organización.</p>
      </div>
    </div>
    <div class="modal__foot"><button class="btn">${svg(ICO.down)} Descargar constancia</button>
      <span class="spacer"></span><button class="btn btn--primary" data-close>Cerrar</button></div>`);
  bindModal();
}

/* ------------------------------------------------------------
   18. Píldora de micro aprendizaje
------------------------------------------------------------ */
function abrirPildora(id) {
  const p = S.pildoras.find(x => x.id === id);
  const c = S.campanas.find(x => x.id === p.campana);
  modal(modalHead(c.nombre, `Micro aprendizaje · ${doc(p.doc).codigo} v${doc(p.doc).version} · menos de un minuto`) + `
    <div class="modal__body">
      <h3 class="quiz__q">${esc(p.q)}</h3>
      <div class="opts" id="opts">
        ${p.o.map((o, i) => `<button class="opt" data-opt="${i}"><span class="opt__k">${String.fromCharCode(65 + i)}</span><span>${esc(o)}</span></button>`).join('')}
      </div>
      <div id="pExp"></div>
    </div>
    <div class="modal__foot"><span class="small muted">Las píldoras no afectan su puntaje de inducción.</span>
      <span class="spacer"></span><button class="btn btn--ghost" data-close>Cerrar</button></div>`);
  bindModal();

  $$('[data-opt]').forEach(b => b.onclick = () => {
    const i = +b.dataset.opt, bien = i === p.r;
    $$('.opt').forEach((o, oi) => { o.disabled = true; if (oi === p.r) o.classList.add('good'); else if (oi === i) o.classList.add('bad'); });
    $('#pExp').innerHTML = `<div class="explain"><b>${bien ? 'Respuesta correcta.' : 'Respuesta incorrecta.'}</b> ${esc(p.exp)}</div>`;
    p.estado = 'completada'; p.acierto = bien;
    toast(bien ? 'Respuesta correcta' : 'Respuesta incorrecta', bien ? 'Su racha sigue activa.' : 'Le enviaremos un refuerzo sobre este tema.', bien ? '' : 'warn');
    setTimeout(() => { closeModal(); render(); }, 2600);
  });
}

/* ------------------------------------------------------------
   19. Formularios (alta de colaborador, documento, campaña)
------------------------------------------------------------ */
const campoF = (l, ph, val = '') => `<div class="field"><span class="login__label">${l}</span><input placeholder="${ph}" value="${val}"></div>`;

function modalNuevoColaborador() {
  modal(modalHead('Registrar colaborador', 'El sistema activa la ruta inicial y envía el correo de bienvenida al guardar') + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:0 16px">
        ${campoF('Nombre completo', 'Ej. Ana Paredes')}
        ${campoF('Correo corporativo', 'nombre.apellido@jalasoft.com')}
        ${campoF('Cargo', 'Ej. QA Engineer')}
        <div class="field"><span class="login__label">Área</span>
          <select style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">${DB.areas.map(a => `<option>${a.nombre}</option>`).join('')}</select></div>
        <div class="field"><span class="login__label">Manager responsable</span>
          <select style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">
            ${['Iván Suárez','Gabriela Rocha','Sofía Terceros','Ruth Peñaranda','Lorena Vargas','Patricia Nogales'].map(m => `<option>${m}</option>`).join('')}</select></div>
        ${campoF('Fecha de ingreso', '', '2026-09-21')}
      </div>
      <div class="divider"></div>
      <div class="sec__t">Ruta que se asignará automáticamente</div>
      <div class="doclist">
        ${['DOC-010','DOC-002','DOC-003','DOC-001','DOC-007'].map(id => { const d = doc(id); return `
          <div class="docitem" style="padding:9px 12px">
            <span class="docitem__ic" style="width:28px;height:32px">${svg(ICO.file)}</span>
            <span class="docitem__b"><b style="font-size:13px">${esc(d.titulo)}</b>
              <span class="docitem__m"><span>v${d.version}</span><span>${d.minutos} min</span></span></span>
            <span class="docitem__a"><span class="badge badge--info">Obligatorio</span></span></div>`; }).join('')}
      </div>
      <label class="row mt-16" style="gap:8px;font-size:13.2px"><input type="checkbox" checked> Enviar correo de bienvenida y activar la fase 1 de inmediato</label>
    </div>
    <div class="modal__foot"><span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="saveCol">Registrar y activar ruta</button></div>`, 'modal--wide');
  bindModal();
  $('#saveCol').onclick = () => {
    const inputs = $$('.modal__body input');
    const nombre = inputs[0].value.trim() || 'Ana Paredes';
    S.colaboradores.unshift({ id:'C-' + (1025 + S.colaboradores.length), nombre, cargo:inputs[2].value.trim() || 'QA Engineer',
      area:'QA', manager:'Gabriela Rocha', ingreso:'2026-09-21', fase:1, progreso:4, estado:'por_iniciar',
      promedio:0, pendientes:5, ultimaActividad:'Sin actividad', riesgo:'bajo' });
    closeModal();
    toast('Colaborador registrado', `${nombre} recibió el correo de bienvenida y su ruta está activa.`);
    render();
  };
}

function modalNuevoDocumento() {
  modal(modalHead('Publicar documento', 'La IA clasifica el nivel del cambio y define si corresponde una micro evaluación') + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:0 16px">
        ${campoF('Título del documento', 'Ej. Política de Teletrabajo')}
        ${campoF('Código', 'Ej. POL-RH-021')}
        <div class="field"><span class="login__label">Categoría</span>
          <select style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">${DB.categorias.map(c => `<option>${c}</option>`).join('')}</select></div>
        ${campoF('Versión', '1.0', '1.0')}
      </div>
      <div class="field"><span class="login__label">Audiencia</span>
        <div class="row wrap" style="gap:14px;padding-top:4px">
          ${DB.areas.map((a, i) => `<label class="row" style="gap:7px;font-size:13.2px"><input type="checkbox" ${i < 3 ? 'checked' : ''}> ${a.nombre}</label>`).join('')}
        </div></div>
      <div class="divider"></div>
      <div class="row wrap" style="gap:18px">
        <label class="row" style="gap:8px;font-size:13.2px"><input type="checkbox" checked> Lectura obligatoria</label>
        <label class="row" style="gap:8px;font-size:13.2px"><input type="checkbox" checked> Generar evaluación con IA</label>
        <label class="row" style="gap:8px;font-size:13.2px"><input type="checkbox" checked> Notificar a los colaboradores afectados</label>
      </div>
    </div>
    <div class="modal__foot"><span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="savDoc">Publicar documento</button></div>`, 'modal--wide');
  bindModal();
  $('#savDoc').onclick = () => {
    closeModal();
    toast('Documento publicado', 'La IA está analizando el contenido para generar la evaluación.', 'ia');
    setTimeout(() => toast('Evaluación generada', '5 preguntas propuestas y notificación enviada a 164 colaboradores.', 'ia'), 2400);
  };
}

function modalNuevaCampana() {
  modal(modalHead('Crear campaña de micro aprendizaje', 'Refuerzo periódico sobre un documento vigente o una brecha detectada') + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:0 16px">
        ${campoF('Nombre de la campaña', 'Ej. Información que no puede compartirse', 'Información que no puede compartirse')}
        <div class="field"><span class="login__label">Documento base</span>
          <select style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">${S.documentos.map(d => `<option ${d.id === 'DOC-005' ? 'selected' : ''}>${d.titulo}</option>`).join('')}</select></div>
        <div class="field"><span class="login__label">Periodicidad</span>
          <select style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px"><option>Semanal</option><option>Quincenal</option><option>Mensual</option></select></div>
        ${campoF('Duración (semanas)', '4', '4')}
      </div>
      <div class="field"><span class="login__label">Audiencia</span>
        <div class="row wrap" style="gap:14px;padding-top:4px">
          ${DB.areas.map((a, i) => `<label class="row" style="gap:7px;font-size:13.2px"><input type="checkbox" ${i < 2 ? 'checked' : ''}> ${a.nombre}</label>`).join('')}
        </div></div>
      <div class="divider"></div>
      <div class="ia" style="padding:14px 16px">
        <span class="ia__badge">${svg(ICO.spark)} IA</span>
        <p class="small" style="margin:9px 0 0;color:var(--text-2)">Se generarán 3 píldoras por semana a partir de las secciones con mayor índice de error. La dificultad se ajusta según el desempeño de cada colaborador.</p>
      </div>
    </div>
    <div class="modal__foot"><span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="savCam">Crear y activar</button></div>`, 'modal--wide');
  bindModal();
  $('#savCam').onclick = () => {
    S.campanas.unshift({ id:'MA-' + (27 + S.campanas.length), nombre:'Información que no puede compartirse',
      enfoque:'Refuerzo de brecha', docId:'DOC-005', periodicidad:'Semanal', audiencia:'Engineering, Quality Control',
      alcance:186, respuesta:0, acierto:0, estado:'activa', proxima:'2026-09-18' });
    closeModal();
    toast('Campaña activada', '186 colaboradores recibirán la primera píldora el viernes.', 'ia');
    render();
  };
}

function confirmarAsignacion() {
  const docs = $$('[data-asig]:checked').length;
  const dest = $$('[data-dest]:checked').length;
  if (!docs || !dest) { toast('Faltan datos', 'Seleccione al menos un documento y un colaborador.', 'warn'); return; }
  toast('Documentación asignada', `${docs} documento(s) enviados a ${dest} colaborador(es). La IA generará su evaluación.`, 'ia');
  $$('[data-asig]:checked,[data-dest]:checked').forEach(c => c.checked = false);
  S.notifs.unshift({ id:'N-' + Date.now(), tipo:'recordatorio', titulo:'Asignación de documentación',
    detalle:`${docs} documento(s) asignados por ${S.user.nombre}.`, destino:`${dest} colaboradores`, fecha:'2026-09-16 · ahora', estado:'enviada' });
}

/* ------------------------------------------------------------
   20. Asistente documental (chatbot)
------------------------------------------------------------ */
function enviarChat(texto) {
  const t = (texto || '').trim(); if (!t) return;
  S.chat.push({ me: true, t: esc(t) });
  const log = $('#chatLog');
  log.insertAdjacentHTML('beforeend', msgHTML(S.chat[S.chat.length - 1]));
  $('#chatInput').value = '';
  log.scrollTop = log.scrollHeight;

  log.insertAdjacentHTML('beforeend', `<div class="msg" id="typing"><span class="msg__av">${svg(ICO.spark)}</span>
    <div class="msg__b"><span class="typing"><i></i><i></i><i></i></span></div></div>`);
  log.scrollTop = log.scrollHeight;

  setTimeout(() => {
    const q = t.toLowerCase();
    const hit = DB.chatbotKB.find(k => k.k.some(w => q.includes(w)));
    const resp = hit
      ? { me:false, t:esc(hit.r), fuente:hit.f }
      : { me:false, t:'No encontré esa información en los documentos que tiene asignados. Puedo ayudarle con seguridad de la información, uso de IA, reglamento interno, código de ética, control de calidad, gestión de accesos, confidencialidad, salud y seguridad, o rendición de gastos. También puede consultar directamente a su Manager.' };
    S.chat.push(resp);
    $('#typing').remove();
    log.insertAdjacentHTML('beforeend', msgHTML(resp));
    log.scrollTop = log.scrollHeight;
  }, 900 + Math.random() * 600);
}

/* ------------------------------------------------------------
   21. Notificaciones (popover)
------------------------------------------------------------ */
function pintarPop() {
  const lista = S.user.rol === 'colaborador'
    ? DB.avisosColaborador.map(a => ({ t:a.t, d:a.d, h:a.h }))
    : S.notifs.slice(0, 8).map(n => ({ t:n.titulo, d:n.detalle, h:n.fecha }));
  $('#popList').innerHTML = lista.map(n => `
    <div class="pop__i">
      <span class="feed__i brand">${svg(ICO.bell)}</span>
      <div style="min-width:0"><b>${esc(n.t)}</b><p>${esc(n.d)}</p><small>${esc(n.h)}</small></div>
    </div>`).join('');
}

/* ------------------------------------------------------------
   22. Arranque
------------------------------------------------------------ */
pintarRoles();
$('#loginBtn').onclick = entrar;
$('#logoutBtn').onclick = salir;
$('#menuBtn').onclick = () => $('#rail').classList.toggle('is-on');
$('#userBtn').onclick = () => toast('Perfil', `${S.user.nombre} · ${S.user.cargo}`, 'info');
$('#bellBtn').onclick = (e) => { e.stopPropagation(); $('#pop').classList.toggle('is-on'); };
$('#markAll').onclick = () => { $('#pop').classList.remove('is-on'); $('.dot').style.display = 'none'; toast('Notificaciones', 'Todas marcadas como leídas.', 'info'); };
$('#globalSearch').oninput = (e) => filtrarTabla(e.target.value);

document.addEventListener('click', (e) => {
  if (!e.target.closest('#pop') && !e.target.closest('#bellBtn')) $('#pop').classList.remove('is-on');
  if (!e.target.closest('.drawer') && !e.target.closest('.clickrow') && !e.target.closest('[data-col-open]')) closeDrawer();
});
$('#ov').onclick = (e) => { if (e.target.id === 'ov') { if (S.quiz) { clearInterval(S.quiz.timer); S.quiz = null; } closeModal(); } };
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { if (S.quiz) { clearInterval(S.quiz.timer); S.quiz = null; } closeModal(); closeDrawer(); $('#pop').classList.remove('is-on'); }
});
