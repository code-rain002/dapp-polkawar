import { Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: 500,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  padding: {
    paddingTop: 20,
    paddingLeft: 20,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 5,
      paddingLeft: 5,
    },
  },
  button: {
    color: "#D9047C",
    backgroundColor: "white",
    textTransform: "none",
    borderRadius: "50px",
    padding: "8px 20px 8px 20px",
    fontWeight: 400,
    background: `linear-gradient(to bottom,#fce3ee, #fce3ee)`,
    fontSize: 14,
    letterSpacing: "0px",
  },
  buttonMain: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "0px",
    margin: 0,
    color: "#ffffff",
    padding: "8px 20px 8px 20px",

    fontWeight: 400,
    fontSize: 14,
    textTransform: "none",
  },

  highlight: {
    color: theme.palette.pbr.primary,
    paddingLeft: 5,
  },

  icon: {
    fontSize: 16,
    marginRight: 7,
    color: "#ffffff",
  },
  title: {
    fontWeight: 400,
    verticalAlign: "baseline",
    letterSpacing: "-0.8px",
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "left",
    color: theme.palette.pbr.primary,
    fontSize: 22,
  },
  subtitle: {
    fontWeight: 400,
    verticalAlign: "baseline",
    letterSpacing: "-0.8px",
    margin: 0,
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: "left",
    color: " #757575",
    fontSize: 14,
  },
  para: {
    fontWeight: 400,
    verticalAlign: "baseline",
    letterSpacing: "-0.8px",
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "left",
    color: "white",
    fontSize: 18,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
}));
export default function BalancePopup({ address, pwar, togglePopup, signOut }) {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className="container text-center">
        <div className={classes.padding}>
          <h5 className={classes.title}>My Wallet</h5>
        </div>{" "}
        <Divider style={{ backgroundColor: "white" }} />
        <div className={classes.padding}>
          <h6 className={classes.subtitle}>Address</h6>
          <p className={classes.para}>{address}</p>
        </div>
        <div className={classes.padding}>
          <h6 className={classes.subtitle}>Balance</h6>
          <p className={classes.para}>{pwar} PWAR</p>
        </div>
        <div style={{ paddingLeft: 15 }}>
          <div className="my-3 d-flex justify-content-start">
            <div style={{ paddingRight: 10 }}>
              <Button
                variant="contained"
                className={classes.buttonMain}
                onClick={signOut}
              >
                Sign Out
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.button}
                onClick={togglePopup}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
