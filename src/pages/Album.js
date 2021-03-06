import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import '../css/album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      albumInfo: '',
    };
  }

  componentDidMount() {
    this.getAPI();
  }

  getAPI = async () => {
    const { match: { params: { id } } } = this.props;
    // FONTE: https://v5.reactrouter.com/web/api/match e COURSE.
    // O match serve para receber parâmetros pela URL.
    // Nesse caso, os parâmetros são passados pelo ID do objeto que é retornado na API.
    this.setState({ musicList: await getMusics(id) });
    this.setState((prevState) => ({
      albumInfo: prevState.musicList[0],
      musicList: prevState.musicList.slice(1),
    }));
  }

  render() {
    const { musicList, albumInfo } = this.state;
    return (
      <>
        <Header />
        <section data-testid="page-album" className="container">
          <div className="carta">
            <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />
          </div>
          <div className="albumInformations">
            <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
            <p data-testid="album-name">{ albumInfo.collectionName }</p>
            { musicList.map((music, index) => (
              <MusicCard
                key={ index }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                music={ music }
              />
            ))}
          </div>
        </section>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
// FONTE Sobre diferença entre objectOf e shape em propTypes:
// https://stackoverflow.com/questions/45764746/react-proptypes-objectof-vs-shape

export default Album;
