if ((2 ** Saba.env() & 14) > 0) {  // global_configs
  [ { idxKeys : {type: 1},
      idxOpts : {unique: true},
    }
  ].forEach((idx) => {
    Maint.createIndex(dbs.minigame.global_configs, idx.idxKeys, idx.idxOpts);
  });
}

dbs.minigame.global_configs.updateOne(
  { type: `kenosoccer_liveodds`},
  { $set: {
    time: ISODate('2021-06-29 07:00:00'),
    homeAway: {
      '-150': {
        inRunFTHome: 14.2292817679558,
        inRunFTAway: 1.0771643663739,
      },
      '-149': {
        inRunFTHome: 13.7846975088968,
        inRunFTAway: 1.07979650149836,
      },
      '-148': {
        inRunFTHome: 13.6045099739809,
        inRunFTAway: 1.08082408874802,
      },
      '-147': {
        inRunFTHome: 13.2190082644628,
        inRunFTAway: 1.08389239005218,
      },
      '-146': {
        inRunFTHome: 13.0442834138486,
        inRunFTAway: 1.08462207940015,
      },
      '-145': {
        inRunFTHome: 12.4261922785768,
        inRunFTAway: 1.08997343957503,
      },
      '-144': {
        inRunFTHome: 12.5177358490566,
        inRunFTAway: 1.08889180672269,
      },
      '-143': {
        inRunFTHome: 12.1347113328582,
        inRunFTAway: 1.09155606847471,
      },
      '-142': {
        inRunFTHome: 12.1945046999277,
        inRunFTAway: 1.09144447320735,
      },
      '-141': {
        inRunFTHome: 11.4109311740891,
        inRunFTAway: 1.09840218238504,
      },
      '-140': {
        inRunFTHome: 11.0867088607595,
        inRunFTAway: 1.10114407845109,
      },
      '-139': {
        inRunFTHome: 11.3350383631714,
        inRunFTAway: 1.09845715347915,
      },
      '-138': {
        inRunFTHome: 11.2774274905422,
        inRunFTAway: 1.0988511396449,
      },
      '-137': {
        inRunFTHome: 11.0356703567036,
        inRunFTAway: 1.1014670677061,
      },
      '-136': {
        inRunFTHome: 10.4746149458072,
        inRunFTAway: 1.10774613899614,
      },
      '-135': {
        inRunFTHome: 10.5301069217783,
        inRunFTAway: 1.1062370676914,
      },
      '-134': {
        inRunFTHome: 10.1960257787325,
        inRunFTAway: 1.11107859776438,
      },
      '-133': {
        inRunFTHome: 10.5073810825588,
        inRunFTAway: 1.10772955213557,
      },
      '-132': {
        inRunFTHome: 10.3353004291846,
        inRunFTAway: 1.10928772960212,
      },
      '-131': {
        inRunFTHome: 10.042246264812,
        inRunFTAway: 1.11268409635803,
      },
      '-130': {
        inRunFTHome: 9.91017964071856,
        inRunFTAway: 1.11447811447811,
      },
      '-129': {
        inRunFTHome: 9.72722844617633,
        inRunFTAway: 1.11732781290214,
      },
      '-128': {
        inRunFTHome: 9.22661217075386,
        inRunFTAway: 1.12410091844639,
      },
      '-127': {
        inRunFTHome: 9.34407625964594,
        inRunFTAway: 1.1225324462864,
      },
      '-126': {
        inRunFTHome: 9.05408970976253,
        inRunFTAway: 1.12612809713942,
      },
      '-125': {
        inRunFTHome: 8.91541038525963,
        inRunFTAway: 1.12890397157856,
      },
      '-124': {
        inRunFTHome: 8.65827486586876,
        inRunFTAway: 1.13277537796976,
      },
      '-123': {
        inRunFTHome: 8.84899466557243,
        inRunFTAway: 1.13012262865528,
      },
      '-122': {
        inRunFTHome: 8.48252846486062,
        inRunFTAway: 1.13614850652082,
      },
      '-121': {
        inRunFTHome: 8.41589861751152,
        inRunFTAway: 1.13761420265781,
      },
      '-120': {
        inRunFTHome: 8.45204964272283,
        inRunFTAway: 1.13700293433168,
      },
      '-119': {
        inRunFTHome: 7.97995780590717,
        inRunFTAway: 1.14569135241557,
      },
      '-118': {
        inRunFTHome: 7.87296077750781,
        inRunFTAway: 1.14822314467956,
      },
      '-117': {
        inRunFTHome: 7.74056603773585,
        inRunFTAway: 1.15071374906086,
      },
      '-116': {
        inRunFTHome: 7.77403204272363,
        inRunFTAway: 1.15062740835886,
      },
      '-115': {
        inRunFTHome: 7.59696186166775,
        inRunFTAway: 1.15452625374527,
      },
      '-114': {
        inRunFTHome: 7.42772952853598,
        inRunFTAway: 1.15820274714645,
      },
      '-113': {
        inRunFTHome: 7.43155310006139,
        inRunFTAway: 1.15985628742515,
      },
      '-112': {
        inRunFTHome: 7.26276722090261,
        inRunFTAway: 1.16215317369821,
      },
      '-111': {
        inRunFTHome: 7.21195005945303,
        inRunFTAway: 1.16359712230216,
      },
      '-110': {
        inRunFTHome: 7.09361456226524,
        inRunFTAway: 1.16681716648448,
      },
      '-109': {
        inRunFTHome: 6.852369213914,
        inRunFTAway: 1.17372742200328,
      },
      '-108': {
        inRunFTHome: 6.66965462694437,
        inRunFTAway: 1.1791740467978,
      },
      '-107': {
        inRunFTHome: 6.64660294497546,
        inRunFTAway: 1.18001284168043,
      },
      '-106': {
        inRunFTHome: 6.72992125984252,
        inRunFTAway: 1.17759713419675,
      },
      '-105': {
        inRunFTHome: 6.45515527950311,
        inRunFTAway: 1.18682623789512,
      },
      '-104': {
        inRunFTHome: 6.32962783953601,
        inRunFTAway: 1.19103269519349,
      },
      '-103': {
        inRunFTHome: 6.3987509007927,
        inRunFTAway: 1.18940882300411,
      },
      '-102': {
        inRunFTHome: 6.13234285714286,
        inRunFTAway: 1.19884713347335,
      },
      '-101': {
        inRunFTHome: 6.07323688969259,
        inRunFTAway: 1.20075080443332,
      },
      '-100': {
        inRunFTHome: 6.10161145926589,
        inRunFTAway: 1.19948961633228,
      },
      '-99': {
        inRunFTHome: 6.00504828797191,
        inRunFTAway: 1.20365156181258,
      },
      '-98': {
        inRunFTHome: 5.66612608960065,
        inRunFTAway: 1.21796156695281,
      },
      '-97': {
        inRunFTHome: 5.87964713295526,
        inRunFTAway: 1.20867875647668,
      },
      '-96': {
        inRunFTHome: 5.6445964982894,
        inRunFTAway: 1.21868346730393,
      },
      '-95': {
        inRunFTHome: 5.74669110160863,
        inRunFTAway: 1.21499913897021,
      },
      '-94': {
        inRunFTHome: 5.5282583621684,
        inRunFTAway: 1.22515230264559,
      },
      '-93': {
        inRunFTHome: 5.55203791469194,
        inRunFTAway: 1.22268609359997,
      },
      '-92': {
        inRunFTHome: 5.46322290847838,
        inRunFTAway: 1.22869049122364,
      },
      '-91': {
        inRunFTHome: 5.25773564657485,
        inRunFTAway: 1.23876949009692,
      },
      '-90': {
        inRunFTHome: 5.1906728618138,
        inRunFTAway: 1.24378376149437,
      },
      '-89': {
        inRunFTHome: 5.27357005422424,
        inRunFTAway: 1.23850798997658,
      },
      '-88': {
        inRunFTHome: 5.01986097318769,
        inRunFTAway: 1.25330578512397,
      },
      '-87': {
        inRunFTHome: 4.99577510562236,
        inRunFTAway: 1.25439634420009,
      },
      '-86': {
        inRunFTHome: 4.93190942669022,
        inRunFTAway: 1.25921521997622,
      },
      '-85': {
        inRunFTHome: 4.90273604301756,
        inRunFTAway: 1.25949701377321,
      },
      '-84': {
        inRunFTHome: 4.87549004233966,
        inRunFTAway: 1.2623736245889,
      },
      '-83': {
        inRunFTHome: 4.75905797101449,
        inRunFTAway: 1.27020710774438,
      },
      '-82': {
        inRunFTHome: 4.74514780531502,
        inRunFTAway: 1.27162519004561,
      },
      '-81': {
        inRunFTHome: 4.72573030392446,
        inRunFTAway: 1.27278868314392,
      },
      '-80': {
        inRunFTHome: 4.52470522178551,
        inRunFTAway: 1.28848383099492,
      },
      '-79': {
        inRunFTHome: 4.51384615384615,
        inRunFTAway: 1.28946422150306,
      },
      '-78': {
        inRunFTHome: 4.46603260869565,
        inRunFTAway: 1.29322894125979,
      },
      '-77': {
        inRunFTHome: 4.47251094091904,
        inRunFTAway: 1.2924554400664,
      },
      '-76': {
        inRunFTHome: 4.32567199065057,
        inRunFTAway: 1.30594323349537,
      },
      '-75': {
        inRunFTHome: 4.34814237464276,
        inRunFTAway: 1.30373140141778,
      },
      '-74': {
        inRunFTHome: 4.19768455122619,
        inRunFTAway: 1.31785672411772,
      },
      '-73': {
        inRunFTHome: 4.16025797030908,
        inRunFTAway: 1.32192707729188,
      },
      '-72': {
        inRunFTHome: 4.08976359054362,
        inRunFTAway: 1.32860317336556,
      },
      '-71': {
        inRunFTHome: 4.04999410446881,
        inRunFTAway: 1.3329711269792,
      },
      '-70': {
        inRunFTHome: 4.04015274242074,
        inRunFTAway: 1.3343142125578,
      },
      '-69': {
        inRunFTHome: 4.06310110250997,
        inRunFTAway: 1.3324358629178,
      },
      '-68': {
        inRunFTHome: 3.97216494845361,
        inRunFTAway: 1.34126247389185,
      },
      '-67': {
        inRunFTHome: 3.86539731454986,
        inRunFTAway: 1.35408875351814,
      },
      '-66': {
        inRunFTHome: 3.87800839037315,
        inRunFTAway: 1.35301594638318,
      },
      '-65': {
        inRunFTHome: 3.74907826819762,
        inRunFTAway: 1.36979447309676,
      },
      '-64': {
        inRunFTHome: 3.80021220159151,
        inRunFTAway: 1.3630551432812,
      },
      '-63': {
        inRunFTHome: 3.71160130718954,
        inRunFTAway: 1.37489596731482,
      },
      '-62': {
        inRunFTHome: 3.6771373386195,
        inRunFTAway: 1.37971545180608,
      },
      '-61': {
        inRunFTHome: 3.57233750978857,
        inRunFTAway: 1.39538885065382,
      },
      '-60': {
        inRunFTHome: 3.58304685197918,
        inRunFTAway: 1.39307263423203,
      },
      '-59': {
        inRunFTHome: 3.5087432744043,
        inRunFTAway: 1.40468497576737,
      },
      '-58': {
        inRunFTHome: 3.46278742374472,
        inRunFTAway: 1.4136940112648,
      },
      '-57': {
        inRunFTHome: 3.44150908416759,
        inRunFTAway: 1.41598016781083,
      },
      '-56': {
        inRunFTHome: 3.42596726190476,
        inRunFTAway: 1.41900689548904,
      },
      '-55': {
        inRunFTHome: 3.39616872020865,
        inRunFTAway: 1.42422870936109,
      },
      '-54': {
        inRunFTHome: 3.32599822537711,
        inRunFTAway: 1.43682919349893,
      },
      '-53': {
        inRunFTHome: 3.3263436123348,
        inRunFTAway: 1.43759043484883,
      },
      '-52': {
        inRunFTHome: 3.24252577319588,
        inRunFTAway: 1.45254772167488,
      },
      '-51': {
        inRunFTHome: 3.24519515705698,
        inRunFTAway: 1.45466621124141,
      },
      '-50': {
        inRunFTHome: 3.2425137072965,
        inRunFTAway: 1.4522100491122,
      },
      '-49': {
        inRunFTHome: 3.15451063483009,
        inRunFTAway: 1.472272934733,
      },
      '-48': {
        inRunFTHome: 3.1269165930802,
        inRunFTAway: 1.47612551159618,
      },
      '-47': {
        inRunFTHome: 3.08300015992324,
        inRunFTAway: 1.48859117408594,
      },
      '-46': {
        inRunFTHome: 3.05479987492183,
        inRunFTAway: 1.49394043659441,
      },
      '-45': {
        inRunFTHome: 3.03391794792552,
        inRunFTAway: 1.4991219363213,
      },
      '-44': {
        inRunFTHome: 3.00560606060606,
        inRunFTAway: 1.50605473939946,
      },
      '-43': {
        inRunFTHome: 2.98017060760251,
        inRunFTAway: 1.51295395836499,
      },
      '-42': {
        inRunFTHome: 2.91413290350942,
        inRunFTAway: 1.5299253788753,
      },
      '-41': {
        inRunFTHome: 2.90728670816551,
        inRunFTAway: 1.53277992277992,
      },
      '-40': {
        inRunFTHome: 2.86172874812326,
        inRunFTAway: 1.54478792790707,
      },
      '-39': {
        inRunFTHome: 2.82685113291452,
        inRunFTAway: 1.55532253679755,
      },
      '-38': {
        inRunFTHome: 2.83822906369157,
        inRunFTAway: 1.55282982422252,
      },
      '-37': {
        inRunFTHome: 2.8034485156087,
        inRunFTAway: 1.56292879568976,
      },
      '-36': {
        inRunFTHome: 2.73647410223339,
        inRunFTAway: 1.58536201675384,
      },
      '-35': {
        inRunFTHome: 2.75884790435432,
        inRunFTAway: 1.57751019615459,
      },
      '-34': {
        inRunFTHome: 2.71084497671324,
        inRunFTAway: 1.59417794819626,
      },
      '-33': {
        inRunFTHome: 2.66135278172196,
        inRunFTAway: 1.61225367532061,
      },
      '-32': {
        inRunFTHome: 2.65461168206062,
        inRunFTAway: 1.61299502015651,
      },
      '-31': {
        inRunFTHome: 2.62043795620438,
        inRunFTAway: 1.62727634194831,
      },
      '-30': {
        inRunFTHome: 2.62147142406063,
        inRunFTAway: 1.62622424194939,
      },
      '-29': {
        inRunFTHome: 2.58178415470992,
        inRunFTAway: 1.64151991115342,
      },
      '-28': {
        inRunFTHome: 2.55990459299125,
        inRunFTAway: 1.65103344903755,
      },
      '-27': {
        inRunFTHome: 2.53766484012766,
        inRunFTAway: 1.66048069345942,
      },
      '-26': {
        inRunFTHome: 2.49054471931494,
        inRunFTAway: 1.68001123189859,
      },
      '-25': {
        inRunFTHome: 2.46912779383146,
        inRunFTAway: 1.69031085991118,
      },
      '-24': {
        inRunFTHome: 2.45930978197505,
        inRunFTAway: 1.69684659319443,
      },
      '-23': {
        inRunFTHome: 2.44006052141527,
        inRunFTAway: 1.70662216614433,
      },
      '-22': {
        inRunFTHome: 2.40484862280901,
        inRunFTAway: 1.72369065100343,
      },
      '-21': {
        inRunFTHome: 2.38228782287823,
        inRunFTAway: 1.73419290850484,
      },
      '-20': {
        inRunFTHome: 2.38909499718943,
        inRunFTAway: 1.73088983913663,
      },
      '-19': {
        inRunFTHome: 2.35138414028896,
        inRunFTAway: 1.75062610337891,
      },
      '-18': {
        inRunFTHome: 2.34251357641583,
        inRunFTAway: 1.75734774475161,
      },
      '-17': {
        inRunFTHome: 2.29805569020305,
        inRunFTAway: 1.78228905597327,
      },
      '-16': {
        inRunFTHome: 2.28245904263835,
        inRunFTAway: 1.79130544038196,
      },
      '-15': {
        inRunFTHome: 2.26138645249921,
        inRunFTAway: 1.80441839875206,
      },
      '-14': {
        inRunFTHome: 2.22634197433883,
        inRunFTAway: 1.83036252475674,
      },
      '-13': {
        inRunFTHome: 2.22341203510238,
        inRunFTAway: 1.83035906256719,
      },
      '-12': {
        inRunFTHome: 2.22675112934213,
        inRunFTAway: 1.82777138473341,
      },
      '-11': {
        inRunFTHome: 2.21486368087409,
        inRunFTAway: 1.8363815058542,
      },
      '-10': {
        inRunFTHome: 2.15658774443272,
        inRunFTAway: 1.87775200245109,
      },
      '-9': {
        inRunFTHome: 2.15431943113621,
        inRunFTAway: 1.87953185498064,
      },
      '-8': {
        inRunFTHome: 2.15550082927074,
        inRunFTAway: 1.87899233296824,
      },
      '-7': {
        inRunFTHome: 2.11749705766967,
        inRunFTAway: 1.90926777502653,
      },
      '-6': {
        inRunFTHome: 2.12081434515554,
        inRunFTAway: 1.90721190253463,
      },
      '-5': {
        inRunFTHome: 2.09482087227414,
        inRunFTAway: 1.92753168809065,
      },
      '-4': {
        inRunFTHome: 2.05791690599272,
        inRunFTAway: 1.96042132141717,
      },
      '-3': {
        inRunFTHome: 2.07105794176996,
        inRunFTAway: 1.9474587756946,
      },
      '-2': {
        inRunFTHome: 2.04768503034068,
        inRunFTAway: 1.97075324197554,
      },
      '-1': {
        inRunFTHome: 2.01880238966332,
        inRunFTAway: 1.99908282124186,
      },
      '0': {
        inRunFTHome: 2.01312961405476,
        inRunFTAway: 2.00199804841782,
      },
      '1': {
        inRunFTHome: 1.99621212121212,
        inRunFTAway: 2.01859118086697,
      },
      '2': {
        inRunFTHome: 1.95033307653963,
        inRunFTAway: 2.06903514254122,
      },
      '3': {
        inRunFTHome: 1.96007500228666,
        inRunFTAway: 2.05775878624928,
      },
      '4': {
        inRunFTHome: 1.95715194474736,
        inRunFTAway: 2.06179694605332,
      },
      '5': {
        inRunFTHome: 1.94678061132212,
        inRunFTAway: 2.06955393193617,
      },
      '6': {
        inRunFTHome: 1.90830728003573,
        inRunFTAway: 2.11718943560775,
      },
      '7': {
        inRunFTHome: 1.90571197991392,
        inRunFTAway: 2.12238478054626,
      },
      '8': {
        inRunFTHome: 1.87995435192907,
        inRunFTAway: 2.1524197195839,
      },
      '9': {
        inRunFTHome: 1.87244273474384,
        inRunFTAway: 2.16289638456877,
      },
      '10': {
        inRunFTHome: 1.86163685074756,
        inRunFTAway: 2.17882971729126,
      },
      '11': {
        inRunFTHome: 1.85038618415343,
        inRunFTAway: 2.19305734121882,
      },
      '12': {
        inRunFTHome: 1.84292882047793,
        inRunFTAway: 2.20569974554707,
      },
      '13': {
        inRunFTHome: 1.82746268656716,
        inRunFTAway: 2.22780203784571,
      },
      '14': {
        inRunFTHome: 1.79926761511912,
        inRunFTAway: 2.27075697211155,
      },
      '15': {
        inRunFTHome: 1.7889962200756,
        inRunFTAway: 2.28531573582274,
      },
      '16': {
        inRunFTHome: 1.8042955398962,
        inRunFTAway: 2.26219447677494,
      },
      '17': {
        inRunFTHome: 1.77906442038376,
        inRunFTAway: 2.3041147807255,
      },
      '18': {
        inRunFTHome: 1.76742055062685,
        inRunFTAway: 2.32209696837036,
      },
      '19': {
        inRunFTHome: 1.75149787198876,
        inRunFTAway: 2.35070984915705,
      },
      '20': {
        inRunFTHome: 1.74312304397958,
        inRunFTAway: 2.36599407523336,
      },
      '21': {
        inRunFTHome: 1.72743704555724,
        inRunFTAway: 2.39334092202618,
      },
      '22': {
        inRunFTHome: 1.7188408169948,
        inRunFTAway: 2.41117363344051,
      },
      '23': {
        inRunFTHome: 1.70569453986986,
        inRunFTAway: 2.43953757225434,
      },
      '24': {
        inRunFTHome: 1.68930787204899,
        inRunFTAway: 2.47167698202181,
      },
      '25': {
        inRunFTHome: 1.68835904628331,
        inRunFTAway: 2.47943270758548,
      },
      '26': {
        inRunFTHome: 1.66828376013997,
        inRunFTAway: 2.52142556644029,
      },
      '27': {
        inRunFTHome: 1.65980325779601,
        inRunFTAway: 2.54075473998659,
      },
      '28': {
        inRunFTHome: 1.64733004926108,
        inRunFTAway: 2.57126161038322,
      },
      '29': {
        inRunFTHome: 1.64419193918758,
        inRunFTAway: 2.57432432432432,
      },
      '30': {
        inRunFTHome: 1.63097552267227,
        inRunFTAway: 2.61061722123444,
      },
      '31': {
        inRunFTHome: 1.63377601585728,
        inRunFTAway: 2.60111083059833,
      },
      '32': {
        inRunFTHome: 1.60673106886881,
        inRunFTAway: 2.67410048622366,
      },
      '33': {
        inRunFTHome: 1.59980476376415,
        inRunFTAway: 2.69209540705697,
      },
      '34': {
        inRunFTHome: 1.59276318357469,
        inRunFTAway: 2.71382016493748,
      },
      '35': {
        inRunFTHome: 1.58188397338625,
        inRunFTAway: 2.74517218095881,
      },
      '36': {
        inRunFTHome: 1.57377302988079,
        inRunFTAway: 2.76918885786283,
      },
      '37': {
        inRunFTHome: 1.56342834981578,
        inRunFTAway: 2.80243309002433,
      },
      '38': {
        inRunFTHome: 1.56219235877803,
        inRunFTAway: 2.80663952835486,
      },
      '39': {
        inRunFTHome: 1.55241437827831,
        inRunFTAway: 2.83717487840981,
      },
      '40': {
        inRunFTHome: 1.54538112452888,
        inRunFTAway: 2.85918599686922,
      },
      '41': {
        inRunFTHome: 1.53715800799262,
        inRunFTAway: 2.8952015632916,
      },
      '42': {
        inRunFTHome: 1.53499747661012,
        inRunFTAway: 2.89861447107983,
      },
      '43': {
        inRunFTHome: 1.51482232337528,
        inRunFTAway: 2.97223056139298,
      },
      '44': {
        inRunFTHome: 1.51275315973808,
        inRunFTAway: 2.98281038883051,
      },
      '45': {
        inRunFTHome: 1.50605262152977,
        inRunFTAway: 3.00739667530883,
      },
      '46': {
        inRunFTHome: 1.49297276709198,
        inRunFTAway: 3.05875926648459,
      },
      '47': {
        inRunFTHome: 1.48089027072117,
        inRunFTAway: 3.10963375796178,
      },
      '48': {
        inRunFTHome: 1.48586206896552,
        inRunFTAway: 3.08741342249821,
      },
      '49': {
        inRunFTHome: 1.47404725609756,
        inRunFTAway: 3.13800097355184,
      },
      '50': {
        inRunFTHome: 1.45196927849873,
        inRunFTAway: 3.25008468834688,
      },
      '51': {
        inRunFTHome: 1.46160853228072,
        inRunFTAway: 3.19948487869724,
      },
      '52': {
        inRunFTHome: 1.44988229933936,
        inRunFTAway: 3.26133743274404,
      },
      '53': {
        inRunFTHome: 1.44403579282627,
        inRunFTAway: 3.28630597980844,
      },
      '54': {
        inRunFTHome: 1.44356748224152,
        inRunFTAway: 3.29097763687773,
      },
      '55': {
        inRunFTHome: 1.43823857731244,
        inRunFTAway: 3.32094924895565,
      },
      '56': {
        inRunFTHome: 1.41436127706534,
        inRunFTAway: 3.45684523809524,
      },
      '57': {
        inRunFTHome: 1.41317319461444,
        inRunFTAway: 3.46487855200225,
      },
      '58': {
        inRunFTHome: 1.40384178222323,
        inRunFTAway: 3.51679954441913,
      },
      '59': {
        inRunFTHome: 1.4028738690793,
        inRunFTAway: 3.52238236136299,
      },
      '60': {
        inRunFTHome: 1.39168924333193,
        inRunFTAway: 3.59684418145957,
      },
      '61': {
        inRunFTHome: 1.3846271393643,
        inRunFTAway: 3.64517751181736,
      },
      '62': {
        inRunFTHome: 1.38997880131046,
        inRunFTAway: 3.60702140428086,
      },
      '63': {
        inRunFTHome: 1.36914285714286,
        inRunFTAway: 3.75117419893539,
      },
      '64': {
        inRunFTHome: 1.3804796387137,
        inRunFTAway: 3.67184425805116,
      },
      '65': {
        inRunFTHome: 1.35933126270179,
        inRunFTAway: 3.8299481417459,
      },
      '66': {
        inRunFTHome: 1.35173901525186,
        inRunFTAway: 3.89243679163034,
      },
      '67': {
        inRunFTHome: 1.35055138612345,
        inRunFTAway: 3.89907141277913,
      },
      '68': {
        inRunFTHome: 1.34031694869729,
        inRunFTAway: 3.98153425282116,
      },
      '69': {
        inRunFTHome: 1.34632034632035,
        inRunFTAway: 3.93938023071703,
      },
      '70': {
        inRunFTHome: 1.33818545902649,
        inRunFTAway: 4.00299504665361,
      },
      '71': {
        inRunFTHome: 1.33670374115268,
        inRunFTAway: 4.01823708206687,
      },
      '72': {
        inRunFTHome: 1.3247746517345,
        inRunFTAway: 4.12816147859922,
      },
      '73': {
        inRunFTHome: 1.31952778758285,
        inRunFTAway: 4.1741935483871,
      },
      '74': {
        inRunFTHome: 1.31569838335366,
        inRunFTAway: 4.22069400630915,
      },
      '75': {
        inRunFTHome: 1.31520157325467,
        inRunFTAway: 4.23064271255061,
      },
      '76': {
        inRunFTHome: 1.30002754712526,
        inRunFTAway: 4.38770088989242,
      },
      '77': {
        inRunFTHome: 1.29689544427263,
        inRunFTAway: 4.43151334507519,
      },
      '78': {
        inRunFTHome: 1.29308230827038,
        inRunFTAway: 4.46930963773069,
      },
      '79': {
        inRunFTHome: 1.28993448481239,
        inRunFTAway: 4.5233918128655,
      },
      '80': {
        inRunFTHome: 1.28688196169565,
        inRunFTAway: 4.53451927149513,
      },
      '81': {
        inRunFTHome: 1.28535800482703,
        inRunFTAway: 4.56290161359417,
      },
      '82': {
        inRunFTHome: 1.27876375746254,
        inRunFTAway: 4.64410029498525,
      },
      '83': {
        inRunFTHome: 1.2701100762066,
        inRunFTAway: 4.7568710359408,
      },
      '84': {
        inRunFTHome: 1.26658839723088,
        inRunFTAway: 4.82287652227532,
      },
      '85': {
        inRunFTHome: 1.2710695928857,
        inRunFTAway: 4.74623000761615,
      },
      '86': {
        inRunFTHome: 1.25666187641141,
        inRunFTAway: 4.95804309087964,
      },
      '87': {
        inRunFTHome: 1.25478825499245,
        inRunFTAway: 4.99203899268887,
      },
      '88': {
        inRunFTHome: 1.25062687548814,
        inRunFTAway: 5.05802161263508,
      },
      '89': {
        inRunFTHome: 1.24683149802618,
        inRunFTAway: 5.12118108892302,
      },
      '90': {
        inRunFTHome: 1.24065184436584,
        inRunFTAway: 5.22764371894961,
      },
      '91': {
        inRunFTHome: 1.24039553965916,
        inRunFTAway: 5.22844980489535,
      },
      '92': {
        inRunFTHome: 1.23384980103294,
        inRunFTAway: 5.35181784796181,
      },
      '93': {
        inRunFTHome: 1.23316766492502,
        inRunFTAway: 5.37095282146161,
      },
      '94': {
        inRunFTHome: 1.21913422131148,
        inRunFTAway: 5.63810463968411,
      },
      '95': {
        inRunFTHome: 1.21919801429366,
        inRunFTAway: 5.63135006918363,
      },
      '96': {
        inRunFTHome: 1.2257414709412,
        inRunFTAway: 5.5040415704388,
      },
      '97': {
        inRunFTHome: 1.21498427469734,
        inRunFTAway: 5.73074578337736,
      },
      '98': {
        inRunFTHome: 1.20766856496979,
        inRunFTAway: 5.88808817295464,
      },
      '99': {
        inRunFTHome: 1.2083388136262,
        inRunFTAway: 5.87404092071611,
      },
      '100': {
        inRunFTHome: 1.19815422841423,
        inRunFTAway: 6.13309107426755,
      },
      '101': {
        inRunFTHome: 1.1984134018791,
        inRunFTAway: 6.12202852614897,
      },
      '102': {
        inRunFTHome: 1.19591164157834,
        inRunFTAway: 6.19875346260388,
      },
      '103': {
        inRunFTHome: 1.18414742451155,
        inRunFTAway: 6.52483484218253,
      },
      '104': {
        inRunFTHome: 1.19337670017741,
        inRunFTAway: 6.24767801857585,
      },
      '105': {
        inRunFTHome: 1.18736909206812,
        inRunFTAway: 6.44035564336873,
      },
      '106': {
        inRunFTHome: 1.18111029681202,
        inRunFTAway: 6.61349063862529,
      },
      '107': {
        inRunFTHome: 1.17524532493983,
        inRunFTAway: 6.80879592384017,
      },
      '108': {
        inRunFTHome: 1.17513835278798,
        inRunFTAway: 6.82761415833559,
      },
      '109': {
        inRunFTHome: 1.17370825679431,
        inRunFTAway: 6.83836443468716,
      },
      '110': {
        inRunFTHome: 1.16936318314364,
        inRunFTAway: 7.03537068477646,
      },
      '111': {
        inRunFTHome: 1.15977398983904,
        inRunFTAway: 7.35279951836243,
      },
      '112': {
        inRunFTHome: 1.16513230828554,
        inRunFTAway: 7.17299703264095,
      },
      '113': {
        inRunFTHome: 1.1524439579268,
        inRunFTAway: 7.65297092288243,
      },
      '114': {
        inRunFTHome: 1.15998647865559,
        inRunFTAway: 7.34811869073111,
      },
      '115': {
        inRunFTHome: 1.15334348744657,
        inRunFTAway: 7.60168393782384,
      },
      '116': {
        inRunFTHome: 1.15324726520154,
        inRunFTAway: 7.66088379705401,
      },
      '117': {
        inRunFTHome: 1.14801713830211,
        inRunFTAway: 7.87794871794872,
      },
      '118': {
        inRunFTHome: 1.14980275628874,
        inRunFTAway: 7.79000347101701,
      },
      '119': {
        inRunFTHome: 1.14429361488185,
        inRunFTAway: 8.06806097128678,
      },
      '120': {
        inRunFTHome: 1.13901276334,
        inRunFTAway: 8.32871064467766,
      },
      '121': {
        inRunFTHome: 1.13764693534845,
        inRunFTAway: 8.3735032831209,
      },
      '122': {
        inRunFTHome: 1.13615931423793,
        inRunFTAway: 8.50097770825186,
      },
      '123': {
        inRunFTHome: 1.13165429480382,
        inRunFTAway: 8.73638968481375,
      },
      '124': {
        inRunFTHome: 1.13290218270008,
        inRunFTAway: 8.67919075144509,
      },
      '125': {
        inRunFTHome: 1.13011251533088,
        inRunFTAway: 8.82306411323897,
      },
      '126': {
        inRunFTHome: 1.12825520833333,
        inRunFTAway: 8.94451612903226,
      },
      '127': {
        inRunFTHome: 1.1249588951003,
        inRunFTAway: 9.14705882352941,
      },
      '128': {
        inRunFTHome: 1.12547742080431,
        inRunFTAway: 9.16651418115279,
      },
      '129': {
        inRunFTHome: 1.11917098445596,
        inRunFTAway: 9.58640226628895,
      },
      '130': {
        inRunFTHome: 1.11610107490573,
        inRunFTAway: 9.82755203171457,
      },
      '131': {
        inRunFTHome: 1.11051713465759,
        inRunFTAway: 10.2359958506224,
      },
      '132': {
        inRunFTHome: 1.11216708399727,
        inRunFTAway: 10.0945247933884,
      },
      '133': {
        inRunFTHome: 1.11158274217932,
        inRunFTAway: 10.1362672322375,
      },
      '134': {
        inRunFTHome: 1.10806831566549,
        inRunFTAway: 10.4702281580412,
      },
      '135': {
        inRunFTHome: 1.10930204716868,
        inRunFTAway: 10.3184855233853,
      },
      '136': {
        inRunFTHome: 1.10366616989568,
        inRunFTAway: 10.8079392877992,
      },
      '137': {
        inRunFTHome: 1.10296874055263,
        inRunFTAway: 10.9364508393285,
      },
      '138': {
        inRunFTHome: 1.09629314017895,
        inRunFTAway: 11.567758509955,
      },
      '139': {
        inRunFTHome: 1.10043343653251,
        inRunFTAway: 11.2338811630847,
      },
      '140': {
        inRunFTHome: 1.0960030118592,
        inRunFTAway: 11.5905773059058,
      },
      '141': {
        inRunFTHome: 1.0917868338558,
        inRunFTAway: 12.1436541143654,
      },
      '142': {
        inRunFTHome: 1.09371547410151,
        inRunFTAway: 11.8932862190813,
      },
      '143': {
        inRunFTHome: 1.08479155944416,
        inRunFTAway: 13.0208494208494,
      },
      '144': {
        inRunFTHome: 1.08708669617287,
        inRunFTAway: 12.6818526955201,
      },
      '145': {
        inRunFTHome: 1.08928101132473,
        inRunFTAway: 12.3925093632959,
      },
      '146': {
        inRunFTHome: 1.08280636357585,
        inRunFTAway: 13.2791836734694,
      },
      '147': {
        inRunFTHome: 1.0852075830672,
        inRunFTAway: 13.1124794745484,
      },
      '148': {
        inRunFTHome: 1.08219457475015,
        inRunFTAway: 13.3652392947103,
      },
      '149': {
        inRunFTHome: 1.08129005293954,
        inRunFTAway: 13.580927384077,
      },
      '150': {
        inRunFTHome: 1.07608158656221,
        inRunFTAway: 14.3298872180451,
      },
    },
    overUnder: {
      '661': {
        inRunFTOver: 11.3812785388128,
      inRunFTUnder: 1.09632724873543,
      },
      '662': {
        inRunFTOver: 11.618501529052,
      inRunFTUnder: 1.09417524659803,
      },
      '663': {
        inRunFTOver: 11.2471346704871,
      inRunFTUnder: 1.0975882558546,
      },
      '664': {
        inRunFTOver: 10.39364461738,
      inRunFTUnder: 1.10645495340007,
      },
      '665': {
        inRunFTOver: 10.8555107526882,
      inRunFTUnder: 1.10146607569042,
      },
      '666': {
        inRunFTOver: 10.8456953642384,
      inRunFTUnder: 1.10156722943432,
      },
      '667': {
        inRunFTOver: 10.4533582089552,
      inRunFTUnder: 1.10578251430827,
      },
      '668': {
        inRunFTOver: 10.2120291616039,
      inRunFTUnder: 1.10855371628306,
      },
      '669': {
        inRunFTOver: 10.0766081871345,
      inRunFTUnder: 1.11017331357516,
      },
      '670': {
        inRunFTOver: 9.88709677419355,
      inRunFTUnder: 1.11252268602541,
      },
      '671': {
        inRunFTOver: 9.75605815831987,
      inRunFTUnder: 1.11420664206642,
      },
      '672': {
        inRunFTOver: 9.82504100601422,
      inRunFTUnder: 1.11331392107057,
      },
      '673': {
        inRunFTOver: 9.71147715196599,
      inRunFTUnder: 1.11479109484599,
      },
      '674': {
        inRunFTOver: 9.08871365204534,
      inRunFTUnder: 1.12362905191323,
      },
      '675': {
        inRunFTOver: 9.39980109398309,
      inRunFTUnder: 1.1190504380772,
      },
      '676': {
        inRunFTOver: 9.2104513064133,
      inRunFTUnder: 1.12179598449343,
      },
      '677': {
        inRunFTOver: 9.10327339787921,
      inRunFTUnder: 1.12340691852526,
      },
      '678': {
        inRunFTOver: 8.96129326047359,
      inRunFTUnder: 1.12560773322656,
      },
      '679': {
        inRunFTOver: 8.57478632478633,
      inRunFTUnder: 1.13201692524683,
      },
      '680': {
        inRunFTOver: 8.92959582790091,
      inRunFTUnder: 1.12610983229201,
      },
      '681': {
        inRunFTOver: 8.66680602006689,
      inRunFTUnder: 1.13043241179999,
      },
      '682': {
        inRunFTOver: 8.54081222356253,
      inRunFTUnder: 1.13261170950197,
      },
      '683': {
        inRunFTOver: 8.23572530864198,
      inRunFTUnder: 1.13820314582778,
      },
      '684': {
        inRunFTOver: 8.12656309208033,
      inRunFTUnder: 1.14032009358218,
      },
      '685': {
        inRunFTOver: 7.79356663131849,
      inRunFTUnder: 1.14719808522816,
      },
      '686': {
        inRunFTOver: 7.85558678847505,
      inRunFTUnder: 1.1458664343191,
      },
      '687': {
        inRunFTOver: 7.64129336476928,
      inRunFTUnder: 1.15057308043412,
      },
      '688': {
        inRunFTOver: 7.98299078667612,
      inRunFTUnder: 1.14320511519334,
      },
      '689': {
        inRunFTOver: 7.53017944535074,
      inRunFTUnder: 1.15313514863852,
      },
      '690': {
        inRunFTOver: 7.44236858771374,
      inRunFTUnder: 1.15522241336938,
      },
      '691': {
        inRunFTOver: 7.29835265405735,
      inRunFTUnder: 1.15877167490071,
      },
      '692': {
        inRunFTOver: 7.09833673767143,
      inRunFTUnder: 1.16397913775779,
      },
      '693': {
        inRunFTOver: 7.15326560232221,
      inRunFTUnder: 1.16251533163506,
      },
      '694': {
        inRunFTOver: 7.02269543289437,
      inRunFTUnder: 1.16603861363108,
      },
      '695': {
        inRunFTOver: 6.94360385144429,
      inRunFTUnder: 1.16824809071974,
      },
      '696': {
        inRunFTOver: 7.0210235131397,
      inRunFTUnder: 1.16608471928696,
      },
      '697': {
        inRunFTOver: 6.88571428571429,
      inRunFTUnder: 1.16990291262136,
      },
      '698': {
        inRunFTOver: 6.78237410071943,
      inRunFTUnder: 1.17293934681182,
      },
      '699': {
        inRunFTOver: 6.60974397216008,
      inRunFTUnder: 1.17826125487416,
      },
      '700': {
        inRunFTOver: 6.683163392191,
      inRunFTUnder: 1.17595834062664,
      },
      '701': {
        inRunFTOver: 6.52804410354746,
      inRunFTUnder: 1.18089580713697,
      },
      '702': {
        inRunFTOver: 6.43889925373134,
      inRunFTUnder: 1.18386073235572,
      },
      '703': {
        inRunFTOver: 6.36493860845839,
      inRunFTUnder: 1.18639542275906,
      },
      '704': {
        inRunFTOver: 6.25884421006372,
      inRunFTUnder: 1.19015585175281,
      },
      '705': {
        inRunFTOver: 6.11263090403933,
      inRunFTUnder: 1.19559401387844,
      },
      '706': {
        inRunFTOver: 5.98584034475682,
      inRunFTUnder: 1.20056799473164,
      },
      '707': {
        inRunFTOver: 6.01376900945335,
      inRunFTUnder: 1.19945075214166,
      },
      '708': {
        inRunFTOver: 6.19447903694479,
      inRunFTUnder: 1.1925120869461,
      },
      '709': {
        inRunFTOver: 5.92131729441925,
      inRunFTUnder: 1.20319762782497,
      },
      '710': {
        inRunFTOver: 5.857583944423,
      inRunFTUnder: 1.20586365803273,
      },
      '711': {
        inRunFTOver: 5.67886482449589,
      inRunFTUnder: 1.21372705506784,
      },
      '712': {
        inRunFTOver: 5.85366317792579,
      inRunFTUnder: 1.20602995373638,
      },
      '713': {
        inRunFTOver: 5.79196876742889,
      inRunFTUnder: 1.20868249534451,
      },
      '714': {
        inRunFTOver: 5.51924422673198,
      inRunFTUnder: 1.22127593682255,
      },
      '715': {
        inRunFTOver: 5.66146837217452,
      inRunFTUnder: 1.21452467766793,
      },
      '716': {
        inRunFTOver: 5.44493169168494,
      inRunFTUnder: 1.2249753358124,
      },
      '717': {
        inRunFTOver: 5.45520013398091,
      inRunFTUnder: 1.22445680775882,
      },
      '718': {
        inRunFTOver: 5.36520477265398,
      inRunFTUnder: 1.22908432755882,
      },
      '719': {
        inRunFTOver: 5.20310053241466,
      inRunFTUnder: 1.23791960061101,
      },
      '720': {
        inRunFTOver: 5.06762264150943,
      inRunFTUnder: 1.24584384740983,
      },
      '721': {
        inRunFTOver: 5.12652324356853,
      inRunFTUnder: 1.24233475518612,
      },
      '722': {
        inRunFTOver: 5.20015117157974,
      inRunFTUnder: 1.23808666858624,
      },
      '723': {
        inRunFTOver: 4.98936170212766,
      inRunFTUnder: 1.25066666666667,
      },
      '724': {
        inRunFTOver: 4.88202325907244,
      inRunFTUnder: 1.25759763228182,
      },
      '725': {
        inRunFTOver: 5.00154342640662,
      inRunFTUnder: 1.24990357305656,
      },
      '726': {
        inRunFTOver: 4.91488481169817,
      inRunFTUnder: 1.25543535713027,
      },
      '727': {
        inRunFTOver: 4.83641479099679,
      inRunFTUnder: 1.26066003143007,
      },
      '728': {
        inRunFTOver: 4.86698782282885,
      inRunFTUnder: 1.25859921101806,
      },
      '729': {
        inRunFTOver: 4.66264294790343,
      inRunFTUnder: 1.27302688638335,
      },
      '730': {
        inRunFTOver: 4.75667008722422,
      inRunFTUnder: 1.26619319151842,
      },
      '731': {
        inRunFTOver: 4.66441102756892,
      inRunFTUnder: 1.27289515081048,
      },
      '732': {
        inRunFTOver: 4.54268808114962,
      inRunFTUnder: 1.28227153424004,
      },
      '733': {
        inRunFTOver: 4.54864048338369,
      inRunFTUnder: 1.28179805891367,
      },
      '734': {
        inRunFTOver: 4.51059571462209,
      inRunFTUnder: 1.28485194003823,
      },
      '735': {
        inRunFTOver: 4.44906875143711,
      inRunFTUnder: 1.28993333333333,
      },
      '736': {
        inRunFTOver: 4.42287873582961,
      inRunFTUnder: 1.29215174628663,
      },
      '737': {
        inRunFTOver: 4.3547387068202,
      inRunFTUnder: 1.29808580858086,
      },
      '738': {
        inRunFTOver: 4.35127071823204,
      inRunFTUnder: 1.29839427610538,
      },
      '739': {
        inRunFTOver: 4.26996238581408,
      inRunFTUnder: 1.30581391527262,
      },
      '740': {
        inRunFTOver: 4.19907843753273,
      inRunFTUnder: 1.31259002226005,
      },
      '741': {
        inRunFTOver: 4.24923627936374,
      inRunFTUnder: 1.30776462959961,
      },
      '742': {
        inRunFTOver: 4.06823221124773,
      inRunFTUnder: 1.3259205728739,
      },
      '743': {
        inRunFTOver: 4.09571124404339,
      inRunFTUnder: 1.32302754396882,
      },
      '744': {
        inRunFTOver: 4.02609542356378,
      inRunFTUnder: 1.33045884548555,
      },
      '745': {
        inRunFTOver: 4.0207552608821,
      inRunFTUnder: 1.33104303845787,
      },
      '746': {
        inRunFTOver: 3.9359010936757,
      inRunFTUnder: 1.34061092935117,
      },
      '747': {
        inRunFTOver: 3.89655815688835,
      inRunFTUnder: 1.34523732852451,
      },
      '748': {
        inRunFTOver: 3.95022539444027,
      inRunFTUnder: 1.33895715286178,
      },
      '749': {
        inRunFTOver: 3.86848567530696,
      inRunFTUnder: 1.34861599923904,
      },
      '750': {
        inRunFTOver: 3.75186125952527,
      inRunFTUnder: 1.36339041313896,
      },
      '751': {
        inRunFTOver: 3.71529941156109,
      inRunFTUnder: 1.36828351074001,
      },
      '752': {
        inRunFTOver: 3.68598747673041,
      inRunFTUnder: 1.37230255489399,
      },
      '753': {
        inRunFTOver: 3.71536695297219,
      inRunFTUnder: 1.36827435014093,
      },
      '754': {
        inRunFTOver: 3.64022355689022,
      inRunFTUnder: 1.37875580550378,
      },
      '755': {
        inRunFTOver: 3.60843225542366,
      inRunFTUnder: 1.38337204193083,
      },
      '756': {
        inRunFTOver: 3.57780458383595,
      inRunFTUnder: 1.38792700046795,
      },
      '757': {
        inRunFTOver: 3.54263504402316,
      inRunFTUnder: 1.39329277803775,
      },
      '758': {
        inRunFTOver: 3.51831516197349,
      inRunFTUnder: 1.39709088643867,
      },
      '759': {
        inRunFTOver: 3.4731669865643,
      inRunFTUnder: 1.40433986278832,
      },
      '760': {
        inRunFTOver: 3.46132638995252,
      inRunFTUnder: 1.40628500311139,
      },
      '761': {
        inRunFTOver: 3.43463137996219,
      inRunFTUnder: 1.41073979750295,
      },
      '762': {
        inRunFTOver: 3.43732215066647,
      inRunFTUnder: 1.41028634631928,
      },
      '763': {
        inRunFTOver: 3.38267463905498,
      inRunFTUnder: 1.41969641326968,
      },
      '764': {
        inRunFTOver: 3.36980830670927,
      inRunFTUnder: 1.42197505898214,
      },
      '765': {
        inRunFTOver: 3.25822091062395,
      inRunFTUnder: 1.44282647251003,
      },
      '766': {
        inRunFTOver: 3.23475906124149,
      inRunFTUnder: 1.44747553208016,
      },
      '767': {
        inRunFTOver: 3.22711934439777,
      inRunFTUnder: 1.44901051329623,
      },
      '768': {
        inRunFTOver: 3.22286150006932,
      inRunFTUnder: 1.44987058346587,
      },
      '769': {
        inRunFTOver: 3.22031228598822,
      inRunFTUnder: 1.45038709478424,
      },
      '770': {
        inRunFTOver: 3.16634169300074,
      inRunFTUnder: 1.46160769708256,
      },
      '771': {
        inRunFTOver: 3.09723040659988,
      inRunFTUnder: 1.47681933127283,
      },
      '772': {
        inRunFTOver: 3.1343264079446,
      inRunFTUnder: 1.46853189665728,
      },
      '773': {
        inRunFTOver: 3.07940510830909,
      inRunFTUnder: 1.48090677280925,
      },
      '774': {
        inRunFTOver: 3.05730422642467,
      inRunFTUnder: 1.48607298189333,
      },
      '775': {
        inRunFTOver: 3.01548007019303,
      inRunFTUnder: 1.49615970645853,
      },
      '776': {
        inRunFTOver: 2.99813409628063,
      inRunFTUnder: 1.50046691153583,
      },
      '777': {
        inRunFTOver: 2.93958295114046,
      inRunFTUnder: 1.51557475250646,
      },
      '778': {
        inRunFTOver: 2.97387216897625,
      inRunFTUnder: 1.50661842023876,
      },
      '779': {
        inRunFTOver: 2.94437398079362,
      inRunFTUnder: 1.51430435187774,
      },
      '780': {
        inRunFTOver: 2.90628544141348,
      inRunFTUnder: 1.52458041082164,
      },
      '781': {
        inRunFTOver: 2.87333255324128,
      inRunFTUnder: 1.53380805146944,
      },
      '782': {
        inRunFTOver: 2.85163497217069,
      inRunFTUnder: 1.5400632495225,
      },
      '783': {
        inRunFTOver: 2.82134423774693,
      inRunFTUnder: 1.54904502909183,
      },
      '784': {
        inRunFTOver: 2.82298691567237,
      inRunFTUnder: 1.54855028930977,
      },
      '785': {
        inRunFTOver: 2.77212426532326,
      inRunFTUnder: 1.56429451340851,
      },
      '786': {
        inRunFTOver: 2.76332958380202,
      inRunFTUnder: 1.56710895636642,
      },
      '787': {
        inRunFTOver: 2.74935818729769,
      inRunFTUnder: 1.57163821981177,
      },
      '788': {
        inRunFTOver: 2.69648213798746,
      inRunFTUnder: 1.58945507153191,
      },
      '789': {
        inRunFTOver: 2.7143875034256,
      inRunFTUnder: 1.58329869880751,
      },
      '790': {
        inRunFTOver: 2.65288773178896,
      inRunFTUnder: 1.60500176797711,
      },
      '791': {
        inRunFTOver: 2.64682895918044,
      inRunFTUnder: 1.60722760212916,
      },
      '792': {
        inRunFTOver: 2.61661140060003,
      inRunFTUnder: 1.61857784723579,
      },
      '793': {
        inRunFTOver: 2.63530465949821,
      inRunFTUnder: 1.61150684931507,
      },
      '794': {
        inRunFTOver: 2.58233571391872,
      inRunFTUnder: 1.63197714063058,
      },
      '795': {
        inRunFTOver: 2.58032786885246,
      inRunFTUnder: 1.63278008298755,
      },
      '796': {
        inRunFTOver: 2.56181855585271,
      inRunFTUnder: 1.64027924130664,
      },
      '797': {
        inRunFTOver: 2.50162866449511,
      inRunFTUnder: 1.66594360086768,
      },
      '798': {
        inRunFTOver: 2.5084266828136,
      inRunFTUnder: 1.66294239646752,
      },
      '799': {
        inRunFTOver: 2.49609843937575,
      inRunFTUnder: 1.66840521564694,
      },
      '800': {
        inRunFTOver: 2.47007024834273,
      inRunFTUnder: 1.68023960156145,
      },
      '801': {
        inRunFTOver: 2.44946965232764,
      inRunFTUnder: 1.68990751092591,
      },
      '802': {
        inRunFTOver: 2.45029987218563,
      inRunFTUnder: 1.68951257541862,
      },
      '803': {
        inRunFTOver: 2.41348489264549,
      inRunFTUnder: 1.70747130386968,
      },
      '804': {
        inRunFTOver: 2.3840977425667,
      inRunFTUnder: 1.72249232785076,
      },
      '805': {
        inRunFTOver: 2.37742839500309,
      inRunFTUnder: 1.72599055139832,
      },
      '806': {
        inRunFTOver: 2.35399704804076,
      inRunFTUnder: 1.73855404740136,
      },
      '807': {
        inRunFTOver: 2.35303037482822,
      inRunFTUnder: 1.73908170770147,
      },
      '808': {
        inRunFTOver: 2.32188980767444,
      inRunFTUnder: 1.75649270778422,
      },
      '809': {
        inRunFTOver: 2.3207520695945,
      inRunFTUnder: 1.75714437480081,
      },
      '810': {
        inRunFTOver: 2.30903600464576,
      inRunFTUnder: 1.76392092841679,
      },
      '811': {
        inRunFTOver: 2.28113666620759,
      inRunFTUnder: 1.78055684953596,
      },
      '812': {
        inRunFTOver: 2.28468833440751,
      inRunFTUnder: 1.77839891062854,
      },
      '813': {
        inRunFTOver: 2.25010246368232,
      inRunFTUnder: 1.79993442861827,
      },
      '814': {
        inRunFTOver: 2.25295735900963,
      inRunFTUnder: 1.79811175760237,
      },
      '815': {
        inRunFTOver: 2.20782385056175,
      inRunFTUnder: 1.8279352982928,
      },
      '816': {
        inRunFTOver: 2.20851957804398,
      inRunFTUnder: 1.8274586677516,
      },
      '817': {
        inRunFTOver: 2.19888392857143,
      inRunFTUnder: 1.83410910444982,
      },
      '818': {
        inRunFTOver: 2.18938037249284,
      inRunFTUnder: 1.84077392155387,
      },
      '819': {
        inRunFTOver: 2.15094504725236,
      inRunFTUnder: 1.86885121265111,
      },
      '820': {
        inRunFTOver: 2.14593908629442,
      inRunFTUnder: 1.87264673311185,
      },
      '821': {
        inRunFTOver: 2.12444034764288,
      inRunFTUnder: 1.88933130343132,
      },
      '822': {
        inRunFTOver: 2.10580411124547,
      inRunFTUnder: 1.90431930016402,
      },
      '823': {
        inRunFTOver: 2.11487430167598,
      inRunFTUnder: 1.89696210460382,
      },
      '824': {
        inRunFTOver: 2.10314307918142,
      inRunFTUnder: 1.90650072404211,
      },
      '825': {
        inRunFTOver: 2.07192164984037,
      inRunFTUnder: 1.93290400482995,
      },
      '826': {
        inRunFTOver: 2.04473717976134,
      inRunFTUnder: 1.95717853195235,
      },
      '827': {
        inRunFTOver: 2.07050068823125,
      inRunFTUnder: 1.93414232330132,
      },
      '828': {
        inRunFTOver: 2.03554126473741,
      inRunFTUnder: 1.96567856255693,
      },
      '829': {
        inRunFTOver: 2.03307920920016,
      inRunFTUnder: 1.96797998749218,
      },
      '830': {
        inRunFTOver: 2.01625529366471,
      inRunFTUnder: 1.98400471439997,
      },
      '831': {
        inRunFTOver: 2.00527121237885,
      inRunFTUnder: 1.99475642760487,
      },
      '832': {
        inRunFTOver: 1.9872791818105,
      inRunFTUnder: 2.01288472240058,
      },
      '833': {
        inRunFTOver: 1.979196496252,
      inRunFTUnder: 2.02124548425942,
      },
      '834': {
        inRunFTOver: 1.95183505500966,
      inRunFTUnder: 2.05060219702651,
      },
      '835': {
        inRunFTOver: 1.9564336372847,
      inRunFTUnder: 2.04555084745763,
      },
      '836': {
        inRunFTOver: 1.92534413624902,
      inRunFTUnder: 2.08067902613357,
      },
      '837': {
        inRunFTOver: 1.91415525114155,
      inRunFTUnder: 2.09390609390609,
      },
      '838': {
        inRunFTOver: 1.9178231520691,
      inRunFTUnder: 2.08953451189987,
      },
      '839': {
        inRunFTOver: 1.90405733925727,
      inRunFTUnder: 2.10612453057629,
      },
      '840': {
        inRunFTOver: 1.89372567075468,
      inRunFTUnder: 2.1189115773698,
      },
      '841': {
        inRunFTOver: 1.86441166776533,
      inRunFTUnder: 2.1568562032315,
      },
      '842': {
        inRunFTOver: 1.86964688204358,
      inRunFTUnder: 2.14989200863931,
      },
      '843': {
        inRunFTOver: 1.85057040552919,
      inRunFTUnder: 2.17568162905673,
      },
      '844': {
        inRunFTOver: 1.8640821458508,
      inRunFTUnder: 2.15729737595188,
      },
      '845': {
        inRunFTOver: 1.83116286835295,
      inRunFTUnder: 2.20313363129614,
      },
      '846': {
        inRunFTOver: 1.83825358653288,
      inRunFTUnder: 2.19295642281248,
      },
      '847': {
        inRunFTOver: 1.82817797496965,
      inRunFTUnder: 2.20746992823208,
      },
      '848': {
        inRunFTOver: 1.79603575271042,
      inRunFTUnder: 2.25622498310547,
      },
      '849': {
        inRunFTOver: 1.80104188372578,
      inRunFTUnder: 2.24837417408043,
      },
      '850': {
        inRunFTOver: 1.79239594673813,
      inRunFTUnder: 2.26199534982033,
      },
      '851': {
        inRunFTOver: 1.77228464419476,
      inRunFTUnder: 2.29485935984481,
      },
      '852': {
        inRunFTOver: 1.76645037850428,
      inRunFTUnder: 2.30471590600749,
      },
      '853': {
        inRunFTOver: 1.75359300145803,
      inRunFTUnder: 2.3269762299613,
      },
      '854': {
        inRunFTOver: 1.75103734439834,
      inRunFTUnder: 2.33149171270718,
      },
      '855': {
        inRunFTOver: 1.74366303753836,
      inRunFTUnder: 2.34469504267707,
      },
      '856': {
        inRunFTOver: 1.73442527054694,
      inRunFTUnder: 2.36160892074871,
      },
      '857': {
        inRunFTOver: 1.71877098723976,
      inRunFTUnder: 2.39126372342911,
      },
      '858': {
        inRunFTOver: 1.7054039324194,
      inRunFTUnder: 2.41762748127897,
      },
      '859': {
        inRunFTOver: 1.70498924549787,
      inRunFTUnder: 2.418461354391,
      },
      '860': {
        inRunFTOver: 1.69306514054873,
      inRunFTUnder: 2.44286581663631,
      },
      '861': {
        inRunFTOver: 1.68551042810099,
      inRunFTUnder: 2.45876701361089,
      },
      '862': {
        inRunFTOver: 1.67909300538048,
      inRunFTUnder: 2.47255234861347,
      },
      '863': {
        inRunFTOver: 1.65874629394324,
      inRunFTUnder: 2.51803510576738,
      },
      '864': {
        inRunFTOver: 1.66790360418,
      inRunFTUnder: 2.49722204483045,
      },
      '865': {
        inRunFTOver: 1.64276037256562,
      inRunFTUnder: 2.55578975102095,
      },
      '866': {
        inRunFTOver: 1.65492744206195,
      inRunFTUnder: 2.52688669885574,
      },
      '867': {
        inRunFTOver: 1.63527158774373,
      inRunFTUnder: 2.57412989860236,
      },
      '868': {
        inRunFTOver: 1.61540782893602,
      inRunFTUnder: 2.62493870402802,
      },
      '869': {
        inRunFTOver: 1.62467554940301,
      inRunFTUnder: 2.60083102493075,
      },
      '870': {
        inRunFTOver: 1.61376689935495,
      inRunFTUnder: 2.62928304059891,
      },
      '871': {
        inRunFTOver: 1.6177295024527,
      inRunFTUnder: 2.61883153715258,
      },
      '872': {
        inRunFTOver: 1.59425942156004,
      inRunFTUnder: 2.68276675761375,
      },
      '873': {
        inRunFTOver: 1.58528161530287,
      inRunFTUnder: 2.70857921016795,
      },
      '874': {
        inRunFTOver: 1.58333700683271,
      inRunFTUnder: 2.7142749187637,
      },
      '875': {
        inRunFTOver: 1.58060004511617,
      inRunFTUnder: 2.72235604942109,
      },
      '876': {
        inRunFTOver: 1.56990020677875,
      inRunFTUnder: 2.7546931692696,
      },
      '877': {
        inRunFTOver: 1.54357950765136,
      inRunFTUnder: 2.83965728274174,
      },
      '878': {
        inRunFTOver: 1.54620640057533,
      inRunFTUnder: 2.83080974325214,
      },
      '879': {
        inRunFTOver: 1.55084707476847,
      inRunFTUnder: 2.81538587714262,
      },
      '880': {
        inRunFTOver: 1.54743083003953,
      inRunFTUnder: 2.82671480144404,
      },
      '881': {
        inRunFTOver: 1.53588692969937,
      inRunFTUnder: 2.86606529209622,
      },
      '882': {
        inRunFTOver: 1.53232709033178,
      inRunFTUnder: 2.87854426002766,
      },
      '883': {
        inRunFTOver: 1.51622968378894,
      inRunFTUnder: 2.93712223725756,
      },
      '884': {
        inRunFTOver: 1.51471620420196,
      inRunFTUnder: 2.94281818181818,
      },
      '885': {
        inRunFTOver: 1.49807908545727,
      inRunFTUnder: 3.00771329131784,
      },
      '886': {
        inRunFTOver: 1.48856578204404,
      inRunFTUnder: 3.04680728113262,
      },
      '887': {
        inRunFTOver: 1.49047074518773,
      inRunFTUnder: 3.03885758694385,
      },
      '888': {
        inRunFTOver: 1.49893575851393,
      inRunFTUnder: 3.00426604615086,
      },
      '889': {
        inRunFTOver: 1.47697527872031,
      inRunFTUnder: 3.09654471544715,
      },
      '890': {
        inRunFTOver: 1.46540178571429,
      inRunFTUnder: 3.14868105515588,
      },
      '891': {
        inRunFTOver: 1.47246064054147,
      inRunFTUnder: 3.11657842831932,
      },
      '892': {
        inRunFTOver: 1.46298927154264,
      inRunFTUnder: 3.15987726166543,
      },
      '893': {
        inRunFTOver: 1.44947942488845,
      inRunFTUnder: 3.22479594087801,
      },
      '894': {
        inRunFTOver: 1.45502165810416,
      inRunFTUnder: 3.19769758689396,
      },
      '895': {
        inRunFTOver: 1.44697735543874,
      inRunFTUnder: 3.23724980210336,
      },
      '896': {
        inRunFTOver: 1.43621462024028,
      inRunFTUnder: 3.29244952736609,
      },
      '897': {
        inRunFTOver: 1.42960856983297,
      inRunFTUnder: 3.32770030725597,
      },
      '898': {
        inRunFTOver: 1.4268443255479,
      inRunFTUnder: 3.34277449680607,
      },
      '899': {
        inRunFTOver: 1.4288933137707,
      inRunFTUnder: 3.33158216249236,
      },
      '900': {
        inRunFTOver: 1.41567544604928,
      inRunFTUnder: 3.40572304547777,
      },
      '901': {
        inRunFTOver: 1.41209113707913,
      inRunFTUnder: 3.42664767577366,
      },
      '902': {
        inRunFTOver: 1.40538344887348,
      inRunFTUnder: 3.46680026720107,
      },
      '903': {
        inRunFTOver: 1.39889466840052,
      inRunFTUnder: 3.50692746536267,
      },
      '904': {
        inRunFTOver: 1.39900725467736,
      inRunFTUnder: 3.50622009569378,
      },
      '905': {
        inRunFTOver: 1.38995519663698,
      inRunFTUnder: 3.56439716312057,
      },
      '906': {
        inRunFTOver: 1.38240044555834,
      inRunFTUnder: 3.61505971453539,
      },
      '907': {
        inRunFTOver: 1.37110402327794,
      inRunFTUnder: 3.69466224366707,
      },
      '908': {
        inRunFTOver: 1.37785698121747,
      inRunFTUnder: 3.64650396765983,
      },
      '909': {
        inRunFTOver: 1.37128797848601,
      inRunFTUnder: 3.69332716905533,
      },
      '910': {
        inRunFTOver: 1.36977379775542,
      inRunFTUnder: 3.70435603082246,
      },
      '911': {
        inRunFTOver: 1.35158702476456,
      inRunFTUnder: 3.84424603174603,
      },
      '912': {
        inRunFTOver: 1.34709632142231,
      inRunFTUnder: 3.88104465037911,
      },
      '913': {
        inRunFTOver: 1.356892593935,
      inRunFTUnder: 3.8019634394042,
      },
      '914': {
        inRunFTOver: 1.33461909353906,
      inRunFTUnder: 3.98847262247839,
      },
      '915': {
        inRunFTOver: 1.33985165205664,
      inRunFTUnder: 3.94246031746032,
      },
      '916': {
        inRunFTOver: 1.33395371921335,
      inRunFTUnder: 3.99442689949842,
      },
      '917': {
        inRunFTOver: 1.32986154421854,
      inRunFTUnder: 4.03157496691246,
      },
      '918': {
        inRunFTOver: 1.32838010204082,
      inRunFTUnder: 4.04525150514663,
      },
      '919': {
        inRunFTOver: 1.32159549266918,
      inRunFTUnder: 4.10949631694207,
      },
      '920': {
        inRunFTOver: 1.30749935683046,
      inRunFTUnder: 4.25203932231751,
      },
      '921': {
        inRunFTOver: 1.31189375691687,
      inRunFTUnder: 4.20621999582551,
      },
      '922': {
        inRunFTOver: 1.29998055861577,
      inRunFTUnder: 4.33354936271333,
      },
      '923': {
        inRunFTOver: 1.30668281849384,
      inRunFTUnder: 4.2606978275181,
      },
      '924': {
        inRunFTOver: 1.2884718140529,
      inRunFTUnder: 4.46654318129197,
      },
      '925': {
        inRunFTOver: 1.30437765884452,
      inRunFTUnder: 4.28539224526601,
      },
      '926': {
        inRunFTOver: 1.28448690631659,
      inRunFTUnder: 4.51510026576468,
      },
      '927': {
        inRunFTOver: 1.2945725632272,
      inRunFTUnder: 4.39474929044466,
      },
      '928': {
        inRunFTOver: 1.28198340011448,
      inRunFTUnder: 4.54630804364375,
      },
      '929': {
        inRunFTOver: 1.27632331902718,
      inRunFTUnder: 4.61894900336526,
      },
      '930': {
        inRunFTOver: 1.27377668070277,
      inRunFTUnder: 4.65261203924688,
      },
      '931': {
        inRunFTOver: 1.26870773575091,
      inRunFTUnder: 4.72151548672566,
      },
      '932': {
        inRunFTOver: 1.26975152507067,
      inRunFTUnder: 4.70711527854385,
      },
      '933': {
        inRunFTOver: 1.26229384742827,
      inRunFTUnder: 4.81251794430089,
      },
      '934': {
        inRunFTOver: 1.25164953199325,
      inRunFTUnder: 4.97378048780488,
      },
      '935': {
        inRunFTOver: 1.26352156302121,
      inRunFTUnder: 4.79475587703436,
      },
      '936': {
        inRunFTOver: 1.25726604918556,
      inRunFTUnder: 4.88702669149597,
      },
      '937': {
        inRunFTOver: 1.25418631116892,
      inRunFTUnder: 4.93412216181644,
      },
      '938': {
        inRunFTOver: 1.24560973617577,
      inRunFTUnder: 5.07149983372132,
      },
      '939': {
        inRunFTOver: 1.24815948382827,
      inRunFTUnder: 5.02966666666667,
      },
      '940': {
        inRunFTOver: 1.24270468567617,
      inRunFTUnder: 5.12023359670216,
      },
      '941': {
        inRunFTOver: 1.24125753660637,
      inRunFTUnder: 5.14494823277401,
      },
      '942': {
        inRunFTOver: 1.23601565898217,
      inRunFTUnder: 5.23700700331736,
      },
      '943': {
        inRunFTOver: 1.23242341788818,
      inRunFTUnder: 5.30249244712991,
      },
      '944': {
        inRunFTOver: 1.2322446394644,
      inRunFTUnder: 5.30580444098169,
      },
      '945': {
        inRunFTOver: 1.22987249544627,
      inRunFTUnder: 5.35023771790808,
      },
      '946': {
        inRunFTOver: 1.22381040206566,
      inRunFTUnder: 5.46806757313556,
      },
      '947': {
        inRunFTOver: 1.21607946026987,
      inRunFTUnder: 5.62792714657415,
      },
      '948': {
        inRunFTOver: 1.2095533033033,
      inRunFTUnder: 5.77205553067622,
      },
      '949': {
        inRunFTOver: 1.20979959727682,
      inRunFTUnder: 5.7664533820841,
      },
      '950': {
        inRunFTOver: 1.21843003412969,
      inRunFTUnder: 5.578125,
      },
      '951': {
        inRunFTOver: 1.20631409611904,
      inRunFTUnder: 5.84697855750487,
      },
      '952': {
        inRunFTOver: 1.19761953621999,
      inRunFTUnder: 6.06022845275182,
      },
      '953': {
        inRunFTOver: 1.19809858427199,
      inRunFTUnder: 6.04799165362546,
      },
      '954': {
        inRunFTOver: 1.19526690013796,
      inRunFTUnder: 6.12119565217391,
      },
      '955': {
        inRunFTOver: 1.19157088122605,
      inRunFTUnder: 6.22,
      },
      '956': {
        inRunFTOver: 1.18823912335901,
      inRunFTUnder: 6.31239193083574,
      },
      '957': {
        inRunFTOver: 1.19568636261514,
      inRunFTUnder: 6.11021814006889,
      },
      '958': {
        inRunFTOver: 1.18705694031557,
      inRunFTUnder: 6.34596577017115,
      },
      '959': {
        inRunFTOver: 1.18041829464491,
      inRunFTUnder: 6.54267515923567,
      },
      '960': {
        inRunFTOver: 1.18800188946623,
      inRunFTUnder: 6.31909547738693,
      },
      '961': {
        inRunFTOver: 1.17261974470078,
      inRunFTUnder: 6.79308005427408,
      },
      '962': {
        inRunFTOver: 1.17538273116963,
      inRunFTUnder: 6.7018156424581,
      },
      '963': {
        inRunFTOver: 1.16562650024004,
      inRunFTUnder: 7.03768115942029,
      },
      '964': {
        inRunFTOver: 1.17042860765914,
      inRunFTUnder: 6.86755952380952,
      },
      '965': {
        inRunFTOver: 1.16880616174583,
      inRunFTUnder: 6.92395437262357,
      },
      '966': {
        inRunFTOver: 1.16538665254237,
      inRunFTUnder: 7.04643714971978,
      },
      '967': {
        inRunFTOver: 1.15946709729512,
      inRunFTUnder: 7.27088607594937,
      },
      '968': {
        inRunFTOver: 1.15899753492194,
      inRunFTUnder: 7.28940568475452,
      },
      '969': {
        inRunFTOver: 1.15692181295358,
      inRunFTUnder: 7.37260034904014,
      },
      '970': {
        inRunFTOver: 1.15232073573789,
      inRunFTUnder: 7.56509433962264,
      },
      '971': {
        inRunFTOver: 1.14655047204067,
      inRunFTUnder: 7.82358771060456,
      },
      '972': {
        inRunFTOver: 1.14248403946605,
      inRunFTUnder: 8.0183299389002,
      },
      '973': {
        inRunFTOver: 1.14181712288876,
      inRunFTUnder: 8.05133470225873,
      },
      '974': {
        inRunFTOver: 1.14814248585843,
      inRunFTUnder: 7.75025799793602,
      },
      '975': {
        inRunFTOver: 1.1463106335914,
      inRunFTUnder: 7.83477321814255,
      },
      '976': {
        inRunFTOver: 1.13062064597847,
      inRunFTUnder: 8.65575757575758,
      },
      '977': {
        inRunFTOver: 1.13556280587276,
      inRunFTUnder: 8.37665463297232,
      },
      '978': {
        inRunFTOver: 1.1336032388664,
      inRunFTUnder: 8.48484848484849,
      },
      '979': {
        inRunFTOver: 1.12425644415069,
      inRunFTUnder: 9.04787234042553,
      },
      '980': {
        inRunFTOver: 1.12690889942075,
      inRunFTUnder: 8.87966804979253,
      },
      '981': {
        inRunFTOver: 1.13150392017106,
      inRunFTUnder: 8.60433604336043,
      },
      '982': {
        inRunFTOver: 1.12757802518708,
      inRunFTUnder: 8.83834048640916,
      },
      '983': {
        inRunFTOver: 1.13288665549972,
      inRunFTUnder: 8.52521008403361,
      },
      '984': {
        inRunFTOver: 1.1282248748556,
      inRunFTUnder: 8.7987987987988,
      },
      '985': {
        inRunFTOver: 1.11463507833397,
      inRunFTUnder: 9.72333333333334,
      },
      '986': {
        inRunFTOver: 1.11748082357691,
      inRunFTUnder: 9.51202749140894,
      },
      '987': {
        inRunFTOver: 1.11770644054109,
      inRunFTUnder: 9.49571183533448,
      },
      '988': {
        inRunFTOver: 1.12296790329304,
      inRunFTUnder: 9.13220338983051,
      },
      '989': {
        inRunFTOver: 1.1221242743496,
      inRunFTUnder: 9.18838028169014,
      },
      '990': {
        inRunFTOver: 1.11331013484124,
      inRunFTUnder: 9.8253358925144,
      },
      '991': {
        inRunFTOver: 1.11483900022517,
      inRunFTUnder: 9.7078431372549,
      },
      '992': {
        inRunFTOver: 1.10596777853415,
      inRunFTUnder: 10.4368308351178,
      },
      '993': {
        inRunFTOver: 1.10296191819464,
      inRunFTUnder: 10.7123287671233,
      },
      '994': {
        inRunFTOver: 1.10931361220245,
      inRunFTUnder: 10.1479915433404,
      },
      '995': {
        inRunFTOver: 1.09583641290958,
      inRunFTUnder: 11.4344473007712,
      },
      '996': {
        inRunFTOver: 1.1059213884635,
      inRunFTUnder: 10.4409638554217,
      },
      '997': {
        inRunFTOver: 1.09899244332494,
      inRunFTUnder: 11.1017811704835,
      },
      '998': {
        inRunFTOver: 1.09718999742202,
      inRunFTUnder: 11.289124668435,
      },
      '999': {
        inRunFTOver: 1.0945474080043,
      inRunFTUnder: 11.5767045454545,
      },
      '1000': {
        inRunFTOver: 1.0958904109589,
      inRunFTUnder: 11.4285714285714,
      },
    },
    adjRate: {
      homeAway: 2,
      overUnder: 1.5,
    },
  }},
  { upsert: true},
);