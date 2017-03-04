#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const meow = require('meow');
const wallpaper = require('wallpaper');
const isUrl = require('is-url-superb');
const got = require('got');
const tempfile = require('tempfile');

const cli = meow(`
	Usage
	  $ wallpaper [file|url]

	Options
	  --scale  Scaling method (fill fit stretch center)
	           If not specified, it will use your current setting
	           Only available on macOS

	Examples
	  $ wallpaper unicorn.jpg
	  $ wallpaper https://octodex.github.com/images/dojocat.jpg
	  $ wallpaper
	  /Users/sindresorhus/unicorn.jpg
	  $ wallpaper codercat.jpg --scale=fit
`, {
	string: ['_']
});

const input = cli.input[0];
const scale = cli.flags.scale;

if (input) {
	if (isUrl(input)) {
		const file = tempfile(path.extname(input));

		got
			.stream(input)
			.pipe(fs.createWriteStream(file))
			.on('finish', () => {
				wallpaper.set(file, {scale});
			});
	} else {
		wallpaper.set(input, {scale});
	}
} else {
	wallpaper.get().then(console.log);
}
