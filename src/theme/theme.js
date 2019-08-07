const Color = require('color')
const { breakpoints, breakpointNames } = require('./breakpoints')
const { getWidth } = require('./get-width')


const shadow = [
  'none',
  '0px 1px 3px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.1),0px 2px 1px -1px rgba(0,0,0,0.1)',
  '0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)',
  '0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)',
  '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
  '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
  '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
  '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
  '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
  '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
  '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
  '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
  '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
  '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
  '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
  '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
  '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
]

const bigger = (width) => {
  const val = typeof width === 'number' ? width : breakpoints[width]
  return `@media (min-width:${val}px)`
}

const smaller = (width) => {
  const val = typeof width === 'number' ? width : breakpoints[width]
  return `@media (max-width:${val}px)`
}

const between = (minWidth, maxWidth) => {
  const minVal = typeof minWidth === 'number' ? minWidth : breakpoints[minWidth]
  const maxVal = typeof maxWidth === 'number' ? maxWidth : breakpoints[maxWidth]
  return `${bigger(minVal)} and ${smaller(maxVal)}`
}


const zIndex = {
  Alert: 4000,
  Popup: 4100,
}

const unit = 5


const text = {
  h1: '2.1rem',
  h2: '1.8rem',
  h3: '1.5rem',
  h4: '1.3rem',
  h5: '1rem',
  h6: '0.85rem',
  small: '0.85rem',
  normal: '1rem',
  big: '1.2rem'
}

const grey = {
  50: '#fcfcfc',
  100: '#f8f8f8',
  200: '#f3f3f3',
  300: '#eaeaea',
  400: '#dedede',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121'
}

const error = Color('#e84747')
const primary = Color('#0095ff')
const secondary = Color('#39ad00')
const textColor = Color('#424242')

const themeColor = {
  background: {
    normal: '#f6f6f6',
    panel: '#fff',
  },
  white: '#fff',
  black: '#000',
  grey,
  error: {
    normal: error.hex(),
    light: error.lighten(.1).hex(),
    dark: error.darken(.25).hex(),
    darker: error.darken(.3).hex(),
    disabled: error.alpha(0.5).toString()
  },
  primary: {
    normal: primary.hex(),
    light: primary.lighten(.1).hex(),
    dark: primary.darken(.2).hex(),
    darker: primary.darken(.3).hex(),
    disabled: primary.alpha(0.5).toString()
  },
  secondary: {
    normal: secondary.hex(),
    light: secondary.lighten(.1).hex(),
    dark: secondary.darken(.25).hex(),
    darker: secondary.darken(.3).hex(),
    disabled: secondary.alpha(0.5).toString()
  },
  text: {
    normal: textColor.hex(),
    light: textColor.lighten(0.6).hex(),
    dark: textColor.darken(.25).hex(),
    darker: textColor.darken(.3).hex(),
    disabled: textColor.alpha(0.5).toString()
  }
}

const transitionTime = 200

const transition = (...args) => {
  let time = transitionTime
  const numberArgs = args.filter(x => typeof x === 'number')
  if (numberArgs.length > 0) {
    time = numberArgs[0]
  }
  return args.filter(x => typeof x === 'string').reduce((acc, val) => `${acc} ${val} ${time}ms,`, '').slice(0, -1)
}

const transform = (name) => {
  return {
    '-ms-transform': name, /* IE 9 */
    '-webkit-transform': name, /* Safari */
    transform: name
  }
}

const theme = {
  breakpointNames,
  breakpoints,
  transitionTime,
  width: getWidth,
  bigger,
  smaller,
  between,
  color: themeColor,
  transition,
  transform,
  shadow,
  unit,
  zIndex,
  text
}


module.exports = { transitionTime }
module.exports = theme