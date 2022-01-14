import React from 'react';
import { Redirect } from 'react-router-dom'; // FONTE: https://v5.reactrouter.com/web/api/Redirect
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nameLogin: '',
      isLoading: false,
      isButtonDisabled: true,
      redirectEnable: false,
    };
  }

  handleChange = ({ target: { value } }) => {
    const MIN_CHAR = 3;
    const activateButton = value.length >= MIN_CHAR;
    this.setState({
      nameLogin: value,
      isButtonDisabled: !activateButton,
    });
  }

  handleClick = () => {
    const { nameLogin } = this.state;
    this.setState({ isLoading: true });
    createUser({ name: nameLogin }).then(() => {
      this.setState({ isLoading: false, redirectEnable: true });
    });
  }

  render() {
    const { nameLogin, isLoading, isButtonDisabled, redirectEnable } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="nameLogin">
            <input
              type="text"
              name="nameLogin"
              placeholder="Nome de Usuário"
              data-testid="login-name-input"
              id="nameLogin"
              value={ nameLogin }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ isButtonDisabled }
          >
            Entrar
          </button>
          {/* Verifições com operador ternário */}
          { isLoading ? <p>Carregando...</p> : null }
          { redirectEnable ? <Redirect to="/search" /> : null}
        </form>
      </div>
    );
  }
}

export default Login;
