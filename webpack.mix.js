let mix = require('laravel-mix');

mix
  .js('app/index.js', 'public')
  .copyDirectory('fonts', 'public/fonts')
  .copyDirectory('assets', 'public/assets')
  .sass('styles/index.scss', 'public')
  .options({
    processCssUrls: false,
  })
  .setPublicPath('/');
