import { modifyObject, not } from 'subtender'
import { createStructuredSelector } from 'reselect'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  DropdownButton,
  MenuItem,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from 'react-bootstrap'

import {
  showPartSelector,
  airbaseAreaSelector,
  availableAirbaseAreasSelector,
  autoAirbaseAreaSelector,
} from '../../selectors'
import { PTyp } from '../../ptyp'
import { actionCreators } from '../../store'

class ViewControlImpl extends PureComponent {
  static propTypes = {
    showPart: PTyp.object.isRequired,
    airbaseArea:
      PTyp.oneOfType([
        PTyp.oneOf(['auto']),
        PTyp.number,
      ]).isRequired,
    availableAreas: PTyp.array.isRequired,
    autoAirbaseArea: PTyp.number.isRequired,
    modify: PTyp.func.isRequired,
  }

  handleSelectAirbaseArea = area =>
    this.props.modify(modifyObject('airbaseArea', () => area))

  handleToggleSquadron = sqId => () =>
    this.props.modify(
      modifyObject(
        'showPart',
        modifyObject(
          'airbase',
          modifyObject(sqId, not)
        )
      )
    )

  handleToggleFleet = fleetId => () =>
    this.props.modify(
      modifyObject(
        'showPart',
        modifyObject(
          'fleets',
          modifyObject(fleetId, not)
        )
      )
    )

  render() {
    const {
      showPart,
      airbaseArea, availableAreas, autoAirbaseArea,
    } = this.props

    const areaText = airbaseArea === 'auto' ?
      `Auto (World ${autoAirbaseArea})` :
      `World ${airbaseArea}`
    return (
      <div
        style={{
          marginTop: 5,
          marginBottom: 5,
        }}>
        <ButtonGroup>
          {
            [1,2,3,4].map(fleetId => (
              <Button
                key={fleetId}
                onClick={this.handleToggleFleet(fleetId)}
                bsStyle={showPart.fleets[fleetId] ? 'primary' : 'default'}
                style={{marginTop: 0}}
              >
                {`Fleet #${fleetId}`}
              </Button>
            ))
          }
        </ButtonGroup>
        <ButtonToolbar
          style={{marginTop: 5}}
        >
          <DropdownButton
            style={{width: '10em', marginTop: 0}}
            id="plugin-cqc-airbase-select"
            title={areaText}
            onSelect={this.handleSelectAirbaseArea}
          >
            <MenuItem
              eventKey="auto"
              key="auto">
              <span style={airbaseArea === 'auto' ? {fontWeight: 'bold'} : {}}>
                {`Auto (World ${autoAirbaseArea})`}
              </span>
            </MenuItem>
            {
              availableAreas.map(areaId => (
                <MenuItem
                  eventKey={areaId}
                  key={areaId}>
                  <span style={airbaseArea === areaId ? {fontWeight: 'bold'} : {}}>
                    {`World ${areaId}`}
                  </span>
                </MenuItem>
              ))
            }
          </DropdownButton>
          <ButtonGroup>
            {
              [1,2,3].map(sqId => (
                <Button
                  style={{marginTop: 0}}
                  onClick={this.handleToggleSquadron(sqId)}
                  bsStyle={showPart.airbase[sqId] ? 'primary' : 'default'}
                  key={sqId}>
                  {`Sq #${sqId}`}
                </Button>
              ))
            }
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}

const ViewControl = connect(
  createStructuredSelector({
    showPart: showPartSelector,
    // user current setting
    airbaseArea: airbaseAreaSelector,
    // all available areas
    availableAreas: availableAirbaseAreasSelector,
    // airbase area that 'auto' would have picked
    autoAirbaseArea: autoAirbaseAreaSelector,
  }),
  actionCreators,
)(ViewControlImpl)

export { ViewControl }
