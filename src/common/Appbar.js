import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	ListItem,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	SwipeableDrawer,
	List,
	Divider,
	ListItemText,
	Backdrop,
	Button,
	Dialog,
	Snackbar,
} from '@material-ui/core';
import clsx from 'clsx';
import { AccountBalanceWallet, Close } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { authenticateUser, signOutUser } from './../actions/authActions';
import web3 from './../web';
import MuiAlert from '@material-ui/lab/Alert';
import BalancePopup from './BalancePopup';
import { getPwarBalance } from './../actions/smartActions/SmartActions';
import constants from './../utils/constants';
import { checkCorrectNetwork, checkWalletAvailable } from './../actions/web3Actions';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textDecoration: 'none',
		outline: 'none',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		color: theme.palette.pbr.textPrimary,
		[theme.breakpoints.up('md')]: {
			display: 'block',
		},
	},

	tabs: {
		color: theme.palette.pbr.textSecondary,
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block',
		},
		cursor: 'pointer',
		padding: '15px 14px 15px',
		lineHeight: '20.7px',
		verticalAlign: 'baseline',
		wordSpacing: '0px',
		margin: 0,
		fontWeight: 500,
		fontStyle: 'normal',
		letterSpacing: 0.1,
		textAlign: 'start',
	},
	tabsActive: {
		color: theme.palette.pbr.textPrimary,
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block',
		},
		cursor: 'pointer',
		padding: '15px 14px 15px',
		lineHeight: '20.7px',
		verticalAlign: 'baseline',
		wordSpacing: '0px',
		margin: 0,
		fontWeight: 500,
		fontStyle: 'normal',
		letterSpacing: 0.1,
		textAlign: 'start',
	},
	balanceButton: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		border: '1px solid #616161',
		background: 'transparent',
		// background: 'linear-gradient(73.28deg,#D9047C 6.51%,#BF1088 88.45%)',
		// background: 'linear-gradient(73.28deg,#49b1fc 6.51%,#821aeb 88.45%)',
		borderRadius: '20px',
		position: 'relative',
		padding: '0 12px 0 40px',
		minWidth: '60px',
		marginLeft: '16px',
		marginRight: '12px',
		marginTop: 5,
		height: '40px',
		maxWidth: 'calc(100% - 20px);',
	},
	buttonIcon: {
		width: 40,
		height: 40,
		position: 'absolute',
		left: '-4px',
		top: '6px',
	},

	icon: {
		fontSize: 24,
		color: '#616161',
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		width: '100vw',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
		backgroundColor: 'transparent',
	},
	menuIcon: {
		color: '#212121',
	},
	list: {
		width: '250px',
		borderBottom: '5px solid pink',
		borderColor: theme.palette.pbr.primary,
		height: '100%',
		backgroundColor: theme.palette.pbr.textPrimaryOpp,
	},
	fullList: {
		width: 'auto',
	},
	menuTitle: {
		paddingLeft: 25,
		fontWeight: 500,
		verticalAlign: 'baseline',
		letterSpacing: '-0.8px',
		textAlign: 'left',
		fontSize: 1,
		color: theme.palette.pbr.textPrimary,
	},
	menuTitlePink: {
		paddingLeft: 25,
		fontWeight: 500,
		verticalAlign: 'baseline',
		letterSpacing: '-0.8px',
		textAlign: 'left',
		fontSize: 16,
		color: theme.palette.pbr.primary,
	},
	mobileLink: {
		color: theme.palette.pbr.textSecondaryOpp,
		textDecoration: 'none',
	},
	mobileButton: {
		borderRadius: '50px',
		background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
		lineHeight: '24px',
		verticalAlign: 'baseline',
		letterSpacing: '-0.8px',
		margin: 0,
		color: '#ffffff',
		padding: '5px 15px 5px 15px',
		fontWeight: 500,
	},
	airdropButton: {
		borderRadius: '50px',
		background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
		lineHeight: '24px',
		verticalAlign: 'baseline',
		letterSpacing: '-1px',
		margin: 0,
		marginTop: 5,
		marginLeft: 10,
		color: '#ffffff',
		padding: '8px 16px 8px 16px',
		fontWeight: 400,
		fontSize: 16,
		textTransform: 'none',
		textDecoration: 'none',
	},

	saleButton: {
		borderRadius: '50px',
		background: `linear-gradient(to bottom,yellow, orange)`,
		lineHeight: '24px',
		verticalAlign: 'baseline',
		letterSpacing: '-1px',
		margin: 0,
		marginTop: 5,
		marginLeft: 10,
		color: 'black',
		padding: '8px 16px 8px 16px',
		fontWeight: 400,
		fontSize: 16,
		textTransform: 'none',
		textDecoration: 'none',
	},
	bidButton: {
		borderRadius: '50px',
		background: `linear-gradient(to right,#6F2F9B, #8D37A9)`,
		lineHeight: '24px',
		verticalAlign: 'baseline',
		letterSpacing: '-1px',
		margin: 0,
		marginTop: 5,
		marginLeft: 10,
		color: 'white',
		padding: '8px 20px 8px 20px',
		fontWeight: 400,
		fontSize: 16,
		textTransform: 'none',
		textDecoration: 'none',
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function PrimaryAppbar({ authenticateUser, authenticated, user, signOutUser }) {
	const classes = useStyles();
	const [navIndex, setNavIndex] = useState(0);
	const [userData, setUserData] = useState(null);
	const [ethBal, setEthBal] = useState(null);
	const [pwarBal, setPwarBal] = useState(10);
	const [userAdd, setUserAdd] = useState(null);
	const [popup, setPopup] = useState(false);

	const [state, setState] = React.useState({
		right: false,
	});
	const [alert, setAlert] = React.useState({ status: false, message: '' });
	const vertical = 'top';
	const horizontal = 'right';

	const handleClose = () => {
		setAlert({ status: false, message: '' });
	};

	const toggleDrawer = (anchor, open) => (event) => {
		setState({ ...state, [anchor]: open });
	};
	const togglePopup = (value) => {
		setPopup(value);
	};

	const signOut = (currentAddress) => {
		signOutUser(currentAddress);
		setPopup(false);
	};
	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}>
			<div className="d-flex justify-content-between">
				<div>
					<List>
						{[
							{ name: 'Shop', link: '/' },
							{ name: 'My Home', link: '/profile' },
							{ name: 'Battle Room', link: '/profile' },
						].map((tab, index) => (
							<Link to={tab.link}>
								<ListItem button onClick={toggleDrawer(anchor, false)} key={index}>
									<ListItemText primary={tab.name} className={classes.menuTitle} />
								</ListItem>
							</Link>
						))}
					</List>
					<Divider />
					<List>
						{[
							{ name: 'Landing Page', id: 'https://polkawar.com' },
							{ name: 'Get Airdrop', id: '/airdrop' },
						].map((tab, index) => (
							<a href={tab.id} className={classes.mobileLink}>
								<ListItem button key={tab.name}>
									<ListItemText primary={tab.name} className={classes.menuTitle} />
								</ListItem>
							</a>
						))}
						<Link to={'/sale'}>
							<ListItem button onClick={toggleDrawer(anchor, false)} key={39}>
								<ListItemText
									primary={'Flash Sale'}
									className={classes.menuTitle}
									style={{ color: 'yellow' }}
								/>
							</ListItem>
						</Link>
						<Link to={'/bid'}>
							<ListItem button onClick={toggleDrawer(anchor, false)} key={39}>
								<ListItemText
									primary={'Auction'}
									className={classes.menuTitle}
									style={{ color: '#8D37A9' }}
								/>
							</ListItem>
						</Link>
						<ListItem button>
							<div>
								<Button className={classes.balanceButton}>
									<div className={classes.buttonIcon}>
										<AccountBalanceWallet className={classes.icon} />
									</div>
									<div>
										<strong style={{ color: '#616161' }}>
											{ethBal !== null && parseFloat(ethBal).toFixed(4) + ' BNB'}{' '}
										</strong>
									</div>
								</Button>
							</div>
						</ListItem>
					</List>
				</div>
				<div style={{ color: 'white', paddingTop: 10, paddingRight: 10 }}>
					<Close onClick={toggleDrawer(anchor, false)} />
				</div>
			</div>
		</div>
	);

	useEffect(
		() => {
			async function asyncFn() {
				if (window.ethereum !== undefined) {
					const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
					const currentAddress = accounts[0];
					getBalance(currentAddress);
				}
			}
			asyncFn();
		},
		[user],
	);

	const getBalance = async (currentAddress) => {
		if (window.ethereum !== undefined) {
			web3.eth.getBalance(currentAddress, (err, balance) => {
				let ethBalance = web3.utils.fromWei(balance);

				setEthBal(ethBalance);
			});
			let pwarBalance = await getPwarBalance(currentAddress);
			let pwarInEth = web3.utils.fromWei(pwarBalance, 'ether');
			setPwarBal(pwarInEth);
		}
	};

	const connectWallet = async () => {
		if (window.ethereum !== undefined) {
			const networkStatus = await checkCorrectNetwork();
			if (networkStatus) {
				const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
				const accountAddress = accounts[0];
				setUserAdd(accountAddress);
				authenticateUser(accountAddress);
				getBalance(accountAddress);
			} else {
				setAlert({ status: true, message: 'Only support BSC network' });
			}
		} else {
			setAlert({ status: true, message: 'Install metamask first!' });
		}
	};

	useEffect(async () => {
		if (window.ethereum !== undefined) {
			const networkStatus = await checkCorrectNetwork();
			if (networkStatus) {
				const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
				const currentAddress = accounts[0];
				const localAddress = localStorage.getItem('userAddress');
				setUserAdd(currentAddress);
				authenticateUser(currentAddress);
				getBalance(currentAddress);
			}
		}
	}, []);

	useEffect(
		() => {
			if (user !== null) {
				setUserData(user);
			}
		},
		[user],
	);

	useEffect(
		() => {
			//Events to detect changes in account or network.
			if (window.ethereum !== undefined) {
				window.ethereum.on('accountsChanged', function (accounts) {
					web3.eth.requestAccounts().then((accounts) => {
						const accountAddress = accounts[0];
						setUserAdd(accountAddress);

						authenticateUser(accountAddress);

						window.location.reload();
					});
				});
				window.ethereum.on('networkChanged', async function (networkId) {
					// console.log('networkId: ' + networkId);
					// let chainID = await web3.eth.getChainId().then((res) => {
					//   return res;
					// });
					// console.log('chainID: ' + chainID);

					// console.log('Network Changed');
					let networkStatus = await checkCorrectNetwork();
					// console.log('Network Status:' + networkStatus);

					if (networkStatus) {
						web3.eth.requestAccounts().then((accounts) => {
							const accountAddress = accounts[0];
							setUserAdd(accountAddress);
							getBalance(accountAddress);
							authenticateUser(accountAddress);
						});
					} else {
						setAlert({ status: true, message: 'Only support BSC network' });
						console.log('Calling Signout');
						signOut(userAdd);
					}
				});
			}
		},
		[user],
	);

	return (
		<div className={classes.grow}>
			<Snackbar
				autoHideDuration={4000}
				anchorOrigin={{ vertical, horizontal }}
				open={alert.status}
				onClose={handleClose}
				message={alert.message}
				key={vertical + horizontal}>
				<Alert severity="error">{alert.message}</Alert>
			</Snackbar>
			<AppBar
				position="static"
				style={{ background: '#16181D', boxShadow: 'none', borderBottom: '1px solid #e9e9e9' }}>
				<Toolbar className="d-flex justify-content-around">
					{' '}
					<Link to="/">
						<Typography className={classes.title} variant="h6" noWrap>
							<img src="/images/polkawar.png" alt="logo" height="65px" />
						</Typography>
					</Link>
					<div className="d-flex justify-content-end">
						<Link to="/">
							<Typography
								variant="subtitle1"
								noWrap
								className={navIndex === 0 ? classes.tabsActive : classes.tabs}
								onClick={() => setNavIndex(0)}>
								Shop
							</Typography>
						</Link>
						<Link to="/profile">
							<Typography
								variant="subtitle1"
								noWrap
								className={navIndex === 1 ? classes.tabsActive : classes.tabs}
								onClick={() => setNavIndex(1)}>
								My Home
							</Typography>
						</Link>
						<Typography className={classes.tabs} variant="subtitle1" noWrap>
							Battle Room
						</Typography>

						<a href="https://polkawar.com">
							{' '}
							<Typography
								variant="subtitle1"
								noWrap
								className={navIndex === 3 ? classes.tabsActive : classes.tabs}
								onClick={() => setNavIndex(3)}>
								Landing Page
							</Typography>
						</a>

						<div className={classes.sectionDesktop}>
							{authenticated ? (
								<div>
									<Button className={classes.balanceButton} onClick={() => togglePopup(true)}>
										<div className={classes.buttonIcon}>
											<AccountBalanceWallet className={classes.icon} />
										</div>
										<div>
											<strong style={{ color: '#e5e5e5' }}>
												{ethBal !== null && parseFloat(ethBal).toFixed(4) + ' BNB'}{' '}
											</strong>
										</div>
									</Button>
								</div>
							) : (
								<div>
									<Button className={classes.airdropButton} onClick={connectWallet}>
										{web3 !== undefined ? 'Connect your wallet' : 'Missing Metamask!'}
									</Button>
								</div>
							)}
							<div>
								<Link to={'/airdrop'}>
									<Button className={classes.airdropButton}>Get Airdrop</Button>
								</Link>
							</div>
							<div>
								<Link to={'/sale'}>
									<Button className={classes.saleButton}>Flash Sale</Button>
								</Link>
							</div>
							<div>
								<Link to={'/bid'}>
									<Button className={classes.bidButton}>
										Auction <img src="/images/thunder.png" height="18px" alt="thunder" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
					<div className={classes.sectionMobile}>
						<div>
							<Link to="/">
								<img src="/images/polkawar.png" alt="logo" height="50px" />
							</Link>
						</div>

						<div>
							{['top'].map((anchor) => (
								<React.Fragment key={anchor}>
									<IconButton
										aria-label="Menu"
										aria-haspopup="true"
										className={classes.menuIcon}
										onClick={toggleDrawer(anchor, true)}>
										<MenuIcon style={{ color: 'white' }} />
									</IconButton>

									<SwipeableDrawer
										anchor={anchor}
										disableSwipeToOpen={false}
										open={state[anchor]}
										onClose={toggleDrawer(anchor, false)}
										onOpen={toggleDrawer(anchor, true)}>
										{list(anchor)}
									</SwipeableDrawer>
								</React.Fragment>
							))}
						</div>
					</div>
				</Toolbar>
				<Dialog
					className={classes.modal}
					open={popup}
					keepMounted
					onClose={() => togglePopup(false)}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}>
					<div style={{ backgroundColor: 'black' }}>
						<BalancePopup
							address={userData !== null && userData.address}
							pwar={pwarBal}
							togglePopup={() => togglePopup(false)}
							signOut={() => signOut(userAdd)}
						/>
					</div>
				</Dialog>
			</AppBar>
		</div>
	);
}
PrimaryAppbar.propTypes = {
	authenticateUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.auth.authenticated,
	user: state.auth.user,
});

const mapDispatchToProps = { authenticateUser, signOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryAppbar);
