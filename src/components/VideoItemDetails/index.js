import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player/lazy'
import {AiOutlineDislike, AiOutlineLike} from 'react-icons/ai'
import {RiPlayListAddLine} from 'react-icons/ri'
import WatchContext from '../../context/WatchContext'
import Header from '../Header'
import SideBar from '../SideBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Videos extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    likeStatus: false,
    saveStatus: false,
    disLikeStatus: false,
  }

  componentDidMount = () => {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }

      this.setState({
        videoDetails: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {
            videoDetails,
            disLikeStatus,
            likeStatus,
            apiStatus,
            saveStatus,
          } = this.state
          const {
            channel,
            description,
            publishedAt,
            title,
            id,
            videoUrl,
            viewCount,
          } = videoDetails
          console.log(apiStatus)
          console.log(channel)

          const likeButtonCss = likeStatus ? 'colouredButton' : ''
          const disLikeButtonCss = disLikeStatus ? 'colouredButton' : ''
          const saveText = saveStatus ? 'Saved' : 'Save'
          const saveTextCss = saveStatus ? 'colouredButton' : ''

          const {
            addLikeItem,
            updateLikeList,
            addDisLikeItem,
            updateDisLikeList,
            addSaveItem,
            updateSaveList,
            lightTheme,
          } = value

          const onLikeButton = () => {
            addLikeItem(videoDetails)
            updateDisLikeList(id)
            this.setState({
              likeStatus: true,
              disLikeStatus: false,
            })
          }

          const onDisLikeButton = () => {
            addDisLikeItem(videoDetails)
            updateLikeList(id)
            this.setState({
              likeStatus: false,
              disLikeStatus: true,
            })
          }

          const onSaveButton = () => {
            if (saveStatus === false) {
              addSaveItem(videoDetails)
            } else {
              updateSaveList(id)
            }
            this.setState(prevState => ({
              saveStatus: !prevState.saveStatus,
            }))
          }

          const forLightTheme = () => (
            <>
              <Header />
              <div className="home-bg-container-light">
                <SideBar />
                <div className="home-container-light">
                  <div className="player-wrapper">
                    <ReactPlayer
                      url={videoUrl}
                      config={{
                        youtube: {
                          playerVars: {
                            showinfo: 1,
                            origin: 'http://localhost:3000',
                          },
                        },
                        host: 'https://www.youtube.com',
                        facebook: {
                          appId: '12345',
                        },
                      }}
                    />
                  </div>
                  <h1 className="video-title-light">{title}</h1>
                  <div className="video-details-alignment">
                    <div className="view-alignment">
                      <p className="button-light">{viewCount}</p>
                      <p className="button-light">{publishedAt}</p>
                    </div>
                    <div>
                      <button
                        className="button-light"
                        onClick={onLikeButton}
                        type="button"
                      >
                        <AiOutlineLike className={likeButtonCss} />
                        <p>Like</p>
                      </button>
                      <button
                        className="button-light"
                        onClick={onDisLikeButton}
                        type="button"
                      >
                        <AiOutlineDislike className={disLikeButtonCss} />
                        <p>Dislike</p>
                      </button>
                      <button
                        className={`button-light ${saveTextCss}`}
                        onClick={onSaveButton}
                        type="button"
                      >
                        <RiPlayListAddLine />
                        <p>{saveText}</p>
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="profile-alignment-light">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                      className="video-profile"
                    />
                    <div>
                      <p>name</p>
                      <p>subscriberCount</p>
                      <p>{description}</p>
                    </div>
                  </div>
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
                  <div className="player-wrapper">
                    <ReactPlayer
                      url={videoUrl}
                      config={{
                        youtube: {
                          playerVars: {
                            showinfo: 1,
                            origin: 'http://localhost:3000',
                          },
                        },
                        host: 'https://www.youtube.com',
                        facebook: {
                          appId: '12345',
                        },
                      }}
                    />
                  </div>
                  <h1 className="video-title-dark">{title}</h1>
                  <div className="video-details-alignment">
                    <div className="view-alignment">
                      <p className="button-dark">{viewCount}</p>
                      <p className="button-dark">{publishedAt}</p>
                    </div>
                    <div>
                      <button
                        className="button-dark"
                        onClick={onLikeButton}
                        type="button"
                      >
                        <AiOutlineLike className={likeButtonCss} />
                        <p>Like</p>
                      </button>
                      <button
                        className="button-dark"
                        onClick={onDisLikeButton}
                        type="button"
                      >
                        <AiOutlineDislike className={disLikeButtonCss} />
                        <p>Dislike</p>
                      </button>
                      <button
                        className={`button-dark ${saveTextCss}`}
                        onClick={onSaveButton}
                        type="button"
                      >
                        <RiPlayListAddLine />
                        <p>{saveText}</p>
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="profile-alignment-dark">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                      className="video-profile"
                    />
                    <div>
                      <p>name</p>
                      <p>subscriberCount</p>
                      <p>{description}</p>
                    </div>
                  </div>
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

export default Videos
