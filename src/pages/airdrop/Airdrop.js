import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './hexagon.scss';

const useStyles = makeStyles((theme) => ({
  spacing: {
    overflowX: 'hidden',
    padding: 50,
    // background: 'url("https://wallpaperaccess.com/full/3819332.gif")',

    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
  },
  title: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 32,
    lineHeight: '40.7px',
    [theme.breakpoints.down('md')]: {
      fontSize: 22,
      lineHeight: '30.7px',
    },
  },
  price: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '30.7px',
  },
  description: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '25.7px',
    maxWidth: 500,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  categoryTab: {
    display: 'inline-block',
    border: '1px solid #616161',
    borderRadius: '20px',
    fontSize: 16,
    fontWeight: 500,
    padding: '8px 20px 8px 20px',
    minWidth: '60px',
    marginTop: 10,
    marginBottom: 10,
    cursor: 'pointer',
    color: theme.palette.pbr.textPrimary,
    [theme.breakpoints.down('md')]: {
      padding: '6px 14px 6px 14px',
      fontSize: 13,
      height: '35px',
      marginRight: '5px',
    },
  },
  buyHistory: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 22,
    lineHeight: '30.7px',
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
    },
  },
  levelText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,
  },
  imageWrapper: {
    padding: 30,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  button: {
    color: '#D9047C',
    backgroundColor: 'white',
    textTransform: 'none',
    borderRadius: '50px',
    padding: '8px 16px 8px 16px',
    fontWeight: 400,
    background: `linear-gradient(to bottom,#fce3ee, #fce3ee)`,
    fontSize: 14,
  },
  buttonMain: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    color: '#ffffff',
    padding: '8px 16px 8px 16px',
    fontWeight: 400,
    fontSize: 14,
    textTransform: 'none',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    outline: 'none',
  },
}));

function Airdrop({}) {
  const classes = useStyles();

  return (
    <div className={classes.spacing}>
      <div className="">
        <div>
          <h1 className="heading">Get Airdrop</h1>
        </div>
        <div>
          <div class="mt-3">
            <div class="hexagon"></div>
            <div>Sword</div>
          </div>
          <div class="mt-3">
            <div class="hexagon">
              <div>Sword</div>
            </div>
          </div>
          <div class="mt-3">
            <div class="hexagon">
              <div>Sword</div>
            </div>
          </div>
          <div class="mt-3">
            <div class="hexagon">
              <div>Sword</div>
            </div>
          </div>
          <div class="mt-3">
            <div class="hexagon">
              <div>Sword</div>
            </div>
          </div>
          <div class="mt-3">
            <div class="hexagon"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Airdrop;
