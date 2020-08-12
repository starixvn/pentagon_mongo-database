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
        if (cutOffDate == null || typeof(cutOffDate) == "undefined")
            cutOffDate = new Date((Math.floor(Date.now() / 3600000) - 24) * 3600000);

        // Parameters' type verification
        if (!(fromDB instanceof DB)) {
            log('[fromDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(toDB instanceof DB)) {
            log('[toDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(typeof group == "string")) {
            log('[group] must be a string', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(cutOffDate instanceof Date)) {
            log('[cutOffDate] must be a date', 'Audit', 'ARCHIVE', 'E');
            return;
        }

        let e;

        // Initialize group collections' name
        let coll = {
            phien: group + '_phiens'
        ,   phien_log: group + '_phiens_log'
        ,   one: group + '_ones'
        ,   cuoc: group + '_cuocs'
        };
        let coll_bk = {
            phien: group + '_phiens_bk'
        ,   phien_log: group + '_phiens_log_bk'
        ,   one: group + '_ones_bk'
        ,   cuoc: group + '_cuocs_bk'
        };

        // Group must have _phiens collection
        if (fromDB.getCollectionInfos({name: coll.phien}).length != 1) {
            log('Cannot run archive because [' + fromDB._name + '.' + coll.phien +'] does NOT exist', group, 'ARCHIVE', 'E');
            return;
        }

        // Function for archive by phiens
        let archiveByPhiens = (phiens, phiens_id) => {
            try {
                toDB[coll_bk.phien].insertMany(phiens, {ordered: false});
            } catch (e) {
                log('- phiens.insertMany: ' + e.message, group, e.name, 'E');
            };

            // Prepare update archive flag pipe for this batch
            let bulkUpdatePipe_id = [];
            let bulkUpdatePipe = [];
            phiens.forEach((phien) => {
                bulkUpdatePipe_id.push({
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
            if (fromDB.getCollectionInfos({name: coll.phien_log}).length == 1) {
                let phien_logs = [];
                let phien_logs_cnt = 0;

                fromDB[coll.phien_log].find({id: {$in: phiens_id}}).forEach((phien_log) => {
                    phien_logs.push(phien_log);
                    phien_logs_cnt++;

                    if (phien_logs_cnt > 0 && phien_logs_cnt % 1000 == 0) {
                        try {
                            toDB[coll_bk.phien_log].insertMany(phien_logs, {ordered: false});
                        } catch (e) {
                            log('- phien_logs.insertMany: ' + e.message, group, e.name, 'E');
                        };
                        phien_logs = [];
                    }

                    if (phien_logs_cnt > 0 && phien_logs_cnt % 10000 == 0) {
                        log('- Archiving ' + phien_logs_cnt + ' phien logs', group, 'ARCHIVE', 'I');
                    }
                })
                try {
                    toDB[coll_bk.phien_log].insertMany(phien_logs, {ordered: false});
                } catch (e) {
                    log('- phien_logs.insertMany: ' + e.message, group, e.name, 'E');
                };
                log('- Archived ' + phien_logs_cnt + ' phien logs', group, 'ARCHIVE', 'I');

                fromDB[coll.phien_log].bulkWrite(bulkUpdatePipe_id, {ordered : false});
            }

            // Archive related ones if exist
            if (fromDB.getCollectionInfos({name: coll.one}).length == 1) {
                let ones = [];
                let ones_cnt = 0;

                fromDB[coll.one].find({phien: {$in: phiens_id}}).forEach((one) => {
                    // Add currency
                    if (users && users[one.uid]) {
                        one.currency = users[one.uid].currency;
                    }

                    if (one.memberId > 0) {
                        ones.push(one);
                        ones_cnt++;
                    }

                    if (ones_cnt > 0 && ones_cnt % 1000 == 0) {
                        try {
                            toDB[coll_bk.one].insertMany(ones, {ordered: false});
                        } catch (e) {
                            log('- ones.insertMany: ' + e.message, group, e.name, 'E');
                        };
                        ones = [];
                    }

                    if (ones_cnt > 0 && ones_cnt % 10000 == 0) {
                        log('- Archiving ' + ones_cnt + ' ones', group, 'ARCHIVE', 'I');
                    }
                })
                try {
                    toDB[coll_bk.one].insertMany(ones, {ordered: false});
                } catch (e) {
                    log('- ones.insertMany: ' + e.message, group, e.name, 'E');
                };
                log('- Archived ' + ones_cnt + ' ones', group, 'ARCHIVE', 'I');

                fromDB[coll.one].bulkWrite(bulkUpdatePipe, {ordered : false});
            }

            // Archive related cuocs if exist
            if (fromDB.getCollectionInfos({name: coll.cuoc}).length == 1) {
                let cuocs = [];
                let cuocs_cnt = 0;

                fromDB[coll.cuoc].find({phien: {$in: phiens_id}}).forEach((cuoc) => {
                    // Add currency
                    if (users && users[cuoc.uid]) {
                        cuoc.currency = users[cuoc.uid].currency;
                    }

                    if (cuoc.memberId > 0) {
                        cuocs.push(cuoc);
                        cuocs_cnt++;
                    }

                    if (cuocs_cnt > 0 && cuocs_cnt % 1000 == 0) {
                        try {
                            toDB[coll_bk.cuoc].insertMany(cuocs, {ordered: false});
                        } catch (e) {
                            log('- cuocs.insertMany: ' + e.message, group, e.name, 'E');
                        };
                        cuocs = [];
                    }

                    if (cuocs_cnt > 0 && cuocs_cnt % 10000 == 0) {
                        log('- Archiving ' + cuocs_cnt + ' cuocs', group, 'ARCHIVE', 'I');
                    }
                })
                try {
                    toDB[coll_bk.cuoc].insertMany(cuocs, {ordered: false});
                } catch (e) {
                    log('- cuocs.insertMany: ' + e.message, group, e.name, 'E');
                };
                log('- Archived ' + cuocs_cnt + ' cuocs', group, 'ARCHIVE', 'I');

                fromDB[coll.cuoc].bulkWrite(bulkUpdatePipe, {ordered : false});
            }

            fromDB[coll.phien].updateMany({id: {$in: phiens_id}}, [{$set: {'__archive.eventtime': "$time"}}]);
            log('Archived ' + phiens_id.length + ' phiens with ' + cuocs_cnt + ' cuocs & ' + ones_cnt + ' ones.', group, 'ARCHIVE', 'I');
        }

        let users = {};
        fromDB['userinfos'].find({type: false}, {_id: 0, id: 1, currency: 1}).forEach((user) => {
            users[user.id] = {currency: user.currency};
        });

        // Running archive
        let phiens = [];
        let phiens_id = [];

        log(cutOffDate.toISOString(), 'CutOffTime', 'ARCHIVE', 'I');

        fromDB[coll.phien].find({time: {$lt: cutOffDate}, '__archive.eventtime': {$exists: false}}).forEach((phien) => {
            phiens.push(phien);
            phiens_id.push(phien.id);

            if (phiens_id.length % 1000 == 0) {
                archiveByPhiens(phiens, phiens_id);
                phiens = [];
                phiens_id = [];
            }
        });
        archiveByPhiens(phiens, phiens_id);
    }
,   version: 2.7
,   process: 'Archive Process'
}); db.getSiblingDB('script').loadServerScripts();
