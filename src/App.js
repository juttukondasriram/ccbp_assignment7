import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import WatchContext from './context/WatchContext'

class App extends Component {
  state = {likeList: [], disLikeList: [], saveList: [], lightTheme: true}

  addLikeItem = listItem => {
    this.setState(prevState => ({
      likeList: [...prevState.likeList, listItem],
    }))
  }

  updateLikeList = id => {
    const {likeList} = this.state
    const searchResults = likeList.filter(each => each.id !== id)
    this.setState({likeList: searchResults})
  }

  addDisLikeItem = listItem => {
    this.setState(prevState => ({
      disLikeList: [...prevState.disLikeList, listItem],
    }))
  }

  updateDisLikeList = id => {
    const {disLikeList} = this.state
    const searchResults = disLikeList.filter(each => each.id !== id)
    this.setState({disLikeList: searchResults})
  }

  addSaveItem = listItem => {
    this.setState(prevState => ({
      saveList: [...prevState.saveList, listItem],
    }))
  }

  updateSaveList = id => {
    const {saveList} = this.state
    const searchResults = saveList.filter(each => each.id !== id)
    this.setState({saveList: searchResults})
  }

  changeTheme = () => {
    this.setState(prevState => ({
      lightTheme: !prevState.lightTheme,
    }))
  }

  render() {
    const {likeList, saveList, disLikeList, lightTheme} = this.state
    return (
      <WatchContext.Provider
        value={{
          likeList,
          saveList,
          disLikeList,
          addLikeItem: this.addLikeItem,
          updateLikeList: this.updateLikeList,
          addDisLikeItem: this.addDisLikeItem,
          updateDisLikeList: this.updateDisLikeList,
          addSaveItem: this.addSaveItem,
          updateSaveList: this.updateSaveList,
          lightTheme,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </WatchContext.Provider>
    )
  }
}

export default App
