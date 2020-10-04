import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const DashboardActions = ({ user_id }) => {
  return (
    <div className="dash-buttons">
      <Link to={`/profile/${user_id}`} className="btn btn-light">
        <i className="fas fa-eye text-primary" />{' '}
        View Profile
      </Link>
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" />{' '}
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary" />{' '}
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary" />{' '}
        Add Education
      </Link>
    </div>
  )
}

DashboardActions.propTypes = {
  user_id: PropTypes.string.isRequired,
}

export default DashboardActions
