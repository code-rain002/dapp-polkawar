import React, { useEffect, useState } from 'react';

function Timer({ endTime }) {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
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
    timerComponents.push(
      <span style={{ paddingLeft: 10 }}>
        {timeLeft[interval]}
        {interval}
        {'     '}
      </span>,
    );
  });
  return <div>{timerComponents.length ? timerComponents : <span>Sale Ends</span>}</div>;
}

export default Timer;
