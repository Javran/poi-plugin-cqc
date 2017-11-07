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
