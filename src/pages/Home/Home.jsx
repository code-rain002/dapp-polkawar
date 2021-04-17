import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HotCharacters from './HotCharacters';
import Categories from './Categories';

const useStyles = makeStyles((theme) => ({
  spacing: {
    overflowX: 'hidden',
    padding: 50,
    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
  },
}));
export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.spacing}>
      <section id="hot-characters">
        <HotCharacters />
      </section>
      <section id="categories">
        <Categories />
      </section>
    </div>
  );
}
