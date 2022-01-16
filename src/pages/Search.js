import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchArtist: '',
      isSearchButtonDisabled: true,
    };
  }

  handleChange = ({ target: { value } }) => {
    const MIN_CHAR = 2;
    const activateButton = value.length >= MIN_CHAR;
    this.setState({
      searchArtist: value,
      isSearchButtonDisabled: !activateButton,
    });
  }

  render() {
    const { searchArtist, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchArtist">
            <input
              type="text"
              name="searchArtist"
              placeholder="Nome do artista"
              data-testid="search-artist-input"
              id="searchArtist"
              value={ searchArtist }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            // onClick={ this.handleClick }
            disabled={ isSearchButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
