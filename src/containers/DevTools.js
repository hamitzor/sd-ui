const React = require('react')
const { createDevTools } = require('redux-devtools')
const LogMonitor = require('redux-devtools-log-monitor').default
const DockMonitor = require('redux-devtools-dock-monitor').default

module.exports = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-w">
    <LogMonitor />
  </DockMonitor>
)
