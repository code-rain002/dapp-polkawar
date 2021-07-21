import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Slide, Backdrop, Divider, IconButton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import imageBaseUrl from './../actions/imageBaseUrl';
import { tokenURI } from './../actions/smartActions/SmartActions';
import axios from 'axios';
import SellModal from '../components/SellModal';
import Loader from '../components/Loader';
import { checkApproved } from './../actions/smartActions/SmartActions';
import constants from './../utils/constants';
import itemConnection from './../utils/itemConnection';
import bidConnection from './../utils/bidConnection';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { AccessAlarm, Close } from '@material-ui/icons';
import Moment from 'react-moment';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	card1: {
		width: 300,
		height: 420,
		borderRadius: 20,
		border: '4px solid #e5e5e5',
		marginBottom: 30,
		backgroundColor: theme.palette.pbr.textPrimaryOpp,
		[theme.breakpoints.down('sm')]: {
			width: 200,
			height: 290,
		},
	},
	cardHeader: {
		height: 60,
		backgroundColor: theme.palette.pbr.primary,
	},
	title1: {
		verticalAlign: 'baseline',
		textAlign: 'center',
		color: theme.palette.pbr.textPrimary,
		fontWeight: 700,
		letterSpacing: 1,
		fontSize: 20,

		[theme.breakpoints.down('sm')]: {
			fontWeight: 700,
			fontSize: 14,
		},
	},
	mediaWrapper1: {
		height: 180,
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			height: 90,
		},
	},
	mysteryboxWrapper1: {
		height: 220,
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			height: 150,
		},
	},
	mysterybox: {
		height: '100%',
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 10,
		[theme.breakpoints.down('md')]: {
			height: 120,
		},
	},
	media: {
		height: '100%',
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 10,
		[theme.breakpoints.down('md')]: {
			height: 80,
		},
	},
	icon: {
		color: 'orange',
		fontSize: 30,
	},
	levelImage: {
		height: '16px',
		[theme.breakpoints.down('sm')]: {
			height: '12px',
		},
	},
	levelText: {
		color: 'white',
		fontWeight: 600,
		fontSize: 15,
		paddingTop: 10,
		paddingRight: 10,
		display: 'block',

		[theme.breakpoints.down('sm')]: {
			fontSize: 12,
			paddingTop: 10,
			paddingRight: 5,
		},
	},
	iconWrapper: {
		paddingRight: 7,
	},
	priceBadgeWrapper: {
		marginTop: 5,
		fontFamily: 'Balsamiq Sans',
		textAlign: 'center',
		background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))`,
		padding: '5px 40px 5px 40px',
		borderRadius: 50,
		height: '100%',
		width: 'fit-content',
		[theme.breakpoints.down('md')]: {
			marginTop: 0,
			textAlign: 'center',
			background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))`,
			padding: '5px 20px 5px 20px',
			borderRadius: 50,
			height: '100%',
			lineHeight: '16px',
			width: 'fit-content',
		},
	},

	pricingTextStrike: {
		fontFamily: 'Balsamiq Sans',

		color: 'yellow',
		fontSize: 13,
		fontWeight: 400,
		fontFamily: 'Balsamiq Sans',
		[theme.breakpoints.down('sm')]: {
			fontSize: 10,
			fontWeight: 600,
		},
	},
	pricingText: {
		fontFamily: 'Balsamiq Sans',

		color: 'white',
		fontSize: 15,
		fontWeight: 400,

		[theme.breakpoints.down('sm')]: {
			fontSize: 10,
			fontWeight: 600,
		},
	},
	sellButton: {
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
	bidButton: {
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
	openButton: {
		textAlign: 'center',
		background: `linear-gradient(to right,green, #1b5e20)`,
		padding: '8px 16px 8px 16px',
		borderRadius: 50,
		color: 'white',
		fontSize: 14,
		fontWeight: 500,
		textTransform: 'none',
		marginTop: 20,
		[theme.breakpoints.down('sm')]: {
			padding: '4px 8px 4px 8px',
			fontSize: 12,
			marginTop: 0,
		},
	},
	ownedText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 10,
		padding: 0,
		margin: 0,
	},
	ownerCount: {
		color: 'white',
		textAlign: 'center',
		fontSize: 10,
		padding: 0,
		margin: 0,
	},
	background: {
		height: '100%',
		width: 500,
		backgroundColor: 'white',
		borderRadius: 10,
		paddingBottom: 20,
		[theme.breakpoints.down('md')]: {
			maxWidth: 300,
		},
	},
	bidPopupCard: {
		height: 400,
		width: 400,
		padding: 30,
		background: `linear-gradient(to right,#6F2F9B, #8D37A9)`,
		borderRadius: 10,
		paddingBottom: 20,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			maxWidth: 300,
			height: 300,
		},
	},
	padding: {
		paddingTop: 20,
		paddingLeft: 20,
	},

	messageTitle: {
		paddingTop: 15,
		fontWeight: 400,
		verticalAlign: 'baseline',
		letterSpacing: '-0.8px',
		margin: 0,
		textAlign: 'center',
		color: 'black',
		fontSize: 25,
		[theme.breakpoints.down('md')]: {
			fontSize: 20,
			fontWeight: 400,
		},
	},
}));
function ItemProfileCard({ item, user }) {
	const classes = useStyles();
	const [ itemJson, setItemJson ] = useState(null);
	const [ eventType, setEventType ] = useState(null);
	const [ sellPopup, setSellPopup ] = useState(false);
	const [ bidPopup, setBidPopup ] = useState(false);
	const [ approvePopup, setApprovePopup ] = useState(false);
	const [ openPopup, setOpenPopup ] = useState(false);
	const [ approved, setApproved ] = useState(false);
	const [ actualCase, setActualCase ] = useState(0);
	const [ loading, setLoading ] = useState(true);
	const [ disableApprovePopup, setDisableApprovePopup ] = useState(false);
	const [ disableSellPopup, setDisableSellPopup ] = useState(false);
	const [ disableOpenPopup, setDisableOpenPopup ] = useState(false);

	const toggleSellPopup = (value) => {
		setSellPopup(value);
	};
	const toggleBidPopup = (value) => {
		setBidPopup(value);
	};

	const toggleApprovePopup = (value) => {
		setApprovePopup(value);
	};
	const toggleOpenPopup = (value) => {
		setOpenPopup(value);
	};

	useEffect(() => {
		async function asyncFn() {
			//To load Item JSON Information

			let tokenId = item.tokenId;
			setEventType(item.event);
			let itemString = await tokenURI(tokenId);
			await axios.get(`${imageBaseUrl}${itemString}`).then((res) => {
				setItemJson(res.data);
				isApproved();
			});
			setLoading(false);
		}

		asyncFn();
	}, []);

	const isApproved = async () => {
		let tokenId = item.tokenId;

		let approvedAddress = await checkApproved(tokenId);
		let ownerAddress = constants.saleContractAddress;

		if (approvedAddress.toString() === ownerAddress.toString()) {
			setApproved(true);
		} else {
			setApproved(false);
		}
	};

	const approveFn = async () => {
		toggleApprovePopup(true);
		setActualCase(1);
		setDisableApprovePopup(true);
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		let userAddress = accounts[0];

		let tokenId = item.tokenId;
		const response = await new Promise((resolve, reject) => {
			itemConnection.methods
				.approve(constants.saleContractAddress, tokenId)
				.send({ from: userAddress }, function(error, transactionHash) {
					if (transactionHash) {
						setActualCase(3);
						resolve(transactionHash);
					} else {
						//console.log('Rejected by user!');
						setActualCase(2);
						reject();
					}
				})
				.on('receipt', async function(receipt) {
					console.log('1.reloading');
					setDisableApprovePopup(false);
					window.location.reload();
					setActualCase(5);
				})
				.on('error', async function(error) {
					console.log(error);
					setActualCase(4);
					setDisableApprovePopup(false);
				});
		});
	};

	const openMysteryBox = async () => {
		let tokenId = item.tokenId;
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		let userAddress = accounts[0];

		toggleOpenPopup(true);
		setActualCase(1);
		setDisableOpenPopup(true);

		const response = await new Promise((resolve, reject) => {
			bidConnection.methods
				.open(tokenId)
				.send({ from: userAddress }, function(error, transactionHash) {
					if (transactionHash) {
						setActualCase(3);
						resolve(transactionHash);
					} else {
						//console.log('Rejected by user!');
						setActualCase(2);
						reject();
					}
				})
				.on('receipt', async function(receipt) {
					console.log('1.reloading');
					console.log(receipt);
					setDisableOpenPopup(false);
					//window.location.reload();
					setActualCase(5);
				})
				.on('error', async function(error) {
					console.log(error);
					setActualCase(4);
					setDisableOpenPopup(false);
				});
		});
	};
	return (
		<div>
			<h1 style={{ color: 'yellow' }}>{console.log(itemJson)}</h1>
			{itemJson !== null && (
				<Card className={classes.card1} elevation={0}>
					{loading && (
						<div>
							<Loader />
						</div>
					)}
					{!loading && (
						<div>
							{eventType === 'auction' && (
								<div>
									<div className={classes.mysteryboxWrapper1}>
										<img
											alt="item"
											src={`/images/mystery_box.png`}
											className={classes.mysterybox}
										/>
									</div>
									<div>
										<h4 className={classes.title1}>{itemJson.name}</h4>
									</div>
									<div className="d-flex justify-content-center">
										<div className={classes.priceBadgeWrapper}>
											<h6 style={{ color: 'white' }}>
												<strong> </strong> <span className={classes.pricingText} />
											</h6>
											<h6 style={{ color: 'white' }}>
												{' '}
												<strong> Date : </strong>
												<span className={classes.pricingText}>
													{' '}
													<Moment format="DD/MM/YYYY">{item.buyDate}</Moment>{' '}
												</span>
											</h6>
										</div>
									</div>
									<div className="text-center mt-4">
										<div>
											<Button
												variant="contained"
												className={classes.openButton}
												onClick={openMysteryBox}>
												<span>Open Box</span>
											</Button>
										</div>
									</div>
									<Dialog
										for="openbox"
										className={classes.modal}
										open={openPopup}
										TransitionComponent={Transition}
										keepMounted
										onClose={() => toggleOpenPopup(false)}
										closeAfterTransition
										BackdropComponent={Backdrop}
										disableBackdropClick={disableOpenPopup}
										BackdropProps={{
											timeout: 500,
										}}>
										<div style={{ backgroundColor: 'black' }}>
											<div>
												<div className={classes.background}>
													<div className="container text-center">
														<div className="d-flex justify-content-between">
															<div className={classes.padding}>
																<h5 className={classes.ModalTitle}>
																	Transaction Status
																</h5>
															</div>{' '}
														</div>
														<Divider style={{ backgroundColor: 'grey' }} />
													</div>
													{actualCase === 1 && (
														<div className="text-center my-3">
															<div className="text-center">
																<Loader />
															</div>
															<h5 className={classes.messageTitle}>
																Waiting for confirmation!
															</h5>
														</div>
													)}
													{actualCase === 2 && (
														<div className="text-center my-3">
															<img src="./images/failed.png" height="100px" alt="error" />
															<h5 className={classes.messageTitle}>
																Transaction denied!
															</h5>
														</div>
													)}
													{actualCase === 3 && (
														<div className="text-center my-3">
															<div className="text-center">
																<Loader />
															</div>
															<h5 className={classes.messageTitle}>
																Transaction submitted, please wait...
															</h5>
														</div>
													)}
													{actualCase === 4 && (
														<div className="text-center my-3">
															<img src="./images/failed.png" height="100px" alt="error" />
															<h5 className={classes.messageTitle}>
																Transaction Failed!
															</h5>
														</div>
													)}
													{actualCase === 5 && (
														<div className="my-3 d-flex flex-column justify-content-start">
															<div className="text-center my-3">
																<img
																	src="./images/success.png"
																	height="100px"
																	alt="success"
																/>
															</div>
															<h5 className={classes.messageTitle}>
																Transaction Success!
															</h5>
														</div>
													)}
												</div>
											</div>
										</div>
									</Dialog>
								</div>
							)}
							{eventType === 'flashsale' && (
								<div>
									<div className="d-flex justify-content-center mt-2">
										<div className="d-flex justify-content-center align-items-center">
											<h6 className={classes.levelText}>Level : </h6>
											<div className={classes.iconWrapper}>
												{Array.from(Array(parseInt(itemJson.level))).map((character) => {
													return (
														<img
															alt="level"
															src="https://pngimg.com/uploads/star/star_PNG1597.png"
															className={classes.levelImage}
														/>
													);
												})}
											</div>
										</div>
									</div>
									<div className={classes.mediaWrapper1}>
										<img
											alt="item"
											src={`${imageBaseUrl}/${itemJson.hashimage}`}
											className={classes.media}
										/>
									</div>
									<div>
										<h4 className={classes.title1}>{itemJson.name}</h4>
									</div>
									<div className="d-flex justify-content-center">
										<div className={classes.priceBadgeWrapper}>
											<h6 style={{ color: 'white' }}>
												<strong> Price :</strong>{' '}
												<span className={classes.pricingText}>0.5 BNB</span>
											</h6>
											<h6 style={{ color: 'white' }}>
												{' '}
												<strong> Date : </strong>
												<span className={classes.pricingText}>
													{' '}
													<Moment format="DD/MM/YYYY">{item.buyDate}</Moment>{' '}
												</span>
											</h6>
										</div>
									</div>
									<div className="text-center mt-4">
										{approved ? (
											<div>
												<Button
													variant="contained"
													className={classes.sellButton}
													onClick={() => toggleSellPopup(true)}>
													<span>Sell</span>
												</Button>
												<Button
													variant="contained"
													className={classes.bidButton}
													onClick={() => toggleBidPopup(true)}>
													<span>Bid</span>
												</Button>
											</div>
										) : (
											<div>
												<Button
													variant="contained"
													className={classes.bidButton}
													onClick={approveFn}>
													<span>Approve</span>
												</Button>
											</div>
										)}
									</div>
									<Dialog
										for="sale"
										className={classes.modal}
										open={sellPopup}
										TransitionComponent={Transition}
										keepMounted
										onClose={() => toggleSellPopup(false)}
										closeAfterTransition
										BackdropComponent={Backdrop}
										disableBackdropClick={disableSellPopup}
										BackdropProps={{
											timeout: 500,
										}}>
										<div style={{ backgroundColor: 'black' }}>
											<div>
												<SellModal
													closePopup={() => toggleSellPopup(false)}
													item={item}
													setDisableSellPopup={setDisableSellPopup}
												/>
											</div>
										</div>
									</Dialog>
									<Dialog
										for="bidding"
										className={classes.modal}
										open={bidPopup}
										TransitionComponent={Transition}
										keepMounted
										onClose={() => toggleBidPopup(false)}
										closeAfterTransition
										BackdropComponent={Backdrop}
										BackdropProps={{
											timeout: 500,
										}}>
										<div style={{ backgroundColor: 'black' }}>
											<div className={classes.bidPopupCard}>
												<div>
													<AccessAlarm style={{ fontSize: 44, color: 'yellow' }} />
												</div>
												<h6 style={{ fontSize: 32, color: 'white', marginTop: 10 }}>
													Coming Soon...
												</h6>
												<p style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>
													Stay tuned! Bidding feature will be available very soon.
												</p>
											</div>
										</div>
									</Dialog>
									<Dialog
										for="approve"
										className={classes.modal}
										open={approvePopup}
										TransitionComponent={Transition}
										keepMounted
										onClose={() => toggleApprovePopup(false)}
										closeAfterTransition
										BackdropComponent={Backdrop}
										disableBackdropClick={disableApprovePopup}
										BackdropProps={{
											timeout: 500,
										}}>
										<div style={{ backgroundColor: 'black' }}>
											<div>
												<div className={classes.background}>
													<div className="container text-center">
														<div className="d-flex justify-content-between">
															<div className={classes.padding}>
																<h5 className={classes.ModalTitle}>
																	Transaction Status
																</h5>
															</div>{' '}
														</div>
														<Divider style={{ backgroundColor: 'grey' }} />
													</div>
													{actualCase === 1 && (
														<div className="text-center my-3">
															<div className="text-center">
																<Loader />
															</div>
															<h5 className={classes.messageTitle}>
																Waiting for confirmation!
															</h5>
														</div>
													)}
													{actualCase === 2 && (
														<div className="text-center my-3">
															<img src="./images/failed.png" height="100px" alt="error" />
															<h5 className={classes.messageTitle}>
																Transaction denied!
															</h5>
														</div>
													)}
													{actualCase === 3 && (
														<div className="text-center my-3">
															<div className="text-center">
																<Loader />
															</div>
															<h5 className={classes.messageTitle}>
																Transaction submitted, please wait...
															</h5>
														</div>
													)}
													{actualCase === 4 && (
														<div className="text-center my-3">
															<img src="./images/failed.png" height="100px" alt="error" />
															<h5 className={classes.messageTitle}>
																Transaction Failed!
															</h5>
														</div>
													)}
													{actualCase === 5 && (
														<div className="my-3 d-flex flex-column justify-content-start">
															<div className="text-center my-3">
																<img
																	src="./images/success.png"
																	height="100px"
																	alt="success"
																/>
															</div>
															<h5 className={classes.messageTitle}>
																Transaction Success!
															</h5>
														</div>
													)}
												</div>
											</div>
										</div>
									</Dialog>
								</div>
							)}
						</div>
					)}
				</Card>
			)}
		</div>
	);
}
ItemProfileCard.propTypes = {
	authenticateUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.auth.authenticated,
	user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ItemProfileCard);
