import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import styles from './index.scss';

import PostItem from '../../components/PostItem';
import { fetchPosts, refreshTimeStamps } from '../../actions/feedActions';

class ProfileContainer extends Component {
  componentDidMount() {
    const { user_id: author } = this.props.match.params;
    this.props.dispatch(fetchPosts(author));
    setInterval(() => {
      this.props.dispatch(refreshTimeStamps());
    }, 60000);
  }

  render() {
    return (
      <div className={styles.container}>
        <div>{this.props.feed.error}</div>
        <h1 className={cn('mtb20')}>{`Viewing posts for : ${this.props.match.params.user_id}`}</h1>
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

export default connect(mapStateToProps)(ProfileContainer);
