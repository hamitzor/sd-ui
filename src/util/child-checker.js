const getTypeName = type => typeof type === 'function' ? type.name : type

const childChecker = rules => (props, propName, componentName) => {
  const children = Array.isArray(props[propName]) ? props[propName] : [props[propName]]
  const childTypes = children.map(child => child ? (child.type ? child.type.displayName : typeof child) : child)
  if (!rules) {
    throw new Error('rules cannot be empty')
  }
  const allowedTypes = rules.map(rule => rule.type)
  childTypes.forEach(childType => {
    if (childType !== undefined && !allowedTypes.includes(childType)) {
      throw new Error(`${getTypeName(childType)} is not allowed as child of ${componentName}. Only ${allowedTypes.length > 1 ? 'types' : 'type'} ${allowedTypes.map(type => getTypeName(type)).join(', ')} can be used.`)
    }
  })
  rules.forEach(rule => {
    const { type, required, max } = rule
    const count = childTypes.filter(childType => childType === type).length
    if (required && !count) {
      throw new Error(`${getTypeName(type)} is required as a child of ${componentName}`)
    }
    if (max && count > max) {
      throw new Error(`At most ${max} ${getTypeName(type)} can be used as a child of ${componentName}`)
    }
  })
}

module.exports = childChecker