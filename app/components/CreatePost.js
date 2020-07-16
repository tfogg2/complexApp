import React, { useEffect, useState, useContext } from "react"
import Page from "./Page"
import Axios from "axios"
import { withRouter } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/create-post", { title, body, token: appState.user.token })
      // Redirect to new post url
      if (response.data) {
        appDispatch({ type: "flashMessage", value: "Congrats, you created a new post!" })
        props.history.push(`/post/${response.data}`)
      } else {
        appDispatch({ type: "flashMessage", value: "There was an error when creating your post, make sure you added a title and body." })
      }
    } catch (e) {
      console.log("There was an error.")
    }
  }

  return (
    <Page title="create-post">
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input autoFocus onChange={e => setTitle(e.target.value)} name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default withRouter(CreatePost)
