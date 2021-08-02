import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import HotCharacters from "./sections/HotCharacters";
import Categories from "./sections/Categories";
import ConnectButton from "../../components/ConnectButton";

const useStyles = makeStyles((theme) => ({
  spacing: {
    overflowX: "hidden",
    padding: 50,
    // background: 'url("https://wallpaperaccess.com/full/3819332.gif")',

    [theme.breakpoints.down("md")]: {
      padding: 10,
    },
  },
}));
function Home({ authenticated }) {
  const classes = useStyles();

  return (
    <div className={classes.spacing}>
     
      {!authenticated ? (
        <div>
          <ConnectButton />
        </div>
      ) : (
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
