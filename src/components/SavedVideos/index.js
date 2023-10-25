import './index.css'
import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import WatchContext from '../../context/WatchContext'
import Header from '../Header'
import SideBar from '../SideBar'

class SavedVideos extends Component {
  getTrendingVideosList = () => (
    <WatchContext.Consumer>
      {value => {
        const {saveList} = value
        return (
          <ul>
            {saveList.map(each => {
              const {thumbnailUrl} = each
              return (
                <Link
                  key={each.id}
                  to={`/videos/${each.id}`}
                  className="button"
                >
                  <div className="trending-item-container">
                    <img
                      src={thumbnailUrl}
                      alt="title"
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
      }}
    </WatchContext.Consumer>
  )

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <SideBar />
          <div className="trending-container-light">
            <div className="trending-icon-alignment">
              <HiFire className="fire-icon" />
              <h1 className="trending-heading">Saved Videos</h1>
            </div>
            {this.getTrendingVideosList()}
          </div>
        </div>
      </>
    )
  }
}

export default SavedVideos
