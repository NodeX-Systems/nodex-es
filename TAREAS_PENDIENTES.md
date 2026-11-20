# Tareas pendientes

Pendientes de la web v2 (rama `feature/new-landing`) antes de poder publicarla.

- [ ] **Workflow de n8n de Contact con los campos nuevos** (empresa, tamaño, motivo, `entry`), y decidir si se quiere guardado parcial tras cada paso.
  - El formulario ya envía estos campos al webhook `FORM_ENDPOINTS.contact` (`lib/constants.ts`). Falta que el workflow de n8n y `mail/contact-notification.html` los usen.
  - Para el guardado parcial, informar el endpoint en `OPTIONAL_ENDPOINTS.contactPartial` (`lib/constants.ts`).
- [ ] **Herramienta de calendario y su endpoint**, para activar el selector de hora.
  - Elegir la herramienta (Cal.com, HubSpot Meetings o similar) e informar el endpoint en `OPTIONAL_ENDPOINTS.booking` (`lib/constants.ts`).
  - Después, activar `callBooking` en `lib/features.ts`.
- [ ] **Validar `careersChat`** (ya está en `true` en `lib/features.ts`, ver `FLAGS.md`): con legal, el consentimiento del chat (hoy solo habla de "esta conversación", y la última pregunta invita a adjuntar un archivo con datos personales) y el aviso del dictado por voz (Google en Chrome); y confirmar en n8n que un `last_name` vacío no rompe el workflow de Careers (el chat parte el nombre completo en nombre y apellidos).
- [ ] **Archivo del chat de Careers en n8n** (webhook `careers-form`): el chat ahora acepta un archivo opcional en la última pregunta (PDF, Word, PowerPoint, PNG o JPG, 10 MB) y lo envía en el campo `cv`. Confirmar que el workflow acepta esos tipos, **validar tipo y tamaño (≤ 10 MB) también en el servidor** y aplicarle la misma conservación y borrado que al resto de la candidatura.
- [ ] **Revisión de textos**
  - Español.
  - Preguntas frecuentes (FAQ).
  - Guía FDE (firmarla como Iván).
  - Texto legal, con un abogado (incluido el aviso de privacidad del formulario, que va sin casilla).
- [ ] **Confirmar las prácticas de Security** (NDA, entorno del cliente, uso de datos, RGPD). Las certificaciones siguen ocultas hasta tener ISO 27001 o ENS (`securityCertifications` en `lib/features.ts`).
- [ ] **El "sí" explícito de Miguel y Rubén para publicar.**
