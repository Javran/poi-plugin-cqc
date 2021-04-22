import { CqcMain as reactClass } from './ui'
import { reducer } from './store'

// TODO: remove
import {} from './cqc'

const { remote } = window

/*
  TODO: this is currently a shotgun event capture for all 'will-download' events,
  we need to somehow identify the event and ignore those unrelated ones.
 */

const handleDownload = (ev, item, _webContents) => {
  // TODO: necessary?
  ev.preventDefault()
  console.log(item)
  item.setSavePath("/tmp")
  item.setSaveDialogOptions({
    title: "test title",
    message: "test message",
    defaultPath: "/tmp/something.png",
    filters: [
      {name: "wtf", extensions: ["png"]},
    ],
  })

  console.log(item.getFilename())
  console.log(item.getState())
  console.log(item.getSavePath())
  console.log(item.getSaveDialogOptions())
}

const pluginDidLoad = () => {
  remote.getCurrentWebContents().session.addListener('will-download', handleDownload)
}

const pluginWillUnload = () => {
  remote.getCurrentWebContents().session.removeListener('will-download', handleDownload)
}

export {
  pluginDidLoad,
  pluginWillUnload,

  reducer,
  reactClass,
}
