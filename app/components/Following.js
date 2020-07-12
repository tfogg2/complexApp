import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"
import Axios from "axios"

function Following(props) {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/following`, { cancelToken: ourRequest.token })
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
  }, [username])

  if (isLoading) return <LoadingDotsIcon />
  return (
    <div className="list-group">
      {posts.map((follow, index) => {
        {
          follow.length !== "" && (
            <Link key={index} to={`/profile/${follow.username}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={follow.avatar} /> {follow.username}
            </Link>
          )
        }
        {
          follow.length !== 0 && <p>SLUT</p>
        }
      })}
    </div>
  )
}

export default Following
