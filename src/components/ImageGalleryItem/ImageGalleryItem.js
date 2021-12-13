import styles from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, openModal }) => {
  return images.map(el => (
    <li
      key={el.id}
      className={styles['ImageGalleryItem']}
      onClick={() => {
        openModal({ src: el.largeImageURL, id: el.id });
      }}
    >
      <img
        className={styles['ImageGalleryItem-image']}
        src={el.webformatURL}
        alt={el.id}
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func,
};

export default ImageGalleryItem;
