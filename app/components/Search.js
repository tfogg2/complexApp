import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import { useImmer } from "use-immer"
import Axios from "axios"

function Search() {
  const appDispatch = useContext(DispatchContext)

  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "neither",
    requestCount: 0
  })

  useEffect(() => {
    // Document wide keypress - Keyboard event listener
    document.addEventListener("keyup", searchKeyPressHandler)

    return () => document.removeEventListener("keyup", searchKeyPressHandler)
    // Cleanup
  }, [])

  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState(draft => {
        draft.show = "loading"
      })
      const delay = setTimeout(() => {
        setState(draft => {
          draft.requestCount++
        })
      }, 700)

      return () => clearTimeout(delay)
    } else {
      setState(draft => {
        draft.show = "neither"
      })
    }
  }, [state.searchTerm])

  useEffect(() => {
    if (state.requestCount) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/search", { searchTerm: state.searchTerm }, { cancelToken: ourRequest.token })
          setState(draft => {
            draft.results = response.data
            draft.show = "results"
          })
        } catch (e) {
          console.log("There was a problem or the request was canceled")
        }
      }
      fetchResults()

      return () => ourRequest.cancel()
    }
  }, [state.requestCount])

  function searchKeyPressHandler(e) {
    if (e.keyCode == 27) {
      appDispatch({ type: "closeSearch" })
    }
  }

  function handleInput(e) {
    const value = e.target.value
    setState(draft => {
      draft.searchTerm = value
    })
  }

  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input autoFocus onChange={handleInput} type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="What are you interested in?" />
          <span className="close-live-search" onClick={() => appDispatch({ type: "closeSearch" })}>
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div className={"circle-loader " + (state.show == "loading" ? "circle-loader--visible" : "")}></div>
          <div className={"live-search-results " + (state.show == "results" ? "live-search-results--visible" : "")}>
            {Boolean(state.results.length) && (
              <div className="list-group shadow-sm">
                <div className="list-group-item active">
                  <strong>Search Results</strong> ({state.results.length} {state.results.length > 1 ? "items" : "item"} found)
                </div>
                {state.results.map(post => {
                  const date = new Date(post.createdDate)
                  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

                  return (
                    <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action" onClick={() => appDispatch({ type: "closeSearch" })}>
                      <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>{" "}
                      <span className="text-muted small">
                        {" "}
                        by {post.author.username} on {dateFormatted}
                      </span>
                    </Link>
                  )
                })}
              </div>
            )}
            {!Boolean(state.results.length) && <p className="alert alert-danger text-center shadow-sm">Bro you really F*cked that search up</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
