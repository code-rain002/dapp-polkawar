import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { getAirdrop } from './../../actions/smartActions/SmartActions';
import airdropContract from './../../utils/airdropConnection';

import './index.css';


export default class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      spin: false,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem = async () => {
    let userAddress = this.props.userAddress;
    let userProvidedSeed =
      'stable elegant thrive remind fitness carbon link lecture icon same license buyer final skirt holiday';

    const transaction = await new Promise((resolve, reject) => {
      return airdropContract.methods
        .getAirdrop(userProvidedSeed)
        .send({ from: userAddress, gasPrice: 25000000000 }, function (error, transactionHash) {
          if (transactionHash) {
            resolve(transactionHash);
          } else {
            console.log('Rejected by user!');
            reject('false');
          }
        });
    });

    if (transaction) {
      this.setState({ spin: true });

      if (this.state.selectedItem === null) {
        //Some wheel configuration things.
        const selectedItem = Math.floor(Math.random() * this.props.items.length);
        this.setState({ selectedItem });

        //Calling checkAirdrop

        this.props.checkAirdrop();
      } else {
        this.setState({ selectedItem: null });
        setTimeout(this.selectItem, 2000);
      }
    } else {
      this.setState({ spin: false });
    }
  };

  render() {
    const { selectedItem } = this.state;
    const { items, spinned } = this.props;

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : 'd';

    return (
      <div>
        {!spinned ? (
          <div>
            <div className="wheel-container">
              <div className={`wheel ${spinning}`} style={wheelVars}>
                {items.map((item, index) => (
                  <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {this.state.spin ? (
              <div className="text-center mt-3">
                <h4 style={{ color: 'yellow' }}>
                  <div class="wrapper">
                    <span>P</span>
                    <span>l</span>
                    <span>e</span>
                    <span>a</span>
                    <span>s</span>
                    <span>e</span>
                    <span> </span>
                    <span>W </span>
                    <span>a </span>
                    <span>i</span>
                    <span>t</span>
                  </div>
                </h4>
              </div>
            ) : (
              <div className="text-center mt-3">
                <Button
                  onClick={this.selectItem}
                  variant="contained"
                  style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    borderRadius: 20,
                    fontSize: 18,
                    marginRight: 10,
                  }}>
                  Spin now
                </Button>
              </div>
            )}
          </div>
        ) : (
          'Claim'
        )}
      </div>
    );
  }
}
