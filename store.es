import _ from 'lodash'
import { mkSimpleReducer } from 'subtender'
import { bindActionCreators } from 'redux'
import { store } from 'views/create-store'

const initState = {
  // whether persistent state has been loaded.
  ready: false,
  // current airbase area, a number or 'auto'
  airbaseArea: 'auto',
  // which part to show
  showPart: {
    fleets: _.fromPairs([1,2,3,4].map(fleetId => [fleetId, true])),
    airbase: _.fromPairs([1,2,3].map(sqId => [sqId, true])),
    /*
      displaySlot:
      - false: don't display
      - 'max': slot num from $ship
      - 'current': slot num from ship
     */
    displaySlot: false,
  },
  /*
     Contrls infomation shown for each parts,
     every piece of info is a pair key-value pair: <key>: <boolean>,
     which represents whether that info needs to show.
     a missing key is the same as <key>: false.
     It's intended that the representation is an Object,
     so that info are always ordered in a consistent manner.
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const boundActionCreators =
  mapDispatchToProps(store.dispatch)

export {
  initState,
  reducer,
  actionCreators,
  boundActionCreators,
}
