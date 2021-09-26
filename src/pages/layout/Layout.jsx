import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import HotCharacters from "./sections/HotCharacters";
import Categories from "./sections/Categories";
import ConnectButton from "../../components/ConnectButton";

const useStyles = makeStyles((theme) => ({
  background: {
    padding: 50,
    overflowX: "hidden",
    minHeight: "65vh",
    [theme.breakpoints.down("md")]: {
      padding: 10,
    },
  },
}));
function Home({ authenticated }) {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      {!authenticated && (
        <div>
          <ConnectButton />
        </div>
      )}
      {authenticated && (
        <div>
          <section id="hot-characters">
            <HotCharacters />
          </section>
          <section id="categories">
            <Categories />
          </section>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
