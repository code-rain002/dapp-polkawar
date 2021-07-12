import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Backdrop, Slide, Paper, Tabs, Tab, Avatar } from '@material-ui/core';
import { getItem } from './../../actions/itemActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import imageBaseUrl from './../../actions/imageBaseUrl';
import Loader from '../../components/Loader';
import { Phone } from '@material-ui/icons';
import Timer from '../../components/Timer';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	sectionCard: {
		background: `linear-gradient(0deg, rgba(26, 35, 126, 0.31), rgba(28,22, 86, 0.1))`,
		padding: 30,
		margin: 30,
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
		height: 400,
		[theme.breakpoints.down('md')]: {
			maxHeight: 200,
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
    auctionWrapper:{
        display: 'flex',
        flexDirection:'row',
		justifyContent: 'center',
		alignItems: 'center',
		
        [theme.breakpoints.down('md')]: {
		 display: 'flex',
         flexDirection:'column',
		 justifyContent: 'center',
		 alignItems: 'center',
	
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
            paddingTop:5,
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
	levelText: {
		color: 'white',
		fontWeight: 600,
		fontSize: 15,
		paddingTop: 10,
		paddingRight: 10,
		[theme.breakpoints.down('md')]: {
			paddingTop: 7,
		},
	},
}));

function Bid({}) {
	const classes = useStyles();

	let item = {
		level: 3,
		original_price: 2,
		sell_price: 0.5,
		currency: 'BNB',
		remaining_quantity: 20,
		category: 'sword',
		createdDate: '2021-07-10T10:38:01.378Z',
		_id: '60ea7f0b1954d362ad256312',
		name: 'Sword',
		image: 'QmZ8K4DxcKJjYUsSqQDBXzXBeaWcpt96Yuy9Cg3nu2hXx5',
		description: 'Base Damage: 30, Bonus: +7%, Accuracy: +5',
		__v: 0,
	};

	return (
		<div className={classes.sectionCard}>
			{item ? (
				<div className="row g-0">
					<div className="col-12 col-md-7">
						<div className={classes.imageWrapper}>
							<img src={`${imageBaseUrl}/${item.image}`} className={classes.image} alt="item-img" />
						</div>
					</div>
					<div className="col-12 col-md-5 p-3">
						<div className={classes.section2}>
							<div className="d-flex justify-content-between">
								<h5 className={classes.title}>{item.name}</h5>

								<div>
									{' '}
									<div className="d-flex justify-content-start align-items-center mt-2">
										<h6 className={classes.levelText}>Level : </h6>
										<div className={classes.iconWrapper}>
											{Array.from(Array(item.level)).map((character) => {
												return (
													<img
														src="https://pngimg.com/uploads/star/star_PNG1597.png"
														height="16px"
														alt="level-img"
													/>
												);
											})}
										</div>
									</div>
								</div>
							</div>
							<p className={classes.description}>{item.description}</p>{' '}
							<h6 className={classes.price}>
								<span style={{ color: '#bdbdbd', paddingRight: 5 }}>Minimum Bid Price: </span>
								{item.sell_price} {item.currency}
							</h6>
							<div className="mt-5">
								<h6 className={classes.timeline}>Bids Timeline</h6>
								<hr style={{ color: 'yellow' }} />
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
												0.23BNB <span style={{ color: '#bdbdbd' }}> by</span>{' '}
												0x9D7117a07fca9F....A5FA4F448
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
												0.23BNB <span style={{ color: '#bdbdbd' }}> by</span>{' '}
												0x9D7117a07fca9F....A5FA4F448
											</h6>
											<h6 className={classes.time}>23 mins ago</h6>
										</div>
									</div>
									<div style={{ paddingRight: 10 }} />
								</div>
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
												0.23BNB <span style={{ color: '#bdbdbd' }}> by</span>{' '}
												0x9D7117a07fca9F....A5FA4F448
											</h6>
											<h6 className={classes.time}>23 mins ago</h6>
										</div>
									</div>
									<div style={{ paddingRight: 10 }} />
								</div>
							</div>
							<div>
								<hr className={classes.border} />
								<div className={classes.auctionWrapper}>
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
												<h6 className={classes.bidAmount}>0.23 BNB</h6>
												<h6 className={classes.time}>23 mins ago</h6>
											</div>
										</div>
									</div>
									<div for="auction">
										<p className={classes.statusBoxHeading}>Auction ends in</p>{' '}
										<div className="d-flex justify-content-start">
											<Timer endTime={'July 14, 2021 02:30:00 UTC'} />
										</div>
									</div>
								</div>
								<div className="d-flex justify-content-center">
									<hr style={{ width: 300, backgroundColor: '#616161', height: 1 }} />
								</div>
								<p className={classes.statusBoxHeading} />{' '}
								<div className="d-flex justify-content-evenly mt-3">
									<Button variant="contained" className={classes.newbidButton}>
										<span>New Bid</span>
									</Button>
									<Button variant="contained" className={classes.cancelbidButton}>
										<span>Cancel Bid</span>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}

Bid.propTypes = {
	getItem: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	singleItem: state.items.item,
});

const mapDispatchToProps = { getItem };

export default connect(mapStateToProps, mapDispatchToProps)(Bid);
