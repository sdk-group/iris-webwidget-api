const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
const markdox = require("gulp-markdox");

gulp.task('default', ['clean', 'dox'], () => {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['es2015'],
			plugins: ["remove-comments"]
		}))
		.pipe(gulp.dest('build'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
	return gulp.src('build', {
			read: false
		})
		.pipe(clean());
});

gulp.task('dox', () => {
	return gulp.src("./src/**/*.js")
		.pipe(markdox())
		.pipe(rename({
			basename: 'README',
			extname: ".md"
		}))
		.pipe(gulp.dest("./doc"));
});
