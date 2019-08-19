/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const React = require('react')
const withStyles = require('react-jss').default
const Color = require('color')
const Button = require('../../components/Button')
const Icon = require('../../components/Icon')
const { FaGithub } = require('react-icons/fa')
const { MdDone } = require('react-icons/md')
const Spinner = require('../../components/Spinner')
const Badge = require('../../components/Badge')
const Alert = require('../../components/Alert')
const Anchor = require('../../components/Anchor')
const Control = require('../../components/Control')
const Expansion = require('../../components/Expansion')
const Container = require('../../components/Container')

const styles = theme => ({
  content: {
    height: 927,
    padding: 10,
    backgroundColor: theme.color.panel
  }
})

const containerProps = {
  spacing: [0, 1, 2, 3],
  direction: ['row', 'row-r', 'column', 'column-r', 'initial', 'inherit'],
  wrap: ['nowrap', 'wrap', 'wrap-r', 'initial', 'inherit'],
  justify: ['start', 'end', 'center', 'between', 'around', 'initial', 'inherit'],
  alignItems: ['stretch', 'center', 'start', 'end', 'baseline', 'initial', 'inherit'],
  alignContent: ['stretch', 'center', 'start', 'end', 'between', 'around', 'initial', 'inherit'],
}

const buttonProps = {
  types: ['light', 'filled', 'transparent'],
  colors: ['darkgrey', 'success', 'primary', 'warning', 'error'],
  sizes: ['small', 'normal', 'big'],
  radiuses: [0, 1, 2, 3],
  justifies: ['center', 'left', 'right']
}

const anchorProps = {
  colors: ['grey', 'darkgrey', 'primary', 'success', 'warning', 'error'],
  disableds: [false, true]
}

class Test extends React.Component {
  state = {
    buttonBusy: false,
    spinnersVisible: false,
    alertVisible: false,
    checkboxChecked: false
  }

  render() {
    const {
      theme,
      classes
    } = this.props

    const {
      buttonBusy,
      spinnersVisible,
      alertVisible,
      checkboxChecked
    } = this.state

    const spinners = <div style={{ margin: 40 }}>
      <h2 style={{ textAlign: 'center' }}>Spinners</h2>
      <Button onClick={() => this.setState(({ spinnersVisible }) => ({ spinnersVisible: !spinnersVisible }))}>Toggle Spinners</Button>
      <div>
        {buttonProps.colors.map(color => (
          <Spinner style={{ display: 'inline-block', margin: 10 }} key={color} color={color} size={15} visible={spinnersVisible} />
        ))}
      </div>
    </div>

    const colors = <div style={{ textAlign: 'center', fontWeight: 500 }}>
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
            {`${key}.${type}`}
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
      {buttonProps.types.map(type => (
        [false, true].map(busy => (
          buttonProps.justifies.map((justify, i) => (
            <div key={type + justify + busy + i}>
              <div style={{ margin: 10 }}>
                {buttonProps.colors.map(color => buttonProps.sizes.map((size, i) => (
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
      {buttonProps.types.map(type => (
        [false, true].map(busy => (
          buttonProps.justifies.map((justify, i) => (
            <div key={type + justify + busy + i}>
              <div style={{ margin: 10 }}>
                {buttonProps.colors.map(color => buttonProps.sizes.map((size, i) => (
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
      {buttonProps.types.map(type => (
        [false, true].map(busy => (
          buttonProps.justifies.map((justify, i) => (
            <div key={type + justify + busy + i}>
              <div style={{ margin: 10 }}>
                {buttonProps.colors.map(color => buttonProps.sizes.map((size, i) => (
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
      {buttonProps.sizes.map(size => (
        <Button style={{ margin: '0 10px' }} key={size} size={size} type="filled" busy={buttonBusy} onClick={() => {
          this.setState({ buttonBusy: true })
          setTimeout(() => {
            this.setState({ buttonBusy: false })
          }, 2000)
        }}>Load Something</Button>
      ))}
    </div>

    const buttonWithBadge = <div style={{ margin: 40 }}>
      {buttonProps.sizes.map(size => (
        <Button badge={<Badge color="success" value="12" maxValue={10} />} style={{ margin: '0 10px' }} key={size} size={size} busy={buttonBusy} onClick={() => {
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

    const anchors = anchorProps.colors.map(color => anchorProps.disableds.map(disabled => (
      <Anchor style={{ margin: 7, backgroundColor: color === 'grey' ? 'darkgrey' : 'unset' }} href="#" key={color + disabled} color={color} disabled={disabled} >{disabled ? 'A disabled link' : 'A link'}</Anchor>
    )))

    const paragraph = (
      <p>
        This is in contrast to today&apos;s more common concurrency model where OS threads are employed. Thread-based networking is relatively inefficient and very difficult to use. Furthermore, users of Node.js are free from worries of dead-locking the process, since there are no locks. Almost no function in Node.js directly performs I/O, so the process never blocks. Because nothing blocks, scalable systems are very reasonable to develop in Node.js.

        If some of this language is unfamiliar, there is a full article on Blocking vs Non-Blocking.

        Node.js is similar in design to, and influenced by, systems like Ruby&apos;s Event Machine or Python&apos;s Twisted. Node.js takes the event model a bit further. It presents an event loop as a runtime construct instead of as a library. In other systems there is always a blocking call to start the event-loop. Typically behavior is defined through callbacks at the beginning of a script and at the end starts a server through a blocking call like EventMachine::run(). In Node.js there is no such start-the-event-loop call. Node.js simply enters the event loop after executing the input script. Node.js exits the event loop when there are no more callbacks to perform. This behavior is like browser JavaScript — the event loop is hidden from the user.

        HTTP is a first class citizen in Node.js, designed with streaming and low latency in mind. This makes Node.js well suited for the foundation of a web library or framework.
      </p>
    )

    const checkboxes = buttonProps.colors.map(color => (
      [<Control style={{ margin: '20px 20px' }} color={color} key={color + '1'} checked={checkboxChecked} onClick={() => this.setState(({ checkboxChecked }) => ({ checkboxChecked: !checkboxChecked }))} />,
      <Control disabled style={{ margin: '20px 20px' }} color={color} key={color + '2'} checked={checkboxChecked} onClick={() => this.setState(({ checkboxChecked }) => ({ checkboxChecked: !checkboxChecked }))} />]
    ))

    const radios = buttonProps.colors.map(color => (
      [<Control kind="radio" style={{ margin: '20px 20px' }} color={color} key={color + '1'} checked={checkboxChecked} onClick={() => this.setState(({ checkboxChecked }) => ({ checkboxChecked: !checkboxChecked }))} />,
      <Control kind="radio" disabled style={{ margin: '20px 20px' }} color={color} key={color + '2'} checked={checkboxChecked} onClick={() => this.setState(({ checkboxChecked }) => ({ checkboxChecked: !checkboxChecked }))} />]
    ))

    const expension = (
      <div style={{ width: 250 }}>
        {
          [0, 1, 2, 3, 4, 5].map(size => (
            <Expansion style={{ margin: '5px 10px' }} key={size} type="filled" label="An Expension">
              <div style={{ backgroundColor: theme.color.background, padding: 20 }}>
                <div>asdfasfdasdfasfdasdfasfdasdfasfd asdfasfd</div>
                <div>asdfasfd</div>
              </div>
            </Expansion>
          ))
        }
      </div>
    )

    const containers = <Container style={{ backgroundColor: theme.color.primary.normal, height: 70 }}>
      {[1, 2, 3, 4].map(num => (
        <div key={num} style={{ width: 50, backgroundColor: theme.color.warning.normal, margin: 10, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{num}</div>
      ))}
    </Container>

    return (
      <div className={classes.content} style={{ position: 'relative' }}>
        {alertsToggle}
        {busyButton}
        {alerts}
        {anchors}
        {paragraph}
        {checkboxes}
        {radios}
        {expension}
      </div>
    )
  }
}

module.exports = withStyles(styles)(Test)