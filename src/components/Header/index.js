import './index.css'
import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import Cookies from 'js-cookie'
import WatchContext from '../../context/WatchContext'

class Header extends Component {
  onLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {lightTheme, changeTheme} = value
          const onModeChange = () => {
            changeTheme()
          }
          console.log(lightTheme)
          const forLightTheme = () => (
            <div className="header-container-light">
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  className="header-logo"
                />
              </Link>
              <div className="profile-logout-container">
                <button
                  data-testid="theme"
                  onClick={onModeChange}
                  type="button"
                  className="moon-icon"
                >
                  <FaMoon />
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-image"
                />
                <button
                  onClick={this.onLogoutButton}
                  type="button"
                  className="logout-button-light"
                >
                  Logout
                </button>
              </div>
            </div>
          )

          const forDarkTheme = () => (
            <div className="header-container-dark">
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  className="header-logo"
                />
              </Link>
              <div className="profile-logout-container">
                <button
                  data-testid="theme"
                  onClick={onModeChange}
                  type="button"
                  className="sun-icon"
                >
                  <FiSun />
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-image"
                />
                <button
                  onClick={this.onLogoutButton}
                  type="button"
                  className="logout-button-dark"
                >
                  Logout
                </button>
              </div>
            </div>
          )

          if (lightTheme === true) {
            return forLightTheme()
          }
          return forDarkTheme()
        }}
      </WatchContext.Consumer>
    )
  }
}

export default withRouter(Header)
