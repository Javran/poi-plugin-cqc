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

/* eslint-disable no-console */
(() => {
  const cqc = {}
  const mkFilter = includeUnlocked =>
    includeUnlocked ?
      _.identity :
      xs => _.filter(xs, x => x.locked)

  /*
    Util functions for exporting to
    https://noro6.github.io/kcTools/manager/ or https://noro6.github.io/kc-web/#/manager
   */
  cqc.kcToolsExportShips = (includeUnlocked=false) => {
    const {getStore, copy} = window
    const state = getStore()
    const entities = _.get(state, ['info', 'ships'], {})
    const convertedEntities = mkFilter(includeUnlocked)(
      _.map(entities, s => ({
        id: s.api_ship_id,
        lv: s.api_lv,
        locked: s.api_locked,
        st: s.api_kyouka,
        exp: s.api_exp,
        ex: s.api_slot_ex,
        area: s.api_sally_area,
      })))
    copy(JSON.stringify(convertedEntities, ['id','lv','st','exp','ex','area']))
    console.log('ship data copied to clipboard')
  }

  cqc.kcToolsExportEquips = (includeUnlocked=false) => {
    const {getStore, copy} = window
    const state = getStore()
    const entities = _.get(state, ['info', 'equips'], {})
    const convertedEntities = mkFilter(includeUnlocked)(
      _.map(entities, e => ({
        id: e.api_slotitem_id,
        lv: e.api_level,
        locked: e.api_locked,
      })))
    copy(JSON.stringify(convertedEntities, ['id','lv']))
    console.log('equip data copied to clipboard')
  }

  window.cqc = cqc
})()

export {
  pluginDidLoad,
  pluginWillUnload,

  reducer,
  reactClass,
}
