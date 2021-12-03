import React, { Component } from "react";
import {
  checkPBRStakingAndHolding,
  checkPWARStakingAndHolding,
} from "../actions/smartActions/SmartActions";
import { CSVReader, CSVDownloader, jsonToCSV } from "react-papaparse";
import { Button } from "@material-ui/core";

const buttonRef = React.createRef();

export default class ExcelWork extends Component {
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
    let data = this.state.inputData;

    data.map(async (singleAddress, index) => {
      setTimeout(async () => {
        let totalPBR = await checkPBRStakingAndHolding(
          singleAddress.toString()
        );
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
            onClick={this.getPWARHoldings}
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
