import { createSelector } from 'reselect'
import { join } from 'path-extra'
import { ensureDirSync, readJsonSync, writeJsonSync } from 'fs-extra'
import {
  showPartSelector,
} from './selectors'

const { APPDATA_PATH } = window

const latestVersion = '0.1.7'

/*
  For now the persistent state only consists of `showPart`,
  it is intentional that airbaseArea is not stored,
  as that info is time-dependent thus should not be persisted.
 */
const pStateSelector = createSelector(
  showPartSelector,
  showPart => ({showPart})
)

// pState file is located "$APPDATA_PATH/cqc/cqc.json"
const getPStateFilePath = () => {
  const pStatePath = join(APPDATA_PATH,'cqc')
  ensureDirSync(pStatePath)
  return join(pStatePath,'cqc.json')
}

const savePState = pState => {
  const path = getPStateFilePath()
  try {
    const pStateWithVer = {
      ...pState,
      $version: latestVersion,
    }
    writeJsonSync(path, pStateWithVer)
  } catch (err) {
    console.error('Error while writing to p-state file', err)
  }
}

const updatePState = oldPState => {
  const currentPState = oldPState
  if (currentPState.$version === latestVersion) {
    const {$version: _ignored, ...realPState} = currentPState
    return realPState
  }
  console.error(`cannot update current p-state`)
  return null
}

const loadPState = () => {
  try {
    return updatePState(
      readJsonSync(getPStateFilePath())
    )
  } catch (err) {
    if (err.syscall !== 'open' || err.code !== 'ENOENT') {
      console.error('Error while loading p-state', err)
    }
  }
  return null
}

export {
  loadPState,
  savePState,
  pStateSelector,
}
