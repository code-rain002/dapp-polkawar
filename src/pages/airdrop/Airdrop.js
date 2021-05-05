import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './hexagon.scss';
import Wheel from '../../components/Wheel';
import imageBaseUrl from './../../actions/imageBaseUrl';
import { Button } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import CountdownTimer from './../../components/CountdownTimer';

const useStyles = makeStyles((theme) => ({
  spacing: {
    overflowX: 'hidden',
    padding: 50,
    // background: 'url("https://wallpaperaccess.com/full/3819332.gif")',

    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
  },

  buttonMain: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    color: '#ffffff',
    padding: '12px 20px 12px 20px',
    fontWeight: 500,
    fontSize: 18,
    textTransform: 'none',
  },
  timerButton: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,

    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    color: '#ffffff',
    padding: '12px 20px 12px 20px',
    fontWeight: 400,
    fontSize: 18,
    textTransform: 'none',
  },
}));

function Airdrop({}) {
  const classes = useStyles();
  const [spinned, setSpinned] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const [activate, setActivate] = React.useState(false);

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
        <h3 className="text-center " style={{ color: 'yellow' }}>
          Spin! & Get Airdrop
        </h3>

        <Wheel items={items} spinned={spinned} setSpinned={setSpinned} />
        {spinned && (
          <div className="text-center mt-3">
            <div className={classes.root}>
              <div className={classes.container}>
                <Grow in={checked} timeout={1000}>
                  <div className="text-center ">
                    <h3 className="text-center " style={{ color: 'white', fontSize: 18 }}>
                      Congratulations! You have won.
                    </h3>
                    <div className="mt-5">
                      <img src={`${imageBaseUrl}/QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm`} height="250px" />
                    </div>
                    <div>
                      <h5 style={{ color: 'white', fontSize: 28 }}>Armor</h5>
                    </div>
                  </div>
                </Grow>
              </div>
            </div>

            <div className="mt-5">
              <Button variant="outlined" className={activate ? classes.buttonMain : classes.timerButton}>
                {activate ? (
                  'Claim Now'
                ) : (
                  <div>
                    <CountdownTimer />
                  </div>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Airdrop;
