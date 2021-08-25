import axios from "axios";
import baseUrl from "../actions/baseUrl";
import { getUserAddress } from "./web3Actions";

//GET Enum actions name
export const getLogEnumActionEvents = () => async (dispatch) => {
  return { claimxp: "claimxp" };
};

//POST A New Log to ES Server
export const postNewLog = (data) => async (dispatch) => {
  let url = `${baseUrl}/log`;

  let response = axios
    .post(url, data)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};
