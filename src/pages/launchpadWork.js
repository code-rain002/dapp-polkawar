import React, { Component } from "react";
import { sagaTotalPurchase } from "../actions/smartActions/SmartActions";
import { CSVReader, CSVDownloader } from "react-papaparse";
import { Button } from "@material-ui/core";

const buttonRef = React.createRef();

export default class LaunchpadWork extends Component {
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
    let finalData = data.map((singleData, index) => {
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

  getHoldings = () => {
    let data = this.state.inputData;

    data.slice(1).map(async (singleAddress, index) => {
      if (singleAddress) {
        setTimeout(async () => {
          let result = await sagaTotalPurchase(singleAddress.trim());
          console.log("index: " + index);
          if (result) {
            let tempObject = {
              address: singleAddress,
              TotalEthPurchase: result,
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
      }

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
              Get Saga Purchase
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
                    TotalEthPurchase: singleRow.TotalEthPurchase,
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
