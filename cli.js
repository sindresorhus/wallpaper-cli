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
	  --scale  Scaling method: auto fill fit stretch center [Default: auto]
	           Only available on macOS

	Examples
	  $ wallpaper unicorn.jpg
	  $ wallpaper https://octodex.github.com/images/dojocat.jpg
	  $ wallpaper
	  /Users/sindresorhus/unicorn.jpg
	  $ wallpaper codercat.jpg --scale=fit
`);

const input = cli.input[0];

(async () => {
	if (input) {
		if (isUrl(input)) {
			const file = tempfile(path.extname(input));

			got
				.stream(input)
				.pipe(fs.createWriteStream(file))
				.on('finish', async () => {
					await wallpaper.set(file, cli.flags);
				});
		} else {
			await wallpaper.set(input, cli.flags);
		}
	} else {
		console.log(await wallpaper.get());
	}
})();
