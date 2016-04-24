#!/usr/bin/env node
'use strict';
const meow = require('meow');
const wallpaper = require('wallpaper');
const isUrl = require('is-url-superb');
const got = require('got');
const tempfile = require('tempfile');
const path = require('path');
const fs = require('fs');

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
  if (isUrl(input)) {
    var file = tempfile(path.extname(input));
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
