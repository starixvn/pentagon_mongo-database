{
  const time = ISODate(`2021-06-02`);
  const _id = `L1BI-sch`;
  const version = `0.0.1`;
  const schema_id = ObjectId(`${Math.floor(time.valueOf()/1000).toString(16)}${String.split(_id, '').map(_ => _.charCodeAt(0).toString(16)).join('')}`);
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
              Object.extend(type.str  , {mongo_name: `time.request` , sql_name: `requestTime` }),
              Object.extend(type.float, {mongo_name: `time.response`, sql_name: `responseMs`  }),
              Object.extend(type.float, {mongo_name: `time.log`     , sql_name: `logMs`       }),
              Object.extend(type.int64, {mongo_name: `data.memberId`, sql_name: `memberId`    }),
              Object.extend(type.str  , {mongo_name: `data.currency`, sql_name: `currency`    }),
              Object.extend(type.int  , {mongo_name: `data.gameType`, sql_name: `gameType`    }),
              Object.extend(type.int64, {mongo_name: `data.roundId` , sql_name: `roundId`     }),
              Object.extend(type.int  , {mongo_name: `data.choiceId`, sql_name: `choiceId`    }),
              Object.extend(type.int  , {mongo_name: `data.amount`  , sql_name: `amount`      }),
              Object.extend(type.float, {mongo_name: `data.balance` , sql_name: `balance`     }),
              Object.extend(type.int  , {mongo_name: `system`       , sql_name: `system`      }),
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
              Object.extend(type.str  , {mongo_name: `requestTimeStamp` , sql_name: `requestTS`   }),
              Object.extend(type.str  , {mongo_name: `responseTimeStamp`, sql_name: `responseTS`  }),
              Object.extend(type.str  , {mongo_name: `logTimeStamp`     , sql_name: `logTS`       }),
              Object.extend(type.int  , {mongo_name: `system`           , sql_name: `system`      }),
              Object.extend(type.str  , {mongo_name: `call._t`          , sql_name: `callType`    }),
              Object.extend(type.int64, {mongo_name: `call.obCustId`    , sql_name: `obCustId`    }),
              Object.extend(type.str  , {mongo_name: `call.currency`    , sql_name: `currency`    }),
              Object.extend(type.int  , {mongo_name: `call.gameTypeId`  , sql_name: `gameTypeId`  }),
              Object.extend(type.int64, {mongo_name: `call.gameRoundId` , sql_name: `gameRoundId` }),
              Object.extend(type.int  , {mongo_name: `call.choiceId`    , sql_name: `choiceId`    }),
              Object.extend(type.str  , {mongo_name: `call.amount`      , sql_name: `amount`      }),
              Object.extend(type.str  , {mongo_name: `call.ip`          , sql_name: `ip`          }),
              Object.extend(type.bool , {mongo_name: `call.freeBet`     , sql_name: `freeBet`     }),
              Object.extend(type.bool , {mongo_name: `call.freeSpin`    , sql_name: `freeSpin`    }),
              Object.extend(type.int64, {mongo_name: `result.obTransId` , sql_name: `obTransId`   }),
              Object.extend(type.str  , {mongo_name: `result.balance`   , sql_name: `balance`     }),
            ],
          },
          { sql_name: `bets_failed`,
            mongo_name: `failed_requests`,
            pipeline: `[{"$match": {"call._t": "PlaceBetCall"}}, {"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend(type.str  , {mongo_name: `requestTimeStamp`       , sql_name: `requestTS`   }),
              Object.extend(type.str  , {mongo_name: `responseTimeStamp`      , sql_name: `responseTS`  }),
              Object.extend(type.str  , {mongo_name: `logTimeStamp`           , sql_name: `logTS`       }),
              Object.extend(type.int  , {mongo_name: `system`                 , sql_name: `system`      }),
              Object.extend(type.str  , {mongo_name: `call._t`                , sql_name: `callType`    }),
              Object.extend(type.int64, {mongo_name: `call.obCustId`          , sql_name: `obCustId`    }),
              Object.extend(type.str  , {mongo_name: `call.currency`          , sql_name: `currency`    }),
              Object.extend(type.int  , {mongo_name: `call.gameTypeId`        , sql_name: `gameTypeId`  }),
              Object.extend(type.int64, {mongo_name: `call.gameRoundId`       , sql_name: `gameRoundId` }),
              Object.extend(type.int  , {mongo_name: `call.choiceId`          , sql_name: `choiceId`    }),
              Object.extend(type.str  , {mongo_name: `call.amount`            , sql_name: `amount`      }),
              Object.extend(type.str  , {mongo_name: `call.ip`                , sql_name: `ip`          }),
              Object.extend(type.bool , {mongo_name: `call.freeBet`           , sql_name: `freeBet`     }),
              Object.extend(type.bool , {mongo_name: `call.freeSpin`          , sql_name: `freeSpin`    }),
              Object.extend(type.str  , {mongo_name: `result.errorCode`       , sql_name: `errorCode`   }),
              Object.extend(type.str  , {mongo_name: `result.errorMessage`    , sql_name: `errorMsg`    }),
              Object.extend(type.str  , {mongo_name: `result.errorDescription`, sql_name: `errorDesc`   }),
            ],
          },
          { sql_name: `end_games`,
            mongo_name: `end_games`,
            pipeline: `[{"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend(type.str  , {mongo_name: `requestTimeStamp`   , sql_name: `requestTS`     }),
              Object.extend(type.str  , {mongo_name: `responseTimeStamp`  , sql_name: `responseTS`    }),
              Object.extend(type.str  , {mongo_name: `logTimeStamp`       , sql_name: `logTS`         }),
              Object.extend(type.int  , {mongo_name: `system`             , sql_name: `system`        }),
              Object.extend(type.str  , {mongo_name: `call._t`            , sql_name: `callType`      }),
              Object.extend(type.int64, {mongo_name: `call.obCustId`      , sql_name: `obCustId`      }),
              Object.extend(type.int  , {mongo_name: `call.gameTypeId`    , sql_name: `gameTypeId`    }),
              Object.extend(type.int64, {mongo_name: `call.gameRoundId`   , sql_name: `gameRoundId`   }),
              Object.extend(type.str  , {mongo_name: `call.totalAmount`   , sql_name: `totalAmount`   }),
              Object.extend(type.str  , {mongo_name: `call.validBetAmount`, sql_name: `validBetAmount`}),
              Object.extend(type.str  , {mongo_name: `call.totalWin`      , sql_name: `totalWin`      }),
              Object.extend(type.str  , {mongo_name: `call.endTime`       , sql_name: `endTS`         }),
              Object.extend(type.bool , {mongo_name: `call.freeBet`       , sql_name: `freeBet`       }),
            ],
          },
          { sql_name: `end_games_failed`,
            mongo_name: `failed_requests`,
            pipeline: `[{"$match": {"call._t": "EndGameCall"}}, {"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend(type.str  , {mongo_name: `requestTimeStamp`       , sql_name: `requestTS`     }),
              Object.extend(type.str  , {mongo_name: `responseTimeStamp`      , sql_name: `responseTS`    }),
              Object.extend(type.str  , {mongo_name: `logTimeStamp`           , sql_name: `logTS`         }),
              Object.extend(type.int  , {mongo_name: `system`                 , sql_name: `system`        }),
              Object.extend(type.str  , {mongo_name: `call._t`                , sql_name: `callType`      }),
              Object.extend(type.int64, {mongo_name: `call.obCustId`          , sql_name: `obCustId`      }),
              Object.extend(type.int  , {mongo_name: `call.gameTypeId`        , sql_name: `gameTypeId`    }),
              Object.extend(type.int64, {mongo_name: `call.gameRoundId`       , sql_name: `gameRoundId`   }),
              Object.extend(type.str  , {mongo_name: `call.totalAmount`       , sql_name: `totalAmount`   }),
              Object.extend(type.str  , {mongo_name: `call.validBetAmount`    , sql_name: `validBetAmount`}),
              Object.extend(type.str  , {mongo_name: `call.totalWin`          , sql_name: `totalWin`      }),
              Object.extend(type.str  , {mongo_name: `call.endTime`           , sql_name: `endTS`         }),
              Object.extend(type.bool , {mongo_name: `call.freeBet`           , sql_name: `freeBet`       }),
              Object.extend(type.str  , {mongo_name: `result.errorCode`       , sql_name: `errorCode`     }),
              Object.extend(type.str  , {mongo_name: `result.errorMessage`    , sql_name: `errorMsg`      }),
              Object.extend(type.str  , {mongo_name: `result.errorDescription`, sql_name: `errorDesc`     }),
            ],
          },
          { sql_name: `enter_portal_failed`,
            mongo_name: `failed_requests`,
            pipeline: `[{"$match": {"call._t": "EnterPortalCall"}}, {"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend(type.str  , {mongo_name: `requestTimeStamp`       , sql_name: `requestTS`     }),
              Object.extend(type.str  , {mongo_name: `responseTimeStamp`      , sql_name: `responseTS`    }),
              Object.extend(type.str  , {mongo_name: `logTimeStamp`           , sql_name: `logTS`         }),
              Object.extend(type.int  , {mongo_name: `system`                 , sql_name: `system`        }),
              Object.extend(type.str  , {mongo_name: `call._t`                , sql_name: `callType`      }),
              Object.extend(type.str  , {mongo_name: `call.seq`               , sql_name: `seq`           }),
              Object.extend(type.int64, {mongo_name: `call.obCustId`          , sql_name: `obCustId`      }),
              Object.extend(type.str  , {mongo_name: `call.characterName`     , sql_name: `characterName` }),
              Object.extend(type.bool , {mongo_name: `call.firstLogin`        , sql_name: `firstLogin`    }),
              Object.extend(type.str  , {mongo_name: `result.errorCode`       , sql_name: `errorCode`     }),
              Object.extend(type.str  , {mongo_name: `result.errorMessage`    , sql_name: `errorMsg`      }),
              Object.extend(type.str  , {mongo_name: `result.errorDescription`, sql_name: `errorDesc`     }),
            ],
          },
          { sql_name: `get_balance_failed`,
            mongo_name: `failed_requests`,
            pipeline: `[{"$match": {"call._t": "GetBalanceCall"}}, {"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend(type.str  , {mongo_name: `requestTimeStamp`       , sql_name: `requestTS`     }),
              Object.extend(type.str  , {mongo_name: `responseTimeStamp`      , sql_name: `responseTS`    }),
              Object.extend(type.str  , {mongo_name: `logTimeStamp`           , sql_name: `logTS`         }),
              Object.extend(type.int  , {mongo_name: `system`                 , sql_name: `system`        }),
              Object.extend(type.str  , {mongo_name: `call._t`                , sql_name: `callType`      }),
              Object.extend(type.int64, {mongo_name: `call.obCustId`          , sql_name: `obCustId`      }),
              Object.extend(type.str  , {mongo_name: `result.errorCode`       , sql_name: `errorCode`     }),
              Object.extend(type.str  , {mongo_name: `result.errorMessage`    , sql_name: `errorMsg`      }),
              Object.extend(type.str  , {mongo_name: `result.errorDescription`, sql_name: `errorDesc`     }),
            ],
          },
          { sql_name: `signins`,
            mongo_name: `signin_requests`,
            pipeline: `[{"$project": {"_id": 0, "__archive": 0}}]`,
            columns: [
              Object.extend(type.str  , {mongo_name: `requestTimeStamp`         , sql_name: `requestTS`       }),
              Object.extend(type.str  , {mongo_name: `responseTimeStamp`        , sql_name: `responseTS`      }),
              Object.extend(type.str  , {mongo_name: `logTimeStamp`             , sql_name: `logTS`           }),
              Object.extend(type.int  , {mongo_name: `system`                   , sql_name: `system`          }),
              Object.extend(type.str  , {mongo_name: `request._t`               , sql_name: `callType`        }),
              Object.extend(type.str  , {mongo_name: `request.seq`              , sql_name: `seq`             }),
              Object.extend(type.int64, {mongo_name: `request.memberId`         , sql_name: `memberId`        }),
              Object.extend(type.str  , {mongo_name: `request.memberName`       , sql_name: `memberName`      }),
              Object.extend(type.str  , {mongo_name: `request.browserUserAgent` , sql_name: `browserUserAgent`}),
              Object.extend(type.str  , {mongo_name: `request.currency`         , sql_name: `currency`        }),
              Object.extend(type.str  , {mongo_name: `request.language`         , sql_name: `language`        }),
              Object.extend(type.str  , {mongo_name: `request.iP`               , sql_name: `ip`              }),
              Object.extend(type.bool , {mongo_name: `request.isMobi`           , sql_name: `isMobi`          }),
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
              Object.extend(type.date , {mongo_name: `time`             , sql_name: `time`            }),
              Object.extend(type.int64, {mongo_name: `memberId`         , sql_name: `memberId`        }),
              Object.extend(type.str  , {mongo_name: `memberName`       , sql_name: `memberName`      }),
              Object.extend(type.str  , {mongo_name: `currency`         , sql_name: `currency`        }),
              Object.extend(type.str  , {mongo_name: `language`         , sql_name: `language`        }),
              Object.extend(type.str  , {mongo_name: `clientId`         , sql_name: `clientId`        }),
              Object.extend(type.str  , {mongo_name: `seq`              , sql_name: `seq`             }),
              Object.extend(type.bool , {mongo_name: `isMobi`           , sql_name: `isMobi`          }),
              Object.extend(type.str  , {mongo_name: `iP`               , sql_name: `ip`              }),
              Object.extend(type.str  , {mongo_name: `domain`           , sql_name: `domain`          }),
              Object.extend(type.str  , {mongo_name: `browserUserAgent` , sql_name: `browserUserAgent`}),
            ],
          },
        ],
      },
      { name: `minigame`,
        tables: [
          /** ARCHIVE STATUSES (B) */
          { sql_name: `archive_statuses`,
            mongo_name: `archive_statuses`,
            pipeline: `[{"$project": {
              "_id": 0,
              "name": 1,
              "_phiens": {"$ifNull": ["$lastArcId._phiens", "$lastArcId._rounds"]},
              "_cuocs": "$lastArcId._cuocs",
              "_freespins": "$lastArcId._freespins"
            }}]`,
            columns: [
              Object.extend(type.str  , {mongo_name: `name`, sql_name: `name`}),
              Object.extend(type.int64, {mongo_name: `_phiens`, sql_name: `lastArcRoundId`}),
              Object.extend(type.int64, {mongo_name: `_cuocs`, sql_name: `lastArcBetId`}),
              Object.extend(type.int64, {mongo_name: `_freespins`, sql_name: `lastArcFreeSpinId`}),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `baccarat_tickets`,
            mongo_name: `baccarat_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "banker": 1, "bankerPair": 1, "big": 1, "player": 1, "playerPair": 1, "small": 1, "tie": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$banker", "$bankerPair", "$big", "$player", "$playerPair", "$small", "$tie"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `banker`     , sql_name: `banker`    }),
              Object.extend(type.int64, {mongo_name: `tie`        , sql_name: `tie`       }),
              Object.extend(type.int64, {mongo_name: `player`     , sql_name: `player`    }),
              Object.extend(type.int64, {mongo_name: `bankerPair` , sql_name: `bankerPair`}),
              Object.extend(type.int64, {mongo_name: `playerPair` , sql_name: `playerPair`}),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `baucua_tickets`,
            mongo_name: `baucua_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "crab": 1, "fish": 1, "gourd": 1, "prawn": 1, "rooster": 1, "stag": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$crab", "$fish", "$gourd", "$prawn", "$rooster", "$stag"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `crab`       , sql_name: `crab`      }),
              Object.extend(type.int64, {mongo_name: `fish`       , sql_name: `fish`      }),
              Object.extend(type.int64, {mongo_name: `gourd`      , sql_name: `gourd`     }),
              Object.extend(type.int64, {mongo_name: `prawn`      , sql_name: `prawn`     }),
              Object.extend(type.int64, {mongo_name: `rooster`    , sql_name: `rooster`   }),
              Object.extend(type.int64, {mongo_name: `stag`       , sql_name: `stag`      }),
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
              Object.extend(type.int64, {mongo_name: `id`             , sql_name: `id`        }),
              Object.extend(type.date , {mongo_name: `time`           , sql_name: `time`      }),
              Object.extend(type.date , {mongo_name: `roundStartTime` , sql_name: `startTime` }),
              Object.extend(type.bool , {mongo_name: `ended`          , sql_name: `ended`     }),
              Object.extend(type.bool , {mongo_name: `archived`       , sql_name: `archived`  }),
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Additional Info */
              Object.extend(type.int64, {mongo_name: `id`         , sql_name: `id`        }),
              Object.extend(type.int64, {mongo_name: `pos`        , sql_name: `pos`       }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
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
                "totalAmount": 1, "thanhtoan": 1,
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `fourguardians_tickets`,
            mongo_name: `fourguardians_rounds`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeSpin": 1, "id": 1, "uid": 1, "name": 1, "time": 1, "memberId": 1, "endTime": 1,
                "bet": 1, "totalAmount": 1, "betWin": 1, "paid": 1,
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `id`         , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.float, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betWin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.float, {mongo_name: `bet`        , sql_name: `pool`      }),
              Object.extend(type.bool , {mongo_name: `paid`       , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeSpin`   , sql_name: `freeSpin`  }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Additional Info */
              Object.extend(type.date , {mongo_name: `endTime`    , sql_name: `endTime`   }),
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `roundId`    , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              /* Additional Info */
              Object.extend(type.int64, {mongo_name: `id`         , sql_name: `id`        }),
              Object.extend(type.int  , {mongo_name: `total`      , sql_name: `total`     }),
              Object.extend(type.int  , {mongo_name: `available`  , sql_name: `available` }),
              Object.extend(type.float, {mongo_name: `bet`        , sql_name: `pool`      }),
              Object.extend(type.date , {mongo_name: `expiryTime` , sql_name: `expiryTime`}),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
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
              Object.extend(type.date , {mongo_name: `time`         , sql_name: `time`    }),
              Object.extend(type.int64, {mongo_name: `roundId`      , sql_name: `roundId` }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`          , sql_name: `uid`     }),
              Object.extend(type.int64, {mongo_name: `memberId`     , sql_name: `memberId`}),
              Object.extend(type.str  , {mongo_name: `name`         , sql_name: `nickname`}),
              /* Summary */
              Object.extend(type.float, {mongo_name: `totalAmount`  , sql_name: `stake`   }),
              Object.extend(type.float, {mongo_name: `winningAmount`, sql_name: `payout`  }),
              /* Additional Info */
              Object.extend(type.float, {mongo_name: `bet`          , sql_name: `pool`    }),
              Object.extend(type.bool , {mongo_name: `freeSpin`     , sql_name: `freeSpin`}),
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
              Object.extend(type.str  , {mongo_name: `name`               , sql_name: `name`              }),
              Object.extend(type.date , {mongo_name: `time`               , sql_name: `time`              }),
              Object.extend(type.int  , {mongo_name: `type`               , sql_name: `type`              }),
              Object.extend(type.bool , {mongo_name: `enabled`            , sql_name: `enabled`           }),
              Object.extend(type.bool , {mongo_name: `botenabled`         , sql_name: `botEnabled`        }),
              Object.extend(type.float, {mongo_name: `minbet`             , sql_name: `minBet`            }),
              Object.extend(type.float, {mongo_name: `maxbet`             , sql_name: `maxBet`            }),
              Object.extend(type.float, {mongo_name: `bot_maxbet`         , sql_name: `botMaxBet`         }),
              Object.extend(type.int64, {mongo_name: `disabledround`      , sql_name: `disabledRound`     }),
              Object.extend(type.str  , {mongo_name: `disabled_message`   , sql_name: `disabledMsg`       }),
              Object.extend(type.int  , {mongo_name: `delayStartTime`     , sql_name: `delayStartTime`    }),
              Object.extend(type.bool , {mongo_name: `enableFreeBet`      , sql_name: `enableFreeBet`     }),
              Object.extend(type.bool , {mongo_name: `smartBotEnabled`    , sql_name: `smartBotEnabled`   }),
              Object.extend(type.int  , {mongo_name: `smartBotGroupRatio` , sql_name: `smartBotGroupRatio`}),
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
              Object.extend(type.str  , {mongo_name: `m`, sql_name: `model`   }),
              Object.extend(type.str  , {mongo_name: `f`, sql_name: `field`   }),
              Object.extend(type.int64, {mongo_name: `c`, sql_name: `counter` }),
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
              Object.extend(type.int  , {mongo_name: `gameId`       , sql_name: `gameId`      }),
              Object.extend(type.str  , {mongo_name: `gameName`     , sql_name: `gameName`    }),
              /* Creation */
              Object.extend(type.int64, {mongo_name: `createdAt`    , sql_name: `createdAt`   }),
              Object.extend(type.date , {mongo_name: `createdTime`  , sql_name: `createdTime` }),
              /* Jackpot Details */
              Object.extend(type.float, {mongo_name: `pool`         , sql_name: `pool`        }),
              Object.extend(type.float, {mongo_name: `amount`       , sql_name: `amount`      }),
              Object.extend(type.float, {mongo_name: `initAmount`   , sql_name: `initAmount`  }),
              Object.extend(type.float, {mongo_name: `byBots`       , sql_name: `byBots`      }),
              Object.extend(type.float, {mongo_name: `byMembers`    , sql_name: `byMembers`   }),
              /* Winning Information */
              Object.extend(type.int64, {mongo_name: `hitAt`        , sql_name: `hitAt`       }),
              Object.extend(type.date , {mongo_name: `hitTime`      , sql_name: `hitTime`     }),
              Object.extend(type.int64, {mongo_name: `winnerId`     , sql_name: `winnerId`    }),
              Object.extend(type.str  , {mongo_name: `winnerName`   , sql_name: `winnerName`  }),
              Object.extend(type.float, {mongo_name: `winningRatio` , sql_name: `winningRatio`}),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `kenoeast_tickets`,
            mongo_name: `kenoeast_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "earth": 1, "even": 1, "fire": 1, "gold": 1, "odd": 1, "small": 1, "water": 1, "wood": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$earth", "$even", "$fire", "$gold", "$odd", "$small", "$water", "$wood"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `gold`       , sql_name: `gold`      }),
              Object.extend(type.int64, {mongo_name: `wood`       , sql_name: `wood`      }),
              Object.extend(type.int64, {mongo_name: `fire`       , sql_name: `fire`      }),
              Object.extend(type.int64, {mongo_name: `water`      , sql_name: `water`     }),
              Object.extend(type.int64, {mongo_name: `earth`      , sql_name: `earth`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `kenowest_tickets`,
            mongo_name: `kenowest_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "earth": 1, "even": 1, "fire": 1, "gold": 1, "odd": 1, "small": 1, "water": 1, "wood": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$earth", "$even", "$fire", "$gold", "$odd", "$small", "$water", "$wood"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `gold`       , sql_name: `gold`      }),
              Object.extend(type.int64, {mongo_name: `wood`       , sql_name: `wood`      }),
              Object.extend(type.int64, {mongo_name: `fire`       , sql_name: `fire`      }),
              Object.extend(type.int64, {mongo_name: `water`      , sql_name: `water`     }),
              Object.extend(type.int64, {mongo_name: `earth`      , sql_name: `earth`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `kenosouth_tickets`,
            mongo_name: `kenosouth_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "earth": 1, "even": 1, "fire": 1, "gold": 1, "odd": 1, "small": 1, "water": 1, "wood": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$earth", "$even", "$fire", "$gold", "$odd", "$small", "$water", "$wood"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `gold`       , sql_name: `gold`      }),
              Object.extend(type.int64, {mongo_name: `wood`       , sql_name: `wood`      }),
              Object.extend(type.int64, {mongo_name: `fire`       , sql_name: `fire`      }),
              Object.extend(type.int64, {mongo_name: `water`      , sql_name: `water`     }),
              Object.extend(type.int64, {mongo_name: `earth`      , sql_name: `earth`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `kenonorth_tickets`,
            mongo_name: `kenonorth_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "earth": 1, "even": 1, "fire": 1, "gold": 1, "odd": 1, "small": 1, "water": 1, "wood": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$earth", "$even", "$fire", "$gold", "$odd", "$small", "$water", "$wood"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `gold`       , sql_name: `gold`      }),
              Object.extend(type.int64, {mongo_name: `wood`       , sql_name: `wood`      }),
              Object.extend(type.int64, {mongo_name: `fire`       , sql_name: `fire`      }),
              Object.extend(type.int64, {mongo_name: `water`      , sql_name: `water`     }),
              Object.extend(type.int64, {mongo_name: `earth`      , sql_name: `earth`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `kenomax_tickets`,
            mongo_name: `kenomax_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "earth": 1, "even": 1, "fire": 1, "gold": 1, "odd": 1, "small": 1, "water": 1, "wood": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$earth", "$even", "$fire", "$gold", "$odd", "$small", "$water", "$wood"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `gold`       , sql_name: `gold`      }),
              Object.extend(type.int64, {mongo_name: `wood`       , sql_name: `wood`      }),
              Object.extend(type.int64, {mongo_name: `fire`       , sql_name: `fire`      }),
              Object.extend(type.int64, {mongo_name: `water`      , sql_name: `water`     }),
              Object.extend(type.int64, {mongo_name: `earth`      , sql_name: `earth`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `kenomax2_tickets`,
            mongo_name: `kenomax2_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "earth": 1, "even": 1, "fire": 1, "gold": 1, "odd": 1, "small": 1, "water": 1, "wood": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$earth", "$even", "$fire", "$gold", "$odd", "$small", "$water", "$wood"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `gold`       , sql_name: `gold`      }),
              Object.extend(type.int64, {mongo_name: `wood`       , sql_name: `wood`      }),
              Object.extend(type.int64, {mongo_name: `fire`       , sql_name: `fire`      }),
              Object.extend(type.int64, {mongo_name: `water`      , sql_name: `water`     }),
              Object.extend(type.int64, {mongo_name: `earth`      , sql_name: `earth`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `kenomini_tickets`,
            mongo_name: `kenomini_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "earth": 1, "even": 1, "fire": 1, "gold": 1, "odd": 1, "small": 1, "water": 1, "wood": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$earth", "$even", "$fire", "$gold", "$odd", "$small", "$water", "$wood"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `gold`       , sql_name: `gold`      }),
              Object.extend(type.int64, {mongo_name: `wood`       , sql_name: `wood`      }),
              Object.extend(type.int64, {mongo_name: `fire`       , sql_name: `fire`      }),
              Object.extend(type.int64, {mongo_name: `water`      , sql_name: `water`     }),
              Object.extend(type.int64, {mongo_name: `earth`      , sql_name: `earth`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `kenomini2_tickets`,
            mongo_name: `kenomini2_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "earth": 1, "even": 1, "fire": 1, "gold": 1, "odd": 1, "small": 1, "water": 1, "wood": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$earth", "$even", "$fire", "$gold", "$odd", "$small", "$water", "$wood"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `gold`       , sql_name: `gold`      }),
              Object.extend(type.int64, {mongo_name: `wood`       , sql_name: `wood`      }),
              Object.extend(type.int64, {mongo_name: `fire`       , sql_name: `fire`      }),
              Object.extend(type.int64, {mongo_name: `water`      , sql_name: `water`     }),
              Object.extend(type.int64, {mongo_name: `earth`      , sql_name: `earth`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `kenopromax_tickets`,
            mongo_name: `kenopromax_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "earth": 1, "even": 1, "fire": 1, "gold": 1, "odd": 1, "small": 1, "water": 1, "wood": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$big", "$earth", "$even", "$fire", "$gold", "$odd", "$small", "$water", "$wood"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `gold`       , sql_name: `gold`      }),
              Object.extend(type.int64, {mongo_name: `wood`       , sql_name: `wood`      }),
              Object.extend(type.int64, {mongo_name: `fire`       , sql_name: `fire`      }),
              Object.extend(type.int64, {mongo_name: `water`      , sql_name: `water`     }),
              Object.extend(type.int64, {mongo_name: `earth`      , sql_name: `earth`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`    }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId` }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`     }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`}),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`}),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`}),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`   }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`  }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled` }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet` }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`  }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`}),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `dragon`     , sql_name: `dragon`  }),
              Object.extend(type.int64, {mongo_name: `tie`        , sql_name: `tie`     }),
              Object.extend(type.int64, {mongo_name: `tiger`      , sql_name: `tiger`   }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`    }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId` }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`     }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`}),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`}),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`}),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`   }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`  }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled` }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet` }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`  }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`}),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`     }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`    }),
              Object.extend(type.int64, {mongo_name: `red4`       , sql_name: `red4`    }),
              Object.extend(type.int64, {mongo_name: `red3`       , sql_name: `red3`    }),
              Object.extend(type.int64, {mongo_name: `white3`     , sql_name: `white3`  }),
              Object.extend(type.int64, {mongo_name: `white4`     , sql_name: `white4`  }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `roulette_tickets`,
            mongo_name: `roulette_ones`,
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`    }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId` }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`     }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`}),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`}),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`}),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`   }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`  }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled` }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet` }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`  }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`}),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `sicbo_tickets`,
            mongo_name: `sicbo_ones`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "big": 1, "small": 1, "anyTriple": 1, "specific1": 1, "specific2": 1, "specific3": 1, "specific4": 1, "specific5": 1, "specific6": 1,
                "total4": 1, "total5": 1, "total6": 1, "total7": 1, "total8": 1, "total9": 1, "total10": 1, "total11": 1, "total12": 1, "total13": 1, "total14": 1, "total15": 1, "total16": 1, "total17": 1,
                "totalAmount": 1, "betwin": 1, "thanhtoan": 1,
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`    }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId` }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `anyTriple`  , sql_name: `anyTriple` }),
              Object.extend(type.int64, {mongo_name: `specific1`  , sql_name: `specific1` }),
              Object.extend(type.int64, {mongo_name: `specific2`  , sql_name: `specific2` }),
              Object.extend(type.int64, {mongo_name: `specific3`  , sql_name: `specific3` }),
              Object.extend(type.int64, {mongo_name: `specific4`  , sql_name: `specific4` }),
              Object.extend(type.int64, {mongo_name: `specific5`  , sql_name: `specific5` }),
              Object.extend(type.int64, {mongo_name: `specific6`  , sql_name: `specific6` }),
              Object.extend(type.int64, {mongo_name: `total4`     , sql_name: `total4`    }),
              Object.extend(type.int64, {mongo_name: `total5`     , sql_name: `total5`    }),
              Object.extend(type.int64, {mongo_name: `total6`     , sql_name: `total6`    }),
              Object.extend(type.int64, {mongo_name: `total7`     , sql_name: `total7`    }),
              Object.extend(type.int64, {mongo_name: `total8`     , sql_name: `total8`    }),
              Object.extend(type.int64, {mongo_name: `total9`     , sql_name: `total9`    }),
              Object.extend(type.int64, {mongo_name: `total10`    , sql_name: `total10`   }),
              Object.extend(type.int64, {mongo_name: `total11`    , sql_name: `total11`   }),
              Object.extend(type.int64, {mongo_name: `total12`    , sql_name: `total12`   }),
              Object.extend(type.int64, {mongo_name: `total13`    , sql_name: `total13`   }),
              Object.extend(type.int64, {mongo_name: `total14`    , sql_name: `total14`   }),
              Object.extend(type.int64, {mongo_name: `total15`    , sql_name: `total15`   }),
              Object.extend(type.int64, {mongo_name: `total16`    , sql_name: `total16`   }),
              Object.extend(type.int64, {mongo_name: `total17`    , sql_name: `total17`   }),
            ],
          },
          /** SMARTBOT TAIXIU (S) */
          { sql_name: `smartbot_taixiu_patterns`,
            mongo_name: `smartbot_taixiu_patterns`,
            pipeline: `[]`,
            columns: [
              Object.extend(type.int  , {mongo_name: `_id`      , sql_name: `patId`   }),
              Object.extend(type.int64, {mongo_name: `memberId` , sql_name: `memberId`}),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.str  , {mongo_name: `group`    , sql_name: `group`   }),
              Object.extend(type.float, {mongo_name: `stake`    , sql_name: `stake`   }),
            ],
          },
          { sql_name: `smartbot_taixiu_bets`,
            mongo_name: `smartbot_taixiu_bets`,
            pipeline: `[
              {"$project": {"_id": 0}}
            ]`,
            columns: [
              Object.extend(type.int  , {mongo_name: `patId`    , sql_name: `patId`   }),
              Object.extend(type.int64, {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.int  , {mongo_name: `round`    , sql_name: `round`   }),
              Object.extend(type.int  , {mongo_name: `second`   , sql_name: `second`  }),
              Object.extend(type.int  , {mongo_name: `choiceId` , sql_name: `choiceId`}),
              Object.extend(type.float, {mongo_name: `amount`   , sql_name: `amount`  }),
            ],
          },
          /** SMARTBOT TXTURBO (S) */
          { sql_name: `smartbot_txturbo_patterns`,
            mongo_name: `smartbot_txturbo_patterns`,
            pipeline: `[]`,
            columns: [
              Object.extend(type.int  , {mongo_name: `_id`      , sql_name: `patId`   }),
              Object.extend(type.int64, {mongo_name: `memberId` , sql_name: `memberId`}),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.str  , {mongo_name: `group`    , sql_name: `group`   }),
              Object.extend(type.float, {mongo_name: `stake`    , sql_name: `stake`   }),
            ],
          },
          { sql_name: `smartbot_txturbo_bets`,
            mongo_name: `smartbot_txturbo_bets`,
            pipeline: `[
              {"$project": {"_id": 0}}
            ]`,
            columns: [
              Object.extend(type.int  , {mongo_name: `patId`    , sql_name: `patId`   }),
              Object.extend(type.int64, {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.int  , {mongo_name: `round`    , sql_name: `round`   }),
              Object.extend(type.int  , {mongo_name: `second`   , sql_name: `second`  }),
              Object.extend(type.int  , {mongo_name: `choiceId` , sql_name: `choiceId`}),
              Object.extend(type.float, {mongo_name: `amount`   , sql_name: `amount`  }),
            ],
          },
          /** SMARTBOT VIPSEDIE (S) */
          { sql_name: `smartbot_vipsedie_patterns`,
            mongo_name: `smartbot_vipsedie_patterns`,
            pipeline: `[]`,
            columns: [
              Object.extend(type.int  , {mongo_name: `_id`      , sql_name: `patId`   }),
              Object.extend(type.int64, {mongo_name: `memberId` , sql_name: `memberId`}),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.str  , {mongo_name: `group`    , sql_name: `group`   }),
              Object.extend(type.float, {mongo_name: `stake`    , sql_name: `stake`   }),
            ],
          },
          { sql_name: `smartbot_vipsedie_bets`,
            mongo_name: `smartbot_vipsedie_bets`,
            pipeline: `[
              {"$project": {"_id": 0}}
            ]`,
            columns: [
              Object.extend(type.int  , {mongo_name: `patId`    , sql_name: `patId`   }),
              Object.extend(type.int64, {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.int  , {mongo_name: `round`    , sql_name: `round`   }),
              Object.extend(type.int  , {mongo_name: `second`   , sql_name: `second`  }),
              Object.extend(type.int  , {mongo_name: `choiceId` , sql_name: `choiceId`}),
              Object.extend(type.float, {mongo_name: `amount`   , sql_name: `amount`  }),
            ],
          },
          /** SMARTBOT XOCXOC (S) */
          { sql_name: `smartbot_xocxoc_patterns`,
            mongo_name: `smartbot_xocxoc_patterns`,
            pipeline: `[]`,
            columns: [
              Object.extend(type.int  , {mongo_name: `_id`      , sql_name: `patId`   }),
              Object.extend(type.int64, {mongo_name: `memberId` , sql_name: `memberId`}),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.str  , {mongo_name: `group`    , sql_name: `group`   }),
              Object.extend(type.float, {mongo_name: `stake`    , sql_name: `stake`   }),
            ],
          },
          { sql_name: `smartbot_xocxoc_bets`,
            mongo_name: `smartbot_xocxoc_bets`,
            pipeline: `[
              {"$project": {"_id": 0}}
            ]`,
            columns: [
              Object.extend(type.int  , {mongo_name: `patId`    , sql_name: `patId`   }),
              Object.extend(type.int64, {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.int  , {mongo_name: `round`    , sql_name: `round`   }),
              Object.extend(type.int  , {mongo_name: `second`   , sql_name: `second`  }),
              Object.extend(type.int  , {mongo_name: `choiceId` , sql_name: `choiceId`}),
              Object.extend(type.float, {mongo_name: `amount`   , sql_name: `amount`  }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
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
                "totalAmount": 1, "thanhtoan": 1,
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`    }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId` }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`     }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`}),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`}),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`}),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`   }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`  }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled` }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`  }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`}),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`     }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`    }),
            ],
          },
          /** TAIXIU (G) */
          { sql_name: `taixiu_rounds`,
            mongo_name: `taixiu_phiens`,
            pipeline: `[
              {"$project": {
                "_id": 0, "time": 1, "id": 1,
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]},
              }},
            ]`,
            columns: [
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
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
                "totalAmount": 1, "thanhtoan": 1,
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`    }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId` }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`     }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`}),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`}),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`}),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`   }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`  }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled` }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`  }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`}),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`     }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`   }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
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
                "totalAmount": 1, "thanhtoan": 1,
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`    }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId` }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`     }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`}),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`}),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`}),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`   }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`  }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled` }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`  }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`}),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`     }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`   }),
            ],
          },
          /** USERINFOS (U) */
          { sql_name: `userinfos`,
            mongo_name: `userinfos`,
            pipeline: `[
              {"$project": {
                "_id": 0, "id": 1, "joinedOn": 1, "type": 1, "currency": 1, "UID": 1, "name": 1
              }},
            ]`,
            columns: [
              Object.extend(type.int64, {mongo_name: `UID`      , sql_name: `id`      }),
              Object.extend(type.str  , {mongo_name: `id`       , sql_name: `uid`     }),
              Object.extend(type.str  , {mongo_name: `name`     , sql_name: `nickname`}),
              Object.extend(type.date , {mongo_name: `joinedOn` , sql_name: `joinedOn`}),
              Object.extend(type.bool , {mongo_name: `type`     , sql_name: `isBot`   }),
              Object.extend(type.str  , {mongo_name: `currency` , sql_name: `currency`}),
            ],
          },
          { sql_name: `users`,
            mongo_name: `users`,
            pipeline: `[
              {"$project": {
                "_id": 1, "local.username": 1, "local.regDate": 1, "local.memberId": 1, "local.memberName": 1, "local.clientId": 1, "local.currency": 1
              }},
            ]`,
            columns: [
              Object.extend(type.oid  , {mongo_name: `_id`              , sql_name: `uid`       }),
              Object.extend(type.str  , {mongo_name: `local.username`   , sql_name: `username`  }),
              Object.extend(type.date , {mongo_name: `local.regDate`    , sql_name: `regDate`   }),
              Object.extend(type.int64, {mongo_name: `local.memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `local.memberName` , sql_name: `memberName`}),
              Object.extend(type.str  , {mongo_name: `local.clientId`   , sql_name: `clientId`  }),
              Object.extend(type.str  , {mongo_name: `local.currency`   , sql_name: `currency`  }),
            ],
          },
          { sql_name: `usersessions`,
            mongo_name: `users`,
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
              Object.extend(type.int64, {mongo_name: `memberId`         , sql_name: `memberId`        }),
              Object.extend(type.str  , {mongo_name: `memberName`       , sql_name: `memberName`      }),
              Object.extend(type.str  , {mongo_name: `userId`           , sql_name: `userId`          }),
              Object.extend(type.str  , {mongo_name: `username`         , sql_name: `username`        }),
              Object.extend(type.date , {mongo_name: `ssoTime`          , sql_name: `ssoTime`         }),
              Object.extend(type.date , {mongo_name: `recheckInTime`    , sql_name: `recheckInTime`   }),
              Object.extend(type.str  , {mongo_name: `ip`               , sql_name: `ip`              }),
              Object.extend(type.str  , {mongo_name: `browserUserAgent` , sql_name: `browserUserAgent`}),
              Object.extend(type.str  , {mongo_name: `language`         , sql_name: `language`        }),
              Object.extend(type.str  , {mongo_name: `currency`         , sql_name: `currency`        }),
              Object.extend(type.str  , {mongo_name: `owSeq`            , sql_name: `owSeq`           }),
              Object.extend(type.str  , {mongo_name: `clientId`         , sql_name: `clientId`        }),
              Object.extend(type.str  , {mongo_name: `siteName`         , sql_name: `siteName`        }),
              Object.extend(type.int  , {mongo_name: `system`           , sql_name: `system`          }),
              Object.extend(type.bool , {mongo_name: `archived`         , sql_name: `archived`        }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `vipbaccarat_tickets`,
            mongo_name: `vipbaccarat_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "banker": 1, "bankerPair": 1, "big": 1, "player": 1, "playerPair": 1, "small": 1, "tie": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$banker", "$bankerPair", "$big", "$player", "$playerPair", "$small", "$tie"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `big`        , sql_name: `big`       }),
              Object.extend(type.int64, {mongo_name: `small`      , sql_name: `small`     }),
              Object.extend(type.int64, {mongo_name: `banker`     , sql_name: `banker`    }),
              Object.extend(type.int64, {mongo_name: `tie`        , sql_name: `tie`       }),
              Object.extend(type.int64, {mongo_name: `player`     , sql_name: `player`    }),
              Object.extend(type.int64, {mongo_name: `bankerPair` , sql_name: `bankerPair`}),
              Object.extend(type.int64, {mongo_name: `playerPair` , sql_name: `playerPair`}),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `vipfishprawncrab_tickets`,
            mongo_name: `vipfishprawncrab_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "freeBet": 1, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "crab": 1, "fish": 1, "gourd": 1, "prawn": 1, "rooster": 1, "stag": 1, "mountain": 1, "ocean": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$crab", "$fish", "$gourd", "$prawn", "$rooster", "$stag", "$mountain", "$ocean"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `crab`       , sql_name: `crab`      }),
              Object.extend(type.int64, {mongo_name: `fish`       , sql_name: `fish`      }),
              Object.extend(type.int64, {mongo_name: `gourd`      , sql_name: `gourd`     }),
              Object.extend(type.int64, {mongo_name: `prawn`      , sql_name: `prawn`     }),
              Object.extend(type.int64, {mongo_name: `rooster`    , sql_name: `rooster`   }),
              Object.extend(type.int64, {mongo_name: `stag`       , sql_name: `stag`      }),
              Object.extend(type.int64, {mongo_name: `mountain`   , sql_name: `mountain`  }),
              Object.extend(type.int64, {mongo_name: `ocean`      , sql_name: `ocean`     }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `odd`        , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `even`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `red4`       , sql_name: `red4`      }),
              Object.extend(type.int64, {mongo_name: `red3`       , sql_name: `red3`      }),
              Object.extend(type.int64, {mongo_name: `red2`       , sql_name: `red2`      }),
              Object.extend(type.int64, {mongo_name: `white3`     , sql_name: `white3`    }),
              Object.extend(type.int64, {mongo_name: `white4`     , sql_name: `white4`    }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
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
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `freeBet`    , sql_name: `freeBet`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
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
              Object.extend(type.int64, {mongo_name: `id`       , sql_name: `id`      }),
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.bool , {mongo_name: `archived` , sql_name: `archived`}),
            ],
          },
          { sql_name: `xocxoc_tickets`,
            mongo_name: `xocxoc_cuocs`,
            pipeline: `[
              {"$project": {
                "_id": 0, "phien": 1, "uid": 1, "memberId": 1, "name": 1, "time": 1,
                "chan": 1, "le": 1, "red3": 1, "red4": 1, "white3": 1, "white4": 1,
                "betwin": 1, "thanhtoan": 1,
                "totalAmount": {"$sum": ["$chan", "$le", "$red3", "$red4", "$white3", "$white4"]},
                "currency": "$__archive.currency",
                "isCash": "$__archive.isCash",
                "archived": {"$ifNull": [{"$toBool": "$__archive.eventtime"}, false]}
              }}
            ]`,
            columns: [
              /* Metadata */
              Object.extend(type.date , {mongo_name: `time`       , sql_name: `time`      }),
              Object.extend(type.int64, {mongo_name: `phien`      , sql_name: `roundId`   }),
              /* Member */
              Object.extend(type.str  , {mongo_name: `uid`        , sql_name: `uid`       }),
              Object.extend(type.int64, {mongo_name: `memberId`   , sql_name: `memberId`  }),
              Object.extend(type.str  , {mongo_name: `name`       , sql_name: `nickname`  }),
              Object.extend(type.str  , {mongo_name: `currency`   , sql_name: `currency`  }),
              /* Summary */
              Object.extend(type.int64, {mongo_name: `totalAmount`, sql_name: `stake`     }),
              Object.extend(type.float, {mongo_name: `betwin`     , sql_name: `payout`    }),
              /* Attributes */
              Object.extend(type.bool , {mongo_name: `thanhtoan`  , sql_name: `settled`   }),
              Object.extend(type.bool , {mongo_name: `isCash`     , sql_name: `isCash`    }),
              Object.extend(type.bool , {mongo_name: `archived`   , sql_name: `archived`  }),
              /* Bet Choices */
              Object.extend(type.int64, {mongo_name: `le`         , sql_name: `odd`       }),
              Object.extend(type.int64, {mongo_name: `chan`       , sql_name: `even`      }),
              Object.extend(type.int64, {mongo_name: `red4`       , sql_name: `red4`      }),
              Object.extend(type.int64, {mongo_name: `red3`       , sql_name: `red3`      }),
              Object.extend(type.int64, {mongo_name: `white3`     , sql_name: `white3`    }),
              Object.extend(type.int64, {mongo_name: `white4`     , sql_name: `white4`    }),
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
              Object.extend(type.date , {mongo_name: `time`         , sql_name: `time`        }),
              Object.extend(type.int  , {mongo_name: `gameId`       , sql_name: `gameId`      }),
              Object.extend(type.str  , {mongo_name: `currency`     , sql_name: `currency`    }),
              Object.extend(type.int  , {mongo_name: `system`       , sql_name: `system`      }),
              Object.extend(type.int  , {mongo_name: `betCount`     , sql_name: `betCount`    }),
              Object.extend(type.int  , {mongo_name: `requestCount` , sql_name: `requestCount`}),
              Object.extend(type.float, {mongo_name: `totalAmount`  , sql_name: `totalAmount` }),
            ],
          },
          { sql_name: `daily_summaries`,
            mongo_name: `daily_summaries`,
            pipeline: `[{"$project": {"_id": 0}}]`,
            columns: [
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.int  , {mongo_name: `gameId`   , sql_name: `gameId`  }),
              Object.extend(type.str  , {mongo_name: `currency` , sql_name: `currency`}),
              Object.extend(type.bool , {mongo_name: `isCash`   , sql_name: `isCash`  }),
              Object.extend(type.float, {mongo_name: `payout`   , sql_name: `payout`  }),
              Object.extend(type.float, {mongo_name: `stake`    , sql_name: `stake`   }),
              Object.extend(type.int  , {mongo_name: `tickets`  , sql_name: `tickets` }),
            ],
          },
          { sql_name: `hourly_summaries`,
            mongo_name: `hourly_summaries`,
            pipeline: `[{"$project": {"_id": 0}}]`,
            columns: [
              Object.extend(type.date , {mongo_name: `time`     , sql_name: `time`    }),
              Object.extend(type.int  , {mongo_name: `gameId`   , sql_name: `gameId`  }),
              Object.extend(type.str  , {mongo_name: `currency` , sql_name: `currency`}),
              Object.extend(type.bool , {mongo_name: `isCash`   , sql_name: `isCash`  }),
              Object.extend(type.float, {mongo_name: `payout`   , sql_name: `payout`  }),
              Object.extend(type.float, {mongo_name: `stake`    , sql_name: `stake`   }),
              Object.extend(type.int  , {mongo_name: `tickets`  , sql_name: `tickets` }),
            ],
          },
          { sql_name: `game_summary_config`,
            mongo_name: `game_summary_config`,
            pipeline: `[{"$project": {"_id": 0}}]`,
            columns: [
              Object.extend(type.int  , {mongo_name: `gameId`       , sql_name: `gameId`    }),
              Object.extend(type.int  , {mongo_name: `owGameTypeId` , sql_name: `gameTypeId`}),
              Object.extend(type.str  , {mongo_name: `name.en`      , sql_name: `nameEN`    }),
              Object.extend(type.str  , {mongo_name: `name.vi`      , sql_name: `nameVI`    }),
              Object.extend(type.str  , {mongo_name: `name.grp`     , sql_name: `groupName` }),
              Object.extend(type.str  , {mongo_name: `coll.db`      , sql_name: `db`        }),
              Object.extend(type.str  , {mongo_name: `coll.group`   , sql_name: `coll`      }),
              Object.extend(type.str  , {mongo_name: `coll.round`   , sql_name: `round`     }),
              Object.extend(type.str  , {mongo_name: `coll.postfix` , sql_name: `ticket`    }),
            ],
          },
        ],
      },
    ]},
  })
}