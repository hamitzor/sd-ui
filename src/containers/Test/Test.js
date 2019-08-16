/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const React = require('react')
const withStyles = require('react-jss').default
const Color = require('color')
const Button = require('../../components/Button')
const Icon = require('../../components/Icon')
const { FaGithub } = require('react-icons/fa')
const Spinner = require('../../components/Spinner')
const Badge = require('../../components/Badge')
const Alert = require('../../components/Alert')

const styles = theme => ({
  content: {
    height: 900
  }
})

const buttonOptions = {
  types: ['light', 'filled', 'transparent'],
  colors: ['darkgrey', 'success', 'primary', 'warning', 'error'],
  sizes: ['small', 'normal', 'big'],
  radiuses: [0, 1, 2, 3],
  justifies: ['center', 'left', 'right']
}

class Test extends React.Component {
  state = {
    buttonBusy: false,
    spinnersVisible: false,
    alertVisible: false
  }

  render() {
    const {
      theme,
      classes
    } = this.props

    const {
      buttonBusy,
      spinnersVisible,
      alertVisible
    } = this.state

    const spinners = <div style={{ margin: 40 }}>
      <h2 style={{ textAlign: 'center' }}>Spinners</h2>
      <Button onClick={() => this.setState(({ spinnersVisible }) => ({ spinnersVisible: !spinnersVisible }))}>Toggle Spinners</Button>
      <div>
        {buttonOptions.colors.map(color => (
          <Spinner style={{ display: 'inline-block', margin: 10 }} key={color} color={color} size={15} visible={spinnersVisible} />
        ))}
      </div>
    </div>

    const colors = <div style={{ textAlign: 'center', fontWeight: 600 }}>
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

    const shadows = <div style={{ textAlign: 'center' }}>
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

    const texts = <div style={{ textAlign: 'center' }}>
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

    const buttons = <div >
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

    const buttonsWithIcons = <div>
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
                      Git
                    <Icon>
                        <FaGithub />
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

    const iconButtons = <div>
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
                      <Icon>
                        <FaGithub />
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

    const busyButton = <div style={{ margin: 40 }}>
      {buttonOptions.sizes.map(size => (
        <Button style={{ margin: '0 10px' }} key={size} size={size} type="filled" busy={buttonBusy} onClick={() => {
          this.setState({ buttonBusy: true })
          setTimeout(() => {
            this.setState({ buttonBusy: false })
          }, 2000)
        }}>Load Something</Button>
      ))}
    </div>

    const buttonWithBadge = <div style={{ margin: 40 }}>
      {buttonOptions.sizes.map(size => (
        <Button badge={<Badge shine color="success" value="12" maxValue={10} />} style={{ margin: '0 10px' }} key={size} size={size} busy={buttonBusy} onClick={() => {
          this.setState({ buttonBusy: true })
          setTimeout(() => {
            this.setState({ buttonBusy: false })
          }, 2000)
        }}>Load Something</Button>
      ))}
    </div>

    const alertsToggle = <div style={{ margin: 40 }}>
      <Button onClick={() => { this.setState(({ alertVisible }) => ({ alertVisible: !alertVisible })) }}>
        Toggle Alerts
    </Button>
    </div>
    const alerts = [
      /**
       * <Alert onClick={() => { this.setState({ alertVisible: false }) }} key={1} open={alertVisible} type="warning">
        Be careful while deleting videos
      </Alert>,
      <Alert onClick={() => { this.setState({ alertVisible: false }) }} key={2} open={alertVisible} align="bottom">
        Don&apos;t forget to check the video
      </Alert>,
       */
      <Alert onClick={() => { this.setState({ alertVisible: false }) }} key={3} open={alertVisible} type="success">
        The operation is successfully completed
      </Alert>,
      <Alert onClick={() => { this.setState({ alertVisible: false }) }} key={4} open={alertVisible} type="error">
        An error encountered
      </Alert>
    ]

    return (
      <div className={classes.content} style={{ position: 'relative' }}>
        {alertsToggle}
        {busyButton}
        {alerts}
      </div>
    )
  }
}

module.exports = withStyles(styles)(Test)