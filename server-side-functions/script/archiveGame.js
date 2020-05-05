db.getSiblingDB('script').system.js.save({
    _id: 'archiveGame'
,   value: (fromDB, toDB, group, cutOffDate) => {
        if (fromDB == null || typeof(fromDB) == "undefined")
            throw Error("[fromDB] must be defined");
        if (toDB == null || typeof(toDB) == "undefined")
            throw Error("[toDB] must be defined");
        if (group == null || typeof(group) == "undefined")
            throw Error("[group] must be defined");
        if (cutOffDate == null || typeof(cutOffDate) == "undefined")
            cutOffDate = new Date((Math.floor(Date.now() / 3600000) - 24) * 3600000);

        // Parameters' type verification
        if (!(fromDB instanceof DB))
            throw Error("[fromDB] must be a database");
        if (!(toDB instanceof DB))
            throw Error("[toDB] must be a database");
        if (!(typeof group == "string"))
            throw Error("[group] must be a string");
        if (!(cutOffDate instanceof Date))
            throw Error("[cutOffDate] must be a date");

        // Initialize group collections' name
        var coll = {
            phien: group + '_phiens'
        ,   one: group + '_ones'
        ,   cuoc: group + '_cuocs'
        };
        var coll_bk = {
            phien: group + '_phiens_bk'
        ,   one: group + '_ones_bk'
        ,   cuoc: group + '_cuocs_bk'
        };

        // Group must have _phiens collection
        if (fromDB.getCollectionInfos({name: coll.phien}).length != 1)
            throw Error("Cannot run archive because [" + fromDB._name + "." + coll.phien + "] does NOT exist");

        // Function for logging
        var log = (type, label, title, str) => {
            d = new Date();
            print(d.toISOString() + ' ' + type.toUpperCase() + '  ' + label.toUpperCase() + ' [' + title + '] ' + str);
        }

        // Function for archive by phiens
        var archiveByPhiens = (phiens, phiens_id) => {
            try {
                toDB[coll_bk.phien].insertMany(phiens, {ordered: false});
            } catch (e) {
                log('E', e.name, group, '- phiens.insertMany: ' + e.message);
            };

            // Prepare update archive flag pipe for this batch
            var bulkUpdatePipe = [];
            phiens.forEach((phien) => {
                bulkUpdatePipe.push({
                    updateMany: {
                        filter: {phien: phien.id}
                    ,   update: {$set: {'__archive.eventtime': phien.time}}
                    }
                });
            });

            // Archive related ones if exist
            if (fromDB.getCollectionInfos({name: coll.one}).length == 1) {
                var ones = [];
                var ones_cnt = 0;

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
                            log('E', e.name, group, '- ones.insertMany: ' + e.message);
                        };
                        ones = [];
                    }

                    if (ones_cnt > 0 && ones_cnt % 10000 == 0) {
                        log('I', 'ARCHIVE', group, '- Archiving ' + ones_cnt + ' ones');
                    }
                })
                try {
                    toDB[coll_bk.one].insertMany(ones, {ordered: false});
                } catch (e) {
                    log('E', e.name, group, '- ones.insertMany: ' + e.message);
                };
                log('I', 'ARCHIVE', group, '- Archived ' + ones_cnt + ' ones');

                fromDB[coll.one].bulkWrite(bulkUpdatePipe, {ordered : false});
            }

            // Archive related cuocs if exist
            if (fromDB.getCollectionInfos({name: coll.cuoc}).length == 1) {
                var cuocs = [];
                var cuocs_cnt = 0;

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
                            log('E', e.name, group, '- cuocs.insertMany: ' + e.message);
                        };
                        cuocs = [];
                    }

                    if (cuocs_cnt > 0 && cuocs_cnt % 10000 == 0) {
                        log('I', 'ARCHIVE', group, '- Archiving ' + cuocs_cnt + ' cuocs');
                    }
                })
                try {
                    toDB[coll_bk.cuoc].insertMany(cuocs, {ordered: false});
                } catch (e) {
                    log('E', e.name, group, '- cuocs.insertMany: ' + e.message);
                };
                log('I', 'ARCHIVE', group, '- Archived ' + cuocs_cnt + ' cuocs');

                fromDB[coll.cuoc].bulkWrite(bulkUpdatePipe, {ordered : false});
            }

            fromDB[coll.phien].updateMany({id: {$in: phiens_id}}, [{$set: {'__archive.eventtime': "$time"}}]);
            log('I', 'ARCHIVE', group, 'Archived ' + phiens_id.length + ' phiens with ' + cuocs_cnt + ' cuocs & ' + ones_cnt + ' ones.');
        }

        var users = {};
        fromDB['userinfos'].find({type: false}, {_id: 0, id: 1, currency: 1}).forEach((user) => {
            users[user.id] = {currency: user.currency};
        });

        // Running archive
        var phiens = [];
        var phiens_id = [];

        log('I', 'ARCHIVE', 'CutOffTime', cutOffDate.toISOString());

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
}); db.getSiblingDB('script').loadServerScripts();