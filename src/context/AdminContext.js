import React, { createContext } from 'react'
const { Provider: AdminProvider, Consumer: AdminConsumer } = createContext()



const withAdminContext = (Component) => (
  props => (
    <AdminConsumer>
      {value => <Component {...value} {...props}></Component>}
    </AdminConsumer>
  )
)


export { AdminProvider, AdminConsumer, withAdminContext }