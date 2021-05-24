import { useState } from 'react';
import { Button, Divider, Input, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { createItem } from './../actions/smartActions/SmartActions';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    border: '1px solid #e5e5e5',
    borderRadius: 14,
    padding: '25px 10px 25px 10px',
    backgroundColor: 'white',
  },
  title: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: 'black',
    fontWeight: 600,
    letterSpacing: 0.9,
    fontSize: 22,
    lineHeight: '50px',
  },
  label: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.primary,
    fontWeight: 500,
    letterSpacing: 0.5,
    fontSize: 18,
  },
  menuItem: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 14,
  },
  icon: {
    color: 'black',
  },
  iconWrapper: {
    border: '1px solid #e5e5e5',
    borderRadius: '50%',
  },
  buttonProceed: {
    color: 'white',
    marginTop: 20,
    backgroundColor: 'white',
    textTransform: 'none',
    borderRadius: '100px',
    padding: '12px 16px 12px 16px',
    fontWeight: 500,
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    fontSize: 16,
  },

  icon: {
    fontSize: 16,
    marginRight: 7,
    color: '#ffffff',
  },
  textField: {
    color: 'white',
    border: '1px solid #ffffff',
    textAlign: 'left',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 400,
  },
}));

export default function CreateCharacterForm({ onClose, user }) {
  const classes = useStyles();
  const [characterName, setCharacterName] = useState('');
  const [characterClass, setCharacterClass] = useState('Warrior');

  const changeClass = (e) => {
    setCharacterClass(e.target.value);
  };

  const submitForm = async () => {
    await createItem(user.address, characterClass);
    onClose(false);
  };
  return (
    <div className={classes.card}>
      <div className="container text-center">
        <div>
          <h5 className={classes.title}>Create Character</h5>
        </div>{' '}
        <Divider style={{ backgroundColor: 'black' }} />
        {/* <div className="p-2 mt-3">
          <TextField
            label={<p className={classes.label}>Character Name</p>}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.textField}
            fullWidth
            onChange={(e) => setCharacterName(e.target.value)}
          />
        </div> */}
        <div className="p-2 mt-3 float-left">
          <TextField
            select
            label={<p className={classes.label}>Class</p>}
            value={characterClass}
            className={classes.textField}
            onChange={changeClass}
            fullWidth>
            <MenuItem value={'Warrior'} className={classes.menuItem}>
              Warrior
            </MenuItem>
            <MenuItem value={'Magician'} className={classes.menuItem}>
              Magician
            </MenuItem>
            <MenuItem value={'Archer'} className={classes.menuItem}>
              Archer
            </MenuItem>
          </TextField>
        </div>
        <div>
          <Button variant="contained" className={classes.buttonProceed} onClick={submitForm}>
            Create Now
          </Button>
        </div>
      </div>
    </div>
  );
}
