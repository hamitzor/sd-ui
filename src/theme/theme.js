const Color = require('color')
const { breakpoints, breakpointNames } = require('./breakpoints')
const { getWidth } = require('./get-width')

const shadow = [
  'none',
  '1px 1px 3px 0px rgba(0,0,0,0.03),1px 1px 1px 0px rgba(0,0,0,0.03),1px 2px 1px -1px rgba(0,0,0,0.03)',
  '1px 1px 5px 0px rgba(0,0,0,0.07),1px 2px 2px 0px rgba(0,0,0,0.07),1px 3px 1px -2px rgba(0,0,0,0.07)',
  '0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)',
  '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)'
]

const bigger = (width) => {
  const val = typeof width === 'number' ? width : breakpoints[width]
  return `@media (min-width:${val}px)`
}

const smaller = (width) => {
  const val = typeof width === 'number' ? width : breakpoints[width]
  return `@media (max-width:${val}px)`
}

const between = (min, max) => {
  const minVal = typeof min === 'number' ? min : breakpoints[min]
  const maxVal = typeof max === 'number' ? max : breakpoints[max]
  return `${bigger(minVal)} and ${smaller(maxVal)}`
}

const z = {
  Alert: 4000,
  Popup: 4100,
}

const unit = 5

const text = {
  h1: 60,
  h2: 40,
  h3: 30,
  h4: 25,
  h5: 20,
  h6: 18,
  small: 14,
  normal: 18,
  big: 20
}

const primary = Color('#00A6FF')
const grey = Color('#f4f4f4')
const darkgrey = Color('#555555')
const success = Color('#16B668')
const warning = Color('#F1BB00')
const error = Color('#e34234')


const themeColor = {
  background: '#f9f9f9',
  panel: '#fff',
  white: '#fff',
  black: '#000',
  primary: {
    normal: primary.hex(),
    light: primary.lighten(.3).hex(),
    dark: primary.darken(.2).hex(),
    disabled: primary.lighten(.6).hex(),
  },
  grey: {
    normal: grey.hex(),
    light: grey.lighten(.03).hex(),
    dark: grey.darken(.05).hex(),
    disabled: grey.lighten(.03).hex(),
  },
  darkgrey: {
    normal: darkgrey.hex(),
    light: darkgrey.lighten(.4).hex(),
    dark: darkgrey.darken(.2).hex(),
    disabled: darkgrey.lighten(1).hex(),
  },
  success: {
    normal: success.hex(),
    light: success.lighten(.1).hex(),
    dark: success.darken(.2).hex(),
    disabled: success.lighten(.17).hex(),
  },
  error: {
    normal: error.hex(),
    light: error.lighten(.3).hex(),
    dark: error.darken(.2).hex(),
    disabled: error.lighten(.6).hex(),
  },
  warning: {
    normal: warning.hex(),
    light: warning.lighten(.4).hex(),
    dark: warning.darken(.2).hex(),
    disabled: warning.lighten(.6).hex(),
  },
}

const duration = 300

const transition = (properties = ['all'], custumDuration = duration) =>
  properties.map(property => `${property} ${custumDuration}ms`).join(',')

const transform = name => {
  return {
    '-ms-transform': name,
    '-webkit-transform': name,
    transform: name
  }
}

module.exports = {
  breakpointNames,
  breakpoints,
  duration,
  width: getWidth,
  bigger,
  smaller,
  between,
  color: themeColor,
  transition,
  transform,
  shadow,
  unit,
  z,
  text
}