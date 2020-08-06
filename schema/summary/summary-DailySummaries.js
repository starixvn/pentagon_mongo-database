createIndex(db.getSiblingDB('summary').daily_summaries, {time: 1, currency: 1, gameId: 1}, {unique: true, name: 'UIX_daily_summaries_config_time_currency_gameId'});
