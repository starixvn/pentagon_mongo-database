// -- ln-env.js -- //
var mongoActive;
var mongoArc;
{
    const activeConnstr = 'mongodb://';
    const arcConnstr = 'mongodb://';
    mongoActive = new Mongo(activeConnstr);
    mongoArc = new Mongo(arcConnstr);
    const wc = new WriteConcern("majority", 0, true);
    mongoActive.setWriteConcern(wc);
    mongoArc.setWriteConcern(wc);
    load('run-archive.js');
    quit();
}

// -- run-archive.js -- //
{
    // Load script
    mongoActive.getDB('script').loadServerScripts();

    // Run archive
    Saba.runArchive(mongoActive, mongoArc, mongoActive.getDB('archive').archive_config);

    print("=========================================================================================\n\n");
}
