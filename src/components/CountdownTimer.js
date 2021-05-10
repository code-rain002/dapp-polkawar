import React, { useEffect, useState } from 'react';

function CountdownTimer() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`2021-06-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        H: Math.floor((difference / (1000 * 60 * 60)) % 24),
        M: Math.floor((difference / 1000 / 60) % 60),
        S: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span style={{ paddingLeft: 10 }}>
        {timeLeft[interval]}
        {interval}
        {'     '}
      </span>,
    );
  });
  return (
    <div>
      {/* <h3 style={{ fontSize: 21 }}>Claim your airdrop</h3> */}
      {timerComponents.length ? timerComponents : <span>Claim Now</span>}
    </div>
  );
}

export default CountdownTimer;
