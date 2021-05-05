import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'white',
    backgroundColor: 'white',
    textTransform: 'none',
    borderRadius: '50px',
    padding: '8px 16px 8px 16px',
    fontWeight: 600,
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    fontSize: 14,
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
