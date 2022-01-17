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
    this.newUser();
  }
  // Lógica aprendida na monitoria de revisão do Moisés.

  async newUser() {
    const data = await getUser();
    this.setState({
      nameLogin: data.name,
    });
  }

  render() {
    const { nameLogin } = this.state;
    return (
      <header data-testid="header-component">
        <div>
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
      </header>
    );
  }
}

export default Header;
