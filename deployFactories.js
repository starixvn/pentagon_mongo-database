{
  const deploy = (path) => {
    try {
      load(path);
    } catch (e) {
      print(`${ISODate().toISOString().pad(29,1)}E  FACTORY  [Failure] • ${e}\n\n`);
    }
  };
  const deployFolder = (path) => {
    listFiles(path).forEach(_ => {
      if (_.isDirectory) {
        deployFolder(_.name);
      }
      if (/\.js$/.test(_.name)) {
        deploy(_.name);
      }
    });
  };

  [ 'server-side-functions/factory/base/Object.js',
    'server-side-functions/factory/base/Deploy.js',
    'server-side-functions/factory/base/Check.js',
    'server-side-functions/factory/base/Schema.js',
  ].forEach(deploy);

  [ 'server-side-functions/factory/shell/',
    'server-side-functions/factory/type/',
    'server-side-functions/factory/tool/',
    'server-side-functions/factory/server/',
    'server-side-functions/factory/program/',
    'server-side-functions/factory/business/',
  ].forEach(deployFolder);
}
