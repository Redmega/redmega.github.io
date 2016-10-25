const jsPath = './static/js/';
const cssPath = './static/css/';
const htmlPath = './main.html';

var gulp = require('gulp');
var fs = require('fs');
var uglify = require('yuicompressor');
var minify = require('html-minifier').minify;

gulp.task('clean:min', () => {
    console.log('Cleaning up min files...');
    cleanup([].concat(fs.readdirSync(jsPath).map(file => jsPath + file), fs.readdirSync(cssPath).map(file => cssPath + file)));

    try {
        fs.accessSync('./index.html', fs.F_OK);
        fs.unlinkSync('./index.html');
    } catch (e) {}
});

gulp.task('uglify:js', () => {
    var jsFiles = fs
        .readdirSync(jsPath)
        .map(file => jsPath + file);

    jsFiles.forEach(file => {
        uglify.compress(file, {}, (err, data, extra) => {
            console.log(extra);
            fs.writeFileSync(minName(file), data);
        });
    });
});

gulp.task('uglify:css', () => {
    var cssFiles = fs
        .readdirSync(cssPath)
        .map(file => cssPath + file);

    cssFiles.forEach(file => {
        uglify.compress(file, {
            type: 'css'
        }, (err, data, extra) => {
            console.log(extra);
            fs.writeFileSync(minName(file), data);
        });
    });
});

gulp.task('uglify:html', () => {
    let html = minify(fs.readFileSync(htmlPath).toString(), {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes	: true,
        useShortDoctype: true,
        collapseBooleanAttributes: true
    });
    fs.writeFileSync('./index.html',html);
});

gulp.task('default', ['clean:min', 'uglify:js', 'uglify:css', 'uglify:html']);

/* Utils */
function cleanup(files) {
    for (let i = 0; i < files.length; i++) {
        if (files[i].includes('.min.')) {
            fs.unlinkSync(files[i]);
            files.splice(i, 1);
        }
    }
}

function minName(file) {
    let f = file.split('');
    f.splice(f.lastIndexOf('.'), 0, '.min').join('');
    return f.join('');
}