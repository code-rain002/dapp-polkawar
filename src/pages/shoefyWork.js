import React, { Component } from "react";
import { shoefyStakingAmount } from "../actions/smartActions/SmartActions";
import { CSVReader, CSVDownloader, jsonToCSV } from "react-papaparse";
import { Button } from "@material-ui/core";

const buttonRef = React.createRef();

export default class ShoefyWork extends Component {
  constructor(props) {
    super(props);
    this.state = { inputData: [], outputData: [], errorAddress: [] };
  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    let finalData = data.map((singleData) => {
      return singleData.data[0];
    });
    this.setState({ inputData: finalData });
    console.log(finalData);
  };

  handleOnError = (err, file, inputElem, reason) => {};

  handleOnRemoveFile = (data) => {};

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };
  getHoldings = async () => {
    let data = [
      "0x00064e885741ed13a122c5a115999e05c71b8fca",
      "0x0678a0cfc4b8e749033e7b452ff19f7bc90d5ad4",
      "0x11f396a19be020fc3788daadf129bb9372c06a31",
      "0x134f6b93ada33709539a2ebbe35546e12ebcd838",
      "0x14b928065131583b2889f9e2e09b1fb8f0376461",
      "0x1787e6fffd06001d87be9e1a34b2f29d84880780",
      "0x2f9017a6c0be2dcd6f26d8fad90ecb6aa356d732",
      "0x3655810f2ed910cb72401b00261c33fc2fd19b21",
      "0x37bad90b1e65080b99c6a11fdd7c7b668401b3f5",
      "0x3867d79a780a86d04a034e323e4649adaf14aa05",
      "0x38cbc10c0834819741b92e8c13582c1fb80c6b67",
      "0x48c5fb8db5bb9d4ae678cd259aedea23c6012ea1",
      "0x4ef95bb33d2dc964d8e12c666fbc334260e18dc3",
      "0x55e773eeff7605e5cf8948fe806aba9809838be0",
      "0x568203e224784cb66c8c2ed206136a58010abbc6",
      "0x5741779c5cea0dcdaa1c8dd8b9bcd1ba1ad56a38",
      "0x57866ed63ca5f9744cef9aa270bd1f1dce935831",
      "0x587d04449ab00ad72b3460913c30d13a6aa06481",
      "0x59b7037b4c65b2230d87ab1fdab7a287f51b1887",
      "0x5d51d35e63bc2286d991e68e0d135d3babe9c01a",
      "0x64c59184100a758141b9891f23713589e47029b2",
      "0x65f8f81149921cf2764ae9f503a0ea8f8f227eb4",
      "0x691571df75f49c8bec0c22304587373ef723284d",
      "0x6fbb6c7d06558ec2efd4c8c2e84a7d91721c6167",
      "0x711f95273163d9db1848752a1d204189491396b0",
      "0x74eefe63dafe2a9b05b92fad2b78a29c1f6f1818",
      "0x75ce8bef2e3eca07e06ad29abfe44f07af3e9aab",
      "0x78b2a6827e9eea841d6d26be9354473ce81f1619",
      "0x807c0943517111b310f400666f505aef31029011",
      "0x82c5c4fcd9189ee0160343203d52f97d0b7cabb6",
      "0x844aaf98fe0779808263edbf17d559cff3991281",
      "0x89cde2b3609b002920cdafee671e23906496c181",
      "0x915cfd82b4a61c63788111568a38ef1cec25c714",
      "0x9818c80f8397e43d8165eb9606cbff1dba5d29eb",
      "0x9953794f39786b540c3c6a49e27bba5bf3520598",
      "0x9d7117a07fca9f22911d379a9fd5118a5fa4f448",
      "0xa04674405bc21962aa476ae959c53f2b2be02a21",
      "0xa7bf3c065e8126c55f462ed30c2a7f3707a2d81c",
      "0xa88abe11ff200beedf5eac9b7d39ee0450860b09",
      "0xac113a863e871ca007dd1be8be12563602502a6d",
      "0xaca371781a389187ced9525e177b18b185c331d1",
      "0xae6bf0365d3519519e58cde326bd0b6696028c9a",
      "0xc081996e8ffd1da3f4784c4b8b6ef8e07333163e",
      "0xc128ccb0fe1d49638274e263e9f2b24f75457a63",
      "0xc3298c6341f82468309302611e24d3003bc79b46",
      "0xca0bdf4f137d3fa0fca450743669faa21ad94732",
      "0xcba4a403b2816ab2129f0c0a29340cd8b185c1bb",
      "0xcc91a8b326d943be020a35b35e0bd68d61a80246",
      "0xd35f68986b10c6bf96f8c6be44b02d14a535c3d6",
      "0xd87407a423488e78b9e3e5e5d682ecd201c74716",
      "0xe46a292279320ab5ffd209d85eb5293e27f86f5c",
      "0xe831c8903de820137c13681e78a5780afddf7697",
      "0xebb825f034519927d2c54171d36b4801def2a6b1",
      "0xee141afc15e9937ae5edfda9a53b1d3841fd0455",
      "0xee273497799afdd756f947500a8779f23d850d74",
      "0xeef38068ee4cec0380ebbb1d04a324c8b930937b",
      "0xf4646d1c467b8fdbc8f325cba742b49dcdf747b1",
      "0xf8b0836d4f2bfefef7b7a8e2c2b6bcf9d238c236",
      "0xfa35113163bfd33c18a01d1a62d4d14a1ed30a42",
      "0xfa849619e9d240877f6a47b354934217250f1821",
    ];

    data.map(async (singleAddress, index) => {
      setTimeout(async () => {
        let totalPBR = await shoefyStakingAmount(singleAddress.toString());
        console.log("index: " + index);
        if (totalPBR !== null && totalPBR !== undefined) {
          if (totalPBR >= 0) {
            let tempObject = {
              address: singleAddress,
              amount: totalPBR,
            };
            this.setState({
              outputData: [...this.state.outputData, tempObject],
            });
          } else {
            this.setState({
              errorAddress: [...this.state.errorAddress, singleAddress],
            });
          }
        } else {
          this.setState({
            errorAddress: [...this.state.errorAddress, singleAddress],
          });
        }
      }, index * 100);

      return 121;
    });
    console.log("Printing before");
  };

  render() {
    return (
      <div>
        {" "}
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <button
                type="button"
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: "40%",
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                Browse file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: "60%",
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
        <div className="text-center">
          {" "}
          <Button
            variant="contained"
            style={{ backgroundColor: "yellow" }}
            onClick={this.getHoldings}
          >
            Get Holding
          </Button>
        </div>
        <CSVDownloader
          filename={"kucoin_reward"}
          config={{
            download: true,
          }}
          data={() => {
            return this.state.outputData.map((singleRow, index) => {
              let final = {
                No: index + 1,
                Address: singleRow.address,
                Amount: singleRow.amount,
              };
              console.log(final);
              return final;
            });
          }}
        >
          Download
        </CSVDownloader>
      </div>
    );
  }
}
