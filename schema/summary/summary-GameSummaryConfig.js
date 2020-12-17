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
        Maint.createIndex(dbs.summary.game_summary_config, idx.idxKeys, idx.idxOpts);
    });
}

dbs.summary.game_summary_config.remove({});
dbs.summary.game_summary_config.insertMany([
    {   gameId: 1
    ,   owGameTypeId: 1612
    ,   name: {
            en: `Big Small`
        ,   vi: `Tài Xỉu`
        ,   grp: `Big Small`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `taixiu`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$bet`]
        ,   payout: [
                {$multiply: [`$betwin`, {$toInt: `$win`}]}
            ,   {$multiply: [`$bet`, {$toInt: `$win`}]}
            ,   {$multiply: [`$tralai`, {$toInt: {$not: `$win`}}]}
            ]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 2
    ,   owGameTypeId: 1613
    ,   name: {
            en: `Se Die`
        ,   vi: `Xóc Đĩa`
        ,   grp: `Se Die`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `xocxoc`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [{$multiply: [
                {$add: [
                    {$ifNull: [`$chan`, 0]}, {$ifNull: [`$le`, 0]}
                ,   `$red3`, `$red4`, `$white3`, `$white4`
                ,   {$ifNull: [`$odd`, 0]}, {$ifNull: [`$even`, 0]}
                ]}
            ,   {$toInt: {$not: `$freeBet`}}
            ]}]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 3
    ,   owGameTypeId: 1614
    ,   name: {
            en: `Fish Prawn Crab`
        ,   vi: `Bầu Cua`
        ,   grp: `Fish Prawn Crab`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `baucua`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$0`, `$1`, `$2`, `$3`, `$4`, `$5`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 4
    ,   owGameTypeId: 1615
    ,   name: {
            en: `Turbo Big Small`
        ,   vi: `Tài Xỉu Siêu Tốc`
        ,   grp: `Big Small`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `txturbo`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$bet`]
        ,   payout: [
                {$multiply: [`$betwin`, {$toInt: `$win`}]}
            ,   {$multiply: [`$bet`, {$toInt: `$win`}]}
            ,   {$multiply: [`$tralai`, {$toInt: {$not: `$win`}}]}
            ]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 5
    ,   owGameTypeId: 1616
    ,   name: {
            en: `Odd Even`
        ,   vi: `Chẵn Lẻ`
        ,   grp: `Odd Even`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `chanle`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$bet`]
        ,   payout: [
                {$multiply: [`$betwin`, {$toInt: `$win`}]}
            ,   {$multiply: [`$bet`, {$toInt: `$win`}]}
            ,   {$multiply: [`$tralai`, {$toInt: {$not: `$win`}}]}
            ]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 6
    ,   owGameTypeId: 1617
    ,   name: {
            en: `Turbo Odd Even`
        ,   vi: `Chẵn Lẻ Siêu Tốc`
        ,   grp: `Odd Even`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `chanleturbo`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$bet`]
        ,   payout: [
                {$multiply: [`$betwin`, {$toInt: `$win`}]}
            ,   {$multiply: [`$bet`, {$toInt: `$win`}]}
            ,   {$multiply: [`$tralai`, {$toInt: {$not: `$win`}}]}
            ]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 7
    ,   owGameTypeId: 1618
    ,   name: {
            en: `Dragon Tiger`
        ,   vi: `Rồng Hổ`
        ,   grp: `Dragon Tiger`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `minidragontiger`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$dragon`, `$tie`, `$tiger`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 8
    ,   owGameTypeId: 1619
    ,   name: {
            en: `Keno Pro Max`
        ,   vi: `Keno Pro Max`
        ,   grp: `Keno Pro Max`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenopromax`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 9
    ,   owGameTypeId: 1620
    ,   name: {
            en: `Mini Se Die`
        ,   vi: `Xóc Đĩa Mini`
        ,   grp: `Se Die`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `minisedie`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 10
    ,   owGameTypeId: 1621
    ,   name: {
            en: `Baccarat`
        ,   vi: `Cào Baccarat`
        ,   grp: `Baccarat`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `baccarat`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 11
    ,   owGameTypeId: 1622
    ,   name: {
            en: `Keno Pro Viet`
        ,   vi: `Keno Pro Viet`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenoproviet`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 12
    ,   owGameTypeId: 1623
    ,   name: {
            en: `Keno Max`
        ,   vi: `Keno Max`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenomax`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 13
    ,   owGameTypeId: 1624
    ,   name: {
            en: `Keno Max 2`
        ,   vi: `Keno Max 2`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenomax2`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 14
    ,   owGameTypeId: 1625
    ,   name: {
            en: `Keno Mini`
        ,   vi: `Keno Mini`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenomini`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 15
    ,   owGameTypeId: 1626
    ,   name: {
            en: `Keno Mini 2`
        ,   vi: `Keno Mini 2`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenomini2`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 16
    ,   owGameTypeId: 1627
    ,   name: {
            en: `Keno East`
        ,   vi: `Keno Đông`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenoeast`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 17
    ,   owGameTypeId: 1628
    ,   name: {
            en: `Keno West`
        ,   vi: `Keno Tây`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenowest`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 18
    ,   owGameTypeId: 1629
    ,   name: {
            en: `Keno South`
        ,   vi: `Keno Nam`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenosouth`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 19
    ,   owGameTypeId: 1630
    ,   name: {
            en: `Keno North`
        ,   vi: `Keno Bắc`
        ,   grp: `Mini Keno`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `kenonorth`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
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
            db: `minigame`
        ,   group: `bolatangkas`
        ,   round: `_rounds`
        ,   postfix: `_rounds`
        }
    ,   fields: {
            map: `id`
        ,   time: `$startTime`
        ,   settled: `$settled`
        ,   stake: [`$totalBet`]
        ,   payout: [`$win`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 21
    ,   owGameTypeId: 1632
    ,   name: {
            en: `Roulette`
        ,   vi: `Roulette`
        ,   grp: `Roulette`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `roulette`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$totalAmount`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 22
    ,   owGameTypeId: 1633
    ,   name: {
            en: `VIP Se Die`
        ,   vi: `Xóc Đĩa VIP`
        ,   grp: `Se Die`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `vipsedie`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$odd`, `$even`, `$white4`, `$white3`, `$red2`, `$red3`, `$red4`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 23
    ,   owGameTypeId: 1634
    ,   name: {
            en: `Blackjack`
        ,   vi: `Blackjack`
        ,   grp: `Blackjack`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `blackjack`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$bet`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 24
    ,   owGameTypeId: 1635
    ,   name: {
            en: `Special Se Die`
        ,   vi: `Xóc Đĩa Cân Cửa`
        ,   grp: `Se Die`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `specialsedie`
        ,   round: `_phiens`
        ,   postfix: `_ones`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$amount`]
        ,   payout: [
                {$multiply: [`$betwin`, {$toInt: `$win`}]}
            ,   {$multiply: [`$amount`, {$toInt: `$win`}]}
            ,   {$multiply: [`$refund`, {$toInt: {$not: `$win`}}]}
            ]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 25
    ,   owGameTypeId: 1636
    ,   name: {
            en: `Sic Bo`
        ,   vi: `Sic Bo`
        ,   grp: `Sic Bo`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `sicbo`
        ,   round: `_phiens`
        ,   postfix: (
                (2 ** Saba.env() & 2) > 0 ? `_ones`
            :   (2 ** Saba.env() & 8) > 0 ? `_cuocs`
            :   ``
            )
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: (
                (2 ** Saba.env() & 2) > 0 ? [`$totalAmount`]
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
    ,   owGameTypeId: 1637
    ,   name: {
            en: `VIP Fish Prawn Crab`
        ,   vi: `Bầu Cua VIP`
        ,   grp: `Fish Prawn Crab`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `vipfishprawncrab`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$stag`, `$gourd`, `$rooster`, `$fish`, `$crab`, `$prawn`, `$mountain`, `$ocean`, `$anyTriple`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }

,   {   gameId: 27
    ,   owGameTypeId: 1638
    ,   name: {
            en: `VIP Baccarat`
        ,   vi: `Cào Baccarat VIP`
        ,   grp: `Fish Prawn Crab`
        }
    ,   coll: {
            db: `minigame`
        ,   group: `vipbaccarat`
        ,   round: `_phiens`
        ,   postfix: `_cuocs`
        }
    ,   fields: {
            map: `phien`
        ,   time: `$time`
        ,   settled: `$thanhtoan`
        ,   stake: [`$player`, `$banker`, `$tie`, `$big`, `$small`, `$playerPair`, `$bankerPair`]
        ,   payout: [`$betwin`]
        }
    ,   config: {
            hasCurrency: false
        }
    }
]
,   {ordered: false}
);

