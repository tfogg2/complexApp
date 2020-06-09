import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"
import Home from "./components/Home"
import About from "./components/About"
import Terms from "./components/Terms"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"
import ExampleContext from "./ExampleContext"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"

function Main() {
  const initialState = {}

  function ourReducer(state, action) {
    switch (action.type) {
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState)

  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessages(msg) {
    setFlashMessages(prev => prev.concat(msg))
  }

  return (
    <ExampleContext.Provider value={{ addFlashMessages, setLoggedIn, loggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header />
        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home /> : <HomeGuest />}
          </Route>
          <Route path="/about-us" exact>
            <About />
          </Route>
          <Route path="/create-post" exact>
            <CreatePost />
          </Route>
          <Route path="/post/:id" exact>
            <ViewSinglePost />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
