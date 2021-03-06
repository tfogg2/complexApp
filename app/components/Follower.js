import React, { useEffect, useState, useContext } from "react"
import { createUseStyles } from "react-jss"
import clsx from "clsx"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"
import StateContext from "../StateContext"
import Axios from "axios"

const useStyles = createUseStyles(() => ({
  listItem: {
    border: "none",
    boxShadow: " 0 2.8px 2.2px -18px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px -18px rgba(0, 0, 0, 0.028), 0 12.5px 10px -18px rgba(0, 0, 0, 0.035), 0 22.3px 17.9px -18px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px -18px rgba(0, 0, 0, 0.05), 0 100px 80px -18px rgba(0, 0, 0, 0.07)",
    marginBottom: "0px"
  }
}))

function Follower(props) {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const appState = useContext(StateContext)
  const classes = useStyles()

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/${props.action}`, { cancelToken: ourRequest.token })
        setPosts(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("There was an error.")
      }
    }
    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [username, props.action])

  if (isLoading) return <LoadingDotsIcon />
  return (
    <div className="list-group">
      {posts.length > 0 &&
        posts.map((follower, index) => {
          return (
            <Link key={index} to={`/profile/${follower.username}`} className={clsx(classes.listItem, "list-group-item list-group-item-action")}>
              <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
            </Link>
          )
        })}
      {posts.length == 0 && appState.user.username == username && <p className="lead text-muted text-center">You don&rsquo;t have any followers yet.</p>}
      {posts.length == 0 && appState.user.username != username && (
        <p className="lead text-muted text-center">
          {username} doesn&rsquo;t have any followers yet.
          {appState.user.loggedIn && <> Be the first to follow them! </>}
          {!appState.user.loggedIn && <> Create an account to be the first to follow {username} </>}
        </p>
      )}
      {posts.length > 1 && !appState.user.loggedIn && <p className="lead text-muted text-center">Create an account to follow {username}</p>}
    </div>
  )
}

export default Follower
