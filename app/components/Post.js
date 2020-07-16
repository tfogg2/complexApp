import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { createUseStyles } from "react-jss"
import clsx from "clsx"

const useStyles = createUseStyles(() => ({
  listItem: {
    border: "none",
    boxShadow: " 0 2.8px 2.2px -18px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px -18px rgba(0, 0, 0, 0.028), 0 12.5px 10px -18px rgba(0, 0, 0, 0.035), 0 22.3px 17.9px -18px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px -18px rgba(0, 0, 0, 0.05), 0 100px 80px -18px rgba(0, 0, 0, 0.07)",
    marginBottom: "0px"
  }
}))

function Post(props) {
  const classes = useStyles()
  const post = props.post
  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Link to={`/post/${post._id}`} className={clsx(classes.listItem, "list-group-item list-group-item-action")} onClick={props.onClick}>
      <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>{" "}
      <span className="text-muted small">
        {!props.noAuthor && (
          <>
            {" "}
            by {post.author.username} on {dateFormatted}
          </>
        )}
      </span>
    </Link>
  )
}

export default Post
