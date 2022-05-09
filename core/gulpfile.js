"use strict";
const gulp = require("gulp");
const minify = require("gulp-minify");
const inject = require("gulp-inject-string");
const ts = require("gulp-typescript");
const { series } = require("gulp");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("buildJs", () => {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(minify({ ext: { min: ".min.js" } }))
        .pipe(gulp.dest("./bin"));
});

gulp.task(
    "buildDts",
    gulp.series("buildJs", () => {
        return tsProject.src().pipe(tsProject()).dts.pipe(gulp.dest("./bin"));
    })
);

gulp.task(
    "build",
    gulp.series("buildDts", () => {
        return gulp.src("bin/**/*").pipe(gulp.dest("../public/libs/core/"));
    })
);
