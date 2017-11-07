import domtoimage from 'dom-to-image'
import { createStructuredSelector } from 'reselect'
import { compressToEncodedURIComponent } from 'lz-string'
import React, { PureComponent } from 'react'
import { shell, clipboard } from 'electron'
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
import { cqcToDeckBuilder, cqcToWctf } from '../../misc'

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
    const encoded =
      encodeURIComponent(JSON.stringify(cqcToDeckBuilder(compo)))
    shell.openExternal(`http://kancolle-calc.net/deckbuilder.html?predeck=${encoded}`)
  }

  handleExportDeckBuilderClipboard = () => {
    const {compo} = this.props
    const encoded = JSON.stringify(cqcToDeckBuilder(compo))
    clipboard.writeText(encoded)
    const {success} = window
    success(`Copied to clipboard (${new Date()})`)
  }

  handleExportWctf = () => {
    const {compo} = this.props
    const wData = cqcToWctf(compo)
    const encoded = compressToEncodedURIComponent(JSON.stringify(wData))
    const rnd = Number(new Date())
    shell.openExternal(`http://fleet.diablohu.com/fleets/build/?i=${rnd}&d=${encoded}`)
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
            onClick={this.handleExportDeckBuilderClipboard}
          >
            DeckBuilder (Clipboard)
          </MenuItem>
          <MenuItem
            onClick={this.handleExportWctf}
          >
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
