import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.scss';

import PostCreator from '../../components/PostCreator';
import PostItem from '../../components/PostItem';
import { updateNewPostText, createNewPost } from '../../actions/feedActions';

class FeedContainer extends Component {
  constructor(args) {
    super(args);
    this.handlePostCreatorInputChange = this.handlePostCreatorInputChange.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
  }

  componentDidMount() {
    // call action to fetch latest posts
  }

  handlePostCreatorInputChange(event) {
    if (event.target.name === 'post') { this.props.dispatch(updateNewPostText(event.target.value)); }
  }

  handleCreatePost(event) {
    event.preventDefault();
    this.props.dispatch(createNewPost());
  }

  render() {
    return (
      <div className={styles.container}>
        <div>{this.props.feed.error}</div>
        <PostCreator
          handleInputChange={this.handlePostCreatorInputChange}
          createPost={this.handleCreatePost}
          postText={this.props.feed.newPostText}
        />
        {
          this.props.feed.posts.map(({ username, _id: id, created_at: createdAt, text }) =>
            (<PostItem
              key={id}
              username={username}
              createdAt={createdAt}
              text={text}
            />),
          )
        }
        <div />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state.Feed,
});

export default connect(mapStateToProps)(FeedContainer);
