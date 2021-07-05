import { Button, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close, HomeWork, Store } from '@material-ui/icons';
import { updateUserItemOwner } from './../actions/itemActions';
import { connect } from 'react-redux';
import saleContract from './../utils/saleConnection';

const useStyles = makeStyles((theme) => ({
  background: {
    height: '100%',
    width: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 20,
  },
  padding: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  buttonSystem: {
    background: `linear-gradient(to right,#6F2F9B, #8D37A9)`,
    borderRadius: '50px',
    lineHeight: '24px',
    fontFamily: 'Balsamiq Sans',
    fontWeight: 400,
    verticalAlign: 'baseline',
    letterSpacing: '0px',
    margin: 0,
    color: '#ffffff',
    padding: '12px 20px 12px 20px',
    fontSize: 18,
    textTransform: 'none',
  },
  buttonMarketplace: {
    borderRadius: '50px',
    background: `linear-gradient(to right,#AF2C59, #C43262)`,
    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '0px',
    margin: 0,
    fontFamily: 'Balsamiq Sans',
    fontWeight: 400,
    color: '#ffffff',
    padding: '12px 20px 12px 20px',
    fontSize: 18,
    textTransform: 'none',
  },

  highlight: {
    color: theme.palette.pbr.primary,
    paddingLeft: 5,
  },

  icon: {
    fontSize: 16,
    marginRight: 7,
    color: '#ffffff',
  },
  title: {
    fontWeight: 400,
    verticalAlign: 'baseline',
    letterSpacing: '-0.8px',
    margin: 0,
    paddingBottom: 10,
    textAlign: 'left',
    color: 'black',
    fontSize: 22,
  },
  subtitle: {
    fontWeight: 400,
    verticalAlign: 'baseline',
    letterSpacing: '-0.8px',
    margin: 0,
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'left',
    color: ' #757575',

    fontSize: 14,
  },
  para: {
    fontWeight: 400,
    verticalAlign: 'baseline',
    letterSpacing: '-0.8px',
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'left',
    color: 'white',
    fontSize: 18,
  },
}));
function SellModal({ closePopup, item, updateUserItemOwner, user }) {
  const classes = useStyles();

  const resellToSystem = async () => {
    //Calling Smart Contract

    let userAddress = user.address;
    let contractResponse = await saleContract.methods
      .resellItemForSystem()
      .send({ from: userAddress }, (err, response) => {
        console.log('resellItemForSystem Called');
        console.log('Transaction Response:' + response);
        console.log('Transaction Error:' + err);
      })
      .on('receipt', async function (receipt) {
        //Now time to update owner details
        console.log('receipt:' + receipt);
        let response = await updateUserItemOwner(item._id);
        console.log(response);
      })
      .on('error', async function (error) {
        console.log('Error:' + error);
      });
    console.log(contractResponse);
  };
  return (
    <div className={classes.background}>
      <div className="container text-center">
        <div className="d-flex justify-content-between">
          <div className={classes.padding}>
            <h5 className={classes.title}>Sell Your NFT</h5>
          </div>{' '}
          <div style={{ paddingRight: 10, paddingTop: 10 }}>
            <IconButton>
              <Close onClick={closePopup} />
            </IconButton>
          </div>{' '}
        </div>
        <Divider style={{ backgroundColor: 'grey' }} />

        <div className="my-5">
          <div className="my-3 d-flex flex-column justify-content-start">
            <div style={{ paddingBottom: 20 }}>
              <Button variant="contained" className={classes.buttonMarketplace}>
                <Store style={{ marginRight: 10 }} />
                Sell on Marketplace
              </Button>
            </div>
            <div>
              <Button variant="contained" className={classes.buttonSystem} onClick={resellToSystem}>
                <HomeWork style={{ marginRight: 10 }} />
                Resell to the system
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const mapDispatchToProps = { updateUserItemOwner };

export default connect(mapStateToProps, mapDispatchToProps)(SellModal);
