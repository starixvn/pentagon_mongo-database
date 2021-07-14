if ((2 ** Saba.env() & 2) > 0) {  // global_configs
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
        liveFTHome: 14.23,
        liveFTAway: 1.08,
      },
      '-149': {
        liveFTHome: 13.78,
        liveFTAway: 1.08,
      },
      '-148': {
        liveFTHome: 13.6,
        liveFTAway: 1.08,
      },
      '-147': {
        liveFTHome: 13.22,
        liveFTAway: 1.08,
      },
      '-146': {
        liveFTHome: 13.04,
        liveFTAway: 1.08,
      },
      '-145': {
        liveFTHome: 12.43,
        liveFTAway: 1.09,
      },
      '-144': {
        liveFTHome: 12.52,
        liveFTAway: 1.09,
      },
      '-143': {
        liveFTHome: 12.13,
        liveFTAway: 1.09,
      },
      '-142': {
        liveFTHome: 12.19,
        liveFTAway: 1.09,
      },
      '-141': {
        liveFTHome: 11.41,
        liveFTAway: 1.1,
      },
      '-140': {
        liveFTHome: 11.09,
        liveFTAway: 1.1,
      },
      '-139': {
        liveFTHome: 11.34,
        liveFTAway: 1.1,
      },
      '-138': {
        liveFTHome: 11.28,
        liveFTAway: 1.1,
      },
      '-137': {
        liveFTHome: 11.04,
        liveFTAway: 1.1,
      },
      '-136': {
        liveFTHome: 10.47,
        liveFTAway: 1.11,
      },
      '-135': {
        liveFTHome: 10.53,
        liveFTAway: 1.11,
      },
      '-134': {
        liveFTHome: 10.2,
        liveFTAway: 1.11,
      },
      '-133': {
        liveFTHome: 10.51,
        liveFTAway: 1.11,
      },
      '-132': {
        liveFTHome: 10.34,
        liveFTAway: 1.11,
      },
      '-131': {
        liveFTHome: 10.04,
        liveFTAway: 1.11,
      },
      '-130': {
        liveFTHome: 9.91,
        liveFTAway: 1.11,
      },
      '-129': {
        liveFTHome: 9.73,
        liveFTAway: 1.12,
      },
      '-128': {
        liveFTHome: 9.23,
        liveFTAway: 1.12,
      },
      '-127': {
        liveFTHome: 9.34,
        liveFTAway: 1.12,
      },
      '-126': {
        liveFTHome: 9.05,
        liveFTAway: 1.13,
      },
      '-125': {
        liveFTHome: 8.92,
        liveFTAway: 1.13,
      },
      '-124': {
        liveFTHome: 8.66,
        liveFTAway: 1.13,
      },
      '-123': {
        liveFTHome: 8.85,
        liveFTAway: 1.13,
      },
      '-122': {
        liveFTHome: 8.48,
        liveFTAway: 1.14,
      },
      '-121': {
        liveFTHome: 8.42,
        liveFTAway: 1.14,
      },
      '-120': {
        liveFTHome: 8.45,
        liveFTAway: 1.14,
      },
      '-119': {
        liveFTHome: 7.98,
        liveFTAway: 1.15,
      },
      '-118': {
        liveFTHome: 7.87,
        liveFTAway: 1.15,
      },
      '-117': {
        liveFTHome: 7.74,
        liveFTAway: 1.15,
      },
      '-116': {
        liveFTHome: 7.77,
        liveFTAway: 1.15,
      },
      '-115': {
        liveFTHome: 7.6,
        liveFTAway: 1.15,
      },
      '-114': {
        liveFTHome: 7.43,
        liveFTAway: 1.16,
      },
      '-113': {
        liveFTHome: 7.43,
        liveFTAway: 1.16,
      },
      '-112': {
        liveFTHome: 7.26,
        liveFTAway: 1.16,
      },
      '-111': {
        liveFTHome: 7.21,
        liveFTAway: 1.16,
      },
      '-110': {
        liveFTHome: 7.09,
        liveFTAway: 1.17,
      },
      '-109': {
        liveFTHome: 6.85,
        liveFTAway: 1.17,
      },
      '-108': {
        liveFTHome: 6.67,
        liveFTAway: 1.18,
      },
      '-107': {
        liveFTHome: 6.65,
        liveFTAway: 1.18,
      },
      '-106': {
        liveFTHome: 6.73,
        liveFTAway: 1.18,
      },
      '-105': {
        liveFTHome: 6.46,
        liveFTAway: 1.19,
      },
      '-104': {
        liveFTHome: 6.33,
        liveFTAway: 1.19,
      },
      '-103': {
        liveFTHome: 6.4,
        liveFTAway: 1.19,
      },
      '-102': {
        liveFTHome: 6.13,
        liveFTAway: 1.2,
      },
      '-101': {
        liveFTHome: 6.07,
        liveFTAway: 1.2,
      },
      '-100': {
        liveFTHome: 6.1,
        liveFTAway: 1.2,
      },
      '-99': {
        liveFTHome: 6.01,
        liveFTAway: 1.2,
      },
      '-98': {
        liveFTHome: 5.67,
        liveFTAway: 1.22,
      },
      '-97': {
        liveFTHome: 5.88,
        liveFTAway: 1.21,
      },
      '-96': {
        liveFTHome: 5.64,
        liveFTAway: 1.22,
      },
      '-95': {
        liveFTHome: 5.75,
        liveFTAway: 1.21,
      },
      '-94': {
        liveFTHome: 5.53,
        liveFTAway: 1.23,
      },
      '-93': {
        liveFTHome: 5.55,
        liveFTAway: 1.22,
      },
      '-92': {
        liveFTHome: 5.46,
        liveFTAway: 1.23,
      },
      '-91': {
        liveFTHome: 5.26,
        liveFTAway: 1.24,
      },
      '-90': {
        liveFTHome: 5.19,
        liveFTAway: 1.24,
      },
      '-89': {
        liveFTHome: 5.27,
        liveFTAway: 1.24,
      },
      '-88': {
        liveFTHome: 5.02,
        liveFTAway: 1.25,
      },
      '-87': {
        liveFTHome: 5,
        liveFTAway: 1.25,
      },
      '-86': {
        liveFTHome: 4.93,
        liveFTAway: 1.26,
      },
      '-85': {
        liveFTHome: 4.9,
        liveFTAway: 1.26,
      },
      '-84': {
        liveFTHome: 4.88,
        liveFTAway: 1.26,
      },
      '-83': {
        liveFTHome: 4.76,
        liveFTAway: 1.27,
      },
      '-82': {
        liveFTHome: 4.75,
        liveFTAway: 1.27,
      },
      '-81': {
        liveFTHome: 4.73,
        liveFTAway: 1.27,
      },
      '-80': {
        liveFTHome: 4.52,
        liveFTAway: 1.29,
      },
      '-79': {
        liveFTHome: 4.51,
        liveFTAway: 1.29,
      },
      '-78': {
        liveFTHome: 4.47,
        liveFTAway: 1.29,
      },
      '-77': {
        liveFTHome: 4.47,
        liveFTAway: 1.29,
      },
      '-76': {
        liveFTHome: 4.33,
        liveFTAway: 1.31,
      },
      '-75': {
        liveFTHome: 4.35,
        liveFTAway: 1.3,
      },
      '-74': {
        liveFTHome: 4.2,
        liveFTAway: 1.32,
      },
      '-73': {
        liveFTHome: 4.16,
        liveFTAway: 1.32,
      },
      '-72': {
        liveFTHome: 4.09,
        liveFTAway: 1.33,
      },
      '-71': {
        liveFTHome: 4.05,
        liveFTAway: 1.33,
      },
      '-70': {
        liveFTHome: 4.04,
        liveFTAway: 1.33,
      },
      '-69': {
        liveFTHome: 4.06,
        liveFTAway: 1.33,
      },
      '-68': {
        liveFTHome: 3.97,
        liveFTAway: 1.34,
      },
      '-67': {
        liveFTHome: 3.87,
        liveFTAway: 1.35,
      },
      '-66': {
        liveFTHome: 3.88,
        liveFTAway: 1.35,
      },
      '-65': {
        liveFTHome: 3.75,
        liveFTAway: 1.37,
      },
      '-64': {
        liveFTHome: 3.8,
        liveFTAway: 1.36,
      },
      '-63': {
        liveFTHome: 3.71,
        liveFTAway: 1.37,
      },
      '-62': {
        liveFTHome: 3.68,
        liveFTAway: 1.38,
      },
      '-61': {
        liveFTHome: 3.57,
        liveFTAway: 1.4,
      },
      '-60': {
        liveFTHome: 3.58,
        liveFTAway: 1.39,
      },
      '-59': {
        liveFTHome: 3.51,
        liveFTAway: 1.4,
      },
      '-58': {
        liveFTHome: 3.46,
        liveFTAway: 1.41,
      },
      '-57': {
        liveFTHome: 3.44,
        liveFTAway: 1.42,
      },
      '-56': {
        liveFTHome: 3.43,
        liveFTAway: 1.42,
      },
      '-55': {
        liveFTHome: 3.4,
        liveFTAway: 1.42,
      },
      '-54': {
        liveFTHome: 3.33,
        liveFTAway: 1.44,
      },
      '-53': {
        liveFTHome: 3.33,
        liveFTAway: 1.44,
      },
      '-52': {
        liveFTHome: 3.24,
        liveFTAway: 1.45,
      },
      '-51': {
        liveFTHome: 3.25,
        liveFTAway: 1.45,
      },
      '-50': {
        liveFTHome: 3.24,
        liveFTAway: 1.45,
      },
      '-49': {
        liveFTHome: 3.15,
        liveFTAway: 1.47,
      },
      '-48': {
        liveFTHome: 3.13,
        liveFTAway: 1.48,
      },
      '-47': {
        liveFTHome: 3.08,
        liveFTAway: 1.49,
      },
      '-46': {
        liveFTHome: 3.05,
        liveFTAway: 1.49,
      },
      '-45': {
        liveFTHome: 3.03,
        liveFTAway: 1.5,
      },
      '-44': {
        liveFTHome: 3.01,
        liveFTAway: 1.51,
      },
      '-43': {
        liveFTHome: 2.98,
        liveFTAway: 1.51,
      },
      '-42': {
        liveFTHome: 2.91,
        liveFTAway: 1.53,
      },
      '-41': {
        liveFTHome: 2.91,
        liveFTAway: 1.53,
      },
      '-40': {
        liveFTHome: 2.86,
        liveFTAway: 1.54,
      },
      '-39': {
        liveFTHome: 2.83,
        liveFTAway: 1.56,
      },
      '-38': {
        liveFTHome: 2.84,
        liveFTAway: 1.55,
      },
      '-37': {
        liveFTHome: 2.8,
        liveFTAway: 1.56,
      },
      '-36': {
        liveFTHome: 2.74,
        liveFTAway: 1.59,
      },
      '-35': {
        liveFTHome: 2.76,
        liveFTAway: 1.58,
      },
      '-34': {
        liveFTHome: 2.71,
        liveFTAway: 1.59,
      },
      '-33': {
        liveFTHome: 2.66,
        liveFTAway: 1.61,
      },
      '-32': {
        liveFTHome: 2.65,
        liveFTAway: 1.61,
      },
      '-31': {
        liveFTHome: 2.62,
        liveFTAway: 1.63,
      },
      '-30': {
        liveFTHome: 2.62,
        liveFTAway: 1.63,
      },
      '-29': {
        liveFTHome: 2.58,
        liveFTAway: 1.64,
      },
      '-28': {
        liveFTHome: 2.56,
        liveFTAway: 1.65,
      },
      '-27': {
        liveFTHome: 2.54,
        liveFTAway: 1.66,
      },
      '-26': {
        liveFTHome: 2.49,
        liveFTAway: 1.68,
      },
      '-25': {
        liveFTHome: 2.47,
        liveFTAway: 1.69,
      },
      '-24': {
        liveFTHome: 2.46,
        liveFTAway: 1.7,
      },
      '-23': {
        liveFTHome: 2.44,
        liveFTAway: 1.71,
      },
      '-22': {
        liveFTHome: 2.4,
        liveFTAway: 1.72,
      },
      '-21': {
        liveFTHome: 2.38,
        liveFTAway: 1.73,
      },
      '-20': {
        liveFTHome: 2.39,
        liveFTAway: 1.73,
      },
      '-19': {
        liveFTHome: 2.35,
        liveFTAway: 1.75,
      },
      '-18': {
        liveFTHome: 2.34,
        liveFTAway: 1.76,
      },
      '-17': {
        liveFTHome: 2.3,
        liveFTAway: 1.78,
      },
      '-16': {
        liveFTHome: 2.28,
        liveFTAway: 1.79,
      },
      '-15': {
        liveFTHome: 2.26,
        liveFTAway: 1.8,
      },
      '-14': {
        liveFTHome: 2.23,
        liveFTAway: 1.83,
      },
      '-13': {
        liveFTHome: 2.22,
        liveFTAway: 1.83,
      },
      '-12': {
        liveFTHome: 2.23,
        liveFTAway: 1.83,
      },
      '-11': {
        liveFTHome: 2.21,
        liveFTAway: 1.84,
      },
      '-10': {
        liveFTHome: 2.16,
        liveFTAway: 1.88,
      },
      '-9': {
        liveFTHome: 2.15,
        liveFTAway: 1.88,
      },
      '-8': {
        liveFTHome: 2.16,
        liveFTAway: 1.88,
      },
      '-7': {
        liveFTHome: 2.12,
        liveFTAway: 1.91,
      },
      '-6': {
        liveFTHome: 2.12,
        liveFTAway: 1.91,
      },
      '-5': {
        liveFTHome: 2.09,
        liveFTAway: 1.93,
      },
      '-4': {
        liveFTHome: 2.06,
        liveFTAway: 1.96,
      },
      '-3': {
        liveFTHome: 2.07,
        liveFTAway: 1.95,
      },
      '-2': {
        liveFTHome: 2.05,
        liveFTAway: 1.97,
      },
      '-1': {
        liveFTHome: 2.02,
        liveFTAway: 2,
      },
      '0': {
        liveFTHome: 2.01,
        liveFTAway: 2,
      },
      '1': {
        liveFTHome: 2,
        liveFTAway: 2.02,
      },
      '2': {
        liveFTHome: 1.95,
        liveFTAway: 2.07,
      },
      '3': {
        liveFTHome: 1.96,
        liveFTAway: 2.06,
      },
      '4': {
        liveFTHome: 1.96,
        liveFTAway: 2.06,
      },
      '5': {
        liveFTHome: 1.95,
        liveFTAway: 2.07,
      },
      '6': {
        liveFTHome: 1.91,
        liveFTAway: 2.12,
      },
      '7': {
        liveFTHome: 1.91,
        liveFTAway: 2.12,
      },
      '8': {
        liveFTHome: 1.88,
        liveFTAway: 2.15,
      },
      '9': {
        liveFTHome: 1.87,
        liveFTAway: 2.16,
      },
      '10': {
        liveFTHome: 1.86,
        liveFTAway: 2.18,
      },
      '11': {
        liveFTHome: 1.85,
        liveFTAway: 2.19,
      },
      '12': {
        liveFTHome: 1.84,
        liveFTAway: 2.21,
      },
      '13': {
        liveFTHome: 1.83,
        liveFTAway: 2.23,
      },
      '14': {
        liveFTHome: 1.8,
        liveFTAway: 2.27,
      },
      '15': {
        liveFTHome: 1.79,
        liveFTAway: 2.29,
      },
      '16': {
        liveFTHome: 1.8,
        liveFTAway: 2.26,
      },
      '17': {
        liveFTHome: 1.78,
        liveFTAway: 2.3,
      },
      '18': {
        liveFTHome: 1.77,
        liveFTAway: 2.32,
      },
      '19': {
        liveFTHome: 1.75,
        liveFTAway: 2.35,
      },
      '20': {
        liveFTHome: 1.74,
        liveFTAway: 2.37,
      },
      '21': {
        liveFTHome: 1.73,
        liveFTAway: 2.39,
      },
      '22': {
        liveFTHome: 1.72,
        liveFTAway: 2.41,
      },
      '23': {
        liveFTHome: 1.71,
        liveFTAway: 2.44,
      },
      '24': {
        liveFTHome: 1.69,
        liveFTAway: 2.47,
      },
      '25': {
        liveFTHome: 1.69,
        liveFTAway: 2.48,
      },
      '26': {
        liveFTHome: 1.67,
        liveFTAway: 2.52,
      },
      '27': {
        liveFTHome: 1.66,
        liveFTAway: 2.54,
      },
      '28': {
        liveFTHome: 1.65,
        liveFTAway: 2.57,
      },
      '29': {
        liveFTHome: 1.64,
        liveFTAway: 2.57,
      },
      '30': {
        liveFTHome: 1.63,
        liveFTAway: 2.61,
      },
      '31': {
        liveFTHome: 1.63,
        liveFTAway: 2.6,
      },
      '32': {
        liveFTHome: 1.61,
        liveFTAway: 2.67,
      },
      '33': {
        liveFTHome: 1.6,
        liveFTAway: 2.69,
      },
      '34': {
        liveFTHome: 1.59,
        liveFTAway: 2.71,
      },
      '35': {
        liveFTHome: 1.58,
        liveFTAway: 2.75,
      },
      '36': {
        liveFTHome: 1.57,
        liveFTAway: 2.77,
      },
      '37': {
        liveFTHome: 1.56,
        liveFTAway: 2.8,
      },
      '38': {
        liveFTHome: 1.56,
        liveFTAway: 2.81,
      },
      '39': {
        liveFTHome: 1.55,
        liveFTAway: 2.84,
      },
      '40': {
        liveFTHome: 1.55,
        liveFTAway: 2.86,
      },
      '41': {
        liveFTHome: 1.54,
        liveFTAway: 2.9,
      },
      '42': {
        liveFTHome: 1.53,
        liveFTAway: 2.9,
      },
      '43': {
        liveFTHome: 1.51,
        liveFTAway: 2.97,
      },
      '44': {
        liveFTHome: 1.51,
        liveFTAway: 2.98,
      },
      '45': {
        liveFTHome: 1.51,
        liveFTAway: 3.01,
      },
      '46': {
        liveFTHome: 1.49,
        liveFTAway: 3.06,
      },
      '47': {
        liveFTHome: 1.48,
        liveFTAway: 3.11,
      },
      '48': {
        liveFTHome: 1.49,
        liveFTAway: 3.09,
      },
      '49': {
        liveFTHome: 1.47,
        liveFTAway: 3.14,
      },
      '50': {
        liveFTHome: 1.45,
        liveFTAway: 3.25,
      },
      '51': {
        liveFTHome: 1.46,
        liveFTAway: 3.2,
      },
      '52': {
        liveFTHome: 1.45,
        liveFTAway: 3.26,
      },
      '53': {
        liveFTHome: 1.44,
        liveFTAway: 3.29,
      },
      '54': {
        liveFTHome: 1.44,
        liveFTAway: 3.29,
      },
      '55': {
        liveFTHome: 1.44,
        liveFTAway: 3.32,
      },
      '56': {
        liveFTHome: 1.41,
        liveFTAway: 3.46,
      },
      '57': {
        liveFTHome: 1.41,
        liveFTAway: 3.46,
      },
      '58': {
        liveFTHome: 1.4,
        liveFTAway: 3.52,
      },
      '59': {
        liveFTHome: 1.4,
        liveFTAway: 3.52,
      },
      '60': {
        liveFTHome: 1.39,
        liveFTAway: 3.6,
      },
      '61': {
        liveFTHome: 1.38,
        liveFTAway: 3.65,
      },
      '62': {
        liveFTHome: 1.39,
        liveFTAway: 3.61,
      },
      '63': {
        liveFTHome: 1.37,
        liveFTAway: 3.75,
      },
      '64': {
        liveFTHome: 1.38,
        liveFTAway: 3.67,
      },
      '65': {
        liveFTHome: 1.36,
        liveFTAway: 3.83,
      },
      '66': {
        liveFTHome: 1.35,
        liveFTAway: 3.89,
      },
      '67': {
        liveFTHome: 1.35,
        liveFTAway: 3.9,
      },
      '68': {
        liveFTHome: 1.34,
        liveFTAway: 3.98,
      },
      '69': {
        liveFTHome: 1.35,
        liveFTAway: 3.94,
      },
      '70': {
        liveFTHome: 1.34,
        liveFTAway: 4,
      },
      '71': {
        liveFTHome: 1.34,
        liveFTAway: 4.02,
      },
      '72': {
        liveFTHome: 1.32,
        liveFTAway: 4.13,
      },
      '73': {
        liveFTHome: 1.32,
        liveFTAway: 4.17,
      },
      '74': {
        liveFTHome: 1.32,
        liveFTAway: 4.22,
      },
      '75': {
        liveFTHome: 1.32,
        liveFTAway: 4.23,
      },
      '76': {
        liveFTHome: 1.3,
        liveFTAway: 4.39,
      },
      '77': {
        liveFTHome: 1.3,
        liveFTAway: 4.43,
      },
      '78': {
        liveFTHome: 1.29,
        liveFTAway: 4.47,
      },
      '79': {
        liveFTHome: 1.29,
        liveFTAway: 4.52,
      },
      '80': {
        liveFTHome: 1.29,
        liveFTAway: 4.53,
      },
      '81': {
        liveFTHome: 1.29,
        liveFTAway: 4.56,
      },
      '82': {
        liveFTHome: 1.28,
        liveFTAway: 4.64,
      },
      '83': {
        liveFTHome: 1.27,
        liveFTAway: 4.76,
      },
      '84': {
        liveFTHome: 1.27,
        liveFTAway: 4.82,
      },
      '85': {
        liveFTHome: 1.27,
        liveFTAway: 4.75,
      },
      '86': {
        liveFTHome: 1.26,
        liveFTAway: 4.96,
      },
      '87': {
        liveFTHome: 1.25,
        liveFTAway: 4.99,
      },
      '88': {
        liveFTHome: 1.25,
        liveFTAway: 5.06,
      },
      '89': {
        liveFTHome: 1.25,
        liveFTAway: 5.12,
      },
      '90': {
        liveFTHome: 1.24,
        liveFTAway: 5.23,
      },
      '91': {
        liveFTHome: 1.24,
        liveFTAway: 5.23,
      },
      '92': {
        liveFTHome: 1.23,
        liveFTAway: 5.35,
      },
      '93': {
        liveFTHome: 1.23,
        liveFTAway: 5.37,
      },
      '94': {
        liveFTHome: 1.22,
        liveFTAway: 5.64,
      },
      '95': {
        liveFTHome: 1.22,
        liveFTAway: 5.63,
      },
      '96': {
        liveFTHome: 1.23,
        liveFTAway: 5.5,
      },
      '97': {
        liveFTHome: 1.21,
        liveFTAway: 5.73,
      },
      '98': {
        liveFTHome: 1.21,
        liveFTAway: 5.89,
      },
      '99': {
        liveFTHome: 1.21,
        liveFTAway: 5.87,
      },
      '100': {
        liveFTHome: 1.2,
        liveFTAway: 6.13,
      },
      '101': {
        liveFTHome: 1.2,
        liveFTAway: 6.12,
      },
      '102': {
        liveFTHome: 1.2,
        liveFTAway: 6.2,
      },
      '103': {
        liveFTHome: 1.18,
        liveFTAway: 6.52,
      },
      '104': {
        liveFTHome: 1.19,
        liveFTAway: 6.25,
      },
      '105': {
        liveFTHome: 1.19,
        liveFTAway: 6.44,
      },
      '106': {
        liveFTHome: 1.18,
        liveFTAway: 6.61,
      },
      '107': {
        liveFTHome: 1.18,
        liveFTAway: 6.81,
      },
      '108': {
        liveFTHome: 1.18,
        liveFTAway: 6.83,
      },
      '109': {
        liveFTHome: 1.17,
        liveFTAway: 6.84,
      },
      '110': {
        liveFTHome: 1.17,
        liveFTAway: 7.04,
      },
      '111': {
        liveFTHome: 1.16,
        liveFTAway: 7.35,
      },
      '112': {
        liveFTHome: 1.17,
        liveFTAway: 7.17,
      },
      '113': {
        liveFTHome: 1.15,
        liveFTAway: 7.65,
      },
      '114': {
        liveFTHome: 1.16,
        liveFTAway: 7.35,
      },
      '115': {
        liveFTHome: 1.15,
        liveFTAway: 7.6,
      },
      '116': {
        liveFTHome: 1.15,
        liveFTAway: 7.66,
      },
      '117': {
        liveFTHome: 1.15,
        liveFTAway: 7.88,
      },
      '118': {
        liveFTHome: 1.15,
        liveFTAway: 7.79,
      },
      '119': {
        liveFTHome: 1.14,
        liveFTAway: 8.07,
      },
      '120': {
        liveFTHome: 1.14,
        liveFTAway: 8.33,
      },
      '121': {
        liveFTHome: 1.14,
        liveFTAway: 8.37,
      },
      '122': {
        liveFTHome: 1.14,
        liveFTAway: 8.5,
      },
      '123': {
        liveFTHome: 1.13,
        liveFTAway: 8.74,
      },
      '124': {
        liveFTHome: 1.13,
        liveFTAway: 8.68,
      },
      '125': {
        liveFTHome: 1.13,
        liveFTAway: 8.82,
      },
      '126': {
        liveFTHome: 1.13,
        liveFTAway: 8.94,
      },
      '127': {
        liveFTHome: 1.12,
        liveFTAway: 9.15,
      },
      '128': {
        liveFTHome: 1.13,
        liveFTAway: 9.17,
      },
      '129': {
        liveFTHome: 1.12,
        liveFTAway: 9.59,
      },
      '130': {
        liveFTHome: 1.12,
        liveFTAway: 9.83,
      },
      '131': {
        liveFTHome: 1.11,
        liveFTAway: 10.24,
      },
      '132': {
        liveFTHome: 1.11,
        liveFTAway: 10.09,
      },
      '133': {
        liveFTHome: 1.11,
        liveFTAway: 10.14,
      },
      '134': {
        liveFTHome: 1.11,
        liveFTAway: 10.47,
      },
      '135': {
        liveFTHome: 1.11,
        liveFTAway: 10.32,
      },
      '136': {
        liveFTHome: 1.1,
        liveFTAway: 10.81,
      },
      '137': {
        liveFTHome: 1.1,
        liveFTAway: 10.94,
      },
      '138': {
        liveFTHome: 1.1,
        liveFTAway: 11.57,
      },
      '139': {
        liveFTHome: 1.1,
        liveFTAway: 11.23,
      },
      '140': {
        liveFTHome: 1.1,
        liveFTAway: 11.59,
      },
      '141': {
        liveFTHome: 1.09,
        liveFTAway: 12.14,
      },
      '142': {
        liveFTHome: 1.09,
        liveFTAway: 11.89,
      },
      '143': {
        liveFTHome: 1.08,
        liveFTAway: 13.02,
      },
      '144': {
        liveFTHome: 1.09,
        liveFTAway: 12.68,
      },
      '145': {
        liveFTHome: 1.09,
        liveFTAway: 12.39,
      },
      '146': {
        liveFTHome: 1.08,
        liveFTAway: 13.28,
      },
      '147': {
        liveFTHome: 1.09,
        liveFTAway: 13.11,
      },
      '148': {
        liveFTHome: 1.08,
        liveFTAway: 13.37,
      },
      '149': {
        liveFTHome: 1.08,
        liveFTAway: 13.58,
      },
      '150': {
        liveFTHome: 1.08,
        liveFTAway: 14.33,
      },
    },
    overUnder: {
      '661': {
        liveFTOver: 11.38,
        liveFTUnder: 1.1,
      },
      '662': {
        liveFTOver: 11.62,
        liveFTUnder: 1.09,
      },
      '663': {
        liveFTOver: 11.25,
        liveFTUnder: 1.1,
      },
      '664': {
        liveFTOver: 10.39,
        liveFTUnder: 1.11,
      },
      '665': {
        liveFTOver: 10.86,
        liveFTUnder: 1.1,
      },
      '666': {
        liveFTOver: 10.85,
        liveFTUnder: 1.1,
      },
      '667': {
        liveFTOver: 10.45,
        liveFTUnder: 1.11,
      },
      '668': {
        liveFTOver: 10.21,
        liveFTUnder: 1.11,
      },
      '669': {
        liveFTOver: 10.08,
        liveFTUnder: 1.11,
      },
      '670': {
        liveFTOver: 9.89,
        liveFTUnder: 1.11,
      },
      '671': {
        liveFTOver: 9.76,
        liveFTUnder: 1.11,
      },
      '672': {
        liveFTOver: 9.83,
        liveFTUnder: 1.11,
      },
      '673': {
        liveFTOver: 9.71,
        liveFTUnder: 1.11,
      },
      '674': {
        liveFTOver: 9.09,
        liveFTUnder: 1.12,
      },
      '675': {
        liveFTOver: 9.4,
        liveFTUnder: 1.12,
      },
      '676': {
        liveFTOver: 9.21,
        liveFTUnder: 1.12,
      },
      '677': {
        liveFTOver: 9.1,
        liveFTUnder: 1.12,
      },
      '678': {
        liveFTOver: 8.96,
        liveFTUnder: 1.13,
      },
      '679': {
        liveFTOver: 8.57,
        liveFTUnder: 1.13,
      },
      '680': {
        liveFTOver: 8.93,
        liveFTUnder: 1.13,
      },
      '681': {
        liveFTOver: 8.67,
        liveFTUnder: 1.13,
      },
      '682': {
        liveFTOver: 8.54,
        liveFTUnder: 1.13,
      },
      '683': {
        liveFTOver: 8.24,
        liveFTUnder: 1.14,
      },
      '684': {
        liveFTOver: 8.13,
        liveFTUnder: 1.14,
      },
      '685': {
        liveFTOver: 7.79,
        liveFTUnder: 1.15,
      },
      '686': {
        liveFTOver: 7.86,
        liveFTUnder: 1.15,
      },
      '687': {
        liveFTOver: 7.64,
        liveFTUnder: 1.15,
      },
      '688': {
        liveFTOver: 7.98,
        liveFTUnder: 1.14,
      },
      '689': {
        liveFTOver: 7.53,
        liveFTUnder: 1.15,
      },
      '690': {
        liveFTOver: 7.44,
        liveFTUnder: 1.16,
      },
      '691': {
        liveFTOver: 7.3,
        liveFTUnder: 1.16,
      },
      '692': {
        liveFTOver: 7.1,
        liveFTUnder: 1.16,
      },
      '693': {
        liveFTOver: 7.15,
        liveFTUnder: 1.16,
      },
      '694': {
        liveFTOver: 7.02,
        liveFTUnder: 1.17,
      },
      '695': {
        liveFTOver: 6.94,
        liveFTUnder: 1.17,
      },
      '696': {
        liveFTOver: 7.02,
        liveFTUnder: 1.17,
      },
      '697': {
        liveFTOver: 6.89,
        liveFTUnder: 1.17,
      },
      '698': {
        liveFTOver: 6.78,
        liveFTUnder: 1.17,
      },
      '699': {
        liveFTOver: 6.61,
        liveFTUnder: 1.18,
      },
      '700': {
        liveFTOver: 6.68,
        liveFTUnder: 1.18,
      },
      '701': {
        liveFTOver: 6.53,
        liveFTUnder: 1.18,
      },
      '702': {
        liveFTOver: 6.44,
        liveFTUnder: 1.18,
      },
      '703': {
        liveFTOver: 6.36,
        liveFTUnder: 1.19,
      },
      '704': {
        liveFTOver: 6.26,
        liveFTUnder: 1.19,
      },
      '705': {
        liveFTOver: 6.11,
        liveFTUnder: 1.2,
      },
      '706': {
        liveFTOver: 5.99,
        liveFTUnder: 1.2,
      },
      '707': {
        liveFTOver: 6.01,
        liveFTUnder: 1.2,
      },
      '708': {
        liveFTOver: 6.19,
        liveFTUnder: 1.19,
      },
      '709': {
        liveFTOver: 5.92,
        liveFTUnder: 1.2,
      },
      '710': {
        liveFTOver: 5.86,
        liveFTUnder: 1.21,
      },
      '711': {
        liveFTOver: 5.68,
        liveFTUnder: 1.21,
      },
      '712': {
        liveFTOver: 5.85,
        liveFTUnder: 1.21,
      },
      '713': {
        liveFTOver: 5.79,
        liveFTUnder: 1.21,
      },
      '714': {
        liveFTOver: 5.52,
        liveFTUnder: 1.22,
      },
      '715': {
        liveFTOver: 5.66,
        liveFTUnder: 1.21,
      },
      '716': {
        liveFTOver: 5.44,
        liveFTUnder: 1.22,
      },
      '717': {
        liveFTOver: 5.46,
        liveFTUnder: 1.22,
      },
      '718': {
        liveFTOver: 5.37,
        liveFTUnder: 1.23,
      },
      '719': {
        liveFTOver: 5.2,
        liveFTUnder: 1.24,
      },
      '720': {
        liveFTOver: 5.07,
        liveFTUnder: 1.25,
      },
      '721': {
        liveFTOver: 5.13,
        liveFTUnder: 1.24,
      },
      '722': {
        liveFTOver: 5.2,
        liveFTUnder: 1.24,
      },
      '723': {
        liveFTOver: 4.99,
        liveFTUnder: 1.25,
      },
      '724': {
        liveFTOver: 4.88,
        liveFTUnder: 1.26,
      },
      '725': {
        liveFTOver: 5,
        liveFTUnder: 1.25,
      },
      '726': {
        liveFTOver: 4.91,
        liveFTUnder: 1.26,
      },
      '727': {
        liveFTOver: 4.84,
        liveFTUnder: 1.26,
      },
      '728': {
        liveFTOver: 4.87,
        liveFTUnder: 1.26,
      },
      '729': {
        liveFTOver: 4.66,
        liveFTUnder: 1.27,
      },
      '730': {
        liveFTOver: 4.76,
        liveFTUnder: 1.27,
      },
      '731': {
        liveFTOver: 4.66,
        liveFTUnder: 1.27,
      },
      '732': {
        liveFTOver: 4.54,
        liveFTUnder: 1.28,
      },
      '733': {
        liveFTOver: 4.55,
        liveFTUnder: 1.28,
      },
      '734': {
        liveFTOver: 4.51,
        liveFTUnder: 1.28,
      },
      '735': {
        liveFTOver: 4.45,
        liveFTUnder: 1.29,
      },
      '736': {
        liveFTOver: 4.42,
        liveFTUnder: 1.29,
      },
      '737': {
        liveFTOver: 4.35,
        liveFTUnder: 1.3,
      },
      '738': {
        liveFTOver: 4.35,
        liveFTUnder: 1.3,
      },
      '739': {
        liveFTOver: 4.27,
        liveFTUnder: 1.31,
      },
      '740': {
        liveFTOver: 4.2,
        liveFTUnder: 1.31,
      },
      '741': {
        liveFTOver: 4.25,
        liveFTUnder: 1.31,
      },
      '742': {
        liveFTOver: 4.07,
        liveFTUnder: 1.33,
      },
      '743': {
        liveFTOver: 4.1,
        liveFTUnder: 1.32,
      },
      '744': {
        liveFTOver: 4.03,
        liveFTUnder: 1.33,
      },
      '745': {
        liveFTOver: 4.02,
        liveFTUnder: 1.33,
      },
      '746': {
        liveFTOver: 3.94,
        liveFTUnder: 1.34,
      },
      '747': {
        liveFTOver: 3.9,
        liveFTUnder: 1.35,
      },
      '748': {
        liveFTOver: 3.95,
        liveFTUnder: 1.34,
      },
      '749': {
        liveFTOver: 3.87,
        liveFTUnder: 1.35,
      },
      '750': {
        liveFTOver: 3.75,
        liveFTUnder: 1.36,
      },
      '751': {
        liveFTOver: 3.72,
        liveFTUnder: 1.37,
      },
      '752': {
        liveFTOver: 3.69,
        liveFTUnder: 1.37,
      },
      '753': {
        liveFTOver: 3.72,
        liveFTUnder: 1.37,
      },
      '754': {
        liveFTOver: 3.64,
        liveFTUnder: 1.38,
      },
      '755': {
        liveFTOver: 3.61,
        liveFTUnder: 1.38,
      },
      '756': {
        liveFTOver: 3.58,
        liveFTUnder: 1.39,
      },
      '757': {
        liveFTOver: 3.54,
        liveFTUnder: 1.39,
      },
      '758': {
        liveFTOver: 3.52,
        liveFTUnder: 1.4,
      },
      '759': {
        liveFTOver: 3.47,
        liveFTUnder: 1.4,
      },
      '760': {
        liveFTOver: 3.46,
        liveFTUnder: 1.41,
      },
      '761': {
        liveFTOver: 3.43,
        liveFTUnder: 1.41,
      },
      '762': {
        liveFTOver: 3.44,
        liveFTUnder: 1.41,
      },
      '763': {
        liveFTOver: 3.38,
        liveFTUnder: 1.42,
      },
      '764': {
        liveFTOver: 3.37,
        liveFTUnder: 1.42,
      },
      '765': {
        liveFTOver: 3.26,
        liveFTUnder: 1.44,
      },
      '766': {
        liveFTOver: 3.23,
        liveFTUnder: 1.45,
      },
      '767': {
        liveFTOver: 3.23,
        liveFTUnder: 1.45,
      },
      '768': {
        liveFTOver: 3.22,
        liveFTUnder: 1.45,
      },
      '769': {
        liveFTOver: 3.22,
        liveFTUnder: 1.45,
      },
      '770': {
        liveFTOver: 3.17,
        liveFTUnder: 1.46,
      },
      '771': {
        liveFTOver: 3.1,
        liveFTUnder: 1.48,
      },
      '772': {
        liveFTOver: 3.13,
        liveFTUnder: 1.47,
      },
      '773': {
        liveFTOver: 3.08,
        liveFTUnder: 1.48,
      },
      '774': {
        liveFTOver: 3.06,
        liveFTUnder: 1.49,
      },
      '775': {
        liveFTOver: 3.02,
        liveFTUnder: 1.5,
      },
      '776': {
        liveFTOver: 3,
        liveFTUnder: 1.5,
      },
      '777': {
        liveFTOver: 2.94,
        liveFTUnder: 1.52,
      },
      '778': {
        liveFTOver: 2.97,
        liveFTUnder: 1.51,
      },
      '779': {
        liveFTOver: 2.94,
        liveFTUnder: 1.51,
      },
      '780': {
        liveFTOver: 2.91,
        liveFTUnder: 1.52,
      },
      '781': {
        liveFTOver: 2.87,
        liveFTUnder: 1.53,
      },
      '782': {
        liveFTOver: 2.85,
        liveFTUnder: 1.54,
      },
      '783': {
        liveFTOver: 2.82,
        liveFTUnder: 1.55,
      },
      '784': {
        liveFTOver: 2.82,
        liveFTUnder: 1.55,
      },
      '785': {
        liveFTOver: 2.77,
        liveFTUnder: 1.56,
      },
      '786': {
        liveFTOver: 2.76,
        liveFTUnder: 1.57,
      },
      '787': {
        liveFTOver: 2.75,
        liveFTUnder: 1.57,
      },
      '788': {
        liveFTOver: 2.7,
        liveFTUnder: 1.59,
      },
      '789': {
        liveFTOver: 2.71,
        liveFTUnder: 1.58,
      },
      '790': {
        liveFTOver: 2.65,
        liveFTUnder: 1.61,
      },
      '791': {
        liveFTOver: 2.65,
        liveFTUnder: 1.61,
      },
      '792': {
        liveFTOver: 2.62,
        liveFTUnder: 1.62,
      },
      '793': {
        liveFTOver: 2.64,
        liveFTUnder: 1.61,
      },
      '794': {
        liveFTOver: 2.58,
        liveFTUnder: 1.63,
      },
      '795': {
        liveFTOver: 2.58,
        liveFTUnder: 1.63,
      },
      '796': {
        liveFTOver: 2.56,
        liveFTUnder: 1.64,
      },
      '797': {
        liveFTOver: 2.5,
        liveFTUnder: 1.67,
      },
      '798': {
        liveFTOver: 2.51,
        liveFTUnder: 1.66,
      },
      '799': {
        liveFTOver: 2.5,
        liveFTUnder: 1.67,
      },
      '800': {
        liveFTOver: 2.47,
        liveFTUnder: 1.68,
      },
      '801': {
        liveFTOver: 2.45,
        liveFTUnder: 1.69,
      },
      '802': {
        liveFTOver: 2.45,
        liveFTUnder: 1.69,
      },
      '803': {
        liveFTOver: 2.41,
        liveFTUnder: 1.71,
      },
      '804': {
        liveFTOver: 2.38,
        liveFTUnder: 1.72,
      },
      '805': {
        liveFTOver: 2.38,
        liveFTUnder: 1.73,
      },
      '806': {
        liveFTOver: 2.35,
        liveFTUnder: 1.74,
      },
      '807': {
        liveFTOver: 2.35,
        liveFTUnder: 1.74,
      },
      '808': {
        liveFTOver: 2.32,
        liveFTUnder: 1.76,
      },
      '809': {
        liveFTOver: 2.32,
        liveFTUnder: 1.76,
      },
      '810': {
        liveFTOver: 2.31,
        liveFTUnder: 1.76,
      },
      '811': {
        liveFTOver: 2.28,
        liveFTUnder: 1.78,
      },
      '812': {
        liveFTOver: 2.28,
        liveFTUnder: 1.78,
      },
      '813': {
        liveFTOver: 2.25,
        liveFTUnder: 1.8,
      },
      '814': {
        liveFTOver: 2.25,
        liveFTUnder: 1.8,
      },
      '815': {
        liveFTOver: 2.21,
        liveFTUnder: 1.83,
      },
      '816': {
        liveFTOver: 2.21,
        liveFTUnder: 1.83,
      },
      '817': {
        liveFTOver: 2.2,
        liveFTUnder: 1.83,
      },
      '818': {
        liveFTOver: 2.19,
        liveFTUnder: 1.84,
      },
      '819': {
        liveFTOver: 2.15,
        liveFTUnder: 1.87,
      },
      '820': {
        liveFTOver: 2.15,
        liveFTUnder: 1.87,
      },
      '821': {
        liveFTOver: 2.12,
        liveFTUnder: 1.89,
      },
      '822': {
        liveFTOver: 2.11,
        liveFTUnder: 1.9,
      },
      '823': {
        liveFTOver: 2.11,
        liveFTUnder: 1.9,
      },
      '824': {
        liveFTOver: 2.1,
        liveFTUnder: 1.91,
      },
      '825': {
        liveFTOver: 2.07,
        liveFTUnder: 1.93,
      },
      '826': {
        liveFTOver: 2.04,
        liveFTUnder: 1.96,
      },
      '827': {
        liveFTOver: 2.07,
        liveFTUnder: 1.93,
      },
      '828': {
        liveFTOver: 2.04,
        liveFTUnder: 1.97,
      },
      '829': {
        liveFTOver: 2.03,
        liveFTUnder: 1.97,
      },
      '830': {
        liveFTOver: 2.02,
        liveFTUnder: 1.98,
      },
      '831': {
        liveFTOver: 2.01,
        liveFTUnder: 1.99,
      },
      '832': {
        liveFTOver: 1.99,
        liveFTUnder: 2.01,
      },
      '833': {
        liveFTOver: 1.98,
        liveFTUnder: 2.02,
      },
      '834': {
        liveFTOver: 1.95,
        liveFTUnder: 2.05,
      },
      '835': {
        liveFTOver: 1.96,
        liveFTUnder: 2.05,
      },
      '836': {
        liveFTOver: 1.93,
        liveFTUnder: 2.08,
      },
      '837': {
        liveFTOver: 1.91,
        liveFTUnder: 2.09,
      },
      '838': {
        liveFTOver: 1.92,
        liveFTUnder: 2.09,
      },
      '839': {
        liveFTOver: 1.9,
        liveFTUnder: 2.11,
      },
      '840': {
        liveFTOver: 1.89,
        liveFTUnder: 2.12,
      },
      '841': {
        liveFTOver: 1.86,
        liveFTUnder: 2.16,
      },
      '842': {
        liveFTOver: 1.87,
        liveFTUnder: 2.15,
      },
      '843': {
        liveFTOver: 1.85,
        liveFTUnder: 2.18,
      },
      '844': {
        liveFTOver: 1.86,
        liveFTUnder: 2.16,
      },
      '845': {
        liveFTOver: 1.83,
        liveFTUnder: 2.2,
      },
      '846': {
        liveFTOver: 1.84,
        liveFTUnder: 2.19,
      },
      '847': {
        liveFTOver: 1.83,
        liveFTUnder: 2.21,
      },
      '848': {
        liveFTOver: 1.8,
        liveFTUnder: 2.26,
      },
      '849': {
        liveFTOver: 1.8,
        liveFTUnder: 2.25,
      },
      '850': {
        liveFTOver: 1.79,
        liveFTUnder: 2.26,
      },
      '851': {
        liveFTOver: 1.77,
        liveFTUnder: 2.29,
      },
      '852': {
        liveFTOver: 1.77,
        liveFTUnder: 2.3,
      },
      '853': {
        liveFTOver: 1.75,
        liveFTUnder: 2.33,
      },
      '854': {
        liveFTOver: 1.75,
        liveFTUnder: 2.33,
      },
      '855': {
        liveFTOver: 1.74,
        liveFTUnder: 2.34,
      },
      '856': {
        liveFTOver: 1.73,
        liveFTUnder: 2.36,
      },
      '857': {
        liveFTOver: 1.72,
        liveFTUnder: 2.39,
      },
      '858': {
        liveFTOver: 1.71,
        liveFTUnder: 2.42,
      },
      '859': {
        liveFTOver: 1.7,
        liveFTUnder: 2.42,
      },
      '860': {
        liveFTOver: 1.69,
        liveFTUnder: 2.44,
      },
      '861': {
        liveFTOver: 1.69,
        liveFTUnder: 2.46,
      },
      '862': {
        liveFTOver: 1.68,
        liveFTUnder: 2.47,
      },
      '863': {
        liveFTOver: 1.66,
        liveFTUnder: 2.52,
      },
      '864': {
        liveFTOver: 1.67,
        liveFTUnder: 2.5,
      },
      '865': {
        liveFTOver: 1.64,
        liveFTUnder: 2.56,
      },
      '866': {
        liveFTOver: 1.65,
        liveFTUnder: 2.53,
      },
      '867': {
        liveFTOver: 1.64,
        liveFTUnder: 2.57,
      },
      '868': {
        liveFTOver: 1.62,
        liveFTUnder: 2.62,
      },
      '869': {
        liveFTOver: 1.62,
        liveFTUnder: 2.6,
      },
      '870': {
        liveFTOver: 1.61,
        liveFTUnder: 2.63,
      },
      '871': {
        liveFTOver: 1.62,
        liveFTUnder: 2.62,
      },
      '872': {
        liveFTOver: 1.59,
        liveFTUnder: 2.68,
      },
      '873': {
        liveFTOver: 1.59,
        liveFTUnder: 2.71,
      },
      '874': {
        liveFTOver: 1.58,
        liveFTUnder: 2.71,
      },
      '875': {
        liveFTOver: 1.58,
        liveFTUnder: 2.72,
      },
      '876': {
        liveFTOver: 1.57,
        liveFTUnder: 2.75,
      },
      '877': {
        liveFTOver: 1.54,
        liveFTUnder: 2.84,
      },
      '878': {
        liveFTOver: 1.55,
        liveFTUnder: 2.83,
      },
      '879': {
        liveFTOver: 1.55,
        liveFTUnder: 2.82,
      },
      '880': {
        liveFTOver: 1.55,
        liveFTUnder: 2.83,
      },
      '881': {
        liveFTOver: 1.54,
        liveFTUnder: 2.87,
      },
      '882': {
        liveFTOver: 1.53,
        liveFTUnder: 2.88,
      },
      '883': {
        liveFTOver: 1.52,
        liveFTUnder: 2.94,
      },
      '884': {
        liveFTOver: 1.51,
        liveFTUnder: 2.94,
      },
      '885': {
        liveFTOver: 1.5,
        liveFTUnder: 3.01,
      },
      '886': {
        liveFTOver: 1.49,
        liveFTUnder: 3.05,
      },
      '887': {
        liveFTOver: 1.49,
        liveFTUnder: 3.04,
      },
      '888': {
        liveFTOver: 1.5,
        liveFTUnder: 3,
      },
      '889': {
        liveFTOver: 1.48,
        liveFTUnder: 3.1,
      },
      '890': {
        liveFTOver: 1.47,
        liveFTUnder: 3.15,
      },
      '891': {
        liveFTOver: 1.47,
        liveFTUnder: 3.12,
      },
      '892': {
        liveFTOver: 1.46,
        liveFTUnder: 3.16,
      },
      '893': {
        liveFTOver: 1.45,
        liveFTUnder: 3.22,
      },
      '894': {
        liveFTOver: 1.46,
        liveFTUnder: 3.2,
      },
      '895': {
        liveFTOver: 1.45,
        liveFTUnder: 3.24,
      },
      '896': {
        liveFTOver: 1.44,
        liveFTUnder: 3.29,
      },
      '897': {
        liveFTOver: 1.43,
        liveFTUnder: 3.33,
      },
      '898': {
        liveFTOver: 1.43,
        liveFTUnder: 3.34,
      },
      '899': {
        liveFTOver: 1.43,
        liveFTUnder: 3.33,
      },
      '900': {
        liveFTOver: 1.42,
        liveFTUnder: 3.41,
      },
      '901': {
        liveFTOver: 1.41,
        liveFTUnder: 3.43,
      },
      '902': {
        liveFTOver: 1.41,
        liveFTUnder: 3.47,
      },
      '903': {
        liveFTOver: 1.4,
        liveFTUnder: 3.51,
      },
      '904': {
        liveFTOver: 1.4,
        liveFTUnder: 3.51,
      },
      '905': {
        liveFTOver: 1.39,
        liveFTUnder: 3.56,
      },
      '906': {
        liveFTOver: 1.38,
        liveFTUnder: 3.62,
      },
      '907': {
        liveFTOver: 1.37,
        liveFTUnder: 3.69,
      },
      '908': {
        liveFTOver: 1.38,
        liveFTUnder: 3.65,
      },
      '909': {
        liveFTOver: 1.37,
        liveFTUnder: 3.69,
      },
      '910': {
        liveFTOver: 1.37,
        liveFTUnder: 3.7,
      },
      '911': {
        liveFTOver: 1.35,
        liveFTUnder: 3.84,
      },
      '912': {
        liveFTOver: 1.35,
        liveFTUnder: 3.88,
      },
      '913': {
        liveFTOver: 1.36,
        liveFTUnder: 3.8,
      },
      '914': {
        liveFTOver: 1.33,
        liveFTUnder: 3.99,
      },
      '915': {
        liveFTOver: 1.34,
        liveFTUnder: 3.94,
      },
      '916': {
        liveFTOver: 1.33,
        liveFTUnder: 3.99,
      },
      '917': {
        liveFTOver: 1.33,
        liveFTUnder: 4.03,
      },
      '918': {
        liveFTOver: 1.33,
        liveFTUnder: 4.05,
      },
      '919': {
        liveFTOver: 1.32,
        liveFTUnder: 4.11,
      },
      '920': {
        liveFTOver: 1.31,
        liveFTUnder: 4.25,
      },
      '921': {
        liveFTOver: 1.31,
        liveFTUnder: 4.21,
      },
      '922': {
        liveFTOver: 1.3,
        liveFTUnder: 4.33,
      },
      '923': {
        liveFTOver: 1.31,
        liveFTUnder: 4.26,
      },
      '924': {
        liveFTOver: 1.29,
        liveFTUnder: 4.47,
      },
      '925': {
        liveFTOver: 1.3,
        liveFTUnder: 4.29,
      },
      '926': {
        liveFTOver: 1.28,
        liveFTUnder: 4.52,
      },
      '927': {
        liveFTOver: 1.29,
        liveFTUnder: 4.39,
      },
      '928': {
        liveFTOver: 1.28,
        liveFTUnder: 4.55,
      },
      '929': {
        liveFTOver: 1.28,
        liveFTUnder: 4.62,
      },
      '930': {
        liveFTOver: 1.27,
        liveFTUnder: 4.65,
      },
      '931': {
        liveFTOver: 1.27,
        liveFTUnder: 4.72,
      },
      '932': {
        liveFTOver: 1.27,
        liveFTUnder: 4.71,
      },
      '933': {
        liveFTOver: 1.26,
        liveFTUnder: 4.81,
      },
      '934': {
        liveFTOver: 1.25,
        liveFTUnder: 4.97,
      },
      '935': {
        liveFTOver: 1.26,
        liveFTUnder: 4.79,
      },
      '936': {
        liveFTOver: 1.26,
        liveFTUnder: 4.89,
      },
      '937': {
        liveFTOver: 1.25,
        liveFTUnder: 4.93,
      },
      '938': {
        liveFTOver: 1.25,
        liveFTUnder: 5.07,
      },
      '939': {
        liveFTOver: 1.25,
        liveFTUnder: 5.03,
      },
      '940': {
        liveFTOver: 1.24,
        liveFTUnder: 5.12,
      },
      '941': {
        liveFTOver: 1.24,
        liveFTUnder: 5.14,
      },
      '942': {
        liveFTOver: 1.24,
        liveFTUnder: 5.24,
      },
      '943': {
        liveFTOver: 1.23,
        liveFTUnder: 5.3,
      },
      '944': {
        liveFTOver: 1.23,
        liveFTUnder: 5.31,
      },
      '945': {
        liveFTOver: 1.23,
        liveFTUnder: 5.35,
      },
      '946': {
        liveFTOver: 1.22,
        liveFTUnder: 5.47,
      },
      '947': {
        liveFTOver: 1.22,
        liveFTUnder: 5.63,
      },
      '948': {
        liveFTOver: 1.21,
        liveFTUnder: 5.77,
      },
      '949': {
        liveFTOver: 1.21,
        liveFTUnder: 5.77,
      },
      '950': {
        liveFTOver: 1.22,
        liveFTUnder: 5.58,
      },
      '951': {
        liveFTOver: 1.21,
        liveFTUnder: 5.85,
      },
      '952': {
        liveFTOver: 1.2,
        liveFTUnder: 6.06,
      },
      '953': {
        liveFTOver: 1.2,
        liveFTUnder: 6.05,
      },
      '954': {
        liveFTOver: 1.2,
        liveFTUnder: 6.12,
      },
      '955': {
        liveFTOver: 1.19,
        liveFTUnder: 6.22,
      },
      '956': {
        liveFTOver: 1.19,
        liveFTUnder: 6.31,
      },
      '957': {
        liveFTOver: 1.2,
        liveFTUnder: 6.11,
      },
      '958': {
        liveFTOver: 1.19,
        liveFTUnder: 6.35,
      },
      '959': {
        liveFTOver: 1.18,
        liveFTUnder: 6.54,
      },
      '960': {
        liveFTOver: 1.19,
        liveFTUnder: 6.32,
      },
      '961': {
        liveFTOver: 1.17,
        liveFTUnder: 6.79,
      },
      '962': {
        liveFTOver: 1.18,
        liveFTUnder: 6.7,
      },
      '963': {
        liveFTOver: 1.17,
        liveFTUnder: 7.04,
      },
      '964': {
        liveFTOver: 1.17,
        liveFTUnder: 6.87,
      },
      '965': {
        liveFTOver: 1.17,
        liveFTUnder: 6.92,
      },
      '966': {
        liveFTOver: 1.17,
        liveFTUnder: 7.05,
      },
      '967': {
        liveFTOver: 1.16,
        liveFTUnder: 7.27,
      },
      '968': {
        liveFTOver: 1.16,
        liveFTUnder: 7.29,
      },
      '969': {
        liveFTOver: 1.16,
        liveFTUnder: 7.37,
      },
      '970': {
        liveFTOver: 1.15,
        liveFTUnder: 7.57,
      },
      '971': {
        liveFTOver: 1.15,
        liveFTUnder: 7.82,
      },
      '972': {
        liveFTOver: 1.14,
        liveFTUnder: 8.02,
      },
      '973': {
        liveFTOver: 1.14,
        liveFTUnder: 8.05,
      },
      '974': {
        liveFTOver: 1.15,
        liveFTUnder: 7.75,
      },
      '975': {
        liveFTOver: 1.15,
        liveFTUnder: 7.83,
      },
      '976': {
        liveFTOver: 1.13,
        liveFTUnder: 8.66,
      },
      '977': {
        liveFTOver: 1.14,
        liveFTUnder: 8.38,
      },
      '978': {
        liveFTOver: 1.13,
        liveFTUnder: 8.48,
      },
      '979': {
        liveFTOver: 1.12,
        liveFTUnder: 9.05,
      },
      '980': {
        liveFTOver: 1.13,
        liveFTUnder: 8.88,
      },
      '981': {
        liveFTOver: 1.13,
        liveFTUnder: 8.6,
      },
      '982': {
        liveFTOver: 1.13,
        liveFTUnder: 8.84,
      },
      '983': {
        liveFTOver: 1.13,
        liveFTUnder: 8.53,
      },
      '984': {
        liveFTOver: 1.13,
        liveFTUnder: 8.8,
      },
      '985': {
        liveFTOver: 1.11,
        liveFTUnder: 9.72,
      },
      '986': {
        liveFTOver: 1.12,
        liveFTUnder: 9.51,
      },
      '987': {
        liveFTOver: 1.12,
        liveFTUnder: 9.5,
      },
      '988': {
        liveFTOver: 1.12,
        liveFTUnder: 9.13,
      },
      '989': {
        liveFTOver: 1.12,
        liveFTUnder: 9.19,
      },
      '990': {
        liveFTOver: 1.11,
        liveFTUnder: 9.83,
      },
      '991': {
        liveFTOver: 1.11,
        liveFTUnder: 9.71,
      },
      '992': {
        liveFTOver: 1.11,
        liveFTUnder: 10.44,
      },
      '993': {
        liveFTOver: 1.1,
        liveFTUnder: 10.71,
      },
      '994': {
        liveFTOver: 1.11,
        liveFTUnder: 10.15,
      },
      '995': {
        liveFTOver: 1.1,
        liveFTUnder: 11.43,
      },
      '996': {
        liveFTOver: 1.11,
        liveFTUnder: 10.44,
      },
      '997': {
        liveFTOver: 1.1,
        liveFTUnder: 11.1,
      },
      '998': {
        liveFTOver: 1.1,
        liveFTUnder: 11.29,
      },
      '999': {
        liveFTOver: 1.09,
        liveFTUnder: 11.58,
      },
      '1000': {
        liveFTOver: 1.1,
        liveFTUnder: 11.43,
      },
    },
    adjRate: {
      homeAway: 2,
      overUnder: 1.5,
    },
  }},
  { upsert: true},
);