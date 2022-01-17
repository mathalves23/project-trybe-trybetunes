import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchArtist: '',
      isSearchButtonDisabled: true,
      isLoading: false,
      returnArtist: [],
      artistName: '',
      returnAlbum: true,
    };
  }

  handleChange = ({ target: { value } }) => {
    const MIN_CHAR = 2;
    this.setState({
      searchArtist: value,
      isSearchButtonDisabled: value.length < MIN_CHAR,
    });
  }

  handleClick = (e) => {
    e.preventDefault(); // FONTE: https://pt-br.reactjs.org/docs/handling-events.html
    const { searchArtist } = this.state;
    this.setState({
      isLoading: true,
    });
    searchAlbumsAPI(searchArtist).then((artist) => {
      this.setState({
        artistName: searchArtist,
        searchArtist: '',
        isLoading: false,
        returnArtist: artist,
        returnAlbum: artist.length > 0,
      });
    });
  }

  render() {
    const { searchArtist,
      isSearchButtonDisabled,
      isLoading,
      returnArtist,
      artistName,
      returnAlbum,
    } = this.state;
    return (
      <main data-testid="page-search">
        <section>
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
              onClick={ this.handleClick }
              disabled={ isSearchButtonDisabled }
            >
              Pesquisar
            </button>
          </form>
          { isLoading ? <p>Carregando...</p> : null }
        </section>
        <section>
          {artistName && `Resultado de álbuns de: ${artistName}`}
          { returnAlbum ? (returnArtist.map((artist) => (
            <Link
              key={ artist.collectionId }
              data-testid={ `link-to-album-${artist.collectionId}` }
              to={ `/album/${artist.collectionId}` }
            >
              <div>{artist.collectionName}</div>
            </Link>
          ))) : <p>Nenhum álbum foi encontrado</p> }
        </section>
      </main>
    );
  }
}

export default Search;
