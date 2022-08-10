import React, { Component } from "react";
import {
  checkLabsStakingAmount,
  checkPBRStaking,
  checkPBRStakingAndHolding,
  checkPWARStakingAndHolding,
  checkTokenDataAmount,
} from "../actions/smartActions/SmartActions";
import { CSVReader, CSVDownloader, jsonToCSV } from "react-papaparse";
import { Button } from "@material-ui/core";

const buttonRef = React.createRef();

export default class ExcelWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  getPBRHoldingsStaking = async () => {
    let data = this.state.inputData;

    data.map(async (singleAddress, index) => {
      setTimeout(async () => {
        let totalPBR = await checkPBRStakingAndHolding(
          singleAddress.toString().trim()
        );
        this.setState({ progress: index });
        console.log("index: " + index);
        console.log(totalPBR);
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
      }, index * 150);

      return 121;
    });
    console.log("Printing before");
  };

  // BSC added
  getHoldings = async () => {
    let data = this.state.inputData;

    data.map(async (singleAddress, index) => {
      setTimeout(async () => {
        let totalPBR = await checkPBRStaking(singleAddress.toString().trim());
        this.setState({ progress: index });
        console.log("index: " + index);
        console.log(totalPBR);
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
      }, index * 150);

      return 121;
    });
    console.log("Printing before");
  };
  getLabsHoldings = async () => {
    let data = this.state.inputData;
    console.log(data);
    data.slice(1).map(async (singleAddress, index) => {
      setTimeout(async () => {
        let totalPWAR = await checkLabsStakingAmount(singleAddress.toString());
        console.log("index: " + index);
        console.log(totalPWAR);
        if (totalPWAR !== null && totalPWAR !== undefined) {
          if (totalPWAR >= 0) {
            let tempObject = {
              address: singleAddress,
              amount: totalPWAR,
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
  };

  getPWARHoldings = async () => {
    let data = this.state.inputData;

    data.map(async (singleAddress, index) => {
      setTimeout(async () => {
        let totalPWAR = await checkPWARStakingAndHolding(
          singleAddress.toString()
        );
        console.log("index: " + index);
        if (totalPWAR !== null && totalPWAR !== undefined) {
          if (totalPWAR >= 0) {
            let tempObject = {
              address: singleAddress,
              amount: totalPWAR,
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
    console.log("Printing before: PWAR");
  };

  getLaunchpadHoldings = async () => {
    let data = this.state.inputData;
    console.log(data);
    data.slice(0).map(async (singleAddress, index) => {
      if (singleAddress) {
        setTimeout(async () => {
          let totalPWAR = await checkTokenDataAmount(singleAddress.toString());
          console.log("index: " + index);
          if (totalPWAR !== null && totalPWAR !== undefined) {
            if (totalPWAR) {
              let tempObject = {
                address: singleAddress,
                purchase: totalPWAR.purchase,
                percent: totalPWAR.percent,
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
      }
    });
  };

  render() {
    return (
      <div
        className="container mt-5 d-flex justify-content-center"
        style={{ marginBottom: 200 }}
      >
        <div style={{ width: 900, color: "white" }}>
          <div
            style={{
              border: "1px solid #f9f9f9",
              borderRadius: 10,
              padding: 25,
              paddingTop: 40,
              paddingBottom: 40,
              backgroundColor: "rgba(27, 21, 45,0.5)",
            }}
          >
            <h5 className="text-center">Input Addresses CSV File</h5>
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
          </div>

          <div
            style={{
              border: "1px solid #f9f9f9",
              borderRadius: 10,
              padding: 25,
              backgroundColor: "rgba(27, 21, 45,0.5)",
              height: 300,
              marginTop: 30,
            }}
          >
            {" "}
            <div className="text-center" style={{ color: "white" }}>
              Progress Status{" "}
            </div>
            <div className="text-center" style={{ color: "#ba68c8" }}>
              {this.state.outputData.length} / {this.state.inputData.length}
            </div>{" "}
            <div className="d-flex justify-content-around mt-4">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#7b1fa2",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  color: "#e5e5e5",
                  borderRadius: 18,
                  fontSize: 11,
                  padding: "10px 30px 10px 30px",
                }}
                onClick={this.getHoldings}
              >
                Get PBR Staking
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#01579b",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  color: "#e5e5e5",
                  borderRadius: 18,
                  fontSize: 11,
                  padding: "10px 30px 10px 30px",
                }}
                onClick={this.getPBRHoldingsStaking}
              >
                Get PBR Staking & Holding
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#e91e63",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  color: "#e5e5e5",
                  borderRadius: 18,
                  fontSize: 11,
                  padding: "10px 30px 10px 30px",
                }}
                onClick={this.getLabsHoldings}
              >
                Get Labs Staking
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#e91e63",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  fontSize: 11,
                  color: "#e5e5e5",
                  borderRadius: 18,
                  padding: "10px 30px 10px 30px",
                }}
                onClick={this.getLaunchpadHoldings}
              >
                Get Launchpad
              </Button>
            </div>
            <div className="text-center mt-5">
              <CSVDownloader
                filename={"polkabridge_data"}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid green",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  color: "#e5e5e5",
                  borderRadius: 18,
                  width: 500,
                  padding: "10px 30px 10px 30px",
                  fontSize: 13,
                }}
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
                Download PBR/PWAR/LABS Staking
              </CSVDownloader>
              <CSVDownloader
                filename={"polkabridge_data"}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid green",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  color: "#e5e5e5",
                  borderRadius: 18,
                  width: 500,
                  padding: "10px 30px 10px 30px",
                  marginLeft: 10,
                  fontSize: 13,
                }}
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
                Download Launchpad Data
              </CSVDownloader>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
