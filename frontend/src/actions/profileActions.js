import axios from 'axios'
import { setAlert } from './alertAction'
import {
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE
} from './types'

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/devconnector/api/v1/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.statusCode
      }
    })
  }
}

export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/devconnector/api/v1/profile')
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.statusCode
      }
    })
  }
}

export const getProfileById = user_id => async dispatch => {
  try {
    const res = await axios.get(`/devconnector/api/v1/profile/user/${user_id}`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.statusCode
      }
    })
  }
}

export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/devconnector/api/v1/profile/github/${username}`)
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.statusCode
      }
    })
  }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      header: {
        'Content-type': 'application/json'
      }
    }
    const res = await axios.post('/devconnector/api/v1/profile', formData, config)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

    if(!edit) {
      history.push('/dashboard')
    }

  } catch (err) {
    let errors
    if(err.response.data)
      errors = err.response.data.errors
    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')))
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.statusCode
      }
    })
  }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      header: {
        'Content-type': 'application/json'
      }
    }
    const res = await axios.put('/devconnector/api/v1/profile/experience', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'))
    history.push('/dashboard')
  } catch (err) {
    let errors
    if(err.response.data)
      errors = err.response.data.errors
    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')))
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.statusCode
      }
    })
  }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      header: {
        'Content-type': 'application/json'
      }
    }
    const res = await axios.put('/devconnector/api/v1/profile/education', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Added', 'success'))
    history.push('/dashboard')
  } catch (err) {
    let errors
    if(err.response.data)
      errors = err.response.data.errors
    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')))
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.statusCode
      }
    })
  }
}

export const deleteExperience = exp_id => async dispatch => {
  if(window.confirm('Delete Experience? This is permanent delete request!')) {
    try {
      const res = await axios.delete(`/devconnector/api/v1/profile/experience/${exp_id}`)
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      })
      dispatch(setAlert('Experience Deleted', 'success'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.statusCode
        }
      })
    }
  }
}

export const deleteEducation = edu_id => async dispatch => {
  if(window.confirm('Delete Education? This is permanent delete request!')) {
    try {
      const res = await axios.delete(`/devconnector/api/v1/profile/education/${edu_id}`)
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      })
      dispatch(setAlert('Education Deleted', 'success'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.statusCode
        }
      })
    }
  }
}

// Delete Profile & Account
export const deleteAccount = () => async dispatch => {
  if(window.confirm('Are you sure? This is permanent delete request!')) {
    try {
      await axios.delete('/devconnector/api/v1/profile')
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: DELETE_ACCOUNT })
      dispatch(setAlert('Account Deleted Permanently'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.statusCode
        }
      })
    }
  }
}