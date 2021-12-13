import styles from './ImageGallery.module.scss';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ hits, toggleModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      <ImageGalleryItem images={hits} openModal={toggleModal} />
    </ul>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
