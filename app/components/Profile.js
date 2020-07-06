import React, { useEffect, useContext, useState } from "react"
import { createUseStyles } from "react-jss"
import Page from "./Page"
import { useParams } from "react-router-dom"
import Axios from "axios"
import StateContext from "../StateContext"
import ProfilePosts from "./ProfilePosts"

const useStyles = createUseStyles(theme => ({
  exampleStyle: {
    height: theme.x
  }
}))

function Profile() {
  const classes = useStyles()

  const { username } = useParams()

  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: "false",
    counts: { postCount: "", followerCount: "", followingCount: "" }
  })

  const appState = useContext(StateContext)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: ourRequest.token })
        console.log(response.data)
        setProfileData(response.data)
      } catch (e) {
        console.log("There was a problem.")
      }
    }
    fetchData()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  return (
    <Page title="Profile Screen">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          {profileData.counts.followingCount}
        </a>
      </div>

      <ProfilePosts />
    </Page>
  )
}

export default Profile
