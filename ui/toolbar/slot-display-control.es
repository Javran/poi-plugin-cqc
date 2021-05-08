import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { modifyObject } from 'subtender'
import {
  displaySlotSelector,
} from '../../selectors'
import { PTyp } from '../../ptyp'
import { mapDispatchToProps } from '../../store'

@connect(
  s => ({displaySlot: displaySlotSelector(s)}),
  mapDispatchToProps
)
class SlotDisplayControl extends PureComponent {
  static propTypes = {
    // connected:
    displaySlot: PTyp.DisplaySlot.isRequired,
    modify: PTyp.func.isRequired,
  }

  handleChangeDisplaySlot = newVal => () => {
    const {modify} = this.props
    modify(
      modifyObject(
        'showPart',
        modifyObject('displaySlot', () => newVal)
      )
    )
  }

  render() {
    const {displaySlot} = this.props
    return (
      <DropdownButton
        style={{marginTop: 0, minWidth: '5em'}}
        id="plugin-cqc-display-slot"
        title={
          <span>
            <FontAwesome name="plane" />
            {
              displaySlot === false ? (<FontAwesome name="times" />) :
              displaySlot === 'max' ? (<FontAwesome name="battery-full" />) :
              displaySlot === 'current' ? (<FontAwesome name="battery-half" />) :
              false
            }
          </span>
        }
      >
        {
          [
            ['Hidden', false],
            ['Maximum', 'max'],
            ['Current', 'current'],
          ].map(([desc, val]) =>
            (
              <MenuItem
                key={val}
                onClick={this.handleChangeDisplaySlot(val)}
              >
                <span
                  style={displaySlot === val ? {fontWeight: 'bold'} : null}
                >
                  {desc}
                </span>
              </MenuItem>
            )
          )
        }
      </DropdownButton>
    )
  }
}

export {
  SlotDisplayControl,
}
