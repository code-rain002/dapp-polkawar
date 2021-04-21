import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Tune } from '@material-ui/icons';
import { ListItemText } from '@material-ui/core';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.pbr.secondary,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.black,
      },
    },
  },
}))(MenuItem);
const useStyles = makeStyles((theme) => ({
  categoryTab: {
    display: 'inline',
    border: '1px solid #616161',
    width: 'fit-content',

    borderRadius: '20px',
    fontSize: 15,
    fontWeight: 500,
    padding: '8px 20px 8px 20px',
    marginRight: '12px',
    cursor: 'pointer',
    height: '40px',

    color: theme.palette.pbr.textPrimary,
    [theme.breakpoints.down('md')]: {
      padding: '6px 14px 6px 14px',
      fontSize: 13,
      height: '35px',
      marginRight: '5px',
    },
  },
  sectionDesktop: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  sectionResponsive: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  icon: {
    fontSize: 18,
  },
}));

export default function CustomizedMenus() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={classes.sectionMobile}>
        <div
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          className={classes.categoryTab}>
          <Tune />
        </div>
      </div>
      <div className={classes.sectionDesktop}>
        <div
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          className={classes.categoryTab}>
          <Tune /> Sort
        </div>
      </div>

      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem>
          <ListItemText primary="Popularity" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Price - Low to high" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Price - High to low" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Order - A-Z" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Order - Z-A" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Level - 1-5" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Level - 5-1" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
