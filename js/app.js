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
/* "Hoy" de la demostración. En Datos de ejemplo arranca en 2026-09-16; al empezar
   desde cero arranca en la fecha real. Se puede adelantar desde el chip de fecha
   de la barra superior para probar vencimientos y escalamientos. */
let HOY = '2026-09-16';
const pad2 = (n) => String(n).padStart(2, '0');
const hoyReal = () => { const d = new Date(); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; };
const ahora = () => { const d = new Date(); return `${HOY} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`; };
const diasEntre = (a, b) => Math.round((new Date(b.slice(0, 10) + 'T00:00:00') - new Date(a.slice(0, 10) + 'T00:00:00')) / 864e5);
const diasDesde = (iso) => iso ? diasEntre(iso, HOY) : 0;
const hashEvidencia = () => Math.random().toString(16).slice(2, 6) + '...' + Math.random().toString(16).slice(2, 6);

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
  refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  chevron:'<path d="m9 18 6-6-6-6"/>'
};
const svg = (p, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

/* ------------------------------------------------------------
   1. Estado
------------------------------------------------------------ */
/* Estado de sesión (no se guarda) + datos de trabajo (se guardan en localStorage,
   por separado para "Datos de ejemplo" y "Empezar desde cero"). */
const S = {
  modo: 'demo',
  user: null,
  rolSel: 'admin',
  cuentaSel: {},
  view: 'dashboard',
  chat: [],
  quiz: null,
  filtro: { area: '', estado: '', q: '' }
};

// v3: Etapa 3 por área (cambió la estructura de documentos; los datos v2 se descartan)
const STORE = 'jala-induccion.v3';
const PERSISTIR = ['hoy', 'colaboradores', 'pildoras', 'evidencias', 'notifs', 'campanas', 'documentos',
  'evaluaciones', 'usuarios', 'intentos', 'config', 'seq', 'ultimaExport'];
const CONFIG_BASE = {
  plazoLectura: 5, plazoEvaluacion: 3, plazoEspecifica: 5,
  recordatorioDias: 3, escalamientoDias: 5, intentos: 3, minimo: 80,
  preguntasIA: 8, umbralBrecha: 25, exigirInduccionParaAscenso: true,
  iaFlags: [true, true, true, false]
};
const clonar = (x) => JSON.parse(JSON.stringify(x));

function semilla(modo) {
  if (modo === 'cero') {
    // Desde cero: solo lo que la organización ya tiene configurado (documentos, etapas,
    // evaluaciones por etapa, 2 administradores y 3 managers). Ningún colaborador,
    // campaña, notificación ni evidencia: todo eso nace de lo que se haga en la app.
    return {
      hoy: hoyReal(), colaboradores: [], pildoras: [], evidencias: [], notifs: [], campanas: [],
      documentos: clonar(DB.documentos).map(d => ({ ...d, estado: 'vigente', asignados: 0, leidos: 0, indiceError: 0, intentos: 0 })),
      evaluaciones: clonar(DB.evaluaciones),
      usuarios: clonar([...DB.administradores, ...DB.managersBase]),
      intentos: [], config: { ...CONFIG_BASE }, seq: 1000, ultimaExport: null
    };
  }
  return {
    hoy: '2026-09-16',
    colaboradores: clonar(DB.colaboradores), pildoras: clonar(DB.pildoras), evidencias: clonar(DB.evidencias),
    notifs: clonar(DB.notificaciones), campanas: clonar(DB.campanas), documentos: clonar(DB.documentos),
    evaluaciones: clonar(DB.evaluaciones),
    usuarios: clonar([...DB.administradores, ...DB.managersBase, ...DB.managersDemo]),
    intentos: [], config: { ...CONFIG_BASE }, seq: 1100, ultimaExport: '2026-09-12'
  };
}

function guardar() {
  try {
    const data = {};
    PERSISTIR.forEach(k => { data[k] = S[k]; });
    localStorage.setItem(`${STORE}.${S.modo}`, JSON.stringify(data));
    localStorage.setItem(`${STORE}.modo`, S.modo);
  } catch (e) { /* almacenamiento no disponible: la demo sigue funcionando en memoria */ }
}

function cargarModo(modo) {
  S.modo = modo;
  let data = null;
  try { data = JSON.parse(localStorage.getItem(`${STORE}.${modo}`) || 'null'); } catch (e) { data = null; }
  const fresco = !data;
  Object.assign(S, semilla(modo), data || {});
  S.config = { ...CONFIG_BASE, ...(S.config || {}) };
  HOY = S.hoy;
  if (fresco && modo === 'demo') inicializarRutas();
  // Desde cero sigue al calendario real: si pasaron días desde la última visita, corren las reglas.
  if (modo === 'cero' && hoyReal() > S.hoy) { S.hoy = HOY = hoyReal(); }
  ejecutarAutomatizaciones();
  guardar();
}

function reiniciarModo(modo) {
  try { localStorage.removeItem(`${STORE}.${modo}`); } catch (e) { /* sin almacenamiento */ }
  S.cuentaSel = {};
  cargarModo(modo);
}

const nuevoId = (pref) => { S.seq = (S.seq || 1000) + 1; return pref + S.seq; };
const esCero = () => S.modo === 'cero';

const doc  = (id) => S.documentos.find(d => d.id === id);
const evalu = (id) => S.evaluaciones.find(e => e.id === id);
const areaNom = (id) => (DB.areas.find(a => a.id === id) || {}).nombre || id;
const managers = () => S.usuarios.filter(u => u.rol === 'manager');
const activos = () => S.colaboradores.filter(c => c.estadoAlta === 'activo');
const promedioDe = (lista) => { const v = lista.filter(c => c.promedio); return v.length ? Math.round(v.reduce((a, c) => a + c.promedio, 0) / v.length) : null; };
const fmtPct = (v) => v == null ? '—' : v + '%';
const recalcularTodos = () => S.colaboradores.forEach(recalcularColaborador);
const actividadTxt = (c) => {
  if (!c.ultimaActividadFecha) return c.ultimaActividad || 'Sin actividad';
  const d = diasEntre(c.ultimaActividadFecha, HOY);
  return d <= 0 ? 'Hoy' : d === 1 ? 'Hace 1 día' : `Hace ${d} días`;
};
const marcarActividad = (c) => { c.ultimaActividadFecha = HOY; c.ultimaActividad = 'Hoy'; };

/* ------------------------------------------------------------
   2.1 Rutas de documentos por área — se arman directamente de la
   audiencia real de cada documento (documento.areas) y quedan
   ordenadas por etapa (Etapa 1 → Etapa 2 → Etapa 3 según el área).
   Etapas 1 y 2: obligatorias para todos. Etapa 3: cada área tiene
   su propio conjunto; el Admin propone los marcados porDefecto y el
   Manager, al validar, puede quitarlos o sumar los demás de la Etapa 3.
------------------------------------------------------------ */
const etapaDe = (d) => d && DB.etapas.find(x => x.id === d.etapaId);
const esEtapaArea = (d) => { const e = etapaDe(d); return !!e && e.alcance === 'area'; };
const docsEtapa3 = (areaId) => S.documentos.filter(d => esEtapaArea(d) && d.areas.includes(areaId));
const rutaBaseParaArea = (areaId) => S.documentos
  .filter(d => d.areas.includes(areaId) && (!esEtapaArea(d) || d.porDefecto))
  .sort((a, b) => ((etapaDe(a) || {}).orden || 9) - ((etapaDe(b) || {}).orden || 9))
  .map(d => d.id);
const origenParaDoc = (docId) => { const d = doc(docId); const e = etapaDe(d); return e ? e.nombre : 'Ruta de área'; };

/* Documentos del área agrupados por etapa, para el alta (Admin) y la validación (Manager) */
function documentosPorEtapa(areaId) {
  return [...DB.etapas].sort((a, b) => a.orden - b.orden)
    .filter(e => e.alcance === 'general' || e.areas.includes(areaId))
    .map(e => ({ etapa: e, docs: S.documentos.filter(d => d.etapaId === e.id && d.areas.includes(areaId)) }))
    .filter(g => g.docs.length);
}

/* La evaluación de Etapa 3 se arma por colaborador con las preguntas de los
   documentos de su área que tiene en la ruta: si le validaron 3 de 4, no se le
   pregunta por el cuarto. Se vuelve a armar si el Manager suma o quita documentos. */
function armarEvaluacionEtapa3(c) {
  if (c.estadoAlta === 'pendiente_validacion') return null; // se arma al validar
  const enRuta = (c.documentosRuta || []).filter(md => esEtapaArea(doc(md.docId)) && md.etapaId);
  const id = 'EV-ETP3-' + c.id;
  let me = (c.evaluacionesRuta || []).find(e => e.evId === id);
  if (!enRuta.length) {
    c.evaluacionesRuta = (c.evaluacionesRuta || []).filter(e => e.evId !== id);
    return null;
  }
  const etapa = etapaDe(doc(enRuta[0].docId));
  const preguntas = enRuta.flatMap(md => {
    const d = doc(md.docId);
    return (d.preguntas && d.preguntas.length ? d.preguntas : generarPreguntasIA(d, 2).map(({ activa, ...p }) => p))
      .map(p => ({ ...p, o: [...p.o], docId: d.id }));
  });
  let ev = S.evaluaciones.find(e => e.id === id);
  if (!ev) {
    ev = { id, etapaId: etapa.id, colaboradorId: c.id, generadaPor: 'IA · Gemini Pro', fecha: HOY,
      minimo: S.config.minimo, intentos: S.config.intentos };
    S.evaluaciones.push(ev);
  }
  Object.assign(ev, { etapaId: etapa.id, titulo: `Evaluación · ${etapa.nombre.replace('Etapa 3 · Documentación específica: ', 'Etapa 3: ')} (${c.nombre})`,
    minutos: Math.max(5, enRuta.length * 3), preguntas, docs: enRuta.map(md => md.docId) });
  if (!me) {
    me = { evId: id, etapaId: etapa.id, estado: 'bloqueada', puntaje: null, fecha: null, intento: 0 };
    c.evaluacionesRuta = (c.evaluacionesRuta || []).concat(me);
  }
  // Si todavía no la aprobó, su estado depende de si ya leyó todo lo de la etapa
  if (me.estado !== 'aprobada') {
    const todoLeido = enRuta.every(md => md.estado === 'leido');
    if (!todoLeido) me.estado = 'bloqueada';
    else if (me.estado === 'bloqueada') { me.estado = 'pendiente'; me.vence = sumarDias(HOY, S.config.plazoEvaluacion); }
  }
  return ev;
}

const sumarDias = (iso, n) => { const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const correoDe = (nombre) => nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().replace(/\s+/g, '.') + '@jalasoft.com';

/* ------------------------------------------------------------
   2.2 Recalcular fase, avance, promedio y pendientes de un
   colaborador a partir de su ruta real (documentosRuta / evaluacionesRuta).
   Se ejecuta cada vez que algo cambia, para que el panel del Admin,
   el del Manager y el del propio colaborador muestren siempre el mismo número.
------------------------------------------------------------ */
function recalcularColaborador(c) {
  const docs = c.documentosRuta || [];
  const evals = c.evaluacionesRuta || [];
  const docsLeidos = docs.filter(d => d.estado === 'leido').length;
  const evalsAprobadas = evals.filter(e => e.estado === 'aprobada').length;
  const conPuntaje = evals.filter(e => e.puntaje != null);

  const total = docs.length + evals.length;
  const hechos = docsLeidos + evalsAprobadas;
  c.progreso = total ? pct(hechos, total) : 0;
  // El promedio se calcula únicamente sobre exámenes rendidos (nunca sobre lecturas).
  c.promedio = conPuntaje.length ? Math.round(conPuntaje.reduce((a, e) => a + e.puntaje, 0) / conPuntaje.length) : 0;

  // "Pendientes" = evaluaciones que el colaborador todavía debe rendir.
  // 1) Una por cada documento de su ruta que aún no está aprobado (sin importar si ya
  //    desbloqueó la evaluación o todavía ni lee el documento): si le asignaron 10
  //    documentos, arranca con 10 pendientes, y baja de a 1 a medida que aprueba.
  // 2) Más las evaluaciones de campañas de micro aprendizaje (brechas) que le llegan
  //    DESPUÉS de que ya inició su ruta — nunca al momento de crearlo, porque esas
  //    campañas no son parte de su documentación asignada. Si además tiene alguna
  //    evaluación de campaña ya respondida y aprobada, no vuelve a contar hasta el
  //    siguiente envío (periodicidad).
  const { aprobados: docsAprobados, total: docsTotal } = docResumen(c);
  const pendDocs = docsTotal - docsAprobados;
  // Desde cero, cada envío de campaña ya recibido cuenta como pendiente hasta que se responde.
  // En los datos de ejemplo se mantiene la lógica original (una por campaña activa).
  const campPend = c.estadoAlta !== 'activo' ? 0
    : esCero() ? enviosPara(c).filter(e => !e.respondido).length
    : campaniasPara(c.area).filter(cm => !(c.campaniasRespondidas || []).includes(cm.id)).length;
  c.pendientes = pendDocs + campPend;

  if (c.estadoAlta === 'pendiente_validacion') { c.fase = 0; c.estado = 'por_iniciar'; return; }
  if (!docs.length) { c.fase = 1; }
  else if (docsLeidos < docs.length) { c.fase = 2; }
  else if (evalsAprobadas < evals.length) { c.fase = 3; }
  else { c.fase = 5; }

  // El estado depende SOLO de la ruta de documentos/evaluaciones (no de las campañas
  // periódicas): si una actualización mayor obliga a releer un documento, el conteo
  // de "aprobados" baja y el colaborador vuelve a "en curso" hasta volver a aprobar.
  // Los registros nuevos (y todo el modo desde cero) usan reglas reales de vencimiento;
  // los colaboradores semilla conservan el "atrasado" y el riesgo con que vienen.
  const reglasReales = esCero() || !!c.registradoPor;
  if (docsTotal && docsAprobados >= docsTotal) {
    c.estado = 'completado';
    if (!c.cerradoEl) c.cerradoEl = HOY;
  } else if (reglasReales) {
    c.cerradoEl = null;
    c.estado = tieneVencidos(c) ? 'atrasado' : docsLeidos === 0 && !evals.some(e => e.puntaje != null) ? 'por_iniciar' : 'en_curso';
  }
  else if (c.estado === 'atrasado') { /* se conserva el riesgo ya marcado en el dato semilla */ }
  else if (docsAprobados === 0) c.estado = 'por_iniciar';
  else c.estado = 'en_curso';

  if (reglasReales) {
    const agotadas = evals.some(e => e.estado === 'reprobada' && e.intento >= S.config.intentos);
    c.riesgo = c.estado === 'atrasado' || agotadas ? 'alto' : evals.some(e => e.estado === 'reprobada') ? 'medio' : 'bajo';
  }
}

/* Documento o evaluación con fecha de vencimiento ya pasada y sin completar */
function tieneVencidos(c) {
  return (c.documentosRuta || []).some(d => d.estado === 'pendiente' && d.vence && d.vence < HOY)
    || (c.evaluacionesRuta || []).some(e => (e.estado === 'pendiente' || e.estado === 'reprobada') && e.vence && e.vence < HOY);
}

/* Motivos por los que un colaborador aparece en "Requiere atención" (Admin y Manager) */
function motivosAtencion(c) {
  const m = [];
  if (c.estadoAlta === 'pendiente_validacion') m.push(`Pendiente de validación de ${c.manager}`);
  const venc = (c.documentosRuta || []).filter(d => d.estado === 'pendiente' && d.vence && d.vence < HOY).length;
  if (c.estadoAlta === 'activo' && venc) m.push(`${venc} lectura(s) vencida(s)`);
  const rep = (c.evaluacionesRuta || []).filter(e => e.estado === 'reprobada');
  rep.forEach(e => { const ev = evalu(e.evId); m.push(`${e.intento >= S.config.intentos ? 'Intentos agotados en' : 'Reprobó'} ${ev ? ev.titulo.replace('Evaluación · ', '') : 'una evaluación'}`); });
  if (c.estadoAlta === 'activo' && c.estado !== 'completado' && c.ultimaActividadFecha) {
    const sin = diasEntre(c.ultimaActividadFecha, HOY);
    if (sin >= S.config.recordatorioDias) m.push(`${sin} días sin actividad`);
  }
  if (!m.length && c.riesgo && c.riesgo !== 'bajo' && c.estado !== 'completado') m.push(`Riesgo ${c.riesgo} · ${c.ultimaActividad || 'sin actividad'}`);
  return m;
}
const requiereAtencion = (c) => c.rolActual !== 'manager' && motivosAtencion(c).length > 0;

/* Colaborador con el que se inició sesión ahora mismo */
const colaboradorActivo = () => S.colaboradores.find(c => c.id === S.user.colaboradorId);

/* ------------------------------------------------------------
   2.2b Documentos: sólo cuenta como "aprobado" un documento leído
   cuando, además, su evaluación asociada (si tiene) está aprobada.
   Esto reemplaza la antigua noción de "Fase X de 5" por algo que
   el Admin y el colaborador entienden de un vistazo: 7/10 documentos.
------------------------------------------------------------ */
function docResumen(c) {
  const docs = c.documentosRuta || [];
  const total = docs.length;
  const aprobados = docs.filter(d => {
    if (d.estado !== 'leido') return false;
    // 1) Evaluación de la ETAPA a la que pertenece el documento (cubre varios
    //    documentos a la vez): si está pendiente/bloqueada, el documento no cuenta
    //    como aprobado todavía, aunque ya se haya leído.
    if (d.etapaId) {
      const rutaEtapa = (c.evaluacionesRuta || []).find(e => e.etapaId === d.etapaId);
      if (rutaEtapa && rutaEtapa.estado !== 'aprobada') return false;
    }
    // 2) Evaluación ad-hoc asignada específicamente a ESTE documento (generada
    //    desde Evaluaciones o desde una actualización mayor), independiente de la etapa.
    const rutaDoc = (c.evaluacionesRuta || []).find(e => !e.etapaId && evalu(e.evId) && evalu(e.evId).docId === d.docId);
    if (rutaDoc && rutaDoc.estado !== 'aprobada') return false;
    return true;
  }).length;
  return { aprobados, total };
}
const docTxt = (c) => { const r = docResumen(c); return `${r.aprobados}/${r.total || 0}`; };

/* Resumen de avance por etapa, para mostrar en la ficha del colaborador. */
function etapasResumen(c) {
  const docs = c.documentosRuta || [];
  const etapasIds = [...new Set(docs.map(d => d.etapaId).filter(Boolean))];
  const res = etapasIds.map(etapaId => {
    const e = DB.etapas.find(x => x.id === etapaId);
    const docsEtapa = docs.filter(d => d.etapaId === etapaId);
    const leidos = docsEtapa.filter(d => d.estado === 'leido').length;
    const evalRuta = (c.evaluacionesRuta || []).find(x => x.etapaId === etapaId);
    return { etapaId, nombre: e ? e.nombre : etapaId, orden: e ? e.orden : 99, docs: docsEtapa, leidos, total: docsEtapa.length, evalRuta };
  }).sort((a, b) => a.orden - b.orden);
  // Documentos sumados fuera de las etapas (asignados por el Manager o por una actualización)
  const extra = docs.filter(d => !d.etapaId);
  if (extra.length) {
    res.push({ etapaId: null, nombre: 'Documentación adicional', orden: 99, docs: extra,
      leidos: extra.filter(d => d.estado === 'leido').length, total: extra.length, evalRuta: null });
  }
  return res;
}

/* ¿La audiencia de una campaña incluye a esta área? */
function audienciaIncluye(cm, areaId) {
  if (cm.areas) return cm.areas.includes(areaId);
  const a = DB.areas.find(x => x.id === areaId); if (!a) return false;
  if (cm.audiencia.includes('Toda la organización')) return true;
  return cm.audiencia.split(',').map(t => t.trim()).some(t => t === a.id || t === a.nombre);
}

/* Campañas de micro aprendizaje activas cuya audiencia alcanza a un área
   (se usan como "pendientes" recurrentes, aunque el colaborador ya haya
   terminado toda su ruta inicial de documentos). */
function campaniasPara(areaId) {
  return S.campanas.filter(c => c.estado === 'activa' && audienciaIncluye(c, areaId));
}

/* Envíos de micro aprendizaje que ya recibió un colaborador (modo desde cero).
   Cada campaña programa N evaluaciones; las que tienen fecha <= hoy y son
   posteriores a la activación de la ruta del colaborador ya le llegaron. */
function enviosPara(c) {
  if (c.estadoAlta !== 'activo') return [];
  const resp = c.microRespuestas || [];
  const desde = c.activadoEl || '0000-00-00';
  return campaniasPara(c.area).flatMap(cm => (cm.evaluaciones || [])
    .filter(e => e.fecha <= HOY && e.fecha >= desde)
    .map(e => ({ campId: cm.id, cm, n: e.n, fecha: e.fecha, preguntas: e.preguntas,
      respondido: resp.find(r => r.campId === cm.id && r.n === e.n) || null })));
}

/* ------------------------------------------------------------
   2.3 Siembra inicial: le da a cada colaborador una ruta real.
   Camila Rojas conserva el detalle curado de la demo; el resto de
   los 24 colaboradores recibe una ruta sintetizada a partir de su
   área y de su fase/avance semilla, para que el número que ve el
   Admin y el que vería ese colaborador si iniciara sesión coincidan.
------------------------------------------------------------ */
function inicializarRutas() {
  const camila = S.colaboradores.find(c => c.id === 'C-1001');
  if (camila) {
    camila.documentosRuta = clonar(DB.misDocumentos).map(md => ({ ...md, etapaId: doc(md.docId).etapaId }));
    camila.evaluacionesRuta = JSON.parse(JSON.stringify(DB.misEvaluaciones));
    camila.estadoAlta = 'activo';
  }
  S.colaboradores.forEach(c => {
    if (!c.estadoAlta) c.estadoAlta = 'activo';
    if (!c.documentosRuta) {
      const ids = rutaBaseParaArea(c.area);
      const leidosN = Math.round((c.progreso / 100) * ids.length);
      c.documentosRuta = ids.map((docId, i) => ({
        docId,
        etapaId: doc(docId).etapaId,
        estado: i < leidosN ? 'leido' : 'pendiente',
        confirmado: i < leidosN ? sumarDias(c.ingreso, i + 1) + ' · registrado' : null,
        vence: sumarDias(c.ingreso, 5 + i),
        origen: origenParaDoc(docId)
      }));
      // Una evaluación por cada ETAPA presente en su ruta (no una por documento):
      // se desbloquea solo cuando todos los documentos de esa etapa están leídos.
      const etapasEnRuta = [...new Set(c.documentosRuta.map(d => d.etapaId).filter(Boolean))];
      c.evaluacionesRuta = etapasEnRuta.map(etapaId => {
        const ev = S.evaluaciones.find(e => e.etapaId === etapaId && !e.colaboradorId);
        if (!ev) return null;
        const docsEtapa = c.documentosRuta.filter(d => d.etapaId === etapaId);
        const todosLeidos = docsEtapa.every(d => d.estado === 'leido');
        if (!todosLeidos) return { evId: ev.id, etapaId, estado: 'bloqueada', puntaje: null, fecha: null, intento: 0 };
        const aprobada = c.estado === 'completado' || c.promedio >= 70;
        return aprobada
          ? { evId: ev.id, etapaId, estado: 'aprobada', puntaje: c.promedio || 80, fecha: sumarDias(c.ingreso, 6) + ' · registrado', intento: 1 }
          : { evId: ev.id, etapaId, estado: 'pendiente', puntaje: null, fecha: null, intento: 0 };
      }).filter(Boolean);
      // Etapa 3: evaluación armada con sus documentos de área; si ya leyó todo, se
      // considera rendida con el mismo criterio que las demás etapas semilla.
      const me3 = armarEvaluacionEtapa3(c) && c.evaluacionesRuta.find(e => e.evId === 'EV-ETP3-' + c.id);
      if (me3 && me3.estado === 'pendiente' && (c.estado === 'completado' || c.promedio >= 70)) {
        Object.assign(me3, { estado: 'aprobada', puntaje: c.promedio || 80, fecha: sumarDias(c.ingreso, 9) + ' · registrado', intento: 1 });
      }
    } else {
      armarEvaluacionEtapa3(c);
    }
    recalcularColaborador(c);
  });
}

/* ------------------------------------------------------------
   2.4 Automatizaciones. Corren en cada render y al adelantar la
   fecha simulada; cada aviso tiene una clave para no repetirse.
   Reglas: vencimiento en 48 h, lectura vencida (aviso al Manager),
   inactividad (recordatorio y escalamiento), ruta completada y
   envíos programados de campañas de micro aprendizaje.
------------------------------------------------------------ */
function notificar(n) {
  S.notifs.unshift({ id: nuevoId('N-'), fecha: ahora(), estado: 'enviada', ...n });
}

function ejecutarAutomatizaciones() {
  const cfg = S.config;
  let ejecutadas = 0;
  const avisar = (c, clave, n) => {
    c.avisos = c.avisos || [];
    if (c.avisos.includes(clave)) return;
    c.avisos.push(clave); notificar(n); ejecutadas++;
  };

  S.colaboradores.forEach(c => {
    recalcularColaborador(c);
    // Las reglas por colaborador solo aplican a registros reales (no a la semilla de ejemplo)
    if (c.estadoAlta !== 'activo' || !(esCero() || c.registradoPor)) return;
    if (c.estado === 'completado') {
      avisar(c, 'ruta-completa', { tipo: 'bienvenida', titulo: 'Ruta completada',
        detalle: `${c.nombre} aprobó todos sus documentos. Constancia emitida y evidencia registrada.`, destino: `${c.nombre} · ${c.manager}` });
      return;
    }
    c.documentosRuta.forEach(md => {
      const d = doc(md.docId);
      if (!d || md.estado !== 'pendiente' || !md.vence) return;
      const falta = diasEntre(HOY, md.vence);
      if (falta >= 0 && falta <= 2) avisar(c, `venc-${md.docId}-${md.vence}`, { tipo: 'vencimiento', titulo: 'Vencimiento próximo',
        detalle: `${d.titulo} vence el ${fechaLarga(md.vence)}.`, destino: c.nombre, estado: 'enviada' });
      if (falta < 0) avisar(c, `vencido-${md.docId}-${md.vence}`, { tipo: 'escalamiento', titulo: 'Lectura vencida',
        detalle: `${c.nombre} no confirmó ${d.titulo} antes del ${fechaLarga(md.vence)}.`, destino: `${c.manager} · ${c.nombre}` });
    });
    const ref = c.ultimaActividadFecha || c.activadoEl;
    if (ref) {
      const sin = diasEntre(ref, HOY);
      if (sin >= cfg.recordatorioDias) avisar(c, `rec-${ref}`, { tipo: 'recordatorio', titulo: 'Recordatorio por inactividad',
        detalle: `${c.nombre} lleva ${sin} días sin actividad en su ruta de inducción.`, destino: c.nombre });
      if (sin >= cfg.escalamientoDias) avisar(c, `esc-${ref}`, { tipo: 'escalamiento', titulo: 'Escalamiento a Manager',
        detalle: `${c.nombre} acumula ${sin} días sin actividad en su ruta de inducción.`, destino: c.manager });
    }
  });

  S.campanas.filter(cm => cm.estado === 'activa').forEach(cm => (cm.evaluaciones || []).forEach(e => {
    cm.notificados = cm.notificados || [];
    if (e.fecha > HOY || cm.notificados.includes(e.n)) return;
    cm.notificados.push(e.n);
    notificar({ tipo: 'campana', titulo: 'Envío de micro aprendizaje',
      detalle: `${cm.nombre}: evaluación ${e.n} de ${cm.evaluaciones.length} enviada a ${campStats(cm).alcance} colaborador(es).`, destino: cm.audiencia });
    ejecutadas++;
  }));

  recalcularTodos();
  return ejecutadas;
}

/* ------------------------------------------------------------
   2.5 Métricas vivas. En "Datos de ejemplo" algunas cifras de
   la organización (248 personas, series históricas) son semilla;
   desde cero todo sale de lo que realmente se registró.
------------------------------------------------------------ */
function lecturaGlobal() {
  let total = 0, leidas = 0;
  activos().forEach(c => c.documentosRuta.forEach(d => { total++; if (d.estado === 'leido') leidas++; }));
  return { total, leidas, p: total ? pct(leidas, total) : null };
}

function docStats(d) {
  if (!esCero()) return d;
  const conDoc = activos().filter(c => c.documentosRuta.some(x => x.docId === d.id));
  const leidos = conDoc.filter(c => c.documentosRuta.some(x => x.docId === d.id && x.estado === 'leido')).length;
  const evIds = S.evaluaciones.filter(e => (d.etapaId && e.etapaId === d.etapaId) || e.docId === d.id).map(e => e.id);
  const its = S.intentos.filter(i => evIds.includes(i.evId));
  const preg = its.reduce((a, i) => a + i.total, 0), mal = its.reduce((a, i) => a + i.total - i.correctas, 0);
  return { ...d, asignados: conDoc.length, leidos, intentos: its.length, indiceError: preg ? pct(mal, preg) : 0 };
}

function errorGlobal(its = S.intentos) {
  const preg = its.reduce((a, i) => a + i.total, 0), mal = its.reduce((a, i) => a + i.total - i.correctas, 0);
  return preg ? pct(mal, preg) : null;
}

/* Brechas: preguntas con más errores en los intentos registrados */
function brechasVivas(its = S.intentos) {
  // Se agrupa por pregunta: la misma pregunta aparece en las evaluaciones de
  // Etapa 3 de varios colaboradores (cada uno tiene la suya).
  const porPregunta = {};
  S.evaluaciones.forEach(ev => {
    const deEv = its.filter(i => i.evId === ev.id); if (!deEv.length) return;
    const et = ev.etapaId && DB.etapas.find(x => x.id === ev.etapaId);
    ev.preguntas.forEach((p, qi) => {
      const docRef = doc(p.docId || ev.docId) || S.documentos.find(d => d.etapaId === ev.etapaId);
      const k = p.q + '|' + (docRef ? docRef.id : ev.id);
      const g = porPregunta[k] = porPregunta[k] || { tema: p.q, doc: p.docId && docRef ? docRef.titulo : et ? et.nombre : (docRef ? docRef.titulo : ev.titulo),
        docId: docRef ? docRef.id : '', intentos: 0, fallos: [], tendencia: null };
      g.intentos += deEv.length;
      g.fallos.push(...deEv.filter(i => (i.fallas || []).includes(qi)));
    });
  });
  return Object.values(porPregunta).filter(g => g.fallos.length)
    .map(g => ({ ...g, error: pct(g.fallos.length, g.intentos), afectados: new Set(g.fallos.map(i => i.colId)).size }))
    .sort((a, b) => b.error - a.error);
}
const brechas = () => esCero() ? brechasVivas() : DB.series.brechas;

function campStats(cm) {
  if (!esCero()) return cm;
  const aud = activos().filter(c => audienciaIncluye(cm, c.area));
  const enviados = aud.flatMap(c => enviosPara(c).filter(e => e.campId === cm.id));
  const resp = enviados.filter(e => e.respondido);
  const preg = resp.reduce((a, e) => a + e.respondido.total, 0), ok = resp.reduce((a, e) => a + e.respondido.correctas, 0);
  return { ...cm, alcance: aud.length, enviados: enviados.length, respondidos: resp.length,
    respuesta: pct(resp.length, enviados.length), acierto: preg ? pct(ok, preg) : 0 };
}

/* Distribución de estados (dona del panel y del detalle por área) */
const distribucion = (lista) => ['completado', 'en_curso', 'atrasado', 'por_iniciar'].map(k => ({
  label: ESTADOS[k][1], valor: lista.filter(c => c.estado === k).length,
  color: k === 'completado' ? 'ok' : k === 'en_curso' ? 'info' : k === 'atrasado' ? 'warn' : 'muted'
}));

/* ------------------------------------------------------------
   2. Navegación por rol
------------------------------------------------------------ */
const NAV = {
  admin: [
    { g: 'Operación' },
    { id:'dashboard',    t:'Panel general',        i:'home' },
    { id:'colaboradores',t:'Colaboradores',        i:'users', badge:() => S.colaboradores.filter(c => c.estado === 'atrasado').length, alert:true },
    { id:'roles',        t:'Managers y ascensos',  i:'award' },
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
    { id:'validar',   t:'Nuevos por validar', i:'alert', badge:() => S.colaboradores.filter(c => c.estadoAlta === 'pendiente_validacion' && c.manager === S.user.nombre).length, alert:true },
    { id:'equipo',    t:'Colaboradores',    i:'users' },
    { id:'asignar',   t:'Asignar documentos', i:'file' },
    { id:'evaluaciones', t:'Resultados',    i:'check' },
    { g: 'Seguimiento' },
    { id:'notificaciones', t:'Escalamientos', i:'bell' },
    { id:'analitica', t:'Brechas del equipo', i:'chart' }
  ],
  colaborador: [
    { g: 'Mi inducción' },
    { id:'dashboard', t:'Mi progreso',       i:'home' },
    { id:'misdocs',   t:'Mis documentos',    i:'book', badge:() => { const ca = colaboradorActivo(); return ca.estadoAlta === 'pendiente_validacion' ? 0 : ca.documentosRuta.filter(d => d.estado === 'pendiente').length; } },
    { id:'misevals',  t:'Mis evaluaciones',  i:'check', badge:() => { const ca = colaboradorActivo(); return ca.estadoAlta === 'pendiente_validacion' ? 0 : ca.evaluacionesRuta.filter(e => e.estado === 'pendiente').length; }, alert:true },
    { g: 'Continuo' },
    { id:'mimicro',   t:'Micro aprendizaje', i:'zap', badge:() => { const ca = colaboradorActivo(); return ca.estadoAlta === 'pendiente_validacion' ? 0 : esCero() ? enviosPara(ca).filter(e => !e.respondido).length : S.pildoras.filter(p => p.estado === 'pendiente').length; } },
    { id:'asistente', t:'Asistente documental', i:'chat' },
    { id:'certificados', t:'Mis constancias', i:'award' }
  ]
};

/* Un Manager que llegó por ascenso conserva su propia ruta: sigue recibiendo
   actualizaciones de documentos y debe confirmarlas como cualquier colaborador. */
const NAV_MI_CUMPLIMIENTO = [
  { g: 'Mi cumplimiento' },
  NAV.colaborador.find(i => i.id === 'misdocs'),
  NAV.colaborador.find(i => i.id === 'misevals'),
  NAV.colaborador.find(i => i.id === 'certificados')
];
const navDe = (rol) => rol === 'manager' && S.user.colaboradorId && colaboradorActivo() ? NAV.manager.concat(NAV_MI_CUMPLIMIENTO) : NAV[rol];

const TITULOS = {
  dashboard:['Panel general','Estado consolidado de la inducción, la comprensión y el refuerzo continuo.'],
  colaboradores:['Colaboradores','Seguimiento individual del avance, cumplimiento y riesgo de cada colaborador.'],
  roles:['Managers y ascensos','Quién gestiona equipos, quién puede ascender a Manager y cómo se transfieren los equipos.'],
  documentos:['Documentos','Repositorio controlado con versiones, audiencia y desempeño en evaluaciones.'],
  rutas:['Rutas de aprendizaje','Fases, documentos obligatorios y plazos definidos por área y rol.'],
  evaluaciones:['Evaluaciones','Evaluaciones generadas por IA a partir de los documentos asignados.'],
  micro:['Micro aprendizaje','Campañas periódicas de refuerzo y concientización.'],
  analitica:['Analítica y brechas','Documentos con mayor índice de error y temas con baja comprensión.'],
  notificaciones:['Automatizaciones','Notificaciones, recordatorios y escalamientos ejecutados por el sistema.'],
  evidencias:['Evidencias de cumplimiento','Registro trazable para auditorías y requisitos normativos.'],
  config:['Configuración','Parámetros de plazos, escalamiento y generación de evaluaciones.'],
  equipo:['Mi equipo','Avance de cada colaborador a su cargo y casos que requieren atención.'],
  validar:['Nuevos colaboradores por validar','Revise, ajuste y confirme la documentación antes de activar la ruta y avisar al colaborador.'],
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
  if (!values.length) return '<p class="small muted" style="margin:0">Sin datos todavía.</p>';
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
  if (!items.reduce((a, b) => a + b.valor, 0)) return `<div class="empty" style="padding:30px 10px"><b>Sin colaboradores todavía</b>La distribución aparece al registrar el primero.</div>`;
  const total = items.reduce((a, b) => a + b.valor, 0);
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
const badgeCol = (c) => (c.estadoAlta === 'pendiente_validacion' ? '<span class="badge badge--warn">Por validar</span>' : badgeEstado(c.estado))
  + (c.rolActual === 'manager' ? ' <span class="badge badge--info">Manager</span>' : '');
const vacio = (titulo, texto = '') => `<div class="empty">${svg(ICO.check)}<b>${titulo}</b>${texto}</div>`;
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
const ROLES = {
  admin: ['Administrador', 'Configura el sistema, la documentación, las campañas y los ascensos.'],
  manager: ['Manager', 'Valida a los nuevos, asigna documentación y monitorea a su equipo.'],
  colaborador: ['Colaborador', 'Completa lecturas, evaluaciones y micro aprendizaje.']
};

/* Cuentas con las que se puede ingresar en cada perfil */
function cuentasDe(rol) {
  if (rol === 'colaborador') {
    return S.colaboradores.filter(c => c.rolActual !== 'manager').map(c => ({ id: c.id, nombre: c.nombre,
      sub: areaNom(c.area) + (c.estadoAlta === 'pendiente_validacion' ? ' · pendiente de validación' : '') }));
  }
  return S.usuarios.filter(u => u.rol === rol).map(u => ({ id: u.id, nombre: u.nombre,
    sub: u.cargo + (u.origen === 'ascenso' ? ' · ascendido' : '') }));
}

function pintarLogin() {
  // Selector de modo de datos
  $$('#modeSw [data-modo]').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.modo === S.modo);
    b.onclick = () => { if (b.dataset.modo !== S.modo) { S.cuentaSel = {}; cargarModo(b.dataset.modo); pintarLogin(); } };
  });
  $('#modeInfo').innerHTML = (esCero()
    ? `<span>Solo documentos, etapas, evaluaciones, 2 administradores y 3 managers. Sin colaboradores: todo lo que haga se guarda y alimenta los paneles.</span>`
    : `<span>24 colaboradores, campañas y resultados simulados para recorrer la demostración.</span>`)
    + `<button type="button" id="resetModo">Restablecer</button>`;
  $('#resetModo').onclick = () => {
    if (!confirm(esCero() ? '¿Borrar todo lo registrado y volver a empezar desde cero?' : '¿Volver los datos de ejemplo a su estado inicial?')) return;
    reiniciarModo(S.modo); pintarLogin();
    toast('Datos restablecidos', esCero() ? 'Empieza de nuevo: sin colaboradores, campañas ni evidencias.' : 'Los datos de ejemplo volvieron a su estado inicial.', 'info');
  };

  // Cifras del panel izquierdo (vivas)
  const lec = lecturaGlobal();
  $('#loginStats').innerHTML = `
    <div><b class="num">${esCero() ? activos().length : 248}</b><small>Colaboradores activos</small></div>
    <div><b class="num">${S.documentos.length}</b><small>Documentos controlados</small></div>
    <div><b class="num">${esCero() ? fmtPct(lec.p) : '89%'}</b><small>Cumplimiento de lectura</small></div>`;

  // Perfiles
  $('#roleList').innerHTML = Object.keys(ROLES).map(rol => {
    const n = cuentasDe(rol).length;
    return `<button class="rolecard" data-rol="${rol}" aria-pressed="${rol === S.rolSel}">
      <span class="rolecard__av">${ROLES[rol][0].slice(0, 2).toUpperCase()}</span>
      <span style="min-width:0">
        <span class="rolecard__t">${ROLES[rol][0]} <span class="muted" style="font-weight:500">· ${n} cuenta${n === 1 ? '' : 's'}</span></span>
        <span class="rolecard__s">${ROLES[rol][1]}</span>
      </span>
    </button>`;
  }).join('');
  $$('.rolecard').forEach(b => b.onclick = () => { S.rolSel = b.dataset.rol; pintarLogin(); });

  // Cuenta dentro del perfil
  const cuentas = cuentasDe(S.rolSel);
  if (!cuentas.some(c => c.id === S.cuentaSel[S.rolSel])) S.cuentaSel[S.rolSel] = cuentas[0] ? cuentas[0].id : null;
  const sel = $('#cuentaSel');
  $('#cuentaLbl').textContent = `Cuenta de ${ROLES[S.rolSel][0].toLowerCase()}`;
  sel.classList.toggle('hide', !cuentas.length);
  $('#cuentaVacia').classList.toggle('hide', !!cuentas.length);
  $('#cuentaVacia').textContent = 'Todavía no hay colaboradores. Ingrese como Administrador, registre uno y pida a su Manager que lo valide.';
  sel.innerHTML = cuentas.map(c => `<option value="${c.id}" ${c.id === S.cuentaSel[S.rolSel] ? 'selected' : ''}>${esc(c.nombre)} · ${esc(c.sub)}</option>`).join('');
  sel.onchange = () => { S.cuentaSel[S.rolSel] = sel.value; pintarLogin(); };
  const elegida = cuentas.find(c => c.id === S.cuentaSel[S.rolSel]);
  $('#loginMail').value = elegida ? correoDe(elegida.nombre) : '';
  $('#loginBtn').disabled = !elegida;
}

function entrar() {
  const id = S.cuentaSel[S.rolSel];
  if (!id) return;
  if (S.rolSel === 'colaborador') {
    const c = S.colaboradores.find(x => x.id === id); if (!c) return;
    S.user = { rol: 'colaborador', nombre: c.nombre, cargo: c.cargo, area: c.area, correo: correoDe(c.nombre), colaboradorId: c.id };
  } else {
    const u = S.usuarios.find(x => x.id === id); if (!u) return;
    S.user = { ...u };
  }
  S.view = 'dashboard';
  S.filtro = { area: '', estado: '', q: '' };
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
  pintarLogin();
}

/* ------------------------------------------------------------
   5.1 Fecha simulada: permite adelantar días para ver correr
   vencimientos, recordatorios, escalamientos y envíos de campañas.
------------------------------------------------------------ */
function modalSimulacion() {
  modal(modalHead('Fecha de la demostración', esCero() ? 'Empezar desde cero · los cambios se guardan en este navegador' : 'Datos de ejemplo · los cambios se guardan en este navegador') + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:12px">
        ${kpi('Hoy en la demostración', fechaLarga(HOY), esCero() ? `Fecha real: ${fechaLarga(hoyReal())}` : 'Inicio de los datos de ejemplo: 16 sep 2026', '', '')}
        ${kpi('Automatizaciones registradas', S.notifs.length, 'Notificaciones, recordatorios y escalamientos', '', '')}
      </div>
      <p class="small muted mt-16">Al adelantar la fecha el sistema ejecuta las reglas configuradas: aviso 48 h antes de cada vencimiento,
        recordatorio tras ${S.config.recordatorioDias} días sin actividad, escalamiento al Manager tras ${S.config.escalamientoDias} días,
        lectura vencida y envíos programados de micro aprendizaje.</p>
      <div class="row wrap" style="gap:8px">
        ${[1, 3, 7, 15].map(n => `<button class="btn" data-sim="${n}">${svg(ICO.clock)} +${n} día${n > 1 ? 's' : ''}</button>`).join('')}
      </div>
    </div>
    <div class="modal__foot">
      <button class="btn btn--danger" id="simReset">Restablecer datos</button>
      <span class="spacer"></span><button class="btn btn--ghost" data-close>Cerrar</button>
    </div>`);
  bindModal();
  $$('[data-sim]').forEach(b => b.onclick = () => {
    const n = +b.dataset.sim;
    const antes = S.notifs.length;
    S.hoy = HOY = sumarDias(HOY, n);
    ejecutarAutomatizaciones();
    closeModal();
    toast('Fecha adelantada', `Hoy es ${fechaLarga(HOY)} · ${S.notifs.length - antes} automatización(es) ejecutadas.`, 'info');
    render();
  });
  $('#simReset').onclick = () => {
    if (!confirm(esCero() ? '¿Borrar todo lo registrado y volver a empezar desde cero?' : '¿Volver los datos de ejemplo a su estado inicial?')) return;
    reiniciarModo(S.modo);
    salir();
    toast('Datos restablecidos', 'Vuelva a ingresar con el perfil que necesite.', 'info');
  };
}

/* ------------------------------------------------------------
   6. Render general
------------------------------------------------------------ */
function render() {
  ejecutarAutomatizaciones();
  const rol = S.user.rol;
  const items = navDe(rol);
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
  const chip = $('#modeChip');
  chip.className = 'modechip' + (esCero() ? ' is-cero' : '');
  chip.innerHTML = `<i></i><span>${esCero() ? 'Desde cero' : 'Datos de ejemplo'} · </span>${fechaLarga(HOY)}`;

  const V = VISTAS[rol][S.view] || (() => '<div class="empty"><b>Módulo en construcción</b></div>');
  $('#view').innerHTML = V();
  bindVista();
  pintarPop();
  guardar();
}

const head = (v, acciones = '') => {
  const [t, d] = TITULOS[v];
  return `<div class="page__head"><div><h1>${t}</h1><p>${d}</p></div><div class="page__actions">${acciones}</div></div>`;
};

/* ------------------------------------------------------------
   7. Vistas · ADMINISTRADOR
   En "Datos de ejemplo" se conservan las cifras históricas de la
   organización (tendencias, series); desde cero todo es en vivo.
------------------------------------------------------------ */
const tr = (dir, txt) => esCero() ? '' : trend(dir, txt);

function vAdminDashboard() {
  const cols = S.colaboradores;
  const enCurso = cols.filter(c => c.estado === 'en_curso').length;
  const atrasados = cols.filter(c => c.estado === 'atrasado').length;
  const prom = promedioDe(cols);
  const lec = lecturaGlobal();
  const s = DB.series.cumplimientoSemanal;
  const atencion = cols.filter(requiereAtencion).sort((a, b) => a.progreso - b.progreso);
  const top = brechas().slice(0, 6);

  return head('dashboard', `
    <button class="btn btn--primary" data-act="nuevo-col">${svg(ICO.plus)} Registrar colaborador</button>`) + `

  ${esCero() && !cols.length ? `<section class="card ia mb-16" style="margin-bottom:16px">
    <div class="card__head"><div><h3>Empezando desde cero</h3><p>El flujo completo, en orden</p></div></div>
    <div class="card__body">
      <div class="steps4">
        ${[
          ['Registrar', 'Administrador: «Registrar colaborador». Queda pendiente de validación.'],
          ['Validar', 'Manager: «Nuevos por validar» → ajusta documentos y activa la ruta.'],
          ['Leer y rendir', 'Colaborador: confirma lecturas por etapa y rinde la evaluación de cada etapa.'],
          ['Seguir y reforzar', 'Paneles, campañas, actualizaciones, ascensos. Use el chip de fecha para adelantar días.']
        ].map(([t, d], i) => `<div><span class="tag tag--brand">Paso ${i + 1}</span><b>${t}</b><p class="small muted">${d}</p></div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <div class="grid g-4">
    ${kpi('Cumplimiento de lectura', esCero() ? fmtPct(lec.p) : '89%', esCero() ? `${lec.leidas} de ${lec.total} lecturas confirmadas` : 'Meta trimestral 85%', tr('up', '+5 pts'), esCero() ? '' : spark(s.lectura))}
    ${kpi('Comprensión promedio', fmtPct(prom), 'Mínimo de aprobación ' + S.config.minimo + '%', tr('up', '+3 pts'), esCero() ? '' : spark(s.evaluacion, '#0E7A56'))}
    ${kpi('Inducciones en curso', enCurso, `Colaboradores con documentos por leer o aprobar · ${atrasados} atrasado(s)`, tr('flat', 'estable'), '')}
    ${kpi('Documentos controlados', S.documentos.length, 'Documentos vigentes en el repositorio', tr('up', '+2'), '')}
  </div>

  <div class="grid g-72 mt-16">
    <section class="card">
      <div class="card__head">
        <div><h3>Estado de la inducción por área</h3><p>Toque un área para ver el detalle de cada colaborador</p></div>
      </div>
      <div class="card__body">
        <div class="arealist">
          ${DB.areas.map(a => {
            const de = cols.filter(c => c.area === a.id);
            const comp = de.filter(c => c.estado === 'completado').length;
            const en = de.filter(c => c.estado === 'en_curso').length;
            const atr = de.filter(c => c.estado === 'atrasado').length;
            const val = de.filter(c => c.estadoAlta === 'pendiente_validacion').length;
            return `<button class="arearow" data-area-open="${a.id}">
              <span class="arearow__n">${esc(a.nombre)}</span>
              <span class="arearow__m num">${de.length} colaborador${de.length === 1 ? '' : 'es'}</span>
              <span class="arearow__b">${de.length ? `${comp} completado · ${en} en curso${atr ? ` · ${atr} atrasado` : ''}${val ? ` · ${val} por validar` : ''}` : 'Sin registros'}</span>
              <span class="arearow__chev">${svg(ICO.chevron)}</span>
            </button>`;
          }).join('')}
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card__head"><div><h3>Estado de las inducciones</h3><p>Distribución actual · toda la organización</p></div></div>
      <div class="card__body">${donut(distribucion(cols))}</div>
    </section>
  </div>

  <section class="card mt-16">
    <div class="card__head">
      <div><h3>Colaboradores que requieren atención</h3><p>Validaciones pendientes, vencimientos, evaluaciones reprobadas e inactividad</p></div>
      <div class="right"><button class="btn btn--sm" data-view-go="colaboradores">Ver todos</button></div>
    </div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr>
        <th>Colaborador</th><th>Área</th><th>Motivo</th><th>Documentos</th><th>Pendientes</th><th>Última actividad</th><th>Estado</th><th></th>
      </tr></thead><tbody>
      ${atencion.slice(0, 8).map(c => `
        <tr class="clickrow" data-col="${c.id}">
          <td>${persona(c.nombre, c.cargo)}</td>
          <td>${areaNom(c.area)}</td>
          <td class="small">${esc(motivosAtencion(c).join(' · '))}</td>
          <td class="num">${docTxt(c)}</td>
          <td class="num">${c.pendientes}</td>
          <td class="muted">${actividadTxt(c)}</td>
          <td>${badgeCol(c)}</td>
          <td class="r">${c.estadoAlta === 'activo' ? `<button class="btn btn--sm" data-recordar="${c.id}">Recordar</button>` : ''}</td>
        </tr>`).join('') || `<tr><td colspan="8" class="tbl__empty">${cols.length ? 'Nadie requiere atención en este momento.' : 'Todavía no hay colaboradores registrados.'}</td></tr>`}
      </tbody></table>
    </div>
  </section>

  <section class="card mt-16">
    <div class="card__head">
      <div><h3>Preguntas con mayor índice de error</h3><p>Respuestas incorrectas sobre el total de intentos registrados</p></div>
      <div class="right"><button class="btn btn--sm" data-view-go="analitica">Abrir analítica</button></div>
    </div>
    <div class="card__body">
      ${top.map(b => `
        <div class="gap">
          <div><b>${esc(b.tema)}</b><small>${esc(b.doc)} · ${b.afectados} colaborador(es) afectados</small></div>
          <div class="gap__bar"><i style="width:${Math.min(100, b.error * (esCero() ? 1 : 2))}%;background:${b.error > 40 ? '#B4342A' : b.error > 30 ? '#D99A12' : '#1F53CE'}"></i></div>
          <div class="gap__v">${b.error}%</div>
        </div>`).join('') || '<p class="small muted" style="margin:0">Aparecerán cuando los colaboradores rindan sus primeras evaluaciones.</p>'}
    </div>
  </section>`;
}

/* ------------------------------------------------------------
   7.1 Detalle de inducción por área (modal que se abre al hacer
   clic en una fila de la lista de áreas del panel general).
------------------------------------------------------------ */
function modalAreaEstado(areaId) {
  const a = DB.areas.find(x => x.id === areaId);
  const de = S.colaboradores.filter(c => c.area === areaId);
  modal(modalHead(`Estado de inducción · ${a.nombre}`, `${de.length} colaboradores del área · igual criterio que "Estado de las inducciones" pero filtrado a este grupo`) + `
    <div class="modal__body">
      <div class="card__body" style="padding:0 0 18px">${donut(distribucion(de))}</div>
      <div class="divider"></div>
      <div class="sec__t">Colaboradores de ${esc(a.nombre)}</div>
      <div class="tablewrap">
        <table class="tbl"><thead><tr><th>Colaborador</th><th>Manager</th><th>Documentos</th><th>Pendientes</th><th>Promedio</th><th>Estado</th></tr></thead><tbody>
        ${de.map(c => `<tr class="clickrow" data-col="${c.id}">
          <td>${persona(c.nombre, c.cargo)}</td>
          <td>${esc(c.manager)}</td>
          <td class="num">${docTxt(c)}</td>
          <td class="num">${c.pendientes}</td>
          <td class="num">${c.promedio ? c.promedio + '%' : '—'}</td>
          <td>${badgeCol(c)}</td>
        </tr>`).join('') || `<tr><td colspan="6" class="tbl__empty">Sin colaboradores en esta área.</td></tr>`}
        </tbody></table>
      </div>
    </div>
    <div class="modal__foot"><span class="spacer"></span><button class="btn btn--ghost" data-close>Cerrar</button></div>`, 'modal--wide');
  bindModal();
  $$('[data-col]', $('#modal')).forEach(el => el.onclick = () => { closeModal(); fichaColaborador(el.dataset.col); });
}

function tiempoMedioCierre() {
  const cerrados = S.colaboradores.filter(c => c.estado === 'completado' && c.cerradoEl && c.ingreso);
  if (!cerrados.length) return '—';
  return Math.round(cerrados.reduce((a, c) => a + Math.max(0, diasEntre(c.ingreso, c.cerradoEl)), 0) / cerrados.length) + ' d';
}

function vColaboradores() {
  const f = S.filtro;
  const lista = S.colaboradores.filter(c =>
    (!f.area || c.area === f.area) && (!f.estado || c.estado === f.estado));
  return head('colaboradores', `
    <button class="btn btn--primary" data-act="nuevo-col">${svg(ICO.plus)} Registrar colaborador</button>`) + `

  <div class="grid g-4">
    ${kpi('Total registrados', S.colaboradores.length, `${activos().length} activos · ${S.colaboradores.filter(c => c.estadoAlta === 'pendiente_validacion').length} por validar`, '', '')}
    ${kpi('Completados', S.colaboradores.filter(c => c.estado === 'completado').length, 'Ruta de inducción cerrada', tr('up', '+3'), '')}
    ${kpi('Atrasados', S.colaboradores.filter(c => c.estado === 'atrasado').length, 'Con lecturas o evaluaciones vencidas', tr('down', '-1'), '')}
    ${kpi('Tiempo medio de cierre', esCero() ? tiempoMedioCierre() : '11 d', 'Desde el ingreso hasta aprobar todo', tr('up', '-2 d'), '')}
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
        <th>Colaborador</th><th>Área</th><th>Cargo</th><th>Manager</th><th>Ingreso</th><th>Documentos</th><th>Promedio</th><th>Pendientes</th><th>Estado</th><th></th>
      </tr></thead><tbody>
      ${lista.map(c => `
        <tr class="clickrow" data-col="${c.id}">
          <td>${persona(c.nombre, c.cargo)}</td>
          <td>${areaNom(c.area)}</td>
          <td>${esc(c.cargo)}</td>
          <td>${esc(c.manager)}</td>
          <td class="num">${fechaLarga(c.ingreso)}</td>
          <td class="num">${docTxt(c)}</td>
          <td class="num">${c.promedio ? c.promedio + '%' : '—'}</td>
          <td class="num">${c.pendientes}</td>
          <td>${badgeCol(c)}</td>
          <td class="r"><button class="btn btn--sm" data-col-open="${c.id}">Ver ficha</button></td>
        </tr>`).join('') || `<tr><td colspan="10" class="tbl__empty">${S.colaboradores.length ? 'Ningún colaborador coincide con los filtros aplicados.' : 'Todavía no hay colaboradores. Use «Registrar colaborador» para dar de alta al primero.'}</td></tr>`}
      </tbody></table>
    </div>
  </section>`;
}

/* ------------------------------------------------------------
   7.2 Managers y ascensos. Un Administrador puede ascender a un
   colaborador a Manager; al hacerlo:
   - se crea su cuenta de Manager (aparece en el ingreso y en los
     selectores de "Manager responsable");
   - opcionalmente recibe un equipo inicial (transferido de otro Manager,
     incluidas las validaciones pendientes);
   - conserva su propia ruta y evidencias ("Mi cumplimiento").
------------------------------------------------------------ */
function elegibilidadAscenso(c) {
  if (c.rolActual === 'manager') return 'Ya es Manager';
  if (c.estadoAlta !== 'activo') return 'Su ruta aún no fue validada';
  if (S.config.exigirInduccionParaAscenso && c.estado !== 'completado') return `Debe completar su inducción (${docTxt(c)} documentos)`;
  return null;
}
const equipoDeManager = (nombre) => S.colaboradores.filter(c => c.manager === nombre);

function vRoles() {
  const mgrs = managers();
  const admins = S.usuarios.filter(u => u.rol === 'admin');
  const candidatos = S.colaboradores.filter(c => c.rolActual !== 'manager');
  const elegibles = candidatos.filter(c => !elegibilidadAscenso(c));
  const ascendidos = mgrs.filter(m => m.origen === 'ascenso');

  return head('roles') + `
  <div class="grid g-4">
    ${kpi('Administradores', admins.length, 'Gestionan la plataforma y los ascensos', '', '')}
    ${kpi('Managers', mgrs.length, `${mgrs.length - ascendidos.length} base · ${ascendidos.length} por ascenso`, '', '')}
    ${kpi('Elegibles para ascenso', elegibles.length, S.config.exigirInduccionParaAscenso ? 'Con la inducción completada' : 'Colaboradores activos', '', '')}
    ${kpi('Sin Manager válido', S.colaboradores.filter(c => !mgrs.some(m => m.nombre === c.manager)).length, 'Colaboradores a reasignar', '', '')}
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Cómo funciona un ascenso</h3><p>Solo un Administrador puede ascender a un colaborador</p></div></div>
    <div class="card__body">
      <div class="steps4">
        ${[
          ['Requisito', S.config.exigirInduccionParaAscenso ? 'El colaborador debe tener su inducción completada (configurable en Configuración).' : 'Cualquier colaborador activo puede ascender (requisito desactivado en Configuración).'],
          ['Cuenta de Manager', 'Se crea su acceso como Manager y aparece en «Manager responsable» al registrar colaboradores.'],
          ['Equipo', 'Puede recibir un equipo inicial: los colaboradores elegidos (y sus validaciones pendientes) pasan a reportarle.'],
          ['Historial', 'Conserva su ruta, evaluaciones y evidencias. Las actualizaciones de documentos le siguen llegando en «Mi cumplimiento».']
        ].map(([t, d], i) => `<div><span class="tag tag--brand">${i + 1}</span><b>${t}</b><p class="small muted">${d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Managers</h3><p>Equipos a cargo y estado de su gente</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr><th>Manager</th><th>Área</th><th>Origen</th><th>Equipo</th><th>En curso</th><th>Atrasados</th><th>Por validar</th><th></th></tr></thead><tbody>
      ${mgrs.map(m => {
        const eq = equipoDeManager(m.nombre);
        return `<tr>
          <td>${persona(m.nombre, m.cargo)}</td>
          <td>${areaNom(m.area)}</td>
          <td>${m.origen === 'ascenso' ? `<span class="badge badge--info">Ascendido · ${fechaLarga(m.ascendidoEl)}</span>` : '<span class="badge badge--muted">Cuenta base</span>'}</td>
          <td class="num">${eq.length}</td>
          <td class="num">${eq.filter(c => c.estado === 'en_curso').length}</td>
          <td class="num">${eq.filter(c => c.estado === 'atrasado').length}</td>
          <td class="num">${eq.filter(c => c.estadoAlta === 'pendiente_validacion').length}</td>
          <td class="r" style="white-space:nowrap">
            <button class="btn btn--sm" data-transferir="${m.id}" ${eq.length ? '' : 'disabled'}>Transferir equipo</button>
            ${m.origen === 'ascenso' ? `<button class="btn btn--sm btn--danger" data-revertir="${m.id}" ${eq.length ? 'disabled title="Primero transfiera su equipo"' : ''}>Revertir ascenso</button>` : ''}
          </td>
        </tr>`;
      }).join('')}
      </tbody></table>
    </div>
  </section>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Candidatos a ascenso</h3><p>Colaboradores registrados y si cumplen el requisito</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr><th>Colaborador</th><th>Área</th><th>Manager actual</th><th>Documentos</th><th>Promedio</th><th>Estado</th><th></th></tr></thead><tbody>
      ${candidatos.map(c => { const motivo = elegibilidadAscenso(c); return `<tr>
        <td>${persona(c.nombre, c.cargo)}</td>
        <td>${areaNom(c.area)}</td>
        <td>${esc(c.manager)}</td>
        <td class="num">${docTxt(c)}</td>
        <td class="num">${c.promedio ? c.promedio + '%' : '—'}</td>
        <td>${badgeCol(c)}</td>
        <td class="r">${motivo ? `<span class="small muted">${esc(motivo)}</span>` : `<button class="btn btn--sm btn--primary" data-ascender="${c.id}">${svg(ICO.award)} Ascender a Manager</button>`}</td>
      </tr>`; }).join('') || `<tr><td colspan="7" class="tbl__empty">Todavía no hay colaboradores registrados.</td></tr>`}
      </tbody></table>
    </div>
  </section>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Administradores</h3><p>Cuentas con acceso total</p></div></div>
    <div class="card__body"><div class="row wrap" style="gap:24px">${admins.map(a => persona(a.nombre, a.cargo)).join('')}</div></div>
  </section>`;
}

function modalAscender(colId) {
  const c = S.colaboradores.find(x => x.id === colId); if (!c) return;
  const motivo = elegibilidadAscenso(c);
  if (motivo) { toast('No se puede ascender', motivo, 'warn'); return; }
  const otros = S.colaboradores.filter(x => x.id !== c.id && x.rolActual !== 'manager')
    .sort((a, b) => (b.area === c.area) - (a.area === c.area));

  modal(modalHead(`Ascender a ${c.nombre}`, `${c.cargo} · ${areaNom(c.area)} · hoy reporta a ${c.manager}`) + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:0 16px">
        <div class="field"><span class="login__label">Cargo como Manager</span><input id="asc-cargo" value="${esc(areaNom(c.area))} Manager"></div>
        <div class="field"><span class="login__label">Área que gestiona</span>
          <select id="asc-area" class="sel">${DB.areas.map(a => `<option value="${a.id}" ${a.id === c.area ? 'selected' : ''}>${a.nombre}</option>`).join('')}</select></div>
      </div>
      <div class="sec__t">Equipo inicial (opcional) · los seleccionados pasan a reportarle</div>
      ${otros.length ? `<div class="checklist">${otros.map(x => `<label>
          <input type="checkbox" data-asc-eq="${x.id}">
          ${persona(x.nombre, `${areaNom(x.area)} · hoy con ${x.manager}${x.estadoAlta === 'pendiente_validacion' ? ' · por validar' : ''}`)}
        </label>`).join('')}</div>`
        : '<p class="small muted">No hay otros colaboradores para transferir. Puede asignarle personas más adelante desde «Transferir equipo» o al registrar colaboradores.</p>'}
      <div class="divider"></div>
      <div class="sec__t">Qué cambia al confirmar</div>
      <ul class="bullets">
        <li>Se crea su cuenta de Manager y podrá ingresar con ese perfil (deja de aparecer como cuenta de colaborador).</li>
        <li>Verá «Nuevos por validar», «Colaboradores», «Asignar documentos» y «Resultados» de su equipo.</li>
        <li>Su ruta (${docTxt(c)} documentos), evaluaciones y evidencias se conservan y siguen en «Mi cumplimiento».</li>
        <li>Se registra el cambio de rol como evidencia y se notifica a ${esc(c.nombre)} y a ${esc(c.manager)}.</li>
      </ul>
    </div>
    <div class="modal__foot"><span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="ascOk">${svg(ICO.award)} Confirmar ascenso</button></div>`, 'modal--wide');
  bindModal();

  $('#ascOk').onclick = () => {
    const cargo = $('#asc-cargo').value.trim() || 'Manager';
    const area = $('#asc-area').value;
    const equipo = $$('[data-asc-eq]:checked').map(x => x.dataset.ascEq);
    const managerAnterior = c.manager;
    c.rolActual = 'manager';
    c.cargoAnterior = c.cargo;
    c.cargo = cargo;
    c.ascendidoEl = HOY;
    S.usuarios.push({ id: nuevoId('U-MGR-'), rol: 'manager', nombre: c.nombre, cargo, area, correo: correoDe(c.nombre),
      origen: 'ascenso', colaboradorId: c.id, ascendidoEl: HOY, ascendidoPor: S.user.nombre });
    equipo.forEach(id => { const x = S.colaboradores.find(y => y.id === id); if (x) x.manager = c.nombre; });
    S.evidencias.unshift({ id: nuevoId('EVD-'), colaborador: c.nombre, documento: `Ascenso: ${c.cargoAnterior} → ${cargo}`,
      tipo: 'Cambio de rol', resultado: `Aprobado por ${S.user.nombre}`, fecha: ahora(), hash: hashEvidencia() });
    notificar({ tipo: 'ascenso', titulo: 'Ascenso a Manager',
      detalle: `${c.nombre} fue ascendido a ${cargo} por ${S.user.nombre}.${equipo.length ? ` Recibe un equipo de ${equipo.length} colaborador(es).` : ''}`,
      destino: `${c.nombre} · ${managerAnterior}` });
    closeModal(); closeDrawer();
    toast('Ascenso registrado', `${c.nombre} ya puede ingresar como Manager${equipo.length ? ` con ${equipo.length} colaborador(es) a cargo` : ''}.`, 'ia');
    render();
  };
}

function modalTransferir(mgrId) {
  const m = S.usuarios.find(u => u.id === mgrId); if (!m) return;
  const eq = equipoDeManager(m.nombre);
  const destinos = managers().filter(x => x.id !== m.id);
  modal(modalHead(`Transferir equipo de ${m.nombre}`, `${eq.length} colaborador(es) a cargo`) + `
    <div class="modal__body">
      <div class="field"><span class="login__label">Nuevo Manager</span>
        <select id="tr-dest" class="sel">${destinos.map(d => `<option value="${esc(d.nombre)}">${esc(d.nombre)} · ${esc(d.cargo)}</option>`).join('')}</select></div>
      <div class="sec__t">Colaboradores a transferir</div>
      <div class="checklist">${eq.map(x => `<label><input type="checkbox" data-tr="${x.id}" ${x.id === m.colaboradorId ? 'disabled' : 'checked'}>
        ${persona(x.nombre, `${areaNom(x.area)}${x.estadoAlta === 'pendiente_validacion' ? ' · por validar' : ''}`)}</label>`).join('')}</div>
      <p class="small muted mt-8">Las validaciones pendientes pasan al nuevo Manager, que recibirá el aviso.</p>
    </div>
    <div class="modal__foot"><span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="trOk">Transferir</button></div>`, 'modal--wide');
  bindModal();
  $('#trOk').onclick = () => {
    const dest = $('#tr-dest').value;
    const ids = $$('[data-tr]:checked').map(x => x.dataset.tr);
    if (!dest || !ids.length) { toast('Faltan datos', 'Elija el nuevo Manager y al menos un colaborador.', 'warn'); return; }
    ids.forEach(id => { const x = S.colaboradores.find(y => y.id === id); if (x) x.manager = dest; });
    notificar({ tipo: 'recordatorio', titulo: 'Transferencia de equipo',
      detalle: `${ids.length} colaborador(es) pasaron de ${m.nombre} a ${dest}.`, destino: `${dest} · ${m.nombre}` });
    closeModal();
    toast('Equipo transferido', `${ids.length} colaborador(es) ahora reportan a ${dest}.`, 'info');
    render();
  };
}

function revertirAscenso(mgrId) {
  const m = S.usuarios.find(u => u.id === mgrId); if (!m) return;
  if (equipoDeManager(m.nombre).length) { toast('Tiene equipo a cargo', 'Primero transfiera su equipo a otro Manager.', 'warn'); return; }
  if (!confirm(`¿Revertir el ascenso de ${m.nombre}? Volverá a ingresar como colaborador.`)) return;
  S.usuarios = S.usuarios.filter(u => u.id !== m.id);
  const c = S.colaboradores.find(x => x.id === m.colaboradorId);
  if (c) { c.rolActual = null; c.cargo = c.cargoAnterior || c.cargo; c.ascendidoEl = null; }
  S.evidencias.unshift({ id: nuevoId('EVD-'), colaborador: m.nombre, documento: `Reversión de ascenso: ${m.cargo} → ${c ? c.cargo : 'colaborador'}`,
    tipo: 'Cambio de rol', resultado: `Registrado por ${S.user.nombre}`, fecha: ahora(), hash: hashEvidencia() });
  notificar({ tipo: 'ascenso', titulo: 'Ascenso revertido', detalle: `${m.nombre} vuelve al rol de colaborador.`, destino: m.nombre });
  toast('Ascenso revertido', `${m.nombre} vuelve a ingresar como colaborador.`, 'warn');
  render();
}

function vDocumentos() {
  const lec = lecturaGlobal();
  const generales = S.documentos.filter(d => d.obligatorio && d.areas.length === DB.areas.length).length;
  const mes = HOY.slice(0, 7);
  const delMes = S.documentos.filter(d => (d.actualizado || '').slice(0, 7) === mes);
  return head('documentos', `
    <button class="btn btn--primary" data-act="nuevo-doc">${svg(ICO.plus)} Publicar documento</button>`) + `

  <div class="grid g-4">
    ${kpi('Documentos vigentes', S.documentos.length, `${generales} obligatorios para toda la organización`, '', '')}
    ${kpi('Publicados este mes', esCero() ? delMes.length : '2', esCero() ? (delMes.map(d => d.codigo).join(', ') || 'Ninguno en ' + fechaLarga(HOY).split(' ').slice(1).join(' ')) : 'Política de IA v1.3 y Seguridad v4.2', tr('up', '+2'), '')}
    ${kpi('Lectura confirmada', esCero() ? fmtPct(lec.p) : '89%', esCero() ? `${lec.leidas} confirmaciones registradas` : '2 214 confirmaciones registradas', tr('up', '+5 pts'), '')}
    ${kpi('Índice de error medio', esCero() ? fmtPct(errorGlobal()) : '26%', esCero() ? `Sobre ${S.intentos.reduce((a, i) => a + i.total, 0)} preguntas respondidas` : 'Sobre 3 128 preguntas respondidas', tr('down', '-4 pts'), '')}
  </div>

  <section class="card mt-16">
    <div class="filters">
      <input type="search" id="fq" placeholder="Buscar por título, código o propietario">
      <span class="spacer"></span>
      <button class="btn btn--sm" data-act="export">${svg(ICO.down)} CSV</button>
    </div>
    <div class="tablewrap">
      <table class="tbl" id="tblDocs"><thead><tr>
        <th>Documento</th><th>Etapa</th><th>Versión</th><th>Criticidad</th><th>Audiencia</th><th>Lectura</th><th>Índice de error</th><th>Actualizado</th><th></th>
      </tr></thead><tbody>
      ${S.documentos.map(d0 => { const d = docStats(d0); const et = DB.etapas.find(x => x.id === d.etapaId); return `
        <tr class="clickrow" data-doc="${d.id}">
          <td><b style="font-weight:560">${esc(d.titulo)}</b><br><small class="muted">${d.codigo} · ${esc(d.propietario)}</small></td>
          <td class="small">${et ? esc(et.nombre.split(' · ')[0]) : '<span class="muted">Adicional</span>'}</td>
          <td><span class="tag">v${d.version}</span> ${d.estado === 'actualizado' ? '<span class="badge badge--warn">Nuevo</span>' : ''}</td>
          <td><span class="badge badge--${d.criticidad === 'alta' ? 'danger' : d.criticidad === 'media' ? 'warn' : 'muted'}">${d.criticidad}</span></td>
          <td class="num">${d.asignados}</td>
          <td style="min-width:120px">${d.asignados ? bar(pct(d.leidos, d.asignados), pct(d.leidos, d.asignados) > 85 ? 'ok' : 'warn') : '<span class="muted">—</span>'}</td>
          <td class="num" style="color:${d.indiceError > 40 ? 'var(--danger)' : d.indiceError > 30 ? 'var(--warn)' : 'inherit'};font-weight:600">${d.intentos ? d.indiceError + '%' : '—'}</td>
          <td class="num muted">${fechaLarga(d.actualizado)}</td>
          <td class="r"><button class="btn btn--sm" data-doc-open="${d.id}">Abrir</button></td>
        </tr>`; }).join('') || '<tr><td colspan="9" class="tbl__empty">No hay documentos publicados.</td></tr>'}
      </tbody></table>
    </div>
  </section>`;
}

/* Rutas: se arman de las etapas del programa y de los documentos vigentes,
   así que reflejan al instante cualquier documento publicado o retirado. */
function vRutas() {
  const etapas = [...DB.etapas].sort((a, b) => a.orden - b.orden);
  const plazoTotal = etapas.filter(e => e.alcance === 'general').reduce((a, e) => a + e.plazoDiasHabiles, 0)
    + Math.max(0, ...etapas.filter(e => e.alcance === 'area').map(e => e.plazoDiasHabiles));
  const adicionales = S.documentos.filter(d => !d.etapaId);
  const tarjeta = (titulo, sub, docs, ev, conEtapa) => `
    <section class="card">
      <div class="card__head"><div><h3>${esc(titulo)}</h3><p>${sub}</p></div></div>
      <div class="card__body">
        <div class="doclist">
          ${docs.map(d => `
            <div class="docitem" style="padding:10px 12px">
              <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}" style="width:30px;height:34px">${svg(ICO.file)}</span>
              <span class="docitem__b"><b style="font-size:13.2px">${esc(d.titulo)}</b>
                <span class="docitem__m"><span>v${d.version}</span><span>${d.minutos} min</span><span>${esEtapaArea(d) ? (d.porDefecto ? 'Por defecto' : 'Adicional · decide el Manager') : d.obligatorio ? 'Obligatorio' : 'Opcional'}</span></span></span>
            </div>`).join('') || '<p class="small muted" style="margin:0">Sin documentos vigentes.</p>'}
        </div>
        ${ev ? `<div class="divider"></div><div class="row" style="gap:8px"><span class="tag tag--ai">Evaluación</span>
          <span class="small">${esc(ev.titulo.replace('Evaluación · ', ''))} · ${ev.preguntas.length} preguntas · mínimo ${ev.minimo}%</span></div>` : ''}
        ${conEtapa ? `<p class="small muted" style="margin:10px 0 0">${conEtapa}</p>` : ''}
      </div>
    </section>`;

  return head('rutas') + `
  <section class="card">
    <div class="card__head"><div><h3>Fases de la ruta de inducción</h3><p>Secuencia estándar que recorre todo colaborador nuevo</p></div>
      <div class="right"><span class="tag tag--brand">Plazo total: ${plazoTotal} días hábiles</span></div></div>
    <div class="card__body">
      <ol class="phases">
        ${DB.fases.map(f => `<li class="phase">
          <div class="phase__bar"></div>
          <div class="phase__n">Fase ${f.n}</div>
          <div class="phase__t">${f.nombre}</div>
          <div class="phase__d">${f.detalle}</div>
        </li>`).join('')}
      </ol>
    </div>
  </section>

  <div class="grid g-2 mt-16">
    ${etapas.map(e => {
      const docs = S.documentos.filter(d => d.etapaId === e.id);
      const ev = S.evaluaciones.find(x => x.etapaId === e.id && !x.colaboradorId);
      const nDef = docs.filter(d => d.porDefecto).length;
      const conEtapa = activos().filter(c => c.documentosRuta.some(d => d.etapaId === e.id));
      const aprob = conEtapa.filter(c => (c.evaluacionesRuta.find(x => x.etapaId === e.id) || {}).estado === 'aprobada').length;
      const aud = e.alcance === 'general' ? 'Todas las áreas' : e.areas.map(areaNom).join(', ');
      return tarjeta(e.nombre, `${aud} · ${e.plazoDiasHabiles} días hábiles · ${docs.length} documentos`, docs, ev,
        (e.alcance === 'area' ? `${nDef} por defecto (los envía el Admin) · el Manager puede sumar los otros ${docs.length - nDef}. La evaluación se arma por colaborador con sus documentos. ` : '')
        + `${conEtapa.length} colaborador(es) activos con esta etapa · ${aprob} la aprobaron.`);
    }).join('')}
    ${adicionales.length ? tarjeta('Documentación adicional', 'Fuera de las etapas · la asigna el Manager o una actualización', adicionales, null, '') : ''}
  </div>`;
}

function vEvaluaciones() {
  const its = S.intentos;
  const aprob = its.filter(i => i.aprobado).length;
  const reprobadosUnicos = [...new Set(its.filter(i => !i.aprobado).map(i => i.colId + '|' + i.evId))];
  const recuperados = reprobadosUnicos.filter(k => its.some(i => i.aprobado && i.colId + '|' + i.evId === k)).length;
  return head('evaluaciones', `<button class="btn btn--ai" data-act="ia-generar">${svg(ICO.spark)} Generar evaluación con IA</button>`) + `

  <div class="grid g-4">
    ${kpi('Evaluaciones publicadas', S.evaluaciones.filter(e => !e.colaboradorId).length, `Más ${S.evaluaciones.filter(e => e.colaboradorId).length} de Etapa 3 armadas por colaborador`, '', '')}
    ${kpi('Tasa de aprobación', esCero() ? fmtPct(its.length ? pct(aprob, its.length) : null) : '82%', `Mínimo exigido: ${S.config.minimo}%`, tr('up', '+6 pts'), '')}
    ${kpi('Intentos registrados', esCero() ? its.length : '1 268', esCero() ? 'Desde que empezó la demostración' : 'Últimos 90 días', tr('up', '+184'), '')}
    ${kpi('Reprobadas con reintento', esCero() ? reprobadosUnicos.length : '47', esCero() ? `${recuperados} aprobaron en un intento posterior` : '38 aprobaron en el segundo intento', tr('flat', 'estable'), '')}
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Catálogo de evaluaciones</h3><p>Cada evaluación se regenera automáticamente cuando su documento cambia de versión</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr>
        <th>Evaluación</th><th>Cubre</th><th>Preguntas</th><th>Duración</th><th>Mínimo</th><th>Intentos</th><th>Origen</th><th>Publicada</th><th></th>
      </tr></thead><tbody>
      ${S.evaluaciones.filter(e => !e.colaboradorId).map(e => { const et = e.etapaId && DB.etapas.find(x => x.id === e.etapaId); const d = e.docId ? doc(e.docId) : null; return `
        <tr>
          <td><b style="font-weight:560">${esc(e.titulo)}</b><br><small class="muted">${e.id}</small></td>
          <td>${et ? `<span class="tag tag--brand">${esc(et.nombre)}</span>` : (d ? `${esc(d.titulo)} <span class="tag">v${d.version}</span>` : '—')}</td>
          <td class="num">${e.preguntas.length}</td>
          <td class="num">${e.minutos} min</td>
          <td class="num">${e.minimo}%</td>
          <td class="num">${its.filter(i => i.evId === e.id).length}</td>
          <td><span class="tag tag--ai">${esc(e.generadaPor)}</span></td>
          <td class="num muted">${fechaLarga(e.fecha)}</td>
          <td class="r"><button class="btn btn--sm" data-ev-prev="${e.id}">Previsualizar</button></td>
        </tr>`; }).join('')}
      ${DB.etapas.filter(e => e.alcance === 'area').map(e => { const pers = S.evaluaciones.filter(x => x.colaboradorId && x.etapaId === e.id); return pers.length ? `
        <tr>
          <td><b style="font-weight:560">Evaluación · ${esc(e.nombre.replace('Etapa 3 · Documentación específica: ', 'Etapa 3: '))}</b><br><small class="muted">Una por colaborador · ${pers.length} armada(s)</small></td>
          <td><span class="tag tag--brand">${esc(e.nombre)}</span></td>
          <td class="num">2 por documento</td><td class="num">variable</td><td class="num">${S.config.minimo}%</td>
          <td class="num">${its.filter(i => pers.some(p => p.id === i.evId)).length}</td>
          <td><span class="tag tag--ai">IA · Gemini Pro</span></td><td class="num muted">—</td><td></td>
        </tr>` : ''; }).join('')}
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
  const camps = S.campanas.map(campStats);
  const act = camps.filter(c => c.estado === 'activa');
  const conEnvios = act.filter(c => c.enviados);
  const sugerida = brechas()[0];
  const proximos = esCero() ? act.flatMap(c => (c.evaluaciones || []).filter(e => e.fecha > HOY).slice(0, 2).map(e => ({ c, e })))
    .sort((a, b) => a.e.fecha.localeCompare(b.e.fecha)).slice(0, 6) : [];
  return head('micro', `<button class="btn btn--primary" data-act="nueva-campana">${svg(ICO.plus)} Crear campaña</button>`) + `

  <div class="grid g-4">
    ${kpi('Campañas activas', act.length, `${camps.filter(c => c.estado === 'pausada').length} pausada(s) · ${camps.filter(c => c.estado === 'borrador').length} en borrador`, '', '')}
    ${kpi('Tasa de respuesta', esCero() ? fmtPct(conEnvios.length ? Math.round(conEnvios.reduce((a, c) => a + c.respuesta, 0) / conEnvios.length) : null) : '74%', 'Envíos respondidos sobre recibidos', tr('up', '+9 pts'), '')}
    ${kpi('Acierto promedio', esCero() ? fmtPct(conEnvios.filter(c => c.respondidos).length ? Math.round(conEnvios.filter(c => c.respondidos).reduce((a, c) => a + c.acierto, 0) / conEnvios.filter(c => c.respondidos).length) : null) : '70%', 'Meta interna: 80%', tr('up', '+4 pts'), '')}
    ${kpi(esCero() ? 'Envíos recibidos' : 'Píldoras enviadas', esCero() ? act.reduce((a, c) => a + c.enviados, 0) : '3 942', esCero() ? 'Sumando a todos los colaboradores' : 'Últimos 90 días', tr('up', '+612'), '')}
  </div>

  <div class="grid g-64 mt-16">
    <section class="card">
      <div class="card__head"><div><h3>Campañas</h3><p>Refuerzo periódico sobre documentos vigentes y actualizados</p></div></div>
      <div class="card__body card__body--flush tablewrap">
        <table class="tbl"><thead><tr>
          <th>Campaña</th><th>Enfoque</th><th>Periodicidad</th><th>Alcance</th><th>Respuesta</th><th>Acierto</th><th>Estado</th><th>Próximo envío</th><th></th>
        </tr></thead><tbody>
        ${camps.map(c => { const prox = esCero() && c.evaluaciones ? (c.evaluaciones.find(e => e.fecha > HOY) || {}).fecha : (c.proxima === '—' ? null : c.proxima); return `
          <tr>
            <td><b style="font-weight:560">${esc(c.nombre)}</b><br><small class="muted">${esc(c.audiencia)}</small></td>
            <td><span class="tag ${c.enfoque === 'Refuerzo de brecha' ? 'tag--ai' : ''}">${esc(c.enfoque)}</span></td>
            <td>${c.periodicidad}</td>
            <td class="num">${c.alcance}</td>
            <td style="min-width:110px">${bar(c.respuesta)}</td>
            <td style="min-width:110px">${bar(c.acierto, c.acierto < 70 ? 'warn' : 'ok')}</td>
            <td>${c.estado === 'activa' ? '<span class="badge badge--ok">Activa</span>' : c.estado === 'pausada' ? '<span class="badge badge--warn">Pausada</span>' : '<span class="badge badge--muted">Borrador</span>'}</td>
            <td class="num muted">${prox ? fechaLarga(prox) : '—'}</td>
            <td class="r" style="white-space:nowrap"><button class="btn btn--sm" data-camp="${c.id}">${c.estado === 'activa' ? 'Pausar' : 'Activar'}</button>
              <button class="btn btn--sm btn--danger" data-camp-del="${c.id}" title="Eliminar campaña">${svg(ICO.x)}</button></td>
          </tr>`; }).join('') || '<tr><td colspan="9" class="tbl__empty">No hay campañas. Cree la primera con «Crear campaña».</td></tr>'}
        </tbody></table>
      </div>
    </section>

    <div class="stack">
      ${esCero() ? `<section class="card">
        <div class="card__head"><div><h3>Próximos envíos</h3><p>Programados según la periodicidad de cada campaña</p></div></div>
        <div class="card__body">
          <ul class="feed">${proximos.map(({ c, e }) => `<li><span class="feed__i ia">${svg(ICO.zap)}</span><span><b>${esc(c.nombre)} · evaluación ${e.n}</b><small>${fechaLarga(e.fecha)} · ${c.alcance} colaborador(es)</small></span></li>`).join('')
            || '<li><span class="small muted">Sin envíos programados.</span></li>'}</ul>
        </div>
      </section>` : `<section class="card">
        <div class="card__head"><div><h3>Respuesta por semana</h3><p>Píldoras respondidas dentro de las 48 horas</p></div></div>
        <div class="card__body">${barChart(['S29','S30','S31','S32','S33','S34'], [148, 167, 159, 188, 201, 214], '#1F53CE')}</div>
      </section>`}
      ${sugerida ? `<section class="card ia">
        <div class="card__head"><div><h3>Campaña sugerida</h3><p>Basada en la pregunta con más errores</p></div>
          <div class="right"><span class="ia__badge">${svg(ICO.spark)} IA</span></div></div>
        <div class="card__body">
          <b style="font-size:14px">${esc(sugerida.tema)}</b>
          <p class="small muted mt-8">${sugerida.error}% de error · ${esc(sugerida.doc)} · ${sugerida.afectados} colaborador(es) afectados. Se propone una campaña quincenal de refuerzo sobre este tema.</p>
          <button class="btn btn--primary btn--sm mt-8" data-act="nueva-campana" data-doc="${sugerida.docId}" data-nombre="${esc(sugerida.tema.slice(0, 60))}">Crear campaña sugerida</button>
        </div>
      </section>` : ''}
    </div>
  </div>`;
}

/* Ingresos por mes (últimos 6 meses respecto de la fecha de la demo) */
function ingresosPorMes() {
  const m = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const [y, mo] = HOY.split('-').map(Number);
  const meses = Array.from({ length: 6 }, (_, i) => { const d = new Date(y, mo - 6 + i, 1); return [d.getFullYear(), d.getMonth()]; });
  return {
    labels: meses.map(([, mm]) => m[mm]),
    valores: meses.map(([yy, mm]) => S.colaboradores.filter(c => c.ingreso && c.ingreso.startsWith(`${yy}-${pad2(mm + 1)}`)).length)
  };
}

function vAnalitica() {
  const esMgr = S.user.rol === 'manager';
  // El Manager ve las brechas de su equipo; el Admin, las de toda la organización
  const br = esMgr && esCero() ? brechasVivas(S.intentos.filter(i => equipoDe().some(c => c.id === i.colId))) : brechas();
  const umbral = S.config.umbralBrecha;
  const abiertas = br.filter(b => b.error >= umbral);
  const porArea = DB.areas.map(a => ({ a, v: promedioDe(activos().filter(c => c.area === a.id)) }));
  const peorArea = porArea.filter(x => x.v != null).sort((a, b) => a.v - b.v)[0];
  const ing = esCero() ? ingresosPorMes() : DB.series.ingresosMes;
  return head('analitica', `<button class="btn" data-act="export">${svg(ICO.down)} Exportar analítica</button>`) + `

  <div class="grid g-4">
    ${kpi('Brechas abiertas', esCero() ? abiertas.length : '6', `Preguntas con error ≥ ${umbral}%`, tr('down', '-2'), '')}
    ${kpi('Pregunta más fallada', esCero() ? fmtPct(br[0] ? br[0].error : null) : '47%', esCero() ? (br[0] ? br[0].doc : 'Sin intentos registrados') : 'Política de Uso de IA v1.3', tr('up', '+6 pts'), '')}
    ${kpi('Área con mayor brecha', esCero() ? (peorArea ? peorArea.a.nombre : '—') : 'Engineering', esCero() ? (peorArea ? `Comprensión promedio ${peorArea.v}%` : 'Sin evaluaciones rendidas') : '132 colaboradores evaluados', '', '')}
    ${kpi('Refuerzos aplicados', esCero() ? S.campanas.length : '18', 'Campañas de micro aprendizaje creadas', tr('up', '+5'), '')}
  </div>

  <div class="grid g-64 mt-16">
    <section class="card">
      <div class="card__head"><div><h3>Brechas de conocimiento</h3><p>Ordenadas por índice de error en las evaluaciones</p></div></div>
      <div class="card__body card__body--flush tablewrap">
        <table class="tbl"><thead><tr><th>Tema</th><th>Evaluación / documento</th><th>Afectados</th><th>Índice de error</th><th>Tendencia</th>${esMgr ? '' : '<th></th>'}</tr></thead><tbody>
        ${br.map(b => `
          <tr>
            <td><b style="font-weight:560">${esc(b.tema)}</b></td>
            <td class="muted">${esc(b.doc)}</td>
            <td class="num">${b.afectados}</td>
            <td style="min-width:150px">${bar(b.error, b.error > 40 ? 'danger' : b.error > 30 ? 'warn' : '')}</td>
            <td>${b.tendencia === 'sube' ? '<span class="trend trend--down">▲ sube</span>' : b.tendencia === 'baja' ? '<span class="trend trend--up">▼ baja</span>' : b.tendencia === 'estable' ? '<span class="trend trend--flat">■ estable</span>' : '<span class="muted">—</span>'}</td>
            ${esMgr ? '' : `<td class="r">${b.docId ? `<button class="btn btn--sm" data-act="nueva-campana" data-doc="${b.docId}" data-nombre="${esc(b.tema.slice(0, 60))}">Reforzar</button>` : ''}</td>`}
          </tr>`).join('') || `<tr><td colspan="6" class="tbl__empty">Todavía no hay evaluaciones rendidas para analizar.</td></tr>`}
        </tbody></table>
      </div>
    </section>

    <div class="stack">
      <section class="card">
        <div class="card__head"><div><h3>Ingresos por mes</h3><p>Colaboradores incorporados · últimos 6 meses</p></div></div>
        <div class="card__body">${barChart(ing.labels, ing.valores, '#0E7A56')}</div>
      </section>
      <section class="card">
        <div class="card__head"><div><h3>Comprensión por área</h3><p>Promedio de las evaluaciones rendidas</p></div></div>
        <div class="card__body">
          ${porArea.map(({ a, v }, i) => { const val = esCero() ? v : [84, 88, 90, 86, 81, 83][i];
            return `<div class="gap" style="grid-template-columns:1fr 150px 48px">
              <div><b>${a.nombre}</b></div>
              <div class="gap__bar"><i style="width:${val || 0}%;background:${val >= 86 ? '#0E7A56' : '#1F53CE'}"></i></div>
              <div class="gap__v">${fmtPct(val)}</div></div>`; }).join('')}
        </div>
      </section>
    </div>
  </div>`;
}

/* Notificaciones que le corresponden a quien inició sesión */
function notifsVisibles() {
  if (S.user.rol === 'admin') return S.notifs;
  if (S.user.rol === 'manager') {
    const eq = equipoDe().map(c => c.nombre);
    return S.notifs.filter(n => n.destino.includes(S.user.nombre) || eq.some(x => n.destino.includes(x) || n.detalle.includes(x)));
  }
  const ca = colaboradorActivo();
  return S.notifs.filter(n => n.destino === 'Toda la organización' || n.destino.includes(ca.nombre) || n.destino.includes(areaNom(ca.area)));
}

function vNotificaciones() {
  const tipos = { escalamiento:['danger', ICO.alert], recordatorio:['info', ICO.bell], actualizacion:['warn', ICO.file], vencimiento:['warn', ICO.clock], resultado:['danger', ICO.check], bienvenida:['ok', ICO.mail], campana:['info', ICO.zap], validacion:['info', ICO.users], ascenso:['ok', ICO.award], baja:['warn', ICO.x] };
  const lista = notifsVisibles();
  const esc_ = lista.filter(n => n.tipo === 'escalamiento');
  const dest = [...new Set(esc_.map(n => n.destino.split(' · ')[0]))];
  const reglas = [
    [`Sin actividad por ${S.config.recordatorioDias} días`, 'Recordatorio al colaborador'],
    [`Sin actividad por ${S.config.escalamientoDias} días`, 'Escalamiento al Manager'],
    ['Vencimiento en 48 horas', 'Recordatorio al colaborador'],
    ['Lectura vencida', 'Aviso al Manager y estado «Atrasado»'],
    ['Evaluación reprobada', `Reintento habilitado (hasta ${S.config.intentos}) y aviso al Manager`],
    ['Documento actualizado (cambio mayor)', 'Micro evaluación automática a los afectados'],
    ['Ruta completada', 'Registro de evidencia y constancia al colaborador'],
    ['Envío de campaña programado', 'Micro evaluación a la audiencia de la campaña']
  ];
  return head('notificaciones', '') + `

  <div class="grid g-4">
    ${kpi('Enviadas hoy', esCero() ? lista.filter(n => n.fecha.startsWith(HOY)).length : '68', 'Recordatorios, escalamientos y campañas', '', '')}
    ${kpi('Escalamientos', esCero() ? esc_.length : '2', esCero() ? (dest.join(', ') || 'Ninguno por ahora') : 'A Iván Suárez y Patricia Nogales', tr('down', '-1'), '')}
    ${kpi('Total registradas', lista.length, S.user.rol === 'admin' ? 'Toda la organización' : 'Relacionadas con su equipo', '', '')}
    ${kpi('Reglas activas', reglas.length, 'Se ejecutan solas, también al adelantar la fecha', '', '')}
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Registro de automatizaciones</h3><p>Acciones ejecutadas por el sistema y por los usuarios</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr><th>Tipo</th><th>Evento</th><th>Destinatario</th><th>Fecha y hora</th><th>Estado</th></tr></thead><tbody>
      ${lista.map(n => { const [c, ic] = tipos[n.tipo] || ['muted', ICO.bell]; return `
        <tr>
          <td><span class="feed__i ${c === 'danger' ? 'warn' : c === 'ok' ? 'ok' : 'brand'}" style="display:inline-grid">${svg(ic)}</span></td>
          <td><b style="font-weight:560">${esc(n.titulo)}</b><br><small class="muted">${esc(n.detalle)}</small></td>
          <td>${esc(n.destino)}</td>
          <td class="num muted">${n.fecha}</td>
          <td>${n.estado === 'enviada' ? '<span class="badge badge--ok">Enviada</span>' : '<span class="badge badge--info">Programada</span>'}</td>
        </tr>`; }).join('') || '<tr><td colspan="5" class="tbl__empty">Todavía no se ejecutó ninguna automatización.</td></tr>'}
      </tbody></table>
    </div>
  </section>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Reglas configuradas</h3><p>Condiciones que disparan una acción automática · los días se ajustan en Configuración</p></div></div>
    <div class="card__body">
      <div class="grid g-3" style="gap:14px">
        ${reglas.map(([c, a]) => `
          <div style="padding:14px;border:1px solid var(--line);border-radius:10px">
            <div class="row" style="justify-content:space-between"><b style="font-size:13.4px">${c}</b><span class="badge badge--ok">activa</span></div>
            <p class="small muted" style="margin:7px 0 0">${a}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function vEvidencias() {
  const conEv = new Set(S.evidencias.map(e => e.colaborador)).size;
  return head('evidencias', `<button class="btn" data-act="export">${svg(ICO.down)} Exportar para auditoría</button>`) + `

  <div class="grid g-4">
    ${kpi('Evidencias registradas', esCero() ? S.evidencias.length : '2 431', 'Lecturas, evaluaciones y cambios de rol con sello de tiempo', '', '')}
    ${kpi('Personas con evidencia', esCero() ? conEv : '100%', esCero() ? `De ${S.colaboradores.length} colaborador(es) registrados` : 'Documentos obligatorios trazados', '', '')}
    ${kpi('Retención', '36 meses', 'Conforme al procedimiento de calidad', '', '')}
    ${kpi('Última exportación', S.ultimaExport ? fechaLarga(S.ultimaExport) : '—', 'Auditoría interna ISO 9001', '', '')}
  </div>

  <section class="card mt-16">
    <div class="filters">
      <input type="search" id="fq" placeholder="Buscar por colaborador, documento o tipo">
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
          <td class="num"><b>${esc(e.resultado)}</b></td>
          <td class="num muted">${e.fecha}</td>
          <td class="num muted">${e.hash}</td>
        </tr>`).join('') || '<tr><td colspan="7" class="tbl__empty">Las evidencias aparecen cuando los colaboradores confirman lecturas o rinden evaluaciones.</td></tr>'}
      </tbody></table>
    </div>
  </section>`;
}

function vConfig() {
  const cfg = S.config;
  const campo = (l, k, tipo = 'number') => `<div class="field"><span class="login__label">${l}</span><input type="${tipo}" min="1" data-cfg="${k}" value="${cfg[k]}"></div>`;
  return head('config') + `
  <div class="grid g-2">
    <section class="card">
      <div class="card__head"><div><h3>Plazos de la inducción</h3><p>Días que se suman a la fecha de activación</p></div></div>
      <div class="card__body">
        ${campo('Lectura documental, por etapa (días)', 'plazoLectura')}
        ${campo('Evaluación de comprensión, desde que se habilita (días)', 'plazoEvaluacion')}
        ${campo('Documentación específica asignada por el Manager (días)', 'plazoEspecifica')}
        <button class="btn btn--primary mt-8" data-act="guardar">Guardar cambios</button>
      </div>
    </section>

    <section class="card">
      <div class="card__head"><div><h3>Escalamiento y aprobación</h3><p>Cuándo interviene el Manager</p></div></div>
      <div class="card__body">
        ${campo('Recordatorio tras días sin actividad', 'recordatorioDias')}
        ${campo('Escalamiento al Manager tras días sin actividad', 'escalamientoDias')}
        ${campo('Intentos permitidos por evaluación', 'intentos')}
        ${campo('Puntaje mínimo de aprobación (%)', 'minimo')}
        <button class="btn btn--primary mt-8" data-act="guardar">Guardar cambios</button>
      </div>
    </section>

    <section class="card span2">
      <div class="card__head"><div><h3>Ascensos a Manager</h3><p>Regla que aplica la pantalla «Managers y ascensos»</p></div></div>
      <div class="card__body">
        <label class="row" style="gap:8px;font-size:13.2px"><input type="checkbox" data-cfg-chk="exigirInduccionParaAscenso" ${cfg.exigirInduccionParaAscenso ? 'checked' : ''}>
          Exigir la inducción completada para poder ascender a un colaborador</label>
        <button class="btn btn--primary mt-16" data-act="guardar">Guardar cambios</button>
      </div>
    </section>

    <section class="card span2">
      <div class="card__head"><div><h3>Motor de inteligencia artificial</h3><p>Parámetros de generación de preguntas y análisis de brechas</p></div>
        <div class="right"><span class="ia__badge">${svg(ICO.spark)} IA</span></div></div>
      <div class="card__body">
        <div class="grid g-3">
          ${campo('Preguntas por evaluación generada', 'preguntasIA')}
          ${campo('Umbral de brecha (% de error)', 'umbralBrecha')}
        </div>
        <div class="divider"></div>
        <div class="row wrap" style="gap:18px">
          ${['Regenerar evaluación al publicar una versión mayor', 'Proponer campañas de refuerzo automáticamente',
             'Sugerir ajustes de redacción a los propietarios', 'Enviar resumen semanal a los Managers']
            .map((t, i) => `<label class="row" style="gap:8px;font-size:13.2px"><input type="checkbox" data-cfg-ia="${i}" ${cfg.iaFlags[i] ? 'checked' : ''}> ${t}</label>`).join('')}
        </div>
        <button class="btn btn--primary mt-16" data-act="guardar">Guardar cambios</button>
      </div>
    </section>
  </div>`;
}

function guardarConfig() {
  const cfg = S.config;
  $$('[data-cfg]').forEach(inp => { const v = parseInt(inp.value); if (v > 0) cfg[inp.dataset.cfg] = v; });
  $$('[data-cfg-chk]').forEach(ch => { cfg[ch.dataset.cfgChk] = ch.checked; });
  $$('[data-cfg-ia]').forEach(ch => { cfg.iaFlags[+ch.dataset.cfgIa] = ch.checked; });
  cfg.minimo = Math.min(100, cfg.minimo);
  // El mínimo y los intentos aplican a todas las evaluaciones publicadas
  S.evaluaciones.forEach(e => { e.minimo = cfg.minimo; e.intentos = cfg.intentos; });
  toast('Cambios guardados', 'Las reglas y plazos se aplican desde ahora en todos los paneles.');
  render();
}

/* ------------------------------------------------------------
   8. Vistas · MANAGER
------------------------------------------------------------ */
const equipoDe = () => S.colaboradores.filter(c => c.manager === S.user.nombre && c.id !== S.user.colaboradorId);

function vManagerDashboard() {
  const eq = equipoDe();
  const act = eq.filter(c => c.estadoAlta === 'activo');
  const prom = promedioDe(act);
  const atencion = eq.filter(requiereAtencion);
  const conProm = act.filter(c => c.promedio);
  return head('dashboard', `<button class="btn btn--primary" data-act="asignar-doc">${svg(ICO.plus)} Asignar documento</button>`) + `

  <div class="grid g-4">
    ${kpi('Colaboradores a cargo', eq.length, `${eq.filter(c => c.estado === 'completado').length} con inducción cerrada · ${eq.length - act.length} por validar`, '', '')}
    ${kpi('Avance promedio', act.length ? Math.round(act.reduce((a, c) => a + c.progreso, 0) / act.length) + '%' : '—', 'Lecturas y evaluaciones completadas', tr('up', '+7 pts'), '')}
    ${kpi('Comprensión promedio', fmtPct(prom), `Mínimo exigido ${S.config.minimo}%`, tr('up', '+2 pts'), '')}
    ${kpi('Requieren atención', atencion.length, atencion[0] ? `${atencion[0].nombre} · ${motivosAtencion(atencion[0])[0]}` : 'Todo en orden', '', '')}
  </div>

  <div class="grid g-64 mt-16">
    <section class="card">
      <div class="card__head"><div><h3>Avance del equipo</h3><p>Documentos aprobados sobre el total asignado a cada colaborador</p></div>
        <div class="right"><button class="btn btn--sm" data-view-go="equipo">Ver detalle</button></div></div>
      <div class="card__body card__body--flush tablewrap">
        <table class="tbl"><thead><tr><th>Colaborador</th><th>Ingreso</th><th>Documentos</th><th>Promedio</th><th>Estado</th><th></th></tr></thead><tbody>
        ${eq.map(c => `
          <tr class="clickrow" data-col="${c.id}">
            <td>${persona(c.nombre, c.cargo)}</td>
            <td class="num">${fechaLarga(c.ingreso)}</td>
            <td class="num">${docTxt(c)}</td>
            <td class="num">${c.promedio ? c.promedio + '%' : '—'}</td>
            <td>${badgeCol(c)}</td>
            <td class="r">${c.estadoAlta === 'activo' ? `<button class="btn btn--sm" data-recordar="${c.id}">Recordar</button>` : `<button class="btn btn--sm btn--primary" data-view-go="validar">Validar</button>`}</td>
          </tr>`).join('') || '<tr><td colspan="6" class="tbl__empty">Todavía no tiene colaboradores a cargo. Aparecerán cuando un Administrador registre a alguien con usted como Manager.</td></tr>'}
        </tbody></table>
      </div>
    </section>

    <div class="stack">
      <section class="card">
        <div class="card__head"><div><h3>Requiere su atención</h3><p>Validaciones, vencimientos, reprobados e inactividad</p></div></div>
        <div class="card__body">
          <ul class="feed">
            ${atencion.slice(0, 5).map(c => `<li class="clickrow" data-col="${c.id}" style="cursor:pointer"><span class="feed__i warn">${svg(c.estadoAlta === 'pendiente_validacion' ? ICO.users : ICO.alert)}</span>
              <span><b>${esc(c.nombre)}</b><small>${esc(motivosAtencion(c).join(' · '))}</small></span></li>`).join('')
              || '<li><span class="small muted">Nadie de su equipo requiere atención.</span></li>'}
          </ul>
        </div>
      </section>
      <section class="card">
        <div class="card__head"><div><h3>Comprensión del equipo</h3><p>${esCero() ? 'Promedio de exámenes por colaborador' : 'Últimas 12 semanas'}</p></div></div>
        <div class="card__body">${esCero()
          ? barChart(conProm.map(c => c.nombre.split(' ')[0]), conProm.map(c => c.promedio), '#0E7A56', { h: 180 })
          : lineChart(DB.series.cumplimientoSemanal.labels, [{ color:'#0E7A56', values:[58, 61, 60, 65, 68, 67, 71, 74, 76, 79, 80, 83] }], { h: 180 })}</div>
      </section>
    </div>
  </div>`;
}

/* ------------------------------------------------------------
   Etapa 2 del flujo (diapositiva 6): "Configuración de la ruta".
   El Manager revisa lo que el Admin propuso, puede sumar o quitar
   documentos, y recién al confirmar el colaborador queda activo.
------------------------------------------------------------ */
function vValidarLista() {
  const pend = S.colaboradores.filter(c => c.estadoAlta === 'pendiente_validacion' && c.manager === S.user.nombre);
  return head('validar') + (pend.length ? pend.map(c => `
    <section class="card mt-16">
      <div class="card__head">
        ${persona(c.nombre, c.cargo)}
        <div class="right"><span class="badge badge--warn">Pendiente de validación</span></div>
      </div>
      <div class="card__body">
        <dl class="kv">
          <dt>Área</dt><dd>${areaNom(c.area)}</dd>
          <dt>Fecha de ingreso</dt><dd class="num">${fechaLarga(c.ingreso)}</dd>
          <dt>Registrado por</dt><dd>${esc(c.registradoPor || 'Administración')}</dd>
        </dl>
        <div class="divider"></div>
        <div class="sec__t">Documentación por etapa · las Etapas 1 y 2 son obligatorias; en la Etapa 3 puede quitar o sumar documentos del área</div>
        <div id="chk-${c.id}">
          ${documentosPorEtapa(c.area).map(({ etapa, docs }) => {
            const area3 = etapa.alcance === 'area';
            const marcados = docs.filter(d => c.documentosRuta.some(x => x.docId === d.id)).length;
            return `<div class="etapa-card">
              <div class="etapa-card__h"><b>${esc(etapa.nombre)}</b>
                <span class="small muted" ${area3 ? `data-cuenta="${c.id}"` : ''}>${area3 ? `${marcados} de ${docs.length} seleccionados` : `${docs.length} documentos obligatorios`}</span>
                ${area3 ? '<span class="badge badge--info">Editable por el Manager</span>' : '<span class="badge badge--muted">Fija</span>'}</div>
              <div class="doclist">
              ${docs.map(d => `
                <label class="docitem" style="cursor:${area3 ? 'pointer' : 'default'}">
                  <input type="checkbox" data-val-doc="${d.id}" ${area3 ? 'data-etapa3' : 'disabled'} ${!area3 || c.documentosRuta.some(x => x.docId === d.id) ? 'checked' : ''} style="width:16px;height:16px;flex:none">
                  <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}">${svg(ICO.file)}</span>
                  <span class="docitem__b"><b>${esc(d.titulo)}</b>
                    <span class="docitem__m"><span>${d.codigo}</span><span>v${d.version}</span><span>${d.minutos} min</span></span></span>
                  <span class="docitem__a">${area3 ? (d.porDefecto ? '<span class="badge badge--ok">Enviado por el Admin</span>' : '<span class="badge badge--muted">Adicional del área</span>') : ''}
                    <span class="badge badge--${d.criticidad === 'alta' ? 'danger' : 'muted'}">${d.criticidad}</span></span>
                </label>`).join('')}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="card__foot">
        <button class="btn btn--primary" data-validar="${c.id}">${svg(ICO.check)} Confirmar y activar ruta</button>
        <span class="small muted">Al confirmar, el sistema envía el correo de bienvenida y el colaborador puede empezar a leer.</span>
      </div>
    </section>`).join('')
    : `<div class="empty">${svg(ICO.check)}<b>No tiene colaboradores pendientes de validación</b>Los nuevos registros que le asigne el Admin aparecerán aquí antes de activarse.</div>`);
}

function validarColaborador(id) {
  const c = S.colaboradores.find(x => x.id === id);
  // Etapas 1 y 2 vienen marcadas y bloqueadas; solo la Etapa 3 depende del Manager
  const checks = $$(`#chk-${id} input:checked`);
  if (!checks.length) { toast('Seleccione al menos un documento', 'No puede activar una ruta sin documentación.', 'warn'); return; }
  if (!checks.some(ch => ch.hasAttribute('data-etapa3')) && docsEtapa3(c.area).length) {
    toast('Etapa 3 sin documentos', 'Seleccione al menos un documento de la Etapa 3 de su área.', 'warn'); return;
  }

  // Cada etapa tiene su plazo: la Etapa 1 vence a los N días de activar, la 2 a los 2N, etc.
  const base = c.ingreso && c.ingreso > HOY ? c.ingreso : HOY;
  c.documentosRuta = checks.map(ch => {
    const d = doc(ch.dataset.valDoc);
    const et = DB.etapas.find(x => x.id === d.etapaId);
    return { docId: d.id, etapaId: d.etapaId, estado:'pendiente', confirmado:null,
      vence: sumarDias(base, S.config.plazoLectura * (et ? et.orden : 1)), origen: origenParaDoc(d.id) };
  });
  // Una evaluación por etapa presente en la ruta confirmada (bloqueada hasta leer
  // todos los documentos de esa etapa).
  const etapasEnRuta = [...new Set(c.documentosRuta.map(d => d.etapaId).filter(Boolean))];
  c.evaluacionesRuta = etapasEnRuta.map(etapaId => {
    const ev = S.evaluaciones.find(e => e.etapaId === etapaId && !e.colaboradorId);
    return ev ? { evId: ev.id, etapaId, estado:'bloqueada', puntaje:null, fecha:null, intento:0 } : null;
  }).filter(Boolean);

  c.estadoAlta = 'activo';
  armarEvaluacionEtapa3(c);
  c.validadoPor = S.user.nombre;
  c.fechaValidacion = ahora();
  c.activadoEl = HOY;
  recalcularColaborador(c);

  notificar({ tipo:'bienvenida', titulo:'Correo de bienvenida',
    detalle:`Ruta activada para ${c.nombre} tras la validación de ${S.user.nombre}. ${c.documentosRuta.length} documentos asignados.`,
    destino:c.nombre });

  toast('Colaborador activado', `${c.nombre} ya puede ingresar y ver su documentación.`, 'ia');
  render();
}

function vEquipo() {
  const eq = equipoDe();
  return head('equipo', `<button class="btn btn--primary" data-act="asignar-doc">${svg(ICO.plus)} Asignar documento</button>`) + `
  <section class="card">
    <div class="filters">
      <input type="search" id="fq" placeholder="Buscar en mi equipo">
      <span class="spacer"></span><span class="small muted num">${eq.length} colaboradores</span>
      <button class="btn btn--sm" data-act="export">${svg(ICO.down)} CSV</button>
    </div>
    <div class="tablewrap">
      <table class="tbl" id="tblEq"><thead><tr><th>Colaborador</th><th>Ingreso</th><th>Cargo</th><th>Documentos</th><th>Pendientes</th><th>Promedio</th><th>Última actividad</th><th>Estado</th><th></th></tr></thead><tbody>
      ${eq.map(c => `
        <tr class="clickrow" data-col="${c.id}">
          <td>${persona(c.nombre, c.cargo)}</td>
          <td class="num">${fechaLarga(c.ingreso)}</td>
          <td>${esc(c.cargo)}</td>
          <td class="num">${docTxt(c)}</td>
          <td class="num">${c.pendientes}</td>
          <td class="num">${c.promedio ? c.promedio + '%' : '—'}</td>
          <td class="muted">${actividadTxt(c)}</td>
          <td>${badgeCol(c)}</td>
          <td class="r"><button class="btn btn--sm" data-col-open="${c.id}">Ver ficha</button></td>
        </tr>`).join('') || '<tr><td colspan="9" class="tbl__empty">Todavía no tiene colaboradores a cargo.</td></tr>'}
      </tbody></table>
    </div>
  </section>`;
}

/* El Manager solo puede sumar documentos en la Etapa 3: los del área de cada
   colaborador que todavía no tiene en su ruta (uno, varios o ninguno). */
function vAsignar() {
  const eq = equipoDe().filter(c => c.estadoAlta === 'activo');
  const sel = S.asignarCol && eq.some(c => c.id === S.asignarCol) ? S.asignarCol : (eq[0] || {}).id;
  S.asignarCol = sel;
  const c = eq.find(x => x.id === sel);
  const docs = c ? docsEtapa3(c.area) : [];
  const etapa = c && DB.etapas.find(e => e.alcance === 'area' && e.areas.includes(c.area));
  return head('asignar') + `
  <div class="grid g-64">
    <section class="card">
      <div class="card__head"><div><h3>${etapa ? esc(etapa.nombre) : 'Etapa 3'}</h3>
        <p>${c ? `Documentos de ${areaNom(c.area)} · las Etapas 1 y 2 son obligatorias y no se modifican aquí` : 'Seleccione un colaborador'}</p></div></div>
      <div class="card__body">
        ${c ? `<div class="doclist">
          ${docs.map(d => { const md = c.documentosRuta.find(x => x.docId === d.id); return `
            <label class="docitem" style="cursor:${md ? 'default' : 'pointer'};${md ? 'opacity:.7' : ''}">
              <input type="checkbox" data-asig="${d.id}" ${md ? 'checked disabled' : ''} style="width:16px;height:16px">
              <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}">${svg(ICO.file)}</span>
              <span class="docitem__b"><b>${esc(d.titulo)}</b>
                <span class="docitem__m"><span>${d.codigo}</span><span>v${d.version}</span><span>${d.minutos} min de lectura</span></span></span>
              <span class="docitem__a">${md ? `<span class="badge badge--ok">Ya en su ruta${md.estado === 'leido' ? ' · leído' : ''}</span>` : '<span class="badge badge--muted">Disponible</span>'}</span>
            </label>`; }).join('')}
        </div>` : vacio('No tiene colaboradores activos', 'Valide primero a los nuevos en «Nuevos por validar».')}
      </div>
    </section>

    <section class="card" style="align-self:start">
      <div class="card__head"><div><h3>Colaborador</h3><p>Los documentos dependen de su área</p></div></div>
      <div class="card__body">
        ${eq.map(x => { const n3 = docsEtapa3(x.area); const tiene = n3.filter(d => x.documentosRuta.some(m => m.docId === d.id)).length; return `
          <label class="row" style="padding:8px 0;gap:10px;cursor:pointer">
            <input type="radio" name="asig-col" data-asig-col="${x.id}" ${x.id === sel ? 'checked' : ''} style="width:16px;height:16px">
            ${persona(x.nombre, `${areaNom(x.area)} · Etapa 3: ${tiene} de ${n3.length}`)}</label>`; }).join('') || '<p class="small muted">Sin colaboradores activos.</p>'}
        <div class="divider"></div>
        <div class="field"><span class="login__label">Plazo de lectura (días)</span><input id="asig-plazo" type="number" min="1" value="${S.config.plazoEspecifica}"></div>
        <p class="small muted" style="margin:0 0 14px">La evaluación de su Etapa 3 se vuelve a armar con las preguntas de los documentos sumados.</p>
        <button class="btn btn--primary btn-block" data-act="confirmar-asignacion" ${c && docs.some(d => !c.documentosRuta.some(x => x.docId === d.id)) ? '' : 'disabled'}>Sumar a la Etapa 3</button>
      </div>
    </section>
  </div>`;
}

function vResultadosEquipo() {
  const eq = equipoDe();
  const filas = eq.flatMap(c => (c.evaluacionesRuta || []).filter(e => e.estado !== 'bloqueada').map(e => ({ c, e, ev: evalu(e.evId) }))).filter(f => f.ev);
  const rendidas = filas.filter(f => f.e.puntaje != null);
  const aprob = rendidas.filter(f => f.e.estado === 'aprobada').length;
  const reint = rendidas.reduce((a, f) => a + Math.max(0, (f.e.intento || 1) - 1), 0);
  const brEq = brechasVivas(S.intentos.filter(i => eq.some(c => c.id === i.colId)))[0];
  const orden = { reprobada: 0, pendiente: 1, aprobada: 2 };
  return head('evaluaciones') + `
  <div class="grid g-4">
    ${kpi('Evaluaciones rendidas', rendidas.length, `De ${filas.length} habilitadas al equipo`, '', '')}
    ${kpi('Aprobación', fmtPct(rendidas.length ? pct(aprob, rendidas.length) : null), `Mínimo exigido ${S.config.minimo}%`, '', '')}
    ${kpi('Reintentos', reint, 'Intentos adicionales tras reprobar', '', '')}
    ${kpi('Pregunta más fallada', fmtPct(brEq ? brEq.error : null), brEq ? brEq.tema : 'Sin intentos registrados en la plataforma', '', '')}
  </div>
  <section class="card mt-16">
    <div class="card__head"><div><h3>Resultados por colaborador</h3><p>Último intento registrado en cada evaluación habilitada</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr><th>Colaborador</th><th>Evaluación</th><th>Intento</th><th>Puntaje</th><th>Resultado</th><th>Fecha</th></tr></thead><tbody>
      ${filas.sort((a, b) => orden[a.e.estado] - orden[b.e.estado]).map(({ c, e, ev }) => `<tr class="clickrow" data-col="${c.id}">
          <td>${persona(c.nombre, c.cargo)}</td>
          <td>${esc(ev.titulo.replace('Evaluación · ', ''))}</td>
          <td class="num">${e.intento || '—'}${e.intento ? ' de ' + S.config.intentos : ''}</td>
          <td class="num"><b>${e.puntaje != null ? e.puntaje + '%' : '—'}</b></td>
          <td>${e.estado === 'aprobada' ? '<span class="badge badge--ok">Aprobada</span>' : e.estado === 'reprobada' ? '<span class="badge badge--danger">Reprobada</span>' : '<span class="badge badge--muted">Pendiente</span>'}</td>
          <td class="num muted">${e.fecha || '—'}</td>
        </tr>`).join('') || '<tr><td colspan="6" class="tbl__empty">Todavía no hay evaluaciones habilitadas en su equipo. Se habilitan cuando el colaborador lee todos los documentos de una etapa.</td></tr>'}
      </tbody></table>
    </div>
  </section>`;
}

/* ------------------------------------------------------------
   9. Vistas · COLABORADOR
------------------------------------------------------------ */
function miProgreso() {
  const ca = colaboradorActivo();
  return ca.progreso;
}

/* Pantalla que ve un colaborador recién registrado, mientras su Manager
   no confirme la documentación (etapa 2 del flujo del documento).
   Se reutiliza en todas las secciones que dependen de la ruta. */
function vColabPendiente(ca) {
  return `<div class="page__head">
    <div><h1>Hola, ${esc(S.user.nombre.split(' ')[0])}</h1>
      <p>Su cuenta se creó correctamente. Antes de que pueda ver su documentación, su Manager <b>${esc(ca.manager)}</b> tiene que revisarla y confirmarla.</p></div></div>

  <section class="card">
    <div class="card__body">
      <div class="empty">
        ${svg(ICO.clock)}
        <b>Su ruta de inducción todavía no está activa</b>
        En cuanto ${esc(ca.manager)} confirme los documentos, el sistema le enviará un correo de bienvenida y podrá empezar a leer aquí mismo.
      </div>
      <div class="divider"></div>
      <div class="sec__t">Documentación propuesta (sujeta a la revisión del Manager)</div>
      <div class="doclist">
        ${ca.documentosRuta.map(md => { const d = doc(md.docId); return `
          <div class="docitem" style="opacity:.55">
            <span class="docitem__ic">${svg(ICO.file)}</span>
            <span class="docitem__b"><b>${esc(d.titulo)}</b><span class="docitem__m"><span>v${d.version}</span><span>${d.minutos} min</span></span></span>
            <span class="docitem__a"><span class="badge badge--muted">En validación</span></span>
          </div>`; }).join('')}
      </div>
    </div>
  </section>`;
}

function vColabDashboard() {
  const ca = colaboradorActivo();
  if (ca.estadoAlta === 'pendiente_validacion') return vColabPendiente(ca);

  const p = ca.progreso;
  const pend = ca.documentosRuta.filter(d => d.estado === 'pendiente').length;
  const pendEv = ca.evaluacionesRuta.filter(e => e.estado === 'pendiente' || (e.estado === 'reprobada' && e.intento < S.config.intentos)).length;
  const fase = ca.fase;
  const vencimientos = ca.documentosRuta.filter(d => d.estado === 'pendiente' && d.vence).map(d => d.vence).sort();
  const envios = esCero() ? enviosPara(ca) : [];
  const microHechas = esCero() ? envios.filter(e => e.respondido).length : S.pildoras.filter(p2 => p2.estado === 'completada').length;
  const microTotal = esCero() ? envios.length : S.pildoras.length;
  const avisos = esCero()
    ? notifsVisibles().slice(0, 4).map(n => ({ t: n.titulo, d: n.detalle, h: n.fecha, tipo: n.tipo === 'campana' ? 'campana' : n.tipo === 'actualizacion' ? 'actualizacion' : n.tipo === 'vencimiento' ? 'vencimiento' : 'evaluacion' }))
    : DB.avisosColaborador;

  return `<div class="page__head">
    <div><h1>Hola, ${esc(S.user.nombre.split(' ')[0])}</h1>
      <p>${pend + pendEv ? `Le quedan ${pend} lectura(s) y ${pendEv} evaluación(es) para cerrar su inducción.${vencimientos[0] ? ` La próxima lectura vence el ${fechaLarga(vencimientos[0])}.` : ''}` : 'Completó su ruta de inducción. Le avisaremos cuando un documento cambie de versión.'}</p></div>
    <div class="page__actions"><button class="btn" data-view-go="asistente">${svg(ICO.chat)} Consultar al asistente</button>
      <button class="btn btn--primary" data-view-go="misdocs">Continuar inducción</button></div></div>

  <div class="grid g-64">
    <section class="card">
      <div class="card__head"><div><h3>Su ruta de inducción</h3><p>${areaNom(ca.area)} · ingreso el ${fechaLarga(ca.ingreso)}</p></div>
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
              <div><b>Lecturas confirmadas</b><small>${ca.documentosRuta.filter(d => d.estado === 'leido').length} de ${ca.documentosRuta.length} documentos</small></div>
              <div class="gap__bar"><i style="width:${pct(ca.documentosRuta.filter(d => d.estado === 'leido').length, ca.documentosRuta.length)}%;background:#1F53CE"></i></div>
              <div class="gap__v">${pct(ca.documentosRuta.filter(d => d.estado === 'leido').length, ca.documentosRuta.length)}%</div>
            </div>
            <div class="gap" style="grid-template-columns:1fr 130px 44px;border:0">
              <div><b>Evaluaciones aprobadas</b><small>${ca.evaluacionesRuta.filter(e => e.estado === 'aprobada').length} de ${ca.evaluacionesRuta.length} evaluaciones</small></div>
              <div class="gap__bar"><i style="width:${pct(ca.evaluacionesRuta.filter(e => e.estado === 'aprobada').length, ca.evaluacionesRuta.length)}%;background:#0E7A56"></i></div>
              <div class="gap__v">${pct(ca.evaluacionesRuta.filter(e => e.estado === 'aprobada').length, ca.evaluacionesRuta.length)}%</div>
            </div>
            <div class="gap" style="grid-template-columns:1fr 130px 44px;border:0">
              <div><b>Micro aprendizaje</b><small>${microHechas} de ${microTotal} ${esCero() ? 'envíos' : 'píldoras'} respondidos</small></div>
              <div class="gap__bar"><i style="width:${pct(microHechas, microTotal)}%;background:#E8620F"></i></div>
              <div class="gap__v">${pct(microHechas, microTotal)}%</div>
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
            ${ca.documentosRuta.filter(d => d.estado === 'pendiente').slice(0, 3).map(md => { const d = doc(md.docId); return `
              <div class="docitem" style="padding:11px 12px">
                <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}" style="width:32px;height:36px">${svg(ICO.file)}</span>
                <span class="docitem__b"><b style="font-size:13.3px">${esc(d.titulo)}</b>
                  <span class="docitem__m"><span>${d.minutos} min</span><span>Vence ${fechaLarga(md.vence)}</span></span></span>
                <span class="docitem__a"><button class="btn btn--sm btn--primary" data-leer="${d.id}">Leer</button></span>
              </div>`; }).join('')}
            ${ca.evaluacionesRuta.filter(e => e.estado === 'pendiente' || (e.estado === 'reprobada' && e.intento < S.config.intentos)).slice(0, 2).map(me => { const ev = evalu(me.evId); return `
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
            ${avisos.map(a => `<li>
              <span class="feed__i ${a.tipo === 'evaluacion' ? 'brand' : a.tipo === 'actualizacion' ? 'warn' : a.tipo === 'campana' ? 'ia' : 'warn'}">${svg(a.tipo === 'campana' ? ICO.zap : a.tipo === 'evaluacion' ? ICO.check : a.tipo === 'actualizacion' ? ICO.file : ICO.clock)}</span>
              <span><b>${esc(a.t)}</b><small>${esc(a.d)} · ${a.h}</small></span></li>`).join('') || '<li><span class="small muted">Sin novedades por ahora.</span></li>'}
          </ul>
        </div>
      </section>
    </div>
  </div>`;
}

function vMisDocs() {
  const ca = colaboradorActivo();
  if (ca.estadoAlta === 'pendiente_validacion') return vColabPendiente(ca);
  const fila = (md) => { const d = doc(md.docId); const leido = md.estado === 'leido'; const esActualizacion = md.origen.startsWith('Actualización'); return `
    <div class="docitem">
      <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}">${svg(ICO.file)}</span>
      <span class="docitem__b">
        <b>${esc(d.titulo)}</b>
        <span class="docitem__m">
          <span>${d.codigo} · v${d.version}</span><span>${d.minutos} min de lectura</span>
          <span>${esActualizacion ? `<span class="badge badge--warn">${esc(md.origen)}</span>` : esc(md.origen)}</span>
          <span>${leido ? 'Confirmado el ' + md.confirmado : 'Vence ' + fechaLarga(md.vence)}</span>
        </span>
      </span>
      <span class="docitem__a">
        ${leido ? '<span class="badge badge--ok">Lectura confirmada</span>' : diasDesde(md.vence) > 0 ? '<span class="badge badge--danger">Vencido</span>' : '<span class="badge badge--warn">Pendiente</span>'}
        <button class="btn btn--sm ${leido ? '' : 'btn--primary'}" data-leer="${d.id}">${leido ? 'Releer' : 'Leer y confirmar'}</button>
      </span>
    </div>`; };

  const pendientes = ca.documentosRuta.filter(d => d.estado === 'pendiente');
  const leidos = ca.documentosRuta.filter(d => d.estado === 'leido');

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
  const ca = colaboradorActivo();
  if (ca.estadoAlta === 'pendiente_validacion') return vColabPendiente(ca);
  const estadoBadge = { aprobada:'<span class="badge badge--ok">Aprobada</span>', pendiente:'<span class="badge badge--warn">Pendiente</span>', reprobada:'<span class="badge badge--danger">Reprobada</span>', bloqueada:'<span class="badge badge--muted">Bloqueada</span>' };
  return head('misevals') + `
  <div class="grid g-3">
    ${kpi('Evaluaciones asignadas', ca.evaluacionesRuta.length, 'Generadas desde sus documentos', '', '')}
    ${kpi('Puntaje promedio', (() => { const a = ca.evaluacionesRuta.filter(e => e.puntaje); return a.length ? Math.round(a.reduce((x, e) => x + e.puntaje, 0) / a.length) + '%' : '—'; })(), 'Mínimo de aprobación 80%', '', '')}
    ${kpi('Intentos disponibles', S.config.intentos, 'Por cada evaluación', '', '')}
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Mis evaluaciones</h3><p>Las evaluaciones se habilitan al confirmar la lectura del documento correspondiente</p></div></div>
    <div class="card__body">
      <div class="doclist">
        ${ca.evaluacionesRuta.map(me => { const ev = evalu(me.evId); if (!ev) return ''; const agotada = me.estado === 'reprobada' && me.intento >= S.config.intentos; return `
          <div class="docitem">
            <span class="docitem__ic" style="background:${me.estado === 'aprobada' ? 'var(--ok-050)' : 'var(--brand-050)'};border-color:#DCE6F8;color:${me.estado === 'aprobada' ? 'var(--ok)' : 'var(--brand)'}">${svg(ICO.check)}</span>
            <span class="docitem__b"><b>${esc(ev.titulo.replace('Evaluación · ', ''))}</b>
              <span class="docitem__m"><span>${ev.preguntas.length} preguntas</span><span>${ev.minutos} minutos</span>
                <span>Mínimo ${ev.minimo}%</span><span class="tag tag--ai">${esc(ev.generadaPor)}</span>
                ${me.fecha ? `<span>Rendida el ${me.fecha}</span>` : ''}${me.intento ? `<span>Intento ${me.intento} de ${S.config.intentos}</span>` : ''}
                ${me.vence && me.estado !== 'aprobada' ? `<span>Vence ${fechaLarga(me.vence)}</span>` : ''}</span></span>
            <span class="docitem__a">
              ${me.puntaje != null ? `<b class="num" style="font-size:16px;color:${me.puntaje >= ev.minimo ? 'var(--ok)' : 'var(--danger)'}">${me.puntaje}%</b>` : ''}
              ${estadoBadge[me.estado]}
              <button class="btn btn--sm ${me.estado === 'pendiente' || (me.estado === 'reprobada' && !agotada) ? 'btn--primary' : ''}" ${me.estado === 'bloqueada' || agotada ? 'disabled' : ''} data-quiz="${ev.id}">
                ${me.estado === 'aprobada' ? 'Ver resultado' : me.estado === 'bloqueada' ? 'Requiere lectura' : agotada ? 'Intentos agotados' : me.estado === 'reprobada' ? 'Reintentar' : 'Rendir evaluación'}</button>
            </span>
          </div>`; }).join('')}
      </div>
    </div>
  </section>`;
}

function vMiMicro() {
  const ca = colaboradorActivo();
  if (ca.estadoAlta === 'pendiente_validacion') return vColabPendiente(ca);
  if (esCero()) return vMiMicroEnvios(ca);
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

/* Micro aprendizaje desde cero: cada campaña activa de su área le envía una
   evaluación corta según la periodicidad; queda pendiente hasta responderla. */
function vMiMicroEnvios(ca) {
  const envios = enviosPara(ca);
  const pend = envios.filter(e => !e.respondido);
  const hechas = envios.filter(e => e.respondido);
  const preg = hechas.reduce((a, e) => a + e.respondido.total, 0), ok = hechas.reduce((a, e) => a + e.respondido.correctas, 0);
  const proximo = campaniasPara(ca.area).flatMap(cm => (cm.evaluaciones || []).filter(e => e.fecha > HOY)).map(e => e.fecha).sort()[0];
  return head('mimicro') + `
  <div class="grid g-3">
    ${kpi('Envíos recibidos', envios.length, `${campaniasPara(ca.area).length} campaña(s) activas para ${areaNom(ca.area)}`, '', '')}
    ${kpi('Aciertos', preg ? pct(ok, preg) + '%' : '—', `${hechas.length} envío(s) respondidos`, '', '')}
    ${kpi('Pendientes', pend.length, proximo ? `Próximo envío: ${fechaLarga(proximo)}` : 'Sin envíos programados', '', '')}
  </div>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Por responder</h3><p>Preguntas cortas sobre políticas que ya leyó · cuentan como pendientes hasta responderlas</p></div>
      <div class="right"><span class="ia__badge">${svg(ICO.spark)} Generadas por IA</span></div></div>
    <div class="card__body">
      ${pend.length ? `<div class="doclist">${pend.map(e => { const d = doc(e.cm.docId); return `
        <div class="docitem">
          <span class="docitem__ic" style="background:var(--accent-050);border-color:#F3DFCE;color:var(--accent)">${svg(ICO.zap)}</span>
          <span class="docitem__b"><b>${esc(e.cm.nombre)} · evaluación ${e.n}</b>
            <span class="docitem__m"><span>${e.preguntas.length} pregunta(s)</span>${d ? `<span>${d.codigo} v${d.version}</span>` : ''}<span>Enviada el ${fechaLarga(e.fecha)}</span></span></span>
          <span class="docitem__a"><button class="btn btn--sm btn--primary" data-envio="${e.campId}|${e.n}">Responder</button></span>
        </div>`; }).join('')}</div>`
        : vacio('Está al día', proximo ? `El próximo envío llega el ${fechaLarga(proximo)}.` : 'Cuando haya una campaña activa para su área, los envíos aparecerán aquí.')}
    </div>
  </section>

  <section class="card mt-16">
    <div class="card__head"><div><h3>Historial</h3><p>Sus respuestas quedan registradas para medir la retención en el tiempo</p></div></div>
    <div class="card__body card__body--flush tablewrap">
      <table class="tbl"><thead><tr><th>Campaña</th><th>Envío</th><th>Respondido</th><th>Resultado</th></tr></thead><tbody>
      ${hechas.map(e => `<tr><td>${esc(e.cm.nombre)}</td><td class="num">${e.n} · ${fechaLarga(e.fecha)}</td><td class="num muted">${e.respondido.fecha}</td>
        <td><span class="badge badge--${pct(e.respondido.correctas, e.respondido.total) >= 70 ? 'ok' : 'warn'}">${e.respondido.correctas}/${e.respondido.total} correctas</span></td></tr>`).join('')
        || '<tr><td colspan="4" class="tbl__empty">Todavía no respondió ningún envío.</td></tr>'}
      </tbody></table>
    </div>
  </section>`;
}

function abrirEnvio(clave) {
  const [campId, nTxt] = clave.split('|');
  const ca = colaboradorActivo();
  const e = enviosPara(ca).find(x => x.campId === campId && x.n === +nTxt);
  if (!e || e.respondido) return;
  let i = 0, ok = 0;
  const pintar = () => {
    const p = e.preguntas[i];
    modal(modalHead(e.cm.nombre, `Envío ${e.n} · pregunta ${i + 1} de ${e.preguntas.length}`) + `
      <div class="modal__body">
        <h3 class="quiz__q">${esc(p.q)}</h3>
        <div class="opts">${p.o.map((o, oi) => `<button class="opt" data-opt="${oi}"><span class="opt__k">${String.fromCharCode(65 + oi)}</span><span>${esc(o)}</span></button>`).join('')}</div>
        <div id="pExp"></div>
      </div>
      <div class="modal__foot"><span class="small muted">El micro aprendizaje no afecta su puntaje de inducción.</span>
        <span class="spacer"></span><button class="btn btn--primary hide" id="envNext">${i === e.preguntas.length - 1 ? 'Finalizar' : 'Siguiente'}</button></div>`);
    $$('[data-opt]').forEach(b => b.onclick = () => {
      const sel = +b.dataset.opt, bien = sel === p.r;
      if (bien) ok++;
      $$('.opt').forEach((o, oi) => { o.disabled = true; if (oi === p.r) o.classList.add('good'); else if (oi === sel) o.classList.add('bad'); });
      $('#pExp').innerHTML = `<div class="explain"><b>${bien ? 'Respuesta correcta.' : 'Respuesta incorrecta.'}</b> ${esc(p.exp || '')}</div>`;
      $('#envNext').classList.remove('hide');
    });
    $('#envNext').onclick = () => {
      if (i < e.preguntas.length - 1) { i++; pintar(); return; }
      (ca.microRespuestas = ca.microRespuestas || []).push({ campId, n: e.n, correctas: ok, total: e.preguntas.length, fecha: ahora() });
      marcarActividad(ca);
      recalcularColaborador(ca);
      closeModal();
      toast('Envío respondido', `${ok} de ${e.preguntas.length} correctas.`, ok === e.preguntas.length ? '' : 'warn');
      render();
    };
  };
  pintar();
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
    <div class="msg__b">${m.t}${m.fuente && doc(m.fuente) ? `<div class="msg__src">${svg(ICO.file)} Fuente: ${esc(doc(m.fuente).titulo)} · v${doc(m.fuente).version} <span class="tag">${doc(m.fuente).codigo}</span></div>` : ''}</div>
  </div>`;

function vCertificados() {
  const ca = colaboradorActivo();
  const items = ca.documentosRuta.filter(d => d.estado === 'leido').map(md => ({ t: doc(md.docId).titulo, v: doc(md.docId).version, f: md.confirmado, tipo: 'Confirmación de lectura' }))
    .concat(ca.evaluacionesRuta.filter(e => e.estado === 'aprobada').map(me => {
      const ev = evalu(me.evId);
      const et = ev.etapaId && DB.etapas.find(x => x.id === ev.etapaId);
      return { t: ev.titulo.replace('Evaluación · ', ''), v: et ? et.nombre : (ev.docId ? doc(ev.docId).version : '—'), f: me.fecha, tipo: `Evaluación aprobada · ${me.puntaje}%` };
    }));
  return head('certificados', `<button class="btn" data-act="export">${svg(ICO.down)} Descargar constancia</button>`) + `
  <div class="grid g-3">
    ${kpi('Registros de cumplimiento', items.length, 'Con sello de tiempo verificable', '', '')}
    ${kpi('Documentos vigentes al día', ca.documentosRuta.filter(d => d.estado === 'leido').length + ' de ' + ca.documentosRuta.length, 'Lectura confirmada', '', '')}
    ${kpi('Evaluaciones aprobadas', ca.evaluacionesRuta.filter(e => e.estado === 'aprobada').length, 'Mínimo exigido 80%', '', '')}
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
  admin: { dashboard:vAdminDashboard, colaboradores:vColaboradores, roles:vRoles, documentos:vDocumentos, rutas:vRutas,
           evaluaciones:vEvaluaciones, micro:vMicro, analitica:vAnalitica, notificaciones:vNotificaciones,
           evidencias:vEvidencias, config:vConfig },
  manager: { dashboard:vManagerDashboard, validar:vValidarLista, equipo:vEquipo, asignar:vAsignar, evaluaciones:vResultadosEquipo,
             notificaciones:vNotificaciones, analitica:vAnalitica,
             // "Mi cumplimiento" de un Manager ascendido (reutiliza las vistas del colaborador)
             misdocs:vMisDocs, misevals:vMisEvals, certificados:vCertificados },
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

  // Detalle de inducción por área (panel general)
  $$('[data-area-open]').forEach(b => b.onclick = () => modalAreaEstado(b.dataset.areaOpen));

  // Ficha del colaborador
  $$('[data-col],[data-col-open]').forEach(el => el.onclick = (e) => {
    if (e.target.closest('[data-recordar]')) return;
    const id = el.dataset.col || el.dataset.colOpen;
    e.stopPropagation(); fichaColaborador(id);
  });

  // Recordatorio manual
  $$('[data-recordar]').forEach(b => b.onclick = (e) => {
    e.stopPropagation();
    b.textContent = 'Enviado'; b.disabled = true;
    enviarRecordatorio(S.colaboradores.find(x => x.id === b.dataset.recordar));
  });

  // Managers y ascensos
  $$('[data-ascender]').forEach(b => b.onclick = () => modalAscender(b.dataset.ascender));
  $$('[data-transferir]').forEach(b => b.onclick = () => modalTransferir(b.dataset.transferir));
  $$('[data-revertir]').forEach(b => b.onclick = () => revertirAscenso(b.dataset.revertir));

  // Micro aprendizaje desde cero
  $$('[data-envio]').forEach(b => b.onclick = () => abrirEnvio(b.dataset.envio));

  // Eliminar campaña
  $$('[data-camp-del]').forEach(b => b.onclick = () => {
    const c = S.campanas.find(x => x.id === b.dataset.campDel);
    if (!c || !confirm(`¿Eliminar la campaña «${c.nombre}»? Los envíos pendientes dejan de contar para los colaboradores.`)) return;
    S.campanas = S.campanas.filter(x => x.id !== c.id);
    S.pildoras = S.pildoras.filter(p => p.campana !== c.id);
    recalcularTodos();
    toast('Campaña eliminada', c.nombre, 'warn');
    render();
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
    if (c.estado === 'activa' && c.proxima === '—') c.proxima = sumarDias(HOY, 5);
    recalcularTodos();
    toast(c.estado === 'activa' ? 'Campaña activada' : 'Campaña pausada', `${c.nombre} · ${c.alcance} colaboradores.`, c.estado === 'activa' ? '' : 'warn');
    render();
  });

  // Acciones genéricas
  $$('[data-act]').forEach(b => b.onclick = () => accion(b.dataset.act, b));

  // Validación de colaboradores nuevos (Manager)
  $$('[data-validar]').forEach(b => b.onclick = () => validarColaborador(b.dataset.validar));
  // Contador "x de y seleccionados" de la Etapa 3 mientras el Manager marca/desmarca
  $$('[data-etapa3]').forEach(ch => ch.onchange = () => {
    const box = ch.closest('.etapa-card');
    const cnt = $('[data-cuenta]', box);
    if (cnt) cnt.textContent = `${$$('[data-etapa3]:checked', box).length} de ${$$('[data-etapa3]', box).length} seleccionados`;
  });
  // Asignar documentos: colaborador elegido
  $$('[data-asig-col]').forEach(r => r.onchange = () => { S.asignarCol = r.dataset.asigCol; render(); });

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
    case 'export': exportarCSV(); break;
    case 'nuevo-col': modalNuevoColaborador(); break;
    case 'nuevo-doc': modalNuevoDocumento(); break;
    case 'ia-generar': modalGenerarIA(btn && btn.dataset.doc); break;
    case 'nueva-campana': modalNuevaCampana({ docId: btn && btn.dataset.doc, nombre: btn && btn.dataset.nombre }); break;
    case 'asignar-doc': S.view = S.user.rol === 'manager' ? 'asignar' : 'documentos'; render(); break;
    case 'confirmar-asignacion': confirmarAsignacion(); break;
    case 'ia-accion':
      if (btn.dataset.txt === 'Crear campaña') {
        S.view = 'micro'; render();
        modalNuevaCampana({ docId: btn.dataset.doc, nombre: btn.dataset.nombre, sugerida: true });
      } else {
        toast('Acción registrada', btn.dataset.txt + ' · la sugerencia pasó a seguimiento.', 'ia');
      }
      break;
    case 'guardar': guardarConfig(); break;
    case 'limpiar-chat':
      S.chat = [{ me:false, t:'Conversación reiniciada. ¿Sobre qué documento necesita consultar?' }];
      render(); break;
  }
}

/* Descarga la tabla visible como CSV (separador ; para Excel en español) */
function exportarCSV() {
  const t = $('#view .tbl');
  if (!t) { toast('Nada para exportar', 'Esta pantalla no tiene una tabla de datos.', 'warn'); return; }
  const filas = $$('tr', t).filter(r => r.style.display !== 'none' && !r.querySelector('.tbl__empty'))
    .map(r => $$('th,td', r).map(td => '"' + td.innerText.replace(/\s+/g, ' ').trim().replace(/"/g, '""') + '"').join(';'));
  const url = URL.createObjectURL(new Blob(['﻿' + filas.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url; a.download = `${S.view}-${HOY}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  S.ultimaExport = HOY; guardar();
  toast('Exportación generada', `${Math.max(0, filas.length - 1)} fila(s) descargadas en CSV.`, 'info');
}

function enviarRecordatorio(c) {
  if (!c) return;
  notificar({ tipo:'recordatorio', titulo:'Recordatorio manual',
    detalle:`${c.nombre} fue notificado sobre sus actividades pendientes por ${S.user.nombre}.`, destino:c.nombre });
  guardar();
  toast('Recordatorio enviado', `${c.nombre} recibió el aviso en su correo corporativo.`, 'info');
}

/* ------------------------------------------------------------
   13. Ficha del colaborador (drawer)
------------------------------------------------------------ */
function fichaColaborador(id) {
  const c = S.colaboradores.find(x => x.id === id); if (!c) return;
  const { aprobados, total } = docResumen(c);
  const camp = c.estadoAlta === 'activo' ? campaniasPara(c.area) : [];
  const pctDocs = total ? pct(aprobados, total) : 0;
  const rol = S.user.rol;
  const agotadas = (c.evaluacionesRuta || []).filter(e => e.estado === 'reprobada' && e.intento >= S.config.intentos);
  const historial = S.evidencias.filter(e => e.colaborador === c.nombre).slice(0, 4).map(e => ({ i: e.tipo.includes('reprobada') ? 'warn' : 'ok', ic: ICO.check, t: `${e.tipo}: ${e.documento}`, s: `${e.fecha} · ${e.resultado}` }))
    .concat(S.notifs.filter(n => n.destino.includes(c.nombre)).slice(0, 3).map(n => ({ i: n.tipo === 'escalamiento' ? 'warn' : 'brand', ic: ICO.bell, t: n.titulo, s: `${n.fecha} · ${n.detalle}` })));
  const motivos = motivosAtencion(c);
  const ascenso = rol === 'admin' && c.rolActual !== 'manager' ? elegibilidadAscenso(c) : 'n/a';

  drawer(`
    <div class="drawer__head">
      <span class="av av--lg">${ini(c.nombre)}</span>
      <div style="flex:1">
        <h3 style="font-size:18px">${esc(c.nombre)}</h3>
        <p class="muted small" style="margin:3px 0 8px">${esc(c.cargo)} · ${areaNom(c.area)}</p>
        ${badgeCol(c)} <span class="badge badge--${c.riesgo === 'alto' ? 'danger' : c.riesgo === 'medio' ? 'warn' : 'muted'}">Riesgo ${c.riesgo}</span>
      </div>
      <button class="iconbtn" data-close-drawer>${svg(ICO.x)}</button>
    </div>
    <div class="drawer__body">
      ${motivos.length ? `<div class="explain" style="margin-bottom:16px">${svg(ICO.alert)} ${esc(motivos.join(' · '))}</div>` : ''}
      <div class="row" style="gap:22px;align-items:center">
        ${ring(pctDocs, 92, `${aprobados}/${total} documentos`, pctDocs < 40 ? '#B4342A' : pctDocs < 70 ? '#D99A12' : '#0E7A56')}
        <dl class="kv" style="flex:1">
          <dt>Identificador</dt><dd class="num">${c.id}</dd>
          <dt>Fecha de ingreso</dt><dd class="num">${fechaLarga(c.ingreso)}${diasDesde(c.ingreso) >= 0 ? ` · hace ${diasDesde(c.ingreso)} días` : ' · próximamente'}</dd>
          <dt>Manager</dt><dd>${esc(c.manager)}</dd>
          ${c.validadoPor ? `<dt>Ruta activada</dt><dd>${esc(c.fechaValidacion)} · por ${esc(c.validadoPor)}</dd>` : ''}
          ${c.rolActual === 'manager' ? `<dt>Rol</dt><dd>Manager desde ${fechaLarga(c.ascendidoEl)} (antes ${esc(c.cargoAnterior || '—')})</dd>` : ''}
          <dt>Documentos aprobados</dt><dd class="num">${aprobados}/${total}</dd>
          <dt>Promedio de exámenes</dt><dd class="num">${c.promedio ? c.promedio + '%' : 'Sin evaluaciones'}</dd>
          <dt>Pendientes</dt><dd class="num">${c.pendientes} evaluación(es)</dd>
          <dt>Última actividad</dt><dd>${actividadTxt(c)}</dd>
        </dl>
      </div>

      <div class="sec">
        <div class="sec__t">Ruta por etapas</div>
        ${etapasResumen(c).map(et => {
          const evTxt = !et.evalRuta ? '' :
            et.evalRuta.estado === 'aprobada' ? `<span class="badge badge--ok">Evaluación aprobada${et.evalRuta.puntaje != null ? ' · ' + et.evalRuta.puntaje + '%' : ''}</span>` :
            et.evalRuta.estado === 'bloqueada' ? `<span class="badge badge--info">Evaluación bloqueada hasta leer todo</span>` :
            et.evalRuta.estado === 'reprobada' ? `<span class="badge badge--danger">Reprobada · ${et.evalRuta.puntaje}% · intento ${et.evalRuta.intento} de ${S.config.intentos}</span>` :
            `<span class="badge badge--warn">Evaluación pendiente</span>`;
          return `<div class="etapa-card">
            <div class="etapa-card__h">
              <b>${esc(et.nombre)}</b>
              <span class="small muted">${et.leidos}/${et.total} leídos</span>
              ${evTxt}
            </div>
            <div class="doclist">
              ${et.docs.map(md => { const d = doc(md.docId); if (!d) return '';
                const est = c.estadoAlta !== 'activo' ? '<span class="badge badge--muted">Propuesto</span>'
                  : md.estado === 'leido' ? '<span class="badge badge--ok">Leído</span>'
                  : md.vence && md.vence < HOY ? '<span class="badge badge--danger">Vencido</span>' : '<span class="badge badge--warn">Pendiente</span>';
                return `<div class="docitem" style="padding:8px 12px">
                  <span class="docitem__ic" style="width:28px;height:32px">${svg(ICO.file)}</span>
                  <span class="docitem__b"><b style="font-size:12.8px">${esc(d.titulo)}</b>
                    <span class="docitem__m"><span>${d.minutos} min</span>${md.vence && md.estado !== 'leido' ? `<span>Vence ${fechaLarga(md.vence)}</span>` : ''}${md.estado === 'leido' && md.confirmado ? `<span>${esc(md.confirmado)}</span>` : ''}</span></span>
                  <span class="docitem__a">${est}</span>
                </div>`; }).join('')}
            </div>
          </div>`;
        }).join('') || '<p class="small muted">Sin documentación asignada todavía.</p>'}
        ${(c.evaluacionesRuta || []).filter(e => !e.etapaId).map(e => { const ev = evalu(e.evId); return ev ? `<div class="docitem" style="padding:8px 12px;margin-top:8px">
            <span class="docitem__ic" style="width:28px;height:32px;background:var(--brand-050);border-color:#D6E1FB;color:var(--brand)">${svg(ICO.check)}</span>
            <span class="docitem__b"><b style="font-size:12.8px">${esc(ev.titulo)}</b><span class="docitem__m"><span>Evaluación adicional</span></span></span>
            <span class="docitem__a"><span class="badge badge--${e.estado === 'aprobada' ? 'ok' : e.estado === 'reprobada' ? 'danger' : e.estado === 'bloqueada' ? 'info' : 'warn'}">${e.estado}${e.puntaje != null ? ' · ' + e.puntaje + '%' : ''}</span></span>
          </div>` : ''; }).join('')}
      </div>

      ${camp.length ? `<div class="sec">
        <div class="sec__t">Micro evaluaciones periódicas (${camp.length})</div>
        <p class="small muted" style="margin:0 0 8px">Aunque ya haya terminado sus etapas, estas evaluaciones de refuerzo le llegan de forma recurrente y cuentan como "Pendientes" hasta que las responde.</p>
        <div class="doclist">
          ${camp.map(cm => { const env = esCero() ? enviosPara(c).filter(e => e.campId === cm.id) : []; return `<div class="docitem" style="padding:10px 12px">
            <span class="docitem__ic" style="width:30px;height:34px;background:var(--accent-050);border-color:#F3DFCE;color:var(--accent)">${svg(ICO.spark)}</span>
            <span class="docitem__b"><b style="font-size:13px">${esc(cm.nombre)}</b>
              <span class="docitem__m"><span>${cm.periodicidad}</span>${esCero() ? `<span>${env.filter(e => e.respondido).length}/${env.length} envíos respondidos</span>` : `<span>Próxima: ${cm.proxima}</span>`}</span></span>
          </div>`; }).join('')}
        </div>
      </div>` : ''}

      <div class="sec">
        <div class="sec__t">Historial reciente</div>
        <ul class="feed">
          ${historial.map(h => `<li><span class="feed__i ${h.i}">${svg(h.ic)}</span><span><b>${esc(h.t)}</b><small>${esc(h.s)}</small></span></li>`).join('')
            || '<li><span class="small muted">Sin actividad registrada todavía.</span></li>'}
        </ul>
      </div>
    </div>
    <div class="drawer__foot" style="flex-wrap:wrap">
      ${c.estadoAlta === 'activo' ? `<button class="btn btn--primary" data-drawer-act="recordar">${svg(ICO.mail)} Recordatorio</button>` : ''}
      ${agotadas.length && rol !== 'colaborador' ? `<button class="btn" data-drawer-act="reintento">${svg(ICO.refresh)} Habilitar reintento</button>` : ''}
      ${rol === 'manager' && c.estadoAlta === 'activo' ? `<button class="btn" data-drawer-act="asignar">Asignar documento</button>` : ''}
      ${rol === 'manager' && c.estadoAlta === 'pendiente_validacion' ? `<button class="btn btn--primary" data-drawer-act="validar">Validar ruta</button>` : ''}
      ${rol === 'admin' && c.rolActual !== 'manager' ? (ascenso ? `<button class="btn" disabled title="${esc(ascenso)}">${svg(ICO.award)} Ascender a Manager</button>` : `<button class="btn" data-drawer-act="ascender">${svg(ICO.award)} Ascender a Manager</button>`) : ''}
      ${rol === 'admin' ? `<button class="btn btn--danger" data-drawer-act="baja">Dar de baja</button>` : ''}
      <button class="btn btn--ghost" data-close-drawer style="margin-left:auto">Cerrar</button>
    </div>`);

  $$('[data-close-drawer]').forEach(b => b.onclick = closeDrawer);
  $$('[data-drawer-act]').forEach(b => b.onclick = () => {
    const a = b.dataset.drawerAct;
    if (a === 'recordar') { enviarRecordatorio(c); b.disabled = true; b.textContent = 'Enviado'; }
    else if (a === 'reintento') {
      agotadas.forEach(e => { e.intento = S.config.intentos - 1; e.vence = sumarDias(HOY, S.config.plazoEvaluacion); });
      notificar({ tipo:'resultado', titulo:'Reintento habilitado', detalle:`${S.user.nombre} habilitó un nuevo intento a ${c.nombre}.`, destino:`${c.nombre} · ${c.manager}` });
      recalcularColaborador(c);
      toast('Reintento habilitado', `${c.nombre} puede volver a rendir ${agotadas.length} evaluación(es).`, 'info');
      render(); fichaColaborador(c.id);
    }
    else if (a === 'asignar') { closeDrawer(); S.asignarCol = c.id; S.view = 'asignar'; render(); }
    else if (a === 'validar') { closeDrawer(); S.view = 'validar'; render(); }
    else if (a === 'ascender') modalAscender(c.id);
    else if (a === 'baja') darDeBaja(c.id);
  });
}

/* Baja de un colaborador: deja de contar en todos los paneles. Sus evidencias
   se conservan (son registro de auditoría). */
function darDeBaja(id) {
  const c = S.colaboradores.find(x => x.id === id); if (!c) return;
  if (c.rolActual === 'manager' && equipoDeManager(c.nombre).some(x => x.id !== c.id)) {
    toast('Tiene equipo a cargo', 'Transfiera primero su equipo desde «Managers y ascensos».', 'warn'); return;
  }
  if (!confirm(`¿Dar de baja a ${c.nombre}? Deja de aparecer en paneles y rutas; sus evidencias se conservan para auditoría.`)) return;
  S.colaboradores = S.colaboradores.filter(x => x.id !== c.id);
  if (c.rolActual === 'manager') S.usuarios = S.usuarios.filter(u => u.colaboradorId !== c.id);
  notificar({ tipo:'baja', titulo:'Baja de colaborador', detalle:`${c.nombre} fue dado de baja por ${S.user.nombre}. Sus evidencias se conservan.`, destino:c.manager });
  closeDrawer();
  toast('Colaborador dado de baja', `${c.nombre} ya no figura en los paneles.`, 'warn');
  render();
}

/* ------------------------------------------------------------
   14. Detalle de documento (modal admin)
------------------------------------------------------------ */
function detalleDocumento(id) {
  const d = doc(id); if (!d) return;
  const st = docStats(d);
  const ev = S.evaluaciones.find(e => e.docId === id);
  const evEtapa = !ev && d.etapaId && !esEtapaArea(d) ? S.evaluaciones.find(e => e.etapaId === d.etapaId && !e.colaboradorId) : null;
  const etapa = d.etapaId && DB.etapas.find(x => x.id === d.etapaId);
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
        ${kpi('Audiencia', st.asignados, 'colaboradores asignados', '', '')}
        ${kpi('Lectura confirmada', st.asignados ? pct(st.leidos, st.asignados) + '%' : '—', `${st.leidos} de ${st.asignados}`, '', '')}
        ${kpi('Índice de error', st.intentos ? st.indiceError + '%' : '—', `${st.intentos} intentos registrados`, '', '')}
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
        : !ev && esEtapaArea(d) ? `<div class="explain">${svg(ICO.spark)} Documento de ${esc(etapa.nombre)} · ${d.porDefecto ? 'enviado por defecto por el Admin' : 'adicional: lo suma el Manager si corresponde'}. Sus ${(d.preguntas || []).length || 2} preguntas entran en la evaluación de Etapa 3 de cada colaborador que lo tenga asignado (${S.evaluaciones.filter(e => e.colaboradorId && (e.docs || []).includes(d.id)).length} hoy).</div>`
        : evEtapa ? `<div class="docitem">
            <span class="docitem__ic" style="background:var(--brand-050);border-color:#D6E1FB;color:var(--brand)">${svg(ICO.spark)}</span>
            <span class="docitem__b"><b>${esc(evEtapa.titulo)}</b>
              <span class="docitem__m"><span>Cubre toda ${esc(etapa.nombre)}</span><span>${evEtapa.preguntas.length} preguntas</span><span>Mínimo ${evEtapa.minimo}%</span></span></span>
            <span class="docitem__a"><button class="btn btn--sm" data-ev-prev="${evEtapa.id}">Previsualizar</button></span>
          </div>
          <p class="small muted" style="margin-top:10px">Este documento no tiene evaluación propia: se evalúa junto con el resto de ${esc(etapa.nombre)} en una sola evaluación. Puede generar una evaluación adicional específica para este documento si lo necesita.</p>`
        : `<div class="empty" style="padding:26px">${svg(ICO.spark)}<b>Sin evaluación publicada</b>Genere una evaluación con IA a partir de este documento.</div>`}
      </div>
    </div>
    <div class="modal__foot">
      <button class="btn btn--ai" data-act-actualizar="${d.id}">${svg(ICO.refresh)} Actualizar documento</button>
      <button class="btn btn--ai" data-ia-doc="${d.id}">${svg(ICO.spark)} ${ev ? 'Regenerar' : 'Generar'} evaluación con IA</button>
      <button class="btn" data-leer="${d.id}">${svg(ICO.eye)} Ver documento</button>
      <span class="spacer"></span>
      <button class="btn btn--danger" id="docRetirar">Retirar</button>
      <button class="btn btn--ghost" data-close>Cerrar</button>
    </div>`, 'modal--wide');

  bindModal();
  $('#docRetirar').onclick = () => retirarDocumento(d.id);
  $$('[data-leer]').forEach(b => b.onclick = () => abrirLector(b.dataset.leer));
  $$('[data-ia-doc]').forEach(b => b.onclick = () => modalGenerarIA(b.dataset.iaDoc));
  $$('[data-ev-prev]').forEach(b => b.onclick = () => previsualizarEvaluacion(b.dataset.evPrev));
  $$('[data-act-actualizar]').forEach(b => b.onclick = () => modalActualizarDocumento(b.dataset.actActualizar));
}

function bindModal() {
  $$('[data-close]').forEach(b => b.onclick = closeModal);
}

/* Retirar un documento: sale del repositorio y de todas las rutas; sus
   evaluaciones propias y campañas también se retiran. Si un colaborador se
   queda sin documentos de una etapa, se le quita también la evaluación de esa etapa. */
function retirarDocumento(docId) {
  const d = doc(docId); if (!d) return;
  const afectados = S.colaboradores.filter(c => c.documentosRuta.some(x => x.docId === docId));
  if (!confirm(`¿Retirar «${d.titulo}»? Sale de la ruta de ${afectados.length} colaborador(es). Las evidencias ya registradas se conservan.`)) return;
  const evIds = S.evaluaciones.filter(e => e.docId === docId).map(e => e.id);
  S.documentos = S.documentos.filter(x => x.id !== docId);
  S.evaluaciones = S.evaluaciones.filter(e => !evIds.includes(e.id));
  S.campanas = S.campanas.filter(cm => cm.docId !== docId);
  S.pildoras = S.pildoras.filter(p => p.doc !== docId && S.campanas.some(cm => cm.id === p.campana));
  S.colaboradores.forEach(c => {
    c.documentosRuta = c.documentosRuta.filter(x => x.docId !== docId);
    c.evaluacionesRuta = c.evaluacionesRuta.filter(e => !evIds.includes(e.evId) && (!e.etapaId || c.documentosRuta.some(x => x.etapaId === e.etapaId)));
    armarEvaluacionEtapa3(c);
    recalcularColaborador(c);
  });
  notificar({ tipo:'actualizacion', titulo:'Documento retirado', detalle:`${d.titulo} (${d.codigo}) fue retirado por ${S.user.nombre}. Impactó a ${afectados.length} colaborador(es).`, destino:'Toda la organización' });
  closeModal();
  toast('Documento retirado', `${d.titulo} ya no forma parte de ninguna ruta.`, 'warn');
  render();
}

/* Evaluación propia de un documento (la crea con IA si todavía no existe) */
function evaluacionDeDocumento(docId) {
  const existente = S.evaluaciones.find(e => e.docId === docId && !e.id.startsWith('EV-UPD'));
  if (existente) return existente;
  const d = doc(docId);
  const ev = { id: nuevoId('EV-'), docId, titulo: `Evaluación · ${d.titulo}`, minutos: 5, minimo: S.config.minimo, intentos: S.config.intentos,
    generadaPor: 'IA · Gemini Pro', fecha: HOY, preguntas: generarPreguntasIA(d, Math.min(S.config.preguntasIA, 8)).map(({ activa, ...p }) => p) };
  S.evaluaciones.push(ev);
  return ev;
}

/* ------------------------------------------------------------
   15. Generación de evaluación con IA (a partir de un documento elegido)
------------------------------------------------------------ */
let _genState = null;

function generarPreguntasIA(d, n = 8) {
  const seed = S.evaluaciones.find(e => e.docId === d.id);
  const plantillas = [
    { q: `Según ${d.titulo}, ¿qué debe hacer un colaborador ante una duda sobre su aplicación?`, o: ['Improvisar una solución propia', 'Consultar al dueño del proceso o a su Manager', 'Ignorar la situación hasta la próxima capacitación', 'Aplicar el criterio de otro colaborador'], r: 1 },
    { q: `¿Cuál de las siguientes acciones cumple con ${d.titulo}?`, o: ['Aplicarlo solo si el cliente lo solicita', 'Seguir el procedimiento definido, sin excepciones no autorizadas', 'Delegarlo siempre a otra área', 'Aplicarlo únicamente durante auditorías'], r: 1 },
    { q: `¿Qué puede ocurrir si no se cumple lo indicado en ${d.titulo}?`, o: ['No tiene ninguna consecuencia', 'Puede derivar en un hallazgo o incidente registrado', 'Se resuelve automáticamente con el tiempo', 'Solo afecta al área de Sistemas'], r: 1 },
    { q: `¿Cada cuánto se recomienda revisar los lineamientos de ${d.titulo}?`, o: ['Nunca, es un documento estático', 'Cuando se publique una nueva versión o exista una duda', 'Solo al momento de ingresar a la empresa', 'Cada cinco años'], r: 1 },
    { q: `¿Quién es responsable de aplicar ${d.titulo} en el día a día?`, o: ['Únicamente el área legal', 'Cada colaborador dentro de su rol', 'Solo los managers del área', 'Nadie, es solo informativo'], r: 1 },
    { q: `Un colaborador nuevo pregunta por qué existe ${d.titulo}. ¿Cuál es la mejor respuesta?`, o: ['Porque lo exige un cliente puntual', 'Porque estandariza y protege a la organización y a sus clientes', 'Porque es un trámite administrativo sin impacto real', 'No tiene una razón clara'], r: 1 },
    { q: `¿Cuál de estas opciones describe mejor una buena práctica relacionada con ${d.titulo}?`, o: ['Registrar evidencia cuando el procedimiento lo exige', 'Evitar dejar registro para agilizar el trabajo', 'Aplicarlo solo si alguien lo supervisa', 'Reemplazarlo por criterio personal'], r: 0 },
    { q: `¿Qué debería hacer un colaborador que detecta un incumplimiento relacionado con ${d.titulo}?`, o: ['No decir nada para evitar conflictos', 'Reportarlo por el canal correspondiente', 'Resolverlo por su cuenta sin informar', 'Esperar a que alguien más lo note'], r: 1 }
  ];
  const base = seed ? seed.preguntas.map(p => ({ ...p, o: [...p.o] })) : [];
  return [...base, ...plantillas].slice(0, n).map((p, i) => ({ ...p, o: [...p.o], activa: true, exp: p.exp || `Contenido evaluado a partir de ${d.titulo} v${d.version}.` }));
}

function modalGenerarIA(docId) {
  _genState = { docId: (docId && doc(docId) ? docId : (S.documentos[0] || {}).id), plazo: 8, preguntas: [] };
  pintarGenPaso1();
}

function pintarGenPaso1() {
  modal(modalHead('Generar evaluación con IA', 'Seleccione el documento y el plazo para completarla') + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:0 16px">
        <div class="field"><span class="login__label">Documento</span>
          <select id="gen-doc" style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">
            ${S.documentos.map(x => `<option value="${x.id}" ${x.id === _genState.docId ? 'selected' : ''}>${esc(x.titulo)} · v${x.version}</option>`).join('')}
          </select></div>
        <div class="field"><span class="login__label">Plazo para completarla (días)</span>
          <input id="gen-plazo" type="number" min="1" max="30" value="${_genState.plazo}"></div>
      </div>
      <p class="small muted mt-8">Se generarán 8 preguntas a partir del contenido del documento. Los colaboradores que ya tienen este documento en su ruta —lo hayan leído o no— recibirán la evaluación; eso se sumará a sus pendientes hasta que la rindan.</p>
    </div>
    <div class="modal__foot"><span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="genNext">Generar con IA</button></div>`, 'modal--wide');
  bindModal();
  $('#genNext').onclick = () => {
    _genState.docId = $('#gen-doc').value;
    _genState.plazo = Math.max(1, parseInt($('#gen-plazo').value) || 8);
    iniciarGeneracionIA();
  };
}

function iniciarGeneracionIA() {
  const d = doc(_genState.docId);
  const pasos = [
    'Analizando el documento y segmentando por secciones',
    'Identificando obligaciones, plazos y umbrales evaluables',
    'Redactando preguntas con distractores plausibles',
    'Calibrando la dificultad con el histórico de aciertos'
  ];
  modal(modalHead('Generar evaluación con IA', `${d.titulo} · versión ${d.version}`) + `
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
    } else { pintarGenPreguntas(); }
  };
  setTimeout(avanzar, 260);
}

function pintarGenPreguntas() {
  const d = doc(_genState.docId);
  _genState.preguntas = generarPreguntasIA(d, 8);
  const out = $('#genOut'); if (!out) return;
  out.classList.remove('hide');
  $('#genNote').innerHTML = `<span class="ia__badge">${svg(ICO.spark)} 8 preguntas generadas · plazo ${_genState.plazo} día(s)</span>`;
  $('#genPub').classList.remove('hide');

  const pintar = () => {
    out.innerHTML = `<div class="sec__t">Preguntas propuestas · edite el texto o desmarque las que no quiera enviar</div>` +
      _genState.preguntas.map((q, n) => `
        <div class="qgen ${q.activa ? '' : 'qgen--off'}">
          <div class="qgen__h">
            <label class="row" style="gap:8px"><input type="checkbox" data-q-toggle="${n}" ${q.activa ? 'checked' : ''}><span class="tag tag--ai">${n + 1}</span></label>
            <input class="qgen__edit" data-q-text="${n}" value="${esc(q.q)}">
          </div>
          <ol type="A">${q.o.map((o, oi) => `<li class="${oi === q.r ? 'ok' : ''}"><input class="qgen__edit qgen__edit--op" data-q-op="${n}:${oi}" value="${esc(o)}">${oi === q.r ? ' · correcta' : ''}</li>`).join('')}</ol>
        </div>`).join('');
    $$('[data-q-toggle]', out).forEach(cb => cb.onchange = () => { _genState.preguntas[+cb.dataset.qToggle].activa = cb.checked; pintar(); });
    $$('[data-q-text]', out).forEach(inp => inp.oninput = () => { _genState.preguntas[+inp.dataset.qText].q = inp.value; });
    $$('[data-q-op]', out).forEach(inp => inp.oninput = () => { const [n, oi] = inp.dataset.qOp.split(':').map(Number); _genState.preguntas[n].o[oi] = inp.value; });
  };
  pintar();

  $('#genPub').onclick = () => {
    const seleccionadas = _genState.preguntas.filter(q => q.activa);
    if (!seleccionadas.length) { toast('Seleccione al menos una pregunta', 'Debe dejar activa al menos una pregunta para publicar la evaluación.', 'warn'); return; }
    const ev = { id:nuevoId('EV-'), docId: d.id, titulo:`Evaluación · ${d.titulo}`, minutos:5, minimo:S.config.minimo, intentos:S.config.intentos,
      generadaPor:'IA · Gemini Pro', fecha: HOY, preguntas: seleccionadas };
    S.evaluaciones.push(ev);
    const nuevos = asignarEvaluacionNueva(ev, _genState.plazo);
    closeModal();
    toast('Evaluación publicada', `${seleccionadas.length} preguntas · se asignó a ${nuevos} colaborador(es) con este documento; les subió en 1 sus pendientes.`, 'ia');
    S.notifs.unshift({ id:nuevoId('N-'), tipo:'actualizacion', titulo:'Evaluación publicada',
      detalle:`${ev.titulo} quedó disponible en la ruta de aprendizaje, con ${_genState.plazo} día(s) de plazo.`, destino:'Audiencia del documento', fecha: ahora(), estado:'enviada' });
    render();
  };
}

/* Asigna una evaluación recién creada a todo colaborador activo que ya tenga
   el documento en su ruta y que aún no tenga una evaluación de ese documento
   — sin importar si ya lo leyó o no. Sube "pendientes" en 1 por cada uno. */
function asignarEvaluacionNueva(ev, plazoDias) {
  let nuevos = 0;
  S.colaboradores.forEach(c => {
    if (c.estadoAlta === 'pendiente_validacion') return;
    if (!c.documentosRuta.some(x => x.docId === ev.docId)) return;
    const yaTiene = c.evaluacionesRuta.some(e => { const evx = evalu(e.evId); return evx && evx.docId === ev.docId; });
    if (yaTiene) return;
    c.evaluacionesRuta.push({ evId: ev.id, estado:'pendiente', puntaje:null, fecha:null, intento:0, vence: sumarDias(HOY, plazoDias) });
    recalcularColaborador(c);
    nuevos++;
  });
  return nuevos;
}

/* ============================================================
   ACTUALIZACIÓN DE DOCUMENTOS — flujo de 4 carriles del PPT:
   Admin (clasifica el cambio y el grupo impactado)
   → IA (analiza y genera preguntas sobre el cambio)
   → Sistema (notifica y asigna la evaluación a los afectados)
   → Colaborador (revisa, confirma lectura y rinde)
   ============================================================ */
let _actState = null; // datos que viajan entre los pasos del flujo, dentro de esta sesión

const sugerirVersion = (v) => { const n = parseFloat(v) || 1; return (Math.round((n + 0.1) * 10) / 10).toFixed(1); };
const afectadosPorGrupos = (grupos) => S.colaboradores.filter(c => c.estadoAlta === 'activo' && grupos.includes(c.area));

/* Paso 1 · Admin: clasifica el cambio y elige a quién impacta */
function modalActualizarDocumento(docId) {
  const d = doc(docId);
  const nueva = sugerirVersion(d.version);
  _actState = { docId, version: nueva, nivel: 'mayor', resumen: '', grupos: [...d.areas] };

  modal(modalHead('Actualizar documento', `${d.titulo} · versión actual v${d.version}`) + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:0 16px">
        <div class="field"><span class="login__label">Nueva versión</span><input id="up-version" value="${nueva}"></div>
        <div class="field"><span class="login__label">Nivel del cambio</span>
          <select id="up-nivel" style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">
            <option value="mayor">Mayor · requiere micro evaluación</option>
            <option value="menor">Menor · solo aviso informativo</option>
          </select></div>
      </div>
      <div class="field"><span class="login__label">Resumen del cambio</span>
        <textarea id="up-resumen" rows="3" style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px;font:inherit;resize:vertical"
          placeholder="Ej. Se reduce a 2 horas el plazo para reportar la pérdida del segundo factor de autenticación."></textarea></div>

      <div class="divider"></div>
      <div class="sec__t">Grupos impactados por este cambio</div>
      <div class="row wrap" style="gap:14px" id="up-grupos">
        ${DB.areas.map(a => `<label class="row" style="gap:7px;font-size:13.2px">
          <input type="checkbox" data-up-area="${a.id}" ${d.areas.includes(a.id) ? 'checked' : ''}> ${a.nombre}</label>`).join('')}
      </div>
      <p class="small muted mt-8" id="up-conteo"></p>
    </div>
    <div class="modal__foot">
      <span class="small muted">La IA generará las preguntas a partir del resumen que escriba.</span>
      <span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--ai" id="up-analizar">${svg(ICO.spark)} Analizar con IA y generar preguntas</button>
    </div>`, 'modal--wide');
  bindModal();

  const pintarConteo = () => {
    const grupos = $$('[data-up-area]:checked').map(ch => ch.dataset.upArea);
    $('#up-conteo').textContent = `Impacta a ${afectadosPorGrupos(grupos).length} colaboradores activos de los grupos seleccionados.`;
  };
  $$('[data-up-area]').forEach(ch => ch.onchange = pintarConteo);
  pintarConteo();

  $('#up-analizar').onclick = () => {
    const resumen = $('#up-resumen').value.trim();
    if (!resumen) { toast('Falta el resumen', 'Describa brevemente qué cambió en el documento.', 'warn'); return; }
    _actState.version = $('#up-version').value.trim() || nueva;
    _actState.nivel = $('#up-nivel').value;
    _actState.resumen = resumen;
    _actState.grupos = $$('[data-up-area]:checked').map(ch => ch.dataset.upArea);
    if (!_actState.grupos.length) { toast('Seleccione al menos un grupo', 'No puede notificar una actualización sin audiencia.', 'warn'); return; }
    iniciarAnalisisIA();
  };
}

/* Paso 2 · IA: analiza el cambio y genera las preguntas (misma animación que la generación de evaluaciones) */
function iniciarAnalisisIA() {
  const d = doc(_actState.docId);
  const pasos = ['Analizando las modificaciones del documento', 'Identificando los cambios relevantes para el colaborador', 'Generando preguntas relacionadas con el cambio'];

  modal(modalHead('La IA está analizando el cambio', `${d.titulo} · v${d.version} → v${_actState.version}`) + `
    <div class="modal__body">
      <ul class="gensteps" id="genSteps">${pasos.map((p, i) => `<li data-i="${i}"><span class="dotmark"></span><span>${p}</span></li>`).join('')}</ul>
      <div id="genOut" class="hide mt-24"></div>
    </div>
    <div class="modal__foot">
      <span class="small muted" id="genNote">Este paso corresponde al carril "Inteligencia Artificial" del proceso.</span>
      <span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary hide" id="genPub">Publicar actualización y notificar</button>
    </div>`, 'modal--wide');
  bindModal();

  let i = 0;
  const lis = $$('#genSteps li');
  const avanzar = () => {
    if (i > 0) { lis[i - 1].innerHTML = `<span class="tick">${svg('<path d="M20 6 9 17l-5-5"/>')}</span><span>${pasos[i - 1]}</span>`; lis[i - 1].classList.add('done'); }
    if (i < lis.length) { lis[i].innerHTML = `<span class="spin"></span><span>${pasos[i]}</span>`; lis[i].classList.add('on'); i++; setTimeout(avanzar, 720 + Math.random() * 380); }
    else mostrarPreguntasActualizacion();
  };
  setTimeout(avanzar, 240);
}

/* Genera 3 preguntas de la micro evaluación a partir del resumen del cambio,
   reforzando con una pregunta de la evaluación existente del documento si la hay. */
function generarPreguntasActualizacion() {
  const d = doc(_actState.docId);
  const evExistente = S.evaluaciones.find(e => e.docId === _actState.docId);
  const otros = S.documentos.filter(x => x.id !== d.id).map(x => x.cambios[0]?.detalle).filter(Boolean);

  const p1 = {
    q: `¿Cuál es el cambio principal que introduce la versión ${_actState.version} de "${d.titulo}"?`,
    o: [_actState.resumen, ...otros.slice(0, 3)].sort(() => Math.random() - .5)
  };
  p1.r = p1.o.indexOf(_actState.resumen);
  p1.exp = `La actualización a la versión ${_actState.version} corresponde a un cambio ${_actState.nivel}: ${_actState.resumen}`;

  const p2 = evExistente ? { ...evExistente.preguntas[0] } : {
    q: `¿A partir de cuándo rige la versión ${_actState.version} de este documento?`,
    o: [`Desde el ${fechaLarga(HOY)}`, 'Desde el próximo trimestre', 'Solo para contratos nuevos', 'No aplica retroactivamente'],
    r: 0, exp: 'Toda actualización rige desde la fecha de publicación indicada en el historial de versiones del documento.'
  };

  const p3 = {
    q: '¿Qué debe hacer si tiene dudas sobre esta actualización?',
    o: ['Aplicar la versión anterior hasta aclararlo', 'Consultar al asistente documental o a su Manager', 'Ignorar el cambio si no afecta su tarea actual', 'Esperar a la siguiente micro evaluación'],
    r: 1, exp: 'El asistente documental responde citando el documento y la versión vigente; ante dudas normativas, el Manager es el canal formal.'
  };

  return [p1, p2, p3];
}

function mostrarPreguntasActualizacion() {
  const d = doc(_actState.docId);
  _actState.preguntas = generarPreguntasActualizacion();
  const out = $('#genOut'); if (!out) return;
  out.classList.remove('hide');
  $('#genNote').innerHTML = `<span class="ia__badge">${svg(ICO.spark)} 3 preguntas generadas · audiencia: ${afectadosPorGrupos(_actState.grupos).length} colaboradores</span>`;
  $('#genPub').classList.remove('hide');

  out.innerHTML = `<div class="sec__t">Micro evaluación propuesta para la actualización · revise antes de publicar</div>` +
    _actState.preguntas.map((q, n) => `
      <div class="qgen">
        <div class="qgen__h"><span class="tag tag--ai">${n + 1}</span><b>${esc(q.q)}</b><span class="tag">confianza ${90 + n * 3}%</span></div>
        <ol type="A">${q.o.map((o, oi) => `<li class="${oi === q.r ? 'ok' : ''}">${esc(o)}${oi === q.r ? ' · correcta' : ''}</li>`).join('')}</ol>
        <p class="small muted" style="margin:9px 0 0"><b>Justificación:</b> ${esc(q.exp)}</p>
      </div>`).join('');

  $('#genPub').onclick = () => publicarActualizacion();
}

/* Paso 3 y 4 · Sistema notifica y asigna; el Colaborador la recibirá en su ruta */
function publicarActualizacion() {
  const { docId, version, nivel, resumen, grupos, preguntas } = _actState;
  const d = doc(docId);
  const versionAnterior = d.version;

  d.version = version;
  d.estado = 'actualizado';
  d.actualizado = HOY;
  d.areas = [...new Set([...d.areas, ...grupos])];
  d.cambios.unshift({ v:version, fecha:HOY, nivel, detalle:resumen });

  const ev = { id:nuevoId('EV-UPD-'), docId, titulo:`Actualización · ${d.titulo} v${version}`,
    minutos:5, minimo:S.config.minimo, intentos:S.config.intentos, generadaPor:'IA · Gemini Pro', fecha:HOY, preguntas };
  S.evaluaciones.push(ev);

  const afectados = afectadosPorGrupos(grupos);
  afectados.forEach(c => {
    let md = c.documentosRuta.find(x => x.docId === docId);
    if (md) { md.estado = 'pendiente'; md.confirmado = null; md.vence = sumarDias(HOY, 3); md.origen = `Actualización v${version}`; }
    else c.documentosRuta.push({ docId, estado:'pendiente', confirmado:null, vence:sumarDias(HOY, 3), origen:`Actualización v${version}` });
    if (nivel === 'mayor') c.evaluacionesRuta.push({ evId:ev.id, estado:'bloqueada', puntaje:null, fecha:null, intento:0 });
    recalcularColaborador(c);
  });

  d.asignados = S.colaboradores.filter(c => c.documentosRuta.some(x => x.docId === docId)).length;
  d.leidos = S.colaboradores.filter(c => c.documentosRuta.some(x => x.docId === docId && x.estado === 'leido')).length;

  S.notifs.unshift({ id:nuevoId('N-'), tipo:'actualizacion', titulo:'Documento actualizado',
    detalle:`${d.titulo} pasó de v${versionAnterior} a v${version} (cambio ${nivel}). ${nivel === 'mayor' ? 'Se generó una micro evaluación obligatoria.' : 'Aviso informativo, sin evaluación.'} · ${resumen}`,
    destino: grupos.map(areaNom).join(', '), fecha:ahora(), estado:'enviada' });

  closeModal();
  toast('Actualización publicada', `${afectados.length} colaboradores fueron notificados y deben ${nivel === 'mayor' ? 'releer y rendir la evaluación' : 'releer el documento'}.`, 'ia');
  _actState = null;
  render();
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
  const ca = S.user.colaboradorId ? colaboradorActivo() : null;
  const md = ca ? ca.documentosRuta.find(m => m.docId === docId) : null;
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
  const ca = colaboradorActivo();
  const md = ca.documentosRuta.find(m => m.docId === docId);
  if (md) { md.estado = 'leido'; md.confirmado = ahora(); }
  const d = doc(docId); d.leidos = Math.min(d.asignados, d.leidos + 1);

  let habilitoAlguna = false;
  // Al habilitarse, cada evaluación tiene su propio plazo
  const habilitar = (me) => { me.estado = 'pendiente'; me.vence = sumarDias(HOY, S.config.plazoEvaluacion); habilitoAlguna = true; };

  // Si el documento pertenece a una etapa de la ruta, la evaluación de esa etapa se
  // habilita solo cuando TODOS los documentos de la etapa ya están leídos (una
  // evaluación cubre varios documentos, no uno solo).
  const etapaRuta = md && md.etapaId;
  if (etapaRuta) {
    const docsEtapa = ca.documentosRuta.filter(m => m.etapaId === etapaRuta);
    if (docsEtapa.every(m => m.estado === 'leido')) {
      // La de su ruta (en la Etapa 3 es su evaluación personal)
      const me = ca.evaluacionesRuta.find(x => x.etapaId === etapaRuta);
      if (me && me.estado === 'bloqueada') habilitar(me);
    }
  }

  // Evaluaciones ad-hoc asignadas específicamente a este documento (fuera de una
  // etapa): por ejemplo, la micro evaluación generada tras una actualización mayor.
  S.evaluaciones.filter(e => e.docId === docId).forEach(ev => {
    const me = ca.evaluacionesRuta.find(x => x.evId === ev.id);
    if (me && me.estado === 'bloqueada') habilitar(me);
  });

  S.evidencias.unshift({ id:nuevoId('EVD-'), colaborador:S.user.nombre,
    documento:`${d.titulo} v${d.version}`, tipo:'Confirmación de lectura', resultado:'Confirmada',
    fecha:ahora(), hash:hashEvidencia() });

  marcarActividad(ca);
  recalcularColaborador(ca);
  closeModal();
  toast('Lectura confirmada', `${d.titulo} quedó registrado como evidencia.${habilitoAlguna ? ' Su evaluación ya está disponible.' : ''}`);
  render();
}

/* ------------------------------------------------------------
   17. Evaluación interactiva
------------------------------------------------------------ */
function abrirQuiz(evId) {
  const ev = evalu(evId);
  const ca = colaboradorActivo();
  const me = ca.evaluacionesRuta.find(e => e.evId === evId);
  if (me && me.estado === 'aprobada') { resultadoPrevio(ev, me); return; }
  if (me && me.estado === 'bloqueada') { toast('Evaluación bloqueada', 'Se habilita al confirmar la lectura de todos los documentos que cubre.', 'warn'); return; }
  if (me && me.estado === 'reprobada' && me.intento >= S.config.intentos) {
    toast('Intentos agotados', `Usó los ${S.config.intentos} intentos. Su Manager puede habilitarle uno nuevo.`, 'warn'); return;
  }

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
  const ca = colaboradorActivo();
  const ok = q.resp.filter((r, i) => r === ev.preguntas[i].r).length;
  const score = Math.round(ok / ev.preguntas.length * 100);
  const aprobado = score >= ev.minimo;

  const me = ca.evaluacionesRuta.find(e => e.evId === ev.id);
  if (me) { me.estado = aprobado ? 'aprobada' : 'reprobada'; me.puntaje = score; me.fecha = ahora(); me.intento++; }
  // Cada intento queda registrado: alimenta índice de error, brechas y resultados del equipo
  S.intentos.push({ id: nuevoId('INT-'), colId: ca.id, evId: ev.id, correctas: ok, total: ev.preguntas.length, score, aprobado,
    fallas: q.resp.map((r, i) => r === ev.preguntas[i].r ? -1 : i).filter(i => i >= 0), fecha: ahora() });
  marcarActividad(ca);
  recalcularColaborador(ca);
  const restantes = Math.max(0, S.config.intentos - (me ? me.intento : 1));

  const etapaEv = ev.etapaId && DB.etapas.find(x => x.id === ev.etapaId);
  const docRef = ev.docId ? doc(ev.docId) : null;

  S.evidencias.unshift({ id:nuevoId('EVD-'), colaborador:S.user.nombre,
    documento: etapaEv ? etapaEv.nombre : (docRef ? `${docRef.titulo} v${docRef.version}` : ev.titulo),
    tipo:aprobado ? 'Evaluación aprobada' : 'Evaluación reprobada', resultado:score + '%',
    fecha:ahora(), hash:hashEvidencia() });
  if (!aprobado) {
    notificar({ tipo:'resultado', titulo:'Evaluación reprobada',
      detalle:`${ca.nombre} obtuvo ${score}% en ${ev.titulo.replace('Evaluación · ', '')}. ${restantes ? `Le quedan ${restantes} intento(s).` : 'Intentos agotados: requiere que el Manager habilite uno nuevo.'}`,
      destino:`${ca.nombre} · ${ca.manager}` });
  }

  modal(modalHead('Resultado de la evaluación', ev.titulo.replace('Evaluación · ', '')) + `
    <div class="modal__body">
      <div class="result">
        ${ring(score, 132, aprobado ? 'aprobado' : 'no aprobado', aprobado ? '#0E7A56' : '#B4342A')}
        <h3 class="mt-16">${aprobado ? 'Evaluación aprobada' : porTiempo ? 'Tiempo agotado' : 'No alcanzó el mínimo'}</h3>
        <p>${aprobado
          ? 'Su comprensión quedó verificada y registrada como evidencia. La siguiente fase de su ruta ya está habilitada.'
          : restantes ? `Necesita ${ev.minimo}% para aprobar. Revise el documento y vuelva a intentarlo: le quedan ${restantes} intento(s).`
          : `Necesita ${ev.minimo}% para aprobar y ya usó los ${S.config.intentos} intentos. Su Manager fue notificado y puede habilitarle uno nuevo.`}</p>
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
      ${!aprobado ? `${restantes ? `<button class="btn" id="qRetry">${svg(ICO.refresh)} Reintentar</button>` : ""}
                     ${docRef ? `<button class="btn" data-leer="${ev.docId}">Releer el documento</button>` : `<button class="btn" data-view-go="misdocs">Releer los documentos de la etapa</button>`}` : ''}
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
  modal(modalHead('Registrar colaborador', 'Etapa 1 del flujo: el Admin registra los datos. El correo de bienvenida se envía recién cuando el Manager valide la documentación.') + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:0 16px">
        <div class="field"><span class="login__label">Nombre completo</span><input id="nc-nombre" placeholder="Ej. Ana Paredes"></div>
        <div class="field"><span class="login__label">Correo corporativo</span><input id="nc-correo" placeholder="Se genera automáticamente" readonly></div>
        <div class="field"><span class="login__label">Cargo</span><input id="nc-cargo" placeholder="Ej. QA Engineer"></div>
        <div class="field"><span class="login__label">Área</span>
          <select id="nc-area" style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">
            ${DB.areas.map(a => `<option value="${a.id}">${a.nombre}</option>`).join('')}</select></div>
        <div class="field"><span class="login__label">Manager responsable</span>
          <select id="nc-manager" style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">
            ${managers().map(m => `<option value="${esc(m.nombre)}" data-area="${m.area}">${esc(m.nombre)} · ${esc(m.cargo)}</option>`).join('')}</select></div>
        <div class="field"><span class="login__label">Fecha de ingreso</span><input id="nc-ingreso" type="date" value="${HOY}"></div>
      </div>
      <div class="divider"></div>
      <div class="sec__t" id="nc-ruta-t">Ruta propuesta según el área</div>
      <div class="doclist" id="nc-ruta"></div>
      <div class="explain mt-16">${svg(ICO.alert)} El colaborador <b>no verá esta documentación</b> hasta que <b id="nc-mgr-preview">su Manager</b> la confirme en "Nuevos por validar".</div>
    </div>
    <div class="modal__foot"><span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="saveCol">Registrar (queda pendiente de validación)</button></div>`, 'modal--wide');
  bindModal();

  const pintarRutaPreview = () => {
    const area = $('#nc-area').value;
    const ids = rutaBaseParaArea(area);
    const grupos = documentosPorEtapa(area);
    $('#nc-ruta-t').textContent = `Ruta propuesta por etapa (${ids.length} documentos · el Manager la revisará antes de activarla)`;
    $('#nc-ruta').innerHTML = grupos.map(({ etapa, docs }) => {
      const area3 = etapa.alcance === 'area';
      const enviados = docs.filter(d => ids.includes(d.id));
      return `<div class="etapa-card">
        <div class="etapa-card__h"><b>${esc(etapa.nombre)}</b>
          <span class="small muted">${area3 ? `${enviados.length} de ${docs.length} documentos del área · el Manager puede quitar o sumar` : `${docs.length} documentos · obligatoria para todos`}</span></div>
        <div class="doclist">
        ${docs.map(d => { const va = ids.includes(d.id); return `
          <div class="docitem" style="padding:9px 12px;${va ? '' : 'opacity:.55'}">
            <span class="docitem__ic ${d.criticidad === 'alta' ? 'crit' : ''}" style="width:28px;height:32px">${svg(ICO.file)}</span>
            <span class="docitem__b"><b style="font-size:13px">${esc(d.titulo)}</b>
              <span class="docitem__m"><span>${d.codigo}</span><span>v${d.version}</span><span>${d.minutos} min</span></span></span>
            <span class="docitem__a">${!area3 ? '<span class="badge badge--info">Obligatorio</span>'
              : va ? '<span class="badge badge--ok">Por defecto</span>' : '<span class="badge badge--muted">Opcional · decide el Manager</span>'}</span></div>`; }).join('')}
        </div></div>`;
    }).join('');
    $('#nc-mgr-preview').textContent = $('#nc-manager').value;
  };
  // Al cambiar de área se sugiere el Manager de esa área (si hay uno)
  $('#nc-area').onchange = () => {
    const opt = $$('#nc-manager option').find(o => o.dataset.area === $('#nc-area').value);
    if (opt) $('#nc-manager').value = opt.value;
    pintarRutaPreview();
  };
  $('#nc-manager').onchange = pintarRutaPreview;
  $('#nc-nombre').oninput = () => { $('#nc-correo').value = $('#nc-nombre').value.trim() ? correoDe($('#nc-nombre').value.trim()) : ''; };
  $('#nc-area').onchange();

  $('#saveCol').onclick = () => {
    const nombre = $('#nc-nombre').value.trim().replace(/\s+/g, ' ');
    const area = $('#nc-area').value;
    const manager = $('#nc-manager').value;
    const cargo = $('#nc-cargo').value.trim() || 'Colaborador';
    const ingreso = $('#nc-ingreso').value || HOY;
    if (nombre.split(' ').length < 2) { toast('Falta el nombre completo', 'Escriba nombre y apellido del colaborador.', 'warn'); return; }
    if (!manager) { toast('Falta el Manager', 'Seleccione quién validará su documentación.', 'warn'); return; }
    const correo = correoDe(nombre);
    if (S.colaboradores.some(c => correoDe(c.nombre) === correo) || S.usuarios.some(u => u.correo === correo)) {
      toast('Ya existe ese correo', `${correo} ya está registrado.`, 'warn'); return;
    }

    S.colaboradores.unshift({
      id: nuevoId('C-'), nombre, cargo, area, manager, ingreso, registradoPor: S.user.nombre,
      estadoAlta:'pendiente_validacion', fase:0, progreso:0, estado:'por_iniciar',
      promedio:0, pendientes:0, ultimaActividad:'Sin actividad', riesgo:'bajo',
      documentosRuta: rutaBaseParaArea(area).map(docId => ({ docId, etapaId: doc(docId).etapaId, estado:'pendiente', confirmado:null, vence:null, origen:'Propuesto' })),
      evaluacionesRuta: []
    });

    notificar({ tipo:'validacion', titulo:'Nuevo colaborador por validar',
      detalle:`${nombre} fue registrado por ${S.user.nombre} y espera la validación de su documentación.`, destino:manager });

    closeModal();
    toast('Colaborador registrado', `${nombre} queda pendiente de validación de ${manager}. Todavía no puede ver su documentación.`, 'warn');
    render();
  };
}

/* Publicar un documento nuevo: entra al repositorio, a la etapa elegida (o como
   documentación adicional) y, si se indica, a la ruta de los colaboradores
   activos de las áreas de su audiencia. Los que se registren después lo
   reciben automáticamente en su ruta propuesta. */
function modalNuevoDocumento() {
  const sel = (id, opts) => `<select id="${id}" class="sel">${opts}</select>`;
  modal(modalHead('Publicar documento', 'Se suma al repositorio y, si lo indica, a la ruta de los colaboradores afectados') + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:0 16px">
        <div class="field"><span class="login__label">Título del documento</span><input id="nd-titulo" placeholder="Ej. Política de Teletrabajo"></div>
        <div class="field"><span class="login__label">Código</span><input id="nd-codigo" placeholder="Ej. POL-RH-021"></div>
        <div class="field"><span class="login__label">Etapa del programa</span>
          ${sel('nd-etapa', DB.etapas.map(e => `<option value="${e.id}">${esc(e.nombre)}</option>`).join('') + '<option value="">Documentación adicional (fuera de etapas)</option>')}</div>
        <div class="field"><span class="login__label">Categoría</span>${sel('nd-cat', DB.categorias.map(c => `<option>${c}</option>`).join(''))}</div>
        <div class="field"><span class="login__label">Criticidad</span>${sel('nd-crit', ['alta', 'media', 'baja'].map(c => `<option ${c === 'media' ? 'selected' : ''}>${c}</option>`).join(''))}</div>
        <div class="field"><span class="login__label">Minutos de lectura</span><input id="nd-min" type="number" min="1" value="6"></div>
      </div>
      <div class="field"><span class="login__label">Contenido (cada párrafo se convierte en una sección)</span>
        <textarea id="nd-texto" rows="4" style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px;font:inherit;resize:vertical"
          placeholder="Ej. El teletrabajo requiere conexión por VPN corporativa..."></textarea></div>
      <div class="field"><span class="login__label">Audiencia</span>
        <div class="row wrap" style="gap:14px;padding-top:4px" id="nd-areas">
          ${DB.areas.map(a => `<label class="row" style="gap:7px;font-size:13.2px"><input type="checkbox" data-nd-area="${a.id}" checked> ${a.nombre}</label>`).join('')}
        </div></div>
      <div class="divider"></div>
      <div class="row wrap" style="gap:18px">
        <label class="row" style="gap:8px;font-size:13.2px"><input type="checkbox" id="nd-asignar" checked> Sumarlo ya a la ruta de los colaboradores activos de esas áreas</label>
        <label class="row" style="gap:8px;font-size:13.2px"><input type="checkbox" id="nd-ia"> Generar evaluación propia con IA</label>
      </div>
      <p class="small muted mt-8" id="nd-impacto"></p>
    </div>
    <div class="modal__foot"><span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="savDoc">Publicar documento</button></div>`, 'modal--wide');
  bindModal();

  const areasSel = () => $$('[data-nd-area]:checked').map(x => x.dataset.ndArea);
  const impacto = () => { $('#nd-impacto').textContent = `Impacta a ${activos().filter(c => areasSel().includes(c.area)).length} colaborador(es) activos.`; };
  // Al elegir una etapa de área, la audiencia se ajusta a esas áreas
  $('#nd-etapa').onchange = () => {
    const et = DB.etapas.find(x => x.id === $('#nd-etapa').value);
    $$('[data-nd-area]').forEach(ch => { ch.checked = !et || et.alcance === 'general' || et.areas.includes(ch.dataset.ndArea); });
    // Un documento de Etapa 3 no se suma solo: es adicional y lo asigna el Manager
    $('#nd-asignar').checked = !et || et.alcance === 'general';
    impacto();
  };
  $$('[data-nd-area]').forEach(ch => ch.onchange = impacto);
  impacto();

  $('#savDoc').onclick = () => {
    const titulo = $('#nd-titulo').value.trim();
    const areas = areasSel();
    if (!titulo) { toast('Falta el título', 'Escriba el nombre del documento.', 'warn'); return; }
    if (!areas.length) { toast('Seleccione la audiencia', 'Al menos un área debe recibir el documento.', 'warn'); return; }
    const etapaId = $('#nd-etapa').value || null;
    const parrafos = $('#nd-texto').value.split(/\n+/).map(p => p.trim()).filter(Boolean);
    const id = nuevoId('DOC-');
    const d = {
      id, codigo: $('#nd-codigo').value.trim() || id, titulo, etapaId, categoria: $('#nd-cat').value, version: '1.0',
      criticidad: $('#nd-crit').value, estado: 'actualizado', actualizado: HOY, propietario: S.user.nombre,
      paginas: Math.max(1, Math.ceil(parrafos.join(' ').length / 1800)), minutos: Math.max(1, parseInt($('#nd-min').value) || 5),
      areas, obligatorio: true, asignados: 0, leidos: 0, indiceError: 0, intentos: 0,
      resumen: parrafos[0] || titulo,
      secciones: (parrafos.length ? parrafos : [`Contenido de ${titulo}.`]).map((p, i) => ({ t: `${i + 1}. Sección ${i + 1}`, p })),
      cambios: [{ v: '1.0', fecha: HOY, nivel: 'mayor', detalle: `Publicado por ${S.user.nombre}.` }]
    };
    S.documentos.push(d);
    const ev = $('#nd-ia').checked ? evaluacionDeDocumento(id) : null;

    let n = 0;
    if ($('#nd-asignar').checked) {
      activos().filter(c => areas.includes(c.area)).forEach(c => {
        // Si es de una etapa que el colaborador tiene en su ruta, entra a esa etapa; si no, como adicional
        const tieneEtapa = etapaId && c.documentosRuta.some(x => x.etapaId === etapaId);
        c.documentosRuta.push({ docId: id, etapaId: tieneEtapa ? etapaId : null, estado: 'pendiente', confirmado: null,
          vence: sumarDias(HOY, S.config.plazoLectura), origen: `Nuevo documento · ${fechaLarga(HOY)}` });
        if (ev) c.evaluacionesRuta.push({ evId: ev.id, estado: 'bloqueada', puntaje: null, fecha: null, intento: 0 });
        if (tieneEtapa) armarEvaluacionEtapa3(c);
        recalcularColaborador(c); n++;
      });
    }
    notificar({ tipo: 'actualizacion', titulo: 'Documento publicado',
      detalle: `${titulo} (v1.0) fue publicado por ${S.user.nombre}${n ? ` y asignado a ${n} colaborador(es)` : ''}${ev ? '. Incluye evaluación generada por IA' : ''}.`,
      destino: areas.length === DB.areas.length ? 'Toda la organización' : areas.map(areaNom).join(', ') });
    closeModal();
    toast('Documento publicado', n ? `Se sumó a la ruta de ${n} colaborador(es) activos.` : 'Quedará en la ruta propuesta de los próximos registros.', 'ia');
    render();
  };
}

let _campState = null;
const PERIODOS = { Diaria: 1, Semanal: 7, Quincenal: 15, Mensual: 30 };

function modalNuevaCampana(prefill = {}) {
  _campState = {
    nombre: prefill.nombre || '',
    docId: prefill.docId && doc(prefill.docId) ? prefill.docId : (S.documentos[0] || {}).id,
    cantidad: 6,
    periodicidad: 'Quincenal',
    areas: DB.areas.slice(0, 2).map(a => a.id),
    sugerida: !!prefill.sugerida,
    evals: [],
    activo: 0
  };
  pintarCampPaso1();
}

function pintarCampPaso1() {
  const s = _campState;
  modal(modalHead('Crear campaña de micro aprendizaje', s.sugerida ? 'Campaña sugerida por la IA a partir de una brecha detectada' : 'Refuerzo periódico sobre un documento vigente o una brecha detectada') + `
    <div class="modal__body">
      <div class="grid g-2" style="gap:0 16px">
        <div class="field"><span class="login__label">Nombre de la campaña</span>
          <input id="camp-nombre" placeholder="Ej. Información que no puede compartirse" value="${esc(s.nombre)}"></div>
        <div class="field"><span class="login__label">Documento base</span>
          <select id="camp-doc" style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">
            ${S.documentos.map(d => `<option value="${d.id}" ${d.id === s.docId ? 'selected' : ''}>${esc(d.titulo)}</option>`).join('')}
          </select></div>
        <div class="field"><span class="login__label">Cantidad de evaluaciones</span>
          <input id="camp-cant" type="number" min="1" max="20" value="${s.cantidad}"></div>
        <div class="field"><span class="login__label">Periodicidad</span>
          <select id="camp-per" style="width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px">
            ${Object.keys(PERIODOS).map(p => `<option ${p === s.periodicidad ? 'selected' : ''}>${p}</option>`).join('')}
          </select></div>
      </div>
      <p class="small muted" id="camp-resumen" style="margin:2px 0 10px"></p>
      <div class="field"><span class="login__label">Audiencia</span>
        <div class="row wrap" style="gap:14px;padding-top:4px">
          ${DB.areas.map(a => `<label class="row" style="gap:7px;font-size:13.2px"><input type="checkbox" data-area="${a.id}" ${s.areas.includes(a.id) ? 'checked' : ''}> ${esc(a.nombre)}</label>`).join('')}
        </div></div>
      <div class="divider"></div>
      <div class="ia" style="padding:14px 16px">
        <span class="ia__badge">${svg(ICO.spark)} IA</span>
        <p class="small" style="margin:9px 0 0;color:var(--text-2)">La IA generará una evaluación de 8 preguntas por cada envío, a partir de las secciones con mayor índice de error. En el siguiente paso podrá revisar, editar y deseleccionar preguntas de cada evaluación antes de activar la campaña.</p>
      </div>
    </div>
    <div class="modal__foot"><span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="campNext">Generar evaluaciones con IA →</button></div>`, 'modal--wide');
  bindModal();
  const resumen = () => {
    const cant = Math.max(1, parseInt($('#camp-cant').value) || 1);
    const per = $('#camp-per').value;
    $('#camp-resumen').textContent = `Se enviará 1 evaluación cada envío ${per.toLowerCase()} (cada ${PERIODOS[per]} día(s)) — ${cant} evaluaciones en total.`;
  };
  $('#camp-cant').oninput = resumen; $('#camp-per').onchange = resumen; resumen();
  $('#campNext').onclick = () => {
    s.nombre = $('#camp-nombre').value.trim() || 'Campaña de micro aprendizaje';
    s.docId = $('#camp-doc').value;
    s.cantidad = Math.max(1, Math.min(20, parseInt($('#camp-cant').value) || 1));
    s.periodicidad = $('#camp-per').value;
    s.areas = $$('[data-area]', $('#modal')).filter(c => c.checked).map(c => c.dataset.area);
    if (!s.areas.length) { toast('Seleccione al menos un área', 'La campaña necesita una audiencia.', 'warn'); return; }
    iniciarGeneracionCampana();
  };
}

function iniciarGeneracionCampana() {
  const s = _campState;
  const d = doc(s.docId);
  const pasos = ['Analizando el documento y las secciones con mayor error', `Redactando ${s.cantidad} evaluaciones de 8 preguntas cada una`, 'Distribuyendo las evaluaciones según la periodicidad elegida'];
  modal(modalHead('Generando la campaña con IA', `${d.titulo} · ${s.cantidad} evaluaciones · ${s.periodicidad.toLowerCase()}`) + `
    <div class="modal__body">
      <ul class="gensteps" id="genSteps">${pasos.map((p, i) => `<li data-i="${i}"><span class="dotmark"></span><span>${p}</span></li>`).join('')}</ul>
    </div>
    <div class="modal__foot"><span class="small muted">Este proceso toma unos segundos.</span><span class="spacer"></span><button class="btn btn--ghost" data-close>Cancelar</button></div>`, 'modal--wide');
  bindModal();
  let i = 0;
  const lis = $$('#genSteps li');
  const avanzar = () => {
    if (i > 0) { lis[i - 1].innerHTML = `<span class="tick">${svg('<path d="M20 6 9 17l-5-5"/>')}</span><span>${pasos[i - 1]}</span>`; lis[i - 1].classList.add('done'); }
    if (i < lis.length) { lis[i].innerHTML = `<span class="spin"></span><span>${pasos[i]}</span>`; lis[i].classList.add('on'); i++; setTimeout(avanzar, 650 + Math.random() * 350); }
    else pintarCampPaso2();
  };
  setTimeout(avanzar, 220);
}

function pintarCampPaso2() {
  const s = _campState;
  const d = doc(s.docId);
  if (!s.evals.length) {
    s.evals = Array.from({ length: s.cantidad }, (_, i) => ({
      fecha: sumarDias(HOY, PERIODOS[s.periodicidad] * i), // el primer envío sale hoy
      preguntas: generarPreguntasIA(d, 8)
    }));
  }
  s.activo = 0;
  renderCampPaso2();
}

function renderCampPaso2() {
  const s = _campState;
  const d = doc(s.docId);
  modal(modalHead(s.nombre, `${s.cantidad} evaluaciones · cada ${PERIODOS[s.periodicidad]} día(s) · ${d.titulo}`) + `
    <div class="modal__body">
      <div class="row wrap" style="gap:8px" id="camp-chips">
        ${s.evals.map((e, i) => `<button class="tag ${i === s.activo ? 'tag--ai' : ''}" data-camp-ev="${i}">Evaluación ${i + 1} · ${fechaLarga(e.fecha)} · ${e.preguntas.filter(q => q.activa).length}/8</button>`).join('')}
      </div>
      <div class="divider"></div>
      <div id="camp-out"></div>
    </div>
    <div class="modal__foot">
      <span class="small muted">Edite el texto, las opciones o desmarque preguntas de la evaluación seleccionada.</span>
      <span class="spacer"></span>
      <button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="campPub">Crear y activar campaña</button></div>`, 'modal--wide');
  bindModal();
  $$('[data-camp-ev]', $('#modal')).forEach(b => b.onclick = () => { s.activo = +b.dataset.campEv; renderCampPaso2(); });
  pintarCampPreguntas();
  $('#campPub').onclick = () => publicarCampana();
}

function pintarCampPreguntas() {
  const s = _campState;
  const out = $('#camp-out'); if (!out) return;
  const ev = s.evals[s.activo];
  const pintar = () => {
    out.innerHTML = ev.preguntas.map((q, n) => `
      <div class="qgen ${q.activa ? '' : 'qgen--off'}">
        <div class="qgen__h">
          <label class="row" style="gap:8px"><input type="checkbox" data-cq-toggle="${n}" ${q.activa ? 'checked' : ''}><span class="tag tag--ai">${n + 1}</span></label>
          <input class="qgen__edit" data-cq-text="${n}" value="${esc(q.q)}">
        </div>
        <ol type="A">${q.o.map((o, oi) => `<li class="${oi === q.r ? 'ok' : ''}"><input class="qgen__edit qgen__edit--op" data-cq-op="${n}:${oi}" value="${esc(o)}">${oi === q.r ? ' · correcta' : ''}</li>`).join('')}</ol>
      </div>`).join('');
    $$('[data-cq-toggle]', out).forEach(cb => cb.onchange = () => { ev.preguntas[+cb.dataset.cqToggle].activa = cb.checked; renderCampPaso2(); });
    $$('[data-cq-text]', out).forEach(inp => inp.oninput = () => { ev.preguntas[+inp.dataset.cqText].q = inp.value; });
    $$('[data-cq-op]', out).forEach(inp => inp.oninput = () => { const [n, oi] = inp.dataset.cqOp.split(':').map(Number); ev.preguntas[n].o[oi] = inp.value; });
  };
  pintar();
}

function publicarCampana() {
  const s = _campState;
  const vacias = s.evals.some(e => !e.preguntas.some(q => q.activa));
  if (vacias) { toast('Revise las evaluaciones', 'Cada evaluación necesita al menos una pregunta activa.', 'warn'); return; }
  const audiencia = s.areas.length === DB.areas.length ? 'Toda la organización' : s.areas.map(id => areaNom(id)).join(', ');
  const alcance = activos().filter(c => s.areas.includes(c.area)).length;
  S.campanas.unshift({
    id: nuevoId('MA-'), nombre: s.nombre, enfoque: s.sugerida ? 'Refuerzo de brecha' : 'Campaña manual',
    docId: s.docId, periodicidad: s.periodicidad, audiencia, areas: [...s.areas], alcance, respuesta: 0, acierto: 0,
    estado: 'activa', proxima: s.evals[1] ? s.evals[1].fecha : s.evals[0].fecha, cantidadEvaluaciones: s.cantidad,
    evaluaciones: s.evals.map((e, i) => ({ n: i + 1, fecha: e.fecha, preguntas: e.preguntas.filter(q => q.activa).map(({ activa, ...q }) => q) }))
  });
  recalcularTodos();
  closeModal();
  toast('Campaña activada', `La primera evaluación sale hoy a ${alcance} colaborador(es) activos; luego una cada ${PERIODOS[s.periodicidad]} día(s).`, 'ia');
  render();
}

/* El Manager suma documentos a la Etapa 3 de un colaborador. Quedan dentro de
   la etapa (con su plazo) y la evaluación de la Etapa 3 se vuelve a armar. Si
   esa evaluación ya estaba aprobada, cada documento nuevo trae una evaluación
   propia, para que también se verifique su comprensión. */
function confirmarAsignacion() {
  const c = S.colaboradores.find(x => x.id === S.asignarCol);
  const docs = $$('[data-asig]:checked:not(:disabled)').map(x => x.dataset.asig);
  if (!c || !docs.length) { toast('Faltan datos', 'Seleccione al menos un documento de la Etapa 3.', 'warn'); return; }
  const plazo = Math.max(1, parseInt($('#asig-plazo').value) || S.config.plazoEspecifica);
  const me3 = c.evaluacionesRuta.find(e => e.evId === 'EV-ETP3-' + c.id);
  const yaAprobada = me3 && me3.estado === 'aprobada';
  docs.forEach(docId => {
    const d = doc(docId);
    if (!d || !esEtapaArea(d) || !d.areas.includes(c.area) || c.documentosRuta.some(x => x.docId === docId)) return;
    c.documentosRuta.push({ docId, etapaId: d.etapaId, estado: 'pendiente', confirmado: null, vence: sumarDias(HOY, plazo), origen: `${origenParaDoc(docId)} · sumado por ${S.user.nombre}` });
    if (yaAprobada) {
      const ev = evaluacionDeDocumento(docId);
      if (!c.evaluacionesRuta.some(e => e.evId === ev.id)) c.evaluacionesRuta.push({ evId: ev.id, estado: 'bloqueada', puntaje: null, fecha: null, intento: 0 });
    }
  });
  armarEvaluacionEtapa3(c);
  recalcularColaborador(c);
  notificar({ tipo: 'recordatorio', titulo: 'Documentación de Etapa 3 asignada',
    detalle: `${S.user.nombre} sumó ${docs.map(id => doc(id).titulo).join(', ')} a la Etapa 3 de ${c.nombre}. Plazo: ${plazo} día(s).`,
    destino: c.nombre });
  toast('Documentación asignada', `${docs.length} documento(s) sumados a la Etapa 3 de ${c.nombre}.`, 'ia');
  render();
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
    const hit = DB.chatbotKB.find(k => doc(k.f) && k.k.some(w => q.includes(w)));
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
  const propias = notifsVisibles();
  const lista = propias.length || esCero() || S.user.rol !== 'colaborador'
    ? propias.slice(0, 8).map(n => ({ t:n.titulo, d:n.detalle, h:n.fecha }))
    : DB.avisosColaborador.map(a => ({ t:a.t, d:a.d, h:a.h }));
  $('.dot').style.display = lista.length ? '' : 'none';
  $('#popList').innerHTML = lista.map(n => `
    <div class="pop__i">
      <span class="feed__i brand">${svg(ICO.bell)}</span>
      <div style="min-width:0"><b>${esc(n.t)}</b><p>${esc(n.d)}</p><small>${esc(n.h)}</small></div>
    </div>`).join('') || '<div class="pop__i"><div><p>Sin notificaciones por ahora.</p></div></div>';
}

/* ------------------------------------------------------------
   22. Arranque: retoma el modo y los datos guardados en este navegador
------------------------------------------------------------ */
let modoGuardado = 'demo';
try { modoGuardado = localStorage.getItem(`${STORE}.modo`) === 'cero' ? 'cero' : 'demo'; } catch (e) { /* sin almacenamiento */ }
cargarModo(modoGuardado);
pintarLogin();
$('#modeChip').onclick = () => modalSimulacion();
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


