import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        nameLogin: user.name,
      });
    });
  }

  render() {
    const { nameLogin } = this.state;
    return (
      <div data-testid="header-component">
        {nameLogin ? <span data-testid="header-user-name">{ nameLogin }</span>
          : (<p>Carregando...</p>)}
        <p>Aqui está o Header</p>
      </div>
    );
  }
}

export default Header;
