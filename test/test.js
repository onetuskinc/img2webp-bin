'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const readChunk = require('read-chunk');
const isWebp = require('is-webp');
const bin = require('..');

test('rebuild the gif2webp binaries', async t => {
	const tmp = tempy.directory();

	await binBuild.url('https://github.com/webmproject/libwebp/archive/v1.0.3.zip', [
		`mkdir -p ${tmp}`,
		`make -f makefile.unix examples/img2webp && mv ./examples/img2webp ${path.join(tmp, 'img2webp')}`
	]);

	t.true(fs.existsSync(path.join(tmp, 'img2webp')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(bin, ['-help']));
});

test('convert PNGs to WebP', async t => {
	const tmp = tempy.directory();
	const dest = path.join(tmp, 'test.webp');
	const args = [];

	for (let i = 0; i < 29; i++) {
		const suffix = i < 10 ? '0' + i : i;
		args.push(path.join(__dirname, 'fixtures/frame' + suffix + '.png'));
	}

	args.push('-o', dest);

	await execa(bin, args);

	t.true(isWebp(await readChunk(dest, 0, 12)));
});
