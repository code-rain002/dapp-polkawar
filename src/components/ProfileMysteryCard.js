import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Slide, Backdrop, Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Loader from '../components/Loader';
import bidConnection from './../utils/bidConnection';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addUserItem } from './../actions/itemActions';
import { isBoxOpened } from '../actions/smartActions/SmartActions';
import { Link } from 'react-router-dom';

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
function ProfileMysteryCard({ item, user }) {
	const classes = useStyles();

	const [ openPopup, setOpenPopup ] = useState(false);
	const [ actualCase, setActualCase ] = useState(0);
	const [ loading, setLoading ] = useState(true);
	const [ disableOpenPopup, setDisableOpenPopup ] = useState(false);
	const [ isOpened, setIsOpened ] = useState(false);

	const toggleOpenPopup = (value) => {
		setOpenPopup(value);
	};

	useEffect(() => {
		async function asyncFn() {
			//To load Item JSON Information
			if (item !== null) {
				let openStatus = await isBoxOpened(item.tokenId);
				if (openStatus) {
					setIsOpened(true);
				} else {
					setIsOpened(false);
				}
				setLoading(false);
			} else {
				setLoading(true);
			}
		}

		asyncFn();
	}, []);

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
					let events = receipt.events;

					let returnValues = events._open.returnValues;
					let comboId = returnValues._combo;
					let nftTokenId = returnValues._nftTokenId;
					const utcDateTimestamp = new Date();
					let utcDate = utcDateTimestamp.toUTCString();

					let userItemData = {
						_id: item._id,
						token_id: nftTokenId,
						combo_id: comboId,
						token_type: 2,
						event: 'auction-reward',
						owner: userAddress,
						buydate: utcDate,
					};

					let response = await addUserItem(userItemData);
					if (response) {
						setActualCase(5);
						window.location.reload();
					} else {
						setActualCase(4);
					}
					setDisableOpenPopup(false);
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
			<Card className={classes.card1} elevation={0}>
				{loading && (
					<div>
						<Loader />
					</div>
				)}
				{!loading && (
					<div>
						<div>
							<div className={classes.mysteryboxWrapper1}>
								<img alt="item" src={`/images/mystery_box.png`} className={classes.mysterybox} />
							</div>
							<div>
								<h4 className={classes.title1}>Mystery Box</h4>
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
									{!isOpened && (
										<Button
											variant="contained"
											className={classes.openButton}
											onClick={openMysteryBox}>
											<span>Open Box</span>
										</Button>
									)}
									{isOpened && (
										<Link to={`/box-rewards/${item.tokenId}`}>
											<Button variant="contained" className={classes.openButton}>
												<span>View Rewards</span>
											</Button>
										</Link>
									)}
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
														<h5 className={classes.ModalTitle}>Transaction Status</h5>
													</div>{' '}
												</div>
												<Divider style={{ backgroundColor: 'grey' }} />
											</div>
											{actualCase === 1 && (
												<div className="text-center my-3">
													<div className="text-center">
														<Loader />
													</div>
													<h5 className={classes.messageTitle}>Waiting for confirmation!</h5>
												</div>
											)}
											{actualCase === 2 && (
												<div className="text-center my-3">
													<img src="./images/failed.png" height="100px" alt="error" />
													<h5 className={classes.messageTitle}>Transaction denied!</h5>
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
													<h5 className={classes.messageTitle}>Transaction Failed!</h5>
												</div>
											)}
											{actualCase === 5 && (
												<div className="my-3 d-flex flex-column justify-content-start">
													<div className="text-center my-3">
														<img src="./images/success.png" height="100px" alt="success" />
													</div>
													<h5 className={classes.messageTitle}>Transaction Success!</h5>
												</div>
											)}
										</div>
									</div>
								</div>
							</Dialog>
						</div>
					</div>
				)}
			</Card>
		</div>
	);
}
ProfileMysteryCard.propTypes = {
	authenticateUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.auth.authenticated,
	user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMysteryCard);
