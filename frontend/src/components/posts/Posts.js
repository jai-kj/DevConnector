import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getAllPosts } from '../../actions/postActions'

import Spinner from '../layout/Spinner'
import PostItem from './PostItem'

const Posts = ({ getAllPosts, post: { loading, posts } }) => {

  useEffect(() => {
    getAllPosts()
  }, [ getAllPosts ])

  return (
    loading 
      ? <Spinner />
      : <>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user" />{' '}Welcome to the community
          </p>
          {/* Post Form */}
          {
            posts.length > 0
              ? posts.map(post => <PostItem key={post._id} post={post} />)
              : <h4>No Posts Found. Add new now!</h4>
          }
        </>
  )
}

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect( mapStateToProps, { getAllPosts } )(Posts)
