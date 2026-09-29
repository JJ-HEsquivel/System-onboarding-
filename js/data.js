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
    'Compras y Activos Fijos'
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
    { id: 'ETP-3-ING', nombre: 'Etapa 3 · Documentación específica: Ingeniería',     orden: 3, plazoDiasHabiles: 5, alcance: 'area', areas: ['ENG'] },
    { id: 'ETP-3-ADM', nombre: 'Etapa 3 · Documentación específica: Administrativos', orden: 3, plazoDiasHabiles: 5, alcance: 'area', areas: ['QA', 'PMO', 'HR', 'FIN', 'IT'] }
  ];

  const TODAS_AREAS = ['ENG', 'QA', 'PMO', 'HR', 'FIN', 'IT'];

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
    {
      id: 'DOC-013', codigo: 'POL-ING-013', titulo: 'Desarrollo Seguro - Política',
      etapaId: 'ETP-3-ING', categoria: 'Ingeniería', version: '1.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-08-01', propietario: 'Enterprise Information Security', paginas: 2, minutos: 6,
      areas: ['ENG'], obligatorio: true, asignados: 92, leidos: 71, indiceError: 22, intentos: 84,
      resumen: 'Prácticas mínimas de seguridad que debe seguir el equipo de Ingeniería al diseñar, construir y desplegar software.',
      secciones: [
        { t: '1. Principios de diseño', p: 'El software se diseña bajo el principio de mínimo privilegio y validando toda entrada de datos proveniente del usuario o de sistemas externos.' },
        { t: '2. Gestión de dependencias', p: 'Las librerías de terceros se revisan por vulnerabilidades conocidas antes de incorporarse, y se mantienen actualizadas conforme al calendario de parches.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-08-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-014', codigo: 'POL-ING-014', titulo: 'Customer Engineering Confidential Information - Policy',
      etapaId: 'ETP-3-ING', categoria: 'Ingeniería', version: '1.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-08-01', propietario: 'Engineering', paginas: 3, minutos: 8,
      areas: ['ENG'], obligatorio: true, asignados: 92, leidos: 65, indiceError: 29, intentos: 79,
      resumen: 'Cómo tratar la información confidencial de clientes a la que accede el equipo de Ingeniería: código, arquitectura, datos de producción y comunicaciones del proyecto.',
      secciones: [
        { t: '1. Alcance de la confidencialidad', p: 'La información confidencial de un cliente no puede mencionarse, mostrarse ni divulgarse fuera del equipo del proyecto sin autorización escrita.' },
        { t: '2. Publicaciones y redes sociales', p: 'No se publican capturas, nombres de proyecto ni detalles técnicos de un cliente en redes sociales o portafolios personales sin autorización.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-08-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-015', codigo: 'MAN-ADM-015', titulo: 'Gestión de Activos Fijos - Manual',
      etapaId: 'ETP-3-ADM', categoria: 'Compras y Activos Fijos', version: '1.0', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-08-01', propietario: 'Procurement and Asset Control', paginas: 15, minutos: 32,
      areas: ['QA', 'PMO', 'HR', 'FIN', 'IT'], obligatorio: true, asignados: 156, leidos: 119, indiceError: 24, intentos: 138,
      resumen: 'Procedimiento para el alta, transferencia, mantenimiento y baja de activos fijos, incluyendo responsabilidades del custodio del activo.',
      secciones: [
        { t: '1. Alta y custodia', p: 'Todo activo fijo se registra a nombre de un custodio responsable, quien debe reportar cualquier daño, pérdida o cambio de ubicación.' },
        { t: '2. Baja de activos', p: 'La baja de un activo requiere el formulario correspondiente y la aprobación del área de Procurement and Asset Control.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-08-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    },
    {
      id: 'DOC-016', codigo: 'MAN-ADM-016', titulo: 'Compra de bienes y servicios - Manual (ESP-ENG)',
      etapaId: 'ETP-3-ADM', categoria: 'Compras y Activos Fijos', version: '1.0', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-08-01', propietario: 'Procurement and Asset Control', paginas: 22, minutos: 45,
      areas: ['QA', 'PMO', 'HR', 'FIN', 'IT'], obligatorio: true, asignados: 156, leidos: 108, indiceError: 26, intentos: 129,
      resumen: 'Procedimiento y niveles de aprobación requeridos para solicitar la compra de bienes o la contratación de servicios.',
      secciones: [
        { t: '1. Solicitud de compra', p: 'Toda compra se inicia con una solicitud formal que indica el bien o servicio, el monto estimado y la justificación de negocio.' },
        { t: '2. Niveles de aprobación', p: 'El monto de la compra determina cuántos niveles de aprobación se requieren antes de emitir la orden de compra.' }
      ],
      cambios: [{ v: '1.0', fecha: '2026-08-01', nivel: 'mayor', detalle: 'Publicación inicial dentro del programa de inducción.' }]
    }
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
  const fases = [
    { n: 1, nombre: 'Registro y bienvenida',       detalle: 'Alta del colaborador, asignación de Manager y correo de bienvenida.' },
    { n: 2, nombre: 'Lectura documental',          detalle: 'Lectura y confirmación de los documentos obligatorios asignados.' },
    { n: 3, nombre: 'Evaluación de comprensión',   detalle: 'Evaluación generada por IA sobre los documentos leídos.' },
    { n: 4, nombre: 'Documentación específica',    detalle: 'Documentos adicionales asignados por el Manager según el rol.' },
    { n: 5, nombre: 'Cierre y evidencia',          detalle: 'Registro de evidencias de cumplimiento y habilitación operativa.' }
  ];

  /* ---------- Evaluaciones ----------
     Cada evaluación cubre TODOS los documentos de una etapa (etapaId),
     tal como funciona el programa real: una sola evaluación por etapa,
     no una por documento. */
  const evaluaciones = [
    {
      id: 'EV-ETP1', etapaId: 'ETP-1', titulo: 'Evaluación · Etapa 1: Políticas Fundamentales de Seguridad y Cumplimiento',
      minutos: 12, minimo: 80, intentos: 3, generadaPor: 'IA · Gemini Pro', fecha: '2026-07-06',
      preguntas: [
        { q: '¿Qué medida es obligatoria antes de conectar una computadora personal (BYOD) a sistemas corporativos?', o: ['Ninguna, basta con tener antivirus', 'Cifrado de disco y bloqueo automático de pantalla activados', 'Solo avisar a IT por correo', 'Instalar cualquier antivirus gratuito'], r: 1, exp: 'La política de BYOD Computadores exige cifrado de disco, antivirus actualizado y bloqueo automático antes de conectarse a recursos corporativos.' },
        { q: '¿Quién puede instalar software en un equipo corporativo?', o: ['Cualquier colaborador, sin restricciones', 'Solo software del catálogo aprobado, o con solicitud formal', 'Solo el área de Finanzas', 'Solo los managers'], r: 1, exp: 'Control de Software y Hardware exige que solo se instale software aprobado por IT, salvo excepción justificada.' },
        { q: '¿Qué debe hacer un colaborador con un documento que clasifica como Confidencial?', o: ['Etiquetarlo visiblemente con su nivel de clasificación', 'No es necesario etiquetarlo si es de uso interno', 'Solo etiquetarlo si sale de la empresa', 'Etiquetarlo solo si lo pide el cliente'], r: 0, exp: 'Etiquetado de Datos e Información exige que todo documento lleve visible su nivel de clasificación.' },
        { q: 'Los bienes y servicios entregados por la organización son principalmente para:', o: ['Uso personal ilimitado', 'Uso laboral, con uso personal ocasional razonable', 'Reventa autorizada', 'Uso exclusivo fuera de horario laboral'], r: 1, exp: 'Uso correcto de bienes y servicios de la organización establece que son para fines laborales, con tolerancia razonable de uso personal ocasional.' },
        { q: 'Ante un incidente de seguridad de la información, ¿en qué plazo debe reportarse?', o: ['Dentro de las 24 horas siguientes a su detección', 'No es obligatorio reportarlo', 'Solo si afecta a un cliente', 'En la siguiente reunión de equipo'], r: 0, exp: 'Seguridad de la Información exige reportar todo incidente o sospecha dentro de las 24 horas de detectado; el reporte oportuno no es motivo de sanción.' },
        { q: '¿Qué software puede instalarse sin aprobación adicional?', o: ['Cualquiera, mientras sea gratuito', 'Únicamente el que está en el catálogo autorizado', 'Cualquiera si el colaborador lo justifica después', 'Solo el sistema operativo'], r: 1, exp: 'Software permitido define un catálogo autorizado por IT; cualquier excepción requiere solicitud formal.' }
      ]
    },
    {
      id: 'EV-ETP2', etapaId: 'ETP-2', titulo: 'Evaluación · Etapa 2: Políticas Fundamentales de Seguridad y Cumplimiento',
      minutos: 10, minimo: 80, intentos: 3, generadaPor: 'IA · Gemini Pro', fecha: '2026-07-20',
      preguntas: [
        { q: '¿Qué información NO puede ingresarse en una herramienta de Inteligencia Artificial?', o: ['Documentación pública de la empresa', 'Código de cliente bajo NDA, datos personales o información Restringida', 'Un temario de capacitación interno', 'Un texto ya publicado en el sitio web'], r: 1, exp: 'La política de Inteligencia Artificial prohíbe ingresar código bajo NDA, datos personales, credenciales o información clasificada.' },
        { q: '¿Puede usarse una cuenta personal de una herramienta de IA para tareas laborales?', o: ['Sí, si es la misma herramienta', 'No, solo cuentas corporativas del catálogo autorizado', 'Sí, fuera de horario laboral', 'Solo si el proyecto lo permite'], r: 1, exp: 'Solo pueden usarse herramientas de IA del catálogo corporativo, con cuenta corporativa.' },
        { q: '¿Cuál es uno de los requisitos mínimos de una contraseña corporativa?', o: ['6 caracteres numéricos', 'Al menos 14 caracteres combinando mayúsculas, minúsculas, números y símbolos', 'El nombre de usuario repetido', 'No tiene requisitos mínimos'], r: 1, exp: 'Protección de Contraseñas exige al menos 14 caracteres con combinación de tipos de carácter.' },
        { q: 'Un colaborador quiere copiar información Restringida a un USB personal. ¿Es correcto?', o: ['Sí, si el USB tiene contraseña', 'No, la información Restringida no puede copiarse a dispositivos personales', 'Sí, solo por esta vez', 'Depende del tamaño del archivo'], r: 1, exp: 'Uso de dispositivos de almacenamiento prohíbe copiar información Restringida a dispositivos personales bajo cualquier circunstancia.' },
        { q: 'El uso personal ocasional de la conexión a internet corporativa es:', o: ['Está totalmente prohibido', 'Tolerado si no compromete la seguridad ni el rendimiento de la red', 'Solo permitido a managers', 'Requiere aprobación previa cada vez'], r: 1, exp: 'Uso de internet permite un uso personal ocasional razonable, dentro de los límites de seguridad.' }
      ]
    },
    {
      id: 'EV-ETP3-ING', etapaId: 'ETP-3-ING', titulo: 'Evaluación Etapa Extra Engineering',
      minutos: 10, minimo: 80, intentos: 3, generadaPor: 'IA · Gemini Pro', fecha: '2026-08-06',
      preguntas: [
        { q: '¿Bajo qué principio debe diseñarse el software según Desarrollo Seguro?', o: ['Máximo privilegio para simplificar el desarrollo', 'Mínimo privilegio, validando toda entrada de datos', 'Sin restricciones de acceso en ambientes de prueba', 'Confiar en la validación del cliente'], r: 1, exp: 'Desarrollo Seguro exige diseñar bajo el principio de mínimo privilegio, validando toda entrada de datos.' },
        { q: '¿Qué debe hacerse con las librerías de terceros antes de incorporarlas a un proyecto?', o: ['Nada, se agregan directamente', 'Revisarlas por vulnerabilidades conocidas', 'Solo revisarlas si el cliente lo pide', 'Revisarlas una vez al año'], r: 1, exp: 'Desarrollo Seguro exige revisar las dependencias de terceros por vulnerabilidades antes de incorporarlas.' },
        { q: '¿Puede un colaborador de Ingeniería publicar una captura del código de un cliente en su portafolio personal?', o: ['Sí, es su trabajo', 'No, sin autorización escrita del cliente', 'Sí, si borra el logo del cliente', 'Solo si ya finalizó el proyecto'], r: 1, exp: 'Customer Engineering Confidential Information exige autorización escrita para divulgar cualquier detalle del proyecto de un cliente.' },
        { q: '¿Hasta cuándo se mantiene la confidencialidad de la información de un cliente?', o: ['Solo mientras dura el proyecto activo', 'Durante toda la relación con el cliente y de forma indefinida salvo autorización', 'Un mes después de finalizado el proyecto', 'No aplica si el colaborador ya no está en el proyecto'], r: 1, exp: 'La confidencialidad de la información del cliente se mantiene más allá de la duración del proyecto, salvo autorización escrita para divulgarla.' }
      ]
    },
    {
      id: 'EV-ETP3-ADM', etapaId: 'ETP-3-ADM', titulo: 'Evaluación Etapa Extra Administration',
      minutos: 10, minimo: 80, intentos: 3, generadaPor: 'IA · Gemini Pro', fecha: '2026-08-06',
      preguntas: [
        { q: '¿Quién es responsable de reportar daños o pérdida de un activo fijo asignado?', o: ['El área de Procurement, sin intervención del colaborador', 'El custodio del activo, es decir, el colaborador a quien está asignado', 'Nadie, se detecta en el inventario anual', 'Solo el manager del área'], r: 1, exp: 'Gestión de Activos Fijos asigna la custodia del activo a un responsable, quien debe reportar daños, pérdidas o cambios de ubicación.' },
        { q: '¿Qué se necesita para dar de baja un activo fijo?', o: ['Basta con dejar de usarlo', 'El formulario correspondiente y la aprobación de Procurement and Asset Control', 'Una llamada telefónica al área de TI', 'No requiere ningún trámite'], r: 1, exp: 'La baja de un activo requiere formulario y aprobación formal del área responsable.' },
        { q: '¿Con qué debe iniciarse toda solicitud de compra de bienes o servicios?', o: ['Con la orden de compra directamente', 'Con una solicitud formal que indique el bien, el monto estimado y la justificación', 'Con la entrega del bien por parte del proveedor', 'No se requiere solicitud si el monto es bajo'], r: 1, exp: 'Compra de bienes y servicios exige iniciar el proceso con una solicitud formal debidamente justificada.' },
        { q: '¿Qué determina cuántos niveles de aprobación necesita una compra?', o: ['El proveedor elegido', 'El monto de la compra', 'El día de la semana en que se solicita', 'El área que la solicita, sin importar el monto'], r: 1, exp: 'El manual de Compra de bienes y servicios define los niveles de aprobación según el monto de la compra.' }
      ]
    }
  ];

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

  /* ---------- Asignaciones del colaborador demo (Camila Rojas, área QA) ----------
     QA no es Ingeniería, así que su Etapa 3 es "Administrativos" (DOC-015, DOC-016).
     Ruta completa: Etapa 1 (7) + Etapa 2 (5) + Etapa 3 Administrativos (2) = 14 documentos. */
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
    { docId: 'DOC-015', estado: 'pendiente', confirmado: null,               vence: '2026-09-24', origen: 'Etapa 3 · Administrativos' },
    { docId: 'DOC-016', estado: 'pendiente', confirmado: null,               vence: '2026-09-24', origen: 'Etapa 3 · Administrativos' }
  ];

  const misEvaluaciones = [
    { evId: 'EV-ETP1', etapaId: 'ETP-1', estado: 'aprobada', puntaje: 88, fecha: '2026-09-09 15:41', intento: 1 },
    { evId: 'EV-ETP2', etapaId: 'ETP-2', estado: 'bloqueada', puntaje: null, fecha: null, intento: 0 },
    { evId: 'EV-ETP3-ADM', etapaId: 'ETP-3-ADM', estado: 'bloqueada', puntaje: null, fecha: null, intento: 0 }
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
    actividad, usuarios, misDocumentos, misEvaluaciones, chatbotKB
  };
})();



