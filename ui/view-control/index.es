import { modifyObject, not } from 'subtender'
import { createStructuredSelector } from 'reselect'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  Position,
  ButtonGroup,
  Intent,
} from '@blueprintjs/core'

import {
  showPartSelector,
  airbaseAreaSelector,
  availableAirbaseAreasSelector,
  autoAirbaseAreaSelector,
} from '../../selectors'
import { PTyp } from '../../ptyp'
import { actionCreators } from '../../store'

const boolToIntent = x => x ? Intent.PRIMARY : Intent.NONE

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

  handleSelectAirbaseArea = area => () =>
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

    const areaMenuContent = (
      <Menu>
        <MenuItem
          key="auto"
          onClick={this.handleSelectAirbaseArea('auto')}
          text={(
            <span style={airbaseArea === 'auto' ? {fontWeight: 'bold'} : {}}>
              {`Auto (World ${autoAirbaseArea})`}
            </span>
          )}
        />
        {
          availableAreas.map(areaId => (
            <MenuItem
              key={areaId}
              onClick={this.handleSelectAirbaseArea(areaId)}
              text={(
                <span style={airbaseArea === areaId ? {fontWeight: 'bold'} : {}}>
                  {`World ${areaId}`}
                </span>
              )}
            />
          ))
        }
      </Menu>
    )

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
                intent={boolToIntent(showPart.fleets[fleetId])}
                style={{marginTop: 0}}
              >
                {`Fleet #${fleetId}`}
              </Button>
            ))
          }
        </ButtonGroup>
        <ButtonGroup
          style={{marginTop: 5}}
        >
          <Popover
            content={areaMenuContent}
            position={Position.BOTTOM}
          >
            <Button
              style={{marginTop: 0, minWidth: '5em'}}
            >
              {areaText}
            </Button>
          </Popover>
          {
            [1,2,3].map(sqId => (
              <Button
                style={{marginTop: 0}}
                onClick={this.handleToggleSquadron(sqId)}
                intent={boolToIntent(showPart.airbase[sqId])}
                key={sqId}>
                {`Sq #${sqId}`}
              </Button>
            ))
          }
        </ButtonGroup>
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
  actionCreators
)(ViewControlImpl)

export { ViewControl }
