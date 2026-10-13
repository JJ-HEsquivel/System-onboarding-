/* ============================================================
   Jalasoft · Plataforma de Inducción y Micro aprendizaje
   data.js — Datos simulados (seed) de la demostración
   Quality Control Processes & General Services
   ============================================================ */

const DB = (() => {

  /* ---------- Catálogos ---------- */

  const areas = [
    { id: 'ENG', nombre: 'Engineering' },
    { id: 'QA', nombre: 'Quality Control' },
    { id: 'PMO', nombre: 'Project Management' },
    { id: 'HR', nombre: 'People & Culture' },
    { id: 'FIN', nombre: 'Finance' },
    { id: 'IT', nombre: 'IT & Infrastructure' }
  ];

  const categorias = [
    'Seguridad de la Información',
    'Gestión de Activos y TI',
    'Datos y Privacidad',
    'Ingeniería',
    'Calidad',
    'Gestión de Proyectos',
    'Personas',
    'Compras y Activos Fijos',
    'Finanzas',
    'Infraestructura'
  ];

  /* ---------- Etapas del programa de inducción ----------
     Estructura real tomada del programa "Bienvenido al Programa de
     Inducción y Lectura de Políticas Corporativas": el colaborador
     avanza por etapas; cada etapa agrupa varios documentos de lectura
     obligatoria y se cierra con UNA sola evaluación que cubre todos
     los documentos de esa etapa (no una evaluación por documento).
     alcance 'general' = aplica a todas las áreas.
     alcance 'area'    = solo a las áreas listadas en `areas`. */
  const etapas = [
    { id: 'ETP-1',     nombre: 'Etapa 1 · Políticas Fundamentales',            orden: 1, plazoDiasHabiles: 5, alcance: 'general', areas: null },
    { id: 'ETP-2',     nombre: 'Etapa 2 · Políticas Fundamentales',            orden: 2, plazoDiasHabiles: 5, alcance: 'general', areas: null },
    // Etapa 3: una por área. Cada área tiene su propio conjunto de documentos;
    // el Admin envía por defecto 2 (porDefecto) y el Manager, al validar, puede
    // quitar esos o sumar los demás documentos de la Etapa 3 de esa área.
    { id: 'ETP-3-ENG', nombre: 'Etapa 3 · Documentación específica: Engineering',         orden: 3, plazoDiasHabiles: 5, alcance: 'area', areas: ['ENG'] },
    { id: 'ETP-3-QA',  nombre: 'Etapa 3 · Documentación específica: Quality Control',     orden: 3, plazoDiasHabiles: 5, alcance: 'area', areas: ['QA'] },
    { id: 'ETP-3-PMO', nombre: 'Etapa 3 · Documentación específica: Project Management',  orden: 3, plazoDiasHabiles: 5, alcance: 'area', areas: ['PMO'] },
    { id: 'ETP-3-HR',  nombre: 'Etapa 3 · Documentación específica: People & Culture',    orden: 3, plazoDiasHabiles: 5, alcance: 'area', areas: ['HR'] },
    { id: 'ETP-3-FIN', nombre: 'Etapa 3 · Documentación específica: Finance',             orden: 3, plazoDiasHabiles: 5, alcance: 'area', areas: ['FIN'] },
    { id: 'ETP-3-IT',  nombre: 'Etapa 3 · Documentación específica: IT & Infrastructure', orden: 3, plazoDiasHabiles: 5, alcance: 'area', areas: ['IT'] }
  ];

  const TODAS_AREAS = ['ENG', 'QA', 'PMO', 'HR', 'FIN', 'IT'];

  /* ---------- Documentos de la Etapa 3 (específicos de cada área) ----------
     Engineering 4 · Quality Control 5 · Project Management 3 · People & Culture 4
     · Finance 6 · IT & Infrastructure 4. En cada área, porDefecto = los 2 que el
     Admin propone al registrar; el resto lo suma (o no) el Manager al validar.
     `preguntas` alimenta la evaluación de Etapa 3, que se arma por colaborador
     solo con los documentos que efectivamente le asignaron. */
  const d3 = (o) => ({
    id: o.id, codigo: o.codigo, titulo: o.titulo, etapaId: 'ETP-3-' + o.area, categoria: o.cat, version: '1.0',
    criticidad: o.crit, estado: 'vigente', actualizado: '2026-08-01', propietario: o.prop, paginas: o.pag, minutos: o.min,
    areas: [o.area], obligatorio: true, porDefecto: !!o.def,
    asignados: o.def ? 40 : 12, leidos: o.def ? 31 : 8, indiceError: o.err || 20, intentos: o.def ? 46 : 14,
    resumen: o.res,
    secciones: o.s.map(([t, p], i) => ({ t: `${i + 1}. ${t}`, p })),
    preguntas: o.q.map(([q, op, r, exp]) => ({ q, o: op, r, exp, docId: o.id })),
    cambios: [{ v: '1.0', fecha: '2026-08-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
  });

  const docsEtapa3 = [
    /* ---- Engineering (4) ---- */
    d3({ id: 'DOC-013', codigo: 'POL-ING-013', titulo: 'Desarrollo Seguro - Política', area: 'ENG', cat: 'Ingeniería', crit: 'alta', pag: 2, min: 6, def: true, err: 22,
      prop: 'Enterprise Information Security', res: 'Prácticas mínimas de seguridad que debe seguir el equipo de Ingeniería al diseñar, construir y desplegar software.',
      s: [['Principios de diseño', 'El software se diseña bajo el principio de mínimo privilegio y validando toda entrada de datos proveniente del usuario o de sistemas externos.'],
          ['Gestión de dependencias', 'Las librerías de terceros se revisan por vulnerabilidades conocidas antes de incorporarse, y se mantienen actualizadas conforme al calendario de parches.']],
      q: [['¿Bajo qué principio debe diseñarse el software según Desarrollo Seguro?', ['Máximo privilegio para simplificar el desarrollo', 'Mínimo privilegio, validando toda entrada de datos', 'Sin restricciones de acceso en ambientes de prueba', 'Confiar en la validación del cliente'], 1, 'Desarrollo Seguro exige diseñar bajo el principio de mínimo privilegio, validando toda entrada de datos.'],
          ['¿Qué debe hacerse con las librerías de terceros antes de incorporarlas a un proyecto?', ['Nada, se agregan directamente', 'Revisarlas por vulnerabilidades conocidas', 'Solo revisarlas si el cliente lo pide', 'Revisarlas una vez al año'], 1, 'Las dependencias de terceros se revisan por vulnerabilidades antes de incorporarse.']] }),
    d3({ id: 'DOC-014', codigo: 'POL-ING-014', titulo: 'Customer Engineering Confidential Information - Policy', area: 'ENG', cat: 'Ingeniería', crit: 'alta', pag: 3, min: 8, def: true, err: 29,
      prop: 'Engineering', res: 'Cómo tratar la información confidencial de clientes a la que accede el equipo de Ingeniería: código, arquitectura, datos de producción y comunicaciones del proyecto.',
      s: [['Alcance de la confidencialidad', 'La información confidencial de un cliente no puede mencionarse, mostrarse ni divulgarse fuera del equipo del proyecto sin autorización escrita.'],
          ['Publicaciones y redes sociales', 'No se publican capturas, nombres de proyecto ni detalles técnicos de un cliente en redes sociales o portafolios personales sin autorización.']],
      q: [['¿Puede publicar una captura del código de un cliente en su portafolio personal?', ['Sí, es su trabajo', 'No, sin autorización escrita del cliente', 'Sí, si borra el logo del cliente', 'Solo si ya finalizó el proyecto'], 1, 'Toda divulgación de detalles del proyecto de un cliente requiere autorización escrita.'],
          ['¿Hasta cuándo se mantiene la confidencialidad de la información de un cliente?', ['Solo mientras dura el proyecto', 'De forma indefinida salvo autorización escrita', 'Un mes después del cierre', 'No aplica si ya no está en el proyecto'], 1, 'La confidencialidad se mantiene más allá del proyecto, salvo autorización escrita.']] }),
    d3({ id: 'DOC-017', codigo: 'PRO-ING-017', titulo: 'Gestión de Código Fuente y Repositorios - Procedimiento', area: 'ENG', cat: 'Ingeniería', crit: 'media', pag: 3, min: 7,
      prop: 'Engineering', res: 'Reglas para crear repositorios, proteger ramas principales y revisar código antes de integrarlo.',
      s: [['Ramas protegidas', 'La rama principal está protegida: todo cambio entra por pull request con al menos una revisión aprobada.'],
          ['Secretos en el código', 'Nunca se suben credenciales, llaves ni tokens al repositorio; se usan las bóvedas de secretos corporativas.']],
      q: [['¿Cómo se integra un cambio a la rama principal?', ['Con un push directo', 'Por pull request con al menos una revisión aprobada', 'Enviando el archivo por correo', 'Solo el líder puede subir cambios sin revisión'], 1, 'La rama principal solo recibe cambios por pull request revisado.'],
          ['¿Dónde deben guardarse los tokens y credenciales de un proyecto?', ['En el repositorio, en un archivo de configuración', 'En la bóveda de secretos corporativa', 'En un documento compartido', 'En el README'], 1, 'Los secretos nunca se suben al repositorio; se guardan en la bóveda corporativa.']] }),
    d3({ id: 'DOC-018', codigo: 'PRO-ING-018', titulo: 'Ambientes y Despliegues a Producción - Procedimiento', area: 'ENG', cat: 'Ingeniería', crit: 'alta', pag: 4, min: 9,
      prop: 'Engineering', res: 'Cómo se promueven los cambios entre ambientes y qué aprobaciones se necesitan para desplegar en producción.',
      s: [['Promoción entre ambientes', 'Todo cambio pasa por desarrollo, pruebas y preproducción antes de llegar a producción.'],
          ['Ventanas de despliegue', 'Los despliegues a producción se hacen en ventanas acordadas con el cliente y con un plan de reversión documentado.']],
      q: [['¿Qué debe existir antes de un despliegue a producción?', ['Nada, si el cambio es pequeño', 'Un plan de reversión documentado y la ventana acordada', 'Solo la aprobación verbal del equipo', 'Un correo al cliente después del despliegue'], 1, 'Todo despliegue requiere ventana acordada y plan de reversión.'],
          ['¿Por qué ambientes pasa un cambio antes de producción?', ['Directo a producción', 'Desarrollo, pruebas y preproducción', 'Solo pruebas', 'Solo preproducción'], 1, 'La promoción estándar es desarrollo → pruebas → preproducción → producción.']] }),

    /* ---- Quality Control (5) ---- */
    d3({ id: 'DOC-019', codigo: 'PRO-QA-019', titulo: 'Control de Calidad de Entregables - Procedimiento', area: 'QA', cat: 'Calidad', crit: 'alta', pag: 4, min: 9, def: true, err: 27,
      prop: 'Quality Control Processes', res: 'Criterios y pasos para verificar un entregable antes de enviarlo al cliente.',
      s: [['Criterios de aceptación', 'Todo entregable se verifica contra los criterios de aceptación acordados antes de enviarse al cliente.'],
          ['Registro de la verificación', 'La verificación se registra con el resultado, la fecha y quién la realizó, como evidencia de calidad.']],
      q: [['¿Contra qué se verifica un entregable antes de enviarlo?', ['Contra la opinión del desarrollador', 'Contra los criterios de aceptación acordados', 'Contra el entregable anterior', 'No requiere verificación'], 1, 'Los entregables se verifican contra los criterios de aceptación acordados.'],
          ['¿Qué debe quedar registrado de la verificación?', ['Nada', 'Resultado, fecha y responsable', 'Solo el resultado si es negativo', 'Solo la fecha'], 1, 'La verificación se registra con resultado, fecha y responsable como evidencia.']] }),
    d3({ id: 'DOC-020', codigo: 'PRO-QA-020', titulo: 'Gestión de Defectos - Procedimiento', area: 'QA', cat: 'Calidad', crit: 'media', pag: 3, min: 7, def: true,
      prop: 'Quality Control Processes', res: 'Cómo reportar, clasificar y dar seguimiento a los defectos encontrados durante las pruebas.',
      s: [['Reporte de defectos', 'Cada defecto se registra con pasos para reproducirlo, resultado esperado, resultado obtenido y evidencia.'],
          ['Severidad', 'La severidad se asigna según el impacto en el usuario; los defectos críticos se escalan el mismo día.']],
      q: [['¿Qué debe incluir el reporte de un defecto?', ['Solo un título', 'Pasos para reproducirlo, resultado esperado, obtenido y evidencia', 'El nombre del desarrollador culpable', 'Una captura sin descripción'], 1, 'Un buen reporte permite reproducir el defecto y comparar lo esperado con lo obtenido.'],
          ['¿Cuándo se escala un defecto crítico?', ['Al final del sprint', 'El mismo día', 'En la retrospectiva', 'Nunca'], 1, 'Los defectos críticos se escalan el mismo día en que se detectan.']] }),
    d3({ id: 'DOC-021', codigo: 'GUI-QA-021', titulo: 'Plan de Pruebas - Guía', area: 'QA', cat: 'Calidad', crit: 'media', pag: 3, min: 6,
      prop: 'Quality Control Processes', res: 'Estructura mínima de un plan de pruebas y cuándo debe actualizarse.',
      s: [['Contenido mínimo', 'El plan de pruebas define alcance, tipos de prueba, ambientes, datos y criterios de salida.'],
          ['Actualización', 'El plan se actualiza cada vez que cambia el alcance funcional del proyecto.']],
      q: [['¿Qué define un plan de pruebas?', ['Solo las fechas', 'Alcance, tipos de prueba, ambientes, datos y criterios de salida', 'El presupuesto del proyecto', 'Los nombres del equipo'], 1, 'El plan define alcance, tipos de prueba, ambientes, datos y criterios de salida.'],
          ['¿Cuándo se actualiza el plan de pruebas?', ['Nunca', 'Cuando cambia el alcance funcional', 'Una vez al año', 'Solo al final del proyecto'], 1, 'El plan se mantiene vigente ante cambios de alcance.']] }),
    d3({ id: 'DOC-022', codigo: 'GUI-QA-022', titulo: 'Automatización de Pruebas - Lineamientos', area: 'QA', cat: 'Calidad', crit: 'baja', pag: 4, min: 8,
      prop: 'Quality Control Processes', res: 'Qué conviene automatizar, cómo se organizan los scripts y cómo se integran al pipeline.',
      s: [['Qué automatizar', 'Se priorizan pruebas repetitivas, de regresión y de alto riesgo; las exploratorias se mantienen manuales.'],
          ['Integración continua', 'Las pruebas automatizadas se ejecutan en el pipeline en cada integración a la rama principal.']],
      q: [['¿Qué pruebas se priorizan para automatizar?', ['Las exploratorias', 'Las repetitivas, de regresión y de alto riesgo', 'Ninguna', 'Solo las de interfaz'], 1, 'Se automatiza lo repetitivo, la regresión y lo de alto riesgo.'],
          ['¿Cuándo se ejecutan las pruebas automatizadas?', ['Manualmente cada mes', 'En el pipeline en cada integración', 'Solo antes de una auditoría', 'Cuando el cliente lo pide'], 1, 'Se integran al pipeline y corren en cada integración.']] }),
    d3({ id: 'DOC-023', codigo: 'POL-QA-023', titulo: 'Datos de Prueba y Anonimización - Política', area: 'QA', cat: 'Datos y Privacidad', crit: 'alta', pag: 2, min: 5,
      prop: 'Enterprise Information Security', res: 'Uso de datos en ambientes de prueba y obligación de anonimizar datos reales.',
      s: [['Datos reales', 'No se usan datos personales reales en pruebas; si es inevitable, se anonimizan antes de copiarlos.'],
          ['Eliminación', 'Los datos de prueba se eliminan al cerrar el ciclo de pruebas.']],
      q: [['¿Se pueden usar datos personales reales en pruebas?', ['Sí, siempre', 'No; si es inevitable, se anonimizan antes', 'Sí, si el ambiente es interno', 'Solo los fines de semana'], 1, 'Los datos personales reales se anonimizan antes de usarse en pruebas.'],
          ['¿Qué se hace con los datos de prueba al cerrar el ciclo?', ['Se conservan indefinidamente', 'Se eliminan', 'Se envían al cliente', 'Se publican'], 1, 'Los datos de prueba se eliminan al cerrar el ciclo.']] }),

    /* ---- Project Management (3) ---- */
    d3({ id: 'DOC-024', codigo: 'MAN-PMO-024', titulo: 'Metodología de Gestión de Proyectos - Manual', area: 'PMO', cat: 'Gestión de Proyectos', crit: 'media', pag: 6, min: 12, def: true,
      prop: 'Project Management Office', res: 'Fases, ceremonias y artefactos obligatorios de todo proyecto.',
      s: [['Fases', 'Todo proyecto pasa por inicio, planificación, ejecución, control y cierre.'],
          ['Artefactos', 'El acta de inicio, el cronograma y el registro de riesgos son obligatorios desde la planificación.']],
      q: [['¿Qué artefactos son obligatorios desde la planificación?', ['Ninguno', 'Acta de inicio, cronograma y registro de riesgos', 'Solo el presupuesto', 'Solo el organigrama'], 1, 'Acta de inicio, cronograma y registro de riesgos son obligatorios.'],
          ['¿Cuál es la última fase de un proyecto?', ['Ejecución', 'Cierre', 'Control', 'Planificación'], 1, 'La metodología termina con la fase de cierre.']] }),
    d3({ id: 'DOC-025', codigo: 'PRO-PMO-025', titulo: 'Gestión de Riesgos de Proyecto - Procedimiento', area: 'PMO', cat: 'Gestión de Proyectos', crit: 'alta', pag: 3, min: 7, def: true,
      prop: 'Project Management Office', res: 'Cómo identificar, valorar y dar seguimiento a los riesgos de un proyecto.',
      s: [['Identificación', 'Los riesgos se identifican desde el inicio y se registran con probabilidad, impacto y responsable.'],
          ['Seguimiento', 'El registro de riesgos se revisa en cada reunión de seguimiento con el cliente.']],
      q: [['¿Con qué datos se registra un riesgo?', ['Solo el nombre', 'Probabilidad, impacto y responsable', 'Solo la fecha', 'El costo total del proyecto'], 1, 'Cada riesgo se registra con probabilidad, impacto y responsable.'],
          ['¿Cada cuánto se revisa el registro de riesgos?', ['Nunca', 'En cada reunión de seguimiento', 'Al cerrar el proyecto', 'Una vez al año'], 1, 'Se revisa en cada reunión de seguimiento.']] }),
    d3({ id: 'DOC-026', codigo: 'GUI-PMO-026', titulo: 'Comunicación con Clientes - Guía', area: 'PMO', cat: 'Gestión de Proyectos', crit: 'media', pag: 2, min: 5,
      prop: 'Project Management Office', res: 'Canales, frecuencia y registro de la comunicación formal con el cliente.',
      s: [['Canales formales', 'Los acuerdos con el cliente se confirman por escrito en los canales corporativos.'],
          ['Minutas', 'Cada reunión con el cliente genera una minuta con acuerdos, responsables y fechas.']],
      q: [['¿Cómo se confirma un acuerdo con el cliente?', ['De palabra', 'Por escrito en canales corporativos', 'Por mensaje personal', 'No es necesario confirmarlo'], 1, 'Los acuerdos se confirman por escrito en canales corporativos.'],
          ['¿Qué genera cada reunión con el cliente?', ['Nada', 'Una minuta con acuerdos, responsables y fechas', 'Una factura', 'Un nuevo contrato'], 1, 'Toda reunión deja minuta con acuerdos, responsables y fechas.']] }),

    /* ---- People & Culture (4) ---- */
    d3({ id: 'DOC-027', codigo: 'REG-HR-027', titulo: 'Reglamento Interno de Trabajo', area: 'HR', cat: 'Personas', crit: 'alta', pag: 8, min: 15, def: true,
      prop: 'People & Culture', res: 'Derechos, obligaciones, jornada y régimen disciplinario de los colaboradores.',
      s: [['Jornada laboral', 'La jornada, los descansos y el registro de asistencia se rigen por lo establecido en este reglamento.'],
          ['Régimen disciplinario', 'Las faltas se clasifican en leves, graves y muy graves, con un procedimiento de descargo para cada caso.']],
      q: [['¿Cómo se clasifican las faltas en el reglamento?', ['No se clasifican', 'Leves, graves y muy graves', 'Solo graves', 'Por área'], 1, 'Las faltas se clasifican en leves, graves y muy graves.'],
          ['¿Qué garantiza el procedimiento disciplinario?', ['Nada', 'Un descargo para el colaborador', 'Un despido inmediato', 'Una multa automática'], 1, 'Cada caso incluye un procedimiento de descargo.']] }),
    d3({ id: 'DOC-028', codigo: 'POL-HR-028', titulo: 'Confidencialidad de Datos del Personal - Política', area: 'HR', cat: 'Datos y Privacidad', crit: 'alta', pag: 2, min: 5, def: true,
      prop: 'People & Culture', res: 'Cómo se protege la información personal, salarial y médica de los colaboradores.',
      s: [['Acceso restringido', 'Solo el personal autorizado de People & Culture accede a legajos, salarios e información médica.'],
          ['Compartir información', 'La información del personal no se comparte con terceros ni con otras áreas sin base legal o consentimiento.']],
      q: [['¿Quién accede a salarios e información médica?', ['Cualquier manager', 'Solo personal autorizado de People & Culture', 'Todo el equipo', 'El cliente'], 1, 'El acceso está restringido al personal autorizado de People & Culture.'],
          ['¿Se puede compartir el legajo de un colaborador con otra área?', ['Sí, siempre', 'No, sin base legal o consentimiento', 'Sí, si lo pide un manager', 'Solo por correo'], 1, 'Se requiere base legal o consentimiento.']] }),
    d3({ id: 'DOC-029', codigo: 'PRO-HR-029', titulo: 'Reclutamiento y Selección - Procedimiento', area: 'HR', cat: 'Personas', crit: 'media', pag: 4, min: 8,
      prop: 'People & Culture', res: 'Etapas del proceso de selección y criterios para evitar sesgos.',
      s: [['Etapas', 'El proceso incluye requisición aprobada, publicación, entrevistas estructuradas y oferta formal.'],
          ['Criterios objetivos', 'Las decisiones se basan en criterios definidos para el puesto, evitando sesgos por género, edad u origen.']],
      q: [['¿Con qué se inicia un proceso de selección?', ['Con la oferta', 'Con una requisición aprobada', 'Con la entrevista final', 'Con el contrato'], 1, 'Todo proceso parte de una requisición aprobada.'],
          ['¿En qué se basan las decisiones de selección?', ['En la afinidad personal', 'En criterios definidos para el puesto', 'En la edad', 'En recomendaciones informales'], 1, 'Se usan criterios objetivos definidos para el puesto.']] }),
    d3({ id: 'DOC-030', codigo: 'PRO-HR-030', titulo: 'Onboarding y Offboarding - Procedimiento', area: 'HR', cat: 'Personas', crit: 'media', pag: 3, min: 6,
      prop: 'People & Culture', res: 'Pasos para la incorporación y la salida de colaboradores, incluidos accesos y activos.',
      s: [['Incorporación', 'El ingreso incluye alta de accesos, entrega de activos y asignación de la ruta de inducción.'],
          ['Salida', 'En la salida se revocan los accesos el último día y se recuperan todos los activos asignados.']],
      q: [['¿Cuándo se revocan los accesos de quien deja la empresa?', ['Un mes después', 'El último día', 'Nunca', 'Cuando lo pida el cliente'], 1, 'Los accesos se revocan el último día.'],
          ['¿Qué incluye la incorporación?', ['Solo el contrato', 'Accesos, activos y ruta de inducción', 'Solo la tarjeta de ingreso', 'Nada'], 1, 'El ingreso incluye accesos, activos y la ruta de inducción.']] }),

    /* ---- Finance (6) ---- */
    d3({ id: 'DOC-015', codigo: 'MAN-ADM-015', titulo: 'Gestión de Activos Fijos - Manual', area: 'FIN', cat: 'Compras y Activos Fijos', crit: 'media', pag: 15, min: 32, def: true, err: 24,
      prop: 'Procurement and Asset Control', res: 'Procedimiento para el alta, transferencia, mantenimiento y baja de activos fijos, incluyendo responsabilidades del custodio del activo.',
      s: [['Alta y custodia', 'Todo activo fijo se registra a nombre de un custodio responsable, quien debe reportar cualquier daño, pérdida o cambio de ubicación.'],
          ['Baja de activos', 'La baja de un activo requiere el formulario correspondiente y la aprobación del área de Procurement and Asset Control.']],
      q: [['¿Quién es responsable de reportar daños o pérdida de un activo fijo asignado?', ['Procurement, sin intervención del colaborador', 'El custodio del activo', 'Nadie, se detecta en el inventario', 'Solo el manager'], 1, 'El custodio debe reportar daños, pérdidas o cambios de ubicación.'],
          ['¿Qué se necesita para dar de baja un activo fijo?', ['Dejar de usarlo', 'El formulario y la aprobación de Procurement and Asset Control', 'Una llamada a TI', 'Ningún trámite'], 1, 'La baja requiere formulario y aprobación formal.']] }),
    d3({ id: 'DOC-016', codigo: 'MAN-ADM-016', titulo: 'Compra de bienes y servicios - Manual (ESP-ENG)', area: 'FIN', cat: 'Compras y Activos Fijos', crit: 'media', pag: 22, min: 45, def: true, err: 26,
      prop: 'Procurement and Asset Control', res: 'Procedimiento y niveles de aprobación requeridos para solicitar la compra de bienes o la contratación de servicios.',
      s: [['Solicitud de compra', 'Toda compra se inicia con una solicitud formal que indica el bien o servicio, el monto estimado y la justificación de negocio.'],
          ['Niveles de aprobación', 'El monto de la compra determina cuántos niveles de aprobación se requieren antes de emitir la orden de compra.']],
      q: [['¿Con qué debe iniciarse toda solicitud de compra?', ['Con la orden de compra', 'Con una solicitud formal con bien, monto y justificación', 'Con la entrega del proveedor', 'No se requiere si el monto es bajo'], 1, 'Toda compra inicia con una solicitud formal justificada.'],
          ['¿Qué determina cuántos niveles de aprobación necesita una compra?', ['El proveedor', 'El monto de la compra', 'El día de la semana', 'El área solicitante'], 1, 'Los niveles de aprobación dependen del monto.']] }),
    d3({ id: 'DOC-031', codigo: 'PRO-FIN-031', titulo: 'Rendición de Gastos y Viáticos - Procedimiento', area: 'FIN', cat: 'Finanzas', crit: 'media', pag: 3, min: 6,
      prop: 'Finance', res: 'Plazos y comprobantes requeridos para rendir gastos de viaje y viáticos.',
      s: [['Plazo', 'Los gastos se rinden dentro de los 5 días hábiles posteriores al regreso del viaje.'],
          ['Comprobantes', 'Cada gasto debe respaldarse con factura o comprobante válido a nombre de la empresa.']],
      q: [['¿En qué plazo se rinden los gastos de viaje?', ['Cuando se pueda', 'Dentro de 5 días hábiles del regreso', 'Al final del año', 'Antes del viaje'], 1, 'El plazo es de 5 días hábiles posteriores al regreso.'],
          ['¿Qué respalda cada gasto rendido?', ['Una explicación verbal', 'Factura o comprobante válido a nombre de la empresa', 'Una foto del lugar', 'Nada'], 1, 'Cada gasto se respalda con comprobante válido.']] }),
    d3({ id: 'DOC-032', codigo: 'PRO-FIN-032', titulo: 'Facturación y Cobranzas - Procedimiento', area: 'FIN', cat: 'Finanzas', crit: 'media', pag: 4, min: 8,
      prop: 'Finance', res: 'Emisión de facturas a clientes y seguimiento de cobros vencidos.',
      s: [['Emisión', 'Las facturas se emiten solo contra hitos aceptados por el cliente y registrados en el sistema.'],
          ['Cobros vencidos', 'Los cobros vencidos se gestionan a los 15 días con aviso al responsable de la cuenta.']],
      q: [['¿Contra qué se emite una factura al cliente?', ['Contra una estimación', 'Contra hitos aceptados y registrados', 'Contra el presupuesto anual', 'Cuando el equipo lo decide'], 1, 'Solo se factura contra hitos aceptados y registrados.'],
          ['¿Cuándo se gestiona un cobro vencido?', ['Al año', 'A los 15 días, avisando al responsable de la cuenta', 'Nunca', 'Al día siguiente sin aviso'], 1, 'A los 15 días se gestiona con aviso al responsable.']] }),
    d3({ id: 'DOC-033', codigo: 'POL-FIN-033', titulo: 'Control Presupuestario - Política', area: 'FIN', cat: 'Finanzas', crit: 'alta', pag: 3, min: 6,
      prop: 'Finance', res: 'Cómo se aprueba, ejecuta y controla el presupuesto de cada área.',
      s: [['Aprobación', 'El presupuesto anual de cada área se aprueba antes del inicio del ejercicio.'],
          ['Desvíos', 'Todo desvío mayor al 10% requiere justificación y aprobación de Finance.']],
      q: [['¿Qué requiere un desvío presupuestario mayor al 10%?', ['Nada', 'Justificación y aprobación de Finance', 'Solo avisar al equipo', 'Reducir el personal'], 1, 'Los desvíos mayores al 10% requieren justificación y aprobación.'],
          ['¿Cuándo se aprueba el presupuesto anual?', ['Al final del año', 'Antes del inicio del ejercicio', 'Cuando se agota', 'Nunca'], 1, 'Se aprueba antes del inicio del ejercicio.']] }),
    d3({ id: 'DOC-034', codigo: 'PRO-FIN-034', titulo: 'Pagos a Proveedores - Procedimiento', area: 'FIN', cat: 'Finanzas', crit: 'media', pag: 3, min: 6,
      prop: 'Finance', res: 'Requisitos y calendario para pagar a proveedores.',
      s: [['Requisitos', 'Un pago requiere orden de compra, conformidad de recepción y factura válida.'],
          ['Calendario', 'Los pagos se procesan en los ciclos quincenales definidos por Finance.']],
      q: [['¿Qué requiere un pago a proveedor?', ['Solo la factura', 'Orden de compra, conformidad de recepción y factura', 'La aprobación verbal del área', 'Nada'], 1, 'Se requieren orden de compra, conformidad y factura.'],
          ['¿Cada cuánto se procesan los pagos?', ['Diariamente', 'En ciclos quincenales', 'Una vez al año', 'Cuando el proveedor llama'], 1, 'Los pagos se procesan en ciclos quincenales.']] }),

    /* ---- IT & Infrastructure (4) ---- */
    d3({ id: 'DOC-035', codigo: 'PRO-IT-035', titulo: 'Gestión de Accesos - Procedimiento', area: 'IT', cat: 'Infraestructura', crit: 'alta', pag: 3, min: 7, def: true,
      prop: 'IT & Infrastructure', res: 'Alta, modificación y revocación de accesos a sistemas corporativos.',
      s: [['Solicitud', 'Todo acceso se otorga con solicitud aprobada por el manager del colaborador y bajo mínimo privilegio.'],
          ['Revisión periódica', 'Los accesos privilegiados se revisan cada trimestre y se revocan los que ya no se usan.']],
      q: [['¿Bajo qué criterio se otorgan los accesos?', ['Todos los accesos para todos', 'Solicitud aprobada y mínimo privilegio', 'Según la antigüedad', 'Sin aprobación'], 1, 'Los accesos requieren aprobación y siguen el mínimo privilegio.'],
          ['¿Cada cuánto se revisan los accesos privilegiados?', ['Nunca', 'Cada trimestre', 'Cada cinco años', 'Solo ante un incidente'], 1, 'Se revisan trimestralmente.']] }),
    d3({ id: 'DOC-036', codigo: 'PRO-IT-036', titulo: 'Gestión de Incidentes de TI - Procedimiento', area: 'IT', cat: 'Infraestructura', crit: 'alta', pag: 3, min: 7, def: true,
      prop: 'IT & Infrastructure', res: 'Registro, priorización y resolución de incidentes de infraestructura.',
      s: [['Registro', 'Todo incidente se registra en la mesa de ayuda con impacto, urgencia y servicio afectado.'],
          ['Prioridad crítica', 'Los incidentes críticos se atienden de inmediato y se informan al cliente afectado.']],
      q: [['¿Dónde se registra un incidente de TI?', ['En un chat personal', 'En la mesa de ayuda con impacto y urgencia', 'No se registra', 'En una hoja de papel'], 1, 'Todo incidente se registra en la mesa de ayuda.'],
          ['¿Cómo se atiende un incidente crítico?', ['Al día siguiente', 'De inmediato e informando al cliente', 'En la próxima ventana', 'Solo si hay tiempo'], 1, 'Se atiende de inmediato y se informa al cliente.']] }),
    d3({ id: 'DOC-037', codigo: 'POL-IT-037', titulo: 'Respaldo y Recuperación - Política', area: 'IT', cat: 'Infraestructura', crit: 'alta', pag: 2, min: 5,
      prop: 'IT & Infrastructure', res: 'Frecuencia de respaldos y pruebas de recuperación.',
      s: [['Frecuencia', 'Los sistemas críticos se respaldan diariamente y los respaldos se guardan cifrados fuera del sitio.'],
          ['Pruebas', 'La recuperación se prueba al menos cada seis meses.']],
      q: [['¿Con qué frecuencia se respaldan los sistemas críticos?', ['Mensualmente', 'Diariamente', 'Una vez al año', 'Nunca'], 1, 'Los sistemas críticos se respaldan a diario.'],
          ['¿Cada cuánto se prueba la recuperación?', ['Nunca', 'Al menos cada seis meses', 'Cada diez años', 'Solo tras un desastre'], 1, 'La recuperación se prueba al menos semestralmente.']] }),
    d3({ id: 'DOC-038', codigo: 'PRO-IT-038', titulo: 'Gestión de Cambios en Infraestructura - Procedimiento', area: 'IT', cat: 'Infraestructura', crit: 'media', pag: 3, min: 6,
      prop: 'IT & Infrastructure', res: 'Aprobación y registro de cambios en servidores, redes y servicios.',
      s: [['Aprobación', 'Todo cambio en infraestructura productiva pasa por el comité de cambios con análisis de impacto.'],
          ['Registro', 'Cada cambio queda registrado con fecha, responsable y resultado.']],
      q: [['¿Qué requiere un cambio en infraestructura productiva?', ['Nada', 'Aprobación del comité con análisis de impacto', 'Solo hacerlo de noche', 'Aviso posterior'], 1, 'Pasa por el comité de cambios con análisis de impacto.'],
          ['¿Qué se registra de cada cambio?', ['Nada', 'Fecha, responsable y resultado', 'Solo el costo', 'Solo el servidor'], 1, 'Se registra fecha, responsable y resultado.']] })
  ];

  /* ---------- Documentos ---------- */
  // criticidad: alta | media | baja
  // estado: vigente | actualizado | borrador
  // etapaId: a qué etapa del programa de inducción pertenece
  const documentos = [
    {
      id: 'DOC-001', codigo: 'POL-TI-001', titulo: 'BYOD Computadores - Política (ESP-ENG)',
      etapaId: 'ETP-1', categoria: 'Gestión de Activos y TI', version: '1.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-07-01', propietario: 'Enterprise Information Security', paginas: 3, minutos: 8,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 231, indiceError: 22, intentos: 260,
      resumen: 'Condiciones para usar equipos personales (Bring Your Own Device) en actividades laborales, cifrado mínimo requerido y responsabilidades del colaborador sobre el equipo.',
      secciones: [
        { t: '1. Alcance', p: 'Aplica a todo colaborador que utilice una computadora personal para conectarse a sistemas o datos de la organización.' },
        { t: '2. Requisitos mínimos', p: 'El equipo debe contar con cifrado de disco, antivirus actualizado y bloqueo automático de pantalla antes de conectarse a cualquier recurso corporativo.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-002', codigo: 'POL-TI-002', titulo: 'BYOD Tablets y dispositivos móviles - Política (ESP-ENG)',
      etapaId: 'ETP-1', categoria: 'Gestión de Activos y TI', version: '1.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-07-01', propietario: 'Enterprise Information Security', paginas: 1, minutos: 4,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 233, indiceError: 19, intentos: 255,
      resumen: 'Extiende los lineamientos de BYOD a tablets y dispositivos móviles personales usados para correo, chat o acceso a sistemas corporativos.',
      secciones: [
        { t: '1. Dispositivos cubiertos', p: 'Tablets y smartphones personales usados para correo corporativo, aplicaciones de mensajería de trabajo o MFA.' },
        { t: '2. Medidas obligatorias', p: 'PIN o biometría activados, actualización del sistema operativo al día y posibilidad de borrado remoto en caso de pérdida o robo.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-003', codigo: 'POL-TI-003', titulo: 'Control de Software y Hardware - Política (ESP-ENG)',
      etapaId: 'ETP-1', categoria: 'Gestión de Activos y TI', version: '1.0', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-07-01', propietario: 'Enterprise Information Security', paginas: 2, minutos: 6,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 227, indiceError: 24, intentos: 249,
      resumen: 'Reglas para la instalación, licenciamiento e inventario del software y hardware entregado o autorizado por la organización.',
      secciones: [
        { t: '1. Instalación de software', p: 'Solo puede instalarse software aprobado por IT; cualquier excepción requiere solicitud formal y justificación.' },
        { t: '2. Inventario de hardware', p: 'Todo equipo asignado queda registrado a nombre del colaborador y debe devolverse en las condiciones entregadas al finalizar la relación laboral.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-004', codigo: 'POL-SEG-004', titulo: 'Etiquetado de Datos e Información - Política',
      etapaId: 'ETP-1', categoria: 'Seguridad de la Información', version: '1.0', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-07-01', propietario: 'Enterprise Information Security', paginas: 4, minutos: 10,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 219, indiceError: 28, intentos: 244,
      resumen: 'Define cómo clasificar y etiquetar documentos e información según su nivel de sensibilidad, para que cualquier persona sepa cómo debe tratarlos.',
      secciones: [
        { t: '1. Niveles de clasificación', p: 'La información se clasifica en Pública, Interna, Confidencial y Restringida, y debe llevar la etiqueta visible en el encabezado del documento.' },
        { t: '2. Responsabilidad del etiquetado', p: 'Quien crea o recibe un documento es responsable de clasificarlo correctamente antes de compartirlo, incluso internamente.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-005', codigo: 'POL-OPS-005', titulo: 'Uso correcto de bienes y servicios de la organización - Política',
      etapaId: 'ETP-1', categoria: 'Gestión de Activos y TI', version: '1.0', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-07-01', propietario: 'Enterprise Information Security', paginas: 5, minutos: 12,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 221, indiceError: 20, intentos: 238,
      resumen: 'Establece el uso adecuado de los bienes, herramientas y servicios provistos por la organización para fines laborales.',
      secciones: [
        { t: '1. Uso previsto', p: 'Los bienes y servicios entregados son para uso laboral; el uso personal ocasional debe ser razonable y no interferir con el trabajo.' },
        { t: '2. Uso indebido', p: 'El uso indebido reiterado de bienes o servicios corporativos puede derivar en medidas disciplinarias.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-006', codigo: 'POL-TI-006', titulo: 'Software permitido - Política (ESP - ENG)',
      etapaId: 'ETP-1', categoria: 'Gestión de Activos y TI', version: '1.0', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-07-01', propietario: 'Enterprise Information Security', paginas: 2, minutos: 6,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 226, indiceError: 18, intentos: 240,
      resumen: 'Lista y criterios del software autorizado para uso en equipos corporativos, y el procedimiento para solicitar software no incluido en el catálogo.',
      secciones: [
        { t: '1. Catálogo autorizado', p: 'El catálogo de software permitido se publica y actualiza por IT; solo ese software puede instalarse sin aprobación adicional.' },
        { t: '2. Solicitud de excepciones', p: 'Cualquier software fuera del catálogo requiere solicitud formal con justificación de negocio y aprobación de IT.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-007', codigo: 'POL-SEG-007', titulo: 'Seguridad de la Información - Política (ESP - ENG)',
      etapaId: 'ETP-1', categoria: 'Seguridad de la Información', version: '1.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-07-01', propietario: 'Enterprise Information Security', paginas: 3, minutos: 8,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 236, indiceError: 25, intentos: 258,
      resumen: 'Principios generales de seguridad de la información: confidencialidad, integridad y disponibilidad, y el canal para reportar incidentes.',
      secciones: [
        { t: '1. Principios', p: 'Toda la información de la organización y de sus clientes debe protegerse en confidencialidad, integridad y disponibilidad.' },
        { t: '2. Reporte de incidentes', p: 'Todo incidente o sospecha de incidente se reporta al canal de seguridad dentro de las 24 horas siguientes a su detección; el reporte oportuno no es motivo de sanción.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-008', codigo: 'POL-DAT-008', titulo: 'Inteligencia Artificial - Política (ESP-ENG)',
      etapaId: 'ETP-2', categoria: 'Datos y Privacidad', version: '1.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-07-15', propietario: 'Enterprise Information Security', paginas: 3, minutos: 8,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 184, indiceError: 47, intentos: 233,
      resumen: 'Qué herramientas de IA están autorizadas, qué información no puede ingresarse en ellas y cómo debe revisarse el contenido que generan.',
      secciones: [
        { t: '1. Herramientas autorizadas', p: 'Solo pueden usarse herramientas de IA del catálogo corporativo, con cuenta corporativa; está prohibido el uso de cuentas personales para tareas laborales.' },
        { t: '2. Información que no puede compartirse', p: 'Nunca debe ingresarse código de cliente bajo NDA, datos personales, credenciales ni información clasificada como Confidencial o Restringida en una herramienta de IA.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-15', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-009', codigo: 'POL-SEG-009', titulo: 'Protección de Contraseñas - Política (ESP - ENG)',
      etapaId: 'ETP-2', categoria: 'Seguridad de la Información', version: '1.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-07-15', propietario: 'Enterprise Information Security', paginas: 1, minutos: 4,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 201, indiceError: 31, intentos: 226,
      resumen: 'Requisitos mínimos de las contraseñas corporativas, uso obligatorio del gestor de contraseñas y prohibición de compartirlas.',
      secciones: [
        { t: '1. Requisitos mínimos', p: 'Las contraseñas deben tener al menos 14 caracteres, combinar mayúsculas, minúsculas, números y símbolos, y renovarse periódicamente.' },
        { t: '2. Prohibición de compartir', p: 'Compartir credenciales está prohibido incluso de forma temporal o entre compañeros de confianza.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-15', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-010', codigo: 'POL-DAT-010', titulo: 'Protección y Privacidad de Datos e Información - Política (ESP - ENG)',
      etapaId: 'ETP-2', categoria: 'Datos y Privacidad', version: '1.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-07-15', propietario: 'Enterprise Information Security', paginas: 4, minutos: 10,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 196, indiceError: 41, intentos: 220,
      resumen: 'Principios para proteger datos personales y de clientes: minimización, base legal de tratamiento y manejo de solicitudes de titulares.',
      secciones: [
        { t: '1. Datos personales', p: 'Solo se recopilan los datos personales estrictamente necesarios para la finalidad declarada, y se conservan solo el tiempo necesario.' },
        { t: '2. Solicitudes de titulares', p: 'Toda solicitud de acceso, corrección o eliminación de datos personales se canaliza al equipo de privacidad dentro de los plazos establecidos.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-15', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-011', codigo: 'POL-SEG-011', titulo: 'Uso de internet - Política (ESP - ENG)',
      etapaId: 'ETP-2', categoria: 'Seguridad de la Información', version: '1.0', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-07-15', propietario: 'Enterprise Information Security', paginas: 2, minutos: 6,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 210, indiceError: 15, intentos: 228,
      resumen: 'Uso aceptable de la conexión a internet corporativa, sitios y descargas restringidas, y monitoreo de tráfico.',
      secciones: [
        { t: '1. Uso aceptable', p: 'La conexión corporativa es para fines laborales; el uso personal ocasional es tolerado si no compromete la seguridad ni el rendimiento de la red.' },
        { t: '2. Contenido restringido', p: 'Está prohibido acceder a contenido ilegal, descargar software no autorizado o eludir los controles de seguridad de la red.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-15', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-012', codigo: 'POL-DAT-012', titulo: 'Uso de dispositivos de almacenamiento - Política (ESP-ENG)',
      etapaId: 'ETP-2', categoria: 'Datos y Privacidad', version: '1.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-07-15', propietario: 'Technology and Transformation', paginas: 1, minutos: 4,
      areas: TODAS_AREAS, obligatorio: true, asignados: 248, leidos: 205, indiceError: 22, intentos: 224,
      resumen: 'Condiciones para el uso de USB, discos externos y otros medios de almacenamiento removibles con información corporativa.',
      secciones: [
        { t: '1. Dispositivos permitidos', p: 'Solo pueden usarse dispositivos de almacenamiento cifrados y previamente autorizados por IT para transportar información corporativa.' },
        { t: '2. Información Restringida', p: 'La información clasificada como Restringida no puede copiarse a dispositivos de almacenamiento personales bajo ninguna circunstancia.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-07-15', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    ...docsEtapa3
  ];

  /* ---------- Colaboradores ---------- */
  // estado: en_curso | completado | atrasado | por_iniciar
  const colaboradores = [
    { id: 'C-1001', nombre: 'Camila Rojas',      cargo: 'QA Engineer',            area: 'QA',  manager: 'Gabriela Rocha',  ingreso: '2026-09-07', fase: 3, progreso: 62, estado: 'en_curso',   promedio: 88, pendientes: 3, ultimaActividad: 'Hace 2 horas',  riesgo: 'bajo' },
    { id: 'C-1002', nombre: 'Diego Salazar',     cargo: 'Backend Developer',      area: 'ENG', manager: 'Iván Suárez',     ingreso: '2026-09-07', fase: 2, progreso: 41, estado: 'en_curso',   promedio: 79, pendientes: 5, ultimaActividad: 'Hace 5 horas',  riesgo: 'medio' },
    { id: 'C-1003', nombre: 'Valeria Menacho',   cargo: 'Project Manager',        area: 'PMO', manager: 'Sofía Terceros',  ingreso: '2026-08-24', fase: 4, progreso: 87, estado: 'en_curso',   promedio: 92, pendientes: 1, ultimaActividad: 'Hace 1 hora',   riesgo: 'bajo' },
    { id: 'C-1004', nombre: 'Rodrigo Ferrufino', cargo: 'Frontend Developer',     area: 'ENG', manager: 'Iván Suárez',     ingreso: '2026-08-24', fase: 2, progreso: 28, estado: 'atrasado',   promedio: 64, pendientes: 7, ultimaActividad: 'Hace 6 días',   riesgo: 'alto' },
    { id: 'C-1005', nombre: 'Alejandra Mercado', cargo: 'QA Automation',          area: 'QA',  manager: 'Gabriela Rocha',  ingreso: '2026-08-10', fase: 5, progreso: 100, estado: 'completado', promedio: 95, pendientes: 0, ultimaActividad: 'Hace 3 días',   riesgo: 'bajo' },
    { id: 'C-1006', nombre: 'Sebastián Vaca',    cargo: 'DevOps Engineer',        area: 'IT',  manager: 'Ruth Peñaranda',  ingreso: '2026-08-10', fase: 5, progreso: 100, estado: 'completado', promedio: 91, pendientes: 0, ultimaActividad: 'Hace 1 día',    riesgo: 'bajo' },
    { id: 'C-1007', nombre: 'Fernanda Loayza',   cargo: 'People Partner',         area: 'HR',  manager: 'Lorena Vargas',   ingreso: '2026-09-14', fase: 1, progreso: 12, estado: 'en_curso',   promedio: 0,  pendientes: 8, ultimaActividad: 'Hace 30 min',   riesgo: 'bajo' },
    { id: 'C-1008', nombre: 'Marco Antelo',      cargo: 'Data Engineer',          area: 'ENG', manager: 'Iván Suárez',     ingreso: '2026-09-14', fase: 1, progreso: 8,  estado: 'por_iniciar',promedio: 0,  pendientes: 9, ultimaActividad: 'Sin actividad', riesgo: 'medio' },
    { id: 'C-1009', nombre: 'Lucía Áñez',        cargo: 'Business Analyst',       area: 'PMO', manager: 'Sofía Terceros',  ingreso: '2026-07-27', fase: 5, progreso: 100, estado: 'completado', promedio: 89, pendientes: 0, ultimaActividad: 'Hace 8 días',   riesgo: 'bajo' },
    { id: 'C-1010', nombre: 'Joaquín Careaga',   cargo: 'Mobile Developer',       area: 'ENG', manager: 'Iván Suárez',     ingreso: '2026-08-31', fase: 3, progreso: 55, estado: 'en_curso',   promedio: 73, pendientes: 4, ultimaActividad: 'Hace 1 día',    riesgo: 'medio' },
    { id: 'C-1011', nombre: 'Daniela Ibáñez',    cargo: 'QA Engineer',            area: 'QA',  manager: 'Gabriela Rocha',  ingreso: '2026-08-31', fase: 4, progreso: 78, estado: 'en_curso',   promedio: 84, pendientes: 2, ultimaActividad: 'Hace 4 horas',  riesgo: 'bajo' },
    { id: 'C-1012', nombre: 'Enrique Balderrama',cargo: 'Cloud Architect',        area: 'IT',  manager: 'Ruth Peñaranda',  ingreso: '2026-08-17', fase: 4, progreso: 71, estado: 'en_curso',   promedio: 81, pendientes: 3, ultimaActividad: 'Hace 2 días',   riesgo: 'bajo' },
    { id: 'C-1013', nombre: 'Andrea Suárez',     cargo: 'Finance Analyst',        area: 'FIN', manager: 'Patricia Nogales',ingreso: '2026-08-17', fase: 2, progreso: 34, estado: 'atrasado',   promedio: 58, pendientes: 6, ultimaActividad: 'Hace 9 días',   riesgo: 'alto' },
    { id: 'C-1014', nombre: 'Pablo Michel',      cargo: 'Backend Developer',      area: 'ENG', manager: 'Iván Suárez',     ingreso: '2026-07-13', fase: 5, progreso: 100, estado: 'completado', promedio: 93, pendientes: 0, ultimaActividad: 'Hace 12 días',  riesgo: 'bajo' },
    { id: 'C-1015', nombre: 'Natalia Arce',      cargo: 'UX Designer',            area: 'ENG', manager: 'Iván Suárez',     ingreso: '2026-09-01', fase: 3, progreso: 48, estado: 'en_curso',   promedio: 77, pendientes: 4, ultimaActividad: 'Hace 3 horas',  riesgo: 'medio' },
    { id: 'C-1016', nombre: 'Gonzalo Peredo',    cargo: 'Support Engineer',       area: 'IT',  manager: 'Ruth Peñaranda',  ingreso: '2026-09-01', fase: 2, progreso: 39, estado: 'en_curso',   promedio: 70, pendientes: 5, ultimaActividad: 'Hace 1 día',    riesgo: 'medio' },
    { id: 'C-1017', nombre: 'Mariana Ledezma',   cargo: 'Scrum Master',           area: 'PMO', manager: 'Sofía Terceros',  ingreso: '2026-06-29', fase: 5, progreso: 100, estado: 'completado', promedio: 97, pendientes: 0, ultimaActividad: 'Hace 20 días',  riesgo: 'bajo' },
    { id: 'C-1018', nombre: 'Álvaro Céspedes',   cargo: 'QA Lead',                area: 'QA',  manager: 'Gabriela Rocha',  ingreso: '2026-06-29', fase: 5, progreso: 100, estado: 'completado', promedio: 90, pendientes: 0, ultimaActividad: 'Hace 15 días',  riesgo: 'bajo' },
    { id: 'C-1019', nombre: 'Paola Zambrana',    cargo: 'Recruiter',              area: 'HR',  manager: 'Lorena Vargas',   ingreso: '2026-09-07', fase: 2, progreso: 44, estado: 'en_curso',   promedio: 86, pendientes: 4, ultimaActividad: 'Hace 7 horas',  riesgo: 'bajo' },
    { id: 'C-1020', nombre: 'Hugo Villarroel',   cargo: 'Security Analyst',       area: 'IT',  manager: 'Ruth Peñaranda',  ingreso: '2026-08-03', fase: 5, progreso: 100, estado: 'completado', promedio: 96, pendientes: 0, ultimaActividad: 'Hace 6 días',   riesgo: 'bajo' },
    { id: 'C-1021', nombre: 'Carla Montaño',     cargo: 'Technical Writer',       area: 'QA',  manager: 'Gabriela Rocha',  ingreso: '2026-09-14', fase: 1, progreso: 5,  estado: 'por_iniciar',promedio: 0,  pendientes: 9, ultimaActividad: 'Sin actividad', riesgo: 'medio' },
    { id: 'C-1022', nombre: 'Ignacio Beltrán',   cargo: 'Fullstack Developer',    area: 'ENG', manager: 'Iván Suárez',     ingreso: '2026-08-24', fase: 3, progreso: 59, estado: 'en_curso',   promedio: 82, pendientes: 3, ultimaActividad: 'Hace 11 horas', riesgo: 'bajo' },
    { id: 'C-1023', nombre: 'Rosario Guzmán',    cargo: 'Accounting Assistant',   area: 'FIN', manager: 'Patricia Nogales',ingreso: '2026-07-20', fase: 5, progreso: 100, estado: 'completado', promedio: 88, pendientes: 0, ultimaActividad: 'Hace 18 días',  riesgo: 'bajo' },
    { id: 'C-1024', nombre: 'Tomás Zeballos',    cargo: 'QA Automation',          area: 'QA',  manager: 'Gabriela Rocha',  ingreso: '2026-08-10', fase: 4, progreso: 69, estado: 'atrasado',   promedio: 67, pendientes: 4, ultimaActividad: 'Hace 7 días',   riesgo: 'alto' }
  ];

  /* ---------- Fases de la ruta de inducción ---------- */
  // Tres fases: alta → inducción (leer y aprobar cada documento) → refuerzo continuo.
  const fases = [
    { n: 1, nombre: 'Registro y bienvenida',
      detalle: 'El Administrador da de alta al colaborador y le asigna un Manager, que valida su documentación. Al confirmarla se envía el correo de bienvenida y se activa su ruta.' },
    { n: 2, nombre: 'Proceso de inducción',
      detalle: 'Lectura de cada documento asignado por etapas y aprobación de su examen. La inducción se completa cuando todos los documentos están aprobados.' },
    { n: 3, nombre: 'Micro aprendizaje y actualización de documentos',
      detalle: 'Refuerzo continuo con evaluaciones cortas periódicas y relectura obligatoria cuando un documento cambia de versión, para mantener vigente lo aprendido.' }
  ];

  /* ---------- Evaluaciones ----------
     Cada documento tiene su propia evaluación: el colaborador lee, confirma la
     lectura y recién entonces rinde el examen de ESE documento. El documento
     cuenta como aprobado solo cuando aprueba su examen. Las preguntas viven en
     cada documento (`preguntas`); app.js arma una evaluación por documento. */
  const P = (q, o, r, exp) => ({ q, o, r, exp });
  const preguntasBase = {
    'DOC-001': [
      P('¿Qué medida es obligatoria antes de conectar una computadora personal (BYOD) a sistemas corporativos?', ['Ninguna, basta con tener antivirus', 'Cifrado de disco y bloqueo automático de pantalla activados', 'Solo avisar a IT por correo', 'Instalar cualquier antivirus gratuito'], 1, 'BYOD Computadores exige cifrado de disco, antivirus actualizado y bloqueo automático antes de conectarse.'),
      P('¿A quién aplica la política BYOD de computadores?', ['Solo a los managers', 'A todo colaborador que use una computadora personal para conectarse a sistemas o datos de la organización', 'Solo a Engineering', 'A nadie, es opcional'], 1, 'Aplica a todo colaborador que use su computadora personal para fines laborales.')
    ],
    'DOC-002': [
      P('¿Qué medidas exige la política para tablets y smartphones personales?', ['Ninguna', 'PIN o biometría, sistema operativo al día y borrado remoto', 'Solo una funda protectora', 'Desactivar el correo'], 1, 'Se exige PIN o biometría, actualizaciones al día y posibilidad de borrado remoto.'),
      P('¿Qué dispositivos cubre esta política?', ['Solo laptops corporativas', 'Tablets y smartphones personales usados para correo, mensajería de trabajo o MFA', 'Impresoras', 'Servidores'], 1, 'Cubre los dispositivos móviles personales usados para fines laborales.')
    ],
    'DOC-003': [
      P('¿Quién puede instalar software en un equipo corporativo?', ['Cualquier colaborador, sin restricciones', 'Solo software aprobado por IT, o con solicitud formal', 'Solo el área de Finanzas', 'Solo los managers'], 1, 'Solo se instala software aprobado por IT, salvo excepción justificada.'),
      P('¿Qué pasa con el hardware asignado al finalizar la relación laboral?', ['Se lo queda el colaborador', 'Debe devolverse en las condiciones entregadas', 'Se desecha', 'Se transfiere a un compañero sin aviso'], 1, 'Todo equipo asignado se devuelve en las condiciones entregadas.')
    ],
    'DOC-004': [
      P('¿Qué debe hacer un colaborador con un documento que clasifica como Confidencial?', ['Etiquetarlo visiblemente con su nivel de clasificación', 'No es necesario etiquetarlo si es de uso interno', 'Solo etiquetarlo si sale de la empresa', 'Etiquetarlo solo si lo pide el cliente'], 0, 'Todo documento debe llevar visible su nivel de clasificación.'),
      P('¿Cuáles son los niveles de clasificación de la información?', ['Alta y baja', 'Pública, Interna, Confidencial y Restringida', 'Secreta y no secreta', 'No existen niveles'], 1, 'La información se clasifica en Pública, Interna, Confidencial y Restringida.')
    ],
    'DOC-005': [
      P('Los bienes y servicios entregados por la organización son principalmente para:', ['Uso personal ilimitado', 'Uso laboral, con uso personal ocasional razonable', 'Reventa autorizada', 'Uso exclusivo fuera de horario'], 1, 'Son para fines laborales, con tolerancia razonable de uso personal ocasional.'),
      P('¿Qué puede ocurrir ante el uso indebido reiterado de bienes corporativos?', ['Nada', 'Medidas disciplinarias', 'Un premio', 'Solo un aviso verbal sin registro'], 1, 'El uso indebido reiterado puede derivar en medidas disciplinarias.')
    ],
    'DOC-006': [
      P('¿Qué software puede instalarse sin aprobación adicional?', ['Cualquiera, mientras sea gratuito', 'Únicamente el que está en el catálogo autorizado', 'Cualquiera si se justifica después', 'Solo el sistema operativo'], 1, 'Solo el software del catálogo autorizado por IT.'),
      P('¿Qué se necesita para usar software fuera del catálogo?', ['Nada', 'Solicitud formal con justificación de negocio y aprobación de IT', 'La recomendación de un compañero', 'Instalarlo y avisar luego'], 1, 'Las excepciones requieren solicitud formal y aprobación de IT.')
    ],
    'DOC-007': [
      P('Ante un incidente de seguridad de la información, ¿en qué plazo debe reportarse?', ['Dentro de las 24 horas siguientes a su detección', 'No es obligatorio reportarlo', 'Solo si afecta a un cliente', 'En la siguiente reunión de equipo'], 0, 'Todo incidente o sospecha se reporta dentro de las 24 horas.'),
      P('¿Qué principios protege la política de seguridad de la información?', ['Velocidad y costo', 'Confidencialidad, integridad y disponibilidad', 'Solo la confidencialidad', 'Ninguno'], 1, 'La información se protege en confidencialidad, integridad y disponibilidad.')
    ],
    'DOC-008': [
      P('¿Qué información NO puede ingresarse en una herramienta de Inteligencia Artificial?', ['Documentación pública de la empresa', 'Código de cliente bajo NDA, datos personales o información Restringida', 'Un temario interno', 'Un texto ya publicado'], 1, 'Está prohibido ingresar código bajo NDA, datos personales, credenciales o información clasificada.'),
      P('¿Puede usarse una cuenta personal de una herramienta de IA para tareas laborales?', ['Sí, si es la misma herramienta', 'No, solo cuentas corporativas del catálogo autorizado', 'Sí, fuera de horario', 'Solo si el proyecto lo permite'], 1, 'Solo herramientas del catálogo corporativo, con cuenta corporativa.')
    ],
    'DOC-009': [
      P('¿Cuál es uno de los requisitos mínimos de una contraseña corporativa?', ['6 caracteres numéricos', 'Al menos 14 caracteres combinando mayúsculas, minúsculas, números y símbolos', 'El nombre de usuario repetido', 'No tiene requisitos'], 1, 'Las contraseñas requieren al menos 14 caracteres con combinación de tipos.'),
      P('¿Se pueden compartir credenciales con un compañero de confianza?', ['Sí, temporalmente', 'No, está prohibido incluso de forma temporal', 'Sí, si es del mismo equipo', 'Solo por chat'], 1, 'Compartir credenciales está prohibido siempre.')
    ],
    'DOC-010': [
      P('¿Qué datos personales pueden recopilarse?', ['Todos los disponibles', 'Solo los estrictamente necesarios para la finalidad declarada', 'Los que pida cualquier área', 'Ninguno'], 1, 'Rige el principio de minimización: solo lo estrictamente necesario.'),
      P('¿A dónde se canaliza una solicitud de acceso o eliminación de datos personales?', ['Se ignora', 'Al equipo de privacidad, dentro de los plazos establecidos', 'Al cliente', 'Se responde informalmente'], 1, 'Toda solicitud de titulares se canaliza al equipo de privacidad.')
    ],
    'DOC-011': [
      P('El uso personal ocasional de la conexión a internet corporativa es:', ['Está totalmente prohibido', 'Tolerado si no compromete la seguridad ni el rendimiento de la red', 'Solo para managers', 'Requiere aprobación cada vez'], 1, 'Se tolera un uso personal ocasional razonable.'),
      P('¿Qué está prohibido hacer con la conexión corporativa?', ['Leer el correo', 'Eludir los controles de seguridad o descargar software no autorizado', 'Usar el navegador', 'Consultar documentación'], 1, 'Está prohibido eludir controles o descargar software no autorizado.')
    ],
    'DOC-012': [
      P('Un colaborador quiere copiar información Restringida a un USB personal. ¿Es correcto?', ['Sí, si el USB tiene contraseña', 'No, la información Restringida no puede copiarse a dispositivos personales', 'Sí, solo por esta vez', 'Depende del tamaño'], 1, 'La información Restringida nunca se copia a dispositivos personales.'),
      P('¿Qué dispositivos de almacenamiento pueden usarse con información corporativa?', ['Cualquiera', 'Solo los cifrados y autorizados por IT', 'Los que regalen en eventos', 'Ninguno, nunca'], 1, 'Solo dispositivos cifrados y previamente autorizados por IT.')
    ]
  };
  documentos.forEach(d => { if (preguntasBase[d.id]) d.preguntas = preguntasBase[d.id].map(p => ({ ...p, docId: d.id })); });

  /* Preguntas adicionales: cada documento se evalúa con 5 preguntas. */
  const preguntasExtra = {
    /* ---- Etapa 1 ---- */
    'DOC-001': [
      P('¿Qué debe tener activado el equipo personal antes de acceder a recursos corporativos?', ['Solo el wifi', 'Antivirus actualizado', 'Un fondo de pantalla corporativo', 'El modo avión'], 1, 'El antivirus actualizado es uno de los requisitos mínimos de BYOD.'),
      P('¿Quién es responsable del equipo personal usado para trabajar?', ['IT, siempre', 'El colaborador dueño del equipo', 'El cliente', 'Nadie'], 1, 'La política define responsabilidades del colaborador sobre su equipo.'),
      P('Si su computadora personal no tiene cifrado de disco, ¿puede conectarse a sistemas corporativos?', ['Sí, por poco tiempo', 'Solo los viernes', 'No, primero debe cumplir los requisitos mínimos', 'Sí, si usa VPN'], 2, 'Sin cifrado de disco no se cumple el requisito mínimo para conectarse.')
    ],
    'DOC-002': [
      P('¿Para qué sirve el borrado remoto en un dispositivo móvil personal?', ['Para liberar espacio', 'Para proteger la información si el equipo se pierde o es robado', 'Para actualizar apps', 'No tiene uso'], 1, 'El borrado remoto protege la información corporativa ante pérdida o robo.'),
      P('Usa su celular personal para el MFA corporativo. ¿Aplica esta política?', ['No, solo aplica a tablets', 'Sí, el MFA es un uso laboral cubierto', 'Solo si es de la empresa', 'Solo fuera de horario'], 1, 'Los dispositivos usados para MFA están cubiertos.'),
      P('¿Qué debe hacer con el sistema operativo de su tablet usada para trabajo?', ['Nunca actualizarlo', 'Mantenerlo al día', 'Desinstalarlo', 'Actualizarlo solo si IT lo pide por escrito'], 1, 'La política exige mantener el sistema operativo actualizado.')
    ],
    'DOC-003': [
      P('Necesita una herramienta que no está aprobada por IT. ¿Qué corresponde?', ['Instalarla y avisar después', 'Presentar una solicitud formal con justificación', 'Pedirle a un compañero que la instale', 'Usar una versión portable'], 1, 'Las excepciones requieren solicitud formal y justificación.'),
      P('¿A nombre de quién queda registrado el hardware asignado?', ['Del área de IT', 'Del colaborador que lo recibe', 'Del proveedor', 'De nadie'], 1, 'Todo equipo asignado queda registrado a nombre del colaborador.'),
      P('¿Qué regula la política de Control de Software y Hardware?', ['Solo el horario de trabajo', 'La instalación, el licenciamiento y el inventario de software y hardware', 'Los viajes', 'Las vacaciones'], 1, 'Cubre instalación, licenciamiento e inventario.')
    ],
    'DOC-004': [
      P('¿Dónde debe ir visible la etiqueta de clasificación?', ['En el nombre del archivo solamente', 'En el encabezado del documento', 'En un correo aparte', 'No tiene que ser visible'], 1, 'La etiqueta debe ir visible en el encabezado.'),
      P('¿Quién debe clasificar un documento antes de compartirlo?', ['Solo el área legal', 'Quien lo crea o lo recibe', 'El cliente', 'IT'], 1, 'Quien crea o recibe un documento es responsable de clasificarlo.'),
      P('¿Debe clasificarse un documento que solo se compartirá internamente?', ['No, solo los externos', 'Sí, incluso internamente', 'Solo si es largo', 'Solo si tiene datos financieros'], 1, 'La clasificación aplica también a lo que se comparte internamente.')
    ],
    'DOC-005': [
      P('¿El uso personal ocasional de una laptop corporativa está permitido?', ['Nunca', 'Sí, si es razonable y no interfiere con el trabajo', 'Sí, sin límites', 'Solo para juegos'], 1, 'Se tolera el uso personal ocasional razonable.'),
      P('¿Para qué se entregan principalmente los bienes y servicios de la organización?', ['Para uso familiar', 'Para fines laborales', 'Para venderlos', 'Para préstamos a terceros'], 1, 'Los bienes y servicios son para uso laboral.'),
      P('Un colaborador usa repetidamente el vehículo corporativo para fines personales. ¿Qué puede pasar?', ['Nada', 'Una medida disciplinaria por uso indebido reiterado', 'Un ascenso', 'Una devolución de gastos'], 1, 'El uso indebido reiterado puede derivar en medidas disciplinarias.')
    ],
    'DOC-006': [
      P('¿Quién publica y actualiza el catálogo de software permitido?', ['Cada colaborador', 'IT', 'El cliente', 'Recursos Humanos'], 1, 'El catálogo lo publica y actualiza IT.'),
      P('¿Qué debe incluir la solicitud de un software fuera del catálogo?', ['Nada en particular', 'Una justificación de negocio', 'El precio de mercado solamente', 'La opinión de un amigo'], 1, 'Toda excepción requiere justificación de negocio.'),
      P('Un software gratuito no está en el catálogo. ¿Puede instalarlo libremente?', ['Sí, por ser gratuito', 'No, igual requiere solicitud y aprobación de IT', 'Sí, si es de código abierto', 'Sí, si lo desinstala luego'], 1, 'Que sea gratuito no lo exime del catálogo.')
    ],
    'DOC-007': [
      P('¿Reportar a tiempo un incidente puede ser motivo de sanción?', ['Sí, siempre', 'No, el reporte oportuno no es motivo de sanción', 'Depende del área', 'Solo si fue un error propio'], 1, 'El reporte oportuno nunca es motivo de sanción.'),
      P('Sospecha que su cuenta fue comprometida, pero no está seguro. ¿Qué hace?', ['Espera a confirmarlo', 'Lo reporta igual: también se reportan las sospechas', 'Cambia la contraseña y no avisa', 'Lo comenta en el almuerzo'], 1, 'Se reportan los incidentes y también las sospechas.'),
      P('¿Qué información protege la política de seguridad?', ['Solo la del cliente', 'La de la organización y la de sus clientes', 'Solo la financiera', 'Solo la pública'], 1, 'Protege la información de la organización y de sus clientes.')
    ],
    /* ---- Etapa 2 ---- */
    'DOC-008': [
      P('¿Qué debe hacerse con el contenido que genera una herramienta de IA?', ['Publicarlo directamente', 'Revisarlo por una persona antes de usarlo', 'Borrarlo siempre', 'Enviarlo al cliente sin cambios'], 1, 'Todo resultado generado por IA debe ser revisado.'),
      P('¿Puede ingresar credenciales de acceso en una herramienta de IA?', ['Sí, si es corporativa', 'No, nunca', 'Solo las de prueba', 'Solo cifradas'], 1, 'Las credenciales nunca se ingresan en herramientas de IA.'),
      P('¿Cuál de estas herramientas de IA puede usar para el trabajo?', ['Cualquiera popular', 'Las del catálogo corporativo con cuenta corporativa', 'La que recomiende un cliente', 'Cualquiera gratuita'], 1, 'Solo las del catálogo corporativo autorizado.')
    ],
    'DOC-009': [
      P('¿Cómo deben gestionarse las contraseñas corporativas?', ['En una libreta', 'Con el gestor de contraseñas corporativo', 'En un archivo de texto en el escritorio', 'Memorizando una sola para todo'], 1, 'Es obligatorio usar el gestor de contraseñas corporativo.'),
      P('¿Las contraseñas corporativas deben renovarse?', ['Nunca', 'Sí, periódicamente', 'Solo si las olvida', 'Solo al cambiar de equipo'], 1, 'Las contraseñas se renuevan periódicamente.'),
      P('Un compañero le pide su contraseña para terminar una tarea urgente. ¿Qué hace?', ['Se la da por esta vez', 'No la comparte; él debe pedir su propio acceso', 'Se la dicta por teléfono', 'Le presta su sesión abierta'], 1, 'Compartir credenciales está prohibido incluso de forma temporal.')
    ],
    'DOC-010': [
      P('¿Por cuánto tiempo se conservan los datos personales?', ['Para siempre', 'Solo el tiempo necesario para su finalidad', 'Un año fijo', 'Hasta que alguien los borre'], 1, 'Los datos se conservan solo el tiempo necesario.'),
      P('¿Qué principio describe recopilar solo lo estrictamente necesario?', ['Maximización', 'Minimización', 'Publicidad', 'Retención'], 1, 'Es el principio de minimización.'),
      P('Un cliente pide que se eliminen sus datos personales. ¿Qué hace?', ['Los borra usted mismo de inmediato', 'Canaliza la solicitud al equipo de privacidad', 'Ignora el pedido', 'Le responde que no es posible'], 1, 'Las solicitudes de titulares se canalizan al equipo de privacidad.')
    ],
    'DOC-011': [
      P('¿Para qué es principalmente la conexión a internet corporativa?', ['Para entretenimiento', 'Para fines laborales', 'Para descargas personales', 'Para minería de criptomonedas'], 1, 'La conexión corporativa es para fines laborales.'),
      P('¿El tráfico de la red corporativa puede ser monitoreado?', ['No, nunca', 'Sí, la política contempla el monitoreo de tráfico', 'Solo de los managers', 'Solo los fines de semana'], 1, 'El documento incluye el monitoreo de tráfico.'),
      P('¿Puede acceder a contenido ilegal desde la red corporativa si es fuera de horario?', ['Sí, fuera de horario', 'No, está prohibido siempre', 'Sí, con VPN personal', 'Solo desde el celular'], 1, 'El contenido ilegal está prohibido en todo momento.')
    ],
    'DOC-012': [
      P('¿Quién autoriza los dispositivos de almacenamiento que pueden usarse?', ['Cada colaborador', 'IT', 'El proveedor', 'El cliente'], 1, 'Los dispositivos deben estar autorizados por IT.'),
      P('¿Qué característica deben tener los USB usados con información corporativa?', ['Ser de color corporativo', 'Estar cifrados', 'Tener más de 64 GB', 'Ser nuevos'], 1, 'Solo se usan dispositivos cifrados.'),
      P('¿Puede copiar información Interna a un USB cifrado y autorizado por IT?', ['No, nunca', 'Sí, porque cumple las condiciones de la política', 'Solo si es Restringida', 'Solo en papel'], 1, 'Con dispositivo cifrado y autorizado se cumple la política (salvo información Restringida en dispositivos personales).')
    ],
    /* ---- Engineering ---- */
    'DOC-013': [
      P('¿Qué entradas deben validarse según Desarrollo Seguro?', ['Solo las del administrador', 'Toda entrada del usuario o de sistemas externos', 'Ninguna', 'Solo las numéricas'], 1, 'Se valida toda entrada de datos.'),
      P('¿Cómo se mantienen las librerías de terceros?', ['Nunca se actualizan', 'Actualizadas conforme al calendario de parches', 'Solo al final del proyecto', 'Las actualiza el cliente'], 1, 'Se mantienen actualizadas según el calendario de parches.'),
      P('¿En qué etapas aplica Desarrollo Seguro?', ['Solo en producción', 'Al diseñar, construir y desplegar software', 'Solo en pruebas', 'Solo en la documentación'], 1, 'Aplica a diseño, construcción y despliegue.')
    ],
    'DOC-014': [
      P('¿Con quién puede compartirse la información confidencial de un cliente?', ['Con cualquier colega', 'Solo con el equipo del proyecto, salvo autorización escrita', 'En redes sociales', 'Con otros clientes'], 1, 'Solo dentro del equipo del proyecto sin autorización escrita.'),
      P('¿Puede mencionar el nombre del proyecto de un cliente en su perfil profesional?', ['Sí, siempre', 'No, sin autorización escrita', 'Sí, si ya terminó', 'Sí, si no pone el logo'], 1, 'Nombres de proyecto requieren autorización escrita.'),
      P('¿Qué información del cliente cubre esta política?', ['Solo el contrato', 'Código, arquitectura, datos de producción y comunicaciones del proyecto', 'Solo los correos', 'Solo las facturas'], 1, 'Cubre código, arquitectura, datos y comunicaciones.')
    ],
    'DOC-017': [
      P('¿Cuántas revisiones aprobadas necesita como mínimo un pull request a la rama principal?', ['Ninguna', 'Al menos una', 'Diez', 'Solo la del autor'], 1, 'Se requiere al menos una revisión aprobada.'),
      P('Subió por error un token al repositorio. ¿Qué es lo correcto?', ['Dejarlo, nadie lo verá', 'Tratarlo como incidente: revocarlo y moverlo a la bóveda', 'Cambiar el nombre del archivo', 'Hacer el repositorio privado y olvidarlo'], 1, 'Los secretos nunca deben estar en el repositorio.'),
      P('¿Qué protege la regla de ramas protegidas?', ['El rendimiento del servidor', 'La rama principal frente a cambios sin revisión', 'Los correos', 'Las licencias'], 1, 'Evita cambios sin revisión en la rama principal.')
    ],
    'DOC-018': [
      P('¿Con quién se acuerdan las ventanas de despliegue a producción?', ['Con nadie', 'Con el cliente', 'Solo con el equipo de QA', 'Con el proveedor de nube'], 1, 'Las ventanas se acuerdan con el cliente.'),
      P('¿Qué es un plan de reversión?', ['Un plan de vacaciones', 'Los pasos para volver al estado anterior si el despliegue falla', 'Una lista de tareas pendientes', 'Un contrato'], 1, 'Permite revertir si el despliegue falla.'),
      P('¿Puede desplegar un cambio urgente directamente a producción saltando ambientes?', ['Sí, si es urgente', 'No, todo cambio pasa por los ambientes previos', 'Sí, de noche', 'Sí, si lo hace el líder'], 1, 'La promoción entre ambientes es obligatoria.')
    ],
    /* ---- Quality Control ---- */
    'DOC-019': [
      P('¿Cuándo se verifica un entregable?', ['Después de enviarlo', 'Antes de enviarlo al cliente', 'Solo si el cliente reclama', 'Al final del año'], 1, 'La verificación se hace antes del envío.'),
      P('¿Para qué sirve el registro de la verificación?', ['Para nada', 'Como evidencia de calidad', 'Para calcular sueldos', 'Para publicidad'], 1, 'El registro sirve como evidencia de calidad.'),
      P('Un entregable no cumple un criterio de aceptación. ¿Puede enviarse?', ['Sí, igual', 'No, debe corregirse y verificarse antes', 'Sí, con una disculpa', 'Sí, si el plazo vence'], 1, 'Debe cumplir los criterios acordados antes de enviarse.')
    ],
    'DOC-020': [
      P('¿Según qué se asigna la severidad de un defecto?', ['Según quién lo encontró', 'Según el impacto en el usuario', 'Según el día', 'Al azar'], 1, 'La severidad depende del impacto en el usuario.'),
      P('¿Qué permite el paso a paso en el reporte de un defecto?', ['Nada', 'Reproducirlo', 'Ocultarlo', 'Cerrarlo sin revisar'], 1, 'Los pasos permiten reproducir el defecto.'),
      P('¿Qué evidencia conviene adjuntar a un defecto?', ['Ninguna', 'Capturas o registros que lo muestren', 'Una canción', 'El currículum del tester'], 1, 'La evidencia ayuda a entender y reproducir el defecto.')
    ],
    'DOC-021': [
      P('¿Qué son los criterios de salida de un plan de pruebas?', ['Las salidas de emergencia', 'Las condiciones para dar por terminadas las pruebas', 'El horario', 'Los costos'], 1, 'Definen cuándo se terminan las pruebas.'),
      P('¿El plan de pruebas define los ambientes y datos a usar?', ['No', 'Sí', 'Solo los datos', 'Solo los ambientes'], 1, 'Incluye ambientes y datos.'),
      P('Cambia el alcance funcional del proyecto. ¿Qué pasa con el plan de pruebas?', ['Se mantiene igual', 'Se actualiza', 'Se elimina', 'Se envía al cliente sin cambios'], 1, 'El plan se actualiza ante cambios de alcance.')
    ],
    'DOC-022': [
      P('¿Qué tipo de pruebas se recomienda mantener manuales?', ['Las de regresión', 'Las exploratorias', 'Las de alto riesgo', 'Las repetitivas'], 1, 'Las exploratorias se mantienen manuales.'),
      P('¿Dónde se integran las pruebas automatizadas?', ['En un correo', 'En el pipeline de integración', 'En un documento Word', 'En ningún lado'], 1, 'Se integran al pipeline.'),
      P('¿Qué aporta automatizar la regresión?', ['Nada', 'Detectar rápido si un cambio rompió algo existente', 'Eliminar el control de calidad', 'Reemplazar los requisitos'], 1, 'La regresión automatizada detecta roturas rápidamente.')
    ],
    'DOC-023': [
      P('¿Qué significa anonimizar datos de prueba?', ['Copiarlos tal cual', 'Quitar o reemplazar lo que identifica a una persona', 'Cifrar el disco', 'Borrar la base completa'], 1, 'Anonimizar elimina la posibilidad de identificar a la persona.'),
      P('¿Qué clasificación de criticidad tiene esta política?', ['Baja', 'Alta', 'Ninguna', 'Media'], 1, 'Es una política de criticidad alta.'),
      P('Terminó el ciclo de pruebas. ¿Puede guardar la base de datos de prueba "por si acaso"?', ['Sí', 'No, los datos de prueba se eliminan al cerrar el ciclo', 'Sí, en su equipo personal', 'Sí, en un USB'], 1, 'Se eliminan al cerrar el ciclo.')
    ],
    /* ---- Project Management ---- */
    'DOC-024': [
      P('¿Cuántas fases tiene la metodología de proyectos?', ['Dos', 'Cinco: inicio, planificación, ejecución, control y cierre', 'Diez', 'Una'], 1, 'Son cinco fases.'),
      P('¿En qué fase se elabora el cronograma?', ['Cierre', 'Planificación', 'Ninguna', 'Después del cierre'], 1, 'El cronograma es obligatorio desde la planificación.'),
      P('¿Qué documento formaliza el arranque de un proyecto?', ['La factura', 'El acta de inicio', 'La minuta de cierre', 'El organigrama'], 1, 'El acta de inicio formaliza el arranque.')
    ],
    'DOC-025': [
      P('¿Desde cuándo se identifican los riesgos de un proyecto?', ['Al final', 'Desde el inicio', 'Cuando ocurren', 'Nunca'], 1, 'Se identifican desde el inicio.'),
      P('¿Qué significa asignar un responsable a un riesgo?', ['Culpar a alguien', 'Que alguien hace su seguimiento y su plan de respuesta', 'Nada', 'Informar al cliente'], 1, 'El responsable da seguimiento al riesgo.'),
      P('¿Dónde se revisa el registro de riesgos?', ['En la fiesta de fin de año', 'En las reuniones de seguimiento con el cliente', 'En privado', 'No se revisa'], 1, 'Se revisa en cada reunión de seguimiento.')
    ],
    'DOC-026': [
      P('¿Por qué canal se confirman los acuerdos con el cliente?', ['WhatsApp personal', 'Canales corporativos, por escrito', 'De palabra', 'Redes sociales'], 1, 'Por escrito en canales corporativos.'),
      P('¿Qué debe registrar una minuta?', ['Solo la fecha', 'Acuerdos, responsables y fechas', 'El menú del almuerzo', 'Solo los asistentes'], 1, 'Acuerdos, responsables y fechas.'),
      P('Acordó un cambio con el cliente en una llamada. ¿Qué hace después?', ['Nada', 'Lo confirma por escrito', 'Espera que el cliente lo recuerde', 'Lo comenta en un pasillo'], 1, 'Todo acuerdo se confirma por escrito.')
    ],
    /* ---- People & Culture ---- */
    'DOC-027': [
      P('¿Qué regula el Reglamento Interno de Trabajo?', ['Solo los viajes', 'Derechos, obligaciones, jornada y régimen disciplinario', 'Los precios', 'Las campañas de marketing'], 1, 'Regula derechos, obligaciones, jornada y disciplina.'),
      P('¿Qué se rige por este reglamento además de la jornada?', ['El clima', 'Los descansos y el registro de asistencia', 'El tráfico', 'El código de los sistemas'], 1, 'Incluye descansos y registro de asistencia.'),
      P('¿Antes de aplicar una sanción, qué derecho tiene el colaborador?', ['Ninguno', 'Presentar su descargo', 'Elegir la sanción', 'Cambiar de área'], 1, 'El procedimiento incluye un descargo.')
    ],
    'DOC-028': [
      P('¿Qué tipo de información protege esta política?', ['Solo el nombre', 'Personal, salarial y médica de los colaboradores', 'Solo la de clientes', 'La pública'], 1, 'Protege información personal, salarial y médica.'),
      P('Un manager le pide el salario de un colaborador de otra área. ¿Qué hace?', ['Se lo da', 'No lo comparte sin base legal o consentimiento', 'Se lo envía por chat', 'Lo publica'], 1, 'Se requiere base legal o consentimiento.'),
      P('¿Quiénes acceden a los legajos del personal?', ['Todos', 'Solo personal autorizado de People & Culture', 'Los clientes', 'Los proveedores'], 1, 'Solo personal autorizado.')
    ],
    'DOC-029': [
      P('¿Qué tipo de entrevistas indica el procedimiento?', ['Improvisadas', 'Estructuradas', 'Solo por chat', 'Ninguna'], 1, 'Las entrevistas son estructuradas.'),
      P('¿Con qué termina el proceso de selección?', ['Con una llamada informal', 'Con una oferta formal', 'Con un correo sin firma', 'Con el primer día'], 1, 'Termina con una oferta formal.'),
      P('¿Puede descartarse a un candidato por su edad?', ['Sí', 'No, las decisiones evitan sesgos por edad, género u origen', 'Solo si es muy joven', 'Depende del puesto'], 1, 'El procedimiento prohíbe esos sesgos.')
    ],
    'DOC-030': [
      P('¿Qué se recupera cuando un colaborador deja la empresa?', ['Nada', 'Todos los activos asignados', 'Solo la credencial', 'Solo el uniforme'], 1, 'Se recuperan todos los activos asignados.'),
      P('¿Qué se asigna al nuevo colaborador durante el onboarding?', ['Un escritorio solamente', 'La ruta de inducción, accesos y activos', 'Un bono', 'Nada'], 1, 'Incluye ruta de inducción, accesos y activos.'),
      P('¿Por qué los accesos se revocan el último día?', ['Por costumbre', 'Para evitar accesos indebidos tras la salida', 'Para ahorrar licencias únicamente', 'No es necesario'], 1, 'Evita accesos indebidos después de la salida.')
    ],
    /* ---- Finance ---- */
    'DOC-015': [
      P('Cambió de oficina con su laptop asignada. ¿Qué debe hacer?', ['Nada', 'Reportar el cambio de ubicación del activo', 'Venderla', 'Prestarla'], 1, 'El custodio reporta cambios de ubicación.'),
      P('¿Qué etapas del activo fijo cubre el manual?', ['Solo la compra', 'Alta, transferencia, mantenimiento y baja', 'Solo la baja', 'Solo el inventario'], 1, 'Cubre todo el ciclo del activo.'),
      P('¿Qué área aprueba la baja de un activo?', ['Marketing', 'Procurement and Asset Control', 'El colaborador', 'El cliente'], 1, 'La aprueba Procurement and Asset Control.')
    ],
    'DOC-016': [
      P('¿Qué se emite después de obtener las aprobaciones requeridas?', ['Una factura', 'La orden de compra', 'Un despido', 'Nada'], 1, 'Con las aprobaciones se emite la orden de compra.'),
      P('¿Qué información incluye la solicitud de compra?', ['Solo el proveedor', 'Bien o servicio, monto estimado y justificación', 'Solo el color', 'Nada'], 1, 'Incluye bien, monto estimado y justificación.'),
      P('Una compra de monto alto, ¿requiere más o menos aprobaciones que una de monto bajo?', ['Menos', 'Más niveles de aprobación', 'Las mismas, siempre', 'Ninguna'], 1, 'El monto determina los niveles de aprobación.')
    ],
    'DOC-031': [
      P('¿A nombre de quién deben estar los comprobantes de gasto?', ['Del colaborador', 'De la empresa', 'Del hotel', 'De nadie'], 1, 'Los comprobantes deben estar a nombre de la empresa.'),
      P('Regresó de un viaje el lunes. ¿Hasta cuándo puede rendir?', ['Hasta fin de año', 'Dentro de 5 días hábiles', 'Cuando quiera', 'El mismo día únicamente'], 1, 'El plazo es de 5 días hábiles.'),
      P('Perdió la factura de una comida del viaje. ¿Qué implica?', ['Nada', 'Ese gasto no queda respaldado con comprobante válido', 'Se aprueba igual', 'Se duplica el reembolso'], 1, 'Cada gasto debe tener comprobante válido.')
    ],
    'DOC-032': [
      P('¿Puede facturarse un hito que el cliente todavía no aceptó?', ['Sí', 'No, solo hitos aceptados y registrados', 'Sí, a fin de mes', 'Sí, si es urgente'], 1, 'Solo se factura contra hitos aceptados.'),
      P('¿A quién se avisa cuando un cobro vence?', ['A nadie', 'Al responsable de la cuenta', 'A todo el personal', 'Al proveedor'], 1, 'Se avisa al responsable de la cuenta.'),
      P('¿Dónde debe estar registrado un hito antes de facturarlo?', ['En una nota personal', 'En el sistema', 'En una pizarra', 'En ningún lado'], 1, 'Los hitos se registran en el sistema.')
    ],
    'DOC-033': [
      P('¿Qué porcentaje de desvío requiere justificación y aprobación?', ['1%', 'Más del 10%', '50%', 'Ninguno'], 1, 'Los desvíos mayores al 10%.'),
      P('¿Quién aprueba los desvíos presupuestarios relevantes?', ['El cliente', 'Finance', 'Cualquier colaborador', 'Marketing'], 1, 'Requieren aprobación de Finance.'),
      P('¿De qué es responsable cada área respecto de su presupuesto?', ['De nada', 'De ejecutarlo y controlarlo según lo aprobado', 'Solo de gastarlo', 'De ocultarlo'], 1, 'Cada área ejecuta y controla su presupuesto.')
    ],
    'DOC-034': [
      P('¿Qué documento acredita que el bien o servicio fue recibido?', ['La cotización', 'La conformidad de recepción', 'El correo de bienvenida', 'El contrato laboral'], 1, 'La conformidad de recepción acredita la entrega.'),
      P('Un proveedor pide que se le pague fuera de ciclo. ¿Qué corresponde?', ['Pagarle de inmediato', 'Respetar los ciclos quincenales definidos por Finance', 'Pagarle en efectivo', 'Ignorarlo'], 1, 'Los pagos se procesan en los ciclos definidos.'),
      P('¿Puede pagarse una factura sin orden de compra?', ['Sí', 'No, se requiere orden de compra', 'Sí, si es pequeña', 'Sí, si el proveedor es conocido'], 1, 'La orden de compra es requisito.')
    ],
    /* ---- IT & Infrastructure ---- */
    'DOC-035': [
      P('¿Quién aprueba la solicitud de acceso de un colaborador?', ['Él mismo', 'Su manager', 'El cliente', 'Nadie'], 1, 'El manager del colaborador aprueba la solicitud.'),
      P('¿Qué se hace con los accesos privilegiados que ya no se usan?', ['Se conservan', 'Se revocan', 'Se comparten', 'Se duplican'], 1, 'Los accesos sin uso se revocan.'),
      P('¿Qué significa mínimo privilegio?', ['Dar todos los permisos', 'Dar solo los permisos necesarios para la tarea', 'No dar permisos', 'Dar permisos de administrador a todos'], 1, 'Solo lo necesario para la tarea.')
    ],
    'DOC-036': [
      P('¿Qué datos se registran en un incidente de TI?', ['Solo la hora', 'Impacto, urgencia y servicio afectado', 'El nombre del culpable', 'Nada'], 1, 'Se registran impacto, urgencia y servicio afectado.'),
      P('¿A quién se informa un incidente crítico?', ['A nadie', 'Al cliente afectado', 'A la prensa', 'Solo al proveedor'], 1, 'Se informa al cliente afectado.'),
      P('Un servidor crítico se cae. ¿Cuándo debe atenderse?', ['Mañana', 'De inmediato', 'En la próxima ventana mensual', 'Cuando haya tiempo'], 1, 'Los incidentes críticos se atienden de inmediato.')
    ],
    'DOC-037': [
      P('¿Dónde se guardan los respaldos?', ['En el mismo servidor', 'Cifrados y fuera del sitio', 'En un USB personal', 'En el escritorio'], 1, 'Se guardan cifrados fuera del sitio.'),
      P('¿Por qué se prueba la recuperación?', ['Por trámite', 'Para asegurar que los respaldos realmente sirven', 'Para ocupar tiempo', 'No se prueba'], 1, 'Probar garantiza que el respaldo sea recuperable.'),
      P('¿Qué sistemas se respaldan diariamente?', ['Ninguno', 'Los sistemas críticos', 'Solo las impresoras', 'Solo los correos personales'], 1, 'Los sistemas críticos se respaldan a diario.')
    ],
    'DOC-038': [
      P('¿Qué análisis acompaña a un cambio en infraestructura productiva?', ['Ninguno', 'Un análisis de impacto', 'Un análisis de precios', 'Una encuesta'], 1, 'Se presenta un análisis de impacto.'),
      P('¿Qué cambios pasan por el comité de cambios?', ['Ninguno', 'Todo cambio en infraestructura productiva', 'Solo los de oficina', 'Solo los de software de escritorio'], 1, 'Todo cambio productivo pasa por el comité.'),
      P('Aplicó un cambio de red. ¿Qué debe quedar registrado?', ['Nada', 'Fecha, responsable y resultado', 'Solo que fue exitoso', 'Solo el costo'], 1, 'Se registran fecha, responsable y resultado.')
    ]
  };
  documentos.forEach(d => { if (preguntasExtra[d.id]) d.preguntas = d.preguntas.concat(preguntasExtra[d.id].map(p => ({ ...p, docId: d.id }))); });

  // La respuesta correcta se distribuye entre A, B, C y D (de forma fija, para que
  // la demo sea reproducible) en lugar de quedar casi siempre en la misma posición.
  documentos.forEach((d, di) => d.preguntas.forEach((p, qi) => {
    const destino = (di + qi * 3) % p.o.length;
    const correcta = p.o[p.r];
    const resto = p.o.filter((_, i) => i !== p.r);
    resto.splice(destino, 0, correcta);
    p.o = resto; p.r = destino;
  }));

  // Las evaluaciones por documento se arman en app.js a partir de `documentos[].preguntas`.
  const evaluaciones = [];

  /* ---------- Campañas de micro aprendizaje ----------
     Refuerzos periódicos independientes de las etapas: siguen enviando
     preguntas sobre un documento puntual a modo de recordatorio, aun
     cuando el colaborador ya aprobó la evaluación de su etapa. */
  const campanas = [
    { id: 'MA-21', nombre: 'Phishing y correo seguro', enfoque: 'Refuerzo de brecha', docId: 'DOC-007', periodicidad: 'Semanal', audiencia: 'Toda la organización', alcance: 248, respuesta: 82, acierto: 74, estado: 'activa', proxima: '2026-09-18' },
    { id: 'MA-22', nombre: 'Uso responsable de IA', enfoque: 'Refuerzo de brecha', docId: 'DOC-008', periodicidad: 'Quincenal', audiencia: 'Engineering, QA, PMO, IT', alcance: 186, respuesta: 68, acierto: 61, estado: 'activa', proxima: '2026-09-17' },
    { id: 'MA-23', nombre: 'Protección y privacidad de datos', enfoque: 'Refuerzo de brecha', docId: 'DOC-010', periodicidad: 'Semanal', audiencia: 'Engineering, QA, PMO', alcance: 164, respuesta: 77, acierto: 66, estado: 'activa', proxima: '2026-09-16' },
    { id: 'MA-24', nombre: 'Confidencialidad con clientes', enfoque: 'Concientización', docId: 'DOC-014', periodicidad: 'Mensual', audiencia: 'Engineering', alcance: 92, respuesta: 71, acierto: 79, estado: 'activa', proxima: '2026-09-30' },
    { id: 'MA-25', nombre: 'Control de software y hardware', enfoque: 'Concientización', docId: 'DOC-003', periodicidad: 'Mensual', audiencia: 'IT, Engineering, QA', alcance: 152, respuesta: 64, acierto: 83, estado: 'pausada', proxima: '—' },
    { id: 'MA-26', nombre: 'Cuidado de activos fijos', enfoque: 'Bienestar', docId: 'DOC-015', periodicidad: 'Quincenal', audiencia: 'Toda la organización', alcance: 248, respuesta: 59, acierto: 88, estado: 'borrador', proxima: '—' }
  ];

  /* ---------- Píldoras diarias del colaborador ---------- */
  const pildoras = [
    { id: 'P-1', campana: 'MA-21', doc: 'DOC-007', q: 'Recibe un correo de un remitente desconocido con un archivo adjunto .zip que dice ser una factura. ¿Qué hace?', o: ['Abrirlo para verificar', 'Reenviarlo al equipo', 'Reportarlo al canal de seguridad sin abrirlo', 'Eliminarlo sin reportar'], r: 2, exp: 'Reportar sin abrir permite al equipo de seguridad bloquear la campaña para toda la organización.', estado: 'pendiente' },
    { id: 'P-2', campana: 'MA-22', doc: 'DOC-008', q: 'Necesita resumir un documento de arquitectura del cliente. ¿Qué herramienta puede usar?', o: ['Cualquier herramienta gratuita', 'Una herramienta del catálogo corporativo autorizado', 'Su cuenta personal de IA', 'Ninguna, está prohibido resumir'], r: 1, exp: 'Solo herramientas del catálogo corporativo, y siempre respetando qué información no puede compartirse.', estado: 'pendiente' },
    { id: 'P-3', campana: 'MA-23', doc: 'DOC-010', q: 'Recibe una solicitud informal para compartir una lista de datos personales de clientes. ¿Qué hace?', o: ['La comparte si el compañero es de confianza', 'La deriva al equipo de privacidad y verifica la base legal', 'La ignora sin responder', 'La comparte si es solo un extracto'], r: 1, exp: 'Toda solicitud de datos personales debe verificarse contra la política antes de compartir cualquier información.', estado: 'pendiente' },
    { id: 'P-4', campana: 'MA-24', doc: 'DOC-014', q: '¿Puede publicar una captura de pantalla del tablero del proyecto de un cliente en redes sociales?', o: ['Sí, si oculta el logo', 'Sí, es contenido propio', 'No, sin autorización escrita', 'Solo en perfiles privados'], r: 2, exp: 'Toda mención o imagen del cliente requiere autorización escrita previa.', estado: 'completada', acierto: true },
    { id: 'P-5', campana: 'MA-21', doc: 'DOC-007', q: 'Al retirarse de su escritorio por cinco minutos, ¿qué debe hacer con su equipo?', o: ['Dejarlo abierto, es poco tiempo', 'Bloquear la sesión', 'Apagarlo completamente', 'Cerrar solo el correo'], r: 1, exp: 'La política de seguridad de la información exige bloquear la sesión en toda ausencia del puesto de trabajo.', estado: 'completada', acierto: true }
  ];

  /* ---------- Notificaciones y automatizaciones ---------- */
  const notificaciones = [
    { id: 'N-1', tipo: 'escalamiento', titulo: 'Escalamiento a Manager', detalle: 'Rodrigo Ferrufino acumula 6 días sin actividad en su ruta de inducción.', destino: 'Iván Suárez', fecha: '2026-09-16 08:12', estado: 'enviada' },
    { id: 'N-2', tipo: 'recordatorio', titulo: 'Recordatorio de lectura', detalle: 'Política de Uso de IA v1.3 pendiente de confirmación para 64 colaboradores.', destino: 'Grupo: Engineering, QA, PMO, IT', fecha: '2026-09-16 07:00', estado: 'enviada' },
    { id: 'N-3', tipo: 'actualizacion', titulo: 'Documento actualizado', detalle: 'Política de Seguridad de la Información pasó a v4.2. Micro evaluación generada automáticamente.', destino: 'Toda la organización', fecha: '2026-09-02 10:31', estado: 'enviada' },
    { id: 'N-4', tipo: 'vencimiento', titulo: 'Vencimiento próximo', detalle: 'La fase 3 de Diego Salazar vence en 2 días.', destino: 'Diego Salazar', fecha: '2026-09-16 06:45', estado: 'programada' },
    { id: 'N-5', tipo: 'resultado', titulo: 'Evaluación reprobada', detalle: 'Andrea Suárez obtuvo 58% en Control de Calidad de Entregables. Reintento habilitado.', destino: 'Andrea Suárez · Patricia Nogales', fecha: '2026-09-15 16:20', estado: 'enviada' },
    { id: 'N-6', tipo: 'bienvenida', titulo: 'Correo de bienvenida', detalle: 'Ruta inicial activada para Fernanda Loayza, Marco Antelo y Carla Montaño.', destino: '3 colaboradores', fecha: '2026-09-14 09:00', estado: 'enviada' },
    { id: 'N-7', tipo: 'campana', titulo: 'Campaña de micro aprendizaje', detalle: 'Phishing y correo seguro: píldora semanal enviada a 248 colaboradores.', destino: 'Toda la organización', fecha: '2026-09-11 09:00', estado: 'enviada' },
    { id: 'N-8', tipo: 'escalamiento', titulo: 'Escalamiento a Manager', detalle: 'Andrea Suárez sin actividad por 9 días y con una evaluación reprobada.', destino: 'Patricia Nogales', fecha: '2026-09-15 08:12', estado: 'enviada' },
    { id: 'N-9', tipo: 'recordatorio', titulo: 'Recordatorio de evaluación', detalle: 'Tomás Zeballos tiene la evaluación de fase 4 pendiente desde hace 7 días.', destino: 'Tomás Zeballos', fecha: '2026-09-14 07:00', estado: 'enviada' },
    { id: 'N-10',tipo: 'actualizacion', titulo: 'Documento actualizado', detalle: 'Control de Calidad de Entregables pasó a v5.1. Impacta a 164 colaboradores.', destino: 'Engineering, QA, PMO', fecha: '2026-08-28 15:02', estado: 'enviada' }
  ];

  /* ---------- Bandeja del colaborador (avisos) ---------- */
  const avisosColaborador = [
    { t: 'Nueva evaluación disponible', d: 'Política de Uso de IA v1.3 — 5 preguntas, 8 minutos.', h: 'Hace 1 h', tipo: 'evaluacion' },
    { t: 'Documento actualizado', d: 'Política de Seguridad de la Información cambió a v4.2.', h: 'Hace 2 d', tipo: 'actualizacion' },
    { t: 'Píldora de la semana', d: 'Phishing y correo seguro: 1 pregunta, menos de 1 minuto.', h: 'Hace 3 d', tipo: 'campana' },
    { t: 'Fase 3 por vencer', d: 'Le quedan 2 días para completar la evaluación de comprensión.', h: 'Hace 4 d', tipo: 'vencimiento' }
  ];

  /* ---------- Evidencias de cumplimiento (auditoría) ---------- */
  const evidencias = [
    { id: 'EVD-9001', colaborador: 'Alejandra Mercado', documento: 'Política de Seguridad de la Información v4.2', tipo: 'Evaluación aprobada', resultado: '95%', fecha: '2026-08-14 11:22', hash: '7f3a...c91e' },
    { id: 'EVD-9002', colaborador: 'Sebastián Vaca',   documento: 'Procedimiento de Gestión de Accesos v2.8',       tipo: 'Confirmación de lectura', resultado: 'Confirmada', fecha: '2026-08-13 09:05', hash: 'b214...4dd0' },
    { id: 'EVD-9003', colaborador: 'Camila Rojas',     documento: 'Reglamento Interno de Trabajo v3.0',             tipo: 'Evaluación aprobada', resultado: '88%', fecha: '2026-09-12 15:41', hash: '19cc...7a53' },
    { id: 'EVD-9004', colaborador: 'Andrea Suárez',    documento: 'Control de Calidad de Entregables v5.1',         tipo: 'Evaluación reprobada', resultado: '58%', fecha: '2026-09-15 16:19', hash: 'd0f7...2b88' },
    { id: 'EVD-9005', colaborador: 'Hugo Villarroel',  documento: 'Código de Ética y Conducta v2.5',                tipo: 'Evaluación aprobada', resultado: '96%', fecha: '2026-08-09 10:12', hash: '5ea1...ff34' },
    { id: 'EVD-9006', colaborador: 'Lucía Áñez',       documento: 'Guía de Bienvenida a Jalasoft v6.0',             tipo: 'Confirmación de lectura', resultado: 'Confirmada', fecha: '2026-08-02 08:47', hash: 'a77b...10c2' },
    { id: 'EVD-9007', colaborador: 'Mariana Ledezma',  documento: 'Acuerdo de Confidencialidad v3.4',               tipo: 'Evaluación aprobada', resultado: '97%', fecha: '2026-07-11 14:30', hash: '3c6d...9e01' },
    { id: 'EVD-9008', colaborador: 'Pablo Michel',     documento: 'Estándares de Desarrollo v4.5',                  tipo: 'Evaluación aprobada', resultado: '93%', fecha: '2026-07-30 17:55', hash: 'e412...58af' }
  ];

  /* ---------- Series para gráficos ---------- */
  const series = {
    cumplimientoSemanal: {
      labels: ['S23', 'S24', 'S25', 'S26', 'S27', 'S28', 'S29', 'S30', 'S31', 'S32', 'S33', 'S34'],
      lectura:    [61, 64, 68, 66, 71, 74, 73, 78, 81, 84, 86, 89],
      evaluacion: [52, 55, 57, 61, 63, 66, 69, 70, 74, 77, 79, 82]
    },
    ingresosMes: {
      labels: ['Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
      valores: [9, 12, 7, 14, 11, 6]
    },
    distribucionEstados: [
      { label: 'Completado', valor: 9,  color: 'ok' },
      { label: 'En curso',   valor: 10, color: 'info' },
      { label: 'Atrasado',   valor: 3,  color: 'warn' },
      { label: 'Por iniciar',valor: 2,  color: 'muted' }
    ],
    brechas: [
      { doc: 'Inteligencia Artificial - Política', docId: 'DOC-008', tema: 'Información que no puede compartirse con herramientas de IA', error: 47, afectados: 64, tendencia: 'sube' },
      { doc: 'Protección y Privacidad de Datos e Información', docId: 'DOC-010', tema: 'Clasificación y manejo de datos personales', error: 41, afectados: 52, tendencia: 'sube' },
      { doc: 'Protección de Contraseñas', docId: 'DOC-009', tema: 'Uso obligatorio del gestor corporativo de contraseñas', error: 38, afectados: 24, tendencia: 'estable' },
      { doc: 'Seguridad de la Información', docId: 'DOC-007', tema: 'Plazo de reporte de incidentes', error: 34, afectados: 71, tendencia: 'baja' },
      { doc: 'Customer Engineering Confidential Information', docId: 'DOC-014', tema: 'Publicaciones sobre proyectos de clientes en redes sociales', error: 29, afectados: 33, tendencia: 'estable' },
      { doc: 'Compra de bienes y servicios', docId: 'DOC-016', tema: 'Niveles de aprobación requeridos según el monto', error: 26, afectados: 41, tendencia: 'baja' }
    ]
  };

  /* ---------- Sugerencias de la IA ---------- */
  const sugerenciasIA = [
    { t: 'Reforzar “Información que no puede compartirse”', d: 'El 47% de los errores de Inteligencia Artificial - Política se concentra en qué información no puede ingresarse a herramientas de IA. Sugerimos una campaña quincenal dirigida a Engineering y QA.', impacto: 'alto', accion: 'Crear campaña', docId: 'DOC-008' },
    { t: 'Reescribir el criterio de clasificación de datos', d: 'La pregunta sobre clasificación de datos personales tiene 41% de error. La redacción admite dos lecturas; se sugiere precisarla en Protección y Privacidad de Datos.', impacto: 'alto', accion: 'Notificar a Gabriela Rocha' },
    { t: 'Dividir la lectura de Compra de bienes y servicios', d: 'El documento tiene 22 páginas y una tasa de abandono del 19% en la primera lectura. Sugerimos dividirlo en dos módulos dentro de la Etapa 3 Administrativos.', impacto: 'medio', accion: 'Ajustar ruta' },
    { t: 'Adelantar la Etapa 3 de Valeria Menacho', d: 'Completó la Etapa 1 y la Etapa 2 cuatro días antes del plazo con 92% de acierto. Puede habilitarse su documentación específica de área.', impacto: 'bajo', accion: 'Habilitar fase' }
  ];

  /* ---------- Actividad reciente ---------- */
  const actividad = [
    { h: '08:12', t: 'El sistema escaló a Iván Suárez el caso de Rodrigo Ferrufino', tipo: 'sistema' },
    { h: '08:03', t: 'Camila Rojas confirmó la lectura de Control de Software y Hardware', tipo: 'lectura' },
    { h: '07:41', t: 'La IA generó las preguntas de la Evaluación de Etapa 2', tipo: 'ia' },
    { h: '07:00', t: 'Se enviaron 64 recordatorios de lectura pendiente', tipo: 'sistema' },
    { h: 'Ayer',  t: 'Andrea Suárez reprobó la Evaluación de Etapa 1 (58%)', tipo: 'evaluacion' },
    { h: 'Ayer',  t: 'Marcelo Antezana publicó una actualización de Inteligencia Artificial - Política', tipo: 'documento' },
    { h: 'Ayer',  t: 'Alejandra Mercado completó su ruta de inducción', tipo: 'hito' }
  ];

  /* ---------- Usuarios de la demostración ---------- */
  const usuarios = [
    { id: 'U-ADM', rol: 'admin',       nombre: 'Marcelo Antezana', cargo: 'Quality Control Processes Lead', area: 'QA', correo: 'marcelo.antezana@jalasoft.com' },
    { id: 'U-MGR', rol: 'manager',     nombre: 'Iván Suárez',      cargo: 'Engineering Manager',            area: 'ENG', correo: 'ivan.suarez@jalasoft.com' },
    { id: 'U-COL', rol: 'colaborador', nombre: 'Camila Rojas',     cargo: 'QA Engineer',                    area: 'QA', correo: 'camila.rojas@jalasoft.com', colaboradorId: 'C-1001' }
  ];

  /* ---------- Cuentas de Administración y Managers ----------
     Son las cuentas que existen siempre, también al empezar desde cero.
     Los Managers nuevos aparecen cuando un Administrador asciende a un
     colaborador (ver "Managers y ascensos" en app.js). */
  const administradores = [
    { id: 'U-ADM-1', rol: 'admin', nombre: 'Marcelo Antezana', cargo: 'Quality Control Processes Lead', area: 'QA', correo: 'marcelo.antezana@jalasoft.com' },
    { id: 'U-ADM-2', rol: 'admin', nombre: 'Verónica Claure',  cargo: 'General Services Lead',          area: 'HR', correo: 'veronica.claure@jalasoft.com' }
  ];
  const managersBase = [
    { id: 'U-MGR-1', rol: 'manager', nombre: 'Iván Suárez',    cargo: 'Engineering Manager',     area: 'ENG', correo: 'ivan.suarez@jalasoft.com',    origen: 'base' },
    { id: 'U-MGR-2', rol: 'manager', nombre: 'Gabriela Rocha', cargo: 'Quality Control Manager', area: 'QA',  correo: 'gabriela.rocha@jalasoft.com', origen: 'base' },
    { id: 'U-MGR-3', rol: 'manager', nombre: 'Sofía Terceros', cargo: 'PMO Manager',             area: 'PMO', correo: 'sofia.terceros@jalasoft.com', origen: 'base' }
  ];
  // Managers que solo existen en los datos de ejemplo (tienen colaboradores semilla a cargo)
  const managersDemo = [
    { id: 'U-MGR-4', rol: 'manager', nombre: 'Ruth Peñaranda',   cargo: 'IT Manager',                area: 'IT',  correo: 'ruth.penaranda@jalasoft.com',   origen: 'base' },
    { id: 'U-MGR-5', rol: 'manager', nombre: 'Lorena Vargas',    cargo: 'People & Culture Manager',  area: 'HR',  correo: 'lorena.vargas@jalasoft.com',    origen: 'base' },
    { id: 'U-MGR-6', rol: 'manager', nombre: 'Patricia Nogales', cargo: 'Finance Manager',           area: 'FIN', correo: 'patricia.nogales@jalasoft.com', origen: 'base' }
  ];

  /* ---------- Asignaciones del colaborador demo (Camila Rojas, área QA) ----------
     Su Etapa 3 es la de Quality Control: los 2 documentos por defecto (DOC-019, DOC-020).
     Ruta completa: Etapa 1 (7) + Etapa 2 (5) + Etapa 3 Quality Control (2) = 14 documentos. */
  const misDocumentos = [
    { docId: 'DOC-001', estado: 'leido',     confirmado: '2026-09-08 09:14', vence: '2026-09-09', origen: 'Etapa 1' },
    { docId: 'DOC-002', estado: 'leido',     confirmado: '2026-09-08 09:30', vence: '2026-09-09', origen: 'Etapa 1' },
    { docId: 'DOC-003', estado: 'leido',     confirmado: '2026-09-08 09:52', vence: '2026-09-09', origen: 'Etapa 1' },
    { docId: 'DOC-004', estado: 'leido',     confirmado: '2026-09-09 10:05', vence: '2026-09-09', origen: 'Etapa 1' },
    { docId: 'DOC-005', estado: 'leido',     confirmado: '2026-09-09 10:40', vence: '2026-09-09', origen: 'Etapa 1' },
    { docId: 'DOC-006', estado: 'leido',     confirmado: '2026-09-09 11:02', vence: '2026-09-09', origen: 'Etapa 1' },
    { docId: 'DOC-007', estado: 'leido',     confirmado: '2026-09-09 11:20', vence: '2026-09-09', origen: 'Etapa 1' },
    { docId: 'DOC-008', estado: 'leido',     confirmado: '2026-09-16 08:03', vence: '2026-09-16', origen: 'Etapa 2' },
    { docId: 'DOC-009', estado: 'leido',     confirmado: '2026-09-16 08:20', vence: '2026-09-16', origen: 'Etapa 2' },
    { docId: 'DOC-010', estado: 'leido',     confirmado: '2026-09-16 08:40', vence: '2026-09-16', origen: 'Etapa 2' },
    { docId: 'DOC-011', estado: 'pendiente', confirmado: null,               vence: '2026-09-18', origen: 'Etapa 2' },
    { docId: 'DOC-012', estado: 'pendiente', confirmado: null,               vence: '2026-09-19', origen: 'Etapa 2' },
    { docId: 'DOC-019', estado: 'pendiente', confirmado: null,               vence: '2026-09-24', origen: 'Etapa 3 · Quality Control' },
    { docId: 'DOC-020', estado: 'pendiente', confirmado: null,               vence: '2026-09-24', origen: 'Etapa 3 · Quality Control' }
  ];

  const misEvaluaciones = [
    { evId: 'EV-ETP1', etapaId: 'ETP-1', estado: 'aprobada', puntaje: 88, fecha: '2026-09-09 15:41', intento: 1 },
    { evId: 'EV-ETP2', etapaId: 'ETP-2', estado: 'bloqueada', puntaje: null, fecha: null, intento: 0 },
  ];

  /* ---------- Base de conocimiento del asistente ---------- */
  const chatbotKB = [
    { k: ['byod', 'computadora personal', 'equipo personal'], r: 'Puede usar una computadora personal para tareas laborales solo si tiene cifrado de disco activado, antivirus actualizado y bloqueo automático de pantalla configurado.', f: 'DOC-001' },
    { k: ['tablet', 'celular', 'movil', 'móvil', 'smartphone'], r: 'Las tablets y celulares personales usados para correo o chat corporativo deben tener PIN o biometría activados y permitir borrado remoto en caso de pérdida o robo.', f: 'DOC-002' },
    { k: ['software', 'instalar', 'licencia', 'catalogo', 'catálogo'], r: 'Solo puede instalarse software del catálogo autorizado por IT. Cualquier excepción requiere una solicitud formal con justificación de negocio.', f: 'DOC-006' },
    { k: ['etiqueta', 'clasificacion', 'clasificación', 'confidencial', 'restringido', 'restringida'], r: 'La información se clasifica en Pública, Interna, Confidencial y Restringida, y todo documento debe llevar visible su etiqueta de clasificación.', f: 'DOC-004' },
    { k: ['contraseña', 'password', 'clave', 'credencial'], r: 'Las contraseñas corporativas deben tener al menos 14 caracteres, combinar mayúsculas, minúsculas, números y símbolos, y usarse siempre a través del gestor corporativo. Compartir credenciales está prohibido, incluso de forma temporal.', f: 'DOC-009' },
    { k: ['incidente', 'reportar', 'seguridad de la informacion'], r: 'Todo incidente o sospecha de incidente de seguridad se reporta dentro de las 24 horas siguientes a su detección. Reportarlo a tiempo nunca es motivo de sanción; omitirlo sí lo es.', f: 'DOC-007' },
    { k: ['ia', 'inteligencia artificial', 'chatgpt', 'gemini', 'copilot'], r: 'Solo puede usar herramientas de IA del catálogo corporativo, con cuenta corporativa. Nunca ingrese código de cliente bajo NDA, datos personales, credenciales ni información clasificada. Todo resultado generado por IA debe ser revisado por una persona.', f: 'DOC-008' },
    { k: ['dato personal', 'datos personales', 'privacidad', 'titular'], r: 'Solo se recopilan los datos personales estrictamente necesarios para la finalidad declarada. Toda solicitud de acceso, corrección o eliminación de datos se canaliza al equipo de privacidad.', f: 'DOC-010' },
    { k: ['internet', 'navegacion', 'navegación', 'descarga'], r: 'La conexión corporativa es para fines laborales; el uso personal ocasional se tolera si no compromete la seguridad ni el rendimiento de la red. Está prohibido eludir los controles de seguridad.', f: 'DOC-011' },
    { k: ['usb', 'disco externo', 'almacenamiento', 'pendrive'], r: 'Solo pueden usarse dispositivos de almacenamiento cifrados y autorizados por IT. La información Restringida no puede copiarse a dispositivos personales bajo ninguna circunstancia.', f: 'DOC-012' },
    { k: ['codigo', 'código', 'dependencias', 'vulnerabilidad', 'desarrollo seguro'], r: 'El software se diseña bajo el principio de mínimo privilegio, validando toda entrada de datos. Las librerías de terceros se revisan por vulnerabilidades conocidas antes de incorporarse.', f: 'DOC-013' },
    { k: ['nda', 'confidencial', 'cliente', 'redes sociales'], r: 'La información confidencial de un cliente no puede mencionarse, mostrarse ni divulgarse fuera del equipo del proyecto sin autorización escrita, ni siquiera en redes sociales o portafolios personales.', f: 'DOC-014' },
    { k: ['activo fijo', 'activos fijos', 'custodio', 'baja de equipo'], r: 'Todo activo fijo se registra a nombre de un custodio responsable, quien debe reportar daños, pérdidas o cambios de ubicación. La baja requiere formulario y aprobación de Procurement and Asset Control.', f: 'DOC-015' },
    { k: ['compra', 'proveedor', 'adquisicion', 'adquisición', 'orden de compra'], r: 'Toda compra se inicia con una solicitud formal que indica el bien o servicio, el monto estimado y la justificación de negocio. El monto determina cuántos niveles de aprobación se requieren.', f: 'DOC-016' }
  ];

  return {
    areas, categorias, etapas, documentos, colaboradores, fases, evaluaciones, campanas,
    pildoras, notificaciones, avisosColaborador, evidencias, series, sugerenciasIA,
    actividad, usuarios, administradores, managersBase, managersDemo,
    misDocumentos, misEvaluaciones, chatbotKB
  };
})();



