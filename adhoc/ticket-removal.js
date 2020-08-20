{
    let active_connstr = 'mongodb://';
    let archive_connstr = 'mongodb://';
    let removal_connstr = archive_connstr;

    let memberId = 0;
    let phien = 0;
    let gameTypeId = 0;

    // Functions
    let log = function(type, label, str) {
        let d = new Date();
        print(d.toISOString() + ' ' + type + '  TICKETRM  [' + label + '] ' + str);
    }

    // Active, archive and removal database
    let db_active = (new Mongo(active_connstr)).getDB('minigame');
    let db_arc = (new Mongo(archive_connstr)).getDB('minigame_arc');
    let db_rm = (new Mongo(removal_connstr)).getDB('minigame_rm');

    // Gametype mapping array
    let gametypeArr = {1:'taixiu', 2: 'xocxoc', 3: 'baucua'};
    let _game = gametypeArr[gameTypeId];

    if (_game != null) {
        // Remove from active db
        let _tickets = [];
        let _ticketsId = [];
        db_active[_game + '_cuocs'].find({memberId: memberId, phien: phien}, {__archive: 0}).forEach(
            function(doc) {
                _tickets.push({rm: doc, rmDate: new ISODate()});
                _ticketsId.push(doc._id);
            }
        );
        db_rm[_game + '_cuocs_rm'].insertMany(_tickets, {ordered: false});
        db_active[_game + '_cuocs'].remove({_id: {$in: _ticketsId}});
        db_arc[_game + '_cuocs_bk'].remove({_id: {$in: _ticketsId}});
        log('I', 'RemoveTicket', _ticketsId.length + ' tickets are removed from [' + _game + '_cuocs] active collection.');
        
        // Remove from archive db
        _tickets = [];
        _ticketsId = [];
        db_arc[_game + '_cuocs_bk'].find({memberId: memberId, phien: phien}, {__archive: 0}).forEach(
            function(doc) {
                _tickets.push(doc);
                _ticketsId.push(doc._id);
            }
        );
        db_rm[_game + '_cuocs_rm'].insertMany(_tickets, {ordered: false});
        db_arc[_game + '_cuocs_bk'].remove({_id: {$in: _ticketsId}});
        log('I', 'RemoveTicket', _ticketsId.length + ' tickets are removed from [' + _game + '_cuocs] archive collection.');
    }

    print("=========================================================================================\n\n");
    db_active._session.endSession();
    db_arc._session.endSession();
    db_rm._session.endSession();
    // quit();
}