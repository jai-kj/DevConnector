import axios from "axios"
import { setAlert } from "./alertAction"
import { 
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
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

export const getPost = post_id => async dispatch => {
  try {
    const res = await axios.get(`/devconnector/api/v1/posts/${post_id}`)

    dispatch({
      type: GET_POST,
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

export const deletePost = post_id => async dispatch => {
  if(window.confirm('Do you want to delete the post?')) {
    try {
      await axios.delete(`/devconnector/api/v1/posts/${post_id}`)
  
      dispatch({
        type: DELETE_POST,
        payload: post_id
      })
  
      dispatch(setAlert('Post Deleted Successfully', 'success'))
  
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
}

export const addNewPost = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const res = await axios.post('/devconnector/api/v1/posts', formData, config)

    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    dispatch(setAlert('Post Added Successfully', 'success'))
    
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

export const addComment = (post_id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const res = await axios.post(`/devconnector/api/v1/posts/${post_id}/comment`, formData, config)

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })

    dispatch(setAlert('Comment Added Successfully', 'success'))
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

export const removeComment = (post_id, comment_id) => async dispatch => {
  if(window.confirm('Do you want to delete the comment?')) {
    try {
      await axios.delete(`/devconnector/api/v1/posts/${post_id}/comment/${comment_id}`)

      dispatch({
        type: DELETE_COMMENT,
        payload: comment_id
      })

      dispatch(setAlert('Comment Deleted Successfully', 'success'))
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
}

