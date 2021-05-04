import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './hexagon.scss';
import Wheel from '../../components/Wheel';
import imageBaseUrl from './../../actions/imageBaseUrl';
import { Button } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

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
  const [time, setTime] = React.useState({ d: 0, h: 0, m: 0, s: 0 });
  const [seconds, setSeconds] = React.useState(Math.abs(new Date('2021-06-01') - Date.now()) / 1000);
  const [activate, setActivate] = React.useState(false);

  const secondsToTime = (secs) => {
    let days = Math.floor(secs / (60 * 60 * 24));
    let divisor_for_hours = secs % (60 * 60 * 24);

    let hours = Math.floor(divisor_for_hours / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  };
  let timer = 0;
  useEffect(() => {
    let timeLeftVar = secondsToTime(seconds);
    setTime(timeLeftVar);
    startTimer();
  }, []);
  useEffect(() => {
    if (seconds === 0) {
      setActivate(true);
    } else {
      let timeLeftVar = secondsToTime(seconds);
      setTime(timeLeftVar);
    }
  }, [seconds]);

  const startTimer = () => {
    if (timer === 0 && seconds > 0) {
      timer = setInterval(countDown, 1000);
    }
  };

  const countDown = () => {
    setSeconds(() => seconds - 1);

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(timer);
    }
  };

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
                    {' '}
                    Claim in {time.d} D : {time.h} H : {time.m} M
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
