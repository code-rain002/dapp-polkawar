import React, { Fragment, useEffect, useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getTop100Characters } from "./../../actions/characterActions";
import LeaderCard from "./LeaderCard";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  title: {
    verticalAlign: "baseline",
    color: "white",
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: "2.5vw",
    textAlign: "center",
    paddingTop: 30,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
      lineHeight: "30.7px",
    },
  },
}));

function Leaderboard({ topcharacters, getTop100Characters }) {
  const classes = useStyles();
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    async function asyncFn() {
      await getTop100Characters(0);
    }
    asyncFn();
  }, []);

  const fetchMoreItems = async () => {
    await getTop100Characters(pageNo + 1);
    setPageNo(pageNo + 1);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1 className={classes.title}>
          Top 100 Characters{" "}
          <img src="images/thunder.png" height="30px" alt="thunder" />
        </h1>
      </div>

      <InfiniteScroll
        dataLength={topcharacters.length}
        next={fetchMoreItems}
        hasMore={true}
      >
        <div className="row mt-3 g-0">
          {topcharacters.map((character, index) => {
            return (
              <div className="col-6 col-md-4" key={index}>
                <div className="d-flex justify-content-center">
                  <LeaderCard item={character} />
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

Leaderboard.propTypes = {
  getTop100Characters: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  topcharacters: state.characters.topcharacters,
});

const mapDispatchToProps = { getTop100Characters };

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
