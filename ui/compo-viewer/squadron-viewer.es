import _ from 'lodash'
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
      >
        <Panel.Heading>
          {squadron.name}
        </Panel.Heading>
        <Panel.Body>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {
              _.compact(squadron.slots).map(equip => (
                <EquipViewer
                  key={equip.rstId}
                  equip={equip}
                  style={{width: '48%'}}
                />
              ))
            }
          </div>
        </Panel.Body>
      </Panel>
    )
  }
}

export { SquadronViewer }
