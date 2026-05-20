# 🏆 Demo Day UEB - Plataforma de Emprendimiento e Innovación

¡Bienvenido al repositorio de la plataforma interactiva del **Demo Day de la Universidad El Bosque (Hub IEX)**! 

Esta es una aplicación web moderna, dinámica y fluida diseñada para gestionar, cronometrar, calificar y animar la ronda de pitches de los equipos emprendedores frente al panel de jurados en tiempo real.

---

## ✨ Características Principales

*   **🎬 Pantallas de Navegación Fluidas**:
    *   **Bienvenida**: Presentación oficial del área de emprendimiento del Hub IEX.
    *   **Jurados**: Panel dinámico con los perfiles del equipo evaluador.
    *   **Reglas**: Visualización clara del formato del pitch, tiempos y retroalimentación.
    *   **Agenda**: Cronograma estructurado del evento.
    *   **Ronda de Pitch**: Consola de control interactiva para cronometrar, reproducir audios de entrada de cada equipo, alertas acústicas de fin de tiempo, y música de deliberación.
    *   **Ganadores**: Animación interactiva para revelar al equipo ganador del Demo Day.
*   **🎵 Diseño de Audio Inmersivo**: Control de volumen dinámico y transiciones suaves (*fade-in / fade-out*) para música ambiente, himno de entrada, contador de tiempo, deliberación y celebración final.
*   **🎨 Interfaz Premium**: Estética moderna con efectos de desenfoque de fondo (*glassmorphism*), degradados suaves en tonos naranjas y oscuros corporativos, y micro-animaciones fluidas con **Framer Motion**.

---

## 🛠️ Stack Tecnológico

*   **Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Compilador**: [Vite](https://vite.dev/) (Rendimiento ultra rápido)
*   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
*   **Iconos**: [Lucide React](https://lucide.dev/)

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

Si quieres correr esta aplicación en tu propia máquina de desarrollo, sigue estos pasos:

1.  **Clona o descarga** este repositorio.
2.  Abre una terminal en la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo local:
    ```bash
    npm run dev
    ```
4.  Abre tu navegador en la dirección local que indique la terminal (por defecto `http://localhost:5173`).

---

## 📂 Estructura del Proyecto

```text
├── public/              # Recursos estáticos (audios, imágenes de equipos y jurados)
├── src/
│   ├── assets/          # Estilos globales y utilidades
│   ├── components/      # Componentes UI reutilizables
│   ├── data/            # Configuración de contenidos y variables (content.ts)
│   ├── screens/         # Pantallas principales del flujo del Demo Day
│   ├── App.tsx          # Enrutador y contenedor principal de la aplicación
│   └── main.tsx         # Punto de entrada de React
├── package.json         # Dependencias y scripts del proyecto
├── tsconfig.json        # Configuración de TypeScript
└── vite.config.ts       # Configuración del compilador Vite
```

---

## 💼 Créditos y Autoría

Desarrollado para el **Área de Emprendimiento de la Universidad El Bosque (Hub IEX)**. 
