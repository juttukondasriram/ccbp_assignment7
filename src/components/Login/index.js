import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    passwordType: 'password',
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, showErrorMsg: true})
    }
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onCheckbox = () => {
    const {passwordType} = this.state
    if (passwordType === 'text') {
      this.setState({passwordType: 'password'})
    } else {
      this.setState({passwordType: 'text'})
    }
  }

  render() {
    const {
      passwordType,
      username,
      password,
      errorMsg,
      showErrorMsg,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form id="form" className="login-card-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="login-logo"
            />
          </div>
          <label htmlFor="username" className="label-element">
            USERNAME
          </label>
          <input
            value={username}
            onChange={this.onUsername}
            type="text"
            id="username"
            placeholder="Username"
            className="input-element"
          />
          <label htmlFor="password" className="label-element">
            PASSWORD
          </label>
          <input
            value={password}
            onChange={this.onPassword}
            type={passwordType}
            id="password"
            placeholder="Password"
            className="input-element"
          />
          <div className="show-password-container">
            <input
              onChange={this.onCheckbox}
              className="checkbox-element"
              type="checkbox"
              id="checkbox"
            />
            <label htmlFor="checkbox" className="label-element">
              Show Password
            </label>
          </div>
          <button
            onClick={this.onSubmitButton}
            type="submit"
            className="login-button"
          >
            Login
          </button>
          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
