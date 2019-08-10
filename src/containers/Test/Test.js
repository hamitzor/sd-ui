/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const React = require('react')
const withStyles = require('react-jss').default
const Color = require('color')
const Button = require('../../components/Button')
const Icon = require('../../components/Icon')
const { IoIosAppstore } = require('react-icons/io')

const styles = theme => ({
  content: {
    height: 2000
  }
})

const buttonOptions = {
  types: ['light', 'filled', 'transparent'],
  colors: ['darkgrey', 'primary', 'warning', 'error'],
  sizes: ['small', 'normal', 'big'],
  radiuses: [0, 1, 2, 3],
  justifies: ['center', 'left', 'right']
}

class Test extends React.Component {

  render() {
    const {
      theme,
      classes
    } = this.props

    return (
      <div className={classes.content}>
        <div style={{ textAlign: 'center', fontWeight: 600 }}>
          <h2>theme.color</h2>
          {['disabled', 'light', 'normal', 'dark'].map(type =>
            (<div key={type} style={{ display: 'flex' }}>
              {Object.keys(theme.color).map(key => <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: `${100 / Object.keys(theme.color).length}%`,
                  height: 100,
                  backgroundColor: theme.color[key][type] ? theme.color[key][type] : theme.color[key],
                  color: Color(theme.color[key].normal ? theme.color[key].normal : theme.color[key]).isDark() ? 'white' : theme.color.darkgrey.dark,
                  fontSize: theme.text.normal,
                }}
                key={key}>
                {`${key}-${type}`}
              </div>)}
            </div>)
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2>theme.shadow</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
            {Object.keys(theme.shadow).map(key =>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: `${100 / Object.keys(theme.shadow).length - 5}%`,
                  margin: '0 35px',
                  height: 100,
                  backgroundColor: 'white',
                  boxShadow: theme.shadow[key],
                  fontSize: theme.text.normal,
                }}
                key={key}>
                {key}
              </div>)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2>theme.text</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
            {Object.keys(theme.text).map(key => {
              const El = key !== 'big' && key !== 'small' && key !== 'normal' ? key : 'div'
              return <El
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: `${100 / Object.keys(theme.text).length - 5}%`,
                  margin: '0 35px',
                  height: 100,
                  backgroundColor: 'white',
                  fontSize: theme.text[key],
                  boxShadow: theme.shadow[1]
                }}
                key={key}>
                {key}
              </El>
            }
            )}
          </div>
        </div>

        <div>
          <h2 style={{ textAlign: 'center' }}>Buttons</h2>
          {buttonOptions.types.map(type => (
            [false, true].map(busy => (
              buttonOptions.justifies.map((justify, i) => (
                <div key={type + justify + busy + i}>
                  <div style={{ margin: 10 }}>
                    {buttonOptions.colors.map(color => buttonOptions.sizes.map((size, i) => (
                      <div key={color + type + justify + busy + i} style={{ display: 'inline-flex' }}>

                        <Button onClick={() => {
                          console.log({
                            type,
                            color,
                            justify,
                            busy
                          })
                        }} style={{ margin: '10px', display: 'inline-block' }} justify={justify} busy={busy} type={type} color={color} size={size} key={color + type + justify + busy + i}>
                          Button
                        </Button>
                      </div>
                    ))
                    )}
                  </div>
                </div>
              ))
            ))
          ))}
        </div>

        <div>
          <h2 style={{ textAlign: 'center' }}>Buttons with Icon</h2>
          {buttonOptions.types.map(type => (
            [false, true].map(busy => (
              buttonOptions.justifies.map((justify, i) => (
                <div key={type + justify + busy + i}>
                  <div style={{ margin: 10 }}>
                    {buttonOptions.colors.map(color => buttonOptions.sizes.map((size, i) => (
                      <div key={color + type + justify + busy + i} style={{ display: 'inline-flex' }}>

                        <Button onClick={() => {
                          console.log({
                            type,
                            color,
                            justify,
                            busy
                          })
                        }} style={{ margin: '10px', display: 'inline-block' }} justify={justify} busy={busy} type={type} color={color} size={size} key={color + type + justify + busy + i}>
                          Get
                          <Icon>
                            <IoIosAppstore />
                          </Icon>
                        </Button>
                      </div>
                    ))
                    )}
                  </div>
                </div>
              ))
            ))
          ))}
        </div>
      </div>
    )

  }
}

module.exports = withStyles(styles)(Test)