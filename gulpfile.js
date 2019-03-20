'use strict';

const gulp = require( 'gulp' );
const config = require( 'config.json' );
const glob = require( 'glob' );
const bs = require( 'browser-sync' );
const fs = require( 'fs' );
const $ = require( 'gulp-load-plugins' )();
const mqpacker = require( 'css-mqpacker' );
const autoprefixer = require( 'autoprefixer' );
const assets = require( 'postcss-assets' );
const zip = require( 'gulp-zip' );
const files = glob( 'src/*', { sync: true });
const theme = files[0].replace( 'src/', '' );

function getThemeVersion() {
	let version = '';
	let fileContent = fs.readFileSync( `${files[0]}/style.css`, 'utf-8' );

	if ( fileContent ) {
		let lines = fileContent.split( /\r\n|\n/ );

		for ( let i = 0; i < lines.length; i++ ) {
			if ( 0 === lines[i].indexOf( 'Version' ) ) {
				if ( 'undefined' !== typeof lines[i].split( ' ' )[1]) {
					version = lines[i].split( ' ' )[1];
				}
				break;
			}
		}
	}

	return version;
}

gulp.task( 'sass', function() {
	gulp.src( `src/${theme}/assets/scss/style.scss` )
		.pipe( $.plumber() )
		.pipe( $.sourcemaps.init() )
		.pipe( $.sassGlobImport() )
		.pipe( $.sass({ outputStyle: 'expanded' }) )
		.pipe( $.postcss([
			autoprefixer({ browsers: [ 'last 2 versions' ] }),
			mqpacker({ sort: true }),
			assets({ loadPaths: [ `src/${theme}/assets/images/` ] }) ]) )
		.pipe( $.sourcemaps.write( '/assets/sourcemap/', {
			includeContent: false,
			sourceRoot: './assets/scss/'
		}) )
		.pipe( $.lineEndingCorrector() )
		.pipe( plumber.stop() )
		.pipe( gulp.dest( `src/${theme}/` ) );
});

gulp.task( 'bs', function() {
	bs.init({
		files: `src/${theme}/*.css`
	});
});

gulp.task( 'bs-reload', function() {
	bs.reload();
});

gulp.task( 'check-domain', function() {
	return gulp.src( '**/*.php' )
		.pipe( $.checktextDomain({
			textDomain: config.textDomain,
			keywords: [
				'__:1,2d',
				'_e:1,2d',
				'_x:1,2c,3d',
				'esc_html__:1,2d',
				'esc_html_e:1,2d',
				'esc_html_x:1,2c,3d',
				'esc_attr__:1,2d',
				'esc_attr_e:1,2d',
				'esc_attr_x:1,2c,3d',
				'_ex:1,2c,3d',
				'_n:1,2,4d',
				'_nx:1,2,4c,5d',
				'_n_noop:1,2,3d',
				'_nx_noop:1,2,3c,4d'
			]
		}) );
});

gulp.task( 'translate', function() {
	return gulp.src( `src/${theme}/**/*.php` )
		.pipe( $.sort() )
		.pipe( $.wpPot({
			domain: config.textDomain,
			bugReport: config.bugReport,
			team: config.team
		}) )
		.pipe( gulp.dest( `src/${theme}/languages/${config.textDomain}.pot` ) );
});

gulp.task( 'zip', function() {
	gulp.start( 'translate' );

	return gulp.src(
			[ 'src/**/*',
				`!src/${theme}/assets/scss/**`,
				'!src/**/*.DS_Store'
			] )
		.pipe( zip( `${theme}-${getThemeVersion()}.zip` ) )
		.pipe( gulp.dest( 'dist' ) );
});

gulp.task( 'watch', function() {
	gulp.watch( `src/${theme}/assets/scss/**/*.scss`, [ 'sass' ]);
	gulp.watch( `src/${theme}/assets/js/**/*.js`, [ 'bs-reload' ]);
	gulp.watch( 'src/**/*.php', [ 'bs-reload' ]);
});

gulp.task( 'default', [ 'bs', 'sass', 'watch' ]);
