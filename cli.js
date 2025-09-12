#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {pipeline} from 'node:stream/promises';
import meow from 'meow';
import {
	getWallpaper,
	setWallpaper,
	setSolidColorWallpaper,
} from 'wallpaper';
import isUrl from 'is-url-superb';
import {withHttpError, withTimeout} from 'fetch-extras';
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
			type: 'string',
		},
	},
});

const input = cli.input[0];

if (input) {
	if (isUrl(input)) {
		const file = tempfile({extension: path.extname(input).slice(1)});

		const fetchWithExtras = withTimeout(withHttpError(fetch), 30_000);
		const response = await fetchWithExtras(input);

		await pipeline(
			response.body,
			fs.createWriteStream(file),
		);

		await setWallpaper(file, cli.flags);
	} else if (isRGBHex(input)) {
		await setSolidColorWallpaper(input);
	} else {
		await setWallpaper(input, cli.flags);
	}
} else {
	console.log(await getWallpaper());
}
