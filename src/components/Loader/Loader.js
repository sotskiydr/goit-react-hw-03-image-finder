import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LoaderElement from 'react-loader-spinner';
import styles from './Loader.module.scss';
export default class Loader extends React.Component {
  render() {
    return (
      <LoaderElement
        className={styles.loader}
        type="ThreeDots"
        color="#00BFFF"
        height={200}
        width={200}
        timeout={1000}
      />
    );
  }
}
