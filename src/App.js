import React, { Fragment } from "react";
import Appbar from "./common/Appbar";
import Footer from "./common/Footer";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./pages/details/Details";
import { Provider } from "react-redux";
import store from "./store";
import Airdrop from "./pages/airdrop/Airdrop";
import Sale from "./pages/sale/Sale";
import Bid from "./pages/bid/Bid";
import Home from "./pages/Home/Home";
import BidDetails from "./pages/bid/BidDetails";
import BidRewards from "./components/BidRewards";
import "./web";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Fragment>
            <div style={{ minHeight: "100vh" }}>
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
                <Route exact path="/bid/:id">
                  <BidDetails />
                </Route>
                <Route exact path="/box-rewards/:pid">
                  <BidRewards />
                </Route>
                <Route exact path="/item/:id">
                  <Details />
                </Route>
                <Route exact path="/airdrop">
                  <Airdrop />
                </Route>
              </Switch>
              <div>
                <Footer />
              </div>
            </div>
          </Fragment>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}
