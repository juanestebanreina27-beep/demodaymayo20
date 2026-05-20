# 🌐 Solución: Cómo subir tu proyecto a GitHub SIN instalar ningún programa

Entiendo perfectamente. Al estar en una computadora del trabajo con restricciones de administrador, no puedes instalar Git ni GitHub Desktop. 

¡No te preocupes! Existe un **método 100% web y oficial** para subir todo tu proyecto directamente desde el navegador, sin descargar absolutamente nada. Aquí tienes el paso a paso detallado:

---

## 🚀 Método Web: Arrastrar y Soltar (Zero-Install)

Dado que tu proyecto tiene pocos archivos (la carpeta `src`, `public` y los archivos de configuración), podemos subirlos todos directamente a través de la página web de GitHub. 

### Paso 1: Crear el repositorio en GitHub
1. Abre tu navegador web e ingresa a tu cuenta en [github.com](https://github.com/).
2. Ve a [github.com/new](https://github.com/new) para crear un nuevo repositorio.
3. Configúralo así:
   - **Repository name**: `demo-day-ueb-v2` (o el nombre que prefieras).
   - **Public / Private**: Elige si quieres que sea público o privado.
   - **⚠️ MUY IMPORTANTE**: Marca la casilla **"Add a README file"** (Añadir un archivo README). Escribir un archivo inicial nos permitirá ver la interfaz web completa de archivos inmediatamente.
4. Haz clic en el botón verde **Create repository**.

---

### Paso 2: Ir a la sección de subir archivos
Una vez creado el repositorio con el archivo README:
1. En la parte superior derecha de la lista de archivos, haz clic en el botón **Add file** (Agregar archivo).
2. En el menú desplegable, selecciona **Upload files** (Subir archivos).
3. Verás una pantalla con un recuadro grande que dice: *"Drag files here to add them to your repository"* (Arrastra archivos aquí para agregarlos).

---

### Paso 3: Seleccionar y arrastrar tus archivos (Evitando `node_modules`)
Este paso es el más importante para evitar que se suban los archivos pesados del sistema:

1. Abre el **Explorador de Archivos de Windows** y navega hasta la carpeta de tu proyecto:
   `C:\Users\auxprospectiva\Desktop\DEMODAYV2 MASTER\demo-day-ueb-v2-master`
2. **Selecciona únicamente** los siguientes elementos (puedes mantener presionada la tecla `Ctrl` para seleccionarlos todos a la vez):
   - 📂 Carpeta `src`
   - 📂 Carpeta `public`
   - 📄 `index.html`
   - 📄 `package.json`
   - 📄 `package-lock.json`
   - 📄 `tsconfig.json`
   - 📄 `vite.config.ts`
   - 📄 `.gitignore`
   - *(Cualquier otro archivo que desees, pero **NUNCA selecciones la carpeta `node_modules`**)*
3. **Arrastra** todos los elementos seleccionados y **suéltos** dentro del recuadro del navegador en GitHub.
4. Verás cómo se listan los archivos en la parte inferior mientras se suben (tardará apenas unos segundos).

---

### Paso 4: Confirmar los cambios
1. Una vez que todos los archivos terminen de cargarse, ve al final de la página.
2. En el cuadro de texto **Commit changes**, puedes escribir un título (por ejemplo: `Primer commit: Código del Demo Day`).
3. Deja marcada la opción *"Commit directly to the main branch"* y haz clic en el botón verde **Commit changes**.

¡Listo! Tu repositorio web en GitHub estará completamente actualizado con tu código actual y podrás compartirlo o acceder a él desde cualquier lugar.
