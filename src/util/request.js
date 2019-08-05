const { apiRoot } = require('./addresses')

exports.post = (endpoint, data, multipart = false) => fetch(`${apiRoot}${endpoint}`, {
  method: 'POST',
  headers: {
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
  },
  credentials: 'include',
  body: multipart ? data : JSON.stringify(data),
})


exports.get = endpoint => fetch(`${apiRoot}${endpoint}`, {
  method: 'GET',
  credentials: 'include',
})

exports.del = endpoint => fetch(`${apiRoot}${endpoint}`, {
  method: 'DELETE',
  credentials: 'include',
})