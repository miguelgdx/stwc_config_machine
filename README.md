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
Instalamos browser-sync con "npm install -g browser-sync"
Aqui podermos:
- Ejecutarlo con browser-sync start --server --files "css/*.css" (o los archivos a observar)
- O bien meter la tarea en un gulpfile.js

> Gulpfile: <br/>
var gulp = require('gulp'); <br/>
var browserSync = require('browser-sync').create(); //paquete a utilizar <br/>
gulp.task('browser-sync', function() { <br/>
 browserSync.init({ <br/>
 server: { <br/>
 baseDir: "./" <br/>
 } <br/>
 }); <br/>
}); <br/>
gulp.watch("*.html").on("change", browserSync.reload);

![](/images/12.png)

Browser-sync detecta que he cambiado el contenido del fichero .html y actualiza el navegador automáticamente.

### Procesar Sass
Para poder usar Sass con Gulp, instalamos node-sass y gulp-sass e incluir en el gulpfile:

> var sass = require('gulp-sass');
<br/>sass.compiler = require('node-sass');
<br/>//sass
<br/>gulp.task('sass', function () {
<br/>    gulp.src(['./src/sass/*.scss', './src/sass/**/*.scss'])
<br/>        .pipe(sass({outputStyle: 'compressed'}))
<br/>        .pipe(gulp.dest('./src/styles/'));
<br/>});

**Un ejemplo de Sass:**

![](/images/16.png)

**Observamos que ahora ya tenemos los estilos de Sass en CSS**

![](/images/17.png)

### Minificar css
Instalamos el gulp-minify y lo incorporamos al fichero gulpfile.

> var minifyCss = require('gulp-minify-css');
<br/>gulp.task('styles', function(){
<br/>gulp.src(['src/styles/**/*.css'])
<br/>.pipe(minifyCss())
<br/>.pipe(gulp.dest('dist/styles'))
<br/>.pipe(browserSync.stream());
<br/>});

![](/images/13.png)
### Sources maps
Instalamos gulp-sourcemaps y lo añadimos al gulpfile.js

>var sourcemaps = require('gulp-sourcemaps')
<br/><br/>gulp.task('styles', function(){
<br/>gulp.src(['src/styles/**/*.css'])
<br/>.pipe(sourcemaps.init())
<br/>.pipe(minifyCss())
<br/>.pipe(sourcemaps.write())
<br/>.pipe(gulp.dest('dist/styles'))
<br/>.pipe(browserSync.stream());
<br/>});

Ahora vemos la diferencia entre recibir el CSS minificado:

![](/images/14.png)

Y recibir el CSS original gracias a sourcemaps:

![](/images/15.png)

### Observar cambios en ficheros Sass y generar el CSS correspondiente.

Para esto, conectamos la salida de Sass a la anterior del styles (css) y hacemos que el pipe lleve la información completa.

Quedaría así:

>gulp.task('styles', function(done){
<br/>  gulp.src(['./src/sass/*.scss', './src/sass/**/*.scss'])
<br/>       .pipe(sass.sync({outputStyle: 'compressed'}))
<br/>       .pipe(gulp.dest('./src/styles/'))
<br/>       .pipe(sourcemaps.init())
<br/>       .pipe(minifyCss())
<br/>       .pipe(sourcemaps.write())
<br/>       .pipe(gulp.dest('dist/styles'))
<br/>       .pipe(browserSync.stream());
<br/>   console.log("Ejecutado styles");
<br/>   done();
}<br/> );

**DEMO DE EJECUCIÓN EN GIF:**

![](/images/sass_change.gif)
