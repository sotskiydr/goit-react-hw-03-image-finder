import React, { useRef } from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = ({ incrementPage }) => {
  const scrollingRef = useRef();
  return (
    <button
      onClick={() => {
        incrementPage(scrollingRef);
      }}
      className={styles.Button}
      ref={scrollingRef}
      type="button"
    >
      Load More
    </button>
  );
};

Button.propTypes = {
  incrementPage: PropTypes.func.isRequired,
};

export default Button;
