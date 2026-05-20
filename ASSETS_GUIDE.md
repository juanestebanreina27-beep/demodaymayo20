# 📦 Guía de Nomenclatura de Archivos — Demo Day UEB

> **IMPORTANTE:** Todos los archivos multimedia deben colocarse dentro de la carpeta `public/assets/` del proyecto.
> Una vez colocados con los nombres exactos que se indican en esta tabla, la interfaz los cargará automáticamente sin necesidad de modificar código.

---

## 📂 Estructura de Carpetas

```
DEMODAY PRUEBA/
├── public/
│   └── assets/
│       ├── img/
│       │   ├── jurado_1.jpg
│       │   ├── jurado_2.jpg
│       │   ├── jurado_3.jpg
│       │   ├── producto_grupo_1.jpg
│       │   ├── producto_grupo_2.jpg
│       │   ├── producto_grupo_3.jpg
│       │   ├── producto_grupo_4.jpg
│       │   ├── producto_grupo_5.jpg
│       │   ├── producto_grupo_6.jpg
│       │   └── mascota_evento.png
│       ├── video/
│       │   └── intro_demo_day.mp4
│       └── audio/
│           ├── entrada_grupo_1.mp3
│           ├── entrada_grupo_2.mp3
│           ├── entrada_grupo_3.mp3
│           ├── entrada_grupo_4.mp3
│           ├── entrada_grupo_5.mp3
│           ├── entrada_grupo_6.mp3
│           ├── pitch_loop.mp3
│           ├── deliberation_loop.mp3
│           ├── sfx_times_up.mp3
│           ├── ambient_loop.mp3
│           └── winner_reveal.mp3
```

---

## 🖼️ IMÁGENES

| ID del Asset | Ruta en el Código | Nombre de Archivo Sugerido | Especificaciones Técnicas |
|---|---|---|---|
| Jurado 1 — Juan Pablo Carreño | `/assets/img/jurado_1.jpg` | `jurado_1.jpg` | **1:1** cuadrada, mín. **400×400px**, JPG/PNG, fondo neutro |
| Jurado 2 — Jairo Enrique Peñuela | `/assets/img/jurado_2.jpg` | `jurado_2.jpg` | **1:1** cuadrada, mín. **400×400px**, JPG/PNG, fondo neutro |
| Jurado 3 — América Castiblanco | `/assets/img/jurado_3.jpg` | `jurado_3.jpg` | **1:1** cuadrada, mín. **400×400px**, JPG/PNG, fondo neutro |
| Producto Grupo 1 — ACTIVECREDITS UEB | `/assets/img/producto_grupo_1.jpg` | `producto_grupo_1.jpg` | **16:9**, mín. **1280×720px**, JPG/PNG |
| Producto Grupo 2 — CALMMIND U | `/assets/img/producto_grupo_2.jpg` | `producto_grupo_2.jpg` | **16:9**, mín. **1280×720px**, JPG/PNG |
| Producto Grupo 3 — MINDCARE U | `/assets/img/producto_grupo_3.jpg` | `producto_grupo_3.jpg` | **16:9**, mín. **1280×720px**, JPG/PNG |
| Producto Grupo 4 — FLEXIWORK U | `/assets/img/producto_grupo_4.jpg` | `producto_grupo_4.jpg` | **16:9**, mín. **1280×720px**, JPG/PNG |
| Producto Grupo 5 — FRESHLY | `/assets/img/producto_grupo_5.jpg` | `producto_grupo_5.jpg` | **16:9**, mín. **1280×720px**, JPG/PNG |
| Producto Grupo 6 — CLIMODA | `/assets/img/producto_grupo_6.jpg` | `producto_grupo_6.jpg` | **16:9**, mín. **1280×720px**, JPG/PNG |
| Mascota del Evento | `/assets/img/mascota_evento.png` | `mascota_evento.png` | **PNG transparente**, mín. **500×500px** |

---

## 🎬 VIDEOS

| ID del Asset | Ruta en el Código | Nombre de Archivo Sugerido | Especificaciones Técnicas |
|---|---|---|---|
| Video Introductorio Principal | `/assets/video/intro_demo_day.mp4` | `intro_demo_day.mp4` | **16:9**, **1920×1080px** (Full HD), MP4 (H.264), máx. **50MB** |

---

## 🎵 AUDIOS

| ID del Asset | Ruta en el Código | Nombre de Archivo Sugerido | Especificaciones Técnicas |
|---|---|---|---|
| Entrada Grupo 1 (Walk-up) | `/assets/audio/entrada_grupo_1.mp3` | `entrada_grupo_1.mp3` | MP3, **~30 seg**, 128-320 kbps |
| Entrada Grupo 2 (Walk-up) | `/assets/audio/entrada_grupo_2.mp3` | `entrada_grupo_2.mp3` | MP3, **~30 seg**, 128-320 kbps |
| Entrada Grupo 3 (Walk-up) | `/assets/audio/entrada_grupo_3.mp3` | `entrada_grupo_3.mp3` | MP3, **~30 seg**, 128-320 kbps |
| Entrada Grupo 4 (Walk-up) | `/assets/audio/entrada_grupo_4.mp3` | `entrada_grupo_4.mp3` | MP3, **~30 seg**, 128-320 kbps |
| Entrada Grupo 5 (Walk-up) | `/assets/audio/entrada_grupo_5.mp3` | `entrada_grupo_5.mp3` | MP3, **~30 seg**, 128-320 kbps |
| Entrada Grupo 6 (Walk-up) | `/assets/audio/entrada_grupo_6.mp3` | `entrada_grupo_6.mp3` | MP3, **~30 seg**, 128-320 kbps |
| Música de Pitch (Loop) | `/assets/audio/pitch_loop.mp3` | `pitch_loop.mp3` | MP3, **loop-friendly** (corte limpio), 128-320 kbps, ambiente suave/corporativo |
| SFX Tiempo Finalizado | `/assets/audio/sfx_times_up.mp3` | `sfx_times_up.mp3` | MP3, **2-5 seg**, efecto de alerta corto y claro |
| Música de Deliberación (Loop) | `/assets/audio/deliberation_loop.mp3` | `deliberation_loop.mp3` | MP3, **loop-friendly**, 128-320 kbps, reflexivo/calmado |
| Música Ambiente Global (Loop) | `/assets/audio/ambient_loop.mp3` | `ambient_loop.mp3` | MP3, **loop-friendly**, volumen bajo/lo-fi corporativo |
| Reveal de Ganador (Épico) | `/assets/audio/winner_reveal.mp3` | `winner_reveal.mp3` | MP3, impacto épico, fanfarria o redoblante, volumen fuerte |

---

## 🚀 Instrucciones de Despliegue

### Paso 1: Organizar los archivos
1. Abre la carpeta del proyecto: `DEMODAY PRUEBA/public/assets/`
2. Las subcarpetas `img/`, `video/` y `audio/` ya están creadas
3. **Arrastra tus archivos reales** dentro de la subcarpeta correspondiente

### Paso 2: Renombrar archivos
- Cada archivo **DEBE** tener el nombre exacto que aparece en la columna "Nombre de Archivo Sugerido"
- El nombre es **sensible a mayúsculas/minúsculas** (`jurado_1.jpg` ≠ `Jurado_1.jpg`)
- Respeta la extensión (`.jpg`, `.png`, `.mp3`, `.mp4`)

### Paso 3: Verificar
- Ejecuta `npm run dev` en la terminal
- Abre `http://localhost:5173/` en tu navegador
- Navega por cada pantalla para verificar que las imágenes, videos y audios cargaron correctamente
- Si algún asset no carga, verifica que el nombre y la extensión sean exactos

### Paso 4: Build de Producción (Opcional)
```bash
npm run build
npm run preview
```
Esto generará una versión optimizada en la carpeta `dist/` lista para subir a cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc.).

---

## ⚡ Resumen Rápido de Archivos Requeridos

| Tipo | Cantidad | Formatos |
|---|---|---|
| Imágenes de Jurados | 3 | JPG/PNG |
| Imágenes de Productos | 6 | JPG/PNG |
| Mascota del Evento | 1 | PNG (transparente) |
| Video Introductorio | 1 | MP4 |
| Audios de Entrada (Walk-up) | 6 | MP3 |
| Música de Pitch (Loop) | 1 | MP3 |
| SFX Tiempo Finalizado | 1 | MP3 |
| Música de Deliberación | 1 | MP3 |
| Música Ambiente (Global) | 1 | MP3 |
| Audio Revelación Ganador | 1 | MP3 |
| **TOTAL** | **22 archivos** | |
