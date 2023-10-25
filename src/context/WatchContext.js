import React from 'react'

const WatchContext = React.createContext({
  likeList: [],
  addLikeItem: () => {},
  updateLikeList: () => {},
  disLikeList: [],
  addDisLikeItem: () => {},
  updateDisLikeList: () => {},
  saveList: [],
  addSaveItem: () => {},
  updateSaveList: () => {},
  lightTheme: true,
  changeTheme: () => {},
})

export default WatchContext
