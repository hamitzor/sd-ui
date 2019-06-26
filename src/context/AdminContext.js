const React = require('react')
const { createContext } = require('react')
const { Provider: AdminProvider, Consumer: AdminConsumer } = createContext()



const withAdminContext = (Component) => (
  props => (
    <AdminConsumer>
      {value => <Component {...value} {...props}></Component>}
    </AdminConsumer>
  )
)


module.exports = { AdminProvider, AdminConsumer, withAdminContext } 