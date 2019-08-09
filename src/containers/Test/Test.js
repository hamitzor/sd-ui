/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const React = require('react')
const withStyles = require('react-jss').default
const Color = require('color')

const styles = theme => ({
  content: {
    height: 2000
  }
})

class Test extends React.Component {

  render() {
    const {
      theme,
      classes
    } = this.props

    console.log(theme)

    return (
      <div className={classes.content}>
        <div style={{ textAlign: 'center', fontWeight: 600 }}>
          <h2>theme.color</h2>
          {['disabled', 'light', 'normal', 'dark', 'darker'].map(type =>
            (<div key={type} style={{ display: 'flex' }}>
              {Object.keys(theme.color).map(key => <div
                style={{
                  width: `${100 / Object.keys(theme.color).length}%`,
                  height: 100,
                  backgroundColor: theme.color[key][type] ? theme.color[key][type] : theme.color[key],
                  color: Color(theme.color[key][type] ? theme.color[key][type] : theme.color[key]).isDark() ? 'white' : 'black'
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
                  width: `${100 / Object.keys(theme.shadow).length - 5}%`,
                  margin: '0 35px',
                  height: 100,
                  backgroundColor: 'white',
                  boxShadow: theme.shadow[key]
                }}
                key={key}>
                {key}
              </div>)}
          </div>
        </div>
      </div>
    )

  }
}

module.exports = withStyles(styles)(Test)