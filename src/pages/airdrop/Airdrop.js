import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './hexagon.scss';
import Wheel from '../../components/Wheel';
import imageBaseUrl from './../../actions/imageBaseUrl';

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
  const items = [
    <div>
      Armor
      <img src={`${imageBaseUrl}/QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm`} height="70px" />
    </div>,
    <div>
      Helmet
      <img src={`${imageBaseUrl}/Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA`} height="70px" />
    </div>,
    <div>
      Sword
      <img src={`${imageBaseUrl}/QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE`} height="70px" />
    </div>,
    <div>
      Knife
      <img src={`${imageBaseUrl}/QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs`} height="70px" />
    </div>,
    <div>
      Tessen
      <img src={`${imageBaseUrl}/QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n`} height="70px" />
    </div>,
    <div>
      Bow
      <img src={`${imageBaseUrl}/QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd`} height="70px" />
    </div>,
    <div>
      Gun
      <img src={`${imageBaseUrl}/QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ`} height="70px" />
    </div>,
    <div>
      Wing
      <img src={`${imageBaseUrl}/QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua`} height="70px" />
    </div>,
    <div>
      Sceptre
      <img src={`${imageBaseUrl}/QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD`} height="70px" />
    </div>,
    <div>
      Magic Vase
      <img src={`${imageBaseUrl}/QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA`} height="70px" />
    </div>,
  ];
  return (
    <div className={classes.spacing}>
      <div class="mb-1">
        <h3 className="text-center " style={{ color: 'white' }}>
          Spin! & Get Airdrop
        </h3>

        <Wheel items={items} />
      </div>
    </div>
  );
}

export default Airdrop;
