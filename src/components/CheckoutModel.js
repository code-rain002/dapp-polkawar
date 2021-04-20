import { Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 400,
    border: '1px solid #e5e5e5',
    borderRadius: 14,
    padding: '8px 16px 8px 16px',
    backgroundColor: 'white',
  },
  title: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: 'black',
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 32,
    lineHeight: '70px',
  },

  description: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: 'black',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '25.7px',
  },
  quantity: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: '#757575',
    fontWeight: 500,
    fontSize: 16,
  },
  price: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: 'black',
    fontWeight: 700,
    fontSize: 16,
  },
  text: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: '#757575',
    fontWeight: 500,
    fontSize: 15,
    letterSpacing: 'normal',
    lineHeight: '15px',
  },
  textValue: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: 'black',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '15px',
  },
  icon: {
    color: 'black',
  },
  iconWrapper: {
    border: '1px solid #e5e5e5',
    borderRadius: '50%',
  },
  buttonProceed: {
    width: '100%',
    color: 'white',
    backgroundColor: 'white',
    textTransform: 'none',
    borderRadius: '100px',
    padding: '12px 16px 12px 16px',
    fontWeight: 600,
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    fontSize: 16,
  },
  buttonCancel: {
    width: '100%',
    color: '#D9047C',
    backgroundColor: 'white',
    textTransform: 'none',
    borderRadius: '100px',
    padding: '12px 16px 12px 16px',
    fontWeight: 600,
    background: `linear-gradient(to bottom,#fce3ee, #fce3ee)`,
    fontSize: 16,
  },
}));

export default function CheckoutModel({ value, onClose }) {
  const classes = useStyles();

  const item = {
    owner: 'Elvin Que',
    avatar: 'https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png',
    item_name: 'Metalic Lightening Sward ',
    price: '0.07',
    level: 3,
    item_count: '0.7',
    bid: '0.5',
    wishlisted: '76',
    imageUrl: 'https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png',
  };
  return (
    <div className={classes.card}>
      <div className="d-flex justify-content-between">
        <h5 className={classes.title}>Checkout</h5>
        <div>
          {' '}
          <IconButton className={classes.iconWrapper} onClick={() => onClose(false)}>
            <Close className={classes.icon} />
          </IconButton>
        </div>
      </div>
      <div className="mb-4">
        <p className={classes.description}>
          You are about to purchase <strong>{item.item_name}</strong> from <strong>{item.owner}</strong>
        </p>
      </div>
      <div>
        <p className={classes.quantity}>1</p>
        <hr />
        <p className={classes.quantity}>Enter quantity. 3 available</p>
      </div>
      <div className="d-flex justify-content-between">
        <h6 className={classes.quantity}>{item.price}</h6>
        <p className={classes.price}>ETH</p>
      </div>
      <hr style={{ paddingTop: 0, marginTop: 0 }} />
      <div className="d-flex justify-content-between">
        <h6 className={classes.text}>Your balance</h6>
        <p className={classes.textValue}>0.1 ETH</p>
      </div>
      <div className="d-flex justify-content-between">
        <h6 className={classes.text}>Service fees</h6>
        <p className={classes.textValue}>0.1 ETH</p>
      </div>
      <div className="d-flex justify-content-between">
        <h6 className={classes.text}>You will pay</h6>
        <p className={classes.textValue}>0.1 ETH</p>
      </div>
      <div className="my-3 d-flex flex-column justify-content-start">
        <div style={{ paddingBottom: 10 }}>
          <Button variant="default" className={classes.buttonProceed}>
            Proceed to checkout
          </Button>
        </div>
        <div>
          <Button variant="default" className={classes.buttonCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
