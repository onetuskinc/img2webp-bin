#!/usr/bin/env node
'use strict';
const {spawn} = require('child_process');
const img2webp = require('.');

const input = process.argv.slice(2);

spawn(img2webp, input, {stdio: 'inherit'})
	.on('exit', process.exit);
