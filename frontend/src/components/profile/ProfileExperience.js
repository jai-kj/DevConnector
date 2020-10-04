import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({ 
  experience: {
    company,
    title,
    description,
    from,
    to
  }
}) => {
  return (
    <div>
      { company && <h3 className="dark-text">{company}</h3> }
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> - {' '}
        {
          to === null 
            ? ' Now'
            : <Moment format="YYYY/MM/DD">{to}</Moment>
        }
      </p>
      {
        title &&
        <p>
          <strong>Position: </strong>{ title }
        </p>
      }
      {
        description &&
        <p>
          <strong>Description: </strong>{ description }
        </p>
      }
    </div>
  )
}

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ProfileExperience
