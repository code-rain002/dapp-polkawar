import React, { useState, useEffect } from 'react';
import { Button, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
import { boxRewards } from '../actions/smartActions/SmartActions';
import { ArrowBack } from '@material-ui/icons';
import axios from 'axios';
import { tokenURI } from './../actions/smartActions/SmartActions';
import imageBaseUrl from './../actions/imageBaseUrl';

const useStyles = makeStyles((theme) => ({
	backButton: {
		textAlign: 'center',
		background: `linear-gradient(to right,#6F2F9B, #8D37A9)`,
		padding: '14px 20px 14px 20px',
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
	title: {
		verticalAlign: 'baseline',
		textAlign: 'center',
		color: theme.palette.pbr.textPrimary,
		fontWeight: 800,
		letterSpacing: 0.5,
		fontSize: 32,
		lineHeight: '40.7px',
		[theme.breakpoints.down('md')]: {
			fontSize: 32,
		},
	},
	para: {
		verticalAlign: 'baseline',
		fontFamily: 'Balsamiq Sans',
		color: theme.palette.pbr.textPrimary,
		fontWeight: 500,
		letterSpacing: 0.5,
		fontSize: 16,
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: 15,
		},
	},
	spacing: {
		overflowX: 'hidden',
		padding: 30,
		// background: 'url("https://wallpaperaccess.com/full/3819332.gif")',

		[theme.breakpoints.down('md')]: {
			padding: 10,
		},
	},

	buttonMain: {
		borderRadius: '50px',
		background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
		lineHeight: '24px',
		verticalAlign: 'baseline',
		letterSpacing: '-1px',
		margin: 0,
		color: '#ffffff',
		padding: '12px 20px 12px 20px',
		fontWeight: 500,
		fontSize: 18,
		textTransform: 'none',
	},
	timerButton: {
		borderRadius: '50px',
		background: `linear-gradient(to bottom,#D9047C, #BF1088)`,

		lineHeight: '24px',
		verticalAlign: 'baseline',
		letterSpacing: '-1px',
		margin: 0,
		color: '#ffffff',
		padding: '12px 20px 12px 20px',
		fontWeight: 400,
		fontSize: 18,
		textTransform: 'none',
	},
	airdropHeading: {
		color: 'yellow',
		fontSize: 22,
		[theme.breakpoints.down('md')]: {
			fontSize: 16,
		},
	},
	airdropText: {
		color: 'white',
		fontSize: 32,
		[theme.breakpoints.down('md')]: {
			fontSize: 22,
		},
	},
	imageWrapper: {
		height: 220,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',

		[theme.breakpoints.down('md')]: {
			height: 170,
		},
	},
	bnbImage: {
		height: 170,
		[theme.breakpoints.down('md')]: {
			height: 120,
		},
	},
	itemImage: {
		height: 200,
		[theme.breakpoints.down('md')]: {
			height: 150,
		},
	},
	itemImagePwar: {
		height: 160,
		[theme.breakpoints.down('md')]: {
			height: 120,
		},
	},
	itemName: {
		paddingTop: 10,
		color: 'white',
		fontSize: 28,
		[theme.breakpoints.down('md')]: {
			fontSize: 20,
		},
	},
	plusSign: {
		textAlign: 'center',
		color: 'white',
		fontSize: 60,
		height: 200,
		width: 200,
		[theme.breakpoints.down('md')]: {
			fontSize: 40,
			height: 120,
			width: 100,
		},
	},
}));

function BidRewards({ programId }) {
	const classes = useStyles();
	let { pid } = useParams();

	const [ comboId, setComboId ] = useState(0);

	const [ nftTokenHash, setNftTokenHash ] = useState(null);
	const [ nftData, setNftData ] = useState(null);

	useEffect(() => {
		async function asyncFn() {
			//To load Item JSON Information
			let boxRewardsData = await boxRewards(pid);
			if (boxRewardsData) {
				console.log(boxRewardsData);
				setNftTokenHash(boxRewardsData.urlHash);
				setComboId(boxRewardsData.comboRewards);
				await getNftTokenData();
			}
		}

		asyncFn();
	}, []);

	const getNftTokenData = async () => {
		await axios.get(`${imageBaseUrl}${nftTokenHash}`).then((res) => {
			setNftData(res.data);
		});
	};
	let mysteryRewards = [
		{
			id: 0,
			rewards: {
				bnb: '0.5',
				pwar: '500',
				nft_level: 1,
			},
		},
		{
			id: 1,
			rewards: {
				bnb: '1',
				pwar: '1000',
				nft_level: 1,
			},
		},
		{
			id: 2,
			rewards: {
				bnb: '2',
				pwar: '2000',
				nft_level: 1,
			},
		},
		{
			id: 3,
			rewards: {
				bnb: '3',
				pwar: '3000',
				nft_level: 2,
			},
		},
		{
			id: 4,
			rewards: {
				bnb: '4',
				pwar: '4000',
				nft_level: 2,
			},
		},
		{
			id: 5,
			rewards: {
				bnb: '5',
				pwar: '5000',
				nft_level: 2,
			},
		},
		{
			id: 6,
			rewards: {
				bnb: '7',
				pwar: '7000',
				nft_level: 3,
			},
		},
		{
			id: 7,
			rewards: {
				bnb: '10',
				pwar: '10000',
				nft_level: 3,
			},
		},
		{
			id: 8,
			rewards: {
				bnb: '20',
				pwar: '20000',
				nft_level: 3,
			},
		},
		{
			id: 9,
			rewards: {
				bnb: '50',
				pwar: '50000',
				nft_level: 3,
			},
		},
	];

	return (
		<div className={classes.container}>
			<Grow in={true} timeout={1000}>
				<div>
					<div className="container">
						<div>
							<div className="text-center mt-5">
								<h1 className={classes.title}>
									Auction Rewards
									<img src="/images/thunder.png" height="25px" alt="thunder" />
								</h1>
								<h6 className={classes.para}>
									You have unlocked following rewards by opening the mystery box.
								</h6>
							</div>
							<div className="d-flex justify-content-center align-items-end">
								<div>
									<div className="mt-3">
										<div className={classes.imageWrapper}>
											<img src={`/images/bnb.png`} className={classes.bnbImage} alt="binance" />
										</div>
									</div>
									<div className="text-center">
										<h5 className={classes.itemName}>
											{mysteryRewards[comboId].rewards['bnb']} BNB
										</h5>
									</div>
								</div>

								<div className={classes.plusSign}>+</div>
								<div style={{ paddingLeft: 20 }}>
									{' '}
									<div className="mt-5">
										<div className={classes.imageWrapper}>
											<img src={`/token.png`} className={classes.itemImagePwar} alt="pwar" />
										</div>
										<div className="mt-3 text-center">
											<h5 className={classes.itemName}>
												{mysteryRewards[comboId].rewards['pwar']} PWAR
											</h5>
										</div>
									</div>
								</div>
								<div className={classes.plusSign}>+</div>
								<div style={{ paddingLeft: 20 }}>
									{' '}
									<div className="mt-5">
										<div className={classes.imageWrapper}>
											<img
												src={`${imageBaseUrl}/${nftData.image}`}
												className={classes.itemImagePwar}
												alt="pwar"
											/>
										</div>

										<div className="mt-3">
											<h5 className={classes.itemName}>NFT Item</h5>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-5 d-flex  justify-content-center">
								<Link to={'/profile'}>
									<Button variant="contained" className={classes.backButton}>
										<span>
											<ArrowBack /> Back To Profile
										</span>
									</Button>
								</Link>
							</div>
						</div>
					</div>{' '}
				</div>
			</Grow>
		</div>
	);
}
export default BidRewards;
