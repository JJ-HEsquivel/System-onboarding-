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
    'Recursos Humanos',
    'Calidad y Procesos',
    'Legal y Cumplimiento',
    'Operaciones',
    'Salud y Seguridad'
  ];

  /* ---------- Documentos ---------- */
  // criticidad: alta | media | baja
  // estado: vigente | actualizado | en revision
  const documentos = [
    {
      id: 'DOC-001', codigo: 'POL-SEG-001', titulo: 'Política de Seguridad de la Información',
      categoria: 'Seguridad de la Información', version: '4.2', criticidad: 'alta', estado: 'actualizado',
      actualizado: '2026-09-02', propietario: 'Marcelo Antezana', paginas: 18, minutos: 22,
      areas: ['ENG', 'QA', 'PMO', 'HR', 'FIN', 'IT'], obligatorio: true,
      asignados: 248, leidos: 231, indiceError: 34, intentos: 412,
      resumen: 'Define los lineamientos corporativos para proteger la confidencialidad, integridad y disponibilidad de la información de Jalasoft y de sus clientes.',
      secciones: [
        { t: '1. Objetivo', p: 'Establecer los principios y controles que todo colaborador debe aplicar para proteger la información de la organización, de sus clientes y de terceros, en cualquier formato o medio en el que se encuentre.' },
        { t: '2. Alcance', p: 'Aplica a todos los colaboradores, contratistas, practicantes y proveedores que accedan a activos de información de Jalasoft, sin importar su ubicación física o modalidad de trabajo.' },
        { t: '3. Clasificación de la información', p: 'La información se clasifica en cuatro niveles: Pública, Interna, Confidencial y Restringida. Todo documento debe llevar su etiqueta de clasificación visible en el encabezado. La información Restringida solo puede compartirse mediante canales cifrados y con autorización expresa del propietario del activo.' },
        { t: '4. Gestión de credenciales', p: 'Las contraseñas deben tener al menos 14 caracteres, combinar mayúsculas, minúsculas, números y símbolos, y renovarse cada 90 días. El uso del gestor corporativo de contraseñas es obligatorio. Está prohibido compartir credenciales entre colaboradores, incluso de forma temporal.' },
        { t: '5. Segundo factor de autenticación', p: 'El doble factor (MFA) es obligatorio para el correo corporativo, la VPN, los repositorios de código y cualquier consola de administración en la nube. La pérdida del dispositivo de segundo factor debe reportarse dentro de las 2 horas siguientes.' },
        { t: '6. Escritorio y pantalla limpios', p: 'Al ausentarse del puesto de trabajo, la estación debe bloquearse. Los documentos impresos con clasificación Confidencial o Restringida no pueden permanecer sobre el escritorio fuera del horario laboral.' },
        { t: '7. Reporte de incidentes', p: 'Todo incidente o sospecha de incidente de seguridad debe reportarse al canal security@jalasoft.com dentro de las primeras 24 horas de detectado. El reporte oportuno nunca será motivo de sanción; la omisión sí.' },
        { t: '8. Uso aceptable de activos', p: 'Los equipos entregados por la organización son para uso laboral. Está prohibido instalar software sin licencia, deshabilitar el antivirus o conectar dispositivos de almacenamiento no autorizados.' },
        { t: '9. Incumplimiento', p: 'El incumplimiento de esta política puede derivar en medidas disciplinarias conforme al Reglamento Interno de Trabajo y, según la gravedad, en acciones legales.' }
      ],
      cambios: [
        { v: '4.2', fecha: '2026-09-02', nivel: 'mayor', detalle: 'Se incorpora MFA obligatorio para consolas cloud y se reduce a 2 horas el plazo de reporte por pérdida del segundo factor.' },
        { v: '4.1', fecha: '2026-04-18', nivel: 'menor', detalle: 'Ajuste de redacción en la sección de clasificación de la información.' },
        { v: '4.0', fecha: '2025-11-05', nivel: 'mayor', detalle: 'Se eleva la longitud mínima de contraseña de 10 a 14 caracteres.' }
      ]
    },
    {
      id: 'DOC-002', codigo: 'POL-RH-014', titulo: 'Reglamento Interno de Trabajo',
      categoria: 'Recursos Humanos', version: '3.0', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-06-20', propietario: 'Lorena Vargas', paginas: 26, minutos: 30,
      areas: ['ENG', 'QA', 'PMO', 'HR', 'FIN', 'IT'], obligatorio: true,
      asignados: 248, leidos: 244, indiceError: 12, intentos: 396,
      resumen: 'Regula la relación laboral, los horarios, permisos, licencias y el régimen disciplinario aplicable a todos los colaboradores.',
      secciones: [
        { t: '1. Jornada laboral', p: 'La jornada ordinaria es de 8 horas diarias con flexibilidad de ingreso entre 07:30 y 09:30, respetando la franja de colaboración de 10:00 a 16:00 en la que todo el equipo debe estar disponible.' },
        { t: '2. Registro de asistencia', p: 'El registro se realiza en la plataforma corporativa. La omisión reiterada del registro se considera falta leve y se notifica al Manager directo.' },
        { t: '3. Permisos y licencias', p: 'Las solicitudes de permiso deben ingresarse con al menos 48 horas de anticipación, salvo emergencias médicas debidamente justificadas dentro de las 24 horas posteriores.' },
        { t: '4. Vacaciones', p: 'El colaborador acumula días de vacación conforme a la normativa vigente. La programación se acuerda con el Manager y no puede postergarse más de dos gestiones consecutivas.' },
        { t: '5. Trabajo remoto', p: 'La modalidad híbrida requiere al menos dos días presenciales por semana en las oficinas asignadas, salvo acuerdo contractual distinto.' },
        { t: '6. Régimen disciplinario', p: 'Las faltas se clasifican en leves, graves y muy graves. Toda medida disciplinaria se comunica por escrito y queda registrada en el legajo del colaborador.' }
      ],
      cambios: [
        { v: '3.0', fecha: '2026-06-20', nivel: 'mayor', detalle: 'Se formaliza la franja de colaboración 10:00–16:00 y el mínimo de dos días presenciales.' }
      ]
    },
    {
      id: 'DOC-003', codigo: 'POL-ETI-002', titulo: 'Código de Ética y Conducta',
      categoria: 'Legal y Cumplimiento', version: '2.5', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-03-11', propietario: 'Andrés Claros', paginas: 14, minutos: 18,
      areas: ['ENG', 'QA', 'PMO', 'HR', 'FIN', 'IT'], obligatorio: true,
      asignados: 248, leidos: 240, indiceError: 19, intentos: 358,
      resumen: 'Establece los principios de integridad, transparencia y respeto que rigen la conducta de todos los colaboradores dentro y fuera de la organización.',
      secciones: [
        { t: '1. Principios rectores', p: 'Integridad, respeto, transparencia, responsabilidad y compromiso con el cliente son los cinco principios que orientan toda decisión profesional dentro de la organización.' },
        { t: '2. Conflicto de intereses', p: 'Todo colaborador debe declarar cualquier situación que pueda comprometer su objetividad, incluyendo relaciones comerciales o familiares con proveedores, clientes o competidores.' },
        { t: '3. Antisoborno y regalos', p: 'No se aceptan regalos, invitaciones o beneficios cuyo valor supere los USD 50 o que puedan interpretarse como una forma de influir en una decisión comercial.' },
        { t: '4. Canal de denuncias', p: 'El canal ética@jalasoft.com garantiza confidencialidad y no represalias. Las denuncias pueden presentarse de forma anónima y son investigadas por el Comité de Ética.' },
        { t: '5. Respeto y no discriminación', p: 'Se prohíbe toda forma de acoso, discriminación o trato degradante por razones de género, origen, religión, orientación, edad o discapacidad.' }
      ],
      cambios: [
        { v: '2.5', fecha: '2026-03-11', nivel: 'menor', detalle: 'Actualización del umbral de regalos y del procedimiento de denuncia anónima.' }
      ]
    },
    {
      id: 'DOC-004', codigo: 'PRO-CAL-007', titulo: 'Procedimiento de Control de Calidad de Entregables',
      categoria: 'Calidad y Procesos', version: '5.1', criticidad: 'alta', estado: 'en revision',
      actualizado: '2026-08-28', propietario: 'Gabriela Rocha', paginas: 21, minutos: 25,
      areas: ['ENG', 'QA', 'PMO'], obligatorio: true,
      asignados: 164, leidos: 141, indiceError: 41, intentos: 288,
      resumen: 'Define las etapas de verificación, criterios de aceptación y registros obligatorios para la liberación de entregables a cliente.',
      secciones: [
        { t: '1. Etapas de control', p: 'Todo entregable atraviesa cuatro etapas: revisión por pares, validación funcional, verificación de criterios de aceptación y aprobación formal del Quality Lead.' },
        { t: '2. Criterios de aceptación', p: 'Un entregable solo se libera si cumple el 100% de los criterios acordados con el cliente y no registra defectos de severidad crítica o alta abiertos.' },
        { t: '3. Registro de evidencias', p: 'Cada etapa genera evidencia trazable: acta de revisión, reporte de pruebas y checklist firmado. Las evidencias se conservan por 36 meses.' },
        { t: '4. Defectos y reproceso', p: 'Un defecto crítico detectado después de la liberación activa el procedimiento de acción correctiva dentro de las 48 horas siguientes.' },
        { t: '5. Indicadores', p: 'Se monitorean tres indicadores: densidad de defectos, tasa de reproceso y cumplimiento de fechas comprometidas.' }
      ],
      cambios: [
        { v: '5.1', fecha: '2026-08-28', nivel: 'mayor', detalle: 'Se agrega la verificación obligatoria de criterios de aceptación como etapa independiente y se define el plazo de 48 horas para acción correctiva.' },
        { v: '5.0', fecha: '2026-01-22', nivel: 'mayor', detalle: 'Reestructuración completa del procedimiento en cuatro etapas.' }
      ]
    },
    {
      id: 'DOC-005', codigo: 'POL-SEG-009', titulo: 'Política de Uso de Inteligencia Artificial',
      categoria: 'Seguridad de la Información', version: '1.3', criticidad: 'alta', estado: 'actualizado',
      actualizado: '2026-09-08', propietario: 'Marcelo Antezana', paginas: 11, minutos: 14,
      areas: ['ENG', 'QA', 'PMO', 'IT'], obligatorio: true,
      asignados: 186, leidos: 122, indiceError: 47, intentos: 174,
      resumen: 'Regula el uso de herramientas de inteligencia artificial generativa en proyectos internos y de cliente.',
      secciones: [
        { t: '1. Herramientas autorizadas', p: 'Solo pueden utilizarse las herramientas listadas en el catálogo corporativo de IA. El uso de cuentas personales para tareas laborales está prohibido.' },
        { t: '2. Información que no puede compartirse', p: 'Queda prohibido ingresar en herramientas de IA: código fuente de cliente bajo NDA, datos personales, credenciales, información financiera no pública y documentación clasificada como Restringida.' },
        { t: '3. Revisión humana', p: 'Todo resultado generado por IA que se incorpore a un entregable debe ser revisado y validado por un colaborador responsable. La IA no sustituye la responsabilidad profesional.' },
        { t: '4. Trazabilidad', p: 'Debe declararse el uso de IA en los entregables cuando el contrato con el cliente así lo exija.' },
        { t: '5. Propiedad intelectual', p: 'El contenido generado con asistencia de IA se rige por las mismas cláusulas de propiedad intelectual que cualquier otro entregable del proyecto.' }
      ],
      cambios: [
        { v: '1.3', fecha: '2026-09-08', nivel: 'mayor', detalle: 'Se prohíbe explícitamente el uso de cuentas personales y se incorpora la obligación de declarar el uso de IA ante el cliente.' },
        { v: '1.2', fecha: '2026-05-30', nivel: 'menor', detalle: 'Ampliación del catálogo de herramientas autorizadas.' }
      ]
    },
    {
      id: 'DOC-006', codigo: 'PRO-OPE-011', titulo: 'Procedimiento de Gestión de Accesos',
      categoria: 'Operaciones', version: '2.8', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-07-14', propietario: 'Ruth Peñaranda', paginas: 9, minutos: 12,
      areas: ['IT', 'ENG', 'QA'], obligatorio: true,
      asignados: 152, leidos: 139, indiceError: 22, intentos: 241,
      resumen: 'Describe el ciclo de alta, modificación y baja de accesos a sistemas corporativos y de cliente.',
      secciones: [
        { t: '1. Solicitud de acceso', p: 'Todo acceso se solicita mediante ticket, con aprobación del Manager y del propietario del sistema. No existen accesos concedidos verbalmente.' },
        { t: '2. Principio de mínimo privilegio', p: 'Se otorga únicamente el nivel de acceso necesario para ejecutar las funciones del rol. Los accesos administrativos requieren justificación adicional.' },
        { t: '3. Revisión periódica', p: 'Cada trimestre se ejecuta una revisión de accesos. Los accesos sin uso durante 60 días se revocan automáticamente.' },
        { t: '4. Baja de colaboradores', p: 'La revocación de accesos se ejecuta el mismo día de la desvinculación, antes del cierre de la jornada.' }
      ],
      cambios: [{ v: '2.8', fecha: '2026-07-14', nivel: 'menor', detalle: 'Se reduce de 90 a 60 días el umbral de revocación automática.' }]
    },
    {
      id: 'DOC-007', codigo: 'POL-SSO-003', titulo: 'Política de Salud y Seguridad Ocupacional',
      categoria: 'Salud y Seguridad', version: '1.9', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-02-09', propietario: 'Lorena Vargas', paginas: 12, minutos: 15,
      areas: ['ENG', 'QA', 'PMO', 'HR', 'FIN', 'IT'], obligatorio: true,
      asignados: 248, leidos: 229, indiceError: 15, intentos: 302,
      resumen: 'Establece las medidas de prevención, evacuación y ergonomía aplicables en las instalaciones de la organización.',
      secciones: [
        { t: '1. Rutas de evacuación', p: 'Cada piso cuenta con dos rutas señalizadas y un punto de encuentro externo. Los simulacros se realizan semestralmente y la participación es obligatoria.' },
        { t: '2. Ergonomía', p: 'La pantalla debe ubicarse a la altura de los ojos y a un brazo de distancia. Se recomienda una pausa activa de 5 minutos por cada hora de trabajo continuo.' },
        { t: '3. Reporte de accidentes', p: 'Todo accidente o incidente debe reportarse al área de People & Culture dentro de las 24 horas, incluso si no hubo lesión.' },
        { t: '4. Brigadas', p: 'Las brigadas de primeros auxilios, evacuación y contra incendios están identificadas con distintivo visible en cada piso.' }
      ],
      cambios: [{ v: '1.9', fecha: '2026-02-09', nivel: 'menor', detalle: 'Actualización de los puntos de encuentro por remodelación del edificio.' }]
    },
    {
      id: 'DOC-008', codigo: 'POL-LEG-005', titulo: 'Acuerdo de Confidencialidad y Manejo de NDA',
      categoria: 'Legal y Cumplimiento', version: '3.4', criticidad: 'alta', estado: 'vigente',
      actualizado: '2026-05-16', propietario: 'Andrés Claros', paginas: 8, minutos: 10,
      areas: ['ENG', 'QA', 'PMO', 'FIN'], obligatorio: true,
      asignados: 201, leidos: 195, indiceError: 26, intentos: 289,
      resumen: 'Detalla las obligaciones de confidencialidad frente a clientes y el tratamiento de información sujeta a NDA.',
      secciones: [
        { t: '1. Alcance de la confidencialidad', p: 'La obligación de confidencialidad se mantiene vigente durante la relación laboral y por cinco años posteriores a su finalización.' },
        { t: '2. Información de cliente', p: 'El código fuente, la documentación técnica y los datos de negocio del cliente no pueden almacenarse en repositorios personales ni en servicios no autorizados.' },
        { t: '3. Publicaciones y redes sociales', p: 'No se puede mencionar el nombre del cliente, mostrar capturas de sus sistemas ni divulgar detalles del proyecto sin autorización escrita.' },
        { t: '4. Devolución de información', p: 'Al finalizar el proyecto o la relación laboral, toda la información del cliente debe devolverse o eliminarse de forma verificable.' }
      ],
      cambios: [{ v: '3.4', fecha: '2026-05-16', nivel: 'menor', detalle: 'Precisión sobre el uso de capturas de pantalla en redes sociales.' }]
    },
    {
      id: 'DOC-009', codigo: 'PRO-CAL-012', titulo: 'Gestión de No Conformidades y Acciones Correctivas',
      categoria: 'Calidad y Procesos', version: '2.2', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-04-03', propietario: 'Gabriela Rocha', paginas: 15, minutos: 19,
      areas: ['QA', 'PMO'], obligatorio: false,
      asignados: 78, leidos: 64, indiceError: 38, intentos: 121,
      resumen: 'Procedimiento para registrar, analizar y cerrar no conformidades detectadas en auditorías internas o externas.',
      secciones: [
        { t: '1. Registro', p: 'Toda no conformidad se registra en el sistema con evidencia objetiva, responsable asignado y fecha compromiso de cierre.' },
        { t: '2. Análisis de causa raíz', p: 'Se utiliza la técnica de los 5 porqués o el diagrama de Ishikawa. No se acepta un cierre sin análisis documentado.' },
        { t: '3. Verificación de eficacia', p: 'La acción correctiva se verifica a los 60 días de implementada. Si la causa persiste, la no conformidad se reabre.' }
      ],
      cambios: [{ v: '2.2', fecha: '2026-04-03', nivel: 'menor', detalle: 'Se incorpora el diagrama de Ishikawa como técnica válida.' }]
    },
    {
      id: 'DOC-010', codigo: 'GUI-ONB-001', titulo: 'Guía de Bienvenida a Jalasoft',
      categoria: 'Recursos Humanos', version: '6.0', criticidad: 'baja', estado: 'vigente',
      actualizado: '2026-08-01', propietario: 'Lorena Vargas', paginas: 10, minutos: 12,
      areas: ['ENG', 'QA', 'PMO', 'HR', 'FIN', 'IT'], obligatorio: true,
      asignados: 248, leidos: 246, indiceError: 6, intentos: 251,
      resumen: 'Presenta la historia, la estructura organizacional, los beneficios y los canales internos de la organización.',
      secciones: [
        { t: '1. Quiénes somos', p: 'Jalasoft es una compañía de desarrollo de software con operaciones en Bolivia y Estados Unidos, enfocada en construir equipos de alto rendimiento para clientes globales.' },
        { t: '2. Estructura organizacional', p: 'La organización se articula en unidades de negocio con áreas transversales de soporte: People & Culture, Quality Control Processes & General Services, Finance e IT.' },
        { t: '3. Beneficios', p: 'Seguro de salud complementario, plan de capacitación continua, apoyo en certificaciones internacionales y programa de bienestar.' },
        { t: '4. Canales internos', p: 'El portal del colaborador, el canal de anuncios y la mesa de ayuda concentran la comunicación oficial de la organización.' }
      ],
      cambios: [{ v: '6.0', fecha: '2026-08-01', nivel: 'mayor', detalle: 'Actualización de la estructura organizacional y del catálogo de beneficios.' }]
    },
    {
      id: 'DOC-011', codigo: 'PRO-ENG-021', titulo: 'Estándares de Desarrollo y Revisión de Código',
      categoria: 'Calidad y Procesos', version: '4.5', criticidad: 'media', estado: 'vigente',
      actualizado: '2026-07-29', propietario: 'Iván Suárez', paginas: 24, minutos: 28,
      areas: ['ENG', 'QA'], obligatorio: true,
      asignados: 132, leidos: 118, indiceError: 29, intentos: 208,
      resumen: 'Convenciones de código, política de ramas, criterios de revisión por pares y cobertura mínima de pruebas.',
      secciones: [
        { t: '1. Política de ramas', p: 'Se trabaja con ramas de funcionalidad de vida corta. Ninguna rama puede permanecer abierta más de cinco días hábiles sin integrarse.' },
        { t: '2. Revisión por pares', p: 'Toda solicitud de integración requiere al menos dos aprobaciones, una de ellas de un desarrollador senior del proyecto.' },
        { t: '3. Cobertura de pruebas', p: 'La cobertura mínima de pruebas unitarias es del 80% en los módulos de lógica de negocio.' },
        { t: '4. Secretos en el repositorio', p: 'Está prohibido versionar credenciales, tokens o cadenas de conexión. El análisis automático bloquea la integración si detecta secretos.' }
      ],
      cambios: [{ v: '4.5', fecha: '2026-07-29', nivel: 'menor', detalle: 'Se eleva la cobertura mínima del 70% al 80%.' }]
    },
    {
      id: 'DOC-012', codigo: 'POL-FIN-004', titulo: 'Política de Gastos y Rendición de Cuentas',
      categoria: 'Operaciones', version: '2.1', criticidad: 'baja', estado: 'vigente',
      actualizado: '2026-01-19', propietario: 'Patricia Nogales', paginas: 7, minutos: 9,
      areas: ['FIN', 'PMO', 'HR'], obligatorio: false,
      asignados: 64, leidos: 58, indiceError: 17, intentos: 88,
      resumen: 'Define los límites, comprobantes y plazos para la rendición de gastos corporativos y viáticos.',
      secciones: [
        { t: '1. Plazos de rendición', p: 'Los gastos se rinden dentro de los 10 días hábiles posteriores al desembolso, con comprobante válido.' },
        { t: '2. Viáticos', p: 'Los viáticos se calculan por destino según la tabla vigente y requieren aprobación previa del Manager.' },
        { t: '3. Gastos no reembolsables', p: 'No se reembolsan multas, consumos personales ni gastos sin respaldo documentario.' }
      ],
      cambios: [{ v: '2.1', fecha: '2026-01-19', nivel: 'menor', detalle: 'Actualización de la tabla de viáticos.' }]
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

  /* ---------- Evaluaciones (banco de preguntas generado por IA) ---------- */
  const evaluaciones = [
    {
      id: 'EV-101', docId: 'DOC-001', titulo: 'Evaluación · Política de Seguridad de la Información',
      minutos: 10, minimo: 80, intentos: 3, generadaPor: 'IA · Gemini Pro', fecha: '2026-09-03',
      preguntas: [
        { q: '¿Cuál es la longitud mínima exigida para las contraseñas corporativas?', o: ['8 caracteres', '10 caracteres', '14 caracteres', '20 caracteres'], r: 2, exp: 'La sección 4 establece una longitud mínima de 14 caracteres con combinación de mayúsculas, minúsculas, números y símbolos.' },
        { q: 'Ante la pérdida del dispositivo de segundo factor, ¿en qué plazo debe reportarse?', o: ['Dentro de 2 horas', 'Dentro de 24 horas', 'Dentro de 48 horas', 'Al siguiente día hábil'], r: 0, exp: 'La versión 4.2 redujo el plazo a 2 horas desde la detección de la pérdida.' },
        { q: '¿Cuántos niveles de clasificación de la información define la política?', o: ['Dos', 'Tres', 'Cuatro', 'Cinco'], r: 2, exp: 'Son cuatro: Pública, Interna, Confidencial y Restringida.' },
        { q: 'Un compañero le pide su contraseña para resolver una urgencia mientras está de viaje. ¿Qué corresponde hacer?', o: ['Compartirla solo por esta vez', 'Compartirla por un canal cifrado', 'Negarse y escalar la solicitud de acceso al Manager', 'Cambiarla después de compartirla'], r: 2, exp: 'Compartir credenciales está prohibido incluso de forma temporal. El acceso debe gestionarse por el procedimiento formal.' },
        { q: '¿Cuál es el plazo máximo para reportar un incidente de seguridad?', o: ['2 horas', '24 horas', '72 horas', 'Una semana'], r: 1, exp: 'La sección 7 fija 24 horas desde la detección, y aclara que el reporte oportuno no es motivo de sanción.' }
      ]
    },
    {
      id: 'EV-102', docId: 'DOC-005', titulo: 'Evaluación · Política de Uso de Inteligencia Artificial',
      minutos: 8, minimo: 80, intentos: 3, generadaPor: 'IA · Gemini Pro', fecha: '2026-09-09',
      preguntas: [
        { q: '¿Qué información NO puede ingresarse en una herramienta de IA generativa?', o: ['Documentación pública de la empresa', 'Código fuente de cliente bajo NDA', 'Texto de un artículo periodístico', 'Un temario de capacitación interno'], r: 1, exp: 'La sección 2 prohíbe ingresar código bajo NDA, datos personales, credenciales e información Restringida.' },
        { q: '¿Puede utilizarse una cuenta personal de una herramienta de IA para tareas laborales?', o: ['Sí, si es la misma herramienta', 'Sí, con aviso al Manager', 'No, solo cuentas corporativas del catálogo autorizado', 'Solo fuera del horario laboral'], r: 2, exp: 'La versión 1.3 prohíbe explícitamente el uso de cuentas personales para tareas laborales.' },
        { q: 'Un resultado generado por IA que se incorpora a un entregable...', o: ['Puede usarse directamente si el modelo es confiable', 'Debe ser revisado y validado por un responsable humano', 'Requiere aprobación del cliente siempre', 'No puede incorporarse bajo ninguna circunstancia'], r: 1, exp: 'La IA no sustituye la responsabilidad profesional: toda salida requiere revisión humana.' },
        { q: '¿Cuándo debe declararse el uso de IA ante el cliente?', o: ['Nunca', 'Siempre, en todos los proyectos', 'Cuando el contrato lo exija', 'Solo si el cliente pregunta'], r: 2, exp: 'La trazabilidad se declara cuando el contrato con el cliente lo establece.' },
        { q: 'El contenido generado con asistencia de IA, en términos de propiedad intelectual...', o: ['Es de dominio público', 'Pertenece al proveedor de la herramienta', 'Se rige por las mismas cláusulas que cualquier entregable', 'No tiene protección'], r: 2, exp: 'La sección 5 lo equipara a cualquier otro entregable del proyecto.' }
      ]
    },
    {
      id: 'EV-103', docId: 'DOC-004', titulo: 'Evaluación · Control de Calidad de Entregables',
      minutos: 10, minimo: 80, intentos: 3, generadaPor: 'IA · Gemini Pro', fecha: '2026-08-29',
      preguntas: [
        { q: '¿Cuántas etapas de control atraviesa un entregable antes de su liberación?', o: ['Dos', 'Tres', 'Cuatro', 'Cinco'], r: 2, exp: 'Revisión por pares, validación funcional, verificación de criterios de aceptación y aprobación del Quality Lead.' },
        { q: 'Un entregable con un defecto de severidad alta abierto...', o: ['Puede liberarse con autorización del PM', 'No puede liberarse', 'Se libera y se corrige después', 'Depende del cliente'], r: 1, exp: 'Los criterios de aceptación exigen cero defectos críticos o altos abiertos.' },
        { q: '¿Por cuánto tiempo se conservan las evidencias de control de calidad?', o: ['12 meses', '24 meses', '36 meses', 'Indefinidamente'], r: 2, exp: 'La sección 3 establece una conservación de 36 meses.' },
        { q: 'Ante un defecto crítico detectado después de la liberación, la acción correctiva debe activarse en:', o: ['24 horas', '48 horas', '5 días hábiles', 'La siguiente iteración'], r: 1, exp: 'La versión 5.1 fija el plazo en 48 horas.' },
        { q: '¿Cuál de estos NO es un indicador monitoreado por el procedimiento?', o: ['Densidad de defectos', 'Tasa de reproceso', 'Cumplimiento de fechas comprometidas', 'Rotación de personal'], r: 3, exp: 'La rotación de personal no forma parte de los indicadores del procedimiento de calidad.' }
      ]
    },
    {
      id: 'EV-104', docId: 'DOC-002', titulo: 'Evaluación · Reglamento Interno de Trabajo',
      minutos: 8, minimo: 80, intentos: 3, generadaPor: 'IA · Gemini Pro', fecha: '2026-06-21',
      preguntas: [
        { q: '¿Cuál es la franja horaria de colaboración obligatoria?', o: ['08:00 a 14:00', '09:00 a 15:00', '10:00 a 16:00', '11:00 a 17:00'], r: 2, exp: 'La versión 3.0 formalizó la franja de 10:00 a 16:00.' },
        { q: 'Un permiso planificado debe solicitarse con una anticipación mínima de:', o: ['24 horas', '48 horas', '72 horas', 'Una semana'], r: 1, exp: 'La sección 3 exige 48 horas, salvo emergencias médicas justificadas.' },
        { q: 'En modalidad híbrida, el mínimo de días presenciales por semana es:', o: ['Uno', 'Dos', 'Tres', 'No hay mínimo'], r: 1, exp: 'Se requieren al menos dos días presenciales semanales.' },
        { q: '¿En cuántas categorías se clasifican las faltas disciplinarias?', o: ['Dos', 'Tres', 'Cuatro', 'Cinco'], r: 1, exp: 'Leves, graves y muy graves.' },
        { q: 'Las vacaciones no pueden postergarse más de:', o: ['Una gestión', 'Dos gestiones consecutivas', 'Tres gestiones', 'No hay límite'], r: 1, exp: 'La sección 4 establece un máximo de dos gestiones consecutivas.' }
      ]
    }
  ];

  /* ---------- Campañas de micro aprendizaje ---------- */
  const campanas = [
    { id: 'MA-21', nombre: 'Phishing y correo seguro', enfoque: 'Refuerzo de brecha', docId: 'DOC-001', periodicidad: 'Semanal', audiencia: 'Toda la organización', alcance: 248, respuesta: 82, acierto: 74, estado: 'activa', proxima: '2026-09-18' },
    { id: 'MA-22', nombre: 'Uso responsable de IA', enfoque: 'Documento actualizado', docId: 'DOC-005', periodicidad: 'Quincenal', audiencia: 'Engineering, QA, PMO, IT', alcance: 186, respuesta: 68, acierto: 61, estado: 'activa', proxima: '2026-09-17' },
    { id: 'MA-23', nombre: 'Criterios de aceptación', enfoque: 'Refuerzo de brecha', docId: 'DOC-004', periodicidad: 'Semanal', audiencia: 'Engineering, QA, PMO', alcance: 164, respuesta: 77, acierto: 66, estado: 'activa', proxima: '2026-09-16' },
    { id: 'MA-24', nombre: 'Confidencialidad con clientes', enfoque: 'Concientización', docId: 'DOC-008', periodicidad: 'Mensual', audiencia: 'Engineering, QA, PMO, Finance', alcance: 201, respuesta: 71, acierto: 79, estado: 'activa', proxima: '2026-09-30' },
    { id: 'MA-25', nombre: 'Gestión de accesos', enfoque: 'Concientización', docId: 'DOC-006', periodicidad: 'Mensual', audiencia: 'IT, Engineering, QA', alcance: 152, respuesta: 64, acierto: 83, estado: 'pausada', proxima: '—' },
    { id: 'MA-26', nombre: 'Ergonomía y pausas activas', enfoque: 'Bienestar', docId: 'DOC-007', periodicidad: 'Quincenal', audiencia: 'Toda la organización', alcance: 248, respuesta: 59, acierto: 88, estado: 'borrador', proxima: '—' }
  ];

  /* ---------- Píldoras diarias del colaborador ---------- */
  const pildoras = [
    { id: 'P-1', campana: 'MA-21', doc: 'DOC-001', q: 'Recibe un correo de un remitente desconocido con un archivo adjunto .zip que dice ser una factura. ¿Qué hace?', o: ['Abrirlo para verificar', 'Reenviarlo al equipo', 'Reportarlo a security@jalasoft.com sin abrirlo', 'Eliminarlo sin reportar'], r: 2, exp: 'Reportar sin abrir permite al equipo de seguridad bloquear la campaña para toda la organización.', estado: 'pendiente' },
    { id: 'P-2', campana: 'MA-22', doc: 'DOC-005', q: 'Necesita resumir un documento de arquitectura del cliente. ¿Qué herramienta puede usar?', o: ['Cualquier herramienta gratuita', 'Una herramienta del catálogo corporativo autorizado', 'Su cuenta personal de IA', 'Ninguna, está prohibido resumir'], r: 1, exp: 'Solo herramientas del catálogo corporativo, y siempre respetando qué información no puede compartirse.', estado: 'pendiente' },
    { id: 'P-3', campana: 'MA-23', doc: 'DOC-004', q: 'El cliente aprueba verbalmente un entregable con dos criterios de aceptación pendientes. ¿Procede la liberación?', o: ['Sí, la aprobación verbal basta', 'No, deben cumplirse el 100% de los criterios', 'Sí, si el PM lo autoriza', 'Depende de la severidad'], r: 1, exp: 'La liberación exige el 100% de criterios cumplidos y evidencia documentada.', estado: 'pendiente' },
    { id: 'P-4', campana: 'MA-24', doc: 'DOC-008', q: '¿Puede publicar una captura de pantalla del tablero del proyecto en redes sociales?', o: ['Sí, si oculta el logo', 'Sí, es contenido propio', 'No, sin autorización escrita', 'Solo en perfiles privados'], r: 2, exp: 'Toda mención o imagen del cliente requiere autorización escrita previa.', estado: 'completada', acierto: true },
    { id: 'P-5', campana: 'MA-21', doc: 'DOC-001', q: 'Al retirarse de su escritorio por cinco minutos, ¿qué debe hacer con su equipo?', o: ['Dejarlo abierto, es poco tiempo', 'Bloquear la sesión', 'Apagarlo completamente', 'Cerrar solo el correo'], r: 1, exp: 'La política de escritorio y pantalla limpios exige bloquear la sesión en toda ausencia.', estado: 'completada', acierto: true }
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
      { doc: 'Política de Uso de IA', tema: 'Información que no puede compartirse', error: 47, afectados: 64, tendencia: 'sube' },
      { doc: 'Control de Calidad de Entregables', tema: 'Criterios de aceptación', error: 41, afectados: 52, tendencia: 'sube' },
      { doc: 'Gestión de No Conformidades', tema: 'Análisis de causa raíz', error: 38, afectados: 24, tendencia: 'estable' },
      { doc: 'Política de Seguridad', tema: 'Clasificación de la información', error: 34, afectados: 71, tendencia: 'baja' },
      { doc: 'Estándares de Desarrollo', tema: 'Cobertura mínima de pruebas', error: 29, afectados: 33, tendencia: 'estable' },
      { doc: 'Acuerdo de Confidencialidad', tema: 'Publicaciones en redes sociales', error: 26, afectados: 41, tendencia: 'baja' }
    ]
  };

  /* ---------- Sugerencias de la IA JJ ---------- */
  const sugerenciasIA = [
    { t: 'Reforzar “Información que no puede compartirse”', d: 'El 47% de los errores de la Política de Uso de IA se concentra en la sección 2. Sugerimos una campaña semanal de 3 píldoras dirigida a Engineering y QA.', impacto: 'alto', accion: 'Crear campaña' },
    { t: 'Reescribir el criterio de liberación', d: 'La pregunta sobre defectos de severidad alta tiene 41% de error. La redacción de la sección 2 admite dos lecturas; se sugiere precisarla.', impacto: 'alto', accion: 'Notificar a Gabriela Rocha' },
    { t: 'Dividir la lectura del Reglamento Interno', d: 'El documento tiene 26 páginas y una tasa de abandono del 22% en la primera lectura. Sugerimos dividirlo en tres módulos de lectura.', impacto: 'medio', accion: 'Ajustar ruta' },
    { t: 'Adelantar la fase 3 de Valeria Menacho', d: 'Completó la lectura documental 4 días antes del plazo con 92% de acierto. Puede habilitarse su documentación específica.', impacto: 'bajo', accion: 'Habilitar fase' }
  ];

  /* ---------- Actividad reciente ---------- */
  const actividad = [
    { h: '08:12', t: 'El sistema escaló a Iván Suárez el caso de Rodrigo Ferrufino', tipo: 'sistema' },
    { h: '08:03', t: 'Camila Rojas confirmó la lectura de Código de Ética y Conducta v2.5', tipo: 'lectura' },
    { h: '07:41', t: 'La IA generó 5 preguntas para Política de Uso de IA v1.3', tipo: 'ia' },
    { h: '07:00', t: 'Se enviaron 64 recordatorios de lectura pendiente', tipo: 'sistema' },
    { h: 'Ayer',  t: 'Andrea Suárez reprobó la evaluación de Control de Calidad (58%)', tipo: 'evaluacion' },
    { h: 'Ayer',  t: 'Marcelo Antezana publicó la versión 4.2 de la Política de Seguridad', tipo: 'documento' },
    { h: 'Ayer',  t: 'Alejandra Mercado completó su ruta de inducción', tipo: 'hito' }
  ];

  /* ---------- Usuarios de la demostración ---------- */
  const usuarios = [
    { id: 'U-ADM', rol: 'admin',       nombre: 'Marcelo Antezana', cargo: 'Quality Control Processes Lead', area: 'QA', correo: 'marcelo.antezana@jalasoft.com' },
    { id: 'U-MGR', rol: 'manager',     nombre: 'Iván Suárez',      cargo: 'Engineering Manager',            area: 'ENG', correo: 'ivan.suarez@jalasoft.com' },
    { id: 'U-COL', rol: 'colaborador', nombre: 'Camila Rojas',     cargo: 'QA Engineer',                    area: 'QA', correo: 'camila.rojas@jalasoft.com', colaboradorId: 'C-1001' }
  ];

  /* ---------- Asignaciones del colaborador demo (Camila Rojas) ---------- */
  const misDocumentos = [
    { docId: 'DOC-010', estado: 'leido',     confirmado: '2026-09-08 09:14', vence: '2026-09-09', origen: 'Ruta base' },
    { docId: 'DOC-002', estado: 'leido',     confirmado: '2026-09-09 11:02', vence: '2026-09-11', origen: 'Ruta base' },
    { docId: 'DOC-003', estado: 'leido',     confirmado: '2026-09-16 08:03', vence: '2026-09-16', origen: 'Ruta base' },
    { docId: 'DOC-001', estado: 'pendiente', confirmado: null,               vence: '2026-09-18', origen: 'Ruta base' },
    { docId: 'DOC-005', estado: 'pendiente', confirmado: null,               vence: '2026-09-19', origen: 'Actualización v1.3' },
    { docId: 'DOC-004', estado: 'pendiente', confirmado: null,               vence: '2026-09-22', origen: 'Asignado por Manager' },
    { docId: 'DOC-007', estado: 'leido',     confirmado: '2026-09-10 16:40', vence: '2026-09-12', origen: 'Ruta base' }
  ];

  const misEvaluaciones = [
    { evId: 'EV-104', estado: 'aprobada', puntaje: 88, fecha: '2026-09-12 15:41', intento: 1 },
    { evId: 'EV-101', estado: 'pendiente', puntaje: null, fecha: null, intento: 0 },
    { evId: 'EV-102', estado: 'pendiente', puntaje: null, fecha: null, intento: 0 },
    { evId: 'EV-103', estado: 'bloqueada', puntaje: null, fecha: null, intento: 0 }
  ];

  /* ---------- Base de conocimiento del asistente ---------- */
  const chatbotKB = [
    { k: ['contraseña', 'password', 'clave', 'credencial'], r: 'La Política de Seguridad de la Información (v4.2, sección 4) exige contraseñas de al menos 14 caracteres, con mayúsculas, minúsculas, números y símbolos, renovadas cada 90 días. El gestor corporativo de contraseñas es obligatorio y compartir credenciales está prohibido, incluso de forma temporal.', f: 'DOC-001' },
    { k: ['mfa', 'doble factor', 'segundo factor', '2fa'], r: 'El segundo factor es obligatorio para correo, VPN, repositorios de código y consolas de administración en la nube. Si pierde el dispositivo, debe reportarlo dentro de las 2 horas siguientes (cambio introducido en la versión 4.2).', f: 'DOC-001' },
    { k: ['incidente', 'reportar', 'security'], r: 'Todo incidente o sospecha de incidente se reporta a security@jalasoft.com dentro de las 24 horas de detectado. Reportar a tiempo nunca es motivo de sanción; omitir el reporte sí lo es.', f: 'DOC-001' },
    { k: ['ia', 'inteligencia artificial', 'chatgpt', 'gemini', 'copilot'], r: 'Solo puede usar herramientas del catálogo corporativo de IA, con cuenta corporativa. Nunca ingrese código de cliente bajo NDA, datos personales, credenciales ni información Restringida. Todo resultado debe ser revisado por una persona antes de incorporarse a un entregable.', f: 'DOC-005' },
    { k: ['vacacion', 'permiso', 'licencia'], r: 'Los permisos se solicitan con 48 horas de anticipación, salvo emergencias médicas justificadas dentro de las 24 horas posteriores. Las vacaciones se coordinan con su Manager y no pueden postergarse más de dos gestiones consecutivas.', f: 'DOC-002' },
    { k: ['horario', 'jornada', 'presencial', 'remoto', 'hibrido', 'híbrido'], r: 'La jornada es de 8 horas con ingreso flexible entre 07:30 y 09:30, y franja de colaboración obligatoria de 10:00 a 16:00. La modalidad híbrida requiere al menos dos días presenciales por semana.', f: 'DOC-002' },
    { k: ['regalo', 'soborno', 'etica', 'ética', 'denuncia'], r: 'No se aceptan regalos o beneficios que superen los USD 50 o que puedan influir en una decisión comercial. Las denuncias se canalizan por ética@jalasoft.com, pueden ser anónimas y están protegidas contra represalias.', f: 'DOC-003' },
    { k: ['calidad', 'entregable', 'liberar', 'aceptacion', 'aceptación'], r: 'Un entregable se libera solo si cumple el 100% de los criterios de aceptación y no tiene defectos críticos o altos abiertos. Atraviesa cuatro etapas de control y sus evidencias se conservan 36 meses.', f: 'DOC-004' },
    { k: ['acceso', 'permiso de sistema', 'privilegio'], r: 'Todo acceso se solicita por ticket con aprobación del Manager y del propietario del sistema, bajo el principio de mínimo privilegio. Los accesos sin uso por 60 días se revocan automáticamente.', f: 'DOC-006' },
    { k: ['nda', 'confidencial', 'cliente', 'redes sociales'], r: 'La confidencialidad se mantiene durante la relación laboral y cinco años después. No puede mencionar al cliente, mostrar capturas de sus sistemas ni divulgar detalles del proyecto sin autorización escrita.', f: 'DOC-008' },
    { k: ['evacuacion', 'evacuación', 'emergencia', 'ergonomia', 'ergonomía', 'accidente'], r: 'Cada piso tiene dos rutas de evacuación señalizadas y un punto de encuentro externo; los simulacros son semestrales y obligatorios. Los accidentes se reportan a People & Culture dentro de 24 horas, incluso sin lesión.', f: 'DOC-007' },
    { k: ['gasto', 'viatico', 'viático', 'rendicion', 'rendición'], r: 'Los gastos se rinden dentro de los 10 días hábiles posteriores al desembolso con comprobante válido. Los viáticos requieren aprobación previa del Manager y siguen la tabla vigente por destino.', f: 'DOC-012' },
    { k: ['codigo', 'código', 'rama', 'pull request', 'pruebas', 'cobertura'], r: 'Las ramas de funcionalidad no pueden vivir más de cinco días hábiles. Cada integración requiere dos aprobaciones, una de un senior, y la cobertura mínima de pruebas unitarias es del 80%.', f: 'DOC-011' }
  ];

  return {
    areas, categorias, documentos, colaboradores, fases, evaluaciones, campanas,
    pildoras, notificaciones, avisosColaborador, evidencias, series, sugerenciasIA,
    actividad, usuarios, misDocumentos, misEvaluaciones, chatbotKB
  };
})();

