import { useState, useEffect } from 'react';
import { Button, Divider, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updateUsername } from './../actions/userActions';
import { createNewBid } from './../actions/bidActions';
import Loader from './Loader';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	card: {
		width: 500,
		height: 350,

		border: '1px solid #1a237e',
		borderRadius: 14,
		padding: '25px 10px 25px 10px',
		backgroundColor: 'white',
		[theme.breakpoints.down('md')]: {
			width: 350,
			padding: '5px 2px 5px 2px',
		},
	},
	title: {
		verticalAlign: 'baseline',
		textAlign: 'left',
		color: 'black',
		fontWeight: 600,
		letterSpacing: 0.9,
		fontSize: 22,
		lineHeight: '50px',
	},
	label: {
		verticalAlign: 'baseline',
		textAlign: 'left',
		color: '#8D37A9',
		fontWeight: 600,
		letterSpacing: 0.5,
		fontSize: 18,
		fontFamily: 'Balsamiq Sans',
	},
	menuItem: {
		verticalAlign: 'baseline',
		textAlign: 'left',
		color: 'black',
		fontFamily: 'Poppins',
		fontWeight: 400,
		fontSize: 14,
	},
	icon: {
		color: 'black',
	},
	iconWrapper: {
		border: '1px solid #e5e5e5',
		borderRadius: '50%',
	},
	buttonProceed: {
		color: 'white',
		marginTop: 20,
		backgroundColor: 'white',
		textTransform: 'none',
		borderRadius: '100px',
		padding: '12px 16px 12px 16px',
		fontWeight: 500,
		background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
		fontSize: 16,
	},

	textField: {
		color: 'white',
		border: '1px solid #ffffff',
		textAlign: 'left',
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 14,
		fontWeight: 400,
		paddingRight: 10,
	},
	submitButton: {
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
}));

function BidForm({ item, createNewBid }) {
	const classes = useStyles();
	const [ actualCase, setActualCase ] = useState(0);
	const [ bidAmount, setBidAmount ] = useState('0');
	const [ error, setError ] = useState('');

	useEffect(() => {
		console.log(item);
		if (item !== null) {
			console.log('Null nahin hai');
			setActualCase(1);
		} else {
			console.log('Null  hai');
		}
	}, []);

	const bidConditionCheck = () => {
		let highestBid = item.current_price;
		let currentBid = bidAmount;

		if (parseFloat(currentBid) > parseFloat(highestBid)) {
			return true;
		} else {
			return false;
		}
	};

	const submitForm = async () => {
		let errorStatus = bidConditionCheck();
		if (errorStatus) {
			setError('');
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			let userAddress = accounts[0];

			let res = await createNewBid(item.itemId, userAddress, bidAmount);

			//Calling smart contract function.
		} else {
			setError('Please enter a valid and higher bid.');
		}
	};
	return (
		<div className={classes.card}>
			{actualCase === 1 && (
				<div className="container text-center">
					<div>
						<h5 className={classes.title}>Place A Bid</h5>
					</div>

					<Divider style={{ backgroundColor: 'black' }} />
					<h6
						style={{
							color: 'black',
							textAlign: 'center',
							fontSize: 16,
							fontWeight: 300,
							paddingTop: 20,
							fontFamily: 'Balsamiq Sans',
						}}>
						Enter your bidding amount you wish to pay for the mystery box.
					</h6>
					<div className="mt-2">
						<div className="p-2 float-left">
							<div className="d-flex justify-content-between align-items-end">
								<TextField
									label={<p className={classes.label}>Bid Amount</p>}
									type="text"
									value={bidAmount}
									placeholder="Enter bid amount"
									className={classes.textField}
									onChange={(e) => setBidAmount(e.target.value)}
									fullWidth
									// error={!bidConditionCheck()}
								/>
								<h6 style={{ color: 'black', textAlign: 'left', fontSize: 16, fontWeight: 300 }}>
									BNB
								</h6>
							</div>
							<div className="float-left">
								<p
									style={{
										color: 'red',
										textAlign: 'left',
										fontSize: 14,
										fontWeight: 300,
										fontFamily: 'Balsamiq Sans',
									}}>
									{error}
								</p>
							</div>
						</div>
						<div className="text-center">
							<Button variant="contained" className={classes.submitButton} onClick={submitForm}>
								Place Bid Now
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	authenticated: state.auth.authenticated,
	user: state.auth.user,
	item: state.bids.item,
});

const mapDispatchToProps = { createNewBid };

export default connect(mapStateToProps, mapDispatchToProps)(BidForm);
