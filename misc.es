import _ from 'lodash'

const cqcToDeckBuilder = cqc => {
  const fleets = _.compact(cqc.fleets)
  const dFleets = _.fromPairs(
    fleets.map((fleet,ind) => {
      const dShips = _.fromPairs(
        _.compact(fleet.ships).map((ship,sInd) => {
          const id = ship.mstId
          const lv = _.isInteger(ship.level) ? ship.level : 99
          const luck = _.isInteger(ship.luck) ? ship.luck : -1
          const convertEquip = equip => {
            const dEquip = {id: equip.mstId}
            if (_.isInteger(equip.imp)) {
              dEquip.rf = equip.imp
            }
            if (_.isInteger(equip.ace)) {
              dEquip.mas = equip.ace
            }
            return dEquip
          }
          const items = _.fromPairs(
            _.compact(ship.slots).map((equip,eInd) =>
              [`i${eInd+1}`, convertEquip(equip)]
            )
          )
          if (ship.exSlot) {
            items.ix = convertEquip(ship.exSlot)
          }
          return [`s${sInd+1}`, {id, lv, luck, items}]
        })
      )

      return [`f${ind+1}`, dShips]
    })
  )

  return {
    version: 4,
    ...dFleets,
  }
}

const cqcToWctf = cqc => {
  const wFleetArr = [1,2,3,4].map(fleetId => {
    const fleet = _.get(cqc,['fleets',fleetId-1])
    if (!fleet)
      return []
    const ships = _.compact(fleet.ships)
    const convertShip = ship => {
      const {mstId,level,luck,slots,exSlot} = ship
      const wEquipInfoArr =
        [0,1,2,3,'ex'].map(ind => {
          const e =
            ind === 'ex' ? exSlot : slots[ind]
          if (!e)
            return null
          return {
            mstId: e.mstId,
            imp: _.isInteger(e.imp) ? e.imp : null,
            ace: _.isInteger(e.ace) ? e.ace : null,
          }
        })
      return [
        mstId,
        [level,luck],
        // Array of mstId
        wEquipInfoArr.map(x => !x ? null : x.mstId),
        // Array of imp
        wEquipInfoArr.map(x => !x ? null : x.imp),
        // Array of ace
        wEquipInfoArr.map(x => !x ? null : x.ace),
      ]
    }
    return ships.map(convertShip)
  })

  const wAirbase = [1,2,3].map(sqId => {
    const squadron = _.get(cqc,['airbase',sqId-1])
    if (!squadron || !Array.isArray(squadron.slots))
      return []
    const convertEquip = equip => {
      const {mstId, ace, imp} = equip
      return [mstId, _.isInteger(ace) ? ace : 0, _.isInteger(imp) ? imp : 0]
    }
    return squadron.slots.map(convertEquip)
  })

  return {
    name: cqc.name || '',
    name_airfields: [1,2,3].map(sqId =>
      _.get(cqc.airbase,[sqId-1,'name'],null) || ''
    ),
    hq_lv: _.isInteger(cqc.hqLevel) ? cqc.hqLevel : -1,
    data: [...wFleetArr, wAirbase],
  }
}

export {
  cqcToDeckBuilder,
  cqcToWctf,
}
