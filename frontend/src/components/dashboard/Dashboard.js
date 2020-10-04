import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profileActions';
import { Link } from 'react-router-dom';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          {profile.experience.length > 0 && (
            <Experience experience={profile.experience} />
          )}
          {profile.education.length > 0 && (
            <Education education={profile.education} />
          )}
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>
            No profile set yet! <b>Create Now</b>
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
