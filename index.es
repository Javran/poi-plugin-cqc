import _ from 'lodash'
import { modifyObject } from 'subtender'

import { CqcMain as reactClass } from './ui'
import { reducer, boundActionCreators } from './store'
import { loadPState } from './p-state'


import {
  globalSubscribe,
  globalUnsubscribe as pluginWillUnload,
} from './observers'

// TODO: remove
import {} from './cqc'

const pluginDidLoad = () => {
  globalSubscribe()
  setTimeout(() => {
    const loaded = loadPState()
    const insertShowPart =
      (loaded && loaded.showPart) ?
        modifyObject('showPart', () => loaded.showPart) :
        _.identity

    boundActionCreators.modify(_.flow(
      insertShowPart,
      modifyObject('ready', () => true)
    ))
  })
}

export {
  pluginDidLoad,
  pluginWillUnload,

  reducer,
  reactClass,
}
