import "core-js/stable"
import "regenerator-runtime/runtime"

import React from "react"
import { render } from "react-dom"
import App from "./components/App"
import { ThemeProvider } from "react-jss"
import theme from "./theme/"
import { BrowserRouter as Router } from "react-router-dom"



render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
)