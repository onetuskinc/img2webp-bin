'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

const url = `https://raw.github.com/onetuskinc/img2webp-bin/v${pkg.version}/vendor/`;

module.exports = new BinWrapper()
	.src(`${url}macos/img2webp`, 'darwin')
	.src(`${url}linux/img2webp`, 'linux')
	.src(`${url}win/img2webp.exe`, 'win32')
	.dest(path.resolve(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'img2webp.exe' : 'img2webp');
