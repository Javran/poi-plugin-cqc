import { join } from 'path-extra'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Toolbar } from './toolbar'
import { ViewControl } from './view-control'
import { CompoViewer } from './compo-viewer'

import { themeSelector } from '../selectors'
import { PTyp } from '../ptyp'

class CqcMainImpl extends PureComponent {
  static propTypes = {
    theme: PTyp.string.isRequired,
  }

  render() {
    const {theme} = this.props
    return (
      <div
        className={`theme-${theme}`}
        style={{margin: 5}}
      >
        <link
          rel="stylesheet"
          href={join(__dirname, '..', 'assets', 'cqc.css')}
        />
        <Toolbar
          getViewRef={() => this.viewRef}
        />
        <ViewControl />
        <CompoViewer
          updateRef={r => { this.viewRef = r }}
        />
      </div>
    )
  }
}

const CqcMain = connect(
  state => ({
    theme: themeSelector(state),
  })
)(CqcMainImpl)

export { CqcMain }
