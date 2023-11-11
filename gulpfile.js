import gulp from "gulp";
import cssnano from "gulp-cssnano";
import uglify from "gulp-uglify";
import webp from "gulp-webp";
import browserSync from "browser-sync";
import gulpIf from "gulp-if";
import filter from "gulp-filter";
import htmlmin from "gulp-htmlmin";
import replace from "gulp-replace";

const SRC_FOLDER = "./src";
const HTML_FILE_PATH = "index.html";
const PAGES_HTML_PATH = SRC_FOLDER + "/pages/**/*.html";
const TEAM_HTML_PATH = SRC_FOLDER + "/team/**/*.html";
const BUILD_FOLDER = "./build";
const JS_FILES_PATH = SRC_FOLDER + "/**/*.js";
const CSS_FILES_PATH = SRC_FOLDER + "/**/*.css";
const CSS_PAGES_PATH = SRC_FOLDER + "/pages/**/*.css";
const CSS_TEAM_PATH = SRC_FOLDER + "/team/**/*.css";
const IMG_FILES_PATH = SRC_FOLDER + "/images/**/*.jpg";

const reload = browserSync.reload;

gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
    open: true,
    index: "index.html",
    port: 3000,
    notify: true,
  });
});

function htmlTask() {
  return gulp
    .src(HTML_FILE_PATH)
    .pipe(replace(/\.jpg/g, ".webp"))
    .pipe(replace(/\.\/src\//g, "./"))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(BUILD_FOLDER))
    .pipe(reload({ stream: true }));
}

function pageshtmlTask() {
  return gulp
    .src([PAGES_HTML_PATH])
    .pipe(replace(/\.jpg/g, ".webp"))
    .pipe(replace(/\.\/src\//g, "./"))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(BUILD_FOLDER + "/pages/"))

    .pipe(reload({ stream: true }));
}

function teamhtmlTask() {
  return gulp
    .src([TEAM_HTML_PATH])
    .pipe(replace(/\.jpg/g, ".webp"))
    .pipe(replace(/\.\/src\//g, "./"))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(BUILD_FOLDER + "/team/"))

    .pipe(reload({ stream: true }));
}

function imageTask() {
  return gulp
    .src(IMG_FILES_PATH)
    .pipe(webp())
    .pipe(gulp.dest(BUILD_FOLDER + "/images"))
    .pipe(
      gulp.src([SRC_FOLDER + "/images/**/*", `!${SRC_FOLDER}/images/**/*.jpg`])
    )
    .pipe(gulp.dest(BUILD_FOLDER + "/images"))
    .pipe(reload({ stream: true }));
}

function cssTask() {
  return gulp
    .src([CSS_FILES_PATH, CSS_PAGES_PATH, CSS_TEAM_PATH])
    .pipe(
      cssnano({
        discardUnused: false,
      })
    )
    .pipe(gulp.dest(BUILD_FOLDER))
    .pipe(reload({ stream: true }));
}

function cssWatchesNewTask() {
  return gulp
    .src([SRC_FOLDER + "/css/**/*.css"])

    .pipe(gulp.dest(BUILD_FOLDER + "/css/"))

    .pipe(reload({ stream: true }));
}

function cssPagesTask() {
  return gulp
    .src([CSS_PAGES_PATH])
    .pipe(cssnano())
    .pipe(gulp.dest(BUILD_FOLDER + "/pages/"))
    .pipe(reload({ stream: true }));
}

function cssTeamTask() {
  return gulp
    .src([CSS_TEAM_PATH])
    .pipe(cssnano())
    .pipe(gulp.dest(BUILD_FOLDER + "/team/"))
    .pipe(reload({ stream: true }));
}

function woffTask() {
  return gulp
    .src(SRC_FOLDER + "/fonts/**/*.woff2")
    .pipe(gulp.dest(BUILD_FOLDER + "/fonts"))
    .pipe(reload({ stream: true }));
}

function jsTask() {
  return gulp
    .src(JS_FILES_PATH)
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_FOLDER))
    .pipe(reload({ stream: true }));
}
function slickTask() {
  const isNotJS = (file) => !file.extname || file.extname !== ".js"; // Filter out JS files

  return gulp
    .src(SRC_FOLDER + "/assets/slick-1.8.1/**/*")
    .pipe(filter(isNotJS))
    .pipe(
      gulpIf(
        (file) => !file.isDirectory(),
        gulp.dest(BUILD_FOLDER + "/assets/slick-1.8.1")
      )
    );
}

function JsTaskNew() {
  return gulp
    .src(SRC_FOLDER + "/js/script.js")
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_FOLDER + "/js/"))
    .pipe(reload({ stream: true }));
}

gulp.task("watch-files", () => {
  gulp.watch(SRC_FOLDER + "/css/**/*.css", cssWatchesNewTask);
  gulp.watch(SRC_FOLDER + "/pages/**/*.css", cssPagesTask);
  gulp.watch(SRC_FOLDER + "/team/oksana-kobzar.css", cssTeamTask);
  gulp.watch(SRC_FOLDER + "/js/script.js", JsTaskNew);
  gulp.watch(IMG_FILES_PATH, imageTask);
  gulp.watch(SRC_FOLDER + "/fonts/**/*.woff2", woffTask);
  gulp.watch(HTML_FILE_PATH, htmlTask);
  gulp.watch(PAGES_HTML_PATH, pageshtmlTask);
  gulp.watch(TEAM_HTML_PATH, teamhtmlTask);
});

gulp.task("watch", gulp.parallel("serve", "watch-files"));

gulp.task(
  "default",
  gulp.parallel(
    jsTask,
    slickTask,
    cssTask,
    imageTask,
    woffTask,
    htmlTask,
    pageshtmlTask,
    teamhtmlTask
  )
);
