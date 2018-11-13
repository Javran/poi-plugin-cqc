import _ from 'lodash'
import { createSelector } from 'reselect'

import {
  constSelector,
  equipsSelector,
  shipsSelector,
  fleetsSelector,
  extensionSelectorFactory,
  basicSelector,
  configSelector as poiConfSelector,
} from 'views/utils/selectors'

import { initState } from './store'

const latestVersion = '0.0.1'

const extSelector = createSelector(
  extensionSelectorFactory('poi-plugin-cqc'),
  ext => _.isEmpty(ext) ? initState : ext
)

const poiAirbaseSelector = state => state.info.airbase

const airbaseAreaSelector = createSelector(
  extSelector,
  ext => ext.airbaseArea
)

const showPartSelector = createSelector(
  extSelector,
  ext => ext.showPart
)

const availableAirbaseAreasSelector = createSelector(
  poiAirbaseSelector,
  airbase =>
    _.sortedUniq(
      (airbase || []).map(x => x.api_area_id).sort((x,y) => x-y)
    )
)

const autoAirbaseAreaSelector = createSelector(
  availableAirbaseAreasSelector,
  availableAreas =>
    availableAreas.length >= 1 ? _.last(availableAreas) : 6
)

const currentAirbaseAreaSelector = createSelector(
  airbaseAreaSelector,
  autoAirbaseAreaSelector,
  (airbaseArea, autoAirbaseArea) =>
    airbaseArea === 'auto' ? autoAirbaseArea : airbaseArea
)

const displaySlotSelector = createSelector(
  showPartSelector,
  ({displaySlot}) => displaySlot
)

/*
   XXXRep is the data representation for some structure XXX
   XXXInfo should contain everything that XXXRep has, plus those needed
   for displaying on UI.
 */

const equipInfoFuncSelector = createSelector(
  constSelector,
  equipsSelector,
  ({$equips},equips) => _.memoize(
    rstId => {
      if (!_.isInteger(rstId) || rstId <= 0)
        return null
      const equip = equips[rstId]
      if (!equip)
        return null
      const mstId = equip.api_slotitem_id
      const $equip = $equips[mstId]
      return {
        mstId,
        rstId,
        ace: _.get(equip,'api_alv',null),
        imp: equip.api_level,
        // Info only:
        name: $equip.api_name,
        iconId: $equip.api_type[3],
        isPlane: [6, 7, 8, 9, 10, 21, 22, 33, 43].includes($equip.api_type[3]),
      }
    }
  )
)

const shipInfoFuncSelector = createSelector(
  constSelector,
  shipsSelector,
  equipInfoFuncSelector,
  ({$ships}, ships, equipInfoFunc) => _.memoize(
    rstId => {
      if (!_.isInteger(rstId) || rstId <= 0)
        return null
      const ship = ships[rstId]
      if (!ship)
        return null
      const mstId = ship.api_ship_id
      const $ship = $ships[mstId]
      const luck = ship.api_lucky[0]
      if (!$ship)
        return null
      return {
        mstId,
        rstId,
        level: ship.api_lv,
        luck,
        aswE: ship.api_taisen[0],
        hp: ship.api_maxhp,
        slots: _.compact(ship.api_slot.map(equipInfoFunc)),
        exSlot: equipInfoFunc(ship.api_slot_ex),
        planeSlots: ship.api_onslot,

        // Info only:
        name: $ship.api_name,
        showLuck: luck !== $ship.api_luck[0],
      }
    }
  )
)

const fleetInfoFuncSelector = createSelector(
  fleetsSelector,
  shipInfoFuncSelector,
  (fleets, shipInfoFunc) => _.memoize(
    fleetId => {
      const rawFleet = fleets.find(x => x.api_id === fleetId)
      if (
        !rawFleet ||
        // not valid raw fleet
        !('api_name' in rawFleet) ||
        !('api_ship' in rawFleet) ||
        // api_ship = -1 (no fleet member)
        !Array.isArray(rawFleet.api_ship) ||
        // all members are invalid
        rawFleet.api_ship.every(id => id <= 0)
      ) {
        return null
      }
      const shipIds =
        rawFleet.api_ship.filter(rId => rId > 0)
      return {
        name: rawFleet.api_name,
        ships: shipIds.map(shipInfoFunc),

        // Info only:
        key: fleetId,
      }
    }
  )
)

const squadronInfoFuncSelector = createSelector(
  currentAirbaseAreaSelector,
  equipInfoFuncSelector,
  poiAirbaseSelector,
  (airbaseArea, equipInfoFunc, poiAirbase) => _.memoize(
    sqId => {
      const squadron = poiAirbase.find(s =>
        s.api_area_id === airbaseArea &&
        s.api_rid === sqId
      )
      if (
        !squadron ||
        !Array.isArray(squadron.api_plane_info)
      )
        return null
      const equipIds = squadron.api_plane_info.map(x =>
        x.api_slotid
      ).filter(rId => rId >= 0)
      if (equipIds.length === 0)
        return null
      return {
        name: squadron.api_name,
        slots: equipIds.map(equipInfoFunc),

        // Info only:
        key: sqId,
      }
    }
  )
)

const currentCompoInfoSelector = createSelector(
  fleetInfoFuncSelector,
  showPartSelector,
  squadronInfoFuncSelector,
  basicSelector,
  (fleetInfoFunc, showPart, squadronInfoFunc, basic) => ({
    version: latestVersion,
    hqLevel: _.isInteger(basic.api_level) ? basic.api_level : null,
    fleets: _.compact(
      [1,2,3,4].map(fleetId =>
        showPart.fleets[fleetId] ? fleetInfoFunc(fleetId) : null
      )
    ),
    airbase: _.compact(
      [1,2,3].map(sqId =>
        showPart.airbase[sqId] ? squadronInfoFunc(sqId) : null
      )
    ),
  })
)

const themeSelector = createSelector(
  poiConfSelector,
  conf => _.get(conf, 'poi.theme', 'paperdark')
)

export {
  extSelector,
  airbaseAreaSelector,
  displaySlotSelector,
  autoAirbaseAreaSelector,
  availableAirbaseAreasSelector,
  currentAirbaseAreaSelector,
  showPartSelector,
  currentCompoInfoSelector,
  themeSelector,
}
