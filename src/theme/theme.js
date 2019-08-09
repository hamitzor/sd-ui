const Color = require('color')
const { breakpoints, breakpointNames } = require('./breakpoints')
const { getWidth } = require('./get-width')

const shadow = [
  'none',
  '0px 1px 3px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.1),0px 2px 1px -1px rgba(0,0,0,0.1)',
  '0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)',
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
  h1: '30px',
  h2: '26px',
  h3: '22px',
  h4: '18px',
  h5: '16px',
  h6: '14px',
  small: '11px',
  normal: '14px',
  big: '18px'
}


const primary = Color('#0088ff')
const secondary = Color('#7b00ff')
const error = Color('#ff4f3b')
const grey = Color('#e6e6e6')
const dark = Color('#454545')
const warning = Color('#ffbf00')

const themeColor = {
  background: '#f9f9f9',
  panel: '#fff',
  white: '#fff',
  black: '#000',
  primary: {
    normal: primary.hex(),
    light: primary.lighten(.4).hex(),
    dark: primary.darken(.2).hex(),
    darker: primary.darken(.5).hex(),
    disabled: primary.lighten(.6).hex(),
  },
  secondary: {
    normal: secondary.hex(),
    light: secondary.lighten(.4).hex(),
    dark: secondary.darken(.2).hex(),
    darker: secondary.darken(.5).hex(),
    disabled: secondary.lighten(.6).hex(),
  },
  error: {
    normal: error.hex(),
    light: error.lighten(.4).hex(),
    dark: error.darken(.2).hex(),
    darker: error.darken(.5).hex(),
    disabled: error.lighten(.6).hex(),
  },
  warning: {
    normal: warning.hex(),
    light: warning.lighten(.4).hex(),
    dark: warning.darken(.2).hex(),
    darker: warning.darken(.5).hex(),
    disabled: warning.lighten(.6).hex(),
  },
  grey: {
    normal: grey.hex(),
    light: grey.lighten(.05).hex(),
    dark: grey.darken(.1).hex(),
    darker: grey.darken(.2).hex(),
    disabled: grey.lighten(.6).hex(),
  },
  dark: {
    normal: dark.hex(),
    light: dark.lighten(.4).hex(),
    dark: dark.darken(.2).hex(),
    darker: dark.darken(.4).hex(),
    disabled: dark.lighten(.6).hex(),
  }
}

const duration = 200

const transition = (properties = ['all'], duration = duration) =>
  properties.map(property => `${property} ${duration}ms`).join(',')

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