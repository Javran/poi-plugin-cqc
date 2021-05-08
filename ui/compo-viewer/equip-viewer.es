import _ from 'lodash'
import { join } from 'path-extra'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { SlotitemIcon } from 'views/components/etc/icon'

import { PTyp } from '../../ptyp'
import {
  displaySlotSelector,
} from '../../selectors'

@connect(
  s => ({displaySlot: displaySlotSelector(s)})
)
class EquipViewer extends PureComponent {
  static propTypes = {
    equip: PTyp.object.isRequired,
    style: PTyp.object.isRequired,
    extra: PTyp.bool,
    planeSlot: PTyp.number,
    planeSlotMax: PTyp.number,
    // connected
    displaySlot: PTyp.DisplaySlot.isRequired,
  }

  static defaultProps = {
    extra: false,
    planeSlot: 0,
    planeSlotMax: 0,
  }

  render() {
    const {
      equip, style, extra,
      planeSlot, planeSlotMax,
      displaySlot,
    } = this.props

    const numForDisplay = (() => {
      const n =
        displaySlot === 'max' ? planeSlotMax :
        displaySlot === 'current' ? planeSlot :
        null

      if (!_.isInteger(n) || n <= 0) {
        return null
      }
      return n
    })()

    const iconComponent = (
      <SlotitemIcon
        className="slotitem-img"
        slotitemId={equip.iconId}
      />
    )

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          ...style,
        }}
      >
        {
          extra ? (
            <div style={{position: 'relative'}}>
              {iconComponent}
              <span
                style={{
                  position: 'absolute',
                  right: 0, bottom: 0,
                  fontWeight: 'bold',
                }}
              >
                +
              </span>
            </div>
          ) : numForDisplay && equip.isPlane ? (
            <div style={{position: 'relative'}}>
              {iconComponent}
              <span className="planeslot-overlay">
                {numForDisplay}
              </span>
            </div>
          ) : iconComponent
        }
        <span
          style={{
            flex: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {window.i18n.resources.__(equip.name)}
        </span>
        {
          _.isInteger(equip.ace) && equip.ace > 0 && (
            <img
              style={{height: '1em'}}
              alt={`ace-${equip.ace}`}
              src={join('assets', 'img', 'airplane', `alv${equip.ace}.png`)}
            />
          )
        }
        {
          _.isInteger(equip.imp) && equip.imp > 0 && (
            <span
              style={{color: '#45a9a5'}}
            >
              {
                equip.imp === 10 ? '★Mx' : `★+${equip.imp}`
              }
            </span>
          )
        }
      </div>
    )
  }
}

export { EquipViewer }
