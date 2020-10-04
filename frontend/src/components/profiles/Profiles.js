import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ProfileItem from './ProfileItem'
import Spinner from '../layout/Spinner'

import { connect } from 'react-redux'
import { getAllProfiles } from '../../actions/profileActions'

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {

  useEffect(() => {
    getAllProfiles()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <h1 className="large text-primary">
        Developers
      </h1>
      <p className="lead">
        <i className="fab fa-connectdevelop" />{' '}
        Browse and connect with developers
      </p>
      {
        loading ? <Spinner /> :
        <div className="profiles">
          { 
            profiles.length > 0 
              ? profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
              : <h4>No Profiles Found...</h4>
          }
        </div>
      }
    </>
  )
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect( mapStateToProps, { getAllProfiles } )(Profiles)
