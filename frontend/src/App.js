import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import Dashboard from './components/dashboard/Dashboard'

import PrivateRoute from './components/routing/PrivateRoute'

import CreateProfile from './components/profileForms/CreateProfile'
import EditProfile from './components/profileForms/EditProfile';
import AddExperience from './components/profileForms/AddExperience';
import AddEducation from './components/profileForms/AddEducation';

import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import Posts from './components/posts/Posts';

import { Provider } from 'react-redux'
import store from './store'

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/authActions';
import './App.scss';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={ Landing } />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/profiles" component={ Profiles } />
            <Route exact path="/profile/:id" component={ Profile } />
            <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
            <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
            <PrivateRoute exact path="/add-experience" component={ AddExperience } />
            <PrivateRoute exact path="/add-education" component={ AddEducation } />
            <PrivateRoute exact path="/posts" component={ Posts } />
          </Switch>
        </section>
      </Router>
    </Provider>
  )
};

export default App;
