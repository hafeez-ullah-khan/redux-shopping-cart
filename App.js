import React, { Component } from 'react'
import { Provider } from 'react-redux' 
import store from './src/redux/store'
import HomeScreen from './src/HomeScreen' 

export default class App extends Component {
  render() {
    return ( 
      <Provider store={store}>
        <HomeScreen /> 
      </Provider>
    )
  }
}
