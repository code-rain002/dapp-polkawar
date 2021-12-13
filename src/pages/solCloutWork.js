import React, { Component } from "react";
import { solCloutValue } from "../actions/smartActions/SmartActions";
import { CSVReader, CSVDownloader } from "react-papaparse";
import { Button } from "@material-ui/core";

const buttonRef = React.createRef();

export default class SolCloutWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      inputData: [],
      outputData: [],
      errorAddress: [],
      progress: 0,
    };
  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    let finalData = data.map((singleData) => {
      //   console.log(singleData);
      //   let weiAmount = web3.utils.fromWei(singleData.data[0].toString());

      return {
        address: singleData.data[0],
      };
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

  getHoldings = () => {
    let tempData = [
      "0x6636FDf82f40F261D09Fd6195D718C4799F846A6",
      "0xe5Ec2d799daFD07e1B80333504B85D09a96768a4",
      "0x373C17c65dd3926600e5F75004de43E46361Ea59",
      "0x6492cD8AC4eBC2FB6d12503ed0e0bc5CD9743ff0",
      "0x76B632cb2fDFbe17a631C1De7DB7FCe3F84d8D14",
      "0x678Af82B8AE6a29D0048345DAfE084a4f52630b9",
      "0xAC6e03897E756841f9634eF8690A845ddc6432DA",
      "0xF781D6Cb0Afe8D195d0924e0213048fC8480ab9c",
      "0x42b37c4528BA16f573C0450F423E5FF976F14385",
      "0xE06965045d929794aA805351FF931729C4E619Ff",
      "0xEdaEb73fC23589FEd47BcD35B5502D4144efd002",
      "0xD1aCdc6c1B8D4775399c6F4e508Ea9db6f3c1C13",
      "0x4Fef1888B13E1Ff481577019fE02F977C42606E0",
      "0x0d228b66f054d8aD0c4E20b95A8cC954515D8B83",
      "0xE1A9BE36c044B8f31774fB04285f96b5dc0574D7",
      "0xAc25F26a91C8A60fB3b9627f56EB0fb60C0b4EB4",
      "0x441Ad0a793F7CED485FF6B6039f99088a0CF1124",
      "0xf3A73Bd66646aeAE7411bE0Ad78D942a68876604",
      "0x8F405Bb1A023A24E78215F82338c5259a90Ae40D",
      "0xcdB2C7d11183E949a731398B322D4c02ac5A1e14",
      "0x81529d001eed5117F24d9254e6780e83f44c5EEb",
      "0x59ae123A05aBd4239225e662d9dE9ae2d7a0B2cb",
      "0x8689b78FC84551ddcFB3BAC2EfAEDB1Aa2F22646",
      "0x9c6378488b4609a968E3E9eEd38593c9B1Db9706",
      "0x1cbA2b6ec7108AEc81605D8150DBb68572fb115C",
      "0x6cE22F84CBBD97C03d2DD0dF1c0a2F8Ccb8f58C7",
      "0x114a1Ea443524109b999eb4D6b4F903f76FD7016",
      "0x32E25a7AfdC1926b8D16FC598871E2d815599e62",
      "0x74dB1c614A8d000E6660e0e513AC34a4408C4d00",
    ];
    let data = tempData;

    data.map(async (singleAddress, index) => {
      setTimeout(async () => {
        let result = await solCloutValue(singleAddress);
        console.log("index: " + index);
        if (result) {
          let tempObject = {
            address: singleAddress,
            TotalTokenPurchase: result.TotalTokenPurchase,
            TotalPercentClaimed: result.TotalPercentClaimed,
          };
          this.setState({
            outputData: [...this.state.outputData, tempObject],
          });
        } else {
          this.setState({
            errorAddress: [...this.state.errorAddress, singleAddress],
          });
        }
      }, index * 100);

      return 121;
    });
  };

  render() {
    return (
      <div className="container mt-5 d-flex justify-content-center">
        <div style={{ width: 900, color: "white" }}>
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

          <div
            className="d-flex justify-content-around mt-5"
            style={{ marginBottom: 300 }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow" }}
              onClick={this.getHoldings}
            >
              Get Sol Holdings
            </Button>
            <CSVDownloader
              filename={"solclout_launchpad"}
              style={{
                backgroundColor: "green",
                border: "1px solid green",
                padding: "5px 10px 5px 10px",
                borderRadius: 10,
                color: "white",
              }}
              config={{
                download: true,
              }}
              data={() => {
                return this.state.outputData.map((singleRow, index) => {
                  let final = {
                    No: index + 1,
                    Address: singleRow.address,
                    TotalTokenPurchase: singleRow.TotalTokenPurchase,
                    TotalPercentClaimed: singleRow.TotalPercentClaimed,
                  };
                  console.log(final);
                  return final;
                });
              }}
            >
              Download CSV
            </CSVDownloader>
          </div>
        </div>
      </div>
    );
  }
}
