import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Slide, Avatar, Dialog, Backdrop } from '@material-ui/core';
import Loader from '../../components/Loader';
import Timer from '../../components/Timer';
import { getBidItem } from './../../actions/bidActions';
import BidForm from '../../components/BidForm';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	sectionCard: {
		background: `linear-gradient(0deg, rgba(26, 35, 126, 0.31), rgba(28,22, 86, 0.1))`,
		padding: 30,
		marginTop: 20,
		marginLeft: 50,
		marginRight: 50,
		borderRadius: 10,
		[theme.breakpoints.down('md')]: {
			margin: 0,
			borderRadius: 0,
			padding: 0,
		},
	},
	imageWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},

	image: {
		width: '80%',
		filter: `drop-shadow(0 0 0.9rem #1a237e)`,
		[theme.breakpoints.down('md')]: {
			width: '90%',
		},
	},
	section2: {
		backgroundColor: 'transparent',
		height: '100%',
		width: '100%',
		borderLeft: '1px solid #bdbdbd',
		paddingLeft: 20,
		[theme.breakpoints.down('md')]: {
			borderLeft: 'none',
			paddingLeft: 0,
		},
	},
	avatar: {
		color: 'orange',
		backgroundColor: 'orange',
		borderRadius: '50%',
		border: '1px solid white',
	},
	bidCard: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		borderBottom: '1px solid #616161',
	},
	bidAmount: {
		verticalAlign: 'baseline',
		textAlign: 'left',
		color: theme.palette.pbr.textPrimary,
		fontWeight: 300,
		letterSpacing: 0.5,
		fontSize: 14,
		[theme.breakpoints.down('md')]: {
			fontSize: 12,
		},
	},
	time: {
		verticalAlign: 'baseline',
		textAlign: 'left',
		color: theme.palette.pbr.textSecondary,
		fontWeight: 300,
		letterSpacing: 0.5,
		fontSize: 12,
		[theme.breakpoints.down('md')]: {
			fontSize: 10,
		},
	},
	bidButton: {
		textAlign: 'center',
		background: `linear-gradient(to right,#AF2C59, #C43262)`,
		padding: '8px 16px 8px 16px',
		marginRight: 10,
		borderRadius: 50,
		color: 'white',
		fontSize: 14,
		fontWeight: 500,
		textTransform: 'none',
		[theme.breakpoints.down('sm')]: {
			padding: '4px 8px 4px 8px',
			fontSize: 12,
		},
	},
	cancelButton: {
		textAlign: 'center',
		background: `linear-gradient(to right,#6F2F9B, #8D37A9)`,
		padding: '8px 16px 8px 16px',
		borderRadius: 50,
		color: 'white',
		fontSize: 14,
		fontWeight: 500,
		textTransform: 'none',
		[theme.breakpoints.down('sm')]: {
			padding: '4px 8px 4px 8px',
			fontSize: 12,
		},
	},

	newbidButton: {
		borderRadius: '50px',
		background: `linear-gradient(to bottom,yellow, orange)`,
		lineHeight: '24px',
		verticalAlign: 'baseline',
		letterSpacing: '-1px',
		margin: 0,
		marginTop: 5,
		marginLeft: 10,
		color: 'black',
		padding: '18px 50px 18px 50px',
		fontWeight: 400,
		fontSize: 20,
		textTransform: 'none',
		textDecoration: 'none',
		[theme.breakpoints.down('md')]: {
			padding: '12px 20px 12px 20px',
			fontSize: 18,
		},
	},
	cancelbidButton: {
		borderRadius: '50px',
		background: `linear-gradient(to bottom,#ffffff, #fffde7)`,
		lineHeight: '24px',
		verticalAlign: 'baseline',
		letterSpacing: '-1px',
		margin: 0,
		marginTop: 5,
		marginLeft: 10,
		color: 'black',
		padding: '18px 50px 18px 50px',
		fontWeight: 400,
		fontSize: 20,
		textTransform: 'none',
		textDecoration: 'none',

		[theme.breakpoints.down('md')]: {
			padding: '12px 20px 12px 20px',
			fontSize: 18,
		},
	},
	auctionWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',

		[theme.breakpoints.down('md')]: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'space-between',
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
			fontSize: 32,
		},
	},
	statusBoxHeading: {
		verticalAlign: 'baseline',
		textAlign: 'center',
		color: theme.palette.pbr.textSecondary,
		fontWeight: 500,
		fontSize: 16,
		maxWidth: 500,
		[theme.breakpoints.down('md')]: {
			paddingTop: 5,
			fontSize: 14,
		},
	},
	price: {
		verticalAlign: 'baseline',
		textAlign: 'left',
		color: '#b39ddb',
		fontWeight: 300,
		fontSize: 16,
	},
	description: {
		verticalAlign: 'baseline',
		textAlign: 'left',
		color: theme.palette.pbr.textSecondary,
		fontWeight: 500,
		fontSize: 16,

		maxWidth: 500,
		[theme.breakpoints.down('md')]: {
			fontSize: 14,
		},
	},

	timeline: {
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
	noBidText: {
		verticalAlign: 'baseline',
		textAlign: 'center',
		color: theme.palette.pbr.textPrimary,
		fontWeight: 800,
		letterSpacing: 0.5,
		fontSize: 22,
		lineHeight: '50.7px',
		[theme.breakpoints.down('md')]: {
			fontSize: 20,
			lineHeight: '40.7px',
		},
	},
	level: {
		height: '45px',
		[theme.breakpoints.down('md')]: {
			height: '30px',
		},
	},
	scrollDiv: {
		overflowY: 'scroll',
		maxHeight: 200,
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textDecoration: 'none',
		outline: 'none',
	},
}));

function Bid({ getBidItem, item }) {
	const classes = useStyles();

	const [ timerStatus, setTimerStatus ] = useState(0);
	const [ bidStatus, setBidStatus ] = useState(0);
	const [ bidPopup, setBidPopup ] = useState(false);
	const [ stopPopupClick, setStopPopupClick ] = useState(false);

	useEffect(() => {
		getBidItem(0);
		if (item !== null) {
			console.log(item);

			updateBidTimerStatus();
		}
	}, []);

	const updateBidTimerStatus = () => {
		const differenceStart = +new Date(item.time_start) - +new Date();
		const differenceEnd = +new Date(item.time_end) - +new Date();

		console.log(differenceStart);
		console.log(differenceEnd);

		if (differenceEnd <= 0) {
			setTimerStatus(1);
			console.log('Bid ends');
		} else {
			if (differenceStart > 0) {
				setTimerStatus(3);
				console.log('Bid not started');
			} else {
				setTimerStatus(4);
				console.log('Bid started');
			}
		}
	};

	return (
		<div className={classes.sectionCard}>
			{item === null && (
				<div className="text-center">
					<Loader />
				</div>
			)}
			{item !== null && (
				<div className="row g-0 mt-2">
					<div className="col-12 col-md-7">
						<div className={classes.imageWrapper}>
							<img src={`./images/mystery_box.png`} className={classes.image} alt="mysterybox" />
						</div>
					</div>
					<div className="col-12 col-md-5 p-3">
						<div className={classes.section2}>
							<div className="d-flex justify-content-between">
								<h5 className={classes.title}>{item.name}</h5>
								<div>
									<img src="./images/polkawar.png" className={classes.level} alt="level-img" />
								</div>
							</div>
							<p className={classes.description}>{item.description}</p>{' '}
							<h6 className={classes.price}>
								<span style={{ color: '#bdbdbd', paddingRight: 5 }}>Starting Bid Price: </span>
								{item.start_price} {item.currency}
							</h6>
							<h6 className={classes.price}>
								<span style={{ color: '#bdbdbd', paddingRight: 5 }}>Highest Bid Price: </span>
								{item.current_price} {item.currency}
							</h6>
							<div className="mt-5">
								<h6 className={classes.timeline}>Bids Timeline</h6>
								<hr style={{ color: 'yellow' }} />
								<div className={classes.scrollDiv}>
									{item.bidhistory.length === 0 && (
										<div className={classes.noBidText}>No bid yet</div>
									)}
									{item.bidhistory.map((row, index) => {
										return (
											<div key={index}>
												{' '}
												<div className={classes.bidCard}>
													<div className="d-flex justify-content-start">
														<div style={{ paddingRight: 15 }}>
															<Avatar
																alt="Tahir Ahmad"
																className={classes.avatar}
																src="https://cdn0.iconfinder.com/data/icons/game-elements-3/64/mage-avatar-mystery-user-magician-512.png"
															/>
														</div>
														<div>
															<h6 className={classes.bidAmount}>
																{row.price} BNB
																<span style={{ color: '#bdbdbd' }}> by</span> {' '}
																{[ ...row.address ].splice(0, 10)} {'...'}
																{[ ...row.address ].splice(
																	[ ...row.address ].length - 5,
																	5,
																)}
															</h6>
															<h6 className={classes.time}>23 mins ago</h6>
														</div>
													</div>
													<div style={{ paddingRight: 10 }}>
														<Button variant="contained" className={classes.cancelButton}>
															Cancel
														</Button>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
							<div>
								<hr className={classes.border} />
								<div className={classes.auctionWrapper}>
									<div for="highestBid">
										<p className={classes.statusBoxHeading}>Highest Bid Price</p>{' '}
										<div className="d-flex justify-content-start">
											<div style={{ paddingRight: 15 }}>
												<Avatar
													alt="Tahir Ahmad"
													className={classes.avatar}
													src="https://cdn0.iconfinder.com/data/icons/game-elements-3/64/mage-avatar-mystery-user-magician-512.png"
												/>
											</div>
											<div>
												<h6 className={classes.bidAmount}>0.53 BNB</h6>
												<h6 className={classes.time}>23 mins ago</h6>
											</div>
										</div>
									</div>

									{bidStatus === 1 && (
										<div for="bidStatus">
											<p className={classes.statusBoxHeading}>Your bid status</p>{' '}
											<div className="d-flex justify-content-start">
												<div style={{ paddingRight: 15 }}>
													<Avatar
														alt="Tahir Ahmad"
														className={classes.avatar}
														src="https://cdn0.iconfinder.com/data/icons/game-elements-3/64/mage-avatar-mystery-user-magician-512.png"
													/>
												</div>
												<div>
													<h6 className={classes.bidAmount}>0.53 BNB</h6>
													<h6 className={classes.time}>23 mins ago</h6>
												</div>
											</div>
										</div>
									)}
									<div for="auction">
										<p className={classes.statusBoxHeading}>
											{timerStatus === 4 && 'Auction ends in'}
											{timerStatus === 3 && 'Auction starts in'}

											{timerStatus === 1 && 'Auction Status'}
											{timerStatus === 0 && 'Auction Status'}
										</p>{' '}
										<div className="d-flex justify-content-start">
											<Timer endTime={item.time_end} />
										</div>
									</div>
								</div>
								<div className="d-flex justify-content-center">
									<hr style={{ width: 300, backgroundColor: '#616161', height: 1 }} />
								</div>
								<p className={classes.statusBoxHeading} />{' '}
								<div className="d-flex justify-content-evenly mt-3">
									{bidStatus === 0 && (
										<Button
											variant="contained"
											className={classes.newbidButton}
											onClick={() => setBidPopup(true)}>
											<span>Place Bid</span>
										</Button>
									)}
									{bidStatus === 1 && (
										<Button variant="contained" className={classes.cancelbidButton}>
											<span>Cancel Bid</span>
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<Dialog
				className={classes.modal}
				open={bidPopup}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setBidPopup(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				disableBackdropClick={stopPopupClick}
				BackdropProps={{
					timeout: 1000,
				}}>
				<div style={{ backgroundColor: 'black' }}>
					<BidForm />
				</div>
			</Dialog>{' '}
		</div>
	);
}

Bid.propTypes = {
	getBidItem: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	item: state.bids.item,
});

const mapDispatchToProps = { getBidItem };

export default connect(mapStateToProps, mapDispatchToProps)(Bid);
