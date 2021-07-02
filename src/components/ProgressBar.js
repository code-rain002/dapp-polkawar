import React from 'react';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 25,
    width: '400px',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
  };

  const fillerStyles = {
    height: '100%',
    width: `${(100 * completed) / 20}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'center',
    transition: 'width 1s ease-in-out',
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    paddingLeft: 5,
    fontFamily: 'Balsamiq Sans',
    fontWeight: 700,
    fontSize: 16,
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed} Left`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
