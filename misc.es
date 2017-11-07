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

export {
  cqcToDeckBuilder,
}
