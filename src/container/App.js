import React from 'react';
import LanguageSelector from '../components/LanguageSelector'
import UserSigninPage from '../pages/UserSigninPage';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import UserSignupPage from '../pages/UserSignupPage';
import UserPage from '../pages/UserPage';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';

const App = (props) => {

  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn
  }))

  return (
    <div>
      <Router>
        <TopBar></TopBar>
        <Switch>

          <Route exact path="/" component={HomePage} />
          {
            !isLoggedIn && (<Route path="/login" component={UserSigninPage} />)
          }
          <Route path="/signup" component={UserSignupPage} />
          <Route path="/users/:username" component={UserPage} />
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
      <LanguageSelector />
    </div>
  );

}

export default App;
