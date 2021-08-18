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
        liveFTBlue: 11.36,
        liveFTRed: 1.1,
      },
      '-149': {
        liveFTBlue: 11.36,
        liveFTRed: 1.1,
      },
      '-148': {
        liveFTBlue: 11.11,
        liveFTRed: 1.1,
      },
      '-147': {
        liveFTBlue: 11.05,
        liveFTRed: 1.1,
      },
      '-146': {
        liveFTBlue: 10.66,
        liveFTRed: 1.11,
      },
      '-145': {
        liveFTBlue: 10.32,
        liveFTRed: 1.11,
      },
      '-144': {
        liveFTBlue: 10.4,
        liveFTRed: 1.11,
      },
      '-143': {
        liveFTBlue: 10.01,
        liveFTRed: 1.11,
      },
      '-142': {
        liveFTBlue: 9.94,
        liveFTRed: 1.11,
      },
      '-141': {
        liveFTBlue: 9.81,
        liveFTRed: 1.12,
      },
      '-140': {
        liveFTBlue: 9.82,
        liveFTRed: 1.12,
      },
      '-139': {
        liveFTBlue: 9.49,
        liveFTRed: 1.12,
      },
      '-138': {
        liveFTBlue: 9.49,
        liveFTRed: 1.12,
      },
      '-137': {
        liveFTBlue: 9.21,
        liveFTRed: 1.12,
      },
      '-136': {
        liveFTBlue: 9.05,
        liveFTRed: 1.13,
      },
      '-135': {
        liveFTBlue: 8.93,
        liveFTRed: 1.13,
      },
      '-134': {
        liveFTBlue: 8.88,
        liveFTRed: 1.13,
      },
      '-133': {
        liveFTBlue: 8.7,
        liveFTRed: 1.13,
      },
      '-132': {
        liveFTBlue: 8.54,
        liveFTRed: 1.14,
      },
      '-131': {
        liveFTBlue: 8.48,
        liveFTRed: 1.14,
      },
      '-130': {
        liveFTBlue: 8.35,
        liveFTRed: 1.14,
      },
      '-129': {
        liveFTBlue: 8.37,
        liveFTRed: 1.14,
      },
      '-128': {
        liveFTBlue: 8.06,
        liveFTRed: 1.14,
      },
      '-127': {
        liveFTBlue: 7.9,
        liveFTRed: 1.15,
      },
      '-126': {
        liveFTBlue: 7.86,
        liveFTRed: 1.15,
      },
      '-125': {
        liveFTBlue: 7.68,
        liveFTRed: 1.15,
      },
      '-124': {
        liveFTBlue: 7.66,
        liveFTRed: 1.15,
      },
      '-123': {
        liveFTBlue: 7.46,
        liveFTRed: 1.16,
      },
      '-122': {
        liveFTBlue: 7.36,
        liveFTRed: 1.16,
      },
      '-121': {
        liveFTBlue: 7.21,
        liveFTRed: 1.16,
      },
      '-120': {
        liveFTBlue: 7.17,
        liveFTRed: 1.17,
      },
      '-119': {
        liveFTBlue: 7.12,
        liveFTRed: 1.17,
      },
      '-118': {
        liveFTBlue: 6.84,
        liveFTRed: 1.17,
      },
      '-117': {
        liveFTBlue: 6.85,
        liveFTRed: 1.17,
      },
      '-116': {
        liveFTBlue: 6.75,
        liveFTRed: 1.18,
      },
      '-115': {
        liveFTBlue: 6.75,
        liveFTRed: 1.18,
      },
      '-114': {
        liveFTBlue: 6.56,
        liveFTRed: 1.18,
      },
      '-113': {
        liveFTBlue: 6.56,
        liveFTRed: 1.18,
      },
      '-112': {
        liveFTBlue: 6.37,
        liveFTRed: 1.19,
      },
      '-111': {
        liveFTBlue: 6.31,
        liveFTRed: 1.19,
      },
      '-110': {
        liveFTBlue: 6.25,
        liveFTRed: 1.19,
      },
      '-109': {
        liveFTBlue: 6.23,
        liveFTRed: 1.19,
      },
      '-108': {
        liveFTBlue: 6,
        liveFTRed: 1.2,
      },
      '-107': {
        liveFTBlue: 6,
        liveFTRed: 1.2,
      },
      '-106': {
        liveFTBlue: 5.86,
        liveFTRed: 1.21,
      },
      '-105': {
        liveFTBlue: 5.82,
        liveFTRed: 1.21,
      },
      '-104': {
        liveFTBlue: 5.73,
        liveFTRed: 1.22,
      },
      '-103': {
        liveFTBlue: 5.65,
        liveFTRed: 1.22,
      },
      '-102': {
        liveFTBlue: 5.64,
        liveFTRed: 1.22,
      },
      '-101': {
        liveFTBlue: 5.45,
        liveFTRed: 1.23,
      },
      '-100': {
        liveFTBlue: 5.37,
        liveFTRed: 1.23,
      },
      '-99': {
        liveFTBlue: 5.36,
        liveFTRed: 1.23,
      },
      '-98': {
        liveFTBlue: 5.27,
        liveFTRed: 1.24,
      },
      '-97': {
        liveFTBlue: 5.21,
        liveFTRed: 1.24,
      },
      '-96': {
        liveFTBlue: 5.1,
        liveFTRed: 1.25,
      },
      '-95': {
        liveFTBlue: 5.1,
        liveFTRed: 1.25,
      },
      '-94': {
        liveFTBlue: 5.06,
        liveFTRed: 1.25,
      },
      '-93': {
        liveFTBlue: 5,
        liveFTRed: 1.25,
      },
      '-92': {
        liveFTBlue: 4.94,
        liveFTRed: 1.26,
      },
      '-91': {
        liveFTBlue: 4.88,
        liveFTRed: 1.26,
      },
      '-90': {
        liveFTBlue: 4.79,
        liveFTRed: 1.27,
      },
      '-89': {
        liveFTBlue: 4.77,
        liveFTRed: 1.27,
      },
      '-88': {
        liveFTBlue: 4.67,
        liveFTRed: 1.28,
      },
      '-87': {
        liveFTBlue: 4.61,
        liveFTRed: 1.28,
      },
      '-86': {
        liveFTBlue: 4.53,
        liveFTRed: 1.29,
      },
      '-85': {
        liveFTBlue: 4.52,
        liveFTRed: 1.29,
      },
      '-84': {
        liveFTBlue: 4.46,
        liveFTRed: 1.29,
      },
      '-83': {
        liveFTBlue: 4.43,
        liveFTRed: 1.3,
      },
      '-82': {
        liveFTBlue: 4.36,
        liveFTRed: 1.3,
      },
      '-81': {
        liveFTBlue: 4.31,
        liveFTRed: 1.31,
      },
      '-80': {
        liveFTBlue: 4.21,
        liveFTRed: 1.32,
      },
      '-79': {
        liveFTBlue: 4.2,
        liveFTRed: 1.32,
      },
      '-78': {
        liveFTBlue: 4.17,
        liveFTRed: 1.32,
      },
      '-77': {
        liveFTBlue: 4.1,
        liveFTRed: 1.33,
      },
      '-76': {
        liveFTBlue: 4.06,
        liveFTRed: 1.33,
      },
      '-75': {
        liveFTBlue: 4.02,
        liveFTRed: 1.34,
      },
      '-74': {
        liveFTBlue: 3.94,
        liveFTRed: 1.35,
      },
      '-73': {
        liveFTBlue: 3.92,
        liveFTRed: 1.35,
      },
      '-72': {
        liveFTBlue: 3.87,
        liveFTRed: 1.35,
      },
      '-71': {
        liveFTBlue: 3.85,
        liveFTRed: 1.36,
      },
      '-70': {
        liveFTBlue: 3.81,
        liveFTRed: 1.36,
      },
      '-69': {
        liveFTBlue: 3.71,
        liveFTRed: 1.37,
      },
      '-68': {
        liveFTBlue: 3.69,
        liveFTRed: 1.38,
      },
      '-67': {
        liveFTBlue: 3.68,
        liveFTRed: 1.38,
      },
      '-66': {
        liveFTBlue: 3.64,
        liveFTRed: 1.39,
      },
      '-65': {
        liveFTBlue: 3.57,
        liveFTRed: 1.4,
      },
      '-64': {
        liveFTBlue: 3.53,
        liveFTRed: 1.4,
      },
      '-63': {
        liveFTBlue: 3.49,
        liveFTRed: 1.41,
      },
      '-62': {
        liveFTBlue: 3.45,
        liveFTRed: 1.41,
      },
      '-61': {
        liveFTBlue: 3.42,
        liveFTRed: 1.42,
      },
      '-60': {
        liveFTBlue: 3.4,
        liveFTRed: 1.42,
      },
      '-59': {
        liveFTBlue: 3.36,
        liveFTRed: 1.43,
      },
      '-58': {
        liveFTBlue: 3.31,
        liveFTRed: 1.44,
      },
      '-57': {
        liveFTBlue: 3.3,
        liveFTRed: 1.44,
      },
      '-56': {
        liveFTBlue: 3.26,
        liveFTRed: 1.45,
      },
      '-55': {
        liveFTBlue: 3.2,
        liveFTRed: 1.46,
      },
      '-54': {
        liveFTBlue: 3.16,
        liveFTRed: 1.47,
      },
      '-53': {
        liveFTBlue: 3.17,
        liveFTRed: 1.47,
      },
      '-52': {
        liveFTBlue: 3.14,
        liveFTRed: 1.48,
      },
      '-51': {
        liveFTBlue: 3.1,
        liveFTRed: 1.48,
      },
      '-50': {
        liveFTBlue: 3.08,
        liveFTRed: 1.49,
      },
      '-49': {
        liveFTBlue: 3.04,
        liveFTRed: 1.5,
      },
      '-48': {
        liveFTBlue: 3.01,
        liveFTRed: 1.51,
      },
      '-47': {
        liveFTBlue: 2.99,
        liveFTRed: 1.51,
      },
      '-46': {
        liveFTBlue: 2.96,
        liveFTRed: 1.52,
      },
      '-45': {
        liveFTBlue: 2.91,
        liveFTRed: 1.53,
      },
      '-44': {
        liveFTBlue: 2.88,
        liveFTRed: 1.54,
      },
      '-43': {
        liveFTBlue: 2.86,
        liveFTRed: 1.55,
      },
      '-42': {
        liveFTBlue: 2.84,
        liveFTRed: 1.55,
      },
      '-41': {
        liveFTBlue: 2.82,
        liveFTRed: 1.56,
      },
      '-40': {
        liveFTBlue: 2.78,
        liveFTRed: 1.57,
      },
      '-39': {
        liveFTBlue: 2.76,
        liveFTRed: 1.58,
      },
      '-38': {
        liveFTBlue: 2.74,
        liveFTRed: 1.59,
      },
      '-37': {
        liveFTBlue: 2.71,
        liveFTRed: 1.59,
      },
      '-36': {
        liveFTBlue: 2.68,
        liveFTRed: 1.61,
      },
      '-35': {
        liveFTBlue: 2.66,
        liveFTRed: 1.61,
      },
      '-34': {
        liveFTBlue: 2.65,
        liveFTRed: 1.62,
      },
      '-33': {
        liveFTBlue: 2.62,
        liveFTRed: 1.63,
      },
      '-32': {
        liveFTBlue: 2.59,
        liveFTRed: 1.64,
      },
      '-31': {
        liveFTBlue: 2.56,
        liveFTRed: 1.65,
      },
      '-30': {
        liveFTBlue: 2.54,
        liveFTRed: 1.66,
      },
      '-29': {
        liveFTBlue: 2.52,
        liveFTRed: 1.67,
      },
      '-28': {
        liveFTBlue: 2.51,
        liveFTRed: 1.67,
      },
      '-27': {
        liveFTBlue: 2.5,
        liveFTRed: 1.68,
      },
      '-26': {
        liveFTBlue: 2.46,
        liveFTRed: 1.7,
      },
      '-25': {
        liveFTBlue: 2.45,
        liveFTRed: 1.7,
      },
      '-24': {
        liveFTBlue: 2.42,
        liveFTRed: 1.72,
      },
      '-23': {
        liveFTBlue: 2.41,
        liveFTRed: 1.72,
      },
      '-22': {
        liveFTBlue: 2.37,
        liveFTRed: 1.74,
      },
      '-21': {
        liveFTBlue: 2.36,
        liveFTRed: 1.75,
      },
      '-20': {
        liveFTBlue: 2.34,
        liveFTRed: 1.76,
      },
      '-19': {
        liveFTBlue: 2.32,
        liveFTRed: 1.77,
      },
      '-18': {
        liveFTBlue: 2.3,
        liveFTRed: 1.78,
      },
      '-17': {
        liveFTBlue: 2.29,
        liveFTRed: 1.78,
      },
      '-16': {
        liveFTBlue: 2.25,
        liveFTRed: 1.82,
      },
      '-15': {
        liveFTBlue: 2.25,
        liveFTRed: 1.81,
      },
      '-14': {
        liveFTBlue: 2.24,
        liveFTRed: 1.82,
      },
      '-13': {
        liveFTBlue: 2.22,
        liveFTRed: 1.83,
      },
      '-12': {
        liveFTBlue: 2.2,
        liveFTRed: 1.85,
      },
      '-11': {
        liveFTBlue: 2.17,
        liveFTRed: 1.87,
      },
      '-10': {
        liveFTBlue: 2.16,
        liveFTRed: 1.88,
      },
      '-9': {
        liveFTBlue: 2.15,
        liveFTRed: 1.89,
      },
      '-8': {
        liveFTBlue: 2.13,
        liveFTRed: 1.9,
      },
      '-7': {
        liveFTBlue: 2.11,
        liveFTRed: 1.92,
      },
      '-6': {
        liveFTBlue: 2.1,
        liveFTRed: 1.93,
      },
      '-5': {
        liveFTBlue: 2.08,
        liveFTRed: 1.94,
      },
      '-4': {
        liveFTBlue: 2.07,
        liveFTRed: 1.95,
      },
      '-3': {
        liveFTBlue: 2.05,
        liveFTRed: 1.96,
      },
      '-2': {
        liveFTBlue: 2.04,
        liveFTRed: 1.98,
      },
      '-1': {
        liveFTBlue: 2.03,
        liveFTRed: 1.99,
      },
      '0': {
        liveFTBlue: 2.01,
        liveFTRed: 2.01,
      },
      '1': {
        liveFTBlue: 2,
        liveFTRed: 2.01,
      },
      '2': {
        liveFTBlue: 1.98,
        liveFTRed: 2.04,
      },
      '3': {
        liveFTBlue: 1.97,
        liveFTRed: 2.05,
      },
      '4': {
        liveFTBlue: 1.95,
        liveFTRed: 2.07,
      },
      '5': {
        liveFTBlue: 1.95,
        liveFTRed: 2.08,
      },
      '6': {
        liveFTBlue: 1.93,
        liveFTRed: 2.1,
      },
      '7': {
        liveFTBlue: 1.92,
        liveFTRed: 2.1,
      },
      '8': {
        liveFTBlue: 1.9,
        liveFTRed: 2.13,
      },
      '9': {
        liveFTBlue: 1.89,
        liveFTRed: 2.15,
      },
      '10': {
        liveFTBlue: 1.87,
        liveFTRed: 2.18,
      },
      '11': {
        liveFTBlue: 1.86,
        liveFTRed: 2.18,
      },
      '12': {
        liveFTBlue: 1.85,
        liveFTRed: 2.19,
      },
      '13': {
        liveFTBlue: 1.83,
        liveFTRed: 2.22,
      },
      '14': {
        liveFTBlue: 1.82,
        liveFTRed: 2.24,
      },
      '15': {
        liveFTBlue: 1.82,
        liveFTRed: 2.24,
      },
      '16': {
        liveFTBlue: 1.8,
        liveFTRed: 2.27,
      },
      '17': {
        liveFTBlue: 1.79,
        liveFTRed: 2.29,
      },
      '18': {
        liveFTBlue: 1.78,
        liveFTRed: 2.3,
      },
      '19': {
        liveFTBlue: 1.77,
        liveFTRed: 2.33,
      },
      '20': {
        liveFTBlue: 1.76,
        liveFTRed: 2.34,
      },
      '21': {
        liveFTBlue: 1.75,
        liveFTRed: 2.36,
      },
      '22': {
        liveFTBlue: 1.73,
        liveFTRed: 2.39,
      },
      '23': {
        liveFTBlue: 1.73,
        liveFTRed: 2.4,
      },
      '24': {
        liveFTBlue: 1.72,
        liveFTRed: 2.42,
      },
      '25': {
        liveFTBlue: 1.71,
        liveFTRed: 2.44,
      },
      '26': {
        liveFTBlue: 1.7,
        liveFTRed: 2.45,
      },
      '27': {
        liveFTBlue: 1.68,
        liveFTRed: 2.5,
      },
      '28': {
        liveFTBlue: 1.68,
        liveFTRed: 2.5,
      },
      '29': {
        liveFTBlue: 1.66,
        liveFTRed: 2.53,
      },
      '30': {
        liveFTBlue: 1.66,
        liveFTRed: 2.55,
      },
      '31': {
        liveFTBlue: 1.65,
        liveFTRed: 2.57,
      },
      '32': {
        liveFTBlue: 1.64,
        liveFTRed: 2.58,
      },
      '33': {
        liveFTBlue: 1.63,
        liveFTRed: 2.6,
      },
      '34': {
        liveFTBlue: 1.63,
        liveFTRed: 2.62,
      },
      '35': {
        liveFTBlue: 1.61,
        liveFTRed: 2.67,
      },
      '36': {
        liveFTBlue: 1.6,
        liveFTRed: 2.68,
      },
      '37': {
        liveFTBlue: 1.59,
        liveFTRed: 2.72,
      },
      '38': {
        liveFTBlue: 1.58,
        liveFTRed: 2.74,
      },
      '39': {
        liveFTBlue: 1.58,
        liveFTRed: 2.76,
      },
      '40': {
        liveFTBlue: 1.57,
        liveFTRed: 2.79,
      },
      '41': {
        liveFTBlue: 1.56,
        liveFTRed: 2.81,
      },
      '42': {
        liveFTBlue: 1.56,
        liveFTRed: 2.83,
      },
      '43': {
        liveFTBlue: 1.55,
        liveFTRed: 2.86,
      },
      '44': {
        liveFTBlue: 1.54,
        liveFTRed: 2.89,
      },
      '45': {
        liveFTBlue: 1.53,
        liveFTRed: 2.93,
      },
      '46': {
        liveFTBlue: 1.52,
        liveFTRed: 2.95,
      },
      '47': {
        liveFTBlue: 1.51,
        liveFTRed: 2.99,
      },
      '48': {
        liveFTBlue: 1.51,
        liveFTRed: 3,
      },
      '49': {
        liveFTBlue: 1.5,
        liveFTRed: 3.03,
      },
      '50': {
        liveFTBlue: 1.5,
        liveFTRed: 3.06,
      },
      '51': {
        liveFTBlue: 1.49,
        liveFTRed: 3.09,
      },
      '52': {
        liveFTBlue: 1.48,
        liveFTRed: 3.13,
      },
      '53': {
        liveFTBlue: 1.47,
        liveFTRed: 3.16,
      },
      '54': {
        liveFTBlue: 1.46,
        liveFTRed: 3.19,
      },
      '55': {
        liveFTBlue: 1.46,
        liveFTRed: 3.22,
      },
      '56': {
        liveFTBlue: 1.45,
        liveFTRed: 3.27,
      },
      '57': {
        liveFTBlue: 1.44,
        liveFTRed: 3.31,
      },
      '58': {
        liveFTBlue: 1.44,
        liveFTRed: 3.31,
      },
      '59': {
        liveFTBlue: 1.43,
        liveFTRed: 3.37,
      },
      '60': {
        liveFTBlue: 1.42,
        liveFTRed: 3.41,
      },
      '61': {
        liveFTBlue: 1.42,
        liveFTRed: 3.43,
      },
      '62': {
        liveFTBlue: 1.41,
        liveFTRed: 3.48,
      },
      '63': {
        liveFTBlue: 1.4,
        liveFTRed: 3.54,
      },
      '64': {
        liveFTBlue: 1.4,
        liveFTRed: 3.53,
      },
      '65': {
        liveFTBlue: 1.39,
        liveFTRed: 3.59,
      },
      '66': {
        liveFTBlue: 1.38,
        liveFTRed: 3.65,
      },
      '67': {
        liveFTBlue: 1.38,
        liveFTRed: 3.66,
      },
      '68': {
        liveFTBlue: 1.38,
        liveFTRed: 3.7,
      },
      '69': {
        liveFTBlue: 1.37,
        liveFTRed: 3.76,
      },
      '70': {
        liveFTBlue: 1.37,
        liveFTRed: 3.79,
      },
      '71': {
        liveFTBlue: 1.36,
        liveFTRed: 3.82,
      },
      '72': {
        liveFTBlue: 1.36,
        liveFTRed: 3.85,
      },
      '73': {
        liveFTBlue: 1.35,
        liveFTRed: 3.95,
      },
      '74': {
        liveFTBlue: 1.34,
        liveFTRed: 3.97,
      },
      '75': {
        liveFTBlue: 1.34,
        liveFTRed: 4.02,
      },
      '76': {
        liveFTBlue: 1.33,
        liveFTRed: 4.08,
      },
      '77': {
        liveFTBlue: 1.33,
        liveFTRed: 4.12,
      },
      '78': {
        liveFTBlue: 1.33,
        liveFTRed: 4.12,
      },
      '79': {
        liveFTBlue: 1.32,
        liveFTRed: 4.21,
      },
      '80': {
        liveFTBlue: 1.32,
        liveFTRed: 4.22,
      },
      '81': {
        liveFTBlue: 1.31,
        liveFTRed: 4.28,
      },
      '82': {
        liveFTBlue: 1.3,
        liveFTRed: 4.34,
      },
      '83': {
        liveFTBlue: 1.3,
        liveFTRed: 4.44,
      },
      '84': {
        liveFTBlue: 1.3,
        liveFTRed: 4.42,
      },
      '85': {
        liveFTBlue: 1.29,
        liveFTRed: 4.52,
      },
      '86': {
        liveFTBlue: 1.29,
        liveFTRed: 4.55,
      },
      '87': {
        liveFTBlue: 1.28,
        liveFTRed: 4.64,
      },
      '88': {
        liveFTBlue: 1.28,
        liveFTRed: 4.66,
      },
      '89': {
        liveFTBlue: 1.27,
        liveFTRed: 4.72,
      },
      '90': {
        liveFTBlue: 1.27,
        liveFTRed: 4.81,
      },
      '91': {
        liveFTBlue: 1.26,
        liveFTRed: 4.9,
      },
      '92': {
        liveFTBlue: 1.26,
        liveFTRed: 4.88,
      },
      '93': {
        liveFTBlue: 1.25,
        liveFTRed: 5.04,
      },
      '94': {
        liveFTBlue: 1.25,
        liveFTRed: 5.03,
      },
      '95': {
        liveFTBlue: 1.25,
        liveFTRed: 5.11,
      },
      '96': {
        liveFTBlue: 1.24,
        liveFTRed: 5.18,
      },
      '97': {
        liveFTBlue: 1.24,
        liveFTRed: 5.24,
      },
      '98': {
        liveFTBlue: 1.24,
        liveFTRed: 5.26,
      },
      '99': {
        liveFTBlue: 1.23,
        liveFTRed: 5.35,
      },
      '100': {
        liveFTBlue: 1.23,
        liveFTRed: 5.39,
      },
      '101': {
        liveFTBlue: 1.23,
        liveFTRed: 5.5,
      },
      '102': {
        liveFTBlue: 1.22,
        liveFTRed: 5.58,
      },
      '103': {
        liveFTBlue: 1.22,
        liveFTRed: 5.68,
      },
      '104': {
        liveFTBlue: 1.22,
        liveFTRed: 5.68,
      },
      '105': {
        liveFTBlue: 1.21,
        liveFTRed: 5.82,
      },
      '106': {
        liveFTBlue: 1.21,
        liveFTRed: 5.92,
      },
      '107': {
        liveFTBlue: 1.2,
        liveFTRed: 6.01,
      },
      '108': {
        liveFTBlue: 1.2,
        liveFTRed: 6.01,
      },
      '109': {
        liveFTBlue: 1.19,
        liveFTRed: 6.23,
      },
      '110': {
        liveFTBlue: 1.2,
        liveFTRed: 6.16,
      },
      '111': {
        liveFTBlue: 1.19,
        liveFTRed: 6.25,
      },
      '112': {
        liveFTBlue: 1.19,
        liveFTRed: 6.44,
      },
      '113': {
        liveFTBlue: 1.19,
        liveFTRed: 6.47,
      },
      '114': {
        liveFTBlue: 1.18,
        liveFTRed: 6.53,
      },
      '115': {
        liveFTBlue: 1.18,
        liveFTRed: 6.57,
      },
      '116': {
        liveFTBlue: 1.18,
        liveFTRed: 6.74,
      },
      '117': {
        liveFTBlue: 1.17,
        liveFTRed: 6.92,
      },
      '118': {
        liveFTBlue: 1.17,
        liveFTRed: 6.96,
      },
      '119': {
        liveFTBlue: 1.17,
        liveFTRed: 7.03,
      },
      '120': {
        liveFTBlue: 1.17,
        liveFTRed: 7.18,
      },
      '121': {
        liveFTBlue: 1.17,
        liveFTRed: 7.15,
      },
      '122': {
        liveFTBlue: 1.16,
        liveFTRed: 7.46,
      },
      '123': {
        liveFTBlue: 1.16,
        liveFTRed: 7.5,
      },
      '124': {
        liveFTBlue: 1.16,
        liveFTRed: 7.56,
      },
      '125': {
        liveFTBlue: 1.15,
        liveFTRed: 7.68,
      },
      '126': {
        liveFTBlue: 1.15,
        liveFTRed: 7.97,
      },
      '127': {
        liveFTBlue: 1.15,
        liveFTRed: 7.85,
      },
      '128': {
        liveFTBlue: 1.15,
        liveFTRed: 7.94,
      },
      '129': {
        liveFTBlue: 1.14,
        liveFTRed: 8.08,
      },
      '130': {
        liveFTBlue: 1.14,
        liveFTRed: 8.27,
      },
      '131': {
        liveFTBlue: 1.14,
        liveFTRed: 8.39,
      },
      '132': {
        liveFTBlue: 1.14,
        liveFTRed: 8.47,
      },
      '133': {
        liveFTBlue: 1.13,
        liveFTRed: 8.8,
      },
      '134': {
        liveFTBlue: 1.13,
        liveFTRed: 8.91,
      },
      '135': {
        liveFTBlue: 1.13,
        liveFTRed: 8.87,
      },
      '136': {
        liveFTBlue: 1.13,
        liveFTRed: 9.12,
      },
      '137': {
        liveFTBlue: 1.12,
        liveFTRed: 9.25,
      },
      '138': {
        liveFTBlue: 1.12,
        liveFTRed: 9.51,
      },
      '139': {
        liveFTBlue: 1.12,
        liveFTRed: 9.51,
      },
      '140': {
        liveFTBlue: 1.12,
        liveFTRed: 9.67,
      },
      '141': {
        liveFTBlue: 1.11,
        liveFTRed: 9.9,
      },
      '142': {
        liveFTBlue: 1.11,
        liveFTRed: 10.13,
      },
      '143': {
        liveFTBlue: 1.11,
        liveFTRed: 10.36,
      },
      '144': {
        liveFTBlue: 1.11,
        liveFTRed: 10.36,
      },
      '145': {
        liveFTBlue: 1.11,
        liveFTRed: 10.48,
      },
      '146': {
        liveFTBlue: 1.11,
        liveFTRed: 10.64,
      },
      '147': {
        liveFTBlue: 1.1,
        liveFTRed: 11.1,
      },
      '148': {
        liveFTBlue: 1.1,
        liveFTRed: 11.06,
      },
      '149': {
        liveFTBlue: 1.1,
        liveFTRed: 11.1,
      },
      '150': {
        liveFTBlue: 1.1,
        liveFTRed: 11.36,
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
      blueRed: 2,
      overUnder: 1.5,
    },
  }},
  { upsert: true},
);