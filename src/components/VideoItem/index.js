import './index.css'
import {Link} from 'react-router-dom'
import WatchContext from '../../context/WatchContext'

const VideoItem = props => {
  const {videoItem} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = videoItem
  const {name, profileImageUrl} = channel

  return (
    <WatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        const forLightTheme = () => (
          <Link to={`/videos/${id}`} className="button">
            <li className="video-item-container">
              <img
                src={thumbnailUrl}
                alt={title}
                className="thumbnail-image-home"
              />
              <div className="details-alignment">
                <img
                  src={profileImageUrl}
                  alt={name}
                  className="profile-image"
                />
                <div>
                  <p className="title-light">{title}</p>
                  <p className="name">{name}</p>
                  <p className="name">
                    {viewCount} views . {publishedAt}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        )

        const forDarkTheme = () => (
          <Link to={`/videos/${id}`} className="button">
            <li className="video-item-container">
              <img
                src={thumbnailUrl}
                alt={title}
                className="thumbnail-image-home"
              />
              <div className="details-alignment">
                <img
                  src={profileImageUrl}
                  alt={name}
                  className="profile-image"
                />
                <div>
                  <p className="title-dark">{title}</p>
                  <p className="name">{name}</p>
                  <p className="name">
                    {viewCount} views . {publishedAt}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        )

        if (lightTheme === true) {
          return forLightTheme()
        }
        return forDarkTheme()
      }}
    </WatchContext.Consumer>
  )
}

export default VideoItem
