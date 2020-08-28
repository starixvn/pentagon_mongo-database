db.getSiblingDB('script').system.js.save({
    _id: 'archiveGame'
,   value: (fromDB, toDB, group, cutOffDate) => {
        if (fromDB == null || typeof(fromDB) == "undefined") {
            log('[fromDB] must be defined', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (toDB == null || typeof(toDB) == "undefined") {
            log('[toDB] must be defined', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (group == null || typeof(group) == "undefined") {
            log('[group] must be defined', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (cutOffDate == null || typeof(cutOffDate) == "undefined") {
            cutOffDate = new Date((Math.floor(Date.now() / 3600000) - 24) * 3600000);
        }

        // Parameters' type verification
        if (!(fromDB instanceof DB)) {
            log('[fromDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(toDB instanceof DB)) {
            log('[toDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (typeof(group) != "string") {
            log('[group] must be a string', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(cutOffDate instanceof Date)) {
            log('[cutOffDate] must be a date', 'Audit', 'ARCHIVE', 'E');
            return;
        }

        // Initialize group collections' name
        const coll = {
            phien: `${group}_phiens`
        ,   phien_log: `${group}_phiens_log`
        ,   one: `${group}_ones`
        ,   cuoc: `${group}_cuocs`
        };
        const collBK = {
            phien: `${group}_phiens_bk`
        ,   phien_log: `${group}_phiens_log_bk`
        ,   one: `${group}_ones_bk`
        ,   cuoc: `${group}_cuocs_bk`
        };

        // Group must have _phiens collection
        if (fromDB.getCollectionInfos({name: coll.phien}).length !== 1) {
            log(`Cannot run archive because [${fromDB._name}.${coll.phien}] does NOT exist`, group, 'ARCHIVE', 'E');
            return;
        }

        // Function for archive by phiens
        const archiveByPhiens = (phiens, phiensId) => {
            try {
                toDB[collBK.phien].insertMany(phiens, {ordered: false});
            } catch (e) {
                log(`- phiens.insertMany: ${e.message}`, group, e.name, 'E');
            }

            // Prepare update archive flag pipe for this batch
            const bulkUpdatePipeId = [];
            const bulkUpdatePipe = [];
            phiens.forEach((phien) => {
                bulkUpdatePipeId.push({
                    updateMany: {
                        filter: {id: phien.id}
                    ,   update: {$set: {'__archive.eventtime': phien.time}}
                    }
                });
                bulkUpdatePipe.push({
                    updateMany: {
                        filter: {phien: phien.id}
                    ,   update: {$set: {'__archive.eventtime': phien.time}}
                    }
                });
            });

            // Archive related phien logs if exist
            if (fromDB.getCollectionInfos({name: coll.phien_log}).length === 1) {
                let phienLogs = [];
                let phienLogsCnt = 0;

                fromDB[coll.phien_log].find({id: {$in: phiensId}}).forEach((phienLog) => {
                    phienLogs.push(phienLog);
                    phienLogsCnt++;

                    if (phienLogsCnt > 0 && phienLogsCnt % 1000 === 0) {
                        try {
                            toDB[collBK.phien_log].insertMany(phienLogs, {ordered: false});
                        } catch (e) {
                            log(`- phien_logs.insertMany: ${e.message}`, group, e.name, 'E');
                        }
                        phienLogs = [];
                    }

                    if (phienLogsCnt > 0 && phienLogsCnt % 10000 === 0) {
                        log(`- Archiving ${phienLogsCnt} phien logs`, group, 'ARCHIVE', 'I');
                    }
                })
                try {
                    toDB[collBK.phien_log].insertMany(phienLogs, {ordered: false});
                } catch (e) {
                    log(`- phien_logs.insertMany: ${e.message}`, group, e.name, 'E');
                }
                log(`- Archived ${phienLogsCnt} phien logs`, group, 'ARCHIVE', 'I');

                fromDB[coll.phien_log].bulkWrite(bulkUpdatePipeId, {ordered : false});
            }

            // Archive related ones if exist
            let ones = [];
            let onesCnt = 0;
            if (fromDB.getCollectionInfos({name: coll.one}).length === 1) {

                fromDB[coll.one].find({phien: {$in: phiensId}}).forEach((one) => {
                    // Add currency
                    if (users && users[one.uid]) {
                        one.currency = users[one.uid].currency;
                    }

                    if (one.memberId > 0) {
                        ones.push(one);
                        onesCnt++;
                    }

                    if (onesCnt > 0 && onesCnt % 1000 === 0) {
                        try {
                            toDB[collBK.one].insertMany(ones, {ordered: false});
                        } catch (e) {
                            log(`- ones.insertMany: ${e.message}`, group, e.name, 'E');
                        }
                        ones = [];
                    }

                    if (onesCnt > 0 && onesCnt % 10000 === 0) {
                        log(`- Archiving ${onesCnt} ones`, group, 'ARCHIVE', 'I');
                    }
                })
                try {
                    toDB[collBK.one].insertMany(ones, {ordered: false});
                } catch (e) {
                    log(`- ones.insertMany: ${e.message}`, group, e.name, 'E');
                }
                log(`- Archived ${onesCnt} ones`, group, 'ARCHIVE', 'I');

                fromDB[coll.one].bulkWrite(bulkUpdatePipe, {ordered : false});
            }

            // Archive related cuocs if exist
            let cuocs = [];
            let cuocsCnt = 0;
            if (fromDB.getCollectionInfos({name: coll.cuoc}).length === 1) {
                fromDB[coll.cuoc].find({phien: {$in: phiensId}}).forEach((cuoc) => {
                    // Add currency
                    if (users && users[cuoc.uid]) {
                        cuoc.currency = users[cuoc.uid].currency;
                    }

                    if (cuoc.memberId > 0) {
                        cuocs.push(cuoc);
                        cuocsCnt++;
                    }

                    if (cuocsCnt > 0 && cuocsCnt % 1000 === 0) {
                        try {
                            toDB[collBK.cuoc].insertMany(cuocs, {ordered: false});
                        } catch (e) {
                            log(`- cuocs.insertMany: ${e.message}`, group, e.name, 'E');
                        }
                        cuocs = [];
                    }

                    if (cuocsCnt > 0 && cuocsCnt % 10000 === 0) {
                        log(`- Archiving ${cuocsCnt} cuocs`, group, 'ARCHIVE', 'I');
                    }
                })
                try {
                    toDB[collBK.cuoc].insertMany(cuocs, {ordered: false});
                } catch (e) {
                    log(`- cuocs.insertMany: ${e.message}`, group, e.name, 'E');
                }
                log(`- Archived ${cuocsCnt} cuocs`, group, 'ARCHIVE', 'I');

                fromDB[coll.cuoc].bulkWrite(bulkUpdatePipe, {ordered : false});
            }

            fromDB[coll.phien].updateMany({id: {$in: phiensId}}, [{$set: {'__archive.eventtime': "$time"}}]);
            log(`Archived ${phiensId.length} phiens with ${cuocsCnt} cuocs & ${onesCnt} ones.`, group, 'ARCHIVE', 'I');
        }

        const users = {};
        fromDB['userinfos'].find({type: false}, {_id: 0, id: 1, currency: 1}).forEach((user) => {
            users[user.id] = {currency: user.currency};
        });

        // Running archive
        let phienArr = [];
        let phienIdArr = [];

        log(cutOffDate.toISOString(), 'CutOffTime', 'ARCHIVE', 'I');

        fromDB[coll.phien].find({time: {$lt: cutOffDate}, '__archive.eventtime': {$exists: false}}).forEach((phien) => {
            phienArr.push(phien);
            phienIdArr.push(phien.id);

            if (phienIdArr.length % 1000 === 0) {
                archiveByPhiens(phienArr, phienIdArr);
                phienArr = [];
                phienIdArr = [];
            }
        });
        archiveByPhiens(phienArr, phienIdArr);
    }
,   version: 2.10
,   process: 'Archive Process'
});
db.getSiblingDB('script').loadServerScripts();
