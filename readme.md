# wallpaper-cli [![Build Status](https://travis-ci.org/sindresorhus/wallpaper-cli.svg?branch=master)](https://travis-ci.org/sindresorhus/wallpaper-cli)

> Manage the desktop wallpaper

Works on macOS, Linux, and Windows.


## Install

```
$ npm install --global wallpaper-cli
```


## Usage

```
$ wallpaper --help

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
```


## Related

- [wallpaper](https://github.com/sindresorhus/wallpaper) - API for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
