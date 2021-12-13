import React from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import Loader from '../Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const data = this.props.img;
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleKeyDown}>
        <Loader />
        <div className={styles.Modal}>
          <img src={data.src} alt={data.id} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
