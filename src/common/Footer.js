import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import {
  Twitter,
  Telegram,
  GitHub,
  Email,
  Instagram,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  background: {
    paddingTop: 20,
    paddingBottom: 10,
    height: "100%",
    [theme.breakpoints.down("md")]: {
      padding: 10,
    },
  },

  para: {
    fontWeight: 400,
    verticalAlign: "baseline",
    letterSpacing: "-0.8px",
    margin: 0,
    paddingTop: 15,
    paddingBottom: 10,
    textAlign: "center",
    color: "white",
    fontSize: 14,
  },

  highlight: {
    color: theme.palette.pbr.primary,
    paddingLeft: 5,
  },

  heading: {
    color: theme.palette.pbr.heading,
    textAlign: "center",
    fontSize: 36,
    fontWeight: 600,
    verticalAlign: "middle",
    wordSpacing: "0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 28,
    },
  },
  icon: {
    fontSize: 24,
    color: "#000000",
    [theme.breakpoints.down("md")]: {
      fontSize: 22,
    },
  },
  iconWrapper: {
    marginRight: 15,
    [theme.breakpoints.down("md")]: {
      marginRight: 5,
    },
  },
  iconButton: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    color: "black",
    "&:hover": {
      background: theme.palette.pbr.primary,
    },
    [theme.breakpoints.down("md")]: {
      height: 35,
      width: 35,
    },
  },
}));
export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className="container text-center">
        <div>
          <img src="/images/polkawar.png" alt="logo" height="50px" />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <div className={classes.iconWrapper}>
            <Tooltip title="Twitter" aria-label="add1">
              <a href="https://twitter.com/polkawarnft">
                <IconButton aria-label="Twitter" className={classes.iconButton}>
                  <Twitter className={classes.icon} />
                </IconButton>
              </a>
            </Tooltip>
          </div>
          <div className={classes.iconWrapper}>
            <Tooltip title="Telegram">
              <a href="https://t.me/polkawarchat">
                <IconButton
                  aria-label="Telegram"
                  className={classes.iconButton}
                >
                  <Telegram className={classes.icon} />
                </IconButton>
              </a>
            </Tooltip>
          </div>
          <div className={classes.iconWrapper}>
            <Tooltip title="Instagram">
              <a href="https://www.instagram.com/polkawarnft/">
                <IconButton
                  aria-label="Instagram"
                  className={classes.iconButton}
                >
                  <Instagram className={classes.icon} />
                </IconButton>
              </a>
            </Tooltip>
          </div>
          <div className={classes.iconWrapper}>
            <Tooltip title="Github">
              <a href="https://github.com/polkawar">
                <IconButton aria-label="Github" className={classes.iconButton}>
                  <GitHub className={classes.icon} />
                </IconButton>
              </a>
            </Tooltip>
          </div>

          <div className={classes.iconWrapper}>
            <Tooltip title="Discord">
              <a href="https://discord.gg/NQFjXkMqgk">
                <IconButton aria-label="Discord" className={classes.iconButton}>
                  <img
                    src="/images/discord.png"
                    height="30px"
                    width="30px"
                    style={{ opacity: 0.75, marginTop: 2 }}
                    alt="discord"
                  />
                </IconButton>
              </a>
            </Tooltip>
          </div>

          <div className={classes.iconWrapper}>
            <Tooltip title="Medium">
              <a href="https://medium.com/@polkawar">
                <IconButton aria-label="Discord" className={classes.iconButton}>
                  <img
                    src="/images/medium.png"
                    height="30px"
                    width="30px"
                    style={{ opacity: 0.75, marginTop: 2 }}
                    alt="medium"
                  />
                </IconButton>
              </a>
            </Tooltip>
          </div>

          <div className={classes.iconWrapper}>
            <Tooltip title="Email">
              <a href="mailto:hello@polkawar.com">
                <IconButton aria-label="Email" className={classes.iconButton}>
                  <Email className={classes.icon} />
                </IconButton>
              </a>
            </Tooltip>
          </div>
        </div>

        <p className={classes.para}>
          Copyright 2021 <span className={classes.highlight}>PolkaWar</span>.
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
