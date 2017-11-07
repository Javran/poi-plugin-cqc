import React, { PureComponent } from 'react'
import { Panel } from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { EquipViewer } from './equip-viewer'

class SquadronViewer extends PureComponent {
  static propTypes = {
    squadron: PTyp.object.isRequired,
  }

  render() {
    const {squadron} = this.props
    return (
      <Panel
        className="squadron-viewer"
        header={squadron.name}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {
            squadron.slots.map(equip => (
              <EquipViewer
                key={equip.rstId}
                equip={equip}
                style={{width: '48%'}}
              />
            ))
          }
        </div>
      </Panel>
    )
  }
}

export { SquadronViewer }
