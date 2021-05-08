import React, { PureComponent } from 'react'
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

class SlotDisplayControl extends PureComponent {
  render() {
    return (
      <DropdownButton
        style={{marginTop: 0, minWidth: '5em'}}
        id="plugin-cqc-display-slot"
        title={
          <span>
            <FontAwesome name="plane" />
            <FontAwesome name="times" />
          </span>
        }
      >
        <MenuItem>
          Hidden
        </MenuItem>
        <MenuItem>
          Maximum
        </MenuItem>
        <MenuItem>
          Current
        </MenuItem>
      </DropdownButton>
    )
  }
}

export {
  SlotDisplayControl,
}
