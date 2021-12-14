import React from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import fetchApi from './components/ApiService/Api';

class App extends React.Component {
  state = {
    page: 1,
    images: [],
    searchValue: '',
    status: 'idle',
    showModal: false,
    largeImageURL: {},
    error: '',
  };

  componentDidMount() {
    this.setState({ status: 'pending' });
  }

  toggleModal = largeImage => {
    const largeImgData = largeImage ? largeImage : {};
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImgData,
    }));
  };

  getData(q, page) {
    fetchApi(q, page)
      .then(images => this.onPushImagesToState(images))
      .catch(error => this.setState({ error: error }));
  }

  onPushImagesToState = images => {
    this.setState(prevState => ({
      status: 'resolved',
      images: [...prevState.images, ...images.hits],
    }));
  };

  onSubmitForm = value => {
    if (value.trim() === '') return;
    if (value === this.state.searchValue) return;
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
    const { images, status, showModal, largeImageURL, searchValue } =
      this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal img={largeImageURL} toggleModal={this.toggleModal} />
        )}
        <Searchbar onSubmit={this.onSubmitForm} />
        {status === 'pending' && <Loader />}
        {searchValue.trim() === '' && (
          <h2 className="title">Введите запрос в поиск</h2>
        )}
        {images.length > 0 && (
          <ImageGallery hits={images} toggleModal={this.toggleModal} />
        )}
        {images.length > 0 && <Button incrementPage={this.onLoadMore} />}
      </div>
    );
  }
}

export default App;
