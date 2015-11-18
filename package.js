Package.describe({
  name: 'meteor-vericall',
  version: '0.0.1',
  summary: 'Wrap vericall.org api for meteor',
  git: 'https://github.com/jwall149/meteor-vericall.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use(['http', 'coffeescript'], 'server');
  api.addFiles('vericall.coffee', 'server');
  api.export('Vericall', 'server');
});
