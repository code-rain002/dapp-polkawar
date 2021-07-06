import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Twitter, Telegram, GitHub, Email } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  background: {
    paddingTop: 50,
    paddingBottom: 50,

    [theme.breakpoints.down('sm')]: {
      height: '100%',
      padding: 0,
      paddingTop: 25,
      paddingBottom: 25,
    },
  },
  heading: {
    color: theme.palette.pbr.textPrimary,
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 500,
    verticalAlign: 'middle',
    wordSpacing: '0px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },
  para: {
    fontWeight: 400,
    color: theme.palette.pbr.textSecondary,
    verticalAlign: 'baseline',
    letterSpacing: '-0.8px',
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },

  highlight: {
    color: theme.palette.pbr.primary,
  },
  icon: {
    fontSize: 32,
    color: theme.palette.pbr.textSecondary,
    '&:hover': {
      color: theme.palette.pbr.primary,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  iconWrapper: {
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      marginRight: 2,
    },
  },
}));
export default function SocialLinks() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className="text-center">
        <div>
          <div className="d-flex justify-content-center mt-4">
            <div className={classes.iconWrapper}>
              <Tooltip title="Twitter" aria-label="add1">
                <a href="https://twitter.com/polkawarnft">
                  <IconButton aria-label="Twitter">
                    <Twitter className={classes.icon} />
                  </IconButton>
                </a>
              </Tooltip>
            </div>
            <div className={classes.iconWrapper}>
              <Tooltip title="Telegram">
                <a href="https://t.me/polkawarchat">
                  <IconButton aria-label="Telegram">
                    <Telegram className={classes.icon} />
                  </IconButton>
                </a>
              </Tooltip>
            </div>
            <div className={classes.iconWrapper}>
              <Tooltip title="Medium">
                <a href="https://medium.com/@polkawar">
                  <IconButton aria-label="Medium">
                    <img src="/images/medium.png" style={{ height: 25, marginTop: 5, borderRadius: '50%' }} />
                  </IconButton>
                </a>
              </Tooltip>
            </div>{' '}
            <div className={classes.iconWrapper}>
              <Tooltip title="Discord">
                <a href="https://discord.gg/NQFjXkMqgk">
                  <IconButton aria-label="Discord">
                    <img src="/images/discord.png" style={{ height: 20, marginTop: 7 }} />
                  </IconButton>
                </a>
              </Tooltip>
            </div>
            <div className={classes.iconWrapper}>
              <Tooltip title="Github">
                <a href="https://github.com/polkawar">
                  <IconButton aria-label="Github">
                    <GitHub className={classes.icon} />
                  </IconButton>
                </a>
              </Tooltip>
            </div>
            <div className={classes.iconWrapper}>
              <Tooltip title="Email">
                <a href="mailto:hello@polkawar.com">
                  <IconButton aria-label="Email">
                    <Email className={classes.icon} />
                  </IconButton>
                </a>
              </Tooltip>
            </div>
          </div>
          <p className={classes.para}>
            Copyright 2021 <span className={classes.highlight}>PolkaWar</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
