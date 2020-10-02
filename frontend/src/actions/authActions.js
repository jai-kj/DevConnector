import axios from 'axios'
import { setAlert } from './alertAction'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types'

// Register New User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password })
  try {
    const res = await axios.post('/devconnector/api/v1/users', body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(setAlert('Registration Successful', 'success'))
  } catch (err) {
    console.error(err.response)
    const errors = err.response.data.errors
    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}