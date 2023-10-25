import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import {Link} from 'react-router-dom'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

class Gaming extends Component {
  state = {videosList: []}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = data.videos.map(each => ({
      id: each.id,
      title: each.title,
      thumbnailUrl: each.thumbnail_url,
      viewCount: each.view_count,
    }))
    this.setState({videosList: updatedData})
  }

  getGamingVideosList = () => {
    const {videosList} = this.state
    return (
      <ul className="gaming-item-alignment">
        {videosList.map(each => {
          const {thumbnailUrl} = each
          return (
            <Link key={each.id} to={`/videos/${each.id}`} className="button">
              <div key={each.id} className="gaming-item-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="gaming-thumbnail-image"
                />
                <div className="gaming-details-alignment">
                  <p className="title-heading">{each.title}</p>
                  <p>{each.viewCount} Watching WorldWide</p>
                </div>
              </div>
            </Link>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <SideBar />
          <div className="trending-container-light">
            <div className="trending-icon-alignment">
              <SiYoutubegaming className="fire-icon" />
              <h1 className="trending-heading">Gaming</h1>
            </div>
            {this.getGamingVideosList()}
          </div>
        </div>
      </>
    )
  }
}

export default Gaming
