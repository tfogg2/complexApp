import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(theme => ({
  exampleStyle: {
    height: theme.x
  }
}))

function LoadingDotsIcon() {
  const classes = useStyles()
  return (
    <div className="dots-loading">
      <div></div>
    </div>
  )
}

export default LoadingDotsIcon
