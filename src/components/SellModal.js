import { Button, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close, Fireplace, HomeWork, Store } from '@material-ui/icons';

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
    color: theme.palette.pbr.primary,
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
export default function BalancePopup({ closePopup }) {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className="container text-center">
        <div className="d-flex justify-content-between">
          <div className={classes.padding}>
            <h5 className={classes.title}>Sell Item</h5>
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
              <Button variant="contained" className={classes.buttonSystem}>
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
