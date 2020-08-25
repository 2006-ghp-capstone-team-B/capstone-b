import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import {Intro} from './app/screens'
import {Login, CreateUser} from './app/screens'

const Routes = ()=> {
  return (
      <Router>
        <Scene key="root">
            <Scene
                key="home"
                title="Home"
                component={Intro}
                >
            </Scene>
            <Scene
                key="login"
                title="Login"
                component={Login}>
            </Scene>
            <Scene
                key="signup"
                title="SignUp"
                component={CreateUser}>
            </Scene>
        </Scene>
      </Router>
  )
}

export default Routes