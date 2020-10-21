/** @format */

const { parallel, src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const debug = require('debug');
const fs = require('fs');
const _ = require('lodash');
const PATH_IN = './src';
const PATH_OUT = './src';

debug_out = debug('tbr:out');
debug_css = debug('tbr:css');
debug_js = debug('tbr:js');
debug_err = debug('tbr:out');
debug.enable('tbr:*');

function buildCSS() {
    fs.readdir(PATH_IN, (err, files) => {
        if (_.isArray(files)) {
            debug_css(file);
            files.forEach((file) => {
                if (files.match(/.*[.]sass$/)) {
                    src(files).pipe(sass().on('error', sass.logError)).pipe(plumber()).pipe(dest(PATH_OUT));
                }
            });
        }

        if (err) {
            debug_err(err);
        }
    });
}

function buildJS() {
    fs.readdir(PATH_IN, (err, files) => {
        if (_.isArray(files)) {
            debug_js(file);
            files.forEach((file) => {
                if (files.match(/.*[.]js$/)) {
                    debug_js(file);
                }
            });
        }

        if (err) {
            debug_err(err);
        }
    });
}

function help() {
    console.log(`to-browser. Processes files in ${PATH_IN} and outputs them in ${PATH_OUT}.`);
    console.log('commands: ');
    const cmds = ['gulp css = builds all of the *.scss files.', 'gulp js  = builds all of the *.js files.', 'gulp     = builds all..'];
    cmds.forEach((cmd) => console.log(cmd));
}

exports.help = help;
exports.css = buildCSS;
exports.js = buildJS;
exports.default = parallel(buildCSS, buildJS);
