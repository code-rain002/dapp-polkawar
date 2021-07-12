import React, { Fragment } from 'react';
import Appbar from './common/Appbar';
import Home from './pages/home/Home';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import Profile from './pages/profile/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './pages/details/Details';
import { Provider } from 'react-redux';
import store from './store';
import Airdrop from './pages/airdrop/Airdrop';
import Sale from './pages/sale/Sale';
import Bid from './pages/bid/Bid';

export default function App() {

  return (
    <Provider store={store}>
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
              <Route exact path="/sale">
                <Sale />
              </Route>
              <Route exact path="/bid">
                <Bid />
              </Route>

              <Route exact path="/item/:id">
                <Details />
              </Route>
              <Route exact path="/airdrop">
                <Airdrop />
              </Route>
            </Switch>
            {/* <SocialLinks /> */}
          </Fragment>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}
