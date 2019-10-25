'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const compareSize = require('compare-size');
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

test('convert a PNG to WebP', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(tmp, 'test.webp');
	const args = [
		src,
		'-o',
		dest
	];

	await execa(bin, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
	t.true(isWebp(await readChunk(dest, 0, 12)));
});
