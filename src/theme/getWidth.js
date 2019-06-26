const { breakpoints } = require('./breakpoints')

const convertWidthInPixelsToWidth = (widthInPixels) => {
  let width = 'xs'
  if (widthInPixels >= breakpoints.sm)
    width = 'sm'
  if (widthInPixels >= breakpoints.md)
    width = 'md'
  if (widthInPixels >= breakpoints.lg)
    width = 'lg'
  if (widthInPixels >= breakpoints.xl)
    width = 'xl'

  return width
}

const getWidth = () => {
  const widthInPixels = window.innerWidth
  return convertWidthInPixelsToWidth(widthInPixels)
}

module.exports = { getWidth, convertWidthInPixelsToWidth }