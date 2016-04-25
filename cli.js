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
	  $ wallpaper [file | url]

	Example
	  $ wallpaper unicorn.jpg
	  $ wallpaper
	  /Users/sindresorhus/unicorn.jpg
	  $ wallpaper https://assets-cdn.github.com/images/modules/open_graph/github-octocat.png
`, {
	string: ['_']
});

const input = cli.input[0];

if (input) {
	if (isUrl(input)) {
		const file = tempfile(path.extname(input));
		got
			.stream(input)
			.pipe(fs.createWriteStream(file))
			.on('finish', () => {
				wallpaper.set(file);
			});
	} else {
		wallpaper.set(input);
	}
} else {
	wallpaper.get().then(console.log);
}
