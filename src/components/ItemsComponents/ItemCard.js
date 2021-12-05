import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import imageBaseUrl from "../../actions/imageBaseUrl";

const useStyles = makeStyles((theme) => ({
  card1: {
    width: 260,
    height: 380,
    borderRadius: 20,
    border: "4px solid #e5e5e5",
    marginBottom: 30,
    backgroundColor: "rgba(41, 42, 66, 0.3)",
    [theme.breakpoints.down("md")]: {
      width: 150,
      height: 260,
    },
  },

  title1: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 22,
    lineHeight: "35.7px",
    fontFamily: "Carter One",
    [theme.breakpoints.down("md")]: {
      fontWeight: 700,
      fontSize: 12,
    },
  },
  mediaWrapper1: {
    height: 200,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      height: 100,
    },
  },
  media: {
    height: "100%",
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      height: 100,
    },
  },
  icon: {
    color: "orange",
    fontSize: 30,
  },
  levelImage: {
    height: "16px",
    [theme.breakpoints.down("md")]: {
      height: "11px",
    },
  },
  levelText: {
    color: "white",
    fontWeight: 600,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,
    display: "block",

    [theme.breakpoints.down("md")]: {
      fontSize: 11,
      paddingTop: 10,
      paddingRight: 5,
    },
  },
  iconWrapper: {
    paddingRight: 7,
  },
  priceBadgeWrapper: {
    display: "inline-block",
    paddingTop: 20,
    [theme.breakpoints.down("md")]: {
      paddingTop: 1,
    },
  },
  pricingBadge: {
    textAlign: "left",
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    padding: "2px 10px 2px 10px",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    height: 36,
    [theme.breakpoints.down("md")]: {
      textAlign: "left",
      background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
      padding: "2px 7px 2px 7px",
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      height: 26,
      lineHeight: "16px",
    },
  },

  pricingText: {
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: 7,
      fontWeight: 600,
    },
  },
  buyNowButton: {
    textAlign: "center",
    background: `linear-gradient(to bottom,#ffffff, #e5e5e5)`,
    padding: "8px 16px 8px 16px",
    borderRadius: 50,
    color: "black",
    fontSize: 11,
    fontWeight: 500,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "4px 8px 4px 8px",
      fontSize: 10,
    },
  },
  ownedText: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
  ownerCount: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
}));
export default function ItemCard({ item }) {
  const classes = useStyles();

  return (
    <div>
      <Link to={`item/${item.id}`}>
        <Card className={classes.card1} elevation={0}>
          <div className="d-flex justify-content-between mt-2">
            <div className={classes.priceBadgeWrapper}>
              <h4 className={classes.pricingBadge}>
                <span className={classes.pricingText}>
                  {item.price} {item.currency}
                </span>
              </h4>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h6 className={classes.levelText}>Level : </h6>
              <div className={classes.iconWrapper}>
                {Array.from(Array(item.level)).map((character, index) => {
                  return (
                    <img
                      alt="level"
                      src="https://pngimg.com/uploads/star/star_PNG1597.png"
                      className={classes.levelImage}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={classes.mediaWrapper1}>
            <img
              alt="item"
              src={`${imageBaseUrl}/${item.hashImage}`}
              className={classes.media}
            />
          </div>
          <div>
            <h4 className={classes.title1}>{item.name}</h4>
          </div>
          <div className="text-center mt-4">
            <Button variant="contained" className={classes.buyNowButton}>
              <span>Purchase</span>
            </Button>
          </div>
        </Card>
      </Link>
    </div>
  );
}
