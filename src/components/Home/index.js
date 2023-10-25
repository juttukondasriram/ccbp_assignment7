import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import VideoItem from '../VideoItem'
import Header from '../Header'
import SideBar from '../SideBar'
import WatchContext from '../../context/WatchContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    videosList: [],
    searchResults: [],
  }

  componentDidMount() {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
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
      this.setState({
        videosList: updatedData,
        searchResults: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="videos-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
        alt="no videos"
        className="products-failure-img"
      />
    </div>
  )

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchButton = async () => {
    const {videosList, searchInput} = this.state
    const searchResults = videosList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({searchResults})
  }

  renderVideosListView = () => {
    const {searchResults} = this.state
    return (
      <ul className="list-style">
        {searchResults.map(each => (
          <VideoItem videoItem={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <WatchContext.Consumer>
        {value => {
          const {lightTheme} = value
          const forLightTheme = () => (
            <>
              <Header />
              <div className="home-bg-container-light">
                <SideBar />
                <div className="home-container-light">
                  <input
                    onChange={this.onSearchInput}
                    className="search-element-light"
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                  />
                  <button
                    data-testid="searchButton"
                    onClick={this.onSearchButton}
                    type="button"
                    className="search-button-light"
                  >
                    <AiOutlineSearch />
                  </button>
                  {this.renderAllVideos()}
                </div>
              </div>
            </>
          )

          const forDarkTheme = () => (
            <>
              <Header />
              <div className="home-bg-container-dark">
                <SideBar />
                <div className="home-container-dark">
                  <input
                    onChange={this.onSearchInput}
                    className="search-element-dark"
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                  />
                  <button
                    data-testid="searchButton"
                    onClick={this.onSearchButton}
                    type="button"
                    className="search-button-dark"
                  >
                    <AiOutlineSearch />
                  </button>
                  {this.renderAllVideos()}
                </div>
              </div>
            </>
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

export default Home
