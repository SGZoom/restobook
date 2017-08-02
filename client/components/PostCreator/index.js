import React from 'react';
import cn from 'classnames';

import styles from './index.scss';

export default function PostCreator({ handleInputChange, createPost }) {
  return (
    <form className={cn('card', styles.container)} onSubmit={createPost}>
      <textarea
        type={'text'}
        name={'post'}
        className={styles['post-text']}
        placeholder={'What do you want to tell the world?'}
        onChange={handleInputChange}
      />
      <input type={'submit'} value={'Post'} className={'btn btn-primary mtb10'} />
    </form>
  );
}
