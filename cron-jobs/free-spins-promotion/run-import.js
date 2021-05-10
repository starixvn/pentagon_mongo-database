// load(`__Pandora__/FreeBetPromotion - AutomationScript.js`)
{
    // Load scripts
    db = (new Mongo('mongodb://lmn_summary:LmnSummary@10.10.50.13:37101/?replicaSet=L2Local&appName=FreeSpinsPromotionAutoImport')).getDB('admin');
    db._mongo.getDB('script').loadServerScripts();

    // Variables
    const logger = new Shell.Log(`FREESPINS-AUTO`);
    const now = ISODate();
    let returnCode = -1;

    // Connection to DBTXN
    const cfg = {
        srv:    '10.18.200.206'
    ,   db:     'bodb02'
    ,   usr:    'vnSAS'
    ,   pwd:    'vnSAS'
    ,   csv:    true
    ,   output: `\
__FreeSpinsPromotion-\
${now.getUTCFullYear()}\
${now.getUTCMonth().toString().padStart(2,'0')}\
${now.getUTCDay().toString().padStart(2,'0')}-\
${now.getUTCHours().toString().padStart(2,'0')}\
${now.getUTCMinutes().toString().padStart(2,'0')}\
00__.csv`
    };
    const sql = new Program.SQLCMD(cfg);

    // Get CSV content
    sql.setQuery(`\
EXECUTE dbo.Task_LuckyDraw3rd_Freebets_Select;
`)
    returnCode = sql.execute();
    if (returnCode != 0) {
        let msg = `Execute SQL error.`;
        if (fileExists(cfg.output)) {
            msg += ` Output file [${cfg.output}] content:
${cat(cfg.output)}`
            sql.delOutput();
        }
        logger.err(`SQL Select ${returnCode}`, `${msg}`);
        quit(-returnCode);
    }

    // Define schema
    const schema = [];
    schema.push({name: 'roundId', type: {class: "Number"}});
    schema.push({name: 'memberId', type: {class: "Number"}});
    schema.push({name: 'spinCnt', type: {class: "Number"}});
    schema.push({name: 'expiryDate', type: {class: 'Date', timezone: 'UTC-4'}}); // 09/07/2020 06:25:00

    returnCode = Saba.Spins.importSpins(db._mongo, cfg.output, schema, false, false);
    sql.delOutput();

    if (returnCode > 0) {
        logger.err(`Import Spins ${returnCode}`, `Import spins error.`);
        quit(returnCode);
    }

    sql.setOutput(`tmpOutput`);
    sql.setQuery(`\
EXECUTE dbo.Task_LuckyDraw3rd_Freebets_Update;
`)
    returnCode = sql.execute();
    sql.delOutput();
    if (returnCode != 0) {
        logger.err(`SQL Update ${returnCode}`, `Execute SQL error.`);
        quit(-returnCode);
    }

    // Change connection to DBSABA
    sql.setServer(`10.40.40.52`);
    sql.setDatabase(`SabaDB`);
    sql.setQuery(`EXECUTE SysHealth.FreeSpinPromotion_SpinLogs NULL, 0;`);

    // Checking result
    returnCode = sql.execute();
    sql.delOutput();
    if (returnCode != 0) {
        logger.err(`SQL Check ${returnCode}`, `Execute SQL error.`);
        quit(-returnCode);
    }
}
