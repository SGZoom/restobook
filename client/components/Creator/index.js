import React from 'react';
import cn from 'classnames';

import styles from './index.scss';

export default function Creator({ btnText, name, handleInputChange, createHandler, placeholder }) {
  return (
    <form className={cn('card', styles.container)} onSubmit={createHandler}>
      <textarea
        type={'text'}
        name={name}
        className={styles['post-text']}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <input type={'submit'} value={btnText} className={'btn btn-primary mtb10'} />
    </form>
  );
}
