const React = require('react')
const withStyles = require('react-jss').default
const InputBase = require('../InputBase')
const InputContainer = require('../InputContainer')
const InputExtension = require('../InputExtension')
const Button = require('../Button')
const IconButton = require('../IconButton')
const Icon = require('../Icon')
const { FaRegEye, FaRegEyeSlash, FaTimes } = require('react-icons/fa')
const Control = require('../Control')
const Panel = require('../Panel')
const Flex = require('../Flex')
const ListItem = require('../ListItem')
const List = require('../List')
const Select = require('../Select')
const Popup = require('../Popup')
const PopupBody = require('../PopupBody')
const PopupHeader = require('../PopupHeader')
const PopupFooter = require('../PopupFooter')
const PopupHeaderTitle = require('../PopupHeaderTitle')
const PopupHeaderExtension = require('../PopupHeaderExtension')
const Alert = require('../Alert')
const Expansion = require('../Expansion')
const Badge = require('../Badge')
const Tab = require('../Tab')
const Tabs = require('../Tabs')
const Anchor = require('../Anchor')
const Text = require('../Text')

const styles = theme => {
  return {
    parent: {
      backgroundColor: theme.color.primary.normal
    },
    child: {
      backgroundColor: theme.color.secondary.normal,
      height: theme.unit * 50,
      marginTop: theme.unit * 2,
      marginBottom: theme.unit * 2
    },
    input: {
      [theme.bigger('md')]: {
        margin: 50
      }
    }
  }
}

class Test extends React.Component {
  state = {
    value: '',
    error: false,
    visible: false,
    checked1: false,
    checked2: false,
    checked3: false,
    radio1: 'radio1-1',
    radio2: 'radio2-1',
    select: 'grapefruit',
    selectValue: '',
    animate: 'start',
    popupOpen: false,
    alertOpen: false,
    activeTab: 1
  }

  handleAlertOpen = () => {
    this.setState({ alertOpen: true })
  }

  handleAlertClose = () => {
    this.setState({ alertOpen: false })
  }

  handlePopupOpen = () => {
    this.setState({ popupOpen: true })
  }

  handlePopupClose = () => {
    this.setState({ popupOpen: false })
  }



  handleSelect = event => {
    console.log(event.target.value)
  }

  handleChange = event => {
    const value = event.target.value

    if (value.trim().length < 2 && value.trim()) {
      this.setState({
        value,
        error: true
      })
    }
    else {
      this.setState({
        value,
        error: false
      })
    }
  }

  handleVisibilty = () => {
    this.setState(({ visible }) => ({
      visible: !visible
    }))
  }

  handleCheckbox = (name) => (e) => {
    console.log('here')
    this.setState({
      [name]: e.target.checked
    })
  }

  handleRadio = (name) => (e) => {
    this.setState({
      [name]: e.target.value
    })
  }

  componentDidMount() {
    console.log('Test mounted')
  }

  select = React.createRef()

  triggerSelect = () => {
    const event = new Event('change', { bubbles: true })
    this.select.current.dispatchEvent(event)
  }

  render() {
    const {
      /* eslint-disable */
      theme,
      classes
      /* eslint-enable */
    } = this.props


    const expansionChildren = <Panel radius={0}>
      <InputContainer
        fullWidth={false}
        label={`Password`}
        lineNumber={3}
        color='primary'
        desc={'Password for account'}
        errorMessage={'This is an error message'}
        error={this.state.error}>
        <InputBase
          value={this.state.value}
          onChange={this.handleChange}
        />
      </InputContainer>
    </Panel>
    const animate = theme.width() !== 'xs'
    return (
      <Flex justify='center' parent>
        <Flex xs={12} lg={8}>
          <Panel className={classes.input}>
            <Tabs active={this.state.activeTab} onChange={(e, id) => { this.setState({ activeTab: id }) }}>
              {[1, 2, 3, 4, 5].map(num => <Tab key={num} tabId={num}>{`Tab ${num}`}</Tab>)}
            </Tabs>
            <InputContainer
              className={classes.input}
              fullWidth={false}
              label={`Password`}
              color='secondary'
              desc={`Input ${this.state.activeTab} for account`}
              errorMessage={'This is an error message'}
              error={this.state.error}>
              <InputBase
                value={this.state.value}
                onChange={this.handleChange}

                type={this.state.visible ? 'text' : 'password'}
              />
              <InputExtension>
                <IconButton
                  size={1}
                  color='default'
                  onClick={this.handleVisibilty}>
                  <Icon>
                    {this.state.visible ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Icon>
                </IconButton>
              </InputExtension>
            </InputContainer>
          </Panel>


          <Panel className={classes.input}>
            <Expansion
              buttonProps={{
                badge: <Badge shine value='23' maxValue={500} color='primary' />
              }} style={{ maxWidth: 330 }} label='Test Expansion'>
              {expansionChildren}
            </Expansion>
          </Panel>

          <Panel className={classes.input}>
            <Expansion label='Test Expansion'>
              <List
                hoverable
                onSelect={(e, i) => {
                  this.setState({
                    selectedItem: `${i}`
                  })
                }}>
                {[0, 1, 2, 3, 4, 5, 6].map(i => <ListItem key={i} itemId={`${i}`} selected={this.state.selectedItem === `${i}`}>List item {i}</ListItem>)}
              </List>
            </Expansion>
          </Panel>
          <Panel className={classes.input}>
            <Button badge={<Badge shine value='500' maxValue={99} />} color='primary' type='filled' onClick={this.handleAlertOpen}>Open Alert</Button>
          </Panel>
          <Panel className={classes.input}>
            <Button badge={<Badge value='23' maxValue={500} color='primary' />} color='error' type='filled' onClick={this.handlePopupOpen}>Open Popup</Button>
          </Panel>
          <Panel className={classes.input}>
            <Anchor color='primary' href='https://www.google.com'>Primary Link</Anchor><br />
            <Anchor color='secondary' href='https://www.google.com'>Secondary Link</Anchor><br />
            <Anchor color='default' href='https://www.google.com'>Default Link</Anchor><br />
            <Anchor color='error' href='https://www.google.com'>Error Link</Anchor>
          </Panel>
          <Alert fixed align='top' justify='right' color='error' open={this.state.alertOpen} onClose={this.handleAlertClose} fullWidth={theme.width() === 'xs'} animate={animate}>
            <Flex wrap='nowrap' parent justify='between'>
              <div style={{ color: theme.color.white }}>Login attempt was unsuccessful and this alert is longer than it should be</div>
              <IconButton
                style={{ marginLeft: 10 }}
                size={1}
                color='white'
                onClick={this.handleAlertClose}>
                <Icon>
                  <FaTimes />
                </Icon>
              </IconButton>
            </Flex>
          </Alert>
          <Popup open={this.state.popupOpen} onClose={this.handlePopupClose} fullScreen={theme.width() === 'xs'} animate={animate}>
            <PopupHeader color='secondary' style={{ justifyContent: 'space-between' }}>
              <PopupHeaderTitle>
                Are you sure ?
              </PopupHeaderTitle>
              {theme.width() === 'xs' &&
                <PopupHeaderExtension>
                  <IconButton
                    size={1}
                    color='white'
                    onClick={this.handlePopupClose}>
                    <Icon>
                      <FaTimes />
                    </Icon>
                  </IconButton>
                </PopupHeaderExtension>}
            </PopupHeader>
            <PopupBody>
              <div>
                Do you agree that React has some fallbacks?
              </div>
            </PopupBody>
            <PopupFooter>
              <Flex
                parent
                justify='end'
                style={{ paddingBottom: 5 }}>
                <Button onClick={this.handlePopupClose} style={{ marginRight: 10 }} color='default'>Nope</Button>
                <Button color='secondary' onClick={this.handlePopupClose}>Yeap</Button>
              </Flex>
            </PopupFooter>
          </Popup>

          <Panel className={classes.input}>
            <Select
              error={this.state.selectValue === '3'}
              errorMessage='Stop selecting duplicated valued options!!'
              label='Test Select'
              onChange={(e) => { this.setState({ selectValue: e.target.value }) }}
              value={this.state.selectValue}
              animate={animate} >
              <option value=''>Choose a color</option>
              <option value='red'>I choose red</option>
              <option value='blue'>I choose blue</option>
              <option value='pink'>I choose pink, I am lover</option>
              <option value='gree'>I choose green</option>
              <option value='black'>I listen metal</option>
              <option value='white'>I am god</option>
            </Select>
          </Panel>
          <Panel className={classes.input}>
            <Select
              native
              error={this.state.selectValue === '3'}
              errorMessage='Stop selecting duplicated valued options!!'
              label='Test Select'
              onChange={(e) => { this.setState({ selectValue: e.target.value }) }}
              value={this.state.selectValue}
              animate={animate} >
              <option value=''>Choose a color</option>
              <option value='red'>I choose red</option>
              <option value='blue'>I choose blue</option>
              <option value='pink'>I choose pink, I am lover</option>
              <option value='gree'>I choose green</option>
              <option value='black'>I listen metal</option>
              <option value='white'>I am God</option>
            </Select>
          </Panel>
          <Panel className={classes.input}>
            <List
              hoverable
              onSelect={(e, i) => {
                this.setState({
                  selectedItem: `${i}`
                })
              }}>
              {[0, 1, 2, 3, 4, 5, 6].map(i => <ListItem key={i} itemId={`${i}`} selected={this.state.selectedItem === `${i}`}>List item {i}</ListItem>)}
            </List>
          </Panel>
          <Panel className={classes.input}>
            <InputContainer
              fullWidth={false}
              label={`Password`}
              lineNumber={3}
              color='secondary'
              desc={'Password for account'}
              errorMessage={'This is an error message'}
              error={this.state.error}>
              <InputBase
                value={this.state.value}
                onChange={this.handleChange}
              />
            </InputContainer>
          </Panel>
          <Panel className={classes.input}>
            <InputContainer
              fullWidth={false}
              label={`Password`}
              color='secondary'
              desc={'Password for account'}
              errorMessage={'This is an error message'}
              error={this.state.error}>
              <InputBase
                value={this.state.value}
                onChange={this.handleChange}

                type={this.state.visible ? 'text' : 'password'}
              />
              <InputExtension>
                <IconButton
                  size={1}
                  color='default'
                  onClick={this.handleVisibilty}>
                  <Icon>
                    {this.state.visible ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Icon>
                </IconButton>
              </InputExtension>
            </InputContainer>
          </Panel>
          <Panel className={classes.input}>
            <Button
              size={2}
              type='filled'
              radius={2}
              color='secondary'
              onClick={this.handleVisibilty}>
              Login
            </Button>
          </Panel>
          <Panel className={classes.input}>
            <Control
              value='checked1'
              color='primary'
              onChange={this.handleCheckbox('checked1')}
              checked={this.state.checked1}
              inputLabel='This is a test primary checkbox'
            /><br />
            <Control
              value='checked2'
              color='secondary'
              onChange={this.handleCheckbox('checked2')}
              checked={this.state.checked2}
              inputLabel='This is a test secondary checkbox'
            /><br />
            <Control
              value='checked3'
              color='default'
              error={!this.state.checked3}
              errorMessage='This is an error message'
              onChange={this.handleCheckbox('checked3')}
              checked={this.state.checked3}
              inputLabel='This is a test default checkbox with error'
            />
          </Panel>
          <Panel className={classes.input}>
            <Control
              disabled
              value='radio1-1'
              control='radio'
              onChange={this.handleRadio('radio1')}
              checked={this.state.radio1 === 'radio1-1'}
              inputLabel='Test radio'
            />
            <Control
              disabled
              value='radio1-2'
              control='radio'
              onChange={this.handleRadio('radio1')}
              checked={this.state.radio1 === 'radio1-2'}
              inputLabel='Test radio'
            />
            <Control
              disabled
              value='radio1-3'
              control='radio'
              onChange={this.handleRadio('radio1')}
              checked={this.state.radio1 === 'radio1-3'}
              inputLabel='Test radio'
            />
          </Panel>
          <div className={classes.input}>
            <Panel>
              <Flex parent direction='column' alignItems='start'>
                <Control
                  value='radio2-1'
                  control='radio'
                  error={this.state.radio2 !== 'radio2-1'}
                  errorMessage='This is an error message'
                  onChange={this.handleRadio('radio2')}
                  checked={this.state.radio2 === 'radio2-1'}
                  inputLabel='Test radio'
                />
                <Control
                  value='radio2-2'
                  control='radio'
                  onChange={this.handleRadio('radio2')}
                  checked={this.state.radio2 === 'radio2-2'}
                  inputLabel='Test radio'
                />
                <Control
                  value='radio2-3'
                  control='radio'
                  onChange={this.handleRadio('radio2')}
                  checked={this.state.radio2 === 'radio2-3'}
                  inputLabel='Test radio'
                />
              </Flex>
            </Panel>

          </div>
          <Panel
            border={1}
            radius={1}
            padding={1}
            className={classes.input}>
            <Text tag='p'>
              They say that most web apps are just HTML forms. Well, forms need validation and thankfully, HTML5 comes with many great in-built form validation capabilities for things like email, numbers, max, min, etc. You can even write your own validation rules with patterns. In this article, I will talk about how you can leverage HTML5 validation while overriding the boring defaults, so you can display validation errors as fancy as you like. I will be working with Vuejs but you can always follow along even if you don’t use Vue. Let’s start with a modified version of the Checkout form from bootstrap examples so we don’t have to worry too much about styling. You can clone the starter here. The setup should look something like this: HTML Validation with Vuejs Starter The default HTML5 validation doesn’t show all the form errors at once. The irony though is that the browser actually knows all the invalid fields once a user submits, so now all we have to do is check for them and then display however we like. Let’s now add an id to our form and a listener that captures the submit event using Vuejs.
            </Text>
          </Panel>
          <Flex
            style={{ overflow: 'auto' }}
            direction='column'
            spacing={1}
            className={classes.parent}
            parent
            justify='center'
            alignItems='center'
            alignContent='start'>
            <Flex style={{ width: 800 }}>
              <Flex
                spacing={1}
                className={classes.parent}
                parent
                justify='center'
                alignItems='end'
                alignContent='start'
              >
                <Flex xs={4} sm={3} md={2} lg={1} className={classes.child} />
                <Flex xs={4} sm={3} md={2} lg={1} className={classes.child} />
                <Flex xs={4} sm={3} md={2} lg={1} className={classes.child} />
                <Flex xs={4} sm={3} md={2} lg={1} className={classes.child} />
              </Flex>
            </Flex>
            <Flex xs={12}>
              <Flex
                spacing={1}
                className={classes.parent}
                parent
                justify='center'
                alignItems='end'
                alignContent='start'
              >
                <Flex xs={4} sm={3} md={2} lg={1} className={classes.child} />
                <Flex xs={4} sm={3} md={2} lg={1} className={classes.child} />
                <Flex xs={4} sm={3} md={2} lg={1} className={classes.child} />
                <Flex xs={4} sm={3} md={2} lg={1} className={classes.child} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

    )
  }
}

module.exports = withStyles(styles)(Test)