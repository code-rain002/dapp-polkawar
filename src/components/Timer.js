import React, { useEffect, useState } from 'react';

function Timer({ endTime }) {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(endTime) - +new Date();
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
    timerComponents.push(
      <span style={{ paddingLeft: 10 }}>
        <span style={{ padding: 5, borderRadius: 7, backgroundColor: 'orange', color: 'black' }}>
          {timeLeft[interval]}
          {interval}

          {'     '}
        </span>
      </span>,
    );
  });
  return (
    <div style={{ marginLeft: 10 }}>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span style={{ padding: 5, borderRadius: 7, backgroundColor: 'red' }}>Ended</span>
      )}
    </div>
  );
}

export default Timer;
