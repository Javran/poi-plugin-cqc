import _ from 'lodash'
import { mkSimpleReducer } from 'subtender'

const initState = {
  // current airbase area, a number or 'auto'
  airbaseArea: 'auto',
  // which part to show
  showPart: {
    fleets: _.fromPairs([1,2,3,4].map(fleetId => [fleetId, true])),
    airbase: _.fromPairs([1,2,3].map(sqId => [sqId, true])),
  },
  /*
     Contrls infomation shown for each parts,
     every piece of info is a pair key-value pair: <key>: <boolean>,
     which represents whether that info needs to show.
     a missing key is the same as <key>: false.
     It's intended that the representation is an Object,
     so that info are always ordered in a consistent manner.

     TODO: note that cqc is not taking into account remaining planes,
     and we should somehow make this more clear on UI.

     TODO: part info needs to be implemented:
     fleet part info:

     - fighterPower{Min,Now,Max}: fighter power

         - postfix Min stands for no air proficiency
         - postfix Now stands for current FP
         - postfix Max stands for maximum air proficiency

     - f33: formula-33
     - tpRange: TP drain for A-rank and S-rank
     - levelSum: level sum of fleet members
     - losSum: Sum of LoS
     - antiSubSum: Sum of ASW
     - antiAirSum: Sum of AA

     airbase part info:

     - state: squadron state
     - radius: combat radius
     - fighterPower{Min,Now,Max}: same as that of fleet part
     - airDefensePower{Min,Now,Max}: air defense power

   */
  partInfo: {
    fleets: {
      1: {
        fighterPowerMin: false,
        fighterPowerNow: true,
        fighterPowerMax: false,

        f33: true,
        tpRange: true,
      },
      2: {
        levelSum: true,
        antiSubSum: true,
        antiAirSum: true,
        losSum: true,
      },
      3: {},
      4: {},
    },
    airbase: {
      1: {
        state: true,
        airDefensePowerMin: true,
        airDefensePowerCur: false,
        airDefensePowerMax: false,
        fighterPowerMin: false,
        fighterPowerNow: true,
        fighterPowerMax: false,
      },
      2: {},
      3: {},
    },
  },
}

const ACTION_MODIFY = '@@poi-plugin-cqc@Modify'

const reducer = mkSimpleReducer(
  initState,
  ACTION_MODIFY,
)

const actionCreators = {
  modify: modifier => ({
    type: ACTION_MODIFY,
    modifier,
  }),
}

export {
  initState,
  reducer,
  actionCreators,
}
