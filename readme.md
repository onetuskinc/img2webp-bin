# img2webp-bin [![Build Status](https://travis-ci.org/drslump/img2webp-bin.svg?branch=master)](https://travis-ci.org/drslump/img2webp-bin)

> [WebP](https://developers.google.com/speed/webp/) is a modern image format that provides superior lossless and lossy compression for images on the web. Using WebP, webmasters and web developers can create smaller, richer images that make the web faster.


## Install

```
$ npm install --save img2webp-bin
```


## Usage

```js
const {execFile} = require('child_process');
const img2webp = require('img2webp-bin');

execFile(img2webp, ['frame1.png', 'frame2.png', '-o', 'outout.webp'], () => {
  console.log('Image converted!');
});
```


## CLI

```
$ npm install --global img2webp-bin
```

```
$ img2webp --help
```


## License

MIT

Based on [Imagemin's gif2webp-bin](https://github.com/imagemin/gif2webp-bin)
