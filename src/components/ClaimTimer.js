import React, { useEffect, useState } from "react";

function ClaimTimer({ endTime }) {
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
      <span className="text-center">
        <span
          style={{
            fontSize: 12,
            padding: 3,
            color: "#fff176",
          }}
        >
          {timeLeft[interval]}
          {interval}
        </span>
      </span>
    );
  });
  return (
    <div className="text-center">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span
          style={{ padding: 5, borderRadius: 30, backgroundColor: "green" }}
        >
          Reload
        </span>
      )}
    </div>
  );
}

export default ClaimTimer;
