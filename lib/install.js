'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['-help']).then(() => {
	log.success('img2webp pre-build test passed successfully');
}).catch(error => {
	log.warn(error.message);
	log.warn('img2webp pre-build test failed');
	log.info('compiling from source');

	binBuild.url('https://github.com/webmproject/libwebp/archive/v1.0.3.zip', [
		`mkdir -p ${bin.dest()}`,
		`make -f makefile.unix examples/img2webp && mv ./examples/img2webp ${bin.path()}`
	]).then(() => {
		log.success('img2webp built successfully');
	}).catch(error => {
		log.error(error.stack);
	});
});
