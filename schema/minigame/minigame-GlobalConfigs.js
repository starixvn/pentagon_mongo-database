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
        inRunFTHome: 14.23,
        inRunFTAway: 1.08,
      },
      '-149': {
        inRunFTHome: 13.78,
        inRunFTAway: 1.08,
      },
      '-148': {
        inRunFTHome: 13.6,
        inRunFTAway: 1.08,
      },
      '-147': {
        inRunFTHome: 13.22,
        inRunFTAway: 1.08,
      },
      '-146': {
        inRunFTHome: 13.04,
        inRunFTAway: 1.08,
      },
      '-145': {
        inRunFTHome: 12.43,
        inRunFTAway: 1.09,
      },
      '-144': {
        inRunFTHome: 12.52,
        inRunFTAway: 1.09,
      },
      '-143': {
        inRunFTHome: 12.13,
        inRunFTAway: 1.09,
      },
      '-142': {
        inRunFTHome: 12.19,
        inRunFTAway: 1.09,
      },
      '-141': {
        inRunFTHome: 11.41,
        inRunFTAway: 1.1,
      },
      '-140': {
        inRunFTHome: 11.09,
        inRunFTAway: 1.1,
      },
      '-139': {
        inRunFTHome: 11.34,
        inRunFTAway: 1.1,
      },
      '-138': {
        inRunFTHome: 11.28,
        inRunFTAway: 1.1,
      },
      '-137': {
        inRunFTHome: 11.04,
        inRunFTAway: 1.1,
      },
      '-136': {
        inRunFTHome: 10.47,
        inRunFTAway: 1.11,
      },
      '-135': {
        inRunFTHome: 10.53,
        inRunFTAway: 1.11,
      },
      '-134': {
        inRunFTHome: 10.2,
        inRunFTAway: 1.11,
      },
      '-133': {
        inRunFTHome: 10.51,
        inRunFTAway: 1.11,
      },
      '-132': {
        inRunFTHome: 10.34,
        inRunFTAway: 1.11,
      },
      '-131': {
        inRunFTHome: 10.04,
        inRunFTAway: 1.11,
      },
      '-130': {
        inRunFTHome: 9.91,
        inRunFTAway: 1.11,
      },
      '-129': {
        inRunFTHome: 9.73,
        inRunFTAway: 1.12,
      },
      '-128': {
        inRunFTHome: 9.23,
        inRunFTAway: 1.12,
      },
      '-127': {
        inRunFTHome: 9.34,
        inRunFTAway: 1.12,
      },
      '-126': {
        inRunFTHome: 9.05,
        inRunFTAway: 1.13,
      },
      '-125': {
        inRunFTHome: 8.92,
        inRunFTAway: 1.13,
      },
      '-124': {
        inRunFTHome: 8.66,
        inRunFTAway: 1.13,
      },
      '-123': {
        inRunFTHome: 8.85,
        inRunFTAway: 1.13,
      },
      '-122': {
        inRunFTHome: 8.48,
        inRunFTAway: 1.14,
      },
      '-121': {
        inRunFTHome: 8.42,
        inRunFTAway: 1.14,
      },
      '-120': {
        inRunFTHome: 8.45,
        inRunFTAway: 1.14,
      },
      '-119': {
        inRunFTHome: 7.98,
        inRunFTAway: 1.15,
      },
      '-118': {
        inRunFTHome: 7.87,
        inRunFTAway: 1.15,
      },
      '-117': {
        inRunFTHome: 7.74,
        inRunFTAway: 1.15,
      },
      '-116': {
        inRunFTHome: 7.77,
        inRunFTAway: 1.15,
      },
      '-115': {
        inRunFTHome: 7.6,
        inRunFTAway: 1.15,
      },
      '-114': {
        inRunFTHome: 7.43,
        inRunFTAway: 1.16,
      },
      '-113': {
        inRunFTHome: 7.43,
        inRunFTAway: 1.16,
      },
      '-112': {
        inRunFTHome: 7.26,
        inRunFTAway: 1.16,
      },
      '-111': {
        inRunFTHome: 7.21,
        inRunFTAway: 1.16,
      },
      '-110': {
        inRunFTHome: 7.09,
        inRunFTAway: 1.17,
      },
      '-109': {
        inRunFTHome: 6.85,
        inRunFTAway: 1.17,
      },
      '-108': {
        inRunFTHome: 6.67,
        inRunFTAway: 1.18,
      },
      '-107': {
        inRunFTHome: 6.65,
        inRunFTAway: 1.18,
      },
      '-106': {
        inRunFTHome: 6.73,
        inRunFTAway: 1.18,
      },
      '-105': {
        inRunFTHome: 6.46,
        inRunFTAway: 1.19,
      },
      '-104': {
        inRunFTHome: 6.33,
        inRunFTAway: 1.19,
      },
      '-103': {
        inRunFTHome: 6.4,
        inRunFTAway: 1.19,
      },
      '-102': {
        inRunFTHome: 6.13,
        inRunFTAway: 1.2,
      },
      '-101': {
        inRunFTHome: 6.07,
        inRunFTAway: 1.2,
      },
      '-100': {
        inRunFTHome: 6.1,
        inRunFTAway: 1.2,
      },
      '-99': {
        inRunFTHome: 6.01,
        inRunFTAway: 1.2,
      },
      '-98': {
        inRunFTHome: 5.67,
        inRunFTAway: 1.22,
      },
      '-97': {
        inRunFTHome: 5.88,
        inRunFTAway: 1.21,
      },
      '-96': {
        inRunFTHome: 5.64,
        inRunFTAway: 1.22,
      },
      '-95': {
        inRunFTHome: 5.75,
        inRunFTAway: 1.21,
      },
      '-94': {
        inRunFTHome: 5.53,
        inRunFTAway: 1.23,
      },
      '-93': {
        inRunFTHome: 5.55,
        inRunFTAway: 1.22,
      },
      '-92': {
        inRunFTHome: 5.46,
        inRunFTAway: 1.23,
      },
      '-91': {
        inRunFTHome: 5.26,
        inRunFTAway: 1.24,
      },
      '-90': {
        inRunFTHome: 5.19,
        inRunFTAway: 1.24,
      },
      '-89': {
        inRunFTHome: 5.27,
        inRunFTAway: 1.24,
      },
      '-88': {
        inRunFTHome: 5.02,
        inRunFTAway: 1.25,
      },
      '-87': {
        inRunFTHome: 5,
        inRunFTAway: 1.25,
      },
      '-86': {
        inRunFTHome: 4.93,
        inRunFTAway: 1.26,
      },
      '-85': {
        inRunFTHome: 4.9,
        inRunFTAway: 1.26,
      },
      '-84': {
        inRunFTHome: 4.88,
        inRunFTAway: 1.26,
      },
      '-83': {
        inRunFTHome: 4.76,
        inRunFTAway: 1.27,
      },
      '-82': {
        inRunFTHome: 4.75,
        inRunFTAway: 1.27,
      },
      '-81': {
        inRunFTHome: 4.73,
        inRunFTAway: 1.27,
      },
      '-80': {
        inRunFTHome: 4.52,
        inRunFTAway: 1.29,
      },
      '-79': {
        inRunFTHome: 4.51,
        inRunFTAway: 1.29,
      },
      '-78': {
        inRunFTHome: 4.47,
        inRunFTAway: 1.29,
      },
      '-77': {
        inRunFTHome: 4.47,
        inRunFTAway: 1.29,
      },
      '-76': {
        inRunFTHome: 4.33,
        inRunFTAway: 1.31,
      },
      '-75': {
        inRunFTHome: 4.35,
        inRunFTAway: 1.3,
      },
      '-74': {
        inRunFTHome: 4.2,
        inRunFTAway: 1.32,
      },
      '-73': {
        inRunFTHome: 4.16,
        inRunFTAway: 1.32,
      },
      '-72': {
        inRunFTHome: 4.09,
        inRunFTAway: 1.33,
      },
      '-71': {
        inRunFTHome: 4.05,
        inRunFTAway: 1.33,
      },
      '-70': {
        inRunFTHome: 4.04,
        inRunFTAway: 1.33,
      },
      '-69': {
        inRunFTHome: 4.06,
        inRunFTAway: 1.33,
      },
      '-68': {
        inRunFTHome: 3.97,
        inRunFTAway: 1.34,
      },
      '-67': {
        inRunFTHome: 3.87,
        inRunFTAway: 1.35,
      },
      '-66': {
        inRunFTHome: 3.88,
        inRunFTAway: 1.35,
      },
      '-65': {
        inRunFTHome: 3.75,
        inRunFTAway: 1.37,
      },
      '-64': {
        inRunFTHome: 3.8,
        inRunFTAway: 1.36,
      },
      '-63': {
        inRunFTHome: 3.71,
        inRunFTAway: 1.37,
      },
      '-62': {
        inRunFTHome: 3.68,
        inRunFTAway: 1.38,
      },
      '-61': {
        inRunFTHome: 3.57,
        inRunFTAway: 1.4,
      },
      '-60': {
        inRunFTHome: 3.58,
        inRunFTAway: 1.39,
      },
      '-59': {
        inRunFTHome: 3.51,
        inRunFTAway: 1.4,
      },
      '-58': {
        inRunFTHome: 3.46,
        inRunFTAway: 1.41,
      },
      '-57': {
        inRunFTHome: 3.44,
        inRunFTAway: 1.42,
      },
      '-56': {
        inRunFTHome: 3.43,
        inRunFTAway: 1.42,
      },
      '-55': {
        inRunFTHome: 3.4,
        inRunFTAway: 1.42,
      },
      '-54': {
        inRunFTHome: 3.33,
        inRunFTAway: 1.44,
      },
      '-53': {
        inRunFTHome: 3.33,
        inRunFTAway: 1.44,
      },
      '-52': {
        inRunFTHome: 3.24,
        inRunFTAway: 1.45,
      },
      '-51': {
        inRunFTHome: 3.25,
        inRunFTAway: 1.45,
      },
      '-50': {
        inRunFTHome: 3.24,
        inRunFTAway: 1.45,
      },
      '-49': {
        inRunFTHome: 3.15,
        inRunFTAway: 1.47,
      },
      '-48': {
        inRunFTHome: 3.13,
        inRunFTAway: 1.48,
      },
      '-47': {
        inRunFTHome: 3.08,
        inRunFTAway: 1.49,
      },
      '-46': {
        inRunFTHome: 3.05,
        inRunFTAway: 1.49,
      },
      '-45': {
        inRunFTHome: 3.03,
        inRunFTAway: 1.5,
      },
      '-44': {
        inRunFTHome: 3.01,
        inRunFTAway: 1.51,
      },
      '-43': {
        inRunFTHome: 2.98,
        inRunFTAway: 1.51,
      },
      '-42': {
        inRunFTHome: 2.91,
        inRunFTAway: 1.53,
      },
      '-41': {
        inRunFTHome: 2.91,
        inRunFTAway: 1.53,
      },
      '-40': {
        inRunFTHome: 2.86,
        inRunFTAway: 1.54,
      },
      '-39': {
        inRunFTHome: 2.83,
        inRunFTAway: 1.56,
      },
      '-38': {
        inRunFTHome: 2.84,
        inRunFTAway: 1.55,
      },
      '-37': {
        inRunFTHome: 2.8,
        inRunFTAway: 1.56,
      },
      '-36': {
        inRunFTHome: 2.74,
        inRunFTAway: 1.59,
      },
      '-35': {
        inRunFTHome: 2.76,
        inRunFTAway: 1.58,
      },
      '-34': {
        inRunFTHome: 2.71,
        inRunFTAway: 1.59,
      },
      '-33': {
        inRunFTHome: 2.66,
        inRunFTAway: 1.61,
      },
      '-32': {
        inRunFTHome: 2.65,
        inRunFTAway: 1.61,
      },
      '-31': {
        inRunFTHome: 2.62,
        inRunFTAway: 1.63,
      },
      '-30': {
        inRunFTHome: 2.62,
        inRunFTAway: 1.63,
      },
      '-29': {
        inRunFTHome: 2.58,
        inRunFTAway: 1.64,
      },
      '-28': {
        inRunFTHome: 2.56,
        inRunFTAway: 1.65,
      },
      '-27': {
        inRunFTHome: 2.54,
        inRunFTAway: 1.66,
      },
      '-26': {
        inRunFTHome: 2.49,
        inRunFTAway: 1.68,
      },
      '-25': {
        inRunFTHome: 2.47,
        inRunFTAway: 1.69,
      },
      '-24': {
        inRunFTHome: 2.46,
        inRunFTAway: 1.7,
      },
      '-23': {
        inRunFTHome: 2.44,
        inRunFTAway: 1.71,
      },
      '-22': {
        inRunFTHome: 2.4,
        inRunFTAway: 1.72,
      },
      '-21': {
        inRunFTHome: 2.38,
        inRunFTAway: 1.73,
      },
      '-20': {
        inRunFTHome: 2.39,
        inRunFTAway: 1.73,
      },
      '-19': {
        inRunFTHome: 2.35,
        inRunFTAway: 1.75,
      },
      '-18': {
        inRunFTHome: 2.34,
        inRunFTAway: 1.76,
      },
      '-17': {
        inRunFTHome: 2.3,
        inRunFTAway: 1.78,
      },
      '-16': {
        inRunFTHome: 2.28,
        inRunFTAway: 1.79,
      },
      '-15': {
        inRunFTHome: 2.26,
        inRunFTAway: 1.8,
      },
      '-14': {
        inRunFTHome: 2.23,
        inRunFTAway: 1.83,
      },
      '-13': {
        inRunFTHome: 2.22,
        inRunFTAway: 1.83,
      },
      '-12': {
        inRunFTHome: 2.23,
        inRunFTAway: 1.83,
      },
      '-11': {
        inRunFTHome: 2.21,
        inRunFTAway: 1.84,
      },
      '-10': {
        inRunFTHome: 2.16,
        inRunFTAway: 1.88,
      },
      '-9': {
        inRunFTHome: 2.15,
        inRunFTAway: 1.88,
      },
      '-8': {
        inRunFTHome: 2.16,
        inRunFTAway: 1.88,
      },
      '-7': {
        inRunFTHome: 2.12,
        inRunFTAway: 1.91,
      },
      '-6': {
        inRunFTHome: 2.12,
        inRunFTAway: 1.91,
      },
      '-5': {
        inRunFTHome: 2.09,
        inRunFTAway: 1.93,
      },
      '-4': {
        inRunFTHome: 2.06,
        inRunFTAway: 1.96,
      },
      '-3': {
        inRunFTHome: 2.07,
        inRunFTAway: 1.95,
      },
      '-2': {
        inRunFTHome: 2.05,
        inRunFTAway: 1.97,
      },
      '-1': {
        inRunFTHome: 2.02,
        inRunFTAway: 2,
      },
      '0': {
        inRunFTHome: 2.01,
        inRunFTAway: 2,
      },
      '1': {
        inRunFTHome: 2,
        inRunFTAway: 2.02,
      },
      '2': {
        inRunFTHome: 1.95,
        inRunFTAway: 2.07,
      },
      '3': {
        inRunFTHome: 1.96,
        inRunFTAway: 2.06,
      },
      '4': {
        inRunFTHome: 1.96,
        inRunFTAway: 2.06,
      },
      '5': {
        inRunFTHome: 1.95,
        inRunFTAway: 2.07,
      },
      '6': {
        inRunFTHome: 1.91,
        inRunFTAway: 2.12,
      },
      '7': {
        inRunFTHome: 1.91,
        inRunFTAway: 2.12,
      },
      '8': {
        inRunFTHome: 1.88,
        inRunFTAway: 2.15,
      },
      '9': {
        inRunFTHome: 1.87,
        inRunFTAway: 2.16,
      },
      '10': {
        inRunFTHome: 1.86,
        inRunFTAway: 2.18,
      },
      '11': {
        inRunFTHome: 1.85,
        inRunFTAway: 2.19,
      },
      '12': {
        inRunFTHome: 1.84,
        inRunFTAway: 2.21,
      },
      '13': {
        inRunFTHome: 1.83,
        inRunFTAway: 2.23,
      },
      '14': {
        inRunFTHome: 1.8,
        inRunFTAway: 2.27,
      },
      '15': {
        inRunFTHome: 1.79,
        inRunFTAway: 2.29,
      },
      '16': {
        inRunFTHome: 1.8,
        inRunFTAway: 2.26,
      },
      '17': {
        inRunFTHome: 1.78,
        inRunFTAway: 2.3,
      },
      '18': {
        inRunFTHome: 1.77,
        inRunFTAway: 2.32,
      },
      '19': {
        inRunFTHome: 1.75,
        inRunFTAway: 2.35,
      },
      '20': {
        inRunFTHome: 1.74,
        inRunFTAway: 2.37,
      },
      '21': {
        inRunFTHome: 1.73,
        inRunFTAway: 2.39,
      },
      '22': {
        inRunFTHome: 1.72,
        inRunFTAway: 2.41,
      },
      '23': {
        inRunFTHome: 1.71,
        inRunFTAway: 2.44,
      },
      '24': {
        inRunFTHome: 1.69,
        inRunFTAway: 2.47,
      },
      '25': {
        inRunFTHome: 1.69,
        inRunFTAway: 2.48,
      },
      '26': {
        inRunFTHome: 1.67,
        inRunFTAway: 2.52,
      },
      '27': {
        inRunFTHome: 1.66,
        inRunFTAway: 2.54,
      },
      '28': {
        inRunFTHome: 1.65,
        inRunFTAway: 2.57,
      },
      '29': {
        inRunFTHome: 1.64,
        inRunFTAway: 2.57,
      },
      '30': {
        inRunFTHome: 1.63,
        inRunFTAway: 2.61,
      },
      '31': {
        inRunFTHome: 1.63,
        inRunFTAway: 2.6,
      },
      '32': {
        inRunFTHome: 1.61,
        inRunFTAway: 2.67,
      },
      '33': {
        inRunFTHome: 1.6,
        inRunFTAway: 2.69,
      },
      '34': {
        inRunFTHome: 1.59,
        inRunFTAway: 2.71,
      },
      '35': {
        inRunFTHome: 1.58,
        inRunFTAway: 2.75,
      },
      '36': {
        inRunFTHome: 1.57,
        inRunFTAway: 2.77,
      },
      '37': {
        inRunFTHome: 1.56,
        inRunFTAway: 2.8,
      },
      '38': {
        inRunFTHome: 1.56,
        inRunFTAway: 2.81,
      },
      '39': {
        inRunFTHome: 1.55,
        inRunFTAway: 2.84,
      },
      '40': {
        inRunFTHome: 1.55,
        inRunFTAway: 2.86,
      },
      '41': {
        inRunFTHome: 1.54,
        inRunFTAway: 2.9,
      },
      '42': {
        inRunFTHome: 1.53,
        inRunFTAway: 2.9,
      },
      '43': {
        inRunFTHome: 1.51,
        inRunFTAway: 2.97,
      },
      '44': {
        inRunFTHome: 1.51,
        inRunFTAway: 2.98,
      },
      '45': {
        inRunFTHome: 1.51,
        inRunFTAway: 3.01,
      },
      '46': {
        inRunFTHome: 1.49,
        inRunFTAway: 3.06,
      },
      '47': {
        inRunFTHome: 1.48,
        inRunFTAway: 3.11,
      },
      '48': {
        inRunFTHome: 1.49,
        inRunFTAway: 3.09,
      },
      '49': {
        inRunFTHome: 1.47,
        inRunFTAway: 3.14,
      },
      '50': {
        inRunFTHome: 1.45,
        inRunFTAway: 3.25,
      },
      '51': {
        inRunFTHome: 1.46,
        inRunFTAway: 3.2,
      },
      '52': {
        inRunFTHome: 1.45,
        inRunFTAway: 3.26,
      },
      '53': {
        inRunFTHome: 1.44,
        inRunFTAway: 3.29,
      },
      '54': {
        inRunFTHome: 1.44,
        inRunFTAway: 3.29,
      },
      '55': {
        inRunFTHome: 1.44,
        inRunFTAway: 3.32,
      },
      '56': {
        inRunFTHome: 1.41,
        inRunFTAway: 3.46,
      },
      '57': {
        inRunFTHome: 1.41,
        inRunFTAway: 3.46,
      },
      '58': {
        inRunFTHome: 1.4,
        inRunFTAway: 3.52,
      },
      '59': {
        inRunFTHome: 1.4,
        inRunFTAway: 3.52,
      },
      '60': {
        inRunFTHome: 1.39,
        inRunFTAway: 3.6,
      },
      '61': {
        inRunFTHome: 1.38,
        inRunFTAway: 3.65,
      },
      '62': {
        inRunFTHome: 1.39,
        inRunFTAway: 3.61,
      },
      '63': {
        inRunFTHome: 1.37,
        inRunFTAway: 3.75,
      },
      '64': {
        inRunFTHome: 1.38,
        inRunFTAway: 3.67,
      },
      '65': {
        inRunFTHome: 1.36,
        inRunFTAway: 3.83,
      },
      '66': {
        inRunFTHome: 1.35,
        inRunFTAway: 3.89,
      },
      '67': {
        inRunFTHome: 1.35,
        inRunFTAway: 3.9,
      },
      '68': {
        inRunFTHome: 1.34,
        inRunFTAway: 3.98,
      },
      '69': {
        inRunFTHome: 1.35,
        inRunFTAway: 3.94,
      },
      '70': {
        inRunFTHome: 1.34,
        inRunFTAway: 4,
      },
      '71': {
        inRunFTHome: 1.34,
        inRunFTAway: 4.02,
      },
      '72': {
        inRunFTHome: 1.32,
        inRunFTAway: 4.13,
      },
      '73': {
        inRunFTHome: 1.32,
        inRunFTAway: 4.17,
      },
      '74': {
        inRunFTHome: 1.32,
        inRunFTAway: 4.22,
      },
      '75': {
        inRunFTHome: 1.32,
        inRunFTAway: 4.23,
      },
      '76': {
        inRunFTHome: 1.3,
        inRunFTAway: 4.39,
      },
      '77': {
        inRunFTHome: 1.3,
        inRunFTAway: 4.43,
      },
      '78': {
        inRunFTHome: 1.29,
        inRunFTAway: 4.47,
      },
      '79': {
        inRunFTHome: 1.29,
        inRunFTAway: 4.52,
      },
      '80': {
        inRunFTHome: 1.29,
        inRunFTAway: 4.53,
      },
      '81': {
        inRunFTHome: 1.29,
        inRunFTAway: 4.56,
      },
      '82': {
        inRunFTHome: 1.28,
        inRunFTAway: 4.64,
      },
      '83': {
        inRunFTHome: 1.27,
        inRunFTAway: 4.76,
      },
      '84': {
        inRunFTHome: 1.27,
        inRunFTAway: 4.82,
      },
      '85': {
        inRunFTHome: 1.27,
        inRunFTAway: 4.75,
      },
      '86': {
        inRunFTHome: 1.26,
        inRunFTAway: 4.96,
      },
      '87': {
        inRunFTHome: 1.25,
        inRunFTAway: 4.99,
      },
      '88': {
        inRunFTHome: 1.25,
        inRunFTAway: 5.06,
      },
      '89': {
        inRunFTHome: 1.25,
        inRunFTAway: 5.12,
      },
      '90': {
        inRunFTHome: 1.24,
        inRunFTAway: 5.23,
      },
      '91': {
        inRunFTHome: 1.24,
        inRunFTAway: 5.23,
      },
      '92': {
        inRunFTHome: 1.23,
        inRunFTAway: 5.35,
      },
      '93': {
        inRunFTHome: 1.23,
        inRunFTAway: 5.37,
      },
      '94': {
        inRunFTHome: 1.22,
        inRunFTAway: 5.64,
      },
      '95': {
        inRunFTHome: 1.22,
        inRunFTAway: 5.63,
      },
      '96': {
        inRunFTHome: 1.23,
        inRunFTAway: 5.5,
      },
      '97': {
        inRunFTHome: 1.21,
        inRunFTAway: 5.73,
      },
      '98': {
        inRunFTHome: 1.21,
        inRunFTAway: 5.89,
      },
      '99': {
        inRunFTHome: 1.21,
        inRunFTAway: 5.87,
      },
      '100': {
        inRunFTHome: 1.2,
        inRunFTAway: 6.13,
      },
      '101': {
        inRunFTHome: 1.2,
        inRunFTAway: 6.12,
      },
      '102': {
        inRunFTHome: 1.2,
        inRunFTAway: 6.2,
      },
      '103': {
        inRunFTHome: 1.18,
        inRunFTAway: 6.52,
      },
      '104': {
        inRunFTHome: 1.19,
        inRunFTAway: 6.25,
      },
      '105': {
        inRunFTHome: 1.19,
        inRunFTAway: 6.44,
      },
      '106': {
        inRunFTHome: 1.18,
        inRunFTAway: 6.61,
      },
      '107': {
        inRunFTHome: 1.18,
        inRunFTAway: 6.81,
      },
      '108': {
        inRunFTHome: 1.18,
        inRunFTAway: 6.83,
      },
      '109': {
        inRunFTHome: 1.17,
        inRunFTAway: 6.84,
      },
      '110': {
        inRunFTHome: 1.17,
        inRunFTAway: 7.04,
      },
      '111': {
        inRunFTHome: 1.16,
        inRunFTAway: 7.35,
      },
      '112': {
        inRunFTHome: 1.17,
        inRunFTAway: 7.17,
      },
      '113': {
        inRunFTHome: 1.15,
        inRunFTAway: 7.65,
      },
      '114': {
        inRunFTHome: 1.16,
        inRunFTAway: 7.35,
      },
      '115': {
        inRunFTHome: 1.15,
        inRunFTAway: 7.6,
      },
      '116': {
        inRunFTHome: 1.15,
        inRunFTAway: 7.66,
      },
      '117': {
        inRunFTHome: 1.15,
        inRunFTAway: 7.88,
      },
      '118': {
        inRunFTHome: 1.15,
        inRunFTAway: 7.79,
      },
      '119': {
        inRunFTHome: 1.14,
        inRunFTAway: 8.07,
      },
      '120': {
        inRunFTHome: 1.14,
        inRunFTAway: 8.33,
      },
      '121': {
        inRunFTHome: 1.14,
        inRunFTAway: 8.37,
      },
      '122': {
        inRunFTHome: 1.14,
        inRunFTAway: 8.5,
      },
      '123': {
        inRunFTHome: 1.13,
        inRunFTAway: 8.74,
      },
      '124': {
        inRunFTHome: 1.13,
        inRunFTAway: 8.68,
      },
      '125': {
        inRunFTHome: 1.13,
        inRunFTAway: 8.82,
      },
      '126': {
        inRunFTHome: 1.13,
        inRunFTAway: 8.94,
      },
      '127': {
        inRunFTHome: 1.12,
        inRunFTAway: 9.15,
      },
      '128': {
        inRunFTHome: 1.13,
        inRunFTAway: 9.17,
      },
      '129': {
        inRunFTHome: 1.12,
        inRunFTAway: 9.59,
      },
      '130': {
        inRunFTHome: 1.12,
        inRunFTAway: 9.83,
      },
      '131': {
        inRunFTHome: 1.11,
        inRunFTAway: 10.24,
      },
      '132': {
        inRunFTHome: 1.11,
        inRunFTAway: 10.09,
      },
      '133': {
        inRunFTHome: 1.11,
        inRunFTAway: 10.14,
      },
      '134': {
        inRunFTHome: 1.11,
        inRunFTAway: 10.47,
      },
      '135': {
        inRunFTHome: 1.11,
        inRunFTAway: 10.32,
      },
      '136': {
        inRunFTHome: 1.1,
        inRunFTAway: 10.81,
      },
      '137': {
        inRunFTHome: 1.1,
        inRunFTAway: 10.94,
      },
      '138': {
        inRunFTHome: 1.1,
        inRunFTAway: 11.57,
      },
      '139': {
        inRunFTHome: 1.1,
        inRunFTAway: 11.23,
      },
      '140': {
        inRunFTHome: 1.1,
        inRunFTAway: 11.59,
      },
      '141': {
        inRunFTHome: 1.09,
        inRunFTAway: 12.14,
      },
      '142': {
        inRunFTHome: 1.09,
        inRunFTAway: 11.89,
      },
      '143': {
        inRunFTHome: 1.08,
        inRunFTAway: 13.02,
      },
      '144': {
        inRunFTHome: 1.09,
        inRunFTAway: 12.68,
      },
      '145': {
        inRunFTHome: 1.09,
        inRunFTAway: 12.39,
      },
      '146': {
        inRunFTHome: 1.08,
        inRunFTAway: 13.28,
      },
      '147': {
        inRunFTHome: 1.09,
        inRunFTAway: 13.11,
      },
      '148': {
        inRunFTHome: 1.08,
        inRunFTAway: 13.37,
      },
      '149': {
        inRunFTHome: 1.08,
        inRunFTAway: 13.58,
      },
      '150': {
        inRunFTHome: 1.08,
        inRunFTAway: 14.33,
      },
    },
    overUnder: {
      '661': {
        inRunFTOver: 11.38,
        inRunFTUnder: 1.1,
      },
      '662': {
        inRunFTOver: 11.62,
        inRunFTUnder: 1.09,
      },
      '663': {
        inRunFTOver: 11.25,
        inRunFTUnder: 1.1,
      },
      '664': {
        inRunFTOver: 10.39,
        inRunFTUnder: 1.11,
      },
      '665': {
        inRunFTOver: 10.86,
        inRunFTUnder: 1.1,
      },
      '666': {
        inRunFTOver: 10.85,
        inRunFTUnder: 1.1,
      },
      '667': {
        inRunFTOver: 10.45,
        inRunFTUnder: 1.11,
      },
      '668': {
        inRunFTOver: 10.21,
        inRunFTUnder: 1.11,
      },
      '669': {
        inRunFTOver: 10.08,
        inRunFTUnder: 1.11,
      },
      '670': {
        inRunFTOver: 9.89,
        inRunFTUnder: 1.11,
      },
      '671': {
        inRunFTOver: 9.76,
        inRunFTUnder: 1.11,
      },
      '672': {
        inRunFTOver: 9.83,
        inRunFTUnder: 1.11,
      },
      '673': {
        inRunFTOver: 9.71,
        inRunFTUnder: 1.11,
      },
      '674': {
        inRunFTOver: 9.09,
        inRunFTUnder: 1.12,
      },
      '675': {
        inRunFTOver: 9.4,
        inRunFTUnder: 1.12,
      },
      '676': {
        inRunFTOver: 9.21,
        inRunFTUnder: 1.12,
      },
      '677': {
        inRunFTOver: 9.1,
        inRunFTUnder: 1.12,
      },
      '678': {
        inRunFTOver: 8.96,
        inRunFTUnder: 1.13,
      },
      '679': {
        inRunFTOver: 8.57,
        inRunFTUnder: 1.13,
      },
      '680': {
        inRunFTOver: 8.93,
        inRunFTUnder: 1.13,
      },
      '681': {
        inRunFTOver: 8.67,
        inRunFTUnder: 1.13,
      },
      '682': {
        inRunFTOver: 8.54,
        inRunFTUnder: 1.13,
      },
      '683': {
        inRunFTOver: 8.24,
        inRunFTUnder: 1.14,
      },
      '684': {
        inRunFTOver: 8.13,
        inRunFTUnder: 1.14,
      },
      '685': {
        inRunFTOver: 7.79,
        inRunFTUnder: 1.15,
      },
      '686': {
        inRunFTOver: 7.86,
        inRunFTUnder: 1.15,
      },
      '687': {
        inRunFTOver: 7.64,
        inRunFTUnder: 1.15,
      },
      '688': {
        inRunFTOver: 7.98,
        inRunFTUnder: 1.14,
      },
      '689': {
        inRunFTOver: 7.53,
        inRunFTUnder: 1.15,
      },
      '690': {
        inRunFTOver: 7.44,
        inRunFTUnder: 1.16,
      },
      '691': {
        inRunFTOver: 7.3,
        inRunFTUnder: 1.16,
      },
      '692': {
        inRunFTOver: 7.1,
        inRunFTUnder: 1.16,
      },
      '693': {
        inRunFTOver: 7.15,
        inRunFTUnder: 1.16,
      },
      '694': {
        inRunFTOver: 7.02,
        inRunFTUnder: 1.17,
      },
      '695': {
        inRunFTOver: 6.94,
        inRunFTUnder: 1.17,
      },
      '696': {
        inRunFTOver: 7.02,
        inRunFTUnder: 1.17,
      },
      '697': {
        inRunFTOver: 6.89,
        inRunFTUnder: 1.17,
      },
      '698': {
        inRunFTOver: 6.78,
        inRunFTUnder: 1.17,
      },
      '699': {
        inRunFTOver: 6.61,
        inRunFTUnder: 1.18,
      },
      '700': {
        inRunFTOver: 6.68,
        inRunFTUnder: 1.18,
      },
      '701': {
        inRunFTOver: 6.53,
        inRunFTUnder: 1.18,
      },
      '702': {
        inRunFTOver: 6.44,
        inRunFTUnder: 1.18,
      },
      '703': {
        inRunFTOver: 6.36,
        inRunFTUnder: 1.19,
      },
      '704': {
        inRunFTOver: 6.26,
        inRunFTUnder: 1.19,
      },
      '705': {
        inRunFTOver: 6.11,
        inRunFTUnder: 1.2,
      },
      '706': {
        inRunFTOver: 5.99,
        inRunFTUnder: 1.2,
      },
      '707': {
        inRunFTOver: 6.01,
        inRunFTUnder: 1.2,
      },
      '708': {
        inRunFTOver: 6.19,
        inRunFTUnder: 1.19,
      },
      '709': {
        inRunFTOver: 5.92,
        inRunFTUnder: 1.2,
      },
      '710': {
        inRunFTOver: 5.86,
        inRunFTUnder: 1.21,
      },
      '711': {
        inRunFTOver: 5.68,
        inRunFTUnder: 1.21,
      },
      '712': {
        inRunFTOver: 5.85,
        inRunFTUnder: 1.21,
      },
      '713': {
        inRunFTOver: 5.79,
        inRunFTUnder: 1.21,
      },
      '714': {
        inRunFTOver: 5.52,
        inRunFTUnder: 1.22,
      },
      '715': {
        inRunFTOver: 5.66,
        inRunFTUnder: 1.21,
      },
      '716': {
        inRunFTOver: 5.44,
        inRunFTUnder: 1.22,
      },
      '717': {
        inRunFTOver: 5.46,
        inRunFTUnder: 1.22,
      },
      '718': {
        inRunFTOver: 5.37,
        inRunFTUnder: 1.23,
      },
      '719': {
        inRunFTOver: 5.2,
        inRunFTUnder: 1.24,
      },
      '720': {
        inRunFTOver: 5.07,
        inRunFTUnder: 1.25,
      },
      '721': {
        inRunFTOver: 5.13,
        inRunFTUnder: 1.24,
      },
      '722': {
        inRunFTOver: 5.2,
        inRunFTUnder: 1.24,
      },
      '723': {
        inRunFTOver: 4.99,
        inRunFTUnder: 1.25,
      },
      '724': {
        inRunFTOver: 4.88,
        inRunFTUnder: 1.26,
      },
      '725': {
        inRunFTOver: 5,
        inRunFTUnder: 1.25,
      },
      '726': {
        inRunFTOver: 4.91,
        inRunFTUnder: 1.26,
      },
      '727': {
        inRunFTOver: 4.84,
        inRunFTUnder: 1.26,
      },
      '728': {
        inRunFTOver: 4.87,
        inRunFTUnder: 1.26,
      },
      '729': {
        inRunFTOver: 4.66,
        inRunFTUnder: 1.27,
      },
      '730': {
        inRunFTOver: 4.76,
        inRunFTUnder: 1.27,
      },
      '731': {
        inRunFTOver: 4.66,
        inRunFTUnder: 1.27,
      },
      '732': {
        inRunFTOver: 4.54,
        inRunFTUnder: 1.28,
      },
      '733': {
        inRunFTOver: 4.55,
        inRunFTUnder: 1.28,
      },
      '734': {
        inRunFTOver: 4.51,
        inRunFTUnder: 1.28,
      },
      '735': {
        inRunFTOver: 4.45,
        inRunFTUnder: 1.29,
      },
      '736': {
        inRunFTOver: 4.42,
        inRunFTUnder: 1.29,
      },
      '737': {
        inRunFTOver: 4.35,
        inRunFTUnder: 1.3,
      },
      '738': {
        inRunFTOver: 4.35,
        inRunFTUnder: 1.3,
      },
      '739': {
        inRunFTOver: 4.27,
        inRunFTUnder: 1.31,
      },
      '740': {
        inRunFTOver: 4.2,
        inRunFTUnder: 1.31,
      },
      '741': {
        inRunFTOver: 4.25,
        inRunFTUnder: 1.31,
      },
      '742': {
        inRunFTOver: 4.07,
        inRunFTUnder: 1.33,
      },
      '743': {
        inRunFTOver: 4.1,
        inRunFTUnder: 1.32,
      },
      '744': {
        inRunFTOver: 4.03,
        inRunFTUnder: 1.33,
      },
      '745': {
        inRunFTOver: 4.02,
        inRunFTUnder: 1.33,
      },
      '746': {
        inRunFTOver: 3.94,
        inRunFTUnder: 1.34,
      },
      '747': {
        inRunFTOver: 3.9,
        inRunFTUnder: 1.35,
      },
      '748': {
        inRunFTOver: 3.95,
        inRunFTUnder: 1.34,
      },
      '749': {
        inRunFTOver: 3.87,
        inRunFTUnder: 1.35,
      },
      '750': {
        inRunFTOver: 3.75,
        inRunFTUnder: 1.36,
      },
      '751': {
        inRunFTOver: 3.72,
        inRunFTUnder: 1.37,
      },
      '752': {
        inRunFTOver: 3.69,
        inRunFTUnder: 1.37,
      },
      '753': {
        inRunFTOver: 3.72,
        inRunFTUnder: 1.37,
      },
      '754': {
        inRunFTOver: 3.64,
        inRunFTUnder: 1.38,
      },
      '755': {
        inRunFTOver: 3.61,
        inRunFTUnder: 1.38,
      },
      '756': {
        inRunFTOver: 3.58,
        inRunFTUnder: 1.39,
      },
      '757': {
        inRunFTOver: 3.54,
        inRunFTUnder: 1.39,
      },
      '758': {
        inRunFTOver: 3.52,
        inRunFTUnder: 1.4,
      },
      '759': {
        inRunFTOver: 3.47,
        inRunFTUnder: 1.4,
      },
      '760': {
        inRunFTOver: 3.46,
        inRunFTUnder: 1.41,
      },
      '761': {
        inRunFTOver: 3.43,
        inRunFTUnder: 1.41,
      },
      '762': {
        inRunFTOver: 3.44,
        inRunFTUnder: 1.41,
      },
      '763': {
        inRunFTOver: 3.38,
        inRunFTUnder: 1.42,
      },
      '764': {
        inRunFTOver: 3.37,
        inRunFTUnder: 1.42,
      },
      '765': {
        inRunFTOver: 3.26,
        inRunFTUnder: 1.44,
      },
      '766': {
        inRunFTOver: 3.23,
        inRunFTUnder: 1.45,
      },
      '767': {
        inRunFTOver: 3.23,
        inRunFTUnder: 1.45,
      },
      '768': {
        inRunFTOver: 3.22,
        inRunFTUnder: 1.45,
      },
      '769': {
        inRunFTOver: 3.22,
        inRunFTUnder: 1.45,
      },
      '770': {
        inRunFTOver: 3.17,
        inRunFTUnder: 1.46,
      },
      '771': {
        inRunFTOver: 3.1,
        inRunFTUnder: 1.48,
      },
      '772': {
        inRunFTOver: 3.13,
        inRunFTUnder: 1.47,
      },
      '773': {
        inRunFTOver: 3.08,
        inRunFTUnder: 1.48,
      },
      '774': {
        inRunFTOver: 3.06,
        inRunFTUnder: 1.49,
      },
      '775': {
        inRunFTOver: 3.02,
        inRunFTUnder: 1.5,
      },
      '776': {
        inRunFTOver: 3,
        inRunFTUnder: 1.5,
      },
      '777': {
        inRunFTOver: 2.94,
        inRunFTUnder: 1.52,
      },
      '778': {
        inRunFTOver: 2.97,
        inRunFTUnder: 1.51,
      },
      '779': {
        inRunFTOver: 2.94,
        inRunFTUnder: 1.51,
      },
      '780': {
        inRunFTOver: 2.91,
        inRunFTUnder: 1.52,
      },
      '781': {
        inRunFTOver: 2.87,
        inRunFTUnder: 1.53,
      },
      '782': {
        inRunFTOver: 2.85,
        inRunFTUnder: 1.54,
      },
      '783': {
        inRunFTOver: 2.82,
        inRunFTUnder: 1.55,
      },
      '784': {
        inRunFTOver: 2.82,
        inRunFTUnder: 1.55,
      },
      '785': {
        inRunFTOver: 2.77,
        inRunFTUnder: 1.56,
      },
      '786': {
        inRunFTOver: 2.76,
        inRunFTUnder: 1.57,
      },
      '787': {
        inRunFTOver: 2.75,
        inRunFTUnder: 1.57,
      },
      '788': {
        inRunFTOver: 2.7,
        inRunFTUnder: 1.59,
      },
      '789': {
        inRunFTOver: 2.71,
        inRunFTUnder: 1.58,
      },
      '790': {
        inRunFTOver: 2.65,
        inRunFTUnder: 1.61,
      },
      '791': {
        inRunFTOver: 2.65,
        inRunFTUnder: 1.61,
      },
      '792': {
        inRunFTOver: 2.62,
        inRunFTUnder: 1.62,
      },
      '793': {
        inRunFTOver: 2.64,
        inRunFTUnder: 1.61,
      },
      '794': {
        inRunFTOver: 2.58,
        inRunFTUnder: 1.63,
      },
      '795': {
        inRunFTOver: 2.58,
        inRunFTUnder: 1.63,
      },
      '796': {
        inRunFTOver: 2.56,
        inRunFTUnder: 1.64,
      },
      '797': {
        inRunFTOver: 2.5,
        inRunFTUnder: 1.67,
      },
      '798': {
        inRunFTOver: 2.51,
        inRunFTUnder: 1.66,
      },
      '799': {
        inRunFTOver: 2.5,
        inRunFTUnder: 1.67,
      },
      '800': {
        inRunFTOver: 2.47,
        inRunFTUnder: 1.68,
      },
      '801': {
        inRunFTOver: 2.45,
        inRunFTUnder: 1.69,
      },
      '802': {
        inRunFTOver: 2.45,
        inRunFTUnder: 1.69,
      },
      '803': {
        inRunFTOver: 2.41,
        inRunFTUnder: 1.71,
      },
      '804': {
        inRunFTOver: 2.38,
        inRunFTUnder: 1.72,
      },
      '805': {
        inRunFTOver: 2.38,
        inRunFTUnder: 1.73,
      },
      '806': {
        inRunFTOver: 2.35,
        inRunFTUnder: 1.74,
      },
      '807': {
        inRunFTOver: 2.35,
        inRunFTUnder: 1.74,
      },
      '808': {
        inRunFTOver: 2.32,
        inRunFTUnder: 1.76,
      },
      '809': {
        inRunFTOver: 2.32,
        inRunFTUnder: 1.76,
      },
      '810': {
        inRunFTOver: 2.31,
        inRunFTUnder: 1.76,
      },
      '811': {
        inRunFTOver: 2.28,
        inRunFTUnder: 1.78,
      },
      '812': {
        inRunFTOver: 2.28,
        inRunFTUnder: 1.78,
      },
      '813': {
        inRunFTOver: 2.25,
        inRunFTUnder: 1.8,
      },
      '814': {
        inRunFTOver: 2.25,
        inRunFTUnder: 1.8,
      },
      '815': {
        inRunFTOver: 2.21,
        inRunFTUnder: 1.83,
      },
      '816': {
        inRunFTOver: 2.21,
        inRunFTUnder: 1.83,
      },
      '817': {
        inRunFTOver: 2.2,
        inRunFTUnder: 1.83,
      },
      '818': {
        inRunFTOver: 2.19,
        inRunFTUnder: 1.84,
      },
      '819': {
        inRunFTOver: 2.15,
        inRunFTUnder: 1.87,
      },
      '820': {
        inRunFTOver: 2.15,
        inRunFTUnder: 1.87,
      },
      '821': {
        inRunFTOver: 2.12,
        inRunFTUnder: 1.89,
      },
      '822': {
        inRunFTOver: 2.11,
        inRunFTUnder: 1.9,
      },
      '823': {
        inRunFTOver: 2.11,
        inRunFTUnder: 1.9,
      },
      '824': {
        inRunFTOver: 2.1,
        inRunFTUnder: 1.91,
      },
      '825': {
        inRunFTOver: 2.07,
        inRunFTUnder: 1.93,
      },
      '826': {
        inRunFTOver: 2.04,
        inRunFTUnder: 1.96,
      },
      '827': {
        inRunFTOver: 2.07,
        inRunFTUnder: 1.93,
      },
      '828': {
        inRunFTOver: 2.04,
        inRunFTUnder: 1.97,
      },
      '829': {
        inRunFTOver: 2.03,
        inRunFTUnder: 1.97,
      },
      '830': {
        inRunFTOver: 2.02,
        inRunFTUnder: 1.98,
      },
      '831': {
        inRunFTOver: 2.01,
        inRunFTUnder: 1.99,
      },
      '832': {
        inRunFTOver: 1.99,
        inRunFTUnder: 2.01,
      },
      '833': {
        inRunFTOver: 1.98,
        inRunFTUnder: 2.02,
      },
      '834': {
        inRunFTOver: 1.95,
        inRunFTUnder: 2.05,
      },
      '835': {
        inRunFTOver: 1.96,
        inRunFTUnder: 2.05,
      },
      '836': {
        inRunFTOver: 1.93,
        inRunFTUnder: 2.08,
      },
      '837': {
        inRunFTOver: 1.91,
        inRunFTUnder: 2.09,
      },
      '838': {
        inRunFTOver: 1.92,
        inRunFTUnder: 2.09,
      },
      '839': {
        inRunFTOver: 1.9,
        inRunFTUnder: 2.11,
      },
      '840': {
        inRunFTOver: 1.89,
        inRunFTUnder: 2.12,
      },
      '841': {
        inRunFTOver: 1.86,
        inRunFTUnder: 2.16,
      },
      '842': {
        inRunFTOver: 1.87,
        inRunFTUnder: 2.15,
      },
      '843': {
        inRunFTOver: 1.85,
        inRunFTUnder: 2.18,
      },
      '844': {
        inRunFTOver: 1.86,
        inRunFTUnder: 2.16,
      },
      '845': {
        inRunFTOver: 1.83,
        inRunFTUnder: 2.2,
      },
      '846': {
        inRunFTOver: 1.84,
        inRunFTUnder: 2.19,
      },
      '847': {
        inRunFTOver: 1.83,
        inRunFTUnder: 2.21,
      },
      '848': {
        inRunFTOver: 1.8,
        inRunFTUnder: 2.26,
      },
      '849': {
        inRunFTOver: 1.8,
        inRunFTUnder: 2.25,
      },
      '850': {
        inRunFTOver: 1.79,
        inRunFTUnder: 2.26,
      },
      '851': {
        inRunFTOver: 1.77,
        inRunFTUnder: 2.29,
      },
      '852': {
        inRunFTOver: 1.77,
        inRunFTUnder: 2.3,
      },
      '853': {
        inRunFTOver: 1.75,
        inRunFTUnder: 2.33,
      },
      '854': {
        inRunFTOver: 1.75,
        inRunFTUnder: 2.33,
      },
      '855': {
        inRunFTOver: 1.74,
        inRunFTUnder: 2.34,
      },
      '856': {
        inRunFTOver: 1.73,
        inRunFTUnder: 2.36,
      },
      '857': {
        inRunFTOver: 1.72,
        inRunFTUnder: 2.39,
      },
      '858': {
        inRunFTOver: 1.71,
        inRunFTUnder: 2.42,
      },
      '859': {
        inRunFTOver: 1.7,
        inRunFTUnder: 2.42,
      },
      '860': {
        inRunFTOver: 1.69,
        inRunFTUnder: 2.44,
      },
      '861': {
        inRunFTOver: 1.69,
        inRunFTUnder: 2.46,
      },
      '862': {
        inRunFTOver: 1.68,
        inRunFTUnder: 2.47,
      },
      '863': {
        inRunFTOver: 1.66,
        inRunFTUnder: 2.52,
      },
      '864': {
        inRunFTOver: 1.67,
        inRunFTUnder: 2.5,
      },
      '865': {
        inRunFTOver: 1.64,
        inRunFTUnder: 2.56,
      },
      '866': {
        inRunFTOver: 1.65,
        inRunFTUnder: 2.53,
      },
      '867': {
        inRunFTOver: 1.64,
        inRunFTUnder: 2.57,
      },
      '868': {
        inRunFTOver: 1.62,
        inRunFTUnder: 2.62,
      },
      '869': {
        inRunFTOver: 1.62,
        inRunFTUnder: 2.6,
      },
      '870': {
        inRunFTOver: 1.61,
        inRunFTUnder: 2.63,
      },
      '871': {
        inRunFTOver: 1.62,
        inRunFTUnder: 2.62,
      },
      '872': {
        inRunFTOver: 1.59,
        inRunFTUnder: 2.68,
      },
      '873': {
        inRunFTOver: 1.59,
        inRunFTUnder: 2.71,
      },
      '874': {
        inRunFTOver: 1.58,
        inRunFTUnder: 2.71,
      },
      '875': {
        inRunFTOver: 1.58,
        inRunFTUnder: 2.72,
      },
      '876': {
        inRunFTOver: 1.57,
        inRunFTUnder: 2.75,
      },
      '877': {
        inRunFTOver: 1.54,
        inRunFTUnder: 2.84,
      },
      '878': {
        inRunFTOver: 1.55,
        inRunFTUnder: 2.83,
      },
      '879': {
        inRunFTOver: 1.55,
        inRunFTUnder: 2.82,
      },
      '880': {
        inRunFTOver: 1.55,
        inRunFTUnder: 2.83,
      },
      '881': {
        inRunFTOver: 1.54,
        inRunFTUnder: 2.87,
      },
      '882': {
        inRunFTOver: 1.53,
        inRunFTUnder: 2.88,
      },
      '883': {
        inRunFTOver: 1.52,
        inRunFTUnder: 2.94,
      },
      '884': {
        inRunFTOver: 1.51,
        inRunFTUnder: 2.94,
      },
      '885': {
        inRunFTOver: 1.5,
        inRunFTUnder: 3.01,
      },
      '886': {
        inRunFTOver: 1.49,
        inRunFTUnder: 3.05,
      },
      '887': {
        inRunFTOver: 1.49,
        inRunFTUnder: 3.04,
      },
      '888': {
        inRunFTOver: 1.5,
        inRunFTUnder: 3,
      },
      '889': {
        inRunFTOver: 1.48,
        inRunFTUnder: 3.1,
      },
      '890': {
        inRunFTOver: 1.47,
        inRunFTUnder: 3.15,
      },
      '891': {
        inRunFTOver: 1.47,
        inRunFTUnder: 3.12,
      },
      '892': {
        inRunFTOver: 1.46,
        inRunFTUnder: 3.16,
      },
      '893': {
        inRunFTOver: 1.45,
        inRunFTUnder: 3.22,
      },
      '894': {
        inRunFTOver: 1.46,
        inRunFTUnder: 3.2,
      },
      '895': {
        inRunFTOver: 1.45,
        inRunFTUnder: 3.24,
      },
      '896': {
        inRunFTOver: 1.44,
        inRunFTUnder: 3.29,
      },
      '897': {
        inRunFTOver: 1.43,
        inRunFTUnder: 3.33,
      },
      '898': {
        inRunFTOver: 1.43,
        inRunFTUnder: 3.34,
      },
      '899': {
        inRunFTOver: 1.43,
        inRunFTUnder: 3.33,
      },
      '900': {
        inRunFTOver: 1.42,
        inRunFTUnder: 3.41,
      },
      '901': {
        inRunFTOver: 1.41,
        inRunFTUnder: 3.43,
      },
      '902': {
        inRunFTOver: 1.41,
        inRunFTUnder: 3.47,
      },
      '903': {
        inRunFTOver: 1.4,
        inRunFTUnder: 3.51,
      },
      '904': {
        inRunFTOver: 1.4,
        inRunFTUnder: 3.51,
      },
      '905': {
        inRunFTOver: 1.39,
        inRunFTUnder: 3.56,
      },
      '906': {
        inRunFTOver: 1.38,
        inRunFTUnder: 3.62,
      },
      '907': {
        inRunFTOver: 1.37,
        inRunFTUnder: 3.69,
      },
      '908': {
        inRunFTOver: 1.38,
        inRunFTUnder: 3.65,
      },
      '909': {
        inRunFTOver: 1.37,
        inRunFTUnder: 3.69,
      },
      '910': {
        inRunFTOver: 1.37,
        inRunFTUnder: 3.7,
      },
      '911': {
        inRunFTOver: 1.35,
        inRunFTUnder: 3.84,
      },
      '912': {
        inRunFTOver: 1.35,
        inRunFTUnder: 3.88,
      },
      '913': {
        inRunFTOver: 1.36,
        inRunFTUnder: 3.8,
      },
      '914': {
        inRunFTOver: 1.33,
        inRunFTUnder: 3.99,
      },
      '915': {
        inRunFTOver: 1.34,
        inRunFTUnder: 3.94,
      },
      '916': {
        inRunFTOver: 1.33,
        inRunFTUnder: 3.99,
      },
      '917': {
        inRunFTOver: 1.33,
        inRunFTUnder: 4.03,
      },
      '918': {
        inRunFTOver: 1.33,
        inRunFTUnder: 4.05,
      },
      '919': {
        inRunFTOver: 1.32,
        inRunFTUnder: 4.11,
      },
      '920': {
        inRunFTOver: 1.31,
        inRunFTUnder: 4.25,
      },
      '921': {
        inRunFTOver: 1.31,
        inRunFTUnder: 4.21,
      },
      '922': {
        inRunFTOver: 1.3,
        inRunFTUnder: 4.33,
      },
      '923': {
        inRunFTOver: 1.31,
        inRunFTUnder: 4.26,
      },
      '924': {
        inRunFTOver: 1.29,
        inRunFTUnder: 4.47,
      },
      '925': {
        inRunFTOver: 1.3,
        inRunFTUnder: 4.29,
      },
      '926': {
        inRunFTOver: 1.28,
        inRunFTUnder: 4.52,
      },
      '927': {
        inRunFTOver: 1.29,
        inRunFTUnder: 4.39,
      },
      '928': {
        inRunFTOver: 1.28,
        inRunFTUnder: 4.55,
      },
      '929': {
        inRunFTOver: 1.28,
        inRunFTUnder: 4.62,
      },
      '930': {
        inRunFTOver: 1.27,
        inRunFTUnder: 4.65,
      },
      '931': {
        inRunFTOver: 1.27,
        inRunFTUnder: 4.72,
      },
      '932': {
        inRunFTOver: 1.27,
        inRunFTUnder: 4.71,
      },
      '933': {
        inRunFTOver: 1.26,
        inRunFTUnder: 4.81,
      },
      '934': {
        inRunFTOver: 1.25,
        inRunFTUnder: 4.97,
      },
      '935': {
        inRunFTOver: 1.26,
        inRunFTUnder: 4.79,
      },
      '936': {
        inRunFTOver: 1.26,
        inRunFTUnder: 4.89,
      },
      '937': {
        inRunFTOver: 1.25,
        inRunFTUnder: 4.93,
      },
      '938': {
        inRunFTOver: 1.25,
        inRunFTUnder: 5.07,
      },
      '939': {
        inRunFTOver: 1.25,
        inRunFTUnder: 5.03,
      },
      '940': {
        inRunFTOver: 1.24,
        inRunFTUnder: 5.12,
      },
      '941': {
        inRunFTOver: 1.24,
        inRunFTUnder: 5.14,
      },
      '942': {
        inRunFTOver: 1.24,
        inRunFTUnder: 5.24,
      },
      '943': {
        inRunFTOver: 1.23,
        inRunFTUnder: 5.3,
      },
      '944': {
        inRunFTOver: 1.23,
        inRunFTUnder: 5.31,
      },
      '945': {
        inRunFTOver: 1.23,
        inRunFTUnder: 5.35,
      },
      '946': {
        inRunFTOver: 1.22,
        inRunFTUnder: 5.47,
      },
      '947': {
        inRunFTOver: 1.22,
        inRunFTUnder: 5.63,
      },
      '948': {
        inRunFTOver: 1.21,
        inRunFTUnder: 5.77,
      },
      '949': {
        inRunFTOver: 1.21,
        inRunFTUnder: 5.77,
      },
      '950': {
        inRunFTOver: 1.22,
        inRunFTUnder: 5.58,
      },
      '951': {
        inRunFTOver: 1.21,
        inRunFTUnder: 5.85,
      },
      '952': {
        inRunFTOver: 1.2,
        inRunFTUnder: 6.06,
      },
      '953': {
        inRunFTOver: 1.2,
        inRunFTUnder: 6.05,
      },
      '954': {
        inRunFTOver: 1.2,
        inRunFTUnder: 6.12,
      },
      '955': {
        inRunFTOver: 1.19,
        inRunFTUnder: 6.22,
      },
      '956': {
        inRunFTOver: 1.19,
        inRunFTUnder: 6.31,
      },
      '957': {
        inRunFTOver: 1.2,
        inRunFTUnder: 6.11,
      },
      '958': {
        inRunFTOver: 1.19,
        inRunFTUnder: 6.35,
      },
      '959': {
        inRunFTOver: 1.18,
        inRunFTUnder: 6.54,
      },
      '960': {
        inRunFTOver: 1.19,
        inRunFTUnder: 6.32,
      },
      '961': {
        inRunFTOver: 1.17,
        inRunFTUnder: 6.79,
      },
      '962': {
        inRunFTOver: 1.18,
        inRunFTUnder: 6.7,
      },
      '963': {
        inRunFTOver: 1.17,
        inRunFTUnder: 7.04,
      },
      '964': {
        inRunFTOver: 1.17,
        inRunFTUnder: 6.87,
      },
      '965': {
        inRunFTOver: 1.17,
        inRunFTUnder: 6.92,
      },
      '966': {
        inRunFTOver: 1.17,
        inRunFTUnder: 7.05,
      },
      '967': {
        inRunFTOver: 1.16,
        inRunFTUnder: 7.27,
      },
      '968': {
        inRunFTOver: 1.16,
        inRunFTUnder: 7.29,
      },
      '969': {
        inRunFTOver: 1.16,
        inRunFTUnder: 7.37,
      },
      '970': {
        inRunFTOver: 1.15,
        inRunFTUnder: 7.57,
      },
      '971': {
        inRunFTOver: 1.15,
        inRunFTUnder: 7.82,
      },
      '972': {
        inRunFTOver: 1.14,
        inRunFTUnder: 8.02,
      },
      '973': {
        inRunFTOver: 1.14,
        inRunFTUnder: 8.05,
      },
      '974': {
        inRunFTOver: 1.15,
        inRunFTUnder: 7.75,
      },
      '975': {
        inRunFTOver: 1.15,
        inRunFTUnder: 7.83,
      },
      '976': {
        inRunFTOver: 1.13,
        inRunFTUnder: 8.66,
      },
      '977': {
        inRunFTOver: 1.14,
        inRunFTUnder: 8.38,
      },
      '978': {
        inRunFTOver: 1.13,
        inRunFTUnder: 8.48,
      },
      '979': {
        inRunFTOver: 1.12,
        inRunFTUnder: 9.05,
      },
      '980': {
        inRunFTOver: 1.13,
        inRunFTUnder: 8.88,
      },
      '981': {
        inRunFTOver: 1.13,
        inRunFTUnder: 8.6,
      },
      '982': {
        inRunFTOver: 1.13,
        inRunFTUnder: 8.84,
      },
      '983': {
        inRunFTOver: 1.13,
        inRunFTUnder: 8.53,
      },
      '984': {
        inRunFTOver: 1.13,
        inRunFTUnder: 8.8,
      },
      '985': {
        inRunFTOver: 1.11,
        inRunFTUnder: 9.72,
      },
      '986': {
        inRunFTOver: 1.12,
        inRunFTUnder: 9.51,
      },
      '987': {
        inRunFTOver: 1.12,
        inRunFTUnder: 9.5,
      },
      '988': {
        inRunFTOver: 1.12,
        inRunFTUnder: 9.13,
      },
      '989': {
        inRunFTOver: 1.12,
        inRunFTUnder: 9.19,
      },
      '990': {
        inRunFTOver: 1.11,
        inRunFTUnder: 9.83,
      },
      '991': {
        inRunFTOver: 1.11,
        inRunFTUnder: 9.71,
      },
      '992': {
        inRunFTOver: 1.11,
        inRunFTUnder: 10.44,
      },
      '993': {
        inRunFTOver: 1.1,
        inRunFTUnder: 10.71,
      },
      '994': {
        inRunFTOver: 1.11,
        inRunFTUnder: 10.15,
      },
      '995': {
        inRunFTOver: 1.1,
        inRunFTUnder: 11.43,
      },
      '996': {
        inRunFTOver: 1.11,
        inRunFTUnder: 10.44,
      },
      '997': {
        inRunFTOver: 1.1,
        inRunFTUnder: 11.1,
      },
      '998': {
        inRunFTOver: 1.1,
        inRunFTUnder: 11.29,
      },
      '999': {
        inRunFTOver: 1.09,
        inRunFTUnder: 11.58,
      },
      '1000': {
        inRunFTOver: 1.1,
        inRunFTUnder: 11.43,
      },
    },
    adjRate: {
      homeAway: 2,
      overUnder: 1.5,
    },
  }},
  { upsert: true},
);