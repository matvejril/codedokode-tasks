var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var rename = require("gulp-rename");

var configs = {
    src: {
        less: 'less/style.less',
        js: 'scripts/main.js'
    },
    dist: {
        css: 'css',
        js: 'scripts'
    },
    watch: {
        html: 'index.html',
        less: 'less/*.less',
        css: 'css/style.css',
        js: 'scripts/**/*.js'
    }
};

gulp.task('default', ['less', 'js'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch(configs.watch.html).on('change', browserSync.reload);
    gulp.watch(configs.watch.less, ['less']);
    gulp.watch(configs.watch.js, ['js']);
});

gulp.task('less', function() {
    return gulp.src(configs.src.less)
        .pipe(less())
        .pipe(gulp.dest(configs.dist.css))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('js', function() {
    return gulp.src(configs.src.js)
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest(configs.dist.js))
        .pipe(browserSync.stream({match: '**/*.js' }));
});
