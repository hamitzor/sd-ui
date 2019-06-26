const React = require('react')


module.exports = (rule) => (props, propName, componentName) => {
  const children = props[propName]
  let displayName = ''

  const list = Object.keys(rule)
  let childrenList = []

  React.Children.forEach(children, child => {
    if (child) {
      displayName = typeof child === 'string' ? 'string' : typeof child.type === 'string' ? child.type : child.type.displayName
      childrenList.push(displayName)
      if (!list.includes(displayName)) {
        throw new Error(`${displayName} component cannot be used as children of ${componentName}. 
    Only ${list.join(',')} componenets are allowed.`)
      }
    }
  })

  Object.keys(rule).forEach(key => {

    const required = rule[key][0]
    const max = rule[key][1]

    if (required && !childrenList.includes(key)) {
      throw new Error(`At least one ${key} must be used as children for ${componentName}, but it is not used as children`)
    }
    if (max && childrenList.filter(x => x === key).length > max) {
      throw new Error(`Children type of ${key} can be used ${max} times in ${componentName}, but it seems like it is used more than ${max} times.`)
    }
  })

}