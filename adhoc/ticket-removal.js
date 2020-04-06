active_connstr = 'mongodb://';
archive_connstr = 'mongodb://';
removal_connstr = archive_connstr;

memberId = 0;
phien = 0;
gameTypeId = 0;
client = 'ONEworks';

// Functions
log = function(type, label, str) {
    d = new Date();
    print(d.toISOString() + ' ' + type + '  TICKETRM  [' + label + '] ' + str);
}

// Active, archive and removal database
db_active = (new Mongo(active_connstr)).getDB('minigame');
db_arc = (new Mongo(archive_connstr)).getDB('minigame_arc');
db_rm = (new Mongo(archive_connstr)).getDB('minigame_rm');

// Gametype mapping array
gametypeArr = {1:'taixiu', 2: 'xocxoc', 3: 'baucua'};
_game = gametypeArr[gameTypeId];

if (_game != null) {
    // Remove from active db
    _tickets = [];
    _ticketsId = [];
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