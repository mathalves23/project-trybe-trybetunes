import React from 'react';
import propTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

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

  async getAPI() {
    const { match: { params: { id } } } = this.props; // FONTE: https://v5.reactrouter.com/web/api/match
    this.setState({ musicList: await getMusics(id) });
    this.setState((prevState) => ({
      albumInfo: prevState.musicList[0],
      musicList: prevState.musicList.slice(1),
    }));
  }

  render() {
    const { musicList, albumInfo } = this.state;
    return (
      <main data-testid="page-album">
        <Header />
        <div>
          <h1 data-testid="artist-name">{ albumInfo.artistName }</h1>
          <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
          { musicList.map((music, index) => (
            <MusicCard
              key={ index }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))}
        </div>
      </main>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
// FONTE Sobre diferença entre objectOf e shape:
// https://stackoverflow.com/questions/45764746/react-proptypes-objectof-vs-shape

export default Album;
