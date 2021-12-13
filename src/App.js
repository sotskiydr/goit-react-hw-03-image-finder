import React from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

class App extends React.Component {
  state = {
    page: 1,
    images: [],
    searchValue: '',
    status: 'idle',
    showModal: false,
    largeImageURL: {},
  };

  componentDidMount() {
    const { searchValue, page } = this.state;
    this.setState({ status: 'pending' });
    this.getData(searchValue, page);
  }

  toggleModal = largeImage => {
    const largeImgData = largeImage ? largeImage : {};
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImgData,
    }));
  };

  getData(q, page) {
    const KEY = 'key=23877606-1096bee22002de3079c9510e6';
    const BASE_URL = `https://pixabay.com/api/?q=${q}&page=${page}&${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    fetch(BASE_URL)
      .then(r => r.json())
      .then(images => this.onPushImagesToState(images));
  }

  onPushImagesToState = images => {
    this.setState(prevState => ({
      status: 'resolved',
      images: [...prevState.images, ...images.hits],
    }));
  };

  onSubmitForm = value => {
    this.setState({
      status: 'pending',
      images: [],
      searchValue: value,
      page: 1,
    });
    this.getData(value, this.state.page);
  };

  onLoadMore = ref => {
    const { searchValue, page } = this.state;
    this.setState(prevState => ({
      status: 'pending',
      page: prevState.page + 1,
    }));
    this.getData(searchValue, page + 1);
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  render() {
    const { images, status, showModal, largeImageURL } = this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal img={largeImageURL} toggleModal={this.toggleModal} />
        )}
        <Searchbar onSubmit={this.onSubmitForm} />
        {status === 'pending' && <Loader />}
        {images.length > 0 && (
          <ImageGallery hits={images} toggleModal={this.toggleModal} />
        )}
        {images.length > 0 && <Button incrementPage={this.onLoadMore} />}
      </div>
    );
  }
}

export default App;
