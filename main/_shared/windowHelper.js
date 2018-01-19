import { BrowserWindow } from 'electron'


const property = (obj, key) => obj && obj.hasOwnProperty(key) ? obj[key] : false

export const generateWindowObject = () => ({
  isOpen: false,
  window: null,
})

export const createWindow = windowReference => (name, options, special) => {
  const newWindow = new BrowserWindow({
    ...options,
    show: false,
    width: property(options, 'width') || 600,
    height: property(options, 'height') || 600,
    toolbar: property(options, 'toolbar') || false,
  })

  newWindow.setResizable(true)
  newWindow.loadURL(`file://${__dirname}/../../renderer/${name}/index.html`)
  newWindow.once('ready-to-show', newWindow.show)

  if (special.touchBar) {
    newWindow.setTouchBar(special.touchBar)
  }

  // Handle close window
  newWindow.on('closed', () => {
    windowReference.isOpen = false
    windowReference.window = null
  })

  // Handle open window
  windowReference.isOpen = true
  windowReference.window = newWindow
}
