import React, { useEffect, useContext } from "react"
import { useImmer } from "use-immer"
import { createUseStyles } from "react-jss"
import clsx from "clsx"
import Container from "./Container"
import Axios from "axios"
import Post from "./Post"
import { Link } from "react-router-dom"
import StateContext from "../StateContext"
import LoadingDotsIcon from "./LoadingDotsIcon"

const useStyles = createUseStyles(() => ({
  feed: {
    background: "#fcfcfc",
    minHeight: "100vh",
    paddingTop: "40px",
    marginBottom: "100px"
    // boxShadow: " 0 2.8px 2.2px -25px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px -25px rgba(0, 0, 0, 0.028), 0 12.5px 10px -25px rgba(0, 0, 0, 0.035), 0 22.3px 17.9px -25px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px -25px rgba(0, 0, 0, 0.05), 0 100px 80px -25px rgba(0, 0, 0, 0.07)"
  }
}))

function Home(props) {
  const appState = useContext(StateContext)
  const classes = useStyles()
  const [state, setState] = useImmer({
    isLoading: true,
    feed: []
  })

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchData() {
      try {
        const response = await Axios.post("/getHomeFeed", { token: appState.user.token }, { cancelToken: ourRequest.token })
        setState(draft => {
          draft.isLoading = false
          draft.feed = response.data
        })
      } catch (e) {
        console.log("There was a problem.")
      }
    }
    fetchData()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (state.isLoading) {
    return <LoadingDotsIcon />
  }

  return (
    <div className={clsx(classes.feed, "container py-md-5 ")}>
      <Container wide={props.wide}>
        {state.feed.length > 0 && (
          <>
            <h2 className="text-center mb-4">The latest posts from those you follow. </h2>
            <div className="list-group">
              {state.feed.map(post => {
                return <Post post={post} key={post._id} />
              })}
            </div>
          </>
        )}
        {state.feed.length == 0 && (
          <h2>
            Your feed is empty!
            <br />
            <br />
            Follow other users to see more posts.
          </h2>
        )}
      </Container>
    </div>
  )
}

export default Home
