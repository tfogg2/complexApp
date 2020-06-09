import React, { useState } from "react"
import Page from "./Page"
import Axios from "axios"
import HeaderLoggedOut from "./HeaderLoggedOut"
import HomeSignUp from "./HomeSignUp"
import Header from "./Header"

function HomeGuest() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  async function handleFormSubmit(e) {
    e.preventDefault()
    try {
      await Axios.post("/register", { username, email, password })
      console.log("User was successfully created")
    } catch (e) {
      console.log("There was an error")
    }
  }
  return (
    <Page title="Welcome" wide={true}>
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Remember Writing???</h1>
          <p className="lead text-muted">Are you sick of short tweets and impersonal &ldquo;shared&rdquo; posts that are reminiscent of the late 90&rsquo;s email forwards? We believe getting back to actually writing is the key to enjoying the internet again.</p>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <HomeSignUp />
        </div>
      </div>
    </Page>
  )
}

export default HomeGuest
