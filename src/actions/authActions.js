import { getUserAddress } from "./web3Actions";
import { GET_CURRENT_USER, REMOVE_CURRENT_USER } from "./types";

//GET user authenticated
export const authenticateUser = () => async (dispatch) => {
  let user = localStorage.getItem("userAddress");
  let userAddress = await getUserAddress();
  console.log("3. authenticating a new user");
  if (!user) {
    console.log("4. Address Not Available");
    localStorage.setItem("userAddress", userAddress);
  }
  dispatch({
    type: GET_CURRENT_USER,
    payload: userAddress,
  });
  return true;
};

//GET user authenticated
export const checkAuthenticated = () => async (dispatch) => {
  let user = localStorage.getItem("userAddress");
  let userAddress = await getUserAddress();

  if (user) {
    dispatch({
      type: GET_CURRENT_USER,
      payload: userAddress,
    });
    return true;
  } else {
    console.log("0. Address not in LocalStorage.");
    return false;
  }
};
//User signout
export const signOutUser = (address) => (dispatch) => {
  dispatch({
    type: REMOVE_CURRENT_USER,
    payload: address,
  });
  localStorage.removeItem("userAddress");
};
