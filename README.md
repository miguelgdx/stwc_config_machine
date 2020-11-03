# Generación de un proyecto y automatización de tareas
https://campusdoctoradoyposgrado.ull.es/mod/assign/view.php?id=275639

## Instalamos Git y lo configuramos para conectarnos

![](/images/1.png)
![](/images/2.png)
![](/images/3.png)

## Instalamos NodeJS
sudo apt install nodejs

![](/images/5.png)

## Instalamos NPM
sudo apt install npm

![](/images/8.png)

## Instalamos Yeoman
npm install -g yo

Aparentemente Yeoman necesita que node esté en la versión 10, así que actualizamos con:

**curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -**
<br/>**sudo apt-get install -y nodejs**

![](/images/9.png)

## Instalar el generator-learnfe(npm)

Usamos npm install -g generator-learnfe

## Instalamos gulp

Usamos npm install -g gulp-cli

## Creamos un directorio para el proyecto y lanzamos "yo learnfe"
Nota: A mi me dio problemas de permisos, y por ello tuve que cambiar los permisos de todos los archivos a 777 en los archivos que fallara (y su directorio superior).
Y además volver a asegurar que el propietario de los ficheros del usuario actual es el correcto (por si alguno se lo llevó el usuario root) con **"sudo chown -R $USER:staff ~"**

![](/images/10.png)

Ahora todo está bien.

## Iniciamos el control de versiones de Git y dependencias de npm.
**git init** y **npm init**

![](/images/11.png)

## Automatización de tareas (Gulp)
**Agregamos gulp al proyecto con npm install gulp --save-dev**

### Actualizaciones en tiempo real en el navegador.
Instalamos browser-sync con "npm install -g browser-sync" y lo ejecutamos con browser-sync start --server --files "css/*.css"

### Procesar sass
### Minificar css
### Sources maps
### Observar cambios en ficheros Sass y generar el CSS correspondiente.
