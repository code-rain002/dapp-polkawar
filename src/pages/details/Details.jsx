import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Backdrop, Slide } from '@material-ui/core';
import CustomeTable from '../../components/CustomTable';
import CheckoutModel from '../../components/CheckoutModel';
import GallerySlider from '../../components/GallerySlider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  title: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 32,
    lineHeight: '40.7px',
    [theme.breakpoints.down('md')]: {
      fontSize: 22,
      lineHeight: '30.7px',
    },
  },
  price: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '30.7px',
  },
  description: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '25.7px',
    maxWidth: 500,
  },
  categoryTab: {
    display: 'inline-block',
    border: '1px solid #616161',
    borderRadius: '20px',
    fontSize: 16,
    fontWeight: 500,
    padding: '8px 20px 8px 20px',
    minWidth: '60px',
    marginTop: 10,
    marginBottom: 10,
    cursor: 'pointer',
    color: theme.palette.pbr.textPrimary,
    [theme.breakpoints.down('md')]: {
      padding: '6px 14px 6px 14px',
      fontSize: 13,
      height: '35px',
      marginRight: '5px',
    },
  },
  buyHistory: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 22,
    lineHeight: '30.7px',
  },
  levelText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,
  },
  imageWrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  button: {
    color: '#D9047C',
    backgroundColor: 'white',
    textTransform: 'none',
    borderRadius: '50px',
    padding: '8px 16px 8px 16px',
    fontWeight: 600,
    background: `linear-gradient(to bottom,#fce3ee, #fce3ee)`,
    fontSize: 14,
  },
  buttonMain: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    color: '#ffffff',
    padding: '8px 16px 8px 16px',
    fontWeight: 600,
    fontSize: '1.02vw',
    textTransform: 'none',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    outline: 'none',
  },
}));

export default function Details() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleModal = (value) => {
    setOpen(value);
  };

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
    <div style={{ overflowX: 'hidden' }}>
      <div className="row g-0 mt-5">
        <div className="col-12 col-md-7">
          <div className={classes.imageWrapper}>
            {/* <img src={item.imageUrl} style={{ height: 300 }} /> */}
            <GallerySlider />
          </div>
        </div>
        <div className="col-12 col-md-5 p-3">
          <h5 className={classes.title}>{item.item_name}</h5>
          <h6 className={classes.price}>
            {item.price} ETH <span style={{ color: '#bdbdbd', paddingLeft: 10 }}>$18.16</span>
          </h6>
          <div className={classes.categoryTab}>
            <img
              src="https://www.freepnglogos.com/uploads/sword-png/sword-weapon-knighthood-vector-graphic-pixabay-21.png"
              height="25px"
              style={{ paddingRight: 10 }}
            />
            Sword
          </div>
          <div>
            {' '}
            <div className="d-flex justify-content-start align-items-center mt-2">
              <h6 className={classes.levelText}>Level : </h6>
              <div className={classes.iconWrapper}>
                {Array.from(Array(item.level)).map((character) => {
                  return <img src="https://pngimg.com/uploads/star/star_PNG1597.png" height="16px" />;
                })}
              </div>
            </div>
          </div>
          <p className={classes.description}>
            Overload of information makes it harder to focus. When there is more information in our head than we can
            effectively process, our brain starts to rush from one idea to another. Think of it as a form of mental
            multitasking that makes your brain jump from one thought to another.
          </p>{' '}
          <div className="my-3 d-flex justify-content-start">
            <div style={{ paddingRight: 10 }}>
              <Button variant="contained" className={classes.buttonMain} onClick={() => handleModal(true)}>
                Buy Now
              </Button>
            </div>
            <div>
              <Button variant="contained" className={classes.button}>
                Save for later
              </Button>
            </div>
          </div>
          <div>
            <h6 className={classes.buyHistory}>Buy History</h6>
            <hr style={{ color: 'yellow' }} />
            <CustomeTable />
          </div>
        </div>
      </div>
      <Dialog
        className={classes.modal}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <div style={{ backgroundColor: 'black' }}>
          <CheckoutModel value={open} onClose={handleModal} />
        </div>
      </Dialog>
    </div>
  );
}
