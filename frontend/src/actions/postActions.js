import axios from "axios"
import { 
  GET_POSTS, 
  POST_ERROR, 
  UPDATE_LIKES
} from "./types"

export const getAllPosts = () => async dispatch => {
  try {
    const res = await axios.get('/devconnector/api/v1/posts')

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

export const addLike = post_id => async dispatch => {
  try {
    const res = await axios.put(`/devconnector/api/v1/posts/${post_id}/like`)

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: post_id,
        likes: res.data
      }
    })

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

export const removeLike = post_id => async dispatch => {
  try {
    const res = await axios.put(`/devconnector/api/v1/posts/${post_id}/unlike`)

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: post_id,
        likes: res.data
      }
    })

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}