#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import meow from 'meow';
import wallpaper from 'wallpaper';
import isUrl from 'is-url-superb';
import got from 'got';
import tempfile from 'tempfile';
import isRGBHex from './utilities/is-rgb-hex.js';

const cli = meow(`
	Usage
	  $ wallpaper [file|url|color]

	Options
	  --scale  Scaling method: auto fill fit stretch center [Default: auto]
	           Only available on macOS

	Examples
	  $ wallpaper unicorn.jpg
	  $ wallpaper https://octodex.github.com/images/dojocat.jpg
	  $ wallpaper '#ff69b4'
	  $ wallpaper
	  /Users/sindresorhus/unicorn.jpg
	  $ wallpaper codercat.jpg --scale=fit
`, {
	importMeta: import.meta,
	flags: {
		// TODO: Use the `choices` option in `meow` when it supports that.
		scale: {
			type: 'string'
		}
	}
});

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
		} else if (isRGBHex(input)) {
			await wallpaper.setSolidColor(input);
		} else {
			await wallpaper.set(input, cli.flags);
		}
	} else {
		console.log(await wallpaper.get());
	}
})();
