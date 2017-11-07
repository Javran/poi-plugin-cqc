import React, { PureComponent } from 'react'
import { PTyp } from '../../ptyp'
import { EquipViewer } from './equip-viewer'

class ShipViewer extends PureComponent {
  static propTypes = {
    ship: PTyp.object.isRequired,
    style: PTyp.object.isRequired,
  }

  render() {
    const {ship, style} = this.props
    return (
      <div style={style}>
        <div style={{fontWeight: 'bold'}}>{ship.name}</div>
        <div style={{fontSize: '90%'}}>
          <span>Lv. {ship.level}</span>
          {
            ship.showLuck && (
              <span style={{marginLeft: '.5em'}}>
                Luck: {ship.luck}
              </span>
            )
          }
          {
            ship.slots.map(equip => (
              <EquipViewer
                key={equip.rstId}
                equip={equip}
                style={{}}
              />
            ))
          }
          {
            ship.exSlot && (
              <EquipViewer
                key="ex"
                equip={ship.exSlot}
                style={{}}
                extra={true}
              />
            )
          }
        </div>
      </div>
    )
  }
}

export { ShipViewer }
