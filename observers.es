import _ from 'lodash'
import { observe, observer } from 'redux-observers'
import { store } from 'views/create-store'
import shallowEqual from 'shallowequal'
import {
  createSelector,
  createStructuredSelector,
} from 'reselect'
import { extSelector } from './selectors'
import { savePState, pStateSelector } from './p-state'

const extReadySelector = createSelector(
  extSelector,
  ext => ext.ready
)

const debouncedSavePState = _.debounce(
  pState => setTimeout(() =>
    savePState(pState)),
  500)

const pStateSaver = observer(
  createStructuredSelector({
    ready: extReadySelector,
    pState: pStateSelector,
  }),
  (_dispatch, cur, prev) => {
    if (
      // 'ready' flag is stayed true
      (cur.ready === true && prev.ready === true) &&
      !shallowEqual(cur.pState,prev.pState)
    ) {
      const {pState} = cur
      debouncedSavePState(pState)
    }
  }
)

let unsubscribe = null

const globalSubscribe = () => {
  if (unsubscribe !== null) {
    console.warn('expecting "unsubscribe" to be null')
    if (typeof unsubscribe === 'function')
      unsubscribe()
    unsubscribe = null
  }

  unsubscribe = observe(
    store,
    [pStateSaver]
  )
}

const globalUnsubscribe = () => {
  if (typeof unsubscribe !== 'function') {
    console.warn('unsubscribe is not a function')
  } else {
    unsubscribe()
  }
  unsubscribe = null
}

export {
  globalSubscribe,
  globalUnsubscribe,
}
