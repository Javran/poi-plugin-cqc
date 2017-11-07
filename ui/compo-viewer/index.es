import { createStructuredSelector } from 'reselect'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { PTyp } from '../../ptyp'
import { currentCompoInfoSelector } from '../../selectors'
import { FleetViewer } from './fleet-viewer'
import { SquadronViewer } from './squadron-viewer'

class CompoViewerImpl extends PureComponent {
  static propTypes = {
    compo: PTyp.object.isRequired,
    updateRef: PTyp.func.isRequired,
  }

  render() {
    const {
      compo: {fleets, airbase},
      updateRef,
    } = this.props
    return (
      <div
        ref={updateRef}
        style={{marginTop: 5}}
      >
        {
          [
            ...fleets.map(fleet => (
              <FleetViewer
                key={`fleet-${fleet.key}`}
                fleet={fleet}
              />)),
            ...airbase.map(sq => (
              <SquadronViewer
                key={`squadron-${sq.key}`}
                squadron={sq}
              />
            )),
          ]
        }
      </div>
    )
  }
}

const CompoViewer = connect(
  createStructuredSelector({
    compo: currentCompoInfoSelector,
  }),
)(CompoViewerImpl)

export { CompoViewer }
