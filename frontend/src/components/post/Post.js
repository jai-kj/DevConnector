import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'

import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

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
          <CommentForm post_id={match.params.post_id} /> 
          <div className="comments">
            {
              post.comments.length > 0 
                ? post.comments.map(comment => <CommentItem comment={comment} key={comment._id} post_id={post._id} />)
                : <h4>No Comment Made Yet. Add new now!</h4>
            }
          </div>
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
