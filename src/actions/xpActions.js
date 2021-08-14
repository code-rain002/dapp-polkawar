import axios from "axios";
import baseUrl from "../actions/baseUrl";
import { GET_XP_BY_ID, GET_ERRORS } from "./types";
import { getUserAddress } from "./web3Actions";

//GET BID ITEM BY ID
export const getXpByOwner = () => async (dispatch) => {
  let userAddress = await getUserAddress();

  let response = await axios
    .get(`${baseUrl}/xp/${userAddress}`)
    .then((res) => {
      dispatch({
        type: GET_XP_BY_ID,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: "Network Error",
      });
    });
  return response;
};

//GET ALL BID ITEMS
// export const getAllBidItems = () => (dispatch) => {
//   axios
//     .get(`${baseUrl}/bids`)
//     .then((res) => {
//       dispatch({
//         type: GET_ALL_BID_ITEMS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: "Network Error",
//       });
//     });
// };

// //POST A NEW BID BY ID
// export const createNewBid = (itemId, userAddress, bidAmount) => (dispatch) => {
//   let bidData = {
//     address: userAddress,
//     amount: bidAmount,
//   };
//   const response = axios
//     .post(`${baseUrl}/bid/${itemId}`, bidData)
//     .then((res) => {
//       dispatch({
//         type: CREATE_BID_BY_ID,
//         payload: res.data,
//       });
//       return true;
//     })
//     .catch((err) => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: "Network Error!",
//       });
//       return false;
//     });

//   return response;
// };
