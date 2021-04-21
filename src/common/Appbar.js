import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import { AccountBalanceWallet, Close } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    color: theme.palette.pbr.textPrimary,
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },

  tabs: {
    color: theme.palette.pbr.textSecondary,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    cursor: 'pointer',
    padding: '15px 14px 15px',
    lineHeight: '20.7px',
    verticalAlign: 'baseline',
    wordSpacing: '0px',
    margin: 0,
    fontWeight: 600,
    fontStyle: 'normal',
    letterSpacing: 0.1,
    textAlign: 'start',
  },
  tabsActive: {
    color: theme.palette.pbr.textPrimary,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    cursor: 'pointer',
    padding: '15px 14px 15px',
    lineHeight: '20.7px',
    verticalAlign: 'baseline',
    wordSpacing: '0px',
    margin: 0,
    fontWeight: 600,
    fontStyle: 'normal',
    letterSpacing: 0.1,
    textAlign: 'start',
  },
  balanceButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #616161',
    // background: 'linear-gradient(73.28deg,#D9047C 6.51%,#BF1088 88.45%)',
    background: 'linear-gradient(73.28deg,#49b1fc 6.51%,#821aeb 88.45%)',
    borderRadius: '20px',
    position: 'relative',
    padding: '0 12px 0 40px',
    minWidth: '60px',
    marginLeft: '16px',
    marginRight: '12px',
    marginTop: 5,
    height: '40px',
    maxWidth: 'calc(100% - 20px);',
  },
  buttonIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: '-4px',
    top: '6px',
  },

  icon: {
    fontSize: 24,
    color: theme.palette.pbr.textPrimaryOpp,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    backgroundColor: 'transparent',
  },
  menuIcon: {
    color: '#212121',
  },
  list: {
    width: '250px',
    borderBottom: '5px solid pink',
    borderColor: theme.palette.pbr.primary,
    height: '100%',
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
  },
  fullList: {
    width: 'auto',
  },
  menuTitle: {
    paddingLeft: 25,
    fontWeight: 500,
    verticalAlign: 'baseline',
    letterSpacing: '-0.8px',
    textAlign: 'left',
    fontSize: 1,
    color: theme.palette.pbr.textPrimary,
  },
  menuTitlePink: {
    paddingLeft: 25,
    fontWeight: 500,
    verticalAlign: 'baseline',
    letterSpacing: '-0.8px',
    textAlign: 'left',
    fontSize: 16,
    color: theme.palette.pbr.primary,
  },
  mobileLink: {
    color: theme.palette.pbr.textSecondaryOpp,
    textDecoration: 'none',
  },
  mobileButton: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-0.8px',
    margin: 0,
    color: '#ffffff',
    padding: '5px 15px 5px 15px',
    fontWeight: 600,
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [navIndex, setNavIndex] = useState(0);
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <div className="d-flex justify-content-between">
        <div>
          <List>
            {[
              { name: 'Explore', link: '/' },
              { name: 'My items', link: '/profile' },
              { name: 'Following', link: '/profile' },
              { name: 'Activity', link: '/profile' },
            ].map((tab, index) => (
              <Link to={tab.link}>
                <ListItem button onClick={toggleDrawer(anchor, false)} key={index}>
                  <ListItemText primary={tab.name} className={classes.menuTitle} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {[
              { name: 'How it works', id: 'https://farm.polkabridge.org/' },
              { name: 'Community', id: 'https://launchpad.polkabridge.org/' },
            ].map((tab, index) => (
              <a href={tab.id} className={classes.mobileLink}>
                <ListItem button key={tab.name}>
                  <ListItemText primary={tab.name} className={classes.menuTitle} />
                </ListItem>
              </a>
            ))}
            <ListItem button>
              <a href="docs/whitepaper.pdf" style={{ textDecoration: 'none' }}>
                <ListItemText primary={'Read Whitepaper'} className={classes.menuTitlePink} />
              </a>
            </ListItem>
          </List>
        </div>
        <div style={{ color: 'white', paddingTop: 10, paddingRight: 10 }}>
          <Close onClick={toggleDrawer(anchor, false)} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: '#16181D', boxShadow: 'none', borderBottom: '1px solid #e9e9e9' }}>
        <Toolbar className="d-flex justify-content-around">
          {' '}
          <Link to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              <img src="images/symbol.png" alt="logo" height="40px" /> PolkaWar
            </Typography>
          </Link>
          <div className="d-flex justify-content-end">
            <Link to="/">
              <Typography
                variant="subtitle1"
                noWrap
                className={navIndex === 0 ? classes.tabsActive : classes.tabs}
                onClick={() => setNavIndex(0)}>
                Explore
              </Typography>
            </Link>
            <Link to="/profile">
              <Typography
                variant="subtitle1"
                noWrap
                className={navIndex === 1 ? classes.tabsActive : classes.tabs}
                onClick={() => setNavIndex(1)}>
                My items
              </Typography>
            </Link>
            <Typography className={classes.tabs} variant="subtitle1" noWrap>
              Following
            </Typography>
            <Link to="/profile">
              {' '}
              <Typography
                variant="subtitle1"
                noWrap
                className={navIndex === 3 ? classes.tabsActive : classes.tabs}
                onClick={() => setNavIndex(3)}>
                Activity
              </Typography>{' '}
            </Link>
            <Typography className={classes.tabs} variant="subtitle1" noWrap>
              |
            </Typography>
            <Typography className={classes.tabs} variant="subtitle1" noWrap>
              How it works
            </Typography>
            <Typography className={classes.tabs} variant="subtitle1" noWrap>
              Community
            </Typography>
            <div className={classes.sectionDesktop}>
              <div>
                <Button className={classes.balanceButton}>
                  <div className={classes.buttonIcon}>
                    <AccountBalanceWallet className={classes.icon} />
                  </div>
                  <div>
                    <strong style={{ color: '#e5e5e5' }}>386</strong>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <div>
              <Link to="/">
                <img src="logo.png" alt="logo" height="50px" />
              </Link>
            </div>

            <div>
              {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <IconButton
                    aria-label="Menu"
                    aria-haspopup="true"
                    className={classes.menuIcon}
                    onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon style={{ color: 'white' }} />
                  </IconButton>

                  <SwipeableDrawer
                    anchor={anchor}
                    disableSwipeToOpen={false}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}>
                    {list(anchor)}
                  </SwipeableDrawer>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
