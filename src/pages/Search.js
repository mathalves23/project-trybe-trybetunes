import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/search.css';

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

  // Função realizada com ajuda das colegas Nicole Calderari e Juliane Alves
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
      <section data-testid="page-search" className="searchPage">
        <Header />
        <form className="searchForm">
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
        <section className="resultado">
          {artistName && `Resultado de álbuns de: ${artistName}`}
          { returnAlbum ? (returnArtist.map((artist) => (
            <Link
              key={ artist.collectionId }
              data-testid={ `link-to-album-${artist.collectionId}` }
              to={ `/album/${artist.collectionId}` }
            >
              <div>{artist.collectionName}</div>
            </Link>
          ))) : <p> Nenhum álbum foi encontrado </p> }
        </section>
      </section>
    );
  }
}

export default Search;
