import React, { useState, useReducer, useEffect, Suspense } from "react"
import ReactDOM from "react-dom"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = process.env.BACKENDURL || "https://backend-a.herokuapp.com"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"
import Home from "./components/Home"
const About = React.lazy(() => import("./components/About"))
const Chat = React.lazy(() => import("./components/Chat"))
const Terms = React.lazy(() => import("./components/Terms"))
const NotFound = React.lazy(() => import("./components/NotFound"))
const Profile = React.lazy(() => import("./components/Profile"))
const CreatePost = React.lazy(() => import("./components/CreatePost"))
const ViewSinglePost = React.lazy(() => import("./components/ViewSinglePost"))
const EditPost = React.lazy(() => import("./components/EditPost"))
const Search = React.lazy(() => import("./components/Search"))
import FlashMessages from "./components/FlashMessages"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import { createUseStyles } from "react-jss"
import { CSSTransition } from "react-transition-group"
import LoadingDotsIcon from "./components/LoadingDotsIcon"

const useStyles = createUseStyles({
  searchOverlay: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    zIndex: "9000",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(215, 215, 215, 0.911)"
  },
  searchOverlayEnter: {
    opacity: 0,
    transform: "scale(1.3)"
  },
  searchOverlayEnterActive: {
    opacity: 1,
    transform: "scale(1)",
    transition: "0.33s visibility ease-in-out, 0.33s opacity ease-in-out, 0.33s transform ease-in-out"
  },
  searchOVerlayExit: {
    opacity: 1,
    transform: "scale(1)"
  },
  searchOverlayExitActive: {
    opacity: 0,
    transform: "scale(1.3)",
    transition: ".33s visibility ease-in-out, .33s opacity ease-in-out, .33s transform ease-in-out"
  }
})

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername"),
      avatar: localStorage.getItem("complexappAvatar")
    },
    isSearchOpen: false,
    isChatOpen: false,
    unReadChatCount: 0
  }

  const classes = useStyles()

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
      case "openSearch":
        draft.isSearchOpen = true
        return
      case "closeSearch":
        draft.isSearchOpen = false
        return
      case "toggleChat":
        draft.isChatOpen = !draft.isChatOpen
        return
      case "closeChat":
        draft.isChatOpen = false
        return

      case "incrementUnreadChatCount":
        draft.unReadChatCount++
        return

      case "clearUnreadChatCount":
        draft.unReadChatCount = 0
        return
    }
  }

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("complexappToken", state.user.token)
      localStorage.setItem("complexappUsername", state.user.username)
      localStorage.setItem("complexappAvatar", state.user.avatar)
    } else {
      localStorage.removeItem("complexappToken")
      localStorage.removeItem("complexappUsername")
      localStorage.removeItem("complexappAvatar")
    }
  }, [state.loggedIn])

  //check if token has expired on first render

  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/checkToken", { token: state.user.token }, { cancelToken: ourRequest.token })
          if (!response.data) {
            appDispatch({ type: "logout" })
            props.history.push("")
            appDispatch({ type: "flashMessage", value: "Your session has expired. Please login again." })
          }
        } catch (e) {
          console.log("There was a problem or the request was canceled")
        }
      }
      fetchResults()

      return () => ourRequest.cancel()
    }
  }, [])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Suspense fallback={<LoadingDotsIcon />}>
            <Switch>
              <Route path="/profile/:username">
                <Profile />
              </Route>
              <Route path="/" exact>
                {state.loggedIn ? <Home /> : <HomeGuest />}
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
              <Route path="/post/:id/edit" exact>
                <EditPost />
              </Route>
              <Route path="/terms" exact>
                <Terms />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
          <CSSTransition
            timeout={330}
            in={state.isSearchOpen}
            classNames={{
              enter: classes.searchOverlayEnter,
              enterActive: classes.searchOverlayEnterActive,
              exit: classes.searchOverlayExit,
              exitActive: classes.searchOverlayExitActive
            }}
            unmountOnExit
          >
            <div className="search-overlay">
              <Suspense fallback="">
                <Search />
              </Suspense>
            </div>
          </CSSTransition>
          <Suspense fallback="">{state.loggedIn && <Chat />}</Suspense>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
