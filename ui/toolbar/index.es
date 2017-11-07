import domtoimage from 'dom-to-image'
import { createStructuredSelector } from 'reselect'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  ButtonToolbar,
  Button,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { PTyp } from '../../ptyp'
import { currentCompoInfoSelector } from '../../selectors'
import { cqcToDeckBuilder } from '../../misc'

const { remote } = window

class ToolbarImpl extends PureComponent {
  static propTypes = {
    compo: PTyp.object.isRequired,
    getViewRef: PTyp.func.isRequired,
  }

  handleRenderScreenshot = () => {
    const {getViewRef} = this.props
    const viewRef = getViewRef()
    if (viewRef) {
      domtoimage
        .toPng(viewRef)
        .then(dataUrl => {
          remote.getCurrentWebContents().downloadURL(dataUrl)
        })
    }
  }

  handleExportDeckBuilder = () => {
    const {compo} = this.props
    console.log(JSON.stringify(cqcToDeckBuilder(compo)))
  }

  render() {
    return (
      <ButtonToolbar>
        <Button
          onClick={this.handleRenderScreenshot}
          style={{marginTop: 0, minWidth: '5em'}}>
          <FontAwesome name="camera-retro" />
        </Button>
        <DropdownButton
          style={{marginTop: 0, minWidth: '5em'}}
          id="plugin-cqc-export"
          title={<FontAwesome name="external-link" />}
        >
          <MenuItem
            onClick={this.handleExportDeckBuilder}
          >
            DeckBuilder
          </MenuItem>
          <MenuItem
          >
            DeckBuilder (Clipboard)
          </MenuItem>
          <MenuItem>
            WhoCallsTheFleet
          </MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    )
  }
}

const Toolbar = connect(
  createStructuredSelector({
    compo: currentCompoInfoSelector,
  }),
)(ToolbarImpl)

export { Toolbar }
