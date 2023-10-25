import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

class Trending extends Component {
  state = {videosList: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
      channel: {
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      },
      viewCount: each.view_count,
      publishedAt: each.published_at,
    }))
    this.setState({videosList: updatedData})
  }

  getTrendingVideosList = () => {
    const {videosList} = this.state
    return (
      <ul>
        {videosList.map(each => {
          const {thumbnailUrl} = each
          return (
            <Link key={each.id} to={`/videos/${each.id}`} className="button">
              <div className="trending-item-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnail-image"
                />
                <div className="trending-details-alignment">
                  <h1 className="title-heading">{each.title}</h1>
                  <p>{each.channel.name}</p>
                  <p>
                    {each.viewCount} . {each.publishedAt}
                  </p>
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
              <HiFire className="fire-icon" />
              <h1 className="trending-heading">Trending</h1>
            </div>
            {this.getTrendingVideosList()}
          </div>
        </div>
      </>
    )
  }
}

export default Trending
