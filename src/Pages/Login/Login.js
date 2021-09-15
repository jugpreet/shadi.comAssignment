import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { routes } from "../../Config/routes";
import { loginData, setError } from "../../Services/action";
import "./Login.css";
const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const state = useSelector((state) => state?.data?.LoginData);
  const showError = useSelector((state) => state?.data?.isError);

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (Object.keys(state)?.length > 0) {
      history.push(routes.dashboard.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  const handleUsername = (e) => {
    if (e.target.value) {
      setEmailError(false);
      dispatch(setError(false));
    } else {
      setEmailError(true);
    }
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {

    if (e.target.value) {
      setPasswordError(false);
      dispatch(setError(false));
    } else {
      setPasswordError(true);
    }
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    try {
      if (username && password) {
        dispatch(loginData({ email: username, password: password }));
      }
    } catch (error) {
      dispatch(setError(true));
      console.log(error);
    }
  };
  return (
    <div className="login">
      <span className="login-title">Login Page:</span>

      <label className="login-fields" for="username">
        UserName:
      </label>
      <input
        id="username"
        type="text"
        name="username"
        className="login-input"
        value={username}
        onChange={(e) => handleUsername(e)}
      />
      {emailError && username.length > 0 && (
        <span className="error-message">Please enter correct email</span>
      )}
      <label className="login-fields" for="pwd">
        Password:
      </label>
      <input
        type="password"
        id="pwd"
        name="pwd"
        className="login-input"
        value={password}
        onChange={(e) => handlePassword(e)}
      />
      {passwordError && password.length > 0 && (
        <span className="error-message">
          Input Password should contain 6 to 20 characters having at least one
          numeric digit
        </span>
      )}
      <button className="login-button" onClick={handleSubmit}>
        Login
      </button>
      {showError && <p className="error-message">Login Failed!</p>}
    </div>
  );
};
export default LoginPage;
