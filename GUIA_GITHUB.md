# 🚀 Guía Paso a Paso para Subir tu Proyecto a GitHub

Como el comando `git` no está instalado o no se encuentra en las variables de entorno de tu sistema (consola de Windows), tienes **dos excelentes opciones** para subir todo el proyecto a GitHub de forma fácil y segura.

---

## 🛠️ Opción 1: Usar GitHub Desktop (La vía visual y más fácil)

Esta es la opción recomendada si prefieres no usar la consola. Es una aplicación oficial de GitHub muy visual y sencilla.

### Paso 1: Descargar e instalar GitHub Desktop
1. Entra a [desktop.github.com](https://desktop.github.com/) y descarga el instalador para Windows.
2. Ejecútalo e inicia sesión con tu cuenta de GitHub.

### Paso 2: Agregar tu carpeta del proyecto
1. Abre **GitHub Desktop**.
2. En la barra superior, ve a **File** ➔ **Add local repository...** (o presiona `Ctrl + O`).
3. Haz clic en **Choose...** y busca la carpeta de tu proyecto:
   `C:\Users\auxprospectiva\Desktop\DEMODAYV2 MASTER\demo-day-ueb-v2-master`
4. Si la aplicación te indica que la carpeta no contiene un repositorio Git, haz clic en el enlace azul que dice **"create a repository"** (crear un repositorio) allí mismo.

### Paso 3: Configurar el repositorio local
1. En la ventana emergente, verás:
   - **Name**: `demo-day-ueb-v2-master` (puedes dejarlo así).
   - **Git Ignore**: Asegúrate de que no sobrescriba el archivo `.gitignore` existente (nuestro `.gitignore` ya evita que se suba la pesada carpeta `node_modules`).
2. Haz clic en **Create Repository**.

### Paso 4: Hacer tu primer "Commit" (Guardar cambios locales)
1. En la barra lateral izquierda verás la lista de todos los archivos del proyecto listos para subir.
2. En la esquina inferior izquierda, escribe un título para tu guardado, por ejemplo:
   `Primer commit: Demo Day v2`
3. Haz clic en el botón azul **Commit to main** (o *Commit to master*).

### Paso 5: Publicar en GitHub
1. En la parte superior de la pantalla verás un botón que dice **Publish repository** (Publicar repositorio). Haz clic en él.
2. Se abrirá una ventana para configurar el repositorio en la web de GitHub:
   - **Name**: El nombre con el que aparecerá en tu perfil de GitHub.
   - **Keep this code private**: Marca esta casilla si quieres que el código sea privado (solo tú lo verás), o desmárcala si quieres que sea público.
3. Haz clic en **Publish Repository**. ¡Y listo! Tu proyecto ya estará seguro en la nube de GitHub.

---

## 💻 Opción 2: Usar la consola (Línea de comandos)

Si prefieres la terminal clásica, sigue estos pasos:

### Paso 1: Instalar Git
1. Descarga e instala Git desde [git-scm.com](https://git-scm.com/).
2. Durante la instalación, puedes dejar todas las opciones por defecto.

### Paso 2: Inicializar y subir el proyecto
Una vez instalado, abre una **nueva terminal** de PowerShell o CMD (para que reconozca el nuevo comando) y ejecuta los siguientes comandos uno a uno:

1. **Navega a la carpeta de tu proyecto**:
   ```powershell
   cd "C:\Users\auxprospectiva\Desktop\DEMODAYV2 MASTER\demo-day-ueb-v2-master"
   ```

2. **Inicializa Git en la carpeta**:
   ```powershell
   git init
   ```

3. **Agrega todos los archivos** (el archivo `.gitignore` excluirá automáticamente `node_modules`):
   ```powershell
   git add .
   ```

4. **Crea el primer punto de control (Commit)**:
   ```powershell
   git commit -m "Primer commit: Demo Day v2"
   ```

5. **Nombra la rama principal**:
   ```powershell
   git branch -M main
   ```

6. **Crea un repositorio vacío en la web de GitHub**:
   - Ve a [github.com/new](https://github.com/new).
   - Ponle un nombre (ej. `demo-day-ueb-v2`).
   - Haz clic en **Create repository** (sin marcar README, .gitignore ni licencia).

7. **Vincula tu consola con GitHub y sube los archivos**:
   *(Reemplaza la URL con la de tu repositorio recién creado)*
   ```powershell
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

---

> [!IMPORTANT]
> **¿Por qué es vital el archivo `.gitignore`?**
> En la raíz de tu proyecto existe un archivo llamado `.gitignore` que tiene configurado `/node_modules`. Esto evita que subas gigabytes de dependencias innecesarias a GitHub. Git solo subirá tus archivos de código, diseño e imágenes, lo cual es la práctica estándar en desarrollo de software.
