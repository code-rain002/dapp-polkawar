import React, { Fragment } from 'react';
import Appbar from './common/Appbar';
import Home from './pages/Home/Home';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import Profile from './pages/Home/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
          </Switch>
        </Fragment>
      </ThemeProvider>
    </Router>
  );
}
