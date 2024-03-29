
const { src, dest, watch, series, parallel } = require('gulp')

//CSS y SASS
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')

//Imagenes
const imagemin = require('gulp-imagemin');


function css(done) {
    // compilar sass
    //pasos: 1 - identificar archivos , 2 - compilarla , 3 - guardar el .css

    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))

    done()
}
function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'))

}

function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);