import React, { useEffect, useState } from 'react';

function CountdownTimer({ enableClaim }) {
	const calculateTimeLeft = () => {
		let year = new Date().getFullYear();
		const difference = +new Date(`August 1, 2021 15:00:00 UTC`) - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				D: Math.floor(difference / (1000 * 60 * 60 * 24)),
				H: Math.floor((difference / (1000 * 60 * 60)) % 24),
				M: Math.floor((difference / 1000 / 60) % 60),
				S: Math.floor((difference / 1000) % 60),
			};
		} else {
			enableClaim(true);
		}

		return timeLeft;
	};

	const [ timeLeft, setTimeLeft ] = useState(calculateTimeLeft());

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
	return <div>{timerComponents.length ? timerComponents : <span>Claim Now</span>}</div>;
}

export default CountdownTimer;
