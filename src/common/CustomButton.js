import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    marginTop: 5,
    color: '#ffffff',
    padding: '8px 16px 8px 16px',
    fontWeight: 600,
    fontSize: '1.02vw',
  },
}));

export default function CustomButton({ title, link }) {
  const classes = useStyles();
  return (
    <a href={link} style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="primary" className={classes.button}>
        {title}
      </Button>
    </a>
  );
}
