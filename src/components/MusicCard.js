import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.retrieveFavorites();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    // Esse Warning foi resolvido no Slack pelo Summer Rod
    // FONTE: https://trybecourse.slack.com/archives/C02EZT1EJSY/p1642174981051300?thread_ts=1642101209.289600&cid=C02EZT1EJSY
    this.setState = () => {};
  }

  retrieveFavorites = () => {
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
    });
    getFavoriteSongs().then((favoriteSongs) => {
      this.setState({
        isLoading: false,
        isFavorite: favoriteSongs.some((music) => music.trackId === trackId),
      });
    });
  }

  handleCheck = async () => {
    const { trackId } = this.props;
    this.setState((prevState) => ({
      isFavorite: !prevState.favorite,
      isLoading: !prevState.isLoading }));
    await addSong(trackId);
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;
    return (
      <div>
        { isLoading ? <p>Carregando...</p> : null }
        <p>{ trackName }</p>
        {/* Implementação dada no próprio README: */}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackName }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ trackName }
            checked={ isFavorite }
            onChange={ () => this.handleCheck() }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
