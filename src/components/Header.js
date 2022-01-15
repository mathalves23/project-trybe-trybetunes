import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => { // FONTE: https://pt-br.reactjs.org/docs/state-and-lifecycle.html
      this.setState({
        nameLogin: user.name,
      });
    });
  }

  render() {
    const { nameLogin } = this.state;
    return (
      <>
        <div data-testid="header-component">
          {nameLogin ? <span data-testid="header-user-name">{ nameLogin }</span>
            : (<p>Carregando...</p>)}
        </div>
        <div>
          <nav>
            <Link
              data-testid="link-to-search"
              to="/search"
            >
              Search
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
            >
              Profile

            </Link>
            {/* FONTE: https://v5.reactrouter.com/web/api/Link */}
          </nav>
        </div>
      </>
    );
  }
}

export default Header;
