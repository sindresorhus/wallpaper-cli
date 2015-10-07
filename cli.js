#!/usr/bin/env node
/* eslint-disable no-mixed-spaces-and-tabs */
'use strict';
const meow = require('meow');
const wallpaper = require('wallpaper');

const cli = meow(`
	Usage
	  $ wallpaper [file]

	Example
	  $ wallpaper unicorn.jpg
	  $ wallpaper
	  /Users/sindresorhus/unicorn.jpg
`, {
	string: ['_']
});

const input = cli.input[0];

if (input) {
	wallpaper.set(input);
} else {
	wallpaper.get().then(console.log);
}
