Package.describe({
  name: 'jwall149:meteor-vericall',
  version: '0.0.3',
  summary: 'Wrap vericall.org api for meteor',
  git: 'https://github.com/jwall149/meteor-vericall.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['http'], 'server');
  api.addFiles('vericall.js', 'server');
  api.export('Vericall', 'server');
});
