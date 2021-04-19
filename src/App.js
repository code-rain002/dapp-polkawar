import React, { Fragment } from 'react';
import Appbar from './common/Appbar';
import Home from './pages/home/Home';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import Profile from './pages/profile/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './pages/details/Details';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Fragment>
          <Appbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/character/:id">
              <Details />
            </Route>
          </Switch>
        </Fragment>
      </ThemeProvider>
    </Router>
  );
}
