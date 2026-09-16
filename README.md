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

## Perfiles de acceso

| Perfil | Usuario de la demo | Qué puede hacer |
|---|---|---|
| Administrador | Marcelo Antezana | Panel general, colaboradores, documentos y versiones, rutas, evaluaciones generadas por IA, campañas, analítica de brechas, automatizaciones, evidencias y configuración |
| Manager | Iván Suárez | Panel del equipo, seguimiento individual, asignación de documentación específica, resultados y escalamientos |
| Colaborador | Camila Rojas | Ruta de inducción por fases, lectura y confirmación de documentos, evaluaciones, micro aprendizaje y asistente documental |

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
- El estado vive en memoria (`S`); al recargar, la demostración vuelve a los datos iniciales.
- Para conectar un backend real, reemplace `data.js` por llamadas a la API y mantenga la misma
  forma de los objetos; las vistas leen siempre desde `S`.