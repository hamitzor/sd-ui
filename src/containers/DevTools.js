const React = require('react')
const { createDevTools } = require('redux-devtools')
const LogMonitor = require('redux-devtools-log-monitor')
const DockMonitor = require('redux-devtools-dock-monitor')

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-w">
    <LogMonitor />
  </DockMonitor>
)
