import React from 'react';
import styles from './Searchbar.module.scss';

class Searchbar extends React.Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles['SearchForm-button']}>
            <span className={styles['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={styles['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={e => {
              this.handleChange(e);
            }}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
