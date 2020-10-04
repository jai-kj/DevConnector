import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profileActions'
import Spinner from '../layout/Spinner'

const ProfileGithub = ({ username, getGithubRepos, repos }) => {

  useEffect(() => {
    getGithubRepos(username)
  }, [ getGithubRepos ])

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github" />{' '}Github Repos
      </h2>
      { 
        repos === null 
          ? <Spinner />
          : repos.length > 0 
            ? repos.map(repo => (
              <div className="repo bg-white m-1 p-1" key={repo._id}>
                <div>
                  <h4>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      { repo.name }
                    </a>
                  </h4>
                </div>
              </div>
            ))
            : "No Github Repositories"
      }
    </div>
  )
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect( mapStateToProps, { getGithubRepos } )(ProfileGithub)
