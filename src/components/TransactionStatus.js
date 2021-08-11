import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Refresh } from "@material-ui/icons";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  reloadButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#6F2F9B, #8D37A9)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "#eeeeee",
    padding: "12px 25px 12px 25px",
    fontWeight: 400,
    fontSize: 18,
    textTransform: "none",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  card: {
    width: "100%",
    height: 300,
    borderRadius: 14,
    padding: "25px 10px 25px 10px",
    backgroundColor: "transparent",
    [theme.breakpoints.down("md")]: {
      width: 300,
      padding: "5px 2px 5px 2px",
    },
  },
}));

export default function TransactionStatus({ actualCase, color }) {
  const classes = useStyles();
  return (
    <div className={classes.card} style={{ backgroundColor: color }}>
      {actualCase === 1 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <div className="text-center">
              <Loader />
            </div>
            <h5 className={classes.messageTitle}>Waiting for confirmation!</h5>
          </div>
        </div>
      )}
      {actualCase === 2 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <img
              src="/images/failed.png"
              height="100px"
              alt="error"
              className={classes.dialogImage}
            />
            <h5 className={classes.messageTitle}>Transaction Rejected</h5>
            <div className="text-center">
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                className={classes.reloadButton}
              >
                <Refresh />
                Reload
              </Button>
            </div>
          </div>
        </div>
      )}
      {actualCase === 3 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <div className="text-center">
              <Loader />
            </div>
            <h5 className={classes.messageTitle}>
              Transaction submitted, please wait...
            </h5>
            <p className={classes.dialogText}>
              <span style={{ color: "#e65100" }}>
                * Do not reload otherwise you may lose funds.
              </span>
            </p>
          </div>
        </div>
      )}
      {actualCase === 4 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <img
              src="/images/failed.png"
              height="100px"
              alt="error"
              className={classes.dialogImage}
            />
            <h5 className={classes.messageTitle}>Transaction Failed</h5>
            <div className="text-center">
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                className={classes.reloadButton}
              >
                <Refresh />
                Reload
              </Button>
            </div>
          </div>{" "}
        </div>
      )}
      {actualCase === 5 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <img
              src="/images/failed.png"
              height="100px"
              alt="error"
              className={classes.dialogImage}
            />
            <h5 className={classes.messageTitle}>
              Transaction Success with Error
            </h5>

            <p className={classes.dialogText}>
              * Contact admin and share the transaction hash.
            </p>
            <div className="text-center">
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                className={classes.reloadButton}
              >
                <Refresh />
                Reload
              </Button>
            </div>
          </div>
        </div>
      )}
      {actualCase === 6 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <img
              src="/images/success.png"
              height="100px"
              alt="success"
              className={classes.dialogImage}
            />
            <h5 className={classes.messageTitle}>Transaction Success</h5>
            <div className="text-center">
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                className={classes.reloadButton}
              >
                <Refresh />
                Reload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
