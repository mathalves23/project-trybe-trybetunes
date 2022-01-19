import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/musiccard.css';

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

  // Tentativa de fazer a 11
  // handleCheck = async () => {
  //   const { trackId, isFavorite } = this.props;
  //   if (!isFavorite) {
  //     this.setState((prevState) => ({
  //       isFavorite: prevState.isFavorite,
  //       isLoading: !prevState.isLoading }));
  //     await addSong(trackId);
  //   } else {
  //     this.setState((prevState) => ({
  //       isFavorite: !prevState.isFavorite,
  //       isLoading: !prevState.isLoading }));
  //     await removeSong(trackId);
  //   }
  //   this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
  // }

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
      <section className="card">
        { isLoading ? <p>Carregando...</p> : null }
        <span>{ trackName }</span>
        {/* Implementação dada no próprio README: */}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="favorite"
            name={ trackName }
            checked={ isFavorite }
            onClick={ () => this.handleCheck() }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // isFavorite: PropTypes.string.isRequired,
};

export default MusicCard;
