import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core'
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
    const menuContent = (
      <Menu>
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
                text={(
                  <span
                    style={displaySlot === val ? {fontWeight: 'bold'} : null}
                  >
                    {desc}
                  </span>
                )}
              />
            )
          )
        }
      </Menu>
    )
    return (
      <Popover
        content={menuContent}
        position={Position.BOTTOM}
      >
        <Button
          style={{marginTop: 0, minWidth: '5em'}}
        >
          <FontAwesome name="plane" />
          {
            displaySlot === false ? (<FontAwesome name="times" />) :
            displaySlot === 'max' ? (<FontAwesome name="battery-full" />) :
            displaySlot === 'current' ? (<FontAwesome name="battery-half" />) :
            false
          }
        </Button>
      </Popover>
    )
  }
}

export {
  SlotDisplayControl,
}
