import { join } from 'path-extra'
import React, { PureComponent } from 'react'
import { Toolbar } from './toolbar'
import { ViewControl } from './view-control'
import { CompoViewer } from './compo-viewer'

class CqcMain extends PureComponent {
  render() {
    return (
      <div style={{margin: 5}}>
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

export { CqcMain }
