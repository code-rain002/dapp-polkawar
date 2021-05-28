import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { getAirdrop } from './../../actions/smartActions/SmartActions';

import './index.css';

export default class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem = async () => {
    getAirdrop(this.props.userAddress);
    if (true) {
      if (this.state.selectedItem === null) {
        //Some wheel configuration things.
        const selectedItem = Math.floor(Math.random() * this.props.items.length);
        this.setState({ selectedItem });

        //Calling checkAirdrop
        console.log('Calling: checkAirdrop ');
        this.props.checkAirdrop();
      } else {
        this.setState({ selectedItem: null });
        setTimeout(this.selectItem, 2000);
      }
    }
  };

  render() {
    const { selectedItem } = this.state;
    const { items, spinned } = this.props;

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
      <div>
        {!spinned ? (
          <div className="wheel-container">
            <div className={`wheel ${spinning}`} style={wheelVars}>
              {items.map((item, index) => (
                <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                  {item}
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <Button
                onClick={this.selectItem}
                variant="contained"
                style={{ backgroundColor: 'blue', color: 'white', borderRadius: 20, fontSize: 18, marginRight: 10 }}>
                Spin now
              </Button>
            </div>
          </div>
        ) : (
          'Claim'
        )}
      </div>
    );
  }
}
