# wallpaper-cli

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
    --scale  Scaling method: auto fill fit stretch center [Default: auto]
             Only available on macOS

  Examples
    $ wallpaper unicorn.jpg
    $ wallpaper https://octodex.github.com/images/dojocat.jpg
    $ wallpaper '#FAFAFA'
    $ wallpaper
    /Users/sindresorhus/unicorn.jpg
    $ wallpaper codercat.jpg --scale=fit
```


## Related

- [wallpaper](https://github.com/sindresorhus/wallpaper) - API for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
