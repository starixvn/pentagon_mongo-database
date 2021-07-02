{
  const time = ISODate(`2021-06-02`);
  const _id = `L1BI-sch`;
  const version = `0.0.1`;
  const schema_id = ObjectId(`${Math.floor(time.valueOf()/1000).toString(16)}${String.split(_id, '').map(_ => _.charCodeAt(0).toString(16)).join("")}`);
  dbs.schema.names.save({
    _id,
    schema_id,
    version,
    revisions: {
      '0.0.1': [
        `Initialize based on business model`,
      ],
    },
  });

  const type = {
    oid   : {mongo_type: `bson.ObjectId`, sql_type: `objectid`  },
    str   : {mongo_type: `string`       , sql_type: `varchar`   },
    float : {mongo_type: `float64`      , sql_type: `float`     },
    int   : {mongo_type: `int`          , sql_type: `int`       },
    int64 : {mongo_type: `int64`        , sql_type: `int`       },
    bool  : {mongo_type: `bool`         , sql_type: `boolean`   },
    date  : {mongo_type: `date`         , sql_type: `timestamp` },
    _ : {mongo_type: ``, sql_type: ``},
  };
  dbs.schema.schemas.save({
    _id: schema_id,
    created: time,
    version,
    schema: { databases: [
      { name: `Proteus`,
        tables: [
          { sql_name: `betlogs`,
            mongo_name: `betlogs`,
            pipeline: `[{"$project": {"_id": 0}}]`,
            columns: [
              Object.extend({mongo_name: `time.request` , sql_name: `requestTime` }, type.str  ),
              Object.extend({mongo_name: `time.response`, sql_name: `responseMs`  }, type.float),
              Object.extend({mongo_name: `time.log`     , sql_name: `logMs`       }, type.float),
              Object.extend({mongo_name: `data.memberId`, sql_name: `memberId`    }, type.int64),
              Object.extend({mongo_name: `data.currency`, sql_name: `currency`    }, type.str  ),
              Object.extend({mongo_name: `data.gameType`, sql_name: `gameType`    }, type.int  ),
              Object.extend({mongo_name: `data.roundId` , sql_name: `roundId`     }, type.int64),
              Object.extend({mongo_name: `data.choiceId`, sql_name: `choiceId`    }, type.int  ),
              Object.extend({mongo_name: `data.amount`  , sql_name: `amount`      }, type.int  ),
              Object.extend({mongo_name: `data.balance` , sql_name: `balance`     }, type.float),
              Object.extend({mongo_name: `system`       , sql_name: `system`      }, type.int  ),
            ],
          },
        ],
      },
      { name: `archive`,
        tables: [],
      },
      { name: `log`,
        tables: [
          { sql_name: `bets`,
            mongo_name: `bets`,
            pipeline: `[{"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend({mongo_name: `requestTimeStamp` , sql_name: `requestTS`   }, type.str  ),
              Object.extend({mongo_name: `responseTimeStamp`, sql_name: `responseTS`  }, type.str  ),
              Object.extend({mongo_name: `logTimeStamp`     , sql_name: `logTS`       }, type.str  ),
              Object.extend({mongo_name: `system`           , sql_name: `system`      }, type.int  ),
              Object.extend({mongo_name: `call._t`          , sql_name: `callType`    }, type.str  ),
              Object.extend({mongo_name: `call.obCustId`    , sql_name: `obCustId`    }, type.int64),
              Object.extend({mongo_name: `call.currency`    , sql_name: `currency`    }, type.str  ),
              Object.extend({mongo_name: `call.gameTypeId`  , sql_name: `gameTypeId`  }, type.int  ),
              Object.extend({mongo_name: `call.gameRoundId` , sql_name: `gameRoundId` }, type.int64),
              Object.extend({mongo_name: `call.choiceId`    , sql_name: `choiceId`    }, type.int  ),
              Object.extend({mongo_name: `call.amount`      , sql_name: `amount`      }, type.str  ),
              Object.extend({mongo_name: `call.ip`          , sql_name: `ip`          }, type.str  ),
              Object.extend({mongo_name: `call.freeBet`     , sql_name: `freeBet`     }, type.bool ),
              Object.extend({mongo_name: `call.freeSpin`    , sql_name: `freeSpin`    }, type.bool ),
              Object.extend({mongo_name: `result.obTransId` , sql_name: `obTransId`   }, type.int64),
              Object.extend({mongo_name: `result.balance`   , sql_name: `balance`     }, type.str  ),
            ],
          },
          { sql_name: `bets_failed`,
            mongo_name: `failed_requests`,
            pipeline: `[{"$match": {"call._t": "PlaceBetCall"}}, {"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend({mongo_name: `requestTimeStamp`       , sql_name: `requestTS`   }, type.str  ),
              Object.extend({mongo_name: `responseTimeStamp`      , sql_name: `responseTS`  }, type.str  ),
              Object.extend({mongo_name: `logTimeStamp`           , sql_name: `logTS`       }, type.str  ),
              Object.extend({mongo_name: `system`                 , sql_name: `system`      }, type.int  ),
              Object.extend({mongo_name: `call._t`                , sql_name: `callType`    }, type.str  ),
              Object.extend({mongo_name: `call.obCustId`          , sql_name: `obCustId`    }, type.int64),
              Object.extend({mongo_name: `call.currency`          , sql_name: `currency`    }, type.str  ),
              Object.extend({mongo_name: `call.gameTypeId`        , sql_name: `gameTypeId`  }, type.int  ),
              Object.extend({mongo_name: `call.gameRoundId`       , sql_name: `gameRoundId` }, type.int64),
              Object.extend({mongo_name: `call.choiceId`          , sql_name: `choiceId`    }, type.int  ),
              Object.extend({mongo_name: `call.amount`            , sql_name: `amount`      }, type.str  ),
              Object.extend({mongo_name: `call.ip`                , sql_name: `ip`          }, type.str  ),
              Object.extend({mongo_name: `call.freeBet`           , sql_name: `freeBet`     }, type.bool ),
              Object.extend({mongo_name: `call.freeSpin`          , sql_name: `freeSpin`    }, type.bool ),
              Object.extend({mongo_name: `result.errorCode`       , sql_name: `errorCode`   }, type.str  ),
              Object.extend({mongo_name: `result.errorMessage`    , sql_name: `errorMsg`    }, type.str  ),
              Object.extend({mongo_name: `result.errorDescription`, sql_name: `errorDesc`   }, type.str  ),
            ],
          },
          { sql_name: `end_games`,
            mongo_name: `end_games`,
            pipeline: `[{"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend({mongo_name: `requestTimeStamp`   , sql_name: `requestTS`     }, type.str  ),
              Object.extend({mongo_name: `responseTimeStamp`  , sql_name: `responseTS`    }, type.str  ),
              Object.extend({mongo_name: `logTimeStamp`       , sql_name: `logTS`         }, type.str  ),
              Object.extend({mongo_name: `system`             , sql_name: `system`        }, type.int  ),
              Object.extend({mongo_name: `call._t`            , sql_name: `callType`      }, type.str  ),
              Object.extend({mongo_name: `call.obCustId`      , sql_name: `obCustId`      }, type.int64),
              Object.extend({mongo_name: `call.gameTypeId`    , sql_name: `gameTypeId`    }, type.int  ),
              Object.extend({mongo_name: `call.gameRoundId`   , sql_name: `gameRoundId`   }, type.int64),
              Object.extend({mongo_name: `call.totalAmount`   , sql_name: `totalAmount`   }, type.str  ),
              Object.extend({mongo_name: `call.validBetAmount`, sql_name: `validBetAmount`}, type.str  ),
              Object.extend({mongo_name: `call.totalWin`      , sql_name: `totalWin`      }, type.str  ),
              Object.extend({mongo_name: `call.endTime`       , sql_name: `endTS`         }, type.str  ),
              Object.extend({mongo_name: `call.freeBet`       , sql_name: `freeBet`       }, type.bool ),
            ],
          },
          { sql_name: `end_games_failed`,
            mongo_name: `failed_requests`,
            pipeline: `[{"$match": {"call._t": "EndGameCall"}}, {"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend({mongo_name: `requestTimeStamp`       , sql_name: `requestTS`     }, type.str  ),
              Object.extend({mongo_name: `responseTimeStamp`      , sql_name: `responseTS`    }, type.str  ),
              Object.extend({mongo_name: `logTimeStamp`           , sql_name: `logTS`         }, type.str  ),
              Object.extend({mongo_name: `system`                 , sql_name: `system`        }, type.int  ),
              Object.extend({mongo_name: `call._t`                , sql_name: `callType`      }, type.str  ),
              Object.extend({mongo_name: `call.obCustId`          , sql_name: `obCustId`      }, type.int64),
              Object.extend({mongo_name: `call.gameTypeId`        , sql_name: `gameTypeId`    }, type.int  ),
              Object.extend({mongo_name: `call.gameRoundId`       , sql_name: `gameRoundId`   }, type.int64),
              Object.extend({mongo_name: `call.totalAmount`       , sql_name: `totalAmount`   }, type.str  ),
              Object.extend({mongo_name: `call.validBetAmount`    , sql_name: `validBetAmount`}, type.str  ),
              Object.extend({mongo_name: `call.totalWin`          , sql_name: `totalWin`      }, type.str  ),
              Object.extend({mongo_name: `call.endTime`           , sql_name: `endTS`         }, type.str  ),
              Object.extend({mongo_name: `call.freeBet`           , sql_name: `freeBet`       }, type.bool ),
              Object.extend({mongo_name: `result.errorCode`       , sql_name: `errorCode`     }, type.str  ),
              Object.extend({mongo_name: `result.errorMessage`    , sql_name: `errorMsg`      }, type.str  ),
              Object.extend({mongo_name: `result.errorDescription`, sql_name: `errorDesc`     }, type.str  ),
            ],
          },
          { sql_name: `enter_portal_failed`,
            mongo_name: `failed_requests`,
            pipeline: `[{"$match": {"call._t": "EnterPortalCall"}}, {"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend({mongo_name: `requestTimeStamp`       , sql_name: `requestTS`     }, type.str  ),
              Object.extend({mongo_name: `responseTimeStamp`      , sql_name: `responseTS`    }, type.str  ),
              Object.extend({mongo_name: `logTimeStamp`           , sql_name: `logTS`         }, type.str  ),
              Object.extend({mongo_name: `system`                 , sql_name: `system`        }, type.int  ),
              Object.extend({mongo_name: `call._t`                , sql_name: `callType`      }, type.str  ),
              Object.extend({mongo_name: `call.seq`               , sql_name: `seq`           }, type.str  ),
              Object.extend({mongo_name: `call.obCustId`          , sql_name: `obCustId`      }, type.int64),
              Object.extend({mongo_name: `call.characterName`     , sql_name: `characterName` }, type.str  ),
              Object.extend({mongo_name: `call.firstLogin`        , sql_name: `firstLogin`    }, type.bool ),
              Object.extend({mongo_name: `result.errorCode`       , sql_name: `errorCode`     }, type.str  ),
              Object.extend({mongo_name: `result.errorMessage`    , sql_name: `errorMsg`      }, type.str  ),
              Object.extend({mongo_name: `result.errorDescription`, sql_name: `errorDesc`     }, type.str  ),
            ],
          },
          { sql_name: `get_balance_failed`,
            mongo_name: `failed_requests`,
            pipeline: `[{"$match": {"call._t": "GetBalanceCall"}}, {"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend({mongo_name: `requestTimeStamp`       , sql_name: `requestTS`     }, type.str  ),
              Object.extend({mongo_name: `responseTimeStamp`      , sql_name: `responseTS`    }, type.str  ),
              Object.extend({mongo_name: `logTimeStamp`           , sql_name: `logTS`         }, type.str  ),
              Object.extend({mongo_name: `system`                 , sql_name: `system`        }, type.int  ),
              Object.extend({mongo_name: `call._t`                , sql_name: `callType`      }, type.str  ),
              Object.extend({mongo_name: `call.obCustId`          , sql_name: `obCustId`      }, type.int64),
              Object.extend({mongo_name: `result.errorCode`       , sql_name: `errorCode`     }, type.str  ),
              Object.extend({mongo_name: `result.errorMessage`    , sql_name: `errorMsg`      }, type.str  ),
              Object.extend({mongo_name: `result.errorDescription`, sql_name: `errorDesc`     }, type.str  ),
            ],
          },
          { sql_name: `signins`,
            mongo_name: `signin_requests`,
            pipeline: `[{"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend({mongo_name: `requestTimeStamp`         , sql_name: `requestTS`       }, type.str  ),
              Object.extend({mongo_name: `responseTimeStamp`        , sql_name: `responseTS`      }, type.str  ),
              Object.extend({mongo_name: `logTimeStamp`             , sql_name: `logTS`           }, type.str  ),
              Object.extend({mongo_name: `system`                   , sql_name: `system`          }, type.int  ),
              Object.extend({mongo_name: `request._t`               , sql_name: `callType`        }, type.str  ),
              Object.extend({mongo_name: `request.seq`              , sql_name: `seq`             }, type.str  ),
              Object.extend({mongo_name: `request.memberId`         , sql_name: `memberId`        }, type.int64),
              Object.extend({mongo_name: `request.memberName`       , sql_name: `memberName`      }, type.str  ),
              Object.extend({mongo_name: `request.browserUserAgent` , sql_name: `browserUserAgent`}, type.str  ),
              Object.extend({mongo_name: `request.currency`         , sql_name: `currency`        }, type.str  ),
              Object.extend({mongo_name: `request.language`         , sql_name: `language`        }, type.str  ),
              Object.extend({mongo_name: `request.iP`               , sql_name: `ip`              }, type.str  ),
              Object.extend({mongo_name: `request.isMobi`           , sql_name: `isMobi`          }, type.bool ),
            ],
          },
        ],
      },
      { name: `member`,
        tables: [
          { sql_name: `member_auths`,
            mongo_name: `member_auths`,
            pipeline: `[]`,
            columns: [
              Object.extend({mongo_name: `time`             , sql_name: `time`            }, type.date ),
              Object.extend({mongo_name: `memberId`         , sql_name: `memberId`        }, type.int64),
              Object.extend({mongo_name: `memberName`       , sql_name: `memberName`      }, type.str  ),
              Object.extend({mongo_name: `currency`         , sql_name: `currency`        }, type.str  ),
              Object.extend({mongo_name: `language`         , sql_name: `language`        }, type.str  ),
              Object.extend({mongo_name: `clientId`         , sql_name: `clientId`        }, type.str  ),
              Object.extend({mongo_name: `seq`              , sql_name: `seq`             }, type.str  ),
              Object.extend({mongo_name: `isMobi`           , sql_name: `isMobi`          }, type.bool ),
              Object.extend({mongo_name: `iP`               , sql_name: `ip`              }, type.str  ),
              Object.extend({mongo_name: `domain`           , sql_name: `domain`          }, type.str  ),
              Object.extend({mongo_name: `browserUserAgent` , sql_name: `browserUserAgent`}, type.str  ),
            ],
          },
        ],
      },
      { name: `minigame`,
        tables: [
          /** ARCHIVE STATUSES (B) */
          { sql_name: `archive_statuses`,
            mongo_name: `archive_statuses`,
            pipeline: `[
              {"$project": {
                "_id": 0,
                "name": 1,
                "_phiens": {"$ifNull": ["$lastArcId._phiens", "$lastArcId._rounds"]},
                "_cuocs": "$lastArcId._cuocs",
                "_freespins": "$lastArcId._freespins"
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `name`       , sql_name: `name`              }, type.str  ),
              Object.extend({mongo_name: `_phiens`    , sql_name: `lastArcRoundId`    }, type.int64),
              Object.extend({mongo_name: `_cuocs`     , sql_name: `lastArcBetId`      }, type.int64),
              Object.extend({mongo_name: `_freespins` , sql_name: `lastArcFreeSpinId` }, type.int64),
            ],
          },
          /** BACCARAT (G) */
          { sql_name: `baccarat_rounds`,
            mongo_name: `baccarat_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `baccarat_tickets`,
            mongo_name: `baccarat_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "banker": 1, "bankerPair": 1, "player": 1, "playerPair": 1, "tie": 1, "big": 1, "small": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$banker", "$bankerPair", "$player", "$playerPair", "$tie", "$big", "$small"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `banker`     , sql_name: `banker`    }, type.int64),
              Object.extend({mongo_name: `tie`        , sql_name: `tie`       }, type.int64),
              Object.extend({mongo_name: `player`     , sql_name: `player`    }, type.int64),
              Object.extend({mongo_name: `bankerPair` , sql_name: `bankerPair`}, type.int64),
              Object.extend({mongo_name: `playerPair` , sql_name: `playerPair`}, type.int64),
            ],
          },
          /** BAUCUA (G) */
          { sql_name: `baucua_rounds`,
            mongo_name: `baucua_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `baucua_tickets`,
            mongo_name: `baucua_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "stag"    : {"$ifNull": ["$stag"    , "$0"]},
                "gourd"   : {"$ifNull": ["$gourd"   , "$1"]},
                "rooster" : {"$ifNull": ["$rooster" , "$2"]},
                "fish"    : {"$ifNull": ["$fish"    , "$3"]},
                "crab"    : {"$ifNull": ["$crab"    , "$4"]},
                "prawn"   : {"$ifNull": ["$prawn"   , "$5"]},
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": [
                  {"$ifNull": ["$stag"    , "$0"]},
                  {"$ifNull": ["$gourd"   , "$1"]},
                  {"$ifNull": ["$rooster" , "$2"]},
                  {"$ifNull": ["$fish"    , "$3"]},
                  {"$ifNull": ["$crab"    , "$4"]},
                  {"$ifNull": ["$prawn"   , "$5"]}
                ]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `crab`       , sql_name: `crab`      }, type.int64),
              Object.extend({mongo_name: `fish`       , sql_name: `fish`      }, type.int64),
              Object.extend({mongo_name: `gourd`      , sql_name: `gourd`     }, type.int64),
              Object.extend({mongo_name: `prawn`      , sql_name: `prawn`     }, type.int64),
              Object.extend({mongo_name: `rooster`    , sql_name: `rooster`   }, type.int64),
              Object.extend({mongo_name: `stag`       , sql_name: `stag`      }, type.int64),
            ],
          },
          /** BLACKJACK (Gs) */
          { sql_name: `blackjack_rounds`,
            mongo_name: `blackjack_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1, "ended": 1, "roundStartTime": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`             , sql_name: `id`        }, type.int64),
              Object.extend({mongo_name: `time`           , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `roundStartTime` , sql_name: `startTime` }, type.date ),
              Object.extend({mongo_name: `ended`          , sql_name: `ended`     }, type.bool ),
              Object.extend({mongo_name: `archived`       , sql_name: `archived`  }, type.bool ),
            ],
          },
          { sql_name: `blackjack_tickets`,
            mongo_name: `blackjack_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "id": 1, "pos": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": "$bet",
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Additional Info */
              Object.extend({mongo_name: `id`         , sql_name: `id`        }, type.int64),
              Object.extend({mongo_name: `pos`        , sql_name: `pos`       }, type.int64),
            ],
          },
          /** CHANLE (Gb) */
          { sql_name: `chanle_rounds`,
            mongo_name: `chanle_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `chanle_tickets`,
            mongo_name: `chanle_ones`,
            pipeline: `[
              {"$match": {"memberId": {"$gt": 0}}},
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "odd": {"$cond": [{"$eq": ["$choice", "odd"]}, "$totalAmount", 0]},
                "even": {"$cond": [{"$eq": ["$choice", "even"]}, "$totalAmount", 0]},
                "thanhtoan": 1,
                "totalAmount": {"$ifNull": ["$totalAmount", "$bet"]},
                "betwin": {"$sum": [
                  {"$multiply": ["$betwin", {"$toInt": "$win"}]},
                  {"$multiply": [{"$ifNull": ["$totalAmount", "$bet"]}, {"$toInt": "$win"}]},
                  {"$multiply": [{"$ifNull": ["$refund", "$tralai"]}, {"$toInt": {"$not": "$win"}}]}
                ]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
            ],
          },
          /** CHANLETURBO (Gb) */
          { sql_name: `chanleturbo_rounds`,
            mongo_name: `chanleturbo_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `chanleturbo_tickets`,
            mongo_name: `chanleturbo_ones`,
            pipeline: `[
              {"$match": {"memberId": {"$gt": 0}}},
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "odd": {"$cond": [{"$eq": ["$choice", "odd"]}, "$totalAmount", 0]},
                "even": {"$cond": [{"$eq": ["$choice", "even"]}, "$totalAmount", 0]},
                "thanhtoan": 1,
                "totalAmount": {"$ifNull": ["$totalAmount", "$bet"]},
                "betwin": {"$sum": [
                  {"$multiply": ["$betwin", {"$toInt": "$win"}]},
                  {"$multiply": [{"$ifNull": ["$totalAmount", "$bet"]}, {"$toInt": "$win"}]},
                  {"$multiply": [{"$ifNull": ["$refund", "$tralai"]}, {"$toInt": {"$not": "$win"}}]}
                ]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
            ],
          },
          /** FOUR GUARDIANS (Gsl) */
          { sql_name: `fourguardians_rounds`,
            mongo_name: `fourguardians_rounds`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `fourguardians_tickets`,
            mongo_name: `fourguardians_rounds`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeSpin": 1, "id": 1, "uid": 1, "name": 1, "time": 1, "memberId": 1, "endTime": 1,
                "bet": 1, "paid": 1,
                "betwin": "$betWin",
                "totalAmount": {"$multiply": ["$totalAmount", {"$toInt": {"$not": "$freeSpin"}}]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `id`         , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.float),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `bet`        , sql_name: `pool`      }, type.float),
              Object.extend({mongo_name: `paid`       , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeSpin`   , sql_name: `freeSpin`  }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Additional Info */
              Object.extend({mongo_name: `endTime`    , sql_name: `endTime`   }, type.date ),
            ],
          },
          { sql_name: `fourguardians_freespins`,
            mongo_name: `fourguardians_freespins`,
            pipeline: `[
              {"$project": {
                "_id": 0, "uid": 1, "memberId": 1, "name": 1,
                "id": 1, "roundId": 1,
                "bet": 1, "total": 1, "available": 1,
                "time": 1, "expiryTime": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `roundId`    , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              /* Additional Info */
              Object.extend({mongo_name: `id`         , sql_name: `id`        }, type.int64),
              Object.extend({mongo_name: `total`      , sql_name: `total`     }, type.int  ),
              Object.extend({mongo_name: `available`  , sql_name: `available` }, type.int  ),
              Object.extend({mongo_name: `bet`        , sql_name: `pool`      }, type.float),
              Object.extend({mongo_name: `expiryTime` , sql_name: `expiryTime`}, type.date ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
            ],
          },
          { sql_name: `fourguardians_fames`,
            mongo_name: `fourguardians_fames`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeSpin": 1, "uid": 1, "name": 1, "memberId": 1, "roundId": 1, "time": 1,
                "bet": 1, "totalAmount": 1, "winningAmount": 1
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`         , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `roundId`      , sql_name: `roundId` }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`          , sql_name: `uid`     }, type.str  ),
              Object.extend({mongo_name: `memberId`     , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `name`         , sql_name: `nickname`}, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`  , sql_name: `stake`   }, type.float),
              Object.extend({mongo_name: `winningAmount`, sql_name: `payout`  }, type.float),
              /* Additional Info */
              Object.extend({mongo_name: `bet`          , sql_name: `pool`    }, type.float),
              Object.extend({mongo_name: `freeSpin`     , sql_name: `freeSpin`}, type.bool ),
            ],
          },
          /** GAME CONFIG (Gm) */
          { sql_name: `game_configs`,
            mongo_name: `game_configs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "type": 1, "name": 1, "enabled": 1, "botenabled": 1,
                "minbet": 1, "maxbet": 1, "bot_maxbet": 1,
                "disabledround": 1, "disabled_message": 1, "delayStartTime": 1,
                "enableFreeBet": 1, "smartBotEnabled": 1, "smartBotGroupRatio": 1
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `name`               , sql_name: `name`              }, type.str  ),
              Object.extend({mongo_name: `time`               , sql_name: `time`              }, type.date ),
              Object.extend({mongo_name: `type`               , sql_name: `type`              }, type.int  ),
              Object.extend({mongo_name: `enabled`            , sql_name: `enabled`           }, type.bool ),
              Object.extend({mongo_name: `botenabled`         , sql_name: `botEnabled`        }, type.bool ),
              Object.extend({mongo_name: `minbet`             , sql_name: `minBet`            }, type.float),
              Object.extend({mongo_name: `maxbet`             , sql_name: `maxBet`            }, type.float),
              Object.extend({mongo_name: `bot_maxbet`         , sql_name: `botMaxBet`         }, type.float),
              Object.extend({mongo_name: `disabledround`      , sql_name: `disabledRound`     }, type.int64),
              Object.extend({mongo_name: `disabled_message`   , sql_name: `disabledMsg`       }, type.str  ),
              Object.extend({mongo_name: `delayStartTime`     , sql_name: `delayStartTime`    }, type.int  ),
              Object.extend({mongo_name: `enableFreeBet`      , sql_name: `enableFreeBet`     }, type.bool ),
              Object.extend({mongo_name: `smartBotEnabled`    , sql_name: `smartBotEnabled`   }, type.bool ),
              Object.extend({mongo_name: `smartBotGroupRatio` , sql_name: `smartBotGroupRatio`}, type.int  ),
            ],
          },
          /** ID COUNTERS (M) */
          { sql_name: `idcounters`,
            mongo_name: `idcounters`,
            pipeline: `[
              {"$project": {
                "_id": 0, "f": 1, "m": 1, "c": 1
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `m`, sql_name: `model`   }, type.str  ),
              Object.extend({mongo_name: `f`, sql_name: `field`   }, type.str  ),
              Object.extend({mongo_name: `c`, sql_name: `counter` }, type.int64),
            ],
          },
          /** JACKPOTS (Gm) */
          { sql_name: `jackpots`,
            mongo_name: `jackpots`,
            pipeline: `[
              {"$project": {
                "_id": 0, "gameId": 1, "gameName": 1,
                "createdAt": 1, "createdTime": 1,
                "pool": 1, "amount": 1, "initAmount": 1, "byBots": 1, "byMembers": 1,
                "hitAt": 1, "hitTime": 1, "winnerId": 1, "winnerName": 1, "winningRatio": 1
              }}
            ]`,
            columns: [
              /* Game Information */
              Object.extend({mongo_name: `gameId`       , sql_name: `gameId`      }, type.int  ),
              Object.extend({mongo_name: `gameName`     , sql_name: `gameName`    }, type.str  ),
              /* Creation */
              Object.extend({mongo_name: `createdAt`    , sql_name: `createdAt`   }, type.int64),
              Object.extend({mongo_name: `createdTime`  , sql_name: `createdTime` }, type.date ),
              /* Jackpot Details */
              Object.extend({mongo_name: `pool`         , sql_name: `pool`        }, type.float),
              Object.extend({mongo_name: `amount`       , sql_name: `amount`      }, type.float),
              Object.extend({mongo_name: `initAmount`   , sql_name: `initAmount`  }, type.float),
              Object.extend({mongo_name: `byBots`       , sql_name: `byBots`      }, type.float),
              Object.extend({mongo_name: `byMembers`    , sql_name: `byMembers`   }, type.float),
              /* Winning Information */
              Object.extend({mongo_name: `hitAt`        , sql_name: `hitAt`       }, type.int64),
              Object.extend({mongo_name: `hitTime`      , sql_name: `hitTime`     }, type.date ),
              Object.extend({mongo_name: `winnerId`     , sql_name: `winnerId`    }, type.int64),
              Object.extend({mongo_name: `winnerName`   , sql_name: `winnerName`  }, type.str  ),
              Object.extend({mongo_name: `winningRatio` , sql_name: `winningRatio`}, type.float),
            ],
          },
          /** KENOS (G) */
          { sql_name: `kenoeast_rounds`,
            mongo_name: `kenoeast_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenoeast_tickets`,
            mongo_name: `kenoeast_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          { sql_name: `kenowest_rounds`,
            mongo_name: `kenowest_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenowest_tickets`,
            mongo_name: `kenowest_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          { sql_name: `kenosouth_rounds`,
            mongo_name: `kenosouth_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenosouth_tickets`,
            mongo_name: `kenosouth_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          { sql_name: `kenonorth_rounds`,
            mongo_name: `kenonorth_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenonorth_tickets`,
            mongo_name: `kenonorth_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          { sql_name: `kenomax_rounds`,
            mongo_name: `kenomax_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenomax_tickets`,
            mongo_name: `kenomax_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          { sql_name: `kenomax2_rounds`,
            mongo_name: `kenomax2_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenomax2_tickets`,
            mongo_name: `kenomax2_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          { sql_name: `kenomini_rounds`,
            mongo_name: `kenomini_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenomini_tickets`,
            mongo_name: `kenomini_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          { sql_name: `kenomini2_rounds`,
            mongo_name: `kenomini2_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenomini2_tickets`,
            mongo_name: `kenomini2_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          /** KENO PRO MAX (G) */
          { sql_name: `kenopromax_rounds`,
            mongo_name: `kenopromax_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenopromax_tickets`,
            mongo_name: `kenopromax_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          /** KENO PRO VIET (G) */
          { sql_name: `kenoproviet_rounds`,
            mongo_name: `kenoproviet_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `kenoproviet_tickets`,
            mongo_name: `kenoproviet_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "even": 1, "odd": 1, "gold": 1, "wood": 1, "fire": 1, "water": 1, "earth": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$small", "$even", "$odd", "$gold", "$wood", "$fire", "$water", "$earth"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `gold`       , sql_name: `gold`      }, type.int64),
              Object.extend({mongo_name: `wood`       , sql_name: `wood`      }, type.int64),
              Object.extend({mongo_name: `fire`       , sql_name: `fire`      }, type.int64),
              Object.extend({mongo_name: `water`      , sql_name: `water`     }, type.int64),
              Object.extend({mongo_name: `earth`      , sql_name: `earth`     }, type.int64),
            ],
          },
          /** LOTTERY (G) */
          { sql_name: `lottery_rounds`,
            mongo_name: `lottery_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `lottery_tickets`,
            mongo_name: `lottery_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "totalAmount": 1, "betwin": 1, "thanhtoan": 1,
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
            ],
          },
          /** DRAGON TIGER (G) */
          { sql_name: `minidragontiger_rounds`,
            mongo_name: `minidragontiger_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `minidragontiger_tickets`,
            mongo_name: `minidragontiger_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "dragon": 1, "tie": 1, "tiger": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$dragon", "$tie", "$tiger"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId` }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`     }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`}, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`}, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`   }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`  }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled` }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet` }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`  }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`}, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `dragon`     , sql_name: `dragon`  }, type.int64),
              Object.extend({mongo_name: `tie`        , sql_name: `tie`     }, type.int64),
              Object.extend({mongo_name: `tiger`      , sql_name: `tiger`   }, type.int64),
            ],
          },
          /** MINI SEDIE (G) */
          { sql_name: `minisedie_rounds`,
            mongo_name: `minisedie_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `minisedie_tickets`,
            mongo_name: `minisedie_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "even": 1, "odd": 1, "red3": 1, "red4": 1, "white3": 1, "white4": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$even", "$odd", "$red3", "$red4", "$white3", "$white4"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId` }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`     }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`}, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`}, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`   }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`  }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled` }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet` }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`  }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`}, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `odd`        , sql_name: `odd`     }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`    }, type.int64),
              Object.extend({mongo_name: `red4`       , sql_name: `red4`    }, type.int64),
              Object.extend({mongo_name: `red3`       , sql_name: `red3`    }, type.int64),
              Object.extend({mongo_name: `white3`     , sql_name: `white3`  }, type.int64),
              Object.extend({mongo_name: `white4`     , sql_name: `white4`  }, type.int64),
            ],
          },
          /** ROULETTE (G) */
          { sql_name: `roulette_rounds`,
            mongo_name: `roulette_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `roulette_tickets`,
            mongo_name: `roulette_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "straightUp": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$straightUp"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "split": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$split"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "street": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$street"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "triangle": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$triangle"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "corner": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$corner"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "fourNumbers": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$fourNumbers"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "line": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$line"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "column": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$column"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "dozen": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$dozen"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "redBlack": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$redBlack"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "oddEven": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$oddEven"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "bigSmall": {"$ifNull": [{"$reduce": {
                  "input": {"$objectToArray": "$bigSmall"},
                  "initialValue": 0,
                  "in": {"$add": ["$$value", "$$this.v"]}
                }}, 0]},
                "totalAmount": 1, "betwin": 1, "thanhtoan": 1,
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`        }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`     }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`         }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`    }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`    }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`    }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`       }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`      }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`     }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`     }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`      }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`    }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `straightUp` , sql_name: `straightUp`  }, type.int64),
              Object.extend({mongo_name: `split`      , sql_name: `split`       }, type.int64),
              Object.extend({mongo_name: `street`     , sql_name: `street`      }, type.int64),
              Object.extend({mongo_name: `triangle`   , sql_name: `triangle`    }, type.int64),
              Object.extend({mongo_name: `corner`     , sql_name: `corner`      }, type.int64),
              Object.extend({mongo_name: `fourNumbers`, sql_name: `fourNumbers` }, type.int64),
              Object.extend({mongo_name: `line`       , sql_name: `line`        }, type.int64),
              Object.extend({mongo_name: `column`     , sql_name: `column`      }, type.int64),
              Object.extend({mongo_name: `dozen`      , sql_name: `dozen`       }, type.int64),
              Object.extend({mongo_name: `redBlack`   , sql_name: `redBlack`    }, type.int64),
              Object.extend({mongo_name: `oddEven`    , sql_name: `oddEven`     }, type.int64),
              Object.extend({mongo_name: `bigSmall`   , sql_name: `bigSmall`    }, type.int64),
            ],
          },
          /** SICBO (G) */
          { sql_name: `sicbo_rounds`,
            mongo_name: `sicbo_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `sicbo_tickets`,
            mongo_name: `sicbo_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "totalAmount": 1, "betwin": 1, "thanhtoan": 1,
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId` }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
            ],
          },
          /** SMARTBOT TAIXIU (S) */
          { sql_name: `smartbot_taixiu_patterns`,
            mongo_name: `smartbot_taixiu_patterns`,
            pipeline: `[]`,
            columns: [
              Object.extend({mongo_name: `_id`      , sql_name: `patId`   }, type.int  ),
              Object.extend({mongo_name: `memberId` , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `group`    , sql_name: `group`   }, type.str  ),
              Object.extend({mongo_name: `stake`    , sql_name: `stake`   }, type.float),
            ],
          },
          { sql_name: `smartbot_taixiu_bets`,
            mongo_name: `smartbot_taixiu_bets`,
            pipeline: `[
              {"$project": {"_id": 0}}
            ]`,
            columns: [
              Object.extend({mongo_name: `patId`    , sql_name: `patId`   }, type.int  ),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.int64),
              Object.extend({mongo_name: `round`    , sql_name: `round`   }, type.int  ),
              Object.extend({mongo_name: `second`   , sql_name: `second`  }, type.int  ),
              Object.extend({mongo_name: `choiceId` , sql_name: `choiceId`}, type.int  ),
              Object.extend({mongo_name: `amount`   , sql_name: `amount`  }, type.float),
            ],
          },
          /** SMARTBOT TXTURBO (S) */
          { sql_name: `smartbot_txturbo_patterns`,
            mongo_name: `smartbot_txturbo_patterns`,
            pipeline: `[]`,
            columns: [
              Object.extend({mongo_name: `_id`      , sql_name: `patId`   }, type.int  ),
              Object.extend({mongo_name: `memberId` , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `group`    , sql_name: `group`   }, type.str  ),
              Object.extend({mongo_name: `stake`    , sql_name: `stake`   }, type.float),
            ],
          },
          { sql_name: `smartbot_txturbo_bets`,
            mongo_name: `smartbot_txturbo_bets`,
            pipeline: `[
              {"$project": {"_id": 0}}
            ]`,
            columns: [
              Object.extend({mongo_name: `patId`    , sql_name: `patId`   }, type.int  ),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.int64),
              Object.extend({mongo_name: `round`    , sql_name: `round`   }, type.int  ),
              Object.extend({mongo_name: `second`   , sql_name: `second`  }, type.int  ),
              Object.extend({mongo_name: `choiceId` , sql_name: `choiceId`}, type.int  ),
              Object.extend({mongo_name: `amount`   , sql_name: `amount`  }, type.float),
            ],
          },
          /** SMARTBOT VIPSEDIE (S) */
          { sql_name: `smartbot_vipsedie_patterns`,
            mongo_name: `smartbot_vipsedie_patterns`,
            pipeline: `[]`,
            columns: [
              Object.extend({mongo_name: `_id`      , sql_name: `patId`   }, type.int  ),
              Object.extend({mongo_name: `memberId` , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `group`    , sql_name: `group`   }, type.str  ),
              Object.extend({mongo_name: `stake`    , sql_name: `stake`   }, type.float),
            ],
          },
          { sql_name: `smartbot_vipsedie_bets`,
            mongo_name: `smartbot_vipsedie_bets`,
            pipeline: `[
              {"$project": {"_id": 0}}
            ]`,
            columns: [
              Object.extend({mongo_name: `patId`    , sql_name: `patId`   }, type.int  ),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.int64),
              Object.extend({mongo_name: `round`    , sql_name: `round`   }, type.int  ),
              Object.extend({mongo_name: `second`   , sql_name: `second`  }, type.int  ),
              Object.extend({mongo_name: `choiceId` , sql_name: `choiceId`}, type.int  ),
              Object.extend({mongo_name: `amount`   , sql_name: `amount`  }, type.float),
            ],
          },
          /** SMARTBOT XOCXOC (S) */
          { sql_name: `smartbot_xocxoc_patterns`,
            mongo_name: `smartbot_xocxoc_patterns`,
            pipeline: `[]`,
            columns: [
              Object.extend({mongo_name: `_id`      , sql_name: `patId`   }, type.int  ),
              Object.extend({mongo_name: `memberId` , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `group`    , sql_name: `group`   }, type.str  ),
              Object.extend({mongo_name: `stake`    , sql_name: `stake`   }, type.float),
            ],
          },
          { sql_name: `smartbot_xocxoc_bets`,
            mongo_name: `smartbot_xocxoc_bets`,
            pipeline: `[
              {"$project": {"_id": 0}}
            ]`,
            columns: [
              Object.extend({mongo_name: `patId`    , sql_name: `patId`   }, type.int  ),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.int64),
              Object.extend({mongo_name: `round`    , sql_name: `round`   }, type.int  ),
              Object.extend({mongo_name: `second`   , sql_name: `second`  }, type.int  ),
              Object.extend({mongo_name: `choiceId` , sql_name: `choiceId`}, type.int  ),
              Object.extend({mongo_name: `amount`   , sql_name: `amount`  }, type.float),
            ],
          },
          /** SPECIAL SEDIE (G) */
          { sql_name: `specialsedie_rounds`,
            mongo_name: `specialsedie_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `specialsedie_tickets`,
            mongo_name: `specialsedie_ones`,
            pipeline: `[
              {"$match": {"memberId": {"$gt": 0}}},
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "odd": {"$cond": [{"$eq": ["$choice", "odd"]}, "$totalAmount", 0]},
                "even": {"$cond": [{"$eq": ["$choice", "even"]}, "$totalAmount", 0]},
                "thanhtoan": 1,
                "totalAmount": "$amount",
                "betwin": {"$sum": [
                  {"$multiply": ["$betwin", {"$toInt": "$win"}]},
                  {"$multiply": ["$amount", {"$toInt": "$win"}]},
                  {"$multiply": ["$refund", {"$toInt": {"$not": "$win"}}]}
                ]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId` }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`     }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`}, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`}, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`   }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`  }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled` }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`  }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`}, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `odd`        , sql_name: `odd`     }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`    }, type.int64),
            ],
          },
          /** TAIXIU (G) */
          { sql_name: `taixiu_rounds`,
            mongo_name: `taixiu_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `taixiu_tickets`,
            mongo_name: `taixiu_ones`,
            pipeline: `[
              {"$match": {"memberId": {"$gt": 0}}},
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": {"$cond": [{"$eq": ["$choice", "big"]}, "$totalAmount", 0]},
                "small": {"$cond": [{"$eq": ["$choice", "small"]}, "$totalAmount", 0]},
                "thanhtoan": 1,
                "totalAmount": {"$ifNull": ["$totalAmount", "$bet"]},
                "betwin": {"$sum": [
                  {"$multiply": ["$betwin", {"$toInt": "$win"}]},
                  {"$multiply": [{"$ifNull": ["$totalAmount", "$bet"]}, {"$toInt": "$win"}]},
                  {"$multiply": [{"$ifNull": ["$refund", "$tralai"]}, {"$toInt": {"$not": "$win"}}]}
                ]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId` }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`     }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`}, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`}, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`   }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`  }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled` }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`  }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`}, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`     }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`   }, type.int64),
            ],
          },
          /** THREE CARDS (G) */
          { sql_name: `threecards_rounds`,
            mongo_name: `threecards_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `threecards_tickets`,
            mongo_name: `threecards_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "red": 1, "black": 1, "diamonds": 1, "hearts": 1, "clubs": 1, "spades": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$red", "$black", "$diamonds", "$hearts", "$clubs", "$spades"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `red`        , sql_name: `red`       }, type.int64),
              Object.extend({mongo_name: `black`      , sql_name: `black`     }, type.int64),
              Object.extend({mongo_name: `diamonds`   , sql_name: `diamonds`  }, type.int64),
              Object.extend({mongo_name: `hearts`     , sql_name: `hearts`    }, type.int64),
              Object.extend({mongo_name: `clubs`      , sql_name: `clubs`     }, type.int64),
              Object.extend({mongo_name: `spades`     , sql_name: `spades`    }, type.int64),
            ],
          },
          /** TXTURBO (G) */
          { sql_name: `txturbo_rounds`,
            mongo_name: `txturbo_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `txturbo_tickets`,
            mongo_name: `txturbo_ones`,
            pipeline: `[
              {"$match": {"memberId": {"$gt": 0}}},
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": {"$cond": [{"$eq": ["$choice", "big"]}, "$totalAmount", 0]},
                "small": {"$cond": [{"$eq": ["$choice", "small"]}, "$totalAmount", 0]},
                "thanhtoan": 1,
                "totalAmount": {"$ifNull": ["$totalAmount", "$bet"]},
                "betwin": {"$sum": [
                  {"$multiply": ["$betwin", {"$toInt": "$win"}]},
                  {"$multiply": [{"$ifNull": ["$totalAmount", "$bet"]}, {"$toInt": "$win"}]},
                  {"$multiply": [{"$ifNull": ["$refund", "$tralai"]}, {"$toInt": {"$not": "$win"}}]}
                ]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId` }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`     }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`}, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`}, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`}, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`   }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`  }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled` }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`  }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`}, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`     }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`   }, type.int64),
            ],
          },
          /** USERINFOS (U) */
          { sql_name: `userinfos`,
            mongo_name: `userinfos`,
            pipeline: `[
              {"$project": {
                "_id": 0, "id": 1, "joinedOn": 1, "type": 1, "currency": 1, "UID": 1, "name": 1
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `UID`      , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `id`       , sql_name: `uid`     }, type.str  ),
              Object.extend({mongo_name: `name`     , sql_name: `nickname`}, type.str  ),
              Object.extend({mongo_name: `joinedOn` , sql_name: `joinedOn`}, type.date ),
              Object.extend({mongo_name: `type`     , sql_name: `isBot`   }, type.bool ),
              Object.extend({mongo_name: `currency` , sql_name: `currency`}, type.str  ),
            ],
          },
          { sql_name: `users`,
            mongo_name: `users`,
            pipeline: `[
              {"$project": {
                "_id": 1, "local.username": 1, "local.regDate": 1, "local.memberId": 1, "local.memberName": 1, "local.clientId": 1, "local.currency": 1
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `_id`              , sql_name: `uid`       }, type.oid  ),
              Object.extend({mongo_name: `local.username`   , sql_name: `username`  }, type.str  ),
              Object.extend({mongo_name: `local.regDate`    , sql_name: `regDate`   }, type.date ),
              Object.extend({mongo_name: `local.memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `local.memberName` , sql_name: `memberName`}, type.str  ),
              Object.extend({mongo_name: `local.clientId`   , sql_name: `clientId`  }, type.str  ),
              Object.extend({mongo_name: `local.currency`   , sql_name: `currency`  }, type.str  ),
            ],
          },
          { sql_name: `usersessions`,
            mongo_name: `usersessions`,
            pipeline: `[
              {"$project": {
                "_id": 0, "username": 1, "memberId": 1, "memberName": 1, "userId": 1,
                "ssoTime": 1, "recheckInTime": 1,
                "ip": 1, "browserUserAgent": 1, "language": 1, "currency": 1,
                "owSeq": 1, "clientId": 1, "siteName": 1, "system": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `memberId`         , sql_name: `memberId`        }, type.int64),
              Object.extend({mongo_name: `memberName`       , sql_name: `memberName`      }, type.str  ),
              Object.extend({mongo_name: `userId`           , sql_name: `userId`          }, type.str  ),
              Object.extend({mongo_name: `username`         , sql_name: `username`        }, type.str  ),
              Object.extend({mongo_name: `ssoTime`          , sql_name: `ssoTime`         }, type.date ),
              Object.extend({mongo_name: `recheckInTime`    , sql_name: `recheckInTime`   }, type.date ),
              Object.extend({mongo_name: `ip`               , sql_name: `ip`              }, type.str  ),
              Object.extend({mongo_name: `browserUserAgent` , sql_name: `browserUserAgent`}, type.str  ),
              Object.extend({mongo_name: `language`         , sql_name: `language`        }, type.str  ),
              Object.extend({mongo_name: `currency`         , sql_name: `currency`        }, type.str  ),
              Object.extend({mongo_name: `owSeq`            , sql_name: `owSeq`           }, type.str  ),
              Object.extend({mongo_name: `clientId`         , sql_name: `clientId`        }, type.str  ),
              Object.extend({mongo_name: `siteName`         , sql_name: `siteName`        }, type.str  ),
              Object.extend({mongo_name: `system`           , sql_name: `system`          }, type.int  ),
              Object.extend({mongo_name: `archived`         , sql_name: `archived`        }, type.bool ),
            ],
          },
          /** VIP BACCARAT (G) */
          { sql_name: `vipbaccarat_rounds`,
            mongo_name: `vipbaccarat_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `vipbaccarat_tickets`,
            mongo_name: `vipbaccarat_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "banker": 1, "bankerPair": 1, "player": 1, "playerPair": 1, "tie": 1, "big": 1, "small": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$banker", "$bankerPair", "$player", "$playerPair", "$tie", "$big", "$small"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `big`        , sql_name: `big`       }, type.int64),
              Object.extend({mongo_name: `small`      , sql_name: `small`     }, type.int64),
              Object.extend({mongo_name: `banker`     , sql_name: `banker`    }, type.int64),
              Object.extend({mongo_name: `tie`        , sql_name: `tie`       }, type.int64),
              Object.extend({mongo_name: `player`     , sql_name: `player`    }, type.int64),
              Object.extend({mongo_name: `bankerPair` , sql_name: `bankerPair`}, type.int64),
              Object.extend({mongo_name: `playerPair` , sql_name: `playerPair`}, type.int64),
            ],
          },
          /** VIP FISH PRAWN CRAB (G) */
          { sql_name: `vipfishprawncrab_rounds`,
            mongo_name: `vipfishprawncrab_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `vipfishprawncrab_tickets`,
            mongo_name: `vipfishprawncrab_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "stag": 1, "gourd": 1, "rooster": 1, "fish": 1, "crab": 1, "prawn": 1, "mountain": 1, "ocean": 1, "anyTriple": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$stag", "$gourd", "$rooster", "$fish", "$crab", "$prawn", "$mountain", "$ocean", "$anyTriple"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `crab`       , sql_name: `crab`      }, type.int64),
              Object.extend({mongo_name: `fish`       , sql_name: `fish`      }, type.int64),
              Object.extend({mongo_name: `gourd`      , sql_name: `gourd`     }, type.int64),
              Object.extend({mongo_name: `prawn`      , sql_name: `prawn`     }, type.int64),
              Object.extend({mongo_name: `rooster`    , sql_name: `rooster`   }, type.int64),
              Object.extend({mongo_name: `stag`       , sql_name: `stag`      }, type.int64),
              Object.extend({mongo_name: `mountain`   , sql_name: `mountain`  }, type.int64),
              Object.extend({mongo_name: `ocean`      , sql_name: `ocean`     }, type.int64),
            ],
          },
          /** VIP SEDIE (G) */
          { sql_name: `vipsedie_rounds`,
            mongo_name: `vipsedie_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `vipsedie_tickets`,
            mongo_name: `vipsedie_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "even": 1, "odd": 1, "red2": 1, "red3": 1, "red4": 1, "white3": 1, "white4": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$even", "$odd", "$red2", "$red3", "$red4", "$white3", "$white4"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `odd`        , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `even`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `red4`       , sql_name: `red4`      }, type.int64),
              Object.extend({mongo_name: `red3`       , sql_name: `red3`      }, type.int64),
              Object.extend({mongo_name: `red2`       , sql_name: `red2`      }, type.int64),
              Object.extend({mongo_name: `white3`     , sql_name: `white3`    }, type.int64),
              Object.extend({mongo_name: `white4`     , sql_name: `white4`    }, type.int64),
            ],
          },
          /** VIP SEDIE WAR (G) */
          { sql_name: `vipsediewar_rounds`,
            mongo_name: `vipsediewar_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `vipsediewar_tickets`,
            mongo_name: `vipsediewar_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "even": 1, "odd": 1, "red2": 1, "red3": 1, "red4": 1, "white3": 1, "white4": 1,
                "totalAmount": 1, "betwin": 1, "thanhtoan": 1,
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
            ],
          },
          /** XOC XOC (G) */
          { sql_name: `xocxoc_rounds`,
            mongo_name: `xocxoc_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              Object.extend({mongo_name: `id`       , sql_name: `id`      }, type.int64),
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `archived` , sql_name: `archived`}, type.bool ),
            ],
          },
          { sql_name: `xocxoc_tickets`,
            mongo_name: `xocxoc_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "chan": {"$ifNull": ["$even", "$chan"]}, "le": {"$ifNull": ["$odd", "$le"]},
                "red2": {"$ifNull": ["$red2", 0]},
                "red3": 1, "red4": 1, "white3": 1, "white4": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": [
                  {"$multiply": [
                    {"$add": [
                      {"$ifNull": ["$even", "$chan"]},
                      {"$ifNull": ["$odd", "$le"]},
                      {"$ifNull": ["$red2", 0]},
                      "$red3", "$red4", "$white3", "$white4"
                    ]},
                    {"$toInt": {"$not": "$freeBet"}}
                  ]}
                ]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend({mongo_name: `time`       , sql_name: `time`      }, type.date ),
              Object.extend({mongo_name: `phien`      , sql_name: `roundId`   }, type.int64),
              /* Member */
              Object.extend({mongo_name: `uid`        , sql_name: `uid`       }, type.str  ),
              Object.extend({mongo_name: `memberId`   , sql_name: `memberId`  }, type.int64),
              Object.extend({mongo_name: `name`       , sql_name: `nickname`  }, type.str  ),
              Object.extend({mongo_name: `currency`   , sql_name: `currency`  }, type.str  ),
              /* Summary */
              Object.extend({mongo_name: `totalAmount`, sql_name: `stake`     }, type.int64),
              Object.extend({mongo_name: `betwin`     , sql_name: `payout`    }, type.float),
              /* Attributes */
              Object.extend({mongo_name: `thanhtoan`  , sql_name: `settled`   }, type.bool ),
              Object.extend({mongo_name: `freeBet`    , sql_name: `freeBet`   }, type.bool ),
              Object.extend({mongo_name: `isCash`     , sql_name: `isCash`    }, type.bool ),
              Object.extend({mongo_name: `archived`   , sql_name: `archived`  }, type.bool ),
              /* Bet Choices */
              Object.extend({mongo_name: `le`         , sql_name: `odd`       }, type.int64),
              Object.extend({mongo_name: `chan`       , sql_name: `even`      }, type.int64),
              Object.extend({mongo_name: `red4`       , sql_name: `red4`      }, type.int64),
              Object.extend({mongo_name: `red3`       , sql_name: `red3`      }, type.int64),
              Object.extend({mongo_name: `white3`     , sql_name: `white3`    }, type.int64),
              Object.extend({mongo_name: `white4`     , sql_name: `white4`    }, type.int64),
            ],
          },
        ],
      },
      { name: `summary`,
        tables: [
          { sql_name: `betlog_summaries`,
            mongo_name: `betlog_summaries`,
            pipeline: `[{"$project": {"_id": 0}}]`,
            columns: [
              Object.extend({mongo_name: `time`         , sql_name: `time`        }, type.date ),
              Object.extend({mongo_name: `gameId`       , sql_name: `gameId`      }, type.int  ),
              Object.extend({mongo_name: `currency`     , sql_name: `currency`    }, type.str  ),
              Object.extend({mongo_name: `system`       , sql_name: `system`      }, type.int  ),
              Object.extend({mongo_name: `betCount`     , sql_name: `betCount`    }, type.int  ),
              Object.extend({mongo_name: `requestCount` , sql_name: `requestCount`}, type.int  ),
              Object.extend({mongo_name: `totalAmount`  , sql_name: `totalAmount` }, type.float),
            ],
          },
          { sql_name: `daily_summaries`,
            mongo_name: `daily_summaries`,
            pipeline: `[{"$project": {"_id": 0}}]`,
            columns: [
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `gameId`   , sql_name: `gameId`  }, type.int  ),
              Object.extend({mongo_name: `currency` , sql_name: `currency`}, type.str  ),
              Object.extend({mongo_name: `isCash`   , sql_name: `isCash`  }, type.bool ),
              Object.extend({mongo_name: `payout`   , sql_name: `payout`  }, type.float),
              Object.extend({mongo_name: `stake`    , sql_name: `stake`   }, type.float),
              Object.extend({mongo_name: `tickets`  , sql_name: `tickets` }, type.int  ),
            ],
          },
          { sql_name: `hourly_summaries`,
            mongo_name: `hourly_summaries`,
            pipeline: `[{"$project": {"_id": 0}}]`,
            columns: [
              Object.extend({mongo_name: `time`     , sql_name: `time`    }, type.date ),
              Object.extend({mongo_name: `gameId`   , sql_name: `gameId`  }, type.int  ),
              Object.extend({mongo_name: `currency` , sql_name: `currency`}, type.str  ),
              Object.extend({mongo_name: `isCash`   , sql_name: `isCash`  }, type.bool ),
              Object.extend({mongo_name: `payout`   , sql_name: `payout`  }, type.float),
              Object.extend({mongo_name: `stake`    , sql_name: `stake`   }, type.float),
              Object.extend({mongo_name: `tickets`  , sql_name: `tickets` }, type.int  ),
            ],
          },
          { sql_name: `game_summary_config`,
            mongo_name: `game_summary_config`,
            pipeline: `[{"$project": {"_id": 0}}]`,
            columns: [
              Object.extend({mongo_name: `gameId`       , sql_name: `gameId`    }, type.int  ),
              Object.extend({mongo_name: `owGameTypeId` , sql_name: `gameTypeId`}, type.int  ),
              Object.extend({mongo_name: `name.en`      , sql_name: `nameEN`    }, type.str  ),
              Object.extend({mongo_name: `name.vi`      , sql_name: `nameVI`    }, type.str  ),
              Object.extend({mongo_name: `name.grp`     , sql_name: `groupName` }, type.str  ),
              Object.extend({mongo_name: `coll.db`      , sql_name: `db`        }, type.str  ),
              Object.extend({mongo_name: `coll.group`   , sql_name: `coll`      }, type.str  ),
              Object.extend({mongo_name: `coll.round`   , sql_name: `round`     }, type.str  ),
              Object.extend({mongo_name: `coll.postfix` , sql_name: `ticket`    }, type.str  ),
            ],
          },
        ],
      },
    ]},
  })
}