// Packages
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Custom components
import Home from './pages/Home'
import FamilyCircle from './pages/FamilyCircle'
import EditProfile from './pages/EditProfile'
import Lost from './pages/Lost'
import Profile from './pages/Profile'
import Recipe from './pages/Recipe'
import RecipeDetails from './pages/RecipeDetails'
import FamilyCircleDetails from './pages/FamilyCircleDetails'
import AddTwist from './pages/AddTwist'


const Content = props => {
  return (
    <Switch>
      <Route exact path="/" render={
        () => <Home user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile/edit" render={
        () => <EditProfile user={props.user} />
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
      <Route path="/recipe/:id/twist" render={
        () => <AddTwist user={props.user} />
      } />
      <Route path="/recipe/:id" render={
        () => <RecipeDetails user={props.user} />
      } />
      <Route path="/family/:id" render={
        () => <FamilyCircleDetails user={props.user} />
      } />
      <Route component={Lost} />
    </Switch>
  )
}

export default Content
