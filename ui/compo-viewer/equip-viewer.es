import _ from 'lodash'
import { join } from 'path-extra'
import React, { PureComponent } from 'react'
import { SlotitemIcon } from 'views/components/etc/icon'

import { PTyp } from '../../ptyp'

class EquipViewer extends PureComponent {
  static propTypes = {
    equip: PTyp.object.isRequired,
    style: PTyp.object.isRequired,
    extra: PTyp.bool,
    slotSize: PTyp.number,
  }

  static defaultProps = {
    extra: false,
    slotSize: 0,
  }

  render() {
    const {equip, style, extra, slotSize} = this.props
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
          ) : slotSize > 0 && equip.isPlane ? (
            <div style={{position: 'relative'}}>
              {iconComponent}
              <span className="planeslot-overlay">
                {slotSize}
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
