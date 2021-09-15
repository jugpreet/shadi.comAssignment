import { login, Logout, Error } from "../types";
import * as Data from "../Data";
//import { setError } from "../action";
const initialState = {
  LoginData: {},
  DashBoardPage: [],
  isError: false,
};
const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case login:
      if (
        payload?.payload?.email === Data.Login?.username &&
        payload?.payload?.password === Data.Login?.password
      ) {
        localStorage.setItem("user", JSON.stringify(payload?.payload));
        localStorage.setItem("isLoggedIN", true);
        return {
          LoginData: payload?.payload,
        };
      } else {
        return {
          LoginData: {},
          DashBoardPage: [],
          isError: true,
        };
      }

    case Error:
      return {
        LoginData: {},
        DashBoardPage: [],
        isError: payload,
      };

    case Logout:
      return {
        ...state,
        LoginData: {},
        tableData: [],
      };
    default:
      return state;
  }
};
export { reducer };
