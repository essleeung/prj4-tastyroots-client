// Packages
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Custom component
import Home from './pages/Home'
import FamilyCircle from './pages/FamilyCircle'
import Lost from './pages/Lost'
import Profile from './pages/Profile'
import Recipe from './pages/Recipe'


const Content = props => {
  return (
    <Switch>
      <Route exact path="/" render={
        () => <Home user={props.user} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} />
      } />
      <Route path="/recipes" render={
        () => <Recipe user={props.user} />
      } />
      <Route path="/familycircle" render={
        () => <FamilyCircle user={props.user} />
      } />
      <Route component={Lost} />
    </Switch>
  )
}

export default Content
