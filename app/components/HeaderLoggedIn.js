import React, { useEffect, useContext } from "react"
import { Link, withRouter } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import ReactTooltip from "react-tooltip"

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function handleLogOut() {
    appDispatch({ type: "logout" })
    props.history.push("")
    appDispatch({ type: "flashMessage", value: "You have successfully logged out!" })
  }

  function handleSearchIcon(e) {
    e.preventDefault()
    appDispatch({ type: "openSearch" })
  }

  function handleChatIcon(e) {
    e.preventDefault()
    appDispatch({ type: "toggleChat" })
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a data-for="search" data-tip="Search" href="#" className="text-white mr-2 header-search-icon" onClick={handleSearchIcon}>
        <i className="fas fa-search"></i>
      </a>
      <ReactTooltip place="bottom" id="search" className="custom-tooltip" />{" "}
      <span onClick={handleChatIcon} data-for="chat" data-tip="Chat" className={"mr-2 header-chat-icon " + (appState.unReadChatCount ? "text-danger" : "text-white")}>
        <i className="fas fa-comment"></i>
        {appState.unReadChatCount ? <span className="chat-count-badge text-white">{appState.unReadChatCount < 10 ? appState.unReadChatCount : "9+"}</span> : ""}
      </span>
      <ReactTooltip place="bottom" id="chat" className="custom-tooltip" />{" "}
      <Link data-for="profile" data-tip="Profile" to={`/profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <ReactTooltip place="bottom" id="profile" className="custom-tooltip" />{" "}
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>{" "}
      <button onClick={handleLogOut} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default withRouter(HeaderLoggedIn)
