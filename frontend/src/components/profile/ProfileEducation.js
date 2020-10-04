import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({ 
  education: {
    school,
    degree,
    fieldofstudy,
    description,
    from,
    to
  }
}) => {
  return (
    <div>
      { school && <h3 className="dark-text">{school}</h3> }
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> - {' '}
        {
          to === null 
            ? ' Now'
            : <Moment format="YYYY/MM/DD">{to}</Moment>
        }
      </p>
      {
        degree &&
        <p>
          <strong>Degree: </strong>{ degree }
        </p>
      }
      {
        fieldofstudy &&
        <p>
          <strong>Field of Study: </strong>{ fieldofstudy }
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

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
}

export default ProfileEducation
