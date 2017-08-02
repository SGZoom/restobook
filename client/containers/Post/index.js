import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './index.scss';

import PostItem from '../../components/PostItem';
import Comment from '../../components/Comment';
import Creator from '../../components/Creator';

import { updateNewCommentText, createNewComment, fetchPost, fetchComments } from '../../actions/postActions';

class PostContainer extends Component {
  constructor(args) {
    super(args);

    this.handleCommentCreatorInputChange = this.handleCommentCreatorInputChange.bind(this);
    this.handleCreateComment = this.handleCreateComment.bind(this);
  }
  componentDidMount() {
    const { post_id: postId } = this.props.match.params;
    this.props.dispatch(fetchPost(postId));
    this.props.dispatch(fetchComments(postId));
  }

  handleCommentCreatorInputChange(event) {
    if (event.target.name === 'comment') { this.props.dispatch(updateNewCommentText(event.target.value)); }
  }

  handleCreateComment(event) {
    const { post_id: postId } = this.props.match.params;
    event.preventDefault();
    this.props.dispatch(createNewComment(postId));
  }

  render() {
    const { post } = this.props.post;
    return (
      <div className={styles.container}>
        <div>{this.props.post.error}</div>
        <PostItem
          key={post.id}
          username={post.username}
          createdAt={post.created_at}
          text={post.text}
        />
        {
          this.props.post.comments.map(({ username, _id: id, created_at: createdAt, text }) => (
            <Comment
              key={id}
              username={username}
              createdAt={createdAt}
              text={text}
            />
          ))
        }
        <Creator
          name={'comment'}
          placeholder={'Comment on this thread'}
          btnText={'Comment'}
          handleInputChange={this.handleCommentCreatorInputChange}
          createHandler={this.handleCreateComment}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  post: state.Post,
});

export default connect(mapStateToProps)(PostContainer);
