# Plataforma de Inducción y Micro aprendizaje · Jalasoft

Prototipo funcional del proyecto *Digitalización del Proceso de Inducción y Micro aprendizaje*
(Quality Control Processes & General Services). Funciona sin servidor, sin build y sin dependencias:
basta abrir `index.html` en el navegador.

## Estructura

```
jalasoft-induccion/
├── index.html          Estructura de la aplicación (login + shell)
├── css/styles.css      Sistema de diseño completo (tokens, componentes, responsive)
└── js/
    ├── data.js         Datos simulados: 24 colaboradores, 12 documentos, 4 evaluaciones,
    │                   6 campañas, notificaciones, evidencias, series de gráficos
    └── app.js          Lógica: navegación por rol, vistas, gráficos SVG, modales,
                        lector, evaluación interactiva, píldoras y asistente documental
```

## Datos de la demostración

En el ingreso se elige con qué datos trabajar:

- **Datos de ejemplo**: 24 colaboradores, campañas, resultados y series históricas simuladas.
- **Empezar desde cero**: solo lo que la organización ya tiene configurado (documentos, etapas,
  evaluaciones por etapa), 2 administradores y 3 managers. Ningún colaborador, campaña,
  notificación ni evidencia: todo nace de lo que se haga en la app y alimenta los paneles en vivo.

Cada modo guarda sus cambios en el navegador (`localStorage`) por separado; recargar la página
no pierde nada. «Restablecer» (en el ingreso o en el chip de fecha) vuelve el modo a su estado inicial.

**Fecha simulada.** El chip de la barra superior muestra el «hoy» de la demo y permite adelantar
1, 3, 7 o 15 días. Al hacerlo corren las reglas: aviso 48 h antes de cada vencimiento, lectura
vencida (estado «Atrasado» y aviso al Manager), recordatorio y escalamiento por inactividad, y
envíos programados de micro aprendizaje.

## Perfiles de acceso

| Perfil | Cuentas | Qué puede hacer |
|---|---|---|
| Administrador | Marcelo Antezana, Verónica Claure | Panel general, colaboradores (alta y baja), **managers y ascensos**, documentos (publicar, actualizar, retirar), rutas, evaluaciones con IA, campañas, analítica, automatizaciones, evidencias y configuración |
| Manager | Iván Suárez, Gabriela Rocha, Sofía Terceros (+ Ruth Peñaranda, Lorena Vargas y Patricia Nogales en los datos de ejemplo) + los ascendidos | Validar a los nuevos, panel y resultados de su equipo, asignar documentación específica, habilitar reintentos y escalamientos |
| Colaborador | Los que se registren (Camila Rojas y otros 23 en los datos de ejemplo) | Ruta por etapas, lectura y confirmación, evaluaciones, micro aprendizaje, asistente y constancias |

## Ascenso de colaborador a Manager

Solo un Administrador puede ascender, desde **Managers y ascensos** o desde la ficha del colaborador.

1. **Requisito**: inducción completada (se puede desactivar en Configuración).
2. **Ascenso**: se define el cargo y el área que gestiona; opcionalmente se le transfiere un equipo
   inicial (también las validaciones pendientes).
3. **Efecto**: se crea su cuenta de Manager (aparece en el ingreso y en «Manager responsable»);
   deja de figurar como cuenta de colaborador, pero conserva su ruta, evaluaciones y evidencias
   en la sección **Mi cumplimiento**, donde le siguen llegando las actualizaciones de documentos.
4. **Trazabilidad**: el cambio de rol queda como evidencia y se notifica al ascendido y a su Manager.
5. **Revertir**: solo si no tiene equipo a cargo (antes se transfiere con «Transferir equipo»).

## Flujos que se pueden recorrer completos

1. **Lectura y confirmación.** Como colaborador, abra un documento pendiente: la confirmación
   se habilita al llegar al final del texto, genera evidencia con sello de tiempo y desbloquea
   la evaluación asociada.
2. **Evaluación de comprensión.** Cronómetro, avance por pregunta, cálculo de puntaje contra el
   mínimo del 80%, revisión con justificación por pregunta y reintento si reprueba.
3. **Generación con IA.** Como administrador, en Documentos o Evaluaciones: el motor muestra el
   análisis del documento, las preguntas propuestas con su nivel de confianza y la publicación.
4. **Micro aprendizaje.** Píldoras de una pregunta con retroalimentación inmediata, y campañas
   que se pueden activar o pausar desde el panel.
5. **Escalamiento.** Los colaboradores atrasados aparecen en el panel del Manager y el registro
   de automatizaciones muestra qué envió el sistema y a quién.

## Notas técnicas

- Sin librerías externas: los gráficos (líneas, barras, dona, anillos de progreso, sparklines)
  se dibujan como SVG generado en `app.js`.
- El estado vive en `S` y se guarda en `localStorage` (`jala-induccion.v5.demo` / `.cero`) tras cada acción.
- Para conectar un backend real, reemplace `data.js` por llamadas a la API y mantenga la misma
  forma de los objetos; las vistas leen siempre desde `S`.