if ((2 ** Saba.env() & 14) > 0)
{   // game_summary_config
    [
        {   idxKeys : {gameId: 1}
        ,   idxOpts : {unique: true}
        }
    ,   {   idxKeys : {owGameTypeId: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach((idx) => {
        Maint.createIndex(db.getSiblingDB('summary_arc').game_summary_config, idx.idxKeys, idx.idxOpts);
    });
}

db.getSiblingDB('summary_arc').game_summary_config.remove({});
db.getSiblingDB('summary_arc').game_summary_config.insertMany([
    {   gameId: 1
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1612
    :   (2 ** Saba.env() & 8) > 0 ? 3802
    :   null
    )
    ,   name: {
            en: `Big Small`
        ,   vi: `Tài Xỉu`
        ,   grp: `Big Small`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `taixiu`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [{$ifNull: [`$totalAmount`, `$bet`]}]
        ,   payout: (
                (2 ** Saba.env() & 6) > 0 ? [
                    {$multiply: [`$betwin`, {$toInt: `$win`}]}
                ,   {$multiply: [{$ifNull: [`$totalAmount`,`$bet`]}, {$toInt: `$win`}]}
                ,   {$multiply: [{$ifNull: [`$refund`, `$tralai`]}, {$toInt: {$not: `$win`}}]}
                ]
            :   (2 ** Saba.env() & 8) > 0 ? [
                    {$multiply: [`$betwin`, {$toInt: `$win`}]}
                ,   {$cond: {
                        if: {$or: [{$gte: ['$big', 0]}, {$gte: ['$small', 0]}]}
                    ,   then: 0
                    ,   else: {$sum: [{$multiply: [`$bet`, {$toInt: `$win`}]}, {$multiply: [`$tralai`, {$toInt: {$not: `$win`}}]}]}
                    }}
                ]
            :   [``]
            )
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 2
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1613
    :   (2 ** Saba.env() & 8) > 0 ? 3803
    :   null
    )
    ,   name: {
            en: `Se Die`
        ,   vi: `Xóc Đĩa`
        ,   grp: `Se Die`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `xocxoc`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [{$multiply: [
                {$add: [
                    {$ifNull: [`$even`, `$chan`]}
                ,   {$ifNull: [`$odd`, `$le`]}
                ,   {$ifNull: [`$red2`, 0]}
                ,   `$red3`, `$red4`, `$white3`, `$white4`
                ]}
            ,   {$toInt: {$not: `$freeBet`}}
            ]}]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 3
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1614
    :   (2 ** Saba.env() & 8) > 0 ? 3804
    :   null
    )
    ,   name: {
            en: `Fish Prawn Crab`
        ,   vi: `Bầu Cua`
        ,   grp: `Fish Prawn Crab`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `baucua`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [
                {$ifNull: [`$stag`      , `$0`]}
            ,   {$ifNull: [`$gourd`     , `$1`]}
            ,   {$ifNull: [`$rooster`   , `$2`]}
            ,   {$ifNull: [`$fish`      , `$3`]}
            ,   {$ifNull: [`$crab`      , `$4`]}
            ,   {$ifNull: [`$prawn`     , `$5`]}
            ]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 4
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1615
    :   (2 ** Saba.env() & 8) > 0 ? 3805
    :   null
    )
    ,   name: {
            en: `Turbo Big Small`
        ,   vi: `Tài Xỉu Siêu Tốc`
        ,   grp: `Big Small`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `txturbo`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [{$ifNull: [`$totalAmount`, `$bet`]}]
        ,   payout: (
                (2 ** Saba.env() & 6) > 0 ? [
                    {$multiply: [`$betwin`, {$toInt: `$win`}]}
                ,   {$multiply: [{$ifNull: [`$totalAmount`,`$bet`]}, {$toInt: `$win`}]}
                ,   {$multiply: [{$ifNull: [`$refund`, `$tralai`]}, {$toInt: {$not: `$win`}}]}
                ]
            :   (2 ** Saba.env() & 8) > 0 ? [
                    {$multiply: [`$betwin`, {$toInt: `$win`}]}
                ,   {$cond: {
                        if: {$or: [{$gte: ['$big', 0]}, {$gte: ['$small', 0]}]}
                    ,   then: 0
                    ,   else: {$sum: [{$multiply: [`$bet`, {$toInt: `$win`}]}, {$multiply: [`$tralai`, {$toInt: {$not: `$win`}}]}]}
                    }}
                ]
            :   [``]
            )
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 5
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1616
    :   (2 ** Saba.env() & 8) > 0 ? 3806
    :   null
    )
    ,   name: {
            en: `Odd Even`
        ,   vi: `Chẵn Lẻ`
        ,   grp: `Odd Even`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `chanle`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [{$ifNull: [`$totalAmount`, `$bet`]}]
        ,   payout: (
                (2 ** Saba.env() & 6) > 0 ? [
                    {$multiply: [`$betwin`, {$toInt: `$win`}]}
                ,   {$multiply: [{$ifNull: [`$totalAmount`, `$bet`]}, {$toInt: `$win`}]}
                ,   {$multiply: [{$ifNull: [`$refund`, `$tralai`]}, {$toInt: {$not: `$win`}}]}
                ]
            :   (2 ** Saba.env() & 8) > 0 ? [
                    {$multiply: [`$betwin`, {$toInt: `$win`}]}
                ,   {$cond: {
                        if: {$or: [{$gte: ['$odd', 0]}, {$gte: ['$even', 0]}]}
                    ,   then: 0
                    ,   else: {$sum: [{$multiply: [`$bet`, {$toInt: `$win`}]}, {$multiply: [`$tralai`, {$toInt: {$not: `$win`}}]}]}
                    }}
                ]
            :   [``]
            )
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 6
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1617
    :   (2 ** Saba.env() & 8) > 0 ? 3807
    :   null
    )
    ,   name: {
            en: `Turbo Odd Even`
        ,   vi: `Chẵn Lẻ Siêu Tốc`
        ,   grp: `Odd Even`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `chanleturbo`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [{$ifNull: [`$totalAmount`, `$bet`]}]
        ,   payout: (
                (2 ** Saba.env() & 6) > 0 ? [
                    {$multiply: [`$betwin`, {$toInt: `$win`}]}
                ,   {$multiply: [{$ifNull: [`$totalAmount`, `$bet`]}, {$toInt: `$win`}]}
                ,   {$multiply: [{$ifNull: [`$refund`, `$tralai`]}, {$toInt: {$not: `$win`}}]}
                ]
            :   (2 ** Saba.env() & 8) > 0 ? [
                    {$multiply: [`$betwin`, {$toInt: `$win`}]}
                ,   {$cond: {
                        if: {$or: [{$gte: ['$odd', 0]}, {$gte: ['$even', 0]}]}
                    ,   then: 0
                    ,   else: {$sum: [{$multiply: [`$bet`, {$toInt: `$win`}]}, {$multiply: [`$tralai`, {$toInt: {$not: `$win`}}]}]}
                    }}
                ]
            :   [``]
            )
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 7
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1618
    :   (2 ** Saba.env() & 8) > 0 ? 3808
    :   null
    )
    ,   name: {
            en: `Dragon Tiger`
        ,   vi: `Rồng Hổ`
        ,   grp: `Dragon Tiger`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `minidragontiger`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$dragon`, `$tie`, `$tiger`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 8
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1619
    :   (2 ** Saba.env() & 8) > 0 ? 3809
    :   null
    )
    ,   name: {
            en: `Keno Pro Max`
        ,   vi: `Keno Pro Max`
        ,   grp: `Keno Pro Max`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenopromax`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 9
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1620
    :   (2 ** Saba.env() & 8) > 0 ? 3823
    :   null
    )
    ,   name: {
            en: `Mini Se Die`
        ,   vi: `Xóc Đĩa Mini`
        ,   grp: `Se Die`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `minisedie`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 10
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1621
    :   (2 ** Saba.env() & 8) > 0 ? 3810
    :   null
    )
    ,   name: {
            en: `Baccarat`
        ,   vi: `Cào Baccarat`
        ,   grp: `Baccarat`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `baccarat`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 11
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1622
    :   null
    )
    ,   name: {
            en: `Keno Pro Viet`
        ,   vi: `Keno Pro Viet`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenoproviet`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 12
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1623
    :   (2 ** Saba.env() & 8) > 0 ? 3811
    :   null
    )
    ,   name: {
            en: `Keno Max`
        ,   vi: `Keno Max`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenomax`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 13
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1624
    :   (2 ** Saba.env() & 8) > 0 ? 3812
    :   null
    )
    ,   name: {
            en: `Keno Max 2`
        ,   vi: `Keno Max 2`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenomax2`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 14
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1625
    :   (2 ** Saba.env() & 8) > 0 ? 3813
    :   null
    )
    ,   name: {
            en: `Keno Mini`
        ,   vi: `Keno Mini`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenomini`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 15
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1626
    :   (2 ** Saba.env() & 8) > 0 ? 3814
    :   null
    )
    ,   name: {
            en: `Keno Mini 2`
        ,   vi: `Keno Mini 2`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenomini2`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 16
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1627
    :   (2 ** Saba.env() & 8) > 0 ? 3815
    :   null
    )
    ,   name: {
            en: `Keno East`
        ,   vi: `Keno Đông`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenoeast`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 17
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1628
    :   (2 ** Saba.env() & 8) > 0 ? 3816
    :   null
    )
    ,   name: {
            en: `Keno West`
        ,   vi: `Keno Tây`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenowest`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 18
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1629
    :   (2 ** Saba.env() & 8) > 0 ? 3817
    :   null
    )
    ,   name: {
            en: `Keno South`
        ,   vi: `Keno Nam`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenosouth`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 19
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1630
    :   (2 ** Saba.env() & 8) > 0 ? 3818
    :   null
    )
    ,   name: {
            en: `Keno North`
        ,   vi: `Keno Bắc`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `kenonorth`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 20
    ,   owGameTypeId: 1631
    ,   name: {
            en: `Bola Tangkas`
        ,   vi: `Bola Tangkas`
        ,   grp: `Bola Tangkas`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `bolatangkas`
        ,   round: `_rounds_bk`
        ,   postfix: `_rounds_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `id`
        ,   time: `$startTime`
        ,   memberId: `memberId`
        ,   settled: `$settled`
        ,   stake: [`$totalBet`]
        ,   payout: [`$win`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 21
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1632
    :   (2 ** Saba.env() & 8) > 0 ? 3819
    :   null
    )
    ,   name: {
            en: `Roulette`
        ,   vi: `Roulette`
        ,   grp: `Roulette`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `roulette`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$totalAmount`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 22
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1633
    :   (2 ** Saba.env() & 8) > 0 ? 3824
    :   null
    )
    ,   name: {
            en: `VIP Se Die`
        ,   vi: `Xóc Đĩa VIP`
        ,   grp: `Se Die`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `vipsedie`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$odd`, `$even`, `$white4`, `$white3`, `$red2`, `$red3`, `$red4`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 23
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1634
    :   (2 ** Saba.env() & 8) > 0 ? 3820
    :   null
    )
    ,   name: {
            en: `Blackjack`
        ,   vi: `Blackjack`
        ,   grp: `Blackjack`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `blackjack`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$bet`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 24
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1635
    :   (2 ** Saba.env() & 8) > 0 ? 3825
    :   null
    )
    ,   name: {
            en: `Special Se Die`
        ,   vi: `Xóc Đĩa Cân Cửa`
        ,   grp: `Se Die`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `specialsedie`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$amount`]
        ,   payout: [
                {$multiply: [`$betwin`, {$toInt: `$win`}]}
            ,   {$multiply: [`$amount`, {$toInt: `$win`}]}
            ,   {$multiply: [`$refund`, {$toInt: {$not: `$win`}}]}
            ]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 25
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1636
    :   (2 ** Saba.env() & 8) > 0 ? 3821
    :   null
    )
    ,   name: {
            en: `Sic Bo`
        ,   vi: `Sic Bo`
        ,   grp: `Sic Bo`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `sicbo`
        ,   round: `_phiens_bk`
        ,   postfix: (
                (2 ** Saba.env() & 6) > 0 ? `_ones_bk`
            :   (2 ** Saba.env() & 8) > 0 ? `_cuocs_bk`
            :   ``
            )
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: (
                (2 ** Saba.env() & 6) > 0 ? [`$totalAmount`]
            :   (2 ** Saba.env() & 8) > 0 ? [`$totalBet`]
            :   [``]
            )
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 26
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1637
    :   (2 ** Saba.env() & 8) > 0 ? 3826
    :   null
    )
    ,   name: {
            en: `VIP Fish Prawn Crab`
        ,   vi: `Bầu Cua VIP`
        ,   grp: `Fish Prawn Crab`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `vipfishprawncrab`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$stag`, `$gourd`, `$rooster`, `$fish`, `$crab`, `$prawn`, `$mountain`, `$ocean`, `$anyTriple`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 27
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1638
    :   (2 ** Saba.env() & 8) > 0 ? 3827
    :   null
    )
    ,   name: {
            en: `VIP Baccarat`
        ,   vi: `Cào Baccarat VIP`
        ,   grp: `Fish Prawn Crab`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `vipbaccarat`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$player`, `$banker`, `$tie`, `$big`, `$small`, `$playerPair`, `$bankerPair`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 28
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1639
    :   (2 ** Saba.env() & 8) > 0 ? 3828
    :   null
    )
    ,   name: {
            en: `Se Die War`
        ,   vi: `Xóc Dĩa Đối Kháng`
        ,   grp: `Se Die`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `vipsediewar`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$totalAmount`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 29
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1640
    :   (2 ** Saba.env() & 8) > 0 ? 3829
    :   null
    )
    ,   name: {
            en: `Four Guardians`
        ,   vi: `Long Lân Quy Phụng`
        ,   grp: `Slots`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `fourguardians`
        ,   round: `_rounds_bk`
        ,   postfix: `_rounds_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `id`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$paid`
        ,   stake: [
                {$multiply: [`$totalAmount`, {$toInt: {$not: `$freeSpin`}}]}
            ]
        ,   payout: [`$betWin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 30
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1641
    :   (2 ** Saba.env() & 8) > 0 ? 3822
    :   null
    )
    ,   name: {
            en: `Fish Prawn Crab Pro`
        ,   vi: `Bầu Cua Pro`
        ,   grp: `Fish Prawn Crab`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `fishprawncrabpro`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$totalBet`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 31
    ,   owGameTypeId: (
        (2 ** Saba.env() & 6) > 0 ? 1642
    :   (2 ** Saba.env() & 8) > 0 ? 3830
    :   null
    )
    ,   name: {
            en: `Lottery`
        ,   vi: `Xổ Số`
        ,   grp: `Lottery`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `lottery`
        ,   round: `_phiens_bk`
        ,   postfix: `_ones_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$totalAmount`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 32
    ,   owGameTypeId: 3832
    ,   name: {
            en: `Baccarat Diamond`
        ,   vi: `Cào Baccarat Diamond`
        ,   grp: `Baccarat`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `baccaratdiamond`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 33
    ,   owGameTypeId: 3833
    ,   name: {
            en: `Baccarat Sapphire`
        ,   vi: `Cào Baccarat Sapphire`
        ,   grp: `Baccarat`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `baccaratsapphire`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 34
    ,   owGameTypeId: 3834
    ,   name: {
            en: `Baccarat Ruby`
        ,   vi: `Cào Baccarat Ruby`
        ,   grp: `Baccarat`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `baccarat`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 35
    ,   owGameTypeId: 1643
    ,   name: {
            en: `Three Cards`
        ,   vi: `Ba Lá Đỏ Đen`
        ,   grp: `Card Games`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `threecards`
        ,   round: `_phiens_bk`
        ,   postfix: `_cuocs_bk`
        }
    ,   fields: {
            local: `id`
        ,   map: `phien`
        ,   time: `$time`
        ,   memberId: `memberId`
        ,   settled: `$thanhtoan`
        ,   stake: [`$red`, `$black`, `$diamonds`, `$hearts`, `$spades`, `$clubs`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: true
        }
    }

,   {   gameId: 99
    ,   owGameTypeId: (
        (2 ** Saba.env() & 2) > 0 ? 1699
    :   (2 ** Saba.env() & 12) > 0 ? 3899
    :   null
    )
    ,   name: {
            en: `Jackpot Prize`
        ,   vi: `Jackpot Prize`
        ,   grp: `Slots`
        }
    ,   coll: {
            db: `minigame_arc`
        ,   group: `jackpots_bk`
        ,   round: ``
        ,   postfix: ``
        }
    ,   fields: {
            local: `hitAt`
        ,   map: `hitAt`
        ,   time: `$hitTime`
        ,   memberId: `winnerId`
        ,   settled: `$winnerId`
        ,   stake: [0]
        ,   payout: [
                {$multiply: [`$amount`, `$winningRatio`]}
            ]
        }
    ,   config: {
            hasCurrency: true
        }
    }
]
,   {ordered: false}
);

