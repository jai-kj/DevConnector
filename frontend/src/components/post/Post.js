import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'

const Post = ({ post: { loading, post }, match, getPost }) => {

  useEffect(() => {
    getPost(match.params.post_id)
  }, [ getPost, match.params.post_id ])
  return (
    post === null || loading 
      ? <Spinner />
      : <>
          <Link to="/posts" className="btn btn-light">Back To Posts</Link>
          <PostItem post={post} showActions={false} /> 
        </>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect( mapStateToProps, { getPost } )(Post)
