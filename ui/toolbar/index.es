import _ from 'lodash'
import domtoimage from 'dom-to-image'
import { createStructuredSelector } from 'reselect'
import { compressToEncodedURIComponent } from 'lz-string'
import React, { PureComponent } from 'react'
import { shell, clipboard } from 'electron'
import path from 'path-extra'
import { connect } from 'react-redux'
import {
  ButtonToolbar,
  Button,
  DropdownButton,
  MenuItem,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import fs from 'fs'
import blobToBuffer from 'blob-to-buffer'
import { PTyp } from '../../ptyp'
import { currentCompoInfoSelector } from '../../selectors'
import { cqcToDeckBuilder, cqcToWctf } from '../../misc'
import { SlotDisplayControl } from './slot-display-control'

const { remote } = window
const { APPDATA_PATH } = global

const formatDate = date => {
  const pad2 = x => _.padStart(x, 2, '0')
  const datePart = (() => {
    const yyyy = date.getFullYear()
    const mm = pad2(date.getMonth() + 1)
    const dd = pad2(date.getDate())
    return `${yyyy}-${mm}-${dd}`
  })()

  const timePart = (() => {
    const hh = pad2(date.getHours())
    const mm = pad2(date.getMinutes())
    const ss = pad2(date.getSeconds())
    return `${hh}-${mm}-${ss}`
  })()

  return `${datePart}T${timePart}`
}

// TODO: remove when done.
const debugPlaneSlot = false

class ToolbarImpl extends PureComponent {
  static propTypes = {
    compo: PTyp.object.isRequired,
    getViewRef: PTyp.func.isRequired,
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

  handleRenderScreenshot = () => {
    const {dialog} = remote
    const {getViewRef} = this.props
    const viewRef = getViewRef()
    if (viewRef && dialog) {
      const d = new Date()
      /*
        TODO: this nesting is really, um, unhealthy, do something about it.
       */
      domtoimage
        .toBlob(viewRef)
        .then(blob => {
          blobToBuffer(blob, (convertBufErr, buf) => {
            if (convertBufErr) {
              throw convertBufErr
            }

            const saveDir = path.join(APPDATA_PATH, 'screenshots', 'compositions')
            if (!fs.existsSync(saveDir)) {
              fs.mkdirSync(saveDir)
            }
            dialog.showSaveDialog({
              defaultPath: path.join(saveDir,`cqc-${formatDate(d)}.png`),
              properties: ['showOverwriteConfirmation'],
            }).then(({canceled, filePath}) => {
              if (!canceled && filePath) {
                fs.writeFile(filePath, buf, err => {
                  if (err) {
                    console.error(`Error while writing to ${filePath}`, err)
                  }
                })
              }
            })
          })
        })
    }
  }

  render() {
    return (
      <ButtonToolbar>
        <OverlayTrigger
          placement="bottom" overlay={
            <Tooltip>
              Export Image
            </Tooltip>
          }>
          <Button
            onClick={this.handleRenderScreenshot}
            style={{marginTop: 0, minWidth: '5em'}}>
            <FontAwesome name="camera-retro" />
          </Button>
        </OverlayTrigger>
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
        {debugPlaneSlot && (<SlotDisplayControl />)}
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
