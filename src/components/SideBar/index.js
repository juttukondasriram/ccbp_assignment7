import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import WatchContext from '../../context/WatchContext'
import './index.css'

const SideBar = () => (
  <WatchContext.Consumer>
    {value => {
      const {lightTheme} = value
      const forLightTheme = () => (
        <div className="side-bar-container-light">
          <div>
            <Link to="/" className="link-element-light">
              <div className="icon-paragraph-alignment">
                <AiFillHome className="home-icon" />
                <p className="paragraph">Home</p>
              </div>
            </Link>
            <Link to="/trending" className="link-element-light">
              <div className="icon-paragraph-alignment">
                <HiFire className="home-icon" />
                <p className="paragraph">Trending</p>
              </div>
            </Link>
            <Link to="/gaming" className="link-element-light">
              <div className="icon-paragraph-alignment">
                <SiYoutubegaming className="home-icon" />
                <p className="paragraph">Gaming</p>
              </div>
            </Link>
            <Link to="/saved-videos" className="link-element-light">
              <div className="icon-paragraph-alignment">
                <RiPlayListAddLine className="home-icon" />
                <p className="paragraph">Saved Videos</p>
              </div>
            </Link>
          </div>
          <div className="sidebar-footer-light">
            <p className="contact-us-paragraph">CONTACT US</p>
            <div>
              <img
                className="social-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                className="social-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                className="social-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
              <p className="contact-us-paragraph">
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        </div>
      )

      const forDarkTheme = () => (
        <div className="side-bar-container-dark">
          <div>
            <Link to="/" className="link-element-dark">
              <div className="icon-paragraph-alignment">
                <AiFillHome className="home-icon" />
                <p className="paragraph">Home</p>
              </div>
            </Link>
            <Link to="/trending" className="link-element-dark">
              <div className="icon-paragraph-alignment">
                <HiFire className="home-icon" />
                <p className="paragraph">Trending</p>
              </div>
            </Link>
            <Link to="/gaming" className="link-element-dark">
              <div className="icon-paragraph-alignment">
                <SiYoutubegaming className="home-icon" />
                <p className="paragraph">Gaming</p>
              </div>
            </Link>
            <Link to="/saved-videos" className="link-element-dark">
              <div className="icon-paragraph-alignment">
                <RiPlayListAddLine className="home-icon" />
                <p className="paragraph">Saved Videos</p>
              </div>
            </Link>
          </div>
          <div className="sidebar-footer-dark">
            <p className="contact-us-paragraph">CONTACT US</p>
            <div>
              <img
                className="social-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                className="social-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                className="social-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
              <p className="contact-us-paragraph">
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
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

export default SideBar
