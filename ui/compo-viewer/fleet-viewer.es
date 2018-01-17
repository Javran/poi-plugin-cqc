import React, { PureComponent } from 'react'
import { Panel } from 'react-bootstrap'
import { PTyp } from '../../ptyp'
import { ShipViewer } from './ship-viewer'

class FleetViewer extends PureComponent {
  static propTypes = {
    fleet: PTyp.object.isRequired,
  }

  render() {
    const {fleet} = this.props
    return (
      <Panel
        className="fleet-viewer"
      >
        <Panel.Heading>
          {fleet.name}
        </Panel.Heading>
        <Panel.Body>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {
              fleet.ships.map(ship => (
                <ShipViewer
                  key={ship.rstId}
                  ship={ship}
                  style={{
                    width: '12em',
                    marginBottom: 2,
                    marginRight: 2,
                  }}
                />
              ))
            }
          </div>
        </Panel.Body>
      </Panel>
    )
  }
}

export { FleetViewer }
